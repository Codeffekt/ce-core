import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormRoot } from "@codeffekt/ce-core-data";
import { LayoutService } from "../../../services/layout.service";
import { CeFormsService } from "../../../services/ce-forms.service";

@Component({
    selector: 'ce-new-form',
    templateUrl: './form-new.component.html',
    styleUrls: ['./form-new.component.scss'],
})
export class FormNewComponent implements OnInit {
    root!: FormRoot;

    constructor(
        private router: Router,
        private layout: LayoutService,
        private formsService: CeFormsService,
    ) { }

    ngOnInit(): void {
        if (this.root) {
            this.createForm();
        }
    }

    private async createForm() {
        try {
            const newForm = await this.formsService.createForm(this.root.id);
            this.layout.showSingleMessage(`Le formulaire à été créé.`);
            this.router.navigate(['/forms', 'edit', newForm.id]);
        } catch(err) {
            this.layout.showErrorMessage(`Erreur lors de la création d'un nouveau formulaire`);
        }
    }
}