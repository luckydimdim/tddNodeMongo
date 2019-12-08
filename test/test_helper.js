const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost:27017/user_test', {useNewUrlParser: true, useUnifiedTopology: true});
	mongoose.connection
	  .once('open', () => { done(); })
	  .on('error', (error) => {
	    console.warn('Warning', error);
	  });
});


/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); */

beforeEach((done) => {
	const { users, comments, blogposts } = mongoose.connection.collections;
	
	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
	});
});

after(() => {
	mongoose.connection.close();
});