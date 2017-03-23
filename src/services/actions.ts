
import { NgModule, Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Config }  from './config';

@Injectable()
export class Actions {

	private first(obj){
		return obj[Object.keys(obj)[0]];
	}
	public formatCategory(category) {
		category.image = Object.keys(category.images).length > 0 ? this.first(category.images) : {url: {http: '/img/no-img.jpg', https: '/img/no-img.jpg'}};

		return category;
	}

	public formatCollection(collection) {
		collection.image = Object.keys(collection.images).length > 0 ? this.first(collection.images) : {url: {http: '/img/no-img.jpg', https: '/img/no-img.jpg'}};
		return collection;
	}

	public formatProduct(product) {
		product.category = this.first(product.category.data);
		product.image    = Object.keys(product.images).length > 0 ? this.first(product.images) : {url: {http: '/img/no-img.jpg', https: '/img/no-img.jpg'}};

		return product;
	}
}
