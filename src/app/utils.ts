import { Md5 } from "ts-md5";
import {
	EPageState,
	Ticket,
	IAlertConfig,
	ITicketRecurrency,
	TicketFile,
	ETicketRecurrencyType
} from './app.model';
import { AlertComponent } from './shared/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EDayOfWeek, EWeekOfMonth } from './app.model';

export class Helper {
	static generateMd5Hash(data: string): string {
		return Md5.hashStr(data + Math.random()).toString();
	}

	static generateCreatedAt(): string {
		const date = new Date();
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

	}

	// generate the Date later  than base date, defult is now
	// if the timeLate is negative number, the return date will be before than base date
	static generateDateLate(timeLate: number, base: Date = new Date()): Date {
		return new Date(base.getTime() + timeLate);
	}

	static updateArrayData(array: Array<any>, data: any, isAdd: boolean): Array<any> {
		if (isAdd) {
			array.push(data);
		} else {
			array = array.map(d => {
				if (d !== data) {
					return d;
				}
			})
		}
		return array = Array.from(new Set(array));
	}

	static filterTicketsForPage(ticketArray: Array<Ticket>, pagestate: EPageState): Array<Ticket> {
		return ticketArray.filter(t => t.inPages.includes(pagestate));
	}

	static createAlert(dialog: MatDialog, data: IAlertConfig): void {
		dialog.open(AlertComponent, {
			minWidth: '400px',
			maxWidth: '600px',
			panelClass: 'alert-custom',
			data: data
		});

	}

	static openSnackBar(snackBar: MatSnackBar, message: string, action = '', duration = 2000) {
		snackBar.open(message, action, { duration: duration, panelClass: 'snackBar-custom' });
	}

	// use the now timestamp as the version
	static generateVersion(): number {
		const now = new Date();
		return now.getTime();
	}

	static generateTicketFileName(): string {
		const now = new Date();
		return now.getFullYear().toString() + '.json';

	}

	static generateTicketFilePath(isLiveMode: boolean): string {
		if (isLiveMode) {
			return `todo-list/tickets/${this.generateTicketFileName()}`;
		} else {
			return `todo-list/mock-tickets/${this.generateTicketFileName()}`;
		}
	}

	static generateTicketFile(tickets: Array<Ticket>): TicketFile {
		const ticketFile: TicketFile = {
			version: this.generateVersion(),
			modifiedAt: this.generateCreatedAt(),
			value: tickets,
		}
		return ticketFile;
	}

	// convert time in month, day, hour, minute and seconds
	static timeCostFormat(timeCost: number): string {
		let timeCostInS = parseInt((timeCost / 1000).toString(), 10);
		let s = parseInt((timeCostInS % 60).toString(), 10);
		let m = parseInt((timeCostInS / 60 % 60).toString(), 10);
		let h = parseInt((timeCostInS / 3600 % 24).toString(), 10);
		let d = parseInt((timeCostInS / 86400 % 30).toString(), 10);
		let M = parseInt((timeCostInS / 2592000).toString(), 10);
		let timeCostAfterFormatted = '';
		if (M > 0) {
			timeCostAfterFormatted += `${M} month `;
		}
		if (d > 0) {
			timeCostAfterFormatted += `${d} day `;
		}
		if (h > 0) {
			timeCostAfterFormatted += `${h} hour `;
		}
		if (m > 0) {
			timeCostAfterFormatted += `${m} min `;
		}
		if (s > 0) {
			timeCostAfterFormatted += `${s} sec `;
		}
		return timeCostAfterFormatted;
	}

	static generateDefaultTicketAlarm(type: ETicketRecurrencyType = ETicketRecurrencyType.once): ITicketRecurrency {
		return {
			id: this.generateMd5Hash(this.generateCreatedAt() + 'ticket recurrency'),
			type: type,
			at: new Date(),
			interval: 1,
			legs: 10,
			dayOfWeek: EDayOfWeek.monday,
			weekOfMonth: EWeekOfMonth.first,
			index: 1,
		} as ITicketRecurrency;
	}

	static isDateToday(date: Date): boolean {
		const currentDate = new Date();

		return date.getFullYear() === currentDate.getFullYear()
			&& date.getMonth() === currentDate.getMonth()
			&& date.getDate() === currentDate.getDate();
	}

	static compareDateInMinutes(date1: Date, date2: Date): number {
		const d1 = new Date(date1);
		const d2 = new Date(date2);
		d1.setSeconds(0);
		d2.setSeconds(0);
		d1.setMilliseconds(0);
		d2.setMilliseconds(0);
		return d1.getTime() - d2.getTime();
	}
}