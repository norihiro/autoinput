Automatic Input Plugin
====

This plugin fills input boxes and click buttons automatically.
Recently some websites require two or more passwords, which cannot filled by Firefox.
This plugin will help you fill such passwords and even automatically click submit button.

# Installing

To install to Firefox, see a page below.
https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Packaging_and_installation

# Usage

Click `Open menu`, `Add-ons`, and `Extensions`, and you will find this addon.
Click `Preferences` to configure the plugin.
Once you input configuration, click `Save` to store the configuration.

# Configuration

The configuration has elements separated by new-lines.
The elements will be processed from 1st line to the end.

```URL regex_of_URL```
`regex_of_URL` is a regex to match with URL. If matched, following lines will be activated until next `URL` element appears.

```input name element_name value```
HTML-element whose name is `element_name` will be updated with `value`.

```input xpath element_xpath value```
HTML-element which match with `element_xpath` will be updated with `value`.

```click name element_name```
HTML-element whose name is `element_name` will be clicked.

```click xpath element_xpath```
HTML-element which match with `element_xpath` will clicked.

# Example configuration

	# example site
	URL ^https://[^/]*\.example\.com/
	input name username u0123456
	input name password M1P@SSW0rD
	click xpath //input[contains(@src,"login-button.png")]
	input name secondPW 0123

Above example assumes a login page that contains `username`, `password`, and a image of login button.
The `click` element should follow after `input`s so that the login button will be clicked after inputting the credential.
And, the example assumes another `secondPW` will be asked at another page.
