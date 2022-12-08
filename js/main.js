window.addEventListener("DOMContentLoaded", function () {
    //אירועי לחיצה
    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);

    //משתנים גלובלים של האלמנטים
    const loudStatus = document.getElementById("status");
    const mapLink = document.getElementById("map-link");
    const iframe = document.getElementById("iframe");

    //פונקציה שמופעלת בלחיצה על מציאת המיקום
    function geoFindMe() {
        //איפוס הלינק למיקום
        mapLink.href = "";
        mapLink.textContent = "";
        iframe.src = "";
        iframe.classList.add("d-none");

        //בדיקת תמיכה בניווט
        if (navigator.geolocation) {
            //אם כן הצגת הסטטוס
            loudStatus.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
        }
        else {
            // לא תומך
            loudStatus.textContent = "Geolocation is not supported by your browser";
        }

    }

    //פונקציית הצלחת טעינה
    function success(position) {

        //קווי אורך ורוחב
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        //העלמת סטטוס טעינה
        loudStatus.textContent = "";
        //יצירה לינק להטמעה ולינק לשיתוף
        const linkToembed = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
        linkToShare = `https://maps.google.com/?q=${latitude},${longitude}`;
        //הצגת מפה
        iframe.src = linkToembed;
        iframe.classList.remove("d-none");
        //הוספת תוכן קווי אורך
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        mapLink.href = linkToShare;

    }

    //פונקצייה אי הצלחה
    function error(position) {
        loudStatus.textContent = "Unable to retrieve your location";
    }

    //פונקציית שיתוף 
    function share() {
        if (navigator.canShare) {
            navigator.share({
                title: "שיתוף המקום שלי",
                text: linkToShare,
            })
                .then(() => console.log("Share was successful."))
                .catch((error) => console.log("sharing failed", error));
        }
        else {
            console.log("Your system does not support sharing files");
        }

    }

})
