import { Component } from '@angular/core';
import { QuizService } from 'src/app/Service/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  formData = {
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    difficultyLevel: '',
    category: '',
    hint: ''
  };

  constructor(private quizService: QuizService){}


  onSubmit() {
    // Handle form submission here, e.g., store formData in a variable or send it to an API
    console.log(this.formData);
    this.quizService.postQuiz(this.formData).subscribe(
      (response) => {
        // Handle the response from the server here
        console.log(response);
      },
      (error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      }
    )
    this.clear()
  }

  clear()
  {
    this.formData = {
      questionTitle: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      difficultyLevel: '',
      category: '',
      hint: ''
    };
  
  }
}
