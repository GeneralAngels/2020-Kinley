const FieldHeight = 800; // Field height in centimeters
const FieldWidth = 1625; // Field width in centimeters
const RobotHeight = 0; // Robot height in centimeters
const RobotWidth = 0; // Robot width in centimeters

let macro = [];

let ScreenXtoFieldX = 1;
let ScreenYtoFieldY = 1;


function define_sizes() {
    let fieldElement = get("create-field");

}

// Path functions

function path_create() {
    macro = [];
}

function path_add_point(screenX, screenY) {
    let item = {
        screenX: screenX,
        screenY: screenY,
        theta: 0,
        action: "none"
    };
    macro.push(item);
}

function path_compile() {
    let compiledPath = [];
    for (let precompiledItem of macro) {
        let item = {
            fieldX: precompiledItem.screenX * ScreenXtoFieldX,
            fieldY: precompiledItem.screenY * ScreenYtoFieldY,
            theta: precompiledItem.theta,
            action: precompiledItem.action
        };
        compiledPath.push(item);
    }
}