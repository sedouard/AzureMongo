var mongoose = require('mongoose');
//Create a new MongoDB object in the todo item collection
var todoItemSchema = mongoose.Schema({
        category: String,
        description: String,
        user: {
        	id: String,
        	name: String
        }
    });
//Compiile the schema to a model
var ToDoItem = mongoose.model('ToDoItem', todoItemSchema);	
exports.post = function(request, response) {
	
	var db = mongoose.connection;
    mongoose.connect(process.env.MongoConnectionString);
    db.on('error', function(){
    	mongoose.disconnect();
    	response.send(500, { message : 'Failed to connect to mongo' });
 
    });
 
    db.once('open', function callback() {
    	console.log("Sucessfully Logged into mongo");
    	
 
		var dbObject = new ToDoItem(request.body);
 
		dbObject.save(function(err, obj){
			if(err) {
				mongoose.disconnect();
				return response.send(500, { message : 'Failed to create new todo item ' + err });
			}
 
			mongoose.disconnect();
			return response.send(201, { message : obj._id})
		});
 
	});
 
 
};