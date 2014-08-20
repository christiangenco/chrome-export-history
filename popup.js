// localStorage.removeItem('registered');

var register = function(){
  localStorage['registered'] = true;

  window.csvButton.className = 
    window.csvButton.className.replace('caution', 'action');
  document.getElementById("thankyou").style.display = 'block';
}

var easter_egg = new Konami();
easter_egg.code = function(){
  if(!localStorage['registered']){
    register();
  }else{
    whoa();
  }
};
easter_egg.load();

var append = function(text){
  data.appendChild(document.createTextNode(text));
}

var download = function(format){
  if(format == "csv" && !localStorage['registered']){
    // not registered
    chrome.tabs.create({url: "http://gen.co/exporthistory"});
    return;
  }

  document.getElementById('content').innerText = "preparing file...";

  chrome.history.search({
    'text': '', 
    // 'maxResults': 100, 
    'maxResults': 100000, 
    'startTime': 0
  }, function(res){
    window.res = res;

    var text, filename;

    // put the data in a hidden div so chrome doesn't crash
    if(format==="csv"){
      if(localStorage['registered']){
        filename = "history.csv";

        // header row
        var keys = Object.keys(res[0]);
        append("formattedLastVisitTime," + keys.join(","));

        var row;
        var time;
        for(var i=0; i<res.length; i++){
          row = "";

          // convert time for excel
          time = new Date(res[i]["lastVisitTime"]);
          formatted = time.toISOString().replace('T', ' ').replace(/\.\d+Z/, '');
          row += formatted + ",";

          for(var j=0; j<keys.length; j++){
            row += JSON.stringify(res[i][keys[j]]);
            if(j !== keys.length-1) row += ",";
          }
          append("\n" + row);
        }
      }
    }else{
      filename = "history.json";

      append("[");
      for(var i=0; i<res.length; i++){
        text = JSON.stringify(res[i]);
        if(i !== res.length-1) text = text + ',';
        append(text);
      }
      append("]");
    }

    window.blob = new Blob([data.innerText], {type: 'application/octet-binary'});
    window.url = URL.createObjectURL(blob);

    var pom = document.createElement('a');
    pom.setAttribute('href', url);
    pom.setAttribute('download', filename);
    pom.click();

    window.close();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  console.dir(localStorage['registered']);
  window.data       = document.getElementById('data');
  window.jsonButton = document.getElementById('json');
  window.csvButton  = document.getElementById('csv');

  jsonButton.onclick = function(){
    download('json');
  };

  csvButton.onclick = function(){
    download('csv');
  };

  document.getElementById('titlex').onclick = register;

  if(localStorage['registered']) register();
});

