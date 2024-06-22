# My ToDo Web
This is a TODO List Project using React Next.js as front end and Express.js as backend (REST API). A free MongoDB Atlas instance was used.

### Tech Stacks:
1. `Next.js React Framework` - I used the latest version to test the changes at the same time.
2. `Tailwind CSS` - I avoided using MaterialUI as Next.js has an issue with styled components which needs more time.
3. `Express.js` - So far the most stable backend framework for Node.js.
4. `MongoDB Atlas` - I spooled a dedicated Atlas server for 3 days as Atlas Serverless might fail from time to time.

### Features:
- [x] List all Todos
- [x] Add a Todo
- [x] Edit a Todo
- [x] Delete a Todo
- [x] Mark a Todo as "Done" (minimal state change)
- [ ] Signup
- [ ] Login
- [ ] Drag the Todo cards to rearrange   

### How to Run the project (Front End and Server)
```bash
# Open a terminal window.
# In the root of the project run install
npm install

# Run the Next.js server:
npm run dev

# Next, open a separate terminal window.
# Go to the server directory
cd server

# Run the install:
npm install

# Run the API:
npm start
```

The front end application will run in localhost port 3000 while the server will be in port 8000.


