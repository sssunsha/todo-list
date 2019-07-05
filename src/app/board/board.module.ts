import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PaneComponent } from './pane/pane.component';
import { AngularMaterialModule } from '../core/angular-material.module';
import { AppService } from '../app.service';


@NgModule({
  imports: [
	CommonModule,
	AngularMaterialModule,
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
