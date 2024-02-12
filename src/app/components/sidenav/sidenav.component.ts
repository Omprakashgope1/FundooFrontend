import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {NOTE_ICON,REMINDER_ICON,EDIT_ICON,ARCHIVE_ICON,TRASH_ICON} from '../../../assets/icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit ,OnDestroy{
  subscription!:Subscription;
  sideNavState! : boolean;

  constructor(private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router,public dataService : DataService) {
    iconRegistry.addSvgIconLiteral("note-icon", sanitizer.bypassSecurityTrustHtml(NOTE_ICON))
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral("edit-icon", sanitizer.bypassSecurityTrustHtml(EDIT_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON))
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.dataService.toggleMessage.subscribe(state => this.sideNavState = state);
  }
  handleRoute(route:string)
  {
    this.router.navigate(['/dashboard'+route])
  }
  
}
