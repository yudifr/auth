//simple af login
const db = require("../database/pool");
const response = require("../helper/responses");
exports.getAnyLoggedInUser = async (req, res) => {
  const { username, cache } = req.body;
  var query = `   select * from users where username = '${username}' and cache = '${cache}'`;
  try {
    const result = await db.query(query);
    console.log(query, result);
    return response.ok("ok", result.rows, res);
  } catch (error) {
    console.log(query, error);
    return response.badRequest(error, error, res);
  }
};
exports.logout = async (req, res) => {
  const { username } = req.body;
  var query = `UPDATE users set cache = 'NULL' where username = '${username}'`;
  try {
    const result = await db.query(query);
    if (result.rowCount == 0) {
      return response.badRequest("no data", res);
    }
    return response.ok("ok", result.rows, res);
  } catch (error) {
    return response.badRequest(error, "error", res);
  }
};
exports.login = async (req, res) => {
  const { username, password, cache } = req.body;
  console.log(username, password, cache);
  var loginQuery = `select * from users where username = '${username}' and password = '${password}'`;
  var query = `
        UPDATE users SET
        cache = '${cache}'
        WHERE username = '${username}'
        `;
  try {
    const loginResult = await db.query(loginQuery);
    const result = await db.query(query);
    console.log(result);
    if (!loginResult.rows?.length) {
      return response.badRequest(
        "Something's wrong with your login information",
        res
      );
    }
    return response.ok("ok", result, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, "error", res);
    // console.log(error);
  }
};
exports.updateUser = async (req, res) => {
  const { username, user_id } = req.body;
  console.log(username, user_id);
  var query = `
        UPDATE users SET
        user_id = '${user_id}'
        WHERE username = '${username}'
        `;
  try {
    const result = await db.query(query);
    console.log(result);
    if (result.rowCount == 0) {
      return response.badRequest("no user with given username", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, "error", res);
    // console.log(error);
  }
};
exports.register = async (req, res) => {
  const { username, type, user_id, isValActive } = req.body;
  console.log(isValActive, typeof isValActive);
  var query = `
        INSERT INTO users (username,   type,user_id) VALUES(
          '${username}' ,'${type}','${user_id}'
            )
            RETURNING username
        `;
  try {
    const result = await db.query(query);
    console.log(result);
    if (result.rowCount == 0) {
      return response.badRequest("duplicate user", res);
    }
    return response.ok("ok", result, res);
  } catch (error) {
    console.log(error);
    return response.badRequest(error, "error", res);
    // console.log(error);
  }
};
