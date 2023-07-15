

import {colors}  from './fconstants.js';
import { bigIndex } from './fconstants.js';
import {sounds} from './fconstants.js';
import {vicImg} from './fconstants.js';
import {loseImg} from './fconstants.js';
const innerCol = "#2e6171";
const middleCol = "#677880";
const outterCol="#18313a";

const buttonOn="#B76E79"
const buttonOff="#470a0a"



var socket=io("https://gentle-escarpment-00981-44400e4b8206.herokuapp.com/", {transports:['websocket']});
//var socket=io("http://localhost:3000", {transports:['websocket']});


socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);

socket.on("rollDice", handleRollDice);

socket.on("eReset", handleErr)
socket.on("e", (s)=>{alert(s);})//alert(s)

socket.on('hostSetup', handleHostSetup);
socket.on('hostUnSetup', handleHostUnSetup);
socket.on('permPaint', handlePermPaint);
socket.on('colorL', handleColorL);

socket.on('fadeInRect', handleFadeInRect);
socket.on ('dispHH', handleDispHH);
socket.on('dispColon', handleDispColon);
socket.on('dispHand', handleDispHand);
socket.on('playSound', handlePlaySound);
socket.on('dispDie', handleDispDie);
socket.on('dispNum', handleDispNum);






const newGameButton = document.getElementById('newGameButton');
const joinGameButton = document.getElementById('joinGameButton');
const startGameButton=document.getElementById("startGameButton")
const passTurn = document.getElementById("passTurn");
const bsButton=document.getElementById("bsButton");
const hhButton=document.getElementById("hhButton");




const boxTop=document.getElementById("boxTop");

const hhOn=document.getElementById("hhOn");
const hhOff=document.getElementById("hhOff");
const oneWild=document.getElementById("oneWild");
const oneTame=document.getElementById("oneTame");
const dieStartOne=document.getElementById("dieStartOne");
const dieStartThree=document.getElementById("dieStartThree");
const dieStartFive=document.getElementById("dieStartFive");
const dieStartTen=document.getElementById("dieStartTen");
const diePlusOne=document.getElementById("diePlusOne");
const diePlusThree=document.getElementById("diePlusThree");
const diePlusFive=document.getElementById("diePlusFive");
const diePlusSeven=document.getElementById("diePlusSeven");




const gameCodeInput = document.getElementById('gameCodeInput');
const numInput =document.getElementById('numInput');
const dieInput=document.getElementById('dieInput');


const gameCodeDisplay = document.getElementById('gameCodeDisplay');

const lobby = document.getElementById('lobby');
const initialScreen = document.getElementById('initialScreen');
const hostPre = document.getElementById('hostPre')
const gameScreen=document.getElementById("gameScreen");
const basicBid=document.getElementById("basicBid");
const diceContainer=document.getElementById("diceContainer");


newGameButton.addEventListener('click', newGame);
joinGameButton.addEventListener('click', joinGame);
startGameButton.addEventListener('click', startGame)
passTurn.addEventListener('click', passTurnLawl)
bsButton.addEventListener('click', BS);
hhButton.addEventListener("click", HH );

hhOn.addEventListener('click', fHhOn );
hhOff.addEventListener('click', fHhOff );
oneWild.addEventListener('click', fOneWild );
oneTame.addEventListener('click', fOneTame );
dieStartOne.addEventListener('click', fDieStartOne );
dieStartThree.addEventListener('click', fDieStartThree );
dieStartFive.addEventListener('click', fDieStartFive );
dieStartTen.addEventListener('click', fDieStartTen );
diePlusOne.addEventListener('click', fDiePlusOne);
diePlusThree.addEventListener('click', fDiePlusThree);
diePlusFive.addEventListener('click', fDiePlusFive);
diePlusSeven.addEventListener('click', fDiePlusSeven);

//bidSon=document.getElementById("bidSon")


let canvas, ctx;
let diceCanvas, ctx2;
let playerNumber;

let previousBid={num: 1, die: 0, pNum:0, hH: false,};

let gameMode = {dieStart:3, diePlus:3, onesWild:false, highHand:true,}




function newGame() {
  socket.emit('newGame');
  
}

function joinGame() {
  const code = gameCodeInput.value;

  const test = sounds[13].play();
 
  socket.emit('joinGame', code);
  
}
function startGame(){
  sounds[13].play();

  document.addEventListener('keydown', keydown);
  
  socket.emit('startGame', JSON.stringify(gameMode));
}


