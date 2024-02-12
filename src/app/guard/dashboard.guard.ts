import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesService } from '../services/notes.service';



@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private router : Router,private noteService : NotesService)
  {
  }
  canActivate(){
    // let returnVal : boolean;
    // this.noteService.getNoteList().subscribe(
    //   res =>
    //   {
    //     if(res?.success)
    //     {
    //       returnVal= true;
    //     }
    //   },
    //   err =>{
    //       returnVal = false;
    //   }
    // )
    if(localStorage.getItem('accessToken') !== null)
    {
      return true;
    }
    this.router.navigate(["/login"])
    return false;
}
} 
