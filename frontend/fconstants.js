const colors=[
    "#663f46",
    "#6495ed",  
    "#D0F5BC",
    "#FFb8b8",
    "#038a64",
    "#E5E7C6",
    "#DDA448",
    "#E03B29", 
    "#858585",
    "#B85CFF",
     ];

     

const bigIndex=

[[],[],
    
[{x:650, y:762.5}, {x:650, y:62.5,},],

 [{x:650, y:762.5},{x:1107.5, y:220}, {x:192.5,y:220,},],

 [{x:650, y:762.5},{x:1200,y:412.5}, {x:650, y:62.5,}, {x:100, y:412.5,},],

  [{x:650, y:762.5},{x:1200,y:412.5}, {x:897.5, y:100,}, {x:402.5, y:100,}, {x:100, y:412.5,},],

 [{x:650, y:762.5}, {x:990,y:688.5}, {x:1107.5, y:220,}, {x:650, y:62.5,}, {x:192.5, y:220}, {x:310, y:688.5,},],

  [{x:650, y:762.5}, {x:990,y:688.5}, {x:1200, y:412.5,}, {x:897.5, y: 100,}, {x:402.5,y:100,}, {x:100,y:412.5,}, {x:310, y:688.5,},],

   [{x:650, y:762.5}, {x:990,y:688.5}, {x:1200, y:412.5,}, {x:1107.5, y:220,}, {x:650,y:62.5,}, {x:192.5,y:220,}, {x:100,y:412.5,}, {x:310, y:688.5,},],
  
   [{x:650, y:762.5}, {x:990,y:688.5},  {x:1200, y:412.5,}, {x:1107.5, y:220,}, {x:897.5, y: 100,}, {x:402.5,y:100,}, {x:192.5,y:220,}, {x:100,y:412.5,}, {x:310, y:688.5,},],
  
    [{x:650, y:762.5}, {x:990,y:688.5}, {x:1200, y:412.5,}, {x:1107.5, y:220,},{x:897.5, y: 100,}, {x:650,y:62.5,}, {x:402.5,y:100,}, {x:192.5,y:220,}, {x:100,y:412.5,}, {x:310, y:688.5,},],


]



let bidSon = new Audio("Sounds/bid.mp3");

let bsSon = new Audio("Sounds/bs.mp3");

let dangSon = new Audio("Sounds/dang.mp3");

let deathSon = new Audio ("Sounds/deathContinue.mp3")

let dingSon = new Audio ("Sounds/ding.mp3")

let hhSon = new Audio ("Sounds/highHand.mp3")

let rerollSon = new Audio ("Sounds/reRoll.mp3")

let startgameSon = new Audio ("Sounds/startGame.mp3")

let thudSon = new Audio ("Sounds/thud.mp3")

let thud2Son = new Audio ("Sounds/thud2.mp3")

let thud3Son = new Audio ("Sounds/thud3.mp3")

let gameWin = new Audio ("Sounds/gameWin.mp3")

let gameLoss = new Audio ("Sounds/gameLoss.mp3")

let silentSound = new Audio("Sounds/silence.mp3");
//let silentSound=document.getElementById("silentSound");
const sounds = [bidSon, bsSon, dangSon, deathSon, dingSon, hhSon, rerollSon, startgameSon, thudSon, thud2Son, thud3Son, gameWin, gameLoss, silentSound]

for (let j=0; j<sounds.length; j++){
    let i=sounds[j];
    i.autoplay="";
    i.muted="";
    i.playsInline=true;

    console.log(i);
    console.log(i.playsInline)
    console.log(i.muted)
    i.load();
}

const vicImg = new Image();
vicImg.src='Images/Victory.png';

const loseImg=new Image();
loseImg.src='Images/Eclipse.png'



export {colors};
export {bigIndex};
export {sounds};
export {vicImg};
export {loseImg};