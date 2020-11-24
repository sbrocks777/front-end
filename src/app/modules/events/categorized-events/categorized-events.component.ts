import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-categorized-events',
  templateUrl: './categorized-events.component.html',
  styleUrls: ['./categorized-events.component.css'],
})
export class CategorizedEventsComponent implements OnInit {
  name: string;
  events: any;

  constructor(
    private route: ActivatedRoute,
    public eventService: EventsService
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.eventService.getEventByCategory(this.name).subscribe((data) => {
      this.events = data;
      console.log(data)
    });
  }
}
