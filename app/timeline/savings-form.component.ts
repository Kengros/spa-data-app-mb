import {Component, OnInit} from '@angular/core';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {CanDeactivate, Router, RouteParams} from '@angular/router-deprecated';

import {BasicValidators} from '../shared/basicValidators';
import {SavingsService} from './savings.service';
import {User} from './savings';

@Component({
    templateUrl: 'app/savings/savings-form.component.html',
    providers: [SavingsService]
})
export class UserFormComponent implements OnInit, CanDeactivate {
	form: ControlGroup;
    title: string;
    user = new User();

	constructor(
        fb: FormBuilder,
        private _router: Router,
        private _routeParams: RouteParams,
        private _savingsService: SavingsService
    ) {
		this.form = fb.group({
			name: ['', Validators.required],
			email: ['', BasicValidators.email],
			phone: [],
			address: fb.group({
				street: [],
				suite: [],
				city: [],
				zipcode: []
			})
		});
	}
    
    ngOnInit(){
        var id = this._routeParams.get("id");
        
        this.title = id ? "Edit User" : "New User";
        
        if (!id)
			return;
            
        this._savingsService.getUser(id)
			.subscribe(
                user => this.user = user,
                response => {
                    if (response.status == 404) {
                        this._router.navigate(['NotFound']);
                    }
                });
    }
    
    routerCanDeactivate(){
		if (this.form.dirty)
			return confirm('You have unsaved changes. Are you sure you want to navigate away?');

		return true; 
	}
    
    save(){
        var result;
        
        if (this.user.id) 
            result = this._savingsService.updateUser(this.user);
        else
            result = this._savingsService.addUser(this.user)
            
		result.subscribe(x => {
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            this._router.navigate(['Users']);
        });
	}
}