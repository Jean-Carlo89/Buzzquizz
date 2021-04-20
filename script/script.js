


























































/*-------------------------------------Javascript layout 8-11------------------------*/
function testToggleHide(clickedButton,classOfButton){
    //alert('clicado')
    const divToToggle = document.querySelector('.'+classOfButton)
    console.log(divToToggle)
    divToToggle.classList.toggle('hidden')
}