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
	
	constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private formBuilder: FormBuilder, private authservice: AuthServiceService){
		
        this.loading = true;

	}

	ngOnInit(){
		this.user = this.authservice.user

		this.initialise({})

		this.filterOptions = this.formBuilder.group({
		  class: '',
		})

		this.menu = this.authservice.showMenu.subscribe((res) =>{
			this.isMenu = res;
			console.log(this.isMenu); 
		})
		
	}

	filter(){
		this.loading = true;
		let obj = {
			orderByChild: 'tags',
			equalTo: this.filterOptions.value.class
		}
		this.initialise(obj)
	}

	cancel(){
		this.loading;
		this.initialise({})
	}

	initialise(obj){	
    	this.db.list('/cloths', {
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
