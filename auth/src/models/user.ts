import { Document, model, Model, Schema } from 'mongoose';
import { Password } from '../services/password';

interface UserProps {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

interface UserDocument extends Document, UserProps {}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret: UserDocument) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (props: UserProps) => new User(props);

const User = model<UserDocument, UserModel>('User', userSchema);

export { User };
