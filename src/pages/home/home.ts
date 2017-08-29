import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoginPage } from '../login/login'
import { MapPage } from '../map/map';
import { SearchPage } from '../search/search';
import * as fb from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public firebase: FirebaseProvider
  ) {
    fb.auth().onAuthStateChanged((user) => {
      if (!user) {
        navCtrl.setRoot(LoginPage);
      }
    });
  }

  ionViewCanEnter() {
    var user = fb.auth().currentUser;
    
    if (user) {
      return true
    }else{
      return false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  signOut(){
    this.firebase.signOut();
  }

  toMap(){
    this.navCtrl.push(MapPage);
  }

  toSearch(){
    this.navCtrl.push(SearchPage);
  }

}
