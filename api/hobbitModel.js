const db = require('../data/db');

function find() {
    return db('hobbits');
}

function findById(id) {
    return db('hobbits').where({ id }).first();
}

function add(hobbit) {
    const { name } = hobbit;
    return db('hobbits').insert(hobbit).returning('id')
    .then(ids => {
        return findById(ids[0])
    });
}

function update(changes, id) {
    return db('hobbits').where({ id }).update(changes)
    .then(records => {
        return findById(id);
    });
}

function remove(id) {
    return db('hobbits').where({ id }).del();
}

module.exports = { find, findById, add, update, remove };