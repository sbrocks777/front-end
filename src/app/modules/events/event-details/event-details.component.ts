import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  id: string;
  loading: boolean = true;
  joined: boolean = true;
  visited: boolean = false;
  isPaid: boolean = false;
  showCancelBtn: boolean = false;
  event: any;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private eventService: EventsService
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.eventService.getEventById(this.id).subscribe((e: any) => {
      this.event = { ...e, id: this.id };
    });

    this.eventService.getEventDetailsWithStatus(this.id).subscribe(
      (data: any) => {
        this.loading = false;
        if (data[0] && data[0] != null) {
          this.joined = false;
          if (data[0].isPaid) {
            this.isPaid = true;
            this.showCancelBtn = false;
          } else {
            this.isPaid = false;
            this.showCancelBtn = true;
          }
        }
      },
      () => {
        this.loading = false;
      }
    );
  }

  joinEvent(id: string, eventName: string, total: number, masterID: string) {
    this.authService.user$.subscribe((u) => {
      if (u) {
        let data = {
          eid: id,
          masterID: masterID,
          eventName: eventName,
          total: total,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
        };
        this.eventService.joinEvent(data);
      } else {
        this.router.navigate(['user/register']);
      }
      this.joined = false;
      this.visited = true;
    });
  }

  cancelBooking(id: string) {
    this.showCancelBtn = false;
    this.joined = true;
    this.eventService.cancelBooking(id, this.user.uid);
  }
}
