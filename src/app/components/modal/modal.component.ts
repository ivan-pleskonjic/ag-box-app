import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { ModalService, ModalState } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  display$: Observable<any> = this.modalService.modalState$;
  form: FormGroup;

  open: ModalState = ModalState.OPEN;

  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  close(): void {
    this.form.reset();
    this.modalService.close();
  }

  login(): void {
    const { email, password } = this.form.value;
    this.authService.login(email, password);
    this.close();
  }
}
