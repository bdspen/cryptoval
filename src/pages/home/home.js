var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkingProvider } from '../../providers/networking/networking';
import { StorageProvider } from '../../providers/storage/storage';
import { Config } from '../../config';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, networking, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.networking = networking;
        this.storage = storage;
    }
    Object.defineProperty(HomePage.prototype, "searchCoin", {
        set: function (value) {
            if (value.length >= 3) {
                //search web for the string.
            }
        },
        enumerable: true,
        configurable: true
    });
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.config = Config;
        console.log('ionViewDidLoad HomePage');
        this.storage.getWatchedCoins()
            .then(function (data) {
            _this.coins = data;
            console.log("home coinsvvvvv");
            console.log(_this.coins);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], HomePage.prototype, "searchCoin", null);
    HomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
            providers: [
                NetworkingProvider
            ]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            NetworkingProvider,
            StorageProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map