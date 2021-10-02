import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Examtypes } from 'src/app/_models/examtypes';
import { Studentsearchresult } from 'src/app/_models/studentsearchresult';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-student-search-result',
  templateUrl: './student-search-result.component.html',
  styleUrls: ['./student-search-result.component.scss']
})
export class StudentSearchResultComponent implements OnInit {

  dataSource = new MatTableDataSource<Studentsearchresult>([]);
  loading: boolean = false;
  submit: boolean = false;
  ssrForm: FormGroup;
  examtypes: Examtypes[];

  displayColumns: string[] = ['sid', 'sname', 'classsection', 'firstLan', 'secondLan',
'engilsh', 'maths', 'science', 'social', 'rank'];

  constructor(private dialog: MatDialog, private router: Router,
            private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.ssrForm = this.formBuilder.group({
      studentid: ['', [Validators.required, Validators.max(30),
        Validators.minLength(2), Validators.maxLength(30)]],
      examtypeid: ['', [Validators.required]]
    });

    this.getExamTypes();
    this.getData();
  }

  getExamTypes() {
    this.examtypes  = [
      { examtypeid: 1, examtypename: 'FA1'},
      { examtypeid: 2, examtypename:  'FA2'},
      { examtypeid: 3, examtypename: 'Quaterly'},
      { examtypeid: 4, examtypename: 'Half Yearly'},
      { examtypeid: 5, examtypename: 'Final'},
    ]
  }

  getData() {
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

]

    this.dataSource = new MatTableDataSource();
    this.dataSource.data = res;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
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



      // get the data from service


      this.loading = false;
  }

}
