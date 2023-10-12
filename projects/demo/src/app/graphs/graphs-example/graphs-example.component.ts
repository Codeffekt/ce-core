import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import cytoscape from 'cytoscape';
import { CeProjectsService } from '@codeffekt/ce-core';
import { FormBlock, FormProjectWrapper } from '@codeffekt/ce-core-data';

interface CyStyle {
  selector: string;
  style: any;
}

interface NodeData {
  id: string;
  weight?: string;
}

interface EdgeData {
  id: string;
  source: string;
  target: string;
}

interface CyElement {
  data: NodeData | EdgeData;
}

@Component({
  selector: 'app-graphs-example',
  templateUrl: './graphs-example.component.html',
  styleUrls: ['./graphs-example.component.scss']
})
export class GraphsExampleComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { static: true }) container: ElementRef;

  pid: string = "9e3944ac-d5ef-430a-b790-fc53e959f29e";

  errorMsg: string;

  isGraphInProgress = false;

  private elements: CyElement[] = [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
  ];

  private styles: CyStyle[] = [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier'
      }
    },
    {
      selector: '#a',
      style: {
        'label': "John Doe"
      }
    }
  ];

  private cy: any;

  constructor(
    private projectsService: CeProjectsService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.updateGraph();

  }

  async createGraph() {
    try {
      this.errorMsg = undefined;
      this.isGraphInProgress = true;
      const project = await this.projectsService.getProject(this.pid);
      if (!project?.core.id) {
        throw new Error(`Project ${this.pid} not found`);
      }

      this.elements = [];
      this.styles = [];
      this.addProjectNode(project);

      for(const block of project.getFormsBlocks()) {
        this.addFormsData(project, block);
      }

      this.updateGraph();

    } catch (err) {
      this.errorMsg = err.message;
    } finally {
      this.isGraphInProgress = false;
    }
  }


  private addProjectNode(project: FormProjectWrapper) {

    this.elements.push({
      data: {
        id: project.core.id,
        weight: '70'
      }
    });

    this.styles.push({
      selector: `#${project.core.id}`,
      style: {
        'label': project.props.name
      }
    });

  }

  private addFormsData(project: FormProjectWrapper, block: FormBlock) {

    const elements: CyElement[] = [
      {
        data: {
          id: block.field,  
          weight: '10'        
        },
      },
      {
        data: {
          id: `${project.core.id}-${block.field}`,
          source: project.core.id,
          target: block.field
        }
      }
    ];

    const styles: CyStyle[] = [
      {
        selector: `#${block.field}`,
        style: {
          'label': block.field
        }
      }
    ];

    this.elements = [...this.elements, ...elements];
    this.styles = [...this.styles, ...styles];

  }

  private updateGraph() {

    if (this.cy) {
      this.cy.unmount();
      this.cy.destroy();
      this.cy = undefined;
    }


    this.cy = cytoscape({

      container: this.container.nativeElement,

      elements: this.elements,
      style: this.styles,

      layout: {
        name: 'circle',        
      }
    });
  }

}
