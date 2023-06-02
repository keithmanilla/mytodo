# My ToDo Web
This is a TODO List Project using React Next.js as front end and Express.js as backend (REST API). A free MongoDB Atlas instance was used. An `.env` file was added in the codebase for quick preview. No `.env` files were used.

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

---
### About Me
I used the latest version of Next.js 13.4.x to check some of the new features. This is also my first time to use TailwindCSS and I added this "unfamiliar variables" with the time limit which I pushed down to 9 hours. I believe that coding should be fun and adding additional challenges makes it more exciting. At the same time, I believe that coding work should be well organized and readable. Documentation for me is a must. I have gone through code reviews of bad codes in the past which turned into a ridiculous "Reverse Engineering Work". If I had extra amount of time, I would have finished the extra features and created a Docsify or Docusaurus documentation portal for this project. But at the moment, the markdown files will at least suffice.

