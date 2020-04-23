class Token {
  constructor(index, owner) {
    this.owner = owner;
    this.id = `token-${index}-${owner.id}`;
    this.dropped = false;
    this.columnLocation = 0;
  }
  
  /**
   * Gets left offset of html element
   * @returns {number}  Left offset of token object's htmlToken
   */
    get offsetLeft() {
      return this.htmlToken.offsetLeft;
    }

  /**
   * Draws new HTML token
   */
  drawHTMLToken() {
    const token = document.createElement('div');
    document.getElementById('game-board-underlay').appendChild(token);
    token.setAttribute('id', this.id);
    token.setAttribute('class', 'token');
    token.style.backgroundColor = this.owner.color;
  }

/**
 * Returns an html div element representing the token
 * @returns {HTMLDivElement} 
 */
  get htmlToken() {
    return document.getElementById(this.id);
  }

/**
 * moves html token one column to the left
 */
  moveLeft() {
    if (this.columnLocation > 0) {
      this.htmlToken.style.left = this.offsetLeft - 76;
      this.columnLocation--;
    }
  }

/**
 * moves html token one column to the right
 */
  moveRight() {
    if (this.columnLocation < COLUMNS - 1) {
      this.htmlToken.style.left = this.offsetLeft + 76;
      this.columnLocation++;
    }
  }

  /**
   * Drops html token into targeted board space
   * @param {Object} target - Targeted space for dropped token
   * @param {function} reset - The reset function to call after the drop animation has completed
   */
  drop(targetSpace, callback) {
    this.dropped = true;
    this.htmlToken.style.top = targetSpace.y * targetSpace.diameter;
    this.htmlToken.classList.add('token-dropped');
    callback();
  }
}