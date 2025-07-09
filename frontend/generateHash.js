// generateHash.js
import bcrypt from 'bcrypt';

const password = 'admin123'; // Replace this with your desired password

bcrypt.hash(password, 10).then(hash => {
  console.log('Hashed password:', hash);
});
