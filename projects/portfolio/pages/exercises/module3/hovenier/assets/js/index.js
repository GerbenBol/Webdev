let index = 1;
let opacity = 25;
let increasing = true;
let startString = "linear-gradient(rgba(34, 105, 1, ";
let secondString = "), rgba(6, 104, 24, ";
let thirdString = ") 50%, rgba(81, 164, 81, 1)), url(assets/images/slideshow/index-bg";
let endString = ".png)";
slideShow();

async function slideShow() {
    let img = document.getElementsByClassName("banner");
    let current = startString + opacity / 100 + secondString + opacity / 100 + thirdString + index + endString;

    if (increasing) {
        // Darker
        if (opacity != 100) {
            opacity++;
            img[0].style.backgroundImage = current;
        } else {
            increasing = false;

            if (index < 3) {
                index++;
            } else {
                index = 1;
            }
            img[0].style.backgroundImage = current;
        }
    } else {
        // Lighter
        if (opacity != 40) {
            opacity--;
            img[0].style.backgroundImage = current;
        } else {
            increasing = true;
            await new Promise(r => setTimeout(r, 2000));
        }
    }
    setTimeout(slideShow, 20);
}
