
function drag(e) {
    console.log(e.x)
    console.log(e.y)
    clone_card_arrastada.style.left = (e.x - offsetX) + "px"
    clone_card_arrastada.style.top = (e.y - offsetY) + "px"
}

function dragStart() {
    setTimeout(() => (this.className += ' visually-hidden') , 0)
}

function dragEnd() {
    clone_card_arrastada.remove()
}

function dragOver() {

}

function dragEnter() {

}

function dragLeave() {

}

function drop() {

}