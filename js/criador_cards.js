
var card_materia_atual
var card_tarefa_atual

var clone_card_arrastada
var offsetX
var offsetY

function criar_card_materia(titulo_materia) {
    let card = criar_estrutura_card()
    let card_header = card.children[0]
    let card_body = card.children[1]
    let card_footer = card.children[2]

    let card_box = document.createElement("div")
    card_box.dataset.nome_materia = titulo_materia

    card_header.draggable = true
    card_header.addEventListener("dragstart", (e) => {
        offsetX = e.layerX
        offsetY = e.layerY

        clone_card_arrastada = card_box.cloneNode(true)
        clone_card_arrastada.style.position = 'fixed'
        clone_card_arrastada.style.width = card_box.offsetWidth + 'px'
        clone_card_arrastada.heigth = card_box.offsetHeight + 'px'
        clone_card_arrastada.style.zindex = '99999'
        document.body.append(clone_card_arrastada)

        
    })
    card_header.addEventListener("drag", drag)
    card_header.addEventListener("dragend", dragEnd)

    card_body.dataset.nome_materia = titulo_materia

    let title = document.createElement("h2")
    title.className = "text-white"
    title.innerText = titulo_materia

    card_header.className += ' bg-dark'
    card_header.appendChild(title)

    let botao_tarefa = criar_botao_card_materia("Criar nova tarefa", "btn-success")
    botao_tarefa.dataset.bsToggle = "modal"
    botao_tarefa.dataset.bsTarget = "#modal-criar-tarefa"
    botao_tarefa.addEventListener("click", () => {
        card_materia_atual = card_box
    })

    let botao_apagar = criar_botao_card_materia("Apagar metéria", "btn-danger")
    botao_apagar.dataset.bsToggle = "modal"
    botao_apagar.dataset.bsTarget = "#modal-apagar-materia"
    botao_apagar.addEventListener("click", () => {
        card_tarefa_atual = card_box
    })

    card_footer.className += ' bg-dark'
    card_footer.append(botao_tarefa, botao_apagar)

    card_box.append(card)
    return card_box
}


function criar_card_tarefa(titulo_tarefa, info_tarefa, concluida) {
    let card = criar_estrutura_card()
    let card_header = card.children[0]
    let card_body = card.children[1]
    let card_footer = card.children[2]

    card.dataset.concluida = concluida

    card_header.className += ' h5 pt-1'
    card_header.innerText = titulo_tarefa

    card_body.innerText = info_tarefa

    let botao_concluida = criar_botao_card_tarefa("Marcar como concluida", "btn-success")
    botao_concluida.addEventListener("click", () => {
        let nome_materia = card.parentNode.dataset.nome_materia
        let lista_tarefas_JSON = JSON.parse(localStorage.getItem(nome_materia))
        let indice_tarefa_atual = coletar_indice_card_tarefa(card)

        if (card.dataset.concluida == 'false') {
            card.dataset.concluida = true
            lista_tarefas_JSON[indice_tarefa_atual].concluida = true
            card_header.className += ' bg-success text-white'
            botao_concluida.innerText = "Desmarcar como concluida"
        }
        else {
            card.dataset.concluida = false
            lista_tarefas_JSON[indice_tarefa_atual].concluida = false
            card_header.className = card_header.className.replace(" bg-success text-white", "")
            botao_concluida.innerText = "Marcar como concluida"
        }
        localStorage.setItem(nome_materia, JSON.stringify(lista_tarefas_JSON))
    })
    if (concluida) {
        card_header.className += ' bg-success text-white'
        botao_concluida.innerText = "Desmarcar como concluida"
    }

    let botao_editar = criar_botao_card_tarefa("Editar tarefa", "btn-primary")
    botao_editar.dataset.bsToggle = "modal"
    botao_editar.dataset.bsTarget = "#modal-editar-tarefa"
    botao_editar.addEventListener("click", () => {
        card_tarefa_atual = card
        document.querySelector("#input-editar-nome-tarefa").value = titulo_tarefa
        document.querySelector("#info-editar-tarefa").value = info_tarefa
    })

    let botao_apagar = criar_botao_card_tarefa("Apagar tarefa", "btn-danger")
    botao_apagar.addEventListener("click", () => {
        let nome_materia = card.parentNode.dataset.nome_materia
        let lista_tarefas_JSON = JSON.parse(localStorage.getItem(nome_materia))
        let indice_tarefa_atual = coletar_indice_card_tarefa(card)

        lista_tarefas_JSON.splice(indice_tarefa_atual, 1)
        localStorage.setItem(nome_materia, JSON.stringify(lista_tarefas_JSON))

        card.remove() 
    })

    card_footer.append(botao_concluida, botao_editar, botao_apagar)

    card.className += ' mb-3'
    return card
}


function criar_estrutura_card() {
    let card = document.createElement("div")
    card.className = "card"

    let card_header = document.createElement("div")
    card_header.className = "card-header"
    let card_body = document.createElement("div")
    card_body.className = "card-body"
    let card_footer = document.createElement("div")
    card_footer.className = "card-footer"
    
    card.append(card_header, card_body, card_footer)
    return card
}

function criar_botao_card_tarefa(texto_botao, classe_cor) {
    let botao = document.createElement("button")
    botao.className = `btn ${classe_cor} mb-2 me-2`
    botao.innerText = texto_botao
    return botao
}

function criar_botao_card_materia(texto_botao, classe_cor) {
    let botao = document.createElement("button")
    botao.className = `btn ${classe_cor} mb-2 me-3`
    botao.innerText = texto_botao
    return botao
}

function coletar_indice_card_tarefa(card_tarefa) {
    let lista_elementos_tarefa = card_tarefa.parentNode.children

    for (let i = 0; i < lista_elementos_tarefa.length; i++) 
        if (lista_elementos_tarefa[i].isSameNode(card_tarefa)) 
            return i
}