import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SteemTrendingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SteemTrendingService {
  data:any;
  apiCallCounter: number;
  apiCallQuery: string;
  queryUrl:string;

  constructor(private http: Http) {
   this.apiCallCounter = 0;
        this.load();
      }
      load() {



        // don't have the data yet
        switch(this.apiCallCounter){
          case 1:
            this.apiCallQuery = "trending/steemit";
            break;
          case 2:
            this.apiCallQuery = "trending/introduceyourself";
            break;

          case 3:
            this.apiCallQuery = "trending/meme";
            console.log("Leaving life counter set to "+this.apiCallCounter)
                break;

          case 4:
            this.apiCallQuery = "trending/science";
            this.apiCallCounter = 0;
            console.log("Leaving life counter set to "+this.apiCallCounter)
            break;

          default:
            this.apiCallQuery = "trending";

        }//end swtich statement
        this.queryUrl = 'https://api.steemjs.com/getState?path=/'+this.apiCallQuery+'&scope=content';

        console.log("Starting Promise");
        return new Promise(resolve => {
          // We're using Angular HTTP provider to request the data,
          // then on the response, it'll map the JSON data to a parsed JS object.
          // Next, we process the data and resolve the promise with the new data.
          this.http.get(this.queryUrl)
            .map(res => res.json())
            .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference


              this.data = data;
              console.log("Currently inside the service ");
              //console.log(JSON.stringify(this.data));
              resolve(this.data);
              console.log("Leaving the service \n\n ");
              this.apiCallCounter++;
              console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"+this.apiCallCounter+"\n\n Query URL :"+this.queryUrl);
            });
        });


  }
}



