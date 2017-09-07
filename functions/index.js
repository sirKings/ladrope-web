const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const moment = require('moment');

const request = require('request')

const secretKey = 'sk_test_29cd1555470991605a58ea724c6648e15d68e528';

const sender = 'Ladrope <support@ladrope.com>'

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const email = encodeURIComponent(functions.config().email.email);
const pass = encodeURIComponent(functions.config().email.pass);
// const mailTransport = nodemailer.createTransport(
// `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

var mailTransport = nodemailer.createTransport({
    host: 'smtp.office365.com', // Office 365 server
    port: 587, // secure SMTP
    secureConnection: 'false', // false for TLS
    auth: {
        user: 'support@ladrope.com',
        pass: 'Ladrope123#'
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

exports.sendTailorWelcomeEmail = functions.database.ref('/tailors/{pushid}/')
  .onCreate(event => {
  	user = event.data.val()
	return sendTailorEmail(user.email, user.name);
})

exports.declineOrders = functions.https.onRequest((req, res)=>{
	let order = JSON.stringify(req.body);
	return alertme(order, "Order Declined").then(()=>{
		res.end()
	})
})

exports.verify = functions.https.onRequest((req, res) => {
  	let code = req.body.code;
  	let amount = req.body.amount;
  	var request = require('request');
  	 
  	var options = {
  	  url: 'https://api.paystack.co/transaction/verify/'+code,
  	  headers: {
  	    'Authorization': 'Bearer '+ secretKey
  	    }
  	};
  	 
  	function callback(error, response, body) {
  	  if (!error && response.statusCode == 200) {
  	    var info = JSON.parse(body);
  	    if(info.data.gateway_response == 'Successful' || info.data.gateway_response == 'Approved'){
  	     	if(info.data.amount == amount){
  	    	res.status(200).send('OK')
  	    }else{
  	    	res.status(200).send('NOK')
  	    }
  	  }else{
  	  	res.status(200).send('NOK')
  	  }
  	}
  	}
  	 
  	request(options, callback);
});

exports.sendCustomerWelcomeEmail = functions.database.ref('/users/{pushid}/')
	.onCreate(event => {
	user = event.data.val()
	return sendCustomerEmail(user.email, user.displayName);
})

exports.alertMe = functions.database.ref('/orders/{pushid}/')
	.onCreate(event =>{
	order = event.data.val()
	let info = JSON.stringify(order)
	return alertme(info, 'New Order')	
})

exports.sendReceipt = functions.database.ref('/orders/{pushid}/')
	.onCreate(event => {
	order = event.data.val()
	start = moment(order.startDate).format('YYYY MM DD')
	date = moment(order.date).format('YYYY MM DD')

	return sendReceipt(order.email, order.displayName, order.orderId, start, date, order.clientAddress, order.price)
})

exports.notifyTailor = functions.database.ref('/orders/{pushid}/')
	.onCreate(event => {
	order = event.data.val()
	start = moment(order.startDate).format('YYYY MM DD')
	date = moment(order.date).format('YYYY MM DD')

	return sendTailorNotification(order.labelEmail, order.orderId, start, date, order.cost)
})
// [END onWrite]

// Sends a welcome email to the given user.
function sendTailorEmail(email, name) {
  const mailOptions = {
    from: sender,
    to: email
  };
  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to Ladrope!`;
  mailOptions.html = `<head>
						<title>Welcome to Ladrope.com</title>
						<!--

						    This is a welcome mail to all tailors that have signed up on ladrope.com,
						    and have also verified their account appropriately.

						    The next step for them is to upload their designs on the site (www.ladrope.com),
						    and then when customers place order on their designs, the tailors will be notified
						    immediately to start work.

						    Enjoy!

						 -->
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1">
						<meta http-equiv="X-UA-Compatible" content="IE=edge" />
						<style type="text/css">
						    /* CLIENT-SPECIFIC STYLES */
						    body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
						    table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
						    img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

						    /* RESET STYLES */
						    img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
						    table{border-collapse: collapse !important;}
						    body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}
						    h2 {
						        color: rgb(0,74,0);
						    }
						    a {
						        color: rgb(0,74,0) !important;
						    }

						    .mobile-button {
						            padding: 5px;
						            border: 0;
						            font-size: 20px;
						            display: block;
						            height: 30px;
						            width: 35%;
						    }

						    /* iOS BLUE LINKS */
						    a[x-apple-data-detectors] {
						        color: inherit !important;
						        text-decoration: none !important;
						        font-size: inherit !important;
						        font-family: inherit !important;
						        font-weight: inherit !important;
						        line-height: inherit !important;
						    }

						    /* MOBILE STYLES */
						    @media screen and (max-width: 525px) {

						        /* ALLOWS FOR FLUID TABLES */
						        .wrapper {
						          width: 100% !important;
						            max-width: 100% !important;
						        }

						        /* ADJUSTS LAYOUT OF LOGO IMAGE */
						        .logo img {
						          margin: 0 auto !important;
						        }

						        /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
						        .mobile-hide {
						          display: none !important;
						        }

						        .img-max {
						          max-width: 100% !important;
						          width: 100% !important;
						          height: auto !important;
						        }

						        /* FULL-WIDTH TABLES */
						        .responsive-table {
						          width: 100% !important;
						        }

						        /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
						        .padding {
						          padding: 10px 5% 15px 5% !important;
						        }

						        .padding-meta {
						          padding: 30px 5% 0px 5% !important;
						          text-align: center;
						        }

						        .padding-copy {
						             padding: 10px 5% 10px 5% !important;
						          text-align: center;
						        }

						        .no-padding {
						          padding: 0 !important;
						        }

						        .section-padding {
						          padding: 50px 15px 50px 15px !important;
						        }

						        /* ADJUST BUTTONS ON MOBILE */
						        .mobile-button-container {
						            margin: 0 auto;
						            width: 100% !important;
						        }

						        .mobile-button {
						            padding: 5px !important;
						            border: 0 !important;
						            font-size: 14px !important;
						            display: block !important;
						            height: 25px !important;
						            width: 180px !important;
						        }

						    }

						    /* ANDROID CENTER FIX */
						    div[style*="margin: 16px 0;"] { margin: 0 !important; }
						</style>
						</head>
						<body style="margin: 0 !important; padding: 0 !important;">

						<!-- ONE COLUMN SECTION -->
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 15px;" class="section-padding">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td>
						                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
						                            <tr>
						                                <td>
						                                    <!-- COPY -->
						                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
						                                        <tr>
						                                            <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: rgb(0,74,0);" class="padding-copy"><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Flogo.jpg?alt=media&token=077939a2-0e49-4fef-9995-d5178151a837" height="100px" width="100px"><h1>Welcome to Ladrope.com</h1><br /><br /><h2>${name}</h2></td>
						                                        </tr>
						                                        <tr>
						                                            <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #000;" class="padding-copy"><h3>You are all set to start selling your designs to our wide range of customers.</h3>
						                                            <button style="color:white; background-color: rgb(0,74,0);" class="mobile-button-container mobile-button">Getting Started</button>
						                                            </td>
						                                        </tr>
						                                        <tr>
						                                            <td align="left" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy"><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fupload.png?alt=media&token=7ec3b294-c954-4c99-89d9-c74e7001c828" width="120px" height="120px" style="float: left; padding-right: 20px;"><h2>Upload Designs</h2> Upload your bespoke designs from the Tailor's dashboard. Please ensure to use high quality images of same dimension!</td>
						                                        </tr>
						                                        <tr>
						                                            <td align="left" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy"><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Forder.png?alt=media&token=20b6956e-4730-4d26-85ca-19a97aa383bc" width="130px" height="169px" style="float: left; padding-right: 20px;"><h2>Receive Order</h2>You will receive a notification once your design has been ordered by a customer. Ensure to complete the order within the agreed time frame. Deliver the completed design(s) and get paid.</td>
						                                        </tr>
						                                        <tr>
						                                            <td align="left" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: rgb(0,74,0);" class="padding-copy">Enjoy!<br>The Ladrope.com Team</td>
						                                        </tr>
						                                    </table>
						                                </td>
						                            </tr>
						                        </table>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <!-- UNSUBSCRIBE COPY -->
						            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td align="center" style="font-size: 13px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:rgb(0,74,0);">
						                        Suite D94 Asset Corp Plaza, Obafemi Awolowo Way, Ikeja. Lagos State.
						                        <br>
						                        <a href="http://www.ladrope.com" target="_blank" style="color: #666666; text-decoration: none;">www.ladrope.com</a>
						                        <span style="font-family: Arial, sans-serif; font-size: 13px; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="mailto:support@ladrope.com" style="text-decoration: none;">support@ladrope.com</a>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						</table>

						</body>`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to:', email);
  });

}

function sendCustomerEmail(email, name) {
  const mailOptions = {
    from: sender,
    to: email
  };
  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to Ladrope!`;
  mailOptions.html = `<head>
						<title>Welcome to Ladrope.com</title>
						<!--

						    This is a welcome mail to all customers that have signed up on ladrope.com,
						    and have also verified their account appropriately.

						    The next step for them is to download the mobile app (if it hasn't been done)
						    and Get Measured through the app and finally continue to place orders.

						    Enjoy!

						 -->
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1">
						<meta http-equiv="X-UA-Compatible" content="IE=edge" />
						<style type="text/css">
						    /* CLIENT-SPECIFIC STYLES */
						    body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
						    table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
						    img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

						    /* RESET STYLES */
						    img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
						    table{border-collapse: collapse !important;}
						    body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}
						    h2 {
						        color: rgb(0,74,0);
						    }
						    a {
						        color: rgb(0,74,0) !important;
						    }

						    .mobile-button {
						            padding: 5px;
						            border: 0;
						            font-size: 20px;
						            display: block;
						            height: 30px;
						            width: 35%;
						    }

						    /* iOS BLUE LINKS */
						    a[x-apple-data-detectors] {
						        color: inherit !important;
						        text-decoration: none !important;
						        font-size: inherit !important;
						        font-family: inherit !important;
						        font-weight: inherit !important;
						        line-height: inherit !important;
						    }

						    /* MOBILE STYLES */
						    @media screen and (max-width: 525px) {

						        /* ALLOWS FOR FLUID TABLES */
						        .wrapper {
						          width: 100% !important;
						            max-width: 100% !important;
						        }

						        /* ADJUSTS LAYOUT OF LOGO IMAGE */
						        .logo img {
						          margin: 0 auto !important;
						        }

						        /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
						        .mobile-hide {
						          display: none !important;
						        }

						        .img-max {
						          max-width: 100% !important;
						          width: 100% !important;
						          height: auto !important;
						        }

						        /* FULL-WIDTH TABLES */
						        .responsive-table {
						          width: 100% !important;
						        }

						        /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
						        .padding {
						          padding: 10px 5% 15px 5% !important;
						        }

						        .padding-meta {
						          padding: 30px 5% 0px 5% !important;
						          text-align: center;
						        }

						        .padding-copy {
						             padding: 10px 5% 10px 5% !important;
						          text-align: center;
						        }

						        .no-padding {
						          padding: 0 !important;
						        }

						        .section-padding {
						          padding: 50px 15px 50px 15px !important;
						        }

						        /* ADJUST BUTTONS ON MOBILE */
						        .mobile-button-container {
						            margin: 0 auto;
						            width: 100% !important;
						        }

						        .mobile-button {
						            padding: 5px !important;
						            border: 0 !important;
						            font-size: 14px !important;
						            display: block !important;
						            height: 25px !important;
						            width: 180px !important;
						        }

						    }

						    /* ANDROID CENTER FIX */
						    div[style*="margin: 16px 0;"] { margin: 0 !important; }
						</style>
						</head>
						<body style="margin: 0 !important; padding: 0 !important;">

						<!-- ONE COLUMN SECTION -->
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 15px;" class="section-padding">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td>
						                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
						                            <tr>
						                                <td>
						                                    <!-- COPY -->
						                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
						                                        <tr>
						                                            <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: rgb(0,74,0);" class="padding-copy"><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Flogo.jpg?alt=media&token=077939a2-0e49-4fef-9995-d5178151a837" height="100px" width="100px"><h1>Welcome to Ladrope.com<br /><br />${name}!<!-- Ensure to call each unique customers's name --></h1></td>
						                                        </tr>
						                                        <tr>
						                                            <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #000;" class="padding-copy"><h3>You are all set to start making the best of fashion choices from our shop.</h3>
						                                            <button style="color:white; background-color: rgb(0,74,0);" class="mobile-button-container mobile-button">Getting Started</button>
						                                            </td>
						                                        </tr>
						                                        <tr>
						                                            <td align="left" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy"><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fmobile.png?alt=media&token=e9a655ec-0d3d-4897-94b6-5f7d5eacdfe0" style="float: left; padding-right: 20px;"><h2>Get the Mobile App</h2> Download our mobile app for effective use of this service. You can get the app <a href="#">here</a>.</td>
						                                        </tr>
						                                        <tr>
						                                            <td align="left" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy"><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fmeasurement.png?alt=media&token=c21fff29-4da0-47b9-8af8-fb71a8b60ab9" width="110px" height="auto" style="float: left; padding-right: 20px;"><h2>Get Measured</h2>Get to use any of our measurement options on the app, and get yourself measured.
						                                            Go to user tab on the mobile app. Click on measurement. Then select any of our measurement options and get yourself measured.</td>
						                                        </tr>
						                                        <tr>
						                                            <td align="left" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy"><img src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Forders.png?alt=media&token=cfa78aa9-a18e-44d5-abbe-b9447a341164" width="110px" height="110px" style="float: left; padding-right: 20px;"><h2>Place an Order</h2>Place an order on any of your desired designs on our platform. Completed orders will be delivered at your doorstep.</td>
						                                        </tr>
						                                        <tr>
						                                            <td align="left" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: rgb(0,74,0);" class="padding-copy">Enjoy!<br>The Ladrope.com Team</td>
						                                        </tr>
						                                    </table>
						                                </td>
						                            </tr>
						                        </table>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <!-- UNSUBSCRIBE COPY -->
						            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td align="center" style="font-size: 13px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:rgb(0,74,0);">
						                        Suite D94 Asset Corp Plaza, Obafemi Awolowo Way, Ikeja. Lagos State.
						                        <br>
						                        <a href="http://www.ladrope.com" target="_blank" style="color: #666666; text-decoration: none;">www.ladrope.com</a>
						                        <span style="font-family: Arial, sans-serif; font-size: 13px; color: #444444;">&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="mailto:support@ladrope.com" style="text-decoration: none;">support@ladrope.com</a>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						</table>

						</body>`;


    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New welcome email sent to:', email);
    });

}

  

