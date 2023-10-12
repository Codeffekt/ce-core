import { Component } from '@angular/core';
import { CeProjectsService } from '../../services/ce-projects.service';

@Component({
  selector: 'app-media-project',
  templateUrl: './media-project.component.html',
  styleUrls: ['./media-project.component.scss']
})
export class MediaProjectComponent {

  pid = this.projectService.getCurrentProjectAssetsRef(); 

  constructor(
    private projectService: CeProjectsService) {
  }  

}
