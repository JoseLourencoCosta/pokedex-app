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
                      <img src="${pokemon.imageURL}" class="card-img-top img-medium-size" title="${pokemon.name}">
                      <div class="card-body">
                          <h5 class="card-title">#${pokemon.number} ${pokemon.name}</h5>
                          <p class="card-text">${pokemon.description}</p>
                          <a onclick='remove(${pokemon.id})' href="#" class="btn btn-outline-danger">DELETE</a>
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

function remove(id) {
  $.ajax({
    type: 'DELETE',
    url: `${apiUrl}/${id}`,
    success(data) {
      find('')
    }
  })
}

function save(form) {
  console.log(JSON.stringify($(form).serializeJSON()))
  $.ajax({
    type: 'POST',
    url: apiUrl,
    data: JSON.stringify($(form).serializeJSON()),
    contentType: 'application/json',
    success(data) {
      $(`#${form.id}Number`).val('')
      $(`#${form.id}Name`).val('')
      $(`#${form.id}Description`).val('')
      //  $(`#${form.id}Types`).val('')
      $(`#${form.id}ImageURL`).val('')
      $(`#${form.id}CloseButton`).click()
      find('')
    },
    error: function (data) {
      if (data.status == 400) {
        $(`#${form.id}FeedBack`).html(data.responseText)
        $(`#${form.id}FeedBack`).fadeIn()
      }
    }
  })
}

//alert('olá pokemão')
