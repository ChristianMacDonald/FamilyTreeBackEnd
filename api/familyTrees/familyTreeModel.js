const db = require('../../data/db');

function find() {
    return db('family_trees').join('users', 'family_trees.owner_id', '=', 'users.id').select('family_trees.id', 'users.username as owner', 'family_trees.name');
}

function findById(id) {
    return db('family_trees').join('users', 'family_trees.owner_id', '=', 'users.id').where({ 'family_trees.id': id }).select('family_trees.id', 'users.username as owner', 'family_trees.name').first();
}

function findByName(name) {
    return db('family_trees').join('users', 'family_trees.owner_id', '=', 'users.id').where({ name }).select('family_trees.id', 'users.username as owner', 'family_trees.name');
}

function findByOwner(owner_id) {
    return db('family_trees').join('users', 'family_trees.owner_id', '=', 'users.id').where({ owner_id }).select('family_trees.id', 'users.username as owner', 'family_trees.name');
}

function findByOwnerAndName(owner_id, name) {
    return db('family_trees').join('users', 'family_trees.owner_id', '=', 'users.id').where({ owner_id, name }).select('family_trees.id', 'users.username as owner', 'family_trees.name').first();
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