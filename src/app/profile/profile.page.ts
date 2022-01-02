import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Compte } from '../Compte';
import { ContactAccessService } from '../services/contact-access.service';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image: String; 

  compte: Compte;
  email: String;

  constructor(private contactservice:ContactAccessService,
     private fireauth: ContactAuthService,
     private navCtrl:NavController) { 

}

  ngOnInit() {

    this.fireauth.userDetails().subscribe(res=>{

      console.log("res:"+res);
      if(res !== null){
        this.email = res.email;
        console.log("email:"+this.email);
        this.contactservice.getCompte(this.email).subscribe(res=>{
          this.compte=res as Compte;
          console.log(res);
        })
      }else{
        this.navCtrl.navigateForward('/authentification');
      }
    },err=>{
      console.log('err',err);
    }    
    )

   
   
  }

}
