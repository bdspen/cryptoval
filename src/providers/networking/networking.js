var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkingConfigProvider } from '../networking-config/networking-config';
import { Coin } from '../../models/Coin';
import { StorageProvider } from '../storage/storage';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Config } from '../../config';
import { fromPromise } from 'rxjs/observable/fromPromise';
var NetworkingProvider = /** @class */ (function () {
    function NetworkingProvider(http, networkConfig, storage) {
        this.http = http;
        this.networkConfig = networkConfig;
        this.storage = storage;
    }
    NetworkingProvider.prototype.getCoinList = function () {
        var url = this.networkConfig.tickerUrl();
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    NetworkingProvider.prototype.getWatchList = function (coinIds) {
        var _this = this;
        console.log("getwatchedcoins");
        var getWatchedCoins = this.storage.getWatchedCoins()
            .then(function (coins) {
            console.log("coins " + coins);
            var coinIds;
            if (!coins)
                coinIds = Config.defaultWatchListCoins;
            if (Array.isArray(coins))
                coinIds = coins.map(function (coin) { return coin.id; });
            var urlQueue = _this.networkConfig.createTickerUrls(coinIds);
            var requests = urlQueue.map(function (url) { return _this.http.get(url); });
            return forkJoin(requests);
        })
            .catch(function (err) { return console.error(err); });
        fromPromise(getWatchedCoins)
            .mergeMap(function (responses) {
            return responses.mergeMap(function (data) {
                return data.map(function (d) {
                    console.log("json");
                    console.log(d.json());
                });
            });
        });
    };
    NetworkingProvider.prototype.requestCoinData = function () {
        var _this = this;
        this.getCoinList().subscribe(function (data) {
            var coins = data.map(function (coin) { return new Coin(coin); });
            _this.storage.setCoinResource(coins);
        });
    };
    // data?: Observable<TickerResponseCoin[]>
    NetworkingProvider.prototype.requestWatchListData = function () {
        console.log("requestWatchListData");
        this.getWatchList();
        // data.map((coins: TickerResponseCoin[]) => {
        //   return coins.map((coin: TickerResponseCoin) => new Coin(coin))
        // })
        // .catch(error => Observable.of(`Error: ${error}`))
        // .subscribe((coins: Coin[]) => {
        //   this.storage.setWatchedCoins(coins);
        // });
    };
    NetworkingProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            NetworkingConfigProvider,
            StorageProvider])
    ], NetworkingProvider);
    return NetworkingProvider;
}());
export { NetworkingProvider };
//# sourceMappingURL=networking.js.map