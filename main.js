var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//http://localhost:8080


var fireRate = 100;
var nextFire = 0;
var playerHealth = 100;
var playerXP = 0;
var gameXPsteps = 15;
var playerLevel = 0;


function preload() {
	
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.image('bullet', 'assets/bullet43.png');
}

function create() {
	
    game.physics.startSystem(Phaser.Physics.ARCADE);    
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
	
	
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
	
	
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
	
	
    player = game.add.sprite(32, game.world.height - 150, 'dude');
	player.anchor.set(0.5);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.body.gravity.y = 1400;
	
	
	cursors = game.input.keyboard.createCursorKeys();
	
	
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
	bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
	player.body.allowRotation= false;
/*	weapon = game.add.weapon(30, 'bullet');

	weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;


    weapon.bulletSpeed = 600;
    weapon.fireRate = 100;
	weapon.trackSprite(player, 5, 5, false);
	player.body.allowRotation= false;
	
	

    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.A);
	fireButton2 = game.input.keyboard.addKey(Phaser.KeyCode.W);
	fireButton3 = game.input.keyboard.addKey(Phaser.KeyCode.D);
	fireButton4 = game.input.keyboard.addKey(Phaser.KeyCode.S);
*/

	jumpButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

function update() {
	game.physics.arcade.collide(player, platforms);
	player.body.velocity.x = 0;
	
	playerLevel = Math.log(playerXP, gameXPsteps);
	console.log('level: ' + Math.floor(playerLevel));
	
	if (game.input.activePointer.isDown)
    {
	
      fire();
    }
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
		
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (jumpButton.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -500;
    }
	
	
	/*
	if (fireButton.isDown)
    {
		weapon.fireAngle = 180;
        weapon.fire();
    }
	if (fireButton2.isDown)
    {
		if(fireButton3.isDown){
		weapon.fireAngle = -45;
		weapon.fire();}
		
		weapon.fireAngle = -90;
        weapon.fire();
    }
	if (fireButton3.isDown)
    {
		weapon.fireAngle = 0;
        weapon.fire();
    }
	if (fireButton4.isDown)
    {
		weapon.fireAngle = -270;
        weapon.fire();
    }*/
	
}
function fire() {
	playerXP+=10;
    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(player.x - 8, player.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }
}