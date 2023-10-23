import $ from "jquery";
// @ts-ignore
import tiktaktoe from "./tiktaktoe.html";
import Move from "./move";

export class TikTakToeGame {
    done: boolean;
    users_turn: boolean;
    board: number[][];
    old_body: JQuery<HTMLElement>;

    constructor() {
        this.done = false;
        this.users_turn = true;
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        this.old_body = $([]);
    }

    start(bot_start_probability: number, ignore_already_capchaed: boolean = false) {
        if ($(document.body).data("captchaing") && !ignore_already_capchaed) return;

        $(document.body).data("captchaing", true);

        this.old_body = $(document.body).children().clone();
        $(document.body).children().detach();
        
        $("body").append($("<div id='captcha'></div>"));
        const captcha = $(tiktaktoe);
        $("#captcha").replaceWith(captcha);

        // @ts-ignore
        const canvas: HTMLCanvasElement = $("#captcha-canvas").get(0);
        // @ts-ignore
        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        if (bot_start_probability >= Math.random()) {
            this.users_turn = false;
            let move = new Move(this.board, true, [-1, -1]);
            let best_move = move.find_best_move();
            this.board[best_move[0]][best_move[1]] = 2;
            this.users_turn = true;
        }
        
        window.requestAnimationFrame(() => this.tiktaktoe_game(ctx));

        $(canvas).on("click", event => {
            if (this.done) return;
            let hint = $("#hint-text");
            let x = event.clientX - event.target.offsetLeft;
            let y = event.clientY - event.target.offsetTop;

            let cellX = Math.floor(x / 140);
            let cellY = Math.floor(y / 140);
            
            if (!this.users_turn) return;

            if (this.board[cellY][cellX] == 0) {
                this.board[cellY][cellX] = 1;
                this.users_turn = false;
            } else {
                hint.text("This is not a valid cell");
                return;
            }

            let move = new Move(this.board, true, [cellY, cellY]);
            if (this.tiktaktoe_check_winner(move, hint)) return;

            let best_move = move.find_best_move();
            this.board[best_move[0]][best_move[1]] = 2;
            let bot_move = new Move(this.board, false, best_move);
            this.tiktaktoe_check_winner(bot_move, hint);
            this.users_turn = true;
        });
        return true;
    }

    tiktaktoe_check_winner(move: Move, hint: JQuery<HTMLElement>) {
        let winner = move.check_winner();

        switch (winner) {
            case -1:
                hint.text("Draw! Captcha passed");
                this.done = true;
                setTimeout(() => {
                    this.reset();
                }, 1000);
                return true;

            case 1:
                hint.text("Congrats you won! Captcha passed");
                this.done = true;
                setTimeout(() => {
                    this.reset();
                }, 1000);
                return true;

            case 2:
                hint.text("You lost! Captcha failed");
                $("#let-through").removeClass("hide-btn");
                $("#let-through").addClass("show-btn");
                $("#let-through").on("click", () => {
                    this.reset();
                });
                this.done = true;
                return false;

            default:
                return false;
        }
    }

    reset() {
        $("body").append($("<div id='body'></div>"));
        $("#body").replaceWith(this.old_body);
        $("#captcha").remove();
    }

    tiktaktoe_game(ctx: CanvasRenderingContext2D) {
        this.tiktaktoe_draw(ctx);
        if (!this.done) window.requestAnimationFrame(() => this.tiktaktoe_game(ctx));
    }

    tiktaktoe_draw(ctx: CanvasRenderingContext2D) {
        ctx.fillRect(0, 0, 420, 420);
        for (let i = 1; i < 3; i++) {
            this.draw_line(ctx, 140 * i, 0, 140 * i, 420);
            this.draw_line(ctx, 0, 140 * i, 420, 140 * i);
        }
        for (let y = 0; y < this.board.length; y++) {
            for (let x = 0; x < this.board[y].length; x++) {
                switch (this.board[y][x]) {
                    case 1:
                        this.draw_circle(ctx, x * 140 + 70, y * 140 + 70, 50);
                        break;

                    case 2:
                        this.draw_cross(ctx, x * 140 + 70, y * 140 + 70);
                        break;

                    default:
                        break;
                }
            }
        }
    }

    draw_cross(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number
    ) {
        ctx.beginPath();
        ctx.moveTo(x - 50, y - 50);
        ctx.lineTo(x + 50, y + 50);
        ctx.moveTo(x + 50, y - 50);
        ctx.lineTo(x - 50, y + 50);
        ctx.stroke();
    }

    draw_circle(
        ctx: CanvasRenderingContext2D,
        centerX: number,
        centerY: number,
        radius: number
    ) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }

    draw_line(
        ctx: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}