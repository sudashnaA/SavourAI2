const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const prisma = require("../model/prisma");

const options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.SECRET,
}

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        id: payload.sub,
      },
    })

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch(err) {
    return done(err, null);
  }
});

passport.use(strategy);