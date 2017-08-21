const functions = require('firebase-functions');
var express = require('express');
var path = require('path');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
var app = express();

app.use(require('prerender-node').set('prerenderToken', 'GVvLsYJcVCzMjfp5z625'));

app.set('view engine','pug')

app.set('views', './views')


app.get('**', function(req, res, next){
	res.render('index');
})

exports.prerender = functions.https.onRequest(app)


// exports.prerender = functions.https.onRequest((request, response) => {
//  	response.send(`<!doctype html>
// 				<html lang="en">
// 				<head>
// 				  <meta charset="utf-8">
// 				  <meta name="fragment" content="!">
// 				  <title>LadRope-Bespoke tailoring made for you</title>
// 				  <base href="/">

// 				  <meta name="viewport" content="width=device-width, initial-scale=1">
// 				  <link rel="icon" type="image/x-icon" href="favicon.ico">
// 				  <link rel="stylesheet" href="assets/font-awesome-4.6.3/css/font-awesome.min.css">
// 				</head>
// 				<body>
// 				  <nav id="myNavbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
// 				    <div class="container-fluid">
// 				      <div class="navbar-header">
// 				        <button type="button" (click) ='toggleCollapse()' class="navbar-toggle">
// 				                  <span class="icon-bar"></span>
// 				                  <span class="icon-bar"></span>
// 				                  <span class="icon-bar"></span>
// 				        </button>

// 				        <a class="navbar-brand"><i class="fa fa-bars pointer menu" (click)='menu()' aria-hidden="true" ></i> <a routerLink = '/' class='pointer'>Ladrope</a></a>
// 				        <a *ngIf = 'user' class="navbar-brand name">Hi {{user.displayName}}</a>
// 				      </div>

// 				      <div class="collapse navbar-collapse" [class.collapse]="!showMenu">
// 				        <ul class="nav navbar-nav navbar-right">
// 				                  <li><a class='pointer' (click)='goToShop()'>Shop</a></li>
// 				                  <li><a class='pointer' (click)="scroll()">Contact Us</a></li>
// 				                  <li><a routerLink='/faq'>FAQ</a></li>
// 				                  <li *ngIf = '!user'><a routerLink = '/signin'>Sign In</a></li>
// 				                  <li *ngIf = 'user'><a routerLink = '/' (click)= 'signout()'>Sign out</a></li>
// 				              </ul>
// 				      </div>
// 				    </div>
// 				  </nav>

// 				  <div id="header" class="header">
// 				       <div class="container">
// 				           <div class="row">
// 				               <div class="col-lg-4 col-md-4 col-sm-4 wow bounceInLeft">
// 				                  <img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fhand_with_phone.png?alt=media&token=e46d2eec-fecd-43fb-9de8-a773ebc1368c" alt="Ladrope">
// 				               </div>
// 				               <div class="col-lg-6 col-md-6 col-sm-6 wow bespoke bounceInRight">
// 				                  <img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fbespoke.png?alt=media&token=b23d76e2-a930-420e-8974-20f4bc1da974" alt="besoke designs">
// 				                  <img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Ffast_and_easy.png?alt=media&token=d37a2fdc-6fc4-4216-88ed-c8e917053a58" alt="">
// 				               </div>
// 				           </div>
// 				           <div class="row">
// 				               <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 wow bounceInLeft">
// 				               <div class='left-image'>
// 				                  <img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fmoney_back_guarantee.png?alt=media&token=8902de4b-4039-41d8-9862-8b62b448a21c" alt="money back guarantee">
// 				               </div>
// 				               </div>
// 				               <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 wow bounceInRight">
// 				                  <button class="btn download btn-lg btn-green"><a href="" target="blank"></a>Download for IOS</button>
// 				                  <button class="btn download btn-lg btn-green"><a href="" target="blank">Download for Android</a></button>
// 				               </div>
// 				           </div>
// 				       </div>
// 				   </div>
				    
// 				  <!---- End Header ---->
				   
// 				   <!--- Getting Started ---->
				   
