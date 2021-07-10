
document.addEventListener("DOMContentLoaded", () => {

    let main_div = document.querySelector("#main-div")
    let botao_criar_materia = document.querySelector("#btn-criar-materia")
    let botao_criar_tarefa = document.querySelector("#btn-criar-tarefa")
    let botao_editar_materia = document.querySelector("#btn-editar-materia")
    let botao_apagar_materia = document.querySelector("#btn-apagar-materia")
    let botao_editar_tarefa = document.querySelector("#btn-editar-tarefa")
    let botao_remover_tarefas_prontas = document.querySelector("#btn-remover-tarefas-prontas")

    botao_criar_materia.addEventListener("click", () => {
        if (criar_materia(main_div, document.querySelector("#input-nome-materia")))
            alert("Matéria criada com sucesso !")
        else 
            alert("Digite o nome da matéria !")
    })

    botao_criar_tarefa.addEventListener("click", () => {
        if (criar_tarefa(document.querySelector("#input-criar-nome-tarefa"), document.querySelector("#info-criar-tarefa"), card_materia_atual)) 
            alert("Tarefa criada com sucesso !")
        else 
            alert("Preencha todos os dados !")
    })

    botao_editar_materia.addEventListener("click", () => {
        if (editar_materia(document.querySelector("#input-editar-nome-materia"), card_materia_atual)) 
            alert("Matéria alterada com sucesso !")
        else 
            alert("Você precisa dar um titulo para a sua matéria !")
    })

    botao_apagar_materia.addEventListener("click", () => {
        let nome_materia = card_materia_atual.dataset.nome_materia
        apagar_materia(card_materia_atual)
        alert(`Matéria "${nome_materia}" removida com sucesso !`)
    })

    botao_editar_tarefa.addEventListener("click", () => {
        if (editar_tarefa(document.querySelector("#input-editar-nome-tarefa"), document.querySelector("#info-editar-tarefa"), card_tarefa_atual)) 
            alert("Tarefa editada com sucesso !")
        else 
            alert("Preencha todos os dados !")
    })

    botao_remover_tarefas_prontas.addEventListener("click", () => remover_tarefas_prontas(main_div))

    // Criar todas matérias e tarefas armazenadas no navegador.
    criar_cards_iniciais(main_div)

})
