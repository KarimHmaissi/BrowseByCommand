import cheerio from 'cheerio';

const googleSearchSelector = 'h3.r a';

function search(command) {

	const query = command.reduce((acc, current) => acc + '+' + current);

	console.log('Google search recieved command: ', command);
	console.log('Searching google with query: ', query);

	//make request for google search page
	const xhr = new XMLHttpRequest();
	const handleStateChange = () => {
		if(xhr.readyState === 4 && xhr.status === 200) {
			// xhr.responseText
			const page = cheerio.load(xhr.responseText);
			const links = page(googleSearchSelector);
			const hrefs = links.map((i, el) => page(el).attr('href'));
			console.log('Found ' + links.length + ' links from search');

			if(hrefs.length < 1) {
				//no results :(
				//do something to show no result TODO
				console.log('Found no results for query: ', query);
			} else {

				console.log('Navigating to first link: ', hrefs[0]);
				chrome.tabs.update({
     				url: hrefs[0]
				});
			}
		}
	}
	xhr.onreadystatechange = handleStateChange;
	xhr.open('GET', 'http://google.com/search?q=' + query, true);
	xhr.send();
}

function locateCommand(command) {
	switch(command) {
		case 'search':
			return search;
		case 's':
			return search;
		default:
			return false;
	}
}

export function runCommand(command) {
	console.log('Google handler got this: ', command);
	if(command.length < 1) return;

	const rootCommand = command[0];
	const rootCommandHandler = locateCommand(rootCommand);

	//no secondary command given - assumed search
	if(!rootCommandHandler) {
		search(command)
	} else {
		const restOfCommand = command.splice(1);
		rootCommandHandler(restOfCommand);
	}

}
