import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TriviaProvider {
  apiUrl: string = 'https://opentdb.com';

  constructor(public http: HttpClient) {
  }

  public getCategories() {
    return this.http.get(`${this.apiUrl}/api_category.php`);
  }

  public getToken() {
    return this.http.get(`${this.apiUrl}/api_token.php?command=request`);
  }

  public resetToken(token) {
    return this.http.get(`${this.apiUrl}/api_token.php?command=reset&token=${token}`);
  }

  public getQuestions(amount: number = 10, category?: number, difficulty?: string, type?: string) {
    let url = `${this.apiUrl}/api.php?amount=${amount}`;
    if (category && category !== 0) {
      url += `&category=${category}`;
    }
    if (difficulty && difficulty !== 'any') {
      url += `&difficulty=${difficulty}`;
    }
    if (type && type !== 'any') {
      url += `&type=${type}`;
    }
    return this.http.get(url);
  }

}
