we are going to create the client site inside another folder called client 

-->INstall react js using vite by using command "npm create vite@latest client" //client is the folder in which we want ot make
--> we will install react in our case(framework)..


-->use javascript

--> now folder (client will be created )
-< go to folder "cd client"

--> install 'npm i" to install the dependencies and devdependencies

(1/5steps)-already done
--> Install "tailwind using vite" go to the webpage
->using react more specifically  
"2. install tailwind css" in web pagen tailwind site
    -npm install -D tailwindcss postcss autoprefixer
    -npx tailwindcss init -p
2/5)
3.configure your template paths

- in tailwind config.js (paste the config from the web)
--so this is basically goin to check the index.html file and also all the files with the below extentions in the src folder

3/5)

4. Add tailwind directives to your css

@tailwind base;
@tailwind components;
@tailwind utilities;
-replacing everything in inde.css with these three lines of code 
- these are going to apply the base classes of tailwind css



5. start your build process 
 command:::__> " npm run dev"

 --delete the unwanted files
 -app.css(because we are using tailwind css)
 -public-vite.svg
 -assets-react.svg


 



# IF YOU DONT GET THE SUGGESTION USE "ctrl + space "



# Next add the project to a github repository 
- we need these github repos to deploy our application
- commit 

steps-
1. stop the terminal using ctrl c
2.in terminal write git init ( to initialize the git hub repository)
3.'git add .'( we are going to add all the files inside our application)
4.git commit -m "install react js and tailwind"
5. go to github to create our github repo
6. if you are sign in click on the + icon and create new repo->give a name for repo-> description-> public -> create repository
7. we already did the initiallization part of commands so we will go to the next part
8. first we going to add origin with address
--->:"git remote add origin https://github.com/soumyadeepSaha/mern-realestate.git"
9. create a branch
-->git branch -M main
10. push code to main branch
-->git push -u origin main
11. refresh the page in git hub you can see all your codes inthe git hub


****************************************************
NOTE:::::::::::___>completed installing react js and
tailwind css and we have created our first template
******************************************************
# creating pages and routes for our application

-vscode-> src -> pages(folder)-> About.jsx
                            ->Signin.jsx
                            ->Signout.jsx
                            ->profile.jsx
                            ->home.jsx
- as we are first tryig to create authentication so these pages will be enough for now

- we need to add this pages inside the app.jsx before doing that we have to install a package called react router dom which enables us to create these routes inside an application 
command::"npm i react-router-dom

--> then we go to app.js to import {browserrouter, rotes ,roue} from reactrouter dom
-- and create the route for the application in the app level

---by (alt + shift + downkey/up) we can make different copies of the above text



****************************************************
note:=> in the last section we have the pages of our website and we have created the routes using react-router-dom 
****************************************************
# create Header component

-->header of the website is present in all pages 
so it is in everywher so we need an mechanism to put them everywhere 
--Header:+> it has a logo a search bar and a menu at the right side 
-- we need to work on the responsive ness as well


--GO TO SRC FOLDER -> CREATE COMPONENTS -- WE ARE GOING TO KEEP
-- Headers, body etc here
-- so create header.jsx
-- we use rfc to create the component
-- we need to apply the header to all pages 
-- so what we need to de is go to app.jsx
--and above the routes level above all the other pages
-<Header/> over <routes/> 


--> now we will go to header.jsx to develop the header
     --> in header element we will make the header section with header tags this will help in SEO optimization

   --> and inside header we are going to have 3 sctions the logo on the left side the search in the middle and the menu on the right side...


