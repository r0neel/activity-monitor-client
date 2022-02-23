/**
 * @jest-environment jsdom
 */

const render = require("../static/js/render");

describe("render functions", () => {
    describe("renderHome", () => {
        const content = render.renderHome();

        it("<main> element returned for content", () => {
            expect(content.tagName).toBe('MAIN')
        })

        it("content has id of content", () => {
            expect(content.id).toBe("content");
        });


        heading = content.firstChild.firstChild
                // = content.children[1]

        it("<h1> element returned for heading", () => {
            expect(heading.tagName).toBe('H1')
        })

        it('return element has correct class of text-center for heading', () => {
            expect(heading.classList.contains('text-center')).toBe(true);
        });

        it('return element has correct classe of pt-5 for heading', () => {
            expect(heading.classList.contains('pt-5')).toBe(true);
        });

        it("content has id of content", () => {
            expect(heading.id).toBe("trackYourHabits");
        });

        it("heading has innerHTML of TRACK YOUR HABITS", () => {
            expect(heading.innerHTML).toBe("TRACK YOUR <br> HABITS!");
        });

        headingContainer = content.children[1]

        it("<div> element returned for headingContainer", () => {
            expect(headingContainer.tagName).toBe('DIV')
        })

        it("headingContainer has 2 children", () => {
            expect(headingContainer.children.length).toBe(2);
        });

        it("content has 4 children", () => {
            expect(content.children.length).toBe(4);
        });

        container1h = content.children[1].children[0]

        it("container1h has innerHTML of What is Activity Monitor?", () => {
            expect(container1h.innerHTML).toBe("What is Activity Monitor?");
        });

        it("<h3> element returned for container1h", () => {
            expect(container1h.tagName).toBe('H3')
        })

        it('return element has correct class of text-center for container1h', () => {
            expect(container1h.classList.contains('text-center')).toBe(true);
        });

        it('return element has correct classe of pt-5 for container1h', () => {
            expect(container1h.classList.contains('pt-5')).toBe(true);
        });

        it("container1h has 0 children", () => {
            expect(container1h.children.length).toBe(0);
        });

        container1p = content.children[1].children[1].children[0]

        it("container1p has innerHTML contaning long text beginning with Activity monitor is a webpage", () => {
            expect(container1p.innerHTML).toBe("Activitiy monitor is a webpage that allows anyone to track their personal habits. <br>We hope that Activity Monitor can aid in helping users remain accountable for habits <br>and to promote a positive lifestyle and reach their goals.");
        });

        it("<p> element returned for container1p", () => {
            expect(container1p.tagName).toBe('P')
        })

        it('return element has correct class of text-center for container1p', () => {
            expect(container1p.classList.contains('text-center')).toBe(true);
        });

        it("container1p has 2 children", () => {
            expect(container1p.children.length).toBe(2);
        });

        container2h = content.children[2].children[0]

        it("container2h has innerHTML of What am I able to track?", () => {
            expect(container2h.innerHTML).toBe("What am I able to track?");
        });

        
        it("<h3> element returned for container2h", () => {
            expect(container2h.tagName).toBe('H3')
        })

        it('return element has correct class of text-center for container2h', () => {
            expect(container2h.classList.contains('text-center')).toBe(true);
        });

        it('return element has correct classe of pt-5 for container2h', () => {
            expect(container2h.classList.contains('pt-5')).toBe(true);
        });

        it("container2h has 0 children", () => {
            expect(container2h.children.length).toBe(0);
        });

        container2p = content.children[2].children[1].children[0]

        it("container2p has innerHTML contaning long text beginning with Anything! Activity Monitor is designed", () => {
            expect(container2p.innerHTML).toBe("Anything! Activity Monitor is designed for users to track whatever they wish <br>to track, being to studying a Japanese 1 hour a day, to wanting to lose 20 pounds <br> over 5 months. We have predefined units and timescales so you can spend less time <br> planning and more time completing your goals!.");
        });

        it("<p> element returned for container2p", () => {
            expect(container2p.tagName).toBe('P')
        })

        it('return element has correct class of text-center for container2p', () => {
            expect(container2p.classList.contains('text-center')).toBe(true);
        });

        it("container2p has 3 children", () => {
            expect(container2p.children.length).toBe(3);
        });

        container3h = content.children[3].children[0]

        it("container3h has innerHTML of Who made Activity Monitor?", () => {
            expect(container3h.innerHTML).toBe("Who made Activity Monitor?");
        });

        it("<h3> element returned for container3h", () => {
            expect(container3h.tagName).toBe('H3')
        })

        it('return element has correct class of text-center for container3h', () => {
            expect(container3h.classList.contains('text-center')).toBe(true);
        });

        it('return element has correct classe of pt-5 for container3h', () => {
            expect(container3h.classList.contains('pt-5')).toBe(true);
        });

        it("container3h has 0 children", () => {
            expect(container3h.children.length).toBe(0);
        })

        container3p = content.children[3].children[1].children[0]

        it("container3p has innerHTML contaning long text beginning with Anything! Activity Monitor was desogmed, created", () => {
            expect(container3p.innerHTML).toBe("Activity Monitor was designed, created and deployed as a collaborative group project <br> as part of lap 2 of the training course of futureproof. The project occured over the <br> the span of 1 week and was created by team Ultra-Instinct.");
        });

        it("<p> element returned for container3p", () => {
            expect(container3p.tagName).toBe('P')
        })

        it('return element has correct class of text-center for container3p', () => {
            expect(container3p.classList.contains('text-center')).toBe(true);
        });

        it("container3p has 2 children", () => {
            expect(container3p.children.length).toBe(2);
        });

    });

    describe("renderLoginForm", () => {

        const form = render.renderLoginForm();

        it("<form> element returned for form", () => {
            expect(form.tagName).toBe('FORM')
        })

        it("form has id of login-form", () => {
            expect(form.id).toBe("login-form");
        });

        it('return element has correct class of text-center for form', () => {
            expect(form.classList.contains('text-center')).toBe(true);
        });

        it('return element has correct class of login-form for form', () => {
            expect(form.classList.contains('login-form')).toBe(true);
        });

        emailLabel = form.firstChild.firstChild
                // = content.children[1]

        it("<label> element returned for emailLabel", () => {
            expect(emailLabel.tagName).toBe('LABEL')
        })
        
        it("emailLogin returned for  to be emailLabel", () => {
            expect(emailLabel.for).toBe('emailLogin')
        })

        it('return element has correct class of form-label for emailLabel', () => {
            expect(emailLabel.classList.contains('form-label')).toBe(true);
        });

        it("emailLabel has innerHTML of Email:", () => {
            expect(emailLabel.innerHTML).toBe("Email:");
        });

        emailInput = form.firstChild.children[1]

        it("<input> element returned for emailInput", () => {
            expect(emailInput.tagName).toBe('INPUT')
        })
        
        it("emailInput returned type to be text", () => {
            expect(emailInput.type).toBe('text')
        });
        
        it("emailLabel has id of emailLogin", () => {
            expect(emailInput.id).toBe("emailLogin");
        });

        it("emailLabel has innerHTML of Email:", () => {
            expect(emailInput.name).toBe("email");
        });

        div1 = form.firstChild

        it("div1 has 2 children", () => {
            expect(div1.children.length).toBe(2);
        });


        passwordLabel = form.children[1].firstChild

        // it("<label> element returned for passwordLabel", () => {
        //     expect(emailInput.tagName).toBe('LABEL')
        // })
        
        it("passwordLabel returned for to be passwordLogin", () => {
            expect(passwordLabel.for).toBe('passwordLogin')
        });
        
        it('return element has correct class of form-label for passwordLabel', () => {
            expect(passwordLabel.classList.contains('form-label')).toBe(true);
        });

        it("passwordLabel has innerHTML of Password:", () => {
            expect(passwordLabel.innerHTML).toBe("Password:");
        });

        passwordInput = form.children[1].children[1]

        it("<input> element returned for passwordInput", () => {
            expect(passwordInput.tagName).toBe('INPUT')
        })
        
        it("passwordInput returned type to be password", () => {
            expect(passwordInput.type).toBe('password')
        });
        
        it("passwordInput has id of emailLogin", () => {
            expect(passwordInput.id).toBe("passwordLogin");
        });

        it("passwordInput has innerHTML of Email:", () => {
            expect(passwordInput.name).toBe("password");
        });

        div2 = form.children[1]

        it("div2 has 2 children", () => {
            expect(div2.children.length).toBe(2);
        });

        submitInput = form.children[2].children[0]

        it("<input> element returned for submitInput", () => {
            expect(submitInput.tagName).toBe('INPUT')
        })
        
        it("submitInput returned type to be submit", () => {
            expect(submitInput.type).toBe('submit')
        });

        it('return element has correct class of btn for submitInput', () => {
            expect(submitInput.classList.contains('btn')).toBe(true);
        });

        it('return element has correct class of btn-dark for submitInput', () => {
            expect(submitInput.classList.contains('btn-dark')).toBe(true);
        });
        
        it("submitInput has id of loginSubmit", () => {
            expect(submitInput.id).toBe("loginSubmit");
        });

        it("submitInput has innerHTML of Log In", () => {
            expect(submitInput.value).toBe("Log In");
        });

        div3 = form.children[2]

        it("div3 has 1 child", () => {
            expect(div3.children.length).toBe(1);
        });
    });

});
