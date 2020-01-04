const FieldHeight = 800; // Field height in centimeters
const FieldWidth = 1625; // Field width in centimeters
const RobotHeight = 76; // Robot height in centimeters
const RobotWidth = 76; // Robot width in centimeters

let macro = [];

let ScreenXtoFieldX = 1;
let ScreenYtoFieldY = 1;

// GUI

function create_macro() {
    page("create");
}

function create_add_point() {
    popup("Adding new point.", 1000);
    macro_add_point(0, 0);
    show_macro();
}

function show_macro() {
    let fieldElement = get("create-field");
    clear(fieldElement);
    for (let item of macro) {
        let point = make("div");
        let index = macro.indexOf(item);
        // Styling
        column(point);
        point.style.position = "relative";
        point.style.left = (item.screenX) + "px";
        point.style.top = (item.screenY) + "px";
        point.style.width = (RobotWidth / ScreenXtoFieldX) + "px";
        point.style.height = (RobotHeight / ScreenYtoFieldY) + "px";
        point.style.backgroundColor = "#876543";
        // Ondrag
        point.ondrag = function (event) {
            event.preventDefault();
            point.style.left = (event.x) + "px";
            point.style.top = (event.y) + "px";
        };
        point.ondragover = function (event) {
            event.preventDefault();
            macro[index].screenX = event.x;
            macro[index].screenY = event.y;
            show_macro();
        };
        fieldElement.appendChild(point);
    }
}

// Things

function define_sizes() {
    let fieldElement = get("create-field");
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
    fieldElement.style.width = (screenX) + "px";
    fieldElement.style.height = (screenY) + "px";
    ScreenXtoFieldX = FieldWidth / screenX;
    ScreenYtoFieldY = FieldHeight / screenY;
}

// Path functions

function macro_create() {
    macro = [];
}

function macro_add_point(screenX, screenY) {
    let item = {
        screenX: screenX,
        screenY: screenY,
        theta: 0,
        action: "none"
    };
    macro.push(item);
}

function macro_compile() {
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