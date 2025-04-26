const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// routes import
const authRoutes = require("./routes/authRoutes");
const staticRoutes = require("./staticRoutes/staticRoute");
const bookingRoute = require("./routes/bookingRoute");
const productRoutes = require("./routes/productRoute");

const app = express();
const PORT = 2007;

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(cors()); 
app.use(express.static(path.join(__dirname, "../frontend"))); //frontend files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/rental-e-commarce")
  .then(() => console.log("mongodb connected successfully"))
  .catch((error) => console.error("error to connect mongoose", error));

// Routes
app.use("/api/auth", authRoutes);

app.use("/", staticRoutes);
app.use("/api/booking",bookingRoute);
app.use('/api/products', productRoutes);



app.listen(PORT, () => console.log(`server started at :${PORT}`));
