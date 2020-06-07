function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https:/servicodados.ibge.gov.br/api/v1/localidades/estados") //buscou os estados
    .then( res => res.json() ) //função anonima q esta retornando um valor
    .then( states => {
        for( const state of states ) {   //recebeu todos os estados
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //estao  sendo colocados varios options no html
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
 
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"  //limpar o campo da cidade
    citySelect.disabled = true //bloquear
   
    fetch(url) 
    .then( res => res.json() ) 
    .then( cities => {       
        for( const city of cities ) {  
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //estao  sendo colocados varios options no html
        }
        citySelect.disabled = false //desbloquear
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) //ouvidor de eventos
  
//ITENS DE COLETA
//pegar todos os li´s
const itemsToCollect = document.querySelectorAll(".items-grid li")  

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] //com let consigo sobreescrever os valores

function handleSelectedItem(event) {
    const itemLi = event.target
    //adicionar ou remover uma classe cm js
    itemLi.classList.toggle("selected") //toggle - add or remove
    
    const itemId = itemLi.dataset.id //pega os numeros de cada id
 
//    console.log('ITEM ID:', itemId)

    //verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {    //essa função vai receber uma outra função
        const itemFound = item == itemId //isso seráa true ou false
        return itemFound
    })   

    //se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })     
        
        selectedItems= filteredItems 
    } else { //se n estiver selecionado, addicionar a seleção
        selectedItems.push(itemId)
    }   

//    console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems    
}