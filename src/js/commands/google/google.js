import cheerio from 'cheerio';

//Command parser
// function locateCommand(command) {
// 	switch(command) {
// 		case 'search':
// 			return search;
// 		case 's':
// 			return search;
// 		default:
// 			return false;
// 	}
// }
//
// //Run Command
// export function runCommand(command) {
// 	console.log('Google handler got this: ', command);
// 	if(command.length < 1) return;
//
// 	const rootCommand = command[0];
// 	const rootCommandHandler = locateCommand(rootCommand);
//
// 	//no secondary command given - assumed search
// 	if(!rootCommandHandler) {
// 		search(command)
// 	} else {
// 		const restOfCommand = command.splice(1);
// 		rootCommandHandler(restOfCommand);
// 	}
// }
const GOOGLE_SEARCH_SELECTOR = 'h3.r a';

function processQuery() {

}



//Commands
export function search(query, options) {

	console.log('Google search recieved command: ', query, options);

	//make request for google search page
	// const xhr = new XMLHttpRequest();
	// xhr.onreadystatechange = handleSearchResult;
	// xhr.open('GET', 'http://google.com/search?q=' + query, true);
	// xhr.send();

	function handleSearchResult() {
		if(xhr.readyState === 4 && xhr.status === 200) {
			// xhr.responseText
			const page = cheerio.load(xhr.responseText);
			const links = page(GOOGLE_SEARCH_SELECTOR);
			const hrefs = links.map((i, el) => page(el).attr('href'));
			console.log('Found ' + links.length + ' links from search');

			if(hrefs.length < 1) {
				//no results :(
				//do something to show no result TODO
				console.log('Found no results for query');
			} else {
				console.log('Navigating to first link: ', hrefs[0]);
				chrome.tabs.update({
	 				url: hrefs[0]
				});
			}
		}
	}
}
