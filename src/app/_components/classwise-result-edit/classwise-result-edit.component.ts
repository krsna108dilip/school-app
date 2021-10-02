import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { timingSafeEqual } from 'crypto';
import { Studentsearchresult } from 'src/app/_models/studentsearchresult';
import { AlertService } from 'src/app/_services/alert.service';
import { StudentMarksService } from 'src/app/_services/student/student-marks.service';

@Component({
  selector: 'app-classwise-result-edit',
  templateUrl: './classwise-result-edit.component.html',
  styleUrls: ['./classwise-result-edit.component.scss']
})

export class ClasswiseResultEditComponent implements OnInit {

  form: FormGroup;
  sid: string;
  sname: string;
  classsec: string;
  firstlang: number;
  secondlang: number;
  english: number;
  maths: number;
  science: number;
  social: number;
  student: Studentsearchresult;
  //onUpdate = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private studentService: StudentMarksService,
    private dialogRef: MatDialogRef<ClasswiseResultEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) {
      this.sid = this.data.sid;
      this.sname = this.data.sname;
      this.classsec = this.data.classsec;
      this.firstlang = this.data.firstlang;
      this.firstlang = this.data.firstlang;
      this.secondlang = this.data.secondlang;
      this.english = this.data.english;
      this.maths = this.data.maths;
      this.science = this.data.science;
      this.social = this.data.social;


     }

  ngOnInit() {
    this.form = this.fb.group({
      sid: ['', []],
      sname: ['', []],
      classsec: ['', []],
      firstlang: [null, [Validators.required, Validators.min(1), Validators.max(100),
                  Validators.minLength(1), Validators.maxLength(3)]],
      secondlang: [null, [Validators.required, Validators.min(1), Validators.max(100),
                  Validators.minLength(1), Validators.maxLength(3)]],
      english: [null, [Validators.required, Validators.min(1), Validators.max(100),
                Validators.minLength(1), Validators.maxLength(3)]],
      maths: [null, [Validators.required, Validators.min(1), Validators.max(100),
              Validators.minLength(1), Validators.maxLength(3)]],
      science: [null, [Validators.required, Validators.min(1), Validators.max(100),
              Validators.minLength(1), Validators.maxLength(3)]],
      social: [null, [Validators.required, Validators.min(1), Validators.max(100),
              Validators.minLength(1), Validators.maxLength(3)]],

  });



  this.form.setValue({
    sid:this.sid,
    sname:this.sname,
    classsec:this.classsec,
    firstlang : this.data.firstlang,
    secondlang : this.data.secondlang,
    english: this.data.english,
    maths : this.data.maths,
    science : this.data.science,
    social : this.data.social,
  });
}

get f() { return this.form.controls; }

onSubmit() {



//       this.student =  {
// sid : this.sid,
// sname : this.sname,
// classsection : this.classsec,
// firstLan : this.firstlang.toString(),
// secondLan : this.secondlang.toString(),
// engilsh : this.english.toString(),
// maths : this.maths.toString(),
// social : this.social.toString(),
// science : this.science.toString(),
//       }


let student = {
  sid :this.data.sid,
  sname:this.f.sname.value,
  classsection:this.f.classsec.value,
  firstLan:this.f.firstlang.value,

}

let res = this.studentService.studentMarksUpdate(student);
this.alertService.Success('Marks are updated');




//this.onUpdate.emit(res);

this.dialogRef.close({data: student});
//this.dialogRef.close({data: {firstlang:this.f.firstlang.value, sid:this.f.sid.value}});
}

close() {
    this.dialogRef.close();
}




}
