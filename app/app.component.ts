import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {NavBarComponent} from './navbar.component';
import {HomeComponent} from './home.component';
import {UsersComponent} from './users/users.component';
import {UserFormComponent} from './users/user-form.component';
import {SettingsComponent} from './settings/settings.component';
import {NotFoundComponent} from './not-found.component';
import {SavingsComponent} from './savings/savings.component';
import {TimelineComponent} from './timeline/savings.component';
import {CredentialComponent} from './creds/savings.component';

@RouteConfig([
	{ path: '/', name: 'Home', component: HomeComponent },
	{ path: '/data', name: 'Data', component: UsersComponent },
	{ path: '/users/:id', name: 'EditUser', component: UserFormComponent },
	{ path: '/users/new', name: 'NewUser', component: UserFormComponent },
    { path: '/settings', name: 'Settings', component: SettingsComponent },
    { path: '/not-found', name: 'NotFound', component: NotFoundComponent },
	{ path: '/*other', name: 'Other', redirectTo: ['Home'] },
    { path: '/savings', name: 'Savings', component: SavingsComponent },
    { path: '/timeline', name: 'Timeline', component: TimelineComponent },
    { path: '/creds', name: 'Creds', component: CredentialComponent },

])
@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [NavBarComponent, ROUTER_DIRECTIVES]
})
export class AppComponent { }