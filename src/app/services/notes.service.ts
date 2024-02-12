import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpHeaders ,HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  tokenLocal :string = "";
  constructor(public httpService : HttpService,public http:HttpClient) { }
  // private authHeader = new HttpHeaders({
  //   'Accept': "application/json",
  //   Authorization: localStorage.getItem('accessToken') || ""
  // })

  addNotes(notesObj:{})
  {
    const data = this.httpService.addNotes('Note/Add',notesObj);
    console.log(data)
    return data;
  }
  getNoteList()
  {
     return this.httpService.getNotes('Note/GetAll');    
  }
  makeArchieve(id : number)
  {
    let newObj : {} = {"id" : id};
    return this.httpService.makeArchive('Note/SetArchieve',newObj);
  }
  trashNote(id : number)
  {
    return this.httpService.trashNote("Note/Trash",id);
  }
  addColor(colorObj:{})
  {
    return this.httpService.addColor(colorObj);
  }
  permanentDeleteNote(id:number)
  {
    return this.httpService.permanentDeleteNote(id);
  }
  updateNote(noteObj:{})
  {
    return this.httpService.updataNote(noteObj);
  }
  forgetPassword(email:string)
  {
    return this.httpService.forgetPassword(email);
  }
  resetPasswod(newPassword:string)
  {
    return this.httpService.resetPassword(newPassword);
  }
}
