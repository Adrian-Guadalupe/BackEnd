const db = require("../database/dbConfig");

module.exports = {
  find,
  findBy,
  findById,
  update,
  del
};

function find() {
  return db("volunteer as v")
    .join("users as u", "v.user_id", "u.id")
    .select(
      "v.id as volunteer_id",
      "u.id as user_id",
      "u.email",
      "u.first_name as firstName",
      "u.last_name as lastName",
      "v.availability",
      "v.country"
    );
}

function findBy(filter) {
  return db("volunteer").where(filter);
}

async function findById(id) {
  return await db("volunteer as v")
    .where("v.id", id)
    .join("users as u", "v.user_id", "=", "u.id")
    .select(
      "v.id as volunteer_id",
      "u.id as user_id",
      "u.email",
      "u.first_name as firstName",
      "u.last_name as lastName",
      "v.availability",
      "v.country"
    )
    .first();
}

async function update(id, changes) {
  await db("volunteer")
    .where({ id })
    .update(changes);

  return findById(id);
}

async function del(id) {
  const removed = await db("volunteer")
    .where({ id })
    .del();

  return removed;
}
