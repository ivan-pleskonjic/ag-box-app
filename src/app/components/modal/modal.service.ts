import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export enum ModalState {
  CLOSED = 'closed',
  OPEN = 'open',
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalState$: BehaviorSubject<any> = new BehaviorSubject(ModalState.CLOSED);

  open(): void {
    this.modalState$.next(ModalState.OPEN);
  }

  close(): void {
    this.modalState$.next(ModalState.CLOSED);
  }
}
