import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {config} from '../app.config'

@Injectable()
export class WordsService {
  constructor(private http: HttpClient) {
  }

  getWordsAll() {
    return this.http.get(`${config.apiUrl}/words`);
  }

}
