const db = require('../config/dbConnect');

const User = {
    create(newUser, callback) {
      db.query('INSERT INTO user SET ?', newUser, (err, result) => {
        if (err) throw err;
        callback(result);
        console.log('User created', { id: result.insertId, ...newUser });
        return { id: result.insertId, ...newUser };
      });
    },
    findByEmail(email, callback) {
      db.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
        if (err) throw err;
        callback(result);
        if (result.length) {
          console.log('Found user', result[0]);
          return result[0];
        }
        return result({ message: 'User not found' }, null);
      });
    },
    findById(id, callback) {
      db.query('SELECT * FROM user WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        callback(result);
        if (result.length) {
          console.log('Found user', result[0]);
          return result[0];
        }
        return result({ message: 'User not found' }, null);
      });
    },
    update(id, user, callback) {
      db.query('UPDATE user SET ? WHERE id = ?', [user, id], (err, result) => {
        if (err) throw err;
        callback(result);
        if (result.affectedRows === 0) {
          return result({ message: 'User not found' }, null);
        }
        console.log('Updated user', { id, ...user });
        return { id, ...user };
      });
    },
    delete(id, callback) {
      db.query('DELETE FROM user WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        callback(result);
        if (result.affectedRows === 0) {
          return result({ message: 'User not found' }, null);
        }
        console.log('Deleted user', id);
        return result;
      });
    },
  };
  
  module.exports = User;
  