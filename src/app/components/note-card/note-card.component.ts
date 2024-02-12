import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotesService } from 'src/app/services/notes.service';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, DELETE_FOREVER_ICON, IMG_ICON, MORE_ICON, REMINDER_ICON, RESTORE_ICON, UNARCHIVE_ICON} from 'src/assets/icons';
import { EditNotesComponent } from '../edit-notes/edit-notes.component';

interface contain{
      id:number ,
      title: string,
      description: string,
      reminder: string,
      color: string,
      image: string,
      isArchieve: boolean,
      isPin: boolean,
      isTrash: boolean,
}

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() note : {
    title:string,
    description:string,
    color:string,
    id :number,
    image: string,
    isArchieve: boolean,
    isPin: boolean,
    isTrash: boolean,
    reminder:string

  
  }={title:"", description:"",color:"",id:1,image : "",isArchieve : false,isPin : false,isTrash:false,reminder:""};
  @Output() handleEvent = new EventEmitter<number>();
  @Input()  comingFrom :string = "";

  constructor(public noteService : NotesService,private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,public dialog : MatDialog) 
  {
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON))
    iconRegistry.addSvgIconLiteral('color-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))
    iconRegistry.addSvgIconLiteral('restore-icon',sanitizer.bypassSecurityTrustHtml(RESTORE_ICON))
    iconRegistry.addSvgIconLiteral('delete-forever-icon',sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON))
    iconRegistry.addSvgIconLiteral('unarchive-icon',sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON))
  }

  ngOnInit(): void {
  }
  handleFun(value : string)
  {
    value === 'trash' ?
    this.noteService.trashNote(this.note.id).subscribe(
      (res:any) => { 
          this.handleEvent.emit(res.data.id);
      }
    ):
    this.noteService.makeArchieve(this.note.id).subscribe(
      (res:any) => {
        this.handleEvent.emit(res.data.id);
      }
    );
  }
  handleFun1(value:string)
  {
      value == 'delete'?
      this.noteService.permanentDeleteNote(this.note.id).subscribe(
        res =>
        {
           this.handleEvent.emit(this.note.id);
        })
      :
      this.noteService.addColor({id : this.note.id,color : value}).subscribe(res =>
        {
           this.handleEvent.emit(res.data);
        })
  }
  openDialog() {
   
    let newObj:contain = this.note;
    const dialogRef = this.dialog.open(EditNotesComponent,{data:newObj});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    this.noteService.updateNote(result).subscribe(res =>
        {
          this.handleEvent.emit(result);
        }
      )
    });
  }
}
