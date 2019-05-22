import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../_models';
import {config} from '../app.config'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get(`${config.apiUrl}/users` + id);
  }

  register(user: User) {
    return this.http.post(`${config.apiUrl + '/register'}`, user);
  }

  update(user: User) {
    return this.http.put(`${config.apiUrl}/users`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${config.apiUrl}/users/` + id);
  }
}
