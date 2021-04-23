

let quizzes = [];
let selected;
let question_counter = 2;
let correct_counter = 0;
let control = 0;

/* TELA 1 */
getQuizzes();

function getQuizzes() {
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes");
    promise.then(quizzesOK);
}
function quizzesOK(response) {
    quizzes = response.data;
    const public_feed = document.querySelector(".all-quizzes");
    public_feed.innerHTML = "";
    

    for (let i=0; i<quizzes.length; i++) {
        public_feed.innerHTML += `
            <li class="quizz-thumb" onclick="feedToQuizz(this)">
                <img src="${quizzes[i].image}">
                <p>${quizzes[i].title}</p>
                <span>${quizzes[i].id}</span>
            </li>
        `
    }
}

function feedToQuizz(element) {
    const from = document.querySelector(".feed");
    from.classList.toggle('hidden');
    const goto = document.querySelector(".quizz-body");
    goto.classList.toggle('hidden');

    goto.scrollIntoView();

    const id = parseInt(element.lastElementChild.innerHTML);
    renderQuizz(id);
}


/* TELA 2 */

function renderQuizz(id) {
    for (let i=0; i<quizzes.length; i++) {
        if (quizzes[i].id === id) {
            selected = quizzes[i];
        }
    }
    
    const img_title = document.querySelector(".img-title");
    img_title.innerHTML = `
        <img src="${selected.image}">
        <h2>${selected.title}</h2>
    `;

    const quizz_feed = document.querySelector(".quizz-feed");
    quizz_feed.innerHTML = '';
    for (let i=0; i<selected.questions.length; i++) {
        quizz_feed.innerHTML += `
                <div class="quizz-title" style="background-color:${selected.questions[i].color}">
                    ${selected.questions[i].title}
                </div>
                <div class="answer-block">
                </div>
        `;

        const random_answers = selected.questions[i].answers;
        random_answers.sort(comparador);
        function comparador() { 
            return Math.random() - 0.5; 
        }

        for (let j=0; j<random_answers.length; j++) {
            const answer_block = document.querySelector(".answer-block:last-of-type");
            let value;

            if (random_answers[j].isCorrectAnswer) {
                value = 1;
            } else {
                value = 0;
            }

            answer_block.innerHTML += `
                <div class="quizz-answer" onclick="selectAnswer(this)">
                    <img src="${random_answers[j].image}">
                    <p>${random_answers[j].text}</p>
                    <span>${value}</span>
                </div>
            `;
        }
    }
}

function selectAnswer(element) {
    const array = element.parentNode.children;
    const correct_answer = parseInt(element.lastElementChild.innerHTML);

    for (let i=0; i<array.length; i++) {
        if (array[i].innerHTML !== element.innerHTML) {
            array[i].classList.add('transparent');
        }
        array[i].removeAttribute("onclick");

        const correct = parseInt(array[i].lastElementChild.innerHTML);
        if (correct) {
            array[i].classList.add('green');
        } else {
            array[i].classList.add('red');
        }
    }

    if (correct_answer) {
        correct_counter++;
    }

    control++;

    if(control < selected.questions.length) {
        setTimeout(nextQuestion, 2000);
    } else {
        setTimeout(endQuizz, 2000);
    }
}

function nextQuestion() {
    const next_question = document.querySelector(".quizz-feed").children;
    next_question[question_counter].scrollIntoView();

    question_counter += 2;
}

function endQuizz() {
    const percentage = (Math.floor(correct_counter/control*100));
    let selected_level = 0;

    for (let i=0; i<selected.levels.length; i++) {
        if (percentage > selected.levels[i].minValue) {
            selected_level = i;
        }
    }

    const quizz_feed = document.querySelector(".quizz-feed");

    quizz_feed.innerHTML += `
        <div class="quizz-end">
            <div class="quizz-title">
                ${percentage}% de acerto: ${selected.levels[selected_level].title}
            </div>
            <div class="quizz-message">
                <img src="${selected.levels[selected_level].image}">
                <span>${selected.levels[selected_level].text}</span>
            </div>
    
            <button onclick="restartQuizz()" class="restart">Reiniciar o Quizz</button>
            <button onclick="quizzToHome()" class="home">Voltar para home</button>
        </div>
    `;

    const end_screen = document.querySelector(".quizz-end");
    end_screen.scrollIntoView();
}

