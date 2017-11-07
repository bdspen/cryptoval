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

  setWatchedCoins(value: Array<Coin>): Promise<any> {
    return this.storage.set(Stores.watched, value);
  }

  clearAllData(): void {
      this.storage.clear();
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

  hasData(store: Stores): void {
    this.storage.keys()
    .then(keys => {
      console.log(keys)
    });
  }

  getWatchedCoins(): Promise<Coin[]>{
    return this.storage.get(Stores.watched);
  }

  setCoinResource(value: Array<Coin>): Promise<any> {
  console.log("setting coin resource");
    return this.storage.set(Stores.coinResource, value);
  }

  getCoinResource(): Promise<Coin[]> {
      console.log("getting coin resource");
    return this.storage.get(Stores.coinResource);
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
