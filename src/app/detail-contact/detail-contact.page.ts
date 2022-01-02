import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Contact } from '../Contact';
import { ContactAccessService } from '../services/contact-access.service';
import { ContactAuthService } from '../services/contact-auth.service';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {
  emailContact:string;
  from:string;
  contact: Contact;
  nom: string;
  prenom:string;
  address:string;
  tel:string;
  service:string;
  ville:string;
  contactUpdate:Contact;
  IsunLocked: boolean;
  
  private isButtonsVisible=false;

  constructor(private contactservice:ContactAccessService,
    private fireauth :ContactAuthService,
    private firestore: ContactAccessService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
      this.route.queryParams.subscribe(params => {
      this.emailContact = params["emailContact"];
      this.from=params["from"];
      if (this.from=== "liste-contacts-rec"){
        this.isButtonsVisible = false;
        this.IsunLocked = true;
      }
      else{
        this.isButtonsVisible = true;
        this.IsunLocked = true;
      }
    });

   
     
     


    
}

  ngOnInit() {
    if (this.from==="liste-contacts-rec")
    this.recommande();
    else
    this.personel();
  }

  personel(){
      this.fireauth.userDetails().subscribe(res => {
        console.log('res', res);
        if (res !== null) {
          this.contactservice.getPersonalContact(res.email,this.emailContact).subscribe(res => {
          this.contact=<Contact>res ;
          console.log(res);
          })
        } else {
         this.navCtrl.navigateForward('/authentification');
        }
        }, err => {
        console.log('err', err);
        }
      )
    }


    recommande(){
      this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.contactservice.getContact(this.emailContact).subscribe
        (res => {
        this.contact=<Contact>res ;
        console.log(res);
        })
      } else {
        this.navCtrl.navigateForward('/authentification');
      }
      }, err => {
          console.log('err', err);
      })

  
    }

    Supprimer(){
      this.fireauth.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
      this.contactservice.delateContactPersonel(res.email,this.contact.email);
      this.navCtrl.navigateForward('/liste-contacts');
      } else {
      this.navCtrl.navigateForward('/authentification');
      }
      }, err => {
      console.log('err', err);
      })
      }

      Partager(){
        this.fireauth.userDetails().subscribe(res => {
        console.log('res', res);
        if (res !== null) {
        this.firestore.newContact(this.contact)
        this.navCtrl.navigateForward('/list-contacts-recommende');
        } else {
        this.navCtrl.navigateForward('/authentification');
        }
        }, err => {
        console.log('err', err);
        })
        }

        Modifier(){
          this.IsunLocked = false;
        //   this.fireauth.userDetails().subscribe(res => {
        //     if(res!== null){
        //      this.contactUpdate.email =  this.contact.email;
        //      this.contactUpdate.nom = this.nom;
        //      this.contactUpdate.prenom = this.prenom;
        //      this.contactUpdate.service = this.service;
        //      this.contactUpdate.ville = this.ville;
        //      this.contactUpdate.tel = this.tel;
        //      this.contactUpdate.adresse = this.address;


        //       this.firestore.updateContact(this.contactUpdate);
        //       this.navCtrl.navigateForward('/list-contacts-recommende');
        //     }
        //   })

       }

       updateContact(){
         
        this.fireauth.userDetails().subscribe(res => {
          console.log('res', res);
          if (res !== null) {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            this.contactservice.setPersonalContact(res.email, this.emailContact, this.contact);
    
            this.navCtrl.navigateForward('/liste-contacts');
          } else {
            this.navCtrl.navigateForward('/authentification');
          }
        }, err => {
          console.log('err', err);
        });
        console.log(this.contact);
      }
}

 
