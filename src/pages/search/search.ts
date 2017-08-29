import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportPage } from '../report/report';
import { ToastController } from 'ionic-angular';
import * as fb from 'firebase';

interface Driver {
  plateNumber: string;
  address: string;
  driverName: string;
  licenseNumber: string;
  route: string;
  type: string;
}

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  driver: Driver = { plateNumber: '', address: '', driverName: '', licenseNumber: '', route: '', type: '' };
  isDriverAvailable: boolean = false;
  drivers: Driver[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController
  ) {
    fb.database().ref('/drivers').once('value').then((data) => {
      data.forEach((childData) => {
        let driver: Driver = { plateNumber: '', address: '', driverName: '', licenseNumber: '', route: '', type: '' };;
        driver.plateNumber = childData.key;
        driver.address = childData.val().address;
        driver.driverName = childData.val().driverName;
        driver.licenseNumber = childData.val().licenseNumber;
        driver.route = childData.val().route;
        driver.type = childData.val().type;
        this.drivers.push(driver);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  search() {
    this.driver.plateNumber = this.driver.plateNumber.toUpperCase();
    if (this.drivers.indexOf(this.drivers.find((driver: Driver)=> driver.plateNumber === this.driver.plateNumber )) > -1) {
      this.driver = this.drivers.find((driver: Driver)=> driver.plateNumber === this.driver.plateNumber);
      this.isDriverAvailable = true;
    } else {
      this.toast.create({
        message: 'Driver Not Found',
        duration: 3000,
        position: 'top',
        showCloseButton: true
      }).present();
      this.isDriverAvailable = false;
    }
  }

  report() {
    this.navCtrl.push(ReportPage, { plateNumber: this.driver.plateNumber });
  }

}
