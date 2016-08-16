import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {TrendingPage} from '../trending/trending';
import {ContactPage} from '../contact/contact';
import {NewPage} from '../new/new';
import {PopularPage} from '../popular/popular';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;
  private tab5Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = TrendingPage;
    this.tab3Root = ContactPage;
    this.tab4Root = NewPage;
  this.tab5Root= PopularPage;
  }
}
