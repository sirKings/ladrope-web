import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import {AlertBar, AlertBarOptions, Placement, TextPlacement } from 'ng2-alert-bar';

import { Location } from '@angular/common';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-edit-design',
  templateUrl: './edit-design.component.html',
  styleUrls: ['./edit-design.component.css']
})
export class EditDesignComponent implements OnInit {

	postDesign: FormGroup;
	tailor;
	cloth;
	uid;
	public options: AlertBarOptions = new AlertBarOptions({
		placement: Placement.top,
		textPlacement: TextPlacement.left
	});

  constructor(public router: Location,  private auth: AuthServiceService, public db: AngularFireDatabase, private alert: AlertBar) { }

  ngOnInit() {
  	 this.postDesign = new FormGroup({
  	   'name': new FormControl(null, [Validators.required]),
  	   'price': new FormControl(null, [Validators.required]),
  	   'tags': new FormControl(null, Validators.required),
  	   'time': new FormControl(null, [Validators.required]),
  	   'description': new FormControl(null, Validators.required),
  	 });

  	this.tailor = this.auth.user;
  	this.cloth = this.auth.selectedCloth;
  	this.uid = this.auth.uid;

  	this.updateform()
  }

  getSellingPrice(num){
    let sellingPrice = 0;
    let percentage = 0.1* num;

     if(percentage < 1500){
      sellingPrice = num + 1500;
    }else{
      sellingPrice = num + percentage;
    }
    return Math.ceil(sellingPrice/100)*100;
  }

    updateform(){
    	this.postDesign.get("name").setValue(this.cloth.name);
    	this.postDesign.get("price").setValue(this.cloth.cost);
    	this.postDesign.get("tags").setValue(this.cloth.tags);
    	this.postDesign.get("time").setValue(this.cloth.time);
    	this.postDesign.get("description").setValue(this.cloth.description);
    }

    onSubmit(){
    	if(this.postDesign.valid){
    	  
    	   this.db.object('/cloths/' + this.cloth.gender +'/'+this.cloth.clothKey)
    	    .update({
			  name: this.postDesign.value.name,
    	      cost: this.postDesign.value.price,
    	      price: this.getSellingPrice(this.postDesign.value.price),
    	      time: this.postDesign.value.time,
    	      tags: this.postDesign.value.tags,
    	      description: this.postDesign.value.description,
    	    })

    	   this.db.object('/tailors/'+ this.tailor.uid+ '/cloths/'+this.cloth.tailorKey)
    	    .update({
    	      name: this.postDesign.value.name,
    	      cost: this.postDesign.value.price,
    	      price: this.getSellingPrice(this.postDesign.value.price),
    	      time: this.postDesign.value.time,
    	      tags: this.postDesign.value.tags,
    	      description: this.postDesign.value.description,
    	    })
    	    this.alert.success('Congratulations!!', 'Your design has been updated')
    	  }else {
    	    this.alert.error('Error','Please provide all details')
    	  }
   	}

   	back(){
   	    this.router.back();
   	  }

}
