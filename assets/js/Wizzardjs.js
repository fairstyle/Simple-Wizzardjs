
class Wizzardjs {

    constructor(opts = {}){
        this.element = opts.element ? opts.element : null;
        this.firststepid = opts.firststepid ? opts.firststepid : null;
        this.randomID = opts.randomID ? opts.randomID : Math.floor(Math.random() * (9999 + 1));
        this.title = opts.title ? opts.title : "Simple Wizzard";
        this.titleHidden = opts.titleHidden ? opts.titleHidden : false;
        this.steps = [];
        this.currentStep = null;
        this.prevStepIndex = null;
        this.lockedPrev = opts.lockedPrev ? opts.lockedPrev : false;
        this.lockedNext = opts.lockedNext ? opts.lockedNext : false;
        this.lockedEnd = opts.lockedEnd ? opts.lockedEnd : false;
        this.prevButtonName = opts.prevButtonName ? opts.prevButtonName : "Prev";
        //this.prevButtonClass = opts.prevButtonClass ? opts.prevButtonClass : "wizzardjs-bg-green-500 wizzardjs-border-green-600 hover:wizzardjs-bg-green-600 hover:wizzardjs-border-green-700";
        this.nextButtonName = opts.nextButtonName ? opts.nextButtonName : "Next";
        //this.nextButtonClass = opts.nextButtonClass ? opts.nextButtonClass : "wizzardjs-bg-yellow-500 wizzardjs-border-yellow-600 hover:wizzardjs-bg-yellow-600 hover:wizzardjs-border-yellow-700";
        this.endButtonName = opts.endButtonName ? opts.endButtonName : "End";
        //this.endButtonClass = opts.endButtonClass ? opts.endButtonClass : "wizzardjs-bg-blue-500 wizzardjs-border-blue-600 hover:wizzardjs-bg-blue-600 hover:wizzardjs-border-blue-700";
        this.createSimpleWizzardjs();
    }

    createSimpleWizzardjs() {
        if (this.element === null) {
            console.error("SimpleWizzard: Need an element to create the wizzard.")
            return false;
        }

        if( this.firststepid === null) {
            console.error("SimpleWizzard: Need a firststepid to start the wizzard.")
            return false;
        }

        this.element.querySelectorAll("div[data-wizzard='enabled']").forEach((step, index) => {

            step.classList.add("wizzardjs-hidden");

            if(step.dataset.stepid === this.firststepid)
                this.currentStep = step.dataset.stepid;

            this.steps.push({
                "index": index+1,
                "title": step.dataset.title ? step.dataset.title : "Paso "+(index+1),
                "icon": step.dataset.icon ? step.dataset.icon : "modulo-contratista.svg",
                "icontype": step.dataset.icontype ? step.dataset.icontype : "svg",
                "stepid": step.dataset.stepid,
                "next_stepid": step.dataset.nextstepid ? step.dataset.nextstepid : null,
                "dom_step": step.cloneNode(true),
                "cloned": false
            });

        });

        this.element.innerHTML = "";
        this.element.classList.remove("wizzardjs-hidden");
        this.paintWizzard_tabs();

    }

