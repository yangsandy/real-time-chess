var socket = io();

var initGame = function() {
	var cfg = {
		draggable: true,
		position: 'start',
		onDrop: handleMove,
	};
	
	board = new ChessBoard('gameBoard', cfg);
	game = new Chess();
};

var handleMove = function(source, target) {
	var move = game.move({from: source, to: target});
	
	if(move === null){
		console.log('Invalid move! Snapping back.');
		return 'snapback';
	}
	else{
		console.log('Valid move!');
		socket.emit('move', move);
	}
}

socket.on('move', function(msg) {
	game.move(msg);
	board.position(game.fen());
});

initGame();
