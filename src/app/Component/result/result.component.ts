import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Service/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  selectedOptions: { [key: number]: string } = {};

  constructor(private quiz: QuizService, private route: ActivatedRoute, private router: Router) {}
  questions: any;
  selectedCategory: any;
  difficultyLevel: any;
  
  ngOnInit() {
    // Retrieve the selected options from the route parameters
    this.route.queryParams.subscribe((params) => {
      if (params['selectedOptions']) {
        this.selectedOptions = JSON.parse(params['selectedOptions']);
        this.selectedCategory = params['selectedCategory'];
        this.difficultyLevel = params['difficultyLevel'];
      }
      console.log(this.selectedOptions);
    });
    if (this.selectedCategory && this.difficultyLevel) {
      this.quiz
        .getByFilter(this.selectedCategory, this.difficultyLevel)
        .subscribe((response) => {
          this.questions = response;
        });
    }
    else if(this.selectedCategory)
    {
      this.quiz
        .getByCategory(this.selectedCategory)
        .subscribe((response) => {
          this.questions = response;
        });
    }
    else if(this.difficultyLevel)
    {
      this.quiz
        .getByDifficultyLevel(this.difficultyLevel)
        .subscribe((response) => {
          this.questions = response;
        });
    }
    else{
    this.quiz.getAllQuestions().subscribe(
      (response) => {
        this.questions = response;
        console.log(this.questions);
      }
    )
    }
   
  }

  checkAnswer(questionId: number): string {
    const selectedOption = this.selectedOptions[questionId];
    const question = this.questions.find((q:any) => q.id === questionId);

    if (selectedOption === question.correctAnswer) {
      return 'Correct';
    } else {
      return 'Wrong';
    }
  }
  calculatePercentage(): string {
    const totalQuestions = this.questions.length;
    const correctAnswers = this.questions.filter((question: any) => this.checkAnswer(question.id) === 'Correct').length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    return percentage.toFixed(2); // Format the percentage with two decimal places
  }

  goBack()
  {
    this.router.navigate(['/quizzes']);
  }

}



