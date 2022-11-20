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
			onclick:()=>{actions.resetGameScreen();},
		}),
	]];
});
