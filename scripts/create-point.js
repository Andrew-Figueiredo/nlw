
const populateUFs = () => {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json() )
        .then(states => {

            for( const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option> `
            }

        } )
}

populateUFs()

const getCities = (event) => {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    stateInput.value = event.target.options[event.target.selectedIndex].text

    const url = ` https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos `

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json() )
        .then(cities => {

            for( const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option> `
            }

            citySelect.disabled = false

        } )
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities )


// Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){

    const itemLi = event.target

    //adicionar ou remover uma class com JS
    itemLi.classList.toggle("selected")
    

    const itemId = event.target.dataset.id

    
    //verificar se existem itens selecioandos, se sim
    // pegar os itens selecionados.
    
    //findIndex = procure até ser true
    const alreadySelected = selectedItems.findIndex( (item) => item == itemId )


    // Se já estiver selecionado
    if (alreadySelected >= 0) {
        //Tirar da seleção
        const filteredItems = selectedItems.filter(item => item != itemId)

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado
        // Add a seleção
        selectedItems.push(itemId)

    }
    
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems




} 