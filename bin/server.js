var io = require('socket.io')();
var cont = 0;
var valores = new Array(3);

valores[0] = new Array(3);
valores[1] = new Array(3);
valores[2] = new Array(3);

io.sockets.on('connection', function (socket) {
   console.log('NUEVO CLIENTE CONECTADO' + socket.id)

   cont++;

   if (cont === 2) {
      io.sockets.emit('Jugador2', cont);
   }

   if (cont >= 3) {
      io.sockets.emit('Observadores', cont-2);
   }

   if (cont === 1) {
      io.sockets.emit('Jugador1');
   }

   socket.on('login', (data) => {
      console.log(data)
      socket.broadcast.emit('nuevoUsuario', data);
   });

   socket.on("Actualizar", function (data, x, y) {
      socket.broadcast.emit('Cambio', data, x, y);
   });

   //DISMMINUCION DEL CONTADOR
   socket.on("disconnect", function () {
      cont--;
   })
})


module.exports = io;