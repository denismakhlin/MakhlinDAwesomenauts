game.EnemyBaseEntity = me.Entity.extend({
            init: function(x, y, settings) {
                //inputing my enememy base
                this._super(me.Entity, 'init', [x, y, {
                        //upload image from resource
                        image: "tower",
                        //divides by width
                        width: 100,
                        //divides by height height
                        height: 100,
                        //sets width
                        spritewidth: "100",
                        //sets height
                        spriteheight: "100",
                        getShape: function() {
                            return (new me.Rect(0, 0, 100, 70)).toPolygon();
                        }
                    }]);
                this.broken = false;
                this.health = game.data.enemyBaseHealth;
                this.alwaysUpdate = true;
                this.body.onCollision = this.onCollision.bind(this);

                this.type = "EnemyBaseEntity";
                //sets different images to animations
                //idle animation(original image)
                this.renderable.addAnimation("idle", [0]);
                //broken image(once the tower is caught on fire)
                this.renderable.addAnimation("broken", [1]);
                this.renderable.setCurrentAnimation("idle");
            },
            update: function(delta) {
                //below it is saying that if my helth is less than or equal to
                //zero it will chenge animation(picture) to the broken image
                //and it lets me win the game and it confirms it is broken
                if (this.health <= 0) {
                    this.broken = true;
                    game.data.win = true;
                    this.renderable.setCurrentAnimation("broken");
                }
                //updates my code to allow health to be lost
                this.body.update(delta);
                
                this._super(me.Entity, "update", [delta]);
                return true;
            },
            onCollision: function() {

            },
            
            loseHealth: function(){
                //this makes my tower lose health
                this.health--;
            }

        });
        

