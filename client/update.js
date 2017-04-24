const update = (data) => {
  if(!cars[data.hash]) {
    cars[data.hash] = data;
    return;
  }
  
  if((cars[data.hash].lastUpdate >= data.lastUpdate) || (data.hash === hash)) {
    return;
  }

  const car = cars[data.hash];
  car.x = data.x;
  car.y = data.y;
  car.prevX = data.prevX;
  car.prevY = data.prevY;
  car.destX = data.destX;
  car.destY = data.destY;
  car.moveLeft = data.moveLeft;
  car.moveRight = data.moveRight;
  car.moveDown = data.moveDown;
  car.moveUp = data.moveUp;
  car.alpha = 0.05;
  car.velocity = data.velocity;
  car.acceleration = data.acceleration;
  car.drag = car.drag;
  car.state = car.state;
  car.fillStyle = car.fillStyle;
  car.size = car.size;
  car.health = car.health;
  car.pull = car.pull;
};


const hostLeft = () => {
  socket.disconnect();
  cancelAnimationFrame(animationFrame);
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = 'white';
  ctx.font = '48px serif';
  ctx.fillText('Host left.', 20, 100);
  ctx.fillText('Reload for a new game.', 20, 200);  
};

const removeUser = (data) => {
  if(cars[data]) {
    console.log('Removed User: ')
    console.log(cars[data]);
    delete cars[data];
  }
};

const confirmHost = () => {
  isHost = true;

  socket.on('movementUpdate', movementUpdate);
  socket.on('hostAcknowledge', acknowledgeUser);

};

const setUser = (data) => {
  hash = data.hash;
  cars[hash] = data;
  console.log('This User:')
  console.log(cars[hash]);

  if(isHost) {
    hosted[hash] = data;
  }
  gameState === GAME_STATE.INGAME;
  requestAnimationFrame(drawCars);
};

const playerDeath = (data) => {
  delete cars[data];

  if(data === hash) {
    socket.disconnect();
    cancelAnimationFrame(animationFrame);
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = 'white';
    ctx.font = '48px serif';
    ctx.fillText('You died', 20, 100);
    ctx.fillText('Reload for a new game.', 20, 200); 
  }
};