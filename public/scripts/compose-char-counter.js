$(document).ready(function() {
  let maxLength = 140;
  $('textarea').keyup(function() {
    let length = $(this).val().length;
    let availableChar = maxLength - length;
    $('.counter').text(availableChar);
    if (availableChar < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149')
    }
  })
  
});
