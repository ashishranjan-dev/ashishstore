const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide Name"],
      minlength: 3,
      maxlegth: 50,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Provide Email"],
      validate: {
        validator: validator.isEmail,
        message: "Please Provide Valid Email",
      },
    },

    password: {
      type: String,
      required: [true, "Provide Password"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "user", "owner"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  //console.log(this.modifiedPaths())

  //console.log(this.isModified('password'))
  //console.log(this.modifiedPaths())

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("users", UserSchema);
