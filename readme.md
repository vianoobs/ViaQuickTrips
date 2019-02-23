# VIA Backend

To run this app, you must globally install nodemon and ts-node  
```bash
npm install -g nodemon ts-node
```

If you would like hot reloading and debugging, it depends on your ide

For webstorm, add an "attach to Nodejs/Chrome" config, set the port to 7000 or whichever port you like,  
and in the before launch options add a "Run npm script" and run the "dev" script.

This will then reload your server if you make any changes, even compiling your typescript in the process

To run from the terminal just run `npm run dev`
