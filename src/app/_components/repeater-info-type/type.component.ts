import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RepeaterType } from 'src/app/shared/types/repeater-type';

@Component({
  selector: 'mapy73pl-repeater-info-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterInfoTypeComponent  {

  public repeaterType = RepeaterType;

  @Input() type = ''



}
