game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();        
        this.type = "PlayerEntity";      
        this.setFlags();
        me.game.viewport.follow(this.pos,me.game.viewport.AXIS.BOTH);

        this.addAnimation();
        
        this.renderable.setCurrentAnimation("idle");
    },
    
    setSuper: function(x, y){
                this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
    },
    //below the function has a timer for the amount of attacks
    setPlayerTimers: function(){
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    //below calls on  the players health attack and speed
    setAttributes: function(){
        this.health = game.data.playerHealth;

        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        
        this.attack = game.data.playerAttack;
    },
    //below keeps track of which direction characterr is going
    setFlags: function(){
        //Keeps track of which direction the character is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },  
    //below the function adds animation by images from resources
    addAnimation: function(){
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);  
    }, 
    //below calls on functions that update to my character
    update: function(delta) {
        this.now = new Date().getTime();
        
        this.dead = this.checkIfDead();
        //sets bindeed keys to animation
        this.checkKeyPressesAndMove();
        //sets animation
        this.setAnimation();
        //sets collision with creep and base
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        //updates
        this._super(me.Entity, "update", [delta]);

        return true;
    },
    //checks if my player is dead if health is equal or less than zero
    checkIfDead: function(){
      if (this.health <= 0){
            return true;
        }
            return false;
    },
    
    checkKeyPressesAndMove: function(){
        //if the binded key right is pressed player will mover right
        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        //if the binded key left is pressed player will mover left  
        } else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        } else {
            this.body.vel.x = 0;
        }
        //if the binded key jump is pressed player will jump up and it doesnt
        //allow me to double jump or jump while falling
        if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling) {
                this.jump();
            }
            
        }  
        
        
      //this will attack when the binded key attck is pressed
        this.attacking = me.input.isKeyPressed("attack");
        //bellow I am saying that iff the animation is attacking tthan it will
        //end the running sound
        if (this.renderable.isCurrentAnimation('attack')) {
            me.audio.stopTrack("run-sound");
        }
        
        
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
    //makes jump animation smooth
    jump: function(){
      this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
      this.body.jumping = true;  
    },
    
    setAnimation: function(){
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //Sets the current animation to attack and once that is over
                //goes back to the idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //Makes it so that the next we start this sequence we begin
                //from the first animation, not wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
        //below it is saying I will not have a walking animation while I am
        //attacking..It also plays a running sound while I am walking
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
                me.audio.playTrack("run-sound");
            }
        //this is saying that ,y character will be idle if it is not attacking
        //and if it is idle then it will play the runsound
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
            me.audio.stopTrack("run-sound"); 
        //this ends my run sound if it is attacking
        }  else if (this.renderable.isCurrentAnimation("attack")){
            me.audio.stopTrack("run-sound");
        } 
    },
    //this says that my health will lose 'health' if it is having damage onto it
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    //this allows me to collide witth my creeps and bases so it will stop when
    //it collides with me
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            this.collideWithEnemyBase(response);
        }else if(response.b.type==='EnemyCreep'){
            this.collideWithEnemyCreep(response);
        }    
    },
            
    collideWithEnemyBase: function(response){
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x -response.b.pos.x;
            
            if(ydif<-40 && xdif< 70 && xdif>-35){
                this.body.falling = false;
                this.body.vel.y = -1;
                
            }
            else if(xdif>-35 && this.facing==='right' && (xdif<0)){
                this.body.vel.x = 0;
//                this.pos.x = this.pos.x -1; 
            }else if(xdif<70 && this.facing==='left' && xdif>0){
                this.body.vel.x = 0;
//                this.pos.x = this.pos.x +1;
            }
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
                
            }
        },
    //below it is saying that if I run into my creep then it will stop it's
    //movement
    collideWithEnemyCreep: function(response){
       
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;
            
            this.stopMovement(xdif);
            
            if(this.checkAttack(xdif, ydif)){
                this.hitCreep(response);
            };

    },
    //this is tthe actual code that stops the movem
    stopMovement: function(xdif){
        if (xdif>0){
                if(this.facing==="left"){
                    this.body.vel.x = 0;
                }
            }else{
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
            }  
    },
    
    checkAttack: function(xdif, ydif){
                if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
                    && (Math.abs(ydif) <=40) && 
                    (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
                    ){
                this.lastHit = this.now;
                //if the creeps health is less than our attack, execute code in if statement
                return true;
            }
            return false;
    },
    
    hitCreep: function(response){
                if(response.b.health <= game.data.playerAttack){
                    //adds one gold for a creep kill
                    game.data.gold += 1;
                }
                response.b.loseHealth(game.data.playerAttack);           
    }   
});




