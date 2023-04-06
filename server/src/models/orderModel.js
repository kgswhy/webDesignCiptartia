const db = require('../config/dbConnect');

const Order = {
    create(newOrder, callback) {
        db.query('INSERT INTO orders SET ?', newOrder, (err, result) => {
            if (err) throw err;
            callback(result);
            console.log('Order created', { id: result.insertId, ...newOrder });
            return { id: result.insertId, ...newOrder };
        });
    },
    findAll(callback) {
        db.query('SELECT * FROM orders', (err, result) => {
            if (err) throw err;
            callback(result);
            console.log('Found orders', result);
            return result;
        });
    },
    findById(id, callback) {
        db.query('SELECT * FROM orders WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.length) {
                console.log('Found order', result[0]);
                return result[0];
            }
            return result({ message: 'Order not found' }, null);
        });
    },
    update(id, order, callback) {
        db.query('UPDATE orders SET ? WHERE id = ?', [order, id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.affectedRows === 0) {
                return result({ message: 'Order not found' }, null);
            }
            console.log('Updated order', { id, ...order });
            return { id, ...order };
        });
    },
    delete(id, callback) {
        db.query('DELETE FROM orders WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.affectedRows === 0) {
                return result({ message: 'Order not found' }, null);
            }
            console.log('Deleted order', id);
            return result;
        });
    },
    findOrderProducts(id, callback) {
        db.query('SELECT * FROM order_products WHERE order_id = ?', [id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.length) {
                console.log('Found order products', result);
                return result;
            }
            return result({ message: 'Order products not found' }, null);
        });
    }
};

module.exports = Order;