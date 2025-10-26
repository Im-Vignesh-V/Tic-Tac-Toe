// logic Tic Tac Toe

let currentPlayer = "X";
let board = ["","","","","","","","",""];
let gameActive = true;
let winningConndition = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let boardBox = $(".board-item");

boardBox.click(function(){
  let index = $(this).index();
  let mark = $(this).text();
  
  
  if (!gameActive) {
    return;
  } else if(mark) {
    $(this).addClass("incorrect-scale");
    setTimeout(()=>{
      $(this).removeClass("incorrect-scale");
    },200);
    return;
  }
  board[index] = currentPlayer;
  $(this).text(currentPlayer);
  $(this).addClass("correct-scale");
  setTimeout(()=>{
    $(this).removeClass("correct-scale");
  },200)

  checkWinner();

  if(gameActive) {
    $(".current-player-span").text(`Player ${currentPlayer}'s Turn`);
  }
});

function checkWinner () {
  let roundWon = false;
  
  for(condition of winningConndition) {
    let [a,b,c] = condition;
    if (board[a] && board[a]== board[b] && board[a]==board[c]) {
      roundWon = true;
      for(let ind of condition) {
        boardBox.eq(ind).addClass("player-won");
      }
      break;
    }
  }

  if (roundWon) {
    $(".current-player-span").text(`Player ${currentPlayer} Won!`);
    gameActive = false;
    $(".reset").addClass("indicator");
    return;
  } else if (!board.includes("")) {
    $(".current-player-span").text(`Draw`);
    gameActive = false;
    $(".reset").addClass("indicator");
    boardBox.addClass("draw");
    return;
  } else {
    currentPlayer = currentPlayer === "X"?"O":"X";
    return currentPlayer;
  }
    
}

let resetBtn = $(".reset");

resetBtn.click(()=>{
  $(".reset").removeClass("indicator");
  boardBox.text("");
  boardBox.removeClass("player-won draw");
  board = ["","","","","","","","",""];
  currentPlayer = "X";
  $(".current-player-span").text(`Player ${currentPlayer}'s Turn`);
  gameActive = true;
})


