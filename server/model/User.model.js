import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide unique Username"],
    unique: [true, "Username Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  vaccination: { type: String },
  repeat: { type: String },
  supply: { type: String },
  regions: { type: String },
  specify: { type: String },
  bonus: { type: String },
  prevention: { type: String },
  often: { type: String },
  sarea: { type: String },
  program: { type: String },
  sregions: { type: String },
  hearingaid: { type: String},
  whichone: { type: String},
  harea: { type: String},
  hregions: { type: String},
  service: { type: String},
  preparation: { type: String},
  volume: { type: String},
  carea: { type: String},
  cregions: { type: String},
  cprogram: { type: String},
  foundation: { type: String},
  child: { type: String},
  farea: { type: String},
  fregions: { type: String},
  fprogram: { type: String},
  profile: { type: String },
});

export default mongoose.model("User", UserSchema);