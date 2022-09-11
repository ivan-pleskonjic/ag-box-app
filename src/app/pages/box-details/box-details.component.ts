import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { Box } from '@models/box.model';
import { BoxService } from '@services/box.service';

@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxDetailsComponent {
  box: Box = this.boxService.getSelected();
  boxOpenings: any[];
  loading: boolean;

  constructor(private boxService: BoxService, private changeDetectorRef: ChangeDetectorRef) {}

  open() {
    this.loading = true;
    this.boxService.open(this.box).subscribe({
      next: openings => {
        this.boxOpenings = openings;
      },
      complete: () => {
        this.loading = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }
}
