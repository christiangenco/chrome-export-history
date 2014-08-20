// localStorage.removeItem('rickrolled');

var step = 0;
var messages = [
  "Whoa.",
  "Hey.",
  "Stop that!",
  "Nothing else happens.",
  "Nothing else happens. I promise.",
  "",
  ".",
  "..",
  "...",
  "...see?",
  "Oh, right.",
  "Well, fine. Nothing else happens from now on.",
  "At least, nothing you'll find enjoyable.",
  "...",
  "Stop it!",
  "Aren't your fingers getting tired?",
  "You'll have that konami code memorized in no time.",
  "You probably already have it memorized, in fact.",
  "Jeez! I mean, I appreciate you registering Export History and everything",
  "Jeez! I mean, I appreciate you registering Export History and everything (really, I do)",
  "Jeez! I mean, I appreciate you registering Export History and everything (really, I do), but this is just getting absurd.",
  "You can already export your history in Excel!",
  "What more do you want?",
  "Alright, you know what?",
  "You know what you get?",
  "You get this:",
  "You get this: (which you completely deserve)",
];

window.whoa = function(){
  if(step < messages.length && !localStorage['rickrolled']){
    var thankyou = document.getElementById("thankyou");
    thankyou.innerHTML = messages[step++];
  }else{
    localStorage['rickrolled'] = true;
    chrome.tabs.create({url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"});
  }
}
