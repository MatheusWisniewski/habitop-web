import { CheckedDate } from './checked-date.model';

export interface Habit {
    id?: number;
    name: string;
    icon: string;
    color: string;
    weekdays: number[];
    checkedDates?: CheckedDate[];
    createdDate: string;
}
