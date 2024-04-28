const contenedor = document.querySelector('#contenedor')
const btnSiguiente = document.querySelector('#btnSiguiente')
const btnAnterior = document.querySelector('#btnAnterior')

let pagina =1

btnSiguiente.addEventListener('click',()=>{
    // validacion pasar a la siguiente pagina 
    if(pagina < 1000){
        // suma una unida mas 1 a 2
        pagina+=1
        cargarPeliculas()
    }
})
btnAnterior.addEventListener('click',()=>{
    // pregunto si me entro mayor a una 
    if(pagina > 1){
        // resta una unida mas  2 a 1
        pagina -= 1
        cargarPeliculas()
    }
})

const cargarPeliculas = async () =>{
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=291d800feba9350296f0e232234d280a&language=es-VE&page=${pagina}`)
        // console.log(response);
        
        // estatus 200 todo ok!
        //si la respuesta es correca
        if(response.status === 200){
            // console.log('todo ok !');
            // objeto
            const datos = await response.json();

            let peliculas =''
            datos.results.forEach(element => {
                peliculas  += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="${element.title}">
                        <h3 class="titulo">${element.title} <h3>
                    </div>
                
                `;
                // console.log(element.title);
            })
            contenedor.innerHTML = peliculas;
        
        }else if(response.status === 401){
            console.log('colocaste la llave mal');
        }else if(response.status === 404){
            console.log('no encortro la pelicula');
        }else if(response.status == 400){
            console.log('ocurrio un error');
        }else{
            console.log('hubo un error no se que paso !');
        }
        

    } catch (error) {
        console.log(Error);
    }
    
    
}

cargarPeliculas();