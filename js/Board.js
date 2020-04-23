const COLUMNS = 7;  // this is the x coordinate
const ROWS = 6;     // this is the y coordinate

/* 
// example board to show how each space is related to its coordinates
col0 row0   col1 row0   col2 row0   col3 row0   col4 row0   col5 row0   col6 row0
col0 row1   col1 row1   col2 row1   col3 row1   col4 row1   col5 row1   col6 row1
col0 row2   col1 row2   col2 row2   col3 row2   col4 row2   col5 row2   col6 row2
col0 row3   col1 row3   col2 row3   col3 row3   col4 row3   col5 row3   col6 row3
col0 row4   col1 row4   col2 row4   col3 row4   col4 row4   col5 row4   col6 row4
col0 row5   col1 row5   col2 row5   col3 row5   col4 row5   col5 row5   col6 row5
*/

class Board {
  constructor() {
    this.columns = COLUMNS;
    this.rows = ROWS;
    this.spaces = this.createSpaces();
  }

  /**
   * Generates an array of Space objects
   * @param {integer} columns           - the number of columns on the board
   * @param {integer} rows              - the number of rows on the board
   * @returns {2D Array} spaces2DArray  - a 2D array of Space objects accessible by [x][y] (column, row) notation
   */
  createSpaces() {
    const spaces2DArray = [];
    for(let col = 0; col < this.columns; col++) {
      const columnsArray = []
      for (let row = 0; row < this.rows; row++) {
        let space = new Space(col, row);
        columnsArray.push(space);
      }
      spaces2DArray.push(columnsArray);
    }
    return spaces2DArray;
  }
  
  /**
   * Render the board in HTML
   */
  drawHTMLBoard() {
    this.spaces.forEach(column => {
      column.forEach(space => {
        space.drawSVGSpace();
      })
    });
  }

  /**
   * Generate an array of Space objects along one row of the board
   * @param {integer} row - specifies which row
   */
  currentRow(row) {
    const rowArray = [];
    for (let col = 0; col < this.spaces.length; col++) {
      rowArray.push(this.spaces[col][row]);
    };
    return rowArray;
  }

  /**
   * Generates an array of Space objects along a diagonal from lower left to upper right
   * the supplied col, row indicate which diagonal to return
   * @param {integer} col - specifies which column
   * @param {integer} row - specifies which row
   */
  currentUpDiagonal(col, row) {
    const upArray = [];
    // get lower left corner coordinates of target diagonal
    for (col, row; col > 0 && row < ROWS - 1; col--, row++);
    for (col, row; col < COLUMNS && row >= 0; col++, row--) {
      upArray.push(this.spaces[col][row]);
    }
    return upArray;
  }
  
  /**
   * Generates an array of Space objects along a diagonal from upper left to lower right
   * the supplied col, row indicate which diagonal to return
   * @param {integer} col - specifies column
   * @param {integer} row - specifies row
   */
  currentDownDiagonal(col, row) {
    const downArray = [];
    for (col, row; col > 0 && row > 0; col--, row--);
    for (col, row; col < COLUMNS && row < ROWS; col++, row++) {
      downArray.push(this.spaces[col][row]);
    }
    return downArray;
  }
}
