const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    // Abrir y cerrar el menú
    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("is-open");

        menuToggle.classList.toggle("is-open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    // Cerrar el menú al seleccionar una opción
    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("is-open");
            menuToggle.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );
        });
    });


    window.addEventListener("resize", function () {

        if (window.innerWidth > 800) {

            navLinks.classList.remove("is-open");
            menuToggle.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );
        }
    });
}

