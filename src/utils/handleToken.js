const { jwtVerify, SignJWT } = require("jose");

//Crear token
const tokenSign = async (user) => {
  const jwtConstructor = new SignJWT({ user });
  const encoder = new TextEncoder();
  const jwt = await jwtConstructor
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY)); //Firma de token
  return jwt;
};

//Verificar token
const verifyToken = async (token) => {
  try {
    const encoder = new TextEncoder();
    return jwtVerify(
      token,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
  } catch (e) {
    return null;
  }
};

module.exports={
  tokenSign,
  verifyToken
}
