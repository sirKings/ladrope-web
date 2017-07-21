import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Location } from '@angular/common';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service'

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

//import { AuthServiceService } from '../services/auth-service.service';

import { file } from '../services/file';



@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
	user;
	authObserver;
	tailor;
	storageRef;
	currentUpload;
	updateForm;
	
	@ViewChild('logo') logo: ElementRef;
	@ViewChild('fi') progress: ElementRef;
	image1 = '';

  constructor(public afAuth: AngularFireAuth, public router: Location, public db: AngularFireDatabase, private auth: AuthServiceService) { 
  		 
  }


  ngOnInit() {
      this.tailor = this.auth.user
  		this.updateForm = new FormGroup({
      		'bank': new FormControl(null, [Validators.required]),
      		'accountname': new FormControl(null, [Validators.required]),
      		'account': new FormControl(null, [Validators.required]),
      		'displayName': new FormControl(null, [Validators.required]),
      		'name': new FormControl(null, [Validators.required]),
      		'address': new FormControl(null, [Validators.required]),
      		'phone': new FormControl(null, Validators.required),
      		'email': new FormControl(null, Validators.required)
      	});

  		this.updateform()

  }

  upload(e){
      let basePath = '/tailors/'+ this.tailor.uid + '/cloth';

      let upload = new file(e.target.files[0])

      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          this.progress.nativeElement.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
          console.log(error)
        },
        () => {
          // upload success
          this.image1 = uploadTask.snapshot.downloadURL;
          this.logo.nativeElement.src = this.image1;
          
          console.log(upload)
        }
      );
  }

  updateform(){
  		this.updateForm.get("address").setValue(this.tailor.address);
    	this.updateForm.get("phone").setValue(this.tailor.phone);
    	this.updateForm.get("name").setValue(this.tailor.name);
    	this.updateForm.get("email").setValue(this.tailor.email);
    	this.updateForm.get("account").setValue(this.tailor.account);
    	this.updateForm.get("accountname").setValue(this.tailor.accountname);
		this.updateForm.get("bank").setValue(this.tailor.bank);
		this.updateForm.get("displayName").setValue(this.tailor.displayName);
  }

  update(){
    if(this.updateForm.valid){
      if(this.image1){
        this.db.object('tailors/'+this.tailor.uid)
        .update({
          name: this.updateForm.value.name,
          address: this.updateForm.value.address,
          phone: this.updateForm.value.phone,
          email: this.updateForm.value.email,
          bank: this.updateForm.value.bank,
          account: this.updateForm.value.account,
          accountname: this.updateForm.value.accountname,
          displayName: this.updateForm.value.displayName,
          logo: this.image1,
        })
      } else{
        this.db.object('tailors/'+this.tailor.uid)
          .update({
            name: this.updateForm.value.name,
            address: this.updateForm.value.address,
            phone: this.updateForm.value.phone,
            email: this.updateForm.value.email,
            bank: this.updateForm.value.bank,
            account: this.updateForm.value.account,
            accountname: this.updateForm.value.accountname,
            displayName: this.updateForm.value.displayName
          })
      }

      this.router.back();
    }else {
      alert('Please fill in your details')
    }
  	
  	
  }

  getImg(){
  	if(this.tailor.logo){
  		return this.tailor.logo
  	}else {
  		return 'assets/images/upload_placeholder2.png'
  	}
  }

}
