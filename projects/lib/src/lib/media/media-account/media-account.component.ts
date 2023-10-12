import { Component, OnInit } from '@angular/core';
import { IndexType } from '@codeffekt/ce-core-data';
import { CeCoreService } from '../../services/ce-core.service';

@Component({
    selector: 'app-media-account',
    templateUrl: './media-account.component.html',
    styleUrls: ['./media-account.component.scss']
})
export class MediaAccountComponent implements OnInit {

    pid: IndexType;

    constructor(
        private coreService: CeCoreService
    ) {
        this.pid = this.coreService.getCurrentUser().settings.account;
    }

    ngOnInit() {        
    }

}
