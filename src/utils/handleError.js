const handleHttpError = (res, err) => {
  console.log("Error: ", err);
  res.status(500);
  res.send({ error: "ERROR" });
};

const handleErrorResponse = (res, message = "Algo ocurrio", code = 401) => {
  res.status(code);
  res.send({ error: message,msg:false });
};

module.exports = { handleHttpError, handleErrorResponse };
