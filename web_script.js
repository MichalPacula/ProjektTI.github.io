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
