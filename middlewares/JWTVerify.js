import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403).send({ message: err });
      }
      req.user = user;
      console.log(req.user);
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
};

export default verifyToken;
