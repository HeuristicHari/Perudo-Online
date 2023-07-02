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

let dudu=new Audio ();

let bidSon = new Audio("Sounds/bid.wav");
bidSon.autoplay="";
bidSon.muted="";
bidSon.playsinline="";


let bsSon = new Audio("Sounds/bs.wav");
bsSon.autoplay="";
bsSon.muted="";
bsSon.playsinline="";

let dangSon = new Audio("Sounds/dang.wav");
dangSon.autoplay="";
dangSon.muted="";
dangSon.playsinline="";

let deathSon = new Audio ("Sounds/deathContinue.wav")
deathSon.autoplay="";
deathSon.muted="";
deathSon.playsinline="";

let dingSon = new Audio ("Sounds/ding.wav")
dingSon.autoplay="";
dingSon.muted="";
dingSon.playsinline="";

let hhSon = new Audio ("Sounds/highHand.wav")
hhSon.autoplay="";
hhSon.muted="";
hhSon.playsinline="";

let rerollSon = new Audio ("Sounds/reRoll.wav")
rerollSon.autoplay="";
rerollSon.muted="";
rerollSon.playsinline="";

let startgameSon = new Audio ("Sounds/startGame.wav")
startgameSon.autoplay="";
startgameSon.muted="";
startgameSon.playsinline="";

let thudSon = new Audio ("Sounds/thud.wav")
thudSon.autoplay="";
thudSon.muted="";
thudSon.playsinline="";

let thud2Son = new Audio ("Sounds/thud2.wav")
thud2Son.autoplay="";
thud2Son.muted="";
thud2Son.playsinline="";

let thud3Son = new Audio ("Sounds/thud3.wav")
thud3Son.autoplay="";
thud3Son.muted="";
thud3Son.playsinline="";


let gameWin = new Audio ("Sounds/gameWin.wav")
gameWin.autoplay="";
gameWin.muted="";
gameWin.playsinline="";

let gameLoss = new Audio ("Sounds/gameLoss.wav")
gameLoss.autoplay="";
gameLoss.muted="";
gameLoss.playsinline="";

const sounds = [bidSon, bsSon, dangSon, deathSon, dingSon, hhSon, rerollSon, startgameSon, thudSon, thud2Son, thud3Son, gameWin, gameLoss]

const vicImg = new Image();
vicImg.src='Images/Victory.png';

const loseImg=new Image();
loseImg.src='Images/Eclipse.png'



export {colors};
export {bigIndex};
export {sounds};
export {vicImg};
export {loseImg};