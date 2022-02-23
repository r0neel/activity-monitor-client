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


         const heading = content.firstChild.firstChild
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

        const headingContainer = content.children[1]

        it("<div> element returned for headingContainer", () => {
            expect(headingContainer.tagName).toBe('DIV')
        })

        it("headingContainer has 2 children", () => {
            expect(headingContainer.children.length).toBe(2);
        });

        it("content has 4 children", () => {
            expect(content.children.length).toBe(4);
        });

        const container1h = content.children[1].children[0]

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

        const container1p = content.children[1].children[1].children[0]

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

        const container2h = content.children[2].children[0]

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

        const container2p = content.children[2].children[1].children[0]

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

        const container3h = content.children[3].children[0]

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

        const container3p = content.children[3].children[1].children[0]

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

         const emailLabel = form.firstChild.firstChild
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

        const emailInput = form.firstChild.children[1]

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

        const div1 = form.firstChild

        it("div1 has 2 children", () => {
            expect(div1.children.length).toBe(2);
        });


        const passwordLabel = form.children[1].firstChild

        it("<label> element returned for passwordLabel", () => {
            expect(passwordLabel.tagName).toBe('LABEL')
        })
        
        it("passwordLabel returned for to be passwordLogin", () => {
            expect(passwordLabel.for).toBe('passwordLogin')
        });
        
        it('return element has correct class of form-label for passwordLabel', () => {
            expect(passwordLabel.classList.contains('form-label')).toBe(true);
        });

        it("passwordLabel has innerHTML of Password:", () => {
            expect(passwordLabel.innerHTML).toBe("Password:");
        });

        const passwordInput = form.children[1].children[1]

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

        const div2 = form.children[1]

        it("div2 has 2 children", () => {
            expect(div2.children.length).toBe(2);
        });

        const submitInput = form.children[2].children[0]

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

        const div3 = form.children[2]

        it("div3 has 1 child", () => {
            expect(div3.children.length).toBe(1);
        });
    });

    describe("renderRegisterForm", () => {

        const form2 = render.renderRegisterForm();

        it("<form> element returned for form2", () => {
            expect(form2.tagName).toBe('FORM')
        })

        it("form2 has id of register-form", () => {
            expect(form2.id).toBe("register-form");
        });

        it('return element has correct class of text-center for form2', () => {
            expect(form2.classList.contains('text-center')).toBe(true);
        });

        it('return element has correct class of login-form for form2', () => {
            expect(form2.classList.contains('login-form')).toBe(true);
        });

        const emailLabel = form2.firstChild.firstChild
                // = content.children[1]

        it("<label> element returned for emailLabel", () => {
            expect(emailLabel.tagName).toBe('LABEL')
        })
        
        it("emailLabel returned for  to be emailRegister", () => {
            expect(emailLabel.for).toBe('emailRegister')
        })

        it('return element has correct class of form-label for emailLabel', () => {
            expect(emailLabel.classList.contains('form-label')).toBe(true);
        });

        it("emailLabel has innerHTML of Email:", () => {
            expect(emailLabel.innerHTML).toBe("Email:");
        });

        const emailInput = form2.firstChild.children[1]

        it("<input> element returned for emailInput", () => {
            expect(emailInput.tagName).toBe('INPUT')
        })
        
        it("emailInput returned type to be text", () => {
            expect(emailInput.type).toBe('text')
        });
        
        it("emailLabel has id of emailRegister", () => {
            expect(emailInput.id).toBe("emailRegister");
        });

        it("emailLabel has innerHTML of Email:", () => {
            expect(emailInput.name).toBe("email");
        });

        const div1 = form2.firstChild

        it("div1 has 2 children", () => {
            expect(div1.children.length).toBe(2);
        });

        const usernameLabel = form2.children[1].firstChild
        // = content.children[1]

        it("<label> element returned for usernameLabel", () => {
            expect(usernameLabel.tagName).toBe('LABEL')
        })
        
        it("usernameLabel returned for  to be emailRegister", () => {
            expect(usernameLabel.for).toBe('usernameRegister')
        })

        it('return element has correct class of form-label for usernameLabel', () => {
            expect(usernameLabel.classList.contains('form-label')).toBe(true);
        });

        it("usernameLabel has innerHTML of Email:", () => {
            expect(usernameLabel.innerHTML).toBe("Username:");
        });

        const usernameInput = form2.children[1].children[1]

        it("<input> element returned for usernameInput", () => {
            expect(usernameInput.tagName).toBe('INPUT')
        })
        
        it("usernameInput returned type to be text", () => {
            expect(usernameInput.type).toBe('text')
        });
        
        it("usernameInput has id of emailRegister", () => {
            expect(usernameInput.id).toBe("usernameRegister");
        });

        it("usernameInput has innerHTML of Email:", () => {
            expect(usernameInput.name).toBe("username");
        });

        const div2 = form2.firstChild

        it("div1 has 2 children", () => {
            expect(div2.children.length).toBe(2);
        });

        const passwordLabel = form2.children[2].firstChild

        it("<label> element returned for passwordLabel", () => {
            expect(passwordLabel.tagName).toBe('LABEL')
        })
        
        it("passwordLabel returned for to be passwordRegister", () => {
            expect(passwordLabel.for).toBe('passwordRegister')
        });
        
        it('return element has correct class of form-label for passwordLabel', () => {
            expect(passwordLabel.classList.contains('form-label')).toBe(true);
        });

        it("passwordLabel has innerHTML of Password:", () => {
            expect(passwordLabel.innerHTML).toBe("Password:");
        });

        const passwordInput = form2.children[2].children[1]

        it("<input> element returned for passwordInput", () => {
            expect(passwordInput.tagName).toBe('INPUT')
        })
        
        it("passwordInput returned type to be password", () => {
            expect(passwordInput.type).toBe('password')
        });
        
        it("passwordInput has id of passwordRegester", () => {
            expect(passwordInput.id).toBe("passwordRegister");
        });

        it("passwordInput has innerHTML of password", () => {
            expect(passwordInput.name).toBe("password");
        });

        const div3 = form2.children[2]

        it("div2 has 2 children", () => {
            expect(div2.children.length).toBe(2);
        });

        const passwordConfirmLabel = form2.children[3].firstChild

        it("<label> element returned for passwordConfirmLabel", () => {
            expect(passwordConfirmLabel.tagName).toBe('LABEL')
        })
        
        it("passwordConfirmLabel returned for to be passwordConfirmRegister", () => {
            expect(passwordConfirmLabel.for).toBe('passwordConfirmRegister')
        });
        
        it('return element has correct class of form-label for passwordConfirmLabel', () => {
            expect(passwordConfirmLabel.classList.contains('form-label')).toBe(true);
        });

        it("passwordConfirmLabel has innerHTML of Confirm Password:", () => {
            expect(passwordConfirmLabel.innerHTML).toBe("Confirm password:");
        });

        const passwordConfirmInput = form2.children[3].children[1]

        it("<input> element returned for passwordConfirmInput", () => {
            expect(passwordConfirmInput.tagName).toBe('INPUT')
        })
        
        it("passwordConfirmInput returned type to be password", () => {
            expect(passwordConfirmInput.type).toBe('password')
        });
        
        it("passwordConfirmInput has id of passwordConfirmRegister", () => {
            expect(passwordConfirmInput.id).toBe("passwordConfirmRegister");
        });

        it("passwordConfirmInput has innerHTML of passwordConfirm", () => {
            expect(passwordConfirmInput.name).toBe("passwordConfirm");
        });

        const div4 = form2.children[3]

        it("div4 has 2 children", () => {
            expect(div2.children.length).toBe(2);
        });

        const submitInput = form2.children[4].children[0]

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
        
        it("submitInput has id of registerSubmit", () => {
            expect(submitInput.id).toBe("registerSubmit");
        });

        it("submitInput has innerHTML of Sign Up", () => {
            expect(submitInput.value).toBe("Sign Up");
        });

        const div5 = form2.children[4]

        it("div5 has 2 children", () => {
            expect(div3.children.length).toBe(2);
        });
    });

    describe("renderDashboard", () => {
      
            const content = render.renderDashboard();
    
            it("<main> element returned for content", () => {
                expect(content.tagName).toBe('MAIN')
            })
    
            it("content has id of content", () => {
                expect(content.id).toBe("content");
            });

            const habitList = content.children[0]

            it("habitList has id of habit-list", () => {
                expect(habitList.id).toBe("habit-list");
            });

            it("habitList has 0 children", () => {
                expect(habitList.children.length).toBe(0);
            });

            const cardContainer = content.children[1]
            
            it("cardContainer has 1 child", () => {
                expect(cardContainer.children.length).toBe(1);
            });

            const card = content.children[1].children[0]
    
            it("<div> element returned for card", () => {
                expect(card.tagName).toBe('DIV')
            })
    
            it("card has id of content", () => {
                expect(card.id).toBe("trackerCard");
            });

            it('return element has correct class of card for card', () => {
                expect(card.classList.contains('card')).toBe(true);
            });

            it("card has 1 child", () => {
                expect(card.children.length).toBe(1);
            });

            const cardBody = content.children[1].children[0].children[0]
    
            it("<div> element returned for cardBody", () => {
                expect(cardBody.tagName).toBe('DIV')
            })

            it('return element has correct class of card-body for cardBody', () => {
                expect(cardBody.classList.contains('card-body')).toBe(true);
            });

            it("card has 1 child", () => {
                expect(card.children.length).toBe(1);
            });
    });

    describe("renderDashboard", () => {
        
    });
});
