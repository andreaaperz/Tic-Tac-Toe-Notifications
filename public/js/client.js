var socket = io('http://localhost:3000')
var gridGato = new Array(3);
var valores = new Array(3);
var turno = "Circulo";

var txtUser = document.getElementById('txtUser')
var login = () => {
    var user = txtUser.value;

    if (user.trim() != '') {
        socket.emit('login', user.trim())
    }
}

socket.on("Jugador1", function () {
    $.gritter.add({
        title: 'Jugador uno conectado',
        sticky: false,
        time: 3000,
        image: 'https://image.flaticon.com/icons/svg/752/752664.svg',
    });
})

socket.on("Jugador2", function (data) {
    $.gritter.add({
        title: 'Jugador dos conectado',
        sticky: false,
        time: 3000,
        image: 'https://image.flaticon.com/icons/svg/752/752665.svg',
    });
})

socket.on("Observadores", function (data) {
    $.gritter.add({
        title: 'Observadores',
        text: data,
        sticky: false,
        time: 3000,
        image: 'https://image.flaticon.com/icons/svg/556/556122.svg',
    });
})

socket.on("desconexion", function (data) {
    console.log(data);
})

socket.on("Cambio", function (data, x, y){
    valores = data;
    CambioTile(x, y);
})


var CambioTile = (x, y) => {
    valores[x][y] = turno;

    if (turno == "Circulo") {
        turno = "Cruz";
        gridGato[x][y].src = "./img/circle.png";
    }
    else {
        turno = "Circulo"
        gridGato[x][y].src = "./img/cross.png";
    }
    validar();
}

var ganador = (jugador) => {
    $.gritter.add({
        title: 'Ha ganado el jugador',
        text: jugador,
        sticky: false,
        time: 3000,
        image: 'https://image.flaticon.com/icons/svg/419/419952.svg',
    });
}

gridGato[0] = new Array(3);
gridGato[1] = new Array(3);
gridGato[2] = new Array(3);

valores[0] = new Array(3);
valores[1] = new Array(3);
valores[2] = new Array(3);

console.log(gridGato)

gridGato[0][0] = document.getElementById("img00");
gridGato[0][1] = document.getElementById("img01");
gridGato[0][2] = document.getElementById("img02");
gridGato[1][0] = document.getElementById("img10");
gridGato[1][1] = document.getElementById("img11");
gridGato[1][2] = document.getElementById("img12");
gridGato[2][0] = document.getElementById("img20");
gridGato[2][1] = document.getElementById("img21");
gridGato[2][2] = document.getElementById("img22");

var tile = function (x, y, click = true) {
    if (click) {
        dato = {
            x: x,
            y: y
        }
    }
    gridGato[x][y].onclick = function () {};
    valores[x][y] = turno;
    if (turno == "Circulo") {
        turno = "Cruz";
        gridGato[x][y].src = "./img/circle.png";
    } else {
        turno = "Circulo"
        gridGato[x][y].src = "./img/cross.png";
    }
    socket.emit("Actualizar", valores, x, y);
    validar();
}

var validar = function () {
    if (valores[0][0] == valores[0][1] &&
        valores[0][1] == valores[0][2] &&
        valores[0][2] != null) {
        ganador("" + valores[0][0]);
        setTimeout("location.href='http://localhost:3000'", 5000)
    }
    if (valores[1][0] == valores[1][1] &&
        valores[1][1] == valores[1][2] &&
        valores[1][2] != null) {
        ganador("" + valores[1][0]);
        setTimeout("location.href='http://localhost:3000'", 5000)
    }
    if (valores[2][0] == valores[2][1] &&
        valores[2][1] == valores[2][2] &&
        valores[2][2] != null) {
        ganador("" + valores[2][0]);
        setTimeout("location.href='http://localhost:3000'", 5000)
    }
    if (valores[0][0] == valores[1][0] &&
        valores[1][0] == valores[2][0] &&
        valores[2][0] != null) {
        ganador("" + valores[0][0]);
        setTimeout("location.href='http://localhost:3000'", 5000)
    }
    if (valores[0][1] == valores[1][1] &&
        valores[1][1] == valores[2][1] &&
        valores[2][1] != null) {
        ganador("" + valores[0][1]);
        setTimeout("location.href='http://localhost:3000'", 5000)
    }
    if (valores[0][2] == valores[1][2] &&
        valores[1][2] == valores[2][2] &&
        valores[2][2] != null) {
        ganador("" + valores[2][2]);
        setTimeout("location.href='http://localhost:3000'", 5000)
    }
    if (valores[0][0] == valores[1][1] &&
        valores[1][1] == valores[2][2] &&
        valores[2][2] != null) {
        ganador("" + valores[0][0]);
        setTimeout("location.href='http://localhost:3000'", 5000)
    }
    if (valores[0][2] == valores[1][1] &&
        valores[1][1] == valores[2][0] &&
        valores[2][0] != null) {
        ganador("" + valores[0][2]);
        setTimeout("location.href='http://localhost:3000'", 5000)
    }
}