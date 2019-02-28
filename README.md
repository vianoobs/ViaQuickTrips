# ViaQuickTrips
A web app for Via customers to find nearby commodities and make their way on the right bus

## Getting Started 
To get started with this project, follow these steps:
### Installation
- In the directory you wish this project to live, run the command `git clone git@github.com:vianoobs/ViaQuickTrips.git`. *note* ---> this **will** create a folder named `ViaQuickTrips/` with the project inside of it
- Navigate into the newly created directory with `cd ViaQuickTrips`
- To install server side dependencies, run `npm install` from the `root` directory, `ViaQuickTripss/` 
- Next, find the `client/` directory with `cd client/`
- From the `client/` directory, run `npm install` to add the necessary client side dependencies for this project
### Starting the servers
- Locate the `Config/` directory, with `cd Config/` executed from `ViaQuickTrips/`
    - Follow the example in `sampleConfig.js` to add your own API Keys for the project
- To start both the back-end and client server, run `npm run dev` from `ViaQuickTrips/`
    - The back-end server runs on `localhost:8081`
    - The client server runs on `localhost:8080`
- If there is an error, run `killall -u <yourUserName>` to ensure there are no running servers    
- This server will automatically update the page upon changes made, including `CSS`

### Connecting to a database
This project uses [MongoDb](https://www.mongodb.com/) , and [mLab](https://mlab.com/) hosting service to remotely connect to a database.
<br><br>Follow their instructions to setup a database, and user for that data base. Follow the `sampleConfig.js` to plug your credentials into the `config` file

## Tech Stack
This application uses Vue.js, MongoDb, Node, and Express. <br> Express serves a RESTful API, consumed by the Vue.js front end.

## Contributing
Ensure that you are on *your own branch* **before** making edits
### Sample Workflow
- Determine your branch by executing `git branch`
- If `master` is the result, run `git checkout -b <branchName>` to create, and switch to the new branch
- Make desired changes
- Stage the changes by running `git add <editedFile>` or `git add .` to stage every file
- Commit with `git commit -m "<yourCommitMessage>"`
- Set the upstream ( default push path ), by running `git push -u origin <yourBranchName>`
    - If unsure about the remote name ( `origin` in the above case ), run `git remote -v` to check your remotes ( Remotes are usually Github Repositories )
- Push to your **own** branch with `git push origin <myBranchName>` or simply `git push` if upstream was set

### Editing client side
*Highlights:*
- `CSS` is imported into each `.js` file
- If the `.js` file name is `LoggedOutHeader.jsHeader.js`, the corresponding `CSS` will be `LoggedOutHeader.css`
