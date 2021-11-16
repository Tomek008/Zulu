import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LittleTourComponent } from './app.component';

import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  declarations: [
    LittleTourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ 
    HttpClientModule
  ],
  bootstrap: [LittleTourComponent]
})
export class AppModule { }
