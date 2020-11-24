import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: any;
  allLikes;
  tempEvents = [];
  loading = true;
  categories;
  categoriesCarousal = [];
  featuredEvents = [];

  items: any;
  displayAll: boolean = false;

  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.eventService.getEventCategories();
    this.eventService.getAllEvents().subscribe((events) => {
      this.items = events;
      this.events = events;
      this.categories = this.eventService.categories;
      // Sort events Category wise
      for (let a = 0; a < this.categories?.length; a++) {
        /* let count = 0 */
        for (let b = 0; b < this.events?.length; b++) {
          if (
            this.events[b].eventCategory == this.categories[a].name &&
            this.events[b].isFeatured != true &&
            this.tempEvents?.length < 5
          ) {
            this.tempEvents.push(this.events[b]);
            /* count = count + 1 */
          }
          // Featured events sorting
          if (
            this.events[b].isFeatured == true &&
            !this.featuredEvents.includes(this.events[b])
          ) {
            this.featuredEvents.push(this.events[b]);
          }
        }
        //  count = 0
        // If a certain category have more than one events then only add else skip
        if (this.tempEvents?.length > 3) {
          this.categoriesCarousal.push({
            category: this.categories[a].name,
            data: [...this.tempEvents],
          });
        }
        this.tempEvents = [];
      }
      this.loading = false;
    });
  }

  customOptions: OwlOptions = {
    //center: true,
    loop: true,
    margin: 20,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 4,
      },
    },
  };

  customOptionsFeatured: OwlOptions = {
    //center: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };
}
