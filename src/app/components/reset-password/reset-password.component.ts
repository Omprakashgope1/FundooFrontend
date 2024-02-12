import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { HoverComponent } from '../hover/hover.component';
import { error } from 'console';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public noteService : NotesService,public router :Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  handleForget(email : string)
  {
    this.noteService.forgetPassword(email).subscribe(
      res => 
      {
        if(!res.success)
        {
            this.openSnackBar();
        }
      }
      ,error => this.openSnackBar()
    );
  }
  handlePassword(tokken:string,newPassword:string)
  {
      localStorage.setItem('accessToken',tokken);
      this.noteService.resetPasswod(newPassword).subscribe(
        res => {
          if(res?.success)
          {
             this.router.navigate(["/login"]);
          }
          else
          {
              this.openSnackBar();
          }
        },
      err => {
        this.openSnackBar();
      }
      )
}
  openSnackBar() {
    this._snackBar.openFromComponent(HoverComponent, {
      duration: 5 * 1000,
    })
  }
}
