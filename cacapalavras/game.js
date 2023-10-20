function createWordSearch(words) {
    const boardSize = 16;
    let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(' '));
    let selectedWords = [];

    // Seleciona 8 palavras aleatoriamente
    for (let i = 0; i < 8; i++) {
        let randomIndex = Math.floor(Math.random() * words.length);
        let word = words[randomIndex].trim();
        if (!selectedWords.includes(word) && word.length <= boardSize) {
            selectedWords.push(word);
            words.splice(randomIndex, 1);
        } else {
            i--;
        }
    }

    // Coloca as palavras selecionadas no tabuleiro
    selectedWords.forEach(word => {
        let placed = false;
        while (!placed) {
            let direction = Math.floor(Math.random() * 4); // 0: right, 1: down, 2: diagonalRight, 3: diagonalLeft
            let row = Math.floor(Math.random() * boardSize);
            let col = Math.floor(Math.random() * boardSize);

            if (canPlaceWord(board, word, row, col, direction)) {
                placeWord(board, word, row, col, direction);
                placed = true;
            }
        }
    });

    // Preenche os espaços vazios com letras aleatórias
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === ' ') {
                board[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }

    displayBoard(board);
}

function canPlaceWord(board, word, row, col, direction) {
    if (direction === 0 && col + word.length > board[0].length) return false;
    if (direction === 1 && row + word.length > board.length) return false;
    if (direction === 2 && (col + word.length > board[0].length || row + word.length > board.length)) return false;
    if (direction === 3 && (col - word.length < 0 || row + word.length > board.length)) return false;

    for (let i = 0; i < word.length; i++) {
        let currentRow = row;
        let currentCol = col;

        if (direction === 0) currentCol += i;
        else if (direction === 1) currentRow += i;
        else if (direction === 2) {
            currentCol += i;
            currentRow += i;
        } else if (direction === 3) {
            currentCol -= i;
            currentRow += i;
        }

        if (board[currentRow][currentCol] !== ' ' && board[currentRow][currentCol] !== word[i]) {
            return false;
        }
    }

    return true;
}

function placeWord(board, word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        if (direction === 0) board[row][col + i] = word[i];
        else if (direction === 1) board[row + i][col] = word[i];
        else if (direction === 2) {
            board[row + i][col + i] = word[i];
        } else if (direction === 3) {
            board[row + i][col - i] = word[i];
        }
    }
}

function displayBoard(board) {
    let boardElem = document.getElementById('board');
    boardElem.innerHTML = '';
    board.forEach(row => {
        let rowElem = document.createElement('div');
        row.forEach(cell => {
            let cellElem = document.createElement('span');
            cellElem.innerText = cell;
            rowElem.appendChild(cellElem);
        });
        boardElem.appendChild(rowElem);
    });
}


