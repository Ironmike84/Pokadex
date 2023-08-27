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
              item.imageUrl = details.sprites.other["official-artwork"].front_default;
              item.height = details.height;
              item.types = [];
              for (var i = 0; i < details.types.length; i++) {
                  item.types.push(details.types[i].type.name);
              }
          } catch (e) {
              console.error(e);
          }
      }

      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
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
        })
      }
      

  
    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      addListItem: addListItem,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });


