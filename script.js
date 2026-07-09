const startBtn = document.getElementById("start-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const cakeScreen = document.getElementById("cake-screen");
const finalScreen = document.getElementById("final-screen");

const question = document.getElementById("question");
const answers = document.querySelectorAll(".answer");
const progress = document.getElementById("progress");
const wrongMessage = document.getElementById("wrong-message");

const blowBtn = document.getElementById("blow-btn");
const micStatus = document.getElementById("mic-status");


const questions = [

{
q:"I say I don't want anything... what do I secretly hope for?",
a:[
"I really want nothing",
"Something thoughtful without asking",
"Someone else choosing for me",
"Just money"
],
c:1
},

{
q:"What makes a gift special to me?",
a:[
"The price",
"How popular it is",
"The meaning behind it",
"The packaging"
],
c:2
},

{
q:"My favorite kind of memories are...",
a:[
"Random expensive experiences",
"Small details that mean something",
"Things everyone sees",
"Things that don't last"
],
c:1
},

{
q:"What makes me feel loved the most?",
a:[
"Someone remembering little things",
"Someone buying anything",
"Someone agreeing with everything",
"Someone being perfect"
],
c:0
},

{
q:"My perfect simple moment is...",
a:[
"A huge party",
"Coffee, a cute place, and you",
"Being famous",
"Shopping all day"
],
c:1
},

{
q:"When I create a surprise, I care about...",
a:[
"Making it personal",
"Making it expensive",
"Making everyone notice",
"Finishing quickly"
],
c:0
},

{
q:"Something I always notice...",
a:[
"Small details",
"Brand names",
"Prices",
"Trends"
],
c:0
},

{
q:"How do I usually show love?",
a:[
"By disappearing",
"By putting effort into details",
"By avoiding emotions",
"By keeping things simple"
],
c:1
},

{
q:"What describes me best?",
a:[
"I turn moments into memories",
"I don't care about details",
"I hate surprises",
"I never plan"
],
c:0
},

{
q:"What makes me happiest?",
a:[
"Something personal",
"Something everyone has",
"Something expensive",
"Something random"
],
c:0
},

{
q:"What proves someone knows me?",
a:[
"They remember small things",
"They buy expensive gifts",
"They copy trends",
"They impress others"
],
c:0
},

{
q:"The best birthday ending would be...",
a:[
"A normal goodbye",
"A surprise made with love",
"A random gift",
"Nothing special"
],
c:1
}

];


let current = 0;
let candlesBlown = false;



startBtn.onclick = ()=>{

startScreen.classList.remove("active");
quizScreen.classList.add("active");

showQuestion();

};



function showQuestion(){

let item = questions[current];


progress.innerHTML =
`QUESTION ${current + 1} / ${questions.length}`;


question.innerHTML = item.q;


answers.forEach((btn,index)=>{


btn.innerHTML = item.a[index];


btn.onclick = ()=>{


if(index === item.c){


current++;


if(current < questions.length){

showQuestion();

}

else{


quizScreen.classList.remove("active");

cakeScreen.classList.add("active");


startMic();


}


}

else{


wrongMessage.innerHTML =
"Birthday celebration cancelled 💔";


setTimeout(()=>{


wrongMessage.innerHTML =
"Just kidding! Try again";


},1500);


}


};


});

}





function blowCandles(){


if(candlesBlown) return;


candlesBlown = true;


let candles =
document.querySelectorAll(".candle");


let number = 0;


let timer = setInterval(()=>{


if(number < candles.length){


candles[number].classList.add("off");


number++;


}

else{


clearInterval(timer);


setTimeout(()=>{


cakeScreen.classList.remove("active");

finalScreen.classList.add("active");


},1500);


}


},150);

}





blowBtn.onclick = ()=>{

blowCandles();

};






function startMic(){


if(!navigator.mediaDevices){


micStatus.innerHTML =
"Tap the button to blow";


return;


}



navigator.mediaDevices.getUserMedia({

audio:true

})


.then(stream=>{


micStatus.innerHTML =
"Blow on your candles";


const audio =
new AudioContext();


const mic =
audio.createMediaStreamSource(stream);


const analyser =
audio.createAnalyser();


mic.connect(analyser);


let data =
new Uint8Array(analyser.frequencyBinCount);



function listen(){


if(candlesBlown) return;



analyser.getByteFrequencyData(data);



let volume =
data.reduce((a,b)=>a+b)/data.length;



if(volume > 45){


blowCandles();


stream.getTracks()
.forEach(track=>track.stop());


return;


}



requestAnimationFrame(listen);


}



listen();



})


.catch(()=>{


micStatus.innerHTML =
"Tap the button to blow";


});


}
