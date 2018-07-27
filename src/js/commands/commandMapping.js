import * as google from './google/google';

export default [
	{
		command: ['google', 'g', 'goog'],
		subCommands: [
			{
				commands: ['search', 's'],
				options: [
					{
						option: 'o'
					}
				],
				handler: google.search
			}
		]
	}
];
