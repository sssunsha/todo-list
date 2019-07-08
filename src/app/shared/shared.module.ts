import {NgModule} from '@angular/core';
import { AngularMaterialModule } from '../core/angular-material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AngularMaterialModule
	],
	declarations: [
		TableComponent,
	],
	exports: [
		TableComponent,
	],
})
export class SharedComponentModule {}