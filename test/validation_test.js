const assert = require('assert');
const User = require('../src/user');

describe('Validate records', () => {
	it('Requires a user name', () => {
		const user = new User({ name: undefined });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
	
		assert(message === 'Name is required');
	});

	it('Requires name longer than 2 characters', () => {
		const user = new User({ name: 'F' });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;
		
		assert(message === 'Name must be longer than 2 characters');
	});

	it('Disallow saving of invalid records', (done) => {
		const user = new User({ name: 'Jo' });
		user.save()
			.catch((validationResult) => {
				const { message } = validationResult.errors.name;

				assert(message === 'Name must be longer than 2 characters');
				done();
			});
	});
});