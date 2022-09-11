import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { UserService } from '@services/user.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title!: string;

  currentUser$: BehaviorSubject<any> = this.userService.currentUser$;

  destroyed$: Subject<any> = new Subject();

  constructor(private modalService: ModalService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadCurrentUser();
    this.userService.walletUpdates().pipe(takeUntil(this.destroyed$)).subscribe();
  }

  onLoginClicked(): void {
    this.modalService.open();
  }

  ngOnDestroy(): void {
    /** This gets executed only on app destroy so this unsubscribing doesn't make a difference */
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }
}
