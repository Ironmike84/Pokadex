let pokemonRepository = (function (){
    let pokemonList = []
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(item){
        if (item === 'object' && 'name' in item && 'detailsUrl' in item){
            pokemonList.push(item)
        }else{
            console.log("Check input please...")
        }
    }

    function getAll(){
        return pokemonList;
    }

    async function loadList(item){
        try {
            const response = await fetch(apiUrl)
            const json = await response.json()
            json.results.forEach(function (item){
                pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }
                add(pokemon)
            })
        }catch (e){
            console.log(e)
        }
    }

    async function loadDetails (item){
        let url = item.detailsUrl
        try{
            const response = await fetch(url)
            const details = response.json()
            item.name = details.name;
            item.imageUrl = details.imageUrl.sprites["original-artwork"].front_default;
            item.weight = details.weight;
            item.height = details.height;
            item.types = []
            for (let i = 0; i < details.types.length; i++){
                item.types.push(details.types[i].type.name)
            }
            showModal(item)
    }catch(e){
        console.log(e)
    }

}

function showDetails(item){
    loadDetails(item).then(function(){
        showModal(item)
    })
}

function showModal(item){
    let simpleModal = document.querySelector('#simpleModal');
    let closeButton = document.querySelector('.close-button');
    let pokemonName = document.querySelector('.pokemon-name')
    let pokemonHeight = document.querySelector('.pokemon-height')
    let pokemonWeight = document.querySelector('.pokemon-weight')
    let pokemonImage = document.querySelector('pokemon-image')
    let pokemonTypes = document.querySelector('.pokemon-types')
    let CappedName = item.name.charAt(0).toUpperCase() + item.name.slice(1)
    pokemonName.innerText = CappedName
    pokemonImage.innerHTML = `<img src='${item.imageUrl}'></img>`
    pokemonHeight.innerText = `Height: ${item.height}`
    pokemonWeight.innerText = `Weight: ${item.weight}`
    pokemonTypes.innerText = `Types: ${item.types}`
    simpleModal.style.display = 'block'
}

function addListItem(pokemon){
let pokemonList = document.querySelector('.PokemonList')
let listpokemon = document.createElement('li')
let button = document.createElement('button')
button.innerText = pokemon.name;
button.classList.add('button-class');
listpokemon.appendChild(button)
pokemonList.appendChild(listpokemon);
button.addEventListener("click", function(){
    showDetails(pokemon)
    showModal(pokemon)
})
}

return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    loadDetails: loadDetails,
    showDetails: showDetails
}

})()

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon)
    })
})