function passTurnLawl(){
  const n = Number (numInput.value);
  const d = Number (dieInput.value);
  const p = playerNumber;
  const h =false;
  const b=false; //header: not always present
   
  if (!n || !d || d<1 || d>6  || n<previousBid.num || n>99 || (n == previousBid.num && d <= previousBid.die )){
    sounds[8].play();
    return;
  }
  const o={num:n, die:d, pNum:p, hH:h, bs:b};

  gameScreen.style.display="none"
  basicBid.style.display="none";

  
  socket.emit('passTurn', JSON.stringify(o));
}
function BS(){
  if (previousBid.die==0){
    sounds[8].play();
    return;
  }

  const n = 0;
  const d = 0;
  const p = playerNumber;
  const h = false;
  const b=true;

  const o={num:n, die:d, pNum:p, hH:h, bs:b};
  gameScreen.style.display="none"
  basicBid.style.display="none";


  socket.emit('passTurn', JSON.stringify(o));
}
function HH(){
  if (previousBid.die==0){
    sounds[8].play();
    return;
  }
  const n =previousBid.num;
  const d = previousBid.die;
  const p = playerNumber;
  const h = true;
  const b = false;
  const o={num:n, die:d, pNum:p, hH:h, bs:b};
  gameScreen.style.display="none"
  basicBid.style.display="none";

  socket.emit('passTurn', JSON.stringify(o));
}


