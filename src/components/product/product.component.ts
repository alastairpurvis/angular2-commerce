import { NgModule, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Globals }  from '../../services/globals';
import { Actions }  from '../../services/actions';

@Component({
  selector: 'app-root',
  templateUrl: 'home.component.html',
  providers: [Globals, Actions]
})

export class HomeComponent {
    constructor (private globals: Globals) {
	// Variables
	this.mods = {};

	// Image zoom
	this.switchImage = src => this.imageSrc = src;

	// Display product
	this.display = function(product) {

		let k, v;

		// globals.page options
		globals.page.titleSet(product.title);

		// Assign data
		if (typeof product.image === 'undefined') {
			this.product = globals.page.format.product(product);
			globals.page.loader.update();
		} else {
			this.product = product;
		}

		if (!this.$$phase) {
			this.$apply();
		}

		// Assign modifiers
		if (Object.keys(product.modifiers).length > 0) {
			this.modifiers = product.modifiers;
			for (k in product.modifiers) {
				v = product.modifiers[k];
				this.mods[k] = 0;
			}
		}

		// Watch modifiers
		this.$watch('mods', function(n, o) {

			// Check not empty
			if ((Object.keys(n).length < 1) || (JSON.stringify(n) === JSON.stringify(o))) {
				return false;
			}

			// Variables
			let set    = true;
			let params = {status: 1, modifier: {}};

			// Check all are set
			for (k in n) {
				v = n[k];
				if ((v === '0') || (v === 0)) {
					set = false;
				} else {
					params.modifier[k] = v;
				}
			}

			// Check set
			if (!set) {
				delete params.modifier;
				params.slug = $routeParams.slug;
			}

			// Check cache
			if ((typeof params.modifier === 'undefined') && (this.cache.product[$routeParams.slug] !== 'undefined')) {
				this.product = this.cache.product[$routeParams.slug];
				if (!this.$$phase) {
					return this.$apply();
				}
			} else {
				return globals.shop.Product.Find(params, function(product) {
					this.product = globals.page.format.product(product);
					return this.$apply();
				});
			}
		}

		, true);

		// "Related" products
		return globals.shop.Product.Search({category: this.product.category.id, status: 1, limit: 5}, function(items) {

			let products = [];

			// Format products
			for (k in items) {
				v = items[k];
				if ( (v.id !== this.product.id) && (products.length < 4) ) {
					products.push(globals.page.format.product(v));
				}
			}

			// Assign data
			this.products = products;
			if (!this.$$phase) {
				return this.$apply();
			}
		});
	};

	// Get the product
	if ((Object.keys(this.cache.product).length > 0) && (typeof this.cache.product[$routeParams.slug] !== 'undefined')) {
		this.display(this.cache.product[$routeParams.slug]);
	} else {
		globals.page.loader.set(1);
		globals.shop.Product.Find({slug: $routeParams.slug, status: 1}, this.display);
	}

	return null;
}
}
