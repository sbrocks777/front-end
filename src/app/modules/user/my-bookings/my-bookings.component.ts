import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'eventName',
    'joinDate',
    'status',
    'details',
  ];
  dataSource: any[];
  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.eventService.getMyBookings().subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    });
  }
}
