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
	
	/* Returns a list of locations where the pieces 
	can be flipped */
	this.locations_to_flip = function(row, col){
		if(this._board[row][col] == '.'){
			var result = []
			// a list of functions
			var directions = [north, south, east, west,
			north_east, north_west, south_east,
			south_west];
			for(var i=0; i<directions.length; i++){
				var dir = directions[i](this._board, row, col);
				if(this.can_squish(dir, this.get_turn_color())){
					result.push(dir);
				}
			}
			return result;
		}else{
			return [];
		}
	};
	
	/* Returns true if the othello piece flip the other
	othello pieces in the list */
	this.can_squish = function(list, othello_piece){
		if(list.length >=2){
			var piece = this._board[list[0][0]][list[0][1]];
			if(piece == '.' || piece == othello_piece){
				return false;
			}
			for(var i=1; i<list.length; i++){
				piece = this._board[list[i][0]][list[i][1]];
				if(piece == othello_piece){
					return true;
				}
				if(piece == '.'){
					return false;
				}
			}
			return false;
		}else{
			return false;
		}
	};
	
	/*Flips the pieces in locations_list to match the same color
        as the piece placed in the specified row and column.
		locations_list is a list of list of locaitons (row, col)*/
	this.flip = function(locations_list){
		for(var i=0; i<locations_list.length; i++){
			for(var j=0; j<locations_list[i].length; j++){
				var row = locations_list[i][j][0];
				var col = locations_list[i][j][1];
				if(this._board[row][col] == this.get_opposite_color()){
					this._board[row][col] = this.get_turn_color();
					update_piece_view(row, col, this._turn);
				}else{
					break;
				}
			}
		}
	};
	
	//return which player's turn it is
	this.get_turn = function(){
		return this._turn;
	};
	this.get_turn_color = function(){
		if(this._turn == "white"){
			return 'w';
		}else{
			return 'b';
		}
	};
	this.get_opposite_color = function(){
		if(this._turn == "white"){
			return 'b';
		}else{
			return 'w';
		}
	};
    this.get_board = function(){
        return this._board;
    };
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
		  var locs_to_flip = o.locations_to_flip(row,col);
		  if(locs_to_flip.length > 0){
			  o.flip(locs_to_flip);
			  // TODO: before adding, check if it's a valid move
			  $(this).html('<img alt="" height="100%" width="100%" src="' + o.get_turn() + '_piece.PNG">');
			  o.add_piece(board_locs[0], board_locs[1]);
			  $("#turn").text("Player with " + o.get_turn() + " pieces, make a move.");
			  o.log_board(); 
		  }
	  }
	});
}

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

/*Returns all the locations left (or west of) the specified location
    and returns them in a list.*/
function west(board, row, column){
    return direction(board, row, column, 0, -1);
}

/*Returns all the locations right (or east of) the specified location
    and returns them in a list.*/
function east(board, row, column){
    return direction(board, row, column, 0, 1);
}

/*Returns all the locations above (or north of) the specified location
    and returns them in a list.*/
function north(board, row, column){
    return direction(board, row, column, -1, 0);
}

/*Returns all the locations below (or south of) the specified location
    and returns them in a list.*/
function south(board, row, column){
    return direction(board, row, column, 1, 0);
}

/*Returns all the locations upper left diagonal (north west) the specified location
    and returns them in a list.*/
function north_west(board, row, column){
    return direction(board, row, column, -1, -1);
}

/*Returns all the locations upper right diagonal (north east) the specified location
    and returns them in a list.*/
function north_east(board, row, column){
    return direction(board, row, column, -1, 1);
}

/*Returns all the locations lower left diagonal (south west) the specified location
    and returns them in a list.*/
function south_west(board, row, column){
    return direction(board, row, column, 1, -1);
}

/*Returns all the locations lower right diagonal (south east) the specified location
    and returns them in a list.*/
function south_east(board, row, column){
    return direction(board, row, column, 1, 1);
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