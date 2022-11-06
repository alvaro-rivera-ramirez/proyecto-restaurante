const handleHttpError = (res, err) => {
  console.log("Error", err);
  res.status(500);
  res.send({ error: "ERROR" });
};

const handleErrorResponse = (res, message = "Algo ocurrio", code = 401) => {
  console.log("Error", message);
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError, handleErrorResponse };
