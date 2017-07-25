import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';

import { AuthServiceService } from '../services/auth-service.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy{
	user;
	cloths;
	filterOptions;
	loading;
	menu: Subscription;
	isMenu = false;
	gender;
	
	constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private formBuilder: FormBuilder, private authservice: AuthServiceService){
		

	}

	ngOnInit(){
		this.user = this.authservice.user

		

		this.filterOptions = this.formBuilder.group({
		  class: '',
		})

		this.menu = this.authservice.showMenu.subscribe((res) =>{
			this.isMenu = res;
			console.log(this.isMenu); 
		})
		
	}

	filter(){
		let obj = {
			orderByChild: 'tags',
			equalTo: this.filterOptions.value.class
		}
		this.initialise(obj, this.user.gender)
	}

	cancel(){
		this.loading = true;
		this.initialise({}, this.gender)
	}

	initialise(obj, gender){
		this.loading = true;	
    	this.db.list('/cloths/' + gender, {
    		query: obj
    	}).subscribe((res)=>{
    		this.cloths = res;
    		this.loading = false;
    	});
     	
  	}


  	ngOnDestroy(){
  		this.menu.unsubscribe();
  	}

}
