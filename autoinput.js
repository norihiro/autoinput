function autoinput_doit() {
	clearInterval(autoinput_id);
	function gotEntries(result) {

		var entries = result.entries.split("\n");
		var re_url = /^URL\s+(\S+)\s*(#.*)?$/;
		var re_input_name = /^input\s+name\s+(\S+)\s+(\S+)\s*(#.*)?$/;
		var re_input_xpath = /^input\s+xpath\s+(\S+)\s+(\S+)\s*(#.*)?$/;
		var re_click_name = /^click\s+name\s+(\S+)\s*(#.*)?$/;
		var re_click_xpath = /^click\s+xpath\s+(\S+)\s*(#.*)?$/;
		var url_matched = false;
		entries.forEach(function(line) {
			var a;
			if(a = line.match(re_url)) {
				url_matched = RegExp(a[1]).test(document.URL);
				if(url_matched) { console.log("URL: matched a[1]: " + a[1]); }
			}
			if(url_matched) {
				// console.log("line: " + line);
				if(a = line.match(re_input_name)) {
					document.getElementsByName(a[1]).forEach(function(e) {
						console.log("input name: a[1]: " + a[1] + ", value: " + a[2]);
						e.value = a[2];
					});
				}
				else if(a = line.match(re_click_name)) {
					document.getElementsByName(a[1]).forEach(function(e) {
						console.log("click name: a[1]: " + a[1]);
						e.click();
					});
				}
				else if(a = line.match(re_input_xpath)) {
					var x = document.evaluate(a[1], document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
					while(x) {
						console.log("input xpath: " + a[1] + ", value: " + a[2]);
						x.value = a[2];
						x = iterateNext();
					}
				}
				else if(a = line.match(re_click_xpath)) {
					var x = document.evaluate(a[1], document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
					while(x) {
						console.log("clicking xpath: " + a[1]);
						x.click();
						x = iterateNext();
					}
				}
			}
		});
	}
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	browser.storage.local.get("entries").then(gotEntries, onError);
}

autoinput_id = setInterval(autoinput_doit, 1000, 0);
