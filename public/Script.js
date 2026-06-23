const playerNameInput = document.querySelector("#name");
const leftBtn = document.querySelector("#left");
const rightBtn = document.querySelector("#right");
const character = document.querySelector("#character");
const createBtn = document.querySelector("#create");
const joinBtn = document.querySelector("#join");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const displayCode = document.querySelector("#room-code");
const roomCodeInput = document.querySelector("#input-roomcode");
const enterBtn = document.querySelector("#submit");
const message = document.querySelector("#message");
const player1 = document.querySelector("#name1");
const player2 = document.querySelector("#name2");
const avatar1 = document.querySelector("#avatar1");
const avatar2 = document.querySelector("#avatar2");
const poisonedConter = document.querySelector("#poisoned-counter");
const turnMessage = document.querySelector("#turn");
const atePoisoned = document.querySelector("#ate-poisoned");
const boardBtn1 = document.querySelectorAll(".board1 button");
const board1 = document.querySelector(".board1");
// const board2 = document.querySelector(".board2");
// const boardBtn2 = document.querySelectorAll(".board2 button");
const instruction = document.querySelector("#instrction");
const poisonBtn = document.querySelector("#poison-btn");
const poisoned = document.querySelector("#poisoned");
const poisoning = document.querySelector("#poisoning");
const poisonAudio = new Audio("rsc/poisoned.mp3");
const ateAudio = new Audio("rsc/ate.mp3");
const gameOverWindow = document.querySelector(".game-over-window");
const gameOverMessage = document.querySelector("#game-over-message");
const winner = document.querySelector("#winner");
const gameOverBtn = document.querySelector("#game-over-btn");

// const startBtn = document.querySelector("#start-button");
// let roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();



// const playerAvatar = "null";
// const playerAvatar = document.querySelector('');
let playerAvatar = 2;
function leftFunc() {
    if (playerAvatar == 1) {

    } else {
        playerAvatar = playerAvatar - 1;
        character.style.backgroundImage = `url('./rsc/avatar${playerAvatar}.png')`;
    }
}
function rightFunc() {
    if (playerAvatar == 3) {

    } else {
        playerAvatar = playerAvatar + 1;
        character.style.backgroundImage = `url('./rsc/avatar${playerAvatar}.png')`;
    }
}
if (character) {
    leftBtn.addEventListener("click", leftFunc);
    rightBtn.addEventListener("click", rightFunc);
}

function createRoom() {
    if (!playerNameInput.value) {
        document.documentElement.style.setProperty("--placeholder-color", "red");
    } else {
        const playerName = playerNameInput.value.toUpperCase();
        sessionStorage.setItem("player", playerName);
        sessionStorage.setItem("id", 1);
        // sessionStorage.setItem("avatar1", playerAvatar);
        // const admin = "admin";
        const call = async () => {
            let roomCode;
            const res = await fetch("/api/create-room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: 1, playerName, playerAvatar })
            });
            await res.json()
                .then(data => {
                    roomCode = data.roomCode;
                    sessionStorage.setItem("roomCode", roomCode);
                    window.location.href = data.redirect;
                });
        };
        call();
    }
}
if (createBtn) {
    createBtn.addEventListener("click", createRoom);
};

function joinRoom() {
    if (!playerNameInput.value) {
        document.documentElement.style.setProperty("--placeholder-color", "red");
    } else {
        const playerName = playerNameInput.value.toUpperCase();
        sessionStorage.setItem("player", playerName);
        // sessionStorage.setItem("avatar2", playerAvatar);
        window.location.href = "/join-room.html";
    }
};
if (joinBtn) {
    joinBtn.addEventListener("click", joinRoom);
};



