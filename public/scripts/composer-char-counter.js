$(document).ready(function() {
  $('#txtid').on('keyup', function() {
  var char = (this.value.length)
  remainder = 140 - char;
  $('span.counter').text(remainder);
  if (remainder < 0) {
    document.getElementById('counter').style.color = '#ff0000'
  }
  else {document.getElementById('counter').style.color = 'initial'}
  })
  });
