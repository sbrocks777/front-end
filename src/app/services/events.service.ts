import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  categories = null;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}
  /**
   * Get Events Created By user
   */
  getAllEvents() {
    return this.db.collection('events').valueChanges({ idField: 'id' });
  }

  /* Gett Event By ID */
  getEventById(id: string) {
    return this.db.collection('events').doc(id).valueChanges();
  }

  /**
   * Get Categories
   */
  getEventCategories() {
    if (!this.categories) {
      this.db
        .collection('categories')
        .valueChanges({ idField: 'id' })
        .subscribe((categories) => (this.categories = categories));
    }
  }

  getEventByCategory(name: string) {
    return this.db
      .collection('events', (ref) => ref.where('eventCategory', '==', name))
      .valueChanges({ idField: 'id' });
  }

  toggleStatus(id, isPaid) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.db.collection('attendees').doc(id).update({ isPaid });
      }
    });
  }

  getEventDetailsWithStatus(eid: string) {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection('attendees', (ref) =>
              ref.where('joinID', '==', eid + user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return of(null);
        }
      })
    );
  }

  /** Join login user to events */
  joinEvent(data: any) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.db.collection('attendees').add({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          ticketPrice: data.total,
          joinDate: firebase.firestore.FieldValue.serverTimestamp(),
          isPaid: false,
          eventName: data.eventName,
          eid: data.eid,
          userID: user.uid,
          masterID: data.masterID,
          joinID: data.eid + user.uid,
        });
      }
    });
  }

  cancelBooking(eid: string, uid: string) {
    this.db
      .collection('attendees', (ref) => ref.where('joinID', '==', eid + uid))
      .valueChanges({ idField: 'id' })
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.db.collection('attendees').doc(data[0].id).delete();
        }
      });
  }

  getAttendees(eid: string) {
    return this.db
      .collection('attendees', (ref) => ref.where('eid', '==', eid))
      .valueChanges({ idField: 'id' });
  }

  getMyBookings() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection('attendees', (ref) =>
              ref.where('userID', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        }
      })
    );
  }
}
