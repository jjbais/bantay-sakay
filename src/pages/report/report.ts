import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as fb from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

interface Report {
  plateNumber: string;
  misbehaviour: string;
  imageUrl: string;
  other: string;
}

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  database: any;
  report: Report = { plateNumber: '', misbehaviour: '', imageUrl: '', other: '' };
  buttonText: string;
  buttonColor: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebase: FirebaseProvider,
    public toast: ToastController,
    private camera: Camera
  ) {
    this.report.plateNumber = navParams.get('plateNumber');
    this.buttonText = 'Add Image';
    this.buttonColor = 'light';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  pushData() {
    let user: fb.User = fb.auth().currentUser;
    if (this.report.misbehaviour !== '') {
      this.firebase.pushReport(user.uid, this.report.plateNumber, this.report.misbehaviour, this.report.imageUrl, this.report.other);
      this.navCtrl.popToRoot();
    } else {
      this.toast.create({
        message: 'Please Enter Driver Misbehaviour',
        duration: 3000,
        position: 'top',
        showCloseButton: true
      }).present();
    }
  }

  capture() {
    console.log('capture');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.report.imageUrl = 'data:image/jpeg;base64,' + imageData;
      this.buttonColor = 'secondary';
      this.buttonText = 'Replace Image';
    }, (err) => {
      this.buttonColor = 'light';
      this.buttonText = 'Add Image';
      this.toast.create({
        message: err,
        duration: 3000,
        position: 'top',
        showCloseButton: true
      }).present();
    });
  }

}
