$dom = $(document);
$croppedArea = $('.cropped-area');

var mc = $('#cropper-image');
var hasImage = false;
var uploadFile = '#upload';
var timeField = '#time-field';
var btnJoin  = '.join-now-wrap';
var frmEntry = '.frm-submit-entry';
var timer;

var serverHost = getHost();
var listenerURL = serverHost+"listener/rudy-performance/campaign";

var cropWidth = 304;
var cropHeight = 290;
var croppedFile = null;

var modalSubmit = '#mo-confirmation-submit';
var modalThankYou = '#ty-message';

var page = 1;
var limit = 9;
var btnLoadMore = '.load-more';
var btnShareConf = '.btn-share-confirm';
var galleryActiveID = 0;
$loader = $('.wavy-loader');

var cyclingBeatTime = "00:00:00";
var GolfBeatTime = "00:00:00";
var ShootBeatTime = "00:00:00";

var hastag = false;

function getHost() {
    console.log(location.href, location.href.indexOf('local.potencee.com'));

    if(location.href.indexOf('local.rudy-experience.com') > -1)
        return 'http://tools.propelrr.net/';
    else if(location.href.indexOf('rudy-experience-staging.herokuapp.com') > -1 || location.href.indexOf('raw2.statichtmlapp.com') > -1 || location.href.indexOf('rudy-analytics.herokuapp.com') > -1)// || location.href.indexOf('raw2.statichtmlapp.com') > -1
        return 'https://tools-dev.propelrr.com/';

    return 'https://tools.propelrr.com/';
}

$.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
        appId: '368723273580765',
        version: 'v2.10'
    });

    setTimeout( function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            //if desktop https://raw2.statichtmlapp.com/tab/preview
        } else {
            // if(location.href.indexOf('raw2.statichtmlapp.com')==-1) {
            //
            //     $(btnJoin).trigger('click');
            // }
        }
    }, 1000);
});

$croppie = mc.croppie({
    viewport: { width: cropWidth, height: cropHeight, type: 'square' },
    boundary: { width: cropWidth, height: cropHeight, type: 'square' },
    enableExif: true,
    showZoomer: true,
    url: '',
});

bindEvents();

