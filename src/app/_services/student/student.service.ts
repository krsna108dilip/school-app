import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Examtypes } from 'src/app/_models/examtypes';
import { Standards } from 'src/app/_models/Standards';
import { StudentResult } from 'src/app/_models/StudentResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private standards: Standards[];
  private examtypes: Examtypes[];
  private studentResults: StudentResult[];
  // nocheckapi/getAllExamtypes

constructor(private http: HttpClient) {
  this.standards = [
    {
    id: 1,
    standard: '1_A',
  },
  {
    id: 2,
    standard: '1_B',
  },
  {
    id: 3,
    standard: '1_C',
  },
];

this.examtypes = [
{
  id: 1,
  examtype: 'FA_1',
},
{
  id: 2,
  examtype: 'FA_2',
},
{
  id: 3,
  examtype: 'FA_3',
},
];

this.studentResults = [
  {
  id: 1,
  sid:'xxxxx123',
  sname: 'Dilpe',
  classsection:'test',
  telugu: 78,
  english:22,
  hindi:23,
  maths:34,
  science:45,
  social:46,
  examtype:'test',
},
{
  id: 2,
  sid:'xxxxx123',
  sname: 'Dilpe',
  classsection:'test',
  telugu: 79,
  english:28,
  hindi:78,
  maths:74,
  science:86,
  social:49,
  examtype:'test2',
},
]

 }


public getAllStandards(): Observable<Standards[]> {

  return this.http.post<Standards[]>(`${environment.apiUrl}nocheckapi/getAllStandards`, { })
  .pipe(
    catchError(
    err => { throw err; }
    ));

  //return of(this.standards);

}

//: Observable<Examtypes[]>
public getAllExamTypes(): Observable<Examtypes[]> {

  return this.http.post<Examtypes[]>(`${environment.apiUrl}nocheckapi/getAllExamtypes`, { })
  .pipe(map(res => {
      return res;
  }));

  //return of(this.examtypes);

}

getStudentResultByIDandExamType(studentid: string, exampType: string): Observable<StudentResult[]> {

  let obj = {
    sid: studentid,
    examptype: exampType
  };

  return this.http.post<any>(`${environment.apiUrl}StudentResults/sidbased`, obj)
  .pipe(map(res => {
      return res;
  }));

  //return of(this.studentResults);

}

getStudentResultByStandard(sid: string, examTypeId: number): Observable<StudentResult[]> {

  var obj = {

    examtypeId: examTypeId ,
    standarid: sid,
};

  return this.http.post<StudentResult[]>(`${environment.apiUrl}StudentResults/classwise`, obj)
  .pipe(catchError(err => { throw err; }));

  //return of(this.studentResults);

}

getStudentMarksById(sid: string): Observable<StudentResult> {

  return this.http.post<StudentResult>(`${environment.apiUrl}StudentResults/`, sid)
  .pipe(catchError(err => { throw err; }));
}

studentMarksUpdate(marksObj: any): any {
  //return true;
  this.http.put<any>(`${environment.apiUrl}MarksUpdate`, marksObj).pipe(
    catchError(err => {
    throw err;
  }));
}



}
