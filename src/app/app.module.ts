// Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Router } from './app.routes';
import { Config }  from '../services/config';
import { Globals }  from '../services/globals';
import { Actions }  from '../services/actions';
import Schema  from 'schema-client';\

// Declarations
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Router)
  ],
  providers: [Globals, Actions],
  bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private globals: Globals) {

        globals.shop = new Schema.Client('angularcommerce', 'qww4HTd6rDDEZcDLMZBahLce2wehQCEk');

        globals.shop.Authenticate().then((response) => {
          console.log('authenticated', response);
        });

    }
}