function restartQuizz() {
    question_counter = 2;
    correct_counter = 0;
    control = 0;

    const goto = document.querySelector(".quizz-body");
    goto.scrollIntoView();
    renderQuizz();
}

function quizzToHome() {
    const from = document.querySelector(".quizz-body");
    from.classList.toggle('hidden');
    const goto = document.querySelector(".feed");
    goto.classList.toggle('hidden');

    goto.scrollIntoView();
}







































let numberOfQuestions;
let numberOfLevels;
let quizzTitle;
let mainImage;
let objectQuestions=[]
let objectLevels=[]
let objectFinal;
let obj;
let id;



/*-------------------------------------Javascript layout 8-11------------------------*/
function testToggleHide(clickedButton,classOfButton){
    const divToToggle = document.querySelector('.'+classOfButton)
    divToToggle.classList.toggle('hidden')
}

function addDrop(clickedIcon){
    const addHiddenToOthers = document.querySelectorAll('.question-container')
    for(let i =0; i<addHiddenToOthers.length;i++){
        addHiddenToOthers[i].classList.add('hidden')
    }
   
    clickedIcon.parentNode.nextElementSibling.classList.remove('hidden')
    clickedIcon.parentNode.nextElementSibling.classList.add('drop')
}

function addDropLevel(clickedIcon){
    const addHiddenToOthers = document.querySelectorAll('.level-container')
    for(let i =0; i<addHiddenToOthers.length;i++){
        addHiddenToOthers[i].classList.add('hidden')
    }
    
    clickedIcon.parentNode.nextElementSibling.classList.remove('hidden')
    clickedIcon.parentNode.nextElementSibling.classList.add('drop')
    clickedIcon.parentNode.nextElementSibling.scrollIntoView()
}

 function isValidColor(str){
 regexp = /^#[0-9a-fA-F]+$/;
  
        if (regexp.test(str)){
            return true;
          }
        else{
            return false;
          }
}

