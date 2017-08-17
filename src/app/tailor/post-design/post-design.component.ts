import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { file } from '../../services/file';
import { AuthServiceService } from '../../services/auth-service.service';
import { AlertService } from '../../services/_services/index';


@Component({
  selector: 'app-post-design',
  templateUrl: './post-design.component.html',
  styleUrls: ['./post-design.component.css']
})
export class PostDesignComponent implements OnInit {
  genders = ['male', 'female'];
  postDesign: FormGroup;
  istag = false;
  option = [];
  tailor;
  optionImage;
  image1;
  image2;
  image3;
  image4;
  isOptions;
  displayOptions;

  
  @ViewChild('fi') fi: ElementRef;
  @ViewChild('s') s: ElementRef;
  @ViewChild('t') t: ElementRef;
  @ViewChild('ft') f: ElementRef;
  @ViewChild('imgfi') imgfi: ElementRef;
  @ViewChild('imgs') imgs: ElementRef;
  @ViewChild('imgt') imgt: ElementRef;
  @ViewChild('imgf') imgf: ElementRef;
  @ViewChild('optImg') optImg: ElementRef;


  constructor(public db: AngularFireDatabase, private alert: AlertService, private auth: AuthServiceService) {}

  ngOnInit() {
    this.postDesign = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'gender': new FormControl(null, Validators.required),
      'tags': new FormControl(null, Validators.required),
      'time': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, Validators.required),
      'optionsName': new FormControl()
    });

   this.tailor = this.auth.user
  
  }

  onSubmit() {
    if(this.postDesign.valid){
      if(this.image1 && this.image2 && this.image3 && this.image4) {
        let clothKey = this.db.list('/cloths/' + this.postDesign.value.gender)
        .push({
          image1: this.image1,
          image2: this.image2,
          image3: this.image3,
          image4: this.image4,
          name: this.postDesign.value.name,
          cost: this.postDesign.value.price,
          price: this.getSellingPrice(this.postDesign.value.price),
          time: this.postDesign.value.time,
          gender: this.postDesign.value.gender,
          tags: this.postDesign.value.tags,
          description: this.postDesign.value.description,
          likers: {
                hello: true
              },
          rating: 0,
          numComment: 0,
          likes: 0,
          label: this.tailor.name,
          labelId: this.tailor.uid,
          labelPhone: this.tailor.phone,
          options: this.getOptions(this.option),
          numSold: 0
        }).key

        let tailorkey = this.db.list('/tailors/'+ this.tailor.uid+ '/cloths')
        .push({
          image1: this.image1,
          image2: this.image2,
          image3: this.image3,
          image4: this.image4,
          name: this.postDesign.value.name,
          cost: this.postDesign.value.price,
          price: this.getSellingPrice(this.postDesign.value.price),
          time: this.postDesign.value.time,
          gender: this.postDesign.value.gender,
          labelPhone: this.tailor.phone,
          tags: this.postDesign.value.tags,
          description: this.postDesign.value.description,
          likers: {
                hello: true
              },
          rating: 0,
          numComment: 0,
          likes: 0,
          label: this.tailor.name,
          labelId: this.tailor.uid,
          numSold: 0,
          options: this.getOptions(this.option)
        }).key

        this.db.object('/cloths/'+ this.postDesign.value.gender + '/' + clothKey).update({clothKey: clothKey, tailorKey: tailorkey});
        this.db.object('/tailors/'+ this.tailor.uid+ '/cloths/' + tailorkey).update({clothKey: clothKey, tailorKey: tailorkey});

        this.postDesign.reset();
        this.clearImages();
        this.alert.success('Congratulations!! Your design has been posted')
      }else{
        this.alert.error('Error upload atleast four images')
      }
      
    }else {
        this.alert.error('Error Please provide all details')
      }
    
  }


  

  uploadFirstImage(e){
      let basePath = '/tailors/'+ this.tailor.uid + '/cloth';

      let upload = new file(e.target.files[0])

      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          this.fi.nativeElement.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
        },
        () => {
          // upload success
          this.image1 = uploadTask.snapshot.downloadURL;
          this.imgfi.nativeElement.src = this.image1;
          
        }
      );
  }

  uploadSecImage(e){
      let basePath = '/tailors/'+ this.tailor.uid + '/cloth';

      let upload = new file(e.target.files[0])

      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          this.s.nativeElement.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
        },
        () => {
          // upload success
         this.image2 = uploadTask.snapshot.downloadURL;
         this.imgs.nativeElement.src = this.image2;
        }
      );
  }

  uploadThirdImage(e){
      let basePath = '/tailors/'+ this.tailor.uid + '/cloth';

      let upload = new file(e.target.files[0])

      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          this.t.nativeElement.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
        },
        () => {
          // upload success
          this.image3 = uploadTask.snapshot.downloadURL;
          this.imgt.nativeElement.src = this.image3;
        }
      );
  }
  uploadFourthImage(e){
      let basePath = '/tailors/'+ this.tailor.uid + '/cloth';

      let upload = new file(e.target.files[0])

      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          this.f.nativeElement.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          // upload failed
        },
        () => {
          // upload success
          this.image4 = uploadTask.snapshot.downloadURL;
          this.imgf.nativeElement.src = this.image4;
        }
      );
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

  addOption(){

    if(this.isOptions === true){

      this.option.push({name: this.postDesign.value.optionsName, image: this.optionImage})
      //this.displayOptions = this.getOptions(this.options)
      this.postDesign.value.optionsName = null;
    }else{
      this.isOptions = true;
    }

  }

  clearOption(){
    this.option = [];
  }

  getOptions(arr){
    let options = {}
      for( var i in arr){
        options[i] = arr[i]
      }
      return options
  }

  uploadOptionImage(e){
      let basePath = '/tailors/'+ this.tailor.uid + '/cloth';

      let upload = new file(e.target.files[0])

      let storageRef = firebase.storage().ref();
      let uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

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
        }
      );
  }

  clearImages(){
    let arr = [this.imgf, this.imgfi, this.imgs, this.imgt]

    for(var i in arr){
      arr[i].nativeElement.src = "https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fupload_placeholder.png?alt=media&token=cb306f5d-1104-4585-9254-e93827db9502"
    }
  }

}
