import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavBarComponent {
    lock = new Auth0Lock('gL7vjq8cEKsVZLTrhlNrxOk5ysDwwyds', 'mistbox.auth0.com');
    JwtHelper: JwtHelper = new JwtHelper();
    constructor(private _router: Router){
    }

    login() {
        var self = this;
        this.lock.show((err: string, profile: string, id_token: string) => {
            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

            console.log(
                this.JwtHelper.decodeToken(id_token),
                this.JwtHelper.getTokenExpirationDate(id_token),
                this.JwtHelper.isTokenExpired(id_token)
            );

        self.loggedIn();
        location.reload();
        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');

        this.loggedIn();
        location.reload();
    }

    loggedIn() {
        return tokenNotExpired();
    }
    isCurrentRoute(route){
        var instruction = this._router.generate(route);
        return this._router.isRouteActive(instruction);
    }
 }