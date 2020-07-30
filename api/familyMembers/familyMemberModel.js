const db = require("../../data/db");

function find() {
    return db('family_members');
}

function findById(id) {
    return db('family_members').where({ id }).first();
}

function findByTreeId(family_tree_id) {
    return db('family_members').where({ family_tree_id });
}

async function insert(tree) {
    const ids = await db('family_members').insert(tree).returning('id');
    return findById(ids[0]);
}

async function update(changes, id) {
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