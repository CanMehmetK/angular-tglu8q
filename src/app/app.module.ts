import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule,RouterModule, FormsModule ],
  declarations: [ AppComponent,   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
