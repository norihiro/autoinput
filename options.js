
function saveOptions(e) {
	console.log("saveOptions()");
	browser.storage.local.set({
		entries: document.getElementById("entries").value,
		timeout: Number(document.getElementById("timeout").value)
	});
	e.preventDefault();
}

function restoreOptions() {
	console.log("restoreOptions()");
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	browser.storage.local.get("entries").then(function(result) {
		document.getElementById("entries").value = result.entries || "";
	}, onError);
	browser.storage.local.get("timeout").then(function(result) {
		document.getElementById("timeout").value = result.timeout || 1000;
	}, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
