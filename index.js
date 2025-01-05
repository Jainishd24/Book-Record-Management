const express = require("express");
const {users} = require("./data/users.json") 
const {books} = require("./data/books.json") 
const app = express();
const port = 8081;
app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is running",
        data:"hello",
    });
});

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

app.get("/users",(req,res)=>{
    res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single user by their id 
 * Access: Public
 * Parameters: ID
 */

app.get("/users/:id", (req, res) => {
  // const  id  = req.params.id;
  const { id } = req.params;
  console.log(req.params);
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
        message: "User Doesn't Exist !!",
        success: false,
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});

/**
 * Route: /users
 * Method: POST
 * Description: Creating a id 
 * Access: Public
 * Parameters: None
 */

app.post("/users",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
    const user = users.find((each) => each.id === id);
    if(user) {
        return res.status(404).json({
        message: "User with ID exist",
        success: false,
    });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(201).json({
        success: true,
        message: "User Added Successfully",
        data: users,
    })
});

/**
 * Route: /users
 * Method: POST
 * Description: Creating a id 
 * Access: Public
 * Parameters: None
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updateUserData,
  });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their id 
 * Access: Public
 * Parameters: ID
 */

app.delete("/users/:id",(req,res)=>{
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            message: "User Doesn't Exist !!",
            success: false,
        });
    }
});
app.get("*",(req,res)=>{
    res.status(404).json({
        message:"This route not exist",
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})