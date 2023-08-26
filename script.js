let pokemonRepository = (function () {

let pokemonList = [{
    Name: "Bulbasaur",
    Height: 0.7,
    Type: ["Grass", "Poison"]
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

function add(pokemon){
    if(
        typeof pokemon === "object" &&
        "Name" in pokemon &&
        "Height" in pokemon &&
        "Type" in pokemon
    ){
        pokemonList.push(pokemon)
    }else{
        console.log("Pokemon is not Correct")
    }
}
function getAll(){
    return pokemonList;
}
return {
    add: add,
    getAll: getAll,
}
})()

console.log(pokemonRepository.getAll())

pokemonRepository.getAll().forEach(function(item){
    let size;
    if (item.Height > 1 ){
        size = 'Wow, Thats a big Pokemon'
    }else{
        size = 'Dang, Thats a small Pokemon'
    }

item.Type.forEach(function(typeItem){
if (typeItem === "grass"){
    result = '<span style="color: green"></span>'
}else if(typeItem == "Fire"){
    result = '<span style="color: red"></span>'
}else if(typeItem == "Electric"){
    result = '<span style="color: yellow"></span>'
}else if(typeItem == "poison"){
    result = '<span style="color: rgb(106,42,106)"></span>'
}else if(typeItem == "psychic"){
    result = '<span style="color: orange"></span>'
}
})

document.write(
    '<div class="box">' +
    "Name" +
    item.Name +
    "<br>" +
    "Height: " +
    item.Height +
    "m" + 
    "<br>" +
    "Type: "+
    item.Type + 
    "<br>"+
    '</div>');

})

