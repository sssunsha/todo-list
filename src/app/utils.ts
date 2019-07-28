import {Md5} from "ts-md5";
import { EPageState,
		Ticket,
		IAlertConfig,
		IRecurrency,
		TicketFile, 
		TicketRecurrencyType} from './app.model';
import { AlertComponent } from './shared/alert/alert.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

export class Helper {
	static generateMd5Hash(data: string): string {
		return Md5.hashStr(data+Math.random()).toString();
	}
	
	static generateCreatedAt(): string {
		const date = new Date();
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	
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
		return array =  Array.from(new Set(array));
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
	
	static openSnackBar(snackBar: MatSnackBar, message: string, action= '', duration=2000) {
		snackBar.open(message, action, {duration: duration, panelClass: 'snackBar-custom'});
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
		let timeCostInS = timeCost / 1000;
		let s = timeCostInS % 60;
		let m =  timeCostInS / 60 % 60;
		let h = timeCostInS / 3600 % 24;
		let d = timeCostInS / 86400 % 30;
		let M = timeCostInS / 2592000;
		let timeCostAfterFormatted = M ? `${M} month ` : '' 
			+ d ? `${d} day ` : '' + h ? `${h} hour ` : '' + m ? `${m} m ` : '' + s ? `${s} s` : ''  
		return timeCostAfterFormatted;
	}

	static generateDefaultTicketAlarm(isRecurrency: boolean = false): IRecurrency {
		if (isRecurrency) {
			return {
				id: this.generateMd5Hash(this.generateCreatedAt() + 'ticket recurrency'),
				type: TicketRecurrencyType.day,
				at: null,
				interval: 1,
				legs: 10,
			}
		} else {
			return {
				id: this.generateMd5Hash(this.generateCreatedAt() + 'ticket alarm'),
				type: TicketRecurrencyType.once,
				at: null, // need be set latter
			} as IRecurrency;
		}
	}
}