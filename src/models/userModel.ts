import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser.UserDocument>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should be at least 8 characters long"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    // validate: {
    //   validator: (v: string): boolean => {
    //     return v === this.password;
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

const UserModel = mongoose.model<IUser.UserDocument>("Users", userSchema);

export default UserModel;
