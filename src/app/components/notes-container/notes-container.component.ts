import { Component, OnInit } from '@angular/core';
import { Http2ServerRequest } from 'http2';
import { Subscriber } from 'rxjs';
import { NotesService } from 'src/app/services/notes.service';
interface result{
  title : string;
  description : string;
}
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
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
  host:{
    class : 'app-notes-cnt'
  }
})
export class NotesContainerComponent implements OnInit {
  noteList:any[] = [];
  constructor(public noteService : NotesService) { }

  ngOnInit(): void {
        this.noteService.getNoteList().subscribe(res => {
        this.noteList = res.data.filter((ele : {isArchieve:string, isTrash:boolean}) => (!ele.isArchieve && !ele.isTrash))
      },
        );
}
addNotesDirectly($event:any)
{
    this.noteList = [$event,...this.noteList];
}
handleFromChild($event:any)
{
  if ($event.id) {
    console.log($event);
    if ($event.isArchieve == true || $event.isTrash == true) 
      this.noteList = this.noteList.filter((ele: { id: number }) => {
        return ele.id != $event.id;
      });
     else {
      this.noteList = this.noteList.map((ele: any) => {
        if (ele.id == $event.id) {
          return $event;
        } else {
          return ele;
        }
      });
    }
  } else {
    this.noteList = this.noteList.filter((ele: { id: number }) => {
      return ele.id != $event;
    });
  }
}

   
}


