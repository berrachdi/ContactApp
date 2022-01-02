import { Injectable } from '@angular/core';
import { Compte } from '../Compte';
import { AngularFirestore } from '@angular/fire/firestore'
import { Contact } from '../Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactAccessService {


  constructor( private firestore: AngularFirestore) { }

  compteRef:AngularFirestore;

  // Get Compte
  getCompte(id: String) {
    console.log("hello world:"+id);
    return this.firestore.doc('/Compte/'+id).valueChanges();
  }
  newCompte(value){
    this.firestore.collection('/Compte').doc(value.email).set(JSON.parse(JSON.stringify(value)));
   }
   getAllCompte() {
    return this.firestore.collection('/Compte/').snapshotChanges();
  }



 

  getAllPersonalContact(id) {
    return this.firestore.doc('/Compte/'+id).collection('/Contacts').snapshotChanges();
  }
  getPersonalContact(id1: string, id2: string ) {
    return this.firestore.doc('/Compte/'+id1).collection('/Contacts').doc(id2).valueChanges();
    }

  newPersonalContact(id, contact) {
    return this.firestore.doc('/Compte/'+id).collection('/Contacts/').doc(contact.email).set(JSON.parse(JSON.stringify(contact)));
  }

  // contact commune
  getAllContact() {
    return this.firestore.collection('/Contacts/').snapshotChanges();
    }
    getContact(id: String) {
      return this.firestore.doc('/Contacts/'+id).valueChanges();
    }


    delateContactPersonel(id1: string, id2: string ){
      return this.firestore.doc('/Compte/'+id1).collection('/Contacts').doc(id2).delete();
      }


      newContact(contact) {
        return this.firestore.collection('/Contacts').doc(contact.email).set(contact);
        }


        
      updateContact(updateContact){
        console.log(updateContact);
        return this.firestore.collection('/Contacts').doc(updateContact.email).set(updateContact);

      }

      setPersonalContact(id1: string, id2: string, contact: Contact) {
        this.firestore.doc('/Compte/'+id1).collection('/Contacts').doc(id2).delete();
        return this.firestore.doc('/Compte/'+id1).collection('/Contacts').doc(contact.email).set(contact);
      }



  
}
