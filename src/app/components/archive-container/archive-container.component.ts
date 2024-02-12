import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

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
  userId: number
}

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent implements OnInit {
  archieveList = [];
  constructor(public noteService : NotesService)
  {

  }

  ngOnInit(): void {
    this.noteService.getNoteList().subscribe(res => {
      this.archieveList = res.data.filter((ele : {isArchieve: boolean, isTrash: boolean}) => ele.isArchieve && !ele.isTrash)
    })
  }
  handleChild($event:any)
  {
      this.archieveList = this.archieveList.filter((ele : {id:number}) =>{
        return ele.id != $event;
      }
      )
  }

}
