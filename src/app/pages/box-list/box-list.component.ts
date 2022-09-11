import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { Box } from '@models/box.model';
import { BoxService } from '@services/box.service';

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxListComponent {
  boxes$ = this.boxService.getAll();

  constructor(private router: Router, private boxService: BoxService) {}

  onBoxClicked(box: Box): void {
    /** using some state management tool would be more appropriate here */
    this.boxService.setSelected(box);
    this.router.navigate(['box-details']);
  }
}
