<?php
header("Access-Control-Allow-Origin: *");
?>
<!doctype html>
<html class="no-js" lang="">
<head>
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>Rudy Evolution</title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<link rel="stylesheet" href="https://rudy-analytics.herokuapp.com/js/loader/style.css" media="all"/>
<link rel="stylesheet" href="https://rudy-analytics.herokuapp.com/js/sticky/sticky.min.css" media="all"/>

<link rel="stylesheet" href="https://rudy-analytics.herokuapp.com/css/style.css" media="all"/>
<link rel="stylesheet" href="https://rudy-analytics.herokuapp.com/css/croppie.css" media="all"/>

<!--[if lt IE 9]> <script src="https://rudy-analytics.herokuapp.com/js/css3-mediaqueries.js"></script> <![endif]-->
<script src="https://rudy-analytics.herokuapp.com/js/html5.js"></script>

<script type="text/javascript">
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    } else {
        top.location.href="http://goo.gl/JjoF6N";
    }
</script>

	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-WDKT4X6');</script>
	<!-- Google Tag Manager -->
</head>
<body>
<!--<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WDKT4X6"
				  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!--<!-- End Google Tag Manager (noscript) -->


<section id="main-container">
	<a href="javascript:void(0)" id="btn-data-layer-unique" style="text-decoration: none;" onclick="">&nbsp;</a>

	<div class="popup-wrap default-popup" id="mo-confirmation-submit" >
		<div class="popup-content">
			<h2>Are you sure you want to submit this entry?</h2>
			<div class="text-center p-btn-wrapper">
				<a href="#" class="btn btn-confirm-submit">Confirm</a>
				<a href="#" class="btn btn-ghost btn-cancel-modal">Cancel</a>
			</div>
		</div>
	</div>

	<div class="popup-wrap default-popup" id="ty-message">
		<div class="popup-content">
			<h2>Your submission is sent!</h2>
			<p>Please give us 24 hours to assess your submission. We’ll send you an email with your coupon code.</p>
			<div class="text-center p-btn-wrapper">
				<a href="#" class="btn  btn-cancel-modal">Got it!</a>
			</div>
		</div>
	</div>

	<header>
		<div class="container">
			<div class="menu text-center">
				<ul>
					<li class="active"><a href="#step1" class="btn btn-orange">Entry</a></li>
					<li><a href="#step2" class="btn">Gallery</a></li>
				</ul>
			</div>
		</div>
	</header>
	<section id="main-wrapper">
		<div id="step1" class="step-wrap"  style="display: block;">
			<div class="container">


				<div class="banner">
					<img class="desktop-banner" src="https://rudy-analytics.herokuapp.com/images/banner-new.jpg" alt="">
					<img class="mobile-banner" src="https://rudy-analytics.herokuapp.com/images/banner-mobile.jpg" alt="">
				</div>
				<div class="head-title">
					<h1 class="text-center">Share your Rudy Project experience!</h1>
				</div>
				<!-- <div class="head-title">
					<div class="row">
						<div class="col-left">
							<h3><strong>Who Can Join?</strong></h3>
							<p>The contest is open to Filipino citizens, legally or by birth, 18 years old and above, residing within the Philippine territory. They must be moms and must like the Poten-Cee Gummies Facebook page. Promo period is from <strong>October 1, 2017</strong> to <strong>November 15,2017.</strong></p>
						</div>
						<div class="col-left">
							<h3><strong>Prizes For Each of The 12 Winners:</strong></h3>
							<ul class="prizes">
								<li>Php 1000 worth of Poten-Cee Vitamin C Gummies (6 Bottles of Poten-Cee Gummies 30’s)</li>
								<li>Two (2) passes to Kidzania</li>
							</ul>
						</div>
					</div>
				</div> -->
				<!-- <div class="join-now-wrap text-center">
					<a href="#" class="btn btn-large btn-green">Join Now!</a>
				</div> -->
                <div class="join-now-wrap text-center">
                    <a href="#" class="btn btn-large btn-green btn-join-now" data-text="Join Now!">Join Now!</a>
                </div>
				<div class="form-wrapper frm-submit-entry hide" style="margin-top:35px;">

					<div class="form-content">
						<form method="" id="formEntry">
                            <input type="hidden" name="accountid" id="account_id" value="0">
                            <input type="hidden" name="coupon" id="coupon_code" value="none">

							<div class="form-left">
								<p style="font-size:12px; text-align: right; color: #d01e1e; margin-bottom:5px;">* ALL FIELDS MUST BE FILLED OUT CORRECTLY.</p>
								<div class="input-wrap name-area">
									<label for="complete-name">Name: <span style="color: #d01e1e;">*</span></label>
									<input id="complete-name" type="text" name="fullname" value="" placeholder="">
									<span class="error-message hide">You must enter your name.</span>
								</div>

								<div class="input-wrap email-area">
									<label for="email-add">Email Address: <span style="color: #d01e1e;">*</span></label>
									<input id="email-add" type="email" name="email" value="" placeholder="">
									<span class="error-message hide">You must enter a valid email address.</span>
								</div>
								<div class="input-wrap mobile-area">
									<label for="contact-num">Mobile Number: <span style="color: #d01e1e;">*</span></label>
									<input id="contact-num" type="tel" placeholder="(09) + 9digits" name="mobile" value="" onkeypress="return event.charCode === 0 || /[\d-+=,()]/.test(String.fromCharCode(event.charCode));">
									<span class="error-message hide">You must enter a valid phone number. *(09)+9digits</span>
								</div>
