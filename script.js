const startBtn = document.getElementById("start-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const finalScreen = document.getElementById("final-screen");

const questionText = document.getElementById("question");
const answers = document.querySelectorAll(".answer");
const message = document.getElementById("duck-message");


const questions = [

{
question: "I say “I don’t want anything”… what do I actually mean? ",
answers:[
"I really don’t want anything",
"I’m hoping you’ll understand what I want without me saying it",
"I changed my mind",
"I’m waiting for someone else to decide"
],
correct:1
},


{
question:"What makes me excited the fastest? ",
answers:[
"Buying something new",
"Being around many people",
"Having something special planned that I can look forward to",
"Watching movies all day"
],
correct:2
},


{
question:"I see something cute in a store… what happens? ",
answers:[
"I forget about it immediately",
"I buy everything I see",
"I save the idea and keep thinking about it",
"I only care if it is expensive"
],
correct:2
},


{
question:"What makes a gift special to me? ",
answers:[
"The effort behind it",
"The price",
"How famous it is",
"How many people like it"
],
correct:0
},


{
question:"What will I focus on when making a surprise? ",
answers:[
"Making it expensive",
"Making it perfect for pictures",
"Making everyone notice it",
"Adding details only they understand"
],
correct:3
},


{
question:"What catches my attention? ",
answers:[
"Things that everyone has",
"Things that are cute and meaningful",
"Things that are expensive",
"Things that are practical only"
],
correct:1
},


{
question:"What do I notice that others ignore?",
answers:[
"Small details and memories",
"Trends",
"Prices",
"People’s opinions"
],
correct:0
},


{
question:"How do I show love?",
answers:[
"By talking all day",
"By buying gifts only",
"By avoiding emotions",
"By putting effort into making someone feel special"
],
correct:3
},


{
question:"My perfect simple moment would be… ",
answers:[
"A crowded place",
"A fancy event",
"Coffee, a cute place, and you",
"Sleeping all day"
],
correct:2
},


{
question:"What describes me the most?",
answers:[
"I turn normal moments into memories",
"I hate planning anything",
"I only like big events",
"I don’t get attached"
],
correct:0
},


{
question:"What makes me feel understood?",
answers:[
"Someone giving advice",
"Someone agreeing with me",
"Someone remembering little details",
"Someone buying something big"
],
correct:2
},


{
question:"What would make me happiest?",
answers:[
"Something expensive",
"Something useful",
"Something everyone loves",
"Something personal that shows they know me"
],
correct:3
}

];


let current = 0;


startBtn.onclick = function(){

startScreen.classList.remove("active");
quizScreen.classList.add("active");

showQuestion();

};



function showQuestion(){

let q = questions[current];

questionText.innerHTML = q.question;


answers.forEach((button,index)=>{

button.innerHTML = q.answers[index];

button.onclick = ()=> checkAnswer(index);

});

}



function checkAnswer(choice){

if(choice === questions[current].correct){

message.innerHTML="🐥 You know me! 💙";

current++;


setTimeout(()=>{

if(current < questions.length){

showQuestion();
message.innerHTML="";

}

else{

quizScreen.classList.remove("active");
finalScreen.classList.add("active");

}

},1000);


}

else{

message.innerHTML=
"Birthday celebration cancelled 💔";

setTimeout(()=>{

message.innerHTML=
"Just kidding! Try again 🐥";

},1500);

}

}
