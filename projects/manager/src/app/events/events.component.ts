import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CeCoreService, CeEventsService } from '@codeffekt/ce-core';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  private eventsService = inject(CeEventsService);  

  event$ = this.eventsService.all();

  ngOnInit(): void {
      const eventSource = new EventSource("http://localhost:3000/events/all", { withCredentials: true });
      eventSource.onmessage = (e) => {
        console.log("RECEIVE", e);
      };
  }
}
