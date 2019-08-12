import { HabitMonth } from './habit-month.model';

export class HabitYear {
    year: number;
    months: HabitMonth[];

    constructor(
        year: number,
        months: HabitMonth[]
    ) {
        this.year = year;
        this.months = [...months];
    }

    getMonth(month: number) {
        return this.months && this.months.find(m => m.month === month);
    }
}
