import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AppComponent } from '../../_components/app/app.component';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from 'src/app/_components/login/login.component';
import { RegisterComponent } from 'src/app/_components/register/register.component';
import { HomeComponent } from 'src/app/_components/home/home.component';
import { NavMenuComponent } from 'src/app/_components/nav-menu/nav-menu.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';
import { AlertService } from 'src/app/_services/alert.service';
import { ConfirmDialogComponent } from 'src/app/_components/confirm-dialog/confirm-dialog.component';
import { StudentSearchResultComponent } from 'src/app/_components/student-search-result/student-search-result.component';
import { ClasswiseResultComponent } from 'src/app/_components/classwise-result/classwise-result.component';
import { JwtInterceptor } from 'src/app/_helpers/JwtInterceptor';
import { ErrorInterceptor } from 'src/app/_helpers/ErrorInterceptor';
import { ClasswiseResultEditComponent } from 'src/app/_components/classwise-result-edit/classwise-result-edit.component';
import { MatDialogRef } from '@angular/material';
import { StudentMarksService } from 'src/app/_services/student/student-marks.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavMenuComponent,
    ConfirmDialogComponent,
    StudentSearchResultComponent,
    ClasswiseResultComponent,
    ClasswiseResultEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [AuthenticationService, AlertService, StudentMarksService,
    fakeBackendProvider,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},


  ],
  entryComponents: [ ConfirmDialogComponent, ClasswiseResultEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
