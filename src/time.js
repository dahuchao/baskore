/* eslint-env browser */
var time = document.getElementById('time');

export default function updateClock() {
  time.innerHTML = (new Date()).toString() + "test12";
}
