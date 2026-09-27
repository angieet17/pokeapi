console.log("JavaScript conectado");

document.getElementById('agregarBtn').addEventListener('click', agregarPokemon);

function agregarPokemon() {
    let nombre = document.getElementById('pokemonInput').value;
    
    // fetch() hace una petición a la API.
    //
    // ${nombre} permite colocar dentro de la URL
    // el nombre que escribió el usuario.
    //
    // .toLowerCase() convierte el nombre a minúsculas.
    // Por ejemplo:
    //
    // PIKACHU → pikachu
    //
    // La URL quedaría:
    // https://pokeapi.co/api/v2/pokemon/pikachu
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)

        // .then() se ejecuta cuando recibimos
        // una respuesta de la API.
        //
        // "res" significa response (respuesta).
        .then(function(res){
            if (!res.ok) {
                throw new Error("Pokémon no encontrado");
            }

            // La respuesta viene en formato JSON.
            // res.json() convierte esa respuesta
            // en un objeto que JavaScript puede utilizar.
            return res.json();
        })
        .then(function(pokemon){
            document.getElementById('pokemonInput').value = "";

            let nombre = pokemon.name;
            let tipo = pokemon.types[0].type.name;
            let altura = pokemon.height;
            let peso = pokemon.weight;

            let tarjeta = document.createElement("div");
            //clase para la tarjeta
            tarjeta.classList.add("tarjeta");
            // Le damos otra clase dependiendo del tipo
            tarjeta.classList.add(tipo);

            tarjeta.innerHTML = `
                <img src="${pokemon.sprites.front_default}">
                <h2>${nombre}</h2>
                <p>Tipo: ${tipo}</p>
                <p>Altura: ${altura}</p>
                <p>Peso: ${peso}</p>
                <button class="botonEliminar">Eliminar</button>
            `;
            let botonEliminar = tarjeta.querySelector(".botonEliminar");
            
            botonEliminar.addEventListener("click", function(){
                tarjeta.remove();
            })
            document.getElementById("resultado").appendChild(tarjeta);
        })

        .catch(function(error) {

            alert("Pokemon no encontado");

        });
}