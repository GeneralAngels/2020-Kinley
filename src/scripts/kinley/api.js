const FieldHeight = 821; // Field height in centimeters
const FieldWidth = 1598; // Field width in centimeters
const RobotRadius = 38; // Robot radius in centimeters

let ScreenXtoFieldX = 1;
let ScreenYtoFieldY = 1;

let macro = [];

class Kinley {

    static add() {
        UI.popup("Adding new point.", 1000);
        macro.push({
            x: (FieldWidth / ScreenXtoFieldX) / 2,
            y: (FieldHeight / ScreenYtoFieldY) / 2,
            theta: 0,
            action: ""
        });
        Kinley.redraw();
    }

    static redraw() {
        let canvas = UI.get("field");
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.moveTo(macro[0].x, macro[0].y);
        for (let item of macro) {
            context.lineTo(item.x, item.y);
            context.stroke();
            context.beginPath();
            context.fillStyle = "#" + ((macro.indexOf(item) + 1) * 32).toString(16) + "0040";
            context.arc(item.x, item.y, (RobotRadius / ScreenXtoFieldX), 0, 2 * Math.PI);
            context.fill();
            context.beginPath();
            context.moveTo(item.x, item.y);
            context.strokeStyle = "#FFFFFF";
            context.lineWidth = 5;
        }
    }

    static parseEvent(event) {
        let x, y;
        if (event.touches !== undefined &&
            event.touches.length > 0) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        return {x: x - UI.get("field").getBoundingClientRect().left, y: y - UI.get("field").getBoundingClientRect().top};
    }

    static findNode(coordinates) {

        function distance(coordinatesA, coordinatesB) {
            return Math.sqrt(Math.pow(coordinatesA.x - coordinatesB.x, 2) + Math.pow(coordinatesA.y - coordinatesB.y, 2))
        }

        let node = null;
        for (let item of macro) {
            if (node != null) {
                if (distance(coordinates, node) > distance(coordinates, item)) {
                    node = item;
                }
            } else {
                node = item;
            }
        }

        return node;
    }

    static initialize() {

        macro = [];

        let canvas = UI.get("field");

        let ratio = FieldHeight / FieldWidth;
        let width = screen.width;
        let height = screen.height;
        let screenX, screenY;
        if (width * ratio < height) {
            screenX = width;
            screenY = width * ratio;
        } else {
            screenX = height / ratio;
            screenY = height;
        }

        canvas.setAttribute("width", screenX);
        canvas.setAttribute("height", screenY);

        ScreenXtoFieldX = FieldWidth / screenX;
        ScreenYtoFieldY = FieldHeight / screenY;

        canvas.addEventListener("touchstart", function (e) {
            self.current = Kinley.findNode(Kinley.parseEvent(e));
        });

        canvas.addEventListener("touchmove", function (e) {
            let coordinates = Kinley.parseEvent(e);
            self.current.x = coordinates.x;
            self.current.y = coordinates.y;
            Kinley.redraw();
        });

        canvas.addEventListener("touchend", function (e) {
            self.current = null;
        });
    }

    static compileList() {
        let compiledMacro = [];
        for (let precompiledItem of macro) {
            let item = {
                fieldX: precompiledItem.screenX * ScreenXtoFieldX,
                fieldY: precompiledItem.screenY * ScreenYtoFieldY,
                theta: precompiledItem.theta,
                action: precompiledItem.action
            };
            compiledMacro.push(item);
        }
        return compiledMacro;
    }

    static compileShleam() {

    }
}

