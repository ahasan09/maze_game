
let mazeDiv = document.getElementById("mazeDiv");

function newVector() {
    return [
        "WWWWWWWWWWWWWWWWWWWWW",
        "W   W     W     W W W",
        "W W W WWW WWWWW W W W",
        "W W W   W     W W   W",
        "W WWWWWWW W WWW W W W",
        "W         W     W W W",
        "W WWW WWWWW WWWWW W W",
        "W W   W   W W     W W",
        "W WWWWW W W W WWW W F",
        "S     W W W W W W WWW",
        "WWWWW W W W W W W W W",
        "W     W W W   W W W W",
        "W WWWWWWW WWWWW W W W",
        "W       W       W   W",
        "WWWWWWWWWWWWWWWWWWWWW",
    ];
}

let map = newVector();
let player = {
    x: 0,
    y: 9
};

function replaceStr(str, pos, value) {
    var arr = str.split('');
    arr[pos] = value;
    return arr.join('');
}

function updateMap() {
    for (let y = 0; y < map.length; y++) {
        map[y] = map[y].replace("S", " ");
        if (y === player.y) {
            map[y] = replaceStr(map[y], player.x, 'S');
        }
    }
}

function canMove(x, y) {
    return (y >= 0) && (y < map.length) && (x >= 0) && (x < map[y].length) && (map[y][x] != "W");
}

function playerMove(e) {
    let isMovable = false;
    if ((e.which == 38) && canMove(player.x, player.y - 1))//Up arrow
    {
        isMovable = true;
        player.y--;
    }
    else if ((e.which == 40) && canMove(player.x, player.y + 1)) // down arrow
    {
        isMovable = true;
        player.y++;
    }
    else if ((e.which == 37) && canMove(player.x - 1, player.y))//Left arrow
    {
        isMovable = true;
        player.x--;
    }
    else if ((e.which == 39) && canMove(player.x + 1, player.y))//Right arrow
    {
        isMovable = true;
        player.x++;
    }

    if (isMovable) {
        updateMap();
        draw();
        if (player.x == 20 && player.y == 8) {
            swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                title: 'Congratulations! You Win!',
                text: "Good Job!!",
                type: 'success',
                confirmButtonColor: '#8bc34a',
                confirmButtonText: 'Play again!',
                showCancelButton: true,
                cancelButtonColor: '#e91e63'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    resetGame();
                }
            })
        }
        e.preventDefault();
    }
}

function draw() {
    mazeDiv.innerHTML = "";
    for (let y = 0; y < map.length; y++) {
        let rowDiv = document.createElement('div');
        rowDiv.setAttribute('class', 'rowDiv');
        mazeDiv.appendChild(rowDiv);

        for (let x = 0; x < map[y].length; x++) {
            let cellDiv = document.createElement('div');
            let className = "cellDiv";
            let idName = x + "" + y;
            cellDiv.setAttribute('id', idName);
            const val = map[y][x];

            if (val === "S" || val === "F") {
                if (val === "S") {
                    let playerDiv = document.createElement('div');
                    playerDiv.setAttribute('id', 'player');
                    playerDiv.setAttribute('class', 'cellDiv player');
                    cellDiv.appendChild(playerDiv);
                }
            }
            else if (val === "W") {
                className += " wall";
            }
            else {
                className += " hall";
            }

            cellDiv.setAttribute('class', className);
            rowDiv.appendChild(cellDiv);
        }
    }
}

function resetGame() {
    map = newVector();
    player.x = 0;
    player.y = 9;
    draw();
}

function initGame() {
    draw();
    document.getElementById("startNewGame").onclick = function () {
        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: 'Are you sure?',
            text: "Your progress will be Lost!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8bc34a',
            cancelButtonColor: '#e91e63',
            confirmButtonText: 'Yes, Restart Game!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                resetGame();
            }
        })
    }
}

document.addEventListener('keydown', playerMove);
initGame();


