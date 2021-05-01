const db = require('../models/curioModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.getUsers = (req, res) => {};

userController.createUser = async (req, res, next) => {
  //create registration date
  let registration_date = new Date().toString().slice(0, 15);

  //destructure email and password from request body
  const { email, password } = req.body;
  
  //handle blank input fields
  if (!email) return next({
    msg: {
      error: 'Please complete email field.'
    }
  });

  if (!password) return next({
    msg: {
      error: 'Please complete password field.'
    }
  });

  //encrypt password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //create SQL query to insert user info to database
  const createUserQuery = `INSERT INTO "public"."Users" (id, email, password, registration_date, ) 
                           VALUES ($1, $2, $3, $4) RETURNING *`;

  const values = ['uuid_generate_v4()', email, hashedPassword, registration_date]; 

  db.query(createUserQuery, values)
    .then(res => {
      const { id, email } = res.rows[0];
      res.locals.user = { id, email };
      return next();
    })
    .catch(error => console.log(error));



};