// 				   <div id="get_started" class="get_started">
// 				       <div class="container">
// 				           <h2 class="wow fadeInUp">Get Started</h2>
// 				           <p class="wow fadeInUp" data-wow-delay="0.4">Ladrope is simply shopping for custom made wears at your convenience</p>
// 				           <div class="row">
// 				              <div class='auto'>
// 				               <div class="col-lg-3 col-md-6 col-sm-6 cards wow fadeInLeft" data-wow-delay="1.8s">
// 				                   <a href="" target=""><img class='links img-responsive' src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fapp_store.png?alt=media&token=b09c20de-822a-4a3a-b375-3c7d2adb01d0" alt=""></a>
// 				                   <a href="https://drive.google.com/open?id=0B_wjwMzVIfivTWXp1aWp6QzVaRHM" target="blank"><img class="links img-responsive " src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fplay_store.png?alt=media&token=c8508077-ed30-42e8-9aca-ef9c40c1a59b" alt=""></a>
// 				                   <h4>Download App</h4>
// 				                   <p>Download the mobile app</p>
// 				               </div>
// 				               <div class="col-lg-3 col-md-6 col-sm-6 wow cards fadeInLeft" data-wow-delay="1.4s">
// 				                   <img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fmeasurement.jpg?alt=media&token=e3365c63-db8c-4f18-a5ff-367d41611dfe" class='img-responsive' alt="">
// 				                   <h4>Get Measured</h4>
// 				                   <p>Get yourself measured utilizing the full powers of your phone camera</p>
// 				               </div>
// 				               <div class="col-lg-3 col-md-6 col-sm-6 wow cards fadeInLeft" data-wow-delay="0.8s">
// 				                   <img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fplace_order.gif?alt=media&token=ff453ed3-9188-46c7-83a0-e466dfdc4e71" class='img-responsive'  alt="">
// 				                    <h4>Place an Order</h4>
// 				                   <p>Select the design that best fits your style and place an order</p>
// 				               </div>
// 				               <div class="col-lg-3 col-md-6 col-sm-6 wow cards fadeInLeft" data-wow-delay="0.4s">
// 				                   <img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fdelivery.jpg?alt=media&token=a957e5f4-b802-4ef1-a4ed-7448b8183d1d" class='img-responsive'  alt="">
// 				                   <h4>Delivery</h4>
// 				                   <p>We deliver at your doorstep on schedule</p>
// 				               </div>
// 				              </div>
// 				           </div>
// 				       </div>
// 				   </div>
				    
// 				  <!---- End Getting Started ---->
				   
// 				  <!----- Shop ------>

// 				  <div id="shop" class="shop">
// 				      <div class="container">
// 				          <div class="row">
// 				              <h2 class="wow fadeInUp" (click)='goToShop()' class='pointer'>Shop</h2>
// 				              <p class="wow fadeInUp" data-wow-delay="0.4">Get to select your choice of designs at your convenience. If you are looking for ankara made, natives wears, suits, gowns, wedding wears, then our shop is where you should go</p>
// 				              <div class='col-md-10 col-lg-8 col-sm-10 col-xs-10 col-sm-offset-1 col-md-offset-1 col-lg-offset-2'>
// 				                  <div class='carousel'>
// 				                      <carousel [sources]="imageSources" [config]="config"></carousel>
// 				                  </div>
// 				                  <p class='pointer padding' (click)='goToShop()'>Visit shop</p>
// 				              </div>
// 				          </div>
// 				      </div>
// 				  </div>
				   
// 				   <!--- End shop ---->
				   
