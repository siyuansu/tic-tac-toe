let playerX:boolean = true;
let turnMsg:string;
const popup:HTMLElement | null =  document.getElementById("popup")
const ann:HTMLElement | null =  document.getElementById("ann")
const result:HTMLElement | null =  document.getElementById("result")
const resetBtn:HTMLElement | null =  document.getElementById("reset")
const restartBtn:HTMLElement | null =  document.getElementById("restart")
const tiles:HTMLCollectionOf<Element> = document.getElementsByClassName('tile')
const board:HTMLElement | null =  document.getElementById("board")
const xArr:number[] = []
const oArr:number[] = []
const winning = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
if ( resetBtn === null)
	throw new Error( 'Reset button not found')
resetBtn.addEventListener('click', () => restart())

if ( restartBtn === null)
	throw new Error( 'Restart button not found')
restartBtn.addEventListener('click', () => {
	restart()
	if ( popup !== null)
		popup.setAttribute('style', 'display:none')
	else 
		throw new Error('Popup is undefined')
})

for (let i = 0; i<tiles.length; i++) {
	tiles[i].addEventListener('click', () => {
		if(tiles[i].innerHTML==='') {
			drawTile(i)
			annTurn()
		}
		else {
			announce(ann, 'Cell is occupied!')
		}
	})
}

function restart() {
	for (let tile of tiles) {
		tile.innerHTML = ''
	}
	playerX = true;
	annTurn()
}

function drawTile(num: number) : void {
	tiles[num].innerHTML = playerX ? 'x' : 'o'
	playerX ? xArr.push(num) : oArr.push(num)
	playerX = !playerX
	let res = checkWinner()
	
	if (res !== null) {
		announce(result, res)
		if ( popup !== null)
			popup.setAttribute('style', 'display:block')
		else 
			throw new Error('Popup is undefined')
		xArr.length = 0
		oArr.length = 0

	}
}

function announce(ele:HTMLElement | null, msg:string):void {
	if ( ele !== null ) {
		ele.innerHTML =	msg
	} else {
		throw new Error('Announcement element not found')
	}
}

function annTurn() : void {
	turnMsg = `Player ${playerX ? 'X' : 'O'}, it's your turn!`
	announce(ann, turnMsg)
}

function checkWinner() : string | null {
	if(xArr.length < 3 && oArr.length < 3)
		return null
	for (let w of winning) {
		if (containAll(xArr, w))
			return 'player X won!'
		else if (containAll(oArr, w))
		return 'player O won!'
	} 
	if ( xArr.length + oArr.length === 9)
		return "It's a tie!"
	return null
}

function containAll(arr:number[], target: number[]) : boolean {
	return target.every(v => arr.includes(v))
}
