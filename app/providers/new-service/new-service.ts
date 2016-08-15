import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the SteemTrendingService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class NewService {
  data:any;
  queryUrl:any;
  created : any;

  apiCallCounter: number;
  apiCallQuery: string;


  constructor(private http: Http) {
    this.apiCallCounter = 0;
    this.load();
  }
  load() {
    // don't have the data yet
    switch(this.apiCallCounter){
      case 1:
        this.apiCallQuery = "created/steemit";
        break;
      case 2:
        this.apiCallQuery = "created/introduceyourself";
        break;

      case 3:
        this.apiCallQuery = "created/meme";

        break;

      case 4:
        this.apiCallQuery = "created/science";
        this.apiCallCounter = 0;
        console.log("Resetting counter set to "+this.apiCallCounter);
        break;

      default:
        this.apiCallQuery = "created";

    }//end swtich statement
    this.queryUrl = 'https://api.steemjs.com/getState?path=/'+this.apiCallQuery+'&scope=content';
    console.log("Starting Promise");
    return new Promise(resolve => {
     
          // We're using Angular HTTP provider to request the data.
          // request is coming from fabien's SteemJS restful service
          // After this call we process and save the post data
          this.http.get(this.queryUrl)
            .map(res => res.json())
            .subscribe(data => {
              // we've got back the post data now we save it
              // and and increment the counter so it does not pull the same call

              this.data = data;
              resolve(this.data);
              this.apiCallCounter++;
              //console.log(" Query URL :"+this.queryUrl);
            });
    });


  }
}




