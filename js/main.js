
document.addEventListener("DOMContentLoaded", () => {

    let main_div = document.querySelector("#main-div")
    let botao_criar_materia = document.querySelector("#btn-criar-materia")
    let botao_criar_tarefa = document.querySelector("#btn-criar-tarefa")
    let botao_editar_materia = document.querySelector("#btn-editar-materia")
    let botao_apagar_materia = document.querySelector("#btn-apagar-materia")
    let botao_editar_tarefa = document.querySelector("#btn-editar-tarefa")
    let botao_remover_tarefas_prontas = document.querySelector("#btn-remover-tarefas-prontas")

    botao_criar_materia.addEventListener("click", () => {
        let input_nome_materia = document.querySelector("#input-nome-materia")
        if (input_nome_materia.value.length > 0) {
            localStorage.setItem(input_nome_materia.value, "[]")
            colocar_card(main_div, criar_card_materia(input_nome_materia.value))
            input_nome_materia.value = ""
            alert("Matéria criada com sucesso !")
        }
        else {
            alert("Digite o nome da matéria !")
        }
    })

    botao_criar_tarefa.addEventListener("click", () => {
        let input_titulo_tarefa = document.querySelector("#input-criar-nome-tarefa")
        let input_info_tarefa = document.querySelector("#info-criar-tarefa")
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
            alert("Tarefa adicionada com sucesso !")
        }
        else {
            alert("Preencha todos os dados !")
        }
    })

    botao_editar_materia.addEventListener("click", () => {
        let input_titulo_materia = document.querySelector("#input-editar-nome-materia")

        if (input_titulo_materia.value.length == 0) {
            let nome_materia_antigo = card_materia_atual.dataset.nome_materia
            let dados_materia = localStorage.getItem(nome_materia_antigo)
            localStorage.removeItem(nome_materia_antigo)
            localStorage.setItem(input_titulo_materia.value, dados_materia)

            card_materia_atual.dataset.nome_materia = input_titulo_materia.value
            card_materia_atual.children[0].children[0].innerText = input_titulo_materia.value

            input_titulo_materia.value = ''
            
        }
    })

    botao_apagar_materia.addEventListener("click", () => {
        let nome_materia = card_tarefa_atual.dataset.nome_materia
        localStorage.removeItem(nome_materia)
        card_tarefa_atual.remove()
        alert(`Matéria "${nome_materia}" removida com sucesso !`)
    })

    botao_editar_tarefa.addEventListener("click", () => {
        let input_titulo_tarefa = document.querySelector("#input-editar-nome-tarefa")
        let input_info_tarefa = document.querySelector("#info-editar-tarefa")
        let nome_materia = card_tarefa_atual.parentNode.dataset.nome_materia
        let lista_tarefas_JSON = JSON.parse(localStorage.getItem(nome_materia))
        let indice_tarefa_atual = coletar_indice_card_tarefa(card_tarefa_atual)

        if (input_titulo_tarefa.value.length > 0) {
            card_tarefa_atual.children[0].innerText = input_titulo_tarefa.value
            card_tarefa_atual.children[1].innerText = input_info_tarefa.value

            lista_tarefas_JSON[indice_tarefa_atual].titulo = input_titulo_tarefa.value
            lista_tarefas_JSON[indice_tarefa_atual].info = input_info_tarefa.value

            localStorage.setItem(nome_materia, JSON.stringify(lista_tarefas_JSON))
            alert("Tarefa editada com sucesso !")
        }
        else {
            alert("Preencha todos os dados !")
        }
    })

    botao_remover_tarefas_prontas.addEventListener("click", () => {
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
    })

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

})

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

