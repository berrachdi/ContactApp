import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Contact } from '../Contact';
import { NavController } from '@ionic/angular';
import { ContactAccessService } from '../services/contact-access.service';
import {ContactAuthService} from '../services/contact-auth.service';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.page.html',
  styleUrls: ['./liste-contacts.page.scss'],
})
export class ListeContactsPage implements OnInit {
  contacts: Contact[];
  email: string;
  

  constructor(private menuCtrl: MenuController,
    private navCtrl: NavController,
    private firestore: ContactAccessService,
    private fireAuth: ContactAuthService) {

    this.menuCtrl.enable(true);
}



  ngOnInit() {
    this.fireAuth.userDetails().subscribe(res => {
      console.log('res', res);
      if(res !== null){
        this.email = res.email;
        this.loadContact();
      }else {
        this.navCtrl.navigateForward('/authentification');
      }
    });
    console.log(this.contacts);
  
  }

  loadContact() {
    this.firestore.getAllPersonalContact(this?.email).subscribe(data => {
      this.contacts = data.map(e => ({
        nom: e.payload.doc.data().nom,
        prenom: e.payload.doc.data().prenom,
        email: e.payload.doc.data().email,
        tel: e.payload.doc.data().tel,
        ville: e.payload.doc.data().ville,
        adresse: e.payload.doc.data().adresse,
        service: e.payload.doc.data().service,
      }));
    });
  }

  detailsContact(email){
    let navigationExtras: NavigationExtras = {
      queryParams: {
      emailContact: email
      }
    };
      this.navCtrl.navigateForward('/detail-contact', navigationExtras);
    }

    ajouterContact(){
      console.log("ajouterContact:list-contacts:ok")
        this.navCtrl.navigateRoot('/ajouter-contact');
        }
    
}
