import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Product } from "../type";



// All Products Array
const products: Product[] = [
  {
    id: nanoid(),
    img: "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726721_1280.jpg",
    title: "Tshirt-T-Shirt-Shirt-royalty-free-stock-illustration",
    categere: "kwd40.150",
    priceUs: 112,
    priceKwd: 324,
    maxQuantity: 5,
    imgs: [
      "https://cdn.pixabay.com/photo/2024/05/05/05/34/ai-generated-8740242_640.jpg",
      "https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726721_1280.jpg",
      "https://cdn.pixabay.com/photo/2024/01/20/01/54/ai-generated-8520248_640.jpg",
    ],
  },
  {
    id: nanoid(),
    img: "https://cdn.pixabay.com/photo/2024/01/20/01/54/ai-generated-8520240_640.jpg",
    title: "Tee-Shirt-Black-Sweat-Shirt-Garment",
    categere: "kwd137.00",
    priceUs: 233,
    priceKwd: 542,
    maxQuantity: 3,
    imgs: [
      "https://cdn.pixabay.com/photo/2024/01/20/01/50/ai-generated-8520212_640.jpg",
      "https://cdn.pixabay.com/photo/2024/01/20/01/54/ai-generated-8520240_640.jpg",
      "https://cdn.pixabay.com/photo/2022/03/09/23/57/man-7058876_640.jpg",
    ],
  },
  {
    id: nanoid(),
    img: "https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_1280.jpg",
    title: "Modern-Smartwatch-Black-Edition",
    categere: "kwd100.500",
    priceUs: 200,
    priceKwd: 600,
    maxQuantity: 10,
    imgs: [
      "https://cdn.pixabay.com/photo/2023/10/07/14/24/smartwatch-8300238_1280.jpg",
      "https://cdn.pixabay.com/photo/2019/11/05/16/32/hour-4603921_1280.jpg",
      "https://cdn.pixabay.com/photo/2017/07/31/20/51/business-2560961_1280.jpg",
      "https://media.istockphoto.com/id/1310475310/photo/woman-looking-at-her-smart-watch-for-a-pulse-trace.jpg?s=2048x2048&w=is&k=20&c=ItKkJx40DiDzKyeREMZgnSzbgPANki-nVRoiHWsekhk=",
    ],
  },
  {
    id: nanoid(),
    img: "https://cdn.pixabay.com/photo/2019/03/15/10/21/fashion-4056729_640.jpg",
    title: "Wireless-Bluetooth-Earbuds-White",
    categere: "kwd50.300",
    priceUs: 100,
    priceKwd: 300,
    maxQuantity: 15,
    imgs: [
      "https://cdn.pixabay.com/photo/2018/08/08/16/37/glasses-3592607_640.jpg",
      "https://cdn.pixabay.com/photo/2018/07/24/09/08/man-3558697_640.jpg",
      "https://cdn.pixabay.com/photo/2019/03/15/10/21/fashion-4056729_640.jpg",
    ],
  },
  {
    id: nanoid(),
    img: "https://media.istockphoto.com/id/1710509413/photo/transparent-electric-kettle-with-boiling-water-in-the-kitchen.webp?s=2048x2048&w=is&k=20&c=WJZtWBYPIwTZ_ZH7rxFh9HvXly8pfIki1eS9OY7ge2c=",
    title: "Electric-Kettle-Fast-Boiling",
    categere: "kwd30.90",
    priceUs: 30,
    priceKwd: 90,
    maxQuantity: 20,
    imgs: [
      "https://cdn.pixabay.com/photo/2014/08/08/21/36/electric-kettle-413744_1280.jpg",
      "https://media.istockphoto.com/id/1710509413/photo/transparent-electric-kettle-with-boiling-water-in-the-kitchen.webp?s=2048x2048&w=is&k=20&c=WJZtWBYPIwTZ_ZH7rxFh9HvXly8pfIki1eS9OY7ge2c=",
      "https://cdn.pixabay.com/photo/2020/06/02/19/37/coffee-5252373_1280.jpg",
      "https://media.istockphoto.com/id/2153356519/photo/young-man-using-an-electric-kettle-to-make-tea-at-home.jpg?s=2048x2048&w=is&k=20&c=4Tt6NgKcTkUMVAYSQX1vC2dK_d1qtCcQE1_DcxyjtbA=",
    ],
  },
  {
    id: nanoid(),
    img: "https://media.istockphoto.com/id/1455417356/photo/woman-blending-spinach-berries-bananas-and-almond-milk-to-make-a-healthy-green-smoothie.jpg?s=2048x2048&w=is&k=20&c=-WH4y2zrnKJ6DFVupqkbW4so-bKIIJLx1ZiOV3RHSms=",
    title: "Blender-Powerful-Mixing",
    categere: "kwd50.150",
    priceUs: 50,
    priceKwd: 150,
    maxQuantity: 15,
    imgs: [
      "https://media.istockphoto.com/id/1455417356/photo/woman-blending-spinach-berries-bananas-and-almond-milk-to-make-a-healthy-green-smoothie.jpg?s=2048x2048&w=is&k=20&c=-WH4y2zrnKJ6DFVupqkbW4so-bKIIJLx1ZiOV3RHSms=",
      "https://media.istockphoto.com/id/2090969652/photo/smiling-mother-and-daughter-making-healthy-smoothie-together-at-home.jpg?s=2048x2048&w=is&k=20&c=ZLLVt6dmKVqwXGBnDGRYcFY61seomZFs7e8AITLf5BA=",
      "https://cdn.pixabay.com/photo/2021/03/09/18/22/woman-6082552_1280.jpg",
      "https://cdn.pixabay.com/photo/2021/03/09/18/22/crushed-ice-6082556_1280.jpg",
    ],
  },
  {
    id: nanoid(),
    img: "https://cdn.pixabay.com/photo/2019/05/29/18/49/walk-4238219_640.jpg",
    title: "Knee-Brace-Support-&-Comfort",
    categere: "kwd50.150",
    priceUs: 50,
    priceKwd: 150,
    maxQuantity: 20,
    imgs: [
      "https://cdn.pixabay.com/photo/2019/05/29/18/49/walk-4238219_640.jpg",
      "https://media.istockphoto.com/id/2022305311/photo/knee-support-brace-on-leg-knee-fixation-and-prevent-pain-orthotic-equipment-orthotics.jpg?s=2048x2048&w=is&k=20&c=BHSKSGWbBmgHP2aNvBsYoXB0s0bG350A9DpGMXHApwA=",
      "https://cdn.pixabay.com/photo/2021/07/08/19/53/bandage-6397625_960_720.jpg",
    ],
  },
  {
    id: nanoid(),
    img: "https://media.istockphoto.com/id/1181045480/photo/man-with-posture-corrector-scoliosis-kyphosis-treatment.jpg?s=2048x2048&w=is&k=20&c=PI5EyP7tViVk7djIlTaWPcT7ooJAChZsfzkoegI-MEo=",
    title: "Back-Brace-Posture-Support",
    categere: "kwd60.180",
    priceUs: 60,
    priceKwd: 180,
    maxQuantity: 15,
    imgs: [
      "https://media.istockphoto.com/id/1181045480/photo/man-with-posture-corrector-scoliosis-kyphosis-treatment.jpg?s=2048x2048&w=is&k=20&c=PI5EyP7tViVk7djIlTaWPcT7ooJAChZsfzkoegI-MEo=",
      "https://media.istockphoto.com/id/457914907/photo/back-support.jpg?s=2048x2048&w=is&k=20&c=Y9bmudlrwvfhb6Idkl5lg1h0vD4Hse-nL2nfRZu3Djw=",
    ],
  },
];

// Slice
const AllDate = createSlice({
  name: "AllDate",
  initialState: products,
  reducers: {
    addProduct: (state, action:PayloadAction<Product>) => {
      state.push(action.payload);
    },
  },
});

export const { addProduct } = AllDate.actions;
export default AllDate.reducer;
