import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { QuizComponent } from './Component/quiz/quiz.component';
import { ResultComponent } from './Component/result/result.component';
import { QuestionComponent } from './Component/question/question.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "quizzes", component: QuizComponent},
  {path: "result", component: ResultComponent},
  {path: "question", component: QuestionComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
