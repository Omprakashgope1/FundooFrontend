import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = "https://localhost:7244/api/"
  private queryParams = new HttpParams().set("access_token", localStorage.getItem('accessToken') || "")
  private authHeader = new HttpHeaders({
    'Accept': "application/json",
    Authorization: "Bearer " + localStorage.getItem('accessToken') || ""
  })
  tokenLocal:string = localStorage.getItem('accessToken') || '';
    // console.log(this.tokenLocal);
    header:{} = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenLocal}`
      })
    }
  
  
  getNoteQueryParams: any;

  constructor(private http: HttpClient) { }

  async loginSignupCall(endpoint: string, data: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    try {
      console.log(JSON.stringify(data));
      const res = await this.http.post(this.baseUrl + endpoint, data, { headers }).toPromise()
      return res
    } catch (error) {
      return error
    }

  }
  getNotes(endpoint:string):Observable<any>
  {
    return this.http.get(this.baseUrl+ endpoint,this.header)
  }
  addNotes(endpoint:string,data :{}):Observable<any>
  {
    return this.http.post(this.baseUrl+ endpoint,data,this.header)
  }
  makeArchive(endpoint:string,data:{}):Observable<any>
  {
    return this.http.post(this.baseUrl + endpoint,data,this.header);
  }
  trashNote(endpoint:string,id:number):Observable<any>
  {
    return this.http.put(this.baseUrl+ endpoint + `/${id}`,{},this.header);
  }
  addColor(colorObj:{}):Observable<any>
  {
    return this.http.put('https://localhost:7244/api/Note/SetColor',colorObj,this.header);
  } 
  permanentDeleteNote(id:number):Observable<any>
  {
    return this.http.delete('https://localhost:7244/api/Note/Delete?id='+id,this.header);
  }
  updataNote(noteObj:Object):Observable<any>
  {
    return this.http.put('https://localhost:7244/api/Note/Edit',noteObj,this.header);
  }
  forgetPassword(email:string):Observable<any>
  {
    return this.http.put('https://localhost:7244/api/User/ForgetPassword',{email:email});
  }
  resetPassword(newPassword:string):Observable<any>
  {
    return this.http.put("https://localhost:7244/api/User/ResetPassword",{newPassword:newPassword},this.header);
  }
}
