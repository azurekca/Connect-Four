class Game {
  constructor(p1, p2) {
    this.board = new Board();
    this.players = this.createPlayers(p1, p2);
    this.ready = false;
  }
  
    /**
     * Returns active player
     * @returns {Object}  Player - The active player
     */
    get activePlayer() {
      return this.players.find(player => player.active);
    }

  /**
   * Create two player objects
   * @returns {array} An array of two player objects
   */
  createPlayers(p1, p2) {
    const players = [];
    players.push(new Player(p1, 1, "e15258", true));
    players.push(new Player(p2, 2, "e59a13"));
    return players;
  }

  /**
   * Gets game ready for play
   */
  startGame() {
    this.board.drawHTMLBoard();
    this.activePlayer.activeToken.drawHTMLToken();
    this.ready = true;
  }

  /**
   * Branches code, depending on what key player presses
   * @param {Object} event - Keydown event object
   */
  handleKeydown(event) {
    if (this.ready) {
      if (event.key === "ArrowLeft") {
        // move token a column left
        this.activePlayer.activeToken.moveLeft();
      } else if (event.key === "ArrowRight") {
        // move token a column right
        this.activePlayer.activeToken.moveRight();
      } else if (event.key === "ArrowDown") {
        // drop token
        this.playToken();
      } 
    }
  }
  
  toggleGameReadyState() {this.ready = !this.ready}
  
  /**
   * Finds Space object to drop token into
   */
  playToken() {
    const game = this;
    const token = this.activePlayer.activeToken;
    const targetCol = token.columnLocation;
    const space = this.board.spaces[targetCol].slice().reverse().find(space => space.token == null);
    if (space) {
      this.ready = false;
      token.drop(space, () => {game.progressGame(token, space)});
    }
  }
  
  progressGame(token, space) {
    space.mark(token);
    if (this.checkForWin(space)) {
      // game over
      this.gameOver(`${this.activePlayer.name} Wins!`)
      return;
    }
    
    this.switchPlayers();
    // check if newly active player has any tokens left
    if (this.activePlayer.checkTokens()) {
      this.activePlayer.activeToken.drawHTMLToken();
      this.ready = true;
    } else {
      //out of tokens
      this.gameOver("It's a draw! Oh the humanity!!!");
    }
  }

  /**
   * winning condition is a player has 4 consecutive tokens
   * in a column or a row or diagonally
   * @param {Object} droppedSpace - the Space object of the space that a token was just dropped into
   */
  checkForWin(droppedSpace) {
    const columnNum = droppedSpace.x;
    const rowNum = droppedSpace.y;
    const playerID = droppedSpace.token.owner.id;
    
    // check columns
    const column = this.board.spaces[columnNum];
    if (this.connectFour(column, playerID)) return true;
    // check rows
    const row = this.board.currentRow(rowNum);
    if (this.connectFour(row, playerID)) return true;
    // check left to right up diagonal 
    const upDiagonal = this.board.currentUpDiagonal(columnNum, rowNum);
    if (this.connectFour(upDiagonal, playerID)) return true;
    // check left to right down diagonal 
    const downDiagonal = this.board.currentDownDiagonal(columnNum, rowNum);
    if (this.connectFour(downDiagonal, playerID)) return true;
    
    // if none of the checks found 4, not a winning move
    return false;
  }
  
  /**
   * Checks array of space objects for 4 consecutive tokens owned by active player
   * @param {array} array - array of Space objects
   * @returns {boolean}   - true if four consecutive found, otherwise false
   */
  connectFour(array, playerID) {
    let connectFour = 0;
    for (const space of array) {
      if (space.owner) {
        if (space.owner.id == playerID) {
          connectFour++;
          if (connectFour == 4) {
            return true;
          } 
        } else {
          connectFour = 0; // other player's token; not consecutive
        }
      } else {
        connectFour = 0; // empty space; not consecutive
      }
    };
    return false;
  }

  /**
   * Switches active player
   */
  switchPlayers() {
    this.players.forEach(player => {
      player.active = player.active ? false : true;
    });
  }

  /**
   * Displays game over message
   * @param {string} msg - game over message
   */
  gameOver(msg) {
    const element = document.getElementById('game-over');
    element.textContent = msg;
    element.style.display = 'block';
  }
}