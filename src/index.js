import DialogBox from "./js/DialogBox";
import NegSnell from "./js/NegSnell";
import TriangleTiling from "./js/tiling/TriangleTiling";

window.currentFrame = null;

$(window).load(() => {
    window.currentFrame = NegSnell(new TriangleTiling(0.5, 0.3)); // eslint-disable-line new-cap
});

$(".new-tiling, #set-iters").click((e) => {
    e.preventDefault();
    DialogBox(e.target.id); // eslint-disable-line new-cap
});

$("#zoom-out").click((e) => {
    e.preventDefault();
    window.currentFrame.zoom(null, "o");
});

$("#zoom-in").click((e) => {
    e.preventDefault();
    window.currentFrame.zoom(null, "i");
});

$("#zoom-reset").click((e) => {
    e.preventDefault();
    window.currentFrame.zoom(null, "r");
});

$("#save-as").click((e) => {
    e.preventDefault();
});

$("#open-file").click((e) => {
    e.preventDefault();
});

$("#do-nothing").click((e) => {
    e.preventDefault();
});

$("#plot-trajectory").click((e) => {
    e.preventDefault();
});

$("#help-dialog").click((e) => {
    e.preventDefault();
    window.currentFrame.toggleHelpBox();
});

$("#help-close").click((e) => {
    e.preventDefault();
    window.currentFrame.toggleHelpBox();
});
