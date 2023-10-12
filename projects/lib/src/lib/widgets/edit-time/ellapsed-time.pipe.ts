import { Pipe, PipeTransform } from '@angular/core';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/fr';

@Pipe({
    name: 'ellapsedTime'
})

export class CeEllapsedTimePipe implements PipeTransform {

    constructor() {
        dayjs.extend(relativeTime);
        dayjs.locale('fr')
    }

    transform(timestamp: number): string {
        return dayjs(timestamp).from(dayjs());
    }
}