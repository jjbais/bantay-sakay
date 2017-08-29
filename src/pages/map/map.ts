import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions
 } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: GoogleMap;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private googleMaps: GoogleMaps, 
    private geolocation: Geolocation
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
   
    this.map = this.googleMaps.create(element);
   
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );



     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      let latlng = new LatLng(data.coords.latitude, data.coords.longitude);
      let position: CameraPosition = {
        target: latlng,
        zoom: 18,
        tilt: 30
      };
      this.map.moveCamera(position);
      let markerOptions: MarkerOptions = {
        position: latlng //new LatLng(response.coords.latitude, response.coords.longitude),
      };
      this.map.clear();
      this.map.addMarker(markerOptions);
     });
   
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition().then((response) => {
      let latlng = new LatLng(response.coords.latitude, response.coords.longitude);
      let position: CameraPosition = {
        target: latlng,
        zoom: 18,
        tilt: 30
      };
      this.map.moveCamera(position);
      let markerOptions: MarkerOptions = {
        position: latlng //new LatLng(response.coords.latitude, response.coords.longitude),
      };
      this.map.clear();
      this.map.addMarker(markerOptions);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
