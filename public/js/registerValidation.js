window.addEventListener('load', function() {
    const btnSubmit = document.querySelector('#button');
    const inputName = document.querySelector('#inputName');
    const erName = document.querySelector('#erName');
    const registerForm = document.querySelector('form');

    inputName.focus();

    
    btnSubmit.addEventListener('click', function(e){
        e.preventDefault();
        const errors = {}
        if (inputName.value.length < 1) {
            errors.name = 'Debes completar este campo'
        }
        if (Object.keys(errors).length >= 1) {
            erName.innerHTML = (errors.name) ? errors.name : '';
        } else {
            registerForm.submit();
        }
    })





})