import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingProvider } from '../../providers/networking/networking';
import { Coin } from '../../models/Coin';
import { StorageProvider } from '../../providers/storage/storage';
import { Config } from '../../config';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    NetworkingProvider
  ]
})
export class HomePage {

  config;
  coins: Coin[];
  @Input() set searchCoin(value: string){
    if(value.length >= 3){
      //search web for the string.
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private networking: NetworkingProvider,
    private storage: StorageProvider
  ) {}

  ionViewDidLoad() {
    this.config = Config; 
    console.log('ionViewDidLoad HomePage');
    this.storage.getWatchedCoins()
      .then(data => {
        this.coins = data;
        console.log("home coinsvvvvv");
        console.log(this.coins);
      });
  }

}