function sendReceipt(email, name, orderId, start, date, address, price) {
  const mailOptions = {
    from: sender,
    to: email
  };
  // The user subscribed to the newsletter.
  mailOptions.subject = `Transaction Reciept`;
  mailOptions.html = `<head>
						<title>Transaction Receipt</title>
						<!--

						   This is the transaction receipt issued to every customer when once an order has been successfully placed

						 -->
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1">
						<meta http-equiv="X-UA-Compatible" content="IE=edge" />
						<style type="text/css">
						    /* CLIENT-SPECIFIC STYLES */
						    body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
						    table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
						    img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

						    /* RESET STYLES */
						    img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
						    table{border-collapse: collapse !important;}
						    body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}

						    /* iOS BLUE LINKS */
						    a[x-apple-data-detectors] {
						        color: inherit !important;
						        text-decoration: none !important;
						        font-size: inherit !important;
						        font-family: inherit !important;
						        font-weight: inherit !important;
						        line-height: inherit !important;
						    }

						    /* MOBILE STYLES */
						    @media screen and (max-width: 525px) {

						        /* ALLOWS FOR FLUID TABLES */
						        .wrapper {
						          width: 100% !important;
						            max-width: 100% !important;
						        }

						        /* ADJUSTS LAYOUT OF LOGO IMAGE */
						        .logo img {
						          margin: 0 auto !important;
						        }

						        /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
						        .mobile-hide {
						          display: none !important;
						        }

						        .img-max {
						          max-width: 100% !important;
						          width: 100% !important;
						          height: auto !important;
						        }

						        /* FULL-WIDTH TABLES */
						        .responsive-table {
						          width: 100% !important;
						        }

						        /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
						        .padding {
						          padding: 10px 5% 15px 5% !important;
						        }

						        .padding-meta {
						          padding: 30px 5% 0px 5% !important;
						          text-align: center;
						        }

						        .padding-copy {
						             padding: 10px 5% 10px 5% !important;
						          text-align: center;
						        }

						        .no-padding {
						          padding: 0 !important;
						        }

						        .section-padding {
						          padding: 50px 15px 50px 15px !important;
						        }

						        /* ADJUST BUTTONS ON MOBILE */
						        .mobile-button-container {
						            margin: 0 auto;
						            width: 100% !important;
						        }

						        .mobile-button {
						            padding: 15px !important;
						            border: 0 !important;
						            font-size: 16px !important;
						            display: block !important;
						        }

						    }

						    /* ANDROID CENTER FIX */
						    div[style*="margin: 16px 0;"] { margin: 0 !important; }
						</style>
						</head>
						<body style="margin: 0 !important; padding: 0 !important;">

						<!-- HIDDEN PREHEADER TEXT -->
						<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
						    Your transaction receipt from Ladrope
						</div>

						<!-- HEADER -->
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
						    <tr>
						        <td bgcolor="#ffffff" align="center">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">
						                <tr>
						                    <td align="center" valign="top" style="padding: 15px 0;" class="logo">
						                        <a href="http://litmus.com" target="_blank">
						                            <img alt="Logo" src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Flogo.jpg?alt=media&token=077939a2-0e49-4fef-9995-d5178151a837" width="100" height="100" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">
						                        </a>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 15px;">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td>
						                        <!-- COPY -->
						                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
						                            <tr>
						                                <td align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: rgb(0,74,0); padding-top: 30px;" class="padding-copy">Your order is on its way!</td>
						                            </tr>
						                            <tr>
						                                <td align="left" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Name:     ${name}</td>
						                            </tr>
						                            <tr>
						                                <td align="left" style="padding: 0px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Invoice ID:     ${orderId}</td>
						                            </tr>
						                            <tr>
						                                <td align="left" style="padding: 0px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Date ordered:      ${start}</td>
						                            </tr>
						                            <tr>
						                                <td align="left" style="padding: 0px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Delivery Date:      ${date}</td>
						                            </tr>
						                            <tr>
						                                <td align="left" style="padding: 0px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Shipping Address:      ${address}</td>
						                            </tr>
						                        </table>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 15px;" class="padding">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td style="padding: 10px 0 0 0; border-top: 1px dashed #aaaaaa;">
						                        <!-- TWO COLUMNS -->
						                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
						                            <tr>
						                                <td valign="top" class="mobile-wrapper">
						                                    <!-- LEFT COLUMN -->
						                                    <table cellpadding="0" cellspacing="0" border="0" width="47%" style="width: 47%;" align="left">
						                                        <tr>
						                                            <td style="padding: 0 0 10px 0;">
						                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
						                                                    <tr>
						                                                        <td align="left" style="font-family: Arial, sans-serif; color: #333333; font-size: 16px;">Purchased Item (1)</td>
						                                                    </tr>
						                                                </table>
						                                            </td>
						                                        </tr>
						                                    </table>
						                                    <!-- RIGHT COLUMN -->
						                                    <table cellpadding="0" cellspacing="0" border="0" width="47%" style="width: 47%;" align="right">
						                                        <tr>
						                                            <td style="padding: 0 0 10px 0;">
						                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
						                                                    <tr>
						                                                        <td align="right" style="font-family: Arial, sans-serif; color: #333333; font-size: 16px;">₦${price}</td>
						                                                    </tr>
						                                                </table>
						                                            </td>
						                                        </tr>
						                                    </table>
						                                </td>
						                            </tr>
						                        </table>
						                    </td>
						                </tr>
						                <tr>
						                    <td>
						                        <!-- TWO COLUMNS -->
						                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
						                            <tr>
						                                <td valign="top" style="padding: 0;" class="mobile-wrapper">
						                                    <!-- LEFT COLUMN -->
						                                    <table cellpadding="0" cellspacing="0" border="0" width="47%" style="width: 47%;" align="left">
						                                        <tr>
						                                            <td style="padding: 0 0 10px 0;">
						                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
						                                                    <tr>
						                                                        <td align="left" style="font-family: Arial, sans-serif; color: #333333; font-size: 16px;">Shipping + Handling</td>
						                                                    </tr>
						                                                </table>
						                                            </td>
						                                        </tr>
						                                    </table>
						                                    <!-- RIGHT COLUMN -->
						                                    <table cellpadding="0" cellspacing="0" border="0" width="47%" style="width: 47%;" align="right">
						                                        <tr>
						                                            <td style="padding: 0 0 10px 0;">
						                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
						                                                    <tr>
						                                                        <td align="right" style="font-family: Arial, sans-serif; color: #333333; font-size: 16px;">₦0.00</td>
						                                                    </tr>
						                                                </table>
						                                            </td>
						                                        </tr>
						                                    </table>
						                                </td>
						                            </tr>
						                        </table>
						                    </td>
						                </tr>
						                <tr>
						                    <td style="padding: 10px 0 0px 0; border-top: 1px solid #eaeaea; border-bottom: 1px dashed #aaaaaa;">
						                        <!-- TWO COLUMNS -->
						                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
						                            <tr>
						                                <td valign="top" class="mobile-wrapper">
						                                    <!-- LEFT COLUMN -->
						                                    <table cellpadding="0" cellspacing="0" border="0" width="47%" style="width: 47%;" align="left">
						                                        <tr>
						                                            <td style="padding: 0 0 10px 0;">
						                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
						                                                    <tr>
						                                                        <td align="left" style="font-family: Arial, sans-serif; color: rgb(0,74,0); font-size: 16px; font-weight: bold;">Total</td>
						                                                    </tr>
						                                                </table>
						                                            </td>
						                                        </tr>
						                                    </table>
						                                    <!-- RIGHT COLUMN -->
						                                    <table cellpadding="0" cellspacing="0" border="0" width="47%" style="width: 47%;" align="right">
						                                        <tr>
						                                            <td>
						                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
						                                                    <tr>
						                                                        <td align="right" style="font-family: Arial, sans-serif; color: rgb(0,74,0); font-size: 16px; font-weight: bold;">₦${price}</td>
						                                                    </tr>
						                                                </table>
						                                            </td>
						                                        </tr>
						                                    </table>
						                                </td>
						                            </tr>
						                        </table>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <!-- UNSUBSCRIBE COPY -->
						            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td align="center" style="font-size: 13px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:rgb(0,74,0);">
						                        Suite D94 Asset Corp Plaza, Obafemi Awolowo Way, Ikeja. Lagos State.
						                        <br>
						                        <a href="http://www.ladrope.com" target="_blank" style="color: rgb(0,74,0); text-decoration: none;">www.ladrope.com</a>
						                        <span style="font-family: Arial, sans-serif; font-size: 13px; color: rgb(0,74,0);">&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="mailto:support@ladrope.com" style="text-decoration: none; color: rgb(0,74,0);">support@ladrope.com</a>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						</table>

						</body>`;

	return mailTransport.sendMail(mailOptions).then(() => {
	  console.log('Receipt sent to'+ email);
	});

}


