import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {ContactAuthService} from '../services/contact-auth.service'
import {ContactAccessService} from '../services/contact-access.service'
import { Compte } from '../Compte';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

  private inscriptionForm: FormGroup;
  private compte: Compte;

  constructor( private fireauth:ContactAuthService,
                private fireStor:ContactAccessService,
                private formBuilder:FormBuilder,
                private navCtrl:NavController
             ) {


              this.inscriptionForm = this.formBuilder.group({
                email:[''],
                password:[''],
                tel:[''],
                nom:[''],
                prenom:[''],
              });

              }

  ngOnInit() {}

  signUp(){
    this.fireauth.signup(this.inscriptionForm.value)
    .then(res=>{
      console.log(res);
      this.fireStor.newCompte(this.inscriptionForm.value);
      console.log("signUp.instcription.page.ts: OK");
      this.navCtrl.navigateForward('/authentification');
      
    }).catch(err=>{
      console.log("signUp.inscription.page.ts: "+err);
    })
  }

}
