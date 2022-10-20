window.addEventListener('load', function() {
    let emailField = document.querySelector('.email');

    emailField.addEventListener('focus', function() {
        emailField.style.backgroundColor = 'orange';
    })

    document.querySelector('#email').focus();

    let form = document.querySelector('form.form');
console.log(1);
    form.addEventListener('submit', function(e) {
        console.log(e);


        const email = document.getElementById('email');

        email.addEventListener('input', function (event) {
            if (email.validity.typeMismatch) {
                email.setCustomValidity('Debes ingresar una direcció de correo electronico valida');
                
            } else {
                email.setCustomValidity("");
            }
        });
        

        let errors = [];

        let eField = document.querySelector('input.email')
        console.log(eField);

        if (eField.value == '') {
            errors.push('@ Debes completar el campo de correo electronico')
        } else if (eField.value.length < 6) {
            errors.push('')
        }

        let passwordField = document.querySelector('input.password');

        if (passwordField.value.length < 1) {
            errors.push('@ Debes ingresar una contraseña')
        } else if (passwordField.value.length < 6) {
            errors.push('@ La contraseña debe tener entre 6 y 30 caracteres')
        }

        if (errors.length > 0) {
            e.preventDefault();
        }

            let ulErrors = document.querySelector('div.errors ul');
            
            for (let i = 0; i < errors.length; i++) {
                
                ulErrors.innerHTML += '<li>' + errors[i] + '</li>' 
            } 


    })
})