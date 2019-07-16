import {Md5} from "ts-md5";
import { EPageState, Ticket, IAlertConfig } from './app.model';
import { AlertComponent } from './shared/alert/alert.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

export function generateMd5Hash(data: string): string {
    return Md5.hashStr(data+Math.random()).toString();
}

export function generateCreatedAt(): string {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

}

export function updateArrayData(array: Array<any>, data: any, isAdd: boolean): void {
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

export function filterTicketsForPage(ticketArray: Array<Ticket>, pagestate: EPageState): Array<Ticket> {
	return ticketArray.filter(t => t.inPages.includes(pagestate));
}

export function createAlert(dialog: MatDialog, data: IAlertConfig): void {
	dialog.open(AlertComponent, {
		minWidth: '400px',
		maxWidth: '600px',
		panelClass: 'alert-custom',
		data: data
	  });

}

export function openSnackBar(snackBar: MatSnackBar, message: string, action= '', duration=2000) {
	snackBar.open(message, action, {duration: duration, panelClass: 'snackBar-custom'});
}