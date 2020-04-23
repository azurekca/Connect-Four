let game = null;

document.getElementById('new-game').addEventListener('submit', event => {
	// prevent default page refresh on submit
	event.preventDefault();
	// get player names
	let player1name = document.getElementById('player1-name').value;
	let player2name = document.getElementById('player2-name').value;
	if (!player1name) {
		player1name = 'Player 1';
	}
	if (!player2name) {
		player2name = 'Player 2';
	}

	// start new game
	game = new Game(player1name, player2name);
	game.startGame();

	// hide start button and player input fields
	event.target.style.display = 'none';
	document.getElementById('new-game').style.display = 'none';
	document.getElementById('play-area').style.opacity = '1';
});

document.addEventListener('keyup', event => {
	if (game) {
		game.handleKeyup(event);
	}
});

// test
function testMsg() {
	console.log("I'm your handy test message");
}
