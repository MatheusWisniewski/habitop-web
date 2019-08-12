import { HabitCheck } from './habit-check.model';

export class HabitDay {

    public day: number;
    public habitChecks: HabitCheck[];
    public isOneChecked: boolean;
    public isAllChecked: boolean;

    constructor(
        day: number,
        habitChecks: HabitCheck[]
    ) {
        this.day = day;
        this.habitChecks = [...habitChecks];
        this.isOneChecked = this.oneChecked();
        this.isAllChecked = this.allChecked();
    }

    getCheckForHabitWithId(id: number): HabitCheck {
        return this.habitChecks && this.habitChecks.find(check => check.habitId === id);
    }

    oneChecked() {
        return this.habitChecks && this.habitChecks.length && this.habitChecks.reduce((sum, check) => {
            return sum || check.isChecked;
        }, false);
    }

    allChecked() {
        return this.habitChecks && this.habitChecks.length && this.habitChecks.reduce((sum, check) => {
            return sum && check.isChecked;
        }, true);
    }
}
