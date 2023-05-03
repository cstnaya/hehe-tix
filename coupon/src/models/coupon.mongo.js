import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    total: {
      required: true,
      default: 0,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export { Coupon };
