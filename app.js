var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {

      line = line.replace(new RegExp(/\W/ig),'').toLowerCase();

      var map = createMapOf(line);
      var sortedArray = sortMapByOccuranceIn(map);
      var beauty = calculateBeautyOf(sortedArray);

      console.log(beauty);

      function createMapOf(line){

        var lineLength = line.length,
            i = 0,
            map = {};

        while(i < lineLength){
          if(!map[line[i]]){
            map[line[i]] = timesRepeating(line[i],line);
          }
          i++;
        }

        function timesRepeating(letter, string){
          return string.match(new RegExp(letter,'ig')).length;
        }

        return map;
      }

      function sortMapByOccuranceIn(map){
        return Object.keys(map).map(function(key,index,arr){
          return map[key];
        }).sort(function(a,b){
          return b-a;
        })
      }

      function calculateBeautyOf(sortedArray){
        var max = 26,
            beauty = 0;
        sortedArray.forEach(function(number, index, arr){
           beauty += number*max;
           max --;
        });

        return beauty;
      }
    }
});
