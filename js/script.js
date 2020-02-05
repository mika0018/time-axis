import { events } from './data.js';

const axis = document.querySelector(".whole-axis");

const today = new Date(2019, 5, 10);
const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

function createElementWithChildren(elementType, classes, children) {
    let parent = createElementWithClasses(elementType, classes);
    children.forEach(child => {
        parent.appendChild(child);
    });
    return parent;
}

function createElementWithTextChild(elementType, classes, child) {
    let parent = createElementWithClasses(elementType, classes);
    parent.appendChild(document.createTextNode(child));
    return parent;
}

function createElementWithClasses(elementType, classes) {
    let newElement = document.createElement(elementType);
    classes.forEach(value => newElement.classList.add(value));
    return newElement;
}

function addElement({ date, icon, name }) {
    let dateFormat = moment(date).format('DD.MM.YYYY');

    let detailedDate = createElementWithTextChild("div", ["detailed", "date"], dateFormat);
    let detailedName = createElementWithTextChild("div", ["detailed", "name"], name.toUpperCase());
    let tooltipDesktop = createElementWithChildren("span", ["tooltip", "tooltip-desktop"], [detailedDate, detailedName]);
    let faIcon = createElementWithTextChild("i", [`fas`, `fa-${icon}`], "");
    let iconEvent = createElementWithChildren("div", [`icon-event`, `bcg-blue`, `${icon}${date.getDate()}`], [faIcon, tooltipDesktop]);

    let tooltipMobile = tooltipDesktop.cloneNode(true);
    tooltipMobile.classList.remove("tooltip-desktop");
    tooltipMobile.classList.add("tooltip-mobile");

    let wholeEvent = createElementWithChildren("div", ["whole-event"], [iconEvent, tooltipMobile]);
    axis.appendChild(wholeEvent);
}

function setPlaceIcons({ date, icon }) {
    let singleIcon = `${icon}${date.getDate()}`;
    const iconElement = document.querySelector(`.whole-axis .${singleIcon}`);
    const placeIcon = (date.getDate() / daysInMonth) * 100;
    const tooltip = document.querySelector(`.${singleIcon} .tooltip-desktop`);
    iconElement.style.left = `calc(${placeIcon}% - 18px)`;

    if (placeIcon > 95) {
        tooltip.style.right = "0";
    } else if (placeIcon < 5) {
        tooltip.style.left = "0"
    }

    if (date.getDate() <= today.getDate()) {
        iconElement.classList.remove("bcg-blue");
        iconElement.classList.add("bcg-gradient");
    }
}

function setWidthPastTime() {
    const pastTime = document.querySelector(".whole-axis .past-time");
    const widthPastTime = (today.getDate() / daysInMonth) * 100;
    const offsetLeft = (widthPastTime > 50 ? widthPastTime - 20 + "%" : `${widthPastTime * (widthPastTime / 100)}%`);
    const lightShadow = document.querySelector(".whole-axis .light-shadow");

    pastTime.style.width = widthPastTime + "%";
    lightShadow.style.width = widthPastTime * 0.8 + "%";
    lightShadow.style.left = offsetLeft;
}

events.some(addElement);
setWidthPastTime();
events.some(setPlaceIcons);