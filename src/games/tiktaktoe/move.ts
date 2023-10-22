export default class Move {
    child_moves: Move[];
    winning: number;
    winning_children: number;

    constructor(public board: number[][], public bot_turn: boolean, public attain: number[]) {
        this.child_moves = [];
        this.winning = this.check_winner();
        this.winning_children = -1;
    }

    generate_moves() {
        let current_player = this.bot_turn ? 2 : 1;

        // Create a deep copy of the board
        let fill_up_board = JSON.parse(JSON.stringify(this.board));
        while (this.find_empty(fill_up_board)[0] != -1) {
            let empty_index = this.find_empty(fill_up_board);
            fill_up_board[empty_index[0]][empty_index[1]] = current_player;
            let new_move = JSON.parse(JSON.stringify(this.board))
            new_move[empty_index[0]][empty_index[1]] = current_player;
            let new_move_obj = new Move(new_move, !this.bot_turn, empty_index);
            this.child_moves.push(new_move_obj);
            if (new_move_obj.winning == 0) new_move_obj.generate_moves();
        }
        this.count_winning();
    }

    count_winning(): number {
        if (this.winning_children != -1) return this.winning_children;

        let winning = 0;
        for (let child_move of this.child_moves) {
            switch (child_move.check_winner()) {
                case 1:
                    if (!this.bot_turn) {
                        return 0;
                    }
                    break;

                case 0:
                    winning += child_move.count_winning();
                    break;

                case 2:
                    winning++;

                default:
                    break;
            }
        }
        this.winning_children = winning;
        return winning;
    }

    find_best_move() {
        this.generate_moves();
        
        let best_move = this.child_moves[0];
        for (let move of this.child_moves) {
            if (move.winning == 2) return move.attain;

            if (move.winning_children > best_move.winning_children) {
                best_move = move;
            }
        }
        return best_move.attain;
    }

    check_winner() {
        const match = (array: number[]) => {
            let current = -1;
            for (let num of array) {
                if (current == -1 && num != 0) current = num;
                if (num != current) return false;
            }
            return true;
        }

        for (let y of this.board) {
            if (match(y)) return y[0];
        }

        for (let x = 0; x < this.board.length; x++) {
            let current = -1;
            let won = true;
            for (let y = 0; y < this.board.length; y++) {
                if (current == -1 && this.board[y][x] != 0) current = this.board[y][x];
                if (current != this.board[y][x]) won = false; 
            }

            if (won) return current;
        }

        let diagonal1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
        let diagonal2 = [this.board[0][2], this.board[1][1], this.board[2][0]];
        if (match(diagonal1)) return diagonal1[0];
        if (match(diagonal2)) return diagonal2[0];

        if (this.find_empty(this.board)[0] == -1) return -1;

        return 0;
    }

    find_empty(board: number[][]): number[] {
        for (let y = 0; y < board.length; y++) {
            if (board[y].indexOf(0)!= -1) {
                return [y, board[y].indexOf(0)];
            }
        }
        return [-1]
    }
}