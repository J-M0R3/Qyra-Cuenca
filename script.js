// =====================================================
// HEADER AL HACER SCROLL
// =====================================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// =====================================================
// ANIMACIONES AL HACER SCROLL
// =====================================================

const elements = document.querySelectorAll(
    ".service-card, .project, .about-content, .intro-content"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


elements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

});


// =====================================================
// MENÚ
// =====================================================

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.querySelector(".nav");


menuButton.addEventListener("click", () => {

    nav.classList.toggle("mobile-open");

});


// =====================================================
// BIBLIOTECA CREATIVA
// =====================================================

const libraryModal =
    document.getElementById("libraryModal");

const libraryBackdrop =
    document.getElementById("libraryBackdrop");

const libraryClose =
    document.getElementById("libraryClose");

const libraryTitle =
    document.getElementById("libraryTitle");

const libraryDescription =
    document.getElementById("libraryDescription");

const libraryNumber =
    document.getElementById("libraryNumber");

const libraryLabel =
    document.getElementById("libraryLabel");

const libraryGrid =
    document.getElementById("libraryGrid");

const libraryEmpty =
    document.getElementById("libraryEmpty");

const projectCount =
    document.getElementById("projectCount");

const projectUpload =
    document.getElementById("projectUpload");


// =====================================================
// CONFIGURACIÓN DE CATEGORÍAS
// =====================================================

const libraryData = {

    branding: {

        number: "01",

        label: "IDENTIDAD · BRANDING",

        title: "Branding.",

        description:
            "Identidades visuales construidas para marcas con algo que decir."

    },

    digital: {

        number: "02",

        label: "DISEÑO · DIGITAL",

        title: "Diseño digital.",

        description:
            "Experiencias digitales, contenido y piezas creadas para conectar."

    },

    photography: {

        number: "03",

        label: "IMAGEN · FOTOGRAFÍA",

        title: "Fotografía.",

        description:
            "Imágenes pensadas para comunicar, destacar y construir percepción."

    },

    audiovisual: {

        number: "04",

        label: "VIDEO · PRODUCCIÓN",

        title: "Audiovisual.",

        description:
            "Historias visuales, reels y producciones pensadas para generar impacto."

    }

};


// =====================================================
// CATEGORÍA ACTUAL
// =====================================================

let currentCategory = "branding";


// =====================================================
// OBTENER PROYECTOS
// =====================================================

function getProjects(category) {

    const saved =
        localStorage.getItem(
            "qyra_" + category
        );

    if (!saved) {

        return [];

    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "No se pudieron cargar los proyectos.",
            error
        );

        return [];

    }

}


// =====================================================
// GUARDAR PROYECTOS
// =====================================================

function saveProjects(category, projects) {

    localStorage.setItem(
        "qyra_" + category,
        JSON.stringify(projects)
    );

}


// =====================================================
// ABRIR BIBLIOTECA
// =====================================================

function openLibrary(category) {

    currentCategory = category;

    const data =
        libraryData[category];

    if (!data) {

        return;

    }


    libraryNumber.textContent =
        data.number;

    libraryLabel.textContent =
        data.label;

    libraryTitle.textContent =
        data.title;

    libraryDescription.textContent =
        data.description;


    renderProjects();


    libraryModal.classList.add("active");

    libraryModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "library-open"
    );

}


// =====================================================
// CERRAR BIBLIOTECA
// =====================================================

function closeLibrary() {

    libraryModal.classList.remove(
        "active"
    );

    libraryModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "library-open"
    );

}


// =====================================================
// BOTONES DESCUBRIR
// =====================================================

const discoverButtons =
    document.querySelectorAll(
        ".service-discover"
    );


discoverButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const category =
                button.dataset.library;

            openLibrary(category);

        }
    );

});


// =====================================================
// BOTÓN REGRESAR
// =====================================================

libraryClose.addEventListener(
    "click",
    closeLibrary
);

libraryBackdrop.addEventListener(
    "click",
    closeLibrary
);


// =====================================================
// ESC PARA CERRAR
// =====================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            libraryModal.classList.contains("active")
        ) {

            closeLibrary();

        }

    }
);


