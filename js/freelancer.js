(function($) {
    "use strict"; // Start of use strict

    window.addEventListener('load', function() {
        var form = document.getElementById('needs-validation');
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    }, false);

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

            btn.id = s.key;

            btn.onclick = () => {
                $("#modelo").text(s.val().Nombre);
                modalFixer();
            };
            btn.setAttribute( "data-toggle", "modal");

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

function validador(){
    var todo_correcto = true;
    let nId = $("#modelo").text();
    var nombre = document.getElementById("inputNombre").value;
    var numero = document.getElementById("inputNumero").value;
    var cvv = document.getElementById("inputCVV").value;
    var mes = document.getElementById("inputMesVencimiento").value;
    var año = document.getElementById("inputAñoVencimiento").value;

    var dir = document.getElementById("inputDireccion").value;
    var locali = document.getElementById("inputLocalidad").value;
    var prov = document.getElementById("inputProvincia").value;
    var zip = document.getElementById("inputZip").value;

    if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) || nombre.length <= 4 ) {
        todo_correcto = false;
        document.getElementById("inputNombre").style.border = "1px solid red";
    }else{
        document.getElementById("inputNombre").style.border = "1px solid green";
    }
    if (numero == null || numero.length == 0 || /^\s+$/.test(numero) || isNaN(numero) || numero % 1 != 0 || numero <= 0 || numero.length <= 14 || numero.length >= 18){
        todo_correcto = false;
        document.getElementById("inputNumero").style.border = "1px solid red";
    }else{
        document.getElementById("inputNumero").style.border = "1px solid green";
    }
    if (cvv == null || cvv.length == 0 || /^\s+$/.test(cvv) || isNaN(cvv) || cvv % 1 != 0 || cvv <= 0 || cvv.length <= 2 || cvv.length >= 4){
        todo_correcto = false;
        document.getElementById("inputCVV").style.border = "1px solid red";
    }else{
        document.getElementById("inputCVV").style.border = "1px solid green";
    }
    if( mes == null || mes == 0 ){
        todo_correcto = false;
        document.getElementById("inputMesVencimiento").style.border = "1px solid red";
    }else{
        document.getElementById("inputMesVencimiento").style.border = "1px solid green";
    }
    if (año == null || año == 0 ){
        todo_correcto = false;
        document.getElementById("inputAñoVencimiento").style.border = "1px solid red";
    }else{
        document.getElementById("inputAñoVencimiento").style.border = "1px solid green";
    }
    if( dir == null || dir.length == 0 || /^\s+$/.test(dir) || dir.length <= 8 ) {
        todo_correcto = false;
        document.getElementById("inputDireccion").style.border = "1px solid red";
    }else{
        document.getElementById("inputDireccion").style.border = "1px solid green";
    }
    if( locali == null || locali.length == 0 || /^\s+$/.test(locali) || locali.length <= 4 ) {
        todo_correcto = false;
        document.getElementById("inputLocalidad").style.border = "1px solid red";
    }else{
        document.getElementById("inputLocalidad").style.border = "1px solid green";
    }
    if( prov == null || prov == 0 ) {
        todo_correcto = false;
        document.getElementById("inputProvincia").style.border = "1px solid red";
    }else{
        document.getElementById("inputProvincia").style.border = "1px solid green";
    }
    if (zip == null || zip.length == 0 || /^\s+$/.test(zip) || isNaN(zip) || zip % 1 != 0 || zip <= 0 || zip.length <= 3 || zip.length >= 6){
        todo_correcto = false;
        document.getElementById("inputZip").style.border = "1px solid red";
    }else{
        document.getElementById("inputZip").style.border = "1px solid green";
    }

    if(!todo_correcto){
        alert('Algunos campos no están correctos, vuelva a revisarlos');
    }else{
        comprar(nId, nombre, numero, cvv, mes, año, dir, locali, prov, zip);
    }
};

function comprar(nId, nombre, numero, cvv, mes, año, dir, locali, prov, zip){  
    const fbdbCompra = firebase.database().ref(`/Compras/${nId}/`);
    fbdbCompra.push({
        "1_nombre": nombre,
        "2_numero": numero,
        "3_cvv": cvv,
        "4_mes": mes,
        "5_año": año,
        "6_dir": dir,
        "7_locali": locali,
        "8_prov": prov,
        "9_zip": zip
    });
}

function modalFixer(){
    $('#formulario').modal('show');

    $('.modal').on("hidden.bs.modal", function (e) { 
        if ($('.modal:visible').length) {
            $('body').addClass('modal-open'); 
        }
    });
}

$(document).ready(e => {
    cargarRelojes("Siempre");
    cargarRelojes("Deportivos");
    cargarRelojes("Lujo");
    cargarRelojes("Clasicos");
})