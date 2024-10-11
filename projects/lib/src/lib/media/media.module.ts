import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from "@angular/material/stepper";
import { NgxUploaderModule } from "ngx-uploader";
import { CeIllustrationModule } from "../illustration/illustration.module";
import { CeMediaPhotoModule } from "../media-photo/media-photo.module";
import { CeNavigationModule } from "../navigation/navigation.module";
import { CePaginatorModule } from "../paginator/paginator.module";
import { CePipesModule } from "../pipes/pipes.module";
import { AssetImportComponent } from "./asset-import/asset-import.component";
import { MediaAccountComponent } from "./media-account/media-account.component";
import { MediaListComponent } from "./media-list/media-list.component";
import { MediaProjectComponent } from "./media-project/media-project.component";
import { MediaFactoryComponent } from './media-factory/media-factory.component';
import { MediaDefaultComponent } from './media-default/media-default.component';
import { MediaStoreService } from "./media-factory/media-store.service";
import { MediaPhotoComponent } from "../media-photo/media-photo.component";
import { MatMenuModule } from "@angular/material/menu";
import { CeNgReallyModule } from "../widgets/ng-really/ng-really.module";

@NgModule({
    declarations: [
        MediaProjectComponent,
        MediaAccountComponent,
        MediaListComponent,
        AssetImportComponent,
        MediaFactoryComponent,
        MediaDefaultComponent
    ],    
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatStepperModule,
        MatProgressBarModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        NgxUploaderModule,        
        CePipesModule,
        CeMediaPhotoModule,        
        CeIllustrationModule,
        CeNavigationModule,
        CePaginatorModule,
        CeNgReallyModule,
    ],
    exports: [
        MediaListComponent,
        MediaProjectComponent,
        MediaAccountComponent,
        AssetImportComponent,  
        MediaFactoryComponent,      
    ],
})
export class CeMediaModule { 
    constructor(storeService: MediaStoreService) {
        storeService.setDefaultComponent(MediaDefaultComponent);
        
        storeService.setComponents({
            "image/jpeg": {
                useClass: MediaPhotoComponent
            },
            "image/png": {
                useClass: MediaPhotoComponent
            }
        });
    }
}