const io = require('socket.io')();
const { initGame } = require('./game');
const { makeid } = require('./utils');
const { FRAME_RATE } = require('./constants');


const state = {};
const clientRooms = {};

io.on('connection', client => {


  
 
  client.on('newGame', handleNewGamep);
  client.on('joinGame', handleJoinGamep);
  client.on('startGame', handleStartGame);
  client.on('passTurn', handlePassTurn);
  client.on('eject', handleEject);
  

  client.on("log", s=>console.log(s) );

  

  function handlePassTurn(headeredBidString){//has bs property
    roomName = clientRooms[client.id]
    if (!roomName){
      return;
    }
    tmpState=state[roomName]

    if (!tmpState){
      return; //backButtonSpam
    }

    //auth
    if (tmpState.playerIdOrder[tmpState.onWho]!==client.id){
      client.emit('eReset', "hacker");
      return;
    }

    // console.log(tmpState.playerIdOrder[tmpState.onWho]);
    // console.log(client.id)
    // console.log('----')





    hBid=JSON.parse(headeredBidString);
    if (hBid.bs){
      io.sockets.in(roomName).emit('playSound', '1');
      //call tmpState
      challengedBid=tmpState.previousBid;
      if (challengedBid.hH && tmpState.hhActive==-1){
        // console.log("yo you buggin hH is bugged");
        return;
      }
      if (challengedBid.hH){
        
        if (challengedBid.num == tmpState.highestHand.num && challengedBid.die == tmpState.highestHand.die){//challenger wrong

          HhChallenge(roomName, tmpState.highestHand, true);

          setTimeout(() => { progressState(roomName, hBid.pNum);
          }, 7200)

          
          
          return;
        }
        else{
          
          
          HhChallenge(roomName, tmpState.highestHand, false)
          setTimeout(() => { progressState(roomName, challengedBid.pNum);
          }, 7200)
          
          return;
        }
      }

      let numExist;
    
      if (!tmpState.gameMode.onesWild || challengedBid.die==1){
        numExist=tmpState.globalDice[challengedBid.die - 1];
      }
      else{
        numExist=tmpState.globalDice[challengedBid.die - 1]+tmpState.globalDice[0];
      }


      if (numExist < challengedBid.num){
        
        
        Challenge(roomName, challengedBid.die, numExist, false )
        setTimeout(() => { progressState (roomName, tmpState.previousBid.pNum);
        }, 7200)
        
        

        return;
      }
      else{
        
       
        Challenge(roomName, challengedBid.die, numExist, true)
        setTimeout(() => {progressState(roomName, hBid.pNum);
        }, 7200)
        

        return;
      }
     
    }

    bid={num:0, die:0, pNum: 0, hH:false}

    bid.num=hBid.num;
    bid.die=hBid.die;
    bid.pNum=hBid.pNum;
    bid.hH=hBid.hH;
    
    
    
    //update hhActive
    if (bid.hH){
      if (tmpState.hhActive==-1){
        tmpState.hhActive=bid.pNum;//player who made the hh bid

        io.sockets.in(roomName).emit('playSound', '5');

      }
      else{
        io.sockets.in(roomName).emit('playSound', '0');
      }
    }
    //hhActive updated above

    //onWho updated below
    if (!bid.hH){
      io.sockets.in(roomName).emit('playSound', '0');
    }

  

    tmpState.onWho=(tmpState.onWho+1)%(tmpState.numPlayers);

    infProt=0;

   
    while (!tmpState.players[tmpState.onWho].alive){
      tmpState.onWho=(tmpState.onWho+1)%s;
      infProt++;
      if (infProt==30){
        //console.log("infiniTeLoopUpTop");
        return;
      }

      
     
    }
    infProt=0;

    //onWho updated above. 

    if (tmpState.onWho==tmpState.hhActive){//did high hand pass through?
      if (!tmpState.previousBid.hH){
        //console.log("You have encountered an L bug.");
        return;
      }
      
      progressState(roomName, -1);//no one dies
      
      return;
    }
     
      tmpState.previousBid.num=bid.num;
      tmpState.previousBid.die=bid.die;
      tmpState.previousBid.pNum=bid.pNum;
      tmpState.previousBid.hH=bid.hH
      //make previousBid good

      

     

      emitGameState(roomName, state[roomName]);
    

  }
  function handleStartGame(obj){//obj is game mod instructions

    if (!obj){
      return;
    }
    
    roomName = clientRooms[client.id]
    room = io.sockets.adapter.rooms.get(roomName)
    //randomize mapping of clientNumbers
    s=room.size;
    if (s==1){  
      client.emit('e', "You're the only one here!")  
      return;
    } 
    if (s>10){
      client.emit('eReset', 'how the fuck more than 10');
      return;
    }
    perm = makePerm(s);


    
    newIdStorage = []
    const clientsInRoom=io.sockets.adapter.rooms.get(roomName);
    const tmpArray=Array.from(clientsInRoom);

    console.log(tmpArray)


    for (let i=0; i<s; i++){
      newIdStorage.push(tmpArray[perm[i]]);
    }
    console.log(newIdStorage);

    //newId has the ids in order

    for (let i=0;i<s;i++){
      io.to(newIdStorage[i]).emit('init', i)
    }

    state[roomName].playerIdOrder=newIdStorage;
    

    
    io.sockets.in(roomName).emit('permPaint',JSON.stringify(perm))
   
    
    client.emit("hostUnSetup"); //i think this is double coded

    initState(roomName, obj);

    io.sockets.in(roomName).emit('playSound', '7');
    emitGameState(roomName, state[roomName]);


  }

  function handleEject(){
    roomName=clientRooms[client.id];
    mod=state[roomName]
    who=mod.onWho;
    if (who==0){
      return;
    }
    mod.players[who].numDice=mod.gameMode.dieStart+mod.gameMode.diePlus-1;
    progressState(roomName, who);

  }




  function handleJoinGamep(roomName) {
   
    const room = io.sockets.adapter.rooms.get(roomName);
 
    
    if (!room){
      client.emit("eReset", "unknownCode")
      
      return;
    }
   
  
    let numClients = 0;
    if (room) {
      numClients = room.size
    }

    if (numClients === 0) {
      client.emit("eReset", 'emptyRoom');
      
      return;
    } else if (numClients >= 10) {
      client.emit("eReset", 'badPlayerCount');
      return;
    } else if (state[roomName].gameOn){
      client.emit("eReset",'gameStarted')
      return;
    }

    

    

    clientRooms[client.id] = roomName;

    client.join(roomName);
    state[roomName].numPlayers=room.size;
    state[roomName].numPlayersAlive=room.size;

   

    io.sockets.in(roomName).emit('gameCode', roomName, room.size+"");
    client.emit('init', room.size-1)
    //We are incentivized to run some spam to accomodate spectators
    //Specifically, make another room specifically for spectators
    //Control check by making sure opps can only join 5-letter room names
    
    
    
    
  }
  
  function handleNewGamep() {

    
    
    let roomName = makeid(5);

    clientRooms[client.id] = roomName;//this stores, for every client, the roomName they are currently in.
    client.emit('gameCode', roomName, '1');

    state[roomName] = initGame();

    client.join(roomName);

    state[roomName].playerIdOrder[0]=client.id
    
    client.emit('init', 0);
    client.emit ("hostSetup");
  }





});


