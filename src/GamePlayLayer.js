var GamePlayLayer = cc.Layer.extend({
    _board: null,
    _tile: null,
    tileDistance: 0,
    _tileData: null,
    _cells: [],
    _availableCells: [],

    ctor: function(data) {
        this._super();

        this.loadJSONfile();
        this.getAllCells();
        this.createBoard();
        this.createTiles();

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                    switch(key) {
                        case KEY_LEFT_CODE:
                            cc.log("key left");
                            self.tileMoveLeft();
                            break;
                        case KEY_RIGHT_CODE:
                            cc.log("key right");
                            self.tileMoveRight();
                            break;
                        case KEY_UP_CODE:
                            cc.log("key up");
                            self.tileMoveUp();
                            break;
                        case KEY_DOWN_CODE:
                            cc.log("key down");
                            self.tileMoveDown();
                            break;
                        }
                },
        }, this);
    },

    tileMoveLeft: function() {
        if (this._tile.x > TILE_MOVE_LIMIT[0]) {
            this._tile.setPosition(this.getNewTilePosition(this._tile.x, this._tile.y, 0));
        } else {
            cc.log("MAX LEFT");
        }
    },

    tileMoveRight: function() {
        if (this._tile.x < TILE_MOVE_LIMIT[1])
            this._tile.setPosition(this.getNewTilePosition(this._tile.x, this._tile.y, 1));
    },

    tileMoveUp: function() {
        if (this._tile.y < TILE_MOVE_LIMIT[1])
            this._tile.setPosition(this.getNewTilePosition(this._tile.x, this._tile.y, 2));
    },

    tileMoveDown: function() {
        if (this._tile.y > TILE_MOVE_LIMIT[0])
            this._tile.setPosition(this.getNewTilePosition(this._tile.x, this._tile.y, 3));
    },

    getNewTilePosition: function(x, y, direction) {
        var newX = this._tile.x + TILE_MOVE_SIZE * TILE_DIRECTION[direction].x;
        var newY = this._tile.y + TILE_MOVE_SIZE * TILE_DIRECTION[direction].y;
        return cc.p(newX, newY);
    },

    createBoard: function() {
        this._board = new cc.Sprite(res.Board_png);
        this._board.x = cc.winSize.width / 2;
        this._board.y = cc.winSize.height / 2;
        this.addChild(this._board);
    },

    createTiles: function() {

        var randomPos = Utils.randomArrayElement(this._cells);
        // cc.log(JSON.stringify(randomPos));
        this._cells.splice(randomPos, 1);
        this.getAvailableCell(this._cells);

        //create Tile
        this._tile = new cc.Sprite(res.Tile_png);
        this._tile.setAnchorPoint(1, 1);
        var sizeX = TILE_MOVE_SIZE * (randomPos.x);
        var sizeY = TILE_MOVE_SIZE * (randomPos.y);
        this._tile.x = sizeX;
        this._tile.y = sizeY;
        // cc.log("w: " + this._tile.width + " h: " + this._tile.height);
        // cc.log(sizeX + " - " + sizeY);
        this.createTileProperties();
        this._board.addChild(this._tile);
    },

    getAllCells: function() {
        var cells = [];
        for ( var i = 0; i < TILE_POSITION.length; i++) {
            for ( var j = 0; j < TILE_POSITION[i].length; j++) {
                cells.push(TILE_POSITION[i][j]);
            }
        }
        this._cells = cells;
    },

    getAvailableCell: function(cells) {
        this._availableCells = cells;
    },

    createTileProperties: function() {
        var self = this;

        cc.loader.loadJson(res.TileColor_json, function(error, data){
            var randomNumber = Math.floor(Math.random() * 1.9);
            var tileObj = data[randomNumber];
            var text = tileObj.number;
            var font = "Arial";
            var size = 50;
            var lbColor = tileObj.lbColor;
            var bgColor = tileObj.bgColor;
            var tileLabel = new cc.LabelTTF(text, font, size);
            tileLabel.setFontFillColor(cc.color(lbColor));
            tileLabel.x = self._tile.width / 2;
            tileLabel.y = self._tile.height / 2;
            self._tile.setColor(cc.color(bgColor));
            self._tile.addChild(tileLabel);
        });
    },

    loadJSONfile: function() {
        var self = this;
        cc.loader.loadJson(res.TileColor_json, function(error, data){
            self._tileData = data;
        });
        if (this._tileData != null)
            cc.log(this._tileData);
    }
});

var GamePlayScene = cc.Scene.extend({
    onEnter: function(){
        this._super();

        var gpLayer = new GamePlayLayer();
        this.addChild(gpLayer);
    }
});