function enter() {
    const roomCode = roomCodeInput.value.toUpperCase();
    const playerName = sessionStorage.getItem("player");
    // const playerAvatar = sessionStorage.getItem("avatar2");
    sessionStorage.setItem("roomCode", roomCode);
    sessionStorage.setItem("id", 2);
    const call = async () => {
        const res = await fetch("/api/join-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: 2, playerName, playerAvatar, roomCode })
        });

        await res.json().then(data => {
            // if (!data.message) {
            if (data.roomcode == roomCode) {
                window.location.replace("/create-room.html");
            } else {
                roomCodeInput.value = "";
                document.documentElement.style.setProperty("--placeholder-color1", "red");
            }
            // }
        });
    };

    call();
};
if (enterBtn) {
    enterBtn.addEventListener("click", enter);
};



if (message) {
    // let start = "false";
    // startBtn.disabled = true;
    const roomCode = sessionStorage.getItem("roomCode");
    displayCode.textContent = `ROOM CODE: ${roomCode}`;

    // async function startRequest() {
    //     const res = await fetch("/api/room-info", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ roomCode, start: "" })
    //     });
    //     await res.json().then(data => {
    //         if (data.start == "true") {
    //             window.location.href = "/game.html";
    //             clearInterval(startInterval);
    //         };
    //     });
    // };


    // const redirect = async () => {
    //     const res = await fetch
    // }

    const call = async () => {
        const res = await fetch("/api/room-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ roomCode })
        });
        await res.json().then(data => {
            console.log(data);

            p1.textContent = `1.${data.players[0][1]}`;
            if (data.players.length == 2) {
                p2.textContent = `2.${data.players[1][1]}`;
                message.textContent = "DONE";
                message.style.color = "lightgreen";
                // startBtn.disabled = false;
                clearInterval(joinInterval);
                setTimeout(() => {
                    window.location.replace(`/game.html?${roomCode}`);
                }, 1500);
            };
        });
    };

    call();
    let joinInterval = setInterval(() => {
        call();
    }, 2500);

    // let startInterval = setInterval(() => {
    //     startRequest();
    // }, 3000);



    // function startBtnFun() {
    //     // start = "true";
    //     // const call = async () => {
    //     //     const res = await fetch("/api/room-info", {
    //     //         method: "POST",
    //     //         headers: {
    //     //             "Content-Type": "application/json"
    //     //         },
    //     //         body: JSON.stringify({ roomCode, start })
    //     //     });

    //     //     await res.json().then(data => {
    //     //         if (data.start) {
    //     //             window.location.href = "/game.html";
    //     //         };
    //     //     });
    //     // };

    //     // call();
    // };
    // startBtn.addEventListener("click", startBtnFun);

}

