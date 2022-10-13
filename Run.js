$(function() {
  $( "#button___" ).click(function() {
    $( "#button___" ).addClass( "onclic", 250, validate);
  });

  function validate() {
    setTimeout(function() {
      $( "#button___" ).removeClass( "onclic" );
      $( "#button___" ).addClass( "validate", 450, callback );
    }, 2250 );
  }
    function callback() {
      setTimeout(function() {
        $( "#button___" ).removeClass( "validate" );
      }, 1250 );
    }
  });