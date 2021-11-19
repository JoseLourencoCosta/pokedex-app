const apiUrl = 'http://localhost:8080/pokemons'
find('')
function find(pokemonName) {
  console.log(pokemonName)
  $.get(`${apiUrl}?name=${pokemonName}`, function (pokemons) {
    console.log(pokemons)
    let html = ''

    if (pokemons.length > 0) {
      html += `<div class="card-deck" style="margin: 10px;">`
      //countToCloseDiv = i+4;

      for (i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i]

        html += `<div class="card">
                      <img class="card-img-top img-medium-size" src="${pokemon.imageUrl}" alt="Card image cap">
                      <div class="card-body">
                          <h5 class="card-title">#${pokemon.number} ${pokemon.name}</h5>
                          <p class="card-text"> ${pokemon.description}</p>
                          <button type="button" class="btn btn-outline-danger">DELETE</button>
                        </div>
                      </div>`
      }
      html += `<div/>`
    } else {
      html += `<div class="alert alert-light" role="alert">
                        No pokemon found!
                    </div>`
    }
    $('#divPokemonList').html(html)
  })
}

//alert('olá pokemão')
