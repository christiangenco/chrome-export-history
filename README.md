# Export History

A Chrome extension to export your history as csv or json.

## Usage

[Download it](https://chrome.google.com/webstore/detail/export-history/hcohnnbbiggngobheobhdipbgmcbelhh) on the Chrome web store.

## Contributing

Clone this repository:

    $ git clone github.com:christiangenco/chrome-export-history.git

Then visit the [extensions panel](chrome://extensions/) of your chrome settings, check `developer mode`, click `Load unpacked extension`, and select the directory you just cloned (for a more detailed explanation of these steps, visit Chrome's [Getting Started: Building a Chrome Extension](http://developer.chrome.com/extensions/getstarted) page).

Most of the logic is contained in [popup.js](popup.js). The method that makes the magic happen is [chrome.history.search](https://developer.chrome.com/extensions/history#method-search), but trying to convert the entire object returned in memory makes Chrome crash.

The workaround used by this extension is to convert each object of the returned results array individually and append it to a hidden div, `#data`. For whatever reason, the DOM has a much higher memory tolerance than javascript objects in chrome extensions.

The data in `#data` is then converted to a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and encoded to a [data URI](http://en.wikipedia.org/wiki/Data_URI_scheme), which you can do like this:

    var blob = new Blob([SOME_DATA], {type: 'application/octet-binary'});
    var url = URL.createObjectURL(blob);

And then *that* url is stuck into a link and clicked on so it downloads as a file, which you can do like this:

    var pom = document.createElement('a');
    pom.setAttribute('href', url);
    pom.setAttribute('download', filename);
    pom.click();

Direct any questions to [@cgenco](https://twitter.com/cgenco) if you get stuck.

## License

Do whatever you want with this - but if you make money on it, I want some.