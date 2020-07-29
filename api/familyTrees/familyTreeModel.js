const db = require('../../data/db');

function find() {
    return db('family_trees');
}

function findById(id) {
    return db('family_trees').where({ id }).first();
}

function findByName(name) {
    return db('family_trees').where({ name });
}

function findByOwner(owner_id) {
    return db('family_trees').where({ owner_id });
}

function findByOwnerAndName(owner_id, name) {
    return db('family_trees').where({ owner_id, name }).first();
}

async function insert(family_tree) {
    const ids = await db('family_trees').insert(family_tree).returning('id');
    return findById(ids[0]);
}

async function update(changes, id) {
    await db('family_trees').where({ id }).update(changes);
    return findById(id);
}

async function remove(id) {
    return db('family_trees').where({ id }).del();
}

module.exports = {
    find,
    findById,
    findByName,
    findByOwner,
    findByOwnerAndName,
    insert,
    update,
    remove
};