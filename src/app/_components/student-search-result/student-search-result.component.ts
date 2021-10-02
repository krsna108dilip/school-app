import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Examtypes } from 'src/app/_models/examtypes';
import { StudentResult } from 'src/app/_models/StudentResult';
import { AlertService } from 'src/app/_services/alert.service';
import { StudentService } from 'src/app/_services/student/student.service';

@Component({
  selector: 'app-student-search-result',
  templateUrl: './student-search-result.component.html',
  styleUrls: ['./student-search-result.component.scss']
})
export class StudentSearchResultComponent implements OnInit {

  dataSource = new MatTableDataSource<StudentResult>([]);
  loading: boolean = false;
  submit: boolean = false;
  ssrForm: FormGroup;
  examtypes: Examtypes[];

  displayColumns: string[] = ['id', 'sid', 'sname', 'classsection', 'telugu', 'hindi',
'engilsh', 'maths', 'science', 'social', 'examtype'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentService) { }

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.ssrForm = this.formBuilder.group({
      studentid: ['', [Validators.required, Validators.max(30),
        Validators.minLength(2), Validators.maxLength(30)]],
      examtypeid: ['', [Validators.required]]
    });

    this.getExamTypes();
  }

  getExamTypes() {
    this.studentService.getAllExamTypes().subscribe(res =>
      this.examtypes = res);

  //this.examtypes = this.studentService.getAllExamTypes();








    // this.examtypes  = [
    //   { examtypeid: 1, examtypename: 'FA1'},
    //   { examtypeid: 2, examtypename:  'FA2'},
    //   { examtypeid: 3, examtypename: 'Quaterly'},
    //   { examtypeid: 4, examtypename: 'Half Yearly'},
    //   { examtypeid: 5, examtypename: 'Final'},
    // ]
  }



  get f() { return this.ssrForm.controls; }

  onSubmit() {
    this.submit = true;

    if (this.ssrForm.invalid)
      return;

      this.loading = true;

      let sid = this.ssrForm.controls.studentid.value;
      let etid = this.ssrForm.controls.examtypeid.value;
      console.log(sid);
      console.log(etid);

      this.studentService.getStudentResultByIDandExamType(sid, etid).subscribe(res => {

        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;
        this.loading = false;

      });


      // get the data from service



  }

}