///CLIENT FINISHED

function HhChallenge(roomName, highestHand, claimValid){
t = 0;
if (!roomName || !highestHand){
  return;
}
  const anim=setInterval(  () => {
    if (t<1500){
      io.sockets.in(roomName)
    .emit('fadeInRect', JSON.stringify(t));
    }
    else if (t==1500){
      io.sockets.in(roomName)
    .emit('dispHH');
    
    }
    else if (t==2550){
      io.sockets.in(roomName)
    .emit('dispColon');
    
    }
    else if (t==4500){
      io.sockets.in(roomName)
    .emit('dispHand', JSON.stringify(highestHand));
    
    }
    else if (t==6250){
      if (claimValid){
        io.sockets.in(roomName).emit('playSound', "4")
      }
      else{
        io.sockets.in(roomName).emit('playSound', "2")
      }
    }
    else if (t > 7000){
      clearInterval(anim)
    }
    t+=1000/FRAME_RATE 


  }, 1000/FRAME_RATE

  )

}
function Challenge(roomName, die, numInPlay, claimValid ){
  t = 0;

  if (!roomName || !die){
    return;
  }
 
  const anim=setInterval(  () => {
    if (t<1500){
      io.sockets.in(roomName)
    .emit('fadeInRect', JSON.stringify(t));
    
    }
    else if (t==1500){
      io.sockets.in(roomName)
    .emit('dispDie', JSON.stringify(die));
    
    }
    else if (t==2500){
      io.sockets.in(roomName)
    .emit('dispColon');
  
    }
    else if (t==4500){
      io.sockets.in(roomName)
    .emit('dispNum', JSON.stringify(numInPlay));
    
    }
    else if (t==6250){
      if (claimValid){
        io.sockets.in(roomName).emit('playSound', "4")
      }
      else{
        io.sockets.in(roomName).emit('playSound', "2")
      }
    }
    else if (t > 7000){
      clearInterval(anim)
    }
    t+=1000/FRAME_RATE 


  }, 1000/FRAME_RATE

  )
}

