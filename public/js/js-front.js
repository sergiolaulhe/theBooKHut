window.addEventListener("load", function(){

    if (localStorage.getItem('cookiesPolicy') == null) {

        let cookies = this.confirm('Estas de acuerdo con la politica de cookies y de privacidad?');
    
        localStorage.setItem('cookiesPolicy', cookies);
    
        console.log(localStorage);
    }


    let homeButton = document.querySelector('.home-button')

    homeButton.addEventListener('click', function (){
        confirm('Quieres volver al inicio?')
    })
    let subscriptionButton = document.querySelector('.subscription-button');

    subscriptionButton.addEventListener('mouseout', (e) => {
        e.target.style.color = "orange";
    })


// Menu Desplegable //

    
    

    bookIcon.addEventListener('click', function () {
        bookMenu.classList.toggle('show');
    })
    bookMenu.addEventListener('mouserleave', function () {
        bookMenu.classList.remove('show');
    })




});