game.TitleScreen = me.ScreenObject.extend({
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
                me.audio.playTrack("background-music");
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [20, 30, 300, 50]);
                        this.font = new me.Font("Onyx", 46, "white");
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    
                    draw: function(render){
                        this.font.draw(render.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);  
                    },
                    
                    update: function(dt){
                        return true; 
                    },
                    
                    newGame: function(){
                        me.input.releasePointerEvent('pointerdown', this);
                        me.state.change(me.state.NEW);
                                            }
                })));
                
                    me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [20, 80, 300, 50]);
                        this.font = new me.Font("Onyx", 46, "white");
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    
                    draw: function(render){
                        this.font.draw(render.getContext(), "CONTINUE", this.pos.x, this.pos.y);  
                    },
                    
                    update: function(dt){
//                        me.audio.playTrack("background-music");
                        
                        
                        return true; 
                    },
                    
                    newGame: function(){
                        
                        me.input.releasePointerEvent('pointerdown', this);

                        me.state.change(me.state.LOAD);
                    }
                })));
                
                me.game.world.addChild(new (me.Renderable.extend({
                    init: function(){
                        this._super(me.Renderable, 'init', [20, 130, 300, 50]);
                        this.font = new me.Font("Onyx", 46, "white");
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    
                    draw: function(render){
                        this.font.draw(render.getContext(), "BUY WEAPONS", this.pos.x, this.pos.y);  
                    },
                    
                    update: function(dt){
                        
                        
                        
                        return true; 
                    },
                    
                    newGame: function(){
                        
                        me.input.releasePointerEvent('pointerdown', this);
                        me.state.change(me.state.READY);
                    }
                })));
                
                
	},
	
	onDestroyEvent: function() {
            me.audio.stopTrack("background-music");
	}
});
