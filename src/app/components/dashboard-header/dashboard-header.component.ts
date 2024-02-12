import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {  MENU_ICON, REFRESH_ICON, LIST_VIEW_ICON, SETTING_ICON, SEARCH_ICON } from 'src/assets/icons';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit,OnDestroy {
  subscription!:Subscription;
  toggleState !:boolean;
  constructor(private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router,public dataService:DataService) {
    iconRegistry.addSvgIconLiteral('menu',sanitizer.bypassSecurityTrustHtml(MENU_ICON))
    iconRegistry.addSvgIconLiteral('refresh',sanitizer.bypassSecurityTrustHtml(REFRESH_ICON))
    iconRegistry.addSvgIconLiteral('list-view',sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON))
    iconRegistry.addSvgIconLiteral('setting-icon',sanitizer.bypassSecurityTrustHtml(SETTING_ICON))
    iconRegistry.addSvgIconLiteral('search-icon',sanitizer.bypassSecurityTrustHtml(SEARCH_ICON))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.dataService.toggleMessage.subscribe(state => this.toggleState = state);
  }
  toggleNavBar(){
    this.dataService.toggleStateMethod(!this.toggleState);
  }
  logoutFun(){
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
  
}
