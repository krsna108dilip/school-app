import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA  } from '@angular/material';
import { Router } from '@angular/router';
import { Classes } from 'src/app/_models/classes';
import { Examtypes } from 'src/app/_models/examtypes';
import { Studentsearchresult } from 'src/app/_models/studentsearchresult';
import { AlertService } from 'src/app/_services/alert.service';
import { StudentMarksService } from 'src/app/_services/student/student-marks.service';
import { ClasswiseResultEditComponent } from '../classwise-result-edit/classwise-result-edit.component';


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
  classes: Classes[];
  selection = new SelectionModel<Studentsearchresult>(true, []);
  dataSource = new MatTableDataSource<Studentsearchresult>([]);
  hasData: boolean = false;

  displayColumns: string[] = ['actions' ,'sid', 'sname', 'classsection', 'firstLan', 'secondLan',
'engilsh', 'maths', 'science', 'social', 'rank'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentMarksService
    ) {

     }

  @ViewChild(MatPaginator, {static: true} ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.cwrForm = this.formBuilder.group({
      classid: ['', [Validators.required]]
    });

    this.getClasses();

    this.dataSource.data = null;
 this.dataSource.sort = null;
 this.dataSource.paginator= null;

  }

  getClasses() {
    this.classes  = [
      { classid: 1, classname: '1st'},
      { classid: 2, classname: '2nd'},
      { classid: 3, classname: '3rd'},
      { classid: 4, classname: '4th'},
      { classid: 5, classname: '5th'},
    ]
  }

  getData() {
const res = this.studentService.getStudentMarksByClass(1);

if(res.length > 0){
  this.hasData = true;

 //this.dataSource = new MatTableDataSource();
 this.dataSource.data = res;
 this.dataSource.sort = this.sort;
 this.dataSource.paginator=this.paginator;
}
else
this.hasData = false;
}






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

  openEditDialog(event, schoolObj: Studentsearchresult): void {
    console.log('test edit');
    console.log(schoolObj);

    const editDialog = this.dialog.open(ClasswiseResultEditComponent, {
      // height: '800px',
      // width: '600px',
      data: {
          sid : schoolObj.sid,
          sname: schoolObj.sname,
          classsec: schoolObj.classsection,
          firstlang : Number(schoolObj.firstLan),
          secondlang: Number(schoolObj.secondLan),
          english: Number(schoolObj.engilsh),
          maths: Number(schoolObj.maths),
          science: Number(schoolObj.science),
          social: Number(schoolObj.social)
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
        this.getData();

    })
  }


  onSubmit() {
    this.submit = true;

    if (this.cwrForm.invalid)
      return;

      this.loading = true;

      let cid = this.cwrForm.controls.classid.value;

      this.getData();
      console.log(cid);



      // get the data from service


      this.loading = false;
  }

}

