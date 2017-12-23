import { Category } from '../category/category';

export class Question {
  category: Category;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
}
