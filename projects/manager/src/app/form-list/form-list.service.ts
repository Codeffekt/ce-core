import { inject, Injectable } from "@angular/core";
import { CeFormsService } from "@codeffekt/ce-core";
import { FormRoot, IndexType } from "@codeffekt/ce-core-data";
import { BehaviorSubject, filter, firstValueFrom } from "rxjs";

@Injectable()
export class FormListService {

    private formsService = inject(CeFormsService);

    private root$ = new BehaviorSubject<FormRoot | undefined>(undefined);

    async setRoot(rootId: IndexType) {

        const root = await firstValueFrom(this.formsService.getFormRoot(rootId));

        this.root$.next(root);

        return root;
    }

    listenRoot() {
        return this.root$.asObservable().pipe(
            filter(v => v !== undefined)
        );
    }
}