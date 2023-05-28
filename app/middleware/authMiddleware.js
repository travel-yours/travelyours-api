const jwt = require("jsonwebtoken");
const User = require("../models/user");
const clearToken = require("../utils/clearToken");

const loginWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userCred) => {
      console.log(userCred);
    });
};

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(404).json(response);
    return;
  }

  const myToken = clearToken(token);

  jwt.verify(myToken, process.env.KEY, async (error, payload) => {
    if (error) {
      res.status(404).json(response);
      return;
    }
    const id = payload.id;
    const user = await User.findOne({ _id: id });
    req.currentUser = user;
    next();
  });
};

module.exports = { requireAuth, loginWithGoogle };
