var GamePlayLayer = cc.Layer.extend({
    _board: null,
    _tile: null,
    tileDistance: 0,

    ctor: function() {
        this._super();

        this.createBoard();
        this.createTiles();
    },

    createBoard: function() {
        this._board = new cc.Sprite(res.Board_png);
        this._board.x = cc.winSize.width / 2;
        this._board.y = cc.winSize.height / 2;
        this.addChild(this._board);
    },

    createTiles: function() {
        cc.log(this._board.x + " - " + this._board.y);
        this._tile = new cc.Sprite(res.Tile_png);
        this._tile.x = this._board.x;
        this._tile.y = this._board.y;
        cc.log(this._tile.getAnchorPoint());
        this.addChild(this._tile);
    }
});

var GamePlayScene = cc.Scene.extend({
    onEnter: function(){
        this._super();

        var gpLayer = new GamePlayLayer();
        this.addChild(gpLayer);
    }
});