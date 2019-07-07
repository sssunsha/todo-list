import { Action } from '@ngrx/store';
import { Ticket } from '../app.model';

export enum EPageActionType {
    inbox_in = 'inbox_in',
    inbox_out = 'inbox_out',
    today_in = 'today_in',
    today_out = 'today_out',
    this_week_in = 'week_in',
    this_week_out = 'week_out',
    this_month_in = 'month_in',
    this_month_out = 'month_out',
    future_in = 'future_in',
    future_out = 'future_out',
    work_in = 'work_in',
    work_out = 'work_out',
    life_in = 'life_in',
    life_out = 'life_out',
    others_in = 'others_in',
    others_out = 'others_out',
    statistics_in = 'statistics_in',
    statistics_out = 'statistics_out',
}

export class InboxInAction implements Action {
    readonly type = EPageActionType.inbox_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class InboxOutAction implements Action {
    readonly type = EPageActionType.inbox_out;
    constructor(data: Partial<Ticket>) {
    }
}

export class TodayInAction implements Action {
    readonly type = EPageActionType.today_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class TodayOutAction implements Action {
    readonly type = EPageActionType.today_out;
    constructor(data: Partial<Ticket>) {
    }
}

export class ThisWeekInAction implements Action {
    readonly type = EPageActionType.this_week_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class ThisWeekOutAction implements Action {
    readonly type = EPageActionType.this_week_out;
    constructor(data: Partial<Ticket>) {
    }
}

export class ThisMonthInAction implements Action {
    readonly type = EPageActionType.this_month_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class ThisMonthOutAction implements Action {
    readonly type = EPageActionType.this_month_out;
    constructor(data: Partial<Ticket>) {
    }
}

export class FutureInAction implements Action {
    readonly type = EPageActionType.future_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class FutureOutAction implements Action {
    readonly type = EPageActionType.future_out;
    constructor(data: Partial<Ticket>) {
    }
}

export class WorkInAction implements Action {
    readonly type = EPageActionType.work_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class WorkOutAction implements Action {
    readonly type = EPageActionType.work_out;
    constructor(data: Partial<Ticket>) {
    }
}

export class LifeInAction implements Action {
    readonly type = EPageActionType.life_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class LifeOutAction implements Action {
    readonly type = EPageActionType.life_out;
    constructor(data: Partial<Ticket>) {
    }
}

export class OthersInAction implements Action {
    readonly type = EPageActionType.others_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class OthersOutAction implements Action {
    readonly type = EPageActionType.others_out;
    constructor(data: Partial<Ticket>) {
    }
}

export class StatisticsInAction implements Action {
    readonly type = EPageActionType.statistics_in;
    constructor(data: Partial<Ticket>) {
    }
}

export class StatisticsOutAction implements Action {
    readonly type = EPageActionType.statistics_out;
    constructor(data: Partial<Ticket>) {
    }
}

export type Actions
    = InboxInAction
    | InboxOutAction
    | TodayInAction
    | TodayOutAction
    | ThisWeekInAction
    | ThisWeekOutAction
    | ThisMonthInAction
    | ThisMonthOutAction
    | FutureInAction
    | FutureOutAction
    | WorkInAction
    | WorkOutAction
    | LifeInAction
    | LifeOutAction
    | OthersInAction
    | OthersOutAction
    | StatisticsInAction
    | StatisticsOutAction


