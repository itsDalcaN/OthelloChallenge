function getMove(player, board) {
  // Determine valid moves
  let validMoves = []

  for ( let row = 0; row < board.length; row++ ) {
    for ( let column = 0; column < board[0].length; column++ ) {
      if ( !isOpenSquare( board, row, column ) ) { continue }

      let enemyPlayer = (player == 1)? 2 : 1 
      if ( !isEnemyPieceAround( enemyPlayer, board, row, column ) ) { continue }
      if ( !isOutflankPlacement( player, enemyPlayer, board, row, column ) ) { continue }

      validMoves.push( [row, column] )
    } 
  } 

  console.log(validMoves)

  // TODO: Determine best move
  let bestMove = {move: null, score: -999}
  
  for (let i = 0; i < validMoves.length; i++) {
    let moveScore = evaluateMove(player, board, validMoves[i])

    if (moveScore > bestMove.score) {
      bestMove.move = validMoves[i]
      bestMove.score = moveScore
    }
  }

  console.log(bestMove)
  return bestMove.move;
}

function isOpenSquare( board, row, column ) { return board[row][column] == 0 }

function isWithinBoardBounds( r, c ) { return r >= 0 && r < 8 && c >= 0 && c < 8 }

function isEnemyPieceAround( enemyPlayer, board, row, column ) {
  for ( let r = row - 1; r <= row + 1; r++ ) {
    for ( let c = column - 1; c <= column + 1; c++ ) {
      if ( isWithinBoardBounds( r, c ) &&  board[r][c] == enemyPlayer ) {
        return true
      }
    }
  }

  return false
}

/* If player places their stone at row and column, does it outflank/sandwich the enemy? */
function isOutflankPlacement( player, enemyPlayer, board, row, column ) {
  return isHorizontalOutflankPlacement( player, enemyPlayer, board, row, column ) 
    || isVerticalOutflankPlacement( player, enemyPlayer, board, row, column )
    || isDiagonalOutflankPlacement( player, enemyPlayer, board, row, column )
}

function isHorizontalOutflankPlacement( player, enemyPlayer, board, row, column ) {
  let enemyFlipCount = 0

  // Leftward?
  for ( let j = column - 1; j >= 0; j-- ) {
    if ( board[row][j] == player && enemyFlipCount >= 1 ) {
      return true
    } else if ( board[row][j] == enemyPlayer ) {
      enemyFlipCount++
    } else {
      break
    }
  }

  enemyFlipCount = 0

  // Rightward?
  for ( let j = column + 1; j < 8; j++ ) {
    if ( board[row][j] == player && enemyFlipCount >= 1 ) {
      return true
    } else if ( board[row][j] == enemyPlayer ) {
      enemyFlipCount++
    } else {
      break
    }
  }

  return false
}

function isVerticalOutflankPlacement( player, enemyPlayer, board, row, column ) {
  let enemyFlipCount = 0

  // Upperward?
  for ( let i = row - 1; i >= 0; i-- ) {
    if ( board[i][column] == player && enemyFlipCount >= 1 ) {
      return true
    } else if ( board[i][column] == enemyPlayer ) {
      enemyFlipCount++
    } else {
      break
    }
  }

  enemyFlipCount = 0

  // Downward?
  for ( let i = row + 1; i < 8; i++ ) {
    if ( board[i][column] == player && enemyFlipCount >= 1 ) {
      return true
    } else if ( board[i][column] == enemyPlayer ) {
      enemyFlipCount++
    } else {
      break
    }
  }

  return false
}

function isDiagonalOutflankPlacement( player, enemyPlayer, board, row, column ) {
  // Toward Northwest?
  let enemyFlipCount = 0
  let i = row - 1
  let j = column - 1
  while ( i >= 0 && j >= 0 ) {
    if ( board[i][j] == player && enemyFlipCount >= 1 ) {
      return true
    } else if ( board[i][j] == enemyPlayer ) {
      enemyFlipCount++
    } else {
      break 
    }
    i--
    j--
  }

  // Toward Northeast?
  enemyFlipCount = 0
  i = row - 1
  j = column + 1
  while ( i >= 0 && j < 8 ) {
    if ( board[i][j] == player && enemyFlipCount >= 1 ) {
      return true
    } else if ( board[i][j] == enemyPlayer ) {
      enemyFlipCount++
    } else {
      break
    }
    i--
    j++
  }

  // Toward Southeast?
  enemyFlipCount = 0
  i = row + 1
  j = column + 1
  while ( i < 8 && j < 8 ) {
    if ( board[i][j] == player && enemyFlipCount >= 1 ) {
      return true
    } else if ( board[i][j] == enemyPlayer ) {
      enemyFlipCount++
    } else {
      break
    }
    i++
    j++
  }

  // Toward Southwest?
  enemyFlipCount = 0
  i = row + 1
  j = column - 1
  while ( i < 8 && j >= 0 ) {
    if ( board[i][j] == player && enemyFlipCount >= 1 ) {
      return true
    } else if ( board[i][j] == enemyPlayer ) {
      enemyFlipCount++
    } else {
      break
    }
    i++
    j--
  }

  return false
}

function evaluateMove( player, board, move ) {
  let moveRow = move[0]
  let moveCol = move[1]

  let score = 0

  // Corners are very powerful
  let corners = [[0,0],[7,0],[0,7],[7,7]]
  for ( let i = 0; i < corners.length; i++ ) {
    if (moveRow == corners[i][0] && moveCol == corners[i][1]) {
      score += 5
    }
  }

  return score
}

function manhattanDistance( coord1, coord2 ) {
  return Math.abs(coord2[1] - coord1[1]) + Math.abs(coord2[0] - coord1[0])
}

function prepareResponse(move) {
  const response = `${JSON.stringify(move)}\n`;
  console.log(`Sending response ${response}`);
  return response;
}

module.exports = {getMove, prepareResponse};
