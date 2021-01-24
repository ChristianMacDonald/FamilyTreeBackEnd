const db = require('../../data/db');

function find() {
    return db('users');
}

function findById(id) {
    return db('users').where({ id }).first();
}

function findByUsername(username) {
    return db('users').where({ username }).select('id', 'username').first();
}

async function add(user) {
    const [id] = await db('users').insert(user).returning('id');
    return findById(id);
}

async function update(changes, id) {
    await db('users').where({ id }).update(changes);
    return findById(id);
}

function remove(id) {
    return db('users').where({ id }).del();
}

module.exports = { find, findById, findByUsername, add, update, remove };