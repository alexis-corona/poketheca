const pokemonList = document.querySelector("#pokemonList");
const headerButtons = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let allPokemon = [];

// Load all Pokemon at startup
async function loadAllPokemon() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";
    const promises = [];
    for (let i = 1; i <= 1025; i++) {
        promises.push(fetch(URL + i).then(res => res.json()));
    }
    allPokemon = await Promise.all(promises);
    showAllPokemon(allPokemon);

    loader.style.display = "none";
}

function showAllPokemon(pokemon) {
    pokemonList.innerHTML = "";
    pokemon.forEach(poke => showPokemon(poke));
}

function showPokemon(poke) {
    let types = poke.types.map(type => `<p class="${type.type.name} type">${type.type.name}</p>`).join('');

    let pokeId = poke.id.toString().padStart(3, '0');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-image">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="name-container">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-name">${poke.name}</h2>
            </div>
            <div class="pokemon-types">
                ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    pokemonList.append(div);
}

// Filter with the array already loaded
headerButtons.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonId = boton.id;
        if (botonId === "see-all") {
            showAllPokemon(allPokemon);
        } else {
            const filtered = allPokemon.filter(poke =>
                poke.types.some(type => type.type.name === botonId)
            );
            showAllPokemon(filtered);
        }
    });
});

// Run initial load
loadAllPokemon();
