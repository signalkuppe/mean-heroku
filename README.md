# mean-heroku

> a starterkit for projects based on the mean stack using Heroku as PAAS

## Why
Mean stack is cool but get it all done can be difficult.
There are lots of starter kits but they often make assumptions or miss some important parts.
This example show the complete workflow to build a node js app based on [Mongodb](https://www.mongodb.org),
[Mongoose](http://mongoosejs.com/), [Express](http://expressjs.com/) and [Angular](https://angularjs.org/) and
deploy it with [Heroku](https://www.heroku.com)

### Set up on your local machine
- be sure to have mongodb installed and running
- clone the repo
- run npm install
- start the app using ```js nodemon app ``` (see [nodemon](http://nodemon.io) app docs)

### Deploy to Heroku

- sign up at Heroku's website for a Free Plan
- create an app and follow their step by step guide
- add the MongoLab app with ```js heroku addons:create mongolab:sandbox ``` (you need the enter your credit card info but you won't be charged)
- deploy your app using ```js git push heroku master ```
- visit the application url
- enjoy!

### To Do

Better docs

## License
Copyright (c) 2015 [signalkuppe](http://www.signalkuppe.com). Licensed under the MIT license.
