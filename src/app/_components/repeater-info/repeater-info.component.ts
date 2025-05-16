import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { defalutRepeaterDataLocation, defaultRepeaterData} from 'src/app/shared/services/repeaterPage.service';

@Component({
  selector: 'mapy73pl-repeater-info',
  templateUrl: './repeater-info.component.html',
  styleUrls: ['./repeater-info.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeaterInfoComponent  {

  @Input() repeaterDataLocation = defalutRepeaterDataLocation;
  @Input() bandName = ''
  @Input() repeaterData = defaultRepeaterData;

  @Input() showMoreData = true
  @Input() showLocationTitle = false

}

