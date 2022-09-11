import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, take } from 'rxjs';

import { Apollo, Query } from 'apollo-angular';

import { Box } from '@models/box.model';
import { ALL_BOXES_QUERY, OPEN_BOX_MUTATION } from '../graphql';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private SELECTED_BOX_KEY: string = 'selected-box';
  private _selectedBox: Box;

  constructor(private apollo: Apollo) {}

  getAll(): Observable<any> {
    return this.apollo
      .watchQuery<Query>({
        query: ALL_BOXES_QUERY,
      })
      .valueChanges.pipe(
        map(result => (<any>result.data).boxes.edges),
        catchError(() => EMPTY)
      );
  }

  setSelected(box: Box): void {
    this._selectedBox = box;
    localStorage.setItem(this.SELECTED_BOX_KEY, JSON.stringify(box));
  }

  getSelected(): any {
    if (this._selectedBox) return this._selectedBox;
    const box = localStorage.getItem(this.SELECTED_BOX_KEY);
    if (box) {
      return JSON.parse(box);
    }
  }

  open(box: Box) {
    return this.apollo
      .mutate({
        mutation: OPEN_BOX_MUTATION,
        variables: {
          input: { boxId: box.id, amount: 1 },
        },
      })
      .pipe(map(result => (<any>result.data).openBox.boxOpenings));
  }
}
