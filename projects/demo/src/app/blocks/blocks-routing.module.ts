import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormIndexPageComponent } from './form-index-page/form-index-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormTextPageComponent } from './form-text-page/form-text-page.component';
import { FormNumberPageComponent } from './form-number-page/form-number-page.component';
import { FormSelectPageComponent } from './form-select-page/form-select-page.component';
import { FormTimestampPageComponent } from './form-timestamp-page/form-timestamp-page.component';
import { FormBarcodePageComponent } from './form-barcode-page/form-barcode-page.component';
import { FormCoordinatesPageComponent } from './form-coordinates-page/form-coordinates-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,    
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      },
      {
        path: 'index',        
        component: FormIndexPageComponent,
      },
      {
        path: 'text',
        component: FormTextPageComponent,
      },
      {
        path: 'number',
        component: FormNumberPageComponent,
      },
      {
        path: 'select',
        component: FormSelectPageComponent,
      },
      {
        path: 'timestamp',
        component: FormTimestampPageComponent,
      },
      {
        path: 'barcode',
        component: FormBarcodePageComponent,
      },
      {
        path: 'coordinates',
        component: FormCoordinatesPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocksRoutingModule { }
