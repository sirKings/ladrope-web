import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { file } from './file';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  //private basePath:string;

  pushUpload(upload: file, tailor) {
  	let basePath = '/tailors/'+ tailor.uid + '/logo';

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        this.saveLogoUrl(upload.url, tailor)
        console.log(upload)
      }
    );
  }

  // Writes the file details to the realtime db
  private saveLogoUrl(url, tailor) {
  	let basePath = '/tailors/'+ tailor.uid;
    this.db.object(`${basePath}/`).update({
    	logo: url
    });
  }

  uploadCloth(upload: file, tailor){
  		let basePath = '/tailors/'+ tailor.uid + '/cloth';

  	  let storageRef = firebase.storage().ref();
  	  let uploadTask = storageRef.child(`${basePath}/${upload.file.name}`).put(upload.file);

  	  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  	    (snapshot) =>  {
  	      // upload in progress
  	      upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  	    },
  	    (error) => {
  	      // upload failed
  	      console.log(error)
  	    },
  	    () => {
  	      // upload success
  	      upload.url = uploadTask.snapshot.downloadURL;
  	      //this.saveLogoUrl(upload.url, tailor)
  	      console.log(upload)
  	    }
  	  );
  }

  deleteUpload(upload: file, tailor) {
  	let basePath = '/tailors/'+ tailor.uid;
    this.deleteFileData(upload.$key, basePath)
    .then( () => {
      this.deleteFileStorage(upload.name, basePath)
    })
    .catch(error => console.log(error))
  }
  // Deletes the file details from the realtime db
  private deleteFileData(key: string, basePath) {
  	
    return this.db.list(`${basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string, basePath) {
  	
    let storageRef = firebase.storage().ref();
    storageRef.child(`${basePath}/${name}`).delete()
  }
}