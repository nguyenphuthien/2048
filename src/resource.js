var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",

    Board_png: "res/board.png",
    Cell_png: "res/cell.png",

    Tile_color_json: "res/tile-color.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}