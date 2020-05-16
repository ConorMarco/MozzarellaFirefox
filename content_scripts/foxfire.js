(function() {

    // Code inspired by   
    const fragment = document.createDocumentFragment();
    const container = document.createElement("div");
    container.id = "foxfire-container";

    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.top = "0";
    container.style.left = "0";
    container.style.zIndex = "99999";
    container.style.position = "fixed";


    fragment.appendChild(container);
    document.body.appendChild(fragment);


    const angles = [];
    const fireLength = 6;
    const size = 40;
    let autoHideTimer;


    for (let i = 0; i < fireLength; i++) {
        angles.push([0, 0]);

        var div = document.createElement("div");

        div.style.position = "fixed";
        div.style.width = "40px";
        div.style.height = "40px";
        div.style.top = "0px";
        div.style.left = "0px";
        div.style.backgroundSize = "cover";
        div.style.backgroundPositionX = "-40";
        div.style.transition = "transform 0.2s ease-out";

        if (i == 0) {
            div.style.backgroundImage = "url('" + browser.runtime.getURL("images/firefox.png") + "')";
        } else if (i == 1) {
            div.style.backgroundImage = "url('" + browser.runtime.getURL("images/torch.png") + "')";
        } else {
            div.style.backgroundImage = "url('" + browser.runtime.getURL("images/fire.png") + "')";
        }

        container.appendChild(div);
    }

    let dx = 0,
        dy = 0;
    let x = 0,
        y = 0;



    function draw(r, phi) {
        clearTimeout(autoHideTimer);
        container.style.opacity = "1"

        let newTurn = angles[0][1];
        if (phi > Math.PI / 2 && angles[0][0] < -Math.PI / 2) newTurn--;
        else if (phi < -Math.PI / 2 && angles[0][0] > Math.PI / 2) newTurn++;

        angles.pop();
        angles.unshift([phi, newTurn]);
        console.log("TEST3");

        let offsetX = x,
            offsetY = y;
        for (let i = 0; i < angles.length; i++) {
            container.children[i].style.transform =
                    `translate(${offsetX - size / 2}px, ${offsetY - size / 2}px) ` +
                    `rotate(${angles[i][1] * Math.PI * 2 + angles[i][0]}rad)`;

            offsetX -= size * Math.cos(angles[i][0]);
            offsetY -= size * Math.sin(angles[i][0]);

            console.log(container.children[i].style.backgroundImage)
        }

        dx = dy = 0;

        autoHideTimer = setTimeout(
            () => (container.style.opacity = "0"), 1000
        );
    }


    document.addEventListener("mousemove", e => {
        dx += e.movementX;
        dy += e.movementY;

        const r = Math.hypot(dx, dy);
        const phi = Math.atan2(dy, dx);

        if (r >= size / 2) {
            x = e.clientX;
            y = e.clientY;
            console.log("TEST2");
            draw(r, phi);
        }
    });

    console.log("GOOD");

})();