import { IHabitYear } from '../../models/habit-year.model';

const exampleNoneDay = {
    day: 1,
    habitChecks: [
        {
            id: 1,
            habitId: 1,
            isChecked: false,
            streak: 2
        },
        {
            id: 2,
            habitId: 2,
            isChecked: false,
            streak: 0
        },
        {
            id: 3,
            habitId: 3,
            isChecked: false,
            streak: 2
        },
        {
            id: 4,
            habitId: 4,
            isChecked: false,
            streak: 0
        },
        {
            id: 5,
            habitId: 5,
            isChecked: false,
            streak: 2
        },
        {
            id: 6,
            habitId: 6,
            isChecked: false,
            streak: 0
        }
    ]
};

const exampleAtLeastOneDay = {
    day: 1,
    habitChecks: [
        {
            id: 1,
            habitId: 1,
            isChecked: false,
            streak: 2
        },
        {
            id: 2,
            habitId: 2,
            isChecked: true,
            streak: 0
        },
        {
            id: 3,
            habitId: 3,
            isChecked: false,
            streak: 2
        },
        {
            id: 4,
            habitId: 4,
            isChecked: false,
            streak: 0
        },
        {
            id: 5,
            habitId: 5,
            isChecked: true,
            streak: 2
        },
        {
            id: 6,
            habitId: 6,
            isChecked: false,
            streak: 0
        }
    ]
};

const examplePerfectDay = {
    day: 1,
    habitChecks: [
        {
            id: 1,
            habitId: 1,
            isChecked: true,
            streak: 2
        },
        {
            id: 2,
            habitId: 2,
            isChecked: true,
            streak: 1
        },
        {
            id: 3,
            habitId: 3,
            isChecked: true,
            streak: 2
        },
        {
            id: 4,
            habitId: 4,
            isChecked: true,
            streak: 1
        },
        {
            id: 5,
            habitId: 5,
            isChecked: true,
            streak: 2
        },
        {
            id: 6,
            habitId: 6,
            isChecked: true,
            streak: 5
        }
    ]
};

export const mockResponseFromServer: IHabitYear = {
    year: 2019,
    months: [
        {
            month: 8,
            days: [
                {...exampleNoneDay, day: 1},
                {...exampleAtLeastOneDay, day: 2},
                {...examplePerfectDay, day: 3},
                {...examplePerfectDay, day: 4},
                {...examplePerfectDay, day: 5},
                {...exampleAtLeastOneDay, day: 6},
                {...exampleAtLeastOneDay, day: 7},
                {...exampleAtLeastOneDay, day: 8},
                {...examplePerfectDay, day: 9},
                {...examplePerfectDay, day: 10},
                {...examplePerfectDay, day: 11},
                {...exampleNoneDay, day: 12},
                {...exampleNoneDay, day: 13},
                {...exampleNoneDay, day: 14},
            ]
        }
    ]
};

