var append = function(text){
  document.body.appendChild(document.createTextNode(text));
}

function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
  pom.setAttribute('download', filename);
  pom.click();
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.history.search({
    'text': '', 
    'maxResults': 100000, 
    // 'maxResults': 100000, 
    'startTime': 0
  }, function(res){
    window.res = res;

    var text;
    append("[");
    for(var i=0; i<res.length; i++){
      // append(encodeURIComponent(JSON.stringify(res[i]) + ","));
      text = JSON.stringify(res[i]);
      if(i !== res.length-1) text = text + ',';
      append(text);
    }
    append("]");

    window.blob = new Blob([document.body.innerText], {type: 'application/octet-binary'});
    // window.blob = new Blob(res, {type: 'application/octet-binary'});
    window.url = URL.createObjectURL(blob);
    // download("history.json", document.body.innerHTML);

    var pom = document.createElement('a');
    pom.setAttribute('href', url);
    pom.setAttribute('download', "test.json");
    pom.click();
  })
});

