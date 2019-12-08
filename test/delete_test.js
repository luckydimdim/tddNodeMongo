const assert = require('assert');
const User = require('../src/user');

describe('Deleting user', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });

		joe.save()
			.then( () => done() );
	});

it('instance remove', (done) => {
		joe.remove()
			.then( () => User.findOne({ name: 'Joe' }) )
			.then( (user) => {
				assert(user === null);
				done();
			} );
	});

	it('class method remove', (done) => {
		User.deleteMany({ name: 'Joe' })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});	

	it('class find one and remove', (done) => {
		User.deleteOne({ _id: joe._id })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});		

	it('class find by id and remove', (done) => {
		User.findByIdAndDelete(joe._id)
			.then((user) => {
				user.remove();
			})
			.then(() => User.findOne({ _id: joe._id }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});			
});