// Form-Validation.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - ThemeOn.net -

$(document).ready(function() {


    // FORM VALIDATION
    // =================================================================
    // Require Bootstrap Validator
    // http://bootstrapvalidator.com/
    // =================================================================
    // FORM VALIDATION FEEDBACK ICONS
    // =================================================================
    var faIcon = {
            valid: 'fa fa-check-circle fa-lg text-success',
            invalid: 'fa fa-times-circle fa-lg',
            validating: 'fa fa-refresh'
        }
        // FORM VALIDATION ON ACCORDION
        // =================================================================
        // FORM VALIDATION CUSTOM ERROR CONTAINER
        // =================================================================
        // Indicate where the error messages are shown.
        // Tooltip, Popover, Custom Container.
        // =================================================================

    $('#frmMobile').bootstrapValidator({
        message: 'This value is not valid',
        excluded: [':disabled'],
        feedbackIcons: faIcon,
        fields: {
            Full_Email: {
                validators: {
                    notEmpty: {
                        message: 'Địa chỉ email không được để trống.'
                    },
                    emailAddress: {
                        message: 'Không đúng định dạng email'
                    }
                }
            },
            Full_Name: {
                validators: {
                    notEmpty: {
                        message: 'Họ tên không được để trống.'
                    }
                }
            },
            Full_Phone: {
                validators: {
                    notEmpty: {
                        message: 'Điện thoại không được để trống.'
                    },
                    stringLength: {
                        min: 10,
                        max: 11,
                        message: 'Số điện thoại chỉ có thể là 10 hoặc 11 số.'
                    }
                }
            },
            Full_Location: {
                validators: {
                    notEmpty: {
                        message: 'Địa điểm không được để trống.'
                    }
                }
            },
            Show_room: {
                validators: {
                    notEmpty: {
                        message: 'Cần chọn Showroom.'
                    }
                }
            },
            Full_NhuCau: {
                validators: {
                    notEmpty: {
                        message: 'Cần chọn nhu cầu.'
                    }
                }
            }
        },
        onSuccess: function(e) {
			showLoadingContactImage('content-mobile', 'formContentContactMobile');
			// đem tất cả dữ liệu trong form id là 'google-form' gom thành biến data
			let data = $('#frmMobile').serialize();

			$.ajax({ //Sử dụng Ajax gửi dữ liệu đi
				url: 'https://script.google.com/macros/s/AKfycbymH8Xk5Ay-5CIgmmwiwHC-7JFQHzR-f_Eqtgg_yfRJH07QVAg/exec',
				method: 'GET',
				dataType: 'json',
				data: data,
				// success: function(responseData, textStatus, jqXHR) {
				// },
				// error: function(jqXHR, textStatus, errorThrown) {
					// console.log(errorThrown);
				// }
				success: function(states) {
                    $('#frmMobile').bootstrapValidator('resetForm', true);
                    hideLoadingContactImage('content-mobile', 'formContentContactMobile');
                },
                error: function(ex) {
                    toastr.error('Đã có lỗi trong quá trình đăng ký, mời bạn thử lại.', { timeOut: 5000 })
                    hideLoadingContactImage('content-mobile', 'formContentContactMobile');
                },
                complete: function(responseData, jqXHR, textStatus) {
                    $('#txtName').val('');
                    $("#txtPhone").val('');
                    $('#txtEmail').val('');
                    $('#frmMobile').bootstrapValidator('resetForm', true);
                    toastr.success('Cảm ơn bạn đã đăng ký.</br>Chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất!', {
                        timeOut: 8000
                    })
                    window.location.href = "dang-ky-thanh-cong.html";
                }
			});
        }
    }).on('success.form.fv', function(e) {

    });

    function checkPhoneNumber() {
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var mobile = $('#txtPhone').val();
        if (mobile !== '') {
            if (vnf_regex.test(mobile) == false) {
                toastr.error('Số điện thoại của bạn không đúng định dạng.', { timeOut: 5000 })
                $("#txtPhone").focus();
                return false;

            } else {
                return true;
            }
        } else {
            toastr.error('Bạn chưa điền số điện thoại.', { timeOut: 5000 })
            return false;
        }
    }

    function showLoadingImage() {

        $('#content').empty().append('<div id="loading-image" align="center"><img src="img/ajax-loader.gif" alt="Loading..." /></div>');
        $('#formContentContact').hide();

    }

    function hideLoadingImage() {
        $('#formContentContact').show();
        $('#loading-image').remove();
    }
	
	

    function showLoadingContactImage(contentLoading, frmContent) {

        $('#' + contentLoading).empty().append('<div id="loading-image" align="center"><img src="img/ajax-loader.gif" alt="Loading..." /></div>');
        $('#' + frmContent).hide();

    }

    function hideLoadingContactImage(contentLoading, frmContent) {
        $('#' + frmContent).show();
        $('#loading-image').remove();
    }
	
	function getDate() {
	  var today = new Date();
	  var dd = today.getDate();
	  var mm = today.getMonth()+1; //January is 0!
	  var yyyy = today.getFullYear();

	  if(dd<10) {
		  dd = '0'+dd
	  } 

	  if(mm<10) {
		  mm = '0'+mm
	  } 

	  today = dd  + '/' + mm + '/' + yyyy;
	  console.log(today);
	  document.getElementById("date").value = today;
	}


	window.onload = function() {
	  getDate();
	};

});