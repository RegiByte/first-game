const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300,
        debug: false,
      },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);


function preload() {
  this.load.image('sky', '/assets/sky.png');
  this.load.image('ground', '/assets/platform.png');
  this.load.image('star', '/assets/star.png');
  this.load.image('bomb', '/assets/bomb.png');
  this.load.spritesheet('dude', '/assets/dude.png', {frameWidth: 32, frameHeight: 48});
}

var platforms;
var player;
var cursors;

function createPlayer() {
  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(300);
}

function createAnimations() {
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn',
    frames: [
      {
        key: 'dude',
        frame: 4,
      },
    ],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', {
      start: 5,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });
}

function createPlatforms() {
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
}

function addCollision() {
  this.physics.add.collider(player, platforms);
}

function create() {
  this.add.image(400, 300, 'sky');
  createPlatforms.call(this);
  createPlayer.call(this);
  createAnimations.call(this);
  addCollision.call(this);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-630);
  }
}