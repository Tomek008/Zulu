import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LittleTourComponent } from './app.component';

@NgModule({
  declarations: [
    LittleTourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [LittleTourComponent]
})
export class AppModule { }
