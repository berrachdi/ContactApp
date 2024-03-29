import { Component, OnInit } from '@angular/core';
import {ContactAuthService} from '../services/contact-auth.service';
import {ContactAccessService} from '../services/contact-access.service';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ajouter-contact',
  templateUrl: './ajouter-contact.page.html',
  styleUrls: ['./ajouter-contact.page.scss'],
})
export class AjouterContactPage implements OnInit {
  ajouterContactForm: FormGroup;

  constructor(private fireauth: ContactAuthService,
              private firestore: ContactAccessService,
              private navCtrl: NavController,
              private formBuilder: FormBuilder) {
                console.log("constructor:ajouter-contact:ok")
    this.ajouterContactForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      tel: [''],
      adresse: [''],
      ville: [''],
      service: [''],
      });
  }
 

  ngOnInit() {
    console.log("ngOnInit:ajouter-contact:ok")
  }

  nouveauContact(){
    this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.firestore.newPersonalContact(res.email,this.ajouterContactForm.value)
        this.navCtrl.navigateForward('/liste-contacts');
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
      }, err => {
        console.log('err', err);
      })
    }

}
