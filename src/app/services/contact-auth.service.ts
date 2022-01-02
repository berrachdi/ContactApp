import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ContactAuthService {

  constructor(private fireauth: AngularFireAuth) {

   }

  // User details
  userDetails() {
    return this.fireauth.user
  }
  
   signup(value){

    return new Promise<any>((resolve, reject) => {
      this.fireauth.createUserWithEmailAndPassword(value.email,value.password)
      .then(
        res => resolve(res),
        err => reject(err))
      })
     

   }

   signin(value){
    return new Promise<any>((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(value.email, value.password)
      .then(
      res => resolve(res),
      err => reject(err))
      })
   }

   signout(){

    return new Promise((resolve, reject) => {
      if (this.fireauth.currentUser) {
      this.fireauth.signOut()
      .then(
      res => resolve(res),
      err => reject(err))
      }
      })

   }
}
