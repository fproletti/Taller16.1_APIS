// Seleccione la API de unsplash que tiene una base de fotos de licencia gratuita
//me registre para obtener mi api key 
//realice una solicitud fetch 

// según la cantidad de fotos deseada
const accessKey = 'xc2oR8DlfhIRmU8RKrU1kUIekMgXRpgFD62xubEnOC4'; // Reemplaza con tu clave de acceso de Unsplash



document.addEventListener('DOMContentLoaded', function() {
    fetchPhotos();


function fetchPhotos() {
const url = `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=10`; //  'per_page' es un parametro y se puede modificar
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            agregarTarjetas(data);
        })
        .catch(error => {
            console.error('Hubo un problema con la petición:', error);
        });
}

// funcion que agrega las tarjetas 

function agregarTarjetas(data) {
    const contenedor = document.getElementById("gallery");
    contenedor.innerHTML = ''; // Limpiar contenedor antes de agregar nuevas tarjetas


    /* algunas notitas: 
      -photo.urls.regular es un objeto que devuelve la Api regular refiere al tamano de foto
      tambien hay raw, full, small, etc.
    - ${photo.created_at ? new Date(photo.created_at).toLocaleDateString() es para dar formato a como se muestra la fecha
      Date es un objeto que toma el formato origianla de la fecha en json toLocaleDateString() es el metodo que la convierte 
      en bonito de ver 
    */

    data.forEach(photo => {
        const card = `
            <div class="card col-3">
            <div class="contImagen">
                <img src="${photo.urls.regular}" alt="${photo.alt_description || 'Foto de Unsplash'}">
               </div>
                <div class="card-body">
                    <p>${photo.alt_description || 'Ups ... no hay descripción.'}</p>
                    <small>${photo.created_at ? new Date(photo.created_at).toLocaleDateString() : 'Fecha no disponible.'}</small>
                </div>
            </div>
        `;

        contenedor.innerHTML += card; // Agregar tarjeta al contenedor
    });
}

//Para agregar una foto random tengo que rearmar el fetch porque la url es diferente

const buttonRandom=document.getElementById("random")
buttonRandom.addEventListener('click', () => {
    const url_random = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;
    const fotoContainer = document.getElementById("fotoBtn");


    fetch(url_random)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            const img = document.createElement('img');
            img.src = data.urls.regular;
            img.alt = data.alt_description || 'Foto de Unsplash';
            img.className = 'img-fluid'; // Clase de Bootstrap para que la imagen sea responsiva
            fotoContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar la nueva imagen
            fotoContainer.appendChild(img); // Agregar la imagen al contenedor
        })
        .catch(error => {
            console.error('Hubo un problema con la petición:', error);
        });
});


// Para agregar una foto especifica que yo misma elegi tengo que jugar con el id en la url 
// id de mi imagen Mv9hjnEUHR4

const buttonId=document.getElementById("especifica")

buttonId.addEventListener('click', () => {
    const imageId = "Mv9hjnEUHR4"
    const url_id = `https://api.unsplash.com/photos/${imageId}?client_id=${accessKey}`;

fetch(url_id)
.then(response => {
    if (!response.ok) {
        throw new Error('Error en la red');
    }
    return response.json();
})
.then(data => {
    const img = document.createElement('img');
    img.src = data.urls.regular;
    
    
    const fotoContainer = document.getElementById('fotoBtn');
    fotoContainer.innerHTML = ''; // Limpiar el contenedor!!!
    fotoContainer.appendChild(img); // Agregar al contenedor!!
})
.catch(error => {
    console.error('Hubo un problema con la petición:', error);
});
});
});

