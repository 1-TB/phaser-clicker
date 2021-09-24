var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    var progress = this.add.graphics();
    this.load.on('progress', function (value) {
        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);
    });

    this.load.on('complete', function () {
        progress.destroy();
    });
    //this.load.bitmapFont('atari-classic', 'assets/fonts/bitmap/atari-classic.png', 'assets/fonts/bitmap/atari-classic.xml');
    //this.load.spritesheet('spri', 'assets/spritesheet.png', { frameWidth: 97, frameHeight: 59 });
    //this.load.once('filecomplete', postLoad, this);
    this.load.image('bg', 'assets/main.png');
    this.load.audio('bgmusic', ['assets/backgroundmusic.mp3']);
    this.load.image('forest-tree', 'assets/foresttree.jpg');
    this.load.image('forest-green', 'assets/pixelforest.png');
    this.load.image('forest-back', 'assets/parallax_forest_pack/layers/parallax-forest-back-trees.png');
    this.load.image('forest-lights', 'assets/parallax_forest_pack/layers/parallax-forest-lights.png');
    this.load.image('forest-middle', 'assets/parallax_forest_pack/layers/parallax-forest-middle-trees.png');
    this.load.image('forest-front', 'assets/parallax_forest_pack/layers/parallax-forest-front-trees.png');
    this.load.image('killer_bot', 'assets/newenemy/tile000.png');
    this.load.image('tank', 'assets/newenemy/tile004.png');
    this.load.image('death_ship', 'assets/newenemy/tile008.png');
    this.load.image('mega_mech', 'assets/newenemy/tile012.png');
    this.load.image('doom_bug', 'assets/newenemy/tile020.png');
    this.load.image('evil_alien', 'assets/newenemy/tile024.png');
    this.load.image('r_robot', 'assets/newenemy/tile028.png');
    this.load.image('black', 'assets/black.jpg');
    this.load.image('aerocephal', 'assets/allacrost_enemy_sprites/aerocephal.png');
    this.load.image('arcana_drake', 'assets/allacrost_enemy_sprites/arcana_drake.png');
    this.load.image('aurum-drakueli', 'assets/allacrost_enemy_sprites/aurum-drakueli.png');
    this.load.image('bat', 'assets/allacrost_enemy_sprites/bat.png');
    this.load.image('daemarbora', 'assets/allacrost_enemy_sprites/daemarbora.png');
    this.load.image('deceleon', 'assets/allacrost_enemy_sprites/deceleon.png');
    this.load.image('demonic_essence', 'assets/allacrost_enemy_sprites/demonic_essence.png');
    this.load.image('dune_crawler', 'assets/allacrost_enemy_sprites/dune_crawler.png');
    this.load.image('green_slime', 'assets/allacrost_enemy_sprites/green_slime.png');
    this.load.image('nagaruda', 'assets/allacrost_enemy_sprites/nagaruda.png');
    this.load.image('rat', 'assets/allacrost_enemy_sprites/rat.png');
    this.load.image('scorpion', 'assets/allacrost_enemy_sprites/scorpion.png');
    this.load.image('skeleton', 'assets/allacrost_enemy_sprites/skeleton.png');
    this.load.image('snake', 'assets/allacrost_enemy_sprites/snake.png');
    this.load.image('spider', 'assets/allacrost_enemy_sprites/spider.png');
    this.load.image('stygian_lizard', 'assets/allacrost_enemy_sprites/stygian_lizard.png');

    this.load.image('gold_coin', 'assets/496_RPG_icons/I_GoldCoin.png');
    this.load.image('save', 'assets/save.png');
    this.load.image('mutebutton', 'assets/mutebutton.png');
    this.load.image('on', 'assets/toggle-on.png');
    this.load.image('off', 'assets/toggle-off.png');

    this.load.image('cannon', 'assets/496_RPG_icons/I_Cannon01.png');
    this.load.image('lemon', 'assets/496_RPG_icons/I_C_Lemon.png');
    this.load.image('dagger', 'assets/496_RPG_icons/W_Dagger002.png');
    this.load.image('swordIcon1', 'assets/496_RPG_icons/S_Sword15.png');
    this.load.spritesheet('button', 'assets/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
    this.load.bitmapFont('nokia', 'assets/nokia16black.png', 'assets/nokia16black.xml');   
           
}

