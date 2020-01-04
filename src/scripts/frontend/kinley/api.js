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
        point.ontouchmove = function (event) {
            event.preventDefault();
            let c = parse_event(event);
            point.style.left = (c.x) + "px";
            point.style.top = (c.y) + "px";
            macro[index].screenX = c.x;
            macro[index].screenY = c.y;
        };
        point.ontouchend = function (event) {
            event.preventDefault();
            show_macro();
        };
        fieldElement.appendChild(point);
    }
}

function parse_event(event) {
    let x, y;
    if (event.touches !== undefined &&
        event.touches.length > 0) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    return {x: x, y: y};
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