import { HabitDay } from './habit-day.model';

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

    getNumberOfPerfectDays(): number {
        return this.days && this.days.reduce((sum, cur) => {
            return sum += cur.isAllChecked ? 1 : 0;
        }, 0);
    }
}
