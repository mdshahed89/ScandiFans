import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log('token',token);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      // console.log(req.user);
      

      next();
    } catch (error) {
      console.log("Token verification failed:", error);
      res
        .status(401)
        .send({ success: false, message: "Unauthorized, token failed" });
    }
  } else {
    res
      .status(401)
      .send({ success: false, message: "Unauthorized, no token provided" });
  }
};

export default protect;
