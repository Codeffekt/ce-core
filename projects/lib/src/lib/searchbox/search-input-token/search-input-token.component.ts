import { CdkConnectedOverlay, CdkOverlayOrigin, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SearchHint } from '../model/search-hint';
import { SearchHintService } from '../services/search-hint.service';
import { SearchTokensService } from '../services/search-tokens-service';

@UntilDestroy()
@Component({
  selector: 'ce-search-input-token',
  templateUrl: './search-input-token.component.html',
  styleUrls: ['./search-input-token.component.scss']
})
export class SearchInputTokenComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Input() value?: string;
  @ViewChild(MatInput, { read: ElementRef }) inputRef!: ElementRef;
  @ViewChild(MatInput) input!: ElementRef;
  @ViewChild(CdkOverlayOrigin, { read: ElementRef }) overlayOrigin!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { read: TemplateRef }) overlayTemplate!: TemplateRef<any>;
  @Output() search = new EventEmitter<string>();

  formControl = new UntypedFormControl();
  shouldShowPlaceholder = true;
  shouldPreserveFocus = false;
  overlayRef!: OverlayRef;
  portal!: TemplatePortal;
  resizeObserver!: ResizeObserver;

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private elementRef: ElementRef,
    private tokensService: SearchTokensService,
    private tokensHintService: SearchHintService,
  ) {
    this.listenTokensChanges();
    this.listenInputChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.updateFormControl(changes.value.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.configureOverlay();
    this.listenResize();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  onValueChanged(value: string) {
    this.tokensHintService.applyfilter(value);
    this.tokensService.onInputValueChanged(value);
  }

  resetInput() {
    this.formControl.patchValue('', { emitEvent: false });
    this.tokensHintService.resetActiveHint();
    this.tokensHintService.applyfilter(null as any);
  }

  onSelectedHint(hint: SearchHint) {
    this.formControl.patchValue(hint.value, { emitEvent: false });
    this.tokensService.onInputValueChanged(this.inputRef.nativeElement.value, { forceValue: true });
    this.tokensHintService.resetActiveHint();
    this.shouldPreserveFocus = true;
  }

  onEnterPressed(event: Event) {
    event.preventDefault();
    const activeHint = this.tokensHintService.getActiveHint();
    if (activeHint) {
      this.onSelectedHint(activeHint);
    } else {
      this.closeOverlay();
      this.shouldPreserveFocus = false;
      this.inputRef.nativeElement.blur();
      this.tokensService.onInputValueChanged(this.inputRef.nativeElement.value, { forceValue: true });
      this.search.next(this.inputRef.nativeElement.value);
    }
  }

  onBackspacePressed(event: Event) {
    if (this.formControl.value.length) {
      return;
    }

    event.preventDefault();
    const restoredValue = this.tokensService.removeLastTokenPart();
    this.formControl.patchValue(restoredValue, { emitEvent: false });
    this.tokensHintService.applyfilter(restoredValue as any);
  }

  onKeyDown(keyCode: number) {
    this.tokensHintService.onKeyboardDown(keyCode);
  }

  onBlur() {
    if (this.shouldPreserveFocus) {
      this.inputRef.nativeElement.focus();
      this.shouldPreserveFocus = false;
    }
  }

  openOverlay() {
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
    }
  }

  closeOverlay() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private configureOverlay() {
    this.overlayRef = this.overlay.create({
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',

      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.overlayOrigin)
        .setOrigin(this.overlayOrigin)
        .withFlexibleDimensions(false)
        .withPush(false)
        .withPositions([{
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        }])
    });

    this.overlayRef.outsidePointerEvents().subscribe(_ => this.closeOverlay());
    this.portal = new TemplatePortal(this.overlayTemplate, this.vcr);
  }

  private updateFormControl(value: string) {
    this.formControl.patchValue(this.value);
  }

  private listenInputChanges() {
    this.formControl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onValueChanged(value));
  }

  private listenTokensChanges() {
    this.tokensService.tokensValues()
      .pipe(untilDestroyed(this))
      .subscribe(tokens => {
        this.resetInput();
        this.setPlaceholderVisibility(tokens.length === 0);
      });
  }

  private setPlaceholderVisibility(isVisible: boolean) {
    this.shouldShowPlaceholder = isVisible;
  }

  private listenResize() {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.overlayRef?.hasAttached()) {
        this.overlayRef.updatePosition()
      }
    });
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }
}
