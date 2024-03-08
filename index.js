document.addEventListener('DOMContentLoaded', () => {
    // variables
    const board_width = 7;
    const board_height = 6;
    const board_size = board_width * board_height;

    const board = create_board();
    const squares = document.querySelectorAll('.board div');
    const result = document.querySelector('#result');
    const whos_turn = document.querySelector('#current-player');
    
    let current_player = Math.floor(Math.random() * 2) + 1;

    // to help prevent board updating after a win
    let game_over = false;

    // 4 in a row options
    const win_options = [
        [0, 1, 2, 3],
        [41, 40, 39, 38],
        [7, 8, 9, 10],
        [34, 33, 32, 31],
        [14, 15, 16, 17],
        [27, 26, 25, 24],
        [21, 22, 23, 24],
        [20, 19, 18, 17],
        [28, 29, 30, 31],
        [13, 12, 11, 10],
        [35, 36, 37, 38],
        [6, 5, 4, 3],
        [0, 7, 14, 21],
        [41, 34, 27, 20],
        [1, 8, 15, 22],
        [40, 33, 26, 19],
        [2, 9, 16, 23],
        [39, 32, 25, 18],
        [3, 10, 17, 24],
        [38, 31, 24, 17],
        [4, 11, 18, 25],
        [37, 30, 23, 16],
        [5, 12, 19, 26],
        [36, 29, 22, 15],
        [6, 13, 20, 27],
        [35, 28, 21, 14],
        [0, 8, 16, 24],
        [41, 33, 25, 17],
        [7, 15, 23, 31],
        [34, 26, 18, 10],
        [14, 22, 30, 38],
        [27, 19, 11, 3],
        [35, 29, 23, 17],
        [6, 12, 18, 24],
        [28, 22, 16, 10],
        [13, 19, 25, 31],
        [21, 15, 9, 3],
        [20, 26, 32, 38],
        [36, 30, 24, 18],
        [5, 11, 17, 23],
        [37, 31, 25, 19],
        [4, 10, 16, 22],
        [2, 10, 18, 26],
        [39, 31, 23, 15],
        [1, 9, 17, 25],
        [40, 32, 24, 16],
        [9, 17, 25, 33],
        [8, 16, 24, 32],
        [11, 17, 23, 29],
        [12, 18, 24, 30],
        [1, 2, 3, 4],
        [5, 4, 3, 2],
        [8, 9, 10, 11],
        [12, 11, 10, 9],
        [15, 16, 17, 18],
        [19, 18, 17, 16],
        [22, 23, 24, 25],
        [26, 25, 24, 23],
        [29, 30, 31, 32],
        [33, 32, 31, 30],
        [36, 37, 38, 39],
        [40, 39, 38, 37],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 16, 23, 30],
        [10, 17, 24, 31],
        [11, 18, 25, 32],
        [12, 19, 26, 33],
        [13, 20, 27, 34]
    ]

    // make the board
    function create_board() {
        let board = document.querySelector('.board');

        for(let i = 0; i < board_size; i++) {
            let board_element = document.createElement('div');
            board.appendChild(board_element);
        }
    }



    // start game
    function start_game() {
        // display initial player's turn
        whos_turn.textContent = current_player;
    }



    // start the game when the DOM content is loaded
    start_game();
    


    // switch player turn
    function turn_order() {
        if(current_player === 1)
            current_player = 2;
        else
            current_player = 1;
        
        // update display of who's turn it is
        whos_turn.textContent = current_player;
    }



    // check if a player has won
    function check_win() {
        for(let i = 0; i < win_options.length; i++) {
            // 4 in a row check vars
            sq1 = squares[win_options[i][0]];
            sq2 = squares[win_options[i][1]];
            sq3 = squares[win_options[i][2]];
            sq4 = squares[win_options[i][3]];

            // check if player 1 has won
            if(sq1.classList.contains('player-1') && sq2.classList.contains('player-1') && sq3.classList.contains('player-1') && sq4.classList.contains('player-1')) {
                result.innerHTML = 'Game Over: Player 1 Wins';
                game_over = true;

            // check if player 2 has won
            } else if(sq1.classList.contains('player-2') && sq2.classList.contains('player-2') && sq3.classList.contains('player-2') && sq4.classList.contains('player-2')) {
                result.innerHTML = 'Game Over: Player 2 Wins';
                game_over = true;
            }
        }
    }



    // check for draw
    function check_draw() {
        let taken_squares = 0;

        // update counter
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('taken'))
                taken_squares++;
        }

        // is the board filled? then the game is over, it's a draw
        if (taken_squares === squares.length && !game_over) {
            result.innerHTML = 'Game Over: Draw';
            game_over = true;
        }
    }



    // piece movement and placement
    for(let i = 0; i < squares.length; i++) {
        squares[i].onclick = () => {
            // flag to prevent board updating after a player has won
            if(!game_over) {
                // i >= board_size - board_width for the bottom row
                // squares[i + board_width].classList.contains('taken') to see if one below it is taken
                // !squares[i].classList.contains('taken') for overwriting prevention
                if((i >= board_size - board_width || squares[i + board_width].classList.contains('taken')) && !squares[i].classList.contains('taken')) {
                    if(current_player == 1) {
                        squares[i].classList.add('taken');
                        squares[i].classList.add('player-1');
                    } else if(current_player == 2) {
                        squares[i].classList.add('taken');
                        squares[i].classList.add('player-2');
                    }

                    // update turn order
                    turn_order();
                    whos_turn.innerHTML = current_player;
                }

                // check if someone has won
                check_win();

                // check if there is a draw
                check_draw();
            }
        }
    }
});