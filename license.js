var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';

function getLicense(cb) {
  console.log("getting license");
  try{
    xhrWithAuth('GET', CWS_LICENSE_API_URL + chrome.runtime.id, true, function(error, status, res){
      if(status === 200){
        cb(res, null);
      }else{
        cb(res, "Error reading license server: " + response);
      }
    });
  }catch(e){
    cb(null, "Error getting authenticated XHR request: " + e);
  }
}


// Helper Util for making authenticated XHRs
function xhrWithAuth(method, url, interactive, callback) {
  var retry = true;
  getToken();

  function getToken() {
    console.log("Getting auth token...");
    console.log("Calling chrome.identity.getAuthToken", interactive);
    chrome.identity.getAuthToken({ interactive: interactive }, function(token) {
      if (chrome.runtime.lastError) {
        callback(chrome.runtime.lastError);
        return;
      }
      console.log("chrome.identity.getAuthToken returned a token", token);
      access_token = token;
      requestStart();
    });
  }

  function requestStart() {
    console.log("Starting authenticated XHR...", method, url);
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.onload = requestComplete;
    xhr.send();
  }

  function requestComplete() {
    console.log("Authenticated XHR completed.");
    if (this.status == 401 && retry) {
      retry = false;
      chrome.identity.removeCachedAuthToken({ token: access_token }, getToken);
    } else {
      callback(null, this.status, JSON.parse(this.response));
    }
  }
}
