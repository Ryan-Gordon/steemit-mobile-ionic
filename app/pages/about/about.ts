import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SteemTrendingService} from '../../providers/steem-trending-service/steem-trending-service';

@Component({
  templateUrl: 'build/pages/about/about.html',
  providers: [SteemTrendingService]
})
export class AboutPage {
   public posts: any;
   public arr:any;
   public postsArray: any;
   public arrayIndex: any;
  constructor(private navCtrl: NavController,public trendingPosts: SteemTrendingService) {
    this.postsArray = [];
   
    this.loadPeople();
  }

  loadPeople(){
  this.trendingPosts.load()
  .then(data => {
    this.posts = data;
    //console.log(JSON.stringify(this.posts));

    for (var key in data) {
      this.arrayIndex = 0;       
      console.log(key + " -> " + data[key]);
      console.log("Post: Author -> " + data[key].author);
      console.log("Post: title -> " + JSON.stringify(data[key].root_title));
      console.log("Post: Votes -> " + JSON.stringify(data[key].net_votes));
      console.log("Post: url -> " + JSON.stringify(data[key].url));

    
                  
      this.postsArray.push({
          key: key,
          author: data[key].author,
          title: data[key].root_title,
          votes: JSON.stringify(data[key].net_votes),
          url:JSON.stringify(data[key].url),
          repliesLength: data[key].replies.length,
          replies: data[key].replies.length,
          created: data[key].created,
          imgUrl: data[key].json_metadata.image
         
      } );
      console.log("\n\n\n\nImage :",JSON.stringify(this.postsArray));
      console.log("Pushed post data into array");
      this.arrayIndex++;
                
                }


    
  });

 
}}
