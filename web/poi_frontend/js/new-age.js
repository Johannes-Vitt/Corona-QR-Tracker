(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  $('#reset-form').click(function () {
    console.log('test')
    $('#register-location').show()
    $('#show-qr').hide()
    $('#register-location').trigger("reset")
  })

  var centeredText = function (doc, text, y) {
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(textOffset, y, text);
  }

  var genQR = function (code, id) {

    var qrcode = new QRCode(document.getElementById(id), {
      text: code + "",
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    })

    setTimeout(function () {
      var src = $('#' + id + ' img')[0].src
      document.getElementById('preview-qr').src = src
      $('#code-label').text(code)
      $('#register-location').hide()
      $('#show-qr').show()

      var doc = new jsPDF("h", "mm", "a4")
      centeredText(doc, 'Standort ID: ' + code, 175)
      centeredText(doc, 'App herunterladen unter', 250)
      centeredText(doc, 'https://www.qrona.app/#download', 257)
      doc.addImage(src, 45, 45, 120, 120)
      doc.setFontSize(40)
      centeredText(doc, 'SCAN MICH', 30)
      doc.setFontSize(15)
      centeredText(doc, 'Werde benachrichtigt, falls du Kontakt zu einem Infizierten hattest!', 40)
      doc.save('standort-code-' + code + '.pdf')

    }, 500)

  }

  $("#register-location").submit(function (event) {
    var title = $('#location_name').val()
    var mail = $('#phone_email').val()
    var location = $('#location_ref').val()
    var category = $('#category-select').val()

    var data = { mail: mail, title: title, location: location, category: category }

    $.ajax('http://localhost:2222/api/poi', {
      'data': JSON.stringify(data),
      'type': 'POST',
      'processData': false,
      'contentType': 'application/json'
    })
      .done(function (data) {
        genQR(data.code, 'qr-code')
      })
      .fail(function (err) {
        console.log(err)
        if (err.status != 400) return

        if (err.responseText.includes('mailTel')) {
          alert("You have to enter an Email or Phone Number!")
          return
        }

        if (err.responseText.includes('title')) {
          alert("You have to a Location Name")
          return
        }

        if (err.responseText.includes('location_href')) {
          alert("You have to enter Location Information!!")
          return
        }
      })

    event.preventDefault();
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