// 				   <!--- Testimonials -->
				   
				   
// 				  <div id="testimonials" class="testimonials">
// 				      <div class="container">
// 				          <div class="row">
// 				              <h2 class="wow fadeInUp">Testimonials</h2>
// 				              <p class="wow fadeInUp" data-wow-delay="0.4">What our customers are saying</p>
// 				              <div class='auto'>
// 				              <div class="col-lg-3 col-md-3 col-sm-6 card wow fadeInLeft" data-wow-delay="2s">
// 				                  <img src="https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/15871673_1224205807665030_7803668946599111399_n.jpg?oh=38b33908ca3cab05132bfba8151d16da&oe=5A04B502" alt="" class="img-circle">
// 				                  <h4>Paschal Nnaemeka</h4>
// 				                  <p>Ladrope delivers perfectly fitted wears and on time</p>
// 				                  <a href="https://www.facebook.com/ezenwankwo1" target="blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
// 				                  <a href="https://www.facebook.com/ezenwankwo1" target="blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
// 				                  <a href="https://www.linkedin.com/in/paschal-ezenwankwo-ctfl-367a59aa/" target="blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
// 				              </div>
// 				              <div class="col-lg-3 col-md-3 col-sm-6 card wow fadeInLeft"  data-wow-delay="1.6s">
// 				                  <img src="assets/images/testimonials/testimonials2.png" class="img-circle" alt="">
// 				                  <h4>Mercy Alifia</h4>
// 				                  <p>Ladrope links customers to the best bespoke tailors in town</p>
// 				                  <a href="https://www.facebook.com/malifia" target="blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
// 				                  <a href="https://www.facebook.com/malifia" target="blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
// 				                  <a href="https://www.facebook.com/malifia" target="blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
// 				              </div>
// 				              <div class="col-lg-3 col-md-3 col-sm-6 card wow fadeInLeft"  data-wow-delay="1.2s">
// 				                  <img src="assets/images/testimonials/testimonials3.png" class="img-circle" alt="">
// 				                  <h4>Finbarr Agogo</h4>
// 				                  <p>Ladrope gives you the best fashion designs at your convenience</p>
// 				                  <a href="https://www.facebook.com/fagogo1" target="blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
// 				                  <a href="https://twitter.com/maxiyepez" target="blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
// 				                  <a href="https://www.linkedin.com/in/agogo-finbar-644510107/" target="blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
// 				              </div>
// 				              <div class="col-lg-3 col-md-3 col-sm-6 card wow fadeInLeft" data-wow-delay = '0.8'>
// 				                  <img src="assets/images/testimonials/testimonials4.png" class="img-circle" alt="">
// 				                  <h4>Emmanuel Bassey</h4>
// 				                  <p>Ladrope makes fashion easy and delivery much easier</p>
// 				                  <a href="https://www.facebook.com/udeme.udofia1" target="blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
// 				                  <a href="https://twitter.com/udemeudofia" target="blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
// 				                  <a href="https://www.linkedin.com/in/udeme-udofia-8a579780/" target="blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
// 				              </div>
// 				              </div>
// 				          </div>
// 				      </div>
// 				  </div>
				   
// 				  <!--- End testimonials ---->


// 				  <!--- Supported By ---->

// 				  <div id="support" class="supports">
// 				      <div class="container">
// 				          <div class="row">
// 				              <h2 class="wow fadeInUp">Supported by</h2>
// 				              <div class="col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="2s">
// 				                  <li><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fsupport1.jpg?alt=media&token=dd319b9a-10b4-4f9d-aeba-1e0ebb4ffeec" alt=""></li>
// 				              </div>
// 				              <div class="col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="1.6s">
// 				                  <li><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fsupport2.png?alt=media&token=2addd67d-44c9-4d80-a901-0ed45f1f3dc5" alt=""></li>
// 				              </div>
// 				          </div>
// 				      </div>
// 				  </div>
				   
// 				  <!---- End Supported By ----->

// 				  <!--- Contact ------>

// 				  <div id="contact" class="contact" #target>
// 				  <form [formGroup]="contactForm" (ngSubmit)="contact()">
// 				      <div class="container">
// 				          <div class="row">
// 				              <h2 class="wow fadeInUp">Contact Us</h2>
// 				              <p class="wow fadeInUp" data-wow-delay="0.4">We cant wait to hear from you</p>
				              
// 				              <div class="col-lg-6 col-md-6">
// 				                  <div class="input-group input-group-lg wow fadeInUp" data-wow-delay="0.8s">
// 				                      <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-user" aria-hidden="true"></i></span>
// 				                      <input type="text" class="form-control" formControlName='name' aria-describedby="sizing-addon1" placeholder="Full Name">
// 				                      <span
// 				                          *ngIf="!contactForm.get('name').valid && contactForm.get('name').touched"
// 				                          class="help-block">Please enter your name</span>
// 				                  </div>
// 				                  <div class="input-group input-group-lg wow fadeInUp" data-wow-delay="1.2s">
// 				                      <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-envelope" aria-hidden="true"></i></span>
// 				                      <input type="text" class="form-control" formControlName='email' aria-describedby="sizing-addon1" placeholder="Email Address">
// 				                      <span
// 				                          *ngIf="!contactForm.get('email').valid && contactForm.get('email').touched"
// 				                          class="help-block">Please enter a valid email</span>
// 				                  </div>
// 				                  <div class="input-group input-group-lg wow fadeInUp" data-wow-delay="1.6s">
// 				                      <span class="input-group-addon" id="sizing-addon1"><i class="fa fa-phone" aria-hidden="true"></i></span>
// 				                      <input type="text" class="form-control" formControlName='phone' aria-describedby="sizing-addon1" placeholder="Phone Number">
// 				                      <span
// 				                          *ngIf="!contactForm.get('phone').valid && contactForm.get('phone').touched"
// 				                          class="help-block">Please enter a valid phone</span>
// 				                  </div>
// 				              </div>
// 				              <div class="col-lg-6 col-md-6">
// 				                  <div class="input-group wow fadeInUp" data-wow-delay="2s">
// 				                      <textarea name="" id="" cols="80" rows="6" formControlName='content' class="form-control"></textarea>
// 				                      <span
// 				                          *ngIf="!contactForm.get('content').valid && contactForm.get('content').touched"
// 				                          class="help-block">Please enter your message</span>
				                      
