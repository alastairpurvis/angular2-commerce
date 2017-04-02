import { NgModule, Component, NgZone,Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Globals }  from '../../services/globals';
import { Actions }  from '../../services/actions';
import * as moltin  from '../../services/moltin/moltin';

@Component({
  selector: 'app-page',
  templateUrl: 'home.component.html'
})

export class HomeComponent {

    products: any[] = [];
    generateArray(obj){
       return Object.keys(obj).map((key)=>{ return obj[key]});
    }
    constructor (public globals: Globals, private actions: Actions,) {

        // Get featured products
        this.products = globals.shop.Product.Search({featured: 1, status: 1, limit: 9}).then(function(productarr) {
            return productarr.data;
        });
    }
}
