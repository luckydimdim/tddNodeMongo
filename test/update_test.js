const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe', likes: 0 });
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Dmitrii');
				done();
			});
	}

	it('instance set and save', (done) => {
		joe.set('name', 'Dmitrii');
		assertName(joe.save(), done);
	});

	it('A model instance can update', (done) => {
		assertName(joe.updateOne({ name: 'Dmitrii' }), done)
	});

	it('A model class can update', (done) => {
		assertName(
			User.updateOne({ name: 'Joe' }, { name: 'Dmitrii' }),
			done
		);
	});

	it('A model class can update one record', (done) => {
		assertName(
			User.updateMany({ name: 'Joe' }, { name: 'Dmitrii' }),
			done
		);
	});

	it('A model class can find record by id and update it', (done) => {
		assertName(
			User.updateOne({ _id: joe._id }, { name: 'Dmitrii' }),
			done
		);
	});

	it('Increment user likes by 10', (done) => {
		User.updateOne({ name: 'Joe' }, { $inc: { likes: 10 } })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.likes === 10);
				done();
			});
	});	
});








