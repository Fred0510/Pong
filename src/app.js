
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,
    puntaje1:0,
    puntaje2:0,
    velocidad:0.02,
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);

        this.jugador1 =  new cc.DrawNode();
        this.jugador1.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.jugador1, 1);

        this.jugador2 =  new cc.DrawNode();
        this.jugador2.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.jugador2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.pelota =  new cc.DrawNode();
        this.pelota.drawCircle(cc.p(0,0),5,0,100,false,10,color);
        this.pelota.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.pelota, 1);

        this.puntuacion1 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
        
        
    },
    
    ClickPlayer1 : function(location, event){
    var juego = event.getCurrentTarget();
        juego.jugador1.setPosition(juego.jugador1.getPosition().x,location.getLocation().y);
        
        
        return true;
        
    },ClickPlayer2 : function(touch, event){
    var juego = event.getCurrentTarget();
        juego.jugador2.setPosition(juego.jugador2.getPosition().x,location.getLocation().y);
        
        return true;
        
    },resetBola: function(){
        
      var size = cc.winSize;
        this.pelota.setPosition(size.width/2 , size.height/2);
        
        this.bolaX = Math.random() * 10;
        this.bolaX *= math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.bolaY = Math.random() * 10;
        this.bolaY *= math.floor(Math.random() * 2) == 1 ? 1 : -1;
        
    },
    MoverPelota:function(){
        var bola = this.pelota;
        var position = bola.getPosition();
        
        if(position.y <= 0 || position.y >= cc.winSize.height){
            
            this.bolaY *= -1;
        }else if(position.x <= 0){
            
            this.resetBola();
            this.puntuacion2.setString(++this.puntaje2);
            
        }else if(position.x >= cc.winSize.height){
            
            this.resetBola();
            this.puntuacion1.setString(++this.puntaje1);
        }else if(cc.rectIntersectsRect(bola.getBoundingBox(),this.jugador1.getBoundingBox())){
            
            cc.log("collision");
            this.bolaX *= -1;
            
        }
        var newX = bola.getPosition().x + this.bolaX;
        var newY = bola.getPosition().y + this.bolaY;
        
        bola.setPosition(newX,newY);
    },
    
    ctor:function () {
        this._super();
        this.inicializar();

cc.eventManager.addListener({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: this.ClickPlayer1,
    onTouchMoved: this.ClickPlayer1,
    onTouchesBegan: this.ClickPlayer2,
    onTouchesMoved: this.ClickPlayer2
    
},this);
        this.schedule(this.MoverPelota, this.velocidad);
        return true;
    }
});



var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

