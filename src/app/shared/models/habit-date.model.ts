import { HabitCheck } from './habit-check.model';

export class HabitDate {

    private date: string;
    private habitChecks: HabitCheck[];

    constructor(
        date: string,
        habitChecks: HabitCheck[]
    ) {
        this.date = date;
        this.habitChecks = [...habitChecks];
    }

    getCheckForHabitWithId(id: number): HabitCheck {
        return this.habitChecks && this.habitChecks.find(check => check.habitId === id);
    }
}
