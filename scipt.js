let handle;
let ip;
let card = document.getElementById("cardHolder");

//alert("The website changes into dark and light mode in the backend but i was too lazy and tired of doing all the CSS so please just assume that the frontend changed.\nThe dark night mode toggle button has also been given for user convinience. The proofs of mode change will be visible to...")
//--------------------------------------------getIP()-----------------------------------------------;

const date = new Date();
let CurrentTime = date.getTime();
console.log(CurrentTime);
const date2 = new Date(CurrentTime);
var CurrentHour = date2.getHours();

console.log(CurrentHour);
let x = document.getElementById("cfff");
x.setAttribute("placeholder" , CurrentHour);

let buttonElement = document.getElementById("darkBtn");

buttonElement.addEventListener('click' , darklightchanger);
if(CurrentHour>=18 || CurrentHour <6){
    let mode = document.getElementById("darklight");
    if(mode == null){
        mode = document.getElementById("lightdark");
        mode.id = "darklight";
        mode.setAttribute("src" , "resources/darkmode.png");
       
    }

}
else{
    let mode = document.getElementById("lightdark");
    if(mode == null){
        mode = document.getElementById("darklight");
        mode.id = "lightdark";
        mode.setAttribute("src" , "resources/sun.png");
       
    }
}
function darklightchanger(){
    let mode = document.getElementById("darklight");
    if(mode == null){
        mode = document.getElementById("lightdark");
        mode.id = "darklight";
        mode.setAttribute("src" , "resources/darkmode.png");
       
    }
    else{
        mode.id = "lightdark";
        mode.setAttribute("src" , "resources/sun.png");
    }
}



function readText(form){
   handle = form.cf_id.value;
   let URL = "https://codeforces.com/api/user.info?handles=" + handle;
   getInfo(URL , handle);

   card.style.display = "flex";
}

function getIP(){
    let URL = 'https://api.ipgeolocation.io/getip';
   
    fetch(URL).then(response => {
        return response.json();
    }).then(json => {
        ip = json['ip'];
        getLocation();
    })
}

function getLocation(){
    let URL = "https://api.ipgeolocation.io/timezone?apiKey=9ae8fcec28c447718220502a9f0ac3ac&ip=" + ip;

    fetch(URL).then(response => {
        return response.json();
    }).then(json => {
        let TimeOffset = json['timezone_offset'];
        let TimeZone = json['timezone'];
    })
}



function getInfo(URL , handle){
    fetch(URL).then(resp => {
        return resp.json();
    }).then(
         json => {
            let x = json['result'];
            let y = x[0]['titlePhoto'];
            let userImage = document.getElementById("userImage");
            userImage.setAttribute("src" , y);

            let userName = document.getElementById("userName");
            if(x[0]['firstName'] == null){
                userName.innerText = "Anonymous";
            }
            else{
            userName.innerText = x[0]['firstName'] + " " + x[0]['lastName'];}
            
            let rating = x[0]['rating'];

            let userRating = document.getElementById("userRating");
            userRating.innerText = "Current Rating : " + rating;

            let userCountry = document.getElementById("userCountry");
            if(x[0]['country'] == null){
                userCountry.innerText = "Country : Unknown";
            }
            else{
            userCountry.innerText = "Country : " + x[0]['country'];}

            let userRank = document.getElementById("userRank");
            userRank.innerText = "Rank : " + x[0]['rank'];

            let userContribution = document.getElementById("userContribution");
            userContribution.innerText = "Contribution : " + x[0]['contribution'];

            let profile = document.getElementById("Profile");
            let link = "https://codeforces.com/profile/" + handle;
            profile.setAttribute("href" , link)
         }
    )
}