<!--								<div class="input-wrap">-->
<!--									<div class="present-add">-->
<!--										<div class="input-row">-->
<!--											<div class="input-select">-->
<!--												<label>Sport: <span style="color: #d01e1e;">*</span></label>-->
<!--												<select id="sport-choices" name="sport">-->
<!--													<option value="1">Cycling</option>-->
<!--													<option value="2">Golf</option>-->
<!--													<option value="3">Shooting</option>-->
<!--												</select>-->
<!--												<label class="time-record cycling-time" style="display:block;"><strong>Time to Beat:</strong> <span>00:20:02</span></label>-->
<!--												<label class="time-record golf-time"><strong>Time to Beat:</strong> <span>00:30:21</span></label>-->
<!--												<label class="time-record shooting-time"><strong>Time to Beat:</strong> <span>00:50:56</span></label>-->
<!--											</div>-->
<!--										</div>-->
<!--									</div>-->
<!--								</div>-->

<!--								<div class="input-wrap time-area">-->
<!--									<label for="time-field">Time: <span style="color: #d01e1e;">*</span></label>-->
<!--									<input id="time-field" type="tel" name="time" value="00:00:00" placeholder="">-->
<!--									<span class="error-message hide">You must enter a valid time.</span>-->
<!--								</div>-->

								<div class="input-wrap no-error">
									<label><span>(Optional)</span></label>
									<div class="file-upload">
									    <label for="upload" class="file-upload__label">Upload Your Photo</label>
									    <input id="upload" class="file-upload__input" accept="image/*" type="file" name="file-upload">
									</div>
									<span class="required-file">You must upload an image.</span>
								</div>
								<div id="ex-photo-wrap" style="margin-bottom: 60px; margin-top: 0;">
									<section id="renderedCanvas">
										<img src="https://rudy-analytics.herokuapp.com/images/frame_new.png" class="img-backdrop">

										<div class="cropper-area">
											<div id="cropper-image" class="cropper-div"></div>
										</div>
									</section>
									<figure class="fo frame-top"><img src="https://rudy-analytics.herokuapp.com/images/frame-top.png"></figure>
									<figure class="fo frame-bottom"><img src="https://rudy-analytics.herokuapp.com/images/frame-bottom.png"></figure>
									<figure class="fo frame-left"><img src="https://rudy-analytics.herokuapp.com/images/frame-left.png"></figure>
									<figure class="fo frame-right"><img src="https://rudy-analytics.herokuapp.com/images/frame-right.png"></figure>
									<!-- <div class="time-text">
										<span><time class="-time-1">00</time> <i>MIN</i></span><span>
											<em>:</em><time class="-time-2">00</time><em>:</em><i>SEC</i>
										</span>
										<span>
											<time class="-time-3">00</time> <i>MS</i>
										</span>
									</div> -->
								</div>
								<div class="input-wrap no-error captionfield">
									<label class="textarea-label">Caption <span>(Optional)</span></label>
									<div class="textarea-wrap">
										<textarea id="captionText" name="limitedtextarea" onKeyDown="limitText(this.form.limitedtextarea,this.form.countdown,100);" onKeyUp="limitText(this.form.limitedtextarea,this.form.countdown,100);"></textarea>
										<!-- <p class="error-message " style="display: none;"> This field is required*</p> -->
										<p class="hastag-info">Don't forget to use <span>#TheRudyExperience</span></p>
										<p>(Maximum characters: 100) You have <input readonly type="text" name="countdown" size="3" value="100"> characters left.</p>
									</div>
								</div>
								<div class="input-wrap">
									<div class="custom-checkbox">
										<input type="checkbox" id="term-checkbox"/>
			    						<label for="term-checkbox">I have read and agree to the Privacy Policy and Terms</label>
			    					</div>
								</div>
								<div class="input-wrap text-center">
									<input type="submit" class="btn" name="" value="Submit">
									<div class="wavy-loader"><span></span><span></span><span></span></div>
								</div>
							</div>
							<div class="form-right">

							</div>
							<div class="clr"></div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div id="step2" class="step-wrap" style="display: none;">
			<div class="container">
				<div class="video-gallery">
					<ul>

					</ul>

					<div class="text-center" style="margin-top:25px;">
						<a href="javascript:void(0);" class="btn btn-grey load-more">Load More</a>
						<div class="wavy-loader"><span></span><span></span><span></span></div>
					</div>
				</div>
			</div>
		</div>
	</section>
</section>
<footer></footer>
<script src="https://rudy-analytics.herokuapp.com/js/lib/jquery.min.js"></script>
<script src="https://rudy-analytics.herokuapp.com/js/lib/jquery-ui.min.js"></script>
<script src="https://rudy-analytics.herokuapp.com/js/croppie.min.js"></script>
<script src="https://rudy-analytics.herokuapp.com/js/html2canvas.js"></script>
<script src="https://rudy-analytics.herokuapp.com/js/exif.js"></script>
<script src="https://rudy-analytics.herokuapp.com/js/plugins.js"></script>
<script src="https://rudy-analytics.herokuapp.com/js/custom.js"></script>
<script src="https://rudy-analytics.herokuapp.com/js/loader/script.js"></script>
<script src="https://rudy-analytics.herokuapp.com/js/sticky/sticky.min.js"></script>


<!--<script src="/js/lib/jquery.min.js"></script>-->
<!--<script src="/js/lib/jquery-ui.min.js"></script>-->
<!--<script src="/js/croppie.min.js"></script>-->
<!--<script src="/js/html2canvas.js"></script>-->
<!--<script src="/js/exif.js"></script>-->
<!--<script src="/js/plugins.js"></script>-->
<!--<script src="/js/custom.js"></script>-->
<!--<script src="/js/loader/script.js"></script>-->
<!--<script src="/js/sticky/sticky.min.js"></script>-->
</body>
</html>