function isValidUrl(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

/*function isValidUrl(myURL) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    
    console.log(pattern.test(myURL))
    return pattern.test(myURL);
 }*/

/*----------------------Criação do quizz-------------*/

function createQuizzInfo(){
   document.querySelector('.feed').classList.toggle('hidden')
   document.querySelector('.create.quizz').classList.toggle('hidden')
}


function createQuizzQuestions(){
    let erro = false
    quizzTitle = document.querySelector('.quizz-title-create').children[0].value
    mainImage = document.querySelector('.quizz-image-url').children[0].value
     numberOfQuestions = document.querySelector('.questions-quantity').children[0].value
     numberOfLevels = document.querySelector('.levels-quantity').children[0].value

    /* if(quizzTitle.length<20 || quizzTitle.length>65){
        alert('titulo muito pequeno ou muito grande')
        erro =true
    }

    if(numberOfQuestions<3){
        alert('O número mínimo de perguntas é: 3')
        erro=true
    }

    if(numberOfLevels<2){
        alert('O número mínimo de níveis é: 2')
    }

    if(isValidUrl(mainImage)===false){
                alert('Insira um URL válido')
                return
            }*/


    if(erro){
        document.querySelector('.quizz-title-create').children[0].value=""
        document.querySelector('.quizz-image-url').children[0].value=""
        document.querySelector('.questions-quantity').children[0].value=""
        document.querySelector('.levels-quantity').children[0].value=""
        quizzTitle=""
        mainImage=" "
        numberOfQuestions=" "
        numberOfLevels =" "
        return
    }
    printCreateQuestions()
    document.querySelector('.create.quizz').classList.toggle('hidden')
    document.querySelector('.create.questions').classList.toggle('hidden')
}

function createQuizzLevels(){
  
const question = document.querySelectorAll('.pergunta')

    for(let i=1;i<=question.length;i++){

        let question1 = document.querySelector(`.question-text.q${i}`).children[0].value
        let question1Color = document.querySelector(`.question-color.q${i}`).children[0].value
        let question1Answer1 = document.querySelector(`.answer-true .answer-t-text.q${i}`).children[0].value
        let question1Image1 = document.querySelector(`.answer-true .answer-t-img.q${i}`).children[0].value
        let question1Answer2 = document.querySelector(`.answer-false .answer-f-text.q${i}`).children[0].value
        let question1Image2 = document.querySelector(`.answer-false .answer-f-img.q${i}`).children[0].value
        
        let question1Answer3 = document.querySelector(`.answer-false .answer-f-text.q${i}.f2`).children[0].value
        let question1Image3 = document.querySelector(`.answer-false .answer-f-img.q${i}.f2`).children[0].value
        let question1Answer4 = document.querySelector(`.answer-false .answer-f-text.q${i}.f3`).children[0].value
        let question1Image4 = document.querySelector(`.answer-false .answer-f-img.q${i}.f3`).children[0].value
        
        /*if(question1.length<20){
                alert('A pergunta tem que ter no mínimo 20 caracteres')
                document.querySelector(`.question-text.q${i}`).children[0].value=""
                return
            }

        if(isValidColor(question1Color)===false){
            alert('A cor deve ser um número hexadecimal válido')
            document.querySelector(`.question-color.q${i}`).children[0].value=""
            return
            }


            if(question1Answer1==="" || question1Answer2===""){
                alert('As respostas não podem estar vazias')
                document.querySelector(`.answer-true .answer-t-text.q${i}`).children[0].value=""
                return
            }

            
         if(isValidUrl(question1Image1)===false){
                alert('Insira um URL válido')
                document.querySelector(`.answer-true .answer-t-img.q${i}`).children[0].value=""
                return
            }

            
            if(isValidUrl(question1Image2)===false){
                alert('Insira um URL válido')
                document.querySelector(`.answer-false .answer-f-img.q${i}`).children[0].value=""
                return
            }    */

            
        
            
        obj= {title:question1, color:question1Color, answers:[{text:question1Answer1,image:question1Image1,isCorrectAnswer:true},{text:question1Answer2,image:question1Image2,isCorrectAnswer:false},{text:question1Answer3,image:question1Image3,isCorrectAnswer:false},{text:question1Answer4,image:question1Image4,isCorrectAnswer:false}]}
            
            objectQuestions.push(obj)
    }    
    
printCreateLevels()
 document.querySelector('.create.questions').classList.toggle('hidden')
  document.querySelector('.create.levels').classList.toggle('hidden')
}

function goTofinishQuizzCreation(){
    
    const level = document.querySelectorAll('.lvl')
    
        for(let i=1;i<=level.length;i++){
    
        const level1Title = document.querySelector(`.level-title.q${i}`).children[0].value
        const level1Image = document.querySelector(`.level-url.q${i}`).children[0].value
         const level1Description = document.querySelector(`.level-description.q${i}`).children[0].value
       const levelMinValue = document.querySelector(`.level-wr.q${i}`).children[0].value
      
       
       
       parseInt(levelMinValue)
        
       if(i===1 && levelMinValue!=0){
           alert('O primeiro nível deve ter percentual mínimo de zero')
           document.querySelector(`.level-wr.q${i}`).children[0].value=""
           return
           
       }
       obj={title:level1Title,image:level1Image,text:level1Description,minValue:levelMinValue}
    
        objectLevels.push(obj)
       

      /* if(level1Title.length<10){
           alert('O título dever ter no mínimo 10 caracteres')
           document.querySelector(`.level-title.q${i}`).children[0].value=""
           return
       }

       if(levelMinValue<0 || levelMinValue>100){
           alert('A porcentagen aceita é somente entre 0 e 100%')
            document.querySelector(`.level-wr.q${i}`).children[0].value=""
            return
        }
        
        if(level1Description.length<30){
            alert('A descrição tem que ter no mínimo 30 caracteres')
            document.querySelector(`.level-description.q${i}`).children[0].value=""
            return
        }

        if(isValidUrl(level1Image)===false){
            alert('Insira um URL válido')
            document.querySelector(`.level-url.q${i}`).children[0].value=""
            return
        }   */
       

    }  
   
    objectFinal={title:quizzTitle,
                image:mainImage,
                questions:objectQuestions,
                levels:objectLevels}
   
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
                    <div class="question-text q${i}">
                        <input type="text" placeholder="Texto da pergunta">
                    </div>
                    <div class="question-color q${i}">
                        <input type="text" placeholder="Cor de fundo da pergunta">
                    </div>
                </div>

                <div class="answer-true">
                    <h2>Resposta correta</h2>
                    <div class="answer-t-text q${i}">
                        <input type="text" placeholder="Resposta correta">
                    </div>
                    <div class="answer-t-img q${i}">
                        <input type="text" placeholder="Url da imagem">
                    </div>
                </div>

                <ul class="answer-false">
                    <h2>Resposta(s) incorreta(s)</h2>
                    <li>
                        <div class="answer-f-text q${i} f1">
                            <input type="text" placeholder="Resposta incorreta 1">
                        </div>
                        <div class="answer-f-img q${i} f1">
                            <input type="text" placeholder="Url da imagem 1">
                        </div>
                    </li>

                    <li>
                        <div class="answer-f-text q${i} f2">
                            <input type="text" placeholder="Resposta incorreta 2">
                        </div>
                        <div class="answer-f-img q${i} f2">
                            <input type="text" placeholder="Url da imagem 2">
                        </div>
                    </li>

                    <li>
                        <div class="answer-f-text q${i} f3">
                            <input type="text" placeholder="Resposta incorreta 3">
                        </div>
                        <div class="answer-f-img q${i} f3">
                            <input type="text" placeholder="Url da imagem 3">
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
        <div class="level-container hidden">
            <div class="level-title q${i}">
                <input type="text" placeholder="Texto da pergunta">
            </div>
            
            <div class="level-min-wr level-wr q${i}">
                <input type="text" placeholder="% de acerto mínima">
            </div>
            
            <div class="level-url q${i}">
                <input type="text" placeholder="URL da imagem do nível">
            </div>
            
            <div class="level-description q${i}">
                <input type="text" placeholder="Descrição do nível">
            </div>
        </div>
</li>
    `
    }
}

function printFinishQuizzPage(){
  /* const putTitle = document.querySelector('.complete span')
   putTitle.innerHTML=`${quizzTitle}`
    document.querySelector('.complete img').src = mainImage */
    sendQuizz()

}

/*------------------Envio Do quizz----------------------*/

function sendQuizz(){
   let myQuizz = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes',{title:quizzTitle,
   image:mainImage,
   questions:objectQuestions,
   levels:objectLevels})

   console.log(objectFinal)
   myQuizz.then(serverResponse)

    myQuizz.catch(serverError)
}






function serverResponse(resp){
    console.log('foi certo')
    console.log(resp.data)
    id=resp.data.id
    console.log(id)
    testGetMyQuizz()
    }


function serverError(erro){
   console.log('deu ruim')
    console.log(erro.response)
}



function testGetMyQuizz(){

    const myQuizz = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${id}`)
    console.log(myQuizz)
    myQuizz.then(printMyQuizz)
   //392

}

