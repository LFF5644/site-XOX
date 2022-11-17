const {
	init,
	node,
	node_dom,
	hook_model,
}=lui;

function IndexGame({state,actions}){
	let gameScreen=state.gameScreen.map(
		item=>
			item
			?	state.playerPointer[item-1]
			: 	"_"
	);
	let _0=0;
	let _1=0;
	let index=-1;
	let tableChilds=[];
	for(_0 of Array(3)){
		let trChilds=[];
		for(_1 of Array(3)){
			index+=1;
			const i=index;
			trChilds.push(
				node_dom("td",null,[
					node_dom(`button`,{
						innerText:gameScreen[index],
						onclick:()=>{
							actions.editGameScreen([i,state.playerTurn+1])
						},
					})
				]),
			);
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
	editGameScreen:(state,[index,value])=>({
		...state,
		gameScreen:[
			...state.gameScreen.map((item,nowIndex)=>
				nowIndex===index?value:item
			),
		],
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
