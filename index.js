const app = require("./app");

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shuting down the server due to Uncaught Exception");
    process.exit(1);
})
// config

require("dotenv").config({ path: "backend/config/config.env" });



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// unhandled promise rejection
process.on("unhandledRejection",err => {
    console.log(`Error : ${err.message}`);
    console.log("Shuting down the server due to unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    });
});

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});