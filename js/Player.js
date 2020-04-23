class Player {
  constructor(name, id, color, active = false) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.active = active;
    this.tokens = this.createTokens(21); /////change me back to 21
  }

/**
 * Creates token objects for player
 * @param {integer} num - number of token objects to be created
 * @returns {array} playerTokens - an array of new token objects
 */
  createTokens(num) {
    const playerTokens = [];
    for (let i = 0; i < num; i++) {
      const token = new Token(i, this);
      playerTokens.push(token);
    }
    return playerTokens;
  }

  /**
   * Gets all tokens that haven't been dropped
   * @returns {array}  Array of unused tokens
   */
  get unusedTokens() {
    return this.tokens.filter(token => !token.dropped);
  }

  /**
   * Gets the active token by returning the first token in the array of unused tokens
   * @returns {Object}  First token object in the array of unused tokens
   */
  get activeToken() {
    const unusedTokens = this.unusedTokens;
    if (unusedTokens) {
      return unusedTokens[0];
    } 
  }

  /**
   * Checks if there are any tokens left to play
   * @returns {boolean} true or false
   */
  checkTokens() {
    return (this.unusedTokens.length > 0);
  }
}

