import { Habit } from './habit.model';

export interface HabitWithDayInfo extends Habit {
    isChecked: boolean;
    streak: number;
    checkId: number;
}