    paintWizzard_tabs() {

        let mainDiv = document.createElement("div");
        mainDiv.id = "simplewizzard_"+this.randomID;
        mainDiv.classList.add("wizzardjs-bg-[#F0EBF5]", "wizzardjs-py-8", "wizzardjs-px-4", "wizzardjs-rounded-lg");

        //Header
        let headerWizzard = document.createElement("div");
        headerWizzard.id = "simplewizzard_"+this.randomID+"_header";
        headerWizzard.classList.add("wizzardjs-w-full");

        //Tabs Header
        let ulTabs = document.createElement("ul");
        ulTabs.classList.add("wizzardjs-list-none", "wizzardjs-pl-0", "wizzardjs-mb-0", "wizzardjs-gap-4", "wizzardjs-grid", "wizzardjs-grid-flow-col", "wizzardjs-justify-stretch");

        //Body
        let bodyWizzard = document.createElement("div");
        bodyWizzard.id = "simplewizzard_"+this.randomID+"_body";
        bodyWizzard.classList.add("wizzardjs-w-full", "wizzardjs-py-8", "wizzardjs-px-4", "wizzardjs-rounded-b-lg", "wizzardjs-bg-white");

        this.steps.forEach((step, index) => {
            let liTab = document.createElement("li");
            liTab.id = "simplewizzard_"+this.randomID+"_tab_"+step.stepid;
            liTab.dataset.stepid = step.stepid;
            liTab.classList.add("wizzardjs-w-full", "wizzardjs-cursor-pointer");

            let aTab = document.createElement("a");
            aTab.classList.add("wizzardjs-inline-block", "wizzardjs-w-full", "wizzardjs-px-4", "wizzardjs-py-4", "lg:wizzardjs-px-12", "lg:wizzardjs-py-12", "wizzardjs-rounded-t-lg", "hover:wizzardjs-no-underline");

            if(this.currentStep === step.stepid) {
                aTab.classList.add("wizzardjs-bg-white", "hover:wizzardjs-bg-gray-100");
                step.dom_step.classList.remove("wizzardjs-hidden");
            } else
                aTab.classList.add("wizzardjs-bg-gray-100", "hover:wizzardjs-bg-gray-200");

            let iconHTML = "";
            switch(step.icontype) {
                case "svg":
                    iconHTML = `<object data="https://repgmi.test/assets/svg/${step.icon}" class="wizzardjs-h-6 wizzardjs-w-6 wizzardjs-pointer-events-none" type="image/svg+xml"></object>`;
                    break;
                case "icon":
                    iconHTML = `<i class="fa ${step.icon}" aria-hidden="true"></i>`;
                    break;
            }

            aTab.insertAdjacentHTML("beforeend", `
                <div class="wizzardjs-flex wizzardjs-justify-center lg:wizzardjs-justify-start">
                    <div class="wizzardjs-w-[34px] wizzardjs-h-[34px] wizzardjs-bg-[#9686a8] wizzardjs-rounded-[4px] lg:wizzardjs-mr-4 wizzardjs-text-center wizzardjs-leading-[34px] wizzardjs-text-white wizzardjs-grid wizzardjs-place-content-center">
                        ` + iconHTML +`
                    </div>
                    <div class="wizzardjs-hidden lg:wizzardjs-block">
                        <div class="wizzardjs-text-3xl wizzardjs-leading-none wizzardjs-text-bold wizzardjs-text-black">${step.title}</div>
                        <div class="wizzardjs-text-xl wizzardjs-leading-none wizzardjs-text-gray-500">Paso ${step.index}</div>
                    </div>
                </div>
            `);

            this.steps[index].cloned = true;
            bodyWizzard.appendChild(step.dom_step);

            //liTab.innerText = step.stepid;
            liTab.addEventListener("click", () => {
                this.goToStep(step.stepid);
            });

            liTab.appendChild(aTab);
            ulTabs.appendChild(liTab);
        });

        headerWizzard.appendChild(ulTabs);

        //Footer
        let footerWizzard = document.createElement("div");
        footerWizzard.id = "simplewizzard_"+this.randomID+"_footer";
        footerWizzard.insertAdjacentHTML("beforeend", `
            <div class="wizzardjs-w-full wizzardjs-py-8 wizzardjs-px-4">
                <div class="wizzardjs-w-full wizzardjs-bg-gray-300 wizzardjs-rounded-full wizzardjs-p-2">
                    <div id="simplewizzard_${this.randomID}_progress" class="wizzardjs-bg-gradient-to-r wizzardjs-from-[#9686a8] wizzardjs-to-[#BA90E2] wizzardjs-py-1 wizzardjs-text-center wizzardjs-rounded-full wizzardjs-transition-all wizzardjs-max-w-[100%]" style="width:0%">
                        <a class="wizzardjs-font-bold wizzardjs-text-white hover:wizzardjs-no-underline hover:wizzardjs-text-white">0%</a>
                    </div>
                </div>
            </div>
        `);

        let firstStep = this.steps.findIndex( x => x.stepid === this.currentStep );

        // Buttons
        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("wizzardjs-flex", "wizzardjs-px-4", "wizzardjs-justify-end");
        buttonsDiv.id = "simplewizzard_"+this.randomID+"_buttons";

        let prevButton = document.createElement("button");
        prevButton.innerText = this.prevButtonName;
        prevButton.id = "simplewizzard_"+this.randomID+"_prev";

        prevButton.classList.add("wizzardjs-px-4", "wizzardjs-py-2", "wizzardjs-text-white", "wizzardjs-font-black", "wizzardjs-border-solid", "wizzardjs-border-2", "wizzardjs-rounded-lg", "wizzardjs-hidden", "wizzardjs-transition", "wizzardjs-duration-300", "active:wizzardjs-scale-[90%]", "hover:wizzardjs-scale-[105%]");
        prevButton.classList.add("wizzardjs-bg-green-400", "wizzardjs-border-green-500", "hover:wizzardjs-bg-green-400", "hover:wizzardjs-border-green-500");

        prevButton.addEventListener("click", () => {
            this.prevStep();
        });

        let nextButton = document.createElement("button");
        nextButton.innerText = this.steps[firstStep].dom_step.dataset.unlock !== undefined ? (this.steps[firstStep].dom_step.dataset.unlockname !== undefined ? this.steps[firstStep].dom_step.dataset.unlockname : "Unlock") : this.nextButtonName;
        nextButton.id = "simplewizzard_"+this.randomID+"_next";

        nextButton.classList.add("wizzardjs-px-4", "wizzardjs-py-2", "wizzardjs-text-white", "wizzardjs-font-black", "wizzardjs-border-solid", "wizzardjs-border-2", "wizzardjs-rounded-lg", "wizzardjs-transition", "wizzardjs-duration-300", "active:wizzardjs-scale-[90%]", "hover:wizzardjs-scale-[105%]");
        nextButton.classList.add("wizzardjs-bg-[#9686a8]", "wizzardjs-border-[#79698a]", "hover:wizzardjs-bg-[#79698a]");

        nextButton.addEventListener("click", () => {
            this.nextStep();
        });

        let endButton = document.createElement("button");
        endButton.innerText = this.endButtonName;
        endButton.id = "simplewizzard_"+this.randomID+"_end";

        endButton.classList.add("wizzardjs-px-4", "wizzardjs-py-2", "wizzardjs-text-white", "wizzardjs-font-black", "wizzardjs-border-solid", "wizzardjs-border-2", "wizzardjs-rounded-lg", "wizzardjs-hidden", "wizzardjs-transition", "wizzardjs-duration-300", "active:wizzardjs-scale-[90%]", "hover:wizzardjs-scale-[105%]");
        endButton.classList.add("wizzardjs-bg-blue-500", "wizzardjs-border-blue-600", "hover:wizzardjs-bg-blue-600", "hover:wizzardjs-border-blue-700");

        endButton.addEventListener("click", () => {
            this.endStep();
        });

        buttonsDiv.appendChild(prevButton);
        buttonsDiv.appendChild(nextButton);
        buttonsDiv.appendChild(endButton);

        footerWizzard.appendChild(buttonsDiv);

        mainDiv.appendChild(headerWizzard);
        mainDiv.appendChild(bodyWizzard);
        mainDiv.appendChild(footerWizzard);

        this.element.appendChild(mainDiv);
    }

