import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.getUser();
  }

  /** Get auth data, then get firestore user document || null */
  getUser() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return null;
        }
      })
    );
  }

  /** Send email verification */
  async sendVerificationMail() {
    const user = await this.afAuth.currentUser;
    user.sendEmailVerification();
  }

  /** Login with google */
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  /** Login with google */
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider).then((credential) => {
      this.updateUserData(credential.user).then(() => {
        this.router.navigate(['']);
      });
    });
  }

  /** Login with email */
  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
        
    // return this.afAuth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     if (!result.user.emailVerified) {
    //       new Promise((resolve: any, reject: any) => {
    //         resolve(this.sendVerificationMail())
    //       })

    //       this.signOut();
    //     } else {
    //       this.router.navigate(['']);
    //     }
    //   });
  }

  /** SignUp with email */
  signUp(firstName, lastName, email, password, phone) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result) {
          this.sendVerificationMail();
          window.alert(
            'Please validate your email address. Kindly check your inbox.'
          );
          this.updateUserData({
            uid: result.user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNumber: phone,
          }).then(
            () => this.signOut(),
            (er) => console.log(er, 'failed to add data')
          );
          // this.signOut();
          // this.afs.collection('users').doc(result.user.uid).set({
          //   firstName: firstName,
          //   lastName: lastName,
          //   email:  email,
          //   mobileNumber:phone
          // }).then(()=>this.signOut(),er=>console.log(er,'failed to add data'))
        }
      });
  }

  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  /** Password reset email */
  passwordReset(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef = this.afs.collection<User>('users').doc(user.uid);
    const data: User = {
      firstName: user.firstName || user.displayName.split(' ')[0] || null,
      lastName: user.lastName || user.displayName.split(' ')[1] || null,
      mobileNumber: user.mobileNumber || user.phoneNumber,
      email: user.email,
      roles: {
        subscriber: true,
      },
    };
    return userRef.set(data, { merge: true });
  }

  /** Role-based Authorization */
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  /** determines if user has matching role */
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
