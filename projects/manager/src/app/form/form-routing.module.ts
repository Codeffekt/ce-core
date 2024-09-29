import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPathResolverService } from './form-path-resolver.service';

const routes: Routes = [
    {
        path: '',        
        children: [
            {
                path: ':formPath',
                resolve: {
                    form: FormPathResolverService,
                },               
                loadComponent: () => import('../form-editor/form-editor.component').then(m => m.FormEditorComponent),
                providers: [
                    FormPathResolverService,
                ]
            },            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormRoutingModule { }
