import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {SteemTrendingService} from '../../providers/steem-trending-service/steem-trending-service';
import {PostDetailPage} from '../../pages/post-detail/post-detail';


@Component({
  templateUrl: 'build/pages/trending/trending.html',
  providers: [SteemTrendingService]
})
export class TrendingPage {
   private posts: any;
   private postsArray: any;
   private apiCallCounter: number;
  constructor(private navCtrl: NavController,public trendingPosts: SteemTrendingService, private loadingCtrl: LoadingController) {
    this.presentLoadingText();
    this.postsArray = [];
    this.apiCallCounter = 0;

    this.loadTrendingPosts();
  }
  viewPost(post){
    this.navCtrl.push(PostDetailPage, {
      post: post
    });
  }

  loadTrendingPosts() {
    this.apiCallCounter++;

    //optional feature
    // on second or nth call
    //this.postsArray.splice(0,this.postsArray.length);
    //clear entire array of posts and fill again
    // can be done on every nth refresh or every refresh
    if (this.apiCallCounter % 4 == 0){
      this.postsArray.splice(0,this.postsArray.length);
    }

    /*if (this.apiCallCounter %3 = 0){
     this.postsArray.splice(0,this.postsArray.length);
    }


     */
  this.trendingPosts.load()
  .then(data => {
    this.posts = data;

    for (var key in data) {
      //parsing the nested json object
      //we do this to extract the image property as directly accessing proved cumbersome

      var imageKey = JSON.parse(data[key].json_metadata);
      var imageString = imageKey.image+' ,';
      var imageArray = [];

      imageArray = imageString.split(",");

      var thumbnail:string;
      //here we begin checking for possible errors
      //if we got an undefined result we will want to change that to null so it does not show
      //some png have issues being loaded, we will try to replace these with a second or third provided photo if available
      if (typeof imageArray[1] === "undefined"){
        thumbnail = imageString;
        console.log("Array returned an undefined");
        if (typeof imageKey.image === "undefined"){

          console.log("the image returned undefined, setting to null");
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
        else if (thumbnail.startsWith("https://lh3.googleusercontent.com")) {
          //do this
          thumbnail = null;
        }
      }//end image formatting

      /*

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
      */
      //I am using unshift here to place new items to the front of the array
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
          body: data[key].body,
          comments: data[key].children,
          commentsContent: data[key].replies

      } );
      console.log("Pushed post data into array");
    }//end iteration of data



  });//end .then call
  }//end loadTrendingPosts()

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.loadTrendingPosts();

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  presentLoadingText() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading posts, please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }
}//end component
