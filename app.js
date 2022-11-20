const {
	init,
	node,
	node_dom,
	hook_model,
}=lui;

function IndexGame({state,actions}){return[
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
					actions.editGameScreen([index,state.playerTurn+1])
				},
			}),
		)
	),
]}

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

	fillGameScreen:(state,fill=0)=>({
		...state,
		gameScreen: Array(9).fill(fill),
	}),
};
init(()=>{
	const [state,actions]=hook_model(model);
	return[null,[
		node_dom("h1[innerText=TicTacToe]"),
		node(IndexGame,{state,actions}),
		node_dom("button[innerText=Reset!]",{
			onclick:()=>{actions.fillGameScreen(0);},
		})
	]];
});