    nextStep() {

        let bodyWizzard = document.getElementById("simplewizzard_"+this.randomID+"_body");

        let prevStepIndex = this.steps.findIndex( x => x.stepid === this.currentStep );
        let nextIndex = this.steps.findIndex( x => x.stepid === this.steps[prevStepIndex].next_stepid );
        let nextStep = this.steps[nextIndex];

        if(this.steps[prevStepIndex].dom_step.dataset.unlock !== undefined) {
            this.lockedNext = true;
            globalThis[this.steps[prevStepIndex].dom_step.dataset.unlock]();
        }

        if(this.lockedNext === true)
            return true;

        //console.log("Ocultar: ", this.steps[this.prevStepIndex].dom_step)
        this.prevStepIndex = prevStepIndex;
        this.steps[this.prevStepIndex].dom_step.classList.add("wizzardjs-hidden");

        if(!nextStep.cloned) {
            let clone = nextStep.dom_step.cloneNode(true);
            this.steps[nextIndex].dom_step = clone;
            this.steps[nextIndex].cloned = true;
            bodyWizzard.appendChild(clone);
        }

        //Tabs
        let currentTab = document.getElementById("simplewizzard_"+this.randomID+"_tab_"+this.steps[prevStepIndex].stepid)?.querySelector("a");
        currentTab.classList.remove("wizzardjs-bg-white", "hover:wizzardjs-bg-gray-100");
        currentTab.classList.add("wizzardjs-bg-gray-100", "hover:wizzardjs-bg-gray-200");

        let nextTab = document.getElementById("simplewizzard_"+this.randomID+"_tab_"+nextStep.stepid)?.querySelector("a");
        nextTab.classList.add("wizzardjs-bg-white", "hover:wizzardjs-bg-gray-100");
        nextTab.classList.remove("wizzardjs-bg-gray-100", "hover:wizzardjs-bg-gray-200");

        //Progress
        this.setProgress(((100/(this.steps.length > 0 ? this.steps.length : 1)) * this.steps[prevStepIndex].index));

        this.currentStep = nextStep.stepid;
        this.steps[nextIndex].dom_step.classList.remove("wizzardjs-hidden");

        let buttonDiv = document.getElementById("simplewizzard_"+this.randomID+"_buttons");
        if(buttonDiv?.classList.contains("wizzardjs-justify-end")) {
            buttonDiv.classList.remove("wizzardjs-justify-end");
            buttonDiv.classList.add("wizzardjs-justify-between");
        }

        document.getElementById("simplewizzard_"+this.randomID+"_prev")?.classList.remove("wizzardjs-hidden");
        document.getElementById("simplewizzard_"+this.randomID+"_next").innerText = this.steps[nextIndex].dom_step.dataset.unlock !== undefined ? (this.steps[nextIndex].dom_step.dataset.unlockname !== undefined ? this.steps[nextIndex].dom_step.dataset.unlockname : "Unlock") : this.nextButtonName;

        if(nextStep.next_stepid === null) {
            document.getElementById("simplewizzard_"+this.randomID+"_next")?.classList.add("wizzardjs-hidden");
            document.getElementById("simplewizzard_"+this.randomID+"_end")?.classList.remove("wizzardjs-hidden");
        }
    }

