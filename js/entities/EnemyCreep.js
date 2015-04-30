game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
               image: "creep1",
               width: 64,
               height: 64,
               spritewidth: "64",
               spriteheight: "64",
               getShape: function(){
                   return (new me.Rect(0, 0, 64, 64)).toPolygon();
               }
        }]);
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //this.attacking lets us know if the enemy is currently attacking
        this.attacking = false;
        //keeps track of when our creep last attacked anything
        this.lastAttacking = new Date().getTime();
        //keeps track of last time when our creep hit anything
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(3, 20);
        
        this.type = "EnemyCreep";
        
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 124, 125], 80);
        this.renderable.setCurrentAnimation("walk");
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    update: function(delta){
        if(this.health <= 0){
            me.game.world.removeChild(this);
        }
        
        this.now = new Date().getTime();
        
        
        this.body.vel.x -=this.body.accel.x * me.timer.tick;
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        
        return true;
    },
    
        checkKeyPressesAndMove: function(){
        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        } else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling) {
                this.jump();
            }
            
        }  
        
        this.attacking = me.input.isKeyPressed("attack");
    },
    
    moveRight: function(){
            //add to the position of my x by the velocity defined above in
            //setVelocity() and multipliying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true); 
    },
    
    moveLeft: function(){
            this.facing = "left";
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(false);
    },
    
    jump: function(){
      this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
      this.body.jumping = true;  
    },
    
    setAnimation: function(){
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                //Sets the current animation to attack and once that is over
                //goes back to the idle animation
                this.renderable.setCurrentAnimation("walk", "walk");
                //Makes it so that the next we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }

        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }    
    },
    
    collideHandler: function(response){
            if(response.b.type==='PlayerBase'){
                this.attacking=true;
                //this.lastAttacking=this.now;
                this.body.vel.x = 0;
                //keeps moving the creep to the right to maintain its position
                this.pos.x = this.pos.x + 1;
                //checks that it has been at least 1 second since this creeps hit base
                if((this.now-this.lastHit >= 1000)){
                    //updates the lasthit timer
                    this.lastHit = this.now;
                    //makes the player base call its loseHealth function and
                    //passes it a damage of 1
                    response.b.loseHealth(game.data.enemyCreepAttack);
                }
            }else if (response.b.type==='PlayerEntity'){
                var xdif = this.pos.x - response.b.pos.x;
                
                this.attacking=true;
                //this.lastAttacking=this.now;
                
                
                if(xdif>0){
                    //keeps moving the creep to the right to maintain its position
                    this.pos.x = this.pos.x + 1;
                    this.body.vel.x = 0;
                }
                //checks that it has been at least 1 second since this creeps hit base
                if((this.now-this.lastHit >= 1000) && xdif>0){
                    //updates the lasthit timer
                    this.lastHit = this.now;
                    //makes the player base call its loseHealth function and
                    //passes it a damage of 1
                    response.b.loseHealth(game.data.enemyCreepAttack);
                }
            }
    }
    
});

