import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { HomePage } from '../../pages/home/home';
import * as fb from 'firebase';

interface User{
  email: string;
  password: string;
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  auth: any = 'signIn';
  user: User = {email: '',password: ''};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebase: FirebaseProvider
  ) {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        navCtrl.setRoot(HomePage);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn(){
    this.firebase.signIn(this.user.email, this.user.password);
  }

  register(){
    this.firebase.register(this.user.email, this.user.password);
  }

}


