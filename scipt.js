let handle;
let card = document.getElementById("cardHolder");

function readText(form){
   handle = form.cf_id.value;
   let URL = "https://codeforces.com/api/user.info?handles=" + handle;
   getInfo(URL , handle);

//   let backImage = document.getElementById("codeforces_api");
//   backImage.style.backgroundImage = "url('resources/cfback.jpg')";
   card.style.display = "flex";
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
            userName.innerText = x[0]['firstName'] + " " + x[0]['lastName'];
            
            let rating = x[0]['rating'];

            let userRating = document.getElementById("userRating");
            userRating.innerText = "Current Rating : " + rating;

            let userCountry = document.getElementById("userCountry");
            userCountry.innerText = "Country : " + x[0]['country'];

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
