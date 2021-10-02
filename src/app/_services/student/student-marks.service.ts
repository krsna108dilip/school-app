import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Studentsearchresult } from 'src/app/_models/studentsearchresult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentMarksService {

constructor(private http: HttpClient) {

 }

 getStudentMarksById(sid: any) {
  this.http.get<any>(`${environment.apiUrl}studentMarksById/${sid}`).pipe(
  catchError(err => {
    throw err;
  }));
 }

 getStudentMarksByClass(classid: any) {

  const res: Studentsearchresult[] = [
    {
      sid: 'TS057-03X-001',
      sname: 'delep',
      classsection: '10_A',
      firstLan: '88',
      secondLan: '99',
      engilsh: '76',
      maths: '10',
      science: '23',
      social: '40',
      rank: '21'
    },
    {
      sid: 'TS057-03X-002',
      sname: 'delep',
      classsection: '10_A',
      firstLan: '88',
      secondLan: '99',
      engilsh: '76',
      maths: '10',
      science: '23',
      social: '40',
      rank: '21'
    },
    {
      sid: 'TS057-03X-003',
      sname: 'delep',
      classsection: '10_A',
      firstLan: '88',
      secondLan: '99',
      engilsh: '76',
      maths: '10',
      science: '23',
      social: '40',
      rank: '21'
    },
    {
      sid: 'TS057-03X-004',
      sname: 'delep',
      classsection: '10_A',
      firstLan: '88',
      secondLan: '99',
      engilsh: '76',
      maths: '10',
      science: '23',
      social: '40',
      rank: '21'
    },
    {
      sid: 'TS057-03X-005',
      sname: 'delep',
      classsection: '10_A',
      firstLan: '88',
      secondLan: '99',
      engilsh: '76',
      maths: '10',
      science: '23',
      social: '40',
      rank: '21'
    }
  ];

    return res;



  // this.http.get<any[]>(`${environment.apiUrl}GetMarksClasswise/${classid}`).pipe(
  //   catchError(err => {
  //   throw err;
  // }));
 }

 studentMarksUpdate(marksObj: any){
   return true;
  //  this.http.put<any>(`${environment.apiUrl}MarksUpdate`, marksObj).pipe(
  //    catchError(err => {
  //    throw err;
  //  }));
 }

}
