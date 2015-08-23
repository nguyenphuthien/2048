var GameLayer = cc.Layer.extend({

    _board: null,

    ctor: function() {
        var self = this;

        this._super();

        this._board = new Board();
        this._board.x = cc.winSize.width/2;
        this._board.y = cc.winSize.height/2;
        this.addChild(this._board);

        this.createTiles(2);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                    switch(key) {
                        case KEY_LEFT_CODE:
                            self.move('left');
                            self.createTiles(1);
                            break;
                        case KEY_RIGHT_CODE:
                            self.move('right');
                            self.createTiles(1);
                            break;
                        case KEY_UP_CODE:
                            self.move('up');
                            self.createTiles(1);
                            break;
                        case KEY_DOWN_CODE:
                            self.move('down');
                            self.createTiles(1);
                            break;
                        }
                },
        }, this);
    },

    createTiles: function(numberOfTile) {
        if(!this._board.cellsAvailable()) {
            alert("GAME OVER!");
        } else {
            for ( var i = 0; i< numberOfTile; i++) {
                var t = new Tile(this._board.randomAvailableCell(), this.randomTileNumber());
                this._board.insertTile(t);
            }
        }
    },

    randomTileNumber: function() {
        var number = 0;
        var r = Math.random();
        if (r < 0.9) number = 2;
        if (r >= 0.9) number = 4;

        return number;
    },

    move: function(direction) {
        var cell, tile;

        var vector = this.getVector(direction);
        var traversals = this.buildTraversals(vector);
        // var moved = false;

        for (var i = 0; i < traversals.x.length; i++) {
            for (var j = 0; j < traversals.y.length; j++) {
                cell = { xPos: traversals.x[i], yPos: traversals.y[j] };
                tile = this._board.cellContent(cell);

                if (tile) {
                    var positions = this._board.findFarthestPosition(cell, vector);
                    var next = this._board.cellContent(positions.next);
                    if (next && next.value === tile.value) {
                        var pos = {xPos: next.xPos, yPos: next.yPos};
                        var t = new Tile(pos, next.value*2);
                        this._board.removeTile(tile);
                        this._board.removeTile(next);
                        this._board.insertTile(t);
                    } else
                        this._board.moveTile(tile, positions.farthest);

                }
            }
        }

    },

    getVector: function(direction) {
        var map = {
            'up'    : { xPos: 0,  yPos: 1 },  // Up
            'right' : { xPos: 1,  yPos: 0 },  // Right
            'down'  : { xPos: 0,  yPos: -1 }, // Down
            'left'  : { xPos: -1, yPos: 0 }   // Left
        };

        return map[direction];
    },

    buildTraversals: function(vector) {
        var traversals = { x: [], y: [] };

        for (var pos = 0; pos < BOARD_SIZE; pos++) {
            traversals.x.push(pos);
            traversals.y.push(pos);
        }

    // Always traverse from the farthest cell in the chosen direction
        if (vector.xPos === 1) traversals.x = traversals.x.reverse();
        if (vector.yPos === 1) traversals.y = traversals.y.reverse();

        return traversals;
    },

});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});