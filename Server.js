const express = require("express");
const app = express();
const PORT = 6767;

app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/Index.html");
})

const rooms = {};
app.post("/api/create-room", (req, res) => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { id, playerName, playerAvatar } = req.body;

    rooms[roomCode] = {
        roomcode: roomCode,
        // startt: "false",
        moves1: [],
        moves2: [],
        players: [[id, playerName, playerAvatar]],
        turn: 1,
        poisoned1: [],
        poisoned2: []
    }

    res.json({
        roomCode,
        redirect: "/create-room.html"
    });
});

app.post("/api/join-room", (req, res) => {
    const playerInfo = req.body;

    if (!rooms[playerInfo.roomCode]) {
        return res.status(404).json({ message: "Room not found" });
    }

    if (rooms[playerInfo.roomCode].players.length == 2) {
        return res.status(400).json({ message: "Room occupied" });
    }

    rooms[playerInfo.roomCode].players.push([playerInfo.id, playerInfo.playerName, playerInfo.playerAvatar]);
    rooms[playerInfo.roomCode].roomcode = playerInfo.roomCode;

    // console.log(rooms[playerInfo.roomCode]);

    res.json(rooms[playerInfo.roomCode]);
});

app.post("/api/room-info", (req, res) => {
    const { roomCode } = req.body;

    if (!rooms[roomCode]) {
        return res.status(404).json({ message: "Room not found" });
    }
    // if ( {
    // console.log(start);
    // rooms[roomCode].startt = start; 
    res.json(rooms[roomCode]);
    console.log(rooms[roomCode]);
    // } else {
    //     res.json({ start: "" })
    // }
});

app.get("/game.html/:roomcode", (req, res) => {
    const roomCode = req.params.roomcode;

    if (!rooms[roomCode]) {
        return res.sendStatus(404);
    }

    res.redirect("/game.html");
});


app.post("/api/expire-room", (req, res) => {
    const { id, roomCode } = req.body;

    try {
        if (rooms[roomCode].players[0][0] == id) {
            rooms[roomCode].players.splice(0, 1);
        } else {
            rooms[roomCode].players.splice(1, 1);
        }
    } catch (error) {
        console.log("altu faltu error hai");
    }

    console.log(rooms[roomCode]);
    delete rooms[roomCode];
    console.log(roomCode, "deleted");

    // res.redirect("/Index.html");

    res.status(200).send();
});


app.post("/api/update", (req, res) => {
    const updates = req.body;

    if (updates.id == 1) {
        rooms[updates.roomCode].poisoned1 = updates.poisonedList;
        rooms[updates.roomCode].turn = 2;
        res.status(200).send();
    } else {
        rooms[updates.roomCode].poisoned2 = updates.poisonedList;
        rooms[updates.roomCode].turn = 1;
        res.status(200).send();
    }

    console.log(rooms[updates.roomCode]);
})

app.post("/api/move", (req, res) => {
    const request = req.body;

    if (request.id == 1) {
        rooms[request.roomCode].moves1.push(request.move);
        rooms[request.roomCode].turn = 2;
        res.status(200).send();

    } else {
        rooms[request.roomCode].moves2.push(request.move);
        rooms[request.roomCode].turn = 1;
        res.status(200).send();
    }



})








app.use(express.static("public"));
app.listen(PORT, console.log(`server started at ${PORT}`));

