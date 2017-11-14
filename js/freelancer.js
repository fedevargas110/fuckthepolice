(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
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

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 54
    });

    // Collapse the navbar when page is scrolled
    $(window).scroll(function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    });

    // Floating label headings for the contact form
    $(function() {
        $("body").on("input propertychange", ".floating-label-form-group", function(e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function() {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function() {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });

})(jQuery); // End of use strict

//Lee firebase
var x = 0;
function cargarRelojes(tipo) {
    let fbdb = firebase.database();
    let relojes = fbdb.ref(`/Relojes/${tipo}/`);
    relojes.on("value", snap => {
        snap.forEach(s => {
            const div = document.createElement("div");
            const h5 = document.createElement("h5");
            const img = document.createElement("img");
            const ul = document.createElement("ul");
            const btn = document.createElement("button");

            div.classList = "col-sm-4 portfolio-item";
            div.id = s.key;

            h5.innerHTML = s.val().Nombre;

            img.src = s.val().Imagen;
            img.classList = "img-fluid";

            ul.classList = "listaCaract";

            s.val().Caracteristicas.forEach( (e) => {
                const li = document.createElement("li");
                li.innerHTML = e;
                ul.append(li);
            })

            x = x + 1;            
            btn.id = "btnComprar_" + x;
            console.log(btn.id);

            btn.setAttribute( "onClick", "javascript: comprar(this.id);");

            $(btn).addClass("btn btn-outline-success");
            btn.innerHTML = `${s.val().Precio}$`;

            div.append(img)
            div.append(h5);
            div.append(ul);
            div.append(btn);
            $(`#lista_${tipo}`).append(div);
        })
    })
}

function comprar(nId){    
    if (nId.substr(11, 2) == 1){
        console.log("comprar1");    
    }
    if (nId.substr(11, 2) == 2){
        console.log("comprar2");    
    }
    if (nId.substr(11, 2) == 3){
        console.log("comprar3");    
    }
    if (nId.substr(11, 2) == 4){
        console.log("comprar4");    
    }
    if (nId.substr(11, 2) == 5){
        console.log("comprar5");    
    }
    if (nId.substr(11, 2) == 6){
        console.log("comprar6");    
    }
    if (nId.substr(11, 2) == 7){
        console.log("comprar7");    
    }
    if (nId.substr(11, 2) == 8){
        console.log("comprar8");    
    }
    if (nId.substr(11, 2) == 9){
        console.log("comprar9");    
    }
    if (nId.substr(11, 2) == 10){
        console.log("comprar10");    
    }
    if (nId.substr(11, 2) == 11){
        console.log("comprar11");    
    }
    if (nId.substr(11, 2) == 12){
        console.log("comprar12");    
    }

}

function validador(){
    var nombre = document.getElementById("inputNombre");
    var numero = document.getElementById("inputNumero");
    var cvv = document.getElementById("inputCVV");

    if( isNaN(numero) ) {
        return false;
    }

    if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) ) {
        alert('[ERROR] El campo debe tener un valor de...');
        return false;
    }
    else if (condicion que debe cumplir el segundo campo del formulario) {
        // Si no se cumple la condicion...
        alert('[ERROR] El campo debe tener un valor de...');
        return false;
    }
    ...
    else if (condicion que debe cumplir el último campo del formulario) {
        // Si no se cumple la condicion...
        alert('[ERROR] El campo debe tener un valor de...');
        return false;
    }

    return true;

}

$(document).ready(e => {
    cargarRelojes("Siempre");
    cargarRelojes("Deportivos");
    cargarRelojes("Lujo");
    cargarRelojes("Clasicos");
})