function bindEvents() {
    $(uploadFile).change( function() {
        readFile(this);
    });

    $dom.on('click', '#btn-data-layer-unique', function(e) {
        //console.log('analytics fired!');
        //dataLayer.push({'event' : 'formSubmitted', 'Register' : 'RudyProject'});
        fbq('trackCustom', 'Registration1', {});
    });

    $dom.on('click', btnJoin, function(e) {
        e.preventDefault();
        FB.login(function (response) {
            checkLoginState();
        });
    });

    $(timeField).keyup( function() {
        clearTimeout(timer);
        var input = $(this);
        timer = setTimeout( function() {
            var val = input.val().split(':');
            if(!parseInt(val[0])) val[0] = '00';
            else { val[0] = parseInt(val[0]) < 10 ? '0'+parseInt(val[0]): parseInt(val[0]); }
            if(!parseInt(val[1])) val[1] = '00';
            else { val[1] = parseInt(val[1]) < 10 ? '0'+parseInt(val[1]): parseInt(val[1]); }
            if(!parseInt(val[2])) val[2] = '00';
            else { val[2] = parseInt(val[2]) < 10 ? '0'+parseInt(val[2]): parseInt(val[2]); }

            $('.-time-1').text(val[0]);
            $('.-time-2').text(val[1]);
            $('.-time-3').text(val[2]);
        }, 500);
    });

    $(timeField).bind('blur', function() {
        var val = $(this).val().split(':');
        if(!parseInt(val[0])) val[0] = '00';
        else { val[0] = parseInt(val[0]) < 10 ? '0'+parseInt(val[0]): parseInt(val[0]); val[0] = val[0] > 99 ? 99 : val[0]; }
        if(!parseInt(val[1])) val[1] = '00';
        else { val[1] = parseInt(val[1]) < 10 ? '0'+parseInt(val[1]): parseInt(val[1]); val[1] = val[1] > 61 ? 60 : val[1]; }
        if(!parseInt(val[2])) val[2] = '00';
        else { val[2] = parseInt(val[2]) < 10 ? '0'+parseInt(val[2]): parseInt(val[2]);  val[2] = val[2] > 62 ? 60 : val[2]; }

        $(this).val(val[0]+':'+val[1]+':'+val[2]);
    });

    $('.btn-cancel-modal').click( function(e) {
        $(this).closest('.popup-wrap').removeClass('active');
        e.preventDefault();
    });


    $('.menu ul li a').click(function(e){
        e.preventDefault();
        $('.menu li').removeClass('active');
        $(this).closest('li').addClass('active');

        var _this = $(this).attr('href');
        $('.step-wrap').css({'display' : 'none'});
        $(_this).css({'display' : 'block'});
    });

    $('#term-checkbox').change(function(){

        if( $('#terms-checkbox').is(':checked')) {
            $('#terms-checkbox').closest('.custom-checkbox').removeClass('error')

        } else {
            $('#terms-checkbox').closest('.custom-checkbox').addClass('error');
        }
    });

    $('#sport-choices').on('change', function(){
        setBeatingTime();
        var spVal = $('#sport-choices').val();
        if( spVal == 1) {
            $('.time-record').css({'display' : 'none'})
            $('.cycling-time').css({'display' : 'block'});
        } else if ( spVal == 2) {
            $('.time-record').css({'display' : 'none'})
            $('.golf-time').css({'display' : 'block'});
        } else {
            $('.time-record').css({'display' : 'none'})
            $('.shooting-time').css({'display' : 'block'});
        }
    });

    /** submit form */
    $('.form-content form').submit(function(e){
        e.preventDefault();
        $('.form-content .input-wrap:not(.no-error)').addClass('error');
        var isvalidate = true;

        if(!$('#complete-name').val() == '') {
            $('#complete-name').closest('.input-wrap').removeClass('error');
            $('.name-area .error-message').addClass('hide');
        } else {
            $('.name-area .error-message').removeClass('hide');
            isvalidate = false;
        }

        //if(!$('#time-field').val() == '' && $('#time-field').val()!=='00:00:00') {
            $('#time-field').closest('.input-wrap').removeClass('error');

            $('.time-area .error-message').addClass('hide');
        //} else {
        //    if($('#time-field').val()=='00:00:00') {
        //        $('.time-area .error-message').removeClass('hide');
        //    }
        //    isvalidate = false;
        //}

        if( IsEmail($('#email-add').val() )) {
            $('#email-add').closest('.input-wrap').removeClass('error');
            $('.email-area .error-message').addClass('hide');
        } else {
            $('.email-area .error-message').removeClass('hide');
            isvalidate = false;
        }

        if(!$('#contact-num').val() == '' && $('#contact-num').val().length==11 && $('#contact-num').val().substring(0, 2)=='09') {
            $('#contact-num').closest('.input-wrap').removeClass('error');
            $('.mobile-area .error-message').addClass('hide');
        } else {
            $('.mobile-area .error-message').removeClass('hide');
            isvalidate = false;
        }

        //if ($('#captionText').val() != '' && isSwearWord($('#captionText').val())==true) {
            $('#captionText').closest('.captionfield').removeClass('error');
            $('.captionfield .error-message').css({'display' : 'none'});
        //} else {
        //    isvalidate = false;
        //    $('.captionfield .error-message, .hastag-info').css({'display' : 'block'});
        //}

        if( $('#term-checkbox').prop('checked')) {
            $('#term-checkbox').closest('.input-wrap').removeClass('error');
        } else {
            $('#term-checkbox').closest('.input-wrap').addClass('error');
            isvalidate = false;
        }

        //if(hasImage) {
            $(uploadFile).closest('.input-wrap').removeClass('error');
        //} else {
        //    isvalidate = false;
        //}

        if(isvalidate) {
            $(modalSubmit).addClass('active');
            return false;
        } else {
            $.sticky('Fill out required fields!', {
                'autoclose' : 5000
            });

            return false;
        }
    });

    $('.btn-confirm-submit').click( function(e) {
        $croppie.croppie('result', {
            type: 'canvas',
            size: { width: cropWidth, height: cropHeight }
        }).then(function (resp) {
            //var printPreview = window.open('about:blank', 'print_preview');
            //var printDocument = printPreview.document;
            //printDocument.open();
            //printDocument.write("<!DOCTYPE html><html>" + "<body><img src='" + resp + "'></body></html>");
            //printDocument.close();
            //console.log(resp)
            croppedFile = resp;
            submitEntry();
        });
        e.preventDefault();
    });

    $dom.on('click', btnLoadMore, function(e) {
        $(this).addClass('hide');

        page = page+1;
        getList();

        e.preventDefault();
    });

    $dom.on('click', btnShareConf, function(e) {
        var targetE = $(this).closest('li');
        galleryActiveID = targetE.data('id');

        loader('body', 1, true);
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                shareEntry(galleryActiveID, targetE);
            } else {
                FB.login(function(response){
                    shareEntry(galleryActiveID, targetE);
                }, {scope: 'publish_actions, email, public_profile, user_birthday, user_location'});
            }

            loader('body', 0);
        });
    });
}

