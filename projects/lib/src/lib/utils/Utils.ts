import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import curstomParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(calendar);
dayjs.extend(curstomParseFormat);

export class Utils {
    public static getCalendarDate(time: number) {
        return dayjs(new Date(time)).calendar();
    }

    public static getDateFormat(time: number, format?: string): string {
        return dayjs(time).format(format);
    }

    public static getTimeFromDateStr(
        dateStr: string,
        format?: any
    ): number {
        return dayjs(dateStr, format).valueOf();
    }

    public static showMessage(snackBar: MatSnackBar, msg: string, duration = 2000) {
        snackBar.open(msg, undefined, { duration: duration });
    }

    public static deepcopy<T>(o: T): T {
        return o === undefined ? undefined : JSON.parse(JSON.stringify(o));
    }
}