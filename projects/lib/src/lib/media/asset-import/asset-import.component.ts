import { Component, OnInit, OnDestroy, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader';
import { firstValueFrom, Subscription } from 'rxjs';
import { AssetElt, IndexType } from '@codeffekt/ce-core-data';
import { CeCoreService } from '../../services/ce-core.service';
import { LayoutService } from '../../services/layout.service';

const DEFAULT_TITLE = "Asset Importer";

export interface AssetImportConfig {
  pid: IndexType;
  title?: string;
  asset?: AssetElt;
  isDone?: boolean;
  hasError?: boolean;
}

@Component({
  selector: 'app-asset-import',
  templateUrl: './asset-import.component.html',
  styleUrls: ['./asset-import.component.scss']
})
export class AssetImportComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  uploadOptions: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;

  subscription: Subscription = new Subscription();

  responsiveMode = false;

  file: UploadFile;

  eltForm: FormGroup;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<AssetImportComponent>,
    private fb: FormBuilder,
    private coreService: CeCoreService,
    private layout: LayoutService,
    @Inject(MAT_DIALOG_DATA) public config: AssetImportConfig) {

    this.uploadInput = new EventEmitter<UploadInput>();
    this.uploadOptions = { concurrency: 1, maxUploads: 1 };

    this.title = this.config.title || DEFAULT_TITLE;

    this.subscription.add(
      this.layout.observeResponsiveModeChanges().subscribe((responsiveMode: boolean) => {
        this.responsiveMode = responsiveMode;
      })
    );
  }

  ngOnInit() {
    this.eltForm = this.fb.group({
      id: [null, Validators.required]
    });
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

  onChange(output: UploadOutput) {

    console.log(output);
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.file = output.file;
      this.eltForm.patchValue({
        id: this.file.name
      });
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
    } else if (output.type === 'done') {
      this.config.isDone = true;
    }
  }

  onCancelImport() {
    this.uploadInput.emit({ type: 'cancel', id: this.file.id });
    this.uploadInput.emit({ type: 'remove', id: this.file.id });
    this.file = null;
    this.eltForm.reset();
  }

  async onImport() {

    this.config.hasError = false;

    const timestamp = this.file.lastModifiedDate.valueOf() || Date.now();

    // create the bucket
    try {
      const assetElt = await firstValueFrom(this.coreService.callAssets("createBucket", this.config.pid, {
        metadata: { timestamp: timestamp.toString() }
      } as AssetElt));
      this.config.isDone = false;
      this.config.asset = assetElt;
      const event = this.coreService.newAssetUploadInput(this.config.asset.id);
      this.uploadInput.emit(event);
    } catch (_) {
      this.config.hasError = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
