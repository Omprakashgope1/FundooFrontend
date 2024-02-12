import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, DELETE_FOREVER_ICON, IMG_ICON, MORE_ICON, REMINDER_ICON, RESTORE_ICON, UNARCHIVE_ICON} from 'src/assets/icons';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  title:string = "";
  desc:string = "";
  isArchieve :boolean = false;
  isTrash:boolean = false;
  color : string = "";
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditNotesComponent>,private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer)
   {
      this.title= data.title
      this.desc = data.description
      this.isArchieve = data.isArchieve;
      this.color = data.color;
      this.isTrash = data.isTrash;
      iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
      iconRegistry.addSvgIconLiteral('collaborator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
      iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
      iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    }

  ngOnInit(): void {
  }
  handleEditNote(){
    console.log(this.isArchieve);
    let noteObj = {
      ...this.data,
      title :this.title,
      description :this.desc,
      isArchieve:this.isArchieve,
      color:this.color,
      isTrash : this.isTrash
    }
     this.dialogRef.close(noteObj);
    }
}
