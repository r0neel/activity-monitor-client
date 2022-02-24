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
            newContent.id = "content";
            newContent.textContent = "new content";
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
            const expectedElement = render.renderHome();
            const content = document.querySelector("#content");
            expect(content).toEqual(expectedElement);
        });

        it("returns rendered element", () => {
            const newContent = helpers.showHome();
            const expectedElement = render.renderHome();
            expect(newContent).toEqual(expectedElement);
        });
    });

    describe("showDashboard", () => {
        render.renderDashboard.mockImplementation(() => {
            let newContent = document.createElement("div");
            newContent.id = "content";
            newContent.textContent = "new content";
            return newContent;
        });

        beforeEach(() => {
            document.documentElement.innerHTML = "<div id='content'></div>";
        });

        it("calls render.renderDashboard", () => {
            helpers.showDashboard();
            expect(render.renderDashboard).toBeCalled();
        });

        it("replaces content div with new content", () => {
            helpers.showDashboard();
            const expectedElement = render.renderDashboard();
            const content = document.querySelector("#content");
            expect(content).toEqual(expectedElement);
        });

        it("returns rendered element", () => {
            const newContent = helpers.showDashboard();
            const expectedElement = render.renderDashboard();
            expect(newContent).toEqual(expectedElement);
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
            jest.spyOn(helpers, "habitDataWrapper").mockClear();
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
            jest.spyOn(helpers, "habitDataWrapper").mockClear();
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

    describe("toggleUpdateInput", () => {
        let input;
        beforeEach(() => {
            document.documentElement.innerHTML = "<input id='update-prog-input' type='text'/>";
            input = document.querySelector("#update-prog-input");
        });

        it("clears the value of the input", () => {
            input.value = "test value";
            helpers.toggleUpdateInput();
            expect(input.value).toBe("");
        });

        it("widens the input if there is no width initially", () => {
            input.style.width = "0px";
            helpers.toggleUpdateInput();
            expect(parseInt(input.style.width.slice(0, -2))).toBeGreaterThan(0);
        });

        it("sets the width to 0px if it has width", () => {
            input.style.width = "10px";
            helpers.toggleUpdateInput();
            expect(input.style.width).toBe("0px");
        });
    });

    describe("habitDataWrapper", () => {
        jest.spyOn(helpers, "calculateProgress").mockReturnValue(1);
        jest.spyOn(helpers, "durationToString").mockReturnValue("day");
        jest.spyOn(helpers, "calculateStreak").mockReturnValue(5);
        jest.spyOn(helpers, "millisecondsToString").mockImplementation(t => t + "ms");
        jest.spyOn(helpers, "calculateReset").mockReturnValue(1000);
        jest.spyOn(helpers, "consistencyBars").mockReturnValue([{}, {}, {}, {}, {}]);

        const mockData = {
            duration: 123,
            goal: 10
        };

        let newData;
        beforeAll(() => {
            jest.spyOn(helpers, "habitDataWrapper").mockRestore();
            newData = helpers.habitDataWrapper(mockData);
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it("returns an object", () => {
            expect(typeof newData).toBe("object");
        });

        it("keeps original properties intact", () => {
            expect(newData).toMatchObject(mockData);
        });

        describe("adds the correct extra properties", () => {
            it("durationAsString", () => {
                expect(newData.durationAsString).toBe("day");
            });

            it("streak", () => {
                expect(newData.streak).toBe(5);
            });

            it("progress", () => {
                expect(newData.progress).toBe(1);
            });

            it("progressPercentage", () => {
                const expectedPercentage = 100 / mockData.goal;
                expect(newData.progressPercentage).toBe(expectedPercentage);
            });

            it("timeUntilReset", () => {
                expect(newData.timeUntilReset).toBe("1000ms");
            });

            it("consistency", () => {
                expect(newData.consistency).toEqual([{}, {}, {}, {}, {}]);
            });
        });
    });

    describe("calculateHistoryTotals", () => {
        global.Date.now = () => 300;

        const mockData = {
            creationDate: 0,
            duration: 100,
            history: [
                { time: 2, amount: 3},
                { time: 23, amount: 2},
                { time: 54, amount: 4},
                { time: 153, amount: 6},
                { time: 199, amount: 1},
                { time: 200, amount: 3},
                { time: 233, amount: 4}
            ]
        };

        it("returns array with correct totals", () => {
            const output = helpers.calculateHistoryTotals(mockData);
            const expectedOutput = [9, 7, 7];
            expect(output).toEqual(expectedOutput);
        });
    });

    describe("calculateStreak", () => {
        beforeAll(() => {
            jest.spyOn(helpers, "calculateStreak").mockRestore();
        });

        const spy = jest.spyOn(helpers, "calculateHistoryTotals");

        const mockData = {
            goal: 5
        };

        it("calls calculateHistoryTotals with habitData", () => {
            spy.mockReturnValue([]);
            helpers.calculateStreak(mockData);
            expect(helpers.calculateHistoryTotals).toBeCalledWith(mockData);
        });

        it("returns correct streak for incomplete day", () => {
            spy.mockReturnValue([5, 5, 4, 2, 1, 0, 0, 5, 8, 5, 2]);
            const streak = helpers.calculateStreak(mockData);
            expect(streak).toBe(3);
        });

        it("returns correct streak for complete day", () => {
            spy.mockReturnValue([5, 5, 4, 2, 1, 0, 0, 5, 8, 5, 6]);
            const streak = helpers.calculateStreak(mockData);
            expect(streak).toBe(4);
        });
    });

    describe("consistencyBars", () => {
        beforeAll(() => {
            jest.spyOn(helpers, "consistencyBars").mockRestore();
            jest.spyOn(helpers, "calculateHistoryTotals").mockReturnValue([5, 4, 5, 6, 1]);
        });

        const mockData = {
            goal: 5
        };

        it("calls calculateHistoryTotals with habit data", () => {
            helpers.consistencyBars(mockData);
            expect(helpers.calculateHistoryTotals).toBeCalledWith(mockData);
        })

        it("returns the correct data", () => {
            const bars = helpers.consistencyBars(mockData);
            const expectedBars = [
                { length: 20, color: "#0d6efd" },
                { length: 20, color: "#00000000" },
                { length: 20, color: "#0d6efd" },
                { length: 20, color: "#0d6efd" },
                { length: 20, color: "#00000000" }
            ];
            expect(bars).toEqual(expectedBars);
        });
    });

    describe("calculateProgress", () => {
        beforeAll(() => {
            jest.spyOn(helpers, "calculateProgress").mockRestore();
            jest.spyOn(helpers, "calculateHistoryTotals").mockReturnValue([5, 4, 5, 6, 1]);
        });

        const mockData = {
            foo: "bar"
        };

        it("calls calculateHistoryTotals with habit data", () => {
            helpers.calculateProgress(mockData);
            expect(helpers.calculateHistoryTotals).toBeCalledWith(mockData);
        });

        it("return the last element of history totals", () => {
            const progress = helpers.calculateProgress(mockData);
            expect(progress).toBe(1);
        });
    });

    describe("durationToString", () => {
        beforeAll(() => {
            jest.spyOn(helpers, "durationToString").mockRestore();
        });

        describe("returns the correct strings", () => {
            it.each([
                [3600000, "hour"], 
                [86400000, "day"], 
                [604800000, "week"], 
                [2419200000, "month"], 
                [31536000000, "year"]
            ])("%i -> %s", (time, string) => {
                const output = helpers.durationToString(time);
                expect(output).toBe(string);
            });
        });

        it("throws error for unaccepted time value", () => {
            expect(() => {
                helpers.durationToString(1);
            }).toThrow();
        });
    });

    describe("calculateReset", () => {
        global.Date.now = () => 300;

        beforeAll(() => {
            jest.spyOn(helpers, "calculateReset").mockRestore();
        });

        it("returns correct time interval", () => {
            const mockData = {
                creationDate: 0,
                duration: 1000
            };
            const output = helpers.calculateReset(mockData);
            expect(output).toBe(700);
        });

        it("returns correct time interval at first millisecond of reset", () => {
            const mockData = {
                creationDate: 0,
                duration: 300
            };
            const output = helpers.calculateReset(mockData);
            expect(output).toBe(300);
        });
    });

    describe("millisecondsToString", () => {
        beforeAll(() => {
            jest.spyOn(helpers, "millisecondsToString").mockRestore();
        });
        
        describe("returns the correct strings", () => {
            it.each([
                [0, "0 minutes"],
                [23564, "0 minutes"],
                [64578, "1 minute"],
                [2166666, "36 minutes"],
                [5766666, "1 hour 36 minutes"],
                [38166666, "10 hours 36 minutes"],
                [124566666, "1 day 10 hours 36 minutes"],
                [902166666, "10 days 10 hours 36 minutes"]
            ])("%i -> %s", (time, string) => {
                const output = helpers.millisecondsToString(time);
                expect(output).toBe(string);
            });
        });
    });
});
