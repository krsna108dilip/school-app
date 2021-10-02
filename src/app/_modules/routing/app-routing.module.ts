import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasswiseResultComponent } from 'src/app/_components/classwise-result/classwise-result.component';
import { HomeComponent } from 'src/app/_components/home/home.component';
import { LoginComponent } from 'src/app/_components/login/login.component';
import { RegisterComponent } from 'src/app/_components/register/register.component';
import { StudentSearchResultComponent } from 'src/app/_components/student-search-result/student-search-result.component';
import { AuthGuard } from 'src/app/_helpers/AuthGuard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'studentsearchresult', component: StudentSearchResultComponent},
  {path: 'classwiseresult', component: ClasswiseResultComponent, canActivate: [AuthGuard], data:{ roles:['Admin','TechAdmin']} },


  {path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
