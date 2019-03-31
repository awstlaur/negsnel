import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

// lazily import code for code-splitting optimization
// https://webpack.js.org/guides/code-splitting/
require.ensure(
    ["./js/DialogBox", "./js/NegSnell", "./js/tiling/TriangleTiling"],
    require => {
        const { default: DialogBox } = require("./js/DialogBox");
        const { default: NegSnell } = require("./js/NegSnell");
        const {
            default: TriangleTiling,
        } = require("./js/tiling/TriangleTiling");

        window.currentFrame = NegSnell(new TriangleTiling(0.5, 0.3));

        $(".new-tiling, #set-iters").click(e => {
            e.preventDefault();
            DialogBox(e.target.id);
        });

        $("#zoom-out").click(e => {
            e.preventDefault();
            window.currentFrame.zoom(null, "o");
        });

        $("#zoom-in").click(e => {
            e.preventDefault();
            window.currentFrame.zoom(null, "i");
        });

        $("#zoom-reset").click(e => {
            e.preventDefault();
            window.currentFrame.zoom(null, "r");
        });

        $("#save-as").click(e => {
            e.preventDefault();
        });

        $("#open-file").click(e => {
            e.preventDefault();
        });

        $("#do-nothing").click(e => {
            e.preventDefault();
        });

        $("#plot-trajectory").click(e => {
            e.preventDefault();
        });

        $("#help-dialog").click(e => {
            e.preventDefault();
            window.currentFrame.toggleHelpBox();
        });

        $("#help-close").click(e => {
            e.preventDefault();
            window.currentFrame.toggleHelpBox();
        });
    },
    error => {
        window.alert("Failed to load application");
        console.error(error);
    },
    "chunk"
);