function init() {
  initialScreen.style.display = "none";
  lobby.style.display = "inline";
  
  canvas = document.getElementById('canvas');

  ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.ellipse(650,412.5,550,350, 0,0,Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = outterCol;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(650,412.5,500,300, 0,0,Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = middleCol;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(650,412.5,450,250, 0,0,Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = innerCol;
  ctx.fill();

  document.addEventListener('keydown', keydown);
}

function handleRollDice(order){

  
  
  diceContainer.style.display = "inline"
  diceCanvas=document.getElementById('diceCanvas');
 
  ctx2=diceCanvas.getContext('2d');

  ctx2.fillStyle="#000000"

  ctx2.fillRect(0,0,diceCanvas.width, diceCanvas.height);


  const arrDisp=JSON.parse(order);
  
  

  const dispDiceArray=[]
 
  for (let i=0; i<arrDisp.length; i++){
    const r=Math.floor(i/6);
    const c=i%6;
    const tmpDie=new Image();

    tmpDie.src="./Images/Die_"+arrDisp[i]+".png";
   
    tmpDie.onload= () => {ctx2.drawImage(tmpDie,5+c*55 ,5+r*55 )}
    dispDiceArray.push(tmpDie)
    //oz
  }
}

function handlePermPaint(perm){
  //first we fix gameCodeDisplay
  gameCodeDisplay.innerText=""
  boxTop.innerText="_"
  boxTop.style.color="#18313a";
  boxTop.style.backgroundColor="#18313a"
  

  perm=JSON.parse(perm);
  
  

  paintInitGame(perm["size"])
}

function paintInitGame(size){
  const indices=bigIndex[size];

  for (let i=0;i<size;i++){
    ctx.beginPath();
    ctx.arc(indices[i].x,indices[i].y,30, 0,Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = colors [(playerNumber+i)%size];
    ctx.fill();
  }
}

function handleColorL(p, mod){

  p=JSON.parse(p);
  

  mod=JSON.parse(mod);


  const size=mod.numPlayers;
 
  const indices=bigIndex[size];
  

  const colored=((p-playerNumber)+size)%size;

  const center=indices[colored];

  

  const num = mod.players[p].numDice - mod.gameMode.dieStart;
  const den = mod.gameMode.diePlus;


    ctx.beginPath();
    ctx.moveTo(center.x, center.y)
    ctx.arc(center.x,center.y,30, 0, -Math.PI * 2 * num / den, true);
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.fill();
  
}

function paintGame(state) {
  
  if (state.onWho==playerNumber){

    gameScreen.style.display="block"
    if (!state.gameMode.highHand){
      hhButton.style.display="none";
    }
    else {
      hhButton.style.display="inline";
    }
    if (state.hhActive == -1){
        basicBid.style.display="block"
    }
    else{
      basicBid.style.display="none";
    }
  }
  else{
    gameScreen.style.display="none"
    basicBid.style.display="none";
  }
    ctx.fillStyle=innerCol;
    ctx.fillRect(525,505,250,100);
    
    
    ctx.beginPath();
    ctx.arc(650, 240, 40, 0,Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle=(colors[state.onWho]);
    ctx.fill();

   

    ctx.fillStyle=colors[state.previousBid.pNum]
    ctx.fillRect(500,362.5,300, 100);

    
    const Un=previousBid.num%10;
    const Ten=(Math.floor(previousBid.num/10)%10);
   

    const tmpUn = new Image();
    tmpUn.src="./Images/"+Un +".png";

    const tmpTen = new Image();
    if (Ten != 0){
    
    tmpTen.src="./Images/"+(Math.floor(previousBid.num/10)%10)+".png";
    }
    else{
      tmpTen.src="./Images/Die_0.png"
    }

    const tmpDie= new Image();
    tmpDie.src="./Images/Die_"+previousBid.die+".png";

    const tmpHH = new Image();
    if (state.hhActive>=0){
      tmpHH.src="./Images/HH.png"
    }
    else{
      tmpHH.src="./Images/Die_0.png"
    }


  if (Ten!=0) {
    tmpTen.onload= () => {ctx.drawImage(tmpTen, 530 ,387.5 )} 
  }
  else{
    tmpTen.onload = () => {};
  }

  if (previousBid.die==0){
    tmpUn.onload= () => {}
  }
  else if (Ten!=0){
    tmpUn.onload= () => {ctx.drawImage(tmpUn, 555 ,387.5 )}
  }
  else{
    tmpUn.onload= () => {ctx.drawImage(tmpUn, 530 ,387.5 )}
  }


  tmpDie.onload= () => {ctx.drawImage(tmpDie, 645 ,387.5 )}

  if (state.hhActive >= 0){
    tmpHH.onload= () => {ctx.drawImage(tmpHH, 720 ,395 )}

  }
  


}

function handleInit(number) {
  init();
  playerNumber = number;
}

function handleHostSetup(){
  hostPre.style.display='inline'
}
function handleHostUnSetup(){
  hostPre.style.display='none'
}


function handleGameState(gameState) {

  gameState = JSON.parse(gameState);

  previousBid=gameState.previousBid;

  paintGame(gameState);
  
}

function handleGameOver(data) {
 
  data = JSON.parse(data);


  let t = 0;
 

  const anim=setInterval(  () => {
    

    if (t==1700){
      gameScreen.style.display="none";
      diceContainer.style.display="none";
      basicBid.style.display="none";
    }
   
    else if (t>=2000 && t<=3500){
      ctx.fillStyle="#18313a";
      ctx.fillRect(0, 0, 1300, 810*(t-2000)/1500);

      if (t==2100){
        if (data.winner === playerNumber){
          sounds[11].play();
        }else{
          sounds[12].play();
        }
      }
      if (t>=2250){
        

        if (data.winner === playerNumber) {
          ctx.drawImage(vicImg, 0, 0, vicImg.width, Math.floor((t-2250)*vicImg.height/1250), 330, 130, vicImg
        .width, Math.floor((t-2250)*vicImg.height/1250))
        } else {
          ctx.drawImage(loseImg, 0, 0, loseImg.width, Math.floor((t-2250)*loseImg.height/1250), 65, 130, loseImg
        .width, Math.floor((t-2250)*loseImg.height/1250))
        }

        
      }
    }
  
    else if (t==5000){
      clearInterval(anim)
    }
    t+=25//(hardCode) 


  }, 25//hardCode

  )

  

 
   setTimeout( () => {
   
   ctx.fillStyle="#18313a";
   ctx.fillRect(10, 10, 1280, 810);

   reset();}, 6500
  )
}

function handleGameCode(gameCode,num) {

  gameCodeDisplay.innerText = gameCode;
  gameCodeDisplay.backgroundColor="#18313a";

  boxTop.innerText="Join Code: "+gameCodeDisplay.innerText+" Number of Players:"+Number(num)
  boxTop.style.color="#ADD8E6";
  boxTop.style.backgroundColor="#8e4162"

}

const keydown = (e) => {
  if (e.keyCode===85){
    socket.emit('eject')
  }
}

// GameModeSpam

function fHhOn(){
  hhOn.style.backgroundColor=buttonOn;
  hhOff.style.backgroundColor=buttonOff;
  gameMode.highHand=true;
}
function fHhOff(){
  hhOff.style.backgroundColor=buttonOn;
  hhOn.style.backgroundColor=buttonOff;
  gameMode.highHand=false;
}
function fOneWild(){
  oneWild.style.backgroundColor=buttonOn;
  oneTame.style.backgroundColor=buttonOff;
  gameMode.onesWild=true;
}
function fOneTame(){
  oneWild.style.backgroundColor=buttonOff;
  oneTame.style.backgroundColor=buttonOn;
  gameMode.onesWild=false;
}
function fDieStartOne(){
  turnOffStart();
  dieStartOne.style.backgroundColor=buttonOn;
  gameMode.dieStart=1;
}
function fDieStartThree(){
  turnOffStart();
  dieStartThree.style.backgroundColor=buttonOn;
  gameMode.dieStart=3;
}
function fDieStartFive(){
 turnOffStart();
  dieStartFive.style.backgroundColor=buttonOn;
  gameMode.dieStart=5;
}
function fDieStartTen(){
 turnOffStart();
  dieStartTen.style.backgroundColor=buttonOn;
  gameMode.dieStart=10;
}
function turnOffStart(){
  dieStartOne.style.backgroundColor=buttonOff;
  dieStartThree.style.backgroundColor=buttonOff;
  dieStartFive.style.backgroundColor=buttonOff;
  dieStartTen.style.backgroundColor=buttonOff;
}
function fDiePlusOne(){
  turnOffPlus()
  diePlusOne.style.backgroundColor=buttonOn;
  gameMode.diePlus=1;
}
function fDiePlusThree(){
  turnOffPlus()
  diePlusThree.style.backgroundColor=buttonOn;
  gameMode.diePlus=3;
}
function fDiePlusFive(){
  turnOffPlus()
  diePlusFive.style.backgroundColor=buttonOn;
  gameMode.diePlus=5;
}
function fDiePlusSeven(){
  turnOffPlus()
  diePlusSeven.style.backgroundColor=buttonOn;
  gameMode.diePlus=7;
}
function turnOffPlus(){
  diePlusOne.style.backgroundColor=buttonOff;
  diePlusThree.style.backgroundColor=buttonOff;
  diePlusFive.style.backgroundColor=buttonOff;
  diePlusSeven.style.backgroundColor=buttonOff;
}


//GameModeSpam

function handleErr(s) {
  reset();
  newErr(s);
  
}
function newErr(s){
  socket.emit("log", s);
}


function handleFadeInRect(t){
  t=JSON.parse(t)
 
  ctx.fillStyle= ctx.fillStyle = "rgba(211, 211, 211," + t/1500 +"";
  
  ctx.fillRect(525,505,250,100);
}
function handleDispDie(die){
  sounds[8].play();

  die=JSON.parse(die);

  const tmpDie=new Image();
  tmpDie.src="./Images/Die_"+die+".png";
  tmpDie.onload= () => {ctx.drawImage(tmpDie, 550 ,530 )}
}
function handleDispColon(){
  
  sounds[9].play();

  ctx.beginPath();
    ctx.arc(625,545,6, 0,Math.PI * 2);
  ctx.closePath();
  
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

  ctx.beginPath();
    ctx.arc(625,560,6, 0,Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}
function handleDispNum(numInPlay){

  sounds[10].play();

  numInPlay= Number (JSON.parse(numInPlay))

  const Un=numInPlay%10;
  const Ten=(numInPlay-Un)/10;



  const tmpUn = new Image();
    tmpUn.src="./Images/"+Un +".png";

    const tmpTen = new Image();
    if (Ten != 0){
    
    tmpTen.src="./Images/"+Ten+".png";
    }
    else{
      tmpTen.src="./Images/Die_0.png"
    }
  




  if (Ten!=0) {
    tmpTen.onload= () => {ctx.drawImage(tmpTen, 675 ,530 )} 
  }
  else{
    tmpTen.onload = () => {};
  }

  if (previousBid.die==0){
    tmpUn.onload= () => {}
  }
  else if (Ten!=0){
    tmpUn.onload= () => {ctx.drawImage(tmpUn, 700 ,530 )}
  }
  else{
    tmpUn.onload= () => {ctx.drawImage(tmpUn, 675 ,530 )}
  }


}
function handleDispHH(){

  sounds[8].play();

  const tmpHH=new Image();
  tmpHH.src="./Images/HH.png";
  tmpHH.onload= () => {ctx.drawImage(tmpHH,550 ,535 )}
}
function handleDispHand(highestHand){

  sounds[10].play();

  highestHand=JSON.parse(highestHand);
  const num=highestHand.num;
  const die=highestHand.die;

  const Un=num%10;
  const Ten=(num-Un)/10;


  const tmpDie=new Image();
  tmpDie.src="./Images/Die_"+die+".png";
  tmpDie.onload= () => {ctx.drawImage(tmpDie, 710, 530 )}
  
6
  const tmpUn = new Image();
    tmpUn.src="./Images/"+Un +".png";

    const tmpTen = new Image();
    if (Ten != 0){
    
    tmpTen.src="./Images/"+Ten+".png";
    }
    else{
      tmpTen.src="./Images/Die_0.png"
    }
   



  if (Ten!=0) {
    tmpTen.onload= () => {ctx.drawImage(tmpTen, 640 ,530 )} 
  }
  else{
    tmpTen.onload = () => {};
  }

  if (previousBid.die==0){
    tmpUn.onload= () => {}
  }
  else if (Ten!=0){
    tmpUn.onload= () => {ctx.drawImage(tmpUn, 665 ,530 )}
  }
  else{
    tmpUn.onload= () => {ctx.drawImage(tmpUn, 640 ,530 )}
  }

}




function handlePlaySound(n){
  const m=Number(n);
  sounds[m].play();
}


function reset() {
  playerNumber = null;
  previousBid = null; //untested
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  lobby.style.display = "none";
  hostPre.style.display="none";
  gameScreen.style.display="none";
  diceContainer.style.display="none";
  basicBid.style.display="none";
  document.removeEventListener('keydown', keydown)
  
  
}
