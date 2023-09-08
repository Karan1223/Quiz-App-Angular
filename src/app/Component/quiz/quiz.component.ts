import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/Service/quiz.service';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  constructor(private quiz: QuizService, private router: Router) {}
  question: any; // This should be populated with the received data
  selectedOptions: { [key: number]: string } = {};
  selectedCategory: any;
  category: any;
  difficultyLevel: any;
  displayHint: boolean = false;
  currentHint: string = '';
  faQuestionCircle = faQuestionCircle;
  selectedQuestionId: number | null = null;
  questionsAvailable: boolean = true;

  ngOnInit() {
    this.quiz.getAllQuestions().subscribe((response) => {
      this.question = this.shuffleArray(response);
      if(this.question.length > 0)
      {
        this.questionsAvailable = true;
      }
     else
     {
      this.questionsAvailable = false;
     }
      console.log(this.question);
      // Extract categories from the questions
      this.category = Array.from(new Set(this.question.map((q: any) => q.category)));
    
    });
  }
  submitAnswer() {
    this.router.navigate(['/result'], {
      queryParams: { selectedOptions: JSON.stringify(this.selectedOptions),
      selectedCategory:  this.selectedCategory,
      difficultyLevel: this.difficultyLevel},
    });
  }

  submitFilter() {
    if (this.selectedCategory && this.difficultyLevel) {
      this.quiz
        .getByFilter(this.selectedCategory, this.difficultyLevel)
        .subscribe((response) => {
          this.question = response;
          if(this.question.length > 0)
      {
        this.questionsAvailable = true;
      }
     else
     {
      this.questionsAvailable = false;
     }
     console.log(this.questionsAvailable);
        });
    }
    else if(this.selectedCategory)
    {
      this.quiz
        .getByCategory(this.selectedCategory)
        .subscribe((response) => {
          this.question = response;
          if(this.question.length > 0)
          {
            this.questionsAvailable = true;
          }
         else
         {
          this.questionsAvailable = false;
         }
        });
    }
    else if(this.difficultyLevel)
    {
      this.quiz
        .getByDifficultyLevel(this.difficultyLevel)
        .subscribe((response) => {
          this.question = response;
          if(this.question.length > 0)
          {
            this.questionsAvailable = true;
          }
         else
         {
          this.questionsAvailable = false;
         }
        });
    }
  }

  Clear()
  {
    this.selectedCategory = "";
    this.difficultyLevel = "";
    this.quiz.getAllQuestions().subscribe((response) => {
      this.question = response;
      if(this.question.length > 0)
      {
        this.questionsAvailable = true;
      }
     else
     {
      this.questionsAvailable = false;
     }
    });
  }
  // utils.ts

shuffleArray(array: any[]): any[] {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
toggleHint(questionId: number, hint: string) {
  if (this.selectedQuestionId === questionId && this.displayHint) {
    // If the hint is already displayed, hide it
    this.hideHint();
  } else {
    // Otherwise, show the hint
    this.showHint(questionId, hint);
  }
}

  showHint(questionId: number, hint: string) {

    // Set the selectedQuestionId to the clicked question's ID
    this.selectedQuestionId = questionId;

    // You can use a tooltip library or custom implementation to display the hint.
    // For this example, we'll just set the displayHint flag to true.
    this.displayHint = true;
    this.currentHint = hint;
  }


  hideHint() {
    // Reset the selectedQuestionId and hide the hint
    this.selectedQuestionId = null;
    this.displayHint = false;
  }

}

