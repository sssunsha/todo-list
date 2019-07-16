import {Md5} from "ts-md5";
import { EPageState, Ticket, IAlertConfig } from './app.model';
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
	
	static updateArrayData(array: Array<any>, data: any, isAdd: boolean): void {
		if (isAdd) {
			array.push(data);
		} else {
			array = array.map(d => {
				if (d !== data) {
					return d;
				}
			})
		}
		array =  Array.from(new Set(array));
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
		return now.getFullYear().toString();

	}
}