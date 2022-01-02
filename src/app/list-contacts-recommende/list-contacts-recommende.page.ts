import { Component, OnInit } from '@angular/core';
import { Contact } from '../Contact';
import { ContactAccessService } from '../services/contact-access.service';
import {MenuController, NavController} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-list-contacts-recommende',
  templateUrl: './list-contacts-recommende.page.html',
  styleUrls: ['./list-contacts-recommende.page.scss'],
})
export class ListContactsRecommendePage implements OnInit {

  contacts: Contact[];
  email: string;

  constructor(private menuCtrl: MenuController,
              private navCtrl: NavController,
              private firestore: ContactAccessService) { }

  ngOnInit() {
    this.loadContact();
  }

  loadContact() {
    this.firestore.getAllContact().subscribe( data => {
      this.contacts = data.map(e => ({
        nom: e.payload.doc.data()['nom'],
        prenom: e.payload.doc.data()['prenom'],
        email: e.payload.doc.data()['email'],
        tel: e.payload.doc.data()['tel'],
        ville: e.payload.doc.data()['ville'],
        adresse: e.payload.doc.data()['adresse'],
        service: e.payload.doc.data()['service'],
      }));
      console.log(this.contacts);
    });
  }

  detailsContact(email){
    let navigationExtras: NavigationExtras = {
    queryParams: {
    emailContact: email,
    from:"liste-contacts-rec"
    }
    };
    this.navCtrl.navigateForward('/detail-contact', navigationExtras);
    }

}
