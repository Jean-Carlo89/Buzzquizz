

let quizzes = [];
let selected;

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
                <div class="quizz-title">
                    ${selected.questions[i].title}
                </div>
        `;
        console.log(selected.questions[i].color);

        const random_answers = selected.questions[i].answers;
        random_answers.sort(comparador);
        function comparador() { 
            return Math.random() - 0.5; 
        }

        for (let j=0; j<4; j++) {
            quizz_feed.innerHTML += `
                <div class="quizz-answer">
                    <img src="${random_answers[j].image}">
                    <p>${random_answers[j].text}</p>
                </div>
            `;
        }
    }

    quizz_feed.innerHTML += `
        <div class="quizz-end">
            <div class="quizz-title">
                porcentagem de acerto: ${selected.levels[0].title}
            </div>
            <div class="quizz-message">
                <img src="${selected.levels[0].image}">
                <span>${selected.levels[0].text}</span>
            </div>
    
            <button class="restart">Reiniciar o Quizz</button>
            <button class="home">Voltar para home</button>
        </div>
    `
}











































let numberOfQuestions;
let numberOfLevels;
let quizzTitle;
let mainImage;
let objectQuestions=[]
let objectLevels=[]
let objectFinal;
let obj;



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

function isValidUrl(myURL) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    
    console.log(pattern.test(myURL))
    return pattern.test(myURL);
 }

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

     if(quizzTitle.length<20 || quizzTitle.length>65){
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
        const question1Color = document.querySelector(`.question-color.q${i}`).children[0].value
        const question1Answer1 = document.querySelector(`.answer-true .answer-t-text.q${i}`).children[0].value
        const question1Image1 = document.querySelector(`.answer-true .answer-t-img.q${i}`).children[0].value
        const question1Answer2 = document.querySelector(`.answer-false .answer-f-text.q${i}`).children[0].value
        const question1Image2 = document.querySelector(`.answer-false .answer-f-img.q${i}`).children[0].value
    
        if(question1.length<20){
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

            
        /* if(isValidUrl(question1Image1)===false || isValidUrl(question1Image2)===false){
                alert('Insira um URL válido')
                return
            }*/

            
        
            
        obj= {title:question1, color:question1Color, answers:[{text:question1Answer1,image:question1Image1,isCorrectAnswer:true},{text:question1Answer2,image:question1Image2,isCorrectAnswer:false}]}
            
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
        
       obj={title:level1Title,image:level1Image,text:level1Description,minValue:levelMinValue}
    
        objectLevels.push(obj)
       

       if(level1Title.length<10){
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
                        <div class="answer-f-text q${i}">
                            <input type="text" placeholder="Resposta incorreta 1">
                        </div>
                        <div class="answer-f-img q${i}">
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
   document.querySelector('.complete img').src = mainImage 
}

/*------------------Envio Do quizz----------------------*/

function sendQuizz(){
   let myQuizz= axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes',{title:quizzTitle,
   image:mainImage,
   questions:objectQuestions,
   levels:objectLevels})

   myQuizz.then(serverResponse)

    myQuizz.catch(serverError)
}






function serverResponse(resp){
    //console.log('foi certo')
    console.log(resp.data)
}


function serverError(erro){
   // console.log('deu ruim')
    console.log(erro.response)
}












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


    for(let i=1;i<=numberOfLevels;i++){
         document.querySelector(`.level-title.q${i}`).children[0].value=""
         document.querySelector(`.level-url.q${i}`).children[0].value=""
        document.querySelector(`.level-description.q${i}`).children[0].value=""
        document.querySelector(`.level-wr.q${i}`).children[0].value=""
       }

       for(let i=1;i<=numberOfQuestions;i++){
         document.querySelector(`.question-text.q${i}`).children[0].value=""
        document.querySelector(`.question-color.q${i}`).children[0].value=""
       document.querySelector(`.answer-true .answer-t-text.q${i}`).children[0].value=""
       document.querySelector(`.answer-true .answer-t-img.q${i}`).children[0].value=""
        document.querySelector(`.answer-false .answer-f-text.q${i}`).children[0].value=""
       document.querySelector(`.answer-false .answer-f-img.q${i}`).children[0].value=""
    }
}





function testObjectQuestions(){

    console.log(objectQuestions)
    console.log(objectQuestions[0])
    console.log(objectQuestions[1])
    console.log(objectQuestions[2])
}

function testObjectLevels(){

    console.log(objectLevels)
    console.log(objectLevels[0])
    console.log(objectLevels[1])
    console.log(objectLevels[2])
}