// 				                  </div>
// 				                  <button class="btn btn-lg wow fadeInUp" data-wow-delay="2.4s">Submit Your Message</button>
// 				              </div>
// 				          </div>
// 				      </div>
// 				  </form>
// 				  </div>
// 				  <div class='call-to-action'>
// 				      <div class="container">
// 				          <h2>Download the app</h2>
// 				          <div class=row>
// 				              <div class='col-lg-6 col-md-6'>
// 				                  <a href="" target=""><img class='links img-responsive' src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fapp_store.png?alt=media&token=b09c20de-822a-4a3a-b375-3c7d2adb01d0" alt=""></a>
// 				              </div>
// 				              <div class="col-lg-6 col-md-6">
// 				                  <a href="https://drive.google.com/open?id=0B_wjwMzVIfivTWXp1aWp6QzVaRHM" target="blank"><img class="links img-responsive " src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fplay_store.png?alt=media&token=c8508077-ed30-42e8-9aca-ef9c40c1a59b" alt=""></a>
// 				              </div>
// 				          </div>
// 				      </div>
// 				  </div>
					
// 					<div id="footer" class="footer">
// 					     <div class="container">
// 					         <div class="row">
// 					             <div class="col-lg-4 col-md-4">
// 					                 <h4 class="wow fadeInUp">Contact Us</h4>
// 					                 <p><i class="fa fa-home" aria-hidden="true"></i> Suite D94 Asset Corp Plaza, Obafemi Awolowo Way, Ikeja. Lagos State.</p>
// 					                 <p><i class="fa fa-envelope" aria-hidden="true"></i> support@ladrope.com</p>
// 					                 <p><i class="fa fa-phone" aria-hidden="true"></i> +2347030942828</p>
// 					                 <p><i class="fa fa-globe" aria-hidden="true"></i> www.ladrope.com</p>
// 					             </div>
// 					             <div class="col-lg-4 col-md-4">
// 					                 <h4>About</h4>
// 					                 <p><i class="fa fa-square-o" aria-hidden="true"></i> About Us</p>
// 					                 <p><i class="fa fa-square-o" aria-hidden="true"></i> <a routerLink="/privacy">Privacy</a></p>
// 					                 <p><i class="fa fa-square-o" aria-hidden="true"></i> <a routerLink="/terms">Terms and Conditions</a></p>
// 					             </div>
// 					             <div class="col-lg-4 col-md-4">
// 					                 <h4>Stay in touch</h4>
// 					                 <a href="https://www.facebook.com/ladrope" target="blank"><i class="social fa fa-facebook" aria-hidden="true"></i></a>
// 					                 <a href="https://www.twitter.com/ladrope" target="blank"><i class="social fa fa-twitter" aria-hidden="true"></i></a>
// 					                 <a href="https://www.linkedin.com/company/ladrope" target="blank"><i class="social fa fa-linkedin" aria-hidden="true"></i></a>
// 					                 <i class="social fa fa-instagram" aria-hidden="true"></i>
// 					                 <i class="social fa fa-youtube" aria-hidden="true"></i><br>
// 					                 <form [formGroup]="newsForm" (ngSubmit)="subscribe()">
// 					                <input type="email" placeholder="Subscribe For Updates" formControlName='email'><button class="btn btn-success">Subscribe</button>
// 					                </form>
// 					             </div>
// 					         </div>
// 					     </div>
// 					 </div>
// 				</body>
// 				</html>`)
// });
