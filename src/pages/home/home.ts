import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

import { TriviaProvider } from '../../providers/trivia/trivia';
import { TriviaDataProvider } from '../../providers/trivia-data/trivia-data';

import { Category } from '../../models/category/category';
import { StandartResponse } from '../../models/standart-response/standart-response';
import { Question } from '../../models/question/question';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public form: FormGroup;
  public types: Array<object> = [
    { value: 'any', label: 'Any type' },
    { value: 'multiple', label: 'Multiple choice' },
    { value: 'boolean', label: 'True or False' }
  ];
  public difficulties: Array<object> = [
    { value: 'any', label: 'Any difficulty' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ]

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public triviaProvider: TriviaProvider,
    public triviaDataProvider: TriviaDataProvider,
    private fb: FormBuilder
  ) {
    this.loadCategories();
    this.createGameSetupForm();
  }

  get categories() {
    return this.triviaDataProvider.categories;
  }

  private loadCategories() {
    this.triviaProvider.getCategories().subscribe(
      result => {
        for (let category of result['trivia_categories']) {
          this.triviaDataProvider.categories.push(
            new Category(category.id, category.name)
          );
        }
      },
      (error: Response) => {
        console.log(error);
      }
    )
  }

  private createGameSetupForm() {
    this.form = this.fb.group({
      amount: 10,
      category: this.categories[0]['id'],
      difficulty: this.difficulties[0]['value'],
      type: this.types[0]['value']
    });
  }

  public startGame() {
    let data = this.form.value;
    this.triviaProvider.getQuestions(data.amount, parseInt(data.category), data.difficulty, data.type).subscribe(
      (result: StandartResponse) => {
        switch (result.response_code) {
          case 1: {
            this.showAlert('No results', 'There are not enough questions of the selected type and category.')
            break;
          }
          case 2: {
            this.showAlert('Invalid parameters', 'The form contains invalid parameters.')
            break;
          }
          case 0: {
            let categoryInstance = this.categories.find(category => category.id == parseInt(data.category));
            let questionInstance;
            for (let question in result.results) {

              questionInstance = new Question(
                categoryInstance,
                question['type'],
                question['difficulty'],
                question['question'],
                question['correctAnser'],
                question['incorrectAnswers']
              )
              this.triviaDataProvider.questions.push(questionInstance);
            }
            break;
          }
          default: {
            this.showAlert('Unexpected error', 'An unexpected error occurred. Please, try again.')
            break;
          }
        }
      }
    )
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
