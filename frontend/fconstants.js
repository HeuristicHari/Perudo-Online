const colors=[
    "#663f46",
    "#6495ed",  
    "#7ea16b",
    "#9000B3",
    "#09BC8A",
    "#423E28",
    "#DDA448",
    "#9A2316", 
    "#3D3B8E",
    "#7AC74F",
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



let bidSon = new Audio("Sounds/bid.wav");



let bsSon = new Audio("Sounds/bs.wav");


let dangSon = new Audio("Sounds/dang.wav");


let deathSon = new Audio ("Sounds/deathContinue.wav")


let dingSon = new Audio ("Sounds/ding.wav")


let hhSon = new Audio ("Sounds/highHand.wav")


let rerollSon = new Audio ("Sounds/reRoll.wav")


let startgameSon = new Audio ("Sounds/startGame.wav")


let thudSon = new Audio ("Sounds/thud.wav")


let thud2Son = new Audio ("Sounds/thud2.wav")


let thud3Son = new Audio ("Sounds/thud3.wav")



let gameWin = new Audio ("Sounds/gameWin.wav")


let gameLoss = new Audio ("Sounds/gameLoss.wav")


const sounds = [bidSon, bsSon, dangSon, deathSon, dingSon, hhSon, rerollSon, startgameSon, thudSon, thud2Son, thud3Son, gameWin, gameLoss]

for (let j=0; j<sounds.length; j++){
    let i=sounds[j];
    i.autoplay="";
    i.muted="";
    i.playsinline=""
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