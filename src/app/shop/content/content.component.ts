import { Component, OnInit, Input } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

 @Input() cloth;
 numComment;
 comments: FirebaseListObservable<any[]>;
 comment: FormGroup;
 user;
 uid;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private formBuilder: FormBuilder, private auth: AuthServiceService) { }

  ngOnInit() {
  	this.user = this.auth.user;
    this.uid = this.auth.uid;
  	this.comments = this.db.list('/cloths/'+this.cloth.$key +'/comment', {
        query: {
            orderByKey: true,
            }
    });
    
    this.comment = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required])]
    })

  }

  sendComment(){
       
      if (!this.comment.valid){
      
      } else {
      	console.log(this.user)
         this.comments.push({
         title: this.user.displayName,
         message: this.comment.value.message
          })
          this.cloth.numComment++;
          this.comment.reset()
      }
     
  }

  like () {
      //console.log(cloth.likers)
      let num = this.cloth.likes
      if(this.cloth.likers[this.uid] === true){
        num--;
        this.db.object('/cloths/'+this.cloth.$key).update({likes: num});
        this.cloth.likers[this.uid] = null;
      } else {
       num++ 
      this.db.object('/cloths/'+this.cloth.$key).update({likes: num});
       this.cloth.likers[this.uid] = true;
      }
     this.db.object('/cloths/'+this.cloth.$key).update({likers: this.cloth.likers})
  }


}