// =====================================================
// MOSTRAR PROYECTOS
// =====================================================

function renderProjects() {

    const projects =
        getProjects(currentCategory);


    libraryGrid.innerHTML = "";


    projectCount.textContent =
        projects.length;


    if (projects.length === 0) {

        libraryEmpty.classList.remove(
            "hidden"
        );

        return;

    }


    libraryEmpty.classList.add(
        "hidden"
    );


    projects.forEach(
        (project, index) => {

            const card =
                document.createElement("article");

            card.className =
                "library-project";


            const image =
                document.createElement("img");

            image.src =
                project.image;

            image.alt =
                project.title ||
                "Proyecto QYRA";


            const info =
                document.createElement("div");

            info.className =
                "library-project-info";


            const categoryText =
                document.createElement("span");

            categoryText.textContent =
                libraryData[currentCategory].label;


            const title =
                document.createElement("h3");

            title.textContent =
                project.title ||
                "Proyecto " + (index + 1);


            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "delete-project";

            deleteButton.innerHTML =
                "×";

            deleteButton.title =
                "Eliminar proyecto";


            deleteButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    deleteProject(
                        project.id
                    );

                }
            );


            info.appendChild(
                categoryText
            );

            info.appendChild(
                title
            );


            card.appendChild(image);

            card.appendChild(info);

            card.appendChild(deleteButton);


            libraryGrid.appendChild(card);

        }
    );

}


// =====================================================
// SUBIR PROYECTOS
// =====================================================

projectUpload.addEventListener(
    "change",
    (event) => {

        const files =
            Array.from(
                event.target.files
            );


        if (!files.length) {

            return;

        }


        let projects =
            getProjects(
                currentCategory
            );


        let processed =
            0;


        files.forEach(
            (file) => {

                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    processed++;

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    (readerEvent) => {

                        const project = {

                            id:
                                Date.now() +
                                "-" +
                                Math.random()
                                    .toString(36)
                                    .substring(2),

                            title:
                                file.name
                                    .replace(
                                        /\.[^/.]+$/,
                                        ""
                                    ),

                            image:
                                readerEvent
                                    .target
                                    .result

                        };


                        projects.push(
                            project
                        );


                        processed++;


                        if (
                            processed ===
                            files.length
                        ) {

                            saveProjects(
                                currentCategory,
                                projects
                            );

                            renderProjects();

                        }

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );


        projectUpload.value = "";

    }
);


// =====================================================
// ELIMINAR PROYECTO
// =====================================================

function deleteProject(id) {

    const projects =
        getProjects(
            currentCategory
        );


    const filtered =
        projects.filter(
            (project) =>
                project.id !== id
        );


    saveProjects(
        currentCategory,
        filtered
    );


    renderProjects();

}


// =====================================================
// VIDEO — SOBRE NOSOTROS
// =====================================================
// El video NO se reproduce al cargar la página.
// Cada vez que la sección entra en pantalla:
// 1. Vuelve al segundo 0.
// 2. Comienza a reproducirse.
// 3. Se mantiene en loop mientras la sección está visible.
// Al salir:
// 4. Se pausa.
// Al volver a entrar:
// 5. Se reinicia nuevamente desde 0.
//

const aboutSection =
    document.querySelector("#nosotros");

const aboutVideo =
    document.querySelector("#aboutVideo");


if (
    aboutSection &&
    aboutVideo
) {

    const aboutVideoObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        // Reiniciar completamente
                        // cada vez que se entra.
                        aboutVideo.currentTime = 0;


                        // Asegurar que esté listo
                        // para comenzar.
                        aboutVideo.muted = true;


                        const playPromise =
                            aboutVideo.play();


                        // Algunos navegadores
                        // devuelven una Promise.
                        if (
                            playPromise !== undefined
                        ) {

                            playPromise.catch(
                                () => {

                                    // El navegador
                                    // puede impedir la
                                    // reproducción automática.
                                }
                            );

                        }

                    } else {

                        // Cuando se sale de la sección,
                        // detener el video.
                        aboutVideo.pause();

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    aboutVideoObserver.observe(
        aboutSection
    );

}