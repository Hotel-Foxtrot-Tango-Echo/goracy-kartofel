import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultExportList } from 'src/app/shared/helper/export.helper';

@Component({
  selector: 'mapy73pl-export-row',
  templateUrl: './show-row.component.html',
  styleUrls: ['./show-row.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class ShowRowComponent  implements OnInit {

  @Input() exportList = defaultExportList
  @Input() nr: number = 0

  @Output() nameClicked = new EventEmitter<void>();
  // @Output() removeClicked = new EventEmitter<void>();
  @Output() mapClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}




}
