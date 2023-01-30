const {
	init,
	node,
	node_dom,
	hook_model,
}=lui;

const model={
	init:()=>({
		playerNames:["Spieler 1","Spieler 2"],
		playerPointer:["X","O",""],
		playerTurn:0,
		gameScreen:[
			0,0,0,
			0,0,0,
			0,0,0,
		],
	}),
	editGameScreen:(state,[index,value])=>({
		...state,
		gameScreen:(
			state.gameScreen.map((item,nowIndex)=>
				nowIndex===index?value:item
			)
		),
	}),

	resetGameScreen:(state)=>({
		...state,
		playerTurn:0,
		gameScreen:new Array(9).fill(0),
	}),
	togglePlayer:(state)=>({
		...state,
		playerTurn:state.playerTurn===1?0:1,
	}),
};
function checkForEnder(gameScreen){
	const slot_player0="x";
	const slot_player1="o";
	const slot_air="-";
	let newGameScreen=new Array(gameScreen.length).fill(0);
	newGameScreen=newGameScreen.map((_item,index)=>{
		const item=gameScreen[index];
		if(item===slot_air){return 0;}
		else if(item===slot_player0){return 1;}
		else if(item===slot_player1){return 2;}
		else{return -1;}
	});
	console.log(newGameScreen);
	return checkForWin(newGameScreen);
}
function checkForWin(gameScreen){
	// ENDERS CHECKFORWIN FUNCTION!;
	// return ARRAY LENGTH 2;
	// RETURN //;
	// [1,1] = player 2 wins;
	// [1,0] = player 1 wins;
	// [0,0] = nothing happens;
	// [0,1] = tie (unendschieden);
	//;
	if(gameScreen.length!=9){
		throw new Error("gameScreen.length is not 9");
	}
	if(gameScreen.some(item=>!(
		typeof(item)==="number"&&
		item>=0&&
		item<=2
	))){
		throw new Error("gameScreen formart not allowed!");
	}

	let player;
	for(player of [1,2]){
		const playerID=player-1;
		let y,x,pos;
		for(y of [0,3,6]){
			if(
				gameScreen[y]===player&&
				gameScreen[y+1]===player&&
				gameScreen[y+2]===player
			){
				return[1,playerID];
			}
		}
		for(x of [0,1,2]){
			if(
				gameScreen[x]===player&&
				gameScreen[x+3]===player&&
				gameScreen[x+6]===player
			){
				return[1,playerID];
			}
		}
		for(pos of [0,2]){
			if(
				gameScreen[pos]===player&&
				gameScreen[4]===player&&
				gameScreen[8-pos]===player
			){
				return[1,player];
			}
		}
		if(!gameScreen.includes(0)){return[0,1];}
		else{return[0,0];}
	}
}
function IndexGame({state,actions,winArgs:[wined,tie,winBits]}){return[
	node_dom("h1",{
		innerText:!wined?
			"TicTacToe":
			tie?
				"Keiner hat gewonnen":
				`${state.playerNames[winBits[1]]} (${state.playerPointer[winBits[1]]}) hat gewonnen`,
	}),
	node_dom("p",{
		innerText:!wined?
			`${state.playerNames[state.playerTurn]} ist dran und setzt ${state.playerPointer[state.playerTurn]}`:
			"Spiel ist zu ende!",
	}),
	node_dom("div[className=xoxGrid]",null,
		state.gameScreen
		.map(item=>
			item
			?	state.playerPointer[item-1]
			: 	state.playerPointer[2]
		)
		.map((item,index)=>
			node_dom("button",{
				innerText:item,
				disabled:item!==state.playerPointer[2]||wined,
				onclick:()=>{
					actions.editGameScreen([index,state.playerTurn+1]);
					actions.togglePlayer();
				},
			}),
		)
	),
	node_dom("button",{
		innerText:wined?
			"Neu Runde":
			"egal, alles löschen!",
		onclick:actions.resetGameScreen,
	}),
]}

init(()=>{
	const [state,actions]=hook_model(model);

	const winBits=checkForWin(state.gameScreen);
	let showWinScreen=false;

	if(winBits[0]){showWinScreen=true;}
	else if(!winBits[0]&&winBits[1]){showWinScreen=true;}
	const winArgs=[
		showWinScreen,
		!winBits[0]&&winBits[1],
		winBits,
	];

	return[null,[
		node(IndexGame,{state,actions,winArgs}),
	]];
});
