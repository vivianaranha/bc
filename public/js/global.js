//////// Custom JS

function edValueKeyPress() {
    var edValue = document.getElementById("web_address");
    var s = edValue.value;

    var lblValue = document.getElementById("web_address_label");
    lblValue.innerText = s;
}

function checkLength(el){
    if (el.value.length < 6) {
        el.style.border = "1px solid red";
        $("#error_message_web_address").html("Minimum 6 characters")
        el.focus();
    } else {
        if(users.includes(el.value)){
            el.style.border = "1px solid red";
            $("#error_message_web_address").html("Address already exists");
            el.focus();
        } else {
            el.style.border = "none";
            $("#error_message_web_address").html("")
        }
    }
}

$('#web_address').on('keypress', function (event) {
    var regex = new RegExp("^[a-z_]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        $("#error_message_web_address").html("");
    if(this.style.border == "1px solid red") {
        if (this.value.length >= 5) {
            this.style.border = "none";
        }
    }
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});

$('#phone').on('keypress', function (event) {
    var regex = new RegExp("^[0-9-() ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});

var users = [];

$.ajax({
    url: '/getUsers',
    type: 'GET',
    success: function (data) {
        users = JSON.parse(data);
    }
});

$('#submit_button').click(function() {
    
    if($('#first_name').val() == "") {
        $('#error_message_submit').html("Fix First Name");
        return;
    }

    if($('#last_name').val() == "") {
        $('#error_message_submit').html("Fix Last Name");
        return;
    }

    if($('#job_title').val() == "") {
        $('#error_message_submit').html("Fix Job Title");
        return;
    }

    if($('#company_name').val() == "") {
        $('#error_message_submit').html("Fix Company Name");
        return;
    }

    //check email

    const email = $('#email').val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        $('#error_message_submit').html("Fix Email");
        return;
    } 
    //check phone number
    if($('#phone').val() == "") {
        $('#error_message_submit').html("Fix Phone Number");
        return;
    }

    $('#error_message_submit').html("");
    $('#submit_button').hide();
    $('#message_submit').html("Processing...");

    var formData = {
      web_address:  $("#web_address").val(),
      first_name: $("#first_name").val(),
      last_name: $("#last_name").val(),
      job_title: $("#job_title").val(),
      company_name: $("#company_name").val(),
      email: $("#email").val(),
      phone: $("#phone").val()
    };

    $.post( "/", formData)
        .done(function( data ) { 
            window.location.href = "/"+$("#web_address").val();
        }
    );
});

$('#web_address').focus();


//////// Custom JS



(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });
    
        var myCalendar = $('.js-datepicker');
        var isClick = 0;
    
        $(window).on('click',function(){
            isClick = 0;
        });
    
        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
    
        });
    
        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();
    
            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;
    
            if (isClick === 1) {
                myCalendar.focus();
            }
        });
    
        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });
    
        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });
    
    
    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/
    
    try {
        var selectSimple = $('.js-select-simple');
    
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    
    } catch (err) {
        console.log(err);
    }
    

})(jQuery);
