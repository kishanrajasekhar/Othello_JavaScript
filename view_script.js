
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

//function that is called when user 
//clicks start_game button on the screen
function start_game_button(){
	var rows = $("#getR").val();
	var cols = $("#getC").val();
	start_game(rows,cols);
}

//Updates the view of the board (html table)
function add_piece_view(row,col){
	var id = '#' + row + '-' + col;
	$(id).html('<img alt="" height="100%" width="100%" src="' + player_turn + '_piece.PNG">');
}