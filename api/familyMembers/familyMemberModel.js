const db = require("../../data/db");

function find() {
    return db('family_members');
}

function findById(id) {
    return db('family_members').where({ id });
}

function findByTreeId(tree_id) {
    return db('family_members').where({ tree_id });
}

function insert(tree) {
    ids = db('family_members').insert(tree).returning('id');
    return findById(ids[0]);
}

function update(changes, id) {
    await db('family_members').where({ id }).update(changes);
    return findById(id);
}

function remove(id) {
    return db('family_members').where({ id }).del();
}

module.exports = {
    find,
    findById,
    findByTreeId,
    insert,
    update,
    remove
};