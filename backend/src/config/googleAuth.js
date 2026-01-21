//passport ek authenticate middleware
//iska kam hai hai login/signup handle karna

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; //Yahan hum Google OAuth 2.0 Strategy import kar rahe hain
import User from "../models/user.Model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "197607402547-88pf5v97ohpgl1rmt6ned67koevfhe7p.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },
    //jab google successfull login kar deta hai tab yeh function apna ap call hota hai
    //profile me user ka all data hota hai
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          email: profile.emails[0].value,
          isDeleted: false,
        });

        //agar user database me nhi mila toh mtlb first time google se login kar rha hai
        //new user create hoga
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        }
        return done(null, user); //Sab sahi hai, user mil gaya
        //null → koi error nahi
        //user → logged in user data
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
