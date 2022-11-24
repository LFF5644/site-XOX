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
			0,0,2,
			0,1,2,
			1,0,1,
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
		gameScreen: Array(9).fill(0),
	}),
	toggelPlayer:(state)=>({
		...state,
		playerTurn:state.playerTurn?0:1,
	}),
};
function checkForWin(gameScreen,state){
	// ENDERS CHECKFORWIN FUNCTION!;
	// return ARRAY LENGTH 2;
	// RETURN //;
	// [true,1] = player 2 wins;
	// [true,0] = player 1 wins;
	// [false,false] = nothing happens;
	// [false,true]  = tie (unendschieden);
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
	for(player of [0,1]){
		const winmsg=`${state.playerNames[player]} aka ${state.playerPointer[player]} hat das Spiel gewonnen!!!`;
		const player_=player+1;
		let y,x,pos;
		for(y of [0,3,6]){
			if(
				gameScreen[y]===player_&&
				gameScreen[y+1]===player_&&
				gameScreen[y+2]===player_
			){
				alert(winmsg);
				return[true,player];
			}
		}
		for(x of [0,1,2]){
			if(
				gameScreen[x]===player_&&
				gameScreen[x+3]===player_&&
				gameScreen[x+6]===player_
			){
				alert(winmsg);
				return[true,player];
			}
		}
		for(pos of [0,2]){
			if(
				gameScreen[pos]===player_&&
				gameScreen[4]===player_&&
				gameScreen[8-pos]===player_
			){
				alert(winmsg);
				return[true,player];
			}
		}
	}
}
function IndexGame({state,actions}){return[
	node_dom("p",{
		innerText:`${state.playerNames[state.playerTurn]} ist dran und setzt ${state.playerPointer[state.playerTurn]}`,
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
				disabled:item!==state.playerPointer[2],
				onclick:()=>{
					actions.editGameScreen([index,state.playerTurn+1]);
					actions.toggelPlayer();
				},
			}),
		)
	),
]}

init(()=>{
	const [state,actions]=hook_model(model);
	return[null,[
		node_dom("h1[innerText=TicTacToe]"),
		node(IndexGame,{state,actions}),
		node_dom("button[innerText=Reset!]",{
			onclick:actions.resetGameScreen,
		}),
		node_dom("button[innerText=checkForWin()]",{
			onclick:()=>{checkForWin(state.gameScreen,state);}
		})
	]];
});
