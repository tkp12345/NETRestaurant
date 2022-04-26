// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
//임시 아이디 
let users = [
    {
      id: '1',
      username: 'roberto',
      password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
      name: 'roberto',
      email: 'roberto@netand.com',
    },
  ];
  
  export async function findByUsername(username) {
    return users.find((user) => user.username === username);
  }
  
  export async function findById(id) {
    return users.find((user) => user.id === id);
  }
  
  export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
  }
  