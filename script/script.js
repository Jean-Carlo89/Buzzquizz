






















































let numberOfQuestions;
let numberOfLevels;
let quizzTitle;
let mainImage;

let object=[]
let objectFinal ={}



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



/*----------------------Criação do quizz-------------*/

function createQuizzInfo(){
   document.querySelector('.feed').classList.toggle('hidden')
   document.querySelector('.create.quizz').classList.toggle('hidden')
}

function createQuizzQuestions(){
    quizzTitle = document.querySelector('.quizz-title-create').children[0].value
    console.log(quizzTitle)
    
     mainImage = document.querySelector('.quizz-image-url').children[0].value
     console.log(mainImage)
 
     numberOfQuestions = document.querySelector('.questions-quantity').children[0].value
     console.log(numberOfQuestions) 
 
      numberOfLevels = document.querySelector('.levels-quantity').children[0].value
     console.log(numberOfLevels)
 
    //document.querySelector('.levels-quantity').children[0].value = ""
                            //or
     //varialvel=""
    
    
    printCreateQuestions()
    document.querySelector('.create.quizz').classList.toggle('hidden')
    document.querySelector('.create.questions').classList.toggle('hidden')
}

function createQuizzLevels(){
  
  /*
    const question1 = document.querySelector('.question-text').children[0].value
   console.log(question1)
   
   const question1Color = document.querySelector('.question-color').children[0].value
   console.log(question1Color)

   const question1Answer1 = document.querySelector('.answer-true .answer-t-text').children[0].value
   console.log(question1Answer1)

   const question1Image1 = document.querySelector('.answer-true .answer-t-img').children[0].value
   console.log(question1Image1)

   const question1Answer2 = document.querySelector('.answer-false .answer-f-text').children[0].value
   console.log(question1Answer2)

   const question1Image2 = document.querySelector('.answer-false .answer-f-img').children[0].value
   console.log(question1Image2)
*/
const question = document.querySelectorAll('.pergunta')
console.log(question)

const value = question[0]
console.log(value)
console.log(value.innerText)
   
    for(let i=1;i<=question.length;i++){
   

   if(question[i-1].innerText===`Pergunta ${i}`){
    const question1 = document.querySelector('.question-text').children[0].value
    
    
    const question1Color = document.querySelector('.question-color').children[0].value
    
    const question1Answer1 = document.querySelector('.answer-true .answer-t-text').children[0].value
    
 
    const question1Image1 = document.querySelector('.answer-true .answer-t-img').children[0].value
    
 
    const question1Answer2 = document.querySelector('.answer-false .answer-f-text').children[0].value
    
 
    const question1Image2 = document.querySelector('.answer-false .answer-f-img').children[0].value
    
   
    //console.log(`${question${i}} :question1`)
   //console.log(`${questioniColor}:question1Color`)
   //console.log(`${questioniAnswer1}:question1Answer1`)
   //console.log(`${questioniImage1} :question1Image1`)
  // console.log(`${questioniAnswer2} :question1Answer2`)
   //console.log(`${questioniImage2} :question1Image2`)
   object.push(`{title: ${question1},color: ${question1Color},answers:[{text: ${question1Answer1},image: ${question1Image1},isCorrectAnswer: true},{text: ${question1Answer2},image: ${question1Image2},isCorrectAnswer: false}]}`)
}

   
   }

   //console.log(object[0])
  // console.log(object[1])
   //console.log(object)

   objectFinal={title:quizzTitle,image:mainImage,questions:object}
   console.log(objectFinal)
    //printCreateLevels()
    //document.querySelector('.create.questions').classList.toggle('hidden')
   // document.querySelector('.create.levels').classList.toggle('hidden')
}

function goTofinishQuizzCreation(){
    printFinishQuizzPage()
    document.querySelector('.create.levels').classList.toggle('hidden')
    document.querySelector('.create.complete-quizz').classList.toggle('hidden')
}

/* ----------------------Imprimir as paginas da criação---------------*/

function printCreateQuestions(){
    const listOfQuestions = document.querySelector('.questions-list')
    
   for(let i = 2;i<=numberOfQuestions;i++){
    
    
        listOfQuestions.innerHTML+=
    `
        <li class="question question${i}">
            <span class="pergunta "><h2>Pergunta ${i}</h2>  <ion-icon class="edit-icon" name="create-outline" onclick="addDrop(this)"></ion-icon></span>
            <div class="question-container hidden">
                <div class="question-text-color">
                    <div class="question-text">
                        <input type="text" placeholder="Texto da pergunta">
                    </div>
                    <div class="question-color">
                        <input type="text" placeholder="Cor de fundo da pergunta">
                    </div>
                </div>

                <div class="answer-true">
                    <h2>Resposta correta</h2>
                    <div class="answer-t-text">
                        <input type="text" placeholder="Resposta correta">
                    </div>
                    <div class="answer-t-img">
                        <input type="text" placeholder="Url da imagem">
                    </div>
                </div>

                <ul class="answer-false">
                    <h2>Resposta(s) incorreta(s)</h2>
                    <li>
                        <div class="answer-f-text">
                            <input type="text" placeholder="Resposta incorreta 1">
                        </div>
                        <div class="answer-f-img">
                            <input type="text" placeholder="Url da imagem 1">
                        </div>
                    </li>

                    
                    
                </ul>
            </div>   
        </li>
    `
    }
}

function printCreateLevels(){
    const listOfLevels = document.querySelector('.levels-list')
    
   for(let i = 3;i<=numberOfLevels;i++){
    
    
        listOfLevels.innerHTML+=
    `
    <li class="level">
    <span class="lvl"><h2>Nível ${i}</h2>  <ion-icon class="edit-icon" name="create-outline" onclick="addDropLevel(this)"></ion-icon></span>
        <div class="level-container">
            <div class="level-title">
                <input type="text" placeholder="Texto da pergunta">
            </div>
            
            <div class="level-min-wr level-wr">
                <input type="text" placeholder="% de acerto mínima">
            </div>
            
            <div class="level-url">
                <input type="text" placeholder="URL da imagem do nível">
            </div>
            
            <div class="level-description">
                <input type="text" placeholder="Descrição do nível">
            </div>
        </div>
</li>
    `
    }
}

function printFinishQuizzPage(){
   console.log( document.querySelector('.complete img').src)
   document.querySelector('.complete img').src = mainImage 
   console.log( document.querySelector('.complete img').src)
}

/*------------------Envio Do quizz----------------------*/

function SendQuizz(){

    axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes,
    
    {
        title: "Título do quizz",
        image: "https://http.cat/411.jpg",
        questions: [
            {
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
        ]
    }`)

    
    
    axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes,
    
    {
        title: ${quizzTitle},
        image: ${mainImage},
        questions: [
            {
                title: ${question1},
                color: ${question1Color},
                answers: [
                    {
                        text: ${question1Answer1},
                        image: ${question1Image1},
                        isCorrectAnswer: true
                    },
                    {
                        text: ${question1Answer2},
                        image: ${question1Image2},
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: ${question2},
                color: ${question2Color},
                answers: [
                    {
                        text: ${question2Answer1},
                        image: ${question2Image1},
                        isCorrectAnswer: true
                    {
                        text: ${question1Answer2},
                        image: ${question1Image2},
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: ${level1Title},
                image: ${level1Image},
                text: ${level1Description},
                minValue: 0    
            },
            {
                title: ${level2Title},
                image: ${level2Image},
                text: ${level2Description},
                minValue: ${level2MinValue}
            }
        ]
    }`)




}