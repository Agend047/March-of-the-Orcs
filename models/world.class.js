class World {
    actualLevel = level;
    character = this.setHero(120, 180) //(2830, 180) for Boss-test; (120, 180) normal
    enemys = this.actualLevel.enemys;
    clouds = this.actualLevel.clouds;

    //Collectable Things
    supplys = this.actualLevel.supplys; //The ammounition, that can be found
    coins = this.actualLevel.coins;
    collectableCoins = this.actualLevel.coins.length; //For the length of the Coin-collect bar

    backgroundObjects = this.actualLevel.backgroundObjects;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    ShootableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;


        this.setWorld();
        this.makeSupplysfit();
        this.character.updateStatusBar(2)
        this.character.updateStatusBar(3)
        this.play();
    }

    /**
    * Getting set Hero by global variable, just used for developing Phase 
    * @param {Number} x X-Position
    * @param {Number} y Y-Position
    * @returns 
    */
    setHero(x, y) {
        return new heroBall[heroNumber](x, y);
    }


    /**
     * Setting the right picture for the ammounition collectables in the level.
     * Depends on a property of the choosen hero!
     */
    makeSupplysfit() {
        for (let supply of this.supplys) {
            if (supply.statusID == 2) {
                supply.loadImage(this.character.ammoPicture)
                supply.collectSound = new Audio(this.character.ammoSound);
            }
        }
    }

    // Handing the World attributes to another class. (for example, to Character)
    setWorld() {
        this.character.world = this;
    }

    /** Most important control function
     * This draws and starts everything on the map and controls its actions
     */
    play() {
        this.draw();
        this.canEnemysAttack();
        this.resetEnemyAttack();
        this.controlEnemys();
        this.character.control();
        this.character.applyGravity();

        let self = this;  //calling play again
        setTimeout(function () {
            if (playing) {
                requestAnimationFrame(function () {
                    self.play();
                })
            }
        }, IndexDelay)
    }

    /** Drawing all the objets into the Canvas, and calling draw again after a timeout to animate. */
    draw() {
        this.collecting();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0)

        this.addArrayToMap(this.backgroundObjects)
        this.addArrayToMap(this.coins)
        this.addArrayToMap(this.supplys)
        this.addArrayToMap(this.ShootableObjects);

        this.addSpriteArrayToMap(this.enemys)
        this.drawSprite(this.character)

        this.ctx.translate(-this.camera_x, 0)
    }

    /**
     * Used to include an Array of Elements
     * @param {Array} objects the Array of elements, we want to add
     */
    addArrayToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }

    /** 
     * @param {Object} mo The MovableObject, we want to draw.
     */
    addToMap(mo) {
        this.readyForMirror(mo)

        this.ctx.drawImage(mo.img, mo.pos_x, mo.pos_y, mo.width, mo.height)
        // if (mo instanceof ShootableObject) { mo.drawArrowArea(this.ctx) }

        this.reverseMirroring(mo)
    }

    /**
     * Sprites use theyre own function. Sprite Arrays need to be filled differently from non-Sprite Images.
     * @param {Array} objects the Array of Sprite-Elements, we want to add
     */
    addSpriteArrayToMap(objects) {
        objects.forEach(o => {
            this.drawSprite(o)
        })
    }

    /**
     * For Sprites:
     * Draws the needed Picture of the correct Sprite in the right direction on the screen.
     * 
     * If everything is correct, it will simulate an animation by showing different Pictures after each other.
     * @param {Object} mo The MovableObject, we want to draw.
     */
    drawSprite(mo) {
        if (mo.isDead() && mo.deathAnimationPlayed) { this.currentFrame = this.frameRate - 1 }
        else { mo.updateFrames() }
        this.readyForMirror(mo);

        mo.drawSpritePic(this.ctx);
        // mo.drawHitbox(this.ctx);
        // if (mo instanceof Enemy) { mo.drawAggroArea(this.ctx) }
        // if (mo instanceof Character) { mo.drawCharAttackMeeleBox(this.ctx) }
        this.reverseMirroring(mo);
    }

    /**
     * Helper function. If an Object has to be placed facing the left side, this will turn the ctx, so we can draw the image.
     * @param {Object} mo MovableObject, we want to draw. 
     */
    readyForMirror(mo) {
        if (mo.otherdirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.pos_x = mo.pos_x * -1;
        }
    }

    /**
    * Turning the ctx to the right direction, so everything looks fine.
    * @param {Object} mo MovableObject, we want to draw. 
    */
    reverseMirroring(mo) {
        if (mo.otherdirection) {
            mo.pos_x = mo.pos_x * -1;
            this.ctx.restore();
        }
    }

    /**
     * Checks position of Player, and looks if an enemy can attack him. 
     * If so, it sets a variable to 'true', wich causes the enemy model to attack.
     */
    canEnemysAttack() {
        this.enemys.forEach((enemy) => {
            if (!(enemy.attacked) && this.character.isInRangeOf(enemy)) {
                enemy.playerNear = true;
            } else { }
        })
    }

    /**
     * Idea to reset Enemys attacks after a few Frames
     */
    resetEnemyAttack() {
        this.enemys.forEach((enemy) => {
            if (enemy.attacked) {
                if (enemy.framesToNextAttack == 0) { enemy.attacked = false; }
                else { enemy.framesToNextAttack-- }
            }
        })
    }

    /** Giving enemys the correct AI */
    controlEnemys() {
        this.enemys.forEach((enemy) => {
            if (enemy instanceof WalkerWarrior || enemy instanceof WalkerBerserker) { enemy.walkerAI() }
            else if (enemy instanceof BossWarrior || enemy instanceof BossBerserker) { enemy.bossStatusCheck() }
        })
    }

    /**Doesnt work now, may later */
    controlProjectiles() {
        for (let projectile of this.ShootableObjects) {
            projectile.shooting();
        }
    }

    /** Plays the collectObjects function for the things that can be collected */
    collecting() {
        this.collectObjects(this.supplys);
        this.collectObjects(this.coins);
    }

    /**
     * Collecting items on the way. The first check is meant to result in a better performance.
     * @param {Array} elements either 'coins', or 'supplys', wich we can collect
     */
    collectObjects(elements) {
        for (let i in elements) {
            let element = elements[i];
            if (this.character.pos_x >= element.pos_x - 100 && this.character.pos_x <= element.pos_x + 100) {
                if (element.isInCollectRange(this.character)) {
                    element.collect(i, this.character, this)
                }
            }
        }
    }
}



