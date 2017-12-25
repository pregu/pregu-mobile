import { Category } from '../category/category';

export class Question {
  category: Category;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;

  constructor(
    category: Category,
    type: string,
    difficulty: string,
    question: string,
    correctAnswer: string,
    incorrectAnswers: Array<string>
  ) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = incorrectAnswers;
  }
}
