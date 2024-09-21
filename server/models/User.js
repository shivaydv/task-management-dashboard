const mongoogse = require("mongoose");

const Schema = mongoogse.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 16,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

const UserModel = mongoogse.model("users", UserSchema);
module.exports = { UserModel, UserSchema };
