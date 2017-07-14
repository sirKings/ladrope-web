import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-post-design',
  templateUrl: './post-design.component.html',
  styleUrls: ['./post-design.component.css']
})
export class PostDesignComponent implements OnInit {
  genders = ['male', 'female'];
  postDesign: FormGroup;
  istag = false;

  constructor() {}

  ngOnInit() {
    this.postDesign = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'gender': new FormControl('male'),
      'tags': new FormControl(''),
      'time': new FormControl(null, [Validators.required])
    });
    
  }

  onSubmit() {
    console.log(this.postDesign.value);
    this.postDesign.reset();
  }

  onAddHobby(t) {
  	if(this.istag){
  		this.postDesign.value.tags = this.postDesign.value.tags + ', ' + t.value;
  	} else {
  		this.postDesign.value.tags = t.value;
  		this.istag = true;
  	}
    console.log(this.postDesign.value.tags)
    t.value = '';
  }

}
