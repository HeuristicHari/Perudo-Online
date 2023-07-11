

module.exports = {
  initGame,
  
}

function initGame() {
  const state = createGameState()
  
  return state;
}

function createGameState() {
  return {
    players: [],
    globalDice: [0,0,0,0,0,0],

    playerIdOrder: [null,null,null,null,null,null,null,null,null,null],


    highestHand:{num:120, die:120,},
    
    previousBid:{num:1, die:0, pNum:0, hH: false},

    gameMode:{
      dieStart:3, 
      diePlus:3,  
      onesWild:false, 
      highHand: true,
    },
    
    startThis:0,
    onWho: 0,
    numPlayers: 1,
    numPlayersAlive:1 ,
    gameOn: false,
    hhActive: -1,//false
    
  };
}