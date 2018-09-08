$(document).ready(function () {

    //========================= snake =========================//

    /*===========================================
       vars
    ===========================================*/

    var snake = {
        length: 3,
        direction: 'right',
        speed: 500
    };

    var snakeCoordinates = [];
    var directions = [['left', -1, 0], ['up', 0, -1], ['right', 1, 0], ['down', 0, 1]];
    var keyboard = [[37, 'left'], [38, 'up'], [39, 'right'], [40, 'down']];

    var gameTableX = $('.gameScreen__row:eq(0) .gameScreen__cell').length;
    var gameTableY = $('.gameScreen__row').length;

    console.log(gameTableX);
    console.log(gameTableY);

    for (var i = 0; i < snake.length; i++) {
        if (i > 0) {
            $('.gameScreen__row:eq(' + Math.round(gameTableY/2) + ') .gameScreen__cell:eq(' + (Math.round(gameTableX/2) - i) + ')').addClass('snake').attr('title', i);
        } else {
            $('.gameScreen__row:eq(' + Math.round(gameTableY/2) + ') .gameScreen__cell:eq(' + (Math.round(gameTableX/2) - i) + ')').addClass('snake snakeHead').attr('title', i);
        }
    }

    for (var i = 0; i < snake.length; i++) {
        var snakeHeadRow = $('.gameScreen__table').find('.snake[title=' + i + ']').parent();
        var snakeHeadY = $('.gameScreen__row').index(snakeHeadRow);
        var snakeHeadCell = $('.gameScreen__table').find('.snake[title=' + i + ']');
        var snakeHeadX = $('.gameScreen__row:eq(' + snakeHeadY + ') .gameScreen__cell').index(snakeHeadCell);
        snakeCoordinates.push([snakeHeadX, snakeHeadY]);
    }

    /*===========================================
       functions
    ===========================================*/

    function snakeMove() {

        for (var i = 0; i < 4; i++) {
            if (snake.direction == directions[i][0]) {
                snakeCoordinates.unshift([snakeCoordinates[0][0] + directions[i][1], snakeCoordinates[0][1] + directions[i][2]]);
            }
        }

        $('.gameScreen__cell[title=' + (snake.length - 1) + ']').removeClass('snake');
        $('.gameScreen__cell[title=' + (snake.length - 1) + ']').removeAttr('title');
        $('.gameScreen__cell[title="0"]').removeClass('snakeHead');
        snakeCoordinates.pop();

        for (var i = 0; i < snake.length; i++) {
            if (i > 0) {
                $('.gameScreen__row:eq(' + snakeCoordinates[i][1] + ') .gameScreen__cell:eq(' + snakeCoordinates[i][0] + ')').addClass('snake').attr('title', i);
            } else {
                $('.gameScreen__row:eq(' + snakeCoordinates[i][1] + ') .gameScreen__cell:eq(' + snakeCoordinates[i][0] + ')').addClass('snake snakeHead').attr('title', i);
            }
        }
    }

    var snakeTimer = setInterval(function () {
        snakeMove();
    }, 500);

    $(document).keydown(function (e) {
        if ((e.keyCode == keyboard[0][0] && snake.direction == keyboard[2][1]) || (e.keyCode == keyboard[2][0] && snake.direction == keyboard[0][1]) || (e.keyCode == keyboard[1][0] && snake.direction == keyboard[3][1]) || (e.keyCode == keyboard[3][0] && snake.direction == keyboard[1][1])) {
            return;
        }

        for (var i = 0; i < 4; i++) {
            if (e.keyCode == keyboard[i][0]) {
                snake.direction = keyboard[i][1];
            }
        }
    });

});