function makePerm(s){
  if (!s){
    return;
  }
  perm={}
    for (let i = 0; i<s; i++){
      perm[i]=i
    }
    for (let i = 1; i<s; i++){
      tmp=perm[i]
      swap=Math.floor(Math.random()*(s-i))+i
      perm[i]=perm[swap]
      perm[swap]=tmp
    }
    perm ["size"] = s;
    return perm;
}



function emitGameState(roomName, gameState) {
  if (!roomName || !gameState){
    return;
  }
  obfusState={}
  obfusState.previousBid=gameState.previousBid;
  obfusState.gameMode=gameState.gameMode;
  obfusState.startThis=gameState.startThis;
  obfusState.onWho=gameState.onWho;
  obfusState.numPlayers=gameState.numPlayers;
  obfusState.numPlayersAlive=gameState.numPlayersAlive;
  obfusState.gameOn=gameState.gameOn;
  obfusState.hhActive=gameState.hhActive;



  io.sockets.in(roomName)
    .emit('gameState', JSON.stringify(obfusState));
}

function initState(roomName, obj){

  if (!roomName || !obj){return;}
    
  mod=state[roomName];
  if (!mod){ return; }
  s=mod.numPlayers;

  obj=JSON.parse(obj);

  numDie=mod.gameMode.dieStart;

  //orders=[]
  for (let i = 0; i<s; i++){



    mod.gameMode.dieStart=obj.dieStart;
    mod.gameMode.diePlus=obj.diePlus;
    mod.gameMode.onesWild=obj.onesWild;
    mod.gameMode.highHand=obj.highHand;


    tmpPlayer={};//ith Player
    tmpPlayer.alive=true;
    tmpPlayer.numDice=mod.gameMode.dieStart;
    dice=[0,0,0,0,0,0]
    
    order=[]
    for (let j=0;j<tmpPlayer.numDice;j++){
      tmpRand=Math.floor(Math.random()*6)
      dice[tmpRand]+=1;
      mod.globalDice[tmpRand]+=1;

      order.push((tmpRand+1))
    }

    
    io.to(mod.playerIdOrder[i]).emit('rollDice', JSON.stringify(order))
    

    
    tmpPlayer.dice=dice;

    mod.players.push(tmpPlayer)
  }
  
  //calculate highestHand
  tmp={num:0, die:0, pnum:0, hH: false,}

  for (let i=5;i>=0;i--){
    if (!mod.gameMode.onesWild){
      if (mod.globalDice[i]>tmp.num){
        tmp={num:mod.globalDice[i], die: i+1, pNum:0, hH:false}

        
      }
    }
    else {
      
      if (i==0){
        continue;
      }
      if (mod.globalDice[i]+mod.globalDice[0]>tmp.num){
        tmp={num:mod.globalDice[i]+mod.globalDice[0], die: i+1, pNum:0, hH:false}
        
      }
    }
  }
  mod.highestHand.num=tmp.num;
  mod.highestHand.die=tmp.die;

  mod.startThis=0;
  mod.onWho=0;
  mod.hhActive=-1;

  mod.gameOn=true;


}

