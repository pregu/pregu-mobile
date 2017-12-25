import { Injectable } from '@angular/core';
import { Category } from '../../models/category/category';
import { Question } from '../../models/question/question';

@Injectable()
export class TriviaDataProvider {
  public token: string;
  public categories: Array<Category> = [new Category(0, 'Any')];
  public questions: Array<Question> = new Array();
}
