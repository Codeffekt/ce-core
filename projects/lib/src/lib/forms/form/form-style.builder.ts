import {
    FormBlock, FormInstance,
    FormInstanceMaskWrapper, FormUtils, IndexType
} from "@codeffekt/ce-core-data";

export interface FormCard {
    id?: string;
    title: string;
    elts: FormInstance | FormBlock[];
}

interface FormStyleCardParam {
    id?: string;
    title?: string;
    blocks: string[];
}

const DEFAULT_CARD_TITLE = "Card";
const DEFAULT_CARD_ID = "ce-card-default"

export class FormStyleBuilder {

    buildBlocks(form: FormInstance | FormBlock[], formStyle?: FormInstanceMaskWrapper): FormBlock[] {

        const blocks = Array.isArray(form) ? form : FormUtils.getBlocks(form);

        if (!formStyle || formStyle.props.disabled || !formStyle.props.style) {
            return blocks;
        }

        const style = formStyle.props.style;

        if (style?.orderBlock) {
            const orderBlock = style.orderBlock;
            blocks.sort((blockLeft, blockRight) => {
                const blockLeftIndex = orderBlock.indexOf(blockLeft.field);
                const blockRightIndex = orderBlock.indexOf(blockRight.field);
                if (blockLeftIndex == -1 && blockRightIndex == -1) {
                    return 0;
                }
                if (blockLeftIndex == -1) {
                    return 1;
                }
                if (blockRightIndex == -1) {
                    return -1;
                }
                return blockLeftIndex - blockRightIndex;
            });
        }

        return blocks;
    }

    buildCards(form: FormInstance, formStyle?: FormInstanceMaskWrapper): FormCard[] {
        if (!form) {
            return [];
        }

        let usedBlocks: any = [];
        let customCards: any = [];
        let formBlocks = FormUtils.getBlocks(form);

        if (formStyle?.props?.style?.cards?.length) {
            const styleCards: FormStyleCardParam[] = formStyle.props.style.cards;
            customCards = styleCards.map(styleCard => this.buildCard(styleCard, form));
            usedBlocks = styleCards.reduce((prev, cur) => prev.concat(cur.blocks), [] as string[]);
        }

        const unusedBlocks = formBlocks.filter(block => !usedBlocks.includes(block.field));
        const defaultCards: FormCard[] =
            unusedBlocks.map(block => this.buildCard({ blocks: [block.field] }, form));


        const cards = this.orderCards([...defaultCards, ...customCards], formStyle?.props?.style?.orderBlock);
        return cards;
    }

    buildCard(card: FormStyleCardParam, form: FormInstance): FormCard {
        const blocks = FormUtils.getBlocks(form);
        const elts = blocks.filter(block => card.blocks.includes(block.field));
        return {
            id: card.id,
            title: card.title ? card.title : null as any,//this.buildCardTitleFromBlocks(card, blocks),
            elts,
        };
    }

    buildCardTitleFromBlocks(card: FormStyleCardParam, blocks: FormBlock[]): string {
        if (!card.blocks?.length) {
            return DEFAULT_CARD_TITLE;
        }
        const block = blocks.find(b => b.field === card.blocks[0]);
        return block!.label ?? DEFAULT_CARD_TITLE;
    }


    private orderCards(cards: FormCard[], orderBlock: IndexType[] | undefined): FormCard[] {

        if (!orderBlock) {
            return cards;
        }

        cards.sort((cardLeft, cardRight) => {

            const blockLeftIndex = this.indexOf(cardLeft, orderBlock);
            const blockRightIndex = this.indexOf(cardRight, orderBlock);
            if (blockLeftIndex == -1 && blockRightIndex == -1) {
                return 0;
            }
            if (blockLeftIndex == -1) {
                return 1;
            }
            if (blockRightIndex == -1) {
                return -1;
            }
            return blockLeftIndex - blockRightIndex;
        });
        return cards;
    }


    private indexOf(card: FormCard, orderBlock: IndexType[]): number {
        const blocks = Array.isArray(card.elts) ? card.elts : FormUtils.getBlocks(card.elts);
        const indexes = blocks.map(block => orderBlock.indexOf(block.field)).filter(index => index != -1);

        const indexesFound = indexes.length != -1;
        return indexesFound ? Math.min(...indexes) : -1;
    }
} 