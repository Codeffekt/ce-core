import { Component, inject } from '@angular/core';
import { CeProjectsService } from '../../services/ce-projects.service';

@Component({
  selector: 'app-media-project',
  templateUrl: './media-project.component.html',
  styleUrls: ['./media-project.component.scss']
})
export class MediaProjectComponent {

  pid = inject(CeProjectsService).getCurrentProjectAssetsRef(); 

  constructor() {
  }  

}
