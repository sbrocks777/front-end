import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
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
}
