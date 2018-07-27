console.log('BrowseByCommand Running fam');
chrome.commands.onCommand.addListener(function(command) {
	console.log('Command:', command);
	if(command === 'browseByCommand') {
		chrome.tabs.create({ url: chrome.runtime.getURL("main.html") });
	}
});
