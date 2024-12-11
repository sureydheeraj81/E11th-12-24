const express = require("express");
const path = require('path');
const app = express();
const cors = require('cors');
require("dotenv").config();
// require("./config/dbConfig");

const routes = [
  { path: "/api/admin", route: require("./routes/adminRoutes") },
  { path: "/api/subscription", route: require("./routes/subscriptionRoute") },
  { path: "/api/master_category", route: require("./routes/master_categoryRoutes") },
  { path: "/api/feedback", route: require("./routes/feedbackRoutes") },
  { path: "/api/usagedetail", route: require("./routes/usage_user_typeRoute") },
  { path: "/api/usageIndustry", route: require("./routes/usage_industry_typeRoutes") },
  { path: "/api/master_reasontype", route: require("./routes/master_reasontypeRoutes") },
  { path: "/api/subs_rejection", route: require("./routes/subs_rejectionRoute") },
  { path: "/api/sub_pay_final", route: require("./routes/subs_payment_finalRoutes") },
  { path: "/api/addUser", route: require("./routes/registeruserRoute") },
  { path: "/api/state", route: require("./routes/stateRoutes") },
];


const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

routes.forEach(route => {
  app.use(route.path, route.route);
});

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
  console.log(`Server is running on port number ${port}`)
});


// const express = require("express");
// const path = require('path');
// const app = express();
// const cors = require('cors')
// require("dotenv").config();
// require("./config/dbConfig");
// const adminRoutes = require("./routes/adminRoutes");
// const subscriptionRoute = require("./routes/subscriptionRoute");
// const master_categoryRoutes = require("./routes/master_categoryRoutes");
// const feedbackRoutes = require("./routes/feedbackRoutes");
// const usageUserTypeRoutes=require("./routes/usage_user_typeRoute")
// const usageIndustryTypeRoutes=require("./routes/usage_industry_typeRoutes")
// const masterReasonTypeRoutes = require("./routes/master_reasontypeRoutes");
// const subsRejReasonRoute = require("./routes/subs_rejectionRoute")
// const subsPaymentFinalRoutes = require("./routes/subs_payment_finalRoutes")
// const userRegister=require("./routes/registeruserRoute")
// const userState = require("./routes/stateRoutes")

// const corsOptions = {
//     origin: 'http://localhost:5173', // Allow only this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// };

// app.use(cors(corsOptions))
// // app.use(express.urlencoded({extended:true}))

// app.use(express.json())
// app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// app.use("/api/admin", adminRoutes);
// app.use("/api/subscription", subscriptionRoute);
// app.use("/api/master_category", master_categoryRoutes);
// app.use("/api/feedback", feedbackRoutes)
// app.use("/api/usagedetail",usageUserTypeRoutes)
// app.use("/api/usageIndustry",usageIndustryTypeRoutes)
// app.use("/api/master_reasontype", masterReasonTypeRoutes)
// app.use("/api/subs_rejection", subsRejReasonRoute)
// app.use("/api/sub_pay_final", subsPaymentFinalRoutes)
// app.use("/api/subscription",subscriptionRoute)
// app.use("/api/addUser",userRegister)
// app.use("/api/usagedetail",usageUserTypeRoutes)
// app.use("/api/usageindustry",usageIndustryTypeRoutes)
// app.use("/api/state", userState )

// const port = process.env.PORT || 5000;

// app.listen(port, ()=>{
//     console.log(`Server is running on port number ${port}`)
// })