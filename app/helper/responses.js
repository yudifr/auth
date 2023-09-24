function ok(status, values, reply) {
  return reply.send({
    status: status,
    data: values,
    statusCode: 200,
  });
}

function load_csrf(status, values, reply) {
  return reply.setCookie("x-xsrf-token", values, { path: "/" }).send({
    status: status,
    data: "OK",
    statusCode: 200,
  });
}

function invalid(status, values, reply) {
  return reply.send({
    status: status,
    data: values,
    statusCode: 202,
  });
}

function badRequest(status, val, reply) {
  console.log(reply);
  return reply.send({
    status: status,
    statusCode: 400,
  });
}

function not_found(reply) {
  return reply.send({
    status: "Not Found",
    data: "Not Found",
    statusCode: 404,
  });
}

function not_authenticate(status, values, reply) {
  return reply.send({
    status: status,
    data: values,
    statusCode: 401,
  });
}

function not_authorized(status, values, reply) {
  return reply.send({
    status: status,
    data: values,
    statusCode: 403,
  });
}

module.exports = {
  ok,
  badRequest,
  invalid,
  not_authenticate,
  not_authorized,
  not_found,
  load_csrf,
};
