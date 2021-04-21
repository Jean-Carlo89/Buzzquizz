


























































/*-------------------------------------Javascript layout 8-11------------------------*/
function testToggleHide(clickedButton,classOfButton){
    //alert('clicado')
    const divToToggle = document.querySelector('.'+classOfButton)
   // console.log(divToToggle)
    divToToggle.classList.toggle('hidden')
}


function addDrop(clickedIcon){
    const addHiddenToOthers = document.querySelectorAll('.question-container')
    for(let i =0; i<addHiddenToOthers.length;i++){
        addHiddenToOthers[i].classList.add('hidden')
    }
   // console.log(clickedIcon)
   // console.log(clickedIcon.parentNode.nextElementSibling)
    
    clickedIcon.parentNode.nextElementSibling.classList.remove('hidden')
    clickedIcon.parentNode.nextElementSibling.classList.add('drop')
    //clickedIcon.parentNode.nextElementSibling.scrollIntoView()
}

function addDropLevel(clickedIcon){
    const addHiddenToOthers = document.querySelectorAll('.level-container')
    for(let i =0; i<addHiddenToOthers.length;i++){
        addHiddenToOthers[i].classList.add('hidden')
    }
    // console.log(clickedIcon)
    //console.log(clickedIcon.parentNode)
    //console.log(clickedIcon.parentNode)
    //console.log(clickedIcon.parentNode.nextElementSibling)
    //clickedIcon.parentNode.nextElementSibling.classList.remove('hidden')
    clickedIcon.parentNode.nextElementSibling.classList.remove('hidden')
    clickedIcon.parentNode.nextElementSibling.classList.add('drop')
    clickedIcon.parentNode.nextElementSibling.scrollIntoView()
}

