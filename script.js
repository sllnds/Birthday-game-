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

const giftBtn = document.getElementById("gift-btn");
const realGiftScreen = document.getElementById("real-gift-screen");
const finishBtn = document.getElementById("finish-btn");
const questions = [

{
q:"When I say 'I don't want anything'... what do I really mean?",
a:[
"Nothing, I’m not playing games",
"I want you to figure it out somehow",
"I want a cute surprise but I won’t admit it",
"Money, let’s be honest!"
],
c:1
},

{
q:"What is something I would 100% do?",
a:[
"Say I won't buy it then buy it",
"Google a random thing for an hour",
"Make a plan and ignore it",
"Start a new obsession"
],
c:1
},

{
q:"What is my most used phrase?",
a:[
"ليش تكرهني؟",
"سري امها",
"يناااسووو",
"قس وت"
],
c:0
},

{
q:"If we go out and I say 'I don't know where I wanna eat'...",
a:[
"I genuinely don't know",
"I want you to choose but choose correctly",
"I will reject every option",
"I already know where I want to go"
],
c:1
},

{
q:"What is our biggest enemy in this relationship?",
a:[
"Distance",
"Food choices",
"Different music taste",
"Being too busy"
],
c:1
},

{
q:"The most realistic thing about us is:",
a:[
"We can't stay mad for long",
"We argue about the dumbest things",
"We always find something to talk about",
"We are both dramatic"
],
c:1
},

{
q:"What is the most likely thing we do on a call?",
a:[
"Say bye 10 times",
"Hang up immediately",
"Only talk about serious stuff",
"Stay silent the most of the time"
],
c:3
},

{
q:"What is something I will never say no to?",
a:[
"Food",
"Money",
"Kissing you",
"Coffee"
],
c:2
},

{
q:"What is my secret weapon in an argument?",
a:[
"Remembering every tiny detail",
"Giving up immediately",
"Pretending I forgot",
"Changing the topic"
],
c:0
},

{
q:"What makes me feel most loved by you?",
a:[
"When you put effort without me asking",
"When you buy me the most expensive thing",
"When you reply instantly 24/7",
"When you agree with everything I say"
],
c:0
},

{

q:"What is my love language with you?",
a:[
"Thoughtful little things",
"Acts of service",
"Quality time",
"All of them, obviously"
],
c:3
},

{

q:"What do you think happens next?",
a:[
"Nothing, we just say bye",
"A little surprise waiting for you",
"I disappear randomly",
"I make you guess forever"
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
giftBtn.onclick = () => {

  finalScreen.classList.remove("active");

  realGiftScreen.classList.add("active");

};

finishBtn.onclick = () => {

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      background:#67c7ff;
      color:white;
      font-family:'Pixelify Sans', monospace;
      text-align:center;
      padding:30px;
    ">

      <h1 style="font-size:52px;">
        HAPPY BIRTHDAY ❤️
      </h1>

      <p style="font-size:28px; line-height:1.7; max-width:700px;">
        Go open your real gift...<br><br>
        And don't forget to read the letter after!
      </p>

    </div>
  `;

};
