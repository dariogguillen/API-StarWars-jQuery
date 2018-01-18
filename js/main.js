$(() => {
    const $contenedor = $('#container');
    const $contenedorImg = $('#containerImg');
    const $botonPeliculas = $('#films');
    // plantilla que se agregara al HTML al obtener la respuesta de la api
    const plantilla = `
            <div class='carta '>
                <div class='info'>
                    <h2>Nombre de la Pelicula: <span>:title:</span></h2>
                    <p>Episodio no.: <span>:episode:</span></p>
                    <p>Año de producción: <span>:date:</span></p>
                    <p>Director: <span>:director:</span></p>
                    <p>Créditos iniciales: <span>:opening:</span></p>
                </div>
                <div class='image'>
                    <img src="img/peliculas/:img:.jpg" alt="Imagen :img:">
                </div>
            </div>`;

    //arreglo con los nombres de las imagenes que se encuentran en ./img/peliculas/
    const imgPeliculas = [
        'A New Hope',
        'Attack of the Clones',
        'The Phantom Menace',
        'Revenge of the Sith',
        'Return of the Jedi',
        'The Empire Strikes Back',
        'The Force Awakens'
    ];

    // Funcion para iterar imgPeliculas
    const insertarImg = tituloPelicula => {
        const length = imgPeliculas.length;
        for (let i = 0; i < length; i++) {
            /******************************************************************************1
            Mostrando en consola el valor de estos elementos.
            En cada iteracion muestra i=0 y el primer valor de imgPeliculas,
            cuando deberia de mostrar valores diferentes ya que se supone i esta cambiando.
            ******************************************************************************/
            console.log(i, imgPeliculas[i]);
            if (imgPeliculas[i] === tituloPelicula) {
                //solo se cumple para la primera iteracion del for por lo que para las demas regresa lo que tiene else
                return imgPeliculas[i];
            } else {
                return 'Star-Wars';
            }
        }
    };

    // Al dar click en el boton#films se ejecuta esta funcion
    const pedido = () => {
        $.ajax('https://swapi.co/api/films/').then(peliculas => {
            const renderPeliculas = peliculas => {
                peliculas.results.forEach(pelicula => {
                    const contenedorPelicula = plantilla // Sustituyendo valores en la plantilla
                        .replace(':title:', pelicula.title)
                        .replace(':episode:', pelicula.episode_id)
                        .replace(':date:', pelicula.release_date)
                        .replace(':director:', pelicula.director)
                        .replace(':opening:', pelicula.opening_crawl)
                        .replace(':img:', insertarImg(pelicula.title)); // llamando la funcion que itera el arreglo imgPeliculas

                    $contenedorImg.hide(); // escondiendo el elemento #containerImg
                    $contenedor.append(contenedorPelicula); //agregando la plantilla con las sustituciones en #container
                });
            };
            renderPeliculas(peliculas); // Ejecucion de la funcion que se encargar de hacer cambios en la plantilla y agregar elementos al dom
        });
    };
    $botonPeliculas.click(pedido); // Evento que ejecuta la funcion pedido
});
