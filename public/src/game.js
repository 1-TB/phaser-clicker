var game = new Phaser.Game(1350, 650, Phaser.AUTO, "");
game.state.add("play", {
    preload: function () {
        this.game.load.image("forest-green", "assets/pixelforest.png"), this.game.load.image("forest-back", "assets/parallax_forest_pack/layers/parallax-forest-back-trees.png"), this.game.load.image("forest-lights", "assets/parallax_forest_pack/layers/parallax-forest-lights.png"), this.game.load.image("forest-middle", "assets/parallax_forest_pack/layers/parallax-forest-middle-trees.png"), this.game.load.image("forest-front", "assets/parallax_forest_pack/layers/parallax-forest-front-trees.png"), this.game.load.image("aerocephal", "assets/allacrost_enemy_sprites/aerocephal.png"), this.game.load.image("arcana_drake", "assets/allacrost_enemy_sprites/arcana_drake.png"), this.game.load.image("aurum-drakueli", "assets/allacrost_enemy_sprites/aurum-drakueli.png"), this.game.load.image("bat", "assets/allacrost_enemy_sprites/bat.png"), this.game.load.image("daemarbora", "assets/allacrost_enemy_sprites/daemarbora.png"), this.game.load.image("deceleon", "assets/allacrost_enemy_sprites/deceleon.png"), this.game.load.image("demonic_essence", "assets/allacrost_enemy_sprites/demonic_essence.png"), this.game.load.image("dune_crawler", "assets/allacrost_enemy_sprites/dune_crawler.png"), this.game.load.image("green_slime", "assets/allacrost_enemy_sprites/green_slime.png"), this.game.load.image("nagaruda", "assets/allacrost_enemy_sprites/nagaruda.png"), this.game.load.image("rat", "assets/allacrost_enemy_sprites/rat.png"), this.game.load.image("scorpion", "assets/allacrost_enemy_sprites/scorpion.png"), this.game.load.image("skeleton", "assets/allacrost_enemy_sprites/skeleton.png"), this.game.load.image("snake", "assets/allacrost_enemy_sprites/snake.png"), this.game.load.image("spider", "assets/allacrost_enemy_sprites/spider.png"), this.game.load.image("stygian_lizard", "assets/allacrost_enemy_sprites/stygian_lizard.png"), this.game.load.image("gold_coin", "assets/496_RPG_icons/I_GoldCoin.png"), this.game.load.image("save", "assets/save.png"), this.game.load.image("cannon", "assets/496_RPG_icons/I_Cannon01.png"), this.game.load.image("lemon", "assets/496_RPG_icons/I_C_Lemon.png"), this.game.load.image("dagger", "assets/496_RPG_icons/W_Dagger002.png"), this.game.load.image("swordIcon1", "assets/496_RPG_icons/S_Sword15.png"), this.game.load.audio("backgroundmusic", "assets/music.mp3");
        var e = this.game.add.bitmapData(250, 500);
        e.ctx.fillStyle = "#9a783d", e.ctx.strokeStyle = "#35371c", e.ctx.lineWidth = 12, e.ctx.fillRect(0, 0, 250, 500), e.ctx.strokeRect(0, 0, 250, 500), this.game.cache.addBitmapData("upgradePanel", e);
        var t = this.game.add.bitmapData(476, 48);
        t.ctx.fillStyle = "#e6dec7", t.ctx.strokeStyle = "#35371c", t.ctx.lineWidth = 4, t.ctx.fillRect(0, 0, 225, 48), t.ctx.strokeRect(0, 0, 225, 48), this.game.cache.addBitmapData("button", t), this.player = {
            clickDmg: 1,
            gold: 50,
            dps: 0
        }, this.localStorageGet("gold") > 0 && (this.player.gold = this.localStorageGet("gold")), this.level = 1, this.localStorageGet("level") > 0 && (this.level = this.localStorageGet("level")), this.levelKills = 0, this.levelkills > 0 && (this.levelKills = this.localStorageGet("kills")), this.levelKillsRequired = 10
    },
    create: function () {
        var e = this;
        this.background = this.game.add.group(), ["forest-green"].forEach(function (t) {
            var a = e.game.add.tileSprite(0, 0, e.game.world.width, e.game.world.height, t, "", e.background);
            a.tileScale.setTo(4, 4)
        }), music = game.add.audio("backgroundmusic"), music.play(), this.upgradePanel = this.game.add.image(10, 70, this.game.cache.getBitmapData("upgradePanel"));
        var t = this.upgradePanel.addChild(this.game.add.group());
        t.position.setTo(8, 8);
        var a = [{
                icon: "dagger",
                name: "Attack",
                level: 0,
                cost: 5,
                purchaseHandler: function (e, t) {
                    t.clickDmg += 1
                }
            }, {
                icon: "swordIcon1",
                name: "Auto-Attack",
                level: 0,
                cost: 25,
                purchaseHandler: function (e, t) {
                    t.dps += 5
                }
            }, {
                icon: "gold_coin",
                name: "Minions",
                level: 0,
                cost: 100,
                purchaseHandler: function (e, t) {
                    t.dps += 10
                }
            }, {
                icon: "cannon",
                name: "Auto Cannon",
                level: 0,
                cost: 500,
                purchaseHandler: function (e, t) {
                    t.dps += 30
                }
            }, {
                icon: "lemon",
                name: "Powerful Lemon",
                level: 0,
                cost: 1e3,
                purchaseHandler: function (e, t) {
                    t.dps += 70
                }
            }],
            s = game.add.button(350, 25, "save", function () {
                alert("gold: " + this.player.gold + " level: " + this.level + " Level Kills: " + this.levelKills), this.localStorageSet("gold", this.player.gold), this.localStorageSet("level", this.level), this.localStorageSet("kills", this.levelKills)
            }, this, 0, 1, 2, 3);
        s.anchor.x = .5, s.anchor.y = .5, s.input.useHandCursor = !0, a.forEach(function (a, l) {
            s = e.game.add.button(0, 50 * l, e.game.cache.getBitmapData("button")), s.icon = s.addChild(e.game.add.image(6, 6, a.icon)), s.text = s.addChild(e.game.add.text(42, 6, a.name + ": " + a.level, {
                font: "16px Arial Black"
            })), s.details = a, s.costText = s.addChild(e.game.add.text(42, 24, "Cost: " + a.cost, {
                font: "16px Arial Black"
            })), s.events.onInputDown.add(e.onUpgradeButtonClick, e), t.addChild(s)
        });
        var l, i, n = [{
            name: "Aerocephal",
            image: "aerocephal",
            maxHealth: 10
        }, {
            name: "Arcana Drake",
            image: "arcana_drake",
            maxHealth: 20
        }, {
            name: "Aurum Drakueli",
            image: "aurum-drakueli",
            maxHealth: 30
        }, {
            name: "Bat",
            image: "bat",
            maxHealth: 5
        }, {
            name: "Daemarbora",
            image: "daemarbora",
            maxHealth: 10
        }, {
            name: "Deceleon",
            image: "deceleon",
            maxHealth: 10
        }, {
            name: "Demonic Essence",
            image: "demonic_essence",
            maxHealth: 15
        }, {
            name: "Dune Crawler",
            image: "dune_crawler",
            maxHealth: 8
        }, {
            name: "Green Slime",
            image: "green_slime",
            maxHealth: 3
        }, {
            name: "Nagaruda",
            image: "nagaruda",
            maxHealth: 13
        }, {
            name: "Rat",
            image: "rat",
            maxHealth: 2
        }, {
            name: "Scorpion",
            image: "scorpion",
            maxHealth: 2
        }, {
            name: "Skeleton",
            image: "skeleton",
            maxHealth: 6
        }, {
            name: "Snake",
            image: "snake",
            maxHealth: 4
        }, {
            name: "Spider",
            image: "spider",
            maxHealth: 4
        }, {
            name: "Stygian Lizard",
            image: "stygian_lizard",
            maxHealth: 20
        }];
        this.monsters = this.game.add.group(), n.forEach(function (t) {
            l = e.monsters.create(3e3, e.game.world.centerY, t.image), l.health = l.maxHealth = t.maxHealth, l.anchor.setTo(.5, 1), l.details = t, l.inputEnabled = !0, l.events.onInputDown.add(e.onClickMonster, e), l.events.onKilled.add(e.onKilledMonster, e), l.events.onRevived.add(e.onRevivedMonster, e)
        }), this.currentMonster = this.monsters.getRandom(), this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY + 50), this.monsterInfoUI = this.game.add.group(), this.monsterInfoUI.position.setTo(500, 500), this.monsterNameText = this.monsterInfoUI.addChild(this.game.add.text(0, 0, this.currentMonster.details.name, {
            font: "48px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        })), this.monsterHealthText = this.monsterInfoUI.addChild(this.game.add.text(0, 80, this.currentMonster.health + " HP", {
            font: "32px Arial Black",
            fill: "#ff0000",
            strokeThickness: 4
        })), this.dmgTextPool = this.add.group();
        for (var o = 0; o < 50; o++) i = this.add.text(0, 0, "1", {
            font: "64px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        }), i.exists = !1, i.tween = game.add.tween(i).to({
            alpha: 0,
            y: 100,
            x: this.game.rnd.integerInRange(100, 700)
        }, 1e3, Phaser.Easing.Cubic.Out), i.tween.onComplete.add(function (e, t) {
            e.kill()
        }), this.dmgTextPool.add(i);
        this.coins = this.add.group(), this.coins.createMultiple(50, "gold_coin", "", !1), this.coins.setAll("inputEnabled", !0), this.coins.setAll("goldValue", 2), this.coins.callAll("events.onInputDown.add", "events.onInputDown", this.onClickCoin, this), this.playerGoldText = this.add.text(30, 30, "Gold: " + this.player.gold, {
            font: "24px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        }), this.dpsTimer = this.game.time.events.loop(100, this.onDPS, this), this.levelUI = this.game.add.group(), this.levelUI.position.setTo(this.game.world.centerX, 30), this.levelText = this.levelUI.addChild(this.game.add.text(0, 0, "Level: " + this.level, {
            font: "24px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        })), this.levelKillsText = this.levelUI.addChild(this.game.add.text(0, 30, "Kills: " + this.levelKills + "/" + this.levelKillsRequired, {
            font: "24px Arial Black",
            fill: "#fff",
            strokeThickness: 4
        }))
    },
    onDPS: function () {
        if (this.player.dps > 0 && this.currentMonster && this.currentMonster.alive) {
            var e = this.player.dps / 10;
            this.currentMonster.damage(e), this.monsterHealthText.text = this.currentMonster.alive ? Math.round(this.currentMonster.health) + " HP" : "DEAD"
        }
    },
    onUpgradeButtonClick: function (e, t) {
        function a() {
            return Math.ceil(e.details.cost + 1.46 * e.details.level)
        }
        this.player.gold - a() >= 0 && (this.player.gold -= a(), this.playerGoldText.text = "Gold: " + this.player.gold, e.details.level++, e.text.text = e.details.name + ": " + e.details.level, e.costText.text = "Cost: " + a(), e.details.purchaseHandler.call(this, e, this.player))
    },
    onClickCoin: function (e) {
        e.alive && (this.player.gold += e.goldValue, this.playerGoldText.text = "Gold: " + this.player.gold, e.kill())
    },
    localStorageSet: function (e, t) {
        var a = 0;
        a = window.localStorage.setItem(e, t);
        return console.log("item saved  " + a), a
    },
    localStorageGet: function (e) {
        var t = 0;
        try {
            t = window.localStorage.getItem(e)
        } catch (e) {}
        return console.log("item was grabbed" + t), t
    },
    onKilledMonster: function (e) {
        var t;
        e.position.set(1e3, this.game.world.centerY), t = this.coins.getFirstExists(!1), t.reset(this.game.world.centerX + this.game.rnd.integerInRange(-100, 100), this.game.world.centerY), t.goldValue = Math.round(1.33 * this.level), this.game.time.events.add(3 * Phaser.Timer.SECOND, this.onClickCoin, this, t), this.levelKills++, this.levelKills >= this.levelKillsRequired && (this.level++, this.levelKills = 0), this.levelText.text = "Level: " + this.level, this.levelKillsText.text = "Kills: " + this.levelKills + "/" + this.levelKillsRequired, this.currentMonster = this.monsters.getRandom(), this.currentMonster.maxHealth = Math.ceil(this.currentMonster.details.maxHealth + 10.6 * (this.level - 1)), this.currentMonster.revive(this.currentMonster.maxHealth)
    },
    onRevivedMonster: function (e) {
        e.position.set(this.game.world.centerX + 100, this.game.world.centerY + 50), this.monsterNameText.text = e.details.name, this.monsterHealthText.text = e.health + "HP"
    },
    onClickMonster: function (e, t) {
        this.currentMonster.damage(this.player.clickDmg);
        var a = this.dmgTextPool.getFirstExists(!1);
        a && (a.text = this.player.clickDmg, a.reset(t.positionDown.x, t.positionDown.y), a.alpha = 1, a.tween.start()), this.monsterHealthText.text = this.currentMonster.alive ? this.currentMonster.health + " HP" : "DEAD"
    }
}), game.state.start("play");
