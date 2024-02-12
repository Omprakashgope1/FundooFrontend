import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotesService } from 'src/app/services/notes.service';
import { ARCHIVE_ICON, BRUSH_ICON, COLLABRATOR_ICON, IMG_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON, TICK_ICON } from 'src/assets/icons';

interface contain{
  id:number ,
  title: string,
  description: string,
  reminder: string,
  color: string,
  image: string,
  isArchieve: boolean,
  isPin: boolean,
  isTrash: boolean
}
@Component({
  selector: 'app-note-search-bar',
  templateUrl: './note-search-bar.component.html',
  styleUrls: ['./note-search-bar.component.scss']
})
export class NoteSearchBarComponent implements OnInit {
  showMsg:boolean = true;
  title:string = "";
  desc:string = "";
  constructor(private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,public noteService : NotesService) {
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON))
    iconRegistry.addSvgIconLiteral('tick-icon', sanitizer.bypassSecurityTrustHtml(TICK_ICON))
    iconRegistry.addSvgIconLiteral('brush-icon', sanitizer.bypassSecurityTrustHtml(BRUSH_ICON))
    iconRegistry.addSvgIconLiteral('pin-icon', sanitizer.bypassSecurityTrustHtml(PIN_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
   }
   @Output() handleRequest = new EventEmitter<any>();
  ngOnInit(): void {
  }
  openCloseCall(){
    this.showMsg = !this.showMsg;
  }
  addNotes()
  {
    let sendObj :{} = {};
    let noteObj:{}={
  "title": this.title,
  "description": this.desc,
  "reminder": "2024-01-17T10:04:15.302Z",
  "color": "",
  "image": "",
  "isArchieve": false,
  "isTrash": false,
  "isPin": false
    }
    console.log(JSON.stringify(noteObj));
    this.showMsg = !this.showMsg;
    if(this.title != "" || this.desc != "")
    {
      this.noteService.addNotes(noteObj).subscribe(
        res => {
          this.handleRequest.emit(res.notes);
        }
      );
    }
    
  }
}
