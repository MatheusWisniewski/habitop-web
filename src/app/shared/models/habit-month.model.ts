import { HabitDay, IHabitDay } from './habit-day.model';
import * as moment from 'moment';

export class IHabitMonth {
    month: number;
    days: IHabitDay[];
}

export class HabitMonth {
    month: number;
    days: HabitDay[];

    constructor(
        month: number,
        days: HabitDay[]
    ) {
        this.month = month;
        this.days = [...days];
    }

    getDay(day: number) {
        return this.days && this.days.find(d => d.day === day);
    }

    getDate(date: string) {
        return this.getDay(moment(date, 'DD-MM-YYYY').date());
    }

    getNumberOfPerfectDays(): number {
        return this.days && this.days.reduce((sum, cur) => {
            return sum += cur.isAllChecked ? 1 : 0;
        }, 0);
    }
}
