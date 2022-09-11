import { Injectable } from '@angular/core';
import { take } from 'rxjs';

import { Apollo } from 'apollo-angular';

import { LOGIN_MUTATION } from '../graphql';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(email: string, password: string) {
    this.apollo
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password,
        },
      })
      .pipe(take(1))
      .subscribe();
  }
}
