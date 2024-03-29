const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
	let joe, blogPost;

	beforeEach((done) => {
		joe = new User({ name: 'Joe' });
		blogPost = new BlogPost({ 
			title: 'Title 1',
			content: 'Content 1' 
		});

		joe.blogPosts.push(blogPost);

		Promise.all([joe.save(), blogPost.save()])
			.then(() => done());
	});

	it('clean linked blogposts on user remove', (done) => {
		joe.remove()
			.then(() => BlogPost.countDocuments())
			.then((count) => {
				assert(count === 0);
				done();
			});
	});
});