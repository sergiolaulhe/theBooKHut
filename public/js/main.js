

window.addEventListener("load", function(){
    let menuDesplegable = document.querySelector('.menu li:has(ul)')

    menuDesplegable.addEventListener('click', function (e){
        e.preventDefault();

        if ((this).hasClass('activado')) {

        } else {
            ('.menu li ul').slideUp();
            ('.menu li').removeClass('activado');
            (this).addClass('activado');
            (this).children('ul').slideDown();
        }
    })
});

