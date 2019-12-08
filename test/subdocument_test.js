const assert = require('assert');
const User = require('../src/user');


describe('Subdocuments', () => {
	it('Can create', (done) => {
		const user = new User({ 
			name: 'Joe',
			posts: [{ title: 'Post 1'}] 
		});

		user.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.posts[0].title === 'Post 1');
				done();		
			});
	});

	it('Can add subdocs to existing user', (done) => {
		const joe = new User({ 
			name: 'Joe',
			posts: []
		});

		joe.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				user.posts.push({ title: 'Post 2' });

				return user.save();
			})
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.posts[0].title === 'Post 2');
				done();
			});
	});

	it('Can remove subdoc', (done) => {
		const joe = new User({ 
			name: 'Joe',
			posts: [{ title: 'Post 3' }]
		});

		joe.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				const post = user.posts[0];
				post.remove();

				return user.save();
			})
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			});
	});
















});