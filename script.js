const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim().toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${query}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Pokémon not found");

        const data = await response.json();

        // Update the elements with Pokémon data
        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        types.innerHTML = ""; // Clear previous types
        data.types.forEach(typeInfo => {
            const typeElement = document.createElement("p");
            typeElement.textContent = typeInfo.type.name.toUpperCase();
            types.appendChild(typeElement);
        });
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        // Add sprite image
        let sprite = document.getElementById("sprite");
        if (!sprite) {
            sprite = document.createElement("img");
            sprite.id = "sprite";
            document.querySelector(".pokemon-container").appendChild(sprite);
        }
        sprite.src = data.sprites.front_default;
        sprite.style.display = "block";

    } catch (error) {
        alert("Pokémon not found");
    }
});
