const FieldHeight = 800; // Field height in centimeters
const FieldWidth = 1625; // Field width in centimeters
const RobotHeight = 76; // Robot height in centimeters
const RobotWidth = 76; // Robot width in centimeters

let macro = [];

let ScreenXtoFieldX = 1;
let ScreenYtoFieldY = 1;

// GUI

function create_path(){
    page("create");
}

// Things

function define_sizes() {
    let fieldElement = get("create-field");
    let ratio = FieldHeight / FieldWidth;
    let width = screen.width;
    let height = screen.height;
    if (width * ratio < height) {
        fieldElement.style.width = (width) + "px";
        fieldElement.style.height = (width * ratio) + "px"
    } else {
        fieldElement.style.width = (height / ratio) + "px";
        fieldElement.style.height = (height) + "px"
    }
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