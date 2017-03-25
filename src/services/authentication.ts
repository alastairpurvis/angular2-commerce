import { Injectable } from '@angular/core';
import { Globals }  from '../core/app.module';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Config }  from './config';

@Component({
    styleUrls  : ['../services/moltin.js']
}

// Moltin class and authentication
@Injectable()
export class Store {
    constructor(private globals: Globals) {}

    authenticate() {
            let moltin = new Moltin({
            publicId: Config.publicId,
            notice(type, msg, code) {
                if (code === '404') {
                    this.globals.error = code;
                    this.parentRouter = Router;
                    this.parentRouter.navigateByUrl('/error');
                } else {
                    this.globals.notices = [];
                    type = type === 'error' ? 'danger' : type;
                    if (typeof msg === 'string') {
                        this.globals.notices.push({type, msg});
                    } else {
                        for (let e in msg) {
                            let p = msg[e];
                            let data = '';
                            if (typeof p === 'string') {
                                data = p;
                            } else {
                                for (let k in p) { let v = p[k]; data += v+'<br />'; }
                            }
                            console.log(data);
                            this.globals.notices.push({type, msg: data});
                        }
                    }
                }
                console.log(Config.publicId);
                return this.globals.$apply();
            }
        });
        // Authenticate
        return moltin.Authenticate(authenticate);
    }
}
