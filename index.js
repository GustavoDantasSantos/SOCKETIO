const express = require("express");
const app = express();
// fazendo o express rodar com base no servidor nativo do node, isso é importante para quando se trabalhar com o socket io
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.set("view engine","ejs");

app.get("/", (req, res)=> {
    res.render("index")
});

http.listen(2000, ()=> {
    console.log(`app rodando`);
});

io.on("connection", (socket)=> {

    socket.on("disconnect", ()=> {
       console.error(`X: desconectou + ${socket.id}`);
    });

    socket.on("msg", (data)=> {
        io.emit("showmsg", data);
    });

});