function printMyQuizz(objectQuizz){
    const myQuizzes = document.querySelector('.create.complete-quizz')
console.log(objectQuizz)
    myQuizzes.innerHTML = 

      `<h1>Seu Quizz está pronto!</h1>
            
           

    <div class='complete'>
        <img src="${objectQuizz.data.image}">
        <span>${objectQuizz.data.title}</span>
        <span class="${objectQuizz.data.id}"></span>
    </div>

            <button onclick="sendQuizz()">Acessar Quizz</button>

    <span class="toHome" onclick="toHome()">Voltar pra home</span>
        `
}



/*
<li class="quizz-thumb" onclick="feedToQuizz(this)">
<img src="${objectQuizz.data.image}">
<p>${objectQuizz.data.title}</p>
<span>${objectQuizz.data.id}</span>
</li>*/




/*---------------Botoes da ultima pagina---------*/
function toHome(){
    document.querySelector('.create.complete-quizz').classList.add('hidden')
    document.querySelector('.feed').classList.remove('hidden')
    document.querySelector('.create.questions').classList.add('hidden')
    document.querySelector('.create.levels').classList.add('hidden')
    document.querySelector('.create.quizz').classList.add('hidden')
    resetValues()
}

function resetValues(){
    document.querySelector('.quizz-title-create').children[0].value=""
    document.querySelector('.quizz-image-url').children[0].value=""
    document.querySelector('.questions-quantity').children[0].value=""
    document.querySelector('.levels-quantity').children[0].value=""
   
    const questionsReset=  document.querySelector('.questions-list')
        questionsReset.innerHTML = ` <li class="question ">
        <span class="pergunta"><h2>Pergunta 1</h2>  <ion-icon class="edit-icon" name="create-outline" onclick="addDrop(this)"></ion-icon></span>
        <div class="question-container">
            <div class="question-text-color question1">
                <div class="question-text q1">
                    <input type="text" placeholder="Texto da pergunta">
                </div>
                <div class="question-color q1">
                    <input type="text" placeholder="Cor de fundo da pergunta">
                </div>
            </div>

            <div class="answer-true question1">
                <h2>Resposta correta</h2>
                <div class="answer-t-text q1">
                    <input type="text" placeholder="Resposta correta">
                </div>
                <div class="answer-t-img q1">
                    <input type="text" placeholder="Url da imagem">
                </div>
            </div>

            <ul class="answer-false">
                <h2>Resposta(s) incorreta(s)</h2>
                <li>
                    <div class="answer-f-text q1 f1">
                        <input type="text" placeholder="Resposta incorreta 1">
                    </div>
                    <div class="answer-f-img q1 f1">
                        <input type="text" placeholder="Url da imagem 1">
                    </div>
                </li>

                <li>
                    <div class="answer-f-text q1 f2">
                        <input type="text" placeholder="Resposta incorreta 2">
                    </div>
                    <div class="answer-f-img q1 f2">
                        <input type="text" placeholder="Url da imagem 2">
                    </div>
                </li>

                <li>
                    <div class="answer-f-text q1 f3">
                        <input type="text" placeholder="Resposta incorreta 3">
                    </div>
                    <div class="answer-f-img q1 f3">
                        <input type="text" placeholder="Url da imagem 3">
                    </div>
                </li>
            </ul>
        </div>   
</li>`

const levelsReset= document.querySelector('.levels-list')
levelsReset.innerHTML=`<li class="level">
<span class="lvl"><h2>Nível 1</h2>  <ion-icon class="edit-icon" name="create-outline" onclick="addDropLevel(this)"></ion-icon></span>
    <div class="level-container">
        <div class="level-title q1">
            <input type="text" placeholder="Texto da pergunta">
        </div>
        
        <div class="level-min-wr level-wr q1">
            <input type="text" placeholder="Digite 0 para a porcentagem de acerto do nível 1">
        </div>
        
        <div class="level-url q1">
            <input type="text" placeholder="URL da imagem do nível">
        </div>
        
        <div class="level-description q1">
            <input type="text" placeholder="Descrição do nível">
        </div>
    </div>
</li>

<li class="level">
<span class="lvl"><h2>Nível 2</h2>  <ion-icon class="edit-icon" name="create-outline" onclick="addDropLevel(this)"></ion-icon></span>
    <div class="level-container hidden">
        <div class="level-title q2">
            <input type="text" placeholder="Texto da pergunta">
        </div>
        
        <div class="level-min-wr level-wr q2">
            <input type="text" placeholder="% de acerto mínima">
        </div>
        
        <div class="level-url q2">
            <input type="text" placeholder="URL da imagem do nível">
        </div>
        
        <div class="level-description q2">
            <input type="text" placeholder="Descrição do nível">
        </div>
    </div>
</li>`

}




