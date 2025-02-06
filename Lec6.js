
const events = require('events');
const User = require('./Module/User.js');
const emitter = new events.EventEmitter();

emitter.on('userCreated1', function(user) {
    console.log(`User created with name: ${user.name}, ID: ${user.id}, Email: ${user.email}, Role: ${user.role}`);
});
emitter.on('userCreated2', function(user) {
    console.log(`Another handler: User added with name: ${user.name} and ID: ${user.id}`);
});

const userData = { 
    id: 101, 
    name: 'John Doe', 
    email: 'john@example.com', 
    password: 'securepass', 
    role: 'Admin' 
};
const UD = {
    id: 102,
    name: 'Mahesh Singh',
    email: 'mahesh@example.com',
    password: 'securepass',
    role: 'Admin'
};

const newUser = new User(userData.id, userData.name, userData.email, userData.password, userData.role);
const newUser2 = new User(UD.id, UD.name, UD.email, UD.password, UD.role);

emitter.emit('userCreated1', newUser);
emitter.emit('userCreated2', newUser2);
