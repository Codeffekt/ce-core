import { AfterViewInit, Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBlock } from '@codeffekt/ce-core-data';
import { IProjectAssocContent } from '../project-assoc-models';
import { ProjectAssocStoreService } from '../project-assoc-store.service';

@Component({
  selector: 'ce-project-assoc-factory',
  templateUrl: './project-assoc-factory.component.html',
  styleUrls: ['./project-assoc-factory.component.scss']
})
export class ProjectAssocFactoryComponent implements OnInit, AfterViewInit {

  _block!: FormBlock;
  get block(): FormBlock {
    return this._block;
  }

  @Input() set block(value: FormBlock) {
    this._block = value;    
    this.updateComponent();
  }

  @ViewChild('container', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  private projectAssocComponent!: ComponentRef<IProjectAssocContent>;

  constructor(
    private projectAssocService: ProjectAssocStoreService
  ) { }  

  ngAfterViewInit(): void {
    this.updateComponent();
  }

  ngOnInit(): void {
  }

  private updateComponent() {

    if (!this.vcr) {
      return;
    }

    if (this.projectAssocComponent) {
      this.vcr.remove();
    }

    const componentType = this.projectAssocService.getComponentType(this.block.field);
    if (componentType) {
      this.projectAssocComponent = this.vcr.createComponent(componentType);      
      this.connectInputBlock(this.projectAssocComponent.instance);      
      this.projectAssocComponent.changeDetectorRef.detectChanges();
    }
  }
  
  private connectInputBlock(component: IProjectAssocContent) {
    component.block = this.block;
  }  
}
