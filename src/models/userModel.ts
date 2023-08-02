import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<IUser.UserDocument>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    // unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    // unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should be at least 8 characters long"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    // TODO:
    // validate: {
    //   validator: (v: string) => {
    //     console.log(this.password);
    //     // return v === this.password;
    //   },
    //   message: "Passwords do not match",
    // },
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: "https://img.freepik.com/free-icon/user_318-159711.jpg?w=200",
  },
});

userSchema.pre<IUser.UserDocument>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }
  next();
});

const UserModel = mongoose.model<IUser.UserDocument>("Users", userSchema);

export default UserModel;
