
function saveOptions(e) {
	console.log("saveOptions()");
	console.log(document.getElementById("entries").value);
	browser.storage.local.set({
		entries: document.getElementById("entries").value
	});
	e.preventDefault();
}

function restoreOptions() {
	console.log("restoreOptions()");
	function setCurrent(result) {
		console.log("setCurrent(result)");
		console.log(result);
		console.log(result.entries);
		document.getElementById("entries").value = result.entries || "";
	}
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	var getting = browser.storage.local.get("entries");
	console.log(getting);
	getting.then(setCurrent, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