function progressState(roomName, p){
  
  mod=state[roomName];
  if (!mod){return;}

  woosh=false;
  

  if (p>=0){//can pass -1 for noDeaths
    
    mod.players[p].numDice++;
   

    io.sockets.in(roomName)
    .emit('colorL', JSON.stringify(p), JSON.stringify(mod));
    
    woosh = false;

    

    if (mod.players[p].numDice==mod.gameMode.dieStart+mod.gameMode.diePlus){
      mod.players[p].alive=false;
      mod.numPlayersAlive-=1;
      woosh=true;
      
    }
    
    s=mod.numPlayers;
    if (mod.numPlayersAlive==1){
      
      for (let i=0;i<s;i++){
        if (mod.players[i].alive){
          emitGameOver(roomName, i);
          return;
          
        }
        if (i==s-1){
          //console.log("noWinner???")
        }
      }
    
    }

  }

  mod.globalDice=[0,0,0,0,0,0];

  
  for (let i = 0; i<s; i++){
    tmpPlayer=mod.players[i]
    if (!tmpPlayer.alive){
      tmpPlayer.dice=null;
      tmpPlayer.numDice=0;

      continue;
    }

    dice=[0,0,0,0,0,0];
    order=[]
    for (let j=0;j<tmpPlayer.numDice;j++){

      tmpRand=Math.floor(Math.random()*6)
      dice[tmpRand]+=1;
      mod.globalDice[tmpRand]+=1;

      order.push((tmpRand+1))
    }
      io.to(mod.playerIdOrder[i]).emit('rollDice', JSON.stringify(order));


    tmpPlayer.dice=dice;
  }
  //calculate highestHand
  tmp={num:0, die:0, pnum:0, hH:false,}


  for (let i=5;i>=0;i--){
    if (!mod.gameMode.onesWild){
      if (mod.globalDice[i]>tmp.num){
        tmp={num:mod.globalDice[i], die: i+1, pNum:0, hH:false}
        
      }
    }
    else {
      
      if (i==0){
        continue;
      }
      if (mod.globalDice[i]+mod.globalDice[0]>tmp.num){
        tmp={num:mod.globalDice[i]+mod.globalDice[0], die: i+1, pNum:0, hH:false}
      }
    }
  }

  mod.highestHand.num=tmp.num;
  mod.highestHand.die=tmp.die;



  
  //calc who is next
  //bwtf is who is next
  bwtf=((mod.startThis-1)%s+s)%s;
  infProt=0;
  while (! mod.players[bwtf].alive){
    bwtf=((bwtf-1)%s+s)%s;
    infProt++;
    if (infProt==30){
      //console.log("infLoop")
      return;
    }
  }
  infProt=0;

  mod.startThis=bwtf;
  mod.onWho=bwtf;

  
  mod.previousBid={num:1, die:0, pNum:bwtf, hH:false};
  mod.hhActive=-1;


  
  if (woosh){
    io.sockets.in(roomName).emit('playSound', '3');

  }else{
    io.sockets.in(roomName).emit('playSound', '6');

  }
  emitGameState(roomName, state[roomName]);


}

function emitGameOver(roomName, winner) {
  io.sockets.in(roomName)
    .emit('gameOver', JSON.stringify({ winner }));
    state[roomName]=null; //untested
}



io.listen(process.env.PORT || 3000);
