# circal-api-server
Welcome to the circal-api-server. Provides apis for all circal services.
We will use yarn instead of npm as our package manager

* First time setup
One time only - if you dont have yarn package manager. Install it 
``` brew install yarn ```

Install MongoDB (community edition) if you dont have it.

* Starting and Stopping Mogo DB
Start Mongo DB once on your machine. Once it is started it will always be available 
until you stop it.
```./startMongoDB.sh```

To stop mongoDB if you need use the following script.
```./stopMongoDB.sh```

Upgrading MongoDB
``` brew upgrade mongodb/brew/mongodb-community ```

* Build steps for circal-api-server

First install all dependencies using.
```yarn install ```

Build the  project.
```yarn build ```

Run the server.
```yarn run start ```

Server should be started on port 8080. In the browser paste the following to view all apis
``` http://localhost:8080/docs ```