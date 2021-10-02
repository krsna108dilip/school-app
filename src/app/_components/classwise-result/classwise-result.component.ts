import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA  } from '@angular/material';
import { Router } from '@angular/router';
import { Standards } from 'src/app/_models/Standards';
import { Examtypes } from 'src/app/_models/examtypes';
import { StudentResult } from 'src/app/_models/StudentResult';
import { AlertService } from 'src/app/_services/alert.service';
import { ClasswiseResultEditComponent } from '../classwise-result-edit/classwise-result-edit.component';
import { StudentService } from 'src/app/_services/student/student.service';


@Component({
  selector: 'app-classwise-result',
  templateUrl: './classwise-result.component.html',
  styleUrls: ['./classwise-result.component.scss']
})
export class ClasswiseResultComponent implements OnInit {

  //dataSource: Studentsearchresult[];
  loading: boolean = false;
  submit: boolean = false;
  cwrForm: FormGroup;
  standards: Standards[];
  examtypes: Examtypes[];
  selection = new SelectionModel<StudentResult>(true, []);
  dataSource = new MatTableDataSource<StudentResult>([]);
  hasData: boolean = false;

  displayColumns: string[] = ['actions' ,'sid', 'sname', 'classsection', 'telugu', 'hindi',
'engilsh', 'maths', 'science', 'social', 'examptype'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentService
    ) {

     }

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.cwrForm = this.formBuilder.group({
      standardId: ['', [Validators.required]],
      examTypeId: ['', [Validators.required]],
    });

    this.getStandards();
    this.getExamTypes();

    this.dataSource.data = null;
    this.dataSource.sort = null;
    this.dataSource.paginator= null;

  }

  getStandards() {
    this.studentService.getAllStandards().subscribe(res => {
      this.standards = res;
    });

  }

  getExamTypes() {

    this.studentService.getAllExamTypes().subscribe(res => {
      this.examtypes = res;
    });
  }

//   getData() {
// const res = this.studentService.getStudentResultByStandard();

// if(res.length > 0){
//   this.hasData = true;

//  //this.dataSource = new MatTableDataSource();
//  this.dataSource.data = res;
//  this.dataSource.sort = this.sort;
//  this.dataSource.paginator=this.paginator;
// }
// else
// this.hasData = false;
// }






  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    console.log(this.selection.selected);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        console.log(this.selection.selected);
  }

  TestCheck(){
    console.log(this.selection.selected);
  }

  toggleCheckbox(row) {
    this.selection.toggle(row);
    row.selected = !row.selected;
    console.log(this.selection.selected);
  }

  openEditDialog(event, schoolObj: StudentResult): void {
    console.log('test edit');
    console.log(schoolObj);

    const editDialog = this.dialog.open(ClasswiseResultEditComponent, {
      // height: '800px',
      // width: '600px',
      data: {
          sid : schoolObj.sid,
          // sname: schoolObj.sname,
          // classsec: schoolObj.classsection,
          // telugu : Number(schoolObj.telugu),
          // hindi: Number(schoolObj.hindi),
          // english: Number(schoolObj.english),
          // maths: Number(schoolObj.maths),
          // science: Number(schoolObj.science),
          // social: Number(schoolObj.social)
          }
    });
    editDialog.disableClose = true;

    //editDialog.autoFocus = true;


    // this.dialogRef.componentInstance.onUpdate.subscribe(data=> {
    //   console.log('updated' + data);
    // })




    editDialog.afterClosed().subscribe(result => {
      console.log('modified data' + result.data.sid);

        console.log('modified data' + result.data.firstLan);
        //this.getData();

        this.getData(this.cwrForm.controls.standardId.value,
          Number(this.cwrForm.controls.examTypeId.value));

    })
  }


  onSubmit() {
    this.submit = true;

    if (this.cwrForm.invalid)
      return;

      this.loading = true;

      let standardId = this.cwrForm.controls.standardId.value;
      let examTypeId = this.cwrForm.controls.examTypeId.value;


      console.log(standardId);
      console.log(examTypeId);

      this.getData(standardId,Number(examTypeId));
      this.submit = false;

  }

  getData(standardId: string, examTypeId: number)
  {
    this.studentService.getStudentResultByStandard(standardId, examTypeId).subscribe(
      res => {
          this.dataSource.data = res;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator;
          this.loading = false;
      }
    );
  }

}

