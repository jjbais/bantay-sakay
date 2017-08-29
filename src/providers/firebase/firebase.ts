import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as fb from 'firebase';
import { ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  isSignedIn: boolean;

  constructor(
    public http: Http, 
    public toast: ToastController,
    public splashScreen: SplashScreen
  ) {
    console.log('Hello FirebaseProvider Provider');

    const config = {
      apiKey: "AIzaSyD7AFhWQOmR24bOJYp2Q6RU4K3kJsGdE7s",
      authDomain: "bantaysakay-71324.firebaseapp.com",
      databaseURL: "https://bantaysakay-71324.firebaseio.com",
      projectId: "bantaysakay-71324",
      storageBucket: "bantaysakay-71324.appspot.com",
      messagingSenderId: "410734717181"
    };

    fb.initializeApp(config);
  }

  signIn(email: string, password: string): void {
    this.splashScreen.show();
    fb.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.splashScreen.hide();
      this.toast.create({
        message: 'User logged in.',
        duration: 5000,
        position: 'top',
        showCloseButton: true
      }).present();
    }, (error) => {
      this.toast.create({
        message: error.message,
        duration: 5000,
        position: 'top',
        showCloseButton: true
      }).present();
    });

  }

  signOut(): void {
    this.splashScreen.show();
    fb.auth().signOut().then(() => {
      this.splashScreen.hide();
      this.toast.create({
        message: 'User logged out.',
        duration: 5000,
        position: 'top',
        showCloseButton: true
      }).present();
    }).catch((error) => {
      this.toast.create({
        message: error.message,
        duration: 5000,
        position: 'top',
        showCloseButton: true
      }).present();
    });
  }

  register(email: string, password: string) {
    this.splashScreen.show();
    fb.auth().createUserWithEmailAndPassword(email, password).then(() => {
      this.splashScreen.hide();
      this.toast.create({
        message: 'Registered Successfully',
        duration: 5000,
        position: 'top',
        showCloseButton: true
      }).present();
    }, (error) => {
      this.toast.create({
        message: error.message,
        duration: 5000,
        position: 'top',
        showCloseButton: true
      }).present();
    });
  }

  pushReport(uId: string, plateNumber: string, misbehaviour: string, imageUrl: string = '') {
    this.splashScreen.show();
    let date = new Date().toISOString();
    let ref = 'images/' + date + '.jpg';
    fb.storage().ref().child(ref).putString(imageUrl, 'data_url').then(() => {
      fb.database().ref('reports/').push({
        uId: uId,
        plateNumber: plateNumber,
        misbehaviour: misbehaviour,
        image: ref,
        timestamp: date
      }).then(() => {
        this.splashScreen.hide();
        this.toast.create({
          message: 'Report has been issued.',
          duration: 5000,
          position: 'top',
          showCloseButton: true
        }).present();
      }, (error) => {
        this.toast.create({
          message: error.message,
          duration: 5000,
          position: 'top',
          showCloseButton: true
        }).present();
      });
    }, (error) => {
      this.toast.create({
        message: error.message,
        duration: 5000,
        position: 'top',
        showCloseButton: true
      }).present();
    });

  }

}
