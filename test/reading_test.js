const assert = require('assert');
const User = require('../src/user');

describe('Reding users', () => {
	let joe, rosina, alex, dmitrii;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		rosina = new User({ name: 'Rosina' });
		alex = new User({ name: 'Alex' });
		dmitrii = new User({ name: 'Dmitrii' });

		Promise.all([joe.save(), rosina.save(), alex.save(), dmitrii.save()])
			.then( () => done() );
	});

	it('Find all Joes', (done) => {
		User.find({ name: 'Joe' })
			.then((users) => {
				assert(users[0]._id.toString() === joe._id.toString());
				done();
			});
	});

	it('Find particular Joe', (done) => {
		User.findOne({ _id: joe._id })
			.then((user) => {
				assert(user.name === 'Joe');
				done();
			});
	});

	it('can skip and limit the result set', (done) => {
		User.find({})
			.sort({ name: 'asc' })
			.skip(1)
			.limit(2)
			.then((users) => {
				assert(users.length === 2);
				assert(users[0].name === 'Dmitrii');
				assert(users[1].name === 'Joe');
				done();
			});
	});
});