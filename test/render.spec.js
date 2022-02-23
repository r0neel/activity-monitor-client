/**
 * @jest-environment jsdom
 */

const render = require("../static/js/render");

describe("render functions", () => {
    describe("renderHome", () => {
        const content = render.renderHome();

        it("content has id of content", () => {
            expect(content.id).toBe("content");
        });

        it("content has 4 children", () => {
            expect(content.children.length).toBe(4);
        });
    });
});
