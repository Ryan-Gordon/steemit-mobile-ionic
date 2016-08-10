import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PostDetailPage} from '../../pages/post-detail/post-detail';
import {NewService} from '../../providers/new-service/new-service';



/*
  Generated class for the NewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/new/new.html',
  providers: [NewService]
})
export class NewPage {
  public posts: any;
  public postsArray: any;
  public arrayIndex: any;
  constructor(private navCtrl: NavController,public newPosts: NewService) {
    this.postsArray = [];

    this.loadnewPosts();


  }
  viewPost(post){
    this.navCtrl.push(PostDetailPage, {
      post: post
    });
  }

  loadnewPosts(){
    this.newPosts.load()
      .then(data => {
        this.posts = data;
        //console.log(JSON.stringify(this.posts));
        this.arrayIndex = 0;
        for (var key in data) {

          console.log(key + " -> " + data[key]);
          console.log("Post: Author -> " + data[key].author);
          console.log("Post: title -> " + JSON.stringify(data[key].root_title));
          console.log("Post: Votes -> " + JSON.stringify(data[key].net_votes));
          console.log("Post: url -> " + JSON.stringify(data[key].url));
          console.log("Post: url -> "+JSON.stringify(data[key].json_metadata));
          console.log("Post: url -> "+JSON.stringify(data[key].total_pending_payout_value));




          var string1='"image/"';



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
            body : data[key].body,
            earned:  data[key].total_pending_payout_value

          } );
          //  console.log("\n\n\n\nImage :",JSON.stringify(this.postsArray[1].imgUrl));
          console.log("Pushed post data into array");


        }



      });


  }


}
