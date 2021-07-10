
function criar_materia(main_div, input_nome_materia) {
    if (input_nome_materia.value.length > 0) {
        localStorage.setItem(input_nome_materia.value, "[]")
        colocar_card(main_div, criar_card_materia(input_nome_materia.value))
        input_nome_materia.value = ""
        return true
    }
    return false
}

function criar_tarefa(input_titulo_tarefa, input_info_tarefa, card_materia_atual) {
    if (input_titulo_tarefa.value.length > 0) {
        let nome_materia = card_materia_atual.dataset.nome_materia
        let card_body = card_materia_atual.children[0].children[1]
        let lista_tarefas = JSON.parse(localStorage.getItem(nome_materia))

        lista_tarefas.push({
            "titulo" : input_titulo_tarefa.value,
            "info" : input_info_tarefa.value,
            "concluida" : false
        })
        localStorage.setItem(nome_materia, JSON.stringify(lista_tarefas))
        card_body.append(criar_card_tarefa(input_titulo_tarefa.value, input_info_tarefa.value, false))

        input_titulo_tarefa.value = ''
        input_info_tarefa.value = ''
        return true
    }
    return false
}

function editar_materia(input_titulo_materia, card_materia_atual) {
    if (input_titulo_materia.value.length > 0) {
        let nome_materia_antigo = card_materia_atual.dataset.nome_materia
        let dados_materia = localStorage.getItem(nome_materia_antigo)
        localStorage.removeItem(nome_materia_antigo)
        localStorage.setItem(input_titulo_materia.value, dados_materia)

        card_materia_atual.dataset.nome_materia = input_titulo_materia.value
        card_materia_atual.querySelector("h2").innerText = input_titulo_materia.value

        return true
    }
    return false
}

function apagar_materia(card_materia_atual) {
    let nome_materia = card_materia_atual.dataset.nome_materia
    localStorage.removeItem(nome_materia)
    card_materia_atual.remove()
}

function editar_tarefa(input_titulo_tarefa, input_info_tarefa, card_tarefa_atual) {
    let nome_materia = card_tarefa_atual.parentNode.dataset.nome_materia
    let lista_tarefas_JSON = JSON.parse(localStorage.getItem(nome_materia))
    let indice_tarefa_atual = coletar_indice_card_tarefa(card_tarefa_atual)

    if (input_titulo_tarefa.value.length > 0) {
        card_tarefa_atual.children[0].innerText = input_titulo_tarefa.value
        card_tarefa_atual.children[1].innerText = input_info_tarefa.value

        lista_tarefas_JSON[indice_tarefa_atual].titulo = input_titulo_tarefa.value
        lista_tarefas_JSON[indice_tarefa_atual].info = input_info_tarefa.value

        localStorage.setItem(nome_materia, JSON.stringify(lista_tarefas_JSON))
        return true
    }
    return false
}

function remover_tarefas_prontas(main_div) {
    for (let nome_materia in localStorage) {
        if (localStorage.hasOwnProperty(nome_materia)) {
            let card_body_materia
            for (let card_number in main_div.children) {
                if (main_div.children[card_number].dataset.nome_materia === nome_materia) {
                    card_body_materia = main_div.children[card_number].children[0].children[1]
                    break
                }
            }
            
            let lista_tarefas = JSON.parse(localStorage.getItem(nome_materia))
            for (let i = 0; i < lista_tarefas.length; i++) {
                if (lista_tarefas[i].concluida) {
                    lista_tarefas.splice(i, 1)
                    card_body_materia.children[i].remove()
                    i--
                }
            }
            localStorage.setItem(nome_materia, JSON.stringify(lista_tarefas))
        }
    }
}

function criar_cards_iniciais(main_div) {
    // Criar todas matérias e tarefas armazenadas no navegador.
    for (let nome_materia in localStorage) {
        if (localStorage.hasOwnProperty(nome_materia)) {
            let materia_atual = criar_card_materia(nome_materia)
            let lista_tarefas = JSON.parse(localStorage.getItem(materia_atual.dataset.nome_materia))
            let card_body = materia_atual.children[0].children[1]
            
            for (let i = 0; i < lista_tarefas.length; i++) {
                let tarefa = lista_tarefas[i]
                let card_tarefa = criar_card_tarefa(tarefa.titulo, tarefa.info, tarefa.concluida)
                card_body.append(card_tarefa)
            }

            colocar_card(main_div, materia_atual)
        }
    }
}

function colocar_card(main_div, nova_card) {
    // Adiciona a card na div principal respeitando ordem alfabética de nome de matérias.
    for (let i = 0; i < main_div.children.length; i++) {
        let materia_atual = main_div.children[i]
        let nome_materia_atual = materia_atual.dataset.nome_materia
        if (nova_card.dataset.nome_materia < nome_materia_atual) {
            materia_atual.insertAdjacentElement("beforebegin", nova_card)
            return
        }
    }
    main_div.append(nova_card)
}