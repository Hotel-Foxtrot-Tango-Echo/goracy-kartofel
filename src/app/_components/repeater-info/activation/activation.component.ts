import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RepeaterActivation } from 'src/app/shared/types/repeater-activation';

@Component({
  selector: 'mapy73pl-repeater-info-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterInfoActivationComponent  {

  public repeaterActivation = RepeaterActivation;

  @Input() option = ''
  @Input() optionData: boolean | number |string = false;



}
