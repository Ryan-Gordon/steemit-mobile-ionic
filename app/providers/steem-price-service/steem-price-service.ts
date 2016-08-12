import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SteemPriceService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SteemPriceService {
  data:any;
  data2: any;

  constructor(private http: Http) {
    this.loadSteemPrice();
    //this.loadSbdPrice();

  }
  loadSteemPrice() {

    // don't have the data yet
    console.log("Starting steem Promise");
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.

      //https://poloniex.com/support/api/
      //Use this doc to work the api
      this.http.get(' https://poloniex.com/public?command=returnChartData&currencyPair=BTC_STEEM&start=1405699200&end=9999999999&period=14400')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference


          this.data = data;
          console.log("Currently inside the service ");
          console.log(JSON.stringify(this.data));
          resolve(this.data);
          console.log("Leaving the service \n\n ");
        });
    });


  }
  loadSbdPrice() {

    // don't have the data yet
    console.log("Starting sbd Promise");
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.


      //https://poloniex.com/support/api/
      //Use this doc to work the api
      this.http.get('https://poloniex.com/public?command=returnTicker&currencyPair=BTC_SBD')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference

          this.data2 = data;
          console.log("Currently inside the service ");
          //console.log(JSON.stringify(this.data));
          resolve(this.data2);
          console.log("Leaving the service \n\n ");
        });
    });


  }

}

