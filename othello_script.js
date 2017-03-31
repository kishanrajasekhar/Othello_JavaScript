//This module contains the game logic

function othello_logic(rows, cols, first_turn, position){
	this._rows = rows;
	this._cols = cols;
	this._turn = first_turn;
	this._board = initialize_board(rows, cols, position); // 2D array 
	
	//changes the turn of the player
	this.change_turn = function(){
		if(this._turn == "black"){ //write out whole color name, since file name for image includes the whole color name
			this._turn = "white";
		}else{
			this._turn = "black";
		}
	};
	//adds the piece to specified row and col
	this.add_piece = function(row,col){
		this._board[row][col] = this._turn[0];
		this.change_turn();
	};
	//gets the piece from the specified row and col
	this.get_piece = function(row,col){
		return this._board[row][col];
	};
	//prints the board on the console
	this.log_board = function(){
		for(var i=0; i<this._rows; i++){
			var data = '';
			for(var j=0; j<this._cols; j++){
				data += this._board[i][j] + ' ';
			}
			console.log(data);
		}
		console.log('---------');
	};
	//return which player's turn it is
	this.get_turn = function(){
		return this._turn;
	};
    this.get_board = function(){
        return this._board;
    }
}

//changes who's turn it is
function change_turn(){
	if(player_turn == "black"){
		player_turn = "white";
	}else{
		player_turn = "black";
	}
}

//Initializes board 2d array variable (nxm dimensions)
//to n rows and m columns
//The values are initially set to null
function initialize_board(rows, cols, position){
	board = new Array(rows);
	for(var i=0; i<rows; i++){
		board[i] = new Array(cols);
	}	
	for(var i=0; i<rows; i++){
		for(var j=0; j<cols; j++){
			board[i][j]='.';
		}
	}
	var opposite = 'something';
	if (position=='b'){
		opposite = 'w';
	}else{
		opposite = 'b';
	}
	board[rows/2-1][cols/2-1] = position;
	board[rows/2-1][cols/2] = opposite;
	board[rows/2][cols/2-1] = opposite;
	board[rows/2][cols/2] = position;
	return board;
}

//Prints out the 2d array in
//the console log (nxm dimensions)
function log_board(board, rows, cols){
	for(var i=0; i<rows; i++){
		data = '';
		for(var j=0; j<cols; j++){
			data += board[i][j] + ' ';
		}
		console.log(data);
	}
}

//starts the game with specified rows and columns
function start_game(rows, cols){
	//id format: row-column (both start with 0)
	$("#turn").text("Player with " + 'black' + " pieces, make a move.");
	var o = new othello_logic(rows,cols,'black', 'w');
	createTableView(rows,cols);
	//click on square to put a piece on it
	$( "td" ).click(function() {
	  var board_locs = $(this).attr('id').split('-');
      // TODO: Implement the proper game logic
      var row = parseInt(board_locs[0]);
      var col = parseInt(board_locs[1]);
	  if(o.get_piece(row,col) == '.'){
          var temp = direction(o.get_board(),row,col,1,1);
          console.log(temp);
          // TODO: before adding, check if it's a valid move
		  $(this).html('<img alt="" height="100%" width="100%" src="' + o.get_turn() + '_piece.PNG">');
		  o.add_piece(board_locs[0], board_locs[1]);
		  $("#turn").text("Player with " + o.get_turn() + " pieces, make a move.");
		  o.log_board(); 
	  }
	});
}

// functions for checking adjacent locations

/*Returns a list of locations (row and col tuples) of the spaces in the
 board of the direction of row_increment, col_increment. This function will
 be used in the functions below.*/
function direction(board, row, col, row_increment, col_increment){
    var result = [];
    row += row_increment;
    col += col_increment;
    while((0<=row) && (row<board.length) && (0<=col) && (col<board[0].length)){
        var loc = [row, col];
        result.push(loc);
        row += row_increment;
        col += col_increment;
    }
    return result;
}

//onload function important! HTML need to load first	
window.onload = function(){	
	// start_game(6,6);
	// x = 5;
	// y = 5;
	// var id = '#' + x + '-' +y;
	// $(id).html('<img alt="" height="100%" width="100%" src="' + player_turn + '_piece.PNG">');
	// var o = new othello_logic(4,4,'black','w');
	// console.log(o.turn);
	// o.change_turn();
	// console.log(o.turn);
};