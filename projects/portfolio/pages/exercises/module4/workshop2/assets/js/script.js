let keys = ["c", "d", "e", "f", "g", "h", "i", "j", "k"];

for (let i = 0; i < keys.length; i++) {
	document.getElementById(keys[i]).addEventListener("click", playAudio.bind(null, keys[i]));
}

function playAudio(_key) {
	let key = document.getElementById("audio_" + _key);
	key.play();
}
