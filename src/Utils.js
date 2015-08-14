var Utils = cc.Class.extend({

});

Utils.loadJSON = function(json){
        var array = json;
        return array;
};

Utils.randomArrayIndex = function(array) {
  return Math.floor(Math.random() * array.length);
};

Utils.randomArrayElement = function(array) {
  return array[Utils.randomArrayIndex(array)];
};