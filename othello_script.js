//Using global variables, since this
//compiler does not recognize key word
//'class', and I haven't figured out the problem
var player_turn = "black";
var board; //a 2d array representing the board
var start_position = 'w'
;

//changes who's turn it is
function change_turn(){
	if(player_turn == "black"){
		player_turn = "white";
	}else{
		player_turn = "black";
	}
}

//this makes an NxM table (N rows, M cols) on the website
//by dynamically adding table rows (<tr> tag)
function createTableView(n,m){
	$("#dynamic").children().remove(); //removes any row if there were any
	var table = document.getElementById("dynamic");
	for(var i=0; i<n; i+=1){
		var row = table.insertRow(i);
		for(var j=0; j<m; j++){
			var cell = row.insertCell(j);
			cell.id = i+"-"+j;
			if(board[i][j] == '.'){
				cell.innerHTML = '<img alt="" height="100%" width="100%" src="blank_space.PNG">';
			}else if(board[i][j] == 'b'){
				cell.innerHTML = '<img alt="" height="100%" width="100%" src="black_piece.PNG">';
			}else{
				cell.innerHTML = '<img alt="" height="100%" width="100%" src="white_piece.PNG">';
			}
		}
	}
}

//Initializes board 2d array variable (nxm dimensions)
//to n rows and m columns
//The values are initially set to null
function initialize_board(rows, cols){
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
	if (start_position=='b'){
		opposite = 'w';
	}else{
		opposite = 'b';
	}
	board[rows/2-1][cols/2-1] = start_position;
	board[rows/2-1][cols/2] = opposite;
	board[rows/2][cols/2-1] = opposite;
	board[rows/2][cols/2] = start_position;
}

//Prints out the 2d array in
//the console log (nxm dimensions)
function log_board(n,m){
	for(var i=0; i<n; i++){
		data = '';
		for(var j=0; j<m; j++){
			data += board[i][j] + ' ';
		}
		console.log(data);
	}
}

//function that is called when user 
//clicks start_game button on the screen
function start_game_button(){
	var rows = $("#getR").val();
	var cols = $("#getC").val();
	start_game(rows,cols);
}

//starts the game with specified rows and columns
function start_game(rows, cols){
	//id format: row-column (both start with 0)
	$("#turn").text("Player with " + player_turn + " pieces, make a move.");
	initialize_board(rows,cols);
	log_board(rows,cols);
	createTableView(rows,cols);
	//click on square to put a piece on it
	$( "td" ).click(function() {
	  var board_locs = $(this).attr('id').split('-');
	  if(board[board_locs[0]][board_locs[1]] == '.'){
		  	$(this).html('<img alt="" height="100%" width="100%" src="' + player_turn + '_piece.PNG">');
		  board[board_locs[0]][board_locs[1]] = player_turn[0];
		  change_turn();
		  $("#turn").text("Player with " + player_turn + " pieces, make a move.");
		  log_board(rows,cols);
		  console.log('---------'); 
	  }
	});
}

//Updates the view of the board (html table)
function add_piece_view(row,col){
	var id = '#' + row + '-' + col;
	$(id).html('<img alt="" height="100%" width="100%" src="' + player_turn + '_piece.PNG">');
}

//onload function important! HTML need to load first	
window.onload = function(){	
	// start_game(6,6);
	// x = 5;
	// y = 5;
	// var id = '#' + x + '-' +y;
	// $(id).html('<img alt="" height="100%" width="100%" src="' + player_turn + '_piece.PNG">');
};