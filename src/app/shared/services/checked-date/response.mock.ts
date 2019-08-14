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
            month: 7,
            days: [
                {...exampleNoneDay, day: 1, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 2, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 3, habitChecks: exampleAtLeastOneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 4, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 5, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 6, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 7, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 8, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 9, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 10, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 11, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 12, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 13, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 14, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 15, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 16, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 17, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 18, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 19, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 20, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 21, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 22, habitChecks: exampleAtLeastOneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 23, habitChecks: exampleAtLeastOneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 24, habitChecks: exampleAtLeastOneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 25, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 26, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 27, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 28, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 29, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 30, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 31, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
            ]
        },
        {
            month: 8,
            days: [
                {...exampleNoneDay, day: 1, habitChecks: exampleAtLeastOneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 2, habitChecks: examplePerfectDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 3, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 4, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 5, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 6, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 7, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 8, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 9, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 10, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 11, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 12, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 13, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 14, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 15, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 16, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 17, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 18, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 19, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 20, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 21, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 22, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 23, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 24, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 25, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 26, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 27, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 28, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 29, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 30, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 31, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
            ]
        },
        {
            month: 9,
            days: [
                {...exampleNoneDay, day: 1, habitChecks: exampleAtLeastOneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 2, habitChecks: examplePerfectDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 3, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 4, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 5, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 6, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 7, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleAtLeastOneDay, day: 8, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 9, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 10, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...examplePerfectDay, day: 11, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 12, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 13, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 14, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 15, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 16, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 17, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 18, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 19, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 20, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 21, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 22, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 23, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 24, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 25, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 26, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 27, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 28, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 29, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))},
                {...exampleNoneDay, day: 30, habitChecks: exampleNoneDay.habitChecks.map(c => ({...c, id: Math.random()}))}
            ]
        }
    ]
};

