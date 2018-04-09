// ------------------------------------------------------------------
//
// This is the graphics rendering code for the game.
//
// ------------------------------------------------------------------
Rocket.graphics = (function() {
    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d');

    let images = {};

    //------------------------------------------------------------------
    //
    // Place a 'clear' function on the Canvas prototype, this makes it a part
    // of the canvas, rather than making a function that calls and does it.
    //
    //------------------------------------------------------------------
    CanvasRenderingContext2D.prototype.clear = function() {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, canvas.width, canvas.height);
        this.restore();
    };

    //------------------------------------------------------------------
    //
    // Public function that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.clear();
    }

    //------------------------------------------------------------------
    //
    // Simple pass-through to save the canvas context.
    //
    //------------------------------------------------------------------
    function saveContext() {
        context.save();
    }

    //------------------------------------------------------------------
    //
    // Simple pass-through the restore the canvas context.
    //
    //------------------------------------------------------------------
    function restoreContext() {
        context.restore();
    }

    //------------------------------------------------------------------
    //
    // Rotate the canvas to prepare it for rendering of a rotated object.
    //
    //------------------------------------------------------------------
    function rotateCanvas(center, rotation) {
        context.translate(center.x, center.y);
        // context.translate(center.x * canvas.width, center.y * canvas.width);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);
        // context.translate(-center.x * canvas.width, -center.y * canvas.width);
    }

    //------------------------------------------------------------------
    //
    // Draw an image into the local canvas coordinate system.
    //
    //------------------------------------------------------------------
    function draw(texture, center, size, orientation) {
        context.save();

        rotateCanvas(center, orientation);

        let localCenter = {
            // x: center.x * canvas.width,
            x: center.x ,
            // y: center.y * canvas.width
            y: center.y
        };

        let localSize = {
            width: size.width * canvas.width,
            height: size.height * canvas.height
        };

        context.drawImage(images[texture],
            localCenter.x - localSize.width / 2,
            localCenter.y - localSize.height / 2,
            localSize.width,
            localSize.height);
        context.restore();

    }

    function createImage(location) {
        images[location] = new Image();
        images[location].src = 'images/' + location;
    }

    return {
        clear: clear,
        saveContext: saveContext,
        restoreContext: restoreContext,
        rotateCanvas: rotateCanvas,
        draw: draw,
        createImage: createImage
    };
}());
