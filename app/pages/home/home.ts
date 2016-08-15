import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {SteemPriceService} from '../../providers/steem-price-service/steem-price-service';
//import {PercentChange} from '../../pipes/percentChangePipe';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [SteemPriceService]
  //pipes: [PercentChange]      for future update , creating a pipe that filters the percentChange
})
export class HomePage {
  private steemPriceObject: any;
  private steem: any;
  private sbdPriceObject: any;
  private sbdPrices: any;
  private percentChange: any;
  private dollarBtc: any;
  private steemDollarVal : number;
  private sbdDollarVal :number;
  constructor(private navCtrl: NavController, private steemPrices: SteemPriceService,private loadingCtrl: LoadingController) {

    this.steemPriceObject = [];
    this.steem = [];
    this.sbdPrices=[];
    this.steemDollarVal =0;
    this.sbdDollarVal =0;
    this.loadSteem();
    this.loadSbd();
    this.converttoUSD();

  }

  loadSteem(){

    this.steemPrices.loadSteemPrice()
      .then(data => {
        this.steem = data;


      });
  }
  loadSbd(){

    this.steemPrices.loadSbdPrice()
      .then(data => {
        this.sbdPrices = data;

      });
  }
  converttoUSD(){

    this.steemPrices.btcToUsd()
    .then(data => {
        this.dollarBtc = data;
        this.steemDollarVal = this.steem.last * this.dollarBtc.last;
        this.sbdDollarVal = this.sbdPrices.last * this.dollarBtc.last;
     console.log(this.steemDollarVal);
     console.log(this.dollarBtc.last);
    });

  }
  refreshPrice(){
    this.loadSteem();
    this.loadSbd();
    this.converttoUSD();

  }
  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Market data...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }




}
