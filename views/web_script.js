function openPopup(popupChosen){
    let popup = document.getElementById(popupChosen);
    popup.style.visibility = "visible";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%) scale(1)";
}

function closePopup(popupChosen){
    let popup = document.getElementById(popupChosen);
    popup.style.visibility = "hidden";
    popup.style.top = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0.1)";
}

var count = 2;
function automaticSlider(){
    var currentUrl = document.URL;
    var site_without_path = currentUrl.replace(/^.*[\\\/]/, '');
    if(site_without_path == "partnerzy.html" || site_without_path.slice(0, -1) == "partnerzy.html#slide_"){
        if(count >= 6){
            window.open("partnerzy.html#slide_" + count, "_self");
            count = 1;
        }
        else if(count < 6){
            window.open("partnerzy.html#slide_" + count, "_self");
            count = count + 1;
    }
    }
}

setInterval(automaticSlider, 3000);