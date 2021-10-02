import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';


constructor(private snackBar: MatSnackBar) {


}

public Success(message: any) {
  this.snackBar.open(message,'X',{
    panelClass: ['snackBar-custom-success'],
    duration: 5000,
    horizontalPosition:this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  })

}

public Error(message: any) {
  this.snackBar.open(message,'X',{
    panelClass: ['snackBar-custom-error'],
    horizontalPosition:this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}

}
