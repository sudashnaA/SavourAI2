const jsonwebtoken = require('jsonwebtoken');

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  const id = user.id;

  const expiresIn = '1d';

  const payload = {
    sub: id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, { expiresIn: expiresIn});

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.issueJWT = issueJWT;