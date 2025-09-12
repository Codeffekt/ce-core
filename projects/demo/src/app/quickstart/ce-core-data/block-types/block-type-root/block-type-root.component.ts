import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { CeFormComponent } from '@codeffekt/ce-core';

@Component({
    selector: 'app-block-type-root',
    templateUrl: './block-type-root.component.html',
    styleUrls: ['./block-type-root.component.scss'],
    imports: [
      CeFormComponent,
    ]
})
export class BlockTypeRootComponent {

  @Input() formWrapper!: FormWrapper;
  @Output() formChanges = new EventEmitter<FormWrapper>();

  testFormBlockRoot = FormWrapper.fromForm({
    id: 'test-form-block-root',
    root: 'unique-root',
    ctime: Date.now(),
    valid: true,
    title: 'Example formulaire avec un block de type root',
    content: {
      model: {
        field: "model",
        type: "root" as any,
        label: "Modèle",
        params: {
          fields: ["$id", "$title"]
        }        
      },      
    }
  });
}
