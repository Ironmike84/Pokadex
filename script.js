let pokemonList = [{
    Name: "Bulbasaur",
    Height: 0.7,
    Types: ["Grass", "Poison"]
},
{
    Name: "Ivysaur",
    Height: 1,
    Type: ["Grass", "Poison"]
},
{
    Name: "Venusaur",
    Height: 2,
    Type: ["Grass", "Poison"]
},
{
    Name: "Charmander",
    Height: 0.6,
    Type: ["Fire"]
}
]


function myList(Pokemons){
    for (let i = 0; i < Pokemons.length; i++){
     console.log(`${Pokemons[i].Name}, ${Pokemons[i].Height}`)
     document.write(`Name: ${Pokemons[i].Name}" Height: " ${Pokemons[i].Height}` )
     
}
}


console.log(myList(pokemonList))

Object.keys(pokemonList).forEach(function(property){
console.log(pokemonList[property])
})

