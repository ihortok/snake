$(document).ready(function () {

    //========================= snake =========================//

    /*===========================================
       vars
    ===========================================*/

    for (var row = 0; row < 34; row++) {
        $('.gameScreen__table').append('<div class="gameScreen__row"></div>');
        for (var cell = 0; cell < 60; cell++) {
            $('.gameScreen__row:eq(' + row + ')').append('<div class="gameScreen__cell"></div>');
        }
    }

    var snake = {
        length: 3,
        direction: 'right',
        speed: 500
    };

    var gameTableX = $('.gameScreen__row:eq(0) .gameScreen__cell').length - 1;
    var gameTableY = $('.gameScreen__row').length - 1;

    var snakeCoordinates = [];
    var directions = [[-1, 0, 'left'], [0, -1, 'up'], [1, 0, 'right'], [0, 1, 'down']];
    var keyboard = [[37, 'left'], [38, 'up'], [39, 'right'], [40, 'down']];
    var edges = [[0, gameTableX, 'left'], [gameTableX, 0, 'right'], [0, gameTableY, 'up'], [gameTableY, 0, 'down']];

    function start() {
        for (var i = 0; i < snake.length; i++) {
            if (i > 0) {
                $('.gameScreen__row:eq(' + Math.round(gameTableY / 2) + ') .gameScreen__cell:eq(' + (Math.round(gameTableX / 2) - i) + ')').addClass('snake').attr('title', i);
            } else {
                $('.gameScreen__row:eq(' + Math.round(gameTableY / 2) + ') .gameScreen__cell:eq(' + (Math.round(gameTableX / 2) - i) + ')').addClass('snake snakeHead').attr('title', i);
            }
        }
    }

    start();

    function stop() {
        $('.snake').removeAttr('title');
        $('.gameScreen__cell').removeClass('snake snakeHead');
        snake.length = 3;
        start();
    }

    function coordinates() {
        for (var i = 0; i < snake.length; i++) {
            var snakeHeadRow = $('.gameScreen__table').find('.snake[title=' + i + ']').parent();
            var snakeHeadY = $('.gameScreen__row').index(snakeHeadRow);
            var snakeHeadCell = $('.gameScreen__table').find('.snake[title=' + i + ']');
            var snakeHeadX = $('.gameScreen__row:eq(' + snakeHeadY + ') .gameScreen__cell').index(snakeHeadCell);
            snakeCoordinates.push([snakeHeadX, snakeHeadY]);
        }
    }

    coordinates();

    /*===========================================
       functions
    ===========================================*/

    function snakeMove() {

        var edge = false;

        for (var i = 0; i < edges.length; i++) {
            if (i < 2) {
                if (snake.direction == edges[i][2] && snakeCoordinates[0][0] == edges[i][0]) {
                    snakeCoordinates.unshift([edges[i][1], snakeCoordinates[0][1]]);
                    //console.log(snakeCoordinates);
                    edge = true;
                    break;
                }
            } else {
                if (snake.direction == edges[i][2] && snakeCoordinates[0][1] == edges[i][0]) {
                    snakeCoordinates.unshift([snakeCoordinates[0][0], edges[i][1]]);
                    //console.log(edges[i][1]);
                    //console.log(snakeCoordinates);
                    edge = true;
                    break;
                }
            }
        }

        if (!edge) {
            for (var i = 0; i < 4; i++) {
                if (snake.direction == directions[i][2]) {
                    snakeCoordinates.unshift([snakeCoordinates[0][0] + directions[i][0], snakeCoordinates[0][1] + directions[i][1]]);
                    break;
                }
            }
        }

        if (!$('.snakeHead').hasClass('food')) {
            snakeCoordinates.pop();
            $('.gameScreen__cell[title=' + (snake.length - 1) + ']').removeClass('snake');
            $('.gameScreen__cell[title=' + (snake.length - 1) + ']').removeAttr('title');
        } else {
            $('.gameScreen__cell[title="0"]').removeClass('food');
            foodAppearence();
        }

        $('.gameScreen__cell[title="0"]').removeClass('snakeHead');
        snake.length = snakeCoordinates.length;

        for (var i = 0; i < snake.length; i++) {
            if (i > 0) {
                $('.gameScreen__row:eq(' + snakeCoordinates[i][1] + ') .gameScreen__cell:eq(' + snakeCoordinates[i][0] + ')').addClass('snake').attr('title', i);
            } else {
                $('.gameScreen__row:eq(' + snakeCoordinates[i][1] + ') .gameScreen__cell:eq(' + snakeCoordinates[i][0] + ')').addClass('snake snakeHead').attr('title', i);
            }
        }
    }

    function foodAppearence() {
        var food = [Math.round(gameTableX * Math.random()), Math.round(gameTableY * Math.random())];
        $('.gameScreen__row:eq(' + food[1] + ') .gameScreen__cell:eq(' + food[0] + ')').addClass('food');
    }

    foodAppearence();

    var startCheck = false;
    var pauseCheck = false;

    var snakeTimer;

    $('#start').click(function () {
        if (!startCheck) {
            snakeCoordinates = [];
            coordinates();
            snakeTimer = setInterval(function () {
                snakeMove();
            }, 100);
            $('#start').text('stop');
            $('#pause').prop('disabled', false);
            startCheck = true;
        } else {
            clearInterval(snakeTimer);
            $('#start').text('start');
            $('#pause').prop('disabled', true).text('pause');
            stop();
            pauseCheck = false;
            startCheck = false;
        }
    });

    $('#pause').click(function () {
        if (!pauseCheck) {
            clearInterval(snakeTimer);
            $('#pause').text('play');
            pauseCheck = true;
        } else {
            snakeTimer = setInterval(function () {
                snakeMove();
            }, 100);
            $('#pause').text('pause');
            pauseCheck = false;
        }
    });

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