function sendTailorNotification(email, orderId, start, date, cost) {
  const mailOptions = {
    from: sender,
    to: email
  };
  // The user subscribed to the newsletter.
  mailOptions.subject = `Order Notification`;
  mailOptions.html = `<head>
						<title>Transaction Receipt</title>
						<!--

						   This is the transaction receipt issued to every customer when once an order has been successfully placed

						 -->
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1">
						<meta http-equiv="X-UA-Compatible" content="IE=edge" />
						<style type="text/css">
						    /* CLIENT-SPECIFIC STYLES */
						    body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
						    table, td{mso-table-lspace: 0pt; mso-table-rspace: 0pt;} /* Remove spacing between tables in Outlook 2007 and up */
						    img{-ms-interpolation-mode: bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */

						    /* RESET STYLES */
						    img{border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;}
						    table{border-collapse: collapse !important;}
						    body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}

						    /* iOS BLUE LINKS */
						    a[x-apple-data-detectors] {
						        color: inherit !important;
						        text-decoration: none !important;
						        font-size: inherit !important;
						        font-family: inherit !important;
						        font-weight: inherit !important;
						        line-height: inherit !important;
						    }

						    /* MOBILE STYLES */
						    @media screen and (max-width: 525px) {

						        /* ALLOWS FOR FLUID TABLES */
						        .wrapper {
						          width: 100% !important;
						            max-width: 100% !important;
						        }

						        /* ADJUSTS LAYOUT OF LOGO IMAGE */
						        .logo img {
						          margin: 0 auto !important;
						        }

						        /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
						        .mobile-hide {
						          display: none !important;
						        }

						        .img-max {
						          max-width: 100% !important;
						          width: 100% !important;
						          height: auto !important;
						        }

						        /* FULL-WIDTH TABLES */
						        .responsive-table {
						          width: 100% !important;
						        }

						        /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
						        .padding {
						          padding: 10px 5% 15px 5% !important;
						        }

						        .padding-meta {
						          padding: 30px 5% 0px 5% !important;
						          text-align: center;
						        }

						        .padding-copy {
						             padding: 10px 5% 10px 5% !important;
						          text-align: center;
						        }

						        .no-padding {
						          padding: 0 !important;
						        }

						        .section-padding {
						          padding: 50px 15px 50px 15px !important;
						        }

						        /* ADJUST BUTTONS ON MOBILE */
						        .mobile-button-container {
						            margin: 0 auto;
						            width: 100% !important;
						        }

						        .mobile-button {
						            padding: 15px !important;
						            border: 0 !important;
						            font-size: 16px !important;
						            display: block !important;
						        }

						    }

						    /* ANDROID CENTER FIX */
						    div[style*="margin: 16px 0;"] { margin: 0 !important; }
						</style>
						</head>
						<body style="margin: 0 !important; padding: 0 !important;">

						<!-- HIDDEN PREHEADER TEXT -->
						<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
						    Congratulations! You have got an order on Ladrope
						</div>

						<!-- HEADER -->
						<table border="0" cellpadding="0" cellspacing="0" width="100%">
						    <tr>
						        <td bgcolor="#ffffff" align="center">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">
						                <tr>
						                    <td align="center" valign="top" style="padding: 15px 0;" class="logo">
						                        <a href="http://litmus.com" target="_blank">
						                            <img alt="Logo" src="https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Flogo.jpg?alt=media&token=077939a2-0e49-4fef-9995-d5178151a837" width="100" height="100" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">
						                        </a>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 15px;">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td>
						                        <!-- COPY -->
						                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
						                            <tr>
						                                <td align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: rgb(0,74,0); padding-top: 30px;" class="padding-copy">Congratulations, you have got an order</td>
						                            </tr>
						                            <tr>
						                                <td align="left" style="padding: 0px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Order ID:     ${orderId}</td>
						                            </tr>
						                            <tr>
						                                <td align="left" style="padding: 0px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Date ordered:      ${start}</td>
						                            </tr>
						                            <tr>
						                                <td align="left" style="padding: 0px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">Delivery Date:      ${date}</td>
						                            </tr>
						                        </table>
						                    </td>
						                </tr>
						            </table>
						            <h4>Please visit your <a href="https://ladrope.com/">dashboard. </a> Accept the order within 24hrs if you are ready to complete it, else the order will be canceled.</h4>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 15px;" class="padding">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td style="padding: 10px 0 0px 0; border-top: 1px solid #eaeaea; border-bottom: 1px dashed #aaaaaa;">
						                        <!-- TWO COLUMNS -->
						                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
						                            <tr>
						                                <td valign="top" class="mobile-wrapper">
						                                    <!-- LEFT COLUMN -->
						                                    <table cellpadding="0" cellspacing="0" border="0" width="47%" style="width: 47%;" align="left">
						                                        <tr>
						                                            <td style="padding: 0 0 10px 0;">
						                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
						                                                    <tr>
						                                                        <td align="left" style="font-family: Arial, sans-serif; color: rgb(0,74,0); font-size: 16px; font-weight: bold;">Amount</td>
						                                                    </tr>
						                                                </table>
						                                            </td>
						                                        </tr>
						                                    </table>
						                                    <!-- RIGHT COLUMN -->
						                                    <table cellpadding="0" cellspacing="0" border="0" width="47%" style="width: 47%;" align="right">
						                                        <tr>
						                                            <td>
						                                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
						                                                    <tr>
						                                                        <td align="right" style="font-family: Arial, sans-serif; color: rgb(0,74,0); font-size: 16px; font-weight: bold;">₦${cost}</td>
						                                                    </tr>
						                                                </table>
						                                            </td>
						                                        </tr>
						                                    </table>
						                                </td>
						                            </tr>
						                        </table>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						    <tr>
						        <td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
						            <!--[if (gte mso 9)|(IE)]>
						            <table align="center" border="0" cellspacing="0" cellpadding="0" width="500">
						            <tr>
						            <td align="center" valign="top" width="500">
						            <![endif]-->
						            <!-- UNSUBSCRIBE COPY -->
						            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
						                <tr>
						                    <td align="center" style="font-size: 13px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:rgb(0,74,0);">
						                        Suite D94 Asset Corp Plaza, Obafemi Awolowo Way, Ikeja. Lagos State.
						                        <br>
						                        <a href="http://www.ladrope.com" target="_blank" style="color: rgb(0,74,0); text-decoration: none;">www.ladrope.com</a>
						                        <span style="font-family: Arial, sans-serif; font-size: 13px; color: rgb(0,74,0);">&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="mailto:support@ladrope.com" style="text-decoration: none; color: rgb(0,74,0);">support@ladrope.com</a>
						                    </td>
						                </tr>
						            </table>
						            <!--[if (gte mso 9)|(IE)]>
						            </td>
						            </tr>
						            </table>
						            <![endif]-->
						        </td>
						    </tr>
						</table>

						</body>`;

	return mailTransport.sendMail(mailOptions).then(() => {
	  console.log('Receipt sent to'+ email);
	});

}

function alertme(order, header) {

  const mailOptions = {
    from: sender,
    to: 'globalladrope@gmail.com'
  };
 mailOptions.subject = header;
 //mailOptions.text =  ` There is a new order. Delivery date: ${order.date}  Start date: ${order.startDate} Tailor: ${order.labelEmail} ${order.labelPhone}, Client: ${order.email}`;
 mailOptions.text =  ` There is a new order. Details: ${order}`;
  return mailTransport.sendMail(mailOptions).then(() => {
	  
	});

}




