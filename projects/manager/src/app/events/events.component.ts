import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CeEventsService } from '@codeffekt/ce-core';

@Component({
    selector: 'app-events',
    imports: [
        CommonModule,
    ],
    templateUrl: './events.component.html',
    styleUrl: './events.component.scss'
})
export class EventsComponent {

  private eventsService = inject(CeEventsService);  

  event$ = this.eventsService.all();

}
