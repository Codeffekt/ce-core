import { Component, OnInit } from '@angular/core';
import { Utils } from '../../../utils/Utils';
import { FormBlockComponent } from '../form-block/form-block.component';

const DEFAULT_TIME_FORMAT = "HH:mm:ss";
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const SUPPORTED_DATE_FORMATS = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'HH:mm:ss', 'HH:mm'];

@Component({
  selector: 'ce-form-timestamp-block',
  templateUrl: './form-timestamp-block.component.html',
  styleUrls: ['./form-timestamp-block.component.scss']
})
export class FormTimestampBlockComponent extends FormBlockComponent<number> implements OnInit {

  timeStr: string;
  dateStr: string;

  showTime: boolean = true;
  showDate: boolean = true;

  stepValue = 1;

  ngOnInit() {
    this.updateTimeDateStrWithValue();
    this.showDate = this.formBlock.params?.date || this.formBlock.params?.date == null;
    this.showTime = this.formBlock.params?.time || this.formBlock.params?.time == null;

    this.stepValue = this.timeFormat === DEFAULT_TIME_FORMAT ? 1 : 60;
  }

  onTimeChanged(timeStr: string) {
    this.timeStr = timeStr;
    this.updateValue();
    this.dateStr = Utils.getDateFormat(this.value, this.dateFormat);
  }

  onDateChanged(dateStr: string) {
    this.dateStr = dateStr;
    this.updateValue();
    this.timeStr = Utils.getDateFormat(this.value, this.timeFormat);
  }

  patchValue(value: number) {
    super.patchValue(value);
    this.updateTimeDateStrWithValue();
  }

  private updateTimeDateStrWithValue() {
    if (this.value) {
      this.dateStr = Utils.getDateFormat(this.value, this.dateFormat);
      this.timeStr = Utils.getDateFormat(this.value, this.timeFormat);
    }
  }

  private updateValue() {
    this.value = Utils.getTimeFromDateStr(
      `${this.dateStr} ${this.timeStr}`,
      SUPPORTED_DATE_FORMATS
    );
  }

  private get timeFormat() {
    return this.formBlock.params?.timeFormat ?? DEFAULT_TIME_FORMAT;
  }

  private get dateFormat() {
    return this.formBlock.params?.dateFormat ?? DEFAULT_DATE_FORMAT;
  }
}