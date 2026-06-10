import PhotoSwipeLightbox from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe-lightbox.esm.min.js';
import PhotoSwipe from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.esm.min.js';

const contenedor = document.getElementById("grid-galeria");

if (contenedor) {
    const totalJpg = 352;
    const totalJpeg = 17;
    const rutaCarpeta = "gale/";

    // 1. Crear las imágenes en la rejilla
    for (let i = 1; i <= totalJpg; i++) {
        crearFotoHTML(`galeria (${i}).jpg`);
    }
    for (let i = 1; i <= totalJpeg; i++) {
        crearFotoHTML(`galeria (${i}).jpeg`);
    }

    function crearFotoHTML(archivo) {
        const rutaCompleta = rutaCarpeta + archivo;

        const enlace = document.createElement("a");
        enlace.href = rutaCompleta;
        enlace.dataset.pswpWidth = "1200";
        enlace.dataset.pswpHeight = "1200";
        enlace.className = "foto-contenedor block overflow-hidden rounded-lg bg-slate-950 aspect-square relative";

        const imagen = document.createElement("img");
        imagen.src = rutaCompleta;
        imagen.alt = "Trabajo Realizado";
        imagen.className = "w-full h-full object-cover transition-transform duration-300 hover:scale-105 pointer-events-none";
        imagen.loading = "lazy";

        enlace.appendChild(imagen);
        contenedor.appendChild(enlace);
    }

    // 2. Arrancar el reproductor transparente de forma nativa e inmediata
    const visor = new PhotoSwipeLightbox({
        gallery: '#grid-galeria',
        children: 'a',
        pswpModule: PhotoSwipe,
        bgOpacity: 0.90
    });

    // Seguridad: Bloquear clic derecho dentro del visor abierto
    visor.on('afterInit', () => {
        if (visor.pswp && visor.pswp.container) {
            visor.pswp.container.addEventListener('contextmenu', e => e.preventDefault());
        }
    });

    visor.init();
}

// 3. Bloqueos de seguridad generales
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u")
    ) {
        e.preventDefault();
    }
});
