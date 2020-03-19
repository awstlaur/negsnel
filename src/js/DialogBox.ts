import FormConfig, { FormData, FormID, FormParameter } from "./FormConfig";
import HexagonTriangleTiling from "./tiling/HexagonTriangleTiling";
import NegSnell from "./NegSnell";
import NegSnellFrame from "./NegSnellFrame";
import OctagonSquareTiling from "./tiling/OctagonSquareTiling";

type HasCurrentFrame = {
    currentFrame: NegSnellFrame;
};

/**
 *
 * @param {*} data
 * @param {*} id
 * @return {*}
 */
function getHTML(data: FormData, id: string): string {
    let out = `<p class="help-block">${data.message}</p>`;
    if (id === "set-iters") {
        out += `The current number of iterations is <b>${
            ((window as unknown) as HasCurrentFrame).currentFrame.trajLayer.L
        }</b>.`;
    }
    data.parameters.forEach(p => {
        out += '<div class="form-group">';
        out += '<div class="input-group">';
        out += '<span class="input-group-addon">';
        out += p.name;
        out += "</span>";
        out += '<input name = "';
        out += p.id;
        out += '" type="text" class="form-control" placeholder="';
        out += `${p.placeholder}">`;
        out += '<span class="glyphicon form-control-feedback"></span>';
        out += "</div>"; // End input-group
        out += "</div>"; // End form-group
    });
    return out;
}

/**
 *
 * @param {*} message
 * @param {*} inputname
 */
function userError(message: string, inputname: string): void {
    const formGroup = $(`input[name=${inputname}]`)
        .parent(".input-group")
        .parent(".form-group");
    formGroup.removeClass("has-success");
    formGroup.addClass("has-feedback has-error");
    formGroup
        .children(".input-group")
        .children(".glyphicon")
        .removeClass("glyphicon-ok");
    formGroup
        .children(".input-group")
        .children(".glyphicon")
        .addClass("glyphicon-remove");
    $("#error-messages").append(
        `<span id="${inputname}">${message}</span><br>`
    );
}

/**
 *
 * @param {*} inputname
 */
function userSuccess(inputname: string): void {
    const formGroup = $(`input[name=${inputname}]`)
        .parent(".input-group")
        .parent(".form-group");
    formGroup.removeClass("has-error");
    formGroup.addClass("has-feedback has-success");
    formGroup
        .children(".input-group")
        .children(".glyphicon")
        .removeClass("glyphicon-remove");
    formGroup
        .children(".input-group")
        .children(".glyphicon")
        .addClass("glyphicon-ok");
    $(`#error-messages > #${inputname}`).remove();
}

/**
 *
 * @param {*} parameters
 * @param {*} id
 * @return {*}
 */
function findParameterByID<T, S extends { id: T }>(
    parameters: Array<S>,
    id: T
): S {
    for (const i in parameters) {
        if (Object.prototype.hasOwnProperty.call(parameters, i)) {
            const p = parameters[i];
            if (p.id === id) {
                return p;
            }
        }
    }
    throw new Error("findParameterByID called when no parameter had ID");
}

/**
 *
 * @param {*} parameter
 * @param {*} value
 * @return {*}
 */
function outOfBounds(parameter: FormParameter, value: number): boolean {
    const a = value >= parameter.minInclusive;
    const b = value > parameter.minExclusive;
    const c = value <= parameter.maxInclusive;
    const d = value < parameter.maxExclusive;
    return !(a && b && c && d);
}

/**
 *
 * @param {*} id
 */
function dialog(id: FormID): void {
    const data = FormConfig[id] as FormData;
    $("#error-messages").empty();

    $("#my-modal-label").html(data.name);
    $("#modal-form").html(getHTML(data, id));

    /* Submit/cancel behavior */
    $("#modal-form-submit").on("click", e => {
        e.preventDefault();
        $("#modal-form").submit();
    });

    $("#my-modal").on("hidden.bs.modal", () => {
        $("#modal-form")
            .find("input[type=text], textarea")
            .val("");
    });

    $("#modal-form")
        .unbind("submit")
        .on("submit", function(e) {
            e.preventDefault();
            let submit = true;
            const nameValueArray = $(this).serializeArray();
            $("#error-messages").empty();

            nameValueArray.forEach(nvObject => {
                const parsedValue = parseFloat(nvObject.value);
                if (isNaN(parsedValue)) {
                    userError(
                        `${nvObject.name} must be a real number!`,
                        nvObject.name
                    );
                    submit = false;
                } else {
                    const parameter = findParameterByID(
                        data.parameters,
                        nvObject.name
                    );
                    const noGood = outOfBounds(parameter, parsedValue);
                    if (noGood) {
                        userError(
                            `${parameter.placeholder} is out of bounds!`,
                            nvObject.name
                        );
                        submit = false;
                    } else {
                        userSuccess(nvObject.name);
                    }
                }
            });
            if (submit) {
                const params = nameValueArray.map(nvPair =>
                    parseFloat(nvPair.value)
                );

                if (FormConfig[id].newTiling) {
                    const newTiling = FormConfig[id].tiling(params);
                    ((window as unknown) as HasCurrentFrame).currentFrame = NegSnell(
                        newTiling
                    );
                } else if (id === "set-iters") {
                    ((window as unknown) as HasCurrentFrame).currentFrame.setIterations(
                        params[0]
                    );
                }

                (($("#my-modal") as unknown) as {
                    modal: (_: string) => void;
                }).modal("hide");
            }
        });

    /* Show time! */
    (($("#my-modal") as unknown) as { modal: () => void }).modal();
}

/**
 * Sets window.currentFrame appropriately
 *
 * @param {*} id
 */
export default function DialogBox(
    id: FormID | "hexagon-triangle" | "octagon-square"
): void {
    switch (id) {
        case "hexagon-triangle":
            ((window as unknown) as HasCurrentFrame).currentFrame = NegSnell(
                new HexagonTriangleTiling()
            );
            break;
        case "octagon-square":
            ((window as unknown) as HasCurrentFrame).currentFrame = NegSnell(
                new OctagonSquareTiling()
            );
            break;
        default:
            dialog(id);
    }
}
