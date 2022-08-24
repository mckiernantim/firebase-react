# Firebase Auth with Google and React Context API   
Quick links 
[Set Up](#project-set-up)
[Firebase API](firebase-api)
[React useContext()](react-usecontext()) 
[UserContext](managing-usercontext)
[Auth State](auth-and-state)
[Summary](#putting-it-all-together)

This project will walk you through the steps to set up User Authentiaction via Google sign in using Firebase, React and React Context.  
## What is authentication?

Authentication is what we call the process that allows a device to verify a user and then connect them with certain resources.  Authentication is important because it allows us to keep our records secure.  There are numerous ways to imnplement user Authentication and using Firebase just one of many options we can integrate in our apps. 

## What is Firebase?

Firebase is whats known as  a BAAS, or Back End As A Service, for creating mobile and web applications. 


It was originally an independent company founded in 2011.  In 2014, Google acquired the platformand it is now their flagship offering for app development. Its primary features include a Realtime noSQL database, and user authentication that all come out of the box and ready to connect to a front end application. 

While using Firebase is very convenient in many ways it also limits the scope of a full stack applicaiton by limiting the way we structure our database or backened functionality.  It is great for smaller applicaitons that do not need a large back end layer of complexity or to bring in certain features (LIKE AUTHENTICATION)

### What's So Special About it?

Firebase user Authentication is a streamlined, secure way to integrate multiple different Oauth methods to our applications including Facebook, Google, Github, Twitter and more.  Additionally, Firebase provides analytics and a database functionality out of the box.  
Authentication is a streamlined, secure way to integrate multiple different Oauth (allowing 3rd parties like Google or GitHub to handle authentication for an app like Reddit or Code Wars).  Additionally, Firebase provides analytics and a database functionality out of the box.  


In short - it's a powerful tool to help set up complex backend tasks in our applicaiton.

### How will this work?

To setup firebase on our apps we will need to perform the following:

* Signup for a Firebase account
* Set up a Create-React-App
* Register an applicaition on Firebase
* Enable Firebase Authentication
* Download our App credientials from Firebase to our `.env`
* Install Firebase via NPM
* Set up our React Context to provide auth data to components
* Set up route guards to allow  ONLY authenticated users acces
* Handle user logout

## What we're doing in React

Our React app is going to use a `service` ( just a function ) to create a 

`firebaseAuth()` instance and call the `signInWithPopUp()` 
method and pass it an instance of a `GoogleAuthProvider()`. 
This is very similar to how we import and set up our express server.  


We then take our app information from our `firebaseConfig` that Firebase 
gave us when we resitered our app.  We will then create a `Contex` 
by calling the `useContext()` hook. Don't worry you are not familiar with `useContext()` 
we'll walk through it together (read up on it <https://reactjs.org/docs/context.html>,)
but for now thinkg of a `Context` as a way to share information between components
without them down as props.  


Once our users sign in we save the information we get from Google
as state on our `Context` as `user`.  We then set up a `useEffect()` 
hook to watch our `user`.  When our `user` logs out we update state on our `Context` 
and then our `useEffect()` hook reroutes our application back to our login
page preventing our router from loading a view unless the `user` in our `Context` state is valid.


# Project Set Up



* Clone this repo!  

* Head to https://firebase.google.com/  and click `Get Started` to sign up for Firebase

* Firebase will biring you to the Project OverView Page.  Click the `</>` button to begin a web app.

    * Give your app a nickname (whatever you want it to be) 
    * You will be shown a `firebaseConfig` object.  Keep it close by - we'll need it 

* In our CRA app - create a `.env` file and paste the following in:


    ```
    REACT_APP_API_KEY=""
    REACT_APP_AUTH_DOMAIN=""
    REACT_APP_PROJECT_ID=""
    REACT_APP_STORAGE_BUCKET=""
    REACT_APP_MESSAGING_SENDER_ID=""
    REACT_APP_APP_ID=""
    REACT_APP_MEASUREMENT_ID=""

  <strong> Note </strong> we do not need to install dotenv!  Create React App allows us to acces .env files but they <em> must </em> start with `REACT_APP` in our .env files.

* Now we need to map all the values from our `firebaseConfig` object to our `.env` file.


* Create a `Firebase.js` file.  This file will handle all of our logic pertaining to firebase.  We will keep it seperate from our components.
* Remmber to install firebase!

```js 
npm i fireabase
```



# Firbebase API
Te firebase SDK - software development kit - gives us a <em> ton </em> of functionality out of the box.  For this lesson we will focus only on implementing Google Oauth.  Adding email/passoword login, or other Oauth only requires a few extra steps but is very similar.


More information on Firebase [here](https://firebase.google.com/docs/auth/web/start)

More on Oauth [here](https://en.wikipedia.org/wiki/OAuth)

In order to leverage Firebase authentaction API we need to do the following:

* Import our firebase files and create a `firebaseConfig` object with our `.env` variables


import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


```

* initialize an instance of firebase (much like an express server) with our config
```js
const app = firebase.initializeApp(firebaseConfig);
```
* export our app invoking its `auth` function
```js
export const auth = app.auth();
```

* create a `provider` for any authentication method we may be using. (facebook, twitter, email/password etc.). For this lesson we will use Google Oauth.
```js
const googleProvider = new firebase.auth.GoogleAuthProvider();
```
* Export functions that use the `signInWithPopUp()` method we get from firebase, passing in whatever `provider` we created.
```js
export const signInWithGoogle = async () => {
  try {
//the signInWithPopUp() method accepts ANY provider we create. This is all our authentication logic
  await auth.signInWithPopup(googleProvider);
   } catch (err) {
    console.log(err);
  }
};
```
* Don't forget a sign out method!
```js
export const signOut = async () =>{
  try {
    await auth.signOut()
    alert("you've signed out - congrats.")
  } catch(err) {
    console.log(err)
  }
}
```

Congratulations, you just wrote up a service to leverage Oauth for you react application.  Next step is to connect it to our Create-React-App.


# React useContext()

Next, we need to set up a context that will expose a global state value to all of our components.  Simply put, if we have a user held in the context's state - the user can navigate our application.  If not, we reoute the user to the login page.


Navigate to the `providers` folder in our app 
```js
touch userProvider.js
```
This file will be responsible for listening for any changes in our firebase `auth` object and then updating the state of our context to be consumed by our components.  

First, lets bring in our imports
```js
import React, { useEffect, useState, createContext } from "react";
//noice here we are refrenceing the service we set up earlier
import { auth } from "../Services/Firebase";
```
Next, we need to create a context that our components can consume. Let's initialize it with `null`
```js
export const UserContext = createContext(null)
```
<strong>Note:</strong> When invoked, `createContext()` <em> automatically creates a new component for our context </em>. After creating a context we have accesss to a component anywhere in our app called `<UserContext.Provider />`.  Any component <em> nested within this component </em> has access to special attribute on `<UserContext.Provider />` called `value`.  
```js
  // any thing nested in our provider can access the value stored within it
   <UserContext.Provider value={user}>
     ........< all our other components > 
    </UserContext.Provider>
```
# Managing UserContext


Now that we have our Context - `UserContext` we need to perform the following in `UserProvider.js` to managin our context



* Create  `UserProvider` component that will  handle `UserContext` state. 

* Render our `UserContext.Provider` inside of our `UserProvider`

* Import our `auth` instance from `services/firebase.js`, listen for changes, and update state accordingly

### Create  `UserProvdier` component
 
UserProvider.js
```js
export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
   return ()
  }
 
  
```
### Render our new `UserContext.Provider` component 
```js
export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
   return (
     <UserContext.Provider value={user}>

      // the props.children will render any value that is passed to our component without us specifically invoking those             // values in our tempalte

         <div>{props.children}</div>
    </UserContext.Provider>
    )
  }
```

 <strong>Note:</strong> Wait - what is this ` { props.children } ` you may be asking?  Smply put - the `props.children` method is available to us on all components.  It's best to think of it as a placeholder for values <em> we don't know yet </em> when desigining components.  In this case, our `UserProvider` component is rendering our `UserContext.Provider` component which we recieved from calling `createContext()`.  This `UserContext.Provder` component renders `{ props.children }` so that React knows that whatever is nested inside `UserContext.Provider` is rendered in our application.  

 
More on `props.children` [here](https://reactjs.org/docs/composition-vs-inheritance.html) - or try it on [codepen](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)

# Auth and State

Next, lets set up a `useEffect()` in `UserProvider` component to listen for changes in the `auth` object we brought from `firebase.js` by invoking the `onAuthStateChanged()` method from our `auth` object.
```js
export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
//listen for changes
    auth.onAuthStateChanged(async (user) => {
		console.log(user)
      if (user) {
        // get return values from Firebase
        const { email, displayName, photoURL, uid } = user;
      // save them in state
        setUser({ email, displayName, photoURL, uid });
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
   // render context provider with user state in value
    <UserContext.Provider value={user}>
      <div>{props.children}</div>
    </UserContext.Provider>
  );
};
```

<strong>Note:</strong> the `onAuthStateChanged()` method creates something called an `Observer` from a library called RXJS.  This `Observer` listens for any changes on the object it was called on will fire whatever callback we specify once the `Observer` signals a change.  We don't need to get deep under the hood for this lesson but for more on Observers click  [here](https://rxjs.dev/guide/observer)


In order to access our Context - we need to import in in `App.js` and nest our other components inside of it

App.js

```js
import { UserProvider } from "./Providers/UserProvider";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
;
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <header className="App-header">LETS LEARN FIREBASE AUTH</header>
              <LoginPage />
            </Route>
            <Route path="/loggedInPage">
              <LoggedInPage />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}
```
<strong>Note:</strong> make sure that our Router is nested inside of our `<UserProvider>` failing to do so will throw an error in leveraging `useHistory()`



# Putting It All Together

So far we've: 

* created a Firebase app to authenticate and record our users 
* Leveraged Firebase SDK API to authenticate and save our user in component state
* Created a React Context to allow access to our state value.

Our last step is to connect our `signInWithGoogle()`  method from 'firebase.js` to our `Login` component and set up a `useEffect()` to reroute our user if we are not logged in.

Login.js
Handle imports
```js
import React, { useContext, useEffect, useState } from "react";
import { LoggedInPage } from "../Pages/LoggedInPage";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import {
  signInWithGoogle,
  signOut
} from "../Services/Firebase";
```

Lets save the state of our `UserContext` and create a `useEffect()` to listen for changes and connect our functions to our buttons.

```js
export const Login = () => {
  const user = useContext(UserContext);
   useEffect(() => {
    if (user) {
      history.push("/loggedInPage");
    }
  }, [user, history]);
    return (
    <div>
      <section>
        <div>
          <div> login works</div>
          <button onClick={signInWithGoogle}>Sign in With google</button>
          <button onClick={signOut}> sign out</button>
      </div>
      </section>
    </div>
  );
};
```


Now when our user logs in with `signInWithGoogle()` method - they will be routed to our `LoggedInPage.js` via `useHistory()`.  

Lets make sure that `LoggedInPage.js` is ready to manage our authenticated user by invoking `useEffect()` to make sure we have a `user` object.  If not - let's reroute our user back to the `Login.js`.

LoggedInPage.js

Imports && component Initialization
```js
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useHistory } from "react-router-dom";
import { signOut } from "../Services/Firebase";

export const LoggedInPage = () => {
  const imgStyle = {
      width:'30vh',
      height:'30vh'
  }
  const history = useHistory()
  const user = useContext(UserContext)
  useEffect(() => { 
    if(!user){
      history.push("/")
      }
    }, [user, history]);
  
  const handleLogout = async () => {
    signOut()
    alert("you've been logged out")
  };

 return (
    <div>
	Welcome {user.displayName} !
	 <div>
        <img
          style= {imgStyle}
          alt="its the users head"
	  src={user.photoURL}
          ></img>
          <h1>WE KNOW WHAT YOU LOOK LIKE</h1>
      </div>
	

      <button onClick={handleLogout}> LOG OUT</button>
    </div>
  );
}
```

Now that we have authentcation let's navigate to the [firebase console](https://console.firebase.google.com/`). 

From the dashboard, select your app, then on the Project Overview page - select authentication from the sidebar menu.


You should now see a database that firebase uses to keep track of your users.  Notice each user has a uniqe `uid`. In our apps we can now store whatever information we may be using in our Postgress DB with the `uid` key to connect them to our users.  Any user that signs in will be recored in the Firebase Authentication table.


# Wrapping it all up

Lets review the steps of our authentication 

* We registered an app with firebase and recorded our config variables.

* Using the firebase SDK ( npm i firebase ) we initilaized an app and passed our config variables

* We leveraged Firebase's `signInWithPopUp()` function and passed it an instance of Firebase's `googleAuthProvider()` 

* using React `useContext()` API, we instantiated a `UserContext` and rendered the generated `<UserContext.Provider />` component in a UserProvider Component that listens for changes on our Firebase `auth` objet

* Our `Login.js` page and `LoggedIn.js` update their `user` state whenever the user value changes.  

* If we have a user we route the user to certain pages.  Otherwise we route them to the login.














  

