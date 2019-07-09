import {NgModule} from '@angular/core';
import { AngularMaterialModule } from '../core/angular-material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { StarComponent } from './star/star.component';
import { ProgressComponent } from './progress/progress.component';
import { CardComponent } from './card/card.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AngularMaterialModule
	],
	declarations: [
		TableComponent,
		StarComponent,
		ProgressComponent,
		CardComponent,
	],
	exports: [
		TableComponent,
		StarComponent,
		CardComponent,
	],
})
export class SharedComponentModule {}