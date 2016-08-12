import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SteemPriceService} from '../../providers/steem-price-service/steem-price-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [SteemPriceService]
})
export class HomePage {
  private steemPriceObject: any;
  private steem: any;
  private sbdPriceObject: any;
  private sbdPrices: any;
  constructor(private navCtrl: NavController, private steemPrices: SteemPriceService) {
    this.steemPriceObject = [];
    this.steem = [];
    this.loadSteem();
    this.loadSbd();



  }

  loadSteem(){

    this.steemPrices.loadSteemPrice()
      .then(data => {
        this.steem = data;

        //console.log(JSON.stringify(this.steem));
        console.log("Asks : "+JSON.stringify(this.steem));
        console.log("Last"+JSON.stringify(this.steem.last));

      })
  }
  loadSbd(){

    this.steemPrices.loadSbdPrice()
      .then(data => {
        this.sbdPrices = data;

        //console.log(JSON.stringify(this.sbdPrices));

      })
  }



}
