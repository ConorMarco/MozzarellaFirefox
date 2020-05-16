(function() {

    // Code inspired by   
    const fragment = document.createDocumentFragment();
    const container = document.createElement("div");
    container.id = "foxfire-container";

    const angles = [];
    const fireLength = 6;

    fragment.appendChild(container);
    document.body.appendChild(fragment);


    for (let i = 0; i < fireLength; i++) {
        angles.push([0, 0]);
        container.appendChild(document.createElement("div"));
    }

    let dx = 0,
        dy = 0;
    let x = 0,
        y = 0;



    function draw(r, phi) {
        clearTimeout(autoHideTimer);
        container.className = "";

        let newTurn = angles[0][1];
        if (phi > Math.PI / 2 && angles[0][0] < -Math.PI / 2) newTurn--;
        else if (phi < -Math.PI / 2 && angles[0][0] > Math.PI / 2) newTurn++;

        angles.pop();
        angles.unshift([phi, newTurn]);

        let offsetX = x,
            offsetY = y;
        for (let i = 0; i < angles.length; i++) {
            container.children[i].style.transform =
                    `translate(${offsetX - size / 2}px, ${offsetY - size / 2}px) ` +
                    `rotate(${angles[i][1] * Math.PI * 2 + angles[i][0]}rad)`;

            offsetX -= size * Math.cos(angles[i][0]);
            offsetY -= size * Math.sin(angles[i][0]);

            console.log("TEST")
        }

        dx = dy = 0;

        autoHideTimer = setTimeout(
            () => (container.className = "hidden"), 1000
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
            draw(r, phi);
        }
    });

    console.log("GOOD");

})();