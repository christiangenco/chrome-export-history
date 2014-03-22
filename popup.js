// http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
// function download(filename, text) {
//   var pom = document.createElement('a');
//   pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//   pom.setAttribute('download', filename);
//   pom.click();
// }

function download(format){
  alert(format);
}

document.getElementById('json')

document.addEventListener('DOMContentLoaded', function () {
  // chrome.history.search({
  //   'text': '', 
  //   'maxResults': 100, 
  //   // 'maxResults': 100000, 
  //   'startTime': 0
  // }, function(res){
  //   // console.dir(res);
  //   download("history.json", JSON.stringify(res));
  // })

  // chrome.tabs.create({'url': 'json.html'});

});

