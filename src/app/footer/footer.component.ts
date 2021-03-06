import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

import { AlertService } from '../services/_services/index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
newsForm: FormGroup;


  constructor(private db: AngularFireDatabase, private alert: AlertService) { }

  ngOnInit() {

  	this.newsForm = new FormGroup({
  		'email': new FormControl(null, Validators.required)
  	})
  }

  subscribe(){
  	if(this.newsForm.valid){
  		this.db.list('/newsletter').push({email: this.newsForm.value.email})
  		this.alert.success('Ladrope got you Sure you will like our newsletters')
  		this.newsForm.reset()
  	}else{
  		this.alert.error('Please enter email')
  	}
  }

}