function getBeatingRecord(name, order, sort) {
    var formData = new FormData();
    formData.append('sport', name);
    formData.append('order', order);
    formData.append('sort', sort);

    var url = listenerURL+'/getOneRecord';
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        crossDomain: true,
        processData: false,
        contentType: false
    }).done( function(data) {
        var sc = $('#sport-choices').val();
        if(name=='Cycling' && data.time!='none') cyclingBeatTime = data.time;
        if(name=='Golf' && data.time!='none') GolfBeatTime = data.time;
        if(name=='Shooting' && data.time!='none') ShootBeatTime = data.time;

        setBeatingTime();
    }).error(function() {
        checkCouponCode(generateCoupon());
    });
}

getBeatingRecord('Cycling', 'time', 'DESC');
getBeatingRecord('Golf', 'time', 'ASC');
getBeatingRecord('Shooting', 'time', 'ASC');

function setBeatingTime() {
    $('.time-record.cycling-time span').text(cyclingBeatTime);
    $('.time-record.golf-time span').text(GolfBeatTime);
    $('.time-record.shooting-time span').text(ShootBeatTime);
}

function readFile(input) {
    if (input.files && input.files[0]) {
        if (!input.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
            $(input).val('');
            $croppie.croppie('bind', {
                url: null
            });
        } else {
            $(uploadFile).closest('.input-wrap').removeClass('error');

            var reader = new FileReader();
            hasImage = true;

            reader.onload = function (e) {
                $croppie.croppie('bind', {
                    url: e.target.result
                });
            };

            reader.readAsDataURL(input.files[0]);
        }
    } else {  }
}

function submitEntry() {
    var formData = new FormData(document.getElementById('formEntry'));

    formData.append('file', croppedFile);
    formData.append('isFile', hasImage);

    var url = listenerURL+'/saveEntryProc';

    loader(modalSubmit, 1, true);
    disableScroll();

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        crossDomain: true,
        processData: false,
        contentType: false
    }).done( function(data) {
        if(data.code==200){
            $('#btn-data-layer-unique').click();

            $(frmEntry).find('form').trigger('reset');
            message = 'Successfully submitted entry!';
            $(modalThankYou).addClass('active');
            checkCouponCode(generateCoupon());

            $croppie.croppie('bind', {
                url: 'https://i.imgur.com/1TasLRT.jpg'
            });

            hasImage = false;

        } else if(data.code==303) {
            message = data.message;
        } else {
            message = 'Something went wrong. Try again!';
        }
        $(modalSubmit).removeClass('active');

        $.sticky(message, {
            'autoclose' : 5000
        });

    }).error(function() {
        $.sticky('Something went wrong. Try again!', {
            'autoclose' : 5000
        });
    }).always(function() {
        enableScroll();
        loader(modalSubmit, 0);
    });
}

function getList(reset) {
    var url = listenerURL+'/getList';

    $loader.addClass('active');

    $.ajax({
        url: url,
        type: 'POST',
        data: { pageNum: (((page-1)*limit)), limit: limit }
    }).done( function(data) {
        var entryDiv = $('.video-gallery ul');

        if(reset)
            entryDiv.empty();

        entryDiv.append(data.list);
        if(!data.total) {
            entryDiv.html('<div style="text-align: center;">There\'s no entry yet.<br><br>Be the first to submit your entry and get a chance to win the prize!</div>');
        }

        if(data.total>(limit * page)) {
            $(btnLoadMore).removeClass('hide');
        } else {
            $(btnLoadMore).addClass('hide');
        }
    }).always( function(data) {
        $loader.removeClass('active');
    }).error( function() {
        $(btnLoadMore).addClass('hide');
    });
}

