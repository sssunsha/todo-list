import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PaneComponent } from './pane/pane.component';
import { AngularMaterialModule } from '../core/angular-material.module';
import { AppService } from '../app.service';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';


@NgModule({
  imports: [
	CommonModule,
	AngularMaterialModule,
	FormsModule,
	StoreModule
  ],
  declarations: [
	  HeaderComponent,
	  PaneComponent
	],
  exports: [
	  HeaderComponent,
	  PaneComponent,
	],
	providers: [AppService]
})
export class BoardModule { }