--> do the header and you can get 'react icons' by installing packages  
->open another terminal -> be on the c;ient site 
command::> "npm i react-icons"
-> inside header if we want to move from one page to another it can be done via a""" {Link} from "react-router-dom""  without refreshing the pagee
-> and for adding the functionality of the search we need to create our website first we need to add our listenings and everything and then we can add the seaching function (later when we have content)

********************************************************
Note:+=> completed the header and now we will do the backend auth part of the projext
********************************************************


# BACKEND SIDE
-->

# Create and run the server

 -> go to VS-code->inside mern-estate section -> inside it create a seperate folder -(name)-> api
-> and now we need to initialize a package.json file but
we need to do that in the (root of our project ) not oinside api
| AS When we deploy our website the render platform is going to check the root of our website and consder both of the frontend and backend 
--> so the backend and the package.json should be inside root 

--> so go to the root folder inthe terminal and then initialize 
command::"npm init -y"

 - open a folder inside api folder (index.js) 
    --"npm install express"
- we use express framework toeasily create our backend an apis
- using express we create an applcation
 " const app=express(); "
 now this app gives us a lot of methods to ius

 -> the first methodwe want to use is listen a portnumber --
 -- after that server willrun on the given port
 -- and note we need "type: module" incase we want to use import inournode environment for that go to package.json in the main directory after the main 
 add --> "type": "module",

 -- and now we know we need to restart a server everytime we do some changes so to not do that 
 by a package called[nodemon] 
 -so i will restart the server using ctrl+c and install
 command::+> "npm i nodemon"
 - we can even add a script filefor starting the server (good practice ) other wise  "node api/index.js"
 (good practice): explained: go to roots package.json()->->go to scripts and add "dev": "nodemon api/index.js",also add "start": "node api/index.js"
 - we are using the start as when we are deploying the application to render we need to add his npm start
because the render needs to run our backend using node
-(more info): we do not need to install our nodemon in the dependencies we can do that in the dev dependencies itself (development dependencies ) as we donot use this nodemon in the production 
-- now add that in the git hub
---ERROR:::""we did a mistake here that we have created the github inside the client folder but we had to make it inside the root folder ""

 ----[fixforgit]: we can fix that by going to the client folder By "cd client" -> write "mv .git ../"
 -- we also want git to igonore all the node modules of the project we will fix this by moving the ".gitignore" from the client side  to the root level directory
 -- now commit it by "create and run server" and then add everything in staged changes -> commit and push

********************************************************
NOTE::->so that was it for creating and running the server in the next section we going to connect our database to our server we are going to install a package.mongoose and then we will use mongoose to connect our database which in our caase is MongoDb
********************************************************

# Connect to database(mongodb)
- in this section we are going to connect our 
application to the database and the database we are going to use is mongodb and install a package called mongoose to be able to easily interact with the database create models and etc. 

--> open two terminals one for the frontend and one for the backend - npm run dev on both to run them specifically

-->and what we can do is i want to open another terminal in the backend and here im going to install a "npm i mongoose"

--> in server cite inside index.js import mongoose 
and now we want to use a method called 

**mongoose.connect("//here we want our application string")**
--> we need to get the application string from the mongodb website 
-> if we dont have an account we can create an account for free 
- create a project - create a database - connect the database through compass - take the url
- now apply the url with with mongoose.connect(//url);
- hide your mongoose schema using an environmental variable 
- so we will get an error here as we csnnot use an env file in our backend o do that we need to use 
another package npm i dotenv
- and we need to import it in top import dotenv from dotenv in index.js folder
- and then we need to initialize it "dotenv.config();" in our index.js
- now we can connect to mongodb


*************************************************
NOTE::+>>WE Will create a model for databasee which is for users we need to create a database which sets some conditions sets some rules about the data that can be added to thedatabase for us.
*************************************************


# Creating user model..
-so we need to create a model for the user so in this case we are gonna have some rules and requiremenrs so the person who is interacting with the database should follow this rules and create variable and data based on this rules
-> go to api->create model-> make a file (user.model.js)-> inside folder
-> import mongoose 
-> crate a variable nemed userschema
-> use a method inside mongoose to make schema  
      const userSchema =new.mongoose.Schema({
  //specifying different rules     
        username: {
          type: String,
          //what we mean by type string is so anyother type such as number or boolean is restricted


          requirded: true,
         //no user can be added to the database without username
       
        unique:true,
         {
          // ki means that no one should have the database similar to other so everybody should have a different database so before adding the username to the database mongodb is going to check if the sae username exist orr not otherwise if their is a user with the same username theyare going to send this an error  
        },
    //you can copy by alt+shift+downn 
        }
        email: {

        }
        password:{
             //not unique
        }
      },
     //also we want to add something called {timestams: true}
     which is going to tell mogodb to record two 
     important extra information one is the time of creation of the user and the other one is the time of update of the user 

   //so later if we want to sort this information we can use the extrA information to easily sort them by time and latest 

 )
 
  ---> So after creating a schema we are going to create the model 
   
    //use .model method of mongoose 
   -> we will make 
   const User = mongoose.model('User',userSchema)
--> User is the name of the model -> U Capital and singular
-> we dont need to write users as mongodb will automaticaly write Users when more than one user will be their 
-> and then the userSchema that we had created here

 -> finally we will export default User;
 //so that we can use this model anywhere else in our application


**ADD TO GITHUB (COMMIT)
 ************************************************
NOTE::=>we just created a file user.model.js ->inside a folder called models-> inside api ->
we imported mongoose -> created userschema -> has different rules for username,email&password->
 used mongoose.schema to create schema -> based on the userschema we have to create a model using mongoose.model we set the name to User__> exported it to use anywwhere..... 
 ************************************************

# Create first API roue 7 test API route

-example of api route app.get('/',(req,res)=>{
  // req is the data we get from the browser from the client site response is the data we get back we from the servr site 

 -- the way we can test it is go to url and append the route and check for the page  


 // we can send anything from server a{json,file,object anything} res.json example

})


--but this is not the best way to write api routes here inside the index.js

--(best practice) -->create a diff folder for api routes and also the functions we have

--so INside api -> create folder(routes.js)
     -- creating the first route inside user 
     --user.route.js inside it
     --firsrt import express
     -- then initialize express.Router(); with a variable say router
     const router = express.Router();
     --now we can just create any test api route

       router.get('/test',(req,res)=>{
        res.json({
          message: 'hello'
        });
       }
       );
       --export the router export 
    -- now we want to use this route inside the index.js
    -- so note all the routes must be defined inside the index.js

    --inside index.js
    --we will wrte any time someone goes to"/api/user" use that route that we have created 

    --additional info
    --because we want to use different routers like we want to create user router, authentication router, listing router,
    so we cannot just call it router so we will name it userRouter while importing the route from user.route.js address same -sinc default export we can do that

    --so for defined all the routes in index.js
    we will use "use middleware"

    app.use("api/user",userRouter);

--> so each time we get api/user-> okay! this is the route we want to check and then we check all the routes and the pathname inside userRouter 

--> another thing we want to consider is putting the logic of the get post etc call inside the routes (example user.route.js) is not(best practice)

-->(best practice):-> the logic and functions  when we do (get post put delete update) inside the route are called controllers
-> so we -> inside api-> create folder(controllers)->we make user.controller.js

-> and weare going to just copy the function 
 and export it from the controller page to user.route.js
 [
  example::
   **IN user.controller.js**
    //export a function and give that a name here 
    export const test=(req,res)=>{
     
       res.json({
        message: 'hello world',
       });
    }
    
  **IN user.route.js**
   import test from ".../user.controller.js
   router.get('test/',test);
 ]

 #ADD github 

************************************************
Note::=> so that was it creating our test api route in the next section we going tocreate sign up api route... 
************************************************

 # Create sign Up Api route...

 - so to get the informaton like username, email ,and password , fromthe client site and 
 change the passwrod to hashed password and save it inside the database
 - so weare going to make the sign up api route first but as authentication is very important 
we not goona create that one inside the user we are going to create seperate file for the authentication
-so we create a file auth.route.js and import expess.js
-create our router using 
const router = express.Router();

// and we will also create specific controllers for a route in this case we create auth.controllers.js inside controller file
 inside the controller 
     export const signup=(req,res)=>{
     //task:
     //to get the information from the browser
     and this is coming from the body what they call is the body request that body is the information we get from the browser

    console.log(req.body);

     };
//in auth.route.js
 router.post('/signup',signup)//import sign up and dont forget to write ".js" in the import line

--export it as a default --> export default router;

--> inside index.js--> import it on the top
--> import {authRouter} from....js/
--> create API route ->
  app.use('api/auth' authRouter);//calling the file authRouter

--> but in the browser  we dont have form 
 --> so we will **use api test software**
 example **postman,insomnia,thunderclient**
 --> we use insomnia api test
        --> setup insomnia(1:27)
   --> here we can add our api routes
  -->we are going to have different routes for
  listening ,authentication,user we are going to seperate them by -> click on the + button right side of filter->new folder->name auth-> (hover on awworw)-HTTP request->rename it to signup

-> we will add the api route url
example::=> localhost:3000//api/auth/signup
- and here we can add the Body section-(we couldnt do that inside the browser)
- but here we can send the information we want to send by selecting JSON-> "//the variable should be inside "" ";

 example::::  {
  "username":"test",
  "email":test@gmail.com",
  "password":"hahah",

 }
 --> if we click on send we are triggering console.log(req.body);
 --> buit we will get undefined in the terminal
 --> the reason is by default we are not allowed to send any JSON to the server ..we need to allow the json to the server.
 --> for that go to index.js,
 --> just after the line you used app.express
 after that line use a middleware -> app.use(express.json()) as the input of the server 

--> now again if you try to send from insomnia you will get a JSON here 

--> but we dont want to just show it and console it we want to save it inside our database 

-> so first let destructure what we are getting in the body

 const {username , email , password} = req.body;

 //so we can use these info and save it inside the database

--> the reason i am doing it as we need to change the password later we are not saving it as it is

--> so now we save it sinside the database using 
 the model we created to save these infos 
 //also we need to import this User model we just gonna (ctrl + space) import it at the top
 but dont forget to add the .js to the import path

 const newUser = new User({username,email,password});

 //after creatinfg the newUser we are going to save it inside the database but this saving takes time inorder to prevent the error we write
 "await" before it->  the code is going to stay in this line untill this operation finish when we use await so we make the function sync to async

 -> await newUser.save();// save operation may take time to save inside the database
 -> next-> we will create a response -> 
 //note (201) something is created 
 
 -> res.status(201).json("user created successfully");

 -> check our database if data was created or not in mongodb-> database->browsecollections
 -> but here is a problem as we can see the password we are giving is saved as it is
 ->so we dont want to save the password like this
 ->cause if somebody hack the database and find the info of our user they are going to see all their passwords
 ->and also if we have a admin they can have access to our database they can see it as well so this is not a great practice
 -> the best practice is to hash the password,
 that is encypt the password there are plenty of ways to do the encryption  
 -> we use bcryptjs [command]: "npm i bcryptjs"
-> go auth.controller.js->import bcrypt->
and after getting the password from the body we are going to hash the password 
const hashedpassword = bcryptjs.hashSync(password,10); //hashsync isitself going to wait so we dont have to put an await before it
//10 is the salt number=>the no. of round to create the salt-> salt is just a hash number or variable which is going to be combined with our password and make it encrypted 
so instead of the password we are going to pass our hashed password

 example::
  const newUser = new User({username,email,password:hashedpassword});//update line 421

  -> try in insomnia and check in database

--->but wwhat if we get an error while doing the above?
--say we were trying to add the same username and email we should get an error because in the model we mentioned the username and email should be unique

-->we only get error in the server we dont get any error in tnhe client site or(in the insomnia)
-- we dont wanna see the error in the console we want to sent back the error to the user


---[handle]--> so inside the auth.controller -> instead of just saving it we are going to put this one inside a try and catch block
--put 
try{
  await newUser.save();
  res.status(201).json('user created successfully');
}
catch(error){
  res.status(500).json(error.message);
}
   
so we could track the error and send it back to the user
- this is not the proper way to handle error the best practice is to have a function and a middleware 
to handle the error

#GITHUB

*****************************************************
Note::+> In the next section we are going to handle this error in a different way we gonna add a middleware and a function to handle the error
*****************************************************

# Create a middleware and a function to handle possible errors

- in the last section we have handeed the api route for sign up in this section we are going o add an middle war and a function to handle the error

- since we can see eacg time we have to create a try and catch statement and response to error so its going to be repeated in our project if we have too many routes

- so we go to indexjs and their we create an api route
- app.use((err,req,res,next) =>{
  //it is the status code that we get from the input of this middle ware
  const statuscode = err.statusCode|| 500;
  //also we make the message as well
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statuscode,
    message,
  });

}
)
//err- it is the err that is coming from the inut of this middleware 
//req- it is the data from the cient 
//res- it is our response from the server to client side
//next- next to got to the next middleware

--- so now how we use that error handeling middleware?

- inside the auth.controller.js-> without writing 
- instead of writing 'res.status(500).... we just get the 
  paramters for the fun sigup(.....,next)
  and use next in the try catch block to call the middleware

  -catch(error){
    next(error);
  }

  -- and their are some situations when their is no error in the system but we want to throw an error for eample the password the person is putting is not long enough so it is not an error so it is not error but we can create an error for that 
  
  -so we need to create an function to handle these kind of errors so here inside the api folder -> create utils(folder)-> (file) create error.js -> export const errorhandler=(statusCode,message)=>{
    //with the help of this function we are going to give an custom statuscode and message it is not an actual one
   //using js error constructor to create our customed error
   const error = new Error();
   error.statusCode = statusCode;
   error.message = message;
   return error;

  };

  -- now you can use these to the places when their is no error but you want to use it 1:47

  -- this custom middleware will be used later 

--Upload to github

*************************************************************
NOTE:++> creating UI for the sign up page is next
*************************************************************

# CREATING UI FOR THE SIGN UP PAGE

->1:50:47->1:58:50


# Creating sign up page functionality
(Signup.jsx client site)

- in this section we want to add functionality to this page 
page say when we add username email and password as input we want to track the changes firstly using an unchanged event listner and then we want to submit it and add it to the database when we click on sign up button

-> so we want to add an unchanged event listners to the inputs s for each of them after id,or classname  
 onchange = {handlechange}

 -- and we need to create onchange event listner at the top before return 

 // our motois to save the values of that so what we will do
 is to create a piece of state to keep track of all the   changes

//formdata will be an object 
 const [formdata,setformdata]=  useState({});//import usestat
 const handechange = (e)=>{
    
    //we want to keep the previous info that is say we want to keep the username info before going to the email
   setformdata({
  ...formdata,(using spread operator to save the prev info)
  [e.target.id]: e.target.value,
  });
 };


--> after that we want to submit the form we will create an  ONSUBMIT EVENT LISTNER inside the form which is going to call a function on submit (handlesubmit)

<form onSubmit={handlesubmit}>

-> in the top above return 

 const handlesubmit= async(e) =>{
  e.preventDefault(); //to prevent refreshing the page when we submit the form (in react we want to prevnt refreshing he page )

  --> now on submit what we do
  -we use the fetch method to request for our api route
  so we know our api route address is localhost:3000/api/auth/signup ..
  - but we dont want to add this address all the time 
  - for example if i wanted to fetch , for example
  create get response 
  const res = await fetch(
   // i dont want to write down localhost.........................

   // i just want to write down '/api/auth/signup'

   but we are requesting to localhost 3000
   and our client cite is at 5173 rn
   - so how will we fix it ?
   -- we are basically creating a proxy. so each time we
   dont write down anything were gonna request for 3000 
   
    
  )

 so , const handlesub,it = async(e)=>{
  e.preventdefault();
  const res = await fetch('/api/auth/signup', formdata);
  // for the above we need a proxy so lets create a proxy

 }

 -> go to vite.config.js-> inside the define configue ->

  server:{ 
    proxy:{
      //so this server is going to have a proxy and the proxy we just say each time you have a request to /api

      '/api': {
        target: 'https://localhost:3000',
        secure: false,
      },
     },
    },

 - so we created a proxy so that each time the address starts includes the '/api'   add the localhost:3000 at the begining

 -so now this is going to req to the correct place

- so once we do this fetch request , we want to get the response . also we dont want to send he form data, we want to stringify it we wanna change that to string(stringify) because otherwise its not secure to do that. so , 
 inside const handlesumit-> 

 const res = await fetch('/api/auth/signup',
 {
  method:'POST',
  headers:{
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formdata);
  //so wew want to send the body by stringifing the form data
  -- so we say send from the body of the browser and send this information formdata(stringified)

  --above is the correct way to do the request
  
 });
 ------------------------
  ****why it is needed to stringify a json to transfer through the network****
  Stringifying an object using JSON.stringify() converts it into a JSON string. JSON is a widely accepted data format for data interchange because it's lightweight and human-readable. By stringifying the object, you serialize its data into a format that can be easily transmitted over the network.
                           ---------------------------



- now next we want to getis to change and convert the response to json
 const data = await res.json();

 };

 -- now inorder to handle the error (clientside)and also we want to handle the loading effect
 -because when its loading or fetching we wanna disable the button (submit) and also show some loading effect 

-so what we need to do is add two more states
one for error
- another one is for loading

const [error,seterror]=usestate(null);
const [loading,setloadng]=usestate(false);

-- so what we do before request(2:8)
-> handledefault->e.prevent.. -> i want to setloading(true)
-> and after request finished -> if the data we are getting (success) is false set the success to false
 
 below->(const data)
 -> if(data.success===false)//given from the server
 {
  setLodaing(false);
  setError(data.message);
  return;
 }

otherwise we wanna set the 
setLoading(false);// this is because the loading is completed


-->next part how to handle loading message and disable css (2:9:20)

 # create sign in page
-(create sign in API route)
-firstky we want to create click to sign in API route,
and then we are going to complete its page

- so for crating the API route
- do you remember in the sign up section -> inside api-> inside routes-> auth.route we have created the "router.post() for sign up
- same way we need to create a route for sign in
- so first thing first we need to create an function for that indside auth controllers.js 

export const signin = async(req,res,next) // same as sign up we will also incude next paramter as we need a middleware here 

                                         =>{
    //here we want to get data from the req.body

      const {email,password}= req.body;
       try{
        //check the email
        const validuserr= await User.findone({email});
   //here we need to check for if the email is not correct

   if(!validuser){// since it doesnot return an email so false
   // now hot to return an error either create a new error or use the custom error function created in utils

          return next(errorHandler(404,'user not found!));
   
   //now checking the password
   - compareSync method
     const validpassword = bcryptjs.compareSync(password,validuser.password);
     if(!validpassword) return next(errorhandler(401, 'wrong credentials));

    -- so if we know both user and password are correct we need to authenticate the user
    --the way we do the authentication is to add a cookieinside the browser and we need to create a hash token that includes the email of the user or the id of the user and then we save this token inside the browser cookie
    --so each time user wants to do something suppose change the email passwordor something crucial so we check they are authenticated or not so we use he cookie to do that
  --but we are not gonna save that data as it is we are gonna hash that data as well
  --so the best package to do that is JWT to create the token with the hashed values of the user
  --so inside the backend in the root level directory
  --npm i jsonwebtoken 
  -import it
  - after ---
        if(!validpassword)....
 // and we wanna add some data which is unique for the user
 // it can be email username or id , id is the best practice for doing that by checking the id if someone can find the id ,they dont know exactly the information of the person like the email or password
 -so this is the id that is automatically saved inside the mongo db based on the id later we can authenticate the user
 ..


        const token = jwt.sign()

       }

       }
       catch(error){
       next(error);
       }                          
       
                                         };
-- when we will understand the the email and password is correc we need to authenticate the user 
--the way we do it is send cookies to the browser
-- create a hash token that includes the email or the id of the user and then we save this token inside the browser cookie , so each time the user wanna do something for example change its password,email, sowe need to check they are authenticated or not so we need a cookie to do that but we are not gonna save the data as it is we are going to hash that data as well, best package for doing that is JWT or JSON web token, we can use this package to create the token, we create the hash value of the users 

-- if you are in the root directory mernestate install thepackage--> "npm i jsonwebtoken"

-import jwt 
-"process of creating a token"
-const token = jwt.sign({id: validuser._id},process.env.JWT_SECRET)//using method from jwt which is sign and we want to add some info that is unique for the user it can be email,usrname ,id etc
--id best practice 
-also we are going to add [secretkey]--any random no. as secret key this is going to make our token completely unique for our appication, similar to the salt in creating the password .so this is going to be mixed with the id of the user and this id is going to be completely hashed and based on our secret key (inorder to make our application secure)
- since its secret key save it inside the env varibLE



-- so now as we created the token 
--save this token as the cookie 
//access_token is the name of the cookiee
-httpOnl(no other applications can hVE access TO OUR Cookies)-----these from here are other informations


httpOnly: true is a setting commonly used in web development for HTTP cookies. When this setting is enabled for a cookie, it means that the cookie can only be accessed and modified by the web server and is inaccessible to client-side scripts running in the browser, such as JavaScript

Protection against XSS: XSS attacks occur when malicious scripts are injected into a web application, often through user input fields. These scripts can then access cookies containing sensitive information if the cookies are not marked as httpOnly. With httpOnly: true, even if an XSS attack is successful, the attacker cannot access or manipulate cookies directly.



- res.cookie('access_token',token,{httpOnly: true ,expires:})
.status(200);
.json(validuser);

- use postman or insomnia to try for req and res
 =2:29:30
 -rest))

*****************************************************
so that was it for creating the sign in api route 
*****************************************************
 # complete sign in page functionality
 [extra how to place dual cursor??
   - press alt+ click to where ever you wanna write at a time
 ]

 --in the last section we had completed the sign in API route in this section we are going to work on the functionaliy and create the UI and connect it to the database and we are going to have interactivity between the front end and the backend...
--- do same as the sign up
 ***********************************************
in th next section we are going to store the users info once we are logged in we get a validuserinfo from the backend we will be storing that globally via redux toolkit and use that in whole overapplication
************************************************


# ADD redux toolkit

-go to google - go to reduxtoolkit- getstarted - quickstart - install the first 2 packages

- install the above in the client site not in the backend

- after installation create the store, so create a file store.js and add the config given - for that -> go to src -> create another folder redux ->(inside redux) create a file store.js -> here create the store that iscopy paste the config
-(extra)-> we need to add to get serializable check false otherwise we will get error later->
so add a middleware

middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
  serializableCheck: false;
}),
- in ths way we wont get an error for not serializing our variables here
- (next step)
       -provide the redux store to react
       -so we need to cover our applicaion
       (inside main.jsx)//import sore and provider
       <provider store={store}>
          <App/>
       </provider>

- next step -> redux state slice
-> in our case -> user slice
- inside redux folder -> create another folder user ->inside(user)-> create userslice.js->
import {createSlice} from '@reduxjs/toolkit';
- now using this one the first step is actually to create the initial state for us ->
 we set the user null -> and then when sign in successful -> we set that one to the user we get from the datatbase -> so initial states

 const initialsate = {
  currentuser: null,
  error: null,
  loading: false,
 };

 const userslice = createSlice({
   name: 'user',
   initialstate,
   reducers:{ //funcions (reducers)
    
     signinstart: (state) => {
          state.loading = true;
     },
     signinsuccess: (state, action)=>{ //action is the daata we get from the or recieve from the database

      state.currenuser = acion.payload,
      state.loading = false;
      state.error = null;
     },
     signinfailure: (state ,acion)=>{
  
    state.error = action.payload;
    state.loading = false;

     }
   }

 })
 - so we want to export this function as the action and also we want to export this userreducer 

 export const { signinstart , signinsuccess, signinfailure} = userSlice.actions;

 export default userSlice.reducer;

- in the next step add slice to the store>>-> remeber our store was empty -> go to store.js ->
 (inside reducer) reducer: { user: userreducer},


 - so now setting up is finished now we can use that to dispatch the functions aand use them ->


-> go to signin.jsx ->
  import { useDispatch } from 'react-redux';
   // using this hook we can dispatch the function we have

   //initialize it
    const dispatch = useDispatch();
   //import all the functions that we created 

  -> so here incase of setting loading to(true);
 -> dispatch(signinstart());
  -> when error happend 
  -> dispatch(signinfailure(data.message));


  -> at the end instead of setting both of the loading and error we can just dispatch
     
     dispatch(signinsuccess(data));

// when their is an error
 -> dispatch(signinfailure(error.message));

 // and instead of having two hooks error and loading we can import error and loading 
   from our gloabal state (state name was user)

 const {loading,error} = useSelector((state) => state.user);

--> test it

# redux persist 

-> in this section we want to fix the problem as when we refresh the page we loose our initial states and data of the redux store


fix:
->pACKage -> redux persist(will help to add these info to the local storage )

->in client site  ->" npm i redux-persist"
-> go to store.js - instead of userreducer -> combine the reducers first -> and then process these reducers using persist reducer function ->

->2:55-> 3:00:00

*************************************************
Add Google Oauth functionality
*************************************************

# add google 0auth functionality
 - create the file of firebase inside src 
- front(end)
- backend

*************************************************
we are going to update the header section and show the user that is sigining the avatar of he user and then once we will click it we can see the profile page -> and also we wannaq make the profile page private (so if the person is not signed in they are not allowed to see the profile page)
*************************************************
# UPDATE the header and make the profile page private 
-3:28:00
- note: usenavigate is a hook and naviagate is a component
- privating a route using {privateroute compos,outlet}
-"Navigate" in React (General Concept): In a broader sense, "navigate" in React can refer to the act of moving between components or routes within a React application. 

*************************************************


# Complete the profile page UI

-3:36:09

-ctrl-d Can be used to select multiple
*****************************************************
--in the next section we are going to complete the image upload functionality so we can change this image and also connect this application to firebase storage to be able to add our files to that platform 
*****************************************************

# Complete Image Upload Functionality

- create storage
-change rules off firebase inorder to read and write files from there
-firebase returns an download url from which we will be able to fetch data or update
<!--  allow read;
      allow write: if
      request.resource.size < 2* 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') --> these lines will help user to store and fetch these images of <=2mb>
      


# Create update user API route 
-in the user route we will verify the token before using the update controller
- here we are sending via cookie so inorder to get token from cookie we need to use cookie parser
- so we need to install package for that
-npm i cookie-parser
- then initialize this package in index.js
# completing update user functionality
//when the curent user is authenticated show his name in the input box so set5 default value to what gets stored in redux as current user info and use the data to show the default values in the field

//just like we were having reducers for start of req 
in between inside(signin)
and end   (backend+frontend)-requires reducers in frontend to track the coming and going of data 
//so for updating user also we will have 3 more reducers just like we had in sigin/signup

- here we are going to connect the front end with the backend . so we are gonna add the event listners forthese inputs we are gonna complete the front end and we are going to connect it to the API and really we can update the user from this section (client site)


# Add delete user functionality

--same her after making the delete route you need to create reducer functions since(frontend clicks backend chnage)



# Add signout user functionality

-- first create the backend for sign out
--done


#  Add create listing API route

--first the backend for api route creation before making the ui

# completed creatating listiting UI
--done

# upload listing images functionality
- after using a usestatehook to save the uploaded files we are going to use our storage sent platform which is firebase ...

# complete create listing page functionality

 --complete 

 -- NOTE after the listing is completed after create listing ==>
 we want to [redirect]  the user to that listing pag each listing is going to have an id'
 -based on that id a page will creatd and we want to redirect the person to that page 
 

# create get user listings api
-- start
-- create api routes for this endpoints so we can get the info
--in the next section we are going to complete the func

# complete show user listing functionality
-- after creating the api rout for listing we know create the get user listings ui(client site )-connection to backend


-done(add some css extra to the buttons)



# complete delete user listing func

-if we use the delete button in "your listing" section of our profile we will delete that from the ui as well as the data base

- add event listner to delete=> which is goint=g to request from the api route 

# create update listing api

 -in this function we will be working on the edit functionality 
- if we press edit we will be redirected to the edi listing pageof the specific id and also we get all the info like tile, desc etc

- so first we will be working on the api route of this edit listing then we goona complete the functionality 


# complete updqating listing functionality

--last minutes
-complete
# Add image Slider to the listing page
- we will create an listing page having the details of particular list of the user 
- based on the images we want to create a slider using the package called swiper 
- add a button to get the link
- have tile
- have icons from reqct icons package
- show if it is for sale or rent
-1st>>
we will bring all the information of the listing in the useEffect
-7:39:43.....continue

# Complete Listing page
-complete

# Add contact landlord functionality to the listing page
---adding this

-create contact landlord page and the person whois not authenticated cannot see the contact button
- if the person who has created the model cannot see the contact landloard page as he is the landlrd himslef

-8:23:00

# create Search Api route
-- the most difficult part of the project


# complete header search form functionality
- complete

# Create Search page UI
-- first create search ui 
-- then add on change event listners 
-- and then show the results


# Add onChange and onSubmit functionality to the search page
- after we take the data to hoo(state) from the bars we now submit the data to change the url
- applied useeffects to make url and search bar ineractive

-- now based on the info we have over all from everywhere we want to fetch data from database

-- and show the result in listing results



# Create the listing item component and show listings
- show the data to listing result and create cards in the ui
----9:32:40
--- install" tailwind css line clamp" to truncate two lines plugin

- when you are changing the config file do restrart the server otherwise you will get error


# Add show more listings functionality
-start


# Complete home page

# Complete about page

# Deploy to render