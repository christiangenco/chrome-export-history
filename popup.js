var append = function(text){
  data.appendChild(document.createTextNode(text));
}

document.addEventListener('DOMContentLoaded', function () {
  window.data = document.getElementById('data');

  document.getElementById('json').onclick = function(){
    chrome.history.search({
      'text': '', 
      // 'maxResults': 100, 
      'maxResults': 100000, 
      'startTime': 0
    }, function(res){
      window.res = res;

      var text;
      append("[");
      for(var i=0; i<res.length; i++){
        text = JSON.stringify(res[i]);
        if(i !== res.length-1) text = text + ',';
        append(text);
      }
      append("]");

      window.blob = new Blob([data.innerText], {type: 'application/octet-binary'});
      window.url = URL.createObjectURL(blob);

      var pom = document.createElement('a');
      pom.setAttribute('href', url);
      pom.setAttribute('download', "test.json");
      pom.click();

      window.close();
    });
  };
});

