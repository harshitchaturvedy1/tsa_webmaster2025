const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@forsythbridge.org',
    password: 'password123',
    organization: 'Community Health Center',
    role: 'admin'
  },
  {
    id: 2,
    username: 'partner',
    email: 'partner@example.org',
    password: 'partner123',
    organization: 'Local Food Bank',
    role: 'partner'
  }
];

let nextId = 3;

module.exports = {
  users,
  getNextId: () => nextId++,
  findUser: (identifier, password) => {
    return users.find(u => 
      (u.username === identifier || u.email === identifier) && u.password === password
    );
  },
  userExists: (username, email) => {
    return users.some(u => u.username === username || u.email === email);
  },
  addUser: (user) => {
    users.push(user);
    return user;
  }
};
