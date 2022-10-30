let handle;
let ip;
let card = document.getElementById("cardHolder");
let TimeOffset;
alert("The website changes into dark and light mode Automatically. The dark-light mode toggle button has also been given for user convinience.\nThe dark mode button shows the state of the backend, if its moon your local time is past 6 pm thus, the website is in dark mode.")
getIP();


let buttonElement = document.getElementById("darkBtn");

buttonElement.addEventListener('click', darklightchanger);

function darklightchanger() {
    let mode = document.getElementById("darklight");
    if (mode == null) {
        mode = document.getElementById("lightdark");
        mode.id = "darklight";
        mode.setAttribute("src", "resources/darkmode.png");

        let skill = document.querySelectorAll(".skill");
        for(let i =0 ; i<8;i++){
        skill[i].className = "col align-content-center bg-dark rounded-4  m-1 p-3 skill";
        }

        let about = document.querySelectorAll(".about");
        for(let i =0 ; i<3 ;i++){
            about[i].className = "col text-center bg-dark text-light rounded-4 ms-1 me-1 mt-2 about";
        }

        let cark = document.querySelectorAll(".cark");
        for(let i =0; i<cark.length ; i++){
            cark[i].classList.add("bg-dark");
            cark[i].classList.add("text-light");
        }

        let homm = document.querySelector(".homm");
        homm.className = "text-center bg-dark text-light rounded-4 p-4 homm";

    }
    else {
        mode.id = "lightdark";
        mode.setAttribute("src", "resources/sun.png");

        let skill = document.querySelectorAll(".skill");
        for(let i =0 ; i<8;i++){
        skill[i].className = "col align-content-center bg-light rounded-4  m-1 p-3 skill";
        }

        let about = document.querySelectorAll(".about");
        for(let i =0 ; i<3 ;i++){
            about[i].className = "col text-center bg-light text-dark rounded-4 ms-1 me-1 mt-2 about";
        }

        let cark = document.querySelectorAll(".cark");
        for(let i =0; i<cark.length ; i++){
            cark[i].classList.remove("bg-dark");
            cark[i].classList.remove("text-light");
        }

        let homm = document.querySelector(".homm");
        homm.className = "text-center bg-light text-dark rounded-4 p-4 homm";
    }
}



function readText(form) {
    handle = form.cf_id.value;
    let URL = "https://codeforces.com/api/user.info?handles=" + handle;
    getInfo(URL, handle);

    card.style.display = "flex";
}

function getIP() {
    let URL = 'https://api.ipgeolocation.io/getip';

    fetch(URL).then(response => {
        return response.json();
    }).then(json => {
        ip = json['ip'];
        getLocation();
    })
}

function getLocation() {
    let URL = "https://api.ipgeolocation.io/timezone?apiKey=9ae8fcec28c447718220502a9f0ac3ac&ip=" + ip;

    fetch(URL).then(response => {
        return response.json();
    }).then(json => {
        TimeOffset = json['timezone_offset'];
        console.log(typeof (TimeOffset));
        let TimeZone = json['timezone'];
        let NetTimeOffset = (TimeOffset - 5.5) * 3600000;
        console.log(NetTimeOffset);
        const date = new Date();
        let CurrentTime = date.getTime();
        let LocalCurrentTime = CurrentTime + NetTimeOffset;
        console.log(CurrentTime);
        const date2 = new Date(LocalCurrentTime);
        let CurrentHour = date2.getHours();

        console.log(CurrentHour);

        if (CurrentHour >= 18 || CurrentHour < 6) {

            let skill = document.querySelectorAll(".skill");
            for(let i =0 ; i<8;i++){
            skill[i].className = "col align-content-center bg-dark rounded-4  m-1 p-3 skill";
            }

            let about = document.querySelectorAll(".about");
            for(let i =0 ; i<3 ;i++){
                about[i].className = "col text-center bg-dark text-light rounded-4 ms-1 me-1 mt-2 about";
            }

            let cark = document.querySelectorAll(".cark");
            for(let i =0; i<cark.length ; i++){
                cark[i].classList.add("bg-dark");
                cark[i].classList.add("text-light");
            }

            let homm = document.querySelector(".homm");
            homm.className = "text-center bg-dark text-light rounded-4 p-4 homm";

                let mode = document.getElementById("lightdark");
                mode.id = "darklight";
                mode.setAttribute("src", "resources/darkmode.png");

           

        }
    })
}



function getInfo(URL, handle) {
    fetch(URL).then(resp => {
        return resp.json();
    }).then(
        json => {
            let x = json['result'];
            let y = x[0]['titlePhoto'];
            let userImage = document.getElementById("userImage");
            userImage.setAttribute("src", y);

            let userName = document.getElementById("userName");
            if (x[0]['firstName'] == null) {
                userName.innerText = "Anonymous";
            }
            else {
                userName.innerText = x[0]['firstName'] + " " + x[0]['lastName'];
            }

            let rating = x[0]['rating'];

            let userRating = document.getElementById("userRating");
            userRating.innerText = "Current Rating : " + rating;

            let userCountry = document.getElementById("userCountry");
            if (x[0]['country'] == null) {
                userCountry.innerText = "Country : Unknown";
            }
            else {
                userCountry.innerText = "Country : " + x[0]['country'];
            }

            let userRank = document.getElementById("userRank");
            userRank.innerText = "Rank : " + x[0]['rank'];

            let userContribution = document.getElementById("userContribution");
            userContribution.innerText = "Contribution : " + x[0]['contribution'];

            let profile = document.getElementById("Profile");
            let link = "https://codeforces.com/profile/" + handle;
            profile.setAttribute("href", link)
        }
    )
}
