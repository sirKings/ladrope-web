import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription }   from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
	limit:BehaviorSubject<number> = new BehaviorSubject<number>(10);
	lastKey: string;
	queryable: boolean = true;
	throttle = 300;
	scrollDistance = 2;
	
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
		this.initialise(obj, this.gender)
	}

	cancel(){
		this.loading = true;
		this.initialise({orderByChild: 'name', limitToFirst: this.limit}, this.gender)
	}

	initialise(obj, gender){
		this.gender = gender;
		this.loading = true;
		this.startTracking();	
    	this.db.list('/cloths/' + gender, {
    		query: obj
    	}).subscribe((res)=>{
    		this.cloths = res;
    		this.loading = false;
    	});
     	
  	}



  	startTracking(){
  		this.db.list('/cloths/' + this.gender, {
  			query: {
  				orderByChild: 'name',
  				limitToLast: 1
  			}
  		}).subscribe((res) => {
  				if (res.length > 0) {
  				        this.lastKey = res[0].$key;
  				    } else {
  				        this.lastKey = '';
  				    }
  			});

  		this.db.list('/cloths/' +this.gender, {
  			query: {
  				orderByChild: 'name',
  				limitToFirst: this.limit
  			}
  		}).subscribe( (data) => {
  		    if (data.length > 0) {
  		        // If the last key in the list equals the last key in the database
  		        if (data[data.length - 1].$key === this.lastKey) {
  		            this.queryable = false;
  		        } else {
  		            this.queryable = true;
  		        }
  		    }
  		});


  	}

  	onScroll(){
  		if (this.queryable) {
  		        this.limit.next( this.limit.getValue() + 10);
  		    }
  	}

  	ngOnDestroy(){
  		this.menu.unsubscribe();
  	}

}
