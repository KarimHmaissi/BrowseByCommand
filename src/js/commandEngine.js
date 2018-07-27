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

export function processCommand(command) {
	console.log('Process Command: ', command);

	if(command === '') return resultError('Empty command');

	var tokens = command.split(' ');

	if(tokens.length < 1) return resultError('Empty command');

	//find root command
	var rootCommand = tokens[0];
	var restOfCommand = tokens.slice(1);
	console.log('Root command: ', rootCommand);
	console.log('Rest of command: ', rootCommand);
	//send control to command handler
	const engine = locateEngine(rootCommand);
	if(engine) {
		engine.handler(restOfCommand);
	} else {
		return resultError('No command found or multiple commands found');
	}
}

export function processCommandChange(command) {
	// console.log('Process Command Change: ', command);
	//TODO show man page for handler ?

}
