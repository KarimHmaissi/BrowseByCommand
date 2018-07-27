import * as google from './google/google';

export default [
	{
		command: ['google', 'g', 'goog'],
		handler: google.runCommand
	}
];
