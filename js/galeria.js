document.addEventListener("DOMContentLoaded", function () {

    const plantas = [

        {
            nombre: "Monstera deliciosa",
            categoria: "interior",
            imagen: "../img/monstera.jpeg",
            descripcion: "Una planta tropical de hojas grandes y llamativas, ideal para dar un toque verde y natural a interiores.",
            cuidados: {
                luz: "Luz indirecta brillante",
                riego: "Cuando se seque la capa superior del sustrato",
                humedad: "Media o alta",
                dificultad: "Fácil"
            }
        },

        {
            nombre: "Poto",
            categoria: "interior",
            imagen: "../img/poto.jpeg",
            descripcion: "Una de las plantas de interior más resistentes y fáciles de cuidar. Crece rápidamente y tolera diferentes condiciones.",
            cuidados: {
                luz: "Luz indirecta",
                riego: "Moderado",
                humedad: "Media",
                dificultad: "Muy fácil"
            }
        },

        {
            nombre: "Sansevieria",
            categoria: "interior",
            imagen: "../img/sansevieria.jpeg",
            descripcion: "Planta muy resistente que necesita pocos cuidados y puede adaptarse a lugares con poca luz.",
            cuidados: {
                luz: "Luz indirecta o poca luz",
                riego: "Escaso",
                humedad: "Baja o media",
                dificultad: "Muy fácil"
            }
        },

        {
            nombre: "Lavanda",
            categoria: "aromaticas",
            imagen: "../img/lavanda.jpeg",
            descripcion: "Planta aromática conocida por sus flores y su característico aroma. Necesita bastante luz.",
            cuidados: {
                luz: "Sol directo",
                riego: "Moderado y espaciado",
                humedad: "Baja",
                dificultad: "Fácil"
            }
        },

        {
            nombre: "Romero",
            categoria: "aromaticas",
            imagen: "../img/romero.jpeg",
            descripcion: "Planta aromática mediterránea muy resistente y útil tanto en jardinería como en la cocina.",
            cuidados: {
                luz: "Sol directo",
                riego: "Moderado",
                humedad: "Baja",
                dificultad: "Fácil"
            }
        },

        {
            nombre: "Albahaca",
            categoria: "aromaticas",
            imagen: "../img/Albahaca.jpeg",
            descripcion: "Planta aromática de crecimiento rápido que necesita buena iluminación y riegos regulares.",
            cuidados: {
                luz: "Sol o luz intensa",
                riego: "Regular",
                humedad: "Media",
                dificultad: "Fácil"
            }
        },

        {
            nombre: "Geranio",
            categoria: "exterior",
            imagen: "../img/geranio.jpeg",
            descripcion: "Planta muy popular para balcones y terrazas gracias a sus flores coloridas y abundantes.",
            cuidados: {
                luz: "Sol directo",
                riego: "Moderado",
                humedad: "Media",
                dificultad: "Fácil"
            }
        },

        {
            nombre: "Aloe vera",
            categoria: "exterior",
            imagen: "../img/aloe_vera.jpeg",
            descripcion: "Planta suculenta resistente que almacena agua en sus hojas y necesita pocos riegos.",
            cuidados: {
                luz: "Mucha luz o sol suave",
                riego: "Escaso",
                humedad: "Baja",
                dificultad: "Muy fácil"
            }
        },

        {
            nombre: "Olivo",
            categoria: "exterior",
            imagen: "../img/olivo.jpeg",
            descripcion: "Árbol mediterráneo resistente que necesita mucho sol y un espacio adecuado para desarrollarse.",
            cuidados: {
                luz: "Sol directo",
                riego: "Moderado",
                humedad: "Baja",
                dificultad: "Media"
            }
        }

    ];

    const plantGallery = document.getElementById("plant-gallery");
    const filterButtons = document.querySelectorAll(".filter-button");

    const plantModal = document.getElementById("plant-modal");
    const modalClose = document.getElementById("modal-close");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalDescription = document.getElementById("modal-description");
    const modalCareGrid = document.getElementById("modal-care-grid");

    if (
        !plantGallery ||
        !plantModal ||
        !modalClose ||
        !modalImage ||
        !modalTitle ||
        !modalCategory ||
        !modalDescription ||
        !modalCareGrid
    ) {
        console.error("Faltan elementos del catálogo o del modal.");
        return;
    }

    function mostrarPlantas(filtro) {

        plantGallery.innerHTML = "";

        const plantasFiltradas = plantas.filter(function (planta) {

            if (filtro === "todas") {
                return true;
            }

            return planta.categoria === filtro;
        });

        plantasFiltradas.forEach(function (planta) {

            const card = document.createElement("article");
            card.className = "plant-card";

            const imagen = document.createElement("img");
            imagen.src = planta.imagen;
            imagen.alt = planta.nombre;

            const contenido = document.createElement("div");
            contenido.className = "plant-card-content";

            const categoria = document.createElement("span");
            categoria.className = "plant-category";
            categoria.textContent = planta.categoria;

            const titulo = document.createElement("h3");
            titulo.textContent = planta.nombre;

            const descripcion = document.createElement("p");
            descripcion.textContent = planta.descripcion;

            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "button plant-info-button";
            boton.textContent = "Ver cuidados";

            boton.addEventListener("click", function () {
                abrirModal(planta);
            });

            contenido.appendChild(categoria);
            contenido.appendChild(titulo);
            contenido.appendChild(descripcion);
            contenido.appendChild(boton);

            card.appendChild(imagen);
            card.appendChild(contenido);

            plantGallery.appendChild(card);
        });
    }

    function abrirModal(planta) {

        modalImage.src = planta.imagen;
        modalImage.alt = planta.nombre;

        modalCategory.textContent = planta.categoria;
        modalTitle.textContent = planta.nombre;
        modalDescription.textContent = planta.descripcion;

        modalCareGrid.innerHTML = "";

        const cuidados = [

            {
                titulo: "Luz",
                texto: planta.cuidados.luz
            },

            {
                titulo: "Riego",
                texto: planta.cuidados.riego
            },

            {
                titulo: "Humedad",
                texto: planta.cuidados.humedad
            },

            {
                titulo: "Dificultad",
                texto: planta.cuidados.dificultad
            }

        ];

        cuidados.forEach(function (cuidado) {

            const elemento = document.createElement("div");
            elemento.className = "modal-care-item";

            const titulo = document.createElement("strong");
            titulo.textContent = cuidado.titulo;

            const texto = document.createElement("span");
            texto.textContent = cuidado.texto;

            elemento.appendChild(titulo);
            elemento.appendChild(texto);

            modalCareGrid.appendChild(elemento);
        });

        plantModal.showModal();
    }

    modalClose.addEventListener("click", function () {
        plantModal.close();
    });

    plantModal.addEventListener("click", function (event) {

        if (event.target === plantModal) {
            plantModal.close();
        }
    });

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("is-active");
            });

            button.classList.add("is-active");

            const filtro = button.dataset.filter;

            mostrarPlantas(filtro);
        });
    });

    mostrarPlantas("todas");

});
