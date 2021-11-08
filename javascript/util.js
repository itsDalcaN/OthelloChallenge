function getMove(player, board) {
  // TODO: Determine valid moves
  let validMoves = []

  for ( let row = 2; row < board.length; row++ ) {
    for ( let column = 2; column < board[0].length; column++ ) {
      if ( !isOpenSquare( board, row, column ) ) { continue }

      let enemyPlayer = (player == 1)? 2 : 1 
      if ( !isEnemyPieceAround( enemyPlayer, board, row, column ) ) { continue }
      if ( !isOutflankPlacement( player, enemyPlayer, board, row, column ) ) { continue }

      validMoves.push( [row, column] )
    } 
  } 

  console.log(validMoves)

  // TODO: Determine best move
  return [2, 3];
}

function isOpenSquare( board, row, column ) { return board[row][column] == 0 }
function isEnemyPieceAround( enemyPlayer, board, row, column ) {
  for ( let r = row - 1; r <= row + 1 && r < 8; r++ ) {
    for ( let c = column - 1; c <= column + 1 && c < 8; c++ ) {
      if ( board[r][c] == enemyPlayer ) {
        return true
      }
    }
  }

  return false
}

function isOutflankPlacement( player, enemyPlayer, board, row, column ) {
  return isHorizontalOutflankPlacement( player, enemyPlayer, board, row, column ) 
    || isVerticalOutflankPlacement( player, enemyPlayer, board, row, column )
    || isDiagonalOutflankPlacement( player, enemyPlayer, board, row, column )
}

function isHorizontalOutflankPlacement( player, enemyPlayer, board, row, column ) {
  // If player places their stone at row and column, does it outflank/sandwich the enemy?
  return false
}

function isVerticalOutflankPlacement( player, enemyPlayer, board, row, column ) {
  return false
}

function isDiagonalOutflankPlacement( player, enemyPlayer, board, row, column ) {
  return false
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = {getMove, prepareResponse};
