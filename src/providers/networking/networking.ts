import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkingConfigProvider } from '../networking-config/networking-config';
import { Observable } from 'rxjs/Rx';
import { Coin } from '../../models/Coin';
import { StorageProvider } from '../storage/storage';
import { TickerResponseCoin } from '../../models/apiResponses';
import { forkJoin } from "rxjs/observable/forkJoin";
import { mergeMap } from "rxjs/operator/mergeMap";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Response } from '@angular/http/src/static_response';
import { Config } from '../../config';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class NetworkingProvider {

  constructor(
    private http: Http,
    private networkConfig: NetworkingConfigProvider,
    private storage: StorageProvider
  ) { }

  private getCoinList(): Observable<TickerResponseCoin[]> {
    const url = this.networkConfig.tickerUrl();
    return this.http.get(url)
      .map(res => res.json());
  }

  private getWatchList(coinIds?: string[]): Observable<TickerResponseCoin[]> {

    console.log("getwatchedcoins");

    const getWatchedCoins = this.storage.getWatchedCoins()
      .then((coins: Coin[]) => {
        console.log(`coins ${coins}`);
        let coinIds: string[];

        if(!coins) coinIds = Config.defaultWatchListCoins;
        if(Array.isArray(coins)) coinIds = coins.map((coin: Coin) => coin.id);

        const urlQueue: string[] = this.networkConfig.createTickerUrls(coinIds);
        const requests: Observable<Response>[] = urlQueue.map((url: string) => this.http.get(url));
        return forkJoin(requests);
      })
      .catch(err => console.error(err));
      
    return fromPromise(getWatchedCoins)
      .map((responses: Observable<Response[]>): TickerResponseCoin[] => {
        return responses.map((res) => {
          console.log(res);
        })
      });
    

  }

  requestCoinData(): void {
    this.getCoinList().subscribe(data => {
      const coins: Coin[] = data.map((coin: TickerResponseCoin): Coin => new Coin(coin));
      this.storage.setCoinResource(coins);
    });
  }
// data?: Observable<TickerResponseCoin[]>
  requestWatchListData(): void {
    console.log("requestWatchListData");
    this.getWatchList()
    // .subscribe((tickerResponseCoinObservables: Observable<TickerResponseCoin[]>) => {
    //   tickerResponseCoinObservables
      
    // })
  }

}
