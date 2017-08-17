import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { AlertService } from '../services/_services/alert.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
query;
emailVerified = false;
emailVerifyfail = false;
verifyemail;
verifypass;
loading;

resetPass= false;
passReseted = false;
accountEmail;
newPassword;
  constructor(private routeparam: ActivatedRoute, private route: Router, private alert: AlertService, private auth: AngularFireAuth) { }

  ngOnInit() {
  	this.loading = true
   this.query = this.routeparam.snapshot.queryParams
  	switch (this.query.mode) {
  	    case 'resetPassword':
  	      // Display reset password handler and UI.
  	      this.handleResetPassword(this.auth.auth, this.query.oobCode);
  	      break;
  	    case 'recoverEmail':
  	      // Display email recovery handler and UI.
  	      this.handleRecoverEmail(this.auth.auth, this.query.oobCode);
  	      break;
  	    case 'verifyEmail':
  	    	console.log('case attempted')
  	      // Display email verification handler and UI.
  	      this.handleVerifyEmail(this.auth.auth, this.query.oobCode);
  	      break;
  	    default:
  	      // Error: invalid mode.
  	  }
  }

  handleResetPassword(auth, actionCode) {
  	
    // Verify the password reset code is valid.
    this.auth.auth.verifyPasswordResetCode(actionCode).then((email) => {
      this.accountEmail = email;
      this.resetPass = true;
      this.loading = false;

      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.

      // Save the new password.
    }).catch((error) => {
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
      this.loading = false;
      this.route.navigate(['reset-password']);
    });
  }

  handleRecoverEmail(auth, actionCode) {
    var restoredEmail = null;
    // Confirm the action code is valid.
    this.auth.auth.checkActionCode(actionCode).then((info) => {
      // Get the restored email address.
      restoredEmail = info['data']['email'];

      // Revert to the old email.
      return this.auth.auth.applyActionCode(actionCode);
    }).then(()=> {
      // Account email reverted to restoredEmail

      // TODO: Display a confirmation message to the user.

      // You might also want to give the user the option to reset their password
      // in case the account was compromised:
      this.auth.auth.sendPasswordResetEmail(restoredEmail).then(() => {
        // Password reset confirmation sent. Ask user to check their email.
      }).catch(function(error) {
        // Error encountered while sending password reset code.
      });
    }).catch(function(error) {
      // Invalid code.
    });
  }

	handleVerifyEmail(auth, actionCode) {
		console.log('handleVerifyEmail called')
	  // Try to apply the email verification code.
	  this.auth.auth.applyActionCode(actionCode).then((resp)=> {
	    // Email address has been verified.

	    // TODO: Display a confirmation message to the user.
	    this.emailVerified = true;
	    this.loading = false;
	    // You could also provide the user with a link back to the app.
	  }).catch((error)=>{
	    // Code is invalid or expired. Ask the user to verify their email address
	    // again.
	    this.emailVerifyfail = true;
	    this.loading = false;
	    
	  });
	}

	verifyEmail(){
		this.auth.auth.signInWithEmailAndPassword(this.verifyemail, this.verifypass)
			.then(() => {
				this.auth.auth.currentUser.sendEmailVerification()
				this.alert.success('An email verification link has been sent to your email, please follow link to verify your email')
			})
	}

	resetPassword(){
		this.loading=true;
		this.auth.auth.confirmPasswordReset(this.query.oobCode, this.newPassword).then((resp)=> {
		  // Password reset has been confirmed and new password updated.
		  // TODO: Display a link back to the app, or sign-in the user directly
		  // if the page belongs to the same domain as the app:
		  // auth.signInWithEmailAndPassword(accountEmail, newPassword);
		  this.loading = false;
		  this.resetPass = false;
		  this.passReseted = true;

		}).catch((error) => {
		  // Error occurred during confirmation. The code might have expired or the
		  // password is too weak.
		  this.loading = false;
		});
	}

}
