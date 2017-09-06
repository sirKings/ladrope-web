import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { AlertService } from '../../services/_services/index';
import * as firebase from 'firebase';

import { file } from '../../services/file';

import { Location } from '@angular/common';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-edit-design',
  templateUrl: './edit-design.component.html',
  styleUrls: ['./edit-design.component.css']
})
export class EditDesignComponent implements OnInit {
  @ViewChild('optImg') optImg: ElementRef;

	postDesign: FormGroup;
	tailor;
	cloth;
	uid;
  options;
  isOptions = false;
  optionImage;
  optionImgName;
  submitable = false;


  constructor(public router: Location, private auth: AuthServiceService, public db: AngularFireDatabase, private alert: AlertService) { }

  ngOnInit() {
  	 this.postDesign = new FormGroup({
  	   'name': new FormControl(null, [Validators.required]),
  	   'price': new FormControl(null, [Validators.required]),
  	   'tags': new FormControl(null, Validators.required),
  	   'time': new FormControl(null, [Validators.required]),
  	   'description': new FormControl(null, Validators.required),
       'optionsName': new FormControl(null)
  	 });

  	this.tailor = this.auth.user;
  	this.cloth = this.auth.selectedCloth;
  	this.uid = this.auth.uid;
    if(this.cloth.options){
      this.options = this.cloth.options;
    }

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
            options: this.getOptions(this.options)
    	    })

    	   this.db.object('/tailors/'+ this.tailor.uid+ '/cloths/'+this.cloth.tailorKey)
    	    .update({
    	      name: this.postDesign.value.name,
    	      cost: this.postDesign.value.price,
    	      price: this.getSellingPrice(this.postDesign.value.price),
    	      time: this.postDesign.value.time,
    	      tags: this.postDesign.value.tags,
    	      description: this.postDesign.value.description,
            options: this.getOptions(this.options)
    	    })
    	    this.alert.success('Congratulations!! Your design has been updated')
    	  }else {
    	    this.alert.error('Please provide all details')
    	  }
   	}

   	back(){
   	    this.router.back();
   	}

    remove(item, i){
      this.options.splice(i, 1);
      this.removeInStorage(item)
    }

    removeInStorage(item){
      let basePath = '/tailors/'+ this.tailor.uid + '/cloth';
      let storageRef = firebase.storage().ref();
      storageRef.child(`${basePath}/${item.imgName}`).delete().then(() =>{

      })
      .catch(()=>{

      });
    }

    getUniqueName() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    getOptions(arr){
      let options = {}
        for( var i in arr){
          options[i] = arr[i]
        }
        return options
    }

    addOption(){

      if(this.isOptions === true){

        this.options.push({name: this.postDesign.value.optionsName, image: this.optionImage, imgName: this.optionImgName})
        //this.displayOptions = this.getOptions(this.options)
        this.postDesign.value.optionsName = null;
      }else{
        this.isOptions = true;
      }
      this.submitable = true;
    }

    uploadOptionImage(e){
        this.submitable = false;
        let basePath = '/tailors/'+ this.tailor.uid + '/cloth';

        let upload = new file(e.target.files[0])
        let name = this.getUniqueName()
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child(`${basePath}/${name}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>  {
            // upload in progress
            this.optImg.nativeElement.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            // upload failed
          },
          () => {
            // upload success
            this.optionImage = uploadTask.snapshot.downloadURL;
            this.optionImgName = name;
          }
        );
    }

}