if (player1) {
    const roomCode = sessionStorage.getItem("roomCode");
    const id = sessionStorage.getItem("id");
    const player = sessionStorage.getItem("player");
    let turn;
    let poisonedList = ['empty', "empty", "empty"];
    let poisonedConterNum = 0;
    let checkInterval1;
    let atePoisonedCount1 = 0;
    let atePoisonedCount2 = 0;
    let viewInterval2, viewInterval1;
    let game, fetchingView1 = false, fetchingView2 = false, fetchingCheckTurn1 = false, fetchingCheckTurn2 = false, fetching = false;

    async function call() {
        const res = await fetch("/api/room-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ roomCode })
        });
        await res.json().then(data => {
            if (data.roomcode == roomCode) {
                player1.textContent = data.players[0][1];
                player2.textContent = data.players[1][1];
                avatar1.style.backgroundImage = `url('./rsc/avatar${data.players[0][2]}.png')`;
                avatar2.style.backgroundImage = `url('./rsc/avatar${data.players[1][2]}.png')`;
            } else {
                window.location.replace("/Index.html");
            }
        })
    };
    call();

    // window.history.pushState(null, "", "/game.html");

    // window.addEventListener("popstate", () => {
    //     navigator.sendBeacon("/api/expire-room", roomCode);
    // });


    // window.addEventListener("beforeunload", (e) => {
    //     // console.log(e);

    //     e.preventDefault();
    //     e.returnValue = "";
    // });

    const blob = new Blob([JSON.stringify({ id, roomCode })], { type: "application/json" });
    window.addEventListener("pagehide", () => {
        window.location.replace("/Index.html");
        navigator.sendBeacon("/api/expire-room", blob);
    });


    async function update() {
        const res = await fetch("/api/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ roomCode, id, poisonedList })
        });
    }

    async function view1() {
        if (fetchingView1) return;

        fetchingView1 = true;

        try {
            const res = await fetch("/api/room-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomCode })
            });
            await res.json().then(data => {
                if (data.turn) {
                    console.log("viewing...");
                    let count = 0;
                    for (let i = 0; i < data.moves2.length; i++) {
                        if (data.poisoned1.includes(data.moves2[i])) {
                            count += 1;
                            boardBtn1[data.moves2[i]].style.backgroundImage = "url('./rsc/poison.png')";
                            atePoisoned.textContent = `ATE-POISONED: ${count}`;
                        } else {
                            atePoisoned.textContent = `ATE-POISONED: ${count}`;
                            boardBtn1[data.moves2[i]].style.backgroundImage = "url('./rsc/eaten.png')";
                        }
                    }

                    if (count == 3) {
                        console.log("game over");
                        clearInterval(viewInterval1);
                        gameOverWindow.style.display = "flex";
                        gameOverMessage.textContent = "Mar Gaya Opponent :>";
                        winner.textContent = `WINNER: ${data.players[0][1]}`;
                        gameOverBtn.addEventListener("click", () => {
                            location.reload();
                        });
                    }

                    if (data.turn == 1) {
                        clearInterval(viewInterval1);
                        setTimeout(() => {
                            boardBtn1.forEach(btn => {
                                btn.disabled = false;
                                btn.style.backgroundImage = "url('./rsc/samosa.png')";
                            });

                            let count = 0;
                            for (let i = 0; i < data.moves1.length; i++) {
                                boardBtn1[data.moves1[i]].disabled = true;
                                if (data.poisoned2.includes(data.moves1[i])) {
                                    count += 1;
                                    boardBtn1[data.moves1[i]].style.backgroundImage = "url('./rsc/poison.png')";
                                    atePoisoned.textContent = `ATE-POISONED: ${count}`;

                                } else {
                                    atePoisoned.textContent = `ATE-POISONED: ${count}`;
                                    boardBtn1[data.moves1[i]].style.backgroundImage = "url('./rsc/eaten.png')";
                                }
                            }
                            // atePoisoned.style.display = "block";
                            navigator.vibrate([250, 100, 250]);
                            game();

                        }, 1000);
                    }
                } else {
                    console.log("[WINNER: player1], player2 left");
                    clearInterval(viewInterval1);
                    gameOverWindow.style.display = "flex";
                    gameOverMessage.textContent = "Opponent Dar Gaya";
                    winner.textContent = `WINNER: ${player}`;
                    gameOverBtn.addEventListener("click", () => {
                        location.reload();
                    });
                }
            })

        } catch (error) {
            console.log(error);
        } finally {
            fetchingView1 = false;
        }
    }

    async function view2() {

        if (fetchingView2) return;

        fetchingView2 = true;

        try {
            const res = await fetch("/api/room-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomCode })
            });
            await res.json().then(data => {
                // console.log("viewing...");
                if (data.turn) {
                    console.log("viewing...");
                    let count = 0;
                    for (let i = 0; i < data.moves1.length; i++) {
                        if (data.poisoned2.includes(data.moves1[i])) {
                            count += 1;
                            boardBtn1[data.moves1[i]].style.backgroundImage = "url('./rsc/poison.png')";
                            atePoisoned.textContent = `ATE-POISONED: ${count}`;
                        } else {
                            atePoisoned.textContent = `ATE-POISONED: ${count}`;
                            boardBtn1[data.moves1[i]].style.backgroundImage = "url('./rsc/eaten.png')";
                        }
                    }
                    atePoisoned.style.display = "flex";

                    if (count == 3) {
                        console.log("game over");
                        clearInterval(viewInterval1);
                        gameOverWindow.style.display = "flex";
                        gameOverMessage.textContent = "Mar Gaya Opponent :>";
                        winner.textContent = `WINNER: ${data.players[1][1]}`;
                        gameOverBtn.addEventListener("click", () => {
                            location.reload();
                        });
                    }

                    if (data.turn == 2) {
                        clearInterval(viewInterval2);
                        setTimeout(() => {
                            boardBtn1.forEach(btn => {
                                btn.disabled = false;
                                btn.style.backgroundImage = "url('./rsc/samosa.png')";
                            });

                            let count = 0;
                            for (let i = 0; i < data.moves2.length; i++) {
                                boardBtn1[data.moves2[i]].disabled = true;
                                if (data.poisoned1.includes(data.moves2[i])) {
                                    count += 1;
                                    boardBtn1[data.moves2[i]].style.backgroundImage = "url('./rsc/poison.png')";
                                    atePoisoned.textContent = `ATE-POISONED: ${count}`;
                                } else {
                                    atePoisoned.textContent = `ATE-POISONED: ${count}`;
                                    boardBtn1[data.moves2[i]].style.backgroundImage = "url('./rsc/eaten.png')";
                                }
                            }
                            navigator.vibrate([250, 100, 250]);
                            game();
                        }, 1000);
                    }
                } else {
                    console.log("[WINNER: player2], player1 left");
                    clearInterval(viewInterval2);
                    gameOverWindow.style.display = "flex";
                    gameOverMessage.textContent = "Opponent Dar Gaya";
                    winner.textContent = `WINNER: ${player}`;
                    gameOverBtn.addEventListener("click", () => {
                        location.reload();
                    });

                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            fetchingView2 = false;
        }
    }

    async function noteMove(move) {
        const res = await fetch("/api/move", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, roomCode, move })
        });
    }


    async function checkTurn1() {

        if (fetchingCheckTurn1) return;

        fetchingCheckTurn1 = true;

        try {
            const res = await fetch("/api/room-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomCode })
            });
            await res.json().then(data => {
                console.log(data);
                if (data.turn == 1) {
                    clearInterval(checkInterval1);
                    boardBtn1.forEach(btn => {
                        btn.style.backgroundImage = "url('./rsc/samosa.png')";
                    });
                    navigator.vibrate([250, 100, 250]);
                    game();
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            fetchingCheckTurn1 = false;
        }



    }

    async function click(i) {
        if (fetching) return;

        fetching = true;

        try {
            const res = await fetch("/api/room-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomCode })
            });
            await res.json().then(data => {
                if (data.turn) {
                    if (data.turn == 1) {
                        if (data.poisoned2.includes(i)) {
                            atePoisonedCount1 += 1;
                            boardBtn1[i].style.backgroundImage = "url('./rsc/poison.png')";
                            poisonAudio.play();
                            atePoisoned.textContent = `ATE-POISONED: ${atePoisonedCount1}`
                            noteMove(i);
                            setTimeout(() => {
                                atePoisoned.textContent = `ATE-POISONED: 0`;
                                poisonBtn.style.display = "none";
                                poisoning.style.display = "none";
                                turnMessage.textContent = "Opponent's View";
                                atePoisoned.style.display = "flex";
                                poisoned.style.display = "flex";
                                view1();
                                viewInterval1 = setInterval(() => {
                                    view1();
                                }, 1700);
                                if (atePoisonedCount1 == 3) {
                                    console.log('game over');
                                    clearInterval(viewInterval1);
                                    gameOverWindow.style.display = "flex";
                                    gameOverMessage.textContent = "Sorry Bhai, Har Gaya Tu";
                                    winner.textContent = `WINNER: ${data.players[1][1]}`;
                                    gameOverBtn.addEventListener("click", () => {
                                        location.reload();
                                    });
                                }
                                boardBtn1.forEach(btn => {
                                    btn.disabled = true;
                                    btn.style.backgroundImage = "url('./rsc/samosa.png')";
                                });
                            }, 800);
                        } else {
                            boardBtn1[i].style.backgroundImage = "url('./rsc/eaten.png')";
                            ateAudio.play();
                            noteMove(i);
                            setTimeout(() => {
                                poisonBtn.style.display = "none";
                                poisoning.style.display = "none";
                                turnMessage.textContent = "Opponent's View";
                                atePoisoned.style.display = "flex";
                                poisoned.style.display = "flex";
                                view1();
                                viewInterval1 = setInterval(() => {
                                    view1();
                                }, 1700);
                                boardBtn1.forEach(btn => {
                                    btn.disabled = true;
                                    btn.style.backgroundImage = "url('./rsc/samosa.png')";
                                });
                            }, 800);
                        }
                    } else {
                        if (data.poisoned1.includes(i)) {
                            atePoisonedCount2 += 1;
                            boardBtn1[i].style.backgroundImage = "url('./rsc/poison.png')";
                            poisonAudio.play();
                            atePoisoned.textContent = `ATE-POISONED: ${atePoisonedCount2}`

                            noteMove(i);
                            setTimeout(() => {
                                atePoisoned.textContent = `ATE-POISONED: 0`
                                poisonBtn.style.display = "none";
                                poisoning.style.display = "none";
                                turnMessage.textContent = "Opponent's View";
                                atePoisoned.style.display = "flex";
                                poisoned.style.display = "flex";
                                view2();
                                viewInterval2 = setInterval(() => {
                                    view2();
                                }, 1700);
                                if (atePoisonedCount2 == 3) {
                                    console.log('game over');
                                    clearInterval(viewInterval2);
                                    gameOverWindow.style.display = "flex";
                                    gameOverMessage.textContent = "Sorry Bhai, Har Gaya Tu";
                                    winner.textContent = `WINNER: ${data.players[0][1]}`;
                                    gameOverBtn.addEventListener("click", () => {
                                        location.reload();
                                    });
                                }
                                boardBtn1.forEach(btn => {
                                    btn.disabled = true;
                                    btn.style.backgroundImage = "url('./rsc/samosa.png')";
                                });
                            }, 800);
                        } else {
                            boardBtn1[i].style.backgroundImage = "url('./rsc/eaten.png')";
                            ateAudio.play();
                            noteMove(i);
                            setTimeout(() => {
                                // atePoisoned.textContent = `ATE-POISONED: 0`
                                poisonBtn.style.display = "none";
                                poisoning.style.display = "none";
                                turnMessage.textContent = "Opponent's View";
                                atePoisoned.style.display = "flex";
                                poisoned.style.display = "flex";
                                view2();
                                viewInterval2 = setInterval(() => {
                                    view2();
                                }, 1700);
                                boardBtn1.forEach(btn => {
                                    btn.disabled = true;
                                    btn.style.backgroundImage = "url('./rsc/samosa.png')";
                                });
                            }, 800);
                        }
                    }
                } else {
                    if (id == 1) {
                        console.log("[WINNER: player1], player2 left");
                        gameOverWindow.style.display = "flex";
                        gameOverMessage.textContent = "Opponent Dar Gaya";
                        winner.textContent = `WINNER: ${player}`;
                        gameOverBtn.addEventListener("click", () => {
                            location.reload();
                        });
                    } else {
                        console.log("[WINNER: player2], player1 left");
                        gameOverWindow.style.display = "flex";
                        gameOverMessage.textContent = "Opponent Dar Gaya";
                        winner.textContent = `WINNER: ${player}`;
                        gameOverBtn.addEventListener("click", () => {
                            location.reload();
                        });
                    }
                }
            })
        } catch (error) {
            console.error(error);
        } finally {
            fetching = false;
        }
    }

    game = () => {
        turnMessage.style.display = "block";
        turnMessage.textContent = "Tap The Samosa To Ate It";
        atePoisoned.style.display = "flex";
        poisoned.style.display = "flex";
        if (id == 1) {
            atePoisoned.textContent = `ATE-POISONED: ${atePoisonedCount1}`
        } else {
            atePoisoned.textContent = `ATE-POISONED: ${atePoisonedCount2}`
        }
        for (let i = 0; i <= boardBtn1.length - 1; i++) {
            boardBtn1[i].onclick = () => {
                boardBtn1.forEach(btn => {
                    btn.disabled = true;
                });
                click(i);
            }
        }
    }


    function poisonFunc() {
        // poisonedConter.textContent = `POISONED: ${0}`;
        poisoning.style.visibility = "visible";

        for (let i = 0; i <= boardBtn1.length - 1; i++) {
            boardBtn1[i].onclick = () => {
                if (poisonedList.includes(i)) {
                    poisonedConterNum -= 1;
                    boardBtn1[i].style.backgroundImage = "url('./rsc/samosa.png')";;
                    poisonedConter.textContent = `POISONED: ${poisonedConterNum}`;
                    poisonedList.splice(poisonedList.indexOf(i), 1);
                    poisonedList.push("empty");
                } else {
                    if (poisonedList.includes("empty")) {
                        poisonedConterNum += 1;
                        boardBtn1[i].style.backgroundImage = "url('./rsc/poison.png')";
                        poisonedConter.textContent = `POISONED: ${poisonedConterNum}`;
                        poisonedList.splice(poisonedList.indexOf("empty"), 1);
                        poisonedList.push(i);
                    } else {
                        instruction.textContent = "MAXIMUM POISONED";
                        setTimeout(() => {
                            instruction.textContent = "";
                        }, 2000);

                    };
                };
                console.log(poisonedList);
            };
        };
        // }
        poisonBtn.addEventListener("click", () => {
            if (poisonedList.includes("empty")) {
                instruction.textContent = "POISON MORE SAMOSA";
                setTimeout(() => {
                    instruction.textContent = "";
                }, 2000);
            } else {
                if (turn == 2) {
                    boardBtn1.forEach(btn => {
                        btn.disabled = true;
                        btn.style.backgroundImage = "url('./rsc/samosa.png')";
                    });
                    poisonBtn.style.display = "none";
                    poisoning.style.display = "none";
                    turnMessage.textContent = "Opponent's View";
                    atePoisoned.style.display = "flex";
                    poisoned.style.display = "flex";
                    viewInterval2 = setInterval(() => {
                        view2();
                    }, 1500);

                } else {
                    poisoning.style.display = "none";
                    atePoisoned.style.display = "none";
                    turnMessage.textContent = "Wait, Opponent Is Poisoning The Samosa...";
                    poisoned.style.display = "flex";
                    poisonBtn.style.display = "none";
                    checkInterval1 = setInterval(() => {
                        checkTurn1();
                    }, 3000);
                }
                update();
                // board2.style.display = "flex";
                // board1.style.display = "none";

            };
        });
    };

    let checkInterval2;
    async function checkTurn2() {

        if (fetchingCheckTurn2) return;

        fetchingCheckTurn2 = true;

        try {
            const res = await fetch("/api/room-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomCode })
            });
            await res.json().then(data => {
                console.log(data);
                if (data.turn == 2) {
                    turn = data.turn;
                    clearInterval(checkInterval2);
                    poisoning.style.display = "flex";
                    poisoned.style.display = "none";
                    poisonBtn.style.display = "block";
                    navigator.vibrate([250, 100, 250]);
                    poisonFunc();
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            fetchingCheckTurn2 = false;
        }
    }

    if (id == 1) {
        board1.style.display = "flex";
        // board2.style.display = "none";
        poisonFunc();
    } else {
        board1.style.display = "flex";
        // board2.style.display = "none"; 
        // board2.style.display = "flex";
        // board1.style.display = "none";
        poisoning.style.display = "none";
        atePoisoned.style.display = "none";
        turnMessage.textContent = "Wait, Opponent Is Poisoning The Samosa...";
        poisoned.style.display = "flex";
        poisonBtn.style.display = "none";

        checkInterval2 = setInterval(() => {
            checkTurn2();
        }, 3000);

    }


    // board logic

}
























