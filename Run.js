let btn = document.querySelector('button');

btn.addEventListener('click', function () {
  // form submission starts
  // button is disabled
  btn.classList.add('spin');
  btn.disabled = true;
  
  // This disables the whole form via the fieldset
  btn.form.firstElementChild.disabled = true;
  
  // this setTimeout call mimics some asyncronous action
  // you would have something else here
  window.setTimeout(function () {
    // when asyncronous action is done, remove the spinner
    // re-enable button/fieldset
    btn.classList.remove('spin');
    btn.disabled = false;
    btn.form.firstElementChild.disabled = false;
  }, 4000);
}, false);
