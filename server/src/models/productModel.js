const db = require('../config/dbConnect');

const Product = {
    create(newProduct, callback) {
        db.query('INSERT INTO product SET ?', newProduct, (err, result) => {
            if (err) throw err;
            callback(result);
            console.log('Product created', { id: result.insertId, ...newProduct });
            return { id: result.insertId, ...newProduct };
        });
    },
    findAll(callback) {
        db.query('SELECT * FROM product', (err, result) => {
            if (err) throw err;
            callback(result);
            console.log('Found product', result);
            return result;
        });
    },
    findById(id, callback) {
        db.query('SELECT * FROM product WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.length) {
                console.log('Found product', result[0]);
                return result[0];
            }
            return result({ message: 'Product not found' }, null);
        });
    },
    update(id, product, callback) {
        db.query('UPDATE product SET ? WHERE id = ?', [product, id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.affectedRows === 0) {
                return result({ message: 'Product not found' }, null);
            }
            console.log('Updated product', { id, ...product });
            return { id, ...product };
        });
    },
    delete(id, callback) {
        db.query('DELETE FROM product WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            callback(result);
            if (result.affectedRows === 0) {
                return result({ message: 'Product not found' }, null);
            }
            console.log('Deleted product', id);
            return result;
        });
    }     
 };

module.exports = Product;
