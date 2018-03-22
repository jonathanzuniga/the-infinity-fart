// Fart every 400 pixels scrolled
fartscroll();

var scroll = function test() {
	console.log(document.getElementById('infinite').style.height)
	var el = document.getElementById('infinite');
	var newHeight = document.getElementById('infinite').offsetHeight + 10;
	el.style.height = newHeight + 'px';
}
window.addEventListener('scroll', scroll, false);



window.addEventListener('load', function() {
	var status = document.getElementById('status');

	function updateOnlineStatus(event) {
		var condition = navigator.onLine ? 'online' : 'offline';

		status.className = condition;
		status.innerHTML = condition.toUpperCase();
	}

	window.addEventListener('online',  updateOnlineStatus);
	window.addEventListener('offline', updateOnlineStatus);
});

if (navigator.onLine === false) {
	alert('You seem to be offline.');
	console.log('Is offline.');
}