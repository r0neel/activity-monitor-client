/**
 * @jest-environment jsdom
 */

const helpers = require("../static/js/helpers");
const render = require("../static/js/render");

jest.mock("../static/js/render");

describe("Helper functions (updating the DOM)", () => {
    describe("showHome", () => {
        render.renderHome.mockImplementation(() => {
            let newContent = document.createElement("div");
            newContent.id = "content-new";
            return newContent;
        });

        beforeEach(() => {
            document.documentElement.innerHTML = "<div id='content'></div>";
        });

        it("calls render.renderHome", () => {
            helpers.showHome();
            expect(render.renderHome).toBeCalled();
        });

        it("replaces content div with new content", () => {
            helpers.showHome();
            const content = document.querySelector("div");
            expect(content).toBeTruthy();
            expect(content.id).toBe("content-new");
        });

        it("returns html element containing new content", () => {
            const newContent = helpers.showHome();
            expect(newContent instanceof HTMLElement).toBe(true);
            expect(newContent.id).toBe("content-new");
        });
    });

    describe("showHabits", () => {
        render.renderHabitList.mockImplementation(() => {
            const newList = document.createElement("div");
            newList.id = "list-new";
            return newList;
        });

        jest.spyOn(helpers, "habitDataWrapper").mockImplementation(o => ({
            ...o, extra: 1
        }));

        beforeEach(() => {
            document.documentElement.innerHTML = "<div id='habit-list'></div>";
        });
        
        const mockData = [{foo: "bar"}, {foo: "baz"}];

        it("calls habitDataWrapper with habit data", () => {
            helpers.showHabits(mockData);
            for(let i = 0; i < mockData.length; i++){
                expect(helpers.habitDataWrapper).nthCalledWith(i + 1, mockData[i], i, mockData);
            }
            expect(helpers.habitDataWrapper).toBeCalledTimes(mockData.length);
        });

        it("calls render.renderHabitList with pre-processed habit data", () => {
            const wrappedData = mockData.map(helpers.habitDataWrapper);
            helpers.showHabits(mockData);
            expect(render.renderHabitList).toBeCalledWith(wrappedData);
        });

        it("replaces habit list with rendered element", () => {
            helpers.showHabits(mockData);
            const newList = document.querySelector("div");
            const expectedElement = render.renderHabitList();
            expect(newList).toEqual(expectedElement);
        });

        it("returns rendered element", () => {
            const newList = helpers.showHabits(mockData);
            const expectedElement = render.renderHabitList();
            expect(newList).toEqual(expectedElement);
        });
    });

    describe("showHabitInfo", () => {
        render.renderHabitInfo.mockImplementation(() => {
            const newInfo = document.createElement("div");
            newInfo.id = "info-new";
            return newInfo;
        });

        jest.spyOn(helpers, "habitDataWrapper").mockImplementation(o => ({
            ...o, extra: 1
        }));

        beforeEach(() => {
            document.documentElement.innerHTML = "<div class='card-body'></div>";
        });

        const mockData = {foo: "bar"};

        it("calls habitDataWrapper with habit data", () => {
            helpers.showHabitInfo(mockData);
            expect(helpers.habitDataWrapper).toBeCalledWith(mockData);
        });

        it("calls render.renderHabitInfo with pre-processed habit data", () => {
            const wrappedData = helpers.habitDataWrapper(mockData);
            helpers.showHabitInfo(mockData);
            expect(render.renderHabitInfo).toBeCalledWith(wrappedData);
        });

        it("replaces card body children with rendered element", () => {
            helpers.showHabitInfo();
            const newInfo = document.querySelector("div.card-body > *");
            const expectedElement = render.renderHabitInfo();
            expect(newInfo).toEqual(expectedElement);
        });

        it("returns rendered element", () => {
            const newInfo = helpers.showHabitInfo();
            const expectedElement = render.renderHabitInfo();
            expect(newInfo).toEqual(expectedElement);
        });
    });

    describe("showForm functions", () => {
        const mockRender = () => {
            let newContent = document.createElement("form");
            newContent.id = "form-new";
            return newContent;
        };

        const spy = jest.spyOn(helpers, "showForm");
        beforeAll(() => {
            spy.mockImplementation(e => e);
        });

        beforeEach(() => {
            document.documentElement.innerHTML = '<div id="login-modal"><h3></h3><input class="form-check-input" type="checkbox" role="switch" id="form-toggle"><form></form></div><div class="card-body"></div>';
        });

        afterAll(() => {
            spy.mockRestore();
        });
    
        describe("showLoginForm", () => {
            render.renderLoginForm.mockImplementation(mockRender);

            it("calls render.renderLoginForm", () => {
                helpers.showLoginForm();
                expect(render.renderLoginForm).toBeCalled();
            });

            it("sets modal heading to 'Log In'", () => {
                helpers.showLoginForm();
                const heading = document.querySelector("#login-modal h3");
                expect(heading.textContent).toBe("Log In");
            });

            it("sets form toggle switch to checked position", () => {
                helpers.showLoginForm();
                const toggle = document.querySelector("#form-toggle");
                expect(toggle.checked).toBe(true);
            });

            it("calls showForm with rendered element", () => {
                helpers.showLoginForm();
                const expectedElement = render.renderLoginForm();
                expect(helpers.showForm).toBeCalledWith(expectedElement);
            });

            it("returns rendered element", () => {
                const newForm = helpers.showLoginForm();
                const expectedElement = render.renderLoginForm();
                expect(newForm).toEqual(expectedElement);
            });
        });

        describe("showRegisterForm", () => {
            render.renderRegisterForm.mockImplementation(mockRender);

            it("calls render.renderRegisterForm", () => {
                helpers.showRegisterForm();
                expect(render.renderRegisterForm).toBeCalled();
            });

            it("sets modal heading to 'Sign Up'", () => {
                helpers.showRegisterForm();
                const heading = document.querySelector("#login-modal h3");
                expect(heading.textContent).toBe("Sign Up");
            });

            it("sets form toggle switch to unchecked position", () => {
                helpers.showRegisterForm();
                const toggle = document.querySelector("#form-toggle");
                expect(toggle.checked).toBe(false);
            });

            it("calls showForm with rendered element", () => {
                helpers.showRegisterForm();
                const expectedElement = render.renderRegisterForm();
                expect(helpers.showForm).toBeCalledWith(expectedElement);
            });

            it("returns rendered element", () => {
                const newForm = helpers.showRegisterForm();
                const expectedElement = render.renderRegisterForm();
                expect(newForm).toEqual(expectedElement);
            });
        });

        describe("showNewHabitForm", () => {
            render.renderNewHabitForm.mockImplementation(mockRender);

            it("calls render.renderNewHabitForm", () => {
                helpers.showNewHabitForm();
                expect(render.renderNewHabitForm).toBeCalled();
            });

            it("sets card body children to rendered element", () => {
                helpers.showNewHabitForm();
                const newForm = document.querySelector(".card-body > *");
                const expectedElement = render.renderNewHabitForm();
                expect(newForm).toEqual(expectedElement);
            });

            it("returns rendered element", () => {
                const newForm = helpers.showNewHabitForm();
                const expectedElement = render.renderNewHabitForm();
                expect(newForm).toEqual(expectedElement);
            });
        });

        describe("showForm", () => {
            beforeAll(() => {
                spy.mockRestore();
            });

            const newForm = mockRender();

            it("replaces pre-existing form with new form", () => {
                helpers.showForm(newForm);
                const form = document.querySelector("form");
                expect(form).toEqual(newForm);
            });
        });
    });

    describe("updateNavigation", () => {
        const spy = jest.spyOn(helpers, "isLoggedIn");

        const hidden = "<nav><ul><li class='d-none'><a data-page='login'>Log In</a></li><li class='d-none'><a data-page='register'>Sign Up</a></li><li class='d-none'><a data-page='logout'>Log Out</a></li></ul></nav>";

        const visible = "<nav><ul><li><a data-page='login'>Log In</a></li><li><a data-page='register'>Sign Up</a></li><li><a data-page='logout'>Log Out</a></li></ul></nav>";

        afterAll(() => {
            spy.mockRestore();
        });

        describe("shows correct navbar when logged in", () => {
            beforeAll(() => {
                spy.mockReturnValue(true);
            });

            it.each([
                {t: "hidden", html: hidden},
                {t: "visible", html: visible}
            ])("all initially $t", ({html}) => {
                document.documentElement.innerHTML = html;
                helpers.updateNavigation();
                const navItems = document.querySelectorAll("nav li");
                expect(navItems[0].classList.contains("d-none")).toBe(true);
                expect(navItems[1].classList.contains("d-none")).toBe(true);
                expect(navItems[2].classList.contains("d-none")).toBe(false);
            });
        });

        describe("shows correct navbar when logged out", () => {
            beforeAll(() => {
                spy.mockReturnValue(false);
            });

            it.each([
                {t: "hidden", html: hidden},
                {t: "visible", html: visible}
            ])("all initially $t", ({html}) => {
                document.documentElement.innerHTML = html;
                helpers.updateNavigation();
                const navItems = document.querySelectorAll("nav li");
                expect(navItems[0].classList.contains("d-none")).toBe(false);
                expect(navItems[1].classList.contains("d-none")).toBe(false);
                expect(navItems[2].classList.contains("d-none")).toBe(true);
            });
        });
    });

    describe("isLoggedIn", () => {
        it("returns false with empty localStorage", () => {
            global.localStorage.clear();
            const output = helpers.isLoggedIn();
            expect(output).toBe(false);
        });

        it("returns false with defined localStorage if jwt_decode fails", () => {
            global.localStorage.setItem("token", "testtoken");
            window.jwt_decode = jest.fn(() => {throw new Error();});
            const output = helpers.isLoggedIn();
            expect(output).toBe(false);
        });

        it("returns true with defined localStorage and jwt_decode succeeds", () => {
            global.localStorage.setItem("token", "testtoken");
            window.jwt_decode = jest.fn(() => ({foo: "bar"}));
            const output = helpers.isLoggedIn();
            expect(output).toBe(true);
        });
    });

    describe("decodeToken", () => {
        it("throws error if jwt_decode fails", () => {
            window.jwt_decode = jest.fn(() => {throw new Error();});
            expect(() => {
                helpers.decodeToken();
            }).toThrow();
        });
    });

    describe("navLinkEvent", () => {
        it("returns an object", () => {
            const output = helpers.navLinkEvent("test");
            expect(typeof output).toBe("object");
        });

        it("returnValue.target.dataset.page is equal to passed arg", () => {
            const output = helpers.navLinkEvent("test");
            expect(output.target.dataset.page).toBe("test");
        });

        it("returnValue.preventDefault() returns undefined", () => {
            const output = helpers.navLinkEvent("test");
            expect(output.preventDefault()).toBe(undefined);
        });
    });
});
