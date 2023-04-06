const db = require('../config/dbConnect');

const Transaction = {
    create(newTransaction, callback) {
        db.query('INSERT INTO transactions SET ?', newTransaction, (err, result) => {
            if (err) throw err;
            callback(result);
            console.log('Transaction created', { id: result.insertId, ...newTransaction });
            return { id: result.insertId, ...newTransaction };
        });
    },
    findAll(callback) {
        db.query('SELECT * FROM transactions', (err, result) => {
            if (err) throw err;
            callback(result);
            console.log('Found transactions', result);
            return result;
        });
    },
    findById(id, callback) {
        db.query('SELECT * FROM transactions WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.length) {
                console.log('Found transaction', result[0]);
                return result[0];
            }
            return result({ message: 'Transaction not found' }, null);
        });
    },
    update(id, transaction, callback) {
        db.query('UPDATE transactions SET ? WHERE id = ?', [transaction, id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.affectedRows === 0) {
                return result({ message: 'Transaction not found' }, null);
            }
            console.log('Updated transaction', { id, ...transaction });
            return { id, ...transaction };
        });
    },
    delete(id, callback) {
        db.query('DELETE FROM transactions WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.affectedRows === 0) {
                return result({ message: 'Transaction not found' }, null);
            }
            console.log('Deleted transaction', id);
            return result;
        });
    },
};

module.exports = Transaction;