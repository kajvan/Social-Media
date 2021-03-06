$(document).ready(function () {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $.post("/Social/php/GetProfile.php", { User: location.search.substring(1) }, function (data) {
        var data = data.split("/~/~");
        var User = JSON.parse(data[0]);
        if(data[1] != 'null'){
            var Follows = JSON.parse(data[1]);
        }
        var Post = JSON.parse(data[2]);
        if(data[3] != 'null'){
            var Followers = JSON.parse(data[3]);
        }

        document.getElementById("Posts").innerHTML = "";

        document.getElementById("UserName").innerText = `${User[0].name}`
        var date = User[0].joined.split("-");
        document.getElementById("Joined").innerText = `${date[2]} ${months[date[1] - 1]} ${date[0]}`
        if(location.search.substring(1) == sessionStorage.getItem("Name")){
            document.getElementById("Friend").style.display ="none";
        } else {
            document.getElementById("Friend").innerText = "Add Friend"
        }
        for (let i = 0; i < Post.length; i++) {
            var Date = Post[i].created;

            let Button = document.createElement("button");
            Button.id = "But " + Post[i].id;
            Button.className = "PostButton";
            document.getElementById("Posts").appendChild(Button);

            let Main = document.createElement("div");
            Main.id = "post " + Post[i].id;
            document.getElementById(`But ${Post[i].id}`).appendChild(Main);

            let info = document.createElement("div");
            info.id = "Post Info " + i;
            document.getElementById("post " + Post[i].id).appendChild(info);

            info.innerHTML = `<button class='SameLine' id='NameDisplay'">${User[0].name}</button>`
            info.onclick = function () {window.location.href=`Profile?${User[0].name}`}

            calculateDate(Date, info);

            let content = document.createElement("div");
            content.id = "Content " + i;
            document.getElementById("post " + Post[i].id).appendChild(content);
            let text = document.createElement("p");
            text.id = "Header";
            text.style = "text-align: left; font-size: 110%; font-weight: 110%;";
            text.innerText = `${Post[i].content}`;
            document.getElementById("Content " + i).appendChild(text);

            let buttons = document.createElement("div");
            buttons.id = "Buttons " + i;
            buttons.innerHTML = `<input type="button" id="Likes ${Post[i].id}" value="${Post[i].likes} likes" onclick="event.stopPropagation(Like(${Post[i].id}))">
            <input type="button" id="Dislike ${Post[i].id}" value="${Post[i].dislikes} dislikes" onclick="event.stopPropagation(Dislike(${Post[i].id}))">
            <input type="button" id="Comment ${Post[i].id}" value="${Post[i].comments} comments" onclick="event.stopPropagation(BeginComment(${Post[i].id}))">
            <hr>`
            document.getElementById("post " + Post[i].id).appendChild(buttons);
        }

    });
});

function calculateDate(Date, info){
    if (Date >= 60) {
        Date = Math.floor(Date / 60);
        if (Date >= 24) {
            Date = Math.floor(Date / 24);
            console.log(Date);
            if(Date >= 30){
                Date = Math.floor(Date / 30);

                if(Date > 365){
                    Date = Math.floor(Date / 365);
                    if(Date < 2){
                        info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} year ago</span> <br><br>`
                    }

                    else {
                        info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} years ago</span> <br><br>`
                    }
                }

                else if(Date < 2){
                    info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} month ago</span> <br><br>`
                }
    
                else  {
                    info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} months ago</span> <br><br>`
                }
            }

            else if(Date < 2){
                info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} day ago</span> <br><br>`
            }

            else  {
                info.innerHTML += ` <span class='SameLine' id='TimePassed'> &nbsp; ${Date} days ago</span> <br><br>`
            }

        }

        else {
            if(Date < 2){
                info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} hours ago</span> <br><br>`
            }

            else {
                info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} hour ago</span> <br><br>`
            }
        }
    }

    else {
        if (Date < 1) {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; less than a minute ago</span> <br><br>`
        }

        else if(Date = 1) {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} minute ago</span> <br><br>`
        }

        else {
            info.innerHTML += `<span class='SameLine' id='TimePassed'> &nbsp; ${Date} minutes ago</span> <br><br> `
        }
    }
}