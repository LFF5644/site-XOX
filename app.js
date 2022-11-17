const {
	init,
	node,
	node_dom,
	hook_model,
}=lui;

function IndexGame({state,actions}){
	let gameScreen=state.gameScreen.map(
		item=>
			item==0
			?
				"_"
			:
				state.playerPointer[item-1]
	);
	let _=0;
	let index=-1;
	let tableChilds=[];
	for(_ of Array(3)){
		let trChilds=[];
		for(_ of Array(3)){
			index+=1;
			trChilds.push(node_dom("td",null,[node_dom(`button[innerText=${gameScreen[index]}]`)]));
		}
		tableChilds.push(node_dom("tr",null,trChilds));
	}
	return[
		node_dom("table",null,tableChilds),
	];
}

const model={
	init:()=>{
		return{
			playerNames:["Spieler 1","Spieler 2"],
			playerPointer:["X","O"],
			playerTurn:0,
			gameScreen:[
				0,0,2,
				0,1,2,
				1,0,1,
			],
		};
	},
};
init(()=>{
	const [state,actions]=hook_model(model);
	return[null,[
		node_dom("h1[innerText=TicTacToe]"),
		node(IndexGame,{state,actions}),
	]];
});
