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

function cargarRelojes(tipo) {
    console.log(tipo);
    let fbdb = firebase.database();
    let relojes = fbdb.ref(`/Relojes/${tipo}/`);
    relojes.on("value", snap => {
        snap.forEach(s => {
            console.log(s.val().Nombre);
            console.log(tipo);
            const div = document.createElement("div");
            const h5 = document.createElement("h5");
            const img = document.createElement("img");
            const ul = document.createElement("ul");
            const btn = document.createElement("button");

            div.classList = "col-sm-4 portfolio-item";
            div.id = s.key;

            img.src = s.val().Imagen;
            img.classList = "img-fluid";

            h5.innerHTML = s.val().Nombre;

            ul.classList = "listaCaract";

            s.val().Caracteristicas.forEach( (e) => {
                const li = document.createElement("li");
                li.innerHTML = e;
                ul.append(li);
            })

            $(btn).addClass("btn btn-outline-success");

            btn.innerHTML = `${s.val().Precio}$`;

            div.append(img);
            div.append(h5);
            div.append(ul);
            div.append(btn);
            $(`#lista_${tipo}`).append(div);
        })
    })
}

$(document).ready(e => {
    cargarRelojes("Siempre");
    cargarRelojes("Deportivos");
    cargarRelojes("Lujo");
    cargarRelojes("Clasicos");
})