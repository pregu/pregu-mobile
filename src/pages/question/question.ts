import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { TriviaDataProvider } from '../../providers/trivia-data/trivia-data';

import { Question } from '../../models/question/question';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  public question: Question;
  public answers: Array<string>;
  public isAnswered: boolean = false;

  constructor(
    public navCtrl: NavController,
    public triviaDataProvider: TriviaDataProvider
  ) {
    this.question = this.triviaDataProvider.questions[this.questionIndex];
    this.answers = this.question.incorrectAnswers;
    if (this.question.type === 'boolean') {
      // Keep True before False
      if (this.question.correctAnswer === 'True') {
        this.answers.unshift(this.question.correctAnswer);
      } else {
        this.answers.push(this.question.correctAnswer);
      }
    } else {
      // Shuffle the answers
      let randomNumber = Math.floor(Math.random() * 4);
      this.answers.splice(randomNumber, 0, this.question.correctAnswer);
    }
  }

  get questionNumber() {
    return this.questionIndex + 1;
  }

  get questionIndex() {
    return this.triviaDataProvider.currentQuestionIndex;
  }

  get totalQuestions() {
    return this.triviaDataProvider.questions.length;
  }

  public submitAnswer(event, answer) {
    this.isAnswered = true;
    if (!this.isCorrect(answer)) {
      let target = event.target || event.srcElement || event.currentTarget;
      target.classList.add('incorrect');
    } else {
      this.triviaDataProvider.score += 1;
    }
  }

  public isCorrect(answer) {
    return answer === this.question.correctAnswer;
  }

  public goToNextQuestion() {
    if (this.questionNumber === this.totalQuestions) {
      // TODO: Add summary page
      this.navCtrl.setRoot(HomePage);
    } else {
      this.triviaDataProvider.currentQuestionIndex += 1;
      this.navCtrl.setRoot(QuestionPage);
    }
  }

}
