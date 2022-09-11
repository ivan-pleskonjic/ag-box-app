import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Box } from '@models/box.model';

@Component({
  selector: 'app-box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxCardComponent {
  @Input() box: Box;
  @Output() boxClicked: EventEmitter<any> = new EventEmitter();

  onBoxClicked(): void {
    this.boxClicked.emit();
  }
}
