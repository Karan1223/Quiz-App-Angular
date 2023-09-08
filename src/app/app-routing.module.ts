import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { QuizComponent } from './Component/quiz/quiz.component';
import { ResultComponent } from './Component/result/result.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "quizzes", component: QuizComponent},
  {path: "result", component: ResultComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