function makeButton(name, index)
{
    var button = this.add.image(120, 100 + index*55, 'button', 1).setInteractive();
    button.setData('index', index);
    button.setScale(2.5, 2.5);

    var text = this.add.bitmapText(button.x - 30, button.y - 8, 'nokia', name, 16);
    text.x += (button.width - text.width) / 2;
}

// vars
var bgmusic;
var levelKills = 0;
var level = 1;
var player = {
    clickDmg: 1,
    gold: 50,
    dps: 0
};
var levelKillsRequired = 10;
var playbgmusic =true;
function create () { 
   if(playbgmusic == true){
    bgmusic = this.sound.add('bgmusic').play();
    }else{
    bgmusic.pause();
    }
    this.add.image(400, 300, 'bg').setScale(1);

    var text = this.add.text(80, 10, '', { font: '20px Courier', fill: '#29EDC0' });

    text.setText([
        'Level: ' + level,
        'Level Kills: ' + levelKills
    ]);
//upgrade menu
    var upgradeButtonsData = [
        {icon: 'dagger', name: 'Attack', level: 0, cost: 5, purchaseHandler: function(button, player) {
            player.clickDmg += 1;
        }},
        {icon: 'swordIcon1', name: 'Auto-Attack', level: 0, cost: 25, purchaseHandler: function(button, player) {
            player.dps += 5;
        }},
        {icon: 'gold_coin', name: 'Minions', level: 0, cost: 100, purchaseHandler: function(button, player) {
            player.dps += 10;
        }},
         {icon: 'cannon', name: 'Auto Cannon', level: 0, cost: 500, purchaseHandler: function(button, player) {
            player.dps += 30;
        }},
            {icon: 'lemon', name: 'Powerful Lemon', level: 0, cost: 1000, purchaseHandler: function(button, player) {
            player.dps += 70;
        }}
    ];
let i = 0;
for (n = 0; n < upgradeButtonsData.length; n++){
    makeButton.call(this, upgradeButtonsData[i].name, i);
    this.add.image(45, 100+ i*55, upgradeButtonsData[i].icon).setScale(1);
    i++;
}

//monsters
var monsterData = [
    {name: 'Tank',              image: 'tank',              maxHealth: 10},
    {name: 'Death Ship',        image: 'death_ship',        maxHealth: 20},
    {name: 'Mega Mech',         image: 'mega_mech',         maxHealth: 30},
    {name: 'Doom Bug',          image: 'doom_bug',          maxHealth: 5},
    {name: 'Evil Alien',        image: 'evil_alien',        maxHealth: 10},
    {name: 'R Robot',           image: 'r_robot',           maxHealth: 10},
    {name: 'Killer Bot',        image: 'killer_bot',        maxHealth: 15},
    {name: 'Dune Crawler',      image: 'dune_crawler',      maxHealth: 8},
    {name: 'Green Slime',       image: 'green_slime',       maxHealth: 3},
    {name: 'Nagaruda',          image: 'nagaruda',          maxHealth: 13},
    {name: 'Rat',               image: 'rat',               maxHealth: 2},
    {name: 'Scorpion',          image: 'scorpion',          maxHealth: 2},
    {name: 'Skeleton',          image: 'skeleton',          maxHealth: 6},
    {name: 'Snake',             image: 'snake',             maxHealth: 4},
    {name: 'Spider',            image: 'spider',            maxHealth: 4},
    {name: 'Stygian Lizard',    image: 'stygian_lizard',    maxHealth: 20}
];
var monster;


var monsters = this.add.group();
i = 0;
for (n = 0; n < monsterData.length; n++){
    
     monster = monsters.create(3000, this.centerY, monsterData[n].image);
    monster.maxHealth = monsterData[n].maxHealth;
    monster.details = monsterData[n];
    monster.inputEnabled = true;
 
    monster.on('pointerdown', function (pointer) { onClickMonster.call;
    });

    // hook into health and lifecycle events
    //monster.onKilled(state.onKilledMonster, state);
    //monster.events.onRevived.add(state.onRevivedMonster, state);

    monster.setScale(2);
}


var children = monsters.getChildren();
this.currentMonster = getRandom(children);

this.currentMonster.x = 450; 
this.currentMonster.y = 300; 


var text = this.add.text(400, 10, '', { font: '20px Courier', fill: '#29EDC0' });

    text.setText([
        this.currentMonster.details.name,
        'hp:'+ this.currentMonster.maxHealth
    ]);



         function onDPS() {
            if (this.player.dps > 0) {
                if (this.currentMonster && this.currentMonster.alive) {
                    var dmg = this.player.dps / 10;
                    this.currentMonster.damage(dmg);
                    // update the health text
                    this.monsterHealthText.text = this.currentMonster.alive ? Math.round(this.currentMonster.health) + ' HP' : 'DEAD';
                }
            }
        }
       function onUpgradeButtonClick(button, pointer) {
            // make this a function so that it updates after we buy
            function getAdjustedCost() {
                return Math.ceil(button.details.cost + (button.details.level * 1.46));
            }
    
            if (this.player.gold - getAdjustedCost() >= 0) {
                this.player.gold -= getAdjustedCost();
                this.playerGoldText.text = 'Gold: ' + this.player.gold;
                button.details.level++;
                button.text.text = button.details.name + ': ' + button.details.level;
                button.costText.text = 'Cost: ' + getAdjustedCost();
                button.details.purchaseHandler.call(this, button, this.player);
            }
        }
        function onClickCoin(coin) {
            if (!coin.alive) {
                return;
            }
            // give the player gold
           
            this.player.gold += coin.goldValue;
            // update UI
            this.playerGoldText.text = 'Gold: ' + this.player.gold;
            
            // remove the coin
            coin.kill();
        }
        function onKilledMonster(monster) {
            // move the monster off screen again
            monster.position.set(1000, this.centerY);
            
            
            var coin;
            // spawn a coin on the ground
            coin = this.coins.getFirstExists(false);
            coin.reset(this.centerX + this.rnd.integerInRange(-100, 100), this.centerY);
            coin.goldValue = Math.round(this.level * 1.33);
            this.time.events.add(Phaser.Timer.SECOND * 3, this.onClickCoin, this, coin);
    
            this.levelKills++;
    
            if (this.levelKills >= this.levelKillsRequired) {
                this.level++;
                this.levelKills = 0;
            }
    
            this.levelText.text = 'Level: ' + this.level;
            this.levelKillsText.text = 'Kills: ' + this.levelKills + '/' + this.levelKillsRequired;
    
            // pick a new monster
            this.currentMonster = this.monsters.getRandom();
            // upgrade the monster based on level
            this.currentMonster.maxHealth = Math.ceil(this.currentMonster.details.maxHealth + ((this.level - 1) * 10.6));
            // make sure they are fully healed
            this.currentMonster.revive(this.currentMonster.maxHealth);
        }
        function onRevivedMonster(monster) {
            monster.position.set(this.centerX + 100, this.centerY + 50);
            // update the text display
            this.monsterNameText.text = monster.details.name;
            this.monsterHealthText.text = monster.health + 'HP';
        }
        function onClickMonster(monster, pointer) {
            // apply click damage to monster
            this.currentMonster.damage(this.player.clickDmg);
    
            // grab a damage text from the pool to display what happened
            var dmgText = this.dmgTextPool.getFirstExists(false);
            if (dmgText) {
                dmgText.text = this.player.clickDmg;
                dmgText.reset(pointer.positionDown.x, pointer.positionDown.y);
                dmgText.alpha = 1;
                dmgText.tween.start();
            }
    
            // update the health text
            this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + ' HP' : 'DEAD';
        }
    }
    function getRandom(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);
    
        // get random item
        const item = arr[randomIndex];
    
        return item;
    }
    


function update ()
{
    
}