    prevStep() {

        if(this.lockedPrev === true)
            return true;

        let prevStep = null;
        let currentStep = this.steps[this.steps.findIndex( x => x.stepid === this.currentStep )];

        currentStep.dom_step.classList.add("wizzardjs-hidden");

        prevStep = this.steps[this.prevStepIndex];
        prevStep.dom_step.classList.remove("wizzardjs-hidden");
        this.currentStep = prevStep.stepid;

        this.prevStepIndex = this.steps.findIndex( x => x.next_stepid === prevStep.stepid );
        this.prevStepIndex = this.prevStepIndex === -1 ? null : this.prevStepIndex;

        //Tabs
        let currentTab = document.getElementById("simplewizzard_"+this.randomID+"_tab_"+prevStep.next_stepid)?.querySelector("a");
        currentTab.classList.remove("wizzardjs-bg-white", "hover:wizzardjs-bg-gray-100");
        currentTab.classList.add("wizzardjs-bg-gray-100", "hover:wizzardjs-bg-gray-200");

        let nextTab = document.getElementById("simplewizzard_"+this.randomID+"_tab_"+prevStep.stepid)?.querySelector("a");
        nextTab.classList.add("wizzardjs-bg-white", "hover:wizzardjs-bg-gray-100");
        nextTab.classList.remove("wizzardjs-bg-gray-100", "hover:wizzardjs-bg-gray-200");

        //Progress
        this.setProgress((this.prevStepIndex === null ? 0 : ((100/(this.steps.length > 0 ? this.steps.length : 1)) * this.steps[this.prevStepIndex].index)))

        document.getElementById("simplewizzard_"+this.randomID+"_next").innerText = prevStep.dom_step.dataset.unlock !== undefined ? (prevStep.dom_step.dataset.unlockname !== undefined ? prevStep.dom_step.dataset.unlockname : "Unlock") : this.nextButtonName;

        if(this.prevStepIndex === null) {
            let buttonDiv = document.getElementById("simplewizzard_"+this.randomID+"_buttons");
            if(buttonDiv?.classList.contains("wizzardjs-justify-between")) {
                buttonDiv.classList.add("wizzardjs-justify-end");
                buttonDiv.classList.remove("wizzardjs-justify-between");
            }
            document.getElementById("simplewizzard_"+this.randomID+"_prev")?.classList.add("wizzardjs-hidden");
        }
        else {
            document.getElementById("simplewizzard_"+this.randomID+"_next")?.classList.remove("wizzardjs-hidden");
            document.getElementById("simplewizzard_"+this.randomID+"_end")?.classList.add("wizzardjs-hidden");
        }
    }

