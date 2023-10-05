import { Schema, models, model, Document } from "mongoose";

enum UserRoles {
  default,
  admin,
}

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  joinedAt: Date;
  role: UserRoles;
  posts: Schema.Types.ObjectId[];
  savedPosts: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    bio: { type: String },
    picture: { type: String, required: true },
    location: { type: String },
    portfolioWebsite: { type: String },
    reputation: { type: Number, default: 0 },
    savedPosts: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    joinedAt: { type: Date, default: Date.now },
    role: { type: Number, enum: UserRoles, default: UserRoles.default },
  },
  {
    versionKey: false,
  },
);

const User = models.User || model("User", UserSchema);

export default User;
