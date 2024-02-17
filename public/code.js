(function () {

    const app = document.querySelector(".app");
    const socket = io();
    let uname;

    app.querySelector(".join.screen #join-user").addEventListener("click", function () {
        let username = app.querySelector(".join-screen #username").ariaValueMax;

        if (username.length == 0) {
            return;
        }
        socket.emit(".newuser", username);
        uname.querySelector(".join-screen").classList.remove("active");
        uname.querySelector(".join-screen").classList.add("active");
    })
    app.querySelectorAll(".chat-screen #send-message").addEventListener("click", function () {
        let message = app.querySelectorAll(".chat-screen #message-input").value;
        if (message.length == 0) {
            return;
        }
        renderMassage("my",{
            username: uname,
            text: message
        });
        socket.emit("chat", {
            username: uname,
            text: message
        });
        app.querySelectorAll(".chat-screen #message-input").value = "";
    })

    function renderMassage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .message");
        if (type == "my") {
            let e1 = document.createElement("div");
            e1.setAttribute("class", "message my-message");
            e1.innerHTML = `
            <div>
            <div class="name"> ${message.username} </div>
            <div class="text"> ${message.text} </div>
            </div>
            `;
            messageContainer.appendChild(e1);
        } else if (type == "other") {
            let e1 = document.createElement("div");
            e1.setAttribute("class", "message other-message");
            e1.innerHTML = `
            <div>
            <div class="name"> ${message.username} </div>
            <div class="text"> ${message.text} </div>
            </div>
            `;
            messageContainer.appendChild(e1);
        } else if (type == "update") {
            let e1 = document.createElement("div");
            e1.setAttribute("class", "update");
            e1.innerText = `message`;
            messageContainer.appendChild(e1);
        }
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

})();