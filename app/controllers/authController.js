//simple af login
const db = require("../database/pool");
const response = require("../helper/responses");
exports.getAnyLoggedInUser = async (req, res) => {
  var query = "select * from users where is_active ";
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
  var query = "UPDATE users set is_active = FALSE";
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
  const { username } = req.body;
  console.log(username);
  var query = `
        UPDATE users SET
        is_active = TRUE
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
  const { username, is_active, type, user_id } = req.body;
  let isValActive = is_active && is_active?.toLowerCase() == "true";
  console.log(isValActive, typeof isValActive);
  var query = `
        INSERT INTO users (username, is_active, type,user_id) VALUES(
          '${username}','${isValActive}','${type}','${user_id}'
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
