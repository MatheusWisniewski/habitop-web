import { Observable } from 'rxjs';

export interface DateCircleInfo {
    date: string;
    checks$: Observable<{isOneChecked: boolean, isAllChecked: boolean}>;
}
