import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';

import { Apollo, Query } from 'apollo-angular';

import { Wallet } from '@models/wallet.model';
import { CURRENT_USER_QUERY, WALLET_UPDATE_SUBSCRIPTION } from '../graphql';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private apollo: Apollo) {}

  loadCurrentUser(): void {
    this.apollo
      .watchQuery<Query>({
        query: CURRENT_USER_QUERY,
      })
      .valueChanges.pipe(
        tap(result => this.handleCurrentUser(result)),
        catchError(() => EMPTY)
      )
      .subscribe();
  }

  private getWalletSum(wallets: Wallet[]): number {
    // ignoring the option of having wallets with different currencies
    return wallets.map(w => w.amount).reduce((sum, amount) => sum + amount, 0);
  }

  private handleCurrentUser(result: any): void {
    const currentUser = (<any>result).data.currentUser;

    if (currentUser) {
      const walletSum = this.getWalletSum(currentUser.wallets);
      this.currentUser$.next({ user: currentUser, walletSum });
    }
  }

  walletUpdates(): Observable<any> {
    return this.apollo
      .subscribe({
        query: WALLET_UPDATE_SUBSCRIPTION,
      })
      .pipe(
        map(update => (<any>update).data.updateWallet.wallet),
        tap(wallet => this.handleWalletUpdate(wallet)),
        catchError(() => EMPTY)
      );
  }

  private handleWalletUpdate(wallet: Wallet): void {
    if (!wallet) return;

    const currentUser = this.currentUser$.getValue().user;
    const wallets = currentUser.wallets.filter((w: Wallet) => w.id === wallet.id);
    const walletSum = this.getWalletSum([...wallets, wallet]);

    this.currentUser$.next({ user: currentUser, walletSum });
  }
}
