import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkingProvider } from '../providers/networking/networking';
import { StorageProvider, Stores } from '../providers/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private networking: NetworkingProvider,
    private storage: StorageProvider     
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.storage.clearAllData();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.hasData(Stores.coinResource);
      console.log("init");
      this.networking.requestWatchListData();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
