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
        var online_pics = ["https://www.seriouseats.com/recipes/images/2015/10/20151017-pies-vicky-wasik-2.jpg"];
        // Hardcoded list of picture resources in images/mozarellas
        var local_pics = ["m1.jpg", "image0.gif"];

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