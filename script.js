let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(item) {
        if (
        typeof item === "object" && 'name' in item && 'detailsUrl' in item
        ) {
        pokemonList.push(item);
        } else {
        console.log("Please check the inputs");
        }
    }

function getAll(){
        return pokemonList;
}

async function loadList() {
        try {
            const response = await fetch(apiUrl);
            const json = await response.json();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        } catch (e) {
            console.error(e);
        }
}

    async function loadDetails(item) {
        let url = item.detailsUrl;

        try {
            const response = await fetch(url);
            const details = await response.json();
            item.name = details.name;
            item.weight = details.weight;       
            item.imageUrl = details.sprites.other["official-artwork"].front_default;
            item.height = details.height;
            item.types = [];
            for (var i = 0; i < details.types.length; i++) {
                item.types.push(details.types[i].type.name);
            }
            console.log(item.name)
            console.log(item.imageUrl)
            console.log(item.height)
            console.log(item.weight)
            console.log(item.types)
            showModal(item);
        } catch (e) {
            console.error(e);
        }
    }

function showDetails(item) {
    loadDetails(item).then(function () {
        console.log(item);
        showModal(item)
    });
}

function findPokemon(pokemon){
    let searchInput = document.querySelector('#searchQuery')
    let searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click', function(e){
        e.preventDefault()
        if (searchInput.value === pokemon.name){
            showDetails(pokemon)
        }
    })
}

function showModal(item){
    let simpleModal = document.querySelector('#simpleModal');
    let closeButton = document.querySelector('.close-button');
    let pokemonName = document.querySelector('.pokemon-name')
    let pokemonImage = document.querySelector('.pokemon-image')
    let pokemonWeight = document.querySelector('.pokemon-weight')
    let pokemonHeight = document.querySelector('.pokemon-height');
    let pokemonTypes = document.querySelector('.pokemon-types');
    let cappedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
    pokemonName.innerText = cappedName;
    pokemonImage.innerHTML = `<img src='${item.imageUrl}'></img>`
    pokemonWeight.innerText = `Weight: ${item.weight} kg`
    pokemonHeight.innerText = `Height: ${item.height} meters`
    pokemonTypes.innerText = `Types: ${item.types}`
    // Show Modal as Visible
    simpleModal.style.display = 'block'

    // Close the Modal with Button
    closeButton.addEventListener('click',function(){
        closeModal()
    })

    // Press escape key to Exit Modal
    window.addEventListener('keydown', (e)=>{
        e.preventDefault();
        if (e.key === 'Escape' && simpleModal.style.display === 'block'){
            closeModal()
    }

    // Click outside modal to Exit modal.
    simpleModal.addEventListener('click', (e)=>{
        e.preventDefault()
        let target = e.target;
        if (target === simpleModal){
            closeModal()
        }
        })
    })
}

function closeModal(item){
    let simpleModal = document.querySelector('#simpleModal');
    simpleModal.style.display = 'none';
    location.reload();
    }

function addListItem(pokemon){
        let pokemonList = document.querySelector(".PokemonList")
        let listpokemon = document.createElement("li");
        let button = document.createElement("button")
        button.innerText = pokemon.name;
        button.classList.add("button-class")
        listpokemon.appendChild(button)
        pokemonList.appendChild(listpokemon)
        button.addEventListener("click", function (){
            showDetails(pokemon)
            showModal(pokemon)
        
    })
}  
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        findPokemon: findPokemon,
        addListItem: addListItem,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon, item){
    pokemonRepository.addListItem(pokemon);
    pokemonRepository.findPokemon(pokemon)
});
});



