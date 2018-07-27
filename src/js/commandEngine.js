import commandMapping from './commands/commandMapping';

function resultError(error) {
	console.log('Sorry your command sucks fam: ', error);
}

function locateEngine(rootCommand) {
	//find correct engine and return it
	const engines = commandMapping.filter(commandEngine => {
		return commandEngine.command.some(command => rootCommand === command);
	});

	if(engines.length === 1) {
		return engines[0];
	}

	return false;
}

function locateSubCommand(engine, subCommandToken) {

	const subCommands = engine.subCommands.filter(subCommand => {

		return subCommand.commands.some(command => {

			return subCommandToken === command;
		});
	});


	if(subCommands.length === 1) {
		return subCommands[0];
	}

	return false;
}

export function processCommand(command) {
	console.log('Process Command: ', command);
	if(!command) {return resultError('Empty command');}
	let tokens = command.split(' ');
	const rootCommand = tokens[0];
	let subCommandToken;
	let query;
	let options;
	let parsedOptions;

	console.log('Tokens step 1: ', tokens);

	//first find engine,
	let engine = locateEngine(rootCommand);
	if(!engine) {
		//no engine found assume google
		engine = commandMapping[0];
		subCommandToken = tokens[0];
	} else {
		subCommandToken = tokens[1];
		tokens = tokens.splice(1);
	}

	console.log('Found engine: ', engine);
	console.log('Found Sub command token: ', subCommandToken);
	console.log('Token step 2: ', tokens);

	//then find subcommand
	let subCommand = locateSubCommand(engine, subCommandToken);
	if(!subCommand) {
		//if none assume first
		console.log('Cant find subCommand assuming default');
		subCommand = engine.subCommands[0]
	} else {
		tokens = tokens.splice(1);
	}

	console.log('found sub command: ', subCommand);
	console.log('Token step 3: ', tokens);

	if(tokens.length < 1) {
		console.log('No options or query found');
		query = tokens.reduce((acc, current) => acc + '+' + current);
		subCommand.handler(query, false);
		return;
	}

	//test if any options
	if(tokens.some(token => token.includes('-'))) {
		//split tokens into query and options
		let splitIndex;
		tokens.forEach((eachToken, index) => {
			if(eachToken.includes('-') && !splitIndex) {
				splitIndex = index;
				return;
			}
		});

		if(!splitIndex) console.log('Something went wrong finding options in spliting');

		console.log('Split index: ', splitIndex);
		query = tokens.slice(0, splitIndex);
		options = tokens.slice(splitIndex);

		//process options TODO
		parsedOptions = options;
	} else {
		//no options everything else is a query
		query = tokens.reduce((acc, current) => acc + '+' + current);
	}

	console.log('Query: ', query);
	console.log('Options: ', parsedOptions);

	//then call subcommand with query and options
	subCommand.handler(query, parsedOptions);
}


export function processCommandChange(command) {
	// console.log('Process Command Change: ', command);
	//TODO show man page for handler ?

}
