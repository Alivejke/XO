function GameXO() {
	var canvas = document.getElementById('game'),
		field = canvas.getContext('2d'),
		config = {
			state: true,

			currentPlayer: 'x',

			width: canvas.clientWidth,
			height: canvas.clientHeight,

			cells: new Array(3),
			cellWidth: canvas.clientWidth / 3,
			cellHeight: canvas.clientHeight / 3,
			cellOffset: 20
		};

	this.init = function () {
		field.clearRect(0, 0, config.width, config.height);

		drawField();
		initCells();
		bindHandlers();
	};
	
	function drawField() {
		field.beginPath();

		field.moveTo(config.width / 3, 0);
		field.lineTo(config.width / 3, config.height);

		field.moveTo(config.width / 3 * 2, 0);
		field.lineTo(config.width / 3 * 2, config.height);

		field.moveTo(0, config.height / 3);
		field.lineTo(config.width, config.height / 3);

		field.moveTo(0, config.height / 3 * 2);
		field.lineTo(config.width, config.height / 3 * 2);

		field.closePath();
		field.stroke();

		return this;
	}

	function initCells() {
		for(var i = 0; i < 3; i++) {
			config.cells[i] = [];
			for(var j = 0; j < 3; j++) {
				config.cells[i][j] = {
					x: config.width * j / 3,
					y: config.height * i / 3,
					state: 'free'
				};
			}
		}
	}

	function bindHandlers() {
		$(canvas).on('click', function(event) {
			if(config.state) {
				var cell = getCell(event.offsetX, event.offsetY);
				if(cell.state == 'free') {
					makeMove(cell);
				}
			}
		});
	}

	function getCell(x, y) {
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				if( x >= config.cells[i][j].x &&
					x < config.cells[i][j].x + config.cellWidth &&
					y >= config.cells[i][j].y &&
					y < config.cells[i][j].y + config.cellHeight
				) {
					return config.cells[i][j];
				}
			}
		}
	}

	function makeMove(cell) {
		switch(config.currentPlayer) {
			case 'x':
				drawX(cell.x, cell.y);
				cell.state = 'x';
				config.currentPlayer = 'o';
			break;
			case 'o':
				drawO(cell.x, cell.y);
				cell.state = 'o';
				config.currentPlayer = 'x';
			break;
			default:
		}
	}

	function drawX(x, y) {
		field.beginPath();

		field.moveTo(x + config.cellOffset, y + config.cellOffset);
		field.lineTo(x + config.cellWidth - config.cellOffset, y + config.cellHeight - config.cellOffset );

		field.moveTo(x + config.cellWidth - config.cellOffset, y + config.cellOffset);
		field.lineTo(x + config.cellOffset, y + config.cellHeight - config.cellOffset);

		field.closePath();
		field.stroke();
	}

	function drawO(x, y) {
		field.beginPath();

		field.arc( x + config.cellWidth / 2,
			y + config.cellHeight / 2,
			(config.cellWidth + config.cellHeight) / 4 - config.cellOffset / 2,
			0,
			2 * Math.PI);

		field.closePath();
		field.stroke();
	}
}

$(document).ready(function () {
	var game = new GameXO();

	game.init();
});