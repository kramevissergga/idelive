(() => {
    "use strict";
    const modules_flsModules = {};
    function addLoadedClass() {
        if (!document.documentElement.classList.contains("loading")) window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0, margin = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore + margin}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
            updateAllTrackingLines();
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
            updateAllTrackingLines();
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function spoilers() {
        const spoilersArray = document.querySelectorAll("[data-spoilers]");
        if (spoilersArray.length > 0) {
            document.addEventListener("click", setspoilerAction);
            const spoilersRegular = Array.from(spoilersArray).filter((function(item, index, self) {
                return !item.dataset.spoilers.split(",")[0];
            }));
            if (spoilersRegular.length) initspoilers(spoilersRegular);
            let mdQueriesArray = dataMediaQueries(spoilersArray, "spoilers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initspoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initspoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initspoilers(spoilersArray, matchMedia = false) {
                spoilersArray.forEach((spoilersBlock => {
                    spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spoilersBlock.classList.add("_spoiler-init");
                        initspoilerBody(spoilersBlock);
                    } else {
                        spoilersBlock.classList.remove("_spoiler-init");
                        initspoilerBody(spoilersBlock, false);
                    }
                }));
            }
            function initspoilerBody(spoilersBlock, hidespoilerBody = true) {
                let spoilerItems = spoilersBlock.querySelectorAll("details");
                if (spoilerItems.length) spoilerItems.forEach((spoilerItem => {
                    let spoilerTitle = spoilerItem.querySelector("summary");
                    if (hidespoilerBody) {
                        spoilerTitle.removeAttribute("tabindex");
                        if (!spoilerItem.hasAttribute("data-open")) {
                            spoilerItem.open = false;
                            spoilerTitle.nextElementSibling.hidden = true;
                        } else {
                            spoilerTitle.classList.add("_spoiler-active");
                            spoilerItem.open = true;
                        }
                    } else {
                        spoilerTitle.setAttribute("tabindex", "-1");
                        spoilerTitle.classList.remove("_spoiler-active");
                        spoilerItem.open = true;
                        spoilerTitle.nextElementSibling.hidden = false;
                    }
                }));
            }
            function setspoilerAction(e) {
                const el = e.target;
                if (el.closest("summary") && el.closest("[data-spoilers]") && !el.closest("[data-sp-ignore]")) {
                    e.preventDefault();
                    if (el.closest("[data-spoilers]").classList.contains("_spoiler-init")) {
                        const spoilerTitle = el.closest("summary");
                        const spoilerBlock = spoilerTitle.closest("details");
                        const spoilersBlock = spoilerTitle.closest("[data-spoilers]");
                        const onespoiler = spoilersBlock.hasAttribute("data-one-spoiler");
                        const scrollspoiler = spoilerBlock.hasAttribute("data-spoiler-scroll");
                        const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                        if (!spoilersBlock.querySelectorAll("._slide").length) {
                            if (onespoiler && !spoilerBlock.open) hidespoilersBody(spoilersBlock);
                            !spoilerBlock.open ? spoilerBlock.open = true : setTimeout((() => {
                                spoilerBlock.open = false;
                            }), spoilerSpeed);
                            spoilerTitle.classList.toggle("_spoiler-active");
                            _slideToggle(spoilerTitle.nextElementSibling, spoilerSpeed);
                            fireDetailsEvent(spoilerBlock);
                            if (scrollspoiler && spoilerTitle.classList.contains("_spoiler-active")) {
                                const scrollspoilerValue = spoilerBlock.dataset.spoilerScroll;
                                const scrollspoilerOffset = +scrollspoilerValue ? +scrollspoilerValue : 0;
                                const scrollspoilerNoHeader = spoilerBlock.hasAttribute("data-spoiler-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
                                window.scrollTo({
                                    top: spoilerBlock.offsetTop - (scrollspoilerOffset + scrollspoilerNoHeader),
                                    behavior: "smooth"
                                });
                            }
                        }
                    }
                }
                if (!el.closest("[data-spoilers]")) {
                    const spoilersClose = document.querySelectorAll("[data-spoiler-close]");
                    if (spoilersClose.length) spoilersClose.forEach((spoilerClose => {
                        const spoilersBlock = spoilerClose.closest("[data-spoilers]");
                        const spoilerCloseBlock = spoilerClose.parentNode;
                        if (spoilersBlock.classList.contains("_spoiler-init")) {
                            const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                            spoilerClose.classList.remove("_spoiler-active");
                            _slideUp(spoilerClose.nextElementSibling, spoilerSpeed);
                            setTimeout((() => {
                                spoilerCloseBlock.open = false;
                            }), spoilerSpeed);
                        }
                    }));
                }
            }
            function hidespoilersBody(spoilersBlock) {
                const spoilerActiveBlock = spoilersBlock.querySelector("details[open]");
                if (spoilerActiveBlock && !spoilersBlock.querySelectorAll("._slide").length) {
                    const spoilerActiveTitle = spoilerActiveBlock.querySelector("summary");
                    const spoilerSpeed = spoilersBlock.dataset.spoilersSpeed ? parseInt(spoilersBlock.dataset.spoilersSpeed) : 500;
                    spoilerActiveTitle.classList.remove("_spoiler-active");
                    _slideUp(spoilerActiveTitle.nextElementSibling, spoilerSpeed);
                    setTimeout((() => {
                        spoilerActiveBlock.open = false;
                    }), spoilerSpeed);
                }
            }
        }
        function fireDetailsEvent(spoilerBlock) {
            const event = new CustomEvent("detailsChanged", {
                bubbles: true,
                detail: {
                    open: spoilerBlock.open,
                    element: spoilerBlock
                }
            });
            spoilerBlock.dispatchEvent(event);
        }
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                const tabsTitles = Array.from(tabsBlock.querySelectorAll("[data-tabs-title]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
                const backBtns = Array.from(tabsBlock.querySelectorAll("[data-tabs-back]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
                const nextBtns = Array.from(tabsBlock.querySelectorAll("[data-tabs-next]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
                backBtns.forEach((backBtn => {
                    backBtn.addEventListener("click", (() => {
                        const currentIndex = tabsTitles.findIndex((title => title.classList.contains("_tab-active")));
                        if (currentIndex > 0) {
                            const splideElement = tabsBlock.querySelector("._splide-tabs");
                            if (splideElement?.splideInstance) splideElement.splideInstance.go(currentIndex - 1); else setActiveTab(tabsBlock, currentIndex - 1);
                        }
                    }));
                }));
                nextBtns.forEach((nextBtn => {
                    nextBtn.addEventListener("click", (() => {
                        const currentIndex = tabsTitles.findIndex((title => title.classList.contains("_tab-active")));
                        if (currentIndex < tabsTitles.length - 1) {
                            const splideElement = tabsBlock.querySelector("._splide-tabs");
                            if (splideElement?.splideInstance) splideElement.splideInstance.go(currentIndex + 1); else setActiveTab(tabsBlock, currentIndex + 1);
                        }
                    }));
                }));
                initTabs(tabsBlock);
                const splideElement = tabsBlock.querySelector("._splide-tabs");
                if (splideElement) {
                    const splide = new Splide(splideElement, {
                        speed: 300,
                        pagination: false,
                        updateOnMove: true,
                        flickMaxPages: 1,
                        flickPower: 100
                    }).mount();
                    splideElement.splideInstance = splide;
                    splide.on("mounted move", (newIndex => {
                        setActiveTab(tabsBlock, newIndex);
                        updateSelect(tabsBlock, newIndex);
                    }));
                    tabsTitles.forEach(((title, tabIndex) => {
                        title.addEventListener("click", (() => {
                            splide.go(tabIndex);
                        }));
                    }));
                    const activeIndex = tabsTitles.findIndex((title => title.classList.contains("_tab-active")));
                    if (activeIndex >= 0) splide.go(activeIndex);
                }
                const tabsSelect = tabsBlock.querySelector(".select_tabs");
                if (tabsSelect) {
                    document.addEventListener("selectCallback", (e => {
                        if (e.detail.select === tabsSelect.querySelector("select")) {
                            const selectedOption = e.detail.select.selectedOptions[0];
                            const value = selectedOption.value;
                            if (!selectedOption.hasAttribute("data-href")) {
                                const tabIndex = parseInt(value, 10) - 1;
                                const splideElement = tabsBlock.querySelector("._splide-tabs");
                                if (splideElement?.splideInstance) splideElement.splideInstance.go(tabIndex); else setActiveTab(tabsBlock, tabIndex);
                            }
                        }
                    }));
                    const activeTabIndex = tabsTitles.findIndex((title => title.classList.contains("_tab-active")));
                    if (activeTabIndex >= 0) tabsSelect.value = activeTabIndex + 1;
                }
            }));
            const mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray?.length) mdQueriesArray.forEach((item => {
                item.matchMedia.addEventListener("change", (() => {
                    setTitlePosition(item.itemsArray, item.matchMedia);
                }));
                setTitlePosition(item.itemsArray, item.matchMedia);
            }));
        }
        function initTabs(tabsBlock) {
            const tabsTitles = Array.from(tabsBlock.querySelectorAll("[data-tabs-title]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            const tabsContent = Array.from(tabsBlock.querySelectorAll("[data-tabs-item]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const activeHash = tabsActiveHash[0] == tabsBlockIndex;
            if (activeHash) {
                const current = tabsBlock.querySelector("[data-tabs-title]._tab-active");
                current?.classList.remove("_tab-active");
            }
            tabsContent.forEach(((item, i) => {
                const isActive = tabsTitles[i]?.classList.contains("_tab-active");
                item.hidden = !isActive;
                item.inert = !isActive;
            }));
            const activeIndex = tabsTitles.findIndex((t => t.classList.contains("_tab-active")));
            if (activeIndex >= 0) updateTabsNavigation(tabsBlock, activeIndex);
            const splideElement = tabsBlock.querySelector("._splide-tabs");
            if (splideElement?.splideInstance && activeIndex >= 0) splideElement.splideInstance.go(activeIndex);
        }
        function setTabsAction(e) {
            const el = e.target.closest("[data-tabs-title]");
            if (!el) return;
            const tabsBlock = el.closest("[data-tabs]");
            if (!tabsBlock) return;
            const splideElement = tabsBlock.querySelector("._splide-tabs");
            if (splideElement?.splideInstance) {
                const index = Array.from(el.parentElement.children).indexOf(el);
                splideElement.splideInstance.go(index);
            } else if (!el.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                const prev = Array.from(tabsBlock.querySelectorAll("[data-tabs-title]._tab-active")).filter((el => el.closest("[data-tabs]") === tabsBlock))[0];
                prev?.classList.remove("_tab-active");
                el.classList.add("_tab-active");
                setTabsStatus(tabsBlock);
                const activeIndex = Array.from(tabsBlock.querySelectorAll("[data-tabs-title]")).filter((el => el.closest("[data-tabs]") === tabsBlock)).indexOf(el);
                updateSelect(tabsBlock, activeIndex);
                updateTabsNavigation(tabsBlock, activeIndex);
                window.dispatchEvent(new Event("resize"));
            }
            tabsBlock.dispatchEvent(new CustomEvent("tabSwitch"));
            tabsBlock.querySelectorAll(".tracking-inq").forEach(updateTrackingLine);
            e.preventDefault();
        }
        function setActiveTab(tabsBlock, index) {
            const tabsTitles = Array.from(tabsBlock.querySelectorAll("[data-tabs-title]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            const tabsContent = Array.from(tabsBlock.querySelectorAll("[data-tabs-item]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            tabsTitles.forEach(((title, i) => {
                const isActive = i === index;
                title.classList.toggle("_tab-active", isActive);
            }));
            tabsContent.forEach(((content, i) => {
                const isActive = i === index;
                content.hidden = !isActive;
                content.inert = !isActive;
            }));
            updateSelect(tabsBlock, index);
            updateTabsNavigation(tabsBlock, index);
        }
        function updateTabsNavigation(tabsBlock, activeIndex) {
            const tabsTitles = Array.from(tabsBlock.querySelectorAll("[data-tabs-title]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            const backBtns = Array.from(tabsBlock.querySelectorAll("[data-tabs-back]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            const nextBtns = Array.from(tabsBlock.querySelectorAll("[data-tabs-next]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            const pagesIndicators = Array.from(tabsBlock.querySelectorAll("[data-tabs-pages]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            backBtns.forEach((btn => btn.disabled = activeIndex <= 0));
            nextBtns.forEach((btn => btn.disabled = activeIndex >= tabsTitles.length - 1));
            pagesIndicators.forEach((indicator => {
                indicator.innerHTML = "";
                const span = document.createElement("span");
                span.textContent = activeIndex + 1;
                indicator.appendChild(span);
                indicator.append(`/${tabsTitles.length}`);
            }));
        }
        function updateSelect(tabsBlock, index) {
            const tabsSelect = tabsBlock.querySelector(".tabs-select");
            if (tabsSelect) {
                tabsSelect.value = index + 1;
                modules_flsModules.select.selectBuild(tabsSelect);
            }
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((item => {
                const tabsBlock = item.item;
                const tabsTitles = Array.from(tabsBlock.querySelectorAll("[data-tabs-title]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
                const tabsContent = Array.from(tabsBlock.querySelectorAll("[data-tabs-item]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
                const titlesContainer = tabsBlock.querySelector("[data-tabs-titles]");
                const contentContainer = tabsBlock.querySelector("[data-tabs-body]");
                tabsContent.forEach(((contentItem, i) => {
                    if (matchMedia.matches) {
                        contentContainer.append(tabsTitles[i]);
                        contentContainer.append(contentItem);
                        tabsBlock.classList.add("_tab-spoiler");
                    } else {
                        titlesContainer.append(tabsTitles[i]);
                        tabsBlock.classList.remove("_tab-spoiler");
                    }
                }));
            }));
        }
        function setTabsStatus(tabsBlock) {
            const tabsTitles = Array.from(tabsBlock.querySelectorAll("[data-tabs-title]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            let tabsContent = Array.from(tabsBlock.querySelectorAll("[data-tabs-item]")).filter((el => el.closest("[data-tabs]") === tabsBlock));
            const animate = tabsBlock.dataset.tabsAnimate ? +tabsBlock.dataset.tabsAnimate : null;
            const isHash = tabsBlock.hasAttribute("data-tabs-hash");
            tabsContent.forEach(((item, i) => {
                const isActive = tabsTitles[i].classList.contains("_tab-active");
                if (isActive) {
                    if (animate) _slideDown(item, animate); else {
                        item.hidden = false;
                        item.inert = false;
                    }
                    if (isHash && !item.closest(".popup")) {
                        const index = tabsBlock.dataset.tabsIndex;
                        setHash(`tab-${index}-${i}`);
                    }
                } else {
                    item.querySelectorAll("iframe").forEach((f => f.remove()));
                    if (animate) _slideUp(item, animate); else {
                        item.hidden = true;
                        item.inert = true;
                    }
                }
            }));
        }
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    window.addEventListener("resize", (() => {
        updateAllTrackingLines();
    }));
    function updateAllTrackingLines() {
        const trackingContainers = document.querySelectorAll(".tracking-inq");
        trackingContainers?.forEach((container => {
            updateTrackingLine(container);
        }));
    }
    updateAllTrackingLines();
    function updateTrackingLine(container) {
        const trackingBody = container.querySelector(".tracking-inq__body");
        const trackingItems = container.querySelectorAll(".tracking-inq__item");
        const trackingLine = container.querySelector(".tracking-inq__line");
        if (!trackingBody || !trackingLine || trackingItems.length === 0) return;
        const isVertical = window.matchMedia("(max-width: 767.98px)").matches;
        const lastItem = trackingItems[trackingItems.length - 1];
        const bodyRect = trackingBody.getBoundingClientRect();
        const itemRect = lastItem.getBoundingClientRect();
        if (isVertical) {
            const distance = itemRect.top - bodyRect.top;
            let accentDistance = 0;
            const completedItems = container.querySelectorAll(".tracking-inq__item.completed");
            if (completedItems.length > 0) {
                const lastCompleted = completedItems[completedItems.length - 1];
                const completedRect = lastCompleted.getBoundingClientRect();
                accentDistance = completedRect.top - bodyRect.top;
            }
            trackingLine.style.setProperty("--tracking-height", `${distance}px`);
            trackingLine.style.setProperty("--accent-height", `${accentDistance}px`);
        } else {
            const distance = itemRect.left - bodyRect.left;
            let accentDistance = 0;
            const completedItems = container.querySelectorAll(".tracking-inq__item.completed");
            if (completedItems.length > 0) {
                const lastCompleted = completedItems[completedItems.length - 1];
                const completedRect = lastCompleted.getBoundingClientRect();
                accentDistance = completedRect.left - bodyRect.left;
            }
            trackingLine.style.setProperty("--tracking-width", `${distance}px`);
            trackingLine.style.setProperty("--accent-width", `${accentDistance}px`);
        }
    }
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    location: false,
                    goHash: false
                },
                on: {
                    beforeOpen: function() {},
                    afterOpen: function() {},
                    beforeClose: function() {},
                    afterClose: function() {}
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }
        initPopups() {
            this.popupLogging(`Прокинувся`);
            this.eventsPopup();
        }
        eventsPopup() {
            document.addEventListener("click", function(e) {
                const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                    if (this._dataValue !== "error") {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    } else this.popupLogging(`Йой, не заповнено атрибут у ${buttonOpen.classList}`);
                    return;
                }
                const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                if (this.options.closeEsc && e.which == 27 && e.code === "Escape" && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && e.which == 9 && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            }.bind(this));
            if (this.options.hashSettings.goHash) {
                window.addEventListener("hashchange", function() {
                    if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                }.bind(this));
                window.addEventListener("load", function() {
                    if (window.location.hash) this._openToHash();
                }.bind(this));
            }
        }
        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }
                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }
                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;
                this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                if (this.targetOpen.element) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = document.createElement("iframe");
                        iframe.setAttribute("allowfullscreen", "");
                        const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                        iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                        iframe.setAttribute("src", urlVideo);
                        if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                        }
                        this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                    }
                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }
                    this.options.on.beforeOpen(this);
                    document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    this.targetOpen.element.classList.add(this.options.classes.popupActive);
                    document.documentElement.classList.add(this.options.classes.bodyActive);
                    if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                    this.targetOpen.element.setAttribute("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;
                    setTimeout((() => {
                        this._focusTrap();
                    }), 50);
                    this.options.on.afterOpen(this);
                    document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                        detail: {
                            popup: this
                        }
                    }));
                    setTimeout((() => {
                        window.dispatchEvent(new Event("resize"));
                    }), 0);
                    this.popupLogging(`Відкрив попап`);
                } else this.popupLogging(`Йой, такого попапу немає. Перевірте коректність введення. `);
            }
        }
        close(selectorValue) {
            if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") this.previousOpen.selector = selectorValue;
            if (!this.isOpen || !bodyLockStatus) return;
            this.options.on.beforeClose(this);
            document.dispatchEvent(new CustomEvent("beforePopupClose", {
                detail: {
                    popup: this
                }
            }));
            if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
            this.previousOpen.element.classList.remove(this.options.classes.popupActive);
            this.previousOpen.element.setAttribute("aria-hidden", "true");
            if (!this._reopen) {
                document.documentElement.classList.remove(this.options.classes.bodyActive);
                !this.bodyLock ? bodyUnlock() : null;
                this.isOpen = false;
            }
            this._removeHash();
            if (this._selectorOpen) {
                this.lastClosed.selector = this.previousOpen.selector;
                this.lastClosed.element = this.previousOpen.element;
            }
            this.options.on.afterClose(this);
            document.dispatchEvent(new CustomEvent("afterPopupClose", {
                detail: {
                    popup: this
                }
            }));
            setTimeout((() => {
                this._focusTrap();
            }), 50);
            this.popupLogging(`Закрив попап`);
        }
        _getHash() {
            if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
        }
        _openToHash() {
            let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
            const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
            this.youTubeCode = buttons.getAttribute(this.options.youtubeAttribute) ? buttons.getAttribute(this.options.youtubeAttribute) : null;
            if (buttons && classInHash) this.open(classInHash);
        }
        _setHash() {
            history.pushState("", "", this.hash);
        }
        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
            const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);
            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }
            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
        _focusTrap() {
            const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
            if (!this.isOpen && this.lastFocusEl) ; else focusable[0].focus();
        }
        popupLogging(message) {
            this.options.logging ? functions_FLS(`[Попапос]: ${message}`) : null;
        }
    }
    modules_flsModules.popup = new Popup({});
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll("div.select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    function formRating() {
        const ratings = document.querySelectorAll("[data-rating]");
        if (ratings) ratings.forEach((rating => {
            const ratingValue = +rating.dataset.ratingValue;
            const ratingSize = +rating.dataset.ratingSize ? +rating.dataset.ratingSize : 5;
            formRatingInit(rating, ratingSize);
            ratingValue ? formRatingSet(rating, ratingValue) : null;
            document.addEventListener("click", formRatingAction);
        }));
        function formRatingAction(e) {
            const targetElement = e.target;
            if (targetElement.closest(".rating__input")) {
                const currentElement = targetElement.closest(".rating__input");
                const ratingValue = +currentElement.value;
                const rating = currentElement.closest(".rating");
                const ratingSet = rating.dataset.rating === "set";
                ratingSet ? formRatingGet(rating, ratingValue) : null;
            }
        }
        function formRatingInit(rating, ratingSize) {
            let ratingItems = ``;
            for (let index = 0; index < ratingSize; index++) {
                index === 0 ? ratingItems += `<div class="rating__items">` : null;
                ratingItems += `\n\t\t\t\t<label class="rating__item">\n\t\t\t\t\t<input class="rating__input" type="radio" name="rating" value="${index + 1}">\n\t\t\t\t</label>`;
                index === ratingSize ? ratingItems += `</div">` : null;
            }
            rating.insertAdjacentHTML("beforeend", ratingItems);
        }
        function formRatingGet(rating, ratingValue) {
            const resultRating = ratingValue;
            formRatingSet(rating, resultRating);
        }
        function formRatingSet(rating, value) {
            const ratingItems = rating.querySelectorAll(".rating__item");
            const resultFullItems = parseInt(value);
            const resultPartItem = value - resultFullItems;
            rating.hasAttribute("data-rating-title") ? rating.title = value : null;
            ratingItems.forEach(((ratingItem, index) => {
                ratingItem.classList.remove("rating__item--active");
                ratingItem.querySelector("span") ? ratingItems[index].querySelector("span").remove() : null;
                if (index <= resultFullItems - 1) ratingItem.classList.add("rating__item--active");
                if (index === resultFullItems && resultPartItem) ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`);
            }));
        }
    }
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true,
                speed: 150
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectSearch: "select__search",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                    this.setLogging(`Прокинувся, построїв селектов: (${selectItems.length})`);
                } else this.setLogging("Сплю, немає жодного select");
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
            window.addEventListener("resize", (() => {
                document.querySelectorAll(`.${this.selectClasses.classSelect}`).forEach((selectItem => {
                    this.truncateTags(selectItem);
                }));
            }));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
            this.config.speed = +originalSelect.dataset.speed;
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)) || targetElement.classList.contains("select__clear")) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if (targetType === "click") {
                    if (!originalSelect.disabled) if (targetElement.classList.contains("select__clear")) this.clearAllSelected(selectItem, originalSelect); else if (targetElement.closest(`${this.getSelectClass(this.selectClasses.classSelectTag)} .remove`)) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if (targetType === "focusin" || targetType === "focusout") {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) targetType === "focusin" ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if (targetType === "keydown" && e.code === "Escape") this.selectsСlose();
            } else this.selectsСlose();
        }
        clearAllSelected(selectItem, originalSelect) {
            const targetTags = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectTag));
            targetTags.forEach((tag => {
                const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${tag.dataset.selectId}"] .select__option[data-value="${tag.dataset.value}"]`);
                this.optionAction(selectItem, originalSelect, optionItem);
            }));
            const clearButton = selectItem.querySelector(".select__clear");
            if (clearButton) clearButton.classList.remove("_select-clear-visible");
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
                setTimeout((() => {
                    selectItem.style.zIndex = "";
                }), originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;
            this.setOptionsPosition(selectItem);
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            setTimeout((() => {
                if (!selectOptions.classList.contains("_slide")) {
                    selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                    _slideToggle(selectOptions, originalSelect.dataset.speed);
                    if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) selectItem.style.zIndex = selectOpenzIndex; else setTimeout((() => {
                        selectItem.style.zIndex = "";
                    }), originalSelect.dataset.speed);
                }
            }), 0);
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            this.truncateTags(selectItem);
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                const selectedOptions = this.getSelectedOptionsData(originalSelect);
                selectTitleValue = selectedOptions.elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)} <span class="remove _icon-cross-bold" role="button"></span></span>`)).join("");
                if (originalSelect.hasAttribute("data-search") && !originalSelect.multiple) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search") && !originalSelect.multiple) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" name="${originalSelect.name}" data-placeholder="${selectTitleValue}" ${originalSelect.getAttribute("data-search") === "save" && originalSelect.hasAttribute("data-required") ? "required" : ""} class="${this.selectClasses.classSelectInput}"></span></div>`; else if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                const selectedOptions = this.getSelectedOptionsData(originalSelect);
                const hasSelected = selectedOptions.values.length > 0;
                const clearButton = !selectItem.querySelector(".select__clear") ? `<span type="button" class="select__clear _icon-cross-bold ${hasSelected ? "_select-clear-visible" : ""}" data-select-id="${selectItem.dataset.id}"></span>` : "";
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}">\n      <span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}">\n      <span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}\n      </span>\n      ${clearButton}\n      </span>\n      </button>`;
            } else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.innerHTML;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            const selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ""} class="${this.selectClasses.classSelectOptionsScroll}">`;
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += `</div>`;
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            let optionsHTML = this.getOptions(originalSelect);
            if (originalSelect.multiple && originalSelect.hasAttribute("data-search")) {
                const selectTitleValue = originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
                const searchInput = `<div class="${this.selectClasses.classSelectSearch}">\n      <input autocomplete="off" type="text" placeholder="${selectTitleValue}" \n      data-placeholder="${selectTitleValue}" \n      class="${this.selectClasses.classSelectInput}">\n    </div>`;
                optionsHTML = searchInput + optionsHTML;
            }
            selectItemOptions.innerHTML = optionsHTML;
            const scroll = selectItemOptions.querySelector(`.${this.selectClasses.classSelectOptionsScroll}`);
            if (scroll) {
                const prevHidden = selectItemOptions.hidden;
                selectItemOptions.hidden = false;
                scroll.style.setProperty("--init-height", `${scroll.offsetHeight / 16}rem`);
                selectItemOptions.hidden = prevHidden;
            }
            if (originalSelect.hasAttribute("data-search")) this.searchActions(selectItem);
        }
        setOptionsPosition(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
            const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
            const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;
            if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
                selectOptions.hidden = false;
                const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue("max-height"));
                const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
                const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
                selectOptions.hidden = true;
                const selectItemHeight = selectItem.offsetHeight;
                const selectItemPos = selectItem.getBoundingClientRect().top;
                const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
                const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);
                if (selectItemResult < 0) {
                    const newMaxHeightValue = selectOptionsHeight + selectItemResult;
                    if (newMaxHeightValue < 100) {
                        selectItem.classList.add("select--show-top");
                        selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
                    } else {
                        selectItem.classList.remove("select--show-top");
                        selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
                    }
                }
            } else setTimeout((() => {
                selectItem.classList.remove("select--show-top");
                selectItemScroll.style.maxHeight = customMaxHeightValue;
            }), +originalSelect.dataset.speed);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
            if (!selectOptions.classList.contains("_slide")) {
                if (originalSelect.multiple) {
                    optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                    const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                    originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                        originalSelectSelectedItem.removeAttribute("selected");
                    }));
                    const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                    selectSelectedItems.forEach((selectSelectedItems => {
                        originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                    }));
                } else {
                    if (!originalSelect.hasAttribute("data-show-selected")) setTimeout((() => {
                        if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                        optionItem.hidden = true;
                    }), this.config.speed);
                    originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                    this.selectAction(selectItem);
                }
                this.setSelectTitleValue(selectItem, originalSelect);
                this.setSelectTitleValue(selectItem, originalSelect);
                if (originalSelect.hasAttribute("data-search") && originalSelect.getAttribute("data-search") === "save") {
                    const input = selectItem.querySelector(`.${this.selectClasses.classSelectInput}`);
                    if (input) input.value = optionItem.textContent.trim();
                }
                this.setSelectChange(originalSelect);
            }
        }
        selectChange(e) {
            e.target;
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            let selectInput;
            if (originalSelect.multiple) selectInput = selectOptions.querySelector(`.${this.selectClasses.classSelectInput}`); else {
                const selectInputElement = this.getSelectElement(selectItem, this.selectClasses.classSelectInput);
                selectInput = selectInputElement ? selectInputElement.selectElement : null;
            }
            if (!selectInput) {
                this.setLogging("Поле пошуку не знайдено");
                return;
            }
            if (!selectOptions) {
                this.setLogging("Список опцій не знайдено");
                return;
            }
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                if (originalSelect.hasAttribute("data-search") && originalSelect.getAttribute("data-search") === "save" && selectInput.value.trim() === "") {
                    originalSelect.value = "";
                    _this.setSelectTitleValue(selectItem, originalSelect);
                    _this.setSelectChange(originalSelect);
                    const newInput = selectItem.querySelector(`.${_this.selectClasses.classSelectInput}`);
                    if (newInput) newInput.focus();
                }
                if (selectOptions.hidden === true) _this.selectAction(selectItem);
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message} `) : null;
        }
        truncateTags(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectValue = selectItem.querySelector(`.${this.selectClasses.classSelectValue}`);
            if (!(originalSelect.multiple && originalSelect.hasAttribute("data-tags"))) return;
            const contentWrapper = selectItem.querySelector(".select__content");
            if (!contentWrapper) return;
            const tags = Array.from(contentWrapper.children).filter((el => !el.classList.contains("select__more-tags")));
            const containerWidth = contentWrapper.offsetWidth;
            let totalWidth = 0;
            let visibleCount = 0;
            tags.forEach((tag => tag.style.display = ""));
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                const style = getComputedStyle(tag);
                const tagWidth = tag.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
                if (totalWidth + tagWidth > containerWidth) break;
                totalWidth += tagWidth;
                visibleCount++;
            }
            const hiddenCount = tags.length - visibleCount;
            tags.forEach(((tag, i) => {
                tag.style.display = i < visibleCount ? "" : "none";
            }));
            const existingCounter = selectValue.querySelector(".select__more-tags");
            if (existingCounter) existingCounter.remove();
            if (hiddenCount > 0) {
                const moreTag = document.createElement("span");
                moreTag.className = "select__more-tags";
                moreTag.textContent = `${hiddenCount}`;
                selectValue.appendChild(moreTag);
                contentWrapper.classList.add("_has-hidden-tags");
            }
        }
    }
    modules_flsModules.select = new SelectConstructor({});
    var PipsMode;
    (function(PipsMode) {
        PipsMode["Range"] = "range";
        PipsMode["Steps"] = "steps";
        PipsMode["Positions"] = "positions";
        PipsMode["Count"] = "count";
        PipsMode["Values"] = "values";
    })(PipsMode || (PipsMode = {}));
    var PipsType;
    (function(PipsType) {
        PipsType[PipsType["None"] = -1] = "None";
        PipsType[PipsType["NoValue"] = 0] = "NoValue";
        PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
        PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
    })(PipsType || (PipsType = {}));
    function isValidFormatter(entry) {
        return isValidPartialFormatter(entry) && typeof entry.from === "function";
    }
    function isValidPartialFormatter(entry) {
        return typeof entry === "object" && typeof entry.to === "function";
    }
    function removeElement(el) {
        el.parentElement.removeChild(el);
    }
    function isSet(value) {
        return value !== null && value !== void 0;
    }
    function preventDefault(e) {
        e.preventDefault();
    }
    function unique(array) {
        return array.filter((function(a) {
            return !this[a] ? this[a] = true : false;
        }), {});
    }
    function closest(value, to) {
        return Math.round(value / to) * to;
    }
    function offset(elem, orientation) {
        var rect = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var docElem = doc.documentElement;
        var pageOffset = getPageOffset(doc);
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) pageOffset.x = 0;
        return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
    }
    function isNumeric(a) {
        return typeof a === "number" && !isNaN(a) && isFinite(a);
    }
    function addClassFor(element, className, duration) {
        if (duration > 0) {
            addClass(element, className);
            setTimeout((function() {
                removeClass(element, className);
            }), duration);
        }
    }
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }
    function asArray(a) {
        return Array.isArray(a) ? a : [ a ];
    }
    function countDecimals(numStr) {
        numStr = String(numStr);
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
    }
    function addClass(el, className) {
        if (el.classList && !/\s/.test(className)) el.classList.add(className); else el.className += " " + className;
    }
    function removeClass(el, className) {
        if (el.classList && !/\s/.test(className)) el.classList.remove(className); else el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
    }
    function getPageOffset(doc) {
        var supportPageOffset = window.pageXOffset !== void 0;
        var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
        var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
        var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
        return {
            x,
            y
        };
    }
    function getActions() {
        return window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        };
    }
    function getSupportsPassive() {
        var supportsPassive = false;
        try {
            var opts = Object.defineProperty({}, "passive", {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener("test", null, opts);
        } catch (e) {}
        return supportsPassive;
    }
    function getSupportsTouchActionNone() {
        return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    function subRangeRatio(pa, pb) {
        return 100 / (pb - pa);
    }
    function fromPercentage(range, value, startRange) {
        return value * 100 / (range[startRange + 1] - range[startRange]);
    }
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
    }
    function isPercentage(range, value) {
        return value * (range[1] - range[0]) / 100 + range[0];
    }
    function getJ(value, arr) {
        var j = 1;
        while (value >= arr[j]) j += 1;
        return j;
    }
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) return 100;
        var j = getJ(value, xVal);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return pa + toPercentage([ va, vb ], value) / subRangeRatio(pa, pb);
    }
    function fromStepping(xVal, xPct, value) {
        if (value >= 100) return xVal.slice(-1)[0];
        var j = getJ(value, xPct);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return isPercentage([ va, vb ], (value - pa) * subRangeRatio(pa, pb));
    }
    function getStep(xPct, xSteps, snap, value) {
        if (value === 100) return value;
        var j = getJ(value, xPct);
        var a = xPct[j - 1];
        var b = xPct[j];
        if (snap) {
            if (value - a > (b - a) / 2) return b;
            return a;
        }
        if (!xSteps[j - 1]) return value;
        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
    }
    var Spectrum = function() {
        function Spectrum(entry, snap, singleStep) {
            this.xPct = [];
            this.xVal = [];
            this.xSteps = [];
            this.xNumSteps = [];
            this.xHighestCompleteStep = [];
            this.xSteps = [ singleStep || false ];
            this.xNumSteps = [ false ];
            this.snap = snap;
            var index;
            var ordered = [];
            Object.keys(entry).forEach((function(index) {
                ordered.push([ asArray(entry[index]), index ]);
            }));
            ordered.sort((function(a, b) {
                return a[0][0] - b[0][0];
            }));
            for (index = 0; index < ordered.length; index++) this.handleEntryPoint(ordered[index][1], ordered[index][0]);
            this.xNumSteps = this.xSteps.slice(0);
            for (index = 0; index < this.xNumSteps.length; index++) this.handleStepPoint(index, this.xNumSteps[index]);
        }
        Spectrum.prototype.getDistance = function(value) {
            var distances = [];
            for (var index = 0; index < this.xNumSteps.length - 1; index++) distances[index] = fromPercentage(this.xVal, value, index);
            return distances;
        };
        Spectrum.prototype.getAbsoluteDistance = function(value, distances, direction) {
            var xPct_index = 0;
            if (value < this.xPct[this.xPct.length - 1]) while (value > this.xPct[xPct_index + 1]) xPct_index++; else if (value === this.xPct[this.xPct.length - 1]) xPct_index = this.xPct.length - 2;
            if (!direction && value === this.xPct[xPct_index + 1]) xPct_index++;
            if (distances === null) distances = [];
            var start_factor;
            var rest_factor = 1;
            var rest_rel_distance = distances[xPct_index];
            var range_pct = 0;
            var rel_range_distance = 0;
            var abs_distance_counter = 0;
            var range_counter = 0;
            if (direction) start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]); else start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            while (rest_rel_distance > 0) {
                range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
                    rel_range_distance = range_pct * start_factor;
                    rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                    start_factor = 1;
                } else {
                    rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                    rest_factor = 0;
                }
                if (direction) {
                    abs_distance_counter -= rel_range_distance;
                    if (this.xPct.length + range_counter >= 1) range_counter--;
                } else {
                    abs_distance_counter += rel_range_distance;
                    if (this.xPct.length - range_counter >= 1) range_counter++;
                }
                rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
            }
            return value + abs_distance_counter;
        };
        Spectrum.prototype.toStepping = function(value) {
            value = toStepping(this.xVal, this.xPct, value);
            return value;
        };
        Spectrum.prototype.fromStepping = function(value) {
            return fromStepping(this.xVal, this.xPct, value);
        };
        Spectrum.prototype.getStep = function(value) {
            value = getStep(this.xPct, this.xSteps, this.snap, value);
            return value;
        };
        Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
            var j = getJ(value, this.xPct);
            if (value === 100 || isDown && value === this.xPct[j - 1]) j = Math.max(j - 1, 1);
            return (this.xVal[j] - this.xVal[j - 1]) / size;
        };
        Spectrum.prototype.getNearbySteps = function(value) {
            var j = getJ(value, this.xPct);
            return {
                stepBefore: {
                    startValue: this.xVal[j - 2],
                    step: this.xNumSteps[j - 2],
                    highestStep: this.xHighestCompleteStep[j - 2]
                },
                thisStep: {
                    startValue: this.xVal[j - 1],
                    step: this.xNumSteps[j - 1],
                    highestStep: this.xHighestCompleteStep[j - 1]
                },
                stepAfter: {
                    startValue: this.xVal[j],
                    step: this.xNumSteps[j],
                    highestStep: this.xHighestCompleteStep[j]
                }
            };
        };
        Spectrum.prototype.countStepDecimals = function() {
            var stepDecimals = this.xNumSteps.map(countDecimals);
            return Math.max.apply(null, stepDecimals);
        };
        Spectrum.prototype.hasNoSize = function() {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
        };
        Spectrum.prototype.convert = function(value) {
            return this.getStep(this.toStepping(value));
        };
        Spectrum.prototype.handleEntryPoint = function(index, value) {
            var percentage;
            if (index === "min") percentage = 0; else if (index === "max") percentage = 100; else percentage = parseFloat(index);
            if (!isNumeric(percentage) || !isNumeric(value[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
            this.xPct.push(percentage);
            this.xVal.push(value[0]);
            var value1 = Number(value[1]);
            if (!percentage) {
                if (!isNaN(value1)) this.xSteps[0] = value1;
            } else this.xSteps.push(isNaN(value1) ? false : value1);
            this.xHighestCompleteStep.push(0);
        };
        Spectrum.prototype.handleStepPoint = function(i, n) {
            if (!n) return;
            if (this.xVal[i] === this.xVal[i + 1]) {
                this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                return;
            }
            this.xSteps[i] = fromPercentage([ this.xVal[i], this.xVal[i + 1] ], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
            var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
            var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
            var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
            this.xHighestCompleteStep[i] = step;
        };
        return Spectrum;
    }();
    var defaultFormatter = {
        to: function(value) {
            return value === void 0 ? "" : value.toFixed(2);
        },
        from: Number
    };
    var cssClasses = {
        target: "target",
        base: "base",
        origin: "origin",
        handle: "handle",
        handleLower: "handle-lower",
        handleUpper: "handle-upper",
        touchArea: "touch-area",
        horizontal: "horizontal",
        vertical: "vertical",
        background: "background",
        connect: "connect",
        connects: "connects",
        ltr: "ltr",
        rtl: "rtl",
        textDirectionLtr: "txt-dir-ltr",
        textDirectionRtl: "txt-dir-rtl",
        draggable: "draggable",
        drag: "state-drag",
        tap: "state-tap",
        active: "active",
        tooltip: "tooltip",
        pips: "pips",
        pipsHorizontal: "pips-horizontal",
        pipsVertical: "pips-vertical",
        marker: "marker",
        markerHorizontal: "marker-horizontal",
        markerVertical: "marker-vertical",
        markerNormal: "marker-normal",
        markerLarge: "marker-large",
        markerSub: "marker-sub",
        value: "value",
        valueHorizontal: "value-horizontal",
        valueVertical: "value-vertical",
        valueNormal: "value-normal",
        valueLarge: "value-large",
        valueSub: "value-sub"
    };
    var INTERNAL_EVENT_NS = {
        tooltips: ".__tooltips",
        aria: ".__aria"
    };
    function testStep(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'step' is not numeric.");
        parsed.singleStep = entry;
    }
    function testKeyboardPageMultiplier(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
        parsed.keyboardPageMultiplier = entry;
    }
    function testKeyboardMultiplier(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
        parsed.keyboardMultiplier = entry;
    }
    function testKeyboardDefaultStep(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
        parsed.keyboardDefaultStep = entry;
    }
    function testRange(parsed, entry) {
        if (typeof entry !== "object" || Array.isArray(entry)) throw new Error("noUiSlider: 'range' is not an object.");
        if (entry.min === void 0 || entry.max === void 0) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
    }
    function testStart(parsed, entry) {
        entry = asArray(entry);
        if (!Array.isArray(entry) || !entry.length) throw new Error("noUiSlider: 'start' option is incorrect.");
        parsed.handles = entry.length;
        parsed.start = entry;
    }
    function testSnap(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'snap' option must be a boolean.");
        parsed.snap = entry;
    }
    function testAnimate(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'animate' option must be a boolean.");
        parsed.animate = entry;
    }
    function testAnimationDuration(parsed, entry) {
        if (typeof entry !== "number") throw new Error("noUiSlider: 'animationDuration' option must be a number.");
        parsed.animationDuration = entry;
    }
    function testConnect(parsed, entry) {
        var connect = [ false ];
        var i;
        if (entry === "lower") entry = [ true, false ]; else if (entry === "upper") entry = [ false, true ];
        if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) connect.push(entry);
            connect.push(false);
        } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); else connect = entry;
        parsed.connect = connect;
    }
    function testOrientation(parsed, entry) {
        switch (entry) {
          case "horizontal":
            parsed.ort = 0;
            break;

          case "vertical":
            parsed.ort = 1;
            break;

          default:
            throw new Error("noUiSlider: 'orientation' option is invalid.");
        }
    }
    function testMargin(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'margin' option must be numeric.");
        if (entry === 0) return;
        parsed.margin = parsed.spectrum.getDistance(entry);
    }
    function testLimit(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'limit' option must be numeric.");
        parsed.limit = parsed.spectrum.getDistance(entry);
        if (!parsed.limit || parsed.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
    function testPadding(parsed, entry) {
        var index;
        if (!isNumeric(entry) && !Array.isArray(entry)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        if (entry === 0) return;
        if (!Array.isArray(entry)) entry = [ entry, entry ];
        parsed.padding = [ parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1]) ];
        for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        var totalPadding = entry[0] + entry[1];
        var firstValue = parsed.spectrum.xVal[0];
        var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
        if (totalPadding / (lastValue - firstValue) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
    }
    function testDirection(parsed, entry) {
        switch (entry) {
          case "ltr":
            parsed.dir = 0;
            break;

          case "rtl":
            parsed.dir = 1;
            break;

          default:
            throw new Error("noUiSlider: 'direction' option was not recognized.");
        }
    }
    function testBehaviour(parsed, entry) {
        if (typeof entry !== "string") throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
        var tap = entry.indexOf("tap") >= 0;
        var drag = entry.indexOf("drag") >= 0;
        var fixed = entry.indexOf("fixed") >= 0;
        var snap = entry.indexOf("snap") >= 0;
        var hover = entry.indexOf("hover") >= 0;
        var unconstrained = entry.indexOf("unconstrained") >= 0;
        var invertConnects = entry.indexOf("invert-connects") >= 0;
        var dragAll = entry.indexOf("drag-all") >= 0;
        var smoothSteps = entry.indexOf("smooth-steps") >= 0;
        if (fixed) {
            if (parsed.handles !== 2) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
        }
        if (invertConnects && parsed.handles !== 2) throw new Error("noUiSlider: 'invert-connects' behaviour must be used with 2 handles");
        if (unconstrained && (parsed.margin || parsed.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
        parsed.events = {
            tap: tap || snap,
            drag,
            dragAll,
            smoothSteps,
            fixed,
            snap,
            hover,
            unconstrained,
            invertConnects
        };
    }
    function testTooltips(parsed, entry) {
        if (entry === false) return;
        if (entry === true || isValidPartialFormatter(entry)) {
            parsed.tooltips = [];
            for (var i = 0; i < parsed.handles; i++) parsed.tooltips.push(entry);
        } else {
            entry = asArray(entry);
            if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
            entry.forEach((function(formatter) {
                if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
            }));
            parsed.tooltips = entry;
        }
    }
    function testHandleAttributes(parsed, entry) {
        if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
        parsed.handleAttributes = entry;
    }
    function testAriaFormat(parsed, entry) {
        if (!isValidPartialFormatter(entry)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
        parsed.ariaFormat = entry;
    }
    function testFormat(parsed, entry) {
        if (!isValidFormatter(entry)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
        parsed.format = entry;
    }
    function testKeyboardSupport(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
        parsed.keyboardSupport = entry;
    }
    function testDocumentElement(parsed, entry) {
        parsed.documentElement = entry;
    }
    function testCssPrefix(parsed, entry) {
        if (typeof entry !== "string" && entry !== false) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
        parsed.cssPrefix = entry;
    }
    function testCssClasses(parsed, entry) {
        if (typeof entry !== "object") throw new Error("noUiSlider: 'cssClasses' must be an object.");
        if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};
            Object.keys(entry).forEach((function(key) {
                parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            }));
        } else parsed.cssClasses = entry;
    }
    function testOptions(options) {
        var parsed = {
            margin: null,
            limit: null,
            padding: null,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter
        };
        var tests = {
            step: {
                r: false,
                t: testStep
            },
            keyboardPageMultiplier: {
                r: false,
                t: testKeyboardPageMultiplier
            },
            keyboardMultiplier: {
                r: false,
                t: testKeyboardMultiplier
            },
            keyboardDefaultStep: {
                r: false,
                t: testKeyboardDefaultStep
            },
            start: {
                r: true,
                t: testStart
            },
            connect: {
                r: true,
                t: testConnect
            },
            direction: {
                r: true,
                t: testDirection
            },
            snap: {
                r: false,
                t: testSnap
            },
            animate: {
                r: false,
                t: testAnimate
            },
            animationDuration: {
                r: false,
                t: testAnimationDuration
            },
            range: {
                r: true,
                t: testRange
            },
            orientation: {
                r: false,
                t: testOrientation
            },
            margin: {
                r: false,
                t: testMargin
            },
            limit: {
                r: false,
                t: testLimit
            },
            padding: {
                r: false,
                t: testPadding
            },
            behaviour: {
                r: true,
                t: testBehaviour
            },
            ariaFormat: {
                r: false,
                t: testAriaFormat
            },
            format: {
                r: false,
                t: testFormat
            },
            tooltips: {
                r: false,
                t: testTooltips
            },
            keyboardSupport: {
                r: true,
                t: testKeyboardSupport
            },
            documentElement: {
                r: false,
                t: testDocumentElement
            },
            cssPrefix: {
                r: true,
                t: testCssPrefix
            },
            cssClasses: {
                r: true,
                t: testCssClasses
            },
            handleAttributes: {
                r: false,
                t: testHandleAttributes
            }
        };
        var defaults = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses,
            keyboardPageMultiplier: 5,
            keyboardMultiplier: 1,
            keyboardDefaultStep: 10
        };
        if (options.format && !options.ariaFormat) options.ariaFormat = options.format;
        Object.keys(tests).forEach((function(name) {
            if (!isSet(options[name]) && defaults[name] === void 0) {
                if (tests[name].r) throw new Error("noUiSlider: '" + name + "' is required.");
                return;
            }
            tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
        }));
        parsed.pips = options.pips;
        var d = document.createElement("div");
        var msPrefix = d.style.msTransform !== void 0;
        var noPrefix = d.style.transform !== void 0;
        parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
        var styles = [ [ "left", "top" ], [ "right", "bottom" ] ];
        parsed.style = styles[parsed.dir][parsed.ort];
        return parsed;
    }
    function scope(target, options, originalOptions) {
        var actions = getActions();
        var supportsTouchActionNone = getSupportsTouchActionNone();
        var supportsPassive = supportsTouchActionNone && getSupportsPassive();
        var scope_Target = target;
        var scope_Base;
        var scope_ConnectBase;
        var scope_Handles;
        var scope_Connects;
        var scope_Pips;
        var scope_Tooltips;
        var scope_Spectrum = options.spectrum;
        var scope_Values = [];
        var scope_Locations = [];
        var scope_HandleNumbers = [];
        var scope_ActiveHandlesCount = 0;
        var scope_Events = {};
        var scope_ConnectsInverted = false;
        var scope_Document = target.ownerDocument;
        var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
        var scope_Body = scope_Document.body;
        var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
        function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");
            if (className) addClass(div, className);
            addTarget.appendChild(div);
            return div;
        }
        function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);
            addNodeTo(handle, options.cssClasses.touchArea);
            handle.setAttribute("data-handle", String(handleNumber));
            if (options.keyboardSupport) {
                handle.setAttribute("tabindex", "0");
                handle.addEventListener("keydown", (function(event) {
                    return eventKeydown(event, handleNumber);
                }));
            }
            if (options.handleAttributes !== void 0) {
                var attributes_1 = options.handleAttributes[handleNumber];
                Object.keys(attributes_1).forEach((function(attribute) {
                    handle.setAttribute(attribute, attributes_1[attribute]);
                }));
            }
            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
            if (handleNumber === 0) addClass(handle, options.cssClasses.handleLower); else if (handleNumber === options.handles - 1) addClass(handle, options.cssClasses.handleUpper);
            origin.handle = handle;
            return origin;
        }
        function addConnect(base, add) {
            if (!add) return false;
            return addNodeTo(base, options.cssClasses.connect);
        }
        function addElements(connectOptions, base) {
            scope_ConnectBase = addNodeTo(base, options.cssClasses.connects);
            scope_Handles = [];
            scope_Connects = [];
            scope_Connects.push(addConnect(scope_ConnectBase, connectOptions[0]));
            for (var i = 0; i < options.handles; i++) {
                scope_Handles.push(addOrigin(base, i));
                scope_HandleNumbers[i] = i;
                scope_Connects.push(addConnect(scope_ConnectBase, connectOptions[i + 1]));
            }
        }
        function addSlider(addTarget) {
            addClass(addTarget, options.cssClasses.target);
            if (options.dir === 0) addClass(addTarget, options.cssClasses.ltr); else addClass(addTarget, options.cssClasses.rtl);
            if (options.ort === 0) addClass(addTarget, options.cssClasses.horizontal); else addClass(addTarget, options.cssClasses.vertical);
            var textDirection = getComputedStyle(addTarget).direction;
            if (textDirection === "rtl") addClass(addTarget, options.cssClasses.textDirectionRtl); else addClass(addTarget, options.cssClasses.textDirectionLtr);
            return addNodeTo(addTarget, options.cssClasses.base);
        }
        function addTooltip(handle, handleNumber) {
            if (!options.tooltips || !options.tooltips[handleNumber]) return false;
            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
        }
        function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
        }
        function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
        }
        function disable(handleNumber) {
            if (handleNumber !== null && handleNumber !== void 0) {
                scope_Handles[handleNumber].setAttribute("disabled", "");
                scope_Handles[handleNumber].handle.removeAttribute("tabindex");
            } else {
                scope_Target.setAttribute("disabled", "");
                scope_Handles.forEach((function(handle) {
                    handle.handle.removeAttribute("tabindex");
                }));
            }
        }
        function enable(handleNumber) {
            if (handleNumber !== null && handleNumber !== void 0) {
                scope_Handles[handleNumber].removeAttribute("disabled");
                scope_Handles[handleNumber].handle.setAttribute("tabindex", "0");
            } else {
                scope_Target.removeAttribute("disabled");
                scope_Handles.forEach((function(handle) {
                    handle.removeAttribute("disabled");
                    handle.handle.setAttribute("tabindex", "0");
                }));
            }
        }
        function removeTooltips() {
            if (scope_Tooltips) {
                removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                scope_Tooltips.forEach((function(tooltip) {
                    if (tooltip) removeElement(tooltip);
                }));
                scope_Tooltips = null;
            }
        }
        function tooltips() {
            removeTooltips();
            scope_Tooltips = scope_Handles.map(addTooltip);
            bindEvent("update" + INTERNAL_EVENT_NS.tooltips, (function(values, handleNumber, unencoded) {
                if (!scope_Tooltips || !options.tooltips) return;
                if (scope_Tooltips[handleNumber] === false) return;
                var formattedValue = values[handleNumber];
                if (options.tooltips[handleNumber] !== true) formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                scope_Tooltips[handleNumber].innerHTML = formattedValue;
            }));
        }
        function aria() {
            removeEvent("update" + INTERNAL_EVENT_NS.aria);
            bindEvent("update" + INTERNAL_EVENT_NS.aria, (function(values, handleNumber, unencoded, tap, positions) {
                scope_HandleNumbers.forEach((function(index) {
                    var handle = scope_Handles[index];
                    var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                    var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                    var now = positions[index];
                    var text = String(options.ariaFormat.to(unencoded[index]));
                    min = scope_Spectrum.fromStepping(min).toFixed(1);
                    max = scope_Spectrum.fromStepping(max).toFixed(1);
                    now = scope_Spectrum.fromStepping(now).toFixed(1);
                    handle.children[0].setAttribute("aria-valuemin", min);
                    handle.children[0].setAttribute("aria-valuemax", max);
                    handle.children[0].setAttribute("aria-valuenow", now);
                    handle.children[0].setAttribute("aria-valuetext", text);
                }));
            }));
        }
        function getGroup(pips) {
            if (pips.mode === PipsMode.Range || pips.mode === PipsMode.Steps) return scope_Spectrum.xVal;
            if (pips.mode === PipsMode.Count) {
                if (pips.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                var interval = pips.values - 1;
                var spread = 100 / interval;
                var values = [];
                while (interval--) values[interval] = interval * spread;
                values.push(100);
                return mapToRange(values, pips.stepped);
            }
            if (pips.mode === PipsMode.Positions) return mapToRange(pips.values, pips.stepped);
            if (pips.mode === PipsMode.Values) {
                if (pips.stepped) return pips.values.map((function(value) {
                    return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                }));
                return pips.values;
            }
            return [];
        }
        function mapToRange(values, stepped) {
            return values.map((function(value) {
                return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            }));
        }
        function generateSpread(pips) {
            function safeIncrement(value, increment) {
                return Number((value + increment).toFixed(7));
            }
            var group = getGroup(pips);
            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;
            group = unique(group.slice().sort((function(a, b) {
                return a - b;
            })));
            if (group[0] !== firstInRange) {
                group.unshift(firstInRange);
                ignoreFirst = true;
            }
            if (group[group.length - 1] !== lastInRange) {
                group.push(lastInRange);
                ignoreLast = true;
            }
            group.forEach((function(current, index) {
                var step;
                var i;
                var q;
                var low = current;
                var high = group[index + 1];
                var newPct;
                var pctDifference;
                var pctPos;
                var type;
                var steps;
                var realSteps;
                var stepSize;
                var isSteps = pips.mode === PipsMode.Steps;
                if (isSteps) step = scope_Spectrum.xNumSteps[index];
                if (!step) step = high - low;
                if (high === void 0) high = low;
                step = Math.max(step, 1e-7);
                for (i = low; i <= high; i = safeIncrement(i, step)) {
                    newPct = scope_Spectrum.toStepping(i);
                    pctDifference = newPct - prevPct;
                    steps = pctDifference / (pips.density || 1);
                    realSteps = Math.round(steps);
                    stepSize = pctDifference / realSteps;
                    for (q = 1; q <= realSteps; q += 1) {
                        pctPos = prevPct + q * stepSize;
                        indexes[pctPos.toFixed(5)] = [ scope_Spectrum.fromStepping(pctPos), 0 ];
                    }
                    type = group.indexOf(i) > -1 ? PipsType.LargeValue : isSteps ? PipsType.SmallValue : PipsType.NoValue;
                    if (!index && ignoreFirst && i !== high) type = 0;
                    if (!(i === high && ignoreLast)) indexes[newPct.toFixed(5)] = [ i, type ];
                    prevPct = newPct;
                }
            }));
            return indexes;
        }
        function addMarking(spread, filterFunc, formatter) {
            var _a, _b;
            var element = scope_Document.createElement("div");
            var valueSizeClasses = (_a = {}, _a[PipsType.None] = "", _a[PipsType.NoValue] = options.cssClasses.valueNormal, 
            _a[PipsType.LargeValue] = options.cssClasses.valueLarge, _a[PipsType.SmallValue] = options.cssClasses.valueSub, 
            _a);
            var markerSizeClasses = (_b = {}, _b[PipsType.None] = "", _b[PipsType.NoValue] = options.cssClasses.markerNormal, 
            _b[PipsType.LargeValue] = options.cssClasses.markerLarge, _b[PipsType.SmallValue] = options.cssClasses.markerSub, 
            _b);
            var valueOrientationClasses = [ options.cssClasses.valueHorizontal, options.cssClasses.valueVertical ];
            var markerOrientationClasses = [ options.cssClasses.markerHorizontal, options.cssClasses.markerVertical ];
            addClass(element, options.cssClasses.pips);
            addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
            function getClasses(type, source) {
                var a = source === options.cssClasses.value;
                var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }
            function addSpread(offset, value, type) {
                type = filterFunc ? filterFunc(value, type) : type;
                if (type === PipsType.None) return;
                var node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.marker);
                node.style[options.style] = offset + "%";
                if (type > PipsType.NoValue) {
                    node = addNodeTo(element, false);
                    node.className = getClasses(type, options.cssClasses.value);
                    node.setAttribute("data-value", String(value));
                    node.style[options.style] = offset + "%";
                    node.innerHTML = String(formatter.to(value));
                }
            }
            Object.keys(spread).forEach((function(offset) {
                addSpread(offset, spread[offset][0], spread[offset][1]);
            }));
            return element;
        }
        function removePips() {
            if (scope_Pips) {
                removeElement(scope_Pips);
                scope_Pips = null;
            }
        }
        function pips(pips) {
            removePips();
            var spread = generateSpread(pips);
            var filter = pips.filter;
            var format = pips.format || {
                to: function(value) {
                    return String(Math.round(value));
                }
            };
            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
            return scope_Pips;
        }
        function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = "offset" + [ "Width", "Height" ][options.ort];
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
        }
        function attachEvent(events, element, callback, data) {
            var method = function(event) {
                var e = fixEvent(event, data.pageOffset, data.target || element);
                if (!e) return false;
                if (isSliderDisabled() && !data.doNotReject) return false;
                if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) return false;
                if (events === actions.start && e.buttons !== void 0 && e.buttons > 1) return false;
                if (data.hover && e.buttons) return false;
                if (!supportsPassive) e.preventDefault();
                e.calcPoint = e.points[options.ort];
                callback(e, data);
                return;
            };
            var methods = [];
            events.split(" ").forEach((function(eventName) {
                element.addEventListener(eventName, method, supportsPassive ? {
                    passive: true
                } : false);
                methods.push([ eventName, method ]);
            }));
            return methods;
        }
        function fixEvent(e, pageOffset, eventTarget) {
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;
            var x = 0;
            var y = 0;
            if (e.type.indexOf("MSPointer") === 0) pointer = true;
            if (e.type === "mousedown" && !e.buttons && !e.touches) return false;
            if (touch) {
                var isTouchOnTarget = function(checkTouch) {
                    var target = checkTouch.target;
                    return target === eventTarget || eventTarget.contains(target) || e.composed && e.composedPath().shift() === eventTarget;
                };
                if (e.type === "touchstart") {
                    var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                    if (targetTouches.length > 1) return false;
                    x = targetTouches[0].pageX;
                    y = targetTouches[0].pageY;
                } else {
                    var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                    if (!targetTouch) return false;
                    x = targetTouch.pageX;
                    y = targetTouch.pageY;
                }
            }
            pageOffset = pageOffset || getPageOffset(scope_Document);
            if (mouse || pointer) {
                x = e.clientX + pageOffset.x;
                y = e.clientY + pageOffset.y;
            }
            e.pageOffset = pageOffset;
            e.points = [ x, y ];
            e.cursor = mouse || pointer;
            return e;
        }
        function calcPointToPercentage(calcPoint) {
            var location = calcPoint - offset(scope_Base, options.ort);
            var proposal = location * 100 / baseSize();
            proposal = limit(proposal);
            return options.dir ? 100 - proposal : proposal;
        }
        function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;
            scope_Handles.forEach((function(handle, index) {
                if (isHandleDisabled(index)) return;
                var handlePosition = scope_Locations[index];
                var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
                var isCloser = differenceWithThisHandle < smallestDifference;
                var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                if (isCloser || isCloserAfter || clickAtEdge) {
                    handleNumber = index;
                    smallestDifference = differenceWithThisHandle;
                }
            }));
            return handleNumber;
        }
        function documentLeave(event, data) {
            if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) eventEnd(event, data);
        }
        function eventMove(event, data) {
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) return eventEnd(event, data);
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
            var proposal = movement * 100 / data.baseSize;
            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
        }
        function eventEnd(event, data) {
            if (data.handle) {
                removeClass(data.handle, options.cssClasses.active);
                scope_ActiveHandlesCount -= 1;
            }
            data.listeners.forEach((function(c) {
                scope_DocumentElement.removeEventListener(c[0], c[1]);
            }));
            if (scope_ActiveHandlesCount === 0) {
                removeClass(scope_Target, options.cssClasses.drag);
                setZindex();
                if (event.cursor) {
                    scope_Body.style.cursor = "";
                    scope_Body.removeEventListener("selectstart", preventDefault);
                }
            }
            if (options.events.smoothSteps) {
                data.handleNumbers.forEach((function(handleNumber) {
                    setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
                }));
                data.handleNumbers.forEach((function(handleNumber) {
                    fireEvent("update", handleNumber);
                }));
            }
            data.handleNumbers.forEach((function(handleNumber) {
                fireEvent("change", handleNumber);
                fireEvent("set", handleNumber);
                fireEvent("end", handleNumber);
            }));
        }
        function eventStart(event, data) {
            if (data.handleNumbers.some(isHandleDisabled)) return;
            var handle;
            if (data.handleNumbers.length === 1) {
                var handleOrigin = scope_Handles[data.handleNumbers[0]];
                handle = handleOrigin.children[0];
                scope_ActiveHandlesCount += 1;
                addClass(handle, options.cssClasses.active);
            }
            event.stopPropagation();
            var listeners = [];
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                target: event.target,
                handle,
                connect: data.connect,
                listeners,
                startCalcPoint: event.calcPoint,
                baseSize: baseSize(),
                pageOffset: event.pageOffset,
                handleNumbers: data.handleNumbers,
                buttonsProperty: event.buttons,
                locations: scope_Locations.slice()
            });
            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                target: event.target,
                handle,
                listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });
            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                target: event.target,
                handle,
                listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
            if (event.cursor) {
                scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                if (scope_Handles.length > 1) addClass(scope_Target, options.cssClasses.drag);
                scope_Body.addEventListener("selectstart", preventDefault, false);
            }
            data.handleNumbers.forEach((function(handleNumber) {
                fireEvent("start", handleNumber);
            }));
        }
        function eventTap(event) {
            event.stopPropagation();
            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);
            if (handleNumber === false) return;
            if (!options.events.snap) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            setHandle(handleNumber, proposal, true, true);
            setZindex();
            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            if (!options.events.snap) {
                fireEvent("change", handleNumber, true);
                fireEvent("set", handleNumber, true);
            } else eventStart(event, {
                handleNumbers: [ handleNumber ]
            });
        }
        function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);
            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);
            Object.keys(scope_Events).forEach((function(targetEvent) {
                if ("hover" === targetEvent.split(".")[0]) scope_Events[targetEvent].forEach((function(callback) {
                    callback.call(scope_Self, value);
                }));
            }));
        }
        function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) return false;
            var horizontalKeys = [ "Left", "Right" ];
            var verticalKeys = [ "Down", "Up" ];
            var largeStepKeys = [ "PageDown", "PageUp" ];
            var edgeKeys = [ "Home", "End" ];
            if (options.dir && !options.ort) horizontalKeys.reverse(); else if (options.ort && !options.dir) {
                verticalKeys.reverse();
                largeStepKeys.reverse();
            }
            var key = event.key.replace("Arrow", "");
            var isLargeDown = key === largeStepKeys[0];
            var isLargeUp = key === largeStepKeys[1];
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
            var isMin = key === edgeKeys[0];
            var isMax = key === edgeKeys[1];
            if (!isDown && !isUp && !isMin && !isMax) return true;
            event.preventDefault();
            var to;
            if (isUp || isDown) {
                var direction = isDown ? 0 : 1;
                var steps = getNextStepsForHandle(handleNumber);
                var step = steps[direction];
                if (step === null) return false;
                if (step === false) step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                if (isLargeUp || isLargeDown) step *= options.keyboardPageMultiplier; else step *= options.keyboardMultiplier;
                step = Math.max(step, 1e-7);
                step *= isDown ? -1 : 1;
                to = scope_Values[handleNumber] + step;
            } else if (isMax) to = options.spectrum.xVal[options.spectrum.xVal.length - 1]; else to = options.spectrum.xVal[0];
            setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);
            return false;
        }
        function bindSliderEvents(behaviour) {
            if (!behaviour.fixed) scope_Handles.forEach((function(handle, index) {
                attachEvent(actions.start, handle.children[0], eventStart, {
                    handleNumbers: [ index ]
                });
            }));
            if (behaviour.tap) attachEvent(actions.start, scope_Base, eventTap, {});
            if (behaviour.hover) attachEvent(actions.move, scope_Base, eventHover, {
                hover: true
            });
            if (behaviour.drag) scope_Connects.forEach((function(connect, index) {
                if (connect === false || index === 0 || index === scope_Connects.length - 1) return;
                var handleBefore = scope_Handles[index - 1];
                var handleAfter = scope_Handles[index];
                var eventHolders = [ connect ];
                var handlesToDrag = [ handleBefore, handleAfter ];
                var handleNumbersToDrag = [ index - 1, index ];
                addClass(connect, options.cssClasses.draggable);
                if (behaviour.fixed) {
                    eventHolders.push(handleBefore.children[0]);
                    eventHolders.push(handleAfter.children[0]);
                }
                if (behaviour.dragAll) {
                    handlesToDrag = scope_Handles;
                    handleNumbersToDrag = scope_HandleNumbers;
                }
                eventHolders.forEach((function(eventHolder) {
                    attachEvent(actions.start, eventHolder, eventStart, {
                        handles: handlesToDrag,
                        handleNumbers: handleNumbersToDrag,
                        connect
                    });
                }));
            }));
        }
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);
            if (namespacedEvent.split(".")[0] === "update") scope_Handles.forEach((function(a, index) {
                fireEvent("update", index);
            }));
        }
        function isInternalNamespace(namespace) {
            return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
        }
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
            Object.keys(scope_Events).forEach((function(bind) {
                var tEvent = bind.split(".")[0];
                var tNamespace = bind.substring(tEvent.length);
                if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) if (!isInternalNamespace(tNamespace) || namespace === tNamespace) delete scope_Events[bind];
            }));
        }
        function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach((function(targetEvent) {
                var eventType = targetEvent.split(".")[0];
                if (eventName === eventType) scope_Events[targetEvent].forEach((function(callback) {
                    callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                }));
            }));
        }
        function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
            var distance;
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                    to = Math.max(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                    to = Math.min(to, distance);
                }
            }
            if (scope_Handles.length > 1 && options.limit) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                    to = Math.min(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                    to = Math.max(to, distance);
                }
            }
            if (options.padding) {
                if (handleNumber === 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                    to = Math.max(to, distance);
                }
                if (handleNumber === scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                    to = Math.min(to, distance);
                }
            }
            if (!smoothSteps) to = scope_Spectrum.getStep(to);
            to = limit(to);
            if (to === reference[handleNumber] && !getValue) return false;
            return to;
        }
        function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
        }
        function moveHandles(upward, proposal, locations, handleNumbers, connect) {
            var proposals = locations.slice();
            var firstHandle = handleNumbers[0];
            var smoothSteps = options.events.smoothSteps;
            var b = [ !upward, upward ];
            var f = [ upward, !upward ];
            handleNumbers = handleNumbers.slice();
            if (upward) handleNumbers.reverse();
            if (handleNumbers.length > 1) handleNumbers.forEach((function(handleNumber, o) {
                var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                if (to === false) proposal = 0; else {
                    proposal = to - proposals[handleNumber];
                    proposals[handleNumber] = to;
                }
            })); else b = f = [ true ];
            var state = false;
            handleNumbers.forEach((function(handleNumber, o) {
                state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
            }));
            if (state) {
                handleNumbers.forEach((function(handleNumber) {
                    fireEvent("update", handleNumber);
                    fireEvent("slide", handleNumber);
                }));
                if (connect != void 0) fireEvent("drag", firstHandle);
            }
        }
        function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
        }
        function updateHandlePosition(handleNumber, to) {
            scope_Locations[handleNumber] = to;
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
            var translation = transformDirection(to, 0) - scope_DirOffset;
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
            scope_Handles[handleNumber].style[options.transformRule] = translateRule;
            if (options.events.invertConnects && scope_Locations.length > 1) {
                var handlesAreInOrder = scope_Locations.every((function(position, index, locations) {
                    return index === 0 || position >= locations[index - 1];
                }));
                if (scope_ConnectsInverted !== !handlesAreInOrder) {
                    invertConnects();
                    return;
                }
            }
            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
            if (scope_ConnectsInverted) {
                updateConnect(handleNumber - 1);
                updateConnect(handleNumber + 2);
            }
        }
        function setZindex() {
            scope_HandleNumbers.forEach((function(handleNumber) {
                var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                scope_Handles[handleNumber].style.zIndex = String(zIndex);
            }));
        }
        function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
            if (!exactInput) to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
            if (to === false) return false;
            updateHandlePosition(handleNumber, to);
            return true;
        }
        function updateConnect(index) {
            if (!scope_Connects[index]) return;
            var locations = scope_Locations.slice();
            if (scope_ConnectsInverted) locations.sort((function(a, b) {
                return a - b;
            }));
            var l = 0;
            var h = 100;
            if (index !== 0) l = locations[index - 1];
            if (index !== scope_Connects.length - 1) h = locations[index];
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
            scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
        }
        function resolveToValue(to, handleNumber) {
            if (to === null || to === false || to === void 0) return scope_Locations[handleNumber];
            if (typeof to === "number") to = String(to);
            to = options.format.from(to);
            if (to !== false) to = scope_Spectrum.toStepping(to);
            if (to === false || isNaN(to)) return scope_Locations[handleNumber];
            return to;
        }
        function valueSet(input, fireSetEvent, exactInput) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === void 0;
            fireSetEvent = fireSetEvent === void 0 ? true : fireSetEvent;
            if (options.animate && !isInit) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            scope_HandleNumbers.forEach((function(handleNumber) {
                setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
            }));
            var i = scope_HandleNumbers.length === 1 ? 0 : 1;
            if (isInit && scope_Spectrum.hasNoSize()) {
                exactInput = true;
                scope_Locations[0] = 0;
                if (scope_HandleNumbers.length > 1) {
                    var space_1 = 100 / (scope_HandleNumbers.length - 1);
                    scope_HandleNumbers.forEach((function(handleNumber) {
                        scope_Locations[handleNumber] = handleNumber * space_1;
                    }));
                }
            }
            for (;i < scope_HandleNumbers.length; ++i) scope_HandleNumbers.forEach((function(handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
            }));
            setZindex();
            scope_HandleNumbers.forEach((function(handleNumber) {
                fireEvent("update", handleNumber);
                if (values[handleNumber] !== null && fireSetEvent) fireEvent("set", handleNumber);
            }));
        }
        function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
        }
        function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
            handleNumber = Number(handleNumber);
            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
            fireEvent("update", handleNumber);
            if (fireSetEvent) fireEvent("set", handleNumber);
        }
        function valueGet(unencoded) {
            if (unencoded === void 0) unencoded = false;
            if (unencoded) return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
            var values = scope_Values.map(options.format.to);
            if (values.length === 1) return values[0];
            return values;
        }
        function destroy() {
            removeEvent(INTERNAL_EVENT_NS.aria);
            removeEvent(INTERNAL_EVENT_NS.tooltips);
            Object.keys(options.cssClasses).forEach((function(key) {
                removeClass(scope_Target, options.cssClasses[key]);
            }));
            while (scope_Target.firstChild) scope_Target.removeChild(scope_Target.firstChild);
            delete scope_Target.noUiSlider;
        }
        function getNextStepsForHandle(handleNumber) {
            var location = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;
            if (options.snap) return [ value - nearbySteps.stepBefore.startValue || null, nearbySteps.stepAfter.startValue - value || null ];
            if (increment !== false) if (value + increment > nearbySteps.stepAfter.startValue) increment = nearbySteps.stepAfter.startValue - value;
            if (value > nearbySteps.thisStep.startValue) decrement = nearbySteps.thisStep.step; else if (nearbySteps.stepBefore.step === false) decrement = false; else decrement = value - nearbySteps.stepBefore.highestStep;
            if (location === 100) increment = null; else if (location === 0) decrement = null;
            var stepDecimals = scope_Spectrum.countStepDecimals();
            if (increment !== null && increment !== false) increment = Number(increment.toFixed(stepDecimals));
            if (decrement !== null && decrement !== false) decrement = Number(decrement.toFixed(stepDecimals));
            return [ decrement, increment ];
        }
        function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
        }
        function updateOptions(optionsToUpdate, fireSetEvent) {
            var v = valueGet();
            var updateAble = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips", "connect" ];
            updateAble.forEach((function(name) {
                if (optionsToUpdate[name] !== void 0) originalOptions[name] = optionsToUpdate[name];
            }));
            var newOptions = testOptions(originalOptions);
            updateAble.forEach((function(name) {
                if (optionsToUpdate[name] !== void 0) options[name] = newOptions[name];
            }));
            scope_Spectrum = newOptions.spectrum;
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;
            if (options.pips) pips(options.pips); else removePips();
            if (options.tooltips) tooltips(); else removeTooltips();
            scope_Locations = [];
            valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
            if (optionsToUpdate.connect) updateConnectOption();
        }
        function updateConnectOption() {
            while (scope_ConnectBase.firstChild) scope_ConnectBase.removeChild(scope_ConnectBase.firstChild);
            for (var i = 0; i <= options.handles; i++) {
                scope_Connects[i] = addConnect(scope_ConnectBase, options.connect[i]);
                updateConnect(i);
            }
            bindSliderEvents({
                drag: options.events.drag,
                fixed: true
            });
        }
        function invertConnects() {
            scope_ConnectsInverted = !scope_ConnectsInverted;
            testConnect(options, options.connect.map((function(b) {
                return !b;
            })));
            updateConnectOption();
        }
        function setupSlider() {
            scope_Base = addSlider(scope_Target);
            addElements(options.connect, scope_Base);
            bindSliderEvents(options.events);
            valueSet(options.start);
            if (options.pips) pips(options.pips);
            if (options.tooltips) tooltips();
            aria();
        }
        setupSlider();
        var scope_Self = {
            destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            disable,
            enable,
            __moveHandles: function(upward, proposal, handleNumbers) {
                moveHandles(upward, proposal, scope_Locations, handleNumbers);
            },
            options: originalOptions,
            updateOptions,
            target: scope_Target,
            removePips,
            removeTooltips,
            getPositions: function() {
                return scope_Locations.slice();
            },
            getTooltips: function() {
                return scope_Tooltips;
            },
            getOrigins: function() {
                return scope_Handles;
            },
            pips
        };
        return scope_Self;
    }
    function initialize(target, originalOptions) {
        if (!target || !target.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + target);
        if (target.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
        var options = testOptions(originalOptions);
        var api = scope(target, options, originalOptions);
        target.noUiSlider = api;
        return api;
    }
    function rangeInit() {
        const priceSliders = document.querySelectorAll(".range-comp");
        if (priceSliders) priceSliders.forEach((priceSlider => {
            const line = priceSlider.querySelector(".range-comp__line");
            initialize(line, {
                start: [ 0, 1e5 ],
                connect: true,
                range: {
                    min: 0,
                    max: 1e6
                },
                format: {
                    from: function(value) {
                        return parseInt(value);
                    },
                    to: function(value) {
                        return parseInt(value);
                    }
                }
            });
            const priceStart = priceSlider.querySelector(".range-comp__input--min");
            const priceEnd = priceSlider.querySelector(".range-comp__input--max");
            priceStart.addEventListener("change", setPriceValues);
            priceEnd.addEventListener("change", setPriceValues);
            line.noUiSlider.on("update", (function(values, handle) {
                priceStart.value = `${values[0]}`;
                priceEnd.value = `${values[1]}`;
            }));
            function setPriceValues() {
                let priceStartValue;
                let priceEndValue;
                if (priceStart.value != "") priceStartValue = priceStart.value;
                if (priceEnd.value != "") priceEndValue = priceEnd.value;
                line.noUiSlider.set([ priceStartValue, priceEndValue ]);
            }
        }));
    }
    rangeInit();
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
            writable: false
        });
        return Constructor;
    }
    /*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */    var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
    var CREATED = 1;
    var MOUNTED = 2;
    var IDLE = 3;
    var MOVING = 4;
    var SCROLLING = 5;
    var DRAGGING = 6;
    var DESTROYED = 7;
    var STATES = {
        CREATED,
        MOUNTED,
        IDLE,
        MOVING,
        SCROLLING,
        DRAGGING,
        DESTROYED
    };
    function empty(array) {
        array.length = 0;
    }
    function slice(arrayLike, start, end) {
        return Array.prototype.slice.call(arrayLike, start, end);
    }
    function apply(func) {
        return func.bind.apply(func, [ null ].concat(slice(arguments, 1)));
    }
    var nextTick = setTimeout;
    var noop = function noop() {};
    function raf(func) {
        return requestAnimationFrame(func);
    }
    function typeOf(type, subject) {
        return typeof subject === type;
    }
    function isObject(subject) {
        return !isNull(subject) && typeOf("object", subject);
    }
    var isArray = Array.isArray;
    var isFunction = apply(typeOf, "function");
    var isString = apply(typeOf, "string");
    var isUndefined = apply(typeOf, "undefined");
    function isNull(subject) {
        return subject === null;
    }
    function isHTMLElement(subject) {
        try {
            return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
        } catch (e) {
            return false;
        }
    }
    function toArray(value) {
        return isArray(value) ? value : [ value ];
    }
    function forEach(values, iteratee) {
        toArray(values).forEach(iteratee);
    }
    function includes(array, value) {
        return array.indexOf(value) > -1;
    }
    function push(array, items) {
        array.push.apply(array, toArray(items));
        return array;
    }
    function toggleClass(elm, classes, add) {
        if (elm) forEach(classes, (function(name) {
            if (name) elm.classList[add ? "add" : "remove"](name);
        }));
    }
    function splide_esm_addClass(elm, classes) {
        toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
    }
    function append(parent, children) {
        forEach(children, parent.appendChild.bind(parent));
    }
    function before(nodes, ref) {
        forEach(nodes, (function(node) {
            var parent = (ref || node).parentNode;
            if (parent) parent.insertBefore(node, ref);
        }));
    }
    function matches(elm, selector) {
        return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
    }
    function children(parent, selector) {
        var children2 = parent ? slice(parent.children) : [];
        return selector ? children2.filter((function(child) {
            return matches(child, selector);
        })) : children2;
    }
    function child(parent, selector) {
        return selector ? children(parent, selector)[0] : parent.firstElementChild;
    }
    var ownKeys = Object.keys;
    function forOwn(object, iteratee, right) {
        if (object) (right ? ownKeys(object).reverse() : ownKeys(object)).forEach((function(key) {
            key !== "__proto__" && iteratee(object[key], key);
        }));
        return object;
    }
    function splide_esm_assign(object) {
        slice(arguments, 1).forEach((function(source) {
            forOwn(source, (function(value, key) {
                object[key] = source[key];
            }));
        }));
        return object;
    }
    function merge(object) {
        slice(arguments, 1).forEach((function(source) {
            forOwn(source, (function(value, key) {
                if (isArray(value)) object[key] = value.slice(); else if (isObject(value)) object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value); else object[key] = value;
            }));
        }));
        return object;
    }
    function omit(object, keys) {
        forEach(keys || ownKeys(object), (function(key) {
            delete object[key];
        }));
    }
    function removeAttribute(elms, attrs) {
        forEach(elms, (function(elm) {
            forEach(attrs, (function(attr) {
                elm && elm.removeAttribute(attr);
            }));
        }));
    }
    function setAttribute(elms, attrs, value) {
        if (isObject(attrs)) forOwn(attrs, (function(value2, name) {
            setAttribute(elms, name, value2);
        })); else forEach(elms, (function(elm) {
            isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
        }));
    }
    function create(tag, attrs, parent) {
        var elm = document.createElement(tag);
        if (attrs) isString(attrs) ? splide_esm_addClass(elm, attrs) : setAttribute(elm, attrs);
        parent && append(parent, elm);
        return elm;
    }
    function style(elm, prop, value) {
        if (isUndefined(value)) return getComputedStyle(elm)[prop];
        if (!isNull(value)) elm.style[prop] = "" + value;
    }
    function display(elm, display2) {
        style(elm, "display", display2);
    }
    function splide_esm_focus(elm) {
        elm["setActive"] && elm["setActive"]() || elm.focus({
            preventScroll: true
        });
    }
    function getAttribute(elm, attr) {
        return elm.getAttribute(attr);
    }
    function splide_esm_hasClass(elm, className) {
        return elm && elm.classList.contains(className);
    }
    function rect(target) {
        return target.getBoundingClientRect();
    }
    function remove(nodes) {
        forEach(nodes, (function(node) {
            if (node && node.parentNode) node.parentNode.removeChild(node);
        }));
    }
    function parseHtml(html) {
        return child((new DOMParser).parseFromString(html, "text/html").body);
    }
    function prevent(e, stopPropagation) {
        e.preventDefault();
        if (stopPropagation) {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }
    function query(parent, selector) {
        return parent && parent.querySelector(selector);
    }
    function queryAll(parent, selector) {
        return selector ? slice(parent.querySelectorAll(selector)) : [];
    }
    function splide_esm_removeClass(elm, classes) {
        toggleClass(elm, classes, false);
    }
    function timeOf(e) {
        return e.timeStamp;
    }
    function unit(value) {
        return isString(value) ? value : value ? value + "px" : "";
    }
    var PROJECT_CODE = "splide";
    var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
    function assert(condition, message) {
        if (!condition) throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
    var min = Math.min, max = Math.max, floor = Math.floor, ceil = Math.ceil, abs = Math.abs;
    function approximatelyEqual(x, y, epsilon) {
        return abs(x - y) < epsilon;
    }
    function between(number, x, y, exclusive) {
        var minimum = min(x, y);
        var maximum = max(x, y);
        return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
    }
    function clamp(number, x, y) {
        var minimum = min(x, y);
        var maximum = max(x, y);
        return min(max(minimum, number), maximum);
    }
    function sign(x) {
        return +(x > 0) - +(x < 0);
    }
    function camelToKebab(string) {
        return string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function format(string, replacements) {
        forEach(replacements, (function(replacement) {
            string = string.replace("%s", "" + replacement);
        }));
        return string;
    }
    function pad(number) {
        return number < 10 ? "0" + number : "" + number;
    }
    var ids = {};
    function uniqueId(prefix) {
        return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
    }
    function EventBinder() {
        var listeners = [];
        function bind(targets, events, callback, options) {
            forEachEvent(targets, events, (function(target, event, namespace) {
                var isEventTarget = "addEventListener" in target;
                var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
                isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
                listeners.push([ target, event, namespace, callback, remover ]);
            }));
        }
        function unbind(targets, events, callback) {
            forEachEvent(targets, events, (function(target, event, namespace) {
                listeners = listeners.filter((function(listener) {
                    if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
                        listener[4]();
                        return false;
                    }
                    return true;
                }));
            }));
        }
        function dispatch(target, type, detail) {
            var e;
            var bubbles = true;
            if (typeof CustomEvent === "function") e = new CustomEvent(type, {
                bubbles,
                detail
            }); else {
                e = document.createEvent("CustomEvent");
                e.initCustomEvent(type, bubbles, false, detail);
            }
            target.dispatchEvent(e);
            return e;
        }
        function forEachEvent(targets, events, iteratee) {
            forEach(targets, (function(target) {
                target && forEach(events, (function(events2) {
                    events2.split(" ").forEach((function(eventNS) {
                        var fragment = eventNS.split(".");
                        iteratee(target, fragment[0], fragment[1]);
                    }));
                }));
            }));
        }
        function destroy() {
            listeners.forEach((function(data) {
                data[4]();
            }));
            empty(listeners);
        }
        return {
            bind,
            unbind,
            dispatch,
            destroy
        };
    }
    var EVENT_MOUNTED = "mounted";
    var EVENT_READY = "ready";
    var EVENT_MOVE = "move";
    var EVENT_MOVED = "moved";
    var EVENT_CLICK = "click";
    var EVENT_ACTIVE = "active";
    var EVENT_INACTIVE = "inactive";
    var EVENT_VISIBLE = "visible";
    var EVENT_HIDDEN = "hidden";
    var EVENT_REFRESH = "refresh";
    var EVENT_UPDATED = "updated";
    var EVENT_RESIZE = "resize";
    var EVENT_RESIZED = "resized";
    var EVENT_DRAG = "drag";
    var EVENT_DRAGGING = "dragging";
    var EVENT_DRAGGED = "dragged";
    var EVENT_SCROLL = "scroll";
    var EVENT_SCROLLED = "scrolled";
    var EVENT_OVERFLOW = "overflow";
    var EVENT_DESTROY = "destroy";
    var EVENT_ARROWS_MOUNTED = "arrows:mounted";
    var EVENT_ARROWS_UPDATED = "arrows:updated";
    var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
    var EVENT_PAGINATION_UPDATED = "pagination:updated";
    var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
    var EVENT_AUTOPLAY_PLAY = "autoplay:play";
    var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
    var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
    var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
    var EVENT_SLIDE_KEYDOWN = "sk";
    var EVENT_SHIFTED = "sh";
    var EVENT_END_INDEX_CHANGED = "ei";
    function EventInterface(Splide2) {
        var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
        var binder = EventBinder();
        function on(events, callback) {
            binder.bind(bus, toArray(events).join(" "), (function(e) {
                callback.apply(callback, isArray(e.detail) ? e.detail : []);
            }));
        }
        function emit(event) {
            binder.dispatch(bus, event, slice(arguments, 1));
        }
        if (Splide2) Splide2.event.on(EVENT_DESTROY, binder.destroy);
        return splide_esm_assign(binder, {
            bus,
            on,
            off: apply(binder.unbind, bus),
            emit
        });
    }
    function RequestInterval(interval, onInterval, onUpdate, limit) {
        var now = Date.now;
        var startTime;
        var rate = 0;
        var id;
        var paused = true;
        var count = 0;
        function update() {
            if (!paused) {
                rate = interval ? min((now() - startTime) / interval, 1) : 1;
                onUpdate && onUpdate(rate);
                if (rate >= 1) {
                    onInterval();
                    startTime = now();
                    if (limit && ++count >= limit) return pause();
                }
                id = raf(update);
            }
        }
        function start(resume) {
            resume || cancel();
            startTime = now() - (resume ? rate * interval : 0);
            paused = false;
            id = raf(update);
        }
        function pause() {
            paused = true;
        }
        function rewind() {
            startTime = now();
            rate = 0;
            if (onUpdate) onUpdate(rate);
        }
        function cancel() {
            id && cancelAnimationFrame(id);
            rate = 0;
            id = 0;
            paused = true;
        }
        function set(time) {
            interval = time;
        }
        function isPaused() {
            return paused;
        }
        return {
            start,
            rewind,
            pause,
            cancel,
            set,
            isPaused
        };
    }
    function State(initialState) {
        var state = initialState;
        function set(value) {
            state = value;
        }
        function is(states) {
            return includes(toArray(states), state);
        }
        return {
            set,
            is
        };
    }
    function Throttle(func, duration) {
        var interval = RequestInterval(duration || 0, func, null, 1);
        return function() {
            interval.isPaused() && interval.start();
        };
    }
    function Media(Splide2, Components2, options) {
        var state = Splide2.state;
        var breakpoints = options.breakpoints || {};
        var reducedMotion = options.reducedMotion || {};
        var binder = EventBinder();
        var queries = [];
        function setup() {
            var isMin = options.mediaQuery === "min";
            ownKeys(breakpoints).sort((function(n, m) {
                return isMin ? +n - +m : +m - +n;
            })).forEach((function(key) {
                register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
            }));
            register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
            update();
        }
        function destroy(completely) {
            if (completely) binder.destroy();
        }
        function register(options2, query) {
            var queryList = matchMedia(query);
            binder.bind(queryList, "change", update);
            queries.push([ options2, queryList ]);
        }
        function update() {
            var destroyed = state.is(DESTROYED);
            var direction = options.direction;
            var merged = queries.reduce((function(merged2, entry) {
                return merge(merged2, entry[1].matches ? entry[0] : {});
            }), {});
            omit(options);
            set(merged);
            if (options.destroy) Splide2.destroy(options.destroy === "completely"); else if (destroyed) {
                destroy(true);
                Splide2.mount();
            } else direction !== options.direction && Splide2.refresh();
        }
        function reduce(enable) {
            if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
        }
        function set(opts, base, notify) {
            merge(options, opts);
            base && merge(Object.getPrototypeOf(options), opts);
            if (notify || !state.is(CREATED)) Splide2.emit(EVENT_UPDATED, options);
        }
        return {
            setup,
            destroy,
            reduce,
            set
        };
    }
    var ARROW = "Arrow";
    var ARROW_LEFT = ARROW + "Left";
    var ARROW_RIGHT = ARROW + "Right";
    var ARROW_UP = ARROW + "Up";
    var ARROW_DOWN = ARROW + "Down";
    var RTL = "rtl";
    var TTB = "ttb";
    var ORIENTATION_MAP = {
        width: [ "height" ],
        left: [ "top", "right" ],
        right: [ "bottom", "left" ],
        x: [ "y" ],
        X: [ "Y" ],
        Y: [ "X" ],
        ArrowLeft: [ ARROW_UP, ARROW_RIGHT ],
        ArrowRight: [ ARROW_DOWN, ARROW_LEFT ]
    };
    function Direction(Splide2, Components2, options) {
        function resolve(prop, axisOnly, direction) {
            direction = direction || options.direction;
            var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
            return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, (function(match, offset) {
                var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
                return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
            }));
        }
        function orient(value) {
            return value * (options.direction === RTL ? 1 : -1);
        }
        return {
            resolve,
            orient
        };
    }
    var ROLE = "role";
    var TAB_INDEX = "tabindex";
    var DISABLED = "disabled";
    var ARIA_PREFIX = "aria-";
    var ARIA_CONTROLS = ARIA_PREFIX + "controls";
    var ARIA_CURRENT = ARIA_PREFIX + "current";
    var ARIA_SELECTED = ARIA_PREFIX + "selected";
    var ARIA_LABEL = ARIA_PREFIX + "label";
    var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
    var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
    var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
    var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
    var ARIA_LIVE = ARIA_PREFIX + "live";
    var ARIA_BUSY = ARIA_PREFIX + "busy";
    var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
    var ALL_ATTRIBUTES = [ ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION ];
    var CLASS_PREFIX = PROJECT_CODE + "__";
    var STATUS_CLASS_PREFIX = "is-";
    var CLASS_ROOT = PROJECT_CODE;
    var CLASS_TRACK = CLASS_PREFIX + "track";
    var CLASS_LIST = CLASS_PREFIX + "list";
    var CLASS_SLIDE = CLASS_PREFIX + "slide";
    var CLASS_CLONE = CLASS_SLIDE + "--clone";
    var CLASS_CONTAINER = CLASS_SLIDE + "__container";
    var CLASS_ARROWS = CLASS_PREFIX + "arrows";
    var CLASS_ARROW = CLASS_PREFIX + "arrow";
    var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
    var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
    var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
    var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
    var CLASS_PROGRESS = CLASS_PREFIX + "progress";
    var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
    var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
    var CLASS_SPINNER = CLASS_PREFIX + "spinner";
    var CLASS_SR = CLASS_PREFIX + "sr";
    var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
    var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
    var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
    var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
    var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
    var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
    var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
    var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
    var STATUS_CLASSES = [ CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW ];
    var CLASSES = {
        slide: CLASS_SLIDE,
        clone: CLASS_CLONE,
        arrows: CLASS_ARROWS,
        arrow: CLASS_ARROW,
        prev: CLASS_ARROW_PREV,
        next: CLASS_ARROW_NEXT,
        pagination: CLASS_PAGINATION,
        page: CLASS_PAGINATION_PAGE,
        spinner: CLASS_SPINNER
    };
    function splide_esm_closest(from, selector) {
        if (isFunction(from.closest)) return from.closest(selector);
        var elm = from;
        while (elm && elm.nodeType === 1) {
            if (matches(elm, selector)) break;
            elm = elm.parentElement;
        }
        return elm;
    }
    var FRICTION = 5;
    var LOG_INTERVAL = 200;
    var POINTER_DOWN_EVENTS = "touchstart mousedown";
    var POINTER_MOVE_EVENTS = "touchmove mousemove";
    var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
    function Elements(Splide2, Components2, options) {
        var _EventInterface = EventInterface(Splide2), on = _EventInterface.on, bind = _EventInterface.bind;
        var root = Splide2.root;
        var i18n = options.i18n;
        var elements = {};
        var slides = [];
        var rootClasses = [];
        var trackClasses = [];
        var track;
        var list;
        var isUsingKey;
        function setup() {
            collect();
            init();
            update();
        }
        function mount() {
            on(EVENT_REFRESH, destroy);
            on(EVENT_REFRESH, setup);
            on(EVENT_UPDATED, update);
            bind(document, POINTER_DOWN_EVENTS + " keydown", (function(e) {
                isUsingKey = e.type === "keydown";
            }), {
                capture: true
            });
            bind(root, "focusin", (function() {
                toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
            }));
        }
        function destroy(completely) {
            var attrs = ALL_ATTRIBUTES.concat("style");
            empty(slides);
            splide_esm_removeClass(root, rootClasses);
            splide_esm_removeClass(track, trackClasses);
            removeAttribute([ track, list ], attrs);
            removeAttribute(root, completely ? attrs : [ "style", ARIA_ROLEDESCRIPTION ]);
        }
        function update() {
            splide_esm_removeClass(root, rootClasses);
            splide_esm_removeClass(track, trackClasses);
            rootClasses = getClasses(CLASS_ROOT);
            trackClasses = getClasses(CLASS_TRACK);
            splide_esm_addClass(root, rootClasses);
            splide_esm_addClass(track, trackClasses);
            setAttribute(root, ARIA_LABEL, options.label);
            setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
        }
        function collect() {
            track = find("." + CLASS_TRACK);
            list = child(track, "." + CLASS_LIST);
            assert(track && list, "A track/list element is missing.");
            push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
            forOwn({
                arrows: CLASS_ARROWS,
                pagination: CLASS_PAGINATION,
                prev: CLASS_ARROW_PREV,
                next: CLASS_ARROW_NEXT,
                bar: CLASS_PROGRESS_BAR,
                toggle: CLASS_TOGGLE
            }, (function(className, key) {
                elements[key] = find("." + className);
            }));
            splide_esm_assign(elements, {
                root,
                track,
                list,
                slides
            });
        }
        function init() {
            var id = root.id || uniqueId(PROJECT_CODE);
            var role = options.role;
            root.id = id;
            track.id = track.id || id + "-track";
            list.id = list.id || id + "-list";
            if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) setAttribute(root, ROLE, role);
            setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
            setAttribute(list, ROLE, "presentation");
        }
        function find(selector) {
            var elm = query(root, selector);
            return elm && splide_esm_closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
        }
        function getClasses(base) {
            return [ base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE ];
        }
        return splide_esm_assign(elements, {
            setup,
            mount,
            destroy
        });
    }
    var SLIDE = "slide";
    var LOOP = "loop";
    var FADE = "fade";
    function Slide$1(Splide2, index, slideIndex, slide) {
        var event = EventInterface(Splide2);
        var on = event.on, emit = event.emit, bind = event.bind;
        var Components = Splide2.Components, root = Splide2.root, options = Splide2.options;
        var isNavigation = options.isNavigation, updateOnMove = options.updateOnMove, i18n = options.i18n, pagination = options.pagination, slideFocus = options.slideFocus;
        var resolve = Components.Direction.resolve;
        var styles = getAttribute(slide, "style");
        var label = getAttribute(slide, ARIA_LABEL);
        var isClone = slideIndex > -1;
        var container = child(slide, "." + CLASS_CONTAINER);
        var destroyed;
        function mount() {
            if (!isClone) {
                slide.id = root.id + "-slide" + pad(index + 1);
                setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
                setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
                setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [ index + 1, Splide2.length ]));
            }
            listen();
        }
        function listen() {
            bind(slide, "click", apply(emit, EVENT_CLICK, self));
            bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
            on([ EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED ], update);
            on(EVENT_NAVIGATION_MOUNTED, initNavigation);
            if (updateOnMove) on(EVENT_MOVE, onMove);
        }
        function destroy() {
            destroyed = true;
            event.destroy();
            splide_esm_removeClass(slide, STATUS_CLASSES);
            removeAttribute(slide, ALL_ATTRIBUTES);
            setAttribute(slide, "style", styles);
            setAttribute(slide, ARIA_LABEL, label || "");
        }
        function initNavigation() {
            var controls = Splide2.splides.map((function(target) {
                var Slide2 = target.splide.Components.Slides.getAt(index);
                return Slide2 ? Slide2.slide.id : "";
            })).join(" ");
            setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
            setAttribute(slide, ARIA_CONTROLS, controls);
            setAttribute(slide, ROLE, slideFocus ? "button" : "");
            slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
        }
        function onMove() {
            if (!destroyed) update();
        }
        function update() {
            if (!destroyed) {
                var curr = Splide2.index;
                updateActivity();
                updateVisibility();
                toggleClass(slide, CLASS_PREV, index === curr - 1);
                toggleClass(slide, CLASS_NEXT, index === curr + 1);
            }
        }
        function updateActivity() {
            var active = isActive();
            if (active !== splide_esm_hasClass(slide, CLASS_ACTIVE)) {
                toggleClass(slide, CLASS_ACTIVE, active);
                setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
                emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
            }
        }
        function updateVisibility() {
            var visible = isVisible();
            var hidden = !visible && (!isActive() || isClone);
            if (!Splide2.state.is([ MOVING, SCROLLING ])) setAttribute(slide, ARIA_HIDDEN, hidden || "");
            setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
            if (slideFocus) setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
            if (visible !== splide_esm_hasClass(slide, CLASS_VISIBLE)) {
                toggleClass(slide, CLASS_VISIBLE, visible);
                emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
            }
            if (!visible && document.activeElement === slide) {
                var Slide2 = Components.Slides.getAt(Splide2.index);
                Slide2 && splide_esm_focus(Slide2.slide);
            }
        }
        function style$1(prop, value, useContainer) {
            style(useContainer && container || slide, prop, value);
        }
        function isActive() {
            var curr = Splide2.index;
            return curr === index || options.cloneStatus && curr === slideIndex;
        }
        function isVisible() {
            if (Splide2.is(FADE)) return isActive();
            var trackRect = rect(Components.Elements.track);
            var slideRect = rect(slide);
            var left = resolve("left", true);
            var right = resolve("right", true);
            return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
        }
        function isWithin(from, distance) {
            var diff = abs(from - index);
            if (!isClone && (options.rewind || Splide2.is(LOOP))) diff = min(diff, Splide2.length - diff);
            return diff <= distance;
        }
        var self = {
            index,
            slideIndex,
            slide,
            container,
            isClone,
            mount,
            destroy,
            update,
            style: style$1,
            isWithin
        };
        return self;
    }
    function Slides(Splide2, Components2, options) {
        var _EventInterface2 = EventInterface(Splide2), on = _EventInterface2.on, emit = _EventInterface2.emit, bind = _EventInterface2.bind;
        var _Components2$Elements = Components2.Elements, slides = _Components2$Elements.slides, list = _Components2$Elements.list;
        var Slides2 = [];
        function mount() {
            init();
            on(EVENT_REFRESH, destroy);
            on(EVENT_REFRESH, init);
        }
        function init() {
            slides.forEach((function(slide, index) {
                register(slide, index, -1);
            }));
        }
        function destroy() {
            forEach$1((function(Slide2) {
                Slide2.destroy();
            }));
            empty(Slides2);
        }
        function update() {
            forEach$1((function(Slide2) {
                Slide2.update();
            }));
        }
        function register(slide, index, slideIndex) {
            var object = Slide$1(Splide2, index, slideIndex, slide);
            object.mount();
            Slides2.push(object);
            Slides2.sort((function(Slide1, Slide2) {
                return Slide1.index - Slide2.index;
            }));
        }
        function get(excludeClones) {
            return excludeClones ? filter((function(Slide2) {
                return !Slide2.isClone;
            })) : Slides2;
        }
        function getIn(page) {
            var Controller = Components2.Controller;
            var index = Controller.toIndex(page);
            var max = Controller.hasFocus() ? 1 : options.perPage;
            return filter((function(Slide2) {
                return between(Slide2.index, index, index + max - 1);
            }));
        }
        function getAt(index) {
            return filter(index)[0];
        }
        function add(items, index) {
            forEach(items, (function(slide) {
                if (isString(slide)) slide = parseHtml(slide);
                if (isHTMLElement(slide)) {
                    var ref = slides[index];
                    ref ? before(slide, ref) : append(list, slide);
                    splide_esm_addClass(slide, options.classes.slide);
                    observeImages(slide, apply(emit, EVENT_RESIZE));
                }
            }));
            emit(EVENT_REFRESH);
        }
        function remove$1(matcher) {
            remove(filter(matcher).map((function(Slide2) {
                return Slide2.slide;
            })));
            emit(EVENT_REFRESH);
        }
        function forEach$1(iteratee, excludeClones) {
            get(excludeClones).forEach(iteratee);
        }
        function filter(matcher) {
            return Slides2.filter(isFunction(matcher) ? matcher : function(Slide2) {
                return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
            });
        }
        function style(prop, value, useContainer) {
            forEach$1((function(Slide2) {
                Slide2.style(prop, value, useContainer);
            }));
        }
        function observeImages(elm, callback) {
            var images = queryAll(elm, "img");
            var length = images.length;
            if (length) images.forEach((function(img) {
                bind(img, "load error", (function() {
                    if (! --length) callback();
                }));
            })); else callback();
        }
        function getLength(excludeClones) {
            return excludeClones ? slides.length : Slides2.length;
        }
        function isEnough() {
            return Slides2.length > options.perPage;
        }
        return {
            mount,
            destroy,
            update,
            register,
            get,
            getIn,
            getAt,
            add,
            remove: remove$1,
            forEach: forEach$1,
            filter,
            style,
            getLength,
            isEnough
        };
    }
    function Layout(Splide2, Components2, options) {
        var _EventInterface3 = EventInterface(Splide2), on = _EventInterface3.on, bind = _EventInterface3.bind, emit = _EventInterface3.emit;
        var Slides = Components2.Slides;
        var resolve = Components2.Direction.resolve;
        var _Components2$Elements2 = Components2.Elements, root = _Components2$Elements2.root, track = _Components2$Elements2.track, list = _Components2$Elements2.list;
        var getAt = Slides.getAt, styleSlides = Slides.style;
        var vertical;
        var rootRect;
        var overflow;
        function mount() {
            init();
            bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
            on([ EVENT_UPDATED, EVENT_REFRESH ], init);
            on(EVENT_RESIZE, resize);
        }
        function init() {
            vertical = options.direction === TTB;
            style(root, "maxWidth", unit(options.width));
            style(track, resolve("paddingLeft"), cssPadding(false));
            style(track, resolve("paddingRight"), cssPadding(true));
            resize(true);
        }
        function resize(force) {
            var newRect = rect(root);
            if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
                style(track, "height", cssTrackHeight());
                styleSlides(resolve("marginRight"), unit(options.gap));
                styleSlides("width", cssSlideWidth());
                styleSlides("height", cssSlideHeight(), true);
                rootRect = newRect;
                emit(EVENT_RESIZED);
                if (overflow !== (overflow = isOverflow())) {
                    toggleClass(root, CLASS_OVERFLOW, overflow);
                    emit(EVENT_OVERFLOW, overflow);
                }
            }
        }
        function cssPadding(right) {
            var padding = options.padding;
            var prop = resolve(right ? "right" : "left");
            return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
        }
        function cssTrackHeight() {
            var height = "";
            if (vertical) {
                height = cssHeight();
                assert(height, "height or heightRatio is missing.");
                height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
            }
            return height;
        }
        function cssHeight() {
            return unit(options.height || rect(list).width * options.heightRatio);
        }
        function cssSlideWidth() {
            return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
        }
        function cssSlideHeight() {
            return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
        }
        function cssSlideSize() {
            var gap = unit(options.gap);
            return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
        }
        function listSize() {
            return rect(list)[resolve("width")];
        }
        function slideSize(index, withoutGap) {
            var Slide = getAt(index || 0);
            return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
        }
        function totalSize(index, withoutGap) {
            var Slide = getAt(index);
            if (Slide) {
                var right = rect(Slide.slide)[resolve("right")];
                var left = rect(list)[resolve("left")];
                return abs(right - left) + (withoutGap ? 0 : getGap());
            }
            return 0;
        }
        function sliderSize(withoutGap) {
            return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
        }
        function getGap() {
            var Slide = getAt(0);
            return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
        }
        function getPadding(right) {
            return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
        }
        function isOverflow() {
            return Splide2.is(FADE) || sliderSize(true) > listSize();
        }
        return {
            mount,
            resize,
            listSize,
            slideSize,
            sliderSize,
            totalSize,
            getPadding,
            isOverflow
        };
    }
    var MULTIPLIER = 2;
    function Clones(Splide2, Components2, options) {
        var event = EventInterface(Splide2);
        var on = event.on;
        var Elements = Components2.Elements, Slides = Components2.Slides;
        var resolve = Components2.Direction.resolve;
        var clones = [];
        var cloneCount;
        function mount() {
            on(EVENT_REFRESH, remount);
            on([ EVENT_UPDATED, EVENT_RESIZE ], observe);
            if (cloneCount = computeCloneCount()) {
                generate(cloneCount);
                Components2.Layout.resize(true);
            }
        }
        function remount() {
            destroy();
            mount();
        }
        function destroy() {
            remove(clones);
            empty(clones);
            event.destroy();
        }
        function observe() {
            var count = computeCloneCount();
            if (cloneCount !== count) if (cloneCount < count || !count) event.emit(EVENT_REFRESH);
        }
        function generate(count) {
            var slides = Slides.get().slice();
            var length = slides.length;
            if (length) {
                while (slides.length < count) push(slides, slides);
                push(slides.slice(-count), slides.slice(0, count)).forEach((function(Slide, index) {
                    var isHead = index < count;
                    var clone = cloneDeep(Slide.slide, index);
                    isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
                    push(clones, clone);
                    Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
                }));
            }
        }
        function cloneDeep(elm, index) {
            var clone = elm.cloneNode(true);
            splide_esm_addClass(clone, options.classes.clone);
            clone.id = Splide2.root.id + "-clone" + pad(index + 1);
            return clone;
        }
        function computeCloneCount() {
            var clones2 = options.clones;
            if (!Splide2.is(LOOP)) clones2 = 0; else if (isUndefined(clones2)) {
                var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
                var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
                clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
            }
            return clones2;
        }
        return {
            mount,
            destroy
        };
    }
    function Move(Splide2, Components2, options) {
        var _EventInterface4 = EventInterface(Splide2), on = _EventInterface4.on, emit = _EventInterface4.emit;
        var set = Splide2.state.set;
        var _Components2$Layout = Components2.Layout, slideSize = _Components2$Layout.slideSize, getPadding = _Components2$Layout.getPadding, totalSize = _Components2$Layout.totalSize, listSize = _Components2$Layout.listSize, sliderSize = _Components2$Layout.sliderSize;
        var _Components2$Directio = Components2.Direction, resolve = _Components2$Directio.resolve, orient = _Components2$Directio.orient;
        var _Components2$Elements3 = Components2.Elements, list = _Components2$Elements3.list, track = _Components2$Elements3.track;
        var Transition;
        function mount() {
            Transition = Components2.Transition;
            on([ EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH ], reposition);
        }
        function reposition() {
            if (!Components2.Controller.isBusy()) {
                Components2.Scroll.cancel();
                jump(Splide2.index);
                Components2.Slides.update();
            }
        }
        function move(dest, index, prev, callback) {
            if (dest !== index && canShift(dest > prev)) {
                cancel();
                translate(shift(getPosition(), dest > prev), true);
            }
            set(MOVING);
            emit(EVENT_MOVE, index, prev, dest);
            Transition.start(index, (function() {
                set(IDLE);
                emit(EVENT_MOVED, index, prev, dest);
                callback && callback();
            }));
        }
        function jump(index) {
            translate(toPosition(index, true));
        }
        function translate(position, preventLoop) {
            if (!Splide2.is(FADE)) {
                var destination = preventLoop ? position : loop(position);
                style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
                position !== destination && emit(EVENT_SHIFTED);
            }
        }
        function loop(position) {
            if (Splide2.is(LOOP)) {
                var index = toIndex(position);
                var exceededMax = index > Components2.Controller.getEnd();
                var exceededMin = index < 0;
                if (exceededMin || exceededMax) position = shift(position, exceededMax);
            }
            return position;
        }
        function shift(position, backwards) {
            var excess = position - getLimit(backwards);
            var size = sliderSize();
            position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
            return position;
        }
        function cancel() {
            translate(getPosition(), true);
            Transition.cancel();
        }
        function toIndex(position) {
            var Slides = Components2.Slides.get();
            var index = 0;
            var minDistance = 1 / 0;
            for (var i = 0; i < Slides.length; i++) {
                var slideIndex = Slides[i].index;
                var distance = abs(toPosition(slideIndex, true) - position);
                if (distance <= minDistance) {
                    minDistance = distance;
                    index = slideIndex;
                } else break;
            }
            return index;
        }
        function toPosition(index, trimming) {
            var position = orient(totalSize(index - 1) - offset(index));
            return trimming ? trim(position) : position;
        }
        function getPosition() {
            var left = resolve("left");
            return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
        }
        function trim(position) {
            if (options.trimSpace && Splide2.is(SLIDE)) position = clamp(position, 0, orient(sliderSize(true) - listSize()));
            return position;
        }
        function offset(index) {
            var focus = options.focus;
            return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
        }
        function getLimit(max) {
            return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
        }
        function canShift(backwards) {
            var shifted = orient(shift(getPosition(), backwards));
            return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
        }
        function exceededLimit(max, position) {
            position = isUndefined(position) ? getPosition() : position;
            var exceededMin = max !== true && orient(position) < orient(getLimit(false));
            var exceededMax = max !== false && orient(position) > orient(getLimit(true));
            return exceededMin || exceededMax;
        }
        return {
            mount,
            move,
            jump,
            translate,
            shift,
            cancel,
            toIndex,
            toPosition,
            getPosition,
            getLimit,
            exceededLimit,
            reposition
        };
    }
    function Controller(Splide2, Components2, options) {
        var _EventInterface5 = EventInterface(Splide2), on = _EventInterface5.on, emit = _EventInterface5.emit;
        var Move = Components2.Move;
        var getPosition = Move.getPosition, getLimit = Move.getLimit, toPosition = Move.toPosition;
        var _Components2$Slides = Components2.Slides, isEnough = _Components2$Slides.isEnough, getLength = _Components2$Slides.getLength;
        var omitEnd = options.omitEnd;
        var isLoop = Splide2.is(LOOP);
        var isSlide = Splide2.is(SLIDE);
        var getNext = apply(getAdjacent, false);
        var getPrev = apply(getAdjacent, true);
        var currIndex = options.start || 0;
        var endIndex;
        var prevIndex = currIndex;
        var slideCount;
        var perMove;
        var perPage;
        function mount() {
            init();
            on([ EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED ], init);
            on(EVENT_RESIZED, onResized);
        }
        function init() {
            slideCount = getLength(true);
            perMove = options.perMove;
            perPage = options.perPage;
            endIndex = getEnd();
            var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
            if (index !== currIndex) {
                currIndex = index;
                Move.reposition();
            }
        }
        function onResized() {
            if (endIndex !== getEnd()) emit(EVENT_END_INDEX_CHANGED);
        }
        function go(control, allowSameIndex, callback) {
            if (!isBusy()) {
                var dest = parse(control);
                var index = loop(dest);
                if (index > -1 && (allowSameIndex || index !== currIndex)) {
                    setIndex(index);
                    Move.move(dest, index, prevIndex, callback);
                }
            }
        }
        function scroll(destination, duration, snap, callback) {
            Components2.Scroll.scroll(destination, duration, snap, (function() {
                var index = loop(Move.toIndex(getPosition()));
                setIndex(omitEnd ? min(index, endIndex) : index);
                callback && callback();
            }));
        }
        function parse(control) {
            var index = currIndex;
            if (isString(control)) {
                var _ref = control.match(/([+\-<>])(\d+)?/) || [], indicator = _ref[1], number = _ref[2];
                if (indicator === "+" || indicator === "-") index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex); else if (indicator === ">") index = number ? toIndex(+number) : getNext(true); else if (indicator === "<") index = getPrev(true);
            } else index = isLoop ? control : clamp(control, 0, endIndex);
            return index;
        }
        function getAdjacent(prev, destination) {
            var number = perMove || (hasFocus() ? 1 : perPage);
            var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
            if (dest === -1 && isSlide) if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) return prev ? 0 : endIndex;
            return destination ? dest : loop(dest);
        }
        function computeDestIndex(dest, from, snapPage) {
            if (isEnough() || hasFocus()) {
                var index = computeMovableDestIndex(dest);
                if (index !== dest) {
                    from = dest;
                    dest = index;
                    snapPage = false;
                }
                if (dest < 0 || dest > endIndex) if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) dest = toIndex(toPage(dest)); else if (isLoop) dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest; else if (options.rewind) dest = dest < 0 ? endIndex : 0; else dest = -1; else if (snapPage && dest !== from) dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
            } else dest = -1;
            return dest;
        }
        function computeMovableDestIndex(dest) {
            if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
                var position = getPosition();
                while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) dest < currIndex ? --dest : ++dest;
            }
            return dest;
        }
        function loop(index) {
            return isLoop ? (index + slideCount) % slideCount || 0 : index;
        }
        function getEnd() {
            var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
            while (omitEnd && end-- > 0) if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
                end++;
                break;
            }
            return clamp(end, 0, slideCount - 1);
        }
        function toIndex(page) {
            return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
        }
        function toPage(index) {
            return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
        }
        function toDest(destination) {
            var closest = Move.toIndex(destination);
            return isSlide ? clamp(closest, 0, endIndex) : closest;
        }
        function setIndex(index) {
            if (index !== currIndex) {
                prevIndex = currIndex;
                currIndex = index;
            }
        }
        function getIndex(prev) {
            return prev ? prevIndex : currIndex;
        }
        function hasFocus() {
            return !isUndefined(options.focus) || options.isNavigation;
        }
        function isBusy() {
            return Splide2.state.is([ MOVING, SCROLLING ]) && !!options.waitForTransition;
        }
        return {
            mount,
            go,
            scroll,
            getNext,
            getPrev,
            getAdjacent,
            getEnd,
            setIndex,
            getIndex,
            toIndex,
            toPage,
            toDest,
            hasFocus,
            isBusy
        };
    }
    var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
    var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
    var SIZE = 40;
    function Arrows(Splide2, Components2, options) {
        var event = EventInterface(Splide2);
        var on = event.on, bind = event.bind, emit = event.emit;
        var classes = options.classes, i18n = options.i18n;
        var Elements = Components2.Elements, Controller = Components2.Controller;
        var placeholder = Elements.arrows, track = Elements.track;
        var wrapper = placeholder;
        var prev = Elements.prev;
        var next = Elements.next;
        var created;
        var wrapperClasses;
        var arrows = {};
        function mount() {
            init();
            on(EVENT_UPDATED, remount);
        }
        function remount() {
            destroy();
            mount();
        }
        function init() {
            var enabled = options.arrows;
            if (enabled && !(prev && next)) createArrows();
            if (prev && next) {
                splide_esm_assign(arrows, {
                    prev,
                    next
                });
                display(wrapper, enabled ? "" : "none");
                splide_esm_addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
                if (enabled) {
                    listen();
                    update();
                    setAttribute([ prev, next ], ARIA_CONTROLS, track.id);
                    emit(EVENT_ARROWS_MOUNTED, prev, next);
                }
            }
        }
        function destroy() {
            event.destroy();
            splide_esm_removeClass(wrapper, wrapperClasses);
            if (created) {
                remove(placeholder ? [ prev, next ] : wrapper);
                prev = next = null;
            } else removeAttribute([ prev, next ], ALL_ATTRIBUTES);
        }
        function listen() {
            on([ EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED ], update);
            bind(next, "click", apply(go, ">"));
            bind(prev, "click", apply(go, "<"));
        }
        function go(control) {
            Controller.go(control, true);
        }
        function createArrows() {
            wrapper = placeholder || create("div", classes.arrows);
            prev = createArrow(true);
            next = createArrow(false);
            created = true;
            append(wrapper, [ prev, next ]);
            !placeholder && before(wrapper, track);
        }
        function createArrow(prev2) {
            var arrow = '<button class="' + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + '" type="button"><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '" focusable="false"><path d="' + (options.arrowPath || PATH) + '" />';
            return parseHtml(arrow);
        }
        function update() {
            if (prev && next) {
                var index = Splide2.index;
                var prevIndex = Controller.getPrev();
                var nextIndex = Controller.getNext();
                var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
                var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
                prev.disabled = prevIndex < 0;
                next.disabled = nextIndex < 0;
                setAttribute(prev, ARIA_LABEL, prevLabel);
                setAttribute(next, ARIA_LABEL, nextLabel);
                emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
            }
        }
        return {
            arrows,
            mount,
            destroy,
            update
        };
    }
    var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
    function Autoplay(Splide2, Components2, options) {
        var _EventInterface6 = EventInterface(Splide2), on = _EventInterface6.on, bind = _EventInterface6.bind, emit = _EventInterface6.emit;
        var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
        var isPaused = interval.isPaused;
        var Elements = Components2.Elements, _Components2$Elements4 = Components2.Elements, root = _Components2$Elements4.root, toggle = _Components2$Elements4.toggle;
        var autoplay = options.autoplay;
        var hovered;
        var focused;
        var stopped = autoplay === "pause";
        function mount() {
            if (autoplay) {
                listen();
                toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
                stopped || play();
                update();
            }
        }
        function listen() {
            if (options.pauseOnHover) bind(root, "mouseenter mouseleave", (function(e) {
                hovered = e.type === "mouseenter";
                autoToggle();
            }));
            if (options.pauseOnFocus) bind(root, "focusin focusout", (function(e) {
                focused = e.type === "focusin";
                autoToggle();
            }));
            if (toggle) bind(toggle, "click", (function() {
                stopped ? play() : pause(true);
            }));
            on([ EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH ], interval.rewind);
            on(EVENT_MOVE, onMove);
        }
        function play() {
            if (isPaused() && Components2.Slides.isEnough()) {
                interval.start(!options.resetProgress);
                focused = hovered = stopped = false;
                update();
                emit(EVENT_AUTOPLAY_PLAY);
            }
        }
        function pause(stop) {
            if (stop === void 0) stop = true;
            stopped = !!stop;
            update();
            if (!isPaused()) {
                interval.pause();
                emit(EVENT_AUTOPLAY_PAUSE);
            }
        }
        function autoToggle() {
            if (!stopped) hovered || focused ? pause(false) : play();
        }
        function update() {
            if (toggle) {
                toggleClass(toggle, CLASS_ACTIVE, !stopped);
                setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
            }
        }
        function onAnimationFrame(rate) {
            var bar = Elements.bar;
            bar && style(bar, "width", rate * 100 + "%");
            emit(EVENT_AUTOPLAY_PLAYING, rate);
        }
        function onMove(index) {
            var Slide = Components2.Slides.getAt(index);
            interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
        }
        return {
            mount,
            destroy: interval.cancel,
            play,
            pause,
            isPaused
        };
    }
    function Cover(Splide2, Components2, options) {
        var _EventInterface7 = EventInterface(Splide2), on = _EventInterface7.on;
        function mount() {
            if (options.cover) {
                on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
                on([ EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH ], apply(cover, true));
            }
        }
        function cover(cover2) {
            Components2.Slides.forEach((function(Slide) {
                var img = child(Slide.container || Slide.slide, "img");
                if (img && img.src) toggle(cover2, img, Slide);
            }));
        }
        function toggle(cover2, img, Slide) {
            Slide.style("background", cover2 ? 'center/cover no-repeat url("' + img.src + '")' : "", true);
            display(img, cover2 ? "none" : "");
        }
        return {
            mount,
            destroy: apply(cover, false)
        };
    }
    var BOUNCE_DIFF_THRESHOLD = 10;
    var BOUNCE_DURATION = 600;
    var FRICTION_FACTOR = .6;
    var BASE_VELOCITY = 1.5;
    var MIN_DURATION = 800;
    function Scroll(Splide2, Components2, options) {
        var _EventInterface8 = EventInterface(Splide2), on = _EventInterface8.on, emit = _EventInterface8.emit;
        var set = Splide2.state.set;
        var Move = Components2.Move;
        var getPosition = Move.getPosition, getLimit = Move.getLimit, exceededLimit = Move.exceededLimit, translate = Move.translate;
        var isSlide = Splide2.is(SLIDE);
        var interval;
        var callback;
        var friction = 1;
        function mount() {
            on(EVENT_MOVE, clear);
            on([ EVENT_UPDATED, EVENT_REFRESH ], cancel);
        }
        function scroll(destination, duration, snap, onScrolled, noConstrain) {
            var from = getPosition();
            clear();
            if (snap && (!isSlide || !exceededLimit())) {
                var size = Components2.Layout.sliderSize();
                var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
                destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
            }
            var noDistance = approximatelyEqual(from, destination, 1);
            friction = 1;
            duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
            callback = onScrolled;
            interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
            set(SCROLLING);
            emit(EVENT_SCROLL);
            interval.start();
        }
        function onEnd() {
            set(IDLE);
            callback && callback();
            emit(EVENT_SCROLLED);
        }
        function update(from, to, noConstrain, rate) {
            var position = getPosition();
            var target = from + (to - from) * easing(rate);
            var diff = (target - position) * friction;
            translate(position + diff);
            if (isSlide && !noConstrain && exceededLimit()) {
                friction *= FRICTION_FACTOR;
                if (abs(diff) < BOUNCE_DIFF_THRESHOLD) scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
            }
        }
        function clear() {
            if (interval) interval.cancel();
        }
        function cancel() {
            if (interval && !interval.isPaused()) {
                clear();
                onEnd();
            }
        }
        function easing(t) {
            var easingFunc = options.easingFunc;
            return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
        }
        return {
            mount,
            destroy: clear,
            scroll,
            cancel
        };
    }
    var SCROLL_LISTENER_OPTIONS = {
        passive: false,
        capture: true
    };
    function Drag(Splide2, Components2, options) {
        var _EventInterface9 = EventInterface(Splide2), on = _EventInterface9.on, emit = _EventInterface9.emit, bind = _EventInterface9.bind, unbind = _EventInterface9.unbind;
        var state = Splide2.state;
        var Move = Components2.Move, Scroll = Components2.Scroll, Controller = Components2.Controller, track = Components2.Elements.track, reduce = Components2.Media.reduce;
        var _Components2$Directio2 = Components2.Direction, resolve = _Components2$Directio2.resolve, orient = _Components2$Directio2.orient;
        var getPosition = Move.getPosition, exceededLimit = Move.exceededLimit;
        var basePosition;
        var baseEvent;
        var prevBaseEvent;
        var isFree;
        var dragging;
        var exceeded = false;
        var clickPrevented;
        var disabled;
        var target;
        function mount() {
            bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
            bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
            bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
            bind(track, "click", onClick, {
                capture: true
            });
            bind(track, "dragstart", prevent);
            on([ EVENT_MOUNTED, EVENT_UPDATED ], init);
        }
        function init() {
            var drag = options.drag;
            disable(!drag);
            isFree = drag === "free";
        }
        function onPointerDown(e) {
            clickPrevented = false;
            if (!disabled) {
                var isTouch = isTouchEvent(e);
                if (isDraggable(e.target) && (isTouch || !e.button)) if (!Controller.isBusy()) {
                    target = isTouch ? track : window;
                    dragging = state.is([ MOVING, SCROLLING ]);
                    prevBaseEvent = null;
                    bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
                    bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
                    Move.cancel();
                    Scroll.cancel();
                    save(e);
                } else prevent(e, true);
            }
        }
        function onPointerMove(e) {
            if (!state.is(DRAGGING)) {
                state.set(DRAGGING);
                emit(EVENT_DRAG);
            }
            if (e.cancelable) if (dragging) {
                Move.translate(basePosition + constrain(diffCoord(e)));
                var expired = diffTime(e) > LOG_INTERVAL;
                var hasExceeded = exceeded !== (exceeded = exceededLimit());
                if (expired || hasExceeded) save(e);
                clickPrevented = true;
                emit(EVENT_DRAGGING);
                prevent(e);
            } else if (isSliderDirection(e)) {
                dragging = shouldStart(e);
                prevent(e);
            }
        }
        function onPointerUp(e) {
            if (state.is(DRAGGING)) {
                state.set(IDLE);
                emit(EVENT_DRAGGED);
            }
            if (dragging) {
                move(e);
                prevent(e);
            }
            unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
            unbind(target, POINTER_UP_EVENTS, onPointerUp);
            dragging = false;
        }
        function onClick(e) {
            if (!disabled && clickPrevented) prevent(e, true);
        }
        function save(e) {
            prevBaseEvent = baseEvent;
            baseEvent = e;
            basePosition = getPosition();
        }
        function move(e) {
            var velocity = computeVelocity(e);
            var destination = computeDestination(velocity);
            var rewind = options.rewind && options.rewindByDrag;
            reduce(false);
            if (isFree) Controller.scroll(destination, 0, options.snap); else if (Splide2.is(FADE)) Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+"); else if (Splide2.is(SLIDE) && exceeded && rewind) Controller.go(exceededLimit(true) ? ">" : "<"); else Controller.go(Controller.toDest(destination), true);
            reduce(true);
        }
        function shouldStart(e) {
            var thresholds = options.dragMinThreshold;
            var isObj = isObject(thresholds);
            var mouse = isObj && thresholds.mouse || 0;
            var touch = (isObj ? thresholds.touch : +thresholds) || 10;
            return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
        }
        function isSliderDirection(e) {
            return abs(diffCoord(e)) > abs(diffCoord(e, true));
        }
        function computeVelocity(e) {
            if (Splide2.is(LOOP) || !exceeded) {
                var time = diffTime(e);
                if (time && time < LOG_INTERVAL) return diffCoord(e) / time;
            }
            return 0;
        }
        function computeDestination(velocity) {
            return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? 1 / 0 : Components2.Layout.listSize() * (options.flickMaxPages || 1));
        }
        function diffCoord(e, orthogonal) {
            return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
        }
        function diffTime(e) {
            return timeOf(e) - timeOf(getBaseEvent(e));
        }
        function getBaseEvent(e) {
            return baseEvent === e && prevBaseEvent || baseEvent;
        }
        function coordOf(e, orthogonal) {
            return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
        }
        function constrain(diff) {
            return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
        }
        function isDraggable(target2) {
            var noDrag = options.noDrag;
            return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
        }
        function isTouchEvent(e) {
            return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
        }
        function isDragging() {
            return dragging;
        }
        function disable(value) {
            disabled = value;
        }
        return {
            mount,
            disable,
            isDragging
        };
    }
    var NORMALIZATION_MAP = {
        Spacebar: " ",
        Right: ARROW_RIGHT,
        Left: ARROW_LEFT,
        Up: ARROW_UP,
        Down: ARROW_DOWN
    };
    function normalizeKey(key) {
        key = isString(key) ? key : key.key;
        return NORMALIZATION_MAP[key] || key;
    }
    var KEYBOARD_EVENT = "keydown";
    function Keyboard(Splide2, Components2, options) {
        var _EventInterface10 = EventInterface(Splide2), on = _EventInterface10.on, bind = _EventInterface10.bind, unbind = _EventInterface10.unbind;
        var root = Splide2.root;
        var resolve = Components2.Direction.resolve;
        var target;
        var disabled;
        function mount() {
            init();
            on(EVENT_UPDATED, destroy);
            on(EVENT_UPDATED, init);
            on(EVENT_MOVE, onMove);
        }
        function init() {
            var keyboard = options.keyboard;
            if (keyboard) {
                target = keyboard === "global" ? window : root;
                bind(target, KEYBOARD_EVENT, onKeydown);
            }
        }
        function destroy() {
            unbind(target, KEYBOARD_EVENT);
        }
        function disable(value) {
            disabled = value;
        }
        function onMove() {
            var _disabled = disabled;
            disabled = true;
            nextTick((function() {
                disabled = _disabled;
            }));
        }
        function onKeydown(e) {
            if (!disabled) {
                var key = normalizeKey(e);
                if (key === resolve(ARROW_LEFT)) Splide2.go("<"); else if (key === resolve(ARROW_RIGHT)) Splide2.go(">");
            }
        }
        return {
            mount,
            destroy,
            disable
        };
    }
    var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
    var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
    var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
    function LazyLoad(Splide2, Components2, options) {
        var _EventInterface11 = EventInterface(Splide2), on = _EventInterface11.on, off = _EventInterface11.off, bind = _EventInterface11.bind, emit = _EventInterface11.emit;
        var isSequential = options.lazyLoad === "sequential";
        var events = [ EVENT_MOVED, EVENT_SCROLLED ];
        var entries = [];
        function mount() {
            if (options.lazyLoad) {
                init();
                on(EVENT_REFRESH, init);
            }
        }
        function init() {
            empty(entries);
            register();
            if (isSequential) loadNext(); else {
                off(events);
                on(events, check);
                check();
            }
        }
        function register() {
            Components2.Slides.forEach((function(Slide) {
                queryAll(Slide.slide, IMAGE_SELECTOR).forEach((function(img) {
                    var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
                    var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
                    if (src !== img.src || srcset !== img.srcset) {
                        var className = options.classes.spinner;
                        var parent = img.parentElement;
                        var spinner = child(parent, "." + className) || create("span", className, parent);
                        entries.push([ img, Slide, spinner ]);
                        img.src || display(img, "none");
                    }
                }));
            }));
        }
        function check() {
            entries = entries.filter((function(data) {
                var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
                return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
            }));
            entries.length || off(events);
        }
        function load(data) {
            var img = data[0];
            splide_esm_addClass(data[1].slide, CLASS_LOADING);
            bind(img, "load error", apply(onLoad, data));
            setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
            setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
            removeAttribute(img, SRC_DATA_ATTRIBUTE);
            removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
        }
        function onLoad(data, e) {
            var img = data[0], Slide = data[1];
            splide_esm_removeClass(Slide.slide, CLASS_LOADING);
            if (e.type !== "error") {
                remove(data[2]);
                display(img, "");
                emit(EVENT_LAZYLOAD_LOADED, img, Slide);
                emit(EVENT_RESIZE);
            }
            isSequential && loadNext();
        }
        function loadNext() {
            entries.length && load(entries.shift());
        }
        return {
            mount,
            destroy: apply(empty, entries),
            check
        };
    }
    function Pagination(Splide2, Components2, options) {
        var event = EventInterface(Splide2);
        var on = event.on, emit = event.emit, bind = event.bind;
        var Slides = Components2.Slides, Elements = Components2.Elements, Controller = Components2.Controller;
        var hasFocus = Controller.hasFocus, getIndex = Controller.getIndex, go = Controller.go;
        var resolve = Components2.Direction.resolve;
        var placeholder = Elements.pagination;
        var items = [];
        var list;
        var paginationClasses;
        function mount() {
            destroy();
            on([ EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED ], mount);
            var enabled = options.pagination;
            placeholder && display(placeholder, enabled ? "" : "none");
            if (enabled) {
                on([ EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED ], update);
                createPagination();
                update();
                emit(EVENT_PAGINATION_MOUNTED, {
                    list,
                    items
                }, getAt(Splide2.index));
            }
        }
        function destroy() {
            if (list) {
                remove(placeholder ? slice(list.children) : list);
                splide_esm_removeClass(list, paginationClasses);
                empty(items);
                list = null;
            }
            event.destroy();
        }
        function createPagination() {
            var length = Splide2.length;
            var classes = options.classes, i18n = options.i18n, perPage = options.perPage;
            var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
            list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
            splide_esm_addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
            setAttribute(list, ROLE, "tablist");
            setAttribute(list, ARIA_LABEL, i18n.select);
            setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
            for (var i = 0; i < max; i++) {
                var li = create("li", null, list);
                var button = create("button", {
                    class: classes.page,
                    type: "button"
                }, li);
                var controls = Slides.getIn(i).map((function(Slide) {
                    return Slide.slide.id;
                }));
                var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
                bind(button, "click", apply(onClick, i));
                if (options.paginationKeyboard) bind(button, "keydown", apply(onKeydown, i));
                setAttribute(li, ROLE, "presentation");
                setAttribute(button, ROLE, "tab");
                setAttribute(button, ARIA_CONTROLS, controls.join(" "));
                setAttribute(button, ARIA_LABEL, format(text, i + 1));
                setAttribute(button, TAB_INDEX, -1);
                items.push({
                    li,
                    button,
                    page: i
                });
            }
        }
        function onClick(page) {
            go(">" + page, true);
        }
        function onKeydown(page, e) {
            var length = items.length;
            var key = normalizeKey(e);
            var dir = getDirection();
            var nextPage = -1;
            if (key === resolve(ARROW_RIGHT, false, dir)) nextPage = ++page % length; else if (key === resolve(ARROW_LEFT, false, dir)) nextPage = (--page + length) % length; else if (key === "Home") nextPage = 0; else if (key === "End") nextPage = length - 1;
            var item = items[nextPage];
            if (item) {
                splide_esm_focus(item.button);
                go(">" + nextPage);
                prevent(e, true);
            }
        }
        function getDirection() {
            return options.paginationDirection || options.direction;
        }
        function getAt(index) {
            return items[Controller.toPage(index)];
        }
        function update() {
            var prev = getAt(getIndex(true));
            var curr = getAt(getIndex());
            if (prev) {
                var button = prev.button;
                splide_esm_removeClass(button, CLASS_ACTIVE);
                removeAttribute(button, ARIA_SELECTED);
                setAttribute(button, TAB_INDEX, -1);
            }
            if (curr) {
                var _button = curr.button;
                splide_esm_addClass(_button, CLASS_ACTIVE);
                setAttribute(_button, ARIA_SELECTED, true);
                setAttribute(_button, TAB_INDEX, "");
            }
            emit(EVENT_PAGINATION_UPDATED, {
                list,
                items
            }, prev, curr);
        }
        return {
            items,
            mount,
            destroy,
            getAt,
            update
        };
    }
    var TRIGGER_KEYS = [ " ", "Enter" ];
    function Sync(Splide2, Components2, options) {
        var isNavigation = options.isNavigation, slideFocus = options.slideFocus;
        var events = [];
        function mount() {
            Splide2.splides.forEach((function(target) {
                if (!target.isParent) {
                    sync(Splide2, target.splide);
                    sync(target.splide, Splide2);
                }
            }));
            if (isNavigation) navigate();
        }
        function destroy() {
            events.forEach((function(event) {
                event.destroy();
            }));
            empty(events);
        }
        function remount() {
            destroy();
            mount();
        }
        function sync(splide, target) {
            var event = EventInterface(splide);
            event.on(EVENT_MOVE, (function(index, prev, dest) {
                target.go(target.is(LOOP) ? dest : index);
            }));
            events.push(event);
        }
        function navigate() {
            var event = EventInterface(Splide2);
            var on = event.on;
            on(EVENT_CLICK, onClick);
            on(EVENT_SLIDE_KEYDOWN, onKeydown);
            on([ EVENT_MOUNTED, EVENT_UPDATED ], update);
            events.push(event);
            event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
        }
        function update() {
            setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
        }
        function onClick(Slide) {
            Splide2.go(Slide.index);
        }
        function onKeydown(Slide, e) {
            if (includes(TRIGGER_KEYS, normalizeKey(e))) {
                onClick(Slide);
                prevent(e);
            }
        }
        return {
            setup: apply(Components2.Media.set, {
                slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
            }, true),
            mount,
            destroy,
            remount
        };
    }
    function Wheel(Splide2, Components2, options) {
        var _EventInterface12 = EventInterface(Splide2), bind = _EventInterface12.bind;
        var lastTime = 0;
        function mount() {
            if (options.wheel) bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
        }
        function onWheel(e) {
            if (e.cancelable) {
                var deltaY = e.deltaY;
                var backwards = deltaY < 0;
                var timeStamp = timeOf(e);
                var _min = options.wheelMinThreshold || 0;
                var sleep = options.wheelSleep || 0;
                if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
                    Splide2.go(backwards ? "<" : ">");
                    lastTime = timeStamp;
                }
                shouldPrevent(backwards) && prevent(e);
            }
        }
        function shouldPrevent(backwards) {
            return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
        }
        return {
            mount
        };
    }
    var SR_REMOVAL_DELAY = 90;
    function Live(Splide2, Components2, options) {
        var _EventInterface13 = EventInterface(Splide2), on = _EventInterface13.on;
        var track = Components2.Elements.track;
        var enabled = options.live && !options.isNavigation;
        var sr = create("span", CLASS_SR);
        var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
        function mount() {
            if (enabled) {
                disable(!Components2.Autoplay.isPaused());
                setAttribute(track, ARIA_ATOMIC, true);
                sr.textContent = "…";
                on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
                on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
                on([ EVENT_MOVED, EVENT_SCROLLED ], apply(toggle, true));
            }
        }
        function toggle(active) {
            setAttribute(track, ARIA_BUSY, active);
            if (active) {
                append(track, sr);
                interval.start();
            } else {
                remove(sr);
                interval.cancel();
            }
        }
        function destroy() {
            removeAttribute(track, [ ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY ]);
            remove(sr);
        }
        function disable(disabled) {
            if (enabled) setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
        }
        return {
            mount,
            disable,
            destroy
        };
    }
    var ComponentConstructors = Object.freeze({
        __proto__: null,
        Media,
        Direction,
        Elements,
        Slides,
        Layout,
        Clones,
        Move,
        Controller,
        Arrows,
        Autoplay,
        Cover,
        Scroll,
        Drag,
        Keyboard,
        LazyLoad,
        Pagination,
        Sync,
        Wheel,
        Live
    });
    var I18N = {
        prev: "Previous slide",
        next: "Next slide",
        first: "Go to first slide",
        last: "Go to last slide",
        slideX: "Go to slide %s",
        pageX: "Go to page %s",
        play: "Start autoplay",
        pause: "Pause autoplay",
        carousel: "carousel",
        slide: "slide",
        select: "Select a slide to show",
        slideLabel: "%s of %s"
    };
    var DEFAULTS = {
        type: "slide",
        role: "region",
        speed: 400,
        perPage: 1,
        cloneStatus: true,
        arrows: true,
        pagination: true,
        paginationKeyboard: true,
        interval: 5e3,
        pauseOnHover: true,
        pauseOnFocus: true,
        resetProgress: true,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        drag: true,
        direction: "ltr",
        trimSpace: true,
        focusableNodes: "a, button, textarea, input, select, iframe",
        live: true,
        classes: CLASSES,
        i18n: I18N,
        reducedMotion: {
            speed: 0,
            rewindSpeed: 0,
            autoplay: "pause"
        }
    };
    function Fade(Splide2, Components2, options) {
        var Slides = Components2.Slides;
        function mount() {
            EventInterface(Splide2).on([ EVENT_MOUNTED, EVENT_REFRESH ], init);
        }
        function init() {
            Slides.forEach((function(Slide) {
                Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
            }));
        }
        function start(index, done) {
            Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
            nextTick(done);
        }
        return {
            mount,
            start,
            cancel: noop
        };
    }
    function Slide(Splide2, Components2, options) {
        var Move = Components2.Move, Controller = Components2.Controller, Scroll = Components2.Scroll;
        var list = Components2.Elements.list;
        var transition = apply(style, list, "transition");
        var endCallback;
        function mount() {
            EventInterface(Splide2).bind(list, "transitionend", (function(e) {
                if (e.target === list && endCallback) {
                    cancel();
                    endCallback();
                }
            }));
        }
        function start(index, done) {
            var destination = Move.toPosition(index, true);
            var position = Move.getPosition();
            var speed = getSpeed(index);
            if (abs(destination - position) >= 1 && speed >= 1) if (options.useScroll) Scroll.scroll(destination, speed, false, done); else {
                transition("transform " + speed + "ms " + options.easing);
                Move.translate(destination, true);
                endCallback = done;
            } else {
                Move.jump(index);
                done();
            }
        }
        function cancel() {
            transition("");
            Scroll.cancel();
        }
        function getSpeed(index) {
            var rewindSpeed = options.rewindSpeed;
            if (Splide2.is(SLIDE) && rewindSpeed) {
                var prev = Controller.getIndex(true);
                var end = Controller.getEnd();
                if (prev === 0 && index >= end || prev >= end && index === 0) return rewindSpeed;
            }
            return options.speed;
        }
        return {
            mount,
            start,
            cancel
        };
    }
    var _Splide = function() {
        function _Splide(target, options) {
            this.event = EventInterface();
            this.Components = {};
            this.state = State(CREATED);
            this.splides = [];
            this._o = {};
            this._E = {};
            var root = isString(target) ? query(document, target) : target;
            assert(root, root + " is invalid.");
            this.root = root;
            options = merge({
                label: getAttribute(root, ARIA_LABEL) || "",
                labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
            }, DEFAULTS, _Splide.defaults, options || {});
            try {
                merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
            } catch (e) {
                assert(false, "Invalid JSON");
            }
            this._o = Object.create(merge({}, options));
        }
        var _proto = _Splide.prototype;
        _proto.mount = function mount(Extensions, Transition) {
            var _this = this;
            var state = this.state, Components2 = this.Components;
            assert(state.is([ CREATED, DESTROYED ]), "Already mounted!");
            state.set(CREATED);
            this._C = Components2;
            this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
            this._E = Extensions || this._E;
            var Constructors = splide_esm_assign({}, ComponentConstructors, this._E, {
                Transition: this._T
            });
            forOwn(Constructors, (function(Component, key) {
                var component = Component(_this, Components2, _this._o);
                Components2[key] = component;
                component.setup && component.setup();
            }));
            forOwn(Components2, (function(component) {
                component.mount && component.mount();
            }));
            this.emit(EVENT_MOUNTED);
            splide_esm_addClass(this.root, CLASS_INITIALIZED);
            state.set(IDLE);
            this.emit(EVENT_READY);
            return this;
        };
        _proto.sync = function sync(splide) {
            this.splides.push({
                splide
            });
            splide.splides.push({
                splide: this,
                isParent: true
            });
            if (this.state.is(IDLE)) {
                this._C.Sync.remount();
                splide.Components.Sync.remount();
            }
            return this;
        };
        _proto.go = function go(control) {
            this._C.Controller.go(control);
            return this;
        };
        _proto.on = function on(events, callback) {
            this.event.on(events, callback);
            return this;
        };
        _proto.off = function off(events) {
            this.event.off(events);
            return this;
        };
        _proto.emit = function emit(event) {
            var _this$event;
            (_this$event = this.event).emit.apply(_this$event, [ event ].concat(slice(arguments, 1)));
            return this;
        };
        _proto.add = function add(slides, index) {
            this._C.Slides.add(slides, index);
            return this;
        };
        _proto.remove = function remove(matcher) {
            this._C.Slides.remove(matcher);
            return this;
        };
        _proto.is = function is(type) {
            return this._o.type === type;
        };
        _proto.refresh = function refresh() {
            this.emit(EVENT_REFRESH);
            return this;
        };
        _proto.destroy = function destroy(completely) {
            if (completely === void 0) completely = true;
            var event = this.event, state = this.state;
            if (state.is(CREATED)) EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely)); else {
                forOwn(this._C, (function(component) {
                    component.destroy && component.destroy(completely);
                }), true);
                event.emit(EVENT_DESTROY);
                event.destroy();
                completely && empty(this.splides);
                state.set(DESTROYED);
            }
            return this;
        };
        _createClass(_Splide, [ {
            key: "options",
            get: function get() {
                return this._o;
            },
            set: function set(options) {
                this._C.Media.set(options, true, true);
            }
        }, {
            key: "length",
            get: function get() {
                return this._C.Slides.getLength(true);
            }
        }, {
            key: "index",
            get: function get() {
                return this._C.Controller.getIndex();
            }
        } ]);
        return _Splide;
    }();
    var splide_esm_Splide = _Splide;
    splide_esm_Splide.defaults = {};
    splide_esm_Splide.STATES = STATES;
    var CLASS_RENDERED = "is-rendered";
    var RENDERER_DEFAULT_CONFIG = {
        listTag: "ul",
        slideTag: "li"
    };
    var Style = null && function() {
        function Style(id, options) {
            this.styles = {};
            this.id = id;
            this.options = options;
        }
        var _proto2 = Style.prototype;
        _proto2.rule = function rule(selector, prop, value, breakpoint) {
            breakpoint = breakpoint || "default";
            var selectors = this.styles[breakpoint] = this.styles[breakpoint] || {};
            var styles = selectors[selector] = selectors[selector] || {};
            styles[prop] = value;
        };
        _proto2.build = function build() {
            var _this2 = this;
            var css = "";
            if (this.styles.default) css += this.buildSelectors(this.styles.default);
            Object.keys(this.styles).sort((function(n, m) {
                return _this2.options.mediaQuery === "min" ? +n - +m : +m - +n;
            })).forEach((function(breakpoint) {
                if (breakpoint !== "default") {
                    css += "@media screen and (max-width: " + breakpoint + "px) {";
                    css += _this2.buildSelectors(_this2.styles[breakpoint]);
                    css += "}";
                }
            }));
            return css;
        };
        _proto2.buildSelectors = function buildSelectors(selectors) {
            var _this3 = this;
            var css = "";
            forOwn(selectors, (function(styles, selector) {
                selector = ("#" + _this3.id + " " + selector).trim();
                css += selector + " {";
                forOwn(styles, (function(value, prop) {
                    if (value || value === 0) css += prop + ": " + value + ";";
                }));
                css += "}";
            }));
            return css;
        };
        return Style;
    }();
    null && function() {
        function SplideRenderer(contents, options, config, defaults) {
            this.slides = [];
            this.options = {};
            this.breakpoints = [];
            merge(DEFAULTS, defaults || {});
            merge(merge(this.options, DEFAULTS), options || {});
            this.contents = contents;
            this.config = splide_esm_assign({}, RENDERER_DEFAULT_CONFIG, config || {});
            this.id = this.config.id || uniqueId("splide");
            this.Style = new Style(this.id, this.options);
            this.Direction = Direction(null, null, this.options);
            assert(this.contents.length, "Provide at least 1 content.");
            this.init();
        }
        SplideRenderer.clean = function clean(splide) {
            var _EventInterface14 = EventInterface(splide), on = _EventInterface14.on;
            var root = splide.root;
            var clones = queryAll(root, "." + CLASS_CLONE);
            on(EVENT_MOUNTED, (function() {
                remove(child(root, "style"));
            }));
            remove(clones);
        };
        var _proto3 = SplideRenderer.prototype;
        _proto3.init = function init() {
            this.parseBreakpoints();
            this.initSlides();
            this.registerRootStyles();
            this.registerTrackStyles();
            this.registerSlideStyles();
            this.registerListStyles();
        };
        _proto3.initSlides = function initSlides() {
            var _this4 = this;
            push(this.slides, this.contents.map((function(content, index) {
                content = isString(content) ? {
                    html: content
                } : content;
                content.styles = content.styles || {};
                content.attrs = content.attrs || {};
                _this4.cover(content);
                var classes = _this4.options.classes.slide + " " + (index === 0 ? CLASS_ACTIVE : "");
                splide_esm_assign(content.attrs, {
                    class: (classes + " " + (content.attrs.class || "")).trim(),
                    style: _this4.buildStyles(content.styles)
                });
                return content;
            })));
            if (this.isLoop()) this.generateClones(this.slides);
        };
        _proto3.registerRootStyles = function registerRootStyles() {
            var _this5 = this;
            this.breakpoints.forEach((function(_ref2) {
                var width = _ref2[0], options = _ref2[1];
                _this5.Style.rule(" ", "max-width", unit(options.width), width);
            }));
        };
        _proto3.registerTrackStyles = function registerTrackStyles() {
            var _this6 = this;
            var Style2 = this.Style;
            var selector = "." + CLASS_TRACK;
            this.breakpoints.forEach((function(_ref3) {
                var width = _ref3[0], options = _ref3[1];
                Style2.rule(selector, _this6.resolve("paddingLeft"), _this6.cssPadding(options, false), width);
                Style2.rule(selector, _this6.resolve("paddingRight"), _this6.cssPadding(options, true), width);
                Style2.rule(selector, "height", _this6.cssTrackHeight(options), width);
            }));
        };
        _proto3.registerListStyles = function registerListStyles() {
            var _this7 = this;
            var Style2 = this.Style;
            var selector = "." + CLASS_LIST;
            this.breakpoints.forEach((function(_ref4) {
                var width = _ref4[0], options = _ref4[1];
                Style2.rule(selector, "transform", _this7.buildTranslate(options), width);
                if (!_this7.cssSlideHeight(options)) Style2.rule(selector, "aspect-ratio", _this7.cssAspectRatio(options), width);
            }));
        };
        _proto3.registerSlideStyles = function registerSlideStyles() {
            var _this8 = this;
            var Style2 = this.Style;
            var selector = "." + CLASS_SLIDE;
            this.breakpoints.forEach((function(_ref5) {
                var width = _ref5[0], options = _ref5[1];
                Style2.rule(selector, "width", _this8.cssSlideWidth(options), width);
                Style2.rule(selector, "height", _this8.cssSlideHeight(options) || "100%", width);
                Style2.rule(selector, _this8.resolve("marginRight"), unit(options.gap) || "0px", width);
                Style2.rule(selector + " > img", "display", options.cover ? "none" : "inline", width);
            }));
        };
        _proto3.buildTranslate = function buildTranslate(options) {
            var _this$Direction = this.Direction, resolve = _this$Direction.resolve, orient = _this$Direction.orient;
            var values = [];
            values.push(this.cssOffsetClones(options));
            values.push(this.cssOffsetGaps(options));
            if (this.isCenter(options)) {
                values.push(this.buildCssValue(orient(-50), "%"));
                values.push.apply(values, this.cssOffsetCenter(options));
            }
            return values.filter(Boolean).map((function(value) {
                return "translate" + resolve("X") + "(" + value + ")";
            })).join(" ");
        };
        _proto3.cssOffsetClones = function cssOffsetClones(options) {
            var _this$Direction2 = this.Direction, resolve = _this$Direction2.resolve, orient = _this$Direction2.orient;
            var cloneCount = this.getCloneCount();
            if (this.isFixedWidth(options)) {
                var _this$parseCssValue = this.parseCssValue(options[resolve("fixedWidth")]), value = _this$parseCssValue.value, unit2 = _this$parseCssValue.unit;
                return this.buildCssValue(orient(value) * cloneCount, unit2);
            }
            var percent = 100 * cloneCount / options.perPage;
            return orient(percent) + "%";
        };
        _proto3.cssOffsetCenter = function cssOffsetCenter(options) {
            var _this$Direction3 = this.Direction, resolve = _this$Direction3.resolve, orient = _this$Direction3.orient;
            if (this.isFixedWidth(options)) {
                var _this$parseCssValue2 = this.parseCssValue(options[resolve("fixedWidth")]), value = _this$parseCssValue2.value, unit2 = _this$parseCssValue2.unit;
                return [ this.buildCssValue(orient(value / 2), unit2) ];
            }
            var values = [];
            var perPage = options.perPage, gap = options.gap;
            values.push(orient(50 / perPage) + "%");
            if (gap) {
                var _this$parseCssValue3 = this.parseCssValue(gap), _value = _this$parseCssValue3.value, _unit = _this$parseCssValue3.unit;
                var gapOffset = (_value / perPage - _value) / 2;
                values.push(this.buildCssValue(orient(gapOffset), _unit));
            }
            return values;
        };
        _proto3.cssOffsetGaps = function cssOffsetGaps(options) {
            var cloneCount = this.getCloneCount();
            if (cloneCount && options.gap) {
                var orient = this.Direction.orient;
                var _this$parseCssValue4 = this.parseCssValue(options.gap), value = _this$parseCssValue4.value, unit2 = _this$parseCssValue4.unit;
                if (this.isFixedWidth(options)) return this.buildCssValue(orient(value * cloneCount), unit2);
                var perPage = options.perPage;
                var gaps = cloneCount / perPage;
                return this.buildCssValue(orient(gaps * value), unit2);
            }
            return "";
        };
        _proto3.resolve = function resolve(prop) {
            return camelToKebab(this.Direction.resolve(prop));
        };
        _proto3.cssPadding = function cssPadding(options, right) {
            var padding = options.padding;
            var prop = this.Direction.resolve(right ? "right" : "left", true);
            return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
        };
        _proto3.cssTrackHeight = function cssTrackHeight(options) {
            var height = "";
            if (this.isVertical()) {
                height = this.cssHeight(options);
                assert(height, '"height" is missing.');
                height = "calc(" + height + " - " + this.cssPadding(options, false) + " - " + this.cssPadding(options, true) + ")";
            }
            return height;
        };
        _proto3.cssHeight = function cssHeight(options) {
            return unit(options.height);
        };
        _proto3.cssSlideWidth = function cssSlideWidth(options) {
            return options.autoWidth ? "" : unit(options.fixedWidth) || (this.isVertical() ? "" : this.cssSlideSize(options));
        };
        _proto3.cssSlideHeight = function cssSlideHeight(options) {
            return unit(options.fixedHeight) || (this.isVertical() ? options.autoHeight ? "" : this.cssSlideSize(options) : this.cssHeight(options));
        };
        _proto3.cssSlideSize = function cssSlideSize(options) {
            var gap = unit(options.gap);
            return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
        };
        _proto3.cssAspectRatio = function cssAspectRatio(options) {
            var heightRatio = options.heightRatio;
            return heightRatio ? "" + 1 / heightRatio : "";
        };
        _proto3.buildCssValue = function buildCssValue(value, unit2) {
            return "" + value + unit2;
        };
        _proto3.parseCssValue = function parseCssValue(value) {
            if (isString(value)) {
                var number = parseFloat(value) || 0;
                var unit2 = value.replace(/\d*(\.\d*)?/, "") || "px";
                return {
                    value: number,
                    unit: unit2
                };
            }
            return {
                value,
                unit: "px"
            };
        };
        _proto3.parseBreakpoints = function parseBreakpoints() {
            var _this9 = this;
            var breakpoints = this.options.breakpoints;
            this.breakpoints.push([ "default", this.options ]);
            if (breakpoints) forOwn(breakpoints, (function(options, width) {
                _this9.breakpoints.push([ width, merge(merge({}, _this9.options), options) ]);
            }));
        };
        _proto3.isFixedWidth = function isFixedWidth(options) {
            return !!options[this.Direction.resolve("fixedWidth")];
        };
        _proto3.isLoop = function isLoop() {
            return this.options.type === LOOP;
        };
        _proto3.isCenter = function isCenter(options) {
            if (options.focus === "center") {
                if (this.isLoop()) return true;
                if (this.options.type === SLIDE) return !this.options.trimSpace;
            }
            return false;
        };
        _proto3.isVertical = function isVertical() {
            return this.options.direction === TTB;
        };
        _proto3.buildClasses = function buildClasses() {
            var options = this.options;
            return [ CLASS_ROOT, CLASS_ROOT + "--" + options.type, CLASS_ROOT + "--" + options.direction, options.drag && CLASS_ROOT + "--draggable", options.isNavigation && CLASS_ROOT + "--nav", CLASS_ACTIVE, !this.config.hidden && CLASS_RENDERED ].filter(Boolean).join(" ");
        };
        _proto3.buildAttrs = function buildAttrs(attrs) {
            var attr = "";
            forOwn(attrs, (function(value, key) {
                attr += value ? " " + camelToKebab(key) + '="' + value + '"' : "";
            }));
            return attr.trim();
        };
        _proto3.buildStyles = function buildStyles(styles) {
            var style = "";
            forOwn(styles, (function(value, key) {
                style += " " + camelToKebab(key) + ":" + value + ";";
            }));
            return style.trim();
        };
        _proto3.renderSlides = function renderSlides() {
            var _this10 = this;
            var tag = this.config.slideTag;
            return this.slides.map((function(content) {
                return "<" + tag + " " + _this10.buildAttrs(content.attrs) + ">" + (content.html || "") + "</" + tag + ">";
            })).join("");
        };
        _proto3.cover = function cover(content) {
            var styles = content.styles, _content$html = content.html, html = _content$html === void 0 ? "" : _content$html;
            if (this.options.cover && !this.options.lazyLoad) {
                var src = html.match(/<img.*?src\s*=\s*(['"])(.+?)\1.*?>/);
                if (src && src[2]) styles.background = "center/cover no-repeat url('" + src[2] + "')";
            }
        };
        _proto3.generateClones = function generateClones(contents) {
            var classes = this.options.classes;
            var count = this.getCloneCount();
            var slides = contents.slice();
            while (slides.length < count) push(slides, slides);
            push(slides.slice(-count).reverse(), slides.slice(0, count)).forEach((function(content, index) {
                var attrs = splide_esm_assign({}, content.attrs, {
                    class: content.attrs.class + " " + classes.clone
                });
                var clone = splide_esm_assign({}, content, {
                    attrs
                });
                index < count ? contents.unshift(clone) : contents.push(clone);
            }));
        };
        _proto3.getCloneCount = function getCloneCount() {
            if (this.isLoop()) {
                var options = this.options;
                if (options.clones) return options.clones;
                var perPage = max.apply(void 0, this.breakpoints.map((function(_ref6) {
                    var options2 = _ref6[1];
                    return options2.perPage;
                })));
                return perPage * ((options.flickMaxPages || 1) + 1);
            }
            return 0;
        };
        _proto3.renderArrows = function renderArrows() {
            var html = "";
            html += '<div class="' + this.options.classes.arrows + '">';
            html += this.renderArrow(true);
            html += this.renderArrow(false);
            html += "</div>";
            return html;
        };
        _proto3.renderArrow = function renderArrow(prev) {
            var _this$options = this.options, classes = _this$options.classes, i18n = _this$options.i18n;
            var attrs = {
                class: classes.arrow + " " + (prev ? classes.prev : classes.next),
                type: "button",
                ariaLabel: prev ? i18n.prev : i18n.next
            };
            return "<button " + this.buildAttrs(attrs) + '><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '"><path d="' + (this.options.arrowPath || PATH) + '" /></svg></button>';
        };
        _proto3.html = function html() {
            var _this$config = this.config, rootClass = _this$config.rootClass, listTag = _this$config.listTag, arrows = _this$config.arrows, beforeTrack = _this$config.beforeTrack, afterTrack = _this$config.afterTrack, slider = _this$config.slider, beforeSlider = _this$config.beforeSlider, afterSlider = _this$config.afterSlider;
            var html = "";
            html += '<div id="' + this.id + '" class="' + this.buildClasses() + " " + (rootClass || "") + '">';
            html += "<style>" + this.Style.build() + "</style>";
            if (slider) {
                html += beforeSlider || "";
                html += '<div class="splide__slider">';
            }
            html += beforeTrack || "";
            if (arrows) html += this.renderArrows();
            html += '<div class="splide__track">';
            html += "<" + listTag + ' class="splide__list">';
            html += this.renderSlides();
            html += "</" + listTag + ">";
            html += "</div>";
            html += afterTrack || "";
            if (slider) {
                html += "</div>";
                html += afterSlider || "";
            }
            html += "</div>";
            return html;
        };
    }();
    /*!
 * @splidejs/splide-extension-grid
 * Version  : 0.4.1
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
    function empty$1(array) {
        array.length = 0;
    }
    function slice$1(arrayLike, start, end) {
        return Array.prototype.slice.call(arrayLike, start, end);
    }
    function apply$1(func) {
        return func.bind.apply(func, [ null ].concat(slice$1(arguments, 1)));
    }
    function typeOf$1(type, subject) {
        return typeof subject === type;
    }
    var isArray$1 = Array.isArray;
    apply$1(typeOf$1, "function");
    apply$1(typeOf$1, "string");
    apply$1(typeOf$1, "undefined");
    function toArray$1(value) {
        return isArray$1(value) ? value : [ value ];
    }
    function forEach$1(values, iteratee) {
        toArray$1(values).forEach(iteratee);
    }
    var ownKeys$1 = Object.keys;
    function forOwn$1(object, iteratee, right) {
        if (object) {
            var keys = ownKeys$1(object);
            keys = right ? keys.reverse() : keys;
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "__proto__") if (iteratee(object[key], key) === false) break;
            }
        }
        return object;
    }
    function assign$1(object) {
        slice$1(arguments, 1).forEach((function(source) {
            forOwn$1(source, (function(value, key) {
                object[key] = source[key];
            }));
        }));
        return object;
    }
    var PROJECT_CODE$1 = "splide";
    function splide_extension_grid_esm_EventBinder() {
        var listeners = [];
        function bind(targets, events, callback, options) {
            forEachEvent(targets, events, (function(target, event, namespace) {
                var isEventTarget = "addEventListener" in target;
                var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
                isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
                listeners.push([ target, event, namespace, callback, remover ]);
            }));
        }
        function unbind(targets, events, callback) {
            forEachEvent(targets, events, (function(target, event, namespace) {
                listeners = listeners.filter((function(listener) {
                    if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
                        listener[4]();
                        return false;
                    }
                    return true;
                }));
            }));
        }
        function dispatch(target, type, detail) {
            var e;
            var bubbles = true;
            if (typeof CustomEvent === "function") e = new CustomEvent(type, {
                bubbles,
                detail
            }); else {
                e = document.createEvent("CustomEvent");
                e.initCustomEvent(type, bubbles, false, detail);
            }
            target.dispatchEvent(e);
            return e;
        }
        function forEachEvent(targets, events, iteratee) {
            forEach$1(targets, (function(target) {
                target && forEach$1(events, (function(events2) {
                    events2.split(" ").forEach((function(eventNS) {
                        var fragment = eventNS.split(".");
                        iteratee(target, fragment[0], fragment[1]);
                    }));
                }));
            }));
        }
        function destroy() {
            listeners.forEach((function(data) {
                data[4]();
            }));
            empty$1(listeners);
        }
        return {
            bind,
            unbind,
            dispatch,
            destroy
        };
    }
    var splide_extension_grid_esm_EVENT_VISIBLE = "visible";
    var splide_extension_grid_esm_EVENT_HIDDEN = "hidden";
    var splide_extension_grid_esm_EVENT_REFRESH = "refresh";
    var splide_extension_grid_esm_EVENT_UPDATED = "updated";
    var splide_extension_grid_esm_EVENT_DESTROY = "destroy";
    function splide_extension_grid_esm_EventInterface(Splide2) {
        var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
        var binder = splide_extension_grid_esm_EventBinder();
        function on(events, callback) {
            binder.bind(bus, toArray$1(events).join(" "), (function(e) {
                callback.apply(callback, isArray$1(e.detail) ? e.detail : []);
            }));
        }
        function emit(event) {
            binder.dispatch(bus, event, slice$1(arguments, 1));
        }
        if (Splide2) Splide2.event.on(splide_extension_grid_esm_EVENT_DESTROY, binder.destroy);
        return assign$1(binder, {
            bus,
            on,
            off: apply$1(binder.unbind, bus),
            emit
        });
    }
    var splide_extension_grid_esm_CLASS_ROOT = PROJECT_CODE$1;
    var splide_extension_grid_esm_CLASS_SLIDE = PROJECT_CODE$1 + "__slide";
    var splide_extension_grid_esm_CLASS_CONTAINER = splide_extension_grid_esm_CLASS_SLIDE + "__container";
    function splide_extension_grid_esm_empty(array) {
        array.length = 0;
    }
    function splide_extension_grid_esm_slice(arrayLike, start, end) {
        return Array.prototype.slice.call(arrayLike, start, end);
    }
    function splide_extension_grid_esm_apply(func) {
        return func.bind(null, ...splide_extension_grid_esm_slice(arguments, 1));
    }
    function splide_extension_grid_esm_typeOf(type, subject) {
        return typeof subject === type;
    }
    function splide_extension_grid_esm_isObject(subject) {
        return !splide_extension_grid_esm_isNull(subject) && splide_extension_grid_esm_typeOf("object", subject);
    }
    const splide_extension_grid_esm_isArray = Array.isArray;
    splide_extension_grid_esm_apply(splide_extension_grid_esm_typeOf, "function");
    const splide_extension_grid_esm_isString = splide_extension_grid_esm_apply(splide_extension_grid_esm_typeOf, "string");
    const splide_extension_grid_esm_isUndefined = splide_extension_grid_esm_apply(splide_extension_grid_esm_typeOf, "undefined");
    function splide_extension_grid_esm_isNull(subject) {
        return subject === null;
    }
    function splide_extension_grid_esm_isHTMLElement(subject) {
        return subject instanceof HTMLElement;
    }
    function splide_extension_grid_esm_toArray(value) {
        return splide_extension_grid_esm_isArray(value) ? value : [ value ];
    }
    function splide_extension_grid_esm_forEach(values, iteratee) {
        splide_extension_grid_esm_toArray(values).forEach(iteratee);
    }
    function splide_extension_grid_esm_push(array, items) {
        array.push(...splide_extension_grid_esm_toArray(items));
        return array;
    }
    function splide_extension_grid_esm_toggleClass(elm, classes, add) {
        if (elm) splide_extension_grid_esm_forEach(classes, (name => {
            if (name) elm.classList[add ? "add" : "remove"](name);
        }));
    }
    function splide_extension_grid_esm_addClass(elm, classes) {
        splide_extension_grid_esm_toggleClass(elm, splide_extension_grid_esm_isString(classes) ? classes.split(" ") : classes, true);
    }
    function splide_extension_grid_esm_append(parent, children) {
        splide_extension_grid_esm_forEach(children, parent.appendChild.bind(parent));
    }
    function splide_extension_grid_esm_matches(elm, selector) {
        return splide_extension_grid_esm_isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
    }
    function splide_extension_grid_esm_children(parent, selector) {
        const children2 = parent ? splide_extension_grid_esm_slice(parent.children) : [];
        return selector ? children2.filter((child => splide_extension_grid_esm_matches(child, selector))) : children2;
    }
    function splide_extension_grid_esm_child(parent, selector) {
        return selector ? splide_extension_grid_esm_children(parent, selector)[0] : parent.firstElementChild;
    }
    const splide_extension_grid_esm_ownKeys = Object.keys;
    function splide_extension_grid_esm_forOwn(object, iteratee, right) {
        if (object) {
            let keys = splide_extension_grid_esm_ownKeys(object);
            keys = right ? keys.reverse() : keys;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (key !== "__proto__") if (iteratee(object[key], key) === false) break;
            }
        }
        return object;
    }
    function splide_extension_grid_esm_assign(object) {
        splide_extension_grid_esm_slice(arguments, 1).forEach((source => {
            splide_extension_grid_esm_forOwn(source, ((value, key) => {
                object[key] = source[key];
            }));
        }));
        return object;
    }
    function splide_extension_grid_esm_omit(object, keys) {
        splide_extension_grid_esm_toArray(keys || splide_extension_grid_esm_ownKeys(object)).forEach((key => {
            delete object[key];
        }));
    }
    function splide_extension_grid_esm_removeAttribute(elms, attrs) {
        splide_extension_grid_esm_forEach(elms, (elm => {
            splide_extension_grid_esm_forEach(attrs, (attr => {
                elm && elm.removeAttribute(attr);
            }));
        }));
    }
    function splide_extension_grid_esm_setAttribute(elms, attrs, value) {
        if (splide_extension_grid_esm_isObject(attrs)) splide_extension_grid_esm_forOwn(attrs, ((value2, name) => {
            splide_extension_grid_esm_setAttribute(elms, name, value2);
        })); else splide_extension_grid_esm_forEach(elms, (elm => {
            splide_extension_grid_esm_isNull(value) || value === "" ? splide_extension_grid_esm_removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
        }));
    }
    function splide_extension_grid_esm_create(tag, attrs, parent) {
        const elm = document.createElement(tag);
        if (attrs) splide_extension_grid_esm_isString(attrs) ? splide_extension_grid_esm_addClass(elm, attrs) : splide_extension_grid_esm_setAttribute(elm, attrs);
        parent && splide_extension_grid_esm_append(parent, elm);
        return elm;
    }
    function splide_extension_grid_esm_style(elm, prop, value) {
        if (splide_extension_grid_esm_isUndefined(value)) return getComputedStyle(elm)[prop];
        if (!splide_extension_grid_esm_isNull(value)) elm.style[prop] = `${value}`;
    }
    function splide_extension_grid_esm_hasClass(elm, className) {
        return elm && elm.classList.contains(className);
    }
    function splide_extension_grid_esm_remove(nodes) {
        splide_extension_grid_esm_forEach(nodes, (node => {
            if (node && node.parentNode) node.parentNode.removeChild(node);
        }));
    }
    function splide_extension_grid_esm_queryAll(parent, selector) {
        return selector ? splide_extension_grid_esm_slice(parent.querySelectorAll(selector)) : [];
    }
    function splide_extension_grid_esm_removeClass(elm, classes) {
        splide_extension_grid_esm_toggleClass(elm, classes, false);
    }
    function splide_extension_grid_esm_unit(value) {
        return splide_extension_grid_esm_isString(value) ? value : value ? `${value}px` : "";
    }
    const splide_extension_grid_esm_PROJECT_CODE = "splide";
    function splide_extension_grid_esm_assert(condition, message) {
        if (!condition) throw new Error(`[${splide_extension_grid_esm_PROJECT_CODE}] ${message || ""}`);
    }
    const {min: splide_extension_grid_esm_min, max: splide_extension_grid_esm_max, floor: splide_extension_grid_esm_floor, ceil: splide_extension_grid_esm_ceil, abs: splide_extension_grid_esm_abs} = Math;
    function splide_extension_grid_esm_pad(number) {
        return number < 10 ? `0${number}` : `${number}`;
    }
    const CLASS_SLIDE_ROW = `${splide_extension_grid_esm_CLASS_SLIDE}__row`;
    const CLASS_SLIDE_COL = `${splide_extension_grid_esm_CLASS_SLIDE}--col`;
    const splide_extension_grid_esm_DEFAULTS = {
        rows: 1,
        cols: 1,
        dimensions: [],
        gap: {}
    };
    function Dimension(options) {
        function normalize() {
            const {rows, cols, dimensions} = options;
            return splide_extension_grid_esm_isArray(dimensions) && dimensions.length ? dimensions : [ [ rows, cols ] ];
        }
        function get(index) {
            const dimensions = normalize();
            return dimensions[splide_extension_grid_esm_min(index, dimensions.length - 1)];
        }
        function getAt(index) {
            const dimensions = normalize();
            let rows, cols, aggregator = 0;
            for (let i = 0; i < dimensions.length; i++) {
                const dimension = dimensions[i];
                rows = dimension[0] || 1;
                cols = dimension[1] || 1;
                aggregator += rows * cols;
                if (index < aggregator) break;
            }
            splide_extension_grid_esm_assert(rows && cols, "Invalid dimension");
            return [ rows, cols ];
        }
        return {
            get,
            getAt
        };
    }
    function splide_extension_grid_esm_Layout(Splide2, gridOptions, Dimension) {
        const {on, destroy: destroyEvent} = splide_extension_grid_esm_EventInterface(Splide2);
        const {Components, options} = Splide2;
        const {resolve} = Components.Direction;
        const {forEach} = Components.Slides;
        function mount() {
            layout();
            if (options.slideFocus) {
                on(splide_extension_grid_esm_EVENT_VISIBLE, onVisible);
                on(splide_extension_grid_esm_EVENT_HIDDEN, onHidden);
            }
        }
        function destroy() {
            forEach((Slide => {
                const {slide} = Slide;
                toggleTabIndex(slide, false);
                getRowsIn(slide).forEach((cell => {
                    splide_extension_grid_esm_removeAttribute(cell, "style");
                }));
                getColsIn(slide).forEach((colSlide => {
                    cover(colSlide, true);
                    splide_extension_grid_esm_removeAttribute(colSlide, "style");
                }));
            }));
            destroyEvent();
        }
        function layout() {
            forEach((Slide => {
                const {slide} = Slide;
                const [rows, cols] = Dimension.get(Slide.isClone ? Slide.slideIndex : Slide.index);
                layoutRow(rows, slide);
                layoutCol(cols, slide);
                getColsIn(Slide.slide).forEach(((colSlide, index) => {
                    colSlide.id = `${Slide.slide.id}-col${splide_extension_grid_esm_pad(index + 1)}`;
                    if (Splide2.options.cover) cover(colSlide);
                }));
            }));
        }
        function layoutRow(rows, slide) {
            const {row: rowGap} = gridOptions.gap;
            const height = `calc(${100 / rows}%${rowGap ? ` - ${splide_extension_grid_esm_unit(rowGap)} * ${(rows - 1) / rows}` : ""})`;
            getRowsIn(slide).forEach(((rowElm, index, rowElms) => {
                splide_extension_grid_esm_style(rowElm, "height", height);
                splide_extension_grid_esm_style(rowElm, "display", "flex");
                splide_extension_grid_esm_style(rowElm, "margin", `0 0 ${splide_extension_grid_esm_unit(rowGap)} 0`);
                splide_extension_grid_esm_style(rowElm, "padding", 0);
                if (index === rowElms.length - 1) splide_extension_grid_esm_style(rowElm, "marginBottom", 0);
            }));
        }
        function layoutCol(cols, slide) {
            const {col: colGap} = gridOptions.gap;
            const width = `calc(${100 / cols}%${colGap ? ` - ${splide_extension_grid_esm_unit(colGap)} * ${(cols - 1) / cols}` : ""})`;
            getColsIn(slide).forEach(((colElm, index, colElms) => {
                splide_extension_grid_esm_style(colElm, "width", width);
                if (index !== colElms.length - 1) splide_extension_grid_esm_style(colElm, resolve("marginRight"), splide_extension_grid_esm_unit(colGap));
            }));
        }
        function cover(colSlide, uncover) {
            const container = splide_extension_grid_esm_child(colSlide, `.${splide_extension_grid_esm_CLASS_CONTAINER}`);
            const img = splide_extension_grid_esm_child(container || colSlide, "img");
            if (img && img.src) {
                splide_extension_grid_esm_style(container || colSlide, "background", uncover ? "" : `center/cover no-repeat url("${img.src}")`);
                splide_extension_grid_esm_style(img, "display", uncover ? "" : "none");
            }
        }
        function getRowsIn(slide) {
            return splide_extension_grid_esm_queryAll(slide, `.${CLASS_SLIDE_ROW}`);
        }
        function getColsIn(slide) {
            return splide_extension_grid_esm_queryAll(slide, `.${CLASS_SLIDE_COL}`);
        }
        function toggleTabIndex(slide, add) {
            getColsIn(slide).forEach((colSlide => {
                splide_extension_grid_esm_setAttribute(colSlide, "tabindex", add ? 0 : null);
            }));
        }
        function onVisible(Slide) {
            toggleTabIndex(Slide.slide, true);
        }
        function onHidden(Slide) {
            toggleTabIndex(Slide.slide, false);
        }
        return {
            mount,
            destroy
        };
    }
    function Grid(Splide2, Components2, options) {
        const {on, off} = splide_extension_grid_esm_EventInterface(Splide2);
        const {Elements} = Components2;
        const gridOptions = {};
        const Dimension$1 = Dimension(gridOptions);
        const Layout$1 = splide_extension_grid_esm_Layout(Splide2, gridOptions, Dimension$1);
        const modifier = `${splide_extension_grid_esm_CLASS_ROOT}--grid`;
        const originalSlides = [];
        function mount() {
            init();
            on(splide_extension_grid_esm_EVENT_UPDATED, init);
        }
        function init() {
            splide_extension_grid_esm_omit(gridOptions);
            splide_extension_grid_esm_assign(gridOptions, splide_extension_grid_esm_DEFAULTS, options.grid || {});
            if (shouldBuild()) {
                destroy();
                splide_extension_grid_esm_push(originalSlides, Elements.slides);
                splide_extension_grid_esm_addClass(Splide2.root, modifier);
                splide_extension_grid_esm_append(Elements.list, build());
                off(splide_extension_grid_esm_EVENT_REFRESH);
                on(splide_extension_grid_esm_EVENT_REFRESH, layout);
                refresh();
            } else if (isActive()) {
                destroy();
                refresh();
            }
        }
        function destroy() {
            if (isActive()) {
                const {slides} = Elements;
                Layout$1.destroy();
                originalSlides.forEach((slide => {
                    splide_extension_grid_esm_removeClass(slide, CLASS_SLIDE_COL);
                    splide_extension_grid_esm_append(Elements.list, slide);
                }));
                splide_extension_grid_esm_remove(slides);
                splide_extension_grid_esm_removeClass(Splide2.root, modifier);
                splide_extension_grid_esm_empty(slides);
                splide_extension_grid_esm_push(slides, originalSlides);
                splide_extension_grid_esm_empty(originalSlides);
                off(splide_extension_grid_esm_EVENT_REFRESH);
            }
        }
        function refresh() {
            Splide2.refresh();
        }
        function layout() {
            if (isActive()) Layout$1.mount();
        }
        function build() {
            const outerSlides = [];
            let row = 0, col = 0;
            let outerSlide, rowSlide;
            originalSlides.forEach(((slide, index) => {
                const [rows, cols] = Dimension$1.getAt(index);
                if (!col) {
                    if (!row) {
                        outerSlide = splide_extension_grid_esm_create(slide.tagName, splide_extension_grid_esm_CLASS_SLIDE);
                        outerSlides.push(outerSlide);
                    }
                    rowSlide = buildRow(rows, slide, outerSlide);
                }
                buildCol(cols, slide, rowSlide);
                if (++col >= cols) {
                    col = 0;
                    row = ++row >= rows ? 0 : row;
                }
            }));
            return outerSlides;
        }
        function buildRow(rows, slide, outerSlide) {
            const tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
            return splide_extension_grid_esm_create(tag, CLASS_SLIDE_ROW, outerSlide);
        }
        function buildCol(cols, slide, rowSlide) {
            splide_extension_grid_esm_addClass(slide, CLASS_SLIDE_COL);
            splide_extension_grid_esm_append(rowSlide, slide);
            return slide;
        }
        function shouldBuild() {
            if (options.grid) {
                const {rows, cols, dimensions} = gridOptions;
                return rows > 1 || cols > 1 || splide_extension_grid_esm_isArray(dimensions) && dimensions.length > 0;
            }
            return false;
        }
        function isActive() {
            return splide_extension_grid_esm_hasClass(Splide2.root, modifier);
        }
        return {
            mount,
            destroy
        };
    }
    document.addEventListener("DOMContentLoaded", (function() {
        var heroSliderEl = document.querySelector(".hero__slider");
        if (heroSliderEl) {
            var heroSlider = new splide_esm_Splide(heroSliderEl, {
                perPage: 1,
                arrows: false,
                pagination: true,
                gap: 20,
                padding: {
                    left: 64,
                    right: 64
                },
                breakpoints: {
                    369.98: {
                        gap: 10,
                        padding: {
                            left: 30,
                            right: 30
                        }
                    }
                }
            });
            heroSlider.mount();
        }
        var articlesDashSliderEl = document.querySelector(".articles-dash__slider");
        if (articlesDashSliderEl) {
            var articlesDashSlider = new splide_esm_Splide(articlesDashSliderEl, {
                perPage: 2,
                arrows: false,
                pagination: false,
                destroy: true,
                gap: 16,
                padding: {
                    right: 150
                },
                breakpoints: {
                    1099.98: {
                        destroy: false
                    },
                    767.98: {
                        perPage: 1
                    },
                    499.98: {
                        padding: {
                            right: 39
                        }
                    }
                }
            });
            articlesDashSlider.mount();
        }
        var blogSliderEls = document.querySelectorAll(".blog__news");
        if (blogSliderEls) blogSliderEls.forEach((blogSliderEl => {
            var blogSlider = new splide_esm_Splide(blogSliderEl, {
                perPage: 2,
                arrows: false,
                pagination: true,
                destroy: true,
                gap: 5,
                updateOnMove: true,
                padding: {
                    right: 20,
                    left: 20
                },
                breakpoints: {
                    991.98: {
                        destroy: false
                    },
                    599.98: {
                        perPage: 1
                    }
                }
            });
            blogSlider.mount();
        }));
        var navSliderEl = document.querySelector(".nav-profile__slider");
        if (navSliderEl) {
            var navSlider = new splide_esm_Splide(navSliderEl, {
                perPage: 3,
                arrows: false,
                perMove: 1,
                omitEnd: true,
                pagination: true,
                destroy: true,
                breakpoints: {
                    767.98: {
                        destroy: false
                    }
                }
            });
            navSlider.mount();
        }
        var tabsSliderEl = document.querySelector(".inquires__tabs-slider");
        if (tabsSliderEl) {
            navSlider = new splide_esm_Splide(tabsSliderEl, {
                perPage: 3,
                arrows: false,
                perMove: 1,
                omitEnd: true,
                pagination: true,
                destroy: true,
                breakpoints: {
                    767.98: {
                        destroy: false
                    }
                }
            });
            navSlider.mount();
        }
        var holidaysSliderEl = document.querySelectorAll(".holidays-dash__slider");
        if (holidaysSliderEl.length) holidaysSliderEl.forEach((holidaysSliderEl => {
            const isPopup = holidaysSliderEl.classList.contains("holidays-dash__slider--popup");
            var holidaysSlider = new splide_esm_Splide(holidaysSliderEl, {
                arrows: true,
                perMove: 1,
                omitEnd: true,
                pagination: false,
                gap: 8,
                updateOnMove: true,
                grid: {
                    rows: isPopup ? 4 : 2,
                    cols: 1,
                    gap: {
                        row: "0.5rem",
                        col: "0.5rem"
                    }
                },
                breakpoints: {
                    767.98: {
                        grid: {
                            rows: 2
                        }
                    }
                }
            });
            holidaysSlider.mount({
                Grid
            });
        }));
        var bidSliderEls = document.querySelectorAll(".block-inq__slider");
        if (bidSliderEls) bidSliderEls.forEach((bidSliderEl => {
            var bidSlider = new splide_esm_Splide(bidSliderEl, {
                perPage: 1,
                arrows: true,
                perMove: 1,
                pagination: false,
                updateOnMove: true
            });
            var paginationEl = bidSliderEl.querySelector(".splide__num-pagination");
            if (paginationEl) {
                function updatePagination() {
                    var total = bidSlider.Components.Controller.getEnd() + 1;
                    var current = bidSlider.index + 1;
                    paginationEl.innerHTML = `<span>${current}</span>/${total}`;
                }
                bidSlider.on("mounted move", (function() {
                    var bar = bidSlider.root.querySelector(".splide__progress");
                    if (bar) {
                        var end = bidSlider.Components.Controller.getEnd() + 1;
                        var rate = Math.min((bidSlider.index + 1) / end, 1);
                        bar.style = `--progress: ${String(100 * rate) + "%"}`;
                    }
                    updatePagination();
                }));
            }
            bidSlider.mount();
        }));
        var logitalkSliderEl = document.querySelectorAll(".logitalk__slider");
        if (logitalkSliderEl.length) logitalkSliderEl.forEach((logitalkSliderEl => {
            var logitalkSlider = new splide_esm_Splide(logitalkSliderEl, {
                autoplay: true,
                interval: 4e3,
                pauseOnHover: true,
                arrows: false,
                perPage: 1,
                omitEnd: true,
                pagination: false,
                gap: 10,
                updateOnMove: true
            });
            logitalkSlider.mount();
        }));
    }));
    function isObject_isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
    }
    const lodash_es_isObject = isObject_isObject;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    const _freeGlobal = freeGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = _freeGlobal || freeSelf || Function("return this")();
    const _root = root;
    var now = function() {
        return _root.Date.now();
    };
    const lodash_es_now = now;
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) ;
        return index;
    }
    const _trimmedEndIndex = trimmedEndIndex;
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
        return string ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    const _baseTrim = baseTrim;
    var Symbol = _root.Symbol;
    const _Symbol = Symbol;
    var objectProto = Object.prototype;
    var _getRawTag_hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
    function getRawTag(value) {
        var isOwn = _getRawTag_hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
            value[symToStringTag] = void 0;
            var unmasked = true;
        } catch (e) {}
        var result = nativeObjectToString.call(value);
        if (unmasked) if (isOwn) value[symToStringTag] = tag; else delete value[symToStringTag];
        return result;
    }
    const _getRawTag = getRawTag;
    var _objectToString_objectProto = Object.prototype;
    var _objectToString_nativeObjectToString = _objectToString_objectProto.toString;
    function objectToString(value) {
        return _objectToString_nativeObjectToString.call(value);
    }
    const _objectToString = objectToString;
    var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
    var _baseGetTag_symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
    function baseGetTag(value) {
        if (value == null) return value === void 0 ? undefinedTag : nullTag;
        return _baseGetTag_symToStringTag && _baseGetTag_symToStringTag in Object(value) ? _getRawTag(value) : _objectToString(value);
    }
    const _baseGetTag = baseGetTag;
    function isObjectLike(value) {
        return value != null && typeof value == "object";
    }
    const lodash_es_isObjectLike = isObjectLike;
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
        return typeof value == "symbol" || lodash_es_isObjectLike(value) && _baseGetTag(value) == symbolTag;
    }
    const lodash_es_isSymbol = isSymbol;
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
        if (typeof value == "number") return value;
        if (lodash_es_isSymbol(value)) return NAN;
        if (lodash_es_isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = lodash_es_isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") return value === 0 ? value : +value;
        value = _baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    const lodash_es_toNumber = toNumber;
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max, nativeMin = Math.min;
    function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
        wait = lodash_es_toNumber(wait) || 0;
        if (lodash_es_isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(lodash_es_toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = void 0;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }
        function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout(timerExpired, wait);
            return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
            var time = lodash_es_now();
            if (shouldInvoke(time)) return trailingEdge(time);
            timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
            timerId = void 0;
            if (trailing && lastArgs) return invokeFunc(time);
            lastArgs = lastThis = void 0;
            return result;
        }
        function cancel() {
            if (timerId !== void 0) clearTimeout(timerId);
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
            return timerId === void 0 ? result : trailingEdge(lodash_es_now());
        }
        function debounced() {
            var time = lodash_es_now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
                if (timerId === void 0) return leadingEdge(lastCallTime);
                if (maxing) {
                    clearTimeout(timerId);
                    timerId = setTimeout(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }
            if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
    }
    const lodash_es_debounce = debounce;
    var throttle_FUNC_ERROR_TEXT = "Expected a function";
    function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") throw new TypeError(throttle_FUNC_ERROR_TEXT);
        if (lodash_es_isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return lodash_es_debounce(func, wait, {
            leading,
            maxWait: wait,
            trailing
        });
    }
    const lodash_es_throttle = throttle;
    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function getElementWindow$1(element) {
        if (!element || !element.ownerDocument || !element.ownerDocument.defaultView) return window;
        return element.ownerDocument.defaultView;
    }
    function getElementDocument$1(element) {
        if (!element || !element.ownerDocument) return document;
        return element.ownerDocument;
    }
    var getOptions$1 = function(obj) {
        var initialObj = {};
        var options = Array.prototype.reduce.call(obj, (function(acc, attribute) {
            var option = attribute.name.match(/data-simplebar-(.+)/);
            if (option) {
                var key = option[1].replace(/\W+(.)/g, (function(_, chr) {
                    return chr.toUpperCase();
                }));
                switch (attribute.value) {
                  case "true":
                    acc[key] = true;
                    break;

                  case "false":
                    acc[key] = false;
                    break;

                  case void 0:
                    acc[key] = true;
                    break;

                  default:
                    acc[key] = attribute.value;
                }
            }
            return acc;
        }), initialObj);
        return options;
    };
    function addClasses$1(el, classes) {
        var _a;
        if (!el) return;
        (_a = el.classList).add.apply(_a, classes.split(" "));
    }
    function removeClasses$1(el, classes) {
        if (!el) return;
        classes.split(" ").forEach((function(className) {
            el.classList.remove(className);
        }));
    }
    function classNamesToQuery$1(classNames) {
        return ".".concat(classNames.split(" ").join("."));
    }
    var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
    var helpers = Object.freeze({
        __proto__: null,
        addClasses: addClasses$1,
        canUseDOM,
        classNamesToQuery: classNamesToQuery$1,
        getElementDocument: getElementDocument$1,
        getElementWindow: getElementWindow$1,
        getOptions: getOptions$1,
        removeClasses: removeClasses$1
    });
    var cachedScrollbarWidth = null;
    var cachedDevicePixelRatio = null;
    if (canUseDOM) window.addEventListener("resize", (function() {
        if (cachedDevicePixelRatio !== window.devicePixelRatio) {
            cachedDevicePixelRatio = window.devicePixelRatio;
            cachedScrollbarWidth = null;
        }
    }));
    function scrollbarWidth() {
        if (cachedScrollbarWidth === null) {
            if (typeof document === "undefined") {
                cachedScrollbarWidth = 0;
                return cachedScrollbarWidth;
            }
            var body = document.body;
            var box = document.createElement("div");
            box.classList.add("simplebar-hide-scrollbar");
            body.appendChild(box);
            var width = box.getBoundingClientRect().right;
            body.removeChild(box);
            cachedScrollbarWidth = width;
        }
        return cachedScrollbarWidth;
    }
    var getElementWindow = getElementWindow$1, getElementDocument = getElementDocument$1, getOptions = getOptions$1, addClasses = addClasses$1, dist_removeClasses = removeClasses$1, classNamesToQuery = classNamesToQuery$1;
    var SimpleBarCore = function() {
        function SimpleBarCore(element, options) {
            if (options === void 0) options = {};
            var _this = this;
            this.removePreventClickId = null;
            this.minScrollbarWidth = 20;
            this.stopScrollDelay = 175;
            this.isScrolling = false;
            this.isMouseEntering = false;
            this.isDragging = false;
            this.scrollXTicking = false;
            this.scrollYTicking = false;
            this.wrapperEl = null;
            this.contentWrapperEl = null;
            this.contentEl = null;
            this.offsetEl = null;
            this.maskEl = null;
            this.placeholderEl = null;
            this.heightAutoObserverWrapperEl = null;
            this.heightAutoObserverEl = null;
            this.rtlHelpers = null;
            this.scrollbarWidth = 0;
            this.resizeObserver = null;
            this.mutationObserver = null;
            this.elStyles = null;
            this.isRtl = null;
            this.mouseX = 0;
            this.mouseY = 0;
            this.onMouseMove = function() {};
            this.onWindowResize = function() {};
            this.onStopScrolling = function() {};
            this.onMouseEntered = function() {};
            this.onScroll = function() {
                var elWindow = getElementWindow(_this.el);
                if (!_this.scrollXTicking) {
                    elWindow.requestAnimationFrame(_this.scrollX);
                    _this.scrollXTicking = true;
                }
                if (!_this.scrollYTicking) {
                    elWindow.requestAnimationFrame(_this.scrollY);
                    _this.scrollYTicking = true;
                }
                if (!_this.isScrolling) {
                    _this.isScrolling = true;
                    addClasses(_this.el, _this.classNames.scrolling);
                }
                _this.showScrollbar("x");
                _this.showScrollbar("y");
                _this.onStopScrolling();
            };
            this.scrollX = function() {
                if (_this.axis.x.isOverflowing) _this.positionScrollbar("x");
                _this.scrollXTicking = false;
            };
            this.scrollY = function() {
                if (_this.axis.y.isOverflowing) _this.positionScrollbar("y");
                _this.scrollYTicking = false;
            };
            this._onStopScrolling = function() {
                dist_removeClasses(_this.el, _this.classNames.scrolling);
                if (_this.options.autoHide) {
                    _this.hideScrollbar("x");
                    _this.hideScrollbar("y");
                }
                _this.isScrolling = false;
            };
            this.onMouseEnter = function() {
                if (!_this.isMouseEntering) {
                    addClasses(_this.el, _this.classNames.mouseEntered);
                    _this.showScrollbar("x");
                    _this.showScrollbar("y");
                    _this.isMouseEntering = true;
                }
                _this.onMouseEntered();
            };
            this._onMouseEntered = function() {
                dist_removeClasses(_this.el, _this.classNames.mouseEntered);
                if (_this.options.autoHide) {
                    _this.hideScrollbar("x");
                    _this.hideScrollbar("y");
                }
                _this.isMouseEntering = false;
            };
            this._onMouseMove = function(e) {
                _this.mouseX = e.clientX;
                _this.mouseY = e.clientY;
                if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) _this.onMouseMoveForAxis("x");
                if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) _this.onMouseMoveForAxis("y");
            };
            this.onMouseLeave = function() {
                _this.onMouseMove.cancel();
                if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) _this.onMouseLeaveForAxis("x");
                if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) _this.onMouseLeaveForAxis("y");
                _this.mouseX = -1;
                _this.mouseY = -1;
            };
            this._onWindowResize = function() {
                _this.scrollbarWidth = _this.getScrollbarWidth();
                _this.hideNativeScrollbar();
            };
            this.onPointerEvent = function(e) {
                if (!_this.axis.x.track.el || !_this.axis.y.track.el || !_this.axis.x.scrollbar.el || !_this.axis.y.scrollbar.el) return;
                var isWithinTrackXBounds, isWithinTrackYBounds;
                _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
                _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
                if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
                if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
                if (isWithinTrackXBounds || isWithinTrackYBounds) {
                    e.stopPropagation();
                    if (e.type === "pointerdown" && e.pointerType !== "touch") {
                        if (isWithinTrackXBounds) {
                            _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();
                            if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) _this.onDragStart(e, "x"); else _this.onTrackClick(e, "x");
                        }
                        if (isWithinTrackYBounds) {
                            _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();
                            if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) _this.onDragStart(e, "y"); else _this.onTrackClick(e, "y");
                        }
                    }
                }
            };
            this.drag = function(e) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                if (!_this.draggedAxis || !_this.contentWrapperEl) return;
                var eventOffset;
                var track = _this.axis[_this.draggedAxis].track;
                var trackSize = (_b = (_a = track.rect) === null || _a === void 0 ? void 0 : _a[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _b !== void 0 ? _b : 0;
                var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
                var contentSize = (_d = (_c = _this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c[_this.axis[_this.draggedAxis].scrollSizeAttr]) !== null && _d !== void 0 ? _d : 0;
                var hostSize = parseInt((_f = (_e = _this.elStyles) === null || _e === void 0 ? void 0 : _e[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _f !== void 0 ? _f : "0px", 10);
                e.preventDefault();
                e.stopPropagation();
                if (_this.draggedAxis === "y") eventOffset = e.pageY; else eventOffset = e.pageX;
                var dragPos = eventOffset - ((_h = (_g = track.rect) === null || _g === void 0 ? void 0 : _g[_this.axis[_this.draggedAxis].offsetAttr]) !== null && _h !== void 0 ? _h : 0) - _this.axis[_this.draggedAxis].dragOffset;
                dragPos = _this.draggedAxis === "x" && _this.isRtl ? ((_k = (_j = track.rect) === null || _j === void 0 ? void 0 : _j[_this.axis[_this.draggedAxis].sizeAttr]) !== null && _k !== void 0 ? _k : 0) - scrollbar.size - dragPos : dragPos;
                var dragPerc = dragPos / (trackSize - scrollbar.size);
                var scrollPos = dragPerc * (contentSize - hostSize);
                if (_this.draggedAxis === "x" && _this.isRtl) scrollPos = ((_l = SimpleBarCore.getRtlHelpers()) === null || _l === void 0 ? void 0 : _l.isScrollingToNegative) ? -scrollPos : scrollPos;
                _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
            };
            this.onEndDrag = function(e) {
                _this.isDragging = false;
                var elDocument = getElementDocument(_this.el);
                var elWindow = getElementWindow(_this.el);
                e.preventDefault();
                e.stopPropagation();
                dist_removeClasses(_this.el, _this.classNames.dragging);
                _this.onStopScrolling();
                elDocument.removeEventListener("mousemove", _this.drag, true);
                elDocument.removeEventListener("mouseup", _this.onEndDrag, true);
                _this.removePreventClickId = elWindow.setTimeout((function() {
                    elDocument.removeEventListener("click", _this.preventClick, true);
                    elDocument.removeEventListener("dblclick", _this.preventClick, true);
                    _this.removePreventClickId = null;
                }));
            };
            this.preventClick = function(e) {
                e.preventDefault();
                e.stopPropagation();
            };
            this.el = element;
            this.options = __assign(__assign({}, SimpleBarCore.defaultOptions), options);
            this.classNames = __assign(__assign({}, SimpleBarCore.defaultOptions.classNames), options.classNames);
            this.axis = {
                x: {
                    scrollOffsetAttr: "scrollLeft",
                    sizeAttr: "width",
                    scrollSizeAttr: "scrollWidth",
                    offsetSizeAttr: "offsetWidth",
                    offsetAttr: "left",
                    overflowAttr: "overflowX",
                    dragOffset: 0,
                    isOverflowing: true,
                    forceVisible: false,
                    track: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: false
                    },
                    scrollbar: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: false
                    }
                },
                y: {
                    scrollOffsetAttr: "scrollTop",
                    sizeAttr: "height",
                    scrollSizeAttr: "scrollHeight",
                    offsetSizeAttr: "offsetHeight",
                    offsetAttr: "top",
                    overflowAttr: "overflowY",
                    dragOffset: 0,
                    isOverflowing: true,
                    forceVisible: false,
                    track: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: false
                    },
                    scrollbar: {
                        size: null,
                        el: null,
                        rect: null,
                        isVisible: false
                    }
                }
            };
            if (typeof this.el !== "object" || !this.el.nodeName) throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
            this.onMouseMove = lodash_es_throttle(this._onMouseMove, 64);
            this.onWindowResize = lodash_es_debounce(this._onWindowResize, 64, {
                leading: true
            });
            this.onStopScrolling = lodash_es_debounce(this._onStopScrolling, this.stopScrollDelay);
            this.onMouseEntered = lodash_es_debounce(this._onMouseEntered, this.stopScrollDelay);
            this.init();
        }
        SimpleBarCore.getRtlHelpers = function() {
            if (SimpleBarCore.rtlHelpers) return SimpleBarCore.rtlHelpers;
            var dummyDiv = document.createElement("div");
            dummyDiv.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
            var scrollbarDummyEl = dummyDiv.firstElementChild;
            var dummyChild = scrollbarDummyEl === null || scrollbarDummyEl === void 0 ? void 0 : scrollbarDummyEl.firstElementChild;
            if (!dummyChild) return null;
            document.body.appendChild(scrollbarDummyEl);
            scrollbarDummyEl.scrollLeft = 0;
            var dummyContainerOffset = SimpleBarCore.getOffset(scrollbarDummyEl);
            var dummyChildOffset = SimpleBarCore.getOffset(dummyChild);
            scrollbarDummyEl.scrollLeft = -999;
            var dummyChildOffsetAfterScroll = SimpleBarCore.getOffset(dummyChild);
            document.body.removeChild(scrollbarDummyEl);
            SimpleBarCore.rtlHelpers = {
                isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
                isScrollingToNegative: dummyChildOffset.left !== dummyChildOffsetAfterScroll.left
            };
            return SimpleBarCore.rtlHelpers;
        };
        SimpleBarCore.prototype.getScrollbarWidth = function() {
            try {
                if (this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style) return 0; else return scrollbarWidth();
            } catch (e) {
                return scrollbarWidth();
            }
        };
        SimpleBarCore.getOffset = function(el) {
            var rect = el.getBoundingClientRect();
            var elDocument = getElementDocument(el);
            var elWindow = getElementWindow(el);
            return {
                top: rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
                left: rect.left + (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
            };
        };
        SimpleBarCore.prototype.init = function() {
            if (canUseDOM) {
                this.initDOM();
                this.rtlHelpers = SimpleBarCore.getRtlHelpers();
                this.scrollbarWidth = this.getScrollbarWidth();
                this.recalculate();
                this.initListeners();
            }
        };
        SimpleBarCore.prototype.initDOM = function() {
            var _a, _b;
            this.wrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.wrapper));
            this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(classNamesToQuery(this.classNames.contentWrapper));
            this.contentEl = this.options.contentNode || this.el.querySelector(classNamesToQuery(this.classNames.contentEl));
            this.offsetEl = this.el.querySelector(classNamesToQuery(this.classNames.offset));
            this.maskEl = this.el.querySelector(classNamesToQuery(this.classNames.mask));
            this.placeholderEl = this.findChild(this.wrapperEl, classNamesToQuery(this.classNames.placeholder));
            this.heightAutoObserverWrapperEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverWrapperEl));
            this.heightAutoObserverEl = this.el.querySelector(classNamesToQuery(this.classNames.heightAutoObserverEl));
            this.axis.x.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.horizontal)));
            this.axis.y.track.el = this.findChild(this.el, "".concat(classNamesToQuery(this.classNames.track)).concat(classNamesToQuery(this.classNames.vertical)));
            this.axis.x.scrollbar.el = ((_a = this.axis.x.track.el) === null || _a === void 0 ? void 0 : _a.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
            this.axis.y.scrollbar.el = ((_b = this.axis.y.track.el) === null || _b === void 0 ? void 0 : _b.querySelector(classNamesToQuery(this.classNames.scrollbar))) || null;
            if (!this.options.autoHide) {
                addClasses(this.axis.x.scrollbar.el, this.classNames.visible);
                addClasses(this.axis.y.scrollbar.el, this.classNames.visible);
            }
        };
        SimpleBarCore.prototype.initListeners = function() {
            var _this = this;
            var _a;
            var elWindow = getElementWindow(this.el);
            this.el.addEventListener("mouseenter", this.onMouseEnter);
            this.el.addEventListener("pointerdown", this.onPointerEvent, true);
            this.el.addEventListener("mousemove", this.onMouseMove);
            this.el.addEventListener("mouseleave", this.onMouseLeave);
            (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", this.onScroll);
            elWindow.addEventListener("resize", this.onWindowResize);
            if (!this.contentEl) return;
            if (window.ResizeObserver) {
                var resizeObserverStarted_1 = false;
                var resizeObserver = elWindow.ResizeObserver || ResizeObserver;
                this.resizeObserver = new resizeObserver((function() {
                    if (!resizeObserverStarted_1) return;
                    elWindow.requestAnimationFrame((function() {
                        _this.recalculate();
                    }));
                }));
                this.resizeObserver.observe(this.el);
                this.resizeObserver.observe(this.contentEl);
                elWindow.requestAnimationFrame((function() {
                    resizeObserverStarted_1 = true;
                }));
            }
            this.mutationObserver = new elWindow.MutationObserver((function() {
                elWindow.requestAnimationFrame((function() {
                    _this.recalculate();
                }));
            }));
            this.mutationObserver.observe(this.contentEl, {
                childList: true,
                subtree: true,
                characterData: true
            });
        };
        SimpleBarCore.prototype.recalculate = function() {
            if (!this.heightAutoObserverEl || !this.contentEl || !this.contentWrapperEl || !this.wrapperEl || !this.placeholderEl) return;
            var elWindow = getElementWindow(this.el);
            this.elStyles = elWindow.getComputedStyle(this.el);
            this.isRtl = this.elStyles.direction === "rtl";
            var contentElOffsetWidth = this.contentEl.offsetWidth;
            var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
            var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1 || contentElOffsetWidth > 0;
            var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
            var elOverflowX = this.elStyles.overflowX;
            var elOverflowY = this.elStyles.overflowY;
            this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
            this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
            var contentElScrollHeight = this.contentEl.scrollHeight;
            var contentElScrollWidth = this.contentEl.scrollWidth;
            this.contentWrapperEl.style.height = isHeightAuto ? "auto" : "100%";
            this.placeholderEl.style.width = isWidthAuto ? "".concat(contentElOffsetWidth || contentElScrollWidth, "px") : "auto";
            this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
            var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
            this.axis.x.isOverflowing = contentElOffsetWidth !== 0 && contentElScrollWidth > contentElOffsetWidth;
            this.axis.y.isOverflowing = contentElScrollHeight > contentWrapperElOffsetHeight;
            this.axis.x.isOverflowing = elOverflowX === "hidden" ? false : this.axis.x.isOverflowing;
            this.axis.y.isOverflowing = elOverflowY === "hidden" ? false : this.axis.y.isOverflowing;
            this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === true;
            this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === true;
            this.hideNativeScrollbar();
            var offsetForXScrollbar = this.axis.x.isOverflowing ? this.scrollbarWidth : 0;
            var offsetForYScrollbar = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
            this.axis.x.isOverflowing = this.axis.x.isOverflowing && contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
            this.axis.y.isOverflowing = this.axis.y.isOverflowing && contentElScrollHeight > contentWrapperElOffsetHeight - offsetForXScrollbar;
            this.axis.x.scrollbar.size = this.getScrollbarSize("x");
            this.axis.y.scrollbar.size = this.getScrollbarSize("y");
            if (this.axis.x.scrollbar.el) this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
            if (this.axis.y.scrollbar.el) this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
            this.positionScrollbar("x");
            this.positionScrollbar("y");
            this.toggleTrackVisibility("x");
            this.toggleTrackVisibility("y");
        };
        SimpleBarCore.prototype.getScrollbarSize = function(axis) {
            var _a, _b;
            if (axis === void 0) axis = "y";
            if (!this.axis[axis].isOverflowing || !this.contentEl) return 0;
            var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
            var trackSize = (_b = (_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) !== null && _b !== void 0 ? _b : 0;
            var scrollbarRatio = trackSize / contentSize;
            var scrollbarSize;
            scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);
            if (this.options.scrollbarMaxSize) scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
            return scrollbarSize;
        };
        SimpleBarCore.prototype.positionScrollbar = function(axis) {
            var _a, _b, _c;
            if (axis === void 0) axis = "y";
            var scrollbar = this.axis[axis].scrollbar;
            if (!this.axis[axis].isOverflowing || !this.contentWrapperEl || !scrollbar.el || !this.elStyles) return;
            var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
            var trackSize = ((_a = this.axis[axis].track.el) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetSizeAttr]) || 0;
            var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
            var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
            scrollOffset = axis === "x" && this.isRtl && ((_b = SimpleBarCore.getRtlHelpers()) === null || _b === void 0 ? void 0 : _b.isScrollOriginAtZero) ? -scrollOffset : scrollOffset;
            if (axis === "x" && this.isRtl) scrollOffset = ((_c = SimpleBarCore.getRtlHelpers()) === null || _c === void 0 ? void 0 : _c.isScrollingToNegative) ? scrollOffset : -scrollOffset;
            var scrollPourcent = scrollOffset / (contentSize - hostSize);
            var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
            handleOffset = axis === "x" && this.isRtl ? -handleOffset + (trackSize - scrollbar.size) : handleOffset;
            scrollbar.el.style.transform = axis === "x" ? "translate3d(".concat(handleOffset, "px, 0, 0)") : "translate3d(0, ".concat(handleOffset, "px, 0)");
        };
        SimpleBarCore.prototype.toggleTrackVisibility = function(axis) {
            if (axis === void 0) axis = "y";
            var track = this.axis[axis].track.el;
            var scrollbar = this.axis[axis].scrollbar.el;
            if (!track || !scrollbar || !this.contentWrapperEl) return;
            if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
                track.style.visibility = "visible";
                this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "scroll";
                this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(axis));
            } else {
                track.style.visibility = "hidden";
                this.contentWrapperEl.style[this.axis[axis].overflowAttr] = "hidden";
                this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(axis));
            }
            if (this.axis[axis].isOverflowing) scrollbar.style.display = "block"; else scrollbar.style.display = "none";
        };
        SimpleBarCore.prototype.showScrollbar = function(axis) {
            if (axis === void 0) axis = "y";
            if (this.axis[axis].isOverflowing && !this.axis[axis].scrollbar.isVisible) {
                addClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
                this.axis[axis].scrollbar.isVisible = true;
            }
        };
        SimpleBarCore.prototype.hideScrollbar = function(axis) {
            if (axis === void 0) axis = "y";
            if (this.isDragging) return;
            if (this.axis[axis].isOverflowing && this.axis[axis].scrollbar.isVisible) {
                dist_removeClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
                this.axis[axis].scrollbar.isVisible = false;
            }
        };
        SimpleBarCore.prototype.hideNativeScrollbar = function() {
            if (!this.offsetEl) return;
            this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px";
            this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px";
        };
        SimpleBarCore.prototype.onMouseMoveForAxis = function(axis) {
            if (axis === void 0) axis = "y";
            var currentAxis = this.axis[axis];
            if (!currentAxis.track.el || !currentAxis.scrollbar.el) return;
            currentAxis.track.rect = currentAxis.track.el.getBoundingClientRect();
            currentAxis.scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
            if (this.isWithinBounds(currentAxis.track.rect)) {
                this.showScrollbar(axis);
                addClasses(currentAxis.track.el, this.classNames.hover);
                if (this.isWithinBounds(currentAxis.scrollbar.rect)) addClasses(currentAxis.scrollbar.el, this.classNames.hover); else dist_removeClasses(currentAxis.scrollbar.el, this.classNames.hover);
            } else {
                dist_removeClasses(currentAxis.track.el, this.classNames.hover);
                if (this.options.autoHide) this.hideScrollbar(axis);
            }
        };
        SimpleBarCore.prototype.onMouseLeaveForAxis = function(axis) {
            if (axis === void 0) axis = "y";
            dist_removeClasses(this.axis[axis].track.el, this.classNames.hover);
            dist_removeClasses(this.axis[axis].scrollbar.el, this.classNames.hover);
            if (this.options.autoHide) this.hideScrollbar(axis);
        };
        SimpleBarCore.prototype.onDragStart = function(e, axis) {
            var _a;
            if (axis === void 0) axis = "y";
            this.isDragging = true;
            var elDocument = getElementDocument(this.el);
            var elWindow = getElementWindow(this.el);
            var scrollbar = this.axis[axis].scrollbar;
            var eventOffset = axis === "y" ? e.pageY : e.pageX;
            this.axis[axis].dragOffset = eventOffset - (((_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) || 0);
            this.draggedAxis = axis;
            addClasses(this.el, this.classNames.dragging);
            elDocument.addEventListener("mousemove", this.drag, true);
            elDocument.addEventListener("mouseup", this.onEndDrag, true);
            if (this.removePreventClickId === null) {
                elDocument.addEventListener("click", this.preventClick, true);
                elDocument.addEventListener("dblclick", this.preventClick, true);
            } else {
                elWindow.clearTimeout(this.removePreventClickId);
                this.removePreventClickId = null;
            }
        };
        SimpleBarCore.prototype.onTrackClick = function(e, axis) {
            var _this = this;
            var _a, _b, _c, _d;
            if (axis === void 0) axis = "y";
            var currentAxis = this.axis[axis];
            if (!this.options.clickOnTrack || !currentAxis.scrollbar.el || !this.contentWrapperEl) return;
            e.preventDefault();
            var elWindow = getElementWindow(this.el);
            this.axis[axis].scrollbar.rect = currentAxis.scrollbar.el.getBoundingClientRect();
            var scrollbar = this.axis[axis].scrollbar;
            var scrollbarOffset = (_b = (_a = scrollbar.rect) === null || _a === void 0 ? void 0 : _a[this.axis[axis].offsetAttr]) !== null && _b !== void 0 ? _b : 0;
            var hostSize = parseInt((_d = (_c = this.elStyles) === null || _c === void 0 ? void 0 : _c[this.axis[axis].sizeAttr]) !== null && _d !== void 0 ? _d : "0px", 10);
            var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
            var t = axis === "y" ? this.mouseY - scrollbarOffset : this.mouseX - scrollbarOffset;
            var dir = t < 0 ? -1 : 1;
            var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
            var speed = 40;
            var scrollTo = function() {
                if (!_this.contentWrapperEl) return;
                if (dir === -1) {
                    if (scrolled > scrollSize) {
                        scrolled -= speed;
                        _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                        elWindow.requestAnimationFrame(scrollTo);
                    }
                } else if (scrolled < scrollSize) {
                    scrolled += speed;
                    _this.contentWrapperEl[_this.axis[axis].scrollOffsetAttr] = scrolled;
                    elWindow.requestAnimationFrame(scrollTo);
                }
            };
            scrollTo();
        };
        SimpleBarCore.prototype.getContentElement = function() {
            return this.contentEl;
        };
        SimpleBarCore.prototype.getScrollElement = function() {
            return this.contentWrapperEl;
        };
        SimpleBarCore.prototype.removeListeners = function() {
            var elWindow = getElementWindow(this.el);
            this.el.removeEventListener("mouseenter", this.onMouseEnter);
            this.el.removeEventListener("pointerdown", this.onPointerEvent, true);
            this.el.removeEventListener("mousemove", this.onMouseMove);
            this.el.removeEventListener("mouseleave", this.onMouseLeave);
            if (this.contentWrapperEl) this.contentWrapperEl.removeEventListener("scroll", this.onScroll);
            elWindow.removeEventListener("resize", this.onWindowResize);
            if (this.mutationObserver) this.mutationObserver.disconnect();
            if (this.resizeObserver) this.resizeObserver.disconnect();
            this.onMouseMove.cancel();
            this.onWindowResize.cancel();
            this.onStopScrolling.cancel();
            this.onMouseEntered.cancel();
        };
        SimpleBarCore.prototype.unMount = function() {
            this.removeListeners();
        };
        SimpleBarCore.prototype.isWithinBounds = function(bbox) {
            return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
        };
        SimpleBarCore.prototype.findChild = function(el, query) {
            var matches = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
            return Array.prototype.filter.call(el.children, (function(child) {
                return matches.call(child, query);
            }))[0];
        };
        SimpleBarCore.rtlHelpers = null;
        SimpleBarCore.defaultOptions = {
            forceVisible: false,
            clickOnTrack: true,
            scrollbarMinSize: 25,
            scrollbarMaxSize: 0,
            ariaLabel: "scrollable content",
            tabIndex: 0,
            classNames: {
                contentEl: "simplebar-content",
                contentWrapper: "simplebar-content-wrapper",
                offset: "simplebar-offset",
                mask: "simplebar-mask",
                wrapper: "simplebar-wrapper",
                placeholder: "simplebar-placeholder",
                scrollbar: "simplebar-scrollbar",
                track: "simplebar-track",
                heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
                heightAutoObserverEl: "simplebar-height-auto-observer",
                visible: "simplebar-visible",
                horizontal: "simplebar-horizontal",
                vertical: "simplebar-vertical",
                hover: "simplebar-hover",
                dragging: "simplebar-dragging",
                scrolling: "simplebar-scrolling",
                scrollable: "simplebar-scrollable",
                mouseEntered: "simplebar-mouse-entered"
            },
            scrollableNode: null,
            contentNode: null,
            autoHide: true
        };
        SimpleBarCore.getOptions = getOptions;
        SimpleBarCore.helpers = helpers;
        return SimpleBarCore;
    }();
    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
    }
    var _a = SimpleBarCore.helpers, dist_getOptions = _a.getOptions, dist_addClasses = _a.addClasses, dist_canUseDOM = _a.canUseDOM;
    var SimpleBar = function(_super) {
        __extends(SimpleBar, _super);
        function SimpleBar() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            var _this = _super.apply(this, args) || this;
            SimpleBar.instances.set(args[0], _this);
            return _this;
        }
        SimpleBar.initDOMLoadedElements = function() {
            document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements);
            window.removeEventListener("load", this.initDOMLoadedElements);
            Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), (function(el) {
                if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el)) new SimpleBar(el, dist_getOptions(el.attributes));
            }));
        };
        SimpleBar.removeObserver = function() {
            var _a;
            (_a = SimpleBar.globalObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
        SimpleBar.prototype.initDOM = function() {
            var _this = this;
            var _a, _b, _c;
            if (!Array.prototype.filter.call(this.el.children, (function(child) {
                return child.classList.contains(_this.classNames.wrapper);
            })).length) {
                this.wrapperEl = document.createElement("div");
                this.contentWrapperEl = document.createElement("div");
                this.offsetEl = document.createElement("div");
                this.maskEl = document.createElement("div");
                this.contentEl = document.createElement("div");
                this.placeholderEl = document.createElement("div");
                this.heightAutoObserverWrapperEl = document.createElement("div");
                this.heightAutoObserverEl = document.createElement("div");
                dist_addClasses(this.wrapperEl, this.classNames.wrapper);
                dist_addClasses(this.contentWrapperEl, this.classNames.contentWrapper);
                dist_addClasses(this.offsetEl, this.classNames.offset);
                dist_addClasses(this.maskEl, this.classNames.mask);
                dist_addClasses(this.contentEl, this.classNames.contentEl);
                dist_addClasses(this.placeholderEl, this.classNames.placeholder);
                dist_addClasses(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl);
                dist_addClasses(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl);
                while (this.el.firstChild) this.contentEl.appendChild(this.el.firstChild);
                this.contentWrapperEl.appendChild(this.contentEl);
                this.offsetEl.appendChild(this.contentWrapperEl);
                this.maskEl.appendChild(this.offsetEl);
                this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
                this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
                this.wrapperEl.appendChild(this.maskEl);
                this.wrapperEl.appendChild(this.placeholderEl);
                this.el.appendChild(this.wrapperEl);
                (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.setAttribute("tabindex", this.options.tabIndex.toString());
                (_b = this.contentWrapperEl) === null || _b === void 0 ? void 0 : _b.setAttribute("role", "region");
                (_c = this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c.setAttribute("aria-label", this.options.ariaLabel);
            }
            if (!this.axis.x.track.el || !this.axis.y.track.el) {
                var track = document.createElement("div");
                var scrollbar = document.createElement("div");
                dist_addClasses(track, this.classNames.track);
                dist_addClasses(scrollbar, this.classNames.scrollbar);
                track.appendChild(scrollbar);
                this.axis.x.track.el = track.cloneNode(true);
                dist_addClasses(this.axis.x.track.el, this.classNames.horizontal);
                this.axis.y.track.el = track.cloneNode(true);
                dist_addClasses(this.axis.y.track.el, this.classNames.vertical);
                this.el.appendChild(this.axis.x.track.el);
                this.el.appendChild(this.axis.y.track.el);
            }
            SimpleBarCore.prototype.initDOM.call(this);
            this.el.setAttribute("data-simplebar", "init");
        };
        SimpleBar.prototype.unMount = function() {
            SimpleBarCore.prototype.unMount.call(this);
            SimpleBar.instances["delete"](this.el);
        };
        SimpleBar.initHtmlApi = function() {
            this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);
            if (typeof MutationObserver !== "undefined") {
                this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
                this.globalObserver.observe(document, {
                    childList: true,
                    subtree: true
                });
            }
            if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) window.setTimeout(this.initDOMLoadedElements); else {
                document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements);
                window.addEventListener("load", this.initDOMLoadedElements);
            }
        };
        SimpleBar.handleMutations = function(mutations) {
            mutations.forEach((function(mutation) {
                mutation.addedNodes.forEach((function(addedNode) {
                    if (addedNode.nodeType === 1) if (addedNode.hasAttribute("data-simplebar")) !SimpleBar.instances.has(addedNode) && document.documentElement.contains(addedNode) && new SimpleBar(addedNode, dist_getOptions(addedNode.attributes)); else addedNode.querySelectorAll("[data-simplebar]").forEach((function(el) {
                        if (el.getAttribute("data-simplebar") !== "init" && !SimpleBar.instances.has(el) && document.documentElement.contains(el)) new SimpleBar(el, dist_getOptions(el.attributes));
                    }));
                }));
                mutation.removedNodes.forEach((function(removedNode) {
                    var _a;
                    if (removedNode.nodeType === 1) if (removedNode.getAttribute("data-simplebar") === "init") !document.documentElement.contains(removedNode) && ((_a = SimpleBar.instances.get(removedNode)) === null || _a === void 0 ? void 0 : _a.unMount()); else Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), (function(el) {
                        var _a;
                        !document.documentElement.contains(el) && ((_a = SimpleBar.instances.get(el)) === null || _a === void 0 ? void 0 : _a.unMount());
                    }));
                }));
            }));
        };
        SimpleBar.instances = new WeakMap;
        return SimpleBar;
    }(SimpleBarCore);
    if (dist_canUseDOM) SimpleBar.initHtmlApi();
    if (document.querySelectorAll("[data-simplebar]").length) document.querySelectorAll("[data-simplebar]").forEach((scrollBlock => {
        new SimpleBar(scrollBlock, {
            autoHide: false
        });
    }));
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach((node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                const parentSelectorMatch = dataArray[0].trim().match(/^\{(.+)\}(?:\s*(.+)?)$/);
                if (parentSelectorMatch) {
                    const parentSelector = parentSelectorMatch[1].trim();
                    const childSelector = parentSelectorMatch[2] ? parentSelectorMatch[2].trim() : null;
                    const parentElement = node.closest(parentSelector);
                    if (parentElement) оbject.destination = childSelector ? parentElement.querySelector(childSelector) : parentElement;
                } else оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767.98";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }));
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map((({breakpoint}) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`)).filter(((item, index, self) => self.indexOf(item) === index));
            this.mediaQueries.forEach((media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter((({breakpoint}) => breakpoint === mediaBreakpoint));
                matchMedia.addEventListener("change", (() => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }));
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach((оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            })); else оbjects.forEach((({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            }));
        }
        moveTo(place, element, destination) {
            if (!destination) return;
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort(((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                arr.sort(((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    /**
* Muuri v0.9.5
* https://muuri.dev/
* Copyright (c) 2015-present, Haltu Oy
* Released under the MIT license
* https://github.com/haltu/muuri/blob/master/LICENSE.md
* @license MIT
*
* Muuri Packer
* Copyright (c) 2016-present, Niklas Rämö <inramo@gmail.com>
* @license MIT
*
* Muuri Ticker / Muuri Emitter / Muuri Dragger
* Copyright (c) 2018-present, Niklas Rämö <inramo@gmail.com>
* @license MIT
*
* Muuri AutoScroller
* Copyright (c) 2019-present, Niklas Rämö <inramo@gmail.com>
* @license MIT
*/
    var GRID_INSTANCES = {};
    var ITEM_ELEMENT_MAP = typeof Map === "function" ? new Map : null;
    var ACTION_SWAP = "swap";
    var ACTION_MOVE = "move";
    var EVENT_SYNCHRONIZE = "synchronize";
    var EVENT_LAYOUT_START = "layoutStart";
    var EVENT_LAYOUT_END = "layoutEnd";
    var EVENT_LAYOUT_ABORT = "layoutAbort";
    var EVENT_ADD = "add";
    var EVENT_REMOVE = "remove";
    var EVENT_SHOW_START = "showStart";
    var EVENT_SHOW_END = "showEnd";
    var EVENT_HIDE_START = "hideStart";
    var EVENT_HIDE_END = "hideEnd";
    var EVENT_FILTER = "filter";
    var EVENT_SORT = "sort";
    var muuri_module_EVENT_MOVE = "move";
    var EVENT_SEND = "send";
    var EVENT_BEFORE_SEND = "beforeSend";
    var EVENT_RECEIVE = "receive";
    var EVENT_BEFORE_RECEIVE = "beforeReceive";
    var EVENT_DRAG_INIT = "dragInit";
    var EVENT_DRAG_START = "dragStart";
    var EVENT_DRAG_MOVE = "dragMove";
    var EVENT_DRAG_SCROLL = "dragScroll";
    var EVENT_DRAG_END = "dragEnd";
    var EVENT_DRAG_RELEASE_START = "dragReleaseStart";
    var EVENT_DRAG_RELEASE_END = "dragReleaseEnd";
    var muuri_module_EVENT_DESTROY = "destroy";
    var HAS_TOUCH_EVENTS = "ontouchstart" in window;
    var HAS_POINTER_EVENTS = !!window.PointerEvent;
    var HAS_MS_POINTER_EVENTS = !!window.navigator.msPointerEnabled;
    var MAX_SAFE_FLOAT32_INTEGER = 16777216;
    function Emitter() {
        this._events = {};
        this._queue = [];
        this._counter = 0;
        this._clearOnEmit = false;
    }
    Emitter.prototype.on = function(event, listener) {
        if (!this._events || !event || !listener) return this;
        var listeners = this._events[event];
        if (!listeners) listeners = this._events[event] = [];
        listeners.push(listener);
        return this;
    };
    Emitter.prototype.off = function(event, listener) {
        if (!this._events || !event || !listener) return this;
        var listeners = this._events[event];
        if (!listeners || !listeners.length) return this;
        var index;
        while ((index = listeners.indexOf(listener)) !== -1) listeners.splice(index, 1);
        return this;
    };
    Emitter.prototype.clear = function(event) {
        if (!this._events || !event) return this;
        var listeners = this._events[event];
        if (listeners) {
            listeners.length = 0;
            delete this._events[event];
        }
        return this;
    };
    Emitter.prototype.emit = function(event) {
        if (!this._events || !event) {
            this._clearOnEmit = false;
            return this;
        }
        var listeners = this._events[event];
        if (!listeners || !listeners.length) {
            this._clearOnEmit = false;
            return this;
        }
        var queue = this._queue;
        var startIndex = queue.length;
        var argsLength = arguments.length - 1;
        var args;
        if (argsLength > 3) {
            args = [];
            args.push.apply(args, arguments);
            args.shift();
        }
        queue.push.apply(queue, listeners);
        if (this._clearOnEmit) {
            listeners.length = 0;
            this._clearOnEmit = false;
        }
        ++this._counter;
        var i = startIndex;
        var endIndex = queue.length;
        for (;i < endIndex; i++) {
            argsLength === 0 ? queue[i]() : argsLength === 1 ? queue[i](arguments[1]) : argsLength === 2 ? queue[i](arguments[1], arguments[2]) : argsLength === 3 ? queue[i](arguments[1], arguments[2], arguments[3]) : queue[i].apply(null, args);
            if (!this._events) return this;
        }
        --this._counter;
        if (!this._counter) queue.length = 0;
        return this;
    };
    Emitter.prototype.burst = function() {
        if (!this._events) return this;
        this._clearOnEmit = true;
        this.emit.apply(this, arguments);
        return this;
    };
    Emitter.prototype.countListeners = function(event) {
        if (!this._events) return 0;
        var listeners = this._events[event];
        return listeners ? listeners.length : 0;
    };
    Emitter.prototype.destroy = function() {
        if (!this._events) return this;
        this._queue.length = this._counter = 0;
        this._events = null;
        return this;
    };
    var pointerout = HAS_POINTER_EVENTS ? "pointerout" : HAS_MS_POINTER_EVENTS ? "MSPointerOut" : "";
    var waitDuration = 100;
    function EdgeHack(dragger) {
        if (!pointerout) return;
        this._dragger = dragger;
        this._timeout = null;
        this._outEvent = null;
        this._isActive = false;
        this._addBehaviour = this._addBehaviour.bind(this);
        this._removeBehaviour = this._removeBehaviour.bind(this);
        this._onTimeout = this._onTimeout.bind(this);
        this._resetData = this._resetData.bind(this);
        this._onStart = this._onStart.bind(this);
        this._onOut = this._onOut.bind(this);
        this._dragger.on("start", this._onStart);
    }
    EdgeHack.prototype._addBehaviour = function() {
        if (this._isActive) return;
        this._isActive = true;
        this._dragger.on("move", this._resetData);
        this._dragger.on("cancel", this._removeBehaviour);
        this._dragger.on("end", this._removeBehaviour);
        window.addEventListener(pointerout, this._onOut);
    };
    EdgeHack.prototype._removeBehaviour = function() {
        if (!this._isActive) return;
        this._dragger.off("move", this._resetData);
        this._dragger.off("cancel", this._removeBehaviour);
        this._dragger.off("end", this._removeBehaviour);
        window.removeEventListener(pointerout, this._onOut);
        this._resetData();
        this._isActive = false;
    };
    EdgeHack.prototype._resetData = function() {
        window.clearTimeout(this._timeout);
        this._timeout = null;
        this._outEvent = null;
    };
    EdgeHack.prototype._onStart = function(e) {
        if (e.pointerType === "mouse") return;
        this._addBehaviour();
    };
    EdgeHack.prototype._onOut = function(e) {
        if (!this._dragger._getTrackedTouch(e)) return;
        this._resetData();
        this._outEvent = e;
        this._timeout = window.setTimeout(this._onTimeout, waitDuration);
    };
    EdgeHack.prototype._onTimeout = function() {
        var e = this._outEvent;
        this._resetData();
        if (this._dragger.isActive()) this._dragger._onCancel(e);
    };
    EdgeHack.prototype.destroy = function() {
        if (!pointerout) return;
        this._dragger.off("start", this._onStart);
        this._removeBehaviour();
    };
    var vendorPrefixes = [ "", "webkit", "moz", "ms", "o", "Webkit", "Moz", "MS", "O" ];
    var cache$2 = {};
    function getPrefixedPropName(style, prop) {
        var prefixedProp = cache$2[prop] || "";
        if (prefixedProp) return prefixedProp;
        var camelProp = prop[0].toUpperCase() + prop.slice(1);
        var i = 0;
        while (i < vendorPrefixes.length) {
            prefixedProp = vendorPrefixes[i] ? vendorPrefixes[i] + camelProp : prop;
            if (prefixedProp in style) {
                cache$2[prop] = prefixedProp;
                return prefixedProp;
            }
            ++i;
        }
        return "";
    }
    function hasPassiveEvents() {
        var isPassiveEventsSupported = false;
        try {
            var passiveOpts = Object.defineProperty({}, "passive", {
                get: function() {
                    isPassiveEventsSupported = true;
                }
            });
            window.addEventListener("testPassive", null, passiveOpts);
            window.removeEventListener("testPassive", null, passiveOpts);
        } catch (e) {}
        return isPassiveEventsSupported;
    }
    var ua = window.navigator.userAgent.toLowerCase();
    var isEdge = ua.indexOf("edge") > -1;
    var isIE = ua.indexOf("trident") > -1;
    var isFirefox = ua.indexOf("firefox") > -1;
    var isAndroid = ua.indexOf("android") > -1;
    var listenerOptions = hasPassiveEvents() ? {
        passive: true
    } : false;
    var taProp = "touchAction";
    var taPropPrefixed = getPrefixedPropName(document.documentElement.style, taProp);
    var taDefaultValue = "auto";
    function Dragger(element, cssProps) {
        this._element = element;
        this._emitter = new Emitter;
        this._isDestroyed = false;
        this._cssProps = {};
        this._touchAction = "";
        this._isActive = false;
        this._pointerId = null;
        this._startTime = 0;
        this._startX = 0;
        this._startY = 0;
        this._currentX = 0;
        this._currentY = 0;
        this._onStart = this._onStart.bind(this);
        this._onMove = this._onMove.bind(this);
        this._onCancel = this._onCancel.bind(this);
        this._onEnd = this._onEnd.bind(this);
        this._edgeHack = null;
        if ((isEdge || isIE) && (HAS_POINTER_EVENTS || HAS_MS_POINTER_EVENTS)) this._edgeHack = new EdgeHack(this);
        this.setCssProps(cssProps);
        if (!this._touchAction) this.setTouchAction(taDefaultValue);
        element.addEventListener("dragstart", Dragger._preventDefault, false);
        element.addEventListener(Dragger._inputEvents.start, this._onStart, listenerOptions);
    }
    Dragger._pointerEvents = {
        start: "pointerdown",
        move: "pointermove",
        cancel: "pointercancel",
        end: "pointerup"
    };
    Dragger._msPointerEvents = {
        start: "MSPointerDown",
        move: "MSPointerMove",
        cancel: "MSPointerCancel",
        end: "MSPointerUp"
    };
    Dragger._touchEvents = {
        start: "touchstart",
        move: "touchmove",
        cancel: "touchcancel",
        end: "touchend"
    };
    Dragger._mouseEvents = {
        start: "mousedown",
        move: "mousemove",
        cancel: "",
        end: "mouseup"
    };
    Dragger._inputEvents = function() {
        if (HAS_TOUCH_EVENTS) return Dragger._touchEvents;
        if (HAS_POINTER_EVENTS) return Dragger._pointerEvents;
        if (HAS_MS_POINTER_EVENTS) return Dragger._msPointerEvents;
        return Dragger._mouseEvents;
    }();
    Dragger._emitter = new Emitter;
    Dragger._emitterEvents = {
        start: "start",
        move: "move",
        end: "end",
        cancel: "cancel"
    };
    Dragger._activeInstances = [];
    Dragger._preventDefault = function(e) {
        if (e.preventDefault && e.cancelable !== false) e.preventDefault();
    };
    Dragger._activateInstance = function(instance) {
        var index = Dragger._activeInstances.indexOf(instance);
        if (index > -1) return;
        Dragger._activeInstances.push(instance);
        Dragger._emitter.on(Dragger._emitterEvents.move, instance._onMove);
        Dragger._emitter.on(Dragger._emitterEvents.cancel, instance._onCancel);
        Dragger._emitter.on(Dragger._emitterEvents.end, instance._onEnd);
        if (Dragger._activeInstances.length === 1) Dragger._bindListeners();
    };
    Dragger._deactivateInstance = function(instance) {
        var index = Dragger._activeInstances.indexOf(instance);
        if (index === -1) return;
        Dragger._activeInstances.splice(index, 1);
        Dragger._emitter.off(Dragger._emitterEvents.move, instance._onMove);
        Dragger._emitter.off(Dragger._emitterEvents.cancel, instance._onCancel);
        Dragger._emitter.off(Dragger._emitterEvents.end, instance._onEnd);
        if (!Dragger._activeInstances.length) Dragger._unbindListeners();
    };
    Dragger._bindListeners = function() {
        window.addEventListener(Dragger._inputEvents.move, Dragger._onMove, listenerOptions);
        window.addEventListener(Dragger._inputEvents.end, Dragger._onEnd, listenerOptions);
        if (Dragger._inputEvents.cancel) window.addEventListener(Dragger._inputEvents.cancel, Dragger._onCancel, listenerOptions);
    };
    Dragger._unbindListeners = function() {
        window.removeEventListener(Dragger._inputEvents.move, Dragger._onMove, listenerOptions);
        window.removeEventListener(Dragger._inputEvents.end, Dragger._onEnd, listenerOptions);
        if (Dragger._inputEvents.cancel) window.removeEventListener(Dragger._inputEvents.cancel, Dragger._onCancel, listenerOptions);
    };
    Dragger._getEventPointerId = function(event) {
        if (typeof event.pointerId === "number") return event.pointerId;
        if (event.changedTouches) return event.changedTouches[0] ? event.changedTouches[0].identifier : null;
        return 1;
    };
    Dragger._getTouchById = function(event, id) {
        if (typeof event.pointerId === "number") return event.pointerId === id ? event : null;
        if (event.changedTouches) {
            for (var i = 0; i < event.changedTouches.length; i++) if (event.changedTouches[i].identifier === id) return event.changedTouches[i];
            return null;
        }
        return event;
    };
    Dragger._onMove = function(e) {
        Dragger._emitter.emit(Dragger._emitterEvents.move, e);
    };
    Dragger._onCancel = function(e) {
        Dragger._emitter.emit(Dragger._emitterEvents.cancel, e);
    };
    Dragger._onEnd = function(e) {
        Dragger._emitter.emit(Dragger._emitterEvents.end, e);
    };
    Dragger.prototype._reset = function() {
        this._pointerId = null;
        this._startTime = 0;
        this._startX = 0;
        this._startY = 0;
        this._currentX = 0;
        this._currentY = 0;
        this._isActive = false;
        Dragger._deactivateInstance(this);
    };
    Dragger.prototype._createEvent = function(type, e) {
        var touch = this._getTrackedTouch(e);
        return {
            type,
            srcEvent: e,
            distance: this.getDistance(),
            deltaX: this.getDeltaX(),
            deltaY: this.getDeltaY(),
            deltaTime: type === Dragger._emitterEvents.start ? 0 : this.getDeltaTime(),
            isFirst: type === Dragger._emitterEvents.start,
            isFinal: type === Dragger._emitterEvents.end || type === Dragger._emitterEvents.cancel,
            pointerType: e.pointerType || (e.touches ? "touch" : "mouse"),
            identifier: this._pointerId,
            screenX: touch.screenX,
            screenY: touch.screenY,
            clientX: touch.clientX,
            clientY: touch.clientY,
            pageX: touch.pageX,
            pageY: touch.pageY,
            target: touch.target
        };
    };
    Dragger.prototype._emit = function(type, e) {
        this._emitter.emit(type, this._createEvent(type, e));
    };
    Dragger.prototype._getTrackedTouch = function(e) {
        if (this._pointerId === null) return null;
        return Dragger._getTouchById(e, this._pointerId);
    };
    Dragger.prototype._onStart = function(e) {
        if (this._isDestroyed) return;
        if (this._pointerId !== null) return;
        this._pointerId = Dragger._getEventPointerId(e);
        if (this._pointerId === null) return;
        var touch = this._getTrackedTouch(e);
        this._startX = this._currentX = touch.clientX;
        this._startY = this._currentY = touch.clientY;
        this._startTime = Date.now();
        this._isActive = true;
        this._emit(Dragger._emitterEvents.start, e);
        if (this._isActive) Dragger._activateInstance(this);
    };
    Dragger.prototype._onMove = function(e) {
        var touch = this._getTrackedTouch(e);
        if (!touch) return;
        this._currentX = touch.clientX;
        this._currentY = touch.clientY;
        this._emit(Dragger._emitterEvents.move, e);
    };
    Dragger.prototype._onCancel = function(e) {
        if (!this._getTrackedTouch(e)) return;
        this._emit(Dragger._emitterEvents.cancel, e);
        this._reset();
    };
    Dragger.prototype._onEnd = function(e) {
        if (!this._getTrackedTouch(e)) return;
        this._emit(Dragger._emitterEvents.end, e);
        this._reset();
    };
    Dragger.prototype.isActive = function() {
        return this._isActive;
    };
    Dragger.prototype.setTouchAction = function(value) {
        this._touchAction = value;
        if (taPropPrefixed) {
            this._cssProps[taPropPrefixed] = "";
            this._element.style[taPropPrefixed] = value;
        }
        if (HAS_TOUCH_EVENTS) {
            this._element.removeEventListener(Dragger._touchEvents.start, Dragger._preventDefault, true);
            if (this._element.style[taPropPrefixed] !== value || isFirefox && isAndroid) this._element.addEventListener(Dragger._touchEvents.start, Dragger._preventDefault, true);
        }
    };
    Dragger.prototype.setCssProps = function(newProps) {
        if (!newProps) return;
        var currentProps = this._cssProps;
        var element = this._element;
        var prop;
        var prefixedProp;
        for (prop in currentProps) {
            element.style[prop] = currentProps[prop];
            delete currentProps[prop];
        }
        for (prop in newProps) {
            if (!newProps[prop]) continue;
            if (prop === taProp) {
                this.setTouchAction(newProps[prop]);
                continue;
            }
            prefixedProp = getPrefixedPropName(element.style, prop);
            if (!prefixedProp) continue;
            currentProps[prefixedProp] = "";
            element.style[prefixedProp] = newProps[prop];
        }
    };
    Dragger.prototype.getDeltaX = function() {
        return this._currentX - this._startX;
    };
    Dragger.prototype.getDeltaY = function() {
        return this._currentY - this._startY;
    };
    Dragger.prototype.getDistance = function() {
        var x = this.getDeltaX();
        var y = this.getDeltaY();
        return Math.sqrt(x * x + y * y);
    };
    Dragger.prototype.getDeltaTime = function() {
        return this._startTime ? Date.now() - this._startTime : 0;
    };
    Dragger.prototype.on = function(eventName, listener) {
        this._emitter.on(eventName, listener);
    };
    Dragger.prototype.off = function(eventName, listener) {
        this._emitter.off(eventName, listener);
    };
    Dragger.prototype.destroy = function() {
        if (this._isDestroyed) return;
        var element = this._element;
        if (this._edgeHack) this._edgeHack.destroy();
        this._reset();
        this._emitter.destroy();
        element.removeEventListener(Dragger._inputEvents.start, this._onStart, listenerOptions);
        element.removeEventListener("dragstart", Dragger._preventDefault, false);
        element.removeEventListener(Dragger._touchEvents.start, Dragger._preventDefault, true);
        for (var prop in this._cssProps) {
            element.style[prop] = this._cssProps[prop];
            delete this._cssProps[prop];
        }
        this._element = null;
        this._isDestroyed = true;
    };
    var dt = 1e3 / 60;
    var muuri_module_raf = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return this.setTimeout((function() {
            callback(Date.now());
        }), dt);
    }).bind(window);
    function Ticker(numLanes) {
        this._nextStep = null;
        this._lanes = [];
        this._stepQueue = [];
        this._stepCallbacks = {};
        this._step = this._step.bind(this);
        for (var i = 0; i < numLanes; i++) this._lanes.push(new TickerLane);
    }
    Ticker.prototype._step = function(time) {
        var lanes = this._lanes;
        var stepQueue = this._stepQueue;
        var stepCallbacks = this._stepCallbacks;
        var i, j, id, laneQueue, laneCallbacks, laneIndices;
        this._nextStep = null;
        for (i = 0; i < lanes.length; i++) {
            laneQueue = lanes[i].queue;
            laneCallbacks = lanes[i].callbacks;
            laneIndices = lanes[i].indices;
            for (j = 0; j < laneQueue.length; j++) {
                id = laneQueue[j];
                if (!id) continue;
                stepQueue.push(id);
                stepCallbacks[id] = laneCallbacks[id];
                delete laneCallbacks[id];
                delete laneIndices[id];
            }
            laneQueue.length = 0;
        }
        for (i = 0; i < stepQueue.length; i++) {
            id = stepQueue[i];
            if (stepCallbacks[id]) stepCallbacks[id](time);
            delete stepCallbacks[id];
        }
        stepQueue.length = 0;
    };
    Ticker.prototype.add = function(laneIndex, id, callback) {
        this._lanes[laneIndex].add(id, callback);
        if (!this._nextStep) this._nextStep = muuri_module_raf(this._step);
    };
    Ticker.prototype.remove = function(laneIndex, id) {
        this._lanes[laneIndex].remove(id);
    };
    function TickerLane() {
        this.queue = [];
        this.indices = {};
        this.callbacks = {};
    }
    TickerLane.prototype.add = function(id, callback) {
        var index = this.indices[id];
        if (index !== void 0) this.queue[index] = void 0;
        this.queue.push(id);
        this.callbacks[id] = callback;
        this.indices[id] = this.queue.length - 1;
    };
    TickerLane.prototype.remove = function(id) {
        var index = this.indices[id];
        if (index === void 0) return;
        this.queue[index] = void 0;
        delete this.callbacks[id];
        delete this.indices[id];
    };
    var LAYOUT_READ = "layoutRead";
    var LAYOUT_WRITE = "layoutWrite";
    var VISIBILITY_READ = "visibilityRead";
    var VISIBILITY_WRITE = "visibilityWrite";
    var DRAG_START_READ = "dragStartRead";
    var DRAG_START_WRITE = "dragStartWrite";
    var DRAG_MOVE_READ = "dragMoveRead";
    var DRAG_MOVE_WRITE = "dragMoveWrite";
    var DRAG_SCROLL_READ = "dragScrollRead";
    var DRAG_SCROLL_WRITE = "dragScrollWrite";
    var DRAG_SORT_READ = "dragSortRead";
    var PLACEHOLDER_LAYOUT_READ = "placeholderLayoutRead";
    var PLACEHOLDER_LAYOUT_WRITE = "placeholderLayoutWrite";
    var PLACEHOLDER_RESIZE_WRITE = "placeholderResizeWrite";
    var AUTO_SCROLL_READ = "autoScrollRead";
    var AUTO_SCROLL_WRITE = "autoScrollWrite";
    var DEBOUNCE_READ = "debounceRead";
    var LANE_READ = 0;
    var LANE_READ_TAIL = 1;
    var LANE_WRITE = 2;
    var ticker = new Ticker(3);
    function addLayoutTick(itemId, read, write) {
        ticker.add(LANE_READ, LAYOUT_READ + itemId, read);
        ticker.add(LANE_WRITE, LAYOUT_WRITE + itemId, write);
    }
    function cancelLayoutTick(itemId) {
        ticker.remove(LANE_READ, LAYOUT_READ + itemId);
        ticker.remove(LANE_WRITE, LAYOUT_WRITE + itemId);
    }
    function addVisibilityTick(itemId, read, write) {
        ticker.add(LANE_READ, VISIBILITY_READ + itemId, read);
        ticker.add(LANE_WRITE, VISIBILITY_WRITE + itemId, write);
    }
    function cancelVisibilityTick(itemId) {
        ticker.remove(LANE_READ, VISIBILITY_READ + itemId);
        ticker.remove(LANE_WRITE, VISIBILITY_WRITE + itemId);
    }
    function addDragStartTick(itemId, read, write) {
        ticker.add(LANE_READ, DRAG_START_READ + itemId, read);
        ticker.add(LANE_WRITE, DRAG_START_WRITE + itemId, write);
    }
    function cancelDragStartTick(itemId) {
        ticker.remove(LANE_READ, DRAG_START_READ + itemId);
        ticker.remove(LANE_WRITE, DRAG_START_WRITE + itemId);
    }
    function addDragMoveTick(itemId, read, write) {
        ticker.add(LANE_READ, DRAG_MOVE_READ + itemId, read);
        ticker.add(LANE_WRITE, DRAG_MOVE_WRITE + itemId, write);
    }
    function cancelDragMoveTick(itemId) {
        ticker.remove(LANE_READ, DRAG_MOVE_READ + itemId);
        ticker.remove(LANE_WRITE, DRAG_MOVE_WRITE + itemId);
    }
    function addDragScrollTick(itemId, read, write) {
        ticker.add(LANE_READ, DRAG_SCROLL_READ + itemId, read);
        ticker.add(LANE_WRITE, DRAG_SCROLL_WRITE + itemId, write);
    }
    function cancelDragScrollTick(itemId) {
        ticker.remove(LANE_READ, DRAG_SCROLL_READ + itemId);
        ticker.remove(LANE_WRITE, DRAG_SCROLL_WRITE + itemId);
    }
    function addDragSortTick(itemId, read) {
        ticker.add(LANE_READ_TAIL, DRAG_SORT_READ + itemId, read);
    }
    function cancelDragSortTick(itemId) {
        ticker.remove(LANE_READ_TAIL, DRAG_SORT_READ + itemId);
    }
    function addPlaceholderLayoutTick(itemId, read, write) {
        ticker.add(LANE_READ, PLACEHOLDER_LAYOUT_READ + itemId, read);
        ticker.add(LANE_WRITE, PLACEHOLDER_LAYOUT_WRITE + itemId, write);
    }
    function cancelPlaceholderLayoutTick(itemId) {
        ticker.remove(LANE_READ, PLACEHOLDER_LAYOUT_READ + itemId);
        ticker.remove(LANE_WRITE, PLACEHOLDER_LAYOUT_WRITE + itemId);
    }
    function addPlaceholderResizeTick(itemId, write) {
        ticker.add(LANE_WRITE, PLACEHOLDER_RESIZE_WRITE + itemId, write);
    }
    function cancelPlaceholderResizeTick(itemId) {
        ticker.remove(LANE_WRITE, PLACEHOLDER_RESIZE_WRITE + itemId);
    }
    function addAutoScrollTick(read, write) {
        ticker.add(LANE_READ, AUTO_SCROLL_READ, read);
        ticker.add(LANE_WRITE, AUTO_SCROLL_WRITE, write);
    }
    function cancelAutoScrollTick() {
        ticker.remove(LANE_READ, AUTO_SCROLL_READ);
        ticker.remove(LANE_WRITE, AUTO_SCROLL_WRITE);
    }
    function addDebounceTick(debounceId, read) {
        ticker.add(LANE_READ, DEBOUNCE_READ + debounceId, read);
    }
    function cancelDebounceTick(debounceId) {
        ticker.remove(LANE_READ, DEBOUNCE_READ + debounceId);
    }
    var AXIS_X = 1;
    var AXIS_Y = 2;
    var FORWARD = 4;
    var BACKWARD = 8;
    var LEFT = AXIS_X | BACKWARD;
    var RIGHT = AXIS_X | FORWARD;
    var UP = AXIS_Y | BACKWARD;
    var DOWN = AXIS_Y | FORWARD;
    var functionType = "function";
    function muuri_module_isFunction(val) {
        return typeof val === functionType;
    }
    var cache$1 = typeof WeakMap === "function" ? new WeakMap : null;
    function getStyle(element, style) {
        var styles = cache$1 && cache$1.get(element);
        if (!styles) {
            styles = window.getComputedStyle(element, null);
            if (cache$1) cache$1.set(element, styles);
        }
        return styles.getPropertyValue(style);
    }
    function getStyleAsFloat(el, style) {
        return parseFloat(getStyle(el, style)) || 0;
    }
    var DOC_ELEM = document.documentElement;
    var BODY = document.body;
    var THRESHOLD_DATA = {
        value: 0,
        offset: 0
    };
    function getScrollElement(element) {
        if (element === window || element === DOC_ELEM || element === BODY) return window; else return element;
    }
    function getScrollLeft(element) {
        return element === window ? element.pageXOffset : element.scrollLeft;
    }
    function getScrollTop(element) {
        return element === window ? element.pageYOffset : element.scrollTop;
    }
    function getScrollLeftMax(element) {
        if (element === window) return DOC_ELEM.scrollWidth - DOC_ELEM.clientWidth; else return element.scrollWidth - element.clientWidth;
    }
    function getScrollTopMax(element) {
        if (element === window) return DOC_ELEM.scrollHeight - DOC_ELEM.clientHeight; else return element.scrollHeight - element.clientHeight;
    }
    function getContentRect(element, result) {
        result = result || {};
        if (element === window) {
            result.width = DOC_ELEM.clientWidth;
            result.height = DOC_ELEM.clientHeight;
            result.left = 0;
            result.right = result.width;
            result.top = 0;
            result.bottom = result.height;
        } else {
            var bcr = element.getBoundingClientRect();
            var borderLeft = element.clientLeft || getStyleAsFloat(element, "border-left-width");
            var borderTop = element.clientTop || getStyleAsFloat(element, "border-top-width");
            result.width = element.clientWidth;
            result.height = element.clientHeight;
            result.left = bcr.left + borderLeft;
            result.right = result.left + result.width;
            result.top = bcr.top + borderTop;
            result.bottom = result.top + result.height;
        }
        return result;
    }
    function getItemAutoScrollSettings(item) {
        return item._drag._getGrid()._settings.dragAutoScroll;
    }
    function prepareItemScrollSync(item) {
        if (!item._drag) return;
        item._drag._prepareScroll();
    }
    function applyItemScrollSync(item) {
        if (!item._drag || !item._isActive) return;
        var drag = item._drag;
        drag._scrollDiffX = drag._scrollDiffY = 0;
        item._setTranslate(drag._left, drag._top);
    }
    function computeThreshold(threshold, safeZone, itemSize, targetSize) {
        THRESHOLD_DATA.value = Math.min(targetSize / 2, threshold);
        THRESHOLD_DATA.offset = Math.max(0, itemSize + THRESHOLD_DATA.value * 2 + targetSize * safeZone - targetSize) / 2;
        return THRESHOLD_DATA;
    }
    function ScrollRequest() {
        this.reset();
    }
    ScrollRequest.prototype.reset = function() {
        if (this.isActive) this.onStop();
        this.item = null;
        this.element = null;
        this.isActive = false;
        this.isEnding = false;
        this.direction = null;
        this.value = null;
        this.maxValue = 0;
        this.threshold = 0;
        this.distance = 0;
        this.speed = 0;
        this.duration = 0;
        this.action = null;
    };
    ScrollRequest.prototype.hasReachedEnd = function() {
        return FORWARD & this.direction ? this.value >= this.maxValue : this.value <= 0;
    };
    ScrollRequest.prototype.computeCurrentScrollValue = function() {
        if (this.value === null) return AXIS_X & this.direction ? getScrollLeft(this.element) : getScrollTop(this.element);
        return Math.max(0, Math.min(this.value, this.maxValue));
    };
    ScrollRequest.prototype.computeNextScrollValue = function(deltaTime) {
        var delta = this.speed * (deltaTime / 1e3);
        var nextValue = FORWARD & this.direction ? this.value + delta : this.value - delta;
        return Math.max(0, Math.min(nextValue, this.maxValue));
    };
    ScrollRequest.prototype.computeSpeed = function() {
        var data = {
            direction: null,
            threshold: 0,
            distance: 0,
            value: 0,
            maxValue: 0,
            deltaTime: 0,
            duration: 0,
            isEnding: false
        };
        return function(deltaTime) {
            var item = this.item;
            var speed = getItemAutoScrollSettings(item).speed;
            if (muuri_module_isFunction(speed)) {
                data.direction = this.direction;
                data.threshold = this.threshold;
                data.distance = this.distance;
                data.value = this.value;
                data.maxValue = this.maxValue;
                data.duration = this.duration;
                data.speed = this.speed;
                data.deltaTime = deltaTime;
                data.isEnding = this.isEnding;
                return speed(item, this.element, data);
            } else return speed;
        };
    }();
    ScrollRequest.prototype.tick = function(deltaTime) {
        if (!this.isActive) {
            this.isActive = true;
            this.onStart();
        }
        this.value = this.computeCurrentScrollValue();
        this.speed = this.computeSpeed(deltaTime);
        this.value = this.computeNextScrollValue(deltaTime);
        this.duration += deltaTime;
        return this.value;
    };
    ScrollRequest.prototype.onStart = function() {
        var item = this.item;
        var onStart = getItemAutoScrollSettings(item).onStart;
        if (muuri_module_isFunction(onStart)) onStart(item, this.element, this.direction);
    };
    ScrollRequest.prototype.onStop = function() {
        var item = this.item;
        var onStop = getItemAutoScrollSettings(item).onStop;
        if (muuri_module_isFunction(onStop)) onStop(item, this.element, this.direction);
        if (item._drag) item._drag.sort();
    };
    function ScrollAction() {
        this.element = null;
        this.requestX = null;
        this.requestY = null;
        this.scrollLeft = 0;
        this.scrollTop = 0;
    }
    ScrollAction.prototype.reset = function() {
        if (this.requestX) this.requestX.action = null;
        if (this.requestY) this.requestY.action = null;
        this.element = null;
        this.requestX = null;
        this.requestY = null;
        this.scrollLeft = 0;
        this.scrollTop = 0;
    };
    ScrollAction.prototype.addRequest = function(request) {
        if (AXIS_X & request.direction) {
            this.removeRequest(this.requestX);
            this.requestX = request;
        } else {
            this.removeRequest(this.requestY);
            this.requestY = request;
        }
        request.action = this;
    };
    ScrollAction.prototype.removeRequest = function(request) {
        if (!request) return;
        if (this.requestX === request) {
            this.requestX = null;
            request.action = null;
        } else if (this.requestY === request) {
            this.requestY = null;
            request.action = null;
        }
    };
    ScrollAction.prototype.computeScrollValues = function() {
        this.scrollLeft = this.requestX ? this.requestX.value : getScrollLeft(this.element);
        this.scrollTop = this.requestY ? this.requestY.value : getScrollTop(this.element);
    };
    ScrollAction.prototype.scroll = function() {
        var element = this.element;
        if (!element) return;
        if (element.scrollTo) element.scrollTo(this.scrollLeft, this.scrollTop); else {
            element.scrollLeft = this.scrollLeft;
            element.scrollTop = this.scrollTop;
        }
    };
    function Pool(createItem, releaseItem) {
        this.pool = [];
        this.createItem = createItem;
        this.releaseItem = releaseItem;
    }
    Pool.prototype.pick = function() {
        return this.pool.pop() || this.createItem();
    };
    Pool.prototype.release = function(item) {
        this.releaseItem(item);
        if (this.pool.indexOf(item) !== -1) return;
        this.pool.push(item);
    };
    Pool.prototype.reset = function() {
        this.pool.length = 0;
    };
    function isOverlapping(a, b) {
        return !(a.left + a.width <= b.left || b.left + b.width <= a.left || a.top + a.height <= b.top || b.top + b.height <= a.top);
    }
    function getIntersectionArea(a, b) {
        if (!isOverlapping(a, b)) return 0;
        var width = Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left);
        var height = Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top);
        return width * height;
    }
    function getIntersectionScore(a, b) {
        var area = getIntersectionArea(a, b);
        if (!area) return 0;
        var maxArea = Math.min(a.width, b.width) * Math.min(a.height, b.height);
        return area / maxArea * 100;
    }
    var RECT_1 = {
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    var RECT_2 = {
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    function AutoScroller() {
        this._isDestroyed = false;
        this._isTicking = false;
        this._tickTime = 0;
        this._tickDeltaTime = 0;
        this._items = [];
        this._actions = [];
        this._requests = {};
        this._requests[AXIS_X] = {};
        this._requests[AXIS_Y] = {};
        this._requestOverlapCheck = {};
        this._dragPositions = {};
        this._dragDirections = {};
        this._overlapCheckInterval = 150;
        this._requestPool = new Pool((function() {
            return new ScrollRequest;
        }), (function(request) {
            request.reset();
        }));
        this._actionPool = new Pool((function() {
            return new ScrollAction;
        }), (function(action) {
            action.reset();
        }));
        this._readTick = this._readTick.bind(this);
        this._writeTick = this._writeTick.bind(this);
    }
    AutoScroller.AXIS_X = AXIS_X;
    AutoScroller.AXIS_Y = AXIS_Y;
    AutoScroller.FORWARD = FORWARD;
    AutoScroller.BACKWARD = BACKWARD;
    AutoScroller.LEFT = LEFT;
    AutoScroller.RIGHT = RIGHT;
    AutoScroller.UP = UP;
    AutoScroller.DOWN = DOWN;
    AutoScroller.smoothSpeed = function(maxSpeed, acceleration, deceleration) {
        return function(item, element, data) {
            var targetSpeed = 0;
            if (!data.isEnding) if (data.threshold > 0) {
                var factor = data.threshold - Math.max(0, data.distance);
                targetSpeed = maxSpeed / data.threshold * factor;
            } else targetSpeed = maxSpeed;
            var currentSpeed = data.speed;
            var nextSpeed = targetSpeed;
            if (currentSpeed === targetSpeed) return nextSpeed;
            if (currentSpeed < targetSpeed) {
                nextSpeed = currentSpeed + acceleration * (data.deltaTime / 1e3);
                return Math.min(targetSpeed, nextSpeed);
            } else {
                nextSpeed = currentSpeed - deceleration * (data.deltaTime / 1e3);
                return Math.max(targetSpeed, nextSpeed);
            }
        };
    };
    AutoScroller.pointerHandle = function(pointerSize) {
        var rect = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        };
        var size = pointerSize || 1;
        return function(item, x, y, w, h, pX, pY) {
            rect.left = pX - size * .5;
            rect.top = pY - size * .5;
            rect.width = size;
            rect.height = size;
            return rect;
        };
    };
    AutoScroller.prototype._readTick = function(time) {
        if (this._isDestroyed) return;
        if (time && this._tickTime) {
            this._tickDeltaTime = time - this._tickTime;
            this._tickTime = time;
            this._updateRequests();
            this._updateActions();
        } else {
            this._tickTime = time;
            this._tickDeltaTime = 0;
        }
    };
    AutoScroller.prototype._writeTick = function() {
        if (this._isDestroyed) return;
        this._applyActions();
        addAutoScrollTick(this._readTick, this._writeTick);
    };
    AutoScroller.prototype._startTicking = function() {
        this._isTicking = true;
        addAutoScrollTick(this._readTick, this._writeTick);
    };
    AutoScroller.prototype._stopTicking = function() {
        this._isTicking = false;
        this._tickTime = 0;
        this._tickDeltaTime = 0;
        cancelAutoScrollTick();
    };
    AutoScroller.prototype._getItemHandleRect = function(item, handle, rect) {
        var itemDrag = item._drag;
        if (handle) {
            var ev = itemDrag._dragMoveEvent || itemDrag._dragStartEvent;
            var data = handle(item, itemDrag._clientX, itemDrag._clientY, item._width, item._height, ev.clientX, ev.clientY);
            rect.left = data.left;
            rect.top = data.top;
            rect.width = data.width;
            rect.height = data.height;
        } else {
            rect.left = itemDrag._clientX;
            rect.top = itemDrag._clientY;
            rect.width = item._width;
            rect.height = item._height;
        }
        rect.right = rect.left + rect.width;
        rect.bottom = rect.top + rect.height;
        return rect;
    };
    AutoScroller.prototype._requestItemScroll = function(item, axis, element, direction, threshold, distance, maxValue) {
        var reqMap = this._requests[axis];
        var request = reqMap[item._id];
        if (request) {
            if (request.element !== element || request.direction !== direction) request.reset();
        } else request = this._requestPool.pick();
        request.item = item;
        request.element = element;
        request.direction = direction;
        request.threshold = threshold;
        request.distance = distance;
        request.maxValue = maxValue;
        reqMap[item._id] = request;
    };
    AutoScroller.prototype._cancelItemScroll = function(item, axis) {
        var reqMap = this._requests[axis];
        var request = reqMap[item._id];
        if (!request) return;
        if (request.action) request.action.removeRequest(request);
        this._requestPool.release(request);
        delete reqMap[item._id];
    };
    AutoScroller.prototype._checkItemOverlap = function(item, checkX, checkY) {
        var settings = getItemAutoScrollSettings(item);
        var targets = muuri_module_isFunction(settings.targets) ? settings.targets(item) : settings.targets;
        var threshold = settings.threshold;
        var safeZone = settings.safeZone;
        if (!targets || !targets.length) {
            checkX && this._cancelItemScroll(item, AXIS_X);
            checkY && this._cancelItemScroll(item, AXIS_Y);
            return;
        }
        var dragDirections = this._dragDirections[item._id];
        var dragDirectionX = dragDirections[0];
        var dragDirectionY = dragDirections[1];
        if (!dragDirectionX && !dragDirectionY) {
            checkX && this._cancelItemScroll(item, AXIS_X);
            checkY && this._cancelItemScroll(item, AXIS_Y);
            return;
        }
        var itemRect = this._getItemHandleRect(item, settings.handle, RECT_1);
        var testRect = RECT_2;
        var target = null;
        var testElement = null;
        var testAxisX = true;
        var testAxisY = true;
        var testScore = 0;
        var testPriority = 0;
        var testThreshold = null;
        var testDirection = null;
        var testDistance = 0;
        var testMaxScrollX = 0;
        var testMaxScrollY = 0;
        var xElement = null;
        var xPriority = -1 / 0;
        var xThreshold = 0;
        var xScore = 0;
        var xDirection = null;
        var xDistance = 0;
        var xMaxScroll = 0;
        var yElement = null;
        var yPriority = -1 / 0;
        var yThreshold = 0;
        var yScore = 0;
        var yDirection = null;
        var yDistance = 0;
        var yMaxScroll = 0;
        for (var i = 0; i < targets.length; i++) {
            target = targets[i];
            testAxisX = checkX && dragDirectionX && target.axis !== AXIS_Y;
            testAxisY = checkY && dragDirectionY && target.axis !== AXIS_X;
            testPriority = target.priority || 0;
            if ((!testAxisX || testPriority < xPriority) && (!testAxisY || testPriority < yPriority)) continue;
            testElement = getScrollElement(target.element || target);
            testMaxScrollX = testAxisX ? getScrollLeftMax(testElement) : -1;
            testMaxScrollY = testAxisY ? getScrollTopMax(testElement) : -1;
            if (!testMaxScrollX && !testMaxScrollY) continue;
            testRect = getContentRect(testElement, testRect);
            testScore = getIntersectionScore(itemRect, testRect);
            if (testScore <= 0) continue;
            if (testAxisX && testPriority >= xPriority && testMaxScrollX > 0 && (testPriority > xPriority || testScore > xScore)) {
                testDirection = null;
                testThreshold = computeThreshold(typeof target.threshold === "number" ? target.threshold : threshold, safeZone, itemRect.width, testRect.width);
                if (dragDirectionX === RIGHT) {
                    testDistance = testRect.right + testThreshold.offset - itemRect.right;
                    if (testDistance <= testThreshold.value && getScrollLeft(testElement) < testMaxScrollX) testDirection = RIGHT;
                } else if (dragDirectionX === LEFT) {
                    testDistance = itemRect.left - (testRect.left - testThreshold.offset);
                    if (testDistance <= testThreshold.value && getScrollLeft(testElement) > 0) testDirection = LEFT;
                }
                if (testDirection !== null) {
                    xElement = testElement;
                    xPriority = testPriority;
                    xThreshold = testThreshold.value;
                    xScore = testScore;
                    xDirection = testDirection;
                    xDistance = testDistance;
                    xMaxScroll = testMaxScrollX;
                }
            }
            if (testAxisY && testPriority >= yPriority && testMaxScrollY > 0 && (testPriority > yPriority || testScore > yScore)) {
                testDirection = null;
                testThreshold = computeThreshold(typeof target.threshold === "number" ? target.threshold : threshold, safeZone, itemRect.height, testRect.height);
                if (dragDirectionY === DOWN) {
                    testDistance = testRect.bottom + testThreshold.offset - itemRect.bottom;
                    if (testDistance <= testThreshold.value && getScrollTop(testElement) < testMaxScrollY) testDirection = DOWN;
                } else if (dragDirectionY === UP) {
                    testDistance = itemRect.top - (testRect.top - testThreshold.offset);
                    if (testDistance <= testThreshold.value && getScrollTop(testElement) > 0) testDirection = UP;
                }
                if (testDirection !== null) {
                    yElement = testElement;
                    yPriority = testPriority;
                    yThreshold = testThreshold.value;
                    yScore = testScore;
                    yDirection = testDirection;
                    yDistance = testDistance;
                    yMaxScroll = testMaxScrollY;
                }
            }
        }
        if (checkX) if (xElement) this._requestItemScroll(item, AXIS_X, xElement, xDirection, xThreshold, xDistance, xMaxScroll); else this._cancelItemScroll(item, AXIS_X);
        if (checkY) if (yElement) this._requestItemScroll(item, AXIS_Y, yElement, yDirection, yThreshold, yDistance, yMaxScroll); else this._cancelItemScroll(item, AXIS_Y);
    };
    AutoScroller.prototype._updateScrollRequest = function(scrollRequest) {
        var item = scrollRequest.item;
        var settings = getItemAutoScrollSettings(item);
        var targets = muuri_module_isFunction(settings.targets) ? settings.targets(item) : settings.targets;
        var targetCount = targets && targets.length || 0;
        var threshold = settings.threshold;
        var safeZone = settings.safeZone;
        var itemRect = this._getItemHandleRect(item, settings.handle, RECT_1);
        var testRect = RECT_2;
        var target = null;
        var testElement = null;
        var testIsAxisX = false;
        var testScore = null;
        var testThreshold = null;
        var testDistance = null;
        var testScroll = null;
        var testMaxScroll = null;
        var hasReachedEnd = null;
        for (var i = 0; i < targetCount; i++) {
            target = targets[i];
            testElement = getScrollElement(target.element || target);
            if (testElement !== scrollRequest.element) continue;
            testIsAxisX = !!(AXIS_X & scrollRequest.direction);
            if (testIsAxisX) {
                if (target.axis === AXIS_Y) continue;
            } else if (target.axis === AXIS_X) continue;
            testMaxScroll = testIsAxisX ? getScrollLeftMax(testElement) : getScrollTopMax(testElement);
            if (testMaxScroll <= 0) break;
            testRect = getContentRect(testElement, testRect);
            testScore = getIntersectionScore(itemRect, testRect);
            if (testScore <= 0) break;
            testThreshold = computeThreshold(typeof target.threshold === "number" ? target.threshold : threshold, safeZone, testIsAxisX ? itemRect.width : itemRect.height, testIsAxisX ? testRect.width : testRect.height);
            if (scrollRequest.direction === LEFT) testDistance = itemRect.left - (testRect.left - testThreshold.offset); else if (scrollRequest.direction === RIGHT) testDistance = testRect.right + testThreshold.offset - itemRect.right; else if (scrollRequest.direction === UP) testDistance = itemRect.top - (testRect.top - testThreshold.offset); else testDistance = testRect.bottom + testThreshold.offset - itemRect.bottom;
            if (testDistance > testThreshold.value) break;
            testScroll = testIsAxisX ? getScrollLeft(testElement) : getScrollTop(testElement);
            hasReachedEnd = FORWARD & scrollRequest.direction ? testScroll >= testMaxScroll : testScroll <= 0;
            if (hasReachedEnd) break;
            scrollRequest.maxValue = testMaxScroll;
            scrollRequest.threshold = testThreshold.value;
            scrollRequest.distance = testDistance;
            scrollRequest.isEnding = false;
            return true;
        }
        if (settings.smoothStop === true && scrollRequest.speed > 0) {
            if (hasReachedEnd === null) hasReachedEnd = scrollRequest.hasReachedEnd();
            scrollRequest.isEnding = hasReachedEnd ? false : true;
        } else scrollRequest.isEnding = false;
        return scrollRequest.isEnding;
    };
    AutoScroller.prototype._updateRequests = function() {
        var items = this._items;
        var requestsX = this._requests[AXIS_X];
        var requestsY = this._requests[AXIS_Y];
        var item, reqX, reqY, checkTime, needsCheck, checkX, checkY;
        for (var i = 0; i < items.length; i++) {
            item = items[i];
            checkTime = this._requestOverlapCheck[item._id];
            needsCheck = checkTime > 0 && this._tickTime - checkTime > this._overlapCheckInterval;
            checkX = true;
            reqX = requestsX[item._id];
            if (reqX && reqX.isActive) {
                checkX = !this._updateScrollRequest(reqX);
                if (checkX) {
                    needsCheck = true;
                    this._cancelItemScroll(item, AXIS_X);
                }
            }
            checkY = true;
            reqY = requestsY[item._id];
            if (reqY && reqY.isActive) {
                checkY = !this._updateScrollRequest(reqY);
                if (checkY) {
                    needsCheck = true;
                    this._cancelItemScroll(item, AXIS_Y);
                }
            }
            if (needsCheck) {
                this._requestOverlapCheck[item._id] = 0;
                this._checkItemOverlap(item, checkX, checkY);
            }
        }
    };
    AutoScroller.prototype._requestAction = function(request, axis) {
        var actions = this._actions;
        var isAxisX = axis === AXIS_X;
        var action = null;
        for (var i = 0; i < actions.length; i++) {
            action = actions[i];
            if (request.element !== action.element) {
                action = null;
                continue;
            }
            if (isAxisX ? action.requestX : action.requestY) {
                this._cancelItemScroll(request.item, axis);
                return;
            }
            break;
        }
        if (!action) action = this._actionPool.pick();
        action.element = request.element;
        action.addRequest(request);
        request.tick(this._tickDeltaTime);
        actions.push(action);
    };
    AutoScroller.prototype._updateActions = function() {
        var items = this._items;
        var requests = this._requests;
        var actions = this._actions;
        var itemId;
        var reqX;
        var reqY;
        var i;
        for (i = 0; i < items.length; i++) {
            itemId = items[i]._id;
            reqX = requests[AXIS_X][itemId];
            reqY = requests[AXIS_Y][itemId];
            if (reqX) this._requestAction(reqX, AXIS_X);
            if (reqY) this._requestAction(reqY, AXIS_Y);
        }
        for (i = 0; i < actions.length; i++) actions[i].computeScrollValues();
    };
    AutoScroller.prototype._applyActions = function() {
        var actions = this._actions;
        var items = this._items;
        var i;
        if (!actions.length) return;
        for (i = 0; i < actions.length; i++) {
            actions[i].scroll();
            this._actionPool.release(actions[i]);
        }
        actions.length = 0;
        for (i = 0; i < items.length; i++) prepareItemScrollSync(items[i]);
        for (i = 0; i < items.length; i++) applyItemScrollSync(items[i]);
    };
    AutoScroller.prototype._updateDragDirection = function(item) {
        var dragPositions = this._dragPositions[item._id];
        var dragDirections = this._dragDirections[item._id];
        var x1 = item._drag._left;
        var y1 = item._drag._top;
        if (dragPositions.length) {
            var x2 = dragPositions[0];
            var y2 = dragPositions[1];
            dragDirections[0] = x1 > x2 ? RIGHT : x1 < x2 ? LEFT : dragDirections[0] || 0;
            dragDirections[1] = y1 > y2 ? DOWN : y1 < y2 ? UP : dragDirections[1] || 0;
        }
        dragPositions[0] = x1;
        dragPositions[1] = y1;
    };
    AutoScroller.prototype.addItem = function(item) {
        if (this._isDestroyed) return;
        var index = this._items.indexOf(item);
        if (index === -1) {
            this._items.push(item);
            this._requestOverlapCheck[item._id] = this._tickTime;
            this._dragDirections[item._id] = [ 0, 0 ];
            this._dragPositions[item._id] = [];
            if (!this._isTicking) this._startTicking();
        }
    };
    AutoScroller.prototype.updateItem = function(item) {
        if (this._isDestroyed) return;
        if (!this._dragDirections[item._id]) return;
        this._updateDragDirection(item);
        if (!this._requestOverlapCheck[item._id]) this._requestOverlapCheck[item._id] = this._tickTime;
    };
    AutoScroller.prototype.removeItem = function(item) {
        if (this._isDestroyed) return;
        var index = this._items.indexOf(item);
        if (index === -1) return;
        var itemId = item._id;
        var reqX = this._requests[AXIS_X][itemId];
        if (reqX) {
            this._cancelItemScroll(item, AXIS_X);
            delete this._requests[AXIS_X][itemId];
        }
        var reqY = this._requests[AXIS_Y][itemId];
        if (reqY) {
            this._cancelItemScroll(item, AXIS_Y);
            delete this._requests[AXIS_Y][itemId];
        }
        delete this._requestOverlapCheck[itemId];
        delete this._dragPositions[itemId];
        delete this._dragDirections[itemId];
        this._items.splice(index, 1);
        if (this._isTicking && !this._items.length) this._stopTicking();
    };
    AutoScroller.prototype.isItemScrollingX = function(item) {
        var reqX = this._requests[AXIS_X][item._id];
        return !!(reqX && reqX.isActive);
    };
    AutoScroller.prototype.isItemScrollingY = function(item) {
        var reqY = this._requests[AXIS_Y][item._id];
        return !!(reqY && reqY.isActive);
    };
    AutoScroller.prototype.isItemScrolling = function(item) {
        return this.isItemScrollingX(item) || this.isItemScrollingY(item);
    };
    AutoScroller.prototype.destroy = function() {
        if (this._isDestroyed) return;
        var items = this._items.slice(0);
        for (var i = 0; i < items.length; i++) this.removeItem(items[i]);
        this._actions.length = 0;
        this._requestPool.reset();
        this._actionPool.reset();
        this._isDestroyed = true;
    };
    var ElProto = window.Element.prototype;
    var matchesFn = ElProto.matches || ElProto.matchesSelector || ElProto.webkitMatchesSelector || ElProto.mozMatchesSelector || ElProto.msMatchesSelector || ElProto.oMatchesSelector || function() {
        return false;
    };
    function elementMatches(el, selector) {
        return matchesFn.call(el, selector);
    }
    function muuri_module_addClass(element, className) {
        if (!className) return;
        if (element.classList) element.classList.add(className); else if (!elementMatches(element, "." + className)) element.className += " " + className;
    }
    var tempArray = [];
    var numberType = "number";
    function arrayInsert(array, items, index) {
        var startIndex = typeof index === numberType ? index : -1;
        if (startIndex < 0) startIndex = array.length - startIndex + 1;
        array.splice.apply(array, tempArray.concat(startIndex, 0, items));
        tempArray.length = 0;
    }
    function normalizeArrayIndex(array, index, sizeOffset) {
        var maxIndex = Math.max(0, array.length - 1 + (sizeOffset || 0));
        return index > maxIndex ? maxIndex : index < 0 ? Math.max(maxIndex + index + 1, 0) : index;
    }
    function arrayMove(array, fromIndex, toIndex) {
        if (array.length < 2) return;
        var from = normalizeArrayIndex(array, fromIndex);
        var to = normalizeArrayIndex(array, toIndex);
        if (from !== to) array.splice(to, 0, array.splice(from, 1)[0]);
    }
    function arraySwap(array, index, withIndex) {
        if (array.length < 2) return;
        var indexA = normalizeArrayIndex(array, index);
        var indexB = normalizeArrayIndex(array, withIndex);
        var temp;
        if (indexA !== indexB) {
            temp = array[indexA];
            array[indexA] = array[indexB];
            array[indexB] = temp;
        }
    }
    var transformProp = getPrefixedPropName(document.documentElement.style, "transform") || "transform";
    var styleNameRegEx = /([A-Z])/g;
    var prefixRegex = /^(webkit-|moz-|ms-|o-)/;
    var msPrefixRegex = /^(-m-s-)/;
    function getStyleName(property) {
        var styleName = property.replace(styleNameRegEx, "-$1").toLowerCase();
        styleName = styleName.replace(prefixRegex, "-$1");
        styleName = styleName.replace(msPrefixRegex, "-ms-");
        return styleName;
    }
    var transformStyle = getStyleName(transformProp);
    var transformNone$1 = "none";
    var displayInline = "inline";
    var displayNone = "none";
    var displayStyle = "display";
    function isTransformed(element) {
        var transform = getStyle(element, transformStyle);
        if (!transform || transform === transformNone$1) return false;
        var display = getStyle(element, displayStyle);
        if (display === displayInline || display === displayNone) return false;
        return true;
    }
    function getContainingBlock(element) {
        var doc = document;
        var res = element || doc;
        while (res && res !== doc && getStyle(res, "position") === "static" && !isTransformed(res)) res = res.parentElement || doc;
        return res;
    }
    var offsetA = {};
    var offsetB = {};
    var offsetDiff = {};
    function getOffset(element, offsetData) {
        var offset = offsetData || {};
        var rect;
        offset.left = 0;
        offset.top = 0;
        if (element === document) return offset;
        offset.left = window.pageXOffset || 0;
        offset.top = window.pageYOffset || 0;
        if (element.self === window.self) return offset;
        rect = element.getBoundingClientRect();
        offset.left += rect.left;
        offset.top += rect.top;
        offset.left += getStyleAsFloat(element, "border-left-width");
        offset.top += getStyleAsFloat(element, "border-top-width");
        return offset;
    }
    function getOffsetDiff(elemA, elemB, compareContainingBlocks) {
        offsetDiff.left = 0;
        offsetDiff.top = 0;
        if (elemA === elemB) return offsetDiff;
        if (compareContainingBlocks) {
            elemA = getContainingBlock(elemA);
            elemB = getContainingBlock(elemB);
            if (elemA === elemB) return offsetDiff;
        }
        getOffset(elemA, offsetA);
        getOffset(elemB, offsetB);
        offsetDiff.left = offsetB.left - offsetA.left;
        offsetDiff.top = offsetB.top - offsetA.top;
        return offsetDiff;
    }
    function isScrollableOverflow(value) {
        return value === "auto" || value === "scroll" || value === "overlay";
    }
    function isScrollable(element) {
        return isScrollableOverflow(getStyle(element, "overflow")) || isScrollableOverflow(getStyle(element, "overflow-x")) || isScrollableOverflow(getStyle(element, "overflow-y"));
    }
    function getScrollableAncestors(element, result) {
        result = result || [];
        while (element && element !== document) {
            if (element.getRootNode && element instanceof DocumentFragment) {
                element = element.getRootNode().host;
                continue;
            }
            if (isScrollable(element)) result.push(element);
            element = element.parentNode;
        }
        result.push(window);
        return result;
    }
    var translateValue = {};
    var transformNone = "none";
    var rxMat3d = /^matrix3d/;
    var rxMatTx = /([^,]*,){4}/;
    var rxMat3dTx = /([^,]*,){12}/;
    var rxNextItem = /[^,]*,/;
    function getTranslate(element) {
        translateValue.x = 0;
        translateValue.y = 0;
        var transform = getStyle(element, transformStyle);
        if (!transform || transform === transformNone) return translateValue;
        var isMat3d = rxMat3d.test(transform);
        var tX = transform.replace(isMat3d ? rxMat3dTx : rxMatTx, "");
        var tY = tX.replace(rxNextItem, "");
        translateValue.x = parseFloat(tX) || 0;
        translateValue.y = parseFloat(tY) || 0;
        return translateValue;
    }
    function muuri_module_removeClass(element, className) {
        if (!className) return;
        if (element.classList) element.classList.remove(className); else if (elementMatches(element, "." + className)) element.className = (" " + element.className + " ").replace(" " + className + " ", " ").trim();
    }
    var IS_IOS = /^(iPad|iPhone|iPod)/.test(window.navigator.platform) || /^Mac/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 1;
    var START_PREDICATE_INACTIVE = 0;
    var START_PREDICATE_PENDING = 1;
    var START_PREDICATE_RESOLVED = 2;
    var muuri_module_SCROLL_LISTENER_OPTIONS = hasPassiveEvents() ? {
        passive: true
    } : false;
    function ItemDrag(item) {
        var element = item._element;
        var grid = item.getGrid();
        var settings = grid._settings;
        this._item = item;
        this._gridId = grid._id;
        this._isDestroyed = false;
        this._isMigrating = false;
        this._startPredicate = muuri_module_isFunction(settings.dragStartPredicate) ? settings.dragStartPredicate : ItemDrag.defaultStartPredicate;
        this._startPredicateState = START_PREDICATE_INACTIVE;
        this._startPredicateResult = void 0;
        this._isSortNeeded = false;
        this._sortTimer = void 0;
        this._blockedSortIndex = null;
        this._sortX1 = 0;
        this._sortX2 = 0;
        this._sortY1 = 0;
        this._sortY2 = 0;
        this._reset();
        this._preStartCheck = this._preStartCheck.bind(this);
        this._preEndCheck = this._preEndCheck.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._prepareStart = this._prepareStart.bind(this);
        this._applyStart = this._applyStart.bind(this);
        this._prepareMove = this._prepareMove.bind(this);
        this._applyMove = this._applyMove.bind(this);
        this._prepareScroll = this._prepareScroll.bind(this);
        this._applyScroll = this._applyScroll.bind(this);
        this._handleSort = this._handleSort.bind(this);
        this._handleSortDelayed = this._handleSortDelayed.bind(this);
        this._handle = settings.dragHandle && element.querySelector(settings.dragHandle) || element;
        this._dragger = new Dragger(this._handle, settings.dragCssProps);
        this._dragger.on("start", this._preStartCheck);
        this._dragger.on("move", this._preStartCheck);
        this._dragger.on("cancel", this._preEndCheck);
        this._dragger.on("end", this._preEndCheck);
    }
    ItemDrag.autoScroller = new AutoScroller;
    ItemDrag.defaultStartPredicate = function(item, event, options) {
        var drag = item._drag;
        if (event.isFirst && event.srcEvent.button) return false;
        if (!IS_IOS && event.isFirst && event.srcEvent.isTrusted === true && event.srcEvent.defaultPrevented === false && event.srcEvent.cancelable === false) return false;
        if (event.isFinal) {
            drag._finishStartPredicate(event);
            return;
        }
        var predicate = drag._startPredicateData;
        if (!predicate) {
            var config = options || drag._getGrid()._settings.dragStartPredicate || {};
            drag._startPredicateData = predicate = {
                distance: Math.max(config.distance, 0) || 0,
                delay: Math.max(config.delay, 0) || 0
            };
        }
        if (predicate.delay) {
            predicate.event = event;
            if (!predicate.delayTimer) predicate.delayTimer = window.setTimeout((function() {
                predicate.delay = 0;
                if (drag._resolveStartPredicate(predicate.event)) {
                    drag._forceResolveStartPredicate(predicate.event);
                    drag._resetStartPredicate();
                }
            }), predicate.delay);
        }
        return drag._resolveStartPredicate(event);
    };
    ItemDrag.defaultSortPredicate = function() {
        var itemRect = {};
        var targetRect = {};
        var returnData = {};
        var gridsArray = [];
        var minThreshold = 1;
        var maxThreshold = 100;
        function getTargetGrid(item, rootGrid, threshold) {
            var target = null;
            var dragSort = rootGrid._settings.dragSort;
            var bestScore = -1;
            var gridScore;
            var grids;
            var grid;
            var container;
            var containerRect;
            var left;
            var top;
            var right;
            var bottom;
            var i;
            if (dragSort === true) {
                gridsArray[0] = rootGrid;
                grids = gridsArray;
            } else if (muuri_module_isFunction(dragSort)) grids = dragSort.call(rootGrid, item);
            if (!grids || !Array.isArray(grids) || !grids.length) return target;
            for (i = 0; i < grids.length; i++) {
                grid = grids[i];
                if (grid._isDestroyed) continue;
                grid._updateBoundingRect();
                left = Math.max(0, grid._left);
                top = Math.max(0, grid._top);
                right = Math.min(window.innerWidth, grid._right);
                bottom = Math.min(window.innerHeight, grid._bottom);
                container = grid._element.parentNode;
                while (container && container !== document && container !== document.documentElement && container !== document.body) {
                    if (container.getRootNode && container instanceof DocumentFragment) {
                        container = container.getRootNode().host;
                        continue;
                    }
                    if (getStyle(container, "overflow") !== "visible") {
                        containerRect = container.getBoundingClientRect();
                        left = Math.max(left, containerRect.left);
                        top = Math.max(top, containerRect.top);
                        right = Math.min(right, containerRect.right);
                        bottom = Math.min(bottom, containerRect.bottom);
                    }
                    if (getStyle(container, "position") === "fixed") break;
                    container = container.parentNode;
                }
                if (left >= right || top >= bottom) continue;
                targetRect.left = left;
                targetRect.top = top;
                targetRect.width = right - left;
                targetRect.height = bottom - top;
                gridScore = getIntersectionScore(itemRect, targetRect);
                if (gridScore > threshold && gridScore > bestScore) {
                    bestScore = gridScore;
                    target = grid;
                }
            }
            gridsArray.length = 0;
            return target;
        }
        return function(item, options) {
            var drag = item._drag;
            var rootGrid = drag._getGrid();
            var sortThreshold = options && typeof options.threshold === "number" ? options.threshold : 50;
            var sortAction = options && options.action === ACTION_SWAP ? ACTION_SWAP : ACTION_MOVE;
            var migrateAction = options && options.migrateAction === ACTION_SWAP ? ACTION_SWAP : ACTION_MOVE;
            sortThreshold = Math.min(Math.max(sortThreshold, minThreshold), maxThreshold);
            itemRect.width = item._width;
            itemRect.height = item._height;
            itemRect.left = drag._clientX;
            itemRect.top = drag._clientY;
            var grid = getTargetGrid(item, rootGrid, sortThreshold);
            if (!grid) return null;
            var isMigration = item.getGrid() !== grid;
            var gridOffsetLeft = 0;
            var gridOffsetTop = 0;
            var matchScore = 0;
            var matchIndex = -1;
            var hasValidTargets = false;
            var target;
            var score;
            var i;
            if (grid === rootGrid) {
                itemRect.left = drag._gridX + item._marginLeft;
                itemRect.top = drag._gridY + item._marginTop;
            } else {
                grid._updateBorders(1, 0, 1, 0);
                gridOffsetLeft = grid._left + grid._borderLeft;
                gridOffsetTop = grid._top + grid._borderTop;
            }
            for (i = 0; i < grid._items.length; i++) {
                target = grid._items[i];
                if (!target._isActive || target === item) continue;
                hasValidTargets = true;
                targetRect.width = target._width;
                targetRect.height = target._height;
                targetRect.left = target._left + target._marginLeft + gridOffsetLeft;
                targetRect.top = target._top + target._marginTop + gridOffsetTop;
                score = getIntersectionScore(itemRect, targetRect);
                if (score > matchScore) {
                    matchIndex = i;
                    matchScore = score;
                }
            }
            if (isMigration && matchScore < sortThreshold) {
                matchIndex = hasValidTargets ? matchIndex : 0;
                matchScore = sortThreshold;
            }
            if (matchScore >= sortThreshold) {
                returnData.grid = grid;
                returnData.index = matchIndex;
                returnData.action = isMigration ? migrateAction : sortAction;
                return returnData;
            }
            return null;
        };
    }();
    ItemDrag.prototype.stop = function() {
        if (!this._isActive) return;
        if (this._isMigrating) {
            this._finishMigration();
            return;
        }
        var item = this._item;
        var itemId = item._id;
        ItemDrag.autoScroller.removeItem(item);
        cancelDragStartTick(itemId);
        cancelDragMoveTick(itemId);
        cancelDragScrollTick(itemId);
        this._cancelSort();
        if (this._isStarted) {
            this._unbindScrollListeners();
            var element = item._element;
            var grid = this._getGrid();
            var draggingClass = grid._settings.itemDraggingClass;
            if (element.parentNode !== grid._element) {
                grid._element.appendChild(element);
                item._setTranslate(this._gridX, this._gridY);
                if (draggingClass) element.clientWidth;
            }
            muuri_module_removeClass(element, draggingClass);
        }
        this._reset();
    };
    ItemDrag.prototype.sort = function(force) {
        var item = this._item;
        if (this._isActive && item._isActive && this._dragMoveEvent) if (force === true) this._handleSort(); else addDragSortTick(item._id, this._handleSort);
    };
    ItemDrag.prototype.destroy = function() {
        if (this._isDestroyed) return;
        this.stop();
        this._dragger.destroy();
        ItemDrag.autoScroller.removeItem(this._item);
        this._isDestroyed = true;
    };
    ItemDrag.prototype._getGrid = function() {
        return GRID_INSTANCES[this._gridId] || null;
    };
    ItemDrag.prototype._reset = function() {
        this._isActive = false;
        this._isStarted = false;
        this._container = null;
        this._containingBlock = null;
        this._dragStartEvent = null;
        this._dragMoveEvent = null;
        this._dragPrevMoveEvent = null;
        this._scrollEvent = null;
        this._scrollers = [];
        this._left = 0;
        this._top = 0;
        this._gridX = 0;
        this._gridY = 0;
        this._clientX = 0;
        this._clientY = 0;
        this._scrollDiffX = 0;
        this._scrollDiffY = 0;
        this._moveDiffX = 0;
        this._moveDiffY = 0;
        this._containerDiffX = 0;
        this._containerDiffY = 0;
    };
    ItemDrag.prototype._bindScrollListeners = function() {
        var gridContainer = this._getGrid()._element;
        var dragContainer = this._container;
        var scrollers = this._scrollers;
        var gridScrollers;
        var i;
        scrollers.length = 0;
        getScrollableAncestors(this._item._element.parentNode, scrollers);
        if (dragContainer !== gridContainer) {
            gridScrollers = [];
            getScrollableAncestors(gridContainer, gridScrollers);
            for (i = 0; i < gridScrollers.length; i++) if (scrollers.indexOf(gridScrollers[i]) < 0) scrollers.push(gridScrollers[i]);
        }
        for (i = 0; i < scrollers.length; i++) scrollers[i].addEventListener("scroll", this._onScroll, muuri_module_SCROLL_LISTENER_OPTIONS);
    };
    ItemDrag.prototype._unbindScrollListeners = function() {
        var scrollers = this._scrollers;
        var i;
        for (i = 0; i < scrollers.length; i++) scrollers[i].removeEventListener("scroll", this._onScroll, muuri_module_SCROLL_LISTENER_OPTIONS);
        scrollers.length = 0;
    };
    ItemDrag.prototype._resolveStartPredicate = function(event) {
        var predicate = this._startPredicateData;
        if (event.distance < predicate.distance || predicate.delay) return;
        this._resetStartPredicate();
        return true;
    };
    ItemDrag.prototype._forceResolveStartPredicate = function(event) {
        if (!this._isDestroyed && this._startPredicateState === START_PREDICATE_PENDING) {
            this._startPredicateState = START_PREDICATE_RESOLVED;
            this._onStart(event);
        }
    };
    ItemDrag.prototype._finishStartPredicate = function(event) {
        var element = this._item._element;
        var isClick = Math.abs(event.deltaX) < 2 && Math.abs(event.deltaY) < 2 && event.deltaTime < 200;
        this._resetStartPredicate();
        if (isClick) openAnchorHref(element);
    };
    ItemDrag.prototype._resetHeuristics = function(x, y) {
        this._blockedSortIndex = null;
        this._sortX1 = this._sortX2 = x;
        this._sortY1 = this._sortY2 = y;
    };
    ItemDrag.prototype._checkHeuristics = function(x, y) {
        var settings = this._getGrid()._settings.dragSortHeuristics;
        var minDist = settings.minDragDistance;
        if (minDist <= 0) {
            this._blockedSortIndex = null;
            return true;
        }
        var diffX = x - this._sortX2;
        var diffY = y - this._sortY2;
        var canCheckBounceBack = minDist > 3 && settings.minBounceBackAngle > 0;
        if (!canCheckBounceBack) this._blockedSortIndex = null;
        if (Math.abs(diffX) > minDist || Math.abs(diffY) > minDist) {
            if (canCheckBounceBack) {
                var angle = Math.atan2(diffX, diffY);
                var prevAngle = Math.atan2(this._sortX2 - this._sortX1, this._sortY2 - this._sortY1);
                var deltaAngle = Math.atan2(Math.sin(angle - prevAngle), Math.cos(angle - prevAngle));
                if (Math.abs(deltaAngle) > settings.minBounceBackAngle) this._blockedSortIndex = null;
            }
            this._sortX1 = this._sortX2;
            this._sortY1 = this._sortY2;
            this._sortX2 = x;
            this._sortY2 = y;
            return true;
        }
        return false;
    };
    ItemDrag.prototype._resetStartPredicate = function() {
        var predicate = this._startPredicateData;
        if (predicate) {
            if (predicate.delayTimer) predicate.delayTimer = window.clearTimeout(predicate.delayTimer);
            this._startPredicateData = null;
        }
    };
    ItemDrag.prototype._handleSort = function() {
        if (!this._isActive) return;
        var settings = this._getGrid()._settings;
        if (!settings.dragSort || !settings.dragAutoScroll.sortDuringScroll && ItemDrag.autoScroller.isItemScrolling(this._item)) {
            this._sortX1 = this._sortX2 = this._gridX;
            this._sortY1 = this._sortY2 = this._gridY;
            this._isSortNeeded = true;
            if (this._sortTimer !== void 0) this._sortTimer = window.clearTimeout(this._sortTimer);
            return;
        }
        var shouldSort = this._checkHeuristics(this._gridX, this._gridY);
        if (!this._isSortNeeded && !shouldSort) return;
        var sortInterval = settings.dragSortHeuristics.sortInterval;
        if (sortInterval <= 0 || this._isSortNeeded) {
            this._isSortNeeded = false;
            if (this._sortTimer !== void 0) this._sortTimer = window.clearTimeout(this._sortTimer);
            this._checkOverlap();
        } else if (this._sortTimer === void 0) this._sortTimer = window.setTimeout(this._handleSortDelayed, sortInterval);
    };
    ItemDrag.prototype._handleSortDelayed = function() {
        this._isSortNeeded = true;
        this._sortTimer = void 0;
        addDragSortTick(this._item._id, this._handleSort);
    };
    ItemDrag.prototype._cancelSort = function() {
        this._isSortNeeded = false;
        if (this._sortTimer !== void 0) this._sortTimer = window.clearTimeout(this._sortTimer);
        cancelDragSortTick(this._item._id);
    };
    ItemDrag.prototype._finishSort = function() {
        var isSortEnabled = this._getGrid()._settings.dragSort;
        var needsFinalCheck = isSortEnabled && (this._isSortNeeded || this._sortTimer !== void 0);
        this._cancelSort();
        if (needsFinalCheck) this._checkOverlap();
    };
    ItemDrag.prototype._checkOverlap = function() {
        if (!this._isActive) return;
        var item = this._item;
        var settings = this._getGrid()._settings;
        var result;
        var currentGrid;
        var currentIndex;
        var targetGrid;
        var targetIndex;
        var targetItem;
        var sortAction;
        var isMigration;
        if (muuri_module_isFunction(settings.dragSortPredicate)) result = settings.dragSortPredicate(item, this._dragMoveEvent); else result = ItemDrag.defaultSortPredicate(item, settings.dragSortPredicate);
        if (!result || typeof result.index !== "number") return;
        sortAction = result.action === ACTION_SWAP ? ACTION_SWAP : ACTION_MOVE;
        currentGrid = item.getGrid();
        targetGrid = result.grid || currentGrid;
        isMigration = currentGrid !== targetGrid;
        currentIndex = currentGrid._items.indexOf(item);
        targetIndex = normalizeArrayIndex(targetGrid._items, result.index, isMigration && sortAction === ACTION_MOVE ? 1 : 0);
        if (!isMigration && targetIndex === this._blockedSortIndex) return;
        if (!isMigration) {
            if (currentIndex !== targetIndex) {
                this._blockedSortIndex = currentIndex;
                (sortAction === ACTION_SWAP ? arraySwap : arrayMove)(currentGrid._items, currentIndex, targetIndex);
                if (currentGrid._hasListeners(muuri_module_EVENT_MOVE)) currentGrid._emit(muuri_module_EVENT_MOVE, {
                    item,
                    fromIndex: currentIndex,
                    toIndex: targetIndex,
                    action: sortAction
                });
                currentGrid.layout();
            }
        } else {
            this._blockedSortIndex = null;
            targetItem = targetGrid._items[targetIndex];
            if (currentGrid._hasListeners(EVENT_BEFORE_SEND)) currentGrid._emit(EVENT_BEFORE_SEND, {
                item,
                fromGrid: currentGrid,
                fromIndex: currentIndex,
                toGrid: targetGrid,
                toIndex: targetIndex
            });
            if (targetGrid._hasListeners(EVENT_BEFORE_RECEIVE)) targetGrid._emit(EVENT_BEFORE_RECEIVE, {
                item,
                fromGrid: currentGrid,
                fromIndex: currentIndex,
                toGrid: targetGrid,
                toIndex: targetIndex
            });
            item._gridId = targetGrid._id;
            this._isMigrating = item._gridId !== this._gridId;
            currentGrid._items.splice(currentIndex, 1);
            arrayInsert(targetGrid._items, item, targetIndex);
            item._sortData = null;
            if (currentGrid._hasListeners(EVENT_SEND)) currentGrid._emit(EVENT_SEND, {
                item,
                fromGrid: currentGrid,
                fromIndex: currentIndex,
                toGrid: targetGrid,
                toIndex: targetIndex
            });
            if (targetGrid._hasListeners(EVENT_RECEIVE)) targetGrid._emit(EVENT_RECEIVE, {
                item,
                fromGrid: currentGrid,
                fromIndex: currentIndex,
                toGrid: targetGrid,
                toIndex: targetIndex
            });
            if (sortAction === ACTION_SWAP && targetItem && targetItem.isActive()) if (targetGrid._items.indexOf(targetItem) > -1) targetGrid.send(targetItem, currentGrid, currentIndex, {
                appendTo: this._container || document.body,
                layoutSender: false,
                layoutReceiver: false
            });
            currentGrid.layout();
            targetGrid.layout();
        }
    };
    ItemDrag.prototype._finishMigration = function() {
        var item = this._item;
        var release = item._dragRelease;
        var element = item._element;
        var isActive = item._isActive;
        var targetGrid = item.getGrid();
        var targetGridElement = targetGrid._element;
        var targetSettings = targetGrid._settings;
        var targetContainer = targetSettings.dragContainer || targetGridElement;
        var currentSettings = this._getGrid()._settings;
        var currentContainer = element.parentNode;
        var currentVisClass = isActive ? currentSettings.itemVisibleClass : currentSettings.itemHiddenClass;
        var nextVisClass = isActive ? targetSettings.itemVisibleClass : targetSettings.itemHiddenClass;
        var translate;
        var offsetDiff;
        this._isMigrating = false;
        this.destroy();
        if (currentSettings.itemClass !== targetSettings.itemClass) {
            muuri_module_removeClass(element, currentSettings.itemClass);
            muuri_module_addClass(element, targetSettings.itemClass);
        }
        if (currentVisClass !== nextVisClass) {
            muuri_module_removeClass(element, currentVisClass);
            muuri_module_addClass(element, nextVisClass);
        }
        if (targetContainer !== currentContainer) {
            targetContainer.appendChild(element);
            offsetDiff = getOffsetDiff(currentContainer, targetContainer, true);
            translate = getTranslate(element);
            translate.x -= offsetDiff.left;
            translate.y -= offsetDiff.top;
        }
        item._refreshDimensions();
        offsetDiff = getOffsetDiff(targetContainer, targetGridElement, true);
        release._containerDiffX = offsetDiff.left;
        release._containerDiffY = offsetDiff.top;
        item._drag = targetSettings.dragEnabled ? new ItemDrag(item) : null;
        if (targetContainer !== currentContainer) item._setTranslate(translate.x, translate.y);
        item._visibility.setStyles(isActive ? targetSettings.visibleStyles : targetSettings.hiddenStyles);
        release.start();
    };
    ItemDrag.prototype._preStartCheck = function(event) {
        if (this._startPredicateState === START_PREDICATE_INACTIVE) this._startPredicateState = START_PREDICATE_PENDING;
        if (this._startPredicateState === START_PREDICATE_PENDING) {
            this._startPredicateResult = this._startPredicate(this._item, event);
            if (this._startPredicateResult === true) {
                this._startPredicateState = START_PREDICATE_RESOLVED;
                this._onStart(event);
            } else if (this._startPredicateResult === false) {
                this._resetStartPredicate(event);
                this._dragger._reset();
                this._startPredicateState = START_PREDICATE_INACTIVE;
            }
        } else if (this._startPredicateState === START_PREDICATE_RESOLVED && this._isActive) this._onMove(event);
    };
    ItemDrag.prototype._preEndCheck = function(event) {
        var isResolved = this._startPredicateState === START_PREDICATE_RESOLVED;
        this._startPredicate(this._item, event);
        this._startPredicateState = START_PREDICATE_INACTIVE;
        if (!isResolved || !this._isActive) return;
        if (this._isStarted) this._onEnd(event); else this.stop();
    };
    ItemDrag.prototype._onStart = function(event) {
        var item = this._item;
        if (!item._isActive) return;
        this._isActive = true;
        this._dragStartEvent = event;
        ItemDrag.autoScroller.addItem(item);
        addDragStartTick(item._id, this._prepareStart, this._applyStart);
    };
    ItemDrag.prototype._prepareStart = function() {
        if (!this._isActive) return;
        var item = this._item;
        if (!item._isActive) return;
        var element = item._element;
        var grid = this._getGrid();
        var settings = grid._settings;
        var gridContainer = grid._element;
        var dragContainer = settings.dragContainer || gridContainer;
        var containingBlock = getContainingBlock(dragContainer);
        var translate = getTranslate(element);
        var elementRect = element.getBoundingClientRect();
        var hasDragContainer = dragContainer !== gridContainer;
        this._container = dragContainer;
        this._containingBlock = containingBlock;
        this._clientX = elementRect.left;
        this._clientY = elementRect.top;
        this._left = this._gridX = translate.x;
        this._top = this._gridY = translate.y;
        this._scrollDiffX = this._scrollDiffY = 0;
        this._moveDiffX = this._moveDiffY = 0;
        this._resetHeuristics(this._gridX, this._gridY);
        if (hasDragContainer) {
            var offsetDiff = getOffsetDiff(containingBlock, gridContainer);
            this._containerDiffX = offsetDiff.left;
            this._containerDiffY = offsetDiff.top;
        }
    };
    ItemDrag.prototype._applyStart = function() {
        if (!this._isActive) return;
        var item = this._item;
        if (!item._isActive) return;
        var grid = this._getGrid();
        var element = item._element;
        var release = item._dragRelease;
        var migrate = item._migrate;
        var hasDragContainer = this._container !== grid._element;
        if (item.isPositioning()) item._layout.stop(true, this._left, this._top);
        if (migrate._isActive) {
            this._left -= migrate._containerDiffX;
            this._top -= migrate._containerDiffY;
            this._gridX -= migrate._containerDiffX;
            this._gridY -= migrate._containerDiffY;
            migrate.stop(true, this._left, this._top);
        }
        if (item.isReleasing()) release._reset();
        if (grid._settings.dragPlaceholder.enabled) item._dragPlaceholder.create();
        this._isStarted = true;
        grid._emit(EVENT_DRAG_INIT, item, this._dragStartEvent);
        if (hasDragContainer) if (element.parentNode === this._container) {
            this._gridX -= this._containerDiffX;
            this._gridY -= this._containerDiffY;
        } else {
            this._left += this._containerDiffX;
            this._top += this._containerDiffY;
            this._container.appendChild(element);
            item._setTranslate(this._left, this._top);
        }
        muuri_module_addClass(element, grid._settings.itemDraggingClass);
        this._bindScrollListeners();
        grid._emit(EVENT_DRAG_START, item, this._dragStartEvent);
    };
    ItemDrag.prototype._onMove = function(event) {
        var item = this._item;
        if (!item._isActive) {
            this.stop();
            return;
        }
        this._dragMoveEvent = event;
        addDragMoveTick(item._id, this._prepareMove, this._applyMove);
        addDragSortTick(item._id, this._handleSort);
    };
    ItemDrag.prototype._prepareMove = function() {
        if (!this._isActive) return;
        var item = this._item;
        if (!item._isActive) return;
        var settings = this._getGrid()._settings;
        var axis = settings.dragAxis;
        var nextEvent = this._dragMoveEvent;
        var prevEvent = this._dragPrevMoveEvent || this._dragStartEvent || nextEvent;
        if (axis !== "y") {
            var moveDiffX = nextEvent.clientX - prevEvent.clientX;
            this._left = this._left - this._moveDiffX + moveDiffX;
            this._gridX = this._gridX - this._moveDiffX + moveDiffX;
            this._clientX = this._clientX - this._moveDiffX + moveDiffX;
            this._moveDiffX = moveDiffX;
        }
        if (axis !== "x") {
            var moveDiffY = nextEvent.clientY - prevEvent.clientY;
            this._top = this._top - this._moveDiffY + moveDiffY;
            this._gridY = this._gridY - this._moveDiffY + moveDiffY;
            this._clientY = this._clientY - this._moveDiffY + moveDiffY;
            this._moveDiffY = moveDiffY;
        }
        this._dragPrevMoveEvent = nextEvent;
    };
    ItemDrag.prototype._applyMove = function() {
        if (!this._isActive) return;
        var item = this._item;
        if (!item._isActive) return;
        this._moveDiffX = this._moveDiffY = 0;
        item._setTranslate(this._left, this._top);
        this._getGrid()._emit(EVENT_DRAG_MOVE, item, this._dragMoveEvent);
        ItemDrag.autoScroller.updateItem(item);
    };
    ItemDrag.prototype._onScroll = function(event) {
        var item = this._item;
        if (!item._isActive) {
            this.stop();
            return;
        }
        this._scrollEvent = event;
        addDragScrollTick(item._id, this._prepareScroll, this._applyScroll);
        addDragSortTick(item._id, this._handleSort);
    };
    ItemDrag.prototype._prepareScroll = function() {
        if (!this._isActive) return;
        var item = this._item;
        if (!item._isActive) return;
        var element = item._element;
        var grid = this._getGrid();
        var gridContainer = grid._element;
        var rect = element.getBoundingClientRect();
        if (this._container !== gridContainer) {
            var offsetDiff = getOffsetDiff(this._containingBlock, gridContainer);
            this._containerDiffX = offsetDiff.left;
            this._containerDiffY = offsetDiff.top;
        }
        var scrollDiffX = this._clientX - this._moveDiffX - rect.left;
        this._left = this._left - this._scrollDiffX + scrollDiffX;
        this._scrollDiffX = scrollDiffX;
        var scrollDiffY = this._clientY - this._moveDiffY - rect.top;
        this._top = this._top - this._scrollDiffY + scrollDiffY;
        this._scrollDiffY = scrollDiffY;
        this._gridX = this._left - this._containerDiffX;
        this._gridY = this._top - this._containerDiffY;
    };
    ItemDrag.prototype._applyScroll = function() {
        if (!this._isActive) return;
        var item = this._item;
        if (!item._isActive) return;
        this._scrollDiffX = this._scrollDiffY = 0;
        item._setTranslate(this._left, this._top);
        this._getGrid()._emit(EVENT_DRAG_SCROLL, item, this._scrollEvent);
    };
    ItemDrag.prototype._onEnd = function(event) {
        var item = this._item;
        var element = item._element;
        var grid = this._getGrid();
        var settings = grid._settings;
        var release = item._dragRelease;
        if (!item._isActive) {
            this.stop();
            return;
        }
        cancelDragStartTick(item._id);
        cancelDragMoveTick(item._id);
        cancelDragScrollTick(item._id);
        this._finishSort();
        this._unbindScrollListeners();
        release._containerDiffX = this._containerDiffX;
        release._containerDiffY = this._containerDiffY;
        this._reset();
        muuri_module_removeClass(element, settings.itemDraggingClass);
        ItemDrag.autoScroller.removeItem(item);
        grid._emit(EVENT_DRAG_END, item, event);
        this._isMigrating ? this._finishMigration() : release.start();
    };
    function openAnchorHref(element) {
        if (element.tagName.toLowerCase() !== "a") return;
        var href = element.getAttribute("href");
        if (!href) return;
        var target = element.getAttribute("target");
        if (target && target !== "_self") window.open(href, target); else window.location.href = href;
    }
    function getCurrentStyles(element, styles) {
        var result = {};
        var prop, i;
        if (Array.isArray(styles)) for (i = 0; i < styles.length; i++) {
            prop = styles[i];
            result[prop] = getStyle(element, getStyleName(prop));
        } else for (prop in styles) result[prop] = getStyle(element, getStyleName(prop));
        return result;
    }
    var unprefixRegEx = /^(webkit|moz|ms|o|Webkit|Moz|MS|O)(?=[A-Z])/;
    var cache = {};
    function getUnprefixedPropName(prop) {
        var result = cache[prop];
        if (result) return result;
        result = prop.replace(unprefixRegEx, "");
        if (result !== prop) result = result[0].toLowerCase() + result.slice(1);
        cache[prop] = result;
        return result;
    }
    var nativeCode = "[native code]";
    function isNative(feat) {
        var S = window.Symbol;
        return !!(feat && muuri_module_isFunction(S) && muuri_module_isFunction(S.toString) && S(feat).toString().indexOf(nativeCode) > -1);
    }
    function setStyles(element, styles) {
        for (var prop in styles) element.style[prop] = styles[prop];
    }
    var HAS_WEB_ANIMATIONS = !!(Element && muuri_module_isFunction(Element.prototype.animate));
    var HAS_NATIVE_WEB_ANIMATIONS = !!(Element && isNative(Element.prototype.animate));
    function Animator(element) {
        this._element = element;
        this._animation = null;
        this._duration = 0;
        this._easing = "";
        this._callback = null;
        this._props = [];
        this._values = [];
        this._isDestroyed = false;
        this._onFinish = this._onFinish.bind(this);
    }
    Animator.prototype.start = function(propsFrom, propsTo, options) {
        if (this._isDestroyed) return;
        var element = this._element;
        var opts = options || {};
        if (!HAS_WEB_ANIMATIONS) {
            setStyles(element, propsTo);
            this._callback = muuri_module_isFunction(opts.onFinish) ? opts.onFinish : null;
            this._onFinish();
            return;
        }
        var animation = this._animation;
        var currentProps = this._props;
        var currentValues = this._values;
        var duration = opts.duration || 300;
        var easing = opts.easing || "ease";
        var cancelAnimation = false;
        var propName, propCount, propIndex;
        if (animation) {
            propCount = 0;
            if (duration !== this._duration || easing !== this._easing) cancelAnimation = true;
            if (!cancelAnimation) {
                for (propName in propsTo) {
                    ++propCount;
                    propIndex = currentProps.indexOf(propName);
                    if (propIndex === -1 || propsTo[propName] !== currentValues[propIndex]) {
                        cancelAnimation = true;
                        break;
                    }
                }
                if (propCount !== currentProps.length) cancelAnimation = true;
            }
        }
        if (cancelAnimation) animation.cancel();
        this._callback = muuri_module_isFunction(opts.onFinish) ? opts.onFinish : null;
        if (animation && !cancelAnimation) return;
        currentProps.length = currentValues.length = 0;
        for (propName in propsTo) {
            currentProps.push(propName);
            currentValues.push(propsTo[propName]);
        }
        this._duration = duration;
        this._easing = easing;
        this._animation = element.animate([ createFrame(propsFrom, HAS_NATIVE_WEB_ANIMATIONS), createFrame(propsTo, HAS_NATIVE_WEB_ANIMATIONS) ], {
            duration,
            easing
        });
        this._animation.onfinish = this._onFinish;
        setStyles(element, propsTo);
    };
    Animator.prototype.stop = function() {
        if (this._isDestroyed || !this._animation) return;
        this._animation.cancel();
        this._animation = this._callback = null;
        this._props.length = this._values.length = 0;
    };
    Animator.prototype.getCurrentStyles = function() {
        return getCurrentStyles(element, currentProps);
    };
    Animator.prototype.isAnimating = function() {
        return !!this._animation;
    };
    Animator.prototype.destroy = function() {
        if (this._isDestroyed) return;
        this.stop();
        this._element = null;
        this._isDestroyed = true;
    };
    Animator.prototype._onFinish = function() {
        var callback = this._callback;
        this._animation = this._callback = null;
        this._props.length = this._values.length = 0;
        callback && callback();
    };
    function createFrame(props, prefix) {
        var frame = {};
        for (var prop in props) frame[prefix ? prop : getUnprefixedPropName(prop)] = props[prop];
        return frame;
    }
    function getTranslateString(x, y) {
        return "translateX(" + x + "px) translateY(" + y + "px)";
    }
    function ItemDragPlaceholder(item) {
        this._item = item;
        this._animation = new Animator;
        this._element = null;
        this._className = "";
        this._didMigrate = false;
        this._resetAfterLayout = false;
        this._left = 0;
        this._top = 0;
        this._transX = 0;
        this._transY = 0;
        this._nextTransX = 0;
        this._nextTransY = 0;
        this._setupAnimation = this._setupAnimation.bind(this);
        this._startAnimation = this._startAnimation.bind(this);
        this._updateDimensions = this._updateDimensions.bind(this);
        this._onLayoutStart = this._onLayoutStart.bind(this);
        this._onLayoutEnd = this._onLayoutEnd.bind(this);
        this._onReleaseEnd = this._onReleaseEnd.bind(this);
        this._onMigrate = this._onMigrate.bind(this);
        this._onHide = this._onHide.bind(this);
    }
    ItemDragPlaceholder.prototype._updateDimensions = function() {
        if (!this.isActive()) return;
        setStyles(this._element, {
            width: this._item._width + "px",
            height: this._item._height + "px"
        });
    };
    ItemDragPlaceholder.prototype._onLayoutStart = function(items, isInstant) {
        var item = this._item;
        if (items.indexOf(item) === -1) {
            this.reset();
            return;
        }
        var nextLeft = item._left;
        var nextTop = item._top;
        var currentLeft = this._left;
        var currentTop = this._top;
        this._left = nextLeft;
        this._top = nextTop;
        if (!isInstant && !this._didMigrate && currentLeft === nextLeft && currentTop === nextTop) return;
        var nextX = nextLeft + item._marginLeft;
        var nextY = nextTop + item._marginTop;
        var grid = item.getGrid();
        var animEnabled = !isInstant && grid._settings.layoutDuration > 0;
        if (!animEnabled || this._didMigrate) {
            cancelPlaceholderLayoutTick(item._id);
            this._element.style[transformProp] = getTranslateString(nextX, nextY);
            this._animation.stop();
            if (this._didMigrate) {
                grid.getElement().appendChild(this._element);
                this._didMigrate = false;
            }
            return;
        }
        this._nextTransX = nextX;
        this._nextTransY = nextY;
        addPlaceholderLayoutTick(item._id, this._setupAnimation, this._startAnimation);
    };
    ItemDragPlaceholder.prototype._setupAnimation = function() {
        if (!this.isActive()) return;
        var translate = getTranslate(this._element);
        this._transX = translate.x;
        this._transY = translate.y;
    };
    ItemDragPlaceholder.prototype._startAnimation = function() {
        if (!this.isActive()) return;
        var animation = this._animation;
        var currentX = this._transX;
        var currentY = this._transY;
        var nextX = this._nextTransX;
        var nextY = this._nextTransY;
        if (currentX === nextX && currentY === nextY) {
            if (animation.isAnimating()) {
                this._element.style[transformProp] = getTranslateString(nextX, nextY);
                animation.stop();
            }
            return;
        }
        var settings = this._item.getGrid()._settings;
        var currentStyles = {};
        var targetStyles = {};
        currentStyles[transformProp] = getTranslateString(currentX, currentY);
        targetStyles[transformProp] = getTranslateString(nextX, nextY);
        animation.start(currentStyles, targetStyles, {
            duration: settings.layoutDuration,
            easing: settings.layoutEasing,
            onFinish: this._onLayoutEnd
        });
    };
    ItemDragPlaceholder.prototype._onLayoutEnd = function() {
        if (this._resetAfterLayout) this.reset();
    };
    ItemDragPlaceholder.prototype._onReleaseEnd = function(item) {
        if (item._id === this._item._id) {
            if (!this._animation.isAnimating()) {
                this.reset();
                return;
            }
            this._resetAfterLayout = true;
        }
    };
    ItemDragPlaceholder.prototype._onMigrate = function(data) {
        if (data.item !== this._item) return;
        var grid = this._item.getGrid();
        var nextGrid = data.toGrid;
        grid.off(EVENT_DRAG_RELEASE_END, this._onReleaseEnd);
        grid.off(EVENT_LAYOUT_START, this._onLayoutStart);
        grid.off(EVENT_BEFORE_SEND, this._onMigrate);
        grid.off(EVENT_HIDE_START, this._onHide);
        nextGrid.on(EVENT_DRAG_RELEASE_END, this._onReleaseEnd);
        nextGrid.on(EVENT_LAYOUT_START, this._onLayoutStart);
        nextGrid.on(EVENT_BEFORE_SEND, this._onMigrate);
        nextGrid.on(EVENT_HIDE_START, this._onHide);
        this._didMigrate = true;
    };
    ItemDragPlaceholder.prototype._onHide = function(items) {
        if (items.indexOf(this._item) > -1) this.reset();
    };
    ItemDragPlaceholder.prototype.create = function() {
        if (this.isActive()) {
            this._resetAfterLayout = false;
            return;
        }
        var item = this._item;
        var grid = item.getGrid();
        var settings = grid._settings;
        var animation = this._animation;
        this._left = item._left;
        this._top = item._top;
        var element;
        if (muuri_module_isFunction(settings.dragPlaceholder.createElement)) element = settings.dragPlaceholder.createElement(item); else element = document.createElement("div");
        this._element = element;
        animation._element = element;
        this._className = settings.itemPlaceholderClass || "";
        if (this._className) muuri_module_addClass(element, this._className);
        setStyles(element, {
            position: "absolute",
            left: "0px",
            top: "0px",
            width: item._width + "px",
            height: item._height + "px"
        });
        element.style[transformProp] = getTranslateString(item._left + item._marginLeft, item._top + item._marginTop);
        grid.on(EVENT_LAYOUT_START, this._onLayoutStart);
        grid.on(EVENT_DRAG_RELEASE_END, this._onReleaseEnd);
        grid.on(EVENT_BEFORE_SEND, this._onMigrate);
        grid.on(EVENT_HIDE_START, this._onHide);
        if (muuri_module_isFunction(settings.dragPlaceholder.onCreate)) settings.dragPlaceholder.onCreate(item, element);
        grid.getElement().appendChild(element);
    };
    ItemDragPlaceholder.prototype.reset = function() {
        if (!this.isActive()) return;
        var element = this._element;
        var item = this._item;
        var grid = item.getGrid();
        var settings = grid._settings;
        var animation = this._animation;
        this._resetAfterLayout = false;
        cancelPlaceholderLayoutTick(item._id);
        cancelPlaceholderResizeTick(item._id);
        animation.stop();
        animation._element = null;
        grid.off(EVENT_DRAG_RELEASE_END, this._onReleaseEnd);
        grid.off(EVENT_LAYOUT_START, this._onLayoutStart);
        grid.off(EVENT_BEFORE_SEND, this._onMigrate);
        grid.off(EVENT_HIDE_START, this._onHide);
        if (this._className) {
            muuri_module_removeClass(element, this._className);
            this._className = "";
        }
        element.parentNode.removeChild(element);
        this._element = null;
        if (muuri_module_isFunction(settings.dragPlaceholder.onRemove)) settings.dragPlaceholder.onRemove(item, element);
    };
    ItemDragPlaceholder.prototype.isActive = function() {
        return !!this._element;
    };
    ItemDragPlaceholder.prototype.getElement = function() {
        return this._element;
    };
    ItemDragPlaceholder.prototype.updateDimensions = function() {
        if (!this.isActive()) return;
        addPlaceholderResizeTick(this._item._id, this._updateDimensions);
    };
    ItemDragPlaceholder.prototype.destroy = function() {
        this.reset();
        this._animation.destroy();
        this._item = this._animation = null;
    };
    function ItemDragRelease(item) {
        this._item = item;
        this._isActive = false;
        this._isDestroyed = false;
        this._isPositioningStarted = false;
        this._containerDiffX = 0;
        this._containerDiffY = 0;
    }
    ItemDragRelease.prototype.start = function() {
        if (this._isDestroyed || this._isActive) return;
        var item = this._item;
        var grid = item.getGrid();
        var settings = grid._settings;
        this._isActive = true;
        muuri_module_addClass(item._element, settings.itemReleasingClass);
        if (!settings.dragRelease.useDragContainer) this._placeToGrid();
        grid._emit(EVENT_DRAG_RELEASE_START, item);
        if (!grid._nextLayoutData) item._layout.start(false);
    };
    ItemDragRelease.prototype.stop = function(abort, left, top) {
        if (this._isDestroyed || !this._isActive) return;
        var item = this._item;
        var grid = item.getGrid();
        if (!abort && (left === void 0 || top === void 0)) {
            left = item._left;
            top = item._top;
        }
        var didReparent = this._placeToGrid(left, top);
        this._reset(didReparent);
        if (!abort) grid._emit(EVENT_DRAG_RELEASE_END, item);
    };
    ItemDragRelease.prototype.isJustReleased = function() {
        return this._isActive && this._isPositioningStarted === false;
    };
    ItemDragRelease.prototype.destroy = function() {
        if (this._isDestroyed) return;
        this.stop(true);
        this._item = null;
        this._isDestroyed = true;
    };
    ItemDragRelease.prototype._placeToGrid = function(left, top) {
        if (this._isDestroyed) return;
        var item = this._item;
        var element = item._element;
        var container = item.getGrid()._element;
        var didReparent = false;
        if (element.parentNode !== container) {
            if (left === void 0 || top === void 0) {
                var translate = getTranslate(element);
                left = translate.x - this._containerDiffX;
                top = translate.y - this._containerDiffY;
            }
            container.appendChild(element);
            item._setTranslate(left, top);
            didReparent = true;
        }
        this._containerDiffX = 0;
        this._containerDiffY = 0;
        return didReparent;
    };
    ItemDragRelease.prototype._reset = function(needsReflow) {
        if (this._isDestroyed) return;
        var item = this._item;
        var releasingClass = item.getGrid()._settings.itemReleasingClass;
        this._isActive = false;
        this._isPositioningStarted = false;
        this._containerDiffX = 0;
        this._containerDiffY = 0;
        if (releasingClass) {
            if (needsReflow) item._element.clientWidth;
            muuri_module_removeClass(item._element, releasingClass);
        }
    };
    var MIN_ANIMATION_DISTANCE = 2;
    function ItemLayout(item) {
        var element = item._element;
        var elementStyle = element.style;
        this._item = item;
        this._isActive = false;
        this._isDestroyed = false;
        this._isInterrupted = false;
        this._currentStyles = {};
        this._targetStyles = {};
        this._nextLeft = 0;
        this._nextTop = 0;
        this._offsetLeft = 0;
        this._offsetTop = 0;
        this._skipNextAnimation = false;
        this._animOptions = {
            onFinish: this._finish.bind(this),
            duration: 0,
            easing: 0
        };
        elementStyle.left = "0px";
        elementStyle.top = "0px";
        item._setTranslate(0, 0);
        this._animation = new Animator(element);
        this._queue = "layout-" + item._id;
        this._setupAnimation = this._setupAnimation.bind(this);
        this._startAnimation = this._startAnimation.bind(this);
    }
    ItemLayout.prototype.start = function(instant, onFinish) {
        if (this._isDestroyed) return;
        var item = this._item;
        var release = item._dragRelease;
        var gridSettings = item.getGrid()._settings;
        var isPositioning = this._isActive;
        var isJustReleased = release.isJustReleased();
        var animDuration = isJustReleased ? gridSettings.dragRelease.duration : gridSettings.layoutDuration;
        var animEasing = isJustReleased ? gridSettings.dragRelease.easing : gridSettings.layoutEasing;
        var animEnabled = !instant && !this._skipNextAnimation && animDuration > 0;
        if (isPositioning) {
            cancelLayoutTick(item._id);
            item._emitter.burst(this._queue, true, item);
        }
        if (isJustReleased) release._isPositioningStarted = true;
        if (muuri_module_isFunction(onFinish)) item._emitter.on(this._queue, onFinish);
        this._skipNextAnimation = false;
        if (!animEnabled) {
            this._updateOffsets();
            item._setTranslate(this._nextLeft, this._nextTop);
            this._animation.stop();
            this._finish();
            return;
        }
        if (this._animation.isAnimating()) this._animation._animation.onfinish = null;
        this._isActive = true;
        this._animOptions.easing = animEasing;
        this._animOptions.duration = animDuration;
        this._isInterrupted = isPositioning;
        addLayoutTick(item._id, this._setupAnimation, this._startAnimation);
    };
    ItemLayout.prototype.stop = function(processCallbackQueue, left, top) {
        if (this._isDestroyed || !this._isActive) return;
        var item = this._item;
        cancelLayoutTick(item._id);
        if (this._animation.isAnimating()) {
            if (left === void 0 || top === void 0) {
                var translate = getTranslate(item._element);
                left = translate.x;
                top = translate.y;
            }
            item._setTranslate(left, top);
            this._animation.stop();
        }
        muuri_module_removeClass(item._element, item.getGrid()._settings.itemPositioningClass);
        this._isActive = false;
        if (processCallbackQueue) item._emitter.burst(this._queue, true, item);
    };
    ItemLayout.prototype.destroy = function() {
        if (this._isDestroyed) return;
        var elementStyle = this._item._element.style;
        this.stop(true, 0, 0);
        this._item._emitter.clear(this._queue);
        this._animation.destroy();
        elementStyle[transformProp] = "";
        elementStyle.left = "";
        elementStyle.top = "";
        this._item = null;
        this._currentStyles = null;
        this._targetStyles = null;
        this._animOptions = null;
        this._isDestroyed = true;
    };
    ItemLayout.prototype._updateOffsets = function() {
        if (this._isDestroyed) return;
        var item = this._item;
        var migrate = item._migrate;
        var release = item._dragRelease;
        this._offsetLeft = release._isActive ? release._containerDiffX : migrate._isActive ? migrate._containerDiffX : 0;
        this._offsetTop = release._isActive ? release._containerDiffY : migrate._isActive ? migrate._containerDiffY : 0;
        this._nextLeft = this._item._left + this._offsetLeft;
        this._nextTop = this._item._top + this._offsetTop;
    };
    ItemLayout.prototype._finish = function() {
        if (this._isDestroyed) return;
        var item = this._item;
        var migrate = item._migrate;
        var release = item._dragRelease;
        item._tX = this._nextLeft;
        item._tY = this._nextTop;
        if (this._isActive) {
            this._isActive = false;
            muuri_module_removeClass(item._element, item.getGrid()._settings.itemPositioningClass);
        }
        if (release._isActive) release.stop();
        if (migrate._isActive) migrate.stop();
        item._emitter.burst(this._queue, false, item);
    };
    ItemLayout.prototype._setupAnimation = function() {
        var item = this._item;
        if (item._tX === void 0 || item._tY === void 0) {
            var translate = getTranslate(item._element);
            item._tX = translate.x;
            item._tY = translate.y;
        }
    };
    ItemLayout.prototype._startAnimation = function() {
        var item = this._item;
        var settings = item.getGrid()._settings;
        var isInstant = this._animOptions.duration <= 0;
        this._updateOffsets();
        var xDiff = Math.abs(item._left - (item._tX - this._offsetLeft));
        var yDiff = Math.abs(item._top - (item._tY - this._offsetTop));
        if (isInstant || xDiff < MIN_ANIMATION_DISTANCE && yDiff < MIN_ANIMATION_DISTANCE) {
            if (xDiff || yDiff || this._isInterrupted) item._setTranslate(this._nextLeft, this._nextTop);
            this._animation.stop();
            this._finish();
            return;
        }
        if (!this._isInterrupted) muuri_module_addClass(item._element, settings.itemPositioningClass);
        this._currentStyles[transformProp] = getTranslateString(item._tX, item._tY);
        this._targetStyles[transformProp] = getTranslateString(this._nextLeft, this._nextTop);
        item._tX = item._tY = void 0;
        this._animation.start(this._currentStyles, this._targetStyles, this._animOptions);
    };
    function ItemMigrate(item) {
        this._item = item;
        this._isActive = false;
        this._isDestroyed = false;
        this._container = false;
        this._containerDiffX = 0;
        this._containerDiffY = 0;
    }
    ItemMigrate.prototype.start = function(targetGrid, position, container) {
        if (this._isDestroyed) return;
        var item = this._item;
        var element = item._element;
        var isActive = item.isActive();
        var isVisible = item.isVisible();
        var grid = item.getGrid();
        var settings = grid._settings;
        var targetSettings = targetGrid._settings;
        var targetElement = targetGrid._element;
        var targetItems = targetGrid._items;
        var currentIndex = grid._items.indexOf(item);
        var targetContainer = container || document.body;
        var targetIndex;
        var targetItem;
        var currentContainer;
        var offsetDiff;
        var containerDiff;
        var translate;
        var translateX;
        var translateY;
        var currentVisClass;
        var nextVisClass;
        if (typeof position === "number") targetIndex = normalizeArrayIndex(targetItems, position, 1); else {
            targetItem = targetGrid.getItem(position);
            if (!targetItem) return;
            targetIndex = targetItems.indexOf(targetItem);
        }
        if (item.isPositioning() || this._isActive || item.isReleasing()) {
            translate = getTranslate(element);
            translateX = translate.x;
            translateY = translate.y;
        }
        if (item.isPositioning()) item._layout.stop(true, translateX, translateY);
        if (this._isActive) {
            translateX -= this._containerDiffX;
            translateY -= this._containerDiffY;
            this.stop(true, translateX, translateY);
        }
        if (item.isReleasing()) {
            translateX -= item._dragRelease._containerDiffX;
            translateY -= item._dragRelease._containerDiffY;
            item._dragRelease.stop(true, translateX, translateY);
        }
        item._visibility.stop(true);
        if (item._drag) item._drag.destroy();
        if (grid._hasListeners(EVENT_BEFORE_SEND)) grid._emit(EVENT_BEFORE_SEND, {
            item,
            fromGrid: grid,
            fromIndex: currentIndex,
            toGrid: targetGrid,
            toIndex: targetIndex
        });
        if (targetGrid._hasListeners(EVENT_BEFORE_RECEIVE)) targetGrid._emit(EVENT_BEFORE_RECEIVE, {
            item,
            fromGrid: grid,
            fromIndex: currentIndex,
            toGrid: targetGrid,
            toIndex: targetIndex
        });
        if (settings.itemClass !== targetSettings.itemClass) {
            muuri_module_removeClass(element, settings.itemClass);
            muuri_module_addClass(element, targetSettings.itemClass);
        }
        currentVisClass = isVisible ? settings.itemVisibleClass : settings.itemHiddenClass;
        nextVisClass = isVisible ? targetSettings.itemVisibleClass : targetSettings.itemHiddenClass;
        if (currentVisClass !== nextVisClass) {
            muuri_module_removeClass(element, currentVisClass);
            muuri_module_addClass(element, nextVisClass);
        }
        grid._items.splice(currentIndex, 1);
        arrayInsert(targetItems, item, targetIndex);
        item._gridId = targetGrid._id;
        if (isActive) {
            currentContainer = element.parentNode;
            if (targetContainer !== currentContainer) {
                targetContainer.appendChild(element);
                offsetDiff = getOffsetDiff(targetContainer, currentContainer, true);
                if (!translate) {
                    translate = getTranslate(element);
                    translateX = translate.x;
                    translateY = translate.y;
                }
                item._setTranslate(translateX + offsetDiff.left, translateY + offsetDiff.top);
            }
        } else targetElement.appendChild(element);
        item._visibility.setStyles(isVisible ? targetSettings.visibleStyles : targetSettings.hiddenStyles);
        if (isActive) containerDiff = getOffsetDiff(targetContainer, targetElement, true);
        item._refreshDimensions();
        item._sortData = null;
        item._drag = targetSettings.dragEnabled ? new ItemDrag(item) : null;
        if (isActive) {
            this._isActive = true;
            this._container = targetContainer;
            this._containerDiffX = containerDiff.left;
            this._containerDiffY = containerDiff.top;
        } else {
            this._isActive = false;
            this._container = null;
            this._containerDiffX = 0;
            this._containerDiffY = 0;
        }
        if (grid._hasListeners(EVENT_SEND)) grid._emit(EVENT_SEND, {
            item,
            fromGrid: grid,
            fromIndex: currentIndex,
            toGrid: targetGrid,
            toIndex: targetIndex
        });
        if (targetGrid._hasListeners(EVENT_RECEIVE)) targetGrid._emit(EVENT_RECEIVE, {
            item,
            fromGrid: grid,
            fromIndex: currentIndex,
            toGrid: targetGrid,
            toIndex: targetIndex
        });
    };
    ItemMigrate.prototype.stop = function(abort, left, top) {
        if (this._isDestroyed || !this._isActive) return;
        var item = this._item;
        var element = item._element;
        var grid = item.getGrid();
        var gridElement = grid._element;
        var translate;
        if (this._container !== gridElement) {
            if (left === void 0 || top === void 0) if (abort) {
                translate = getTranslate(element);
                left = translate.x - this._containerDiffX;
                top = translate.y - this._containerDiffY;
            } else {
                left = item._left;
                top = item._top;
            }
            gridElement.appendChild(element);
            item._setTranslate(left, top);
        }
        this._isActive = false;
        this._container = null;
        this._containerDiffX = 0;
        this._containerDiffY = 0;
    };
    ItemMigrate.prototype.destroy = function() {
        if (this._isDestroyed) return;
        this.stop(true);
        this._item = null;
        this._isDestroyed = true;
    };
    function ItemVisibility(item) {
        var isActive = item._isActive;
        var element = item._element;
        var childElement = element.children[0];
        var settings = item.getGrid()._settings;
        if (!childElement) throw new Error("No valid child element found within item element.");
        this._item = item;
        this._isDestroyed = false;
        this._isHidden = !isActive;
        this._isHiding = false;
        this._isShowing = false;
        this._childElement = childElement;
        this._currentStyleProps = [];
        this._animation = new Animator(childElement);
        this._queue = "visibility-" + item._id;
        this._finishShow = this._finishShow.bind(this);
        this._finishHide = this._finishHide.bind(this);
        element.style.display = isActive ? "" : "none";
        muuri_module_addClass(element, isActive ? settings.itemVisibleClass : settings.itemHiddenClass);
        this.setStyles(isActive ? settings.visibleStyles : settings.hiddenStyles);
    }
    ItemVisibility.prototype.show = function(instant, onFinish) {
        if (this._isDestroyed) return;
        var item = this._item;
        var element = item._element;
        var callback = muuri_module_isFunction(onFinish) ? onFinish : null;
        var grid = item.getGrid();
        var settings = grid._settings;
        if (!this._isShowing && !this._isHidden) {
            callback && callback(false, item);
            return;
        }
        if (this._isShowing && !instant) {
            callback && item._emitter.on(this._queue, callback);
            return;
        }
        if (!this._isShowing) {
            item._emitter.burst(this._queue, true, item);
            muuri_module_removeClass(element, settings.itemHiddenClass);
            muuri_module_addClass(element, settings.itemVisibleClass);
            if (!this._isHiding) element.style.display = "";
        }
        callback && item._emitter.on(this._queue, callback);
        this._isShowing = true;
        this._isHiding = this._isHidden = false;
        this._startAnimation(true, instant, this._finishShow);
    };
    ItemVisibility.prototype.hide = function(instant, onFinish) {
        if (this._isDestroyed) return;
        var item = this._item;
        var element = item._element;
        var callback = muuri_module_isFunction(onFinish) ? onFinish : null;
        var grid = item.getGrid();
        var settings = grid._settings;
        if (!this._isHiding && this._isHidden) {
            callback && callback(false, item);
            return;
        }
        if (this._isHiding && !instant) {
            callback && item._emitter.on(this._queue, callback);
            return;
        }
        if (!this._isHiding) {
            item._emitter.burst(this._queue, true, item);
            muuri_module_addClass(element, settings.itemHiddenClass);
            muuri_module_removeClass(element, settings.itemVisibleClass);
        }
        callback && item._emitter.on(this._queue, callback);
        this._isHidden = this._isHiding = true;
        this._isShowing = false;
        this._startAnimation(false, instant, this._finishHide);
    };
    ItemVisibility.prototype.stop = function(processCallbackQueue) {
        if (this._isDestroyed) return;
        if (!this._isHiding && !this._isShowing) return;
        var item = this._item;
        cancelVisibilityTick(item._id);
        this._animation.stop();
        if (processCallbackQueue) item._emitter.burst(this._queue, true, item);
    };
    ItemVisibility.prototype.setStyles = function(styles) {
        var childElement = this._childElement;
        var currentStyleProps = this._currentStyleProps;
        this._removeCurrentStyles();
        for (var prop in styles) {
            currentStyleProps.push(prop);
            childElement.style[prop] = styles[prop];
        }
    };
    ItemVisibility.prototype.destroy = function() {
        if (this._isDestroyed) return;
        var item = this._item;
        var element = item._element;
        var grid = item.getGrid();
        var settings = grid._settings;
        this.stop(true);
        item._emitter.clear(this._queue);
        this._animation.destroy();
        this._removeCurrentStyles();
        muuri_module_removeClass(element, settings.itemVisibleClass);
        muuri_module_removeClass(element, settings.itemHiddenClass);
        element.style.display = "";
        this._isHiding = this._isShowing = false;
        this._isDestroyed = this._isHidden = true;
    };
    ItemVisibility.prototype._startAnimation = function(toVisible, instant, onFinish) {
        if (this._isDestroyed) return;
        var item = this._item;
        var animation = this._animation;
        var childElement = this._childElement;
        var settings = item.getGrid()._settings;
        var targetStyles = toVisible ? settings.visibleStyles : settings.hiddenStyles;
        var duration = toVisible ? settings.showDuration : settings.hideDuration;
        var easing = toVisible ? settings.showEasing : settings.hideEasing;
        var isInstant = instant || duration <= 0;
        var currentStyles;
        if (!targetStyles) {
            onFinish && onFinish();
            return;
        }
        cancelVisibilityTick(item._id);
        if (isInstant) {
            setStyles(childElement, targetStyles);
            animation.stop();
            onFinish && onFinish();
            return;
        }
        if (animation.isAnimating()) animation._animation.onfinish = null;
        addVisibilityTick(item._id, (function() {
            currentStyles = getCurrentStyles(childElement, targetStyles);
        }), (function() {
            animation.start(currentStyles, targetStyles, {
                duration,
                easing,
                onFinish
            });
        }));
    };
    ItemVisibility.prototype._finishShow = function() {
        if (this._isHidden) return;
        this._isShowing = false;
        this._item._emitter.burst(this._queue, false, this._item);
    };
    ItemVisibility.prototype._finishHide = function() {
        if (!this._isHidden) return;
        var item = this._item;
        this._isHiding = false;
        item._layout.stop(true, 0, 0);
        item._element.style.display = "none";
        item._emitter.burst(this._queue, false, item);
    };
    ItemVisibility.prototype._removeCurrentStyles = function() {
        var childElement = this._childElement;
        var currentStyleProps = this._currentStyleProps;
        for (var i = 0; i < currentStyleProps.length; i++) childElement.style[currentStyleProps[i]] = "";
        currentStyleProps.length = 0;
    };
    var id = 0;
    function createUid() {
        return ++id;
    }
    function Item(grid, element, isActive) {
        var settings = grid._settings;
        if (ITEM_ELEMENT_MAP) if (ITEM_ELEMENT_MAP.has(element)) throw new Error("You can only create one Muuri Item per element!"); else ITEM_ELEMENT_MAP.set(element, this);
        this._id = createUid();
        this._gridId = grid._id;
        this._element = element;
        this._isDestroyed = false;
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._height = 0;
        this._marginLeft = 0;
        this._marginRight = 0;
        this._marginTop = 0;
        this._marginBottom = 0;
        this._tX = void 0;
        this._tY = void 0;
        this._sortData = null;
        this._emitter = new Emitter;
        if (element.parentNode !== grid._element) grid._element.appendChild(element);
        muuri_module_addClass(element, settings.itemClass);
        if (typeof isActive !== "boolean") isActive = getStyle(element, "display") !== "none";
        this._isActive = isActive;
        this._visibility = new ItemVisibility(this);
        this._layout = new ItemLayout(this);
        this._migrate = new ItemMigrate(this);
        this._drag = settings.dragEnabled ? new ItemDrag(this) : null;
        this._dragRelease = new ItemDragRelease(this);
        this._dragPlaceholder = new ItemDragPlaceholder(this);
    }
    Item.prototype.getGrid = function() {
        return GRID_INSTANCES[this._gridId];
    };
    Item.prototype.getElement = function() {
        return this._element;
    };
    Item.prototype.getWidth = function() {
        return this._width;
    };
    Item.prototype.getHeight = function() {
        return this._height;
    };
    Item.prototype.getMargin = function() {
        return {
            left: this._marginLeft,
            right: this._marginRight,
            top: this._marginTop,
            bottom: this._marginBottom
        };
    };
    Item.prototype.getPosition = function() {
        return {
            left: this._left,
            top: this._top
        };
    };
    Item.prototype.isActive = function() {
        return this._isActive;
    };
    Item.prototype.isVisible = function() {
        return !!this._visibility && !this._visibility._isHidden;
    };
    Item.prototype.isShowing = function() {
        return !!(this._visibility && this._visibility._isShowing);
    };
    Item.prototype.isHiding = function() {
        return !!(this._visibility && this._visibility._isHiding);
    };
    Item.prototype.isPositioning = function() {
        return !!(this._layout && this._layout._isActive);
    };
    Item.prototype.isDragging = function() {
        return !!(this._drag && this._drag._isActive);
    };
    Item.prototype.isReleasing = function() {
        return !!(this._dragRelease && this._dragRelease._isActive);
    };
    Item.prototype.isDestroyed = function() {
        return this._isDestroyed;
    };
    Item.prototype._refreshDimensions = function(force) {
        if (this._isDestroyed) return;
        if (force !== true && this._visibility._isHidden) return;
        var element = this._element;
        var dragPlaceholder = this._dragPlaceholder;
        var rect = element.getBoundingClientRect();
        this._width = rect.width;
        this._height = rect.height;
        this._marginLeft = Math.max(0, getStyleAsFloat(element, "margin-left"));
        this._marginRight = Math.max(0, getStyleAsFloat(element, "margin-right"));
        this._marginTop = Math.max(0, getStyleAsFloat(element, "margin-top"));
        this._marginBottom = Math.max(0, getStyleAsFloat(element, "margin-bottom"));
        if (dragPlaceholder) dragPlaceholder.updateDimensions();
    };
    Item.prototype._refreshSortData = function() {
        if (this._isDestroyed) return;
        var data = this._sortData = {};
        var getters = this.getGrid()._settings.sortData;
        var prop;
        for (prop in getters) data[prop] = getters[prop](this, this._element);
    };
    Item.prototype._addToLayout = function(left, top) {
        if (this._isActive === true) return;
        this._isActive = true;
        this._left = left || 0;
        this._top = top || 0;
    };
    Item.prototype._removeFromLayout = function() {
        if (this._isActive === false) return;
        this._isActive = false;
        this._left = 0;
        this._top = 0;
    };
    Item.prototype._canSkipLayout = function(left, top) {
        return this._left === left && this._top === top && !this._migrate._isActive && !this._layout._skipNextAnimation && !this._dragRelease.isJustReleased();
    };
    Item.prototype._setTranslate = function(left, top) {
        if (this._tX === left && this._tY === top) return false;
        this._tX = left;
        this._tY = top;
        this._element.style[transformProp] = getTranslateString(left, top);
        return true;
    };
    Item.prototype._destroy = function(removeElement) {
        if (this._isDestroyed) return;
        var element = this._element;
        var grid = this.getGrid();
        var settings = grid._settings;
        this._dragPlaceholder.destroy();
        this._dragRelease.destroy();
        this._migrate.destroy();
        this._layout.destroy();
        this._visibility.destroy();
        if (this._drag) this._drag.destroy();
        this._emitter.destroy();
        muuri_module_removeClass(element, settings.itemClass);
        if (removeElement) element.parentNode.removeChild(element);
        if (ITEM_ELEMENT_MAP) ITEM_ELEMENT_MAP.delete(element);
        this._isActive = false;
        this._isDestroyed = true;
    };
    function createPackerProcessor(isWorker) {
        var FILL_GAPS = 1;
        var HORIZONTAL = 2;
        var ALIGN_RIGHT = 4;
        var ALIGN_BOTTOM = 8;
        var ROUNDING = 16;
        var EPS = .001;
        var MIN_SLOT_SIZE = .5;
        function roundNumber(number) {
            return ((number * 1e3 + .5 << 0) / 10 << 0) / 100;
        }
        function PackerProcessor() {
            this.currentRects = [];
            this.nextRects = [];
            this.rectTarget = {};
            this.rectStore = [];
            this.slotSizes = [];
            this.rectId = 0;
            this.slotIndex = -1;
            this.slotData = {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            };
            this.sortRectsLeftTop = this.sortRectsLeftTop.bind(this);
            this.sortRectsTopLeft = this.sortRectsTopLeft.bind(this);
        }
        PackerProcessor.prototype.computeLayout = function(layout, settings) {
            var items = layout.items;
            var slots = layout.slots;
            var fillGaps = !!(settings & FILL_GAPS);
            var horizontal = !!(settings & HORIZONTAL);
            var alignRight = !!(settings & ALIGN_RIGHT);
            var alignBottom = !!(settings & ALIGN_BOTTOM);
            var rounding = !!(settings & ROUNDING);
            var isPreProcessed = typeof items[0] === "number";
            var i, bump, item, slotWidth, slotHeight, slot;
            if (!items.length) return layout;
            bump = isPreProcessed ? 2 : 1;
            for (i = 0; i < items.length; i += bump) {
                if (isPreProcessed) {
                    slotWidth = items[i];
                    slotHeight = items[i + 1];
                } else {
                    item = items[i];
                    slotWidth = item._width + item._marginLeft + item._marginRight;
                    slotHeight = item._height + item._marginTop + item._marginBottom;
                }
                if (rounding) {
                    slotWidth = roundNumber(slotWidth);
                    slotHeight = roundNumber(slotHeight);
                }
                slot = this.computeNextSlot(layout, slotWidth, slotHeight, fillGaps, horizontal);
                if (horizontal) {
                    if (slot.left + slot.width > layout.width) layout.width = slot.left + slot.width;
                } else if (slot.top + slot.height > layout.height) layout.height = slot.top + slot.height;
                slots[++this.slotIndex] = slot.left;
                slots[++this.slotIndex] = slot.top;
                if (alignRight || alignBottom) this.slotSizes.push(slot.width, slot.height);
            }
            if (alignRight) for (i = 0; i < slots.length; i += 2) slots[i] = layout.width - (slots[i] + this.slotSizes[i]);
            if (alignBottom) for (i = 1; i < slots.length; i += 2) slots[i] = layout.height - (slots[i] + this.slotSizes[i]);
            this.slotSizes.length = 0;
            this.currentRects.length = 0;
            this.nextRects.length = 0;
            this.rectStore.length = 0;
            this.rectId = 0;
            this.slotIndex = -1;
            return layout;
        };
        PackerProcessor.prototype.computeNextSlot = function(layout, slotWidth, slotHeight, fillGaps, horizontal) {
            var slot = this.slotData;
            var currentRects = this.currentRects;
            var nextRects = this.nextRects;
            var ignoreCurrentRects = false;
            var rect;
            var rectId;
            var shards;
            var i;
            var j;
            nextRects.length = 0;
            slot.left = null;
            slot.top = null;
            slot.width = slotWidth;
            slot.height = slotHeight;
            for (i = 0; i < currentRects.length; i++) {
                rectId = currentRects[i];
                if (!rectId) continue;
                rect = this.getRect(rectId);
                if (slot.width <= rect.width + EPS && slot.height <= rect.height + EPS) {
                    slot.left = rect.left;
                    slot.top = rect.top;
                    break;
                }
            }
            if (slot.left === null) {
                if (horizontal) {
                    slot.left = layout.width;
                    slot.top = 0;
                } else {
                    slot.left = 0;
                    slot.top = layout.height;
                }
                if (!fillGaps) ignoreCurrentRects = true;
            }
            if (!horizontal && slot.top + slot.height > layout.height + EPS) {
                if (slot.left > MIN_SLOT_SIZE) nextRects.push(this.addRect(0, layout.height, slot.left, 1 / 0));
                if (slot.left + slot.width < layout.width - MIN_SLOT_SIZE) nextRects.push(this.addRect(slot.left + slot.width, layout.height, layout.width - slot.left - slot.width, 1 / 0));
                layout.height = slot.top + slot.height;
            }
            if (horizontal && slot.left + slot.width > layout.width + EPS) {
                if (slot.top > MIN_SLOT_SIZE) nextRects.push(this.addRect(layout.width, 0, 1 / 0, slot.top));
                if (slot.top + slot.height < layout.height - MIN_SLOT_SIZE) nextRects.push(this.addRect(layout.width, slot.top + slot.height, 1 / 0, layout.height - slot.top - slot.height));
                layout.width = slot.left + slot.width;
            }
            if (!ignoreCurrentRects) {
                if (fillGaps) i = 0;
                for (;i < currentRects.length; i++) {
                    rectId = currentRects[i];
                    if (!rectId) continue;
                    rect = this.getRect(rectId);
                    shards = this.splitRect(rect, slot);
                    for (j = 0; j < shards.length; j++) {
                        rectId = shards[j];
                        rect = this.getRect(rectId);
                        if (horizontal ? rect.left + EPS < layout.width - EPS : rect.top + EPS < layout.height - EPS) nextRects.push(rectId);
                    }
                }
            }
            if (nextRects.length > 1) this.purgeRects(nextRects).sort(horizontal ? this.sortRectsLeftTop : this.sortRectsTopLeft);
            this.currentRects = nextRects;
            this.nextRects = currentRects;
            return slot;
        };
        PackerProcessor.prototype.addRect = function(left, top, width, height) {
            var rectId = ++this.rectId;
            this.rectStore[rectId] = left || 0;
            this.rectStore[++this.rectId] = top || 0;
            this.rectStore[++this.rectId] = width || 0;
            this.rectStore[++this.rectId] = height || 0;
            return rectId;
        };
        PackerProcessor.prototype.getRect = function(id, target) {
            if (!target) target = this.rectTarget;
            target.left = this.rectStore[id] || 0;
            target.top = this.rectStore[++id] || 0;
            target.width = this.rectStore[++id] || 0;
            target.height = this.rectStore[++id] || 0;
            return target;
        };
        PackerProcessor.prototype.splitRect = function() {
            var shards = [];
            var width = 0;
            var height = 0;
            return function(rect, hole) {
                shards.length = 0;
                if (rect.left + rect.width <= hole.left + EPS || hole.left + hole.width <= rect.left + EPS || rect.top + rect.height <= hole.top + EPS || hole.top + hole.height <= rect.top + EPS) {
                    shards.push(this.addRect(rect.left, rect.top, rect.width, rect.height));
                    return shards;
                }
                width = hole.left - rect.left;
                if (width >= MIN_SLOT_SIZE) shards.push(this.addRect(rect.left, rect.top, width, rect.height));
                width = rect.left + rect.width - (hole.left + hole.width);
                if (width >= MIN_SLOT_SIZE) shards.push(this.addRect(hole.left + hole.width, rect.top, width, rect.height));
                height = hole.top - rect.top;
                if (height >= MIN_SLOT_SIZE) shards.push(this.addRect(rect.left, rect.top, rect.width, height));
                height = rect.top + rect.height - (hole.top + hole.height);
                if (height >= MIN_SLOT_SIZE) shards.push(this.addRect(rect.left, hole.top + hole.height, rect.width, height));
                return shards;
            };
        }();
        PackerProcessor.prototype.isRectAWithinRectB = function(a, b) {
            return a.left + EPS >= b.left && a.top + EPS >= b.top && a.left + a.width - EPS <= b.left + b.width && a.top + a.height - EPS <= b.top + b.height;
        };
        PackerProcessor.prototype.purgeRects = function() {
            var rectA = {};
            var rectB = {};
            return function(rectIds) {
                var i = rectIds.length;
                var j;
                while (i--) {
                    j = rectIds.length;
                    if (!rectIds[i]) continue;
                    this.getRect(rectIds[i], rectA);
                    while (j--) {
                        if (!rectIds[j] || i === j) continue;
                        this.getRect(rectIds[j], rectB);
                        if (this.isRectAWithinRectB(rectA, rectB)) {
                            rectIds[i] = 0;
                            break;
                        }
                    }
                }
                return rectIds;
            };
        }();
        PackerProcessor.prototype.sortRectsTopLeft = function() {
            var rectA = {};
            var rectB = {};
            return function(aId, bId) {
                this.getRect(aId, rectA);
                this.getRect(bId, rectB);
                return rectA.top < rectB.top && rectA.top + EPS < rectB.top ? -1 : rectA.top > rectB.top && rectA.top - EPS > rectB.top ? 1 : rectA.left < rectB.left && rectA.left + EPS < rectB.left ? -1 : rectA.left > rectB.left && rectA.left - EPS > rectB.left ? 1 : 0;
            };
        }();
        PackerProcessor.prototype.sortRectsLeftTop = function() {
            var rectA = {};
            var rectB = {};
            return function(aId, bId) {
                this.getRect(aId, rectA);
                this.getRect(bId, rectB);
                return rectA.left < rectB.left && rectA.left + EPS < rectB.left ? -1 : rectA.left > rectB.left && rectA.left - EPS < rectB.left ? 1 : rectA.top < rectB.top && rectA.top + EPS < rectB.top ? -1 : rectA.top > rectB.top && rectA.top - EPS > rectB.top ? 1 : 0;
            };
        }();
        if (isWorker) {
            var PACKET_INDEX_WIDTH = 1;
            var PACKET_INDEX_HEIGHT = 2;
            var PACKET_INDEX_OPTIONS = 3;
            var PACKET_HEADER_SLOTS = 4;
            var processor = new PackerProcessor;
            self.onmessage = function(msg) {
                var data = new Float32Array(msg.data);
                var items = data.subarray(PACKET_HEADER_SLOTS, data.length);
                var slots = new Float32Array(items.length);
                var settings = data[PACKET_INDEX_OPTIONS];
                var layout = {
                    items,
                    slots,
                    width: data[PACKET_INDEX_WIDTH],
                    height: data[PACKET_INDEX_HEIGHT]
                };
                processor.computeLayout(layout, settings);
                data[PACKET_INDEX_WIDTH] = layout.width;
                data[PACKET_INDEX_HEIGHT] = layout.height;
                data.set(layout.slots, PACKET_HEADER_SLOTS);
                postMessage(data.buffer, [ data.buffer ]);
            };
        }
        return PackerProcessor;
    }
    var PackerProcessor = createPackerProcessor();
    var blobUrl = null;
    var activeWorkers = [];
    function createWorkerProcessors(amount, onmessage) {
        var workers = [];
        if (amount > 0) {
            if (!blobUrl) blobUrl = URL.createObjectURL(new Blob([ "(" + createPackerProcessor.toString() + ")(true)" ], {
                type: "application/javascript"
            }));
            for (var worker, i = 0; i < amount; i++) {
                worker = new Worker(blobUrl);
                if (onmessage) worker.onmessage = onmessage;
                workers.push(worker);
                activeWorkers.push(worker);
            }
        }
        return workers;
    }
    function destroyWorkerProcessors(workers) {
        var worker;
        var index;
        for (var i = 0; i < workers.length; i++) {
            worker = workers[i];
            worker.onmessage = null;
            worker.onerror = null;
            worker.onmessageerror = null;
            worker.terminate();
            index = activeWorkers.indexOf(worker);
            if (index > -1) activeWorkers.splice(index, 1);
        }
        if (blobUrl && !activeWorkers.length) {
            URL.revokeObjectURL(blobUrl);
            blobUrl = null;
        }
    }
    function isWorkerProcessorsSupported() {
        return !!(window.Worker && window.URL && window.Blob);
    }
    var FILL_GAPS = 1;
    var HORIZONTAL = 2;
    var ALIGN_RIGHT = 4;
    var ALIGN_BOTTOM = 8;
    var ROUNDING = 16;
    var PACKET_INDEX_ID = 0;
    var PACKET_INDEX_WIDTH = 1;
    var PACKET_INDEX_HEIGHT = 2;
    var PACKET_INDEX_OPTIONS = 3;
    var PACKET_HEADER_SLOTS = 4;
    function Packer(numWorkers, options) {
        this._options = 0;
        this._processor = null;
        this._layoutQueue = [];
        this._layouts = {};
        this._layoutCallbacks = {};
        this._layoutWorkers = {};
        this._layoutWorkerData = {};
        this._workers = [];
        this._onWorkerMessage = this._onWorkerMessage.bind(this);
        this.setOptions(options);
        numWorkers = typeof numWorkers === "number" ? Math.max(0, numWorkers) : 0;
        if (numWorkers && isWorkerProcessorsSupported()) try {
            this._workers = createWorkerProcessors(numWorkers, this._onWorkerMessage);
        } catch (e) {
            this._processor = new PackerProcessor;
        } else this._processor = new PackerProcessor;
    }
    Packer.prototype._sendToWorker = function() {
        if (!this._layoutQueue.length || !this._workers.length) return;
        var layoutId = this._layoutQueue.shift();
        var worker = this._workers.pop();
        var data = this._layoutWorkerData[layoutId];
        delete this._layoutWorkerData[layoutId];
        this._layoutWorkers[layoutId] = worker;
        worker.postMessage(data.buffer, [ data.buffer ]);
    };
    Packer.prototype._onWorkerMessage = function(msg) {
        var data = new Float32Array(msg.data);
        var layoutId = data[PACKET_INDEX_ID];
        var layout = this._layouts[layoutId];
        var callback = this._layoutCallbacks[layoutId];
        var worker = this._layoutWorkers[layoutId];
        if (layout) delete this._layouts[layoutId];
        if (callback) delete this._layoutCallbacks[layoutId];
        if (worker) delete this._layoutWorkers[layoutId];
        if (layout && callback) {
            layout.width = data[PACKET_INDEX_WIDTH];
            layout.height = data[PACKET_INDEX_HEIGHT];
            layout.slots = data.subarray(PACKET_HEADER_SLOTS, data.length);
            this._finalizeLayout(layout);
            callback(layout);
        }
        if (worker) {
            this._workers.push(worker);
            this._sendToWorker();
        }
    };
    Packer.prototype._finalizeLayout = function(layout) {
        var grid = layout._grid;
        var isHorizontal = layout._settings & HORIZONTAL;
        var isBorderBox = grid._boxSizing === "border-box";
        delete layout._grid;
        delete layout._settings;
        layout.styles = {};
        if (isHorizontal) layout.styles.width = (isBorderBox ? layout.width + grid._borderLeft + grid._borderRight : layout.width) + "px"; else layout.styles.height = (isBorderBox ? layout.height + grid._borderTop + grid._borderBottom : layout.height) + "px";
        return layout;
    };
    Packer.prototype.setOptions = function(options) {
        if (!options) return;
        var fillGaps;
        if (typeof options.fillGaps === "boolean") fillGaps = options.fillGaps ? FILL_GAPS : 0; else fillGaps = this._options & FILL_GAPS;
        var horizontal;
        if (typeof options.horizontal === "boolean") horizontal = options.horizontal ? HORIZONTAL : 0; else horizontal = this._options & HORIZONTAL;
        var alignRight;
        if (typeof options.alignRight === "boolean") alignRight = options.alignRight ? ALIGN_RIGHT : 0; else alignRight = this._options & ALIGN_RIGHT;
        var alignBottom;
        if (typeof options.alignBottom === "boolean") alignBottom = options.alignBottom ? ALIGN_BOTTOM : 0; else alignBottom = this._options & ALIGN_BOTTOM;
        var rounding;
        if (typeof options.rounding === "boolean") rounding = options.rounding ? ROUNDING : 0; else rounding = this._options & ROUNDING;
        this._options = fillGaps | horizontal | alignRight | alignBottom | rounding;
    };
    Packer.prototype.createLayout = function(grid, layoutId, items, width, height, callback) {
        if (this._layouts[layoutId]) throw new Error("A layout with the provided id is currently being processed.");
        var horizontal = this._options & HORIZONTAL;
        var layout = {
            id: layoutId,
            items,
            slots: null,
            width: horizontal ? 0 : width,
            height: !horizontal ? 0 : height,
            _grid: grid,
            _settings: this._options
        };
        if (!items.length) {
            layout.slots = [];
            this._finalizeLayout(layout);
            callback(layout);
            return;
        }
        if (this._processor) {
            layout.slots = window.Float32Array ? new Float32Array(items.length * 2) : new Array(items.length * 2);
            this._processor.computeLayout(layout, layout._settings);
            this._finalizeLayout(layout);
            callback(layout);
            return;
        }
        var data = new Float32Array(PACKET_HEADER_SLOTS + items.length * 2);
        data[PACKET_INDEX_ID] = layoutId;
        data[PACKET_INDEX_WIDTH] = layout.width;
        data[PACKET_INDEX_HEIGHT] = layout.height;
        data[PACKET_INDEX_OPTIONS] = layout._settings;
        var i, j, item;
        for (i = 0, j = PACKET_HEADER_SLOTS - 1, item; i < items.length; i++) {
            item = items[i];
            data[++j] = item._width + item._marginLeft + item._marginRight;
            data[++j] = item._height + item._marginTop + item._marginBottom;
        }
        this._layoutQueue.push(layoutId);
        this._layouts[layoutId] = layout;
        this._layoutCallbacks[layoutId] = callback;
        this._layoutWorkerData[layoutId] = data;
        this._sendToWorker();
        return this.cancelLayout.bind(this, layoutId);
    };
    Packer.prototype.cancelLayout = function(layoutId) {
        var layout = this._layouts[layoutId];
        if (!layout) return;
        delete this._layouts[layoutId];
        delete this._layoutCallbacks[layoutId];
        if (this._layoutWorkerData[layoutId]) {
            delete this._layoutWorkerData[layoutId];
            var queueIndex = this._layoutQueue.indexOf(layoutId);
            if (queueIndex > -1) this._layoutQueue.splice(queueIndex, 1);
        }
    };
    Packer.prototype.destroy = function() {
        for (var key in this._layoutWorkers) this._workers.push(this._layoutWorkers[key]);
        destroyWorkerProcessors(this._workers);
        this._workers.length = 0;
        this._layoutQueue.length = 0;
        this._layouts = {};
        this._layoutCallbacks = {};
        this._layoutWorkers = {};
        this._layoutWorkerData = {};
    };
    var debounceId = 0;
    function muuri_module_debounce(fn, durationMs) {
        var id = ++debounceId;
        var timer = 0;
        var lastTime = 0;
        var isCanceled = false;
        var tick = function(time) {
            if (isCanceled) return;
            if (lastTime) timer -= time - lastTime;
            lastTime = time;
            if (timer > 0) addDebounceTick(id, tick); else {
                timer = lastTime = 0;
                fn();
            }
        };
        return function(cancel) {
            if (isCanceled) return;
            if (durationMs <= 0) {
                if (cancel !== true) fn();
                return;
            }
            if (cancel === true) {
                isCanceled = true;
                timer = lastTime = 0;
                tick = void 0;
                cancelDebounceTick(id);
                return;
            }
            if (timer <= 0) {
                timer = durationMs;
                tick(0);
            } else timer = durationMs;
        };
    }
    var htmlCollectionType = "[object HTMLCollection]";
    var nodeListType = "[object NodeList]";
    function isNodeList(val) {
        var type = Object.prototype.toString.call(val);
        return type === htmlCollectionType || type === nodeListType;
    }
    var objectType = "object";
    var objectToStringType = "[object Object]";
    var muuri_module_toString = Object.prototype.toString;
    function isPlainObject(val) {
        return typeof val === objectType && muuri_module_toString.call(val) === objectToStringType;
    }
    function muuri_module_noop() {}
    function muuri_module_toArray(val) {
        return isNodeList(val) ? Array.prototype.slice.call(val) : Array.prototype.concat(val);
    }
    var NUMBER_TYPE = "number";
    var STRING_TYPE = "string";
    var INSTANT_LAYOUT = "instant";
    var layoutId = 0;
    function muuri_module_Grid(element, options) {
        if (typeof element === STRING_TYPE) element = document.querySelector(element);
        var isElementInDom = element.getRootNode ? element.getRootNode({
            composed: true
        }) === document : document.body.contains(element);
        if (!isElementInDom || element === document.documentElement) throw new Error("Container element must be an existing DOM element.");
        var settings = mergeSettings(muuri_module_Grid.defaultOptions, options);
        settings.visibleStyles = normalizeStyles(settings.visibleStyles);
        settings.hiddenStyles = normalizeStyles(settings.hiddenStyles);
        if (!muuri_module_isFunction(settings.dragSort)) settings.dragSort = !!settings.dragSort;
        this._id = createUid();
        this._element = element;
        this._settings = settings;
        this._isDestroyed = false;
        this._items = [];
        this._layout = {
            id: 0,
            items: [],
            slots: []
        };
        this._isLayoutFinished = true;
        this._nextLayoutData = null;
        this._emitter = new Emitter;
        this._onLayoutDataReceived = this._onLayoutDataReceived.bind(this);
        GRID_INSTANCES[this._id] = this;
        muuri_module_addClass(element, settings.containerClass);
        bindLayoutOnResize(this, settings.layoutOnResize);
        this.add(getInitialGridElements(element, settings.items), {
            layout: false
        });
        if (settings.layoutOnInit) this.layout(true);
    }
    muuri_module_Grid.Item = Item;
    muuri_module_Grid.ItemLayout = ItemLayout;
    muuri_module_Grid.ItemVisibility = ItemVisibility;
    muuri_module_Grid.ItemMigrate = ItemMigrate;
    muuri_module_Grid.ItemDrag = ItemDrag;
    muuri_module_Grid.ItemDragRelease = ItemDragRelease;
    muuri_module_Grid.ItemDragPlaceholder = ItemDragPlaceholder;
    muuri_module_Grid.Emitter = Emitter;
    muuri_module_Grid.Animator = Animator;
    muuri_module_Grid.Dragger = Dragger;
    muuri_module_Grid.Packer = Packer;
    muuri_module_Grid.AutoScroller = AutoScroller;
    muuri_module_Grid.defaultPacker = new Packer(2);
    muuri_module_Grid.defaultOptions = {
        items: "*",
        showDuration: 300,
        showEasing: "ease",
        hideDuration: 300,
        hideEasing: "ease",
        visibleStyles: {
            opacity: "1",
            transform: "scale(1)"
        },
        hiddenStyles: {
            opacity: "0",
            transform: "scale(0.5)"
        },
        layout: {
            fillGaps: false,
            horizontal: false,
            alignRight: false,
            alignBottom: false,
            rounding: false
        },
        layoutOnResize: 150,
        layoutOnInit: true,
        layoutDuration: 300,
        layoutEasing: "ease",
        sortData: null,
        dragEnabled: false,
        dragContainer: null,
        dragHandle: null,
        dragStartPredicate: {
            distance: 0,
            delay: 0
        },
        dragAxis: "xy",
        dragSort: true,
        dragSortHeuristics: {
            sortInterval: 100,
            minDragDistance: 10,
            minBounceBackAngle: 1
        },
        dragSortPredicate: {
            threshold: 50,
            action: ACTION_MOVE,
            migrateAction: ACTION_MOVE
        },
        dragRelease: {
            duration: 300,
            easing: "ease",
            useDragContainer: true
        },
        dragCssProps: {
            touchAction: "none",
            userSelect: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0, 0, 0, 0)",
            touchCallout: "none",
            contentZooming: "none"
        },
        dragPlaceholder: {
            enabled: false,
            createElement: null,
            onCreate: null,
            onRemove: null
        },
        dragAutoScroll: {
            targets: [],
            handle: null,
            threshold: 50,
            safeZone: .2,
            speed: AutoScroller.smoothSpeed(1e3, 2e3, 2500),
            sortDuringScroll: true,
            smoothStop: false,
            onStart: null,
            onStop: null
        },
        containerClass: "muuri",
        itemClass: "muuri-item",
        itemVisibleClass: "muuri-item-shown",
        itemHiddenClass: "muuri-item-hidden",
        itemPositioningClass: "muuri-item-positioning",
        itemDraggingClass: "muuri-item-dragging",
        itemReleasingClass: "muuri-item-releasing",
        itemPlaceholderClass: "muuri-item-placeholder"
    };
    muuri_module_Grid.prototype.on = function(event, listener) {
        this._emitter.on(event, listener);
        return this;
    };
    muuri_module_Grid.prototype.off = function(event, listener) {
        this._emitter.off(event, listener);
        return this;
    };
    muuri_module_Grid.prototype.getElement = function() {
        return this._element;
    };
    muuri_module_Grid.prototype.getItem = function(target) {
        if (this._isDestroyed || !target && target !== 0) return null;
        if (typeof target === NUMBER_TYPE) return this._items[target > -1 ? target : this._items.length + target] || null;
        if (target instanceof Item) return target._gridId === this._id ? target : null;
        if (ITEM_ELEMENT_MAP) {
            var item = ITEM_ELEMENT_MAP.get(target);
            return item && item._gridId === this._id ? item : null;
        } else for (var i = 0; i < this._items.length; i++) if (this._items[i]._element === target) return this._items[i];
        return null;
    };
    muuri_module_Grid.prototype.getItems = function(targets) {
        if (this._isDestroyed || targets === void 0) return this._items.slice(0);
        var items = [];
        var i, item;
        if (Array.isArray(targets) || isNodeList(targets)) for (i = 0; i < targets.length; i++) {
            item = this.getItem(targets[i]);
            if (item) items.push(item);
        } else {
            item = this.getItem(targets);
            if (item) items.push(item);
        }
        return items;
    };
    muuri_module_Grid.prototype.refreshItems = function(items, force) {
        if (this._isDestroyed) return this;
        var targets = items || this._items;
        var i, item, style, hiddenItemStyles;
        if (force === true) {
            hiddenItemStyles = [];
            for (i = 0; i < targets.length; i++) {
                item = targets[i];
                if (!item.isVisible() && !item.isHiding()) {
                    style = item.getElement().style;
                    style.visibility = "hidden";
                    style.display = "";
                    hiddenItemStyles.push(style);
                }
            }
        }
        for (i = 0; i < targets.length; i++) targets[i]._refreshDimensions(force);
        if (force === true) {
            for (i = 0; i < hiddenItemStyles.length; i++) {
                style = hiddenItemStyles[i];
                style.visibility = "";
                style.display = "none";
            }
            hiddenItemStyles.length = 0;
        }
        return this;
    };
    muuri_module_Grid.prototype.refreshSortData = function(items) {
        if (this._isDestroyed) return this;
        var targets = items || this._items;
        for (var i = 0; i < targets.length; i++) targets[i]._refreshSortData();
        return this;
    };
    muuri_module_Grid.prototype.synchronize = function() {
        if (this._isDestroyed) return this;
        var items = this._items;
        if (!items.length) return this;
        var fragment;
        var element;
        for (var i = 0; i < items.length; i++) {
            element = items[i]._element;
            if (element.parentNode === this._element) {
                fragment = fragment || document.createDocumentFragment();
                fragment.appendChild(element);
            }
        }
        if (!fragment) return this;
        this._element.appendChild(fragment);
        this._emit(EVENT_SYNCHRONIZE);
        return this;
    };
    muuri_module_Grid.prototype.layout = function(instant, onFinish) {
        if (this._isDestroyed) return this;
        var unfinishedLayout = this._nextLayoutData;
        if (unfinishedLayout && muuri_module_isFunction(unfinishedLayout.cancel)) unfinishedLayout.cancel();
        layoutId = layoutId % MAX_SAFE_FLOAT32_INTEGER + 1;
        var nextLayoutId = layoutId;
        this._nextLayoutData = {
            id: nextLayoutId,
            instant,
            onFinish,
            cancel: null
        };
        var items = this._items;
        var layoutItems = [];
        for (var i = 0; i < items.length; i++) if (items[i]._isActive) layoutItems.push(items[i]);
        this._refreshDimensions();
        var gridWidth = this._width - this._borderLeft - this._borderRight;
        var gridHeight = this._height - this._borderTop - this._borderBottom;
        var layoutSettings = this._settings.layout;
        var cancelLayout;
        if (muuri_module_isFunction(layoutSettings)) cancelLayout = layoutSettings(this, nextLayoutId, layoutItems, gridWidth, gridHeight, this._onLayoutDataReceived); else {
            muuri_module_Grid.defaultPacker.setOptions(layoutSettings);
            cancelLayout = muuri_module_Grid.defaultPacker.createLayout(this, nextLayoutId, layoutItems, gridWidth, gridHeight, this._onLayoutDataReceived);
        }
        if (muuri_module_isFunction(cancelLayout) && this._nextLayoutData && this._nextLayoutData.id === nextLayoutId) this._nextLayoutData.cancel = cancelLayout;
        return this;
    };
    muuri_module_Grid.prototype.add = function(elements, options) {
        if (this._isDestroyed || !elements) return [];
        var newItems = muuri_module_toArray(elements);
        if (!newItems.length) return newItems;
        var opts = options || {};
        var layout = opts.layout ? opts.layout : opts.layout === void 0;
        var items = this._items;
        var needsLayout = false;
        var fragment;
        var element;
        var item;
        var i;
        for (i = 0; i < newItems.length; i++) {
            element = newItems[i];
            if (element.parentNode !== this._element) {
                fragment = fragment || document.createDocumentFragment();
                fragment.appendChild(element);
            }
        }
        if (fragment) this._element.appendChild(fragment);
        for (i = 0; i < newItems.length; i++) {
            element = newItems[i];
            item = newItems[i] = new Item(this, element, opts.active);
            if (item._isActive) {
                needsLayout = true;
                item._layout._skipNextAnimation = true;
            }
        }
        for (i = 0; i < newItems.length; i++) {
            item = newItems[i];
            item._refreshDimensions();
            item._refreshSortData();
        }
        arrayInsert(items, newItems, opts.index);
        if (this._hasListeners(EVENT_ADD)) this._emit(EVENT_ADD, newItems.slice(0));
        if (needsLayout && layout) this.layout(layout === INSTANT_LAYOUT, muuri_module_isFunction(layout) ? layout : void 0);
        return newItems;
    };
    muuri_module_Grid.prototype.remove = function(items, options) {
        if (this._isDestroyed || !items.length) return [];
        var opts = options || {};
        var layout = opts.layout ? opts.layout : opts.layout === void 0;
        var needsLayout = false;
        var allItems = this.getItems();
        var targetItems = [];
        var indices = [];
        var index;
        var item;
        var i;
        for (i = 0; i < items.length; i++) {
            item = items[i];
            if (item._isDestroyed) continue;
            index = this._items.indexOf(item);
            if (index === -1) continue;
            if (item._isActive) needsLayout = true;
            targetItems.push(item);
            indices.push(allItems.indexOf(item));
            item._destroy(opts.removeElements);
            this._items.splice(index, 1);
        }
        if (this._hasListeners(EVENT_REMOVE)) this._emit(EVENT_REMOVE, targetItems.slice(0), indices);
        if (needsLayout && layout) this.layout(layout === INSTANT_LAYOUT, muuri_module_isFunction(layout) ? layout : void 0);
        return targetItems;
    };
    muuri_module_Grid.prototype.show = function(items, options) {
        if (!this._isDestroyed && items.length) this._setItemsVisibility(items, true, options);
        return this;
    };
    muuri_module_Grid.prototype.hide = function(items, options) {
        if (!this._isDestroyed && items.length) this._setItemsVisibility(items, false, options);
        return this;
    };
    muuri_module_Grid.prototype.filter = function(predicate, options) {
        if (this._isDestroyed || !this._items.length) return this;
        var itemsToShow = [];
        var itemsToHide = [];
        var isPredicateString = typeof predicate === STRING_TYPE;
        var isPredicateFn = muuri_module_isFunction(predicate);
        var opts = options || {};
        var isInstant = opts.instant === true;
        var syncWithLayout = opts.syncWithLayout;
        var layout = opts.layout ? opts.layout : opts.layout === void 0;
        var onFinish = muuri_module_isFunction(opts.onFinish) ? opts.onFinish : null;
        var tryFinishCounter = -1;
        var tryFinish = muuri_module_noop;
        var item;
        var i;
        if (onFinish) tryFinish = function() {
            ++tryFinishCounter && onFinish(itemsToShow.slice(0), itemsToHide.slice(0));
        };
        if (isPredicateFn || isPredicateString) for (i = 0; i < this._items.length; i++) {
            item = this._items[i];
            if (isPredicateFn ? predicate(item) : elementMatches(item._element, predicate)) itemsToShow.push(item); else itemsToHide.push(item);
        }
        if (itemsToShow.length) this.show(itemsToShow, {
            instant: isInstant,
            syncWithLayout,
            onFinish: tryFinish,
            layout: false
        }); else tryFinish();
        if (itemsToHide.length) this.hide(itemsToHide, {
            instant: isInstant,
            syncWithLayout,
            onFinish: tryFinish,
            layout: false
        }); else tryFinish();
        if (itemsToShow.length || itemsToHide.length) {
            if (this._hasListeners(EVENT_FILTER)) this._emit(EVENT_FILTER, itemsToShow.slice(0), itemsToHide.slice(0));
            if (layout) this.layout(layout === INSTANT_LAYOUT, muuri_module_isFunction(layout) ? layout : void 0);
        }
        return this;
    };
    muuri_module_Grid.prototype.sort = function() {
        var sortComparer;
        var isDescending;
        var origItems;
        var indexMap;
        function defaultComparer(a, b) {
            var result = 0;
            var criteriaName;
            var criteriaOrder;
            var valA;
            var valB;
            for (var i = 0; i < sortComparer.length; i++) {
                criteriaName = sortComparer[i][0];
                criteriaOrder = sortComparer[i][1];
                valA = (a._sortData ? a : a._refreshSortData())._sortData[criteriaName];
                valB = (b._sortData ? b : b._refreshSortData())._sortData[criteriaName];
                if (criteriaOrder === "desc" || !criteriaOrder && isDescending) result = valB < valA ? -1 : valB > valA ? 1 : 0; else result = valA < valB ? -1 : valA > valB ? 1 : 0;
                if (result) return result;
            }
            if (!result) {
                if (!indexMap) indexMap = createIndexMap(origItems);
                result = isDescending ? compareIndexMap(indexMap, b, a) : compareIndexMap(indexMap, a, b);
            }
            return result;
        }
        function customComparer(a, b) {
            var result = isDescending ? -sortComparer(a, b) : sortComparer(a, b);
            if (!result) {
                if (!indexMap) indexMap = createIndexMap(origItems);
                result = isDescending ? compareIndexMap(indexMap, b, a) : compareIndexMap(indexMap, a, b);
            }
            return result;
        }
        return function(comparer, options) {
            if (this._isDestroyed || this._items.length < 2) return this;
            var items = this._items;
            var opts = options || {};
            var layout = opts.layout ? opts.layout : opts.layout === void 0;
            isDescending = !!opts.descending;
            origItems = items.slice(0);
            indexMap = null;
            if (muuri_module_isFunction(comparer)) {
                sortComparer = comparer;
                items.sort(customComparer);
            } else if (typeof comparer === STRING_TYPE) {
                sortComparer = comparer.trim().split(" ").filter((function(val) {
                    return val;
                })).map((function(val) {
                    return val.split(":");
                }));
                items.sort(defaultComparer);
            } else if (Array.isArray(comparer)) {
                items.length = 0;
                items.push.apply(items, comparer);
            } else {
                sortComparer = isDescending = origItems = indexMap = null;
                throw new Error("Invalid comparer argument provided.");
            }
            if (this._hasListeners(EVENT_SORT)) this._emit(EVENT_SORT, items.slice(0), origItems);
            if (layout) this.layout(layout === INSTANT_LAYOUT, muuri_module_isFunction(layout) ? layout : void 0);
            sortComparer = isDescending = origItems = indexMap = null;
            return this;
        };
    }();
    muuri_module_Grid.prototype.move = function(item, position, options) {
        if (this._isDestroyed || this._items.length < 2) return this;
        var items = this._items;
        var opts = options || {};
        var layout = opts.layout ? opts.layout : opts.layout === void 0;
        var isSwap = opts.action === ACTION_SWAP;
        var action = isSwap ? ACTION_SWAP : ACTION_MOVE;
        var fromItem = this.getItem(item);
        var toItem = this.getItem(position);
        var fromIndex;
        var toIndex;
        if (fromItem && toItem && fromItem !== toItem) {
            fromIndex = items.indexOf(fromItem);
            toIndex = items.indexOf(toItem);
            if (isSwap) arraySwap(items, fromIndex, toIndex); else arrayMove(items, fromIndex, toIndex);
            if (this._hasListeners(muuri_module_EVENT_MOVE)) this._emit(muuri_module_EVENT_MOVE, {
                item: fromItem,
                fromIndex,
                toIndex,
                action
            });
            if (layout) this.layout(layout === INSTANT_LAYOUT, muuri_module_isFunction(layout) ? layout : void 0);
        }
        return this;
    };
    muuri_module_Grid.prototype.send = function(item, targetGrid, position, options) {
        if (this._isDestroyed || targetGrid._isDestroyed || this === targetGrid) return this;
        item = this.getItem(item);
        if (!item) return this;
        var opts = options || {};
        var container = opts.appendTo || document.body;
        var layoutSender = opts.layoutSender ? opts.layoutSender : opts.layoutSender === void 0;
        var layoutReceiver = opts.layoutReceiver ? opts.layoutReceiver : opts.layoutReceiver === void 0;
        item._migrate.start(targetGrid, position, container);
        if (item._migrate._isActive && item._isActive) {
            if (layoutSender) this.layout(layoutSender === INSTANT_LAYOUT, muuri_module_isFunction(layoutSender) ? layoutSender : void 0);
            if (layoutReceiver) targetGrid.layout(layoutReceiver === INSTANT_LAYOUT, muuri_module_isFunction(layoutReceiver) ? layoutReceiver : void 0);
        }
        return this;
    };
    muuri_module_Grid.prototype.destroy = function(removeElements) {
        if (this._isDestroyed) return this;
        var container = this._element;
        var items = this._items.slice(0);
        var layoutStyles = this._layout && this._layout.styles || {};
        var i, prop;
        unbindLayoutOnResize(this);
        for (i = 0; i < items.length; i++) items[i]._destroy(removeElements);
        this._items.length = 0;
        muuri_module_removeClass(container, this._settings.containerClass);
        for (prop in layoutStyles) container.style[prop] = "";
        this._emit(muuri_module_EVENT_DESTROY);
        this._emitter.destroy();
        delete GRID_INSTANCES[this._id];
        this._isDestroyed = true;
        return this;
    };
    muuri_module_Grid.prototype._emit = function() {
        if (this._isDestroyed) return;
        this._emitter.emit.apply(this._emitter, arguments);
    };
    muuri_module_Grid.prototype._hasListeners = function(event) {
        if (this._isDestroyed) return false;
        return this._emitter.countListeners(event) > 0;
    };
    muuri_module_Grid.prototype._updateBoundingRect = function() {
        var element = this._element;
        var rect = element.getBoundingClientRect();
        this._width = rect.width;
        this._height = rect.height;
        this._left = rect.left;
        this._top = rect.top;
        this._right = rect.right;
        this._bottom = rect.bottom;
    };
    muuri_module_Grid.prototype._updateBorders = function(left, right, top, bottom) {
        var element = this._element;
        if (left) this._borderLeft = getStyleAsFloat(element, "border-left-width");
        if (right) this._borderRight = getStyleAsFloat(element, "border-right-width");
        if (top) this._borderTop = getStyleAsFloat(element, "border-top-width");
        if (bottom) this._borderBottom = getStyleAsFloat(element, "border-bottom-width");
    };
    muuri_module_Grid.prototype._refreshDimensions = function() {
        this._updateBoundingRect();
        this._updateBorders(1, 1, 1, 1);
        this._boxSizing = getStyle(this._element, "box-sizing");
    };
    muuri_module_Grid.prototype._onLayoutDataReceived = function() {
        var itemsToLayout = [];
        return function(layout) {
            if (this._isDestroyed || !this._nextLayoutData || this._nextLayoutData.id !== layout.id) return;
            var grid = this;
            var instant = this._nextLayoutData.instant;
            var onFinish = this._nextLayoutData.onFinish;
            var numItems = layout.items.length;
            var counter = numItems;
            var item;
            var left;
            var top;
            var i;
            this._nextLayoutData = null;
            if (!this._isLayoutFinished && this._hasListeners(EVENT_LAYOUT_ABORT)) this._emit(EVENT_LAYOUT_ABORT, this._layout.items.slice(0));
            this._layout = layout;
            itemsToLayout.length = 0;
            for (i = 0; i < numItems; i++) {
                item = layout.items[i];
                if (!item) {
                    --counter;
                    continue;
                }
                left = layout.slots[i * 2];
                top = layout.slots[i * 2 + 1];
                if (item._canSkipLayout(left, top)) {
                    --counter;
                    continue;
                }
                item._left = left;
                item._top = top;
                if (item.isActive() && !item.isDragging()) itemsToLayout.push(item); else --counter;
            }
            if (layout.styles) setStyles(this._element, layout.styles);
            if (this._hasListeners(EVENT_LAYOUT_START)) {
                this._emit(EVENT_LAYOUT_START, layout.items.slice(0), instant === true);
                if (this._layout.id !== layout.id) return;
            }
            var tryFinish = function() {
                if (--counter > 0) return;
                var hasLayoutChanged = grid._layout.id !== layout.id;
                var callback = muuri_module_isFunction(instant) ? instant : onFinish;
                if (!hasLayoutChanged) grid._isLayoutFinished = true;
                if (muuri_module_isFunction(callback)) callback(layout.items.slice(0), hasLayoutChanged);
                if (!hasLayoutChanged && grid._hasListeners(EVENT_LAYOUT_END)) grid._emit(EVENT_LAYOUT_END, layout.items.slice(0));
            };
            if (!itemsToLayout.length) {
                tryFinish();
                return this;
            }
            this._isLayoutFinished = false;
            for (i = 0; i < itemsToLayout.length; i++) {
                if (this._layout.id !== layout.id) break;
                itemsToLayout[i]._layout.start(instant === true, tryFinish);
            }
            if (this._layout.id === layout.id) itemsToLayout.length = 0;
            return this;
        };
    }();
    muuri_module_Grid.prototype._setItemsVisibility = function(items, toVisible, options) {
        var grid = this;
        var targetItems = items.slice(0);
        var opts = options || {};
        var isInstant = opts.instant === true;
        var callback = opts.onFinish;
        var layout = opts.layout ? opts.layout : opts.layout === void 0;
        var counter = targetItems.length;
        var startEvent = toVisible ? EVENT_SHOW_START : EVENT_HIDE_START;
        var endEvent = toVisible ? EVENT_SHOW_END : EVENT_HIDE_END;
        var method = toVisible ? "show" : "hide";
        var needsLayout = false;
        var completedItems = [];
        var hiddenItems = [];
        var item;
        var i;
        if (!counter) {
            if (muuri_module_isFunction(callback)) callback(targetItems);
            return;
        }
        for (i = 0; i < targetItems.length; i++) {
            item = targetItems[i];
            if (toVisible && !item._isActive || !toVisible && item._isActive) needsLayout = true;
            item._layout._skipNextAnimation = !!(toVisible && !item._isActive);
            if (toVisible && item._visibility._isHidden) hiddenItems.push(item);
            if (toVisible) item._addToLayout(); else item._removeFromLayout();
        }
        if (hiddenItems.length) {
            this.refreshItems(hiddenItems, true);
            hiddenItems.length = 0;
        }
        function triggerVisibilityChange() {
            if (needsLayout && opts.syncWithLayout !== false) grid.off(EVENT_LAYOUT_START, triggerVisibilityChange);
            if (grid._hasListeners(startEvent)) grid._emit(startEvent, targetItems.slice(0));
            for (i = 0; i < targetItems.length; i++) {
                if (targetItems[i]._gridId !== grid._id) {
                    if (--counter < 1) {
                        if (muuri_module_isFunction(callback)) callback(completedItems.slice(0));
                        if (grid._hasListeners(endEvent)) grid._emit(endEvent, completedItems.slice(0));
                    }
                    continue;
                }
                targetItems[i]._visibility[method](isInstant, (function(interrupted, item) {
                    if (!interrupted) completedItems.push(item);
                    if (--counter < 1) {
                        if (muuri_module_isFunction(callback)) callback(completedItems.slice(0));
                        if (grid._hasListeners(endEvent)) grid._emit(endEvent, completedItems.slice(0));
                    }
                }));
            }
        }
        if (needsLayout && opts.syncWithLayout !== false) this.on(EVENT_LAYOUT_START, triggerVisibilityChange); else triggerVisibilityChange();
        if (needsLayout && layout) this.layout(layout === INSTANT_LAYOUT, muuri_module_isFunction(layout) ? layout : void 0);
    };
    function mergeSettings(defaultSettings, userSettings) {
        var settings = mergeObjects({}, defaultSettings);
        if (userSettings) settings = mergeObjects(settings, userSettings);
        if (userSettings && userSettings.visibleStyles) settings.visibleStyles = userSettings.visibleStyles; else if (defaultSettings && defaultSettings.visibleStyles) settings.visibleStyles = defaultSettings.visibleStyles;
        if (userSettings && userSettings.hiddenStyles) settings.hiddenStyles = userSettings.hiddenStyles; else if (defaultSettings && defaultSettings.hiddenStyles) settings.hiddenStyles = defaultSettings.hiddenStyles;
        return settings;
    }
    function mergeObjects(target, source) {
        var sourceKeys = Object.keys(source);
        var length = sourceKeys.length;
        var isSourceObject;
        var propName;
        var i;
        for (i = 0; i < length; i++) {
            propName = sourceKeys[i];
            isSourceObject = isPlainObject(source[propName]);
            if (isPlainObject(target[propName]) && isSourceObject) {
                target[propName] = mergeObjects(mergeObjects({}, target[propName]), source[propName]);
                continue;
            }
            if (isSourceObject) {
                target[propName] = mergeObjects({}, source[propName]);
                continue;
            }
            if (Array.isArray(source[propName])) {
                target[propName] = source[propName].slice(0);
                continue;
            }
            target[propName] = source[propName];
        }
        return target;
    }
    function getInitialGridElements(gridElement, elements) {
        if (elements === "*") return gridElement.children;
        if (typeof elements === STRING_TYPE) {
            var result = [];
            var children = gridElement.children;
            for (var i = 0; i < children.length; i++) if (elementMatches(children[i], elements)) result.push(children[i]);
            return result;
        }
        if (Array.isArray(elements) || isNodeList(elements)) return elements;
        return [];
    }
    function bindLayoutOnResize(grid, delay) {
        if (typeof delay !== NUMBER_TYPE) delay = delay === true ? 0 : -1;
        if (delay >= 0) {
            grid._resizeHandler = muuri_module_debounce((function() {
                grid.refreshItems().layout();
            }), delay);
            window.addEventListener("resize", grid._resizeHandler);
        }
    }
    function unbindLayoutOnResize(grid) {
        if (grid._resizeHandler) {
            grid._resizeHandler(true);
            window.removeEventListener("resize", grid._resizeHandler);
            grid._resizeHandler = null;
        }
    }
    function normalizeStyles(styles) {
        var normalized = {};
        var docElemStyle = document.documentElement.style;
        var prop, prefixedProp;
        for (prop in styles) {
            if (!styles[prop]) continue;
            prefixedProp = getPrefixedPropName(docElemStyle, prop);
            if (!prefixedProp) continue;
            normalized[prefixedProp] = styles[prop];
        }
        return normalized;
    }
    function createIndexMap(items) {
        var result = {};
        for (var i = 0; i < items.length; i++) result[items[i]._id] = i;
        return result;
    }
    function compareIndexMap(indexMap, itemA, itemB) {
        var indexA = indexMap[itemA._id];
        var indexB = indexMap[itemB._id];
        return indexA - indexB;
    }
    const muuri_module = muuri_module_Grid;
    document.querySelectorAll(".bid-inq:not([data-open])")?.forEach((item => {
        _slideUp(item, 0);
    }));
    document.querySelectorAll(".rates-inquires__body")?.forEach((item => {
        _slideUp(item, 0);
    }));
    document.addEventListener("click", (e => {
        if (e.target.closest("[data-menu-toggle]")) {
            bodyLockToggle(0);
            document.documentElement.classList.toggle("menu-open");
        } else if (!e.target.closest(".mobile-menu") && document.documentElement.classList.contains("menu-open")) {
            bodyUnlock(0);
            document.documentElement.classList.remove("menu-open");
        }
        if (e.target.closest("[data-chats-toggle]")) {
            window.matchMedia("(max-width: 991.98px)").matches ? bodyLockToggle(0) : null;
            document.documentElement.classList.toggle("chat-open");
        } else if (!e.target.closest(".chats-dash") && document.documentElement.classList.contains("chat-open")) {
            window.matchMedia("(max-width: 991.98px)").matches ? bodyUnlock(0) : null;
            document.documentElement.classList.remove("chat-open");
        }
        if (e.target.closest("[data-settings-toggle]")) {
            const chatsBlock = e.target.closest(".chats-dash");
            chatsBlock.classList.add("set-open");
        } else if (!e.target.closest(".set-chats__content") && e.target.closest(".set-chats")) {
            const chatsBlock = e.target.closest(".chats-dash");
            chatsBlock.classList.remove("set-open");
        }
        if (e.target.closest(".field__hide")) {
            const button = e.target;
            const fieldContainer = button.closest(".field__input");
            const input = fieldContainer.querySelector("input");
            if (input.type === "password") {
                button.classList.add("_icon-eye");
                button.classList.remove("_icon-eye-hide");
                input.type = "text";
            } else {
                button.classList.add("_icon-eye-hide");
                button.classList.remove("_icon-eye");
                input.type = "password";
            }
        }
        if (e.target.closest(".rates-inquires__button")) {
            const btn = e.target.closest(".rates-inquires__button");
            const body = btn.closest(".rates-inquires")?.querySelector(".rates-inquires__body");
            if (body) {
                _slideToggle(body);
                btn.classList.toggle("_open");
            }
        }
        if (e.target.closest("[data-bid-open]")) {
            const btn = e.target.closest("[data-bid-open]");
            const container = btn.closest(".inquires__card, .card-inquires-m");
            const block = container.querySelector(".bid-inq");
            if (block) {
                _slideToggle(block);
                btn.classList.toggle("_active");
            }
        }
        if (e.target.closest("[data-add-inputs]")) {
            const wrapper = e.target.closest("[data-inputs-wrapper]");
            if (wrapper) {
                const originalBlock = wrapper.querySelector("[data-inputs]");
                if (!originalBlock) return;
                const clone = originalBlock.cloneNode(true);
                clone.querySelectorAll("input").forEach((input => {
                    input.value = "";
                    if (input.type === "checkbox" || input.type === "radio") input.checked = false;
                }));
                const container = originalBlock.parentNode;
                container.appendChild(clone);
                updateRemoveButtonsState(wrapper);
            }
        }
        if (e.target.closest("[data-inputs-remove]")) {
            const removeButton = e.target.closest("[data-inputs-remove]");
            const blockToRemove = removeButton.closest("[data-inputs]");
            const wrapper = blockToRemove.closest("[data-inputs-wrapper]");
            if (wrapper.querySelectorAll("[data-inputs]").length > 1) {
                blockToRemove.remove();
                updateRemoveButtonsState(wrapper);
            }
        }
        if (e.target.closest("[data-notif-close]")) {
            const button = e.target.closest("[data-notif-close]");
            const body = button.closest(".details-notif");
            body ? body.classList.remove("_active") : null;
        }
        function updateRemoveButtonsState(wrapper) {
            const inputBlocks = wrapper.querySelectorAll("[data-inputs]");
            const removeButtons = wrapper.querySelectorAll("[data-inputs-remove]");
            const shouldDisable = inputBlocks.length <= 1;
            removeButtons.forEach((button => {
                button.disabled = shouldDisable;
            }));
        }
        if (e.target.closest(".measurements__add")) {
            const btn = e.target.closest(".measurements__add");
            const table = btn.closest(".measurements__table");
            const tbody = table.querySelector("table tbody");
            const newRow = document.createElement("tr");
            for (let i = 0; i < 9; i++) {
                const td = document.createElement("td");
                const input = document.createElement("input");
                input.type = "number";
                td.appendChild(input);
                newRow.appendChild(td);
            }
            tbody.appendChild(newRow);
        }
        if (e.target.closest("[data-filter-toggle]")) {
            window.matchMedia("(max-width: 991.98px)").matches ? bodyLockToggle(0) : null;
            document.documentElement.classList.toggle("filter-open");
        } else if (!e.target.closest(".filter-inq") && document.documentElement.classList.contains("filter-open")) {
            window.matchMedia("(max-width: 991.98px)").matches ? bodyUnlock(0) : null;
            document.documentElement.classList.remove("filter-open");
        }
        const notifBtn = e.target.closest(".header__notif");
        const notifBlock = e.target.closest(".notif-block");
        const notifEl = e.target.closest(".header__notif-el");
        const allNotifEls = document.querySelectorAll(".header__notif-el._active");
        if (notifBtn) {
            const currentEl = notifBtn.closest(".header__notif-el");
            allNotifEls.forEach((el => {
                if (el !== currentEl) el.classList.remove("_active");
            }));
            currentEl.classList.toggle("_active");
        } else if (!notifBlock && !notifEl) allNotifEls.forEach((el => el.classList.remove("_active")));
    }));
    document.addEventListener("selectCallback", (e => {
        e.detail.select.dispatchEvent(new Event("change"));
    }));
    const dateInputs = document.querySelectorAll(".field__date input");
    dateInputs?.forEach((dateInput => {
        const block = dateInput.closest(".field__input");
        const textInput = block.querySelector("input[type='text']");
        dateInput.addEventListener("change", (e => {
            const rawDate = e.target.value;
            if (rawDate) {
                const date = new Date(rawDate);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                textInput.value = `${day}.${month}.${year}`;
            }
        }));
        dateInput.addEventListener("input", (e => {
            if (!e.target.value) textInput.value = "";
        }));
        textInput.addEventListener("input", (() => {
            const raw = textInput.value;
            const cursorPos = textInput.selectionStart;
            let digits = raw.replace(/\D/g, "").slice(0, 8);
            let formatted = "";
            if (digits.length >= 1) formatted += digits.slice(0, 2);
            if (digits.length >= 3) formatted += "." + digits.slice(2, 4);
            if (digits.length >= 5) formatted += "." + digits.slice(4, 8);
            let newCursorPos = cursorPos;
            const prevDots = (raw.slice(0, cursorPos).match(/\./g) || []).length;
            const newDots = (formatted.slice(0, cursorPos).match(/\./g) || []).length;
            newCursorPos += newDots - prevDots;
            textInput.value = formatted;
            textInput.setSelectionRange(newCursorPos, newCursorPos);
            if (digits.length === 8) {
                const day = digits.slice(0, 2);
                const month = digits.slice(2, 4);
                const year = digits.slice(4, 8);
                const m = Math.min(Math.max(parseInt(month), 1), 12).toString().padStart(2, "0");
                const maxDay = new Date(year, m, 0).getDate();
                const d = Math.min(Math.max(parseInt(day), 1), maxDay).toString().padStart(2, "0");
                dateInput.value = `${year}-${m}-${d}`;
            } else dateInput.value = "";
        }));
        textInput.addEventListener("click", (() => {
            textInput.value = "";
            dateInput.value = "";
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const progressBlocks = document.querySelectorAll(".circle-progress");
        progressBlocks.forEach((block => {
            const value = +block.getAttribute("data-value");
            const circle = block.querySelector(".progress--circle");
            const textEl = block.querySelector(".circle-progress__value p");
            if (circle) circle.style.strokeDashoffset = 100 - value;
            if (textEl) textEl.textContent = `${value}%`;
        }));
        const cargocenterParents = document.querySelectorAll("[data-cargo]");
        cargocenterParents.forEach((container => {
            const cargoItems = container.querySelectorAll("[data-cargo-item]");
            const expandCheckbox = container.querySelector("[data-cargo-expand]");
            cargoItems.forEach((item => {
                const blocks = item.querySelectorAll("[data-cargo-block]");
                const title = item.querySelector("[data-cargo-title]");
                blocks.forEach((block => {
                    _slideUp(block, 0);
                }));
                if (title) title.classList.remove("_active");
            }));
            container.addEventListener("click", (function(e) {
                const title = e.target.closest("[data-cargo-title]");
                if (!title) return;
                const item = title.closest("[data-cargo-item]");
                if (!item) return;
                toggleCargoItem(item);
            }));
            if (expandCheckbox) expandCheckbox.addEventListener("change", (function() {
                const isChecked = this.checked;
                cargoItems.forEach((item => {
                    const blocks = item.querySelectorAll("[data-cargo-block]");
                    const title = item.querySelector("[data-cargo-title]");
                    const isHidden = blocks[0].hidden;
                    if (isChecked && isHidden || !isChecked && !isHidden) {
                        blocks.forEach((block => {
                            if (isChecked) _slideDown(block, 500); else _slideUp(block, 500);
                        }));
                        if (title) isChecked ? title.classList.add("_active") : title.classList.remove("_active");
                    }
                }));
            }));
            function updateExpandState() {
                let allOpen = true;
                cargoItems.forEach((item => {
                    const blocks = item.querySelectorAll("[data-cargo-block]");
                    if (blocks[0].hidden) allOpen = false;
                }));
                expandCheckbox ? expandCheckbox.checked = allOpen : null;
            }
            container.updateExpandState = updateExpandState;
        }));
        function toggleCargoItem(item) {
            const blocks = item.querySelectorAll("[data-cargo-block]");
            const title = item.querySelector("[data-cargo-title]");
            const isHidden = blocks[0].hidden;
            blocks.forEach((block => {
                if (isHidden) _slideDown(block, 500); else _slideUp(block, 500);
            }));
            if (title) isHidden ? title.classList.add("_active") : title.classList.remove("_active");
            const container = item.closest("[data-cargo]");
            if (container && container.updateExpandState) setTimeout((() => {
                container.updateExpandState();
            }), 500);
        }
    }));
    document.querySelectorAll(".pass-level__line").forEach((line => {
        const updateColor = () => {
            const levelStr = line.style.getPropertyValue("--level") || getComputedStyle(line).getPropertyValue("--level");
            const level = parseFloat(levelStr.replace("%", "")) || 0;
            let color;
            if (level < 40) color = "#D50000"; else if (level < 70) color = "#998EE0"; else color = "#64DB78";
            line.style.setProperty("--color", color);
        };
        updateColor();
        const observer = new MutationObserver((() => updateColor()));
        observer.observe(line, {
            attributes: true,
            attributeFilter: [ "style" ]
        });
    }));
    document.querySelectorAll("[data-disable]").forEach((disableElement => {
        const target = document.querySelector(disableElement.dataset.disable);
        if (target) {
            const inputs = target.querySelectorAll("input");
            disableElement.addEventListener("change", (() => {
                inputs.forEach((input => {
                    input.disabled = disableElement.checked;
                    if (disableElement.checked) input.checked = false;
                }));
            }));
            if (disableElement.checked) inputs.forEach((input => input.disabled = true));
        }
    }));
    const themeSwitchEls = document.querySelectorAll("[data-theme-swith]");
    if (themeSwitchEls) themeSwitchEls.forEach((themeSwitch => {
        const updateTheme = () => {
            if (themeSwitch.checked) document.documentElement.classList.add("--dark"); else document.documentElement.classList.remove("--dark");
        };
        themeSwitch.addEventListener("change", updateTheme);
        updateTheme();
    }));
    document.addEventListener("DOMContentLoaded", (function() {
        const centerParents = document.querySelectorAll("[data-scroll-an]");
        if (!centerParents.length) return;
        centerParents.forEach((container => {
            const decor = container.querySelector(".scroll-decor");
            const targets = container.querySelectorAll("[data-scroll-item]");
            if (!decor || !targets.length) return;
            let currentActiveElement = null;
            function updateDecorPosition() {
                let activeElement = null;
                let maxVisibility = -1;
                targets.forEach((target => {
                    const rect = target.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                    const elementHeight = rect.height;
                    const visibilityRatio = visibleHeight / elementHeight;
                    if (visibleHeight > 0) if (visibilityRatio > maxVisibility || visibilityRatio === maxVisibility && rect.top < (activeElement ? activeElement.getBoundingClientRect().top : 1 / 0)) {
                        activeElement = target;
                        maxVisibility = visibilityRatio;
                    }
                }));
                if (activeElement) {
                    const rect = activeElement.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    if (currentActiveElement !== activeElement) {
                        decor.style.opacity = "0";
                        setTimeout((() => {
                            decor.style.top = `${rect.top - containerRect.top + container.scrollTop}px`;
                            decor.style.height = `${rect.height}px`;
                            decor.style.width = `${rect.width}px`;
                            decor.style.left = `${rect.left - containerRect.left}px`;
                            decor.style.opacity = "1";
                        }), 50);
                        currentActiveElement = activeElement;
                    } else {
                        decor.style.top = `${rect.top - containerRect.top + container.scrollTop}px`;
                        decor.style.height = `${rect.height}px`;
                        decor.style.width = `${rect.width}px`;
                        decor.style.left = `${rect.left - containerRect.left}px`;
                    }
                    decor.style.transition = "top 0.5s ease";
                } else {
                    decor.style.opacity = "0";
                    currentActiveElement = null;
                }
            }
            let isScrolling = false;
            function throttleScroll() {
                if (!isScrolling) {
                    isScrolling = true;
                    requestAnimationFrame((() => {
                        updateDecorPosition();
                        isScrolling = false;
                    }));
                }
            }
            updateDecorPosition();
            window.addEventListener("scroll", throttleScroll);
            window.addEventListener("resize", throttleScroll);
        }));
    }));
    window.addEventListener("load", (() => {
        const containers = document.querySelectorAll("[data-shuffle-container]");
        containers.forEach((container => {
            const direction = container.dataset.shuffleDirection;
            const maxItems = parseInt(container.dataset.shuffleMaxItems) || 0;
            const horizontal = direction === "row";
            container.style.overflow = "hidden";
            container.style.position = "relative";
            const grid = new muuri_module(container, {
                items: "[data-shuffle]",
                layout: {
                    horizontal,
                    fillGaps: false
                },
                layoutDuration: 500,
                layoutEasing: "ease",
                dragEnabled: false,
                layoutOnResize: true
            });
            function updateContainerLimit() {
                const items = grid.getItems().map((item => item.getElement()));
                items.forEach(((el, index) => {
                    if (maxItems && index >= maxItems) el.classList.add("--hidden"); else el.classList.remove("--hidden");
                }));
                const limitedItems = maxItems ? items.slice(0, maxItems) : items;
                const wrapper = container.closest(`[data-shuffle-wrapper]`);
                if (horizontal) {
                    let totalWidth = 0;
                    let maxHeight = 0;
                    limitedItems.forEach((el => {
                        const style = window.getComputedStyle(el);
                        const rect = el.getBoundingClientRect();
                        totalWidth += rect.width + parseFloat(style.marginRight || 0);
                        if (rect.height > maxHeight) maxHeight = rect.height;
                    }));
                    if (wrapper) {
                        wrapper.style.maxWidth = Math.ceil(totalWidth) + "px";
                        wrapper.style.height = Math.ceil(maxHeight) + "px";
                    } else {
                        container.style.maxWidth = Math.ceil(totalWidth) + "px";
                        container.style.height = Math.ceil(maxHeight) + "px";
                    }
                } else {
                    let totalHeight = 0;
                    let maxWidth = 0;
                    limitedItems.forEach((el => {
                        const style = window.getComputedStyle(el);
                        const rect = el.getBoundingClientRect();
                        totalHeight += rect.height + parseFloat(style.marginBottom || 0);
                        if (rect.width > maxWidth) maxWidth = rect.width;
                    }));
                    if (wrapper) {
                        wrapper.style.maxHeight = Math.ceil(totalHeight) + "px";
                        wrapper.style.width = Math.ceil(maxWidth) + "px";
                    } else {
                        container.style.maxHeight = Math.ceil(totalHeight) + "px";
                        container.style.width = Math.ceil(maxWidth) + "px";
                    }
                }
            }
            function sortByAttribute() {
                grid.sort(((a, b) => {
                    const aVal = parseInt(a.getElement().getAttribute("data-shuffle") || Number.MAX_SAFE_INTEGER, 10);
                    const bVal = parseInt(b.getElement().getAttribute("data-shuffle") || Number.MAX_SAFE_INTEGER, 10);
                    return aVal - bVal;
                }));
                requestAnimationFrame((() => {
                    grid.layout();
                    updateContainerLimit();
                }));
            }
            sortByAttribute();
            const resizeObserver = new ResizeObserver((() => {
                requestAnimationFrame((() => {
                    grid.layout();
                    updateContainerLimit();
                }));
            }));
            container.querySelectorAll("[data-shuffle]").forEach((el => resizeObserver.observe(el)));
            resizeObserver.observe(container);
            const observer = new MutationObserver((mutations => {
                let shouldSort = false;
                mutations.forEach((mutation => {
                    if (mutation.type === "attributes" && mutation.attributeName === "data-shuffle") shouldSort = true;
                    if (mutation.type === "childList") {
                        const newItems = Array.from(mutation.addedNodes).filter((node => node.nodeType === 1 && node.hasAttribute("data-shuffle") && node.children.length > 0));
                        if (newItems.length) {
                            grid.add(newItems);
                            newItems.forEach((el => resizeObserver.observe(el)));
                            shouldSort = true;
                        }
                        const removedItems = Array.from(mutation.removedNodes).map((node => grid.getItems().find((item => item.getElement() === node)))).filter((item => item));
                        if (removedItems.length) {
                            grid.remove(removedItems, {
                                removeElements: false
                            });
                            shouldSort = true;
                        }
                    }
                }));
                if (shouldSort) sortByAttribute();
            }));
            observer.observe(container, {
                attributes: true,
                subtree: true,
                childList: true,
                attributeFilter: [ "data-shuffle" ]
            });
        }));
    }));
    function updateProgress() {
        const lines = document.querySelectorAll("[data-tracking-line]");
        lines.forEach((line => {
            const active = line.querySelector(".--active");
            if (!active) return;
            const lineRect = line.getBoundingClientRect();
            const activeRect = active.getBoundingClientRect();
            const progress = activeRect.left + activeRect.width / 2 - lineRect.left;
            line.style.setProperty("--progress", `${progress}px`);
        }));
    }
    window.addEventListener("resize", updateProgress);
    window.addEventListener("load", updateProgress);
    (function() {
        function sleep(ms) {
            return new Promise((r => setTimeout(r, ms)));
        }
        async function runRound() {
            const countLabel = document.querySelector(".inq-dash__users-label");
            countLabel ? countLabel.innerHTML = `+${Math.floor(Math.random() * 9) + 2}` : null;
            const avatars = Array.from(document.querySelectorAll(".inq-dash__avatars .inq-dash__info-avatar"));
            if (avatars.length < 2) return;
            avatars.forEach(((a, i) => {
                if (!a.getAttribute("data-shuffle")) a.setAttribute("data-shuffle", String(i + 1));
            }));
            const sorted = avatars.slice().sort(((a, b) => {
                const pa = parseInt(a.getAttribute("data-shuffle")) || 0;
                const pb = parseInt(b.getAttribute("data-shuffle")) || 0;
                return pa - pb;
            }));
            const contenders = sorted.filter((a => {
                const rank = parseInt(a.getAttribute("data-shuffle")) || 0;
                return rank !== 1 && !a.classList.contains("--accent") && !a.classList.contains("--loading");
            }));
            if (!contenders.length) return;
            const bidder = contenders[Math.floor(Math.random() * contenders.length)];
            if (!bidder) return;
            bidder.classList.add("--loading");
            await sleep(2e3);
            if (!bidder) return;
            bidder.classList.remove("--loading");
            bidder.classList.add("--glowing");
            setTimeout((() => {
                if (bidder) bidder.classList.remove("--glowing");
            }), 2e3);
            await sleep(200);
            const avatarsNow = Array.from(document.querySelectorAll(".inq-dash__avatars .inq-dash__info-avatar"));
            if (!avatarsNow.length) return;
            const prevRanks = new Map;
            avatarsNow.forEach((a => prevRanks.set(a, a.getAttribute("data-shuffle") || null)));
            const shuffled = avatarsNow.slice().sort((() => Math.random() - .5));
            shuffled.forEach(((a, i) => a.setAttribute("data-shuffle", String(i + 1))));
            shuffled.forEach(((a, i) => {
                const prev = prevRanks.get(a);
                const newRank = i + 1;
                if (newRank === 1 && prev !== "1") a.classList.remove("--accent"); else if (prev === "1" && newRank !== 1) {
                    a.classList.add("--accent");
                    setTimeout((() => {
                        if (a) a.classList.remove("--accent");
                    }), 2e3);
                }
            }));
        }
        (async function loop() {
            while (true) {
                try {
                    await runRound();
                } catch (e) {
                    console.error(e);
                }
                await sleep(500);
            }
        })();
    })();
    window["FLS"] = false;
    addLoadedClass();
    spoilers();
    tabs();
    formRating();
})();