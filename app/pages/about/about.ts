import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SteemTrendingService} from '../../providers/steem-trending-service/steem-trending-service';
import {PostDetailPage} from '../../pages/post-detail/post-detail';
import {isUndefined} from "ionic-angular/util/util";


@Component({
  templateUrl: 'build/pages/about/about.html',
  providers: [SteemTrendingService]
})
export class AboutPage {
   public posts: any;
   public arr:any;
   public postsArray: any;
   public arrayIndex: any;
  public imagesArray: string[];
  constructor(private navCtrl: NavController,public trendingPosts: SteemTrendingService) {
    this.postsArray = [];

    this.loadPeople();
  }
  viewPost(post){
    this.navCtrl.push(PostDetailPage, {
      post: post
    });
  }

  loadPeople(){
  this.trendingPosts.load()
  .then(data => {
    this.posts = data;
    //console.log(JSON.stringify(this.posts));
    this.arrayIndex = 0;
    for (var key in data) {
      //parsing the nested json object
      //we do this to extract the image property as directly accessing proved cumbersome

      var imageKey = JSON.parse(data[key].json_metadata);

      console.log(imageKey);
      console.log("Image "+imageKey.image);
      var imageString;
      imageString = imageKey.image+' ,';
      var imageArray = [];

      imageArray = imageString.split(",");

      var thumbnail:string;
      if (typeof imageArray[1] === "undefined"){
        thumbnail = imageString;
        console.log("Found an undefined\n\n\n\n\n");
        if (typeof imageKey.image === "undefined"){

          console.log("still undefined \n\n\n");
          thumbnail = null;
        }


      }
      else{
        thumbnail = imageArray[1];
        //png images had some issue loading on mobile
        //if one is found , we change the thumbnail to the second image if any
        if (thumbnail.endsWith("png")){
          thumbnail= imageArray[2];

        }
      }


      console.log(key + " -> " + data[key]);
      console.log("Post: Author -> " + data[key].author);
      console.log("Post: title -> " + JSON.stringify(data[key].root_title));
      console.log("Post: Votes -> " + JSON.stringify(data[key].net_votes));
      console.log("Post: url -> " + JSON.stringify(data[key].url));
      console.log("Post: url -> "+JSON.stringify(data[key].total_pending_payout_value));
      console.log(thumbnail);
      console.log("Image 1 (if any): "+ imageArray[1]);
      console.log("Image 2 (if any): "+imageArray[2]);
      console.log("Image 3 (if any): "+imageArray[3]);




      //data[key].json_metadata.resolve;
      this.arrayIndex++;


      this.postsArray.push({
          key: key,
          author: data[key].author,
          title: data[key].root_title,
          votes: data[key].net_votes,
          url:JSON.stringify(data[key].url),
          repliesLength: data[key].replies.length,
          replies: data[key].replies.length,
          created: data[key].created,
          earned: data[key].total_pending_payout_value,
          imgUrl: thumbnail,
          body: data[key].body

      } );
      console.log("Pushed post data into array");


                }



  });


}}
