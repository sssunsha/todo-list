import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { AngularMaterialModule } from './core/angular-material.module';


@NgModule({
  declarations: [
	AppComponent,
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	AngularMaterialModule,
	BoardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
