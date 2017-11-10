import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Coin } from '../../models/Coin';
import { Config } from '../../config';
import 'rxjs/add/operator/map';

export enum Stores {
  coinResource = "coinResource",
  watched = "watched"
};

@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {}

  /* Coin watchlist ----------------------------------------*/
  getWatchedCoins(): Promise<Coin[]>{
    return this.storage.get(Stores.watched);
  }

  setWatchedCoins(value: Array<Coin>): Promise<any> {
    return this.storage.set(Stores.watched, value);
  }


  /* All coin list/coin resource -----------------------------*/
  setCoinResource(value: Array<Coin>): Promise<any> {
    console.log("setting coin resource");
      return this.storage.set(Stores.coinResource, value);
    }
  
    getCoinResource(): Promise<Coin[]> {
      console.log("getting coin resource");
      return this.storage.get(Stores.coinResource);
    }

  getWatchedCoinsAndSync(): void {
    Promise.all([
      this.getWatchedCoins(),
      this.getCoinResource()]
    )
    .then((results: Array<Coin[]>) => {
      const updatedCoins: Array<Coin> = this.updateSelectedCoins.apply(this, results);
      this.setWatchedCoins(updatedCoins);
    });
  }

  clearAllData(): void {
    this.storage.clear();
  }

  hasData(store: Stores): void {
    this.storage.keys()
    .then(keys => {
      console.log(keys)
    });
  }

  private updateSelectedCoins(coins: Array<Coin>, resource: Array<Coin>): Array<Coin> {
    coins.forEach((coin: Coin, i: number) => {
      resource.forEach((resourceCoin: Coin, j: number) => {
        if(coin.id === resourceCoin.id){
          coins[i] = Object.assign(coins[i], resource[j]);
        }
      });
    });
    return coins;
  }

}