    endStep() {

        if(this.lockedEnd === true)
            return true;

        console.log("finalizar");
    }

    lock(type) {

        if(type === null || type === undefined || typeof type !== "string")
            return false;

        if(type.toLocaleLowerCase() === "prev") {
            document.getElementById("simplewizzard_"+this.randomID+"_prev")?.classList.add("!wizzardjs-bg-gray-200", "hover:!wizzardjs-bg-gray-200", "!wizzardjs-border-gray-200", "hover:!wizzardjs-border-gray-200", "!wizzardjs-cursor-not-allowed");
            this.lockedPrev = true;
        }

        else if(type.toLocaleLowerCase() === "next") {
            document.getElementById("simplewizzard_"+this.randomID+"_next")?.classList.add("!wizzardjs-bg-gray-200", "hover:!wizzardjs-bg-gray-200", "!wizzardjs-border-gray-200", "hover:!wizzardjs-border-gray-200", "!wizzardjs-cursor-not-allowed");
            this.lockedNext = true;
        }

        else if(type.toLocaleLowerCase() === "end") {
            document.getElementById("simplewizzard_"+this.randomID+"_end")?.classList.add("!wizzardjs-bg-gray-200", "hover:!wizzardjs-bg-gray-200", "!wizzardjs-border-gray-200", "hover:!wizzardjs-border-gray-200", "!wizzardjs-cursor-not-allowed");
            this.lockedEnd = true;
        }
    }

    unlock(type) {

        if(type === null || type === undefined || typeof type !== "string")
            return false;

        if(type.toLocaleLowerCase() === "prev") {
            document.getElementById("simplewizzard_"+this.randomID+"_prev")?.classList.remove("!wizzardjs-bg-gray-200", "hover:!wizzardjs-bg-gray-200", "!wizzardjs-border-gray-200", "hover:!wizzardjs-border-gray-200", "!wizzardjs-cursor-not-allowed");
            this.lockedPrev = false;
        }

        else if(type.toLocaleLowerCase() === "next") {
            document.getElementById("simplewizzard_"+this.randomID+"_next")?.classList.remove("!wizzardjs-bg-gray-200", "hover:!wizzardjs-bg-gray-200", "!wizzardjs-border-gray-200", "hover:!wizzardjs-border-gray-200", "!wizzardjs-cursor-not-allowed");
            this.lockedNext = false;
        }

        else if(type.toLocaleLowerCase() === "end") {
            document.getElementById("simplewizzard_"+this.randomID+"_end")?.classList.remove("!wizzardjs-bg-gray-200", "hover:!wizzardjs-bg-gray-200", "!wizzardjs-border-gray-200", "hover:!wizzardjs-border-gray-200", "!wizzardjs-cursor-not-allowed");
            this.lockedEnd = false;
        }
    }

    goToStep(stepid) {

        if(stepid === this.currentStep)
            return false;

        let currentStep = this.steps.findIndex( x => x.stepid === this.currentStep );

        if(this.prevStepIndex !== null && this.steps[this.prevStepIndex].stepid === stepid) {
            this.prevStep();
        }

        else if(this.steps[currentStep].next_stepid === stepid) {
            this.nextStep();
        }
    }

    setProgress(percent) {

        percent = percent < 0 ? 0 : (percent > 100 ? 100 : percent);
        let progress = document.getElementById("simplewizzard_"+this.randomID+"_progress");
        progress.style.width = percent+"%";
        progress.querySelector("a").innerText = progress.style.width;
    }

    reset() {

    }

}
