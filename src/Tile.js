var Tile = cc.Sprite.extend({

    value: 0,
    xPos: 0,
    yPos: 0,

    _lbNumber: null,
    _hexLbColor: '#776e65',
    _hexBgColor: '#eee4da',
    _fontSize: 60,

    // pos = { xPos: 0, yPos: 0 }
    ctor: function(pos, tileValue) {
        this._super(res.Cell_png);

        this._calcColorAndSize(tileValue);

        this.value = tileValue;
        this.xPos = pos.xPos;
        this.yPos = pos.yPos;

        this.setTilePosition(this.xPos, this.yPos);
        this.color = cc.color(this._hexBgColor);

        this._lbNumber = new cc.LabelTTF(tileValue, "Arial", this._fontSize);
        this._lbNumber.x = this.width/2;
        this._lbNumber.y = this.height/2;
        this._lbNumber.color = cc.color(this._hexLbColor);
        this.addChild(this._lbNumber);
    },

    updatePosition: function(position) {
        this.xPos = position.xPos;
        this.yPos = position.yPos;

        this.setTilePosition(this.xPos, this.yPos);
    },

    setTilePosition: function(x, y) {
        this.x = TILE_PADDING + (TILE_SIZE + TILE_PADDING)*x + TILE_SIZE/2;
        this.y = TILE_PADDING + (TILE_SIZE + TILE_PADDING)*y + TILE_SIZE/2;
    },

    _calcColorAndSize: function(tileValue) {
        switch (tileValue) {
            case 2:
                break;
            case 4:
                this._hexBgColor = '#ede0c8';
                break;
            case 8:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#f2b179';
                break;
            case 16:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#f59563';
                break;
            case 32:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#f67c5f';
                break;
            case 64:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#f65e3b';
                break;
            case 128:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#edcf72';
                this._fontSize = 48;
                break;
            case 256:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#edcc61';
                this._fontSize = 48;
                break;
            case 512:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#edc850';
                this._fontSize = 48;
                break;
            case 1024:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#edc53f';
                this._fontSize = 38;
                break;
            case 2048:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#edc22e';
                this._fontSize = 38;
                break;
            default:
                this._hexLbColor = '#f9f6f2';
                this._hexBgColor = '#3c3a32';
                this._fontSize = 32;
        }
    }
});