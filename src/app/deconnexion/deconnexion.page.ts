import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.page.html',
  styleUrls: ['./deconnexion.page.scss'],
})
export class DeconnexionPage implements OnInit {

  constructor(private fireauth:ContactAuthService,private navCtrl:NavController) { }

  ngOnInit() {
  }

  signOut(){
    this.fireauth.signout()
    .then(res=>{
      console.log("signOut:deconnexion.page:");
      this.navCtrl.navigateRoot('/authentification');

    }).catch(err=>{
      console.log("signOut:deconnexion.page:"+err)
    })
  }

}
