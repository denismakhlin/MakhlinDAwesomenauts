game.PlayerBaseEntity = me.Entity.extend({
            init: function(x, y, settings) {
                //inputs my player base
                this._super(me.Entity, 'init', [x, y, {
                        //inputs cabin picture from resources
                        image: "cabin",
                        //shows width
                        width: 350,
                        //shows height
                        height: 347,
                        //shows sprite width
                        spritewidth: "350",
                        //shows sprite height
                        spriteheight: "347",
                        //gives base shape by width and height
                        getShape: function() {
                            return (new me.Rect(0, 0, 350, 347)).toPolygon();
                        }
                    }]);
                this.broken = false;
                this.health = game.data.playerBaseHealth;
                this.alwaysUpdate = true;
                this.body.onCollision = this.onCollision.bind(this);

                this.type = "PlayerBase";
                //gices three animations according to picture
                this.renderable.addAnimation("idle", [0]);
                this.renderable.addAnimation("broken", [1]);
                this.renderable.setCurrentAnimation("idle");
                
            },
            //below it is saying that if my helath is less than or equal to 
            //zero than the animation will show the broken picture and it will
            //say that the game is lost and that it is broken  while it is
            //updating
            update: function(delta) {
                if (this.health <= 0) {
                    this.broken = true;
                    game.data.win = false;
                    this.renderable.setCurrentAnimation("broken");
                }
                this.body.update(delta);

                this._super(me.Entity, "update", [delta]);
                return true;
            },
            //below it says that my health will lose dame if 
            //thiis.health - damage so it is sayong that if damage occurs to my
            //base it will cause it to lose helath
            loseHealth: function(damage){
                this.health = this.health - damage;
            },
            
            onCollision: function() {

            }

        });


