import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import {ContactAuthService} from '../services/contact-auth.service';


@Component({
  selector: 'app-athentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {

  private authForm: FormGroup;

  constructor(private fireAuth: ContactAuthService,
    private formBuilder : FormBuilder,
    private navCtrl: NavController,
    private menuCtrl: MenuController) {

      this.authForm = this.formBuilder.group({
        email:[''],
        password:[''],
      })

      this.menuCtrl.enable(false);
     }

  ngOnInit() {
  
  }


  signIn(){

    this.fireAuth.signin(this.authForm.value)
    .then(res=>{
      console.log("signin.authentification.page: OK");
      this.navCtrl.navigateForward('/liste-contacts')
    }).catch(err=>{
      console.log("signin.authentification.page: "+err)
    })
  }

  signUp(){
    console.log("signup.authentification.page: OK")
    this.navCtrl.navigateForward('/inscription');
  }

}
