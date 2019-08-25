export interface  CheckedDate {
    id: number;
    habitId: number;
    isChecked: boolean;
    streak: number;
    previousId: number;
    date: string;
}
