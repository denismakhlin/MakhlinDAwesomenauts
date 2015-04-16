game.SpendExp = me.ScreenObject.extend({
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                        this.font = new me.Font("Arial", 46, "white");
                    },
                    
                    draw: function(render){
                        this.font.draw(render.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
                        this.font.draw(render.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
                        this.font.draw(render.getContext(), "F1: INCREASE GOLD PRODUCTION" + game.data.exp.toString(), this.pos.x, this.pos.y + 100);
                        this.font.draw(render.getContext(), "F2: ADD STARTING GOLD" + game.data.exp.toString(), this.pos.x, this.pos.y + 150);
                        this.font.draw(render.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 200);
                        this.font.draw(render.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 250);
                    }
                })));
                

                
                
	},
	
	onDestroyEvent: function() {
	}
});
