import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NavParams} from 'ionic-angular';
import {Platform, Page} from 'ionic-angular';

/*
  Generated class for the PostDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/post-detail/post-detail.html',
})
export class PostDetailPage {
  private title;
  private author;
  private votes;
  private created;
  private replies;
  private url;
  private body;
  private imageUrl;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.title = this.navParams.get('post').title;
    this.author = this.navParams.get('post').author;
    this.body = this.navParams.get('post').body;
    this.created = this.navParams.get('post').created;
    this.url = this.navParams.get('post').url;
    this.replies = this.navParams.get('post').replies;
    this.votes = this.navParams.get('post').votes;
    this.imageUrl = this.navParams.get('post').imgUrl;


    console.log("\n\n\nReceived these items: ");
    console.log("\n\n Title:"+this.title+" \n\nAuthor: "+this.author+"  \n\nUrl: "+this.url);
    console.log("\n Body:"+this.body);

  }

  viewPost(post){
    this.navCtrl.push(PostDetailPage, {
      post: post
    });
  }
   launch() {

            window.open("http://steemit.com"+this.url);
    }

}
