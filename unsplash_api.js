// Seleccione la API de unsplash que tiene una base de fotos de licencia gratuita
//me registre para obtener mi api key 
//realice una solicitud fetch 

const accessKey = 'TU_CLAVE_DE_ACCESO'; // Reemplaza con tu clave de acceso de Unsplash
const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        return response.json();
    })
    .then(data => {
        const imgUrl = data.urls.regular; // URL de la imagen
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = data.alt_description || 'Foto aleatoria de Unsplash';
        document.body.appendChild(imgElement); // Agrega la imagen al cuerpo del documento
    })
    .catch(error => {
        console.error('Hubo un problema con la petición:', error);
    });