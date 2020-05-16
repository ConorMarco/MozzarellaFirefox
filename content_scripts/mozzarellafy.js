(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    /**
     * Given an array of image URLs, convert the background of
     * every div to a random image from the array
     */
    function convertAllBackgrounds(backgroundUrlArray) {
        var divs = document.getElementsByTagName("div");
        for(var i = 0; i < divs.length; i++) {
             setBackground(divs[i], chooseBackgroundForDiv(divs[i], backgroundUrlArray))
        }

        document.body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/5/5d/BurningFlame0.gif')";
    }

    /**
     * Choose the background for a particular element from an array.
     * Right now it's random, but may depend on size or other factors later
     */
    function chooseBackgroundForDiv(div, backgroundUrlArray) {
        randomBackground = backgroundUrlArray[Math.floor(Math.random() * backgroundUrlArray.length)];
        return randomBackground;
    }

    /**
     * Change the background on an element to a mozarella image
     */
    function setBackground(div, backgroundURL) {
        var style = "";
        if (div.hasAttribute("style")) {
            style = div.getAttribute("style") + " ";
        }
        style = style + "background-image: url('" + backgroundURL + "');";
        div.setAttribute("style", style);
    }



    function constructMozarellaArray() {
        // Hardcoded list to various online images
        var online_pics = ["https://www.seriouseats.com/recipes/images/2015/10/20151017-pies-vicky-wasik-2.jpg",
                "https://sc01.alicdn.com/kf/HTB15aGSKFXXXXa6XpXXq6xXFXXXE.jpg",
                "https://media1.tenor.com/images/ba6d6be083fcf65f2c79490c5787e5a0/tenor.gif?itemid=9957392",
                "https://scontent.fatl1-2.fna.fbcdn.net/v/t1.0-9/48393168_2143158979235103_601825901440663552_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=lucywEG_L4QAX_V6ksZ&_nc_ht=scontent.fatl1-2.fna&oh=f0560f40aec6b7406a8e21d582f51c90&oe=5EE42579"];
        // Hardcoded list of picture resources in images/mozarellas
        var local_pics = ["m1.jpg", "img2.jpg", "img3.jpg"];

        for(var i = 0; i < local_pics.length; i++) {
            var url = browser.extension.getURL("images/mozzarellas/" + local_pics[i]);
            online_pics.push(url);
        }

        return online_pics;
    }

    console.log("BRECK");
    var mozzarellaArray = constructMozarellaArray()
    console.log("BRECK2");
    convertAllBackgrounds(mozzarellaArray);
    console.log("BRECK3");

})();