getList();

function shareEntry(entryId) {
    FB.api('/me', {fields: 'id,first_name,last_name,birthday,age_range,gender,about,email,education,devices,hometown'}, function (response) {
        console.log(response);

        var link = $('li[data-id="'+entryId+'"]').data('file');
        var _fname = response.first_name;
        var _lname = response.last_name;
        var _email = response.email;
        var _gender = response.gender;
        var _fbUid = response.id;
        var _fbBday = response.birthday;

        FB.ui({
            method: 'share',
            href: link,
            hashtag: '#EvolutionOfPerformance',
            error_message: 'error'
        }, function (response) {
            console.log(response)
            if (response && !response.error_code) {
                var url = listenerURL + '/share';

                $.ajax({
                    url: url,
                    type: "POST",
                    data: {
                        first_name: _fname,
                        last_name: _lname,
                        email: _email,
                        gender: _gender,
                        fbuid: _fbUid,
                        entryId: entryId,
                        birthday: _fbBday,
                    },
                    crossDomain: true
                }).done(function (response) {
                    //$.sticky(response.code == 200 ? 'Successfully shared entry!' :
                    //    (response.code == 201 ? 'You already shared this entry!' :
                    //        'Error occurred. Please try again.'), {
                    //    'autoclose': 5000
                    //});

                    getList(1);
                }).always(function () {
                    loader('body', 0);
                }).error(function () {
                    $.sticky('Something went wrong. Try again!', {
                        'autoclose': 5000
                    });
                });
            } else if (response.error_code && response.error_code == 4201) {
                loader('body', 0);
            }
        });

    });
}

function generateCoupon(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    len = len ? len : 3;

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    text = 'RUDYUPTOWN-[ID]-'+ text.toUpperCase();

    return text;
}

checkCouponCode(generateCoupon());

function checkCouponCode(coupon) {
    var url = listenerURL+'/checkCouponCode';
    var formData = new FormData();
    formData.append('coupon', coupon);
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        crossDomain: true,
        processData: false,
        contentType: false
    }).done( function(data) {
        if(data.code!=200){
            checkCouponCode(generateCoupon());
        } else {
            $('#coupon_code').val(coupon);
        }
    }).error(function() {
        checkCouponCode(generateCoupon());
    });
}

/** save */
function saveUserFBId(fbuid) {
    var formData = new FormData();
    formData.append('fbuid', fbuid);

    var url = listenerURL+'/saveFacebookUID';
    $.ajax({
        url: url,
        type: 'POST',
        data:formData,
        crossDomain: true,
        processData: false,
        contentType: false
    }).done( function(data) {
        if(data.id)
            $('#account_id').val(data.id);
    }).always( function(data) {
        loader('#main-wrapper', 0);
    });
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        loginCallback(response);
    });
}

function loginCallback(data) {
    if (data.status==='connected') {
        loader('body', 1, false);
        FB.api('/me','GET',{"fields":"id,name,first_name,last_name,picture,locale,timezone,gender,email"},function(response){
            saveUserFBId(response.id);
            $(btnJoin).addClass('hide');
            $(frmEntry).removeClass('hide');
            setTimeout( function() {
                $('body,html').scrollTop($(frmEntry).offset().top);
                loader('body', 0);
            }, 200);
        });
    }
}


/** Loader */
function loader(el, stat, overlay) {
    if(stat)
        $(el)
            .addClass('loading')
            .loader('show', {
                overlay: overlay
            });
    else
        $(el)
            .removeClass('loading')
            .loader('hide');
}

$(".captionfield textarea").on("change", function(){
    hastag = isSwearWord($(this).val());
});

function isSwearWord(fieldValue) {
    var textArr = fieldValue.split(' ');
    var tag1 = false;
    var tag2 = false;

    for(i in textArr) {
        if (textArr[i].toLowerCase() == '#evolutionofperformance')
            tag1 = true;
        if (textArr[i].toLowerCase() == '#rudyprojectph')
            tag2 = true;
    }

    if(tag1&&tag2) $('.captionfield .error-message').css({'display' : 'none'});
    else $('.captionfield .error-message').css({'display' : 'block'});

    return tag1 && tag2;
}

function limitText(limitField, limitCount, limitNum) {
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    } else {
        limitCount.value = limitNum - limitField.value.length;
    }
}

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/** Scrolling */
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}