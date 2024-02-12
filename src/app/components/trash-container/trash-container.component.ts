import { Component, OnInit} from '@angular/core';
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
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent implements OnInit {
  trashList :contain [] = [];

  constructor(public noteService : NotesService) { }

  ngOnInit(): void {
    this.noteService.getNoteList().subscribe(res =>
      this.trashList = res.data.filter((ele:{isTrash : boolean})=> ele.isTrash)
      )
  }
  handleChild($event:any)
  {
      this.trashList = this.trashList.filter((ele : {id:number}) =>{
        return ele.id != $event;
      }
      )
  }

}
