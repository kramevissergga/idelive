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
        if (!ratings.length) return;
        ratings.forEach((rating => {
            const ratingValue = +rating.dataset.ratingValue || 0;
            if (ratingValue) formRatingSet(rating, ratingValue);
        }));
        document.addEventListener("click", formRatingAction);
        function formRatingAction(e) {
            const currentElement = e.target.closest(".rating__input");
            if (!currentElement) return;
            const ratingValue = +currentElement.value;
            const rating = currentElement.closest(".rating");
            const ratingSet = rating.dataset.rating === "set";
            if (ratingSet) formRatingGet(rating, ratingValue);
        }
        function formRatingGet(rating, ratingValue) {
            formRatingSet(rating, ratingValue);
        }
        function formRatingSet(rating, value) {
            const ratingItems = rating.querySelectorAll(".rating__item");
            const resultFullItems = Math.floor(value);
            const resultPartItem = value - resultFullItems;
            if (rating.hasAttribute("data-rating-title")) rating.title = value;
            ratingItems.forEach(((ratingItem, index) => {
                ratingItem.classList.toggle("rating__item--active", index < resultFullItems);
                ratingItem.querySelector("span")?.remove();
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
    var _Symbol_Symbol = _root.Symbol;
    const _Symbol = _Symbol_Symbol;
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
    const emoji_popover_es = class {
        constructor(t) {
            this.opts = t;
            this.options = Object.assign({}, {
                container: "body",
                button: ".e-btn",
                targetElement: ".e-input",
                emojiList: [],
                wrapClassName: "",
                wrapAnimationClassName: "anim-scale-in"
            }, t), this.wrapClassName = "emoji-wrap", this.wrapCount = document.querySelectorAll(".emoji-wrap").length + 1, 
            this.wrapCountClassName = `emoji-wrap-${this.wrapCount}`, this.init(), this.createButtonListener();
        }
        init() {
            const {emojiList: t, container: e, button: s, targetElement: i} = this.options, a = this.createEmojiContainer(), n = this.createEmojiList(t), o = this.createMask();
            a.appendChild(n), a.appendChild(o);
            const c = document.querySelector(i), {left: r, top: l, height: m} = c.getClientRects()[0];
            a.style.top = `${l + m + 12}px`, a.style.left = `${r}px`;
            document.querySelector(e).appendChild(a);
        }
        createButtonListener() {
            const {button: t} = this.options;
            document.querySelector(t).addEventListener("click", (() => this.toggle(!0)));
        }
        createEmojiContainer() {
            const {wrapAnimationClassName: t, wrapClassName: e} = this.options, s = document.createElement("div");
            return s.classList.add(this.wrapClassName), s.classList.add(this.wrapCountClassName), 
            s.classList.add(t), "" !== e && s.classList.add(e), s;
        }
        createEmojiList(t) {
            const e = document.createElement("div");
            return e.classList.add("emoji-list"), t.forEach((t => {
                const s = this.createEmojiItem(t);
                e.appendChild(s);
            })), e;
        }
        createEmojiItem(t) {
            const {value: e, label: s} = t, i = document.createElement("div");
            let a;
            var n;
            return n = e, new RegExp("http").test(n) ? (a = document.createElement("img"), a.classList.add("emoji"), 
            a.classList.add("emoji-img"), a.setAttribute("src", e)) : (a = document.createElement("span"), 
            a.classList.add("emoji"), a.classList.add("emoji-text"), a.innerText = e), i.classList.add("emoji-item"), 
            i.appendChild(a), "string" == typeof s && i.setAttribute("title", s), i;
        }
        createMask() {
            const t = document.createElement("div");
            return t.classList.add("emoji-mask"), t.addEventListener("click", (() => this.toggle(!1))), 
            t;
        }
        toggle(t) {
            document.querySelector(`.${this.wrapCountClassName}`).style.display = t ? "block" : "none";
        }
        onSelect(t) {
            const e = document.querySelectorAll(`.${this.wrapCountClassName} .emoji-item`), s = this;
            e.forEach((function(e) {
                e.addEventListener("click", (function(e) {
                    const i = e.currentTarget;
                    let a;
                    a = i.children[0].classList.contains("emoji-img") ? i.children[0].getAttribute("src") : i.innerText, 
                    s.toggle(!1), t(a);
                }));
            }));
        }
    };
    /*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
    function round(v) {
        return v + .5 | 0;
    }
    const lim = (v, l, h) => Math.max(Math.min(v, h), l);
    function p2b(v) {
        return lim(round(v * 2.55), 0, 255);
    }
    function n2b(v) {
        return lim(round(v * 255), 0, 255);
    }
    function b2n(v) {
        return lim(round(v / 2.55) / 100, 0, 1);
    }
    function n2p(v) {
        return lim(round(v * 100), 0, 100);
    }
    const map$1 = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    };
    const hex = [ ..."0123456789ABCDEF" ];
    const h1 = b => hex[b & 15];
    const h2 = b => hex[(b & 240) >> 4] + hex[b & 15];
    const eq = b => (b & 240) >> 4 === (b & 15);
    const isShort = v => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
    function hexParse(str) {
        var len = str.length;
        var ret;
        if (str[0] === "#") if (len === 4 || len === 5) ret = {
            r: 255 & map$1[str[1]] * 17,
            g: 255 & map$1[str[2]] * 17,
            b: 255 & map$1[str[3]] * 17,
            a: len === 5 ? map$1[str[4]] * 17 : 255
        }; else if (len === 7 || len === 9) ret = {
            r: map$1[str[1]] << 4 | map$1[str[2]],
            g: map$1[str[3]] << 4 | map$1[str[4]],
            b: map$1[str[5]] << 4 | map$1[str[6]],
            a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
        };
        return ret;
    }
    const alpha = (a, f) => a < 255 ? f(a) : "";
    function hexString(v) {
        var f = isShort(v) ? h1 : h2;
        return v ? "#" + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f) : void 0;
    }
    const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
    function hsl2rgbn(h, s, l) {
        const a = s * Math.min(l, 1 - l);
        const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return [ f(0), f(8), f(4) ];
    }
    function hsv2rgbn(h, s, v) {
        const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
        return [ f(5), f(3), f(1) ];
    }
    function hwb2rgbn(h, w, b) {
        const rgb = hsl2rgbn(h, 1, .5);
        let i;
        if (w + b > 1) {
            i = 1 / (w + b);
            w *= i;
            b *= i;
        }
        for (i = 0; i < 3; i++) {
            rgb[i] *= 1 - w - b;
            rgb[i] += w;
        }
        return rgb;
    }
    function hueValue(r, g, b, d, max) {
        if (r === max) return (g - b) / d + (g < b ? 6 : 0);
        if (g === max) return (b - r) / d + 2;
        return (r - g) / d + 4;
    }
    function rgb2hsl(v) {
        const range = 255;
        const r = v.r / range;
        const g = v.g / range;
        const b = v.b / range;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        let h, s, d;
        if (max !== min) {
            d = max - min;
            s = l > .5 ? d / (2 - max - min) : d / (max + min);
            h = hueValue(r, g, b, d, max);
            h = h * 60 + .5;
        }
        return [ h | 0, s || 0, l ];
    }
    function calln(f, a, b, c) {
        return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
    }
    function hsl2rgb(h, s, l) {
        return calln(hsl2rgbn, h, s, l);
    }
    function hwb2rgb(h, w, b) {
        return calln(hwb2rgbn, h, w, b);
    }
    function hsv2rgb(h, s, v) {
        return calln(hsv2rgbn, h, s, v);
    }
    function hue(h) {
        return (h % 360 + 360) % 360;
    }
    function hueParse(str) {
        const m = HUE_RE.exec(str);
        let a = 255;
        let v;
        if (!m) return;
        if (m[5] !== v) a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
        const h = hue(+m[2]);
        const p1 = +m[3] / 100;
        const p2 = +m[4] / 100;
        if (m[1] === "hwb") v = hwb2rgb(h, p1, p2); else if (m[1] === "hsv") v = hsv2rgb(h, p1, p2); else v = hsl2rgb(h, p1, p2);
        return {
            r: v[0],
            g: v[1],
            b: v[2],
            a
        };
    }
    function rotate(v, deg) {
        var h = rgb2hsl(v);
        h[0] = hue(h[0] + deg);
        h = hsl2rgb(h);
        v.r = h[0];
        v.g = h[1];
        v.b = h[2];
    }
    function hslString(v) {
        if (!v) return;
        const a = rgb2hsl(v);
        const h = a[0];
        const s = n2p(a[1]);
        const l = n2p(a[2]);
        return v.a < 255 ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h}, ${s}%, ${l}%)`;
    }
    const map = {
        x: "dark",
        Z: "light",
        Y: "re",
        X: "blu",
        W: "gr",
        V: "medium",
        U: "slate",
        A: "ee",
        T: "ol",
        S: "or",
        B: "ra",
        C: "lateg",
        D: "ights",
        R: "in",
        Q: "turquois",
        E: "hi",
        P: "ro",
        O: "al",
        N: "le",
        M: "de",
        L: "yello",
        F: "en",
        K: "ch",
        G: "arks",
        H: "ea",
        I: "ightg",
        J: "wh"
    };
    const names$1 = {
        OiceXe: "f0f8ff",
        antiquewEte: "faebd7",
        aqua: "ffff",
        aquamarRe: "7fffd4",
        azuY: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "0",
        blanKedOmond: "ffebcd",
        Xe: "ff",
        XeviTet: "8a2be2",
        bPwn: "a52a2a",
        burlywood: "deb887",
        caMtXe: "5f9ea0",
        KartYuse: "7fff00",
        KocTate: "d2691e",
        cSO: "ff7f50",
        cSnflowerXe: "6495ed",
        cSnsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "ffff",
        xXe: "8b",
        xcyan: "8b8b",
        xgTMnPd: "b8860b",
        xWay: "a9a9a9",
        xgYF: "6400",
        xgYy: "a9a9a9",
        xkhaki: "bdb76b",
        xmagFta: "8b008b",
        xTivegYF: "556b2f",
        xSange: "ff8c00",
        xScEd: "9932cc",
        xYd: "8b0000",
        xsOmon: "e9967a",
        xsHgYF: "8fbc8f",
        xUXe: "483d8b",
        xUWay: "2f4f4f",
        xUgYy: "2f4f4f",
        xQe: "ced1",
        xviTet: "9400d3",
        dAppRk: "ff1493",
        dApskyXe: "bfff",
        dimWay: "696969",
        dimgYy: "696969",
        dodgerXe: "1e90ff",
        fiYbrick: "b22222",
        flSOwEte: "fffaf0",
        foYstWAn: "228b22",
        fuKsia: "ff00ff",
        gaRsbSo: "dcdcdc",
        ghostwEte: "f8f8ff",
        gTd: "ffd700",
        gTMnPd: "daa520",
        Way: "808080",
        gYF: "8000",
        gYFLw: "adff2f",
        gYy: "808080",
        honeyMw: "f0fff0",
        hotpRk: "ff69b4",
        RdianYd: "cd5c5c",
        Rdigo: "4b0082",
        ivSy: "fffff0",
        khaki: "f0e68c",
        lavFMr: "e6e6fa",
        lavFMrXsh: "fff0f5",
        lawngYF: "7cfc00",
        NmoncEffon: "fffacd",
        ZXe: "add8e6",
        ZcSO: "f08080",
        Zcyan: "e0ffff",
        ZgTMnPdLw: "fafad2",
        ZWay: "d3d3d3",
        ZgYF: "90ee90",
        ZgYy: "d3d3d3",
        ZpRk: "ffb6c1",
        ZsOmon: "ffa07a",
        ZsHgYF: "20b2aa",
        ZskyXe: "87cefa",
        ZUWay: "778899",
        ZUgYy: "778899",
        ZstAlXe: "b0c4de",
        ZLw: "ffffe0",
        lime: "ff00",
        limegYF: "32cd32",
        lRF: "faf0e6",
        magFta: "ff00ff",
        maPon: "800000",
        VaquamarRe: "66cdaa",
        VXe: "cd",
        VScEd: "ba55d3",
        VpurpN: "9370db",
        VsHgYF: "3cb371",
        VUXe: "7b68ee",
        VsprRggYF: "fa9a",
        VQe: "48d1cc",
        VviTetYd: "c71585",
        midnightXe: "191970",
        mRtcYam: "f5fffa",
        mistyPse: "ffe4e1",
        moccasR: "ffe4b5",
        navajowEte: "ffdead",
        navy: "80",
        Tdlace: "fdf5e6",
        Tive: "808000",
        TivedBb: "6b8e23",
        Sange: "ffa500",
        SangeYd: "ff4500",
        ScEd: "da70d6",
        pOegTMnPd: "eee8aa",
        pOegYF: "98fb98",
        pOeQe: "afeeee",
        pOeviTetYd: "db7093",
        papayawEp: "ffefd5",
        pHKpuff: "ffdab9",
        peru: "cd853f",
        pRk: "ffc0cb",
        plum: "dda0dd",
        powMrXe: "b0e0e6",
        purpN: "800080",
        YbeccapurpN: "663399",
        Yd: "ff0000",
        Psybrown: "bc8f8f",
        PyOXe: "4169e1",
        saddNbPwn: "8b4513",
        sOmon: "fa8072",
        sandybPwn: "f4a460",
        sHgYF: "2e8b57",
        sHshell: "fff5ee",
        siFna: "a0522d",
        silver: "c0c0c0",
        skyXe: "87ceeb",
        UXe: "6a5acd",
        UWay: "708090",
        UgYy: "708090",
        snow: "fffafa",
        sprRggYF: "ff7f",
        stAlXe: "4682b4",
        tan: "d2b48c",
        teO: "8080",
        tEstN: "d8bfd8",
        tomato: "ff6347",
        Qe: "40e0d0",
        viTet: "ee82ee",
        JHt: "f5deb3",
        wEte: "ffffff",
        wEtesmoke: "f5f5f5",
        Lw: "ffff00",
        LwgYF: "9acd32"
    };
    function unpack() {
        const unpacked = {};
        const keys = Object.keys(names$1);
        const tkeys = Object.keys(map);
        let i, j, k, ok, nk;
        for (i = 0; i < keys.length; i++) {
            ok = nk = keys[i];
            for (j = 0; j < tkeys.length; j++) {
                k = tkeys[j];
                nk = nk.replace(k, map[k]);
            }
            k = parseInt(names$1[ok], 16);
            unpacked[nk] = [ k >> 16 & 255, k >> 8 & 255, k & 255 ];
        }
        return unpacked;
    }
    let names;
    function nameParse(str) {
        if (!names) {
            names = unpack();
            names.transparent = [ 0, 0, 0, 0 ];
        }
        const a = names[str.toLowerCase()];
        return a && {
            r: a[0],
            g: a[1],
            b: a[2],
            a: a.length === 4 ? a[3] : 255
        };
    }
    const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
    function rgbParse(str) {
        const m = RGB_RE.exec(str);
        let a = 255;
        let r, g, b;
        if (!m) return;
        if (m[7] !== r) {
            const v = +m[7];
            a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
        }
        r = +m[1];
        g = +m[3];
        b = +m[5];
        r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
        g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
        b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
        return {
            r,
            g,
            b,
            a
        };
    }
    function rgbString(v) {
        return v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`);
    }
    const to = v => v <= .0031308 ? v * 12.92 : Math.pow(v, 1 / 2.4) * 1.055 - .055;
    const from = v => v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
    function interpolate(rgb1, rgb2, t) {
        const r = from(b2n(rgb1.r));
        const g = from(b2n(rgb1.g));
        const b = from(b2n(rgb1.b));
        return {
            r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
            g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
            b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
            a: rgb1.a + t * (rgb2.a - rgb1.a)
        };
    }
    function modHSL(v, i, ratio) {
        if (v) {
            let tmp = rgb2hsl(v);
            tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
            tmp = hsl2rgb(tmp);
            v.r = tmp[0];
            v.g = tmp[1];
            v.b = tmp[2];
        }
    }
    function clone(v, proto) {
        return v ? Object.assign(proto || {}, v) : v;
    }
    function fromObject(input) {
        var v = {
            r: 0,
            g: 0,
            b: 0,
            a: 255
        };
        if (Array.isArray(input)) {
            if (input.length >= 3) {
                v = {
                    r: input[0],
                    g: input[1],
                    b: input[2],
                    a: 255
                };
                if (input.length > 3) v.a = n2b(input[3]);
            }
        } else {
            v = clone(input, {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            });
            v.a = n2b(v.a);
        }
        return v;
    }
    function functionParse(str) {
        if (str.charAt(0) === "r") return rgbParse(str);
        return hueParse(str);
    }
    class Color {
        constructor(input) {
            if (input instanceof Color) return input;
            const type = typeof input;
            let v;
            if (type === "object") v = fromObject(input); else if (type === "string") v = hexParse(input) || nameParse(input) || functionParse(input);
            this._rgb = v;
            this._valid = !!v;
        }
        get valid() {
            return this._valid;
        }
        get rgb() {
            var v = clone(this._rgb);
            if (v) v.a = b2n(v.a);
            return v;
        }
        set rgb(obj) {
            this._rgb = fromObject(obj);
        }
        rgbString() {
            return this._valid ? rgbString(this._rgb) : void 0;
        }
        hexString() {
            return this._valid ? hexString(this._rgb) : void 0;
        }
        hslString() {
            return this._valid ? hslString(this._rgb) : void 0;
        }
        mix(color, weight) {
            if (color) {
                const c1 = this.rgb;
                const c2 = color.rgb;
                let w2;
                const p = weight === w2 ? .5 : weight;
                const w = 2 * p - 1;
                const a = c1.a - c2.a;
                const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
                w2 = 1 - w1;
                c1.r = 255 & w1 * c1.r + w2 * c2.r + .5;
                c1.g = 255 & w1 * c1.g + w2 * c2.g + .5;
                c1.b = 255 & w1 * c1.b + w2 * c2.b + .5;
                c1.a = p * c1.a + (1 - p) * c2.a;
                this.rgb = c1;
            }
            return this;
        }
        interpolate(color, t) {
            if (color) this._rgb = interpolate(this._rgb, color._rgb, t);
            return this;
        }
        clone() {
            return new Color(this.rgb);
        }
        alpha(a) {
            this._rgb.a = n2b(a);
            return this;
        }
        clearer(ratio) {
            const rgb = this._rgb;
            rgb.a *= 1 - ratio;
            return this;
        }
        greyscale() {
            const rgb = this._rgb;
            const val = round(rgb.r * .3 + rgb.g * .59 + rgb.b * .11);
            rgb.r = rgb.g = rgb.b = val;
            return this;
        }
        opaquer(ratio) {
            const rgb = this._rgb;
            rgb.a *= 1 + ratio;
            return this;
        }
        negate() {
            const v = this._rgb;
            v.r = 255 - v.r;
            v.g = 255 - v.g;
            v.b = 255 - v.b;
            return this;
        }
        lighten(ratio) {
            modHSL(this._rgb, 2, ratio);
            return this;
        }
        darken(ratio) {
            modHSL(this._rgb, 2, -ratio);
            return this;
        }
        saturate(ratio) {
            modHSL(this._rgb, 1, ratio);
            return this;
        }
        desaturate(ratio) {
            modHSL(this._rgb, 1, -ratio);
            return this;
        }
        rotate(deg) {
            rotate(this._rgb, deg);
            return this;
        }
    }
    /*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
    function helpers_dataset_noop() {}
    const uid = (() => {
        let id = 0;
        return () => id++;
    })();
    function isNullOrUndef(value) {
        return value === null || value === void 0;
    }
    function helpers_dataset_isArray(value) {
        if (Array.isArray && Array.isArray(value)) return true;
        const type = Object.prototype.toString.call(value);
        if (type.slice(0, 7) === "[object" && type.slice(-6) === "Array]") return true;
        return false;
    }
    function helpers_dataset_isObject(value) {
        return value !== null && Object.prototype.toString.call(value) === "[object Object]";
    }
    function isNumberFinite(value) {
        return (typeof value === "number" || value instanceof Number) && isFinite(+value);
    }
    function finiteOrDefault(value, defaultValue) {
        return isNumberFinite(value) ? value : defaultValue;
    }
    function valueOrDefault(value, defaultValue) {
        return typeof value === "undefined" ? defaultValue : value;
    }
    const helpers_dataset_toPercentage = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 : +value / dimension;
    const toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
    function callback(fn, args, thisArg) {
        if (fn && typeof fn.call === "function") return fn.apply(thisArg, args);
    }
    function each(loopable, fn, thisArg, reverse) {
        let i, len, keys;
        if (helpers_dataset_isArray(loopable)) {
            len = loopable.length;
            if (reverse) for (i = len - 1; i >= 0; i--) fn.call(thisArg, loopable[i], i); else for (i = 0; i < len; i++) fn.call(thisArg, loopable[i], i);
        } else if (helpers_dataset_isObject(loopable)) {
            keys = Object.keys(loopable);
            len = keys.length;
            for (i = 0; i < len; i++) fn.call(thisArg, loopable[keys[i]], keys[i]);
        }
    }
    function _elementsEqual(a0, a1) {
        let i, ilen, v0, v1;
        if (!a0 || !a1 || a0.length !== a1.length) return false;
        for (i = 0, ilen = a0.length; i < ilen; ++i) {
            v0 = a0[i];
            v1 = a1[i];
            if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) return false;
        }
        return true;
    }
    function helpers_dataset_clone(source) {
        if (helpers_dataset_isArray(source)) return source.map(helpers_dataset_clone);
        if (helpers_dataset_isObject(source)) {
            const target = Object.create(null);
            const keys = Object.keys(source);
            const klen = keys.length;
            let k = 0;
            for (;k < klen; ++k) target[keys[k]] = helpers_dataset_clone(source[keys[k]]);
            return target;
        }
        return source;
    }
    function isValidKey(key) {
        return [ "__proto__", "prototype", "constructor" ].indexOf(key) === -1;
    }
    function _merger(key, target, source, options) {
        if (!isValidKey(key)) return;
        const tval = target[key];
        const sval = source[key];
        if (helpers_dataset_isObject(tval) && helpers_dataset_isObject(sval)) helpers_dataset_merge(tval, sval, options); else target[key] = helpers_dataset_clone(sval);
    }
    function helpers_dataset_merge(target, source, options) {
        const sources = helpers_dataset_isArray(source) ? source : [ source ];
        const ilen = sources.length;
        if (!helpers_dataset_isObject(target)) return target;
        options = options || {};
        const merger = options.merger || _merger;
        let current;
        for (let i = 0; i < ilen; ++i) {
            current = sources[i];
            if (!helpers_dataset_isObject(current)) continue;
            const keys = Object.keys(current);
            for (let k = 0, klen = keys.length; k < klen; ++k) merger(keys[k], target, current, options);
        }
        return target;
    }
    function mergeIf(target, source) {
        return helpers_dataset_merge(target, source, {
            merger: _mergerIf
        });
    }
    function _mergerIf(key, target, source) {
        if (!isValidKey(key)) return;
        const tval = target[key];
        const sval = source[key];
        if (helpers_dataset_isObject(tval) && helpers_dataset_isObject(sval)) mergeIf(tval, sval); else if (!Object.prototype.hasOwnProperty.call(target, key)) target[key] = helpers_dataset_clone(sval);
    }
    const keyResolvers = {
        "": v => v,
        x: o => o.x,
        y: o => o.y
    };
    function _splitKey(key) {
        const parts = key.split(".");
        const keys = [];
        let tmp = "";
        for (const part of parts) {
            tmp += part;
            if (tmp.endsWith("\\")) tmp = tmp.slice(0, -1) + "."; else {
                keys.push(tmp);
                tmp = "";
            }
        }
        return keys;
    }
    function _getKeyResolver(key) {
        const keys = _splitKey(key);
        return obj => {
            for (const k of keys) {
                if (k === "") break;
                obj = obj && obj[k];
            }
            return obj;
        };
    }
    function resolveObjectKey(obj, key) {
        const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
        return resolver(obj);
    }
    function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const defined = value => typeof value !== "undefined";
    const helpers_dataset_isFunction = value => typeof value === "function";
    const setsEqual = (a, b) => {
        if (a.size !== b.size) return false;
        for (const item of a) if (!b.has(item)) return false;
        return true;
    };
    function _isClickEvent(e) {
        return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
    }
    const PI = Math.PI;
    const TAU = 2 * PI;
    const PITAU = TAU + PI;
    const INFINITY = Number.POSITIVE_INFINITY;
    const RAD_PER_DEG = PI / 180;
    const HALF_PI = PI / 2;
    const QUARTER_PI = PI / 4;
    const TWO_THIRDS_PI = PI * 2 / 3;
    const log10 = Math.log10;
    const helpers_dataset_sign = Math.sign;
    function almostEquals(x, y, epsilon) {
        return Math.abs(x - y) < epsilon;
    }
    function niceNum(range) {
        const roundedRange = Math.round(range);
        range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
        const niceRange = Math.pow(10, Math.floor(log10(range)));
        const fraction = range / niceRange;
        const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
        return niceFraction * niceRange;
    }
    function _factorize(value) {
        const result = [];
        const sqrt = Math.sqrt(value);
        let i;
        for (i = 1; i < sqrt; i++) if (value % i === 0) {
            result.push(i);
            result.push(value / i);
        }
        if (sqrt === (sqrt | 0)) result.push(sqrt);
        result.sort(((a, b) => a - b)).pop();
        return result;
    }
    function isNonPrimitive(n) {
        return typeof n === "symbol" || typeof n === "object" && n !== null && !(Symbol.toPrimitive in n || "toString" in n || "valueOf" in n);
    }
    function isNumber(n) {
        return !isNonPrimitive(n) && !isNaN(parseFloat(n)) && isFinite(n);
    }
    function almostWhole(x, epsilon) {
        const rounded = Math.round(x);
        return rounded - epsilon <= x && rounded + epsilon >= x;
    }
    function _setMinAndMaxByKey(array, target, property) {
        let i, ilen, value;
        for (i = 0, ilen = array.length; i < ilen; i++) {
            value = array[i][property];
            if (!isNaN(value)) {
                target.min = Math.min(target.min, value);
                target.max = Math.max(target.max, value);
            }
        }
    }
    function toRadians(degrees) {
        return degrees * (PI / 180);
    }
    function toDegrees(radians) {
        return radians * (180 / PI);
    }
    function _decimalPlaces(x) {
        if (!isNumberFinite(x)) return;
        let e = 1;
        let p = 0;
        while (Math.round(x * e) / e !== x) {
            e *= 10;
            p++;
        }
        return p;
    }
    function getAngleFromPoint(centrePoint, anglePoint) {
        const distanceFromXCenter = anglePoint.x - centrePoint.x;
        const distanceFromYCenter = anglePoint.y - centrePoint.y;
        const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
        let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
        if (angle < -.5 * PI) angle += TAU;
        return {
            angle,
            distance: radialDistanceFromCenter
        };
    }
    function distanceBetweenPoints(pt1, pt2) {
        return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
    }
    function _angleDiff(a, b) {
        return (a - b + PITAU) % TAU - PI;
    }
    function _normalizeAngle(a) {
        return (a % TAU + TAU) % TAU;
    }
    function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
        const a = _normalizeAngle(angle);
        const s = _normalizeAngle(start);
        const e = _normalizeAngle(end);
        const angleToStart = _normalizeAngle(s - a);
        const angleToEnd = _normalizeAngle(e - a);
        const startToAngle = _normalizeAngle(a - s);
        const endToAngle = _normalizeAngle(a - e);
        return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
    }
    function _limitValue(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    function _int16Range(value) {
        return _limitValue(value, -32768, 32767);
    }
    function _isBetween(value, start, end, epsilon = 1e-6) {
        return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
    }
    function _lookup(table, value, cmp) {
        cmp = cmp || (index => table[index] < value);
        let hi = table.length - 1;
        let lo = 0;
        let mid;
        while (hi - lo > 1) {
            mid = lo + hi >> 1;
            if (cmp(mid)) lo = mid; else hi = mid;
        }
        return {
            lo,
            hi
        };
    }
    const _lookupByKey = (table, key, value, last) => _lookup(table, value, last ? index => {
        const ti = table[index][key];
        return ti < value || ti === value && table[index + 1][key] === value;
    } : index => table[index][key] < value);
    const _rlookupByKey = (table, key, value) => _lookup(table, value, (index => table[index][key] >= value));
    function _filterBetween(values, min, max) {
        let start = 0;
        let end = values.length;
        while (start < end && values[start] < min) start++;
        while (end > start && values[end - 1] > max) end--;
        return start > 0 || end < values.length ? values.slice(start, end) : values;
    }
    const arrayEvents = [ "push", "pop", "shift", "splice", "unshift" ];
    function listenArrayEvents(array, listener) {
        if (array._chartjs) {
            array._chartjs.listeners.push(listener);
            return;
        }
        Object.defineProperty(array, "_chartjs", {
            configurable: true,
            enumerable: false,
            value: {
                listeners: [ listener ]
            }
        });
        arrayEvents.forEach((key => {
            const method = "_onData" + _capitalize(key);
            const base = array[key];
            Object.defineProperty(array, key, {
                configurable: true,
                enumerable: false,
                value(...args) {
                    const res = base.apply(this, args);
                    array._chartjs.listeners.forEach((object => {
                        if (typeof object[method] === "function") object[method](...args);
                    }));
                    return res;
                }
            });
        }));
    }
    function unlistenArrayEvents(array, listener) {
        const stub = array._chartjs;
        if (!stub) return;
        const listeners = stub.listeners;
        const index = listeners.indexOf(listener);
        if (index !== -1) listeners.splice(index, 1);
        if (listeners.length > 0) return;
        arrayEvents.forEach((key => {
            delete array[key];
        }));
        delete array._chartjs;
    }
    function _arrayUnique(items) {
        const set = new Set(items);
        if (set.size === items.length) return items;
        return Array.from(set);
    }
    const requestAnimFrame = function() {
        if (typeof window === "undefined") return function(callback) {
            return callback();
        };
        return window.requestAnimationFrame;
    }();
    function throttled(fn, thisArg) {
        let argsToUse = [];
        let ticking = false;
        return function(...args) {
            argsToUse = args;
            if (!ticking) {
                ticking = true;
                requestAnimFrame.call(window, (() => {
                    ticking = false;
                    fn.apply(thisArg, argsToUse);
                }));
            }
        };
    }
    function helpers_dataset_debounce(fn, delay) {
        let timeout;
        return function(...args) {
            if (delay) {
                clearTimeout(timeout);
                timeout = setTimeout(fn, delay, args);
            } else fn.apply(this, args);
            return delay;
        };
    }
    const _toLeftRightCenter = align => align === "start" ? "left" : align === "end" ? "right" : "center";
    const _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
    const _textX = (align, left, right, rtl) => {
        const check = rtl ? "left" : "right";
        return align === check ? right : align === "center" ? (left + right) / 2 : left;
    };
    function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
        const pointCount = points.length;
        let start = 0;
        let count = pointCount;
        if (meta._sorted) {
            const {iScale, vScale, _parsed} = meta;
            const spanGaps = meta.dataset ? meta.dataset.options ? meta.dataset.options.spanGaps : null : null;
            const axis = iScale.axis;
            const {min, max, minDefined, maxDefined} = iScale.getUserBounds();
            if (minDefined) {
                start = Math.min(_lookupByKey(_parsed, axis, min).lo, animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo);
                if (spanGaps) {
                    const distanceToDefinedLo = _parsed.slice(0, start + 1).reverse().findIndex((point => !isNullOrUndef(point[vScale.axis])));
                    start -= Math.max(0, distanceToDefinedLo);
                }
                start = _limitValue(start, 0, pointCount - 1);
            }
            if (maxDefined) {
                let end = Math.max(_lookupByKey(_parsed, iScale.axis, max, true).hi + 1, animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1);
                if (spanGaps) {
                    const distanceToDefinedHi = _parsed.slice(end - 1).findIndex((point => !isNullOrUndef(point[vScale.axis])));
                    end += Math.max(0, distanceToDefinedHi);
                }
                count = _limitValue(end, start, pointCount) - start;
            } else count = pointCount - start;
        }
        return {
            start,
            count
        };
    }
    function _scaleRangesChanged(meta) {
        const {xScale, yScale, _scaleRanges} = meta;
        const newRanges = {
            xmin: xScale.min,
            xmax: xScale.max,
            ymin: yScale.min,
            ymax: yScale.max
        };
        if (!_scaleRanges) {
            meta._scaleRanges = newRanges;
            return true;
        }
        const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
        Object.assign(_scaleRanges, newRanges);
        return changed;
    }
    const atEdge = t => t === 0 || t === 1;
    const elasticIn = (t, s, p) => -Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p);
    const elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
    const effects = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => -t * (t - 2),
        easeInOutQuad: t => (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1),
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (t -= 1) * t * t + 1,
        easeInOutCubic: t => (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2),
        easeInQuart: t => t * t * t * t,
        easeOutQuart: t => -((t -= 1) * t * t * t - 1),
        easeInOutQuart: t => (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2),
        easeInQuint: t => t * t * t * t * t,
        easeOutQuint: t => (t -= 1) * t * t * t * t + 1,
        easeInOutQuint: t => (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2),
        easeInSine: t => -Math.cos(t * HALF_PI) + 1,
        easeOutSine: t => Math.sin(t * HALF_PI),
        easeInOutSine: t => -.5 * (Math.cos(PI * t) - 1),
        easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
        easeOutExpo: t => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
        easeInOutExpo: t => atEdge(t) ? t : t < .5 ? .5 * Math.pow(2, 10 * (t * 2 - 1)) : .5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
        easeInCirc: t => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
        easeOutCirc: t => Math.sqrt(1 - (t -= 1) * t),
        easeInOutCirc: t => (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
        easeInElastic: t => atEdge(t) ? t : elasticIn(t, .075, .3),
        easeOutElastic: t => atEdge(t) ? t : elasticOut(t, .075, .3),
        easeInOutElastic(t) {
            const s = .1125;
            const p = .45;
            return atEdge(t) ? t : t < .5 ? .5 * elasticIn(t * 2, s, p) : .5 + .5 * elasticOut(t * 2 - 1, s, p);
        },
        easeInBack(t) {
            const s = 1.70158;
            return t * t * ((s + 1) * t - s);
        },
        easeOutBack(t) {
            const s = 1.70158;
            return (t -= 1) * t * ((s + 1) * t + s) + 1;
        },
        easeInOutBack(t) {
            let s = 1.70158;
            if ((t /= .5) < 1) return .5 * (t * t * (((s *= 1.525) + 1) * t - s));
            return .5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        easeInBounce: t => 1 - effects.easeOutBounce(1 - t),
        easeOutBounce(t) {
            const m = 7.5625;
            const d = 2.75;
            if (t < 1 / d) return m * t * t;
            if (t < 2 / d) return m * (t -= 1.5 / d) * t + .75;
            if (t < 2.5 / d) return m * (t -= 2.25 / d) * t + .9375;
            return m * (t -= 2.625 / d) * t + .984375;
        },
        easeInOutBounce: t => t < .5 ? effects.easeInBounce(t * 2) * .5 : effects.easeOutBounce(t * 2 - 1) * .5 + .5
    };
    function isPatternOrGradient(value) {
        if (value && typeof value === "object") {
            const type = value.toString();
            return type === "[object CanvasPattern]" || type === "[object CanvasGradient]";
        }
        return false;
    }
    function color(value) {
        return isPatternOrGradient(value) ? value : new Color(value);
    }
    function getHoverColor(value) {
        return isPatternOrGradient(value) ? value : new Color(value).saturate(.5).darken(.1).hexString();
    }
    const numbers = [ "x", "y", "borderWidth", "radius", "tension" ];
    const colors = [ "color", "borderColor", "backgroundColor" ];
    function applyAnimationsDefaults(defaults) {
        defaults.set("animation", {
            delay: void 0,
            duration: 1e3,
            easing: "easeOutQuart",
            fn: void 0,
            from: void 0,
            loop: void 0,
            to: void 0,
            type: void 0
        });
        defaults.describe("animation", {
            _fallback: false,
            _indexable: false,
            _scriptable: name => name !== "onProgress" && name !== "onComplete" && name !== "fn"
        });
        defaults.set("animations", {
            colors: {
                type: "color",
                properties: colors
            },
            numbers: {
                type: "number",
                properties: numbers
            }
        });
        defaults.describe("animations", {
            _fallback: "animation"
        });
        defaults.set("transitions", {
            active: {
                animation: {
                    duration: 400
                }
            },
            resize: {
                animation: {
                    duration: 0
                }
            },
            show: {
                animations: {
                    colors: {
                        from: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        duration: 0
                    }
                }
            },
            hide: {
                animations: {
                    colors: {
                        to: "transparent"
                    },
                    visible: {
                        type: "boolean",
                        easing: "linear",
                        fn: v => v | 0
                    }
                }
            }
        });
    }
    function applyLayoutsDefaults(defaults) {
        defaults.set("layout", {
            autoPadding: true,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });
    }
    const intlCache = new Map;
    function getNumberFormat(locale, options) {
        options = options || {};
        const cacheKey = locale + JSON.stringify(options);
        let formatter = intlCache.get(cacheKey);
        if (!formatter) {
            formatter = new Intl.NumberFormat(locale, options);
            intlCache.set(cacheKey, formatter);
        }
        return formatter;
    }
    function formatNumber(num, locale, options) {
        return getNumberFormat(locale, options).format(num);
    }
    const formatters = {
        values(value) {
            return helpers_dataset_isArray(value) ? value : "" + value;
        },
        numeric(tickValue, index, ticks) {
            if (tickValue === 0) return "0";
            const locale = this.chart.options.locale;
            let notation;
            let delta = tickValue;
            if (ticks.length > 1) {
                const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
                if (maxTick < 1e-4 || maxTick > 1e15) notation = "scientific";
                delta = calculateDelta(tickValue, ticks);
            }
            const logDelta = log10(Math.abs(delta));
            const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
            const options = {
                notation,
                minimumFractionDigits: numDecimal,
                maximumFractionDigits: numDecimal
            };
            Object.assign(options, this.options.ticks.format);
            return formatNumber(tickValue, locale, options);
        },
        logarithmic(tickValue, index, ticks) {
            if (tickValue === 0) return "0";
            const remain = ticks[index].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
            if ([ 1, 2, 3, 5, 10, 15 ].includes(remain) || index > .8 * ticks.length) return formatters.numeric.call(this, tickValue, index, ticks);
            return "";
        }
    };
    function calculateDelta(tickValue, ticks) {
        let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
        if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) delta = tickValue - Math.floor(tickValue);
        return delta;
    }
    var Ticks = {
        formatters
    };
    function applyScaleDefaults(defaults) {
        defaults.set("scale", {
            display: true,
            offset: false,
            reverse: false,
            beginAtZero: false,
            bounds: "ticks",
            clip: true,
            grace: 0,
            grid: {
                display: true,
                lineWidth: 1,
                drawOnChartArea: true,
                drawTicks: true,
                tickLength: 8,
                tickWidth: (_ctx, options) => options.lineWidth,
                tickColor: (_ctx, options) => options.color,
                offset: false
            },
            border: {
                display: true,
                dash: [],
                dashOffset: 0,
                width: 1
            },
            title: {
                display: false,
                text: "",
                padding: {
                    top: 4,
                    bottom: 4
                }
            },
            ticks: {
                minRotation: 0,
                maxRotation: 50,
                mirror: false,
                textStrokeWidth: 0,
                textStrokeColor: "",
                padding: 3,
                display: true,
                autoSkip: true,
                autoSkipPadding: 3,
                labelOffset: 0,
                callback: Ticks.formatters.values,
                minor: {},
                major: {},
                align: "center",
                crossAlign: "near",
                showLabelBackdrop: false,
                backdropColor: "rgba(255, 255, 255, 0.75)",
                backdropPadding: 2
            }
        });
        defaults.route("scale.ticks", "color", "", "color");
        defaults.route("scale.grid", "color", "", "borderColor");
        defaults.route("scale.border", "color", "", "borderColor");
        defaults.route("scale.title", "color", "", "color");
        defaults.describe("scale", {
            _fallback: false,
            _scriptable: name => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
            _indexable: name => name !== "borderDash" && name !== "tickBorderDash" && name !== "dash"
        });
        defaults.describe("scales", {
            _fallback: "scale"
        });
        defaults.describe("scale.ticks", {
            _scriptable: name => name !== "backdropPadding" && name !== "callback",
            _indexable: name => name !== "backdropPadding"
        });
    }
    const overrides = Object.create(null);
    const descriptors = Object.create(null);
    function getScope$1(node, key) {
        if (!key) return node;
        const keys = key.split(".");
        for (let i = 0, n = keys.length; i < n; ++i) {
            const k = keys[i];
            node = node[k] || (node[k] = Object.create(null));
        }
        return node;
    }
    function set(root, scope, values) {
        if (typeof scope === "string") return helpers_dataset_merge(getScope$1(root, scope), values);
        return helpers_dataset_merge(getScope$1(root, ""), scope);
    }
    class Defaults {
        constructor(_descriptors, _appliers) {
            this.animation = void 0;
            this.backgroundColor = "rgba(0,0,0,0.1)";
            this.borderColor = "rgba(0,0,0,0.1)";
            this.color = "#666";
            this.datasets = {};
            this.devicePixelRatio = context => context.chart.platform.getDevicePixelRatio();
            this.elements = {};
            this.events = [ "mousemove", "mouseout", "click", "touchstart", "touchmove" ];
            this.font = {
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                size: 12,
                style: "normal",
                lineHeight: 1.2,
                weight: null
            };
            this.hover = {};
            this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
            this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
            this.hoverColor = (ctx, options) => getHoverColor(options.color);
            this.indexAxis = "x";
            this.interaction = {
                mode: "nearest",
                intersect: true,
                includeInvisible: false
            };
            this.maintainAspectRatio = true;
            this.onHover = null;
            this.onClick = null;
            this.parsing = true;
            this.plugins = {};
            this.responsive = true;
            this.scale = void 0;
            this.scales = {};
            this.showLine = true;
            this.drawActiveElementsOnTop = true;
            this.describe(_descriptors);
            this.apply(_appliers);
        }
        set(scope, values) {
            return set(this, scope, values);
        }
        get(scope) {
            return getScope$1(this, scope);
        }
        describe(scope, values) {
            return set(descriptors, scope, values);
        }
        override(scope, values) {
            return set(overrides, scope, values);
        }
        route(scope, name, targetScope, targetName) {
            const scopeObject = getScope$1(this, scope);
            const targetScopeObject = getScope$1(this, targetScope);
            const privateName = "_" + name;
            Object.defineProperties(scopeObject, {
                [privateName]: {
                    value: scopeObject[name],
                    writable: true
                },
                [name]: {
                    enumerable: true,
                    get() {
                        const local = this[privateName];
                        const target = targetScopeObject[targetName];
                        if (helpers_dataset_isObject(local)) return Object.assign({}, target, local);
                        return valueOrDefault(local, target);
                    },
                    set(value) {
                        this[privateName] = value;
                    }
                }
            });
        }
        apply(appliers) {
            appliers.forEach((apply => apply(this)));
        }
    }
    var defaults = new Defaults({
        _scriptable: name => !name.startsWith("on"),
        _indexable: name => name !== "events",
        hover: {
            _fallback: "interaction"
        },
        interaction: {
            _scriptable: false,
            _indexable: false
        }
    }, [ applyAnimationsDefaults, applyLayoutsDefaults, applyScaleDefaults ]);
    function toFontString(font) {
        if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) return null;
        return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
    }
    function _measureText(ctx, data, gc, longest, string) {
        let textWidth = data[string];
        if (!textWidth) {
            textWidth = data[string] = ctx.measureText(string).width;
            gc.push(string);
        }
        if (textWidth > longest) longest = textWidth;
        return longest;
    }
    function _longestText(ctx, font, arrayOfThings, cache) {
        cache = cache || {};
        let data = cache.data = cache.data || {};
        let gc = cache.garbageCollect = cache.garbageCollect || [];
        if (cache.font !== font) {
            data = cache.data = {};
            gc = cache.garbageCollect = [];
            cache.font = font;
        }
        ctx.save();
        ctx.font = font;
        let longest = 0;
        const ilen = arrayOfThings.length;
        let i, j, jlen, thing, nestedThing;
        for (i = 0; i < ilen; i++) {
            thing = arrayOfThings[i];
            if (thing !== void 0 && thing !== null && !helpers_dataset_isArray(thing)) longest = _measureText(ctx, data, gc, longest, thing); else if (helpers_dataset_isArray(thing)) for (j = 0, 
            jlen = thing.length; j < jlen; j++) {
                nestedThing = thing[j];
                if (nestedThing !== void 0 && nestedThing !== null && !helpers_dataset_isArray(nestedThing)) longest = _measureText(ctx, data, gc, longest, nestedThing);
            }
        }
        ctx.restore();
        const gcLen = gc.length / 2;
        if (gcLen > arrayOfThings.length) {
            for (i = 0; i < gcLen; i++) delete data[gc[i]];
            gc.splice(0, gcLen);
        }
        return longest;
    }
    function _alignPixel(chart, pixel, width) {
        const devicePixelRatio = chart.currentDevicePixelRatio;
        const halfWidth = width !== 0 ? Math.max(width / 2, .5) : 0;
        return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
    }
    function clearCanvas(canvas, ctx) {
        if (!ctx && !canvas) return;
        ctx = ctx || canvas.getContext("2d");
        ctx.save();
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
    function drawPoint(ctx, options, x, y) {
        drawPointLegend(ctx, options, x, y, null);
    }
    function drawPointLegend(ctx, options, x, y, w) {
        let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
        const style = options.pointStyle;
        const rotation = options.rotation;
        const radius = options.radius;
        let rad = (rotation || 0) * RAD_PER_DEG;
        if (style && typeof style === "object") {
            type = style.toString();
            if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rad);
                ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
                ctx.restore();
                return;
            }
        }
        if (isNaN(radius) || radius <= 0) return;
        ctx.beginPath();
        switch (style) {
          default:
            if (w) ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU); else ctx.arc(x, y, radius, 0, TAU);
            ctx.closePath();
            break;

          case "triangle":
            width = w ? w / 2 : radius;
            ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            ctx.closePath();
            break;

          case "rectRounded":
            cornerRadius = radius * .516;
            size = radius - cornerRadius;
            xOffset = Math.cos(rad + QUARTER_PI) * size;
            xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
            yOffset = Math.sin(rad + QUARTER_PI) * size;
            yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
            ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
            ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
            ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
            ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
            ctx.closePath();
            break;

          case "rect":
            if (!rotation) {
                size = Math.SQRT1_2 * radius;
                width = w ? w / 2 : size;
                ctx.rect(x - width, y - size, 2 * width, 2 * size);
                break;
            }
            rad += QUARTER_PI;

          case "rectRot":
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            ctx.closePath();
            break;

          case "crossRot":
            rad += QUARTER_PI;

          case "cross":
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            break;

          case "star":
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            rad += QUARTER_PI;
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            break;

          case "line":
            xOffset = w ? w / 2 : Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x - xOffset, y - yOffset);
            ctx.lineTo(x + xOffset, y + yOffset);
            break;

          case "dash":
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
            break;

          case false:
            ctx.closePath();
            break;
        }
        ctx.fill();
        if (options.borderWidth > 0) ctx.stroke();
    }
    function _isPointInArea(point, area, margin) {
        margin = margin || .5;
        return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
    }
    function clipArea(ctx, area) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
        ctx.clip();
    }
    function unclipArea(ctx) {
        ctx.restore();
    }
    function _steppedLineTo(ctx, previous, target, flip, mode) {
        if (!previous) return ctx.lineTo(target.x, target.y);
        if (mode === "middle") {
            const midpoint = (previous.x + target.x) / 2;
            ctx.lineTo(midpoint, previous.y);
            ctx.lineTo(midpoint, target.y);
        } else if (mode === "after" !== !!flip) ctx.lineTo(previous.x, target.y); else ctx.lineTo(target.x, previous.y);
        ctx.lineTo(target.x, target.y);
    }
    function _bezierCurveTo(ctx, previous, target, flip) {
        if (!previous) return ctx.lineTo(target.x, target.y);
        ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
    }
    function setRenderOpts(ctx, opts) {
        if (opts.translation) ctx.translate(opts.translation[0], opts.translation[1]);
        if (!isNullOrUndef(opts.rotation)) ctx.rotate(opts.rotation);
        if (opts.color) ctx.fillStyle = opts.color;
        if (opts.textAlign) ctx.textAlign = opts.textAlign;
        if (opts.textBaseline) ctx.textBaseline = opts.textBaseline;
    }
    function decorateText(ctx, x, y, line, opts) {
        if (opts.strikethrough || opts.underline) {
            const metrics = ctx.measureText(line);
            const left = x - metrics.actualBoundingBoxLeft;
            const right = x + metrics.actualBoundingBoxRight;
            const top = y - metrics.actualBoundingBoxAscent;
            const bottom = y + metrics.actualBoundingBoxDescent;
            const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.beginPath();
            ctx.lineWidth = opts.decorationWidth || 2;
            ctx.moveTo(left, yDecoration);
            ctx.lineTo(right, yDecoration);
            ctx.stroke();
        }
    }
    function drawBackdrop(ctx, opts) {
        const oldColor = ctx.fillStyle;
        ctx.fillStyle = opts.color;
        ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
        ctx.fillStyle = oldColor;
    }
    function renderText(ctx, text, x, y, font, opts = {}) {
        const lines = helpers_dataset_isArray(text) ? text : [ text ];
        const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
        let i, line;
        ctx.save();
        ctx.font = font.string;
        setRenderOpts(ctx, opts);
        for (i = 0; i < lines.length; ++i) {
            line = lines[i];
            if (opts.backdrop) drawBackdrop(ctx, opts.backdrop);
            if (stroke) {
                if (opts.strokeColor) ctx.strokeStyle = opts.strokeColor;
                if (!isNullOrUndef(opts.strokeWidth)) ctx.lineWidth = opts.strokeWidth;
                ctx.strokeText(line, x, y, opts.maxWidth);
            }
            ctx.fillText(line, x, y, opts.maxWidth);
            decorateText(ctx, x, y, line, opts);
            y += Number(font.lineHeight);
        }
        ctx.restore();
    }
    function addRoundedRectPath(ctx, rect) {
        const {x, y, w, h, radius} = rect;
        ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
        ctx.lineTo(x, y + h - radius.bottomLeft);
        ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
        ctx.lineTo(x + w - radius.bottomRight, y + h);
        ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
        ctx.lineTo(x + w, y + radius.topRight);
        ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
        ctx.lineTo(x + radius.topLeft, y);
    }
    const LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
    const FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
    function toLineHeight(value, size) {
        const matches = ("" + value).match(LINE_HEIGHT);
        if (!matches || matches[1] === "normal") return size * 1.2;
        value = +matches[2];
        switch (matches[3]) {
          case "px":
            return value;

          case "%":
            value /= 100;
            break;
        }
        return size * value;
    }
    const numberOrZero = v => +v || 0;
    function _readValueToProps(value, props) {
        const ret = {};
        const objProps = helpers_dataset_isObject(props);
        const keys = objProps ? Object.keys(props) : props;
        const read = helpers_dataset_isObject(value) ? objProps ? prop => valueOrDefault(value[prop], value[props[prop]]) : prop => value[prop] : () => value;
        for (const prop of keys) ret[prop] = numberOrZero(read(prop));
        return ret;
    }
    function toTRBL(value) {
        return _readValueToProps(value, {
            top: "y",
            right: "x",
            bottom: "y",
            left: "x"
        });
    }
    function toTRBLCorners(value) {
        return _readValueToProps(value, [ "topLeft", "topRight", "bottomLeft", "bottomRight" ]);
    }
    function toPadding(value) {
        const obj = toTRBL(value);
        obj.width = obj.left + obj.right;
        obj.height = obj.top + obj.bottom;
        return obj;
    }
    function toFont(options, fallback) {
        options = options || {};
        fallback = fallback || defaults.font;
        let size = valueOrDefault(options.size, fallback.size);
        if (typeof size === "string") size = parseInt(size, 10);
        let style = valueOrDefault(options.style, fallback.style);
        if (style && !("" + style).match(FONT_STYLE)) {
            console.warn('Invalid font style specified: "' + style + '"');
            style = void 0;
        }
        const font = {
            family: valueOrDefault(options.family, fallback.family),
            lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
            size,
            style,
            weight: valueOrDefault(options.weight, fallback.weight),
            string: ""
        };
        font.string = toFontString(font);
        return font;
    }
    function resolve(inputs, context, index, info) {
        let cacheable = true;
        let i, ilen, value;
        for (i = 0, ilen = inputs.length; i < ilen; ++i) {
            value = inputs[i];
            if (value === void 0) continue;
            if (context !== void 0 && typeof value === "function") {
                value = value(context);
                cacheable = false;
            }
            if (index !== void 0 && helpers_dataset_isArray(value)) {
                value = value[index % value.length];
                cacheable = false;
            }
            if (value !== void 0) {
                if (info && !cacheable) info.cacheable = false;
                return value;
            }
        }
    }
    function _addGrace(minmax, grace, beginAtZero) {
        const {min, max} = minmax;
        const change = toDimension(grace, (max - min) / 2);
        const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
        return {
            min: keepZero(min, -Math.abs(change)),
            max: keepZero(max, change)
        };
    }
    function createContext(parentContext, context) {
        return Object.assign(Object.create(parentContext), context);
    }
    function _createResolver(scopes, prefixes = [ "" ], rootScopes, fallback, getTarget = () => scopes[0]) {
        const finalRootScopes = rootScopes || scopes;
        if (typeof fallback === "undefined") fallback = _resolve("_fallback", scopes);
        const cache = {
            [Symbol.toStringTag]: "Object",
            _cacheable: true,
            _scopes: scopes,
            _rootScopes: finalRootScopes,
            _fallback: fallback,
            _getTarget: getTarget,
            override: scope => _createResolver([ scope, ...scopes ], prefixes, finalRootScopes, fallback)
        };
        return new Proxy(cache, {
            deleteProperty(target, prop) {
                delete target[prop];
                delete target._keys;
                delete scopes[0][prop];
                return true;
            },
            get(target, prop) {
                return _cached(target, prop, (() => _resolveWithPrefixes(prop, prefixes, scopes, target)));
            },
            getOwnPropertyDescriptor(target, prop) {
                return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
            },
            getPrototypeOf() {
                return Reflect.getPrototypeOf(scopes[0]);
            },
            has(target, prop) {
                return getKeysFromAllScopes(target).includes(prop);
            },
            ownKeys(target) {
                return getKeysFromAllScopes(target);
            },
            set(target, prop, value) {
                const storage = target._storage || (target._storage = getTarget());
                target[prop] = storage[prop] = value;
                delete target._keys;
                return true;
            }
        });
    }
    function _attachContext(proxy, context, subProxy, descriptorDefaults) {
        const cache = {
            _cacheable: false,
            _proxy: proxy,
            _context: context,
            _subProxy: subProxy,
            _stack: new Set,
            _descriptors: _descriptors(proxy, descriptorDefaults),
            setContext: ctx => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
            override: scope => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
        };
        return new Proxy(cache, {
            deleteProperty(target, prop) {
                delete target[prop];
                delete proxy[prop];
                return true;
            },
            get(target, prop, receiver) {
                return _cached(target, prop, (() => _resolveWithContext(target, prop, receiver)));
            },
            getOwnPropertyDescriptor(target, prop) {
                return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
                    enumerable: true,
                    configurable: true
                } : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
            },
            getPrototypeOf() {
                return Reflect.getPrototypeOf(proxy);
            },
            has(target, prop) {
                return Reflect.has(proxy, prop);
            },
            ownKeys() {
                return Reflect.ownKeys(proxy);
            },
            set(target, prop, value) {
                proxy[prop] = value;
                delete target[prop];
                return true;
            }
        });
    }
    function _descriptors(proxy, defaults = {
        scriptable: true,
        indexable: true
    }) {
        const {_scriptable = defaults.scriptable, _indexable = defaults.indexable, _allKeys = defaults.allKeys} = proxy;
        return {
            allKeys: _allKeys,
            scriptable: _scriptable,
            indexable: _indexable,
            isScriptable: helpers_dataset_isFunction(_scriptable) ? _scriptable : () => _scriptable,
            isIndexable: helpers_dataset_isFunction(_indexable) ? _indexable : () => _indexable
        };
    }
    const readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
    const needsSubResolver = (prop, value) => helpers_dataset_isObject(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
    function _cached(target, prop, resolve) {
        if (Object.prototype.hasOwnProperty.call(target, prop) || prop === "constructor") return target[prop];
        const value = resolve();
        target[prop] = value;
        return value;
    }
    function _resolveWithContext(target, prop, receiver) {
        const {_proxy, _context, _subProxy, _descriptors: descriptors} = target;
        let value = _proxy[prop];
        if (helpers_dataset_isFunction(value) && descriptors.isScriptable(prop)) value = _resolveScriptable(prop, value, target, receiver);
        if (helpers_dataset_isArray(value) && value.length) value = _resolveArray(prop, value, target, descriptors.isIndexable);
        if (needsSubResolver(prop, value)) value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
        return value;
    }
    function _resolveScriptable(prop, getValue, target, receiver) {
        const {_proxy, _context, _subProxy, _stack} = target;
        if (_stack.has(prop)) throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
        _stack.add(prop);
        let value = getValue(_context, _subProxy || receiver);
        _stack.delete(prop);
        if (needsSubResolver(prop, value)) value = createSubResolver(_proxy._scopes, _proxy, prop, value);
        return value;
    }
    function _resolveArray(prop, value, target, isIndexable) {
        const {_proxy, _context, _subProxy, _descriptors: descriptors} = target;
        if (typeof _context.index !== "undefined" && isIndexable(prop)) return value[_context.index % value.length]; else if (helpers_dataset_isObject(value[0])) {
            const arr = value;
            const scopes = _proxy._scopes.filter((s => s !== arr));
            value = [];
            for (const item of arr) {
                const resolver = createSubResolver(scopes, _proxy, prop, item);
                value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
            }
        }
        return value;
    }
    function resolveFallback(fallback, prop, value) {
        return helpers_dataset_isFunction(fallback) ? fallback(prop, value) : fallback;
    }
    const getScope = (key, parent) => key === true ? parent : typeof key === "string" ? resolveObjectKey(parent, key) : void 0;
    function addScopes(set, parentScopes, key, parentFallback, value) {
        for (const parent of parentScopes) {
            const scope = getScope(key, parent);
            if (scope) {
                set.add(scope);
                const fallback = resolveFallback(scope._fallback, key, value);
                if (typeof fallback !== "undefined" && fallback !== key && fallback !== parentFallback) return fallback;
            } else if (scope === false && typeof parentFallback !== "undefined" && key !== parentFallback) return null;
        }
        return false;
    }
    function createSubResolver(parentScopes, resolver, prop, value) {
        const rootScopes = resolver._rootScopes;
        const fallback = resolveFallback(resolver._fallback, prop, value);
        const allScopes = [ ...parentScopes, ...rootScopes ];
        const set = new Set;
        set.add(value);
        let key = addScopesFromKey(set, allScopes, prop, fallback || prop, value);
        if (key === null) return false;
        if (typeof fallback !== "undefined" && fallback !== prop) {
            key = addScopesFromKey(set, allScopes, fallback, key, value);
            if (key === null) return false;
        }
        return _createResolver(Array.from(set), [ "" ], rootScopes, fallback, (() => subGetTarget(resolver, prop, value)));
    }
    function addScopesFromKey(set, allScopes, key, fallback, item) {
        while (key) key = addScopes(set, allScopes, key, fallback, item);
        return key;
    }
    function subGetTarget(resolver, prop, value) {
        const parent = resolver._getTarget();
        if (!(prop in parent)) parent[prop] = {};
        const target = parent[prop];
        if (helpers_dataset_isArray(target) && helpers_dataset_isObject(value)) return value;
        return target || {};
    }
    function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
        let value;
        for (const prefix of prefixes) {
            value = _resolve(readKey(prefix, prop), scopes);
            if (typeof value !== "undefined") return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
        }
    }
    function _resolve(key, scopes) {
        for (const scope of scopes) {
            if (!scope) continue;
            const value = scope[key];
            if (typeof value !== "undefined") return value;
        }
    }
    function getKeysFromAllScopes(target) {
        let keys = target._keys;
        if (!keys) keys = target._keys = resolveKeysFromAllScopes(target._scopes);
        return keys;
    }
    function resolveKeysFromAllScopes(scopes) {
        const set = new Set;
        for (const scope of scopes) for (const key of Object.keys(scope).filter((k => !k.startsWith("_")))) set.add(key);
        return Array.from(set);
    }
    function _parseObjectDataRadialScale(meta, data, start, count) {
        const {iScale} = meta;
        const {key = "r"} = this._parsing;
        const parsed = new Array(count);
        let i, ilen, index, item;
        for (i = 0, ilen = count; i < ilen; ++i) {
            index = i + start;
            item = data[index];
            parsed[i] = {
                r: iScale.parse(resolveObjectKey(item, key), index)
            };
        }
        return parsed;
    }
    const EPSILON = Number.EPSILON || 1e-14;
    const getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
    const getValueAxis = indexAxis => indexAxis === "x" ? "y" : "x";
    function splineCurve(firstPoint, middlePoint, afterPoint, t) {
        const previous = firstPoint.skip ? middlePoint : firstPoint;
        const current = middlePoint;
        const next = afterPoint.skip ? middlePoint : afterPoint;
        const d01 = distanceBetweenPoints(current, previous);
        const d12 = distanceBetweenPoints(next, current);
        let s01 = d01 / (d01 + d12);
        let s12 = d12 / (d01 + d12);
        s01 = isNaN(s01) ? 0 : s01;
        s12 = isNaN(s12) ? 0 : s12;
        const fa = t * s01;
        const fb = t * s12;
        return {
            previous: {
                x: current.x - fa * (next.x - previous.x),
                y: current.y - fa * (next.y - previous.y)
            },
            next: {
                x: current.x + fb * (next.x - previous.x),
                y: current.y + fb * (next.y - previous.y)
            }
        };
    }
    function monotoneAdjust(points, deltaK, mK) {
        const pointsLen = points.length;
        let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (let i = 0; i < pointsLen - 1; ++i) {
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent || !pointAfter) continue;
            if (almostEquals(deltaK[i], 0, EPSILON)) {
                mK[i] = mK[i + 1] = 0;
                continue;
            }
            alphaK = mK[i] / deltaK[i];
            betaK = mK[i + 1] / deltaK[i];
            squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
            if (squaredMagnitude <= 9) continue;
            tauK = 3 / Math.sqrt(squaredMagnitude);
            mK[i] = alphaK * tauK * deltaK[i];
            mK[i + 1] = betaK * tauK * deltaK[i];
        }
    }
    function monotoneCompute(points, mK, indexAxis = "x") {
        const valueAxis = getValueAxis(indexAxis);
        const pointsLen = points.length;
        let delta, pointBefore, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (let i = 0; i < pointsLen; ++i) {
            pointBefore = pointCurrent;
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent) continue;
            const iPixel = pointCurrent[indexAxis];
            const vPixel = pointCurrent[valueAxis];
            if (pointBefore) {
                delta = (iPixel - pointBefore[indexAxis]) / 3;
                pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
                pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
            }
            if (pointAfter) {
                delta = (pointAfter[indexAxis] - iPixel) / 3;
                pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
                pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
            }
        }
    }
    function splineCurveMonotone(points, indexAxis = "x") {
        const valueAxis = getValueAxis(indexAxis);
        const pointsLen = points.length;
        const deltaK = Array(pointsLen).fill(0);
        const mK = Array(pointsLen);
        let i, pointBefore, pointCurrent;
        let pointAfter = getPoint(points, 0);
        for (i = 0; i < pointsLen; ++i) {
            pointBefore = pointCurrent;
            pointCurrent = pointAfter;
            pointAfter = getPoint(points, i + 1);
            if (!pointCurrent) continue;
            if (pointAfter) {
                const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
                deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
            }
            mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : helpers_dataset_sign(deltaK[i - 1]) !== helpers_dataset_sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
        }
        monotoneAdjust(points, deltaK, mK);
        monotoneCompute(points, mK, indexAxis);
    }
    function capControlPoint(pt, min, max) {
        return Math.max(Math.min(pt, max), min);
    }
    function capBezierPoints(points, area) {
        let i, ilen, point, inArea, inAreaPrev;
        let inAreaNext = _isPointInArea(points[0], area);
        for (i = 0, ilen = points.length; i < ilen; ++i) {
            inAreaPrev = inArea;
            inArea = inAreaNext;
            inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
            if (!inArea) continue;
            point = points[i];
            if (inAreaPrev) {
                point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
                point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
            }
            if (inAreaNext) {
                point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
                point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
            }
        }
    }
    function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
        let i, ilen, point, controlPoints;
        if (options.spanGaps) points = points.filter((pt => !pt.skip));
        if (options.cubicInterpolationMode === "monotone") splineCurveMonotone(points, indexAxis); else {
            let prev = loop ? points[points.length - 1] : points[0];
            for (i = 0, ilen = points.length; i < ilen; ++i) {
                point = points[i];
                controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
                point.cp1x = controlPoints.previous.x;
                point.cp1y = controlPoints.previous.y;
                point.cp2x = controlPoints.next.x;
                point.cp2y = controlPoints.next.y;
                prev = point;
            }
        }
        if (options.capBezierPoints) capBezierPoints(points, area);
    }
    function _isDomSupported() {
        return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function _getParentNode(domNode) {
        let parent = domNode.parentNode;
        if (parent && parent.toString() === "[object ShadowRoot]") parent = parent.host;
        return parent;
    }
    function parseMaxStyle(styleValue, node, parentProperty) {
        let valueInPixels;
        if (typeof styleValue === "string") {
            valueInPixels = parseInt(styleValue, 10);
            if (styleValue.indexOf("%") !== -1) valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
        } else valueInPixels = styleValue;
        return valueInPixels;
    }
    const helpers_dataset_getComputedStyle = element => element.ownerDocument.defaultView.getComputedStyle(element, null);
    function getStyle(el, property) {
        return helpers_dataset_getComputedStyle(el).getPropertyValue(property);
    }
    const positions = [ "top", "right", "bottom", "left" ];
    function getPositionedStyle(styles, style, suffix) {
        const result = {};
        suffix = suffix ? "-" + suffix : "";
        for (let i = 0; i < 4; i++) {
            const pos = positions[i];
            result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
        }
        result.width = result.left + result.right;
        result.height = result.top + result.bottom;
        return result;
    }
    const useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
    function getCanvasPosition(e, canvas) {
        const touches = e.touches;
        const source = touches && touches.length ? touches[0] : e;
        const {offsetX, offsetY} = source;
        let box = false;
        let x, y;
        if (useOffsetPos(offsetX, offsetY, e.target)) {
            x = offsetX;
            y = offsetY;
        } else {
            const rect = canvas.getBoundingClientRect();
            x = source.clientX - rect.left;
            y = source.clientY - rect.top;
            box = true;
        }
        return {
            x,
            y,
            box
        };
    }
    function getRelativePosition(event, chart) {
        if ("native" in event) return event;
        const {canvas, currentDevicePixelRatio} = chart;
        const style = helpers_dataset_getComputedStyle(canvas);
        const borderBox = style.boxSizing === "border-box";
        const paddings = getPositionedStyle(style, "padding");
        const borders = getPositionedStyle(style, "border", "width");
        const {x, y, box} = getCanvasPosition(event, canvas);
        const xOffset = paddings.left + (box && borders.left);
        const yOffset = paddings.top + (box && borders.top);
        let {width, height} = chart;
        if (borderBox) {
            width -= paddings.width + borders.width;
            height -= paddings.height + borders.height;
        }
        return {
            x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
            y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
        };
    }
    function getContainerSize(canvas, width, height) {
        let maxWidth, maxHeight;
        if (width === void 0 || height === void 0) {
            const container = canvas && _getParentNode(canvas);
            if (!container) {
                width = canvas.clientWidth;
                height = canvas.clientHeight;
            } else {
                const rect = container.getBoundingClientRect();
                const containerStyle = helpers_dataset_getComputedStyle(container);
                const containerBorder = getPositionedStyle(containerStyle, "border", "width");
                const containerPadding = getPositionedStyle(containerStyle, "padding");
                width = rect.width - containerPadding.width - containerBorder.width;
                height = rect.height - containerPadding.height - containerBorder.height;
                maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
                maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
            }
        }
        return {
            width,
            height,
            maxWidth: maxWidth || INFINITY,
            maxHeight: maxHeight || INFINITY
        };
    }
    const round1 = v => Math.round(v * 10) / 10;
    function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
        const style = helpers_dataset_getComputedStyle(canvas);
        const margins = getPositionedStyle(style, "margin");
        const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
        const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
        const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
        let {width, height} = containerSize;
        if (style.boxSizing === "content-box") {
            const borders = getPositionedStyle(style, "border", "width");
            const paddings = getPositionedStyle(style, "padding");
            width -= paddings.width + borders.width;
            height -= paddings.height + borders.height;
        }
        width = Math.max(0, width - margins.width);
        height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
        width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
        height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
        if (width && !height) height = round1(width / 2);
        const maintainHeight = bbWidth !== void 0 || bbHeight !== void 0;
        if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
            height = containerSize.height;
            width = round1(Math.floor(height * aspectRatio));
        }
        return {
            width,
            height
        };
    }
    function retinaScale(chart, forceRatio, forceStyle) {
        const pixelRatio = forceRatio || 1;
        const deviceHeight = round1(chart.height * pixelRatio);
        const deviceWidth = round1(chart.width * pixelRatio);
        chart.height = round1(chart.height);
        chart.width = round1(chart.width);
        const canvas = chart.canvas;
        if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
            canvas.style.height = `${chart.height}px`;
            canvas.style.width = `${chart.width}px`;
        }
        if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
            chart.currentDevicePixelRatio = pixelRatio;
            canvas.height = deviceHeight;
            canvas.width = deviceWidth;
            chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            return true;
        }
        return false;
    }
    const supportsEventListenerOptions = function() {
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            if (_isDomSupported()) {
                window.addEventListener("test", null, options);
                window.removeEventListener("test", null, options);
            }
        } catch (e) {}
        return passiveSupported;
    }();
    function readUsedSize(element, property) {
        const value = getStyle(element, property);
        const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
        return matches ? +matches[1] : void 0;
    }
    function _pointInLine(p1, p2, t, mode) {
        return {
            x: p1.x + t * (p2.x - p1.x),
            y: p1.y + t * (p2.y - p1.y)
        };
    }
    function _steppedInterpolation(p1, p2, t, mode) {
        return {
            x: p1.x + t * (p2.x - p1.x),
            y: mode === "middle" ? t < .5 ? p1.y : p2.y : mode === "after" ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
        };
    }
    function _bezierInterpolation(p1, p2, t, mode) {
        const cp1 = {
            x: p1.cp2x,
            y: p1.cp2y
        };
        const cp2 = {
            x: p2.cp1x,
            y: p2.cp1y
        };
        const a = _pointInLine(p1, cp1, t);
        const b = _pointInLine(cp1, cp2, t);
        const c = _pointInLine(cp2, p2, t);
        const d = _pointInLine(a, b, t);
        const e = _pointInLine(b, c, t);
        return _pointInLine(d, e, t);
    }
    const getRightToLeftAdapter = function(rectX, width) {
        return {
            x(x) {
                return rectX + rectX + width - x;
            },
            setWidth(w) {
                width = w;
            },
            textAlign(align) {
                if (align === "center") return align;
                return align === "right" ? "left" : "right";
            },
            xPlus(x, value) {
                return x - value;
            },
            leftForLtr(x, itemWidth) {
                return x - itemWidth;
            }
        };
    };
    const getLeftToRightAdapter = function() {
        return {
            x(x) {
                return x;
            },
            setWidth(w) {},
            textAlign(align) {
                return align;
            },
            xPlus(x, value) {
                return x + value;
            },
            leftForLtr(x, _itemWidth) {
                return x;
            }
        };
    };
    function getRtlAdapter(rtl, rectX, width) {
        return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
    }
    function overrideTextDirection(ctx, direction) {
        let style, original;
        if (direction === "ltr" || direction === "rtl") {
            style = ctx.canvas.style;
            original = [ style.getPropertyValue("direction"), style.getPropertyPriority("direction") ];
            style.setProperty("direction", direction, "important");
            ctx.prevTextDirection = original;
        }
    }
    function restoreTextDirection(ctx, original) {
        if (original !== void 0) {
            delete ctx.prevTextDirection;
            ctx.canvas.style.setProperty("direction", original[0], original[1]);
        }
    }
    function propertyFn(property) {
        if (property === "angle") return {
            between: _angleBetween,
            compare: _angleDiff,
            normalize: _normalizeAngle
        };
        return {
            between: _isBetween,
            compare: (a, b) => a - b,
            normalize: x => x
        };
    }
    function normalizeSegment({start, end, count, loop, style}) {
        return {
            start: start % count,
            end: end % count,
            loop: loop && (end - start + 1) % count === 0,
            style
        };
    }
    function getSegment(segment, points, bounds) {
        const {property, start: startBound, end: endBound} = bounds;
        const {between, normalize} = propertyFn(property);
        const count = points.length;
        let {start, end, loop} = segment;
        let i, ilen;
        if (loop) {
            start += count;
            end += count;
            for (i = 0, ilen = count; i < ilen; ++i) {
                if (!between(normalize(points[start % count][property]), startBound, endBound)) break;
                start--;
                end--;
            }
            start %= count;
            end %= count;
        }
        if (end < start) end += count;
        return {
            start,
            end,
            loop,
            style: segment.style
        };
    }
    function _boundSegment(segment, points, bounds) {
        if (!bounds) return [ segment ];
        const {property, start: startBound, end: endBound} = bounds;
        const count = points.length;
        const {compare, between, normalize} = propertyFn(property);
        const {start, end, loop, style} = getSegment(segment, points, bounds);
        const result = [];
        let inside = false;
        let subStart = null;
        let value, point, prevValue;
        const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
        const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
        const shouldStart = () => inside || startIsBefore();
        const shouldStop = () => !inside || endIsBefore();
        for (let i = start, prev = start; i <= end; ++i) {
            point = points[i % count];
            if (point.skip) continue;
            value = normalize(point[property]);
            if (value === prevValue) continue;
            inside = between(value, startBound, endBound);
            if (subStart === null && shouldStart()) subStart = compare(value, startBound) === 0 ? i : prev;
            if (subStart !== null && shouldStop()) {
                result.push(normalizeSegment({
                    start: subStart,
                    end: i,
                    loop,
                    count,
                    style
                }));
                subStart = null;
            }
            prev = i;
            prevValue = value;
        }
        if (subStart !== null) result.push(normalizeSegment({
            start: subStart,
            end,
            loop,
            count,
            style
        }));
        return result;
    }
    function _boundSegments(line, bounds) {
        const result = [];
        const segments = line.segments;
        for (let i = 0; i < segments.length; i++) {
            const sub = _boundSegment(segments[i], line.points, bounds);
            if (sub.length) result.push(...sub);
        }
        return result;
    }
    function findStartAndEnd(points, count, loop, spanGaps) {
        let start = 0;
        let end = count - 1;
        if (loop && !spanGaps) while (start < count && !points[start].skip) start++;
        while (start < count && points[start].skip) start++;
        start %= count;
        if (loop) end += start;
        while (end > start && points[end % count].skip) end--;
        end %= count;
        return {
            start,
            end
        };
    }
    function solidSegments(points, start, max, loop) {
        const count = points.length;
        const result = [];
        let last = start;
        let prev = points[start];
        let end;
        for (end = start + 1; end <= max; ++end) {
            const cur = points[end % count];
            if (cur.skip || cur.stop) {
                if (!prev.skip) {
                    loop = false;
                    result.push({
                        start: start % count,
                        end: (end - 1) % count,
                        loop
                    });
                    start = last = cur.stop ? end : null;
                }
            } else {
                last = end;
                if (prev.skip) start = end;
            }
            prev = cur;
        }
        if (last !== null) result.push({
            start: start % count,
            end: last % count,
            loop
        });
        return result;
    }
    function _computeSegments(line, segmentOptions) {
        const points = line.points;
        const spanGaps = line.options.spanGaps;
        const count = points.length;
        if (!count) return [];
        const loop = !!line._loop;
        const {start, end} = findStartAndEnd(points, count, loop, spanGaps);
        if (spanGaps === true) return splitByStyles(line, [ {
            start,
            end,
            loop
        } ], points, segmentOptions);
        const max = end < start ? end + count : end;
        const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
        return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
    }
    function splitByStyles(line, segments, points, segmentOptions) {
        if (!segmentOptions || !segmentOptions.setContext || !points) return segments;
        return doSplitByStyles(line, segments, points, segmentOptions);
    }
    function doSplitByStyles(line, segments, points, segmentOptions) {
        const chartContext = line._chart.getContext();
        const baseStyle = readStyle(line.options);
        const {_datasetIndex: datasetIndex, options: {spanGaps}} = line;
        const count = points.length;
        const result = [];
        let prevStyle = baseStyle;
        let start = segments[0].start;
        let i = start;
        function addStyle(s, e, l, st) {
            const dir = spanGaps ? -1 : 1;
            if (s === e) return;
            s += count;
            while (points[s % count].skip) s -= dir;
            while (points[e % count].skip) e += dir;
            if (s % count !== e % count) {
                result.push({
                    start: s % count,
                    end: e % count,
                    loop: l,
                    style: st
                });
                prevStyle = st;
                start = e % count;
            }
        }
        for (const segment of segments) {
            start = spanGaps ? start : segment.start;
            let prev = points[start % count];
            let style;
            for (i = start + 1; i <= segment.end; i++) {
                const pt = points[i % count];
                style = readStyle(segmentOptions.setContext(createContext(chartContext, {
                    type: "segment",
                    p0: prev,
                    p1: pt,
                    p0DataIndex: (i - 1) % count,
                    p1DataIndex: i % count,
                    datasetIndex
                })));
                if (styleChanged(style, prevStyle)) addStyle(start, i - 1, segment.loop, prevStyle);
                prev = pt;
                prevStyle = style;
            }
            if (start < i - 1) addStyle(start, i - 1, segment.loop, prevStyle);
        }
        return result;
    }
    function readStyle(options) {
        return {
            backgroundColor: options.backgroundColor,
            borderCapStyle: options.borderCapStyle,
            borderDash: options.borderDash,
            borderDashOffset: options.borderDashOffset,
            borderJoinStyle: options.borderJoinStyle,
            borderWidth: options.borderWidth,
            borderColor: options.borderColor
        };
    }
    function styleChanged(style, prevStyle) {
        if (!prevStyle) return false;
        const cache = [];
        const replacer = function(key, value) {
            if (!isPatternOrGradient(value)) return value;
            if (!cache.includes(value)) cache.push(value);
            return cache.indexOf(value);
        };
        return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
    }
    function getSizeForArea(scale, chartArea, field) {
        return scale.options.clip ? scale[field] : chartArea[field];
    }
    function getDatasetArea(meta, chartArea) {
        const {xScale, yScale} = meta;
        if (xScale && yScale) return {
            left: getSizeForArea(xScale, chartArea, "left"),
            right: getSizeForArea(xScale, chartArea, "right"),
            top: getSizeForArea(yScale, chartArea, "top"),
            bottom: getSizeForArea(yScale, chartArea, "bottom")
        };
        return chartArea;
    }
    function getDatasetClipArea(chart, meta) {
        const clip = meta._clip;
        if (clip.disabled) return false;
        const area = getDatasetArea(meta, chart.chartArea);
        return {
            left: clip.left === false ? 0 : area.left - (clip.left === true ? 0 : clip.left),
            right: clip.right === false ? chart.width : area.right + (clip.right === true ? 0 : clip.right),
            top: clip.top === false ? 0 : area.top - (clip.top === true ? 0 : clip.top),
            bottom: clip.bottom === false ? chart.height : area.bottom + (clip.bottom === true ? 0 : clip.bottom)
        };
    }
    /*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
    class Animator {
        constructor() {
            this._request = null;
            this._charts = new Map;
            this._running = false;
            this._lastDate = void 0;
        }
        _notify(chart, anims, date, type) {
            const callbacks = anims.listeners[type];
            const numSteps = anims.duration;
            callbacks.forEach((fn => fn({
                chart,
                initial: anims.initial,
                numSteps,
                currentStep: Math.min(date - anims.start, numSteps)
            })));
        }
        _refresh() {
            if (this._request) return;
            this._running = true;
            this._request = requestAnimFrame.call(window, (() => {
                this._update();
                this._request = null;
                if (this._running) this._refresh();
            }));
        }
        _update(date = Date.now()) {
            let remaining = 0;
            this._charts.forEach(((anims, chart) => {
                if (!anims.running || !anims.items.length) return;
                const items = anims.items;
                let i = items.length - 1;
                let draw = false;
                let item;
                for (;i >= 0; --i) {
                    item = items[i];
                    if (item._active) {
                        if (item._total > anims.duration) anims.duration = item._total;
                        item.tick(date);
                        draw = true;
                    } else {
                        items[i] = items[items.length - 1];
                        items.pop();
                    }
                }
                if (draw) {
                    chart.draw();
                    this._notify(chart, anims, date, "progress");
                }
                if (!items.length) {
                    anims.running = false;
                    this._notify(chart, anims, date, "complete");
                    anims.initial = false;
                }
                remaining += items.length;
            }));
            this._lastDate = date;
            if (remaining === 0) this._running = false;
        }
        _getAnims(chart) {
            const charts = this._charts;
            let anims = charts.get(chart);
            if (!anims) {
                anims = {
                    running: false,
                    initial: true,
                    items: [],
                    listeners: {
                        complete: [],
                        progress: []
                    }
                };
                charts.set(chart, anims);
            }
            return anims;
        }
        listen(chart, event, cb) {
            this._getAnims(chart).listeners[event].push(cb);
        }
        add(chart, items) {
            if (!items || !items.length) return;
            this._getAnims(chart).items.push(...items);
        }
        has(chart) {
            return this._getAnims(chart).items.length > 0;
        }
        start(chart) {
            const anims = this._charts.get(chart);
            if (!anims) return;
            anims.running = true;
            anims.start = Date.now();
            anims.duration = anims.items.reduce(((acc, cur) => Math.max(acc, cur._duration)), 0);
            this._refresh();
        }
        running(chart) {
            if (!this._running) return false;
            const anims = this._charts.get(chart);
            if (!anims || !anims.running || !anims.items.length) return false;
            return true;
        }
        stop(chart) {
            const anims = this._charts.get(chart);
            if (!anims || !anims.items.length) return;
            const items = anims.items;
            let i = items.length - 1;
            for (;i >= 0; --i) items[i].cancel();
            anims.items = [];
            this._notify(chart, anims, Date.now(), "complete");
        }
        remove(chart) {
            return this._charts.delete(chart);
        }
    }
    var animator = new Animator;
    const transparent = "transparent";
    const interpolators = {
        boolean(from, to, factor) {
            return factor > .5 ? to : from;
        },
        color(from, to, factor) {
            const c0 = color(from || transparent);
            const c1 = c0.valid && color(to || transparent);
            return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
        },
        number(from, to, factor) {
            return from + (to - from) * factor;
        }
    };
    class Animation {
        constructor(cfg, target, prop, to) {
            const currentValue = target[prop];
            to = resolve([ cfg.to, to, currentValue, cfg.from ]);
            const from = resolve([ cfg.from, currentValue, to ]);
            this._active = true;
            this._fn = cfg.fn || interpolators[cfg.type || typeof from];
            this._easing = effects[cfg.easing] || effects.linear;
            this._start = Math.floor(Date.now() + (cfg.delay || 0));
            this._duration = this._total = Math.floor(cfg.duration);
            this._loop = !!cfg.loop;
            this._target = target;
            this._prop = prop;
            this._from = from;
            this._to = to;
            this._promises = void 0;
        }
        active() {
            return this._active;
        }
        update(cfg, to, date) {
            if (this._active) {
                this._notify(false);
                const currentValue = this._target[this._prop];
                const elapsed = date - this._start;
                const remain = this._duration - elapsed;
                this._start = date;
                this._duration = Math.floor(Math.max(remain, cfg.duration));
                this._total += elapsed;
                this._loop = !!cfg.loop;
                this._to = resolve([ cfg.to, to, currentValue, cfg.from ]);
                this._from = resolve([ cfg.from, currentValue, to ]);
            }
        }
        cancel() {
            if (this._active) {
                this.tick(Date.now());
                this._active = false;
                this._notify(false);
            }
        }
        tick(date) {
            const elapsed = date - this._start;
            const duration = this._duration;
            const prop = this._prop;
            const from = this._from;
            const loop = this._loop;
            const to = this._to;
            let factor;
            this._active = from !== to && (loop || elapsed < duration);
            if (!this._active) {
                this._target[prop] = to;
                this._notify(true);
                return;
            }
            if (elapsed < 0) {
                this._target[prop] = from;
                return;
            }
            factor = elapsed / duration % 2;
            factor = loop && factor > 1 ? 2 - factor : factor;
            factor = this._easing(Math.min(1, Math.max(0, factor)));
            this._target[prop] = this._fn(from, to, factor);
        }
        wait() {
            const promises = this._promises || (this._promises = []);
            return new Promise(((res, rej) => {
                promises.push({
                    res,
                    rej
                });
            }));
        }
        _notify(resolved) {
            const method = resolved ? "res" : "rej";
            const promises = this._promises || [];
            for (let i = 0; i < promises.length; i++) promises[i][method]();
        }
    }
    class Animations {
        constructor(chart, config) {
            this._chart = chart;
            this._properties = new Map;
            this.configure(config);
        }
        configure(config) {
            if (!helpers_dataset_isObject(config)) return;
            const animationOptions = Object.keys(defaults.animation);
            const animatedProps = this._properties;
            Object.getOwnPropertyNames(config).forEach((key => {
                const cfg = config[key];
                if (!helpers_dataset_isObject(cfg)) return;
                const resolved = {};
                for (const option of animationOptions) resolved[option] = cfg[option];
                (helpers_dataset_isArray(cfg.properties) && cfg.properties || [ key ]).forEach((prop => {
                    if (prop === key || !animatedProps.has(prop)) animatedProps.set(prop, resolved);
                }));
            }));
        }
        _animateOptions(target, values) {
            const newOptions = values.options;
            const options = resolveTargetOptions(target, newOptions);
            if (!options) return [];
            const animations = this._createAnimations(options, newOptions);
            if (newOptions.$shared) awaitAll(target.options.$animations, newOptions).then((() => {
                target.options = newOptions;
            }), (() => {}));
            return animations;
        }
        _createAnimations(target, values) {
            const animatedProps = this._properties;
            const animations = [];
            const running = target.$animations || (target.$animations = {});
            const props = Object.keys(values);
            const date = Date.now();
            let i;
            for (i = props.length - 1; i >= 0; --i) {
                const prop = props[i];
                if (prop.charAt(0) === "$") continue;
                if (prop === "options") {
                    animations.push(...this._animateOptions(target, values));
                    continue;
                }
                const value = values[prop];
                let animation = running[prop];
                const cfg = animatedProps.get(prop);
                if (animation) if (cfg && animation.active()) {
                    animation.update(cfg, value, date);
                    continue;
                } else animation.cancel();
                if (!cfg || !cfg.duration) {
                    target[prop] = value;
                    continue;
                }
                running[prop] = animation = new Animation(cfg, target, prop, value);
                animations.push(animation);
            }
            return animations;
        }
        update(target, values) {
            if (this._properties.size === 0) {
                Object.assign(target, values);
                return;
            }
            const animations = this._createAnimations(target, values);
            if (animations.length) {
                animator.add(this._chart, animations);
                return true;
            }
        }
    }
    function awaitAll(animations, properties) {
        const running = [];
        const keys = Object.keys(properties);
        for (let i = 0; i < keys.length; i++) {
            const anim = animations[keys[i]];
            if (anim && anim.active()) running.push(anim.wait());
        }
        return Promise.all(running);
    }
    function resolveTargetOptions(target, newOptions) {
        if (!newOptions) return;
        let options = target.options;
        if (!options) {
            target.options = newOptions;
            return;
        }
        if (options.$shared) target.options = options = Object.assign({}, options, {
            $shared: false,
            $animations: {}
        });
        return options;
    }
    function scaleClip(scale, allowedOverflow) {
        const opts = scale && scale.options || {};
        const reverse = opts.reverse;
        const min = opts.min === void 0 ? allowedOverflow : 0;
        const max = opts.max === void 0 ? allowedOverflow : 0;
        return {
            start: reverse ? max : min,
            end: reverse ? min : max
        };
    }
    function defaultClip(xScale, yScale, allowedOverflow) {
        if (allowedOverflow === false) return false;
        const x = scaleClip(xScale, allowedOverflow);
        const y = scaleClip(yScale, allowedOverflow);
        return {
            top: y.end,
            right: x.end,
            bottom: y.start,
            left: x.start
        };
    }
    function toClip(value) {
        let t, r, b, l;
        if (helpers_dataset_isObject(value)) {
            t = value.top;
            r = value.right;
            b = value.bottom;
            l = value.left;
        } else t = r = b = l = value;
        return {
            top: t,
            right: r,
            bottom: b,
            left: l,
            disabled: value === false
        };
    }
    function getSortedDatasetIndices(chart, filterVisible) {
        const keys = [];
        const metasets = chart._getSortedDatasetMetas(filterVisible);
        let i, ilen;
        for (i = 0, ilen = metasets.length; i < ilen; ++i) keys.push(metasets[i].index);
        return keys;
    }
    function applyStack(stack, value, dsIndex, options = {}) {
        const keys = stack.keys;
        const singleMode = options.mode === "single";
        let i, ilen, datasetIndex, otherValue;
        if (value === null) return;
        let found = false;
        for (i = 0, ilen = keys.length; i < ilen; ++i) {
            datasetIndex = +keys[i];
            if (datasetIndex === dsIndex) {
                found = true;
                if (options.all) continue;
                break;
            }
            otherValue = stack.values[datasetIndex];
            if (isNumberFinite(otherValue) && (singleMode || value === 0 || helpers_dataset_sign(value) === helpers_dataset_sign(otherValue))) value += otherValue;
        }
        if (!found && !options.all) return 0;
        return value;
    }
    function convertObjectDataToArray(data, meta) {
        const {iScale, vScale} = meta;
        const iAxisKey = iScale.axis === "x" ? "x" : "y";
        const vAxisKey = vScale.axis === "x" ? "x" : "y";
        const keys = Object.keys(data);
        const adata = new Array(keys.length);
        let i, ilen, key;
        for (i = 0, ilen = keys.length; i < ilen; ++i) {
            key = keys[i];
            adata[i] = {
                [iAxisKey]: key,
                [vAxisKey]: data[key]
            };
        }
        return adata;
    }
    function isStacked(scale, meta) {
        const stacked = scale && scale.options.stacked;
        return stacked || stacked === void 0 && meta.stack !== void 0;
    }
    function getStackKey(indexScale, valueScale, meta) {
        return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
    }
    function getUserBounds(scale) {
        const {min, max, minDefined, maxDefined} = scale.getUserBounds();
        return {
            min: minDefined ? min : Number.NEGATIVE_INFINITY,
            max: maxDefined ? max : Number.POSITIVE_INFINITY
        };
    }
    function getOrCreateStack(stacks, stackKey, indexValue) {
        const subStack = stacks[stackKey] || (stacks[stackKey] = {});
        return subStack[indexValue] || (subStack[indexValue] = {});
    }
    function getLastIndexInStack(stack, vScale, positive, type) {
        for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
            const value = stack[meta.index];
            if (positive && value > 0 || !positive && value < 0) return meta.index;
        }
        return null;
    }
    function updateStacks(controller, parsed) {
        const {chart, _cachedMeta: meta} = controller;
        const stacks = chart._stacks || (chart._stacks = {});
        const {iScale, vScale, index: datasetIndex} = meta;
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const key = getStackKey(iScale, vScale, meta);
        const ilen = parsed.length;
        let stack;
        for (let i = 0; i < ilen; ++i) {
            const item = parsed[i];
            const {[iAxis]: index, [vAxis]: value} = item;
            const itemStacks = item._stacks || (item._stacks = {});
            stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
            stack[datasetIndex] = value;
            stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
            stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
            const visualValues = stack._visualValues || (stack._visualValues = {});
            visualValues[datasetIndex] = value;
        }
    }
    function getFirstScaleId(chart, axis) {
        const scales = chart.scales;
        return Object.keys(scales).filter((key => scales[key].axis === axis)).shift();
    }
    function createDatasetContext(parent, index) {
        return createContext(parent, {
            active: false,
            dataset: void 0,
            datasetIndex: index,
            index,
            mode: "default",
            type: "dataset"
        });
    }
    function createDataContext(parent, index, element) {
        return createContext(parent, {
            active: false,
            dataIndex: index,
            parsed: void 0,
            raw: void 0,
            element,
            index,
            mode: "default",
            type: "data"
        });
    }
    function clearStacks(meta, items) {
        const datasetIndex = meta.controller.index;
        const axis = meta.vScale && meta.vScale.axis;
        if (!axis) return;
        items = items || meta._parsed;
        for (const parsed of items) {
            const stacks = parsed._stacks;
            if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) return;
            delete stacks[axis][datasetIndex];
            if (stacks[axis]._visualValues !== void 0 && stacks[axis]._visualValues[datasetIndex] !== void 0) delete stacks[axis]._visualValues[datasetIndex];
        }
    }
    const isDirectUpdateMode = mode => mode === "reset" || mode === "none";
    const cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
    const createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && {
        keys: getSortedDatasetIndices(chart, true),
        values: null
    };
    class DatasetController {
        static defaults={};
        static datasetElementType=null;
        static dataElementType=null;
        constructor(chart, datasetIndex) {
            this.chart = chart;
            this._ctx = chart.ctx;
            this.index = datasetIndex;
            this._cachedDataOpts = {};
            this._cachedMeta = this.getMeta();
            this._type = this._cachedMeta.type;
            this.options = void 0;
            this._parsing = false;
            this._data = void 0;
            this._objectData = void 0;
            this._sharedOptions = void 0;
            this._drawStart = void 0;
            this._drawCount = void 0;
            this.enableOptionSharing = false;
            this.supportsDecimation = false;
            this.$context = void 0;
            this._syncList = [];
            this.datasetElementType = new.target.datasetElementType;
            this.dataElementType = new.target.dataElementType;
            this.initialize();
        }
        initialize() {
            const meta = this._cachedMeta;
            this.configure();
            this.linkScales();
            meta._stacked = isStacked(meta.vScale, meta);
            this.addElements();
            if (this.options.fill && !this.chart.isPluginEnabled("filler")) console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
        }
        updateIndex(datasetIndex) {
            if (this.index !== datasetIndex) clearStacks(this._cachedMeta);
            this.index = datasetIndex;
        }
        linkScales() {
            const chart = this.chart;
            const meta = this._cachedMeta;
            const dataset = this.getDataset();
            const chooseId = (axis, x, y, r) => axis === "x" ? x : axis === "r" ? r : y;
            const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
            const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
            const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
            const indexAxis = meta.indexAxis;
            const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
            const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
            meta.xScale = this.getScaleForId(xid);
            meta.yScale = this.getScaleForId(yid);
            meta.rScale = this.getScaleForId(rid);
            meta.iScale = this.getScaleForId(iid);
            meta.vScale = this.getScaleForId(vid);
        }
        getDataset() {
            return this.chart.data.datasets[this.index];
        }
        getMeta() {
            return this.chart.getDatasetMeta(this.index);
        }
        getScaleForId(scaleID) {
            return this.chart.scales[scaleID];
        }
        _getOtherScale(scale) {
            const meta = this._cachedMeta;
            return scale === meta.iScale ? meta.vScale : meta.iScale;
        }
        reset() {
            this._update("reset");
        }
        _destroy() {
            const meta = this._cachedMeta;
            if (this._data) unlistenArrayEvents(this._data, this);
            if (meta._stacked) clearStacks(meta);
        }
        _dataCheck() {
            const dataset = this.getDataset();
            const data = dataset.data || (dataset.data = []);
            const _data = this._data;
            if (helpers_dataset_isObject(data)) {
                const meta = this._cachedMeta;
                this._data = convertObjectDataToArray(data, meta);
            } else if (_data !== data) {
                if (_data) {
                    unlistenArrayEvents(_data, this);
                    const meta = this._cachedMeta;
                    clearStacks(meta);
                    meta._parsed = [];
                }
                if (data && Object.isExtensible(data)) listenArrayEvents(data, this);
                this._syncList = [];
                this._data = data;
            }
        }
        addElements() {
            const meta = this._cachedMeta;
            this._dataCheck();
            if (this.datasetElementType) meta.dataset = new this.datasetElementType;
        }
        buildOrUpdateElements(resetNewElements) {
            const meta = this._cachedMeta;
            const dataset = this.getDataset();
            let stackChanged = false;
            this._dataCheck();
            const oldStacked = meta._stacked;
            meta._stacked = isStacked(meta.vScale, meta);
            if (meta.stack !== dataset.stack) {
                stackChanged = true;
                clearStacks(meta);
                meta.stack = dataset.stack;
            }
            this._resyncElements(resetNewElements);
            if (stackChanged || oldStacked !== meta._stacked) {
                updateStacks(this, meta._parsed);
                meta._stacked = isStacked(meta.vScale, meta);
            }
        }
        configure() {
            const config = this.chart.config;
            const scopeKeys = config.datasetScopeKeys(this._type);
            const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
            this.options = config.createResolver(scopes, this.getContext());
            this._parsing = this.options.parsing;
            this._cachedDataOpts = {};
        }
        parse(start, count) {
            const {_cachedMeta: meta, _data: data} = this;
            const {iScale, _stacked} = meta;
            const iAxis = iScale.axis;
            let sorted = start === 0 && count === data.length ? true : meta._sorted;
            let prev = start > 0 && meta._parsed[start - 1];
            let i, cur, parsed;
            if (this._parsing === false) {
                meta._parsed = data;
                meta._sorted = true;
                parsed = data;
            } else {
                if (helpers_dataset_isArray(data[start])) parsed = this.parseArrayData(meta, data, start, count); else if (helpers_dataset_isObject(data[start])) parsed = this.parseObjectData(meta, data, start, count); else parsed = this.parsePrimitiveData(meta, data, start, count);
                const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
                for (i = 0; i < count; ++i) {
                    meta._parsed[i + start] = cur = parsed[i];
                    if (sorted) {
                        if (isNotInOrderComparedToPrev()) sorted = false;
                        prev = cur;
                    }
                }
                meta._sorted = sorted;
            }
            if (_stacked) updateStacks(this, parsed);
        }
        parsePrimitiveData(meta, data, start, count) {
            const {iScale, vScale} = meta;
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const labels = iScale.getLabels();
            const singleScale = iScale === vScale;
            const parsed = new Array(count);
            let i, ilen, index;
            for (i = 0, ilen = count; i < ilen; ++i) {
                index = i + start;
                parsed[i] = {
                    [iAxis]: singleScale || iScale.parse(labels[index], index),
                    [vAxis]: vScale.parse(data[index], index)
                };
            }
            return parsed;
        }
        parseArrayData(meta, data, start, count) {
            const {xScale, yScale} = meta;
            const parsed = new Array(count);
            let i, ilen, index, item;
            for (i = 0, ilen = count; i < ilen; ++i) {
                index = i + start;
                item = data[index];
                parsed[i] = {
                    x: xScale.parse(item[0], index),
                    y: yScale.parse(item[1], index)
                };
            }
            return parsed;
        }
        parseObjectData(meta, data, start, count) {
            const {xScale, yScale} = meta;
            const {xAxisKey = "x", yAxisKey = "y"} = this._parsing;
            const parsed = new Array(count);
            let i, ilen, index, item;
            for (i = 0, ilen = count; i < ilen; ++i) {
                index = i + start;
                item = data[index];
                parsed[i] = {
                    x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
                    y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
                };
            }
            return parsed;
        }
        getParsed(index) {
            return this._cachedMeta._parsed[index];
        }
        getDataElement(index) {
            return this._cachedMeta.data[index];
        }
        applyStack(scale, parsed, mode) {
            const chart = this.chart;
            const meta = this._cachedMeta;
            const value = parsed[scale.axis];
            const stack = {
                keys: getSortedDatasetIndices(chart, true),
                values: parsed._stacks[scale.axis]._visualValues
            };
            return applyStack(stack, value, meta.index, {
                mode
            });
        }
        updateRangeFromParsed(range, scale, parsed, stack) {
            const parsedValue = parsed[scale.axis];
            let value = parsedValue === null ? NaN : parsedValue;
            const values = stack && parsed._stacks[scale.axis];
            if (stack && values) {
                stack.values = values;
                value = applyStack(stack, parsedValue, this._cachedMeta.index);
            }
            range.min = Math.min(range.min, value);
            range.max = Math.max(range.max, value);
        }
        getMinMax(scale, canStack) {
            const meta = this._cachedMeta;
            const _parsed = meta._parsed;
            const sorted = meta._sorted && scale === meta.iScale;
            const ilen = _parsed.length;
            const otherScale = this._getOtherScale(scale);
            const stack = createStack(canStack, meta, this.chart);
            const range = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            };
            const {min: otherMin, max: otherMax} = getUserBounds(otherScale);
            let i, parsed;
            function _skip() {
                parsed = _parsed[i];
                const otherValue = parsed[otherScale.axis];
                return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
            }
            for (i = 0; i < ilen; ++i) {
                if (_skip()) continue;
                this.updateRangeFromParsed(range, scale, parsed, stack);
                if (sorted) break;
            }
            if (sorted) for (i = ilen - 1; i >= 0; --i) {
                if (_skip()) continue;
                this.updateRangeFromParsed(range, scale, parsed, stack);
                break;
            }
            return range;
        }
        getAllParsedValues(scale) {
            const parsed = this._cachedMeta._parsed;
            const values = [];
            let i, ilen, value;
            for (i = 0, ilen = parsed.length; i < ilen; ++i) {
                value = parsed[i][scale.axis];
                if (isNumberFinite(value)) values.push(value);
            }
            return values;
        }
        getMaxOverflow() {
            return false;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const iScale = meta.iScale;
            const vScale = meta.vScale;
            const parsed = this.getParsed(index);
            return {
                label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
                value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
            };
        }
        _update(mode) {
            const meta = this._cachedMeta;
            this.update(mode || "default");
            meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
        }
        update(mode) {}
        draw() {
            const ctx = this._ctx;
            const chart = this.chart;
            const meta = this._cachedMeta;
            const elements = meta.data || [];
            const area = chart.chartArea;
            const active = [];
            const start = this._drawStart || 0;
            const count = this._drawCount || elements.length - start;
            const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
            let i;
            if (meta.dataset) meta.dataset.draw(ctx, area, start, count);
            for (i = start; i < start + count; ++i) {
                const element = elements[i];
                if (element.hidden) continue;
                if (element.active && drawActiveElementsOnTop) active.push(element); else element.draw(ctx, area);
            }
            for (i = 0; i < active.length; ++i) active[i].draw(ctx, area);
        }
        getStyle(index, active) {
            const mode = active ? "active" : "default";
            return index === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
        }
        getContext(index, active, mode) {
            const dataset = this.getDataset();
            let context;
            if (index >= 0 && index < this._cachedMeta.data.length) {
                const element = this._cachedMeta.data[index];
                context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
                context.parsed = this.getParsed(index);
                context.raw = dataset.data[index];
                context.index = context.dataIndex = index;
            } else {
                context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
                context.dataset = dataset;
                context.index = context.datasetIndex = this.index;
            }
            context.active = !!active;
            context.mode = mode;
            return context;
        }
        resolveDatasetElementOptions(mode) {
            return this._resolveElementOptions(this.datasetElementType.id, mode);
        }
        resolveDataElementOptions(index, mode) {
            return this._resolveElementOptions(this.dataElementType.id, mode, index);
        }
        _resolveElementOptions(elementType, mode = "default", index) {
            const active = mode === "active";
            const cache = this._cachedDataOpts;
            const cacheKey = elementType + "-" + mode;
            const cached = cache[cacheKey];
            const sharing = this.enableOptionSharing && defined(index);
            if (cached) return cloneIfNotShared(cached, sharing);
            const config = this.chart.config;
            const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
            const prefixes = active ? [ `${elementType}Hover`, "hover", elementType, "" ] : [ elementType, "" ];
            const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
            const names = Object.keys(defaults.elements[elementType]);
            const context = () => this.getContext(index, active, mode);
            const values = config.resolveNamedOptions(scopes, names, context, prefixes);
            if (values.$shared) {
                values.$shared = sharing;
                cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
            }
            return values;
        }
        _resolveAnimations(index, transition, active) {
            const chart = this.chart;
            const cache = this._cachedDataOpts;
            const cacheKey = `animation-${transition}`;
            const cached = cache[cacheKey];
            if (cached) return cached;
            let options;
            if (chart.options.animation !== false) {
                const config = this.chart.config;
                const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
                const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
                options = config.createResolver(scopes, this.getContext(index, active, transition));
            }
            const animations = new Animations(chart, options && options.animations);
            if (options && options._cacheable) cache[cacheKey] = Object.freeze(animations);
            return animations;
        }
        getSharedOptions(options) {
            if (!options.$shared) return;
            return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
        }
        includeOptions(mode, sharedOptions) {
            return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
        }
        _getSharedOptions(start, mode) {
            const firstOpts = this.resolveDataElementOptions(start, mode);
            const previouslySharedOptions = this._sharedOptions;
            const sharedOptions = this.getSharedOptions(firstOpts);
            const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
            this.updateSharedOptions(sharedOptions, mode, firstOpts);
            return {
                sharedOptions,
                includeOptions
            };
        }
        updateElement(element, index, properties, mode) {
            if (isDirectUpdateMode(mode)) Object.assign(element, properties); else this._resolveAnimations(index, mode).update(element, properties);
        }
        updateSharedOptions(sharedOptions, mode, newOptions) {
            if (sharedOptions && !isDirectUpdateMode(mode)) this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
        }
        _setStyle(element, index, mode, active) {
            element.active = active;
            const options = this.getStyle(index, active);
            this._resolveAnimations(index, mode, active).update(element, {
                options: !active && this.getSharedOptions(options) || options
            });
        }
        removeHoverStyle(element, datasetIndex, index) {
            this._setStyle(element, index, "active", false);
        }
        setHoverStyle(element, datasetIndex, index) {
            this._setStyle(element, index, "active", true);
        }
        _removeDatasetHoverStyle() {
            const element = this._cachedMeta.dataset;
            if (element) this._setStyle(element, void 0, "active", false);
        }
        _setDatasetHoverStyle() {
            const element = this._cachedMeta.dataset;
            if (element) this._setStyle(element, void 0, "active", true);
        }
        _resyncElements(resetNewElements) {
            const data = this._data;
            const elements = this._cachedMeta.data;
            for (const [method, arg1, arg2] of this._syncList) this[method](arg1, arg2);
            this._syncList = [];
            const numMeta = elements.length;
            const numData = data.length;
            const count = Math.min(numData, numMeta);
            if (count) this.parse(0, count);
            if (numData > numMeta) this._insertElements(numMeta, numData - numMeta, resetNewElements); else if (numData < numMeta) this._removeElements(numData, numMeta - numData);
        }
        _insertElements(start, count, resetNewElements = true) {
            const meta = this._cachedMeta;
            const data = meta.data;
            const end = start + count;
            let i;
            const move = arr => {
                arr.length += count;
                for (i = arr.length - 1; i >= end; i--) arr[i] = arr[i - count];
            };
            move(data);
            for (i = start; i < end; ++i) data[i] = new this.dataElementType;
            if (this._parsing) move(meta._parsed);
            this.parse(start, count);
            if (resetNewElements) this.updateElements(data, start, count, "reset");
        }
        updateElements(element, start, count, mode) {}
        _removeElements(start, count) {
            const meta = this._cachedMeta;
            if (this._parsing) {
                const removed = meta._parsed.splice(start, count);
                if (meta._stacked) clearStacks(meta, removed);
            }
            meta.data.splice(start, count);
        }
        _sync(args) {
            if (this._parsing) this._syncList.push(args); else {
                const [method, arg1, arg2] = args;
                this[method](arg1, arg2);
            }
            this.chart._dataChanges.push([ this.index, ...args ]);
        }
        _onDataPush() {
            const count = arguments.length;
            this._sync([ "_insertElements", this.getDataset().data.length - count, count ]);
        }
        _onDataPop() {
            this._sync([ "_removeElements", this._cachedMeta.data.length - 1, 1 ]);
        }
        _onDataShift() {
            this._sync([ "_removeElements", 0, 1 ]);
        }
        _onDataSplice(start, count) {
            if (count) this._sync([ "_removeElements", start, count ]);
            const newCount = arguments.length - 2;
            if (newCount) this._sync([ "_insertElements", start, newCount ]);
        }
        _onDataUnshift() {
            this._sync([ "_insertElements", 0, arguments.length ]);
        }
    }
    function getAllScaleValues(scale, type) {
        if (!scale._cache.$bar) {
            const visibleMetas = scale.getMatchingVisibleMetas(type);
            let values = [];
            for (let i = 0, ilen = visibleMetas.length; i < ilen; i++) values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
            scale._cache.$bar = _arrayUnique(values.sort(((a, b) => a - b)));
        }
        return scale._cache.$bar;
    }
    function computeMinSampleSize(meta) {
        const scale = meta.iScale;
        const values = getAllScaleValues(scale, meta.type);
        let min = scale._length;
        let i, ilen, curr, prev;
        const updateMinAndPrev = () => {
            if (curr === 32767 || curr === -32768) return;
            if (defined(prev)) min = Math.min(min, Math.abs(curr - prev) || min);
            prev = curr;
        };
        for (i = 0, ilen = values.length; i < ilen; ++i) {
            curr = scale.getPixelForValue(values[i]);
            updateMinAndPrev();
        }
        prev = void 0;
        for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
            curr = scale.getPixelForTick(i);
            updateMinAndPrev();
        }
        return min;
    }
    function computeFitCategoryTraits(index, ruler, options, stackCount) {
        const thickness = options.barThickness;
        let size, ratio;
        if (isNullOrUndef(thickness)) {
            size = ruler.min * options.categoryPercentage;
            ratio = options.barPercentage;
        } else {
            size = thickness * stackCount;
            ratio = 1;
        }
        return {
            chunk: size / stackCount,
            ratio,
            start: ruler.pixels[index] - size / 2
        };
    }
    function computeFlexCategoryTraits(index, ruler, options, stackCount) {
        const pixels = ruler.pixels;
        const curr = pixels[index];
        let prev = index > 0 ? pixels[index - 1] : null;
        let next = index < pixels.length - 1 ? pixels[index + 1] : null;
        const percent = options.categoryPercentage;
        if (prev === null) prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
        if (next === null) next = curr + curr - prev;
        const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
        const size = Math.abs(next - prev) / 2 * percent;
        return {
            chunk: size / stackCount,
            ratio: options.barPercentage,
            start
        };
    }
    function parseFloatBar(entry, item, vScale, i) {
        const startValue = vScale.parse(entry[0], i);
        const endValue = vScale.parse(entry[1], i);
        const min = Math.min(startValue, endValue);
        const max = Math.max(startValue, endValue);
        let barStart = min;
        let barEnd = max;
        if (Math.abs(min) > Math.abs(max)) {
            barStart = max;
            barEnd = min;
        }
        item[vScale.axis] = barEnd;
        item._custom = {
            barStart,
            barEnd,
            start: startValue,
            end: endValue,
            min,
            max
        };
    }
    function parseValue(entry, item, vScale, i) {
        if (helpers_dataset_isArray(entry)) parseFloatBar(entry, item, vScale, i); else item[vScale.axis] = vScale.parse(entry, i);
        return item;
    }
    function parseArrayOrPrimitive(meta, data, start, count) {
        const iScale = meta.iScale;
        const vScale = meta.vScale;
        const labels = iScale.getLabels();
        const singleScale = iScale === vScale;
        const parsed = [];
        let i, ilen, item, entry;
        for (i = start, ilen = start + count; i < ilen; ++i) {
            entry = data[i];
            item = {};
            item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
            parsed.push(parseValue(entry, item, vScale, i));
        }
        return parsed;
    }
    function isFloatBar(custom) {
        return custom && custom.barStart !== void 0 && custom.barEnd !== void 0;
    }
    function barSign(size, vScale, actualBase) {
        if (size !== 0) return helpers_dataset_sign(size);
        return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
    }
    function borderProps(properties) {
        let reverse, start, end, top, bottom;
        if (properties.horizontal) {
            reverse = properties.base > properties.x;
            start = "left";
            end = "right";
        } else {
            reverse = properties.base < properties.y;
            start = "bottom";
            end = "top";
        }
        if (reverse) {
            top = "end";
            bottom = "start";
        } else {
            top = "start";
            bottom = "end";
        }
        return {
            start,
            end,
            reverse,
            top,
            bottom
        };
    }
    function setBorderSkipped(properties, options, stack, index) {
        let edge = options.borderSkipped;
        const res = {};
        if (!edge) {
            properties.borderSkipped = res;
            return;
        }
        if (edge === true) {
            properties.borderSkipped = {
                top: true,
                right: true,
                bottom: true,
                left: true
            };
            return;
        }
        const {start, end, reverse, top, bottom} = borderProps(properties);
        if (edge === "middle" && stack) {
            properties.enableBorderRadius = true;
            if ((stack._top || 0) === index) edge = top; else if ((stack._bottom || 0) === index) edge = bottom; else {
                res[parseEdge(bottom, start, end, reverse)] = true;
                edge = top;
            }
        }
        res[parseEdge(edge, start, end, reverse)] = true;
        properties.borderSkipped = res;
    }
    function parseEdge(edge, a, b, reverse) {
        if (reverse) {
            edge = swap(edge, a, b);
            edge = startEnd(edge, b, a);
        } else edge = startEnd(edge, a, b);
        return edge;
    }
    function swap(orig, v1, v2) {
        return orig === v1 ? v2 : orig === v2 ? v1 : orig;
    }
    function startEnd(v, start, end) {
        return v === "start" ? start : v === "end" ? end : v;
    }
    function setInflateAmount(properties, {inflateAmount}, ratio) {
        properties.inflateAmount = inflateAmount === "auto" ? ratio === 1 ? .33 : 0 : inflateAmount;
    }
    class BarController extends DatasetController {
        static id="bar";
        static defaults={
            datasetElementType: false,
            dataElementType: "bar",
            categoryPercentage: .8,
            barPercentage: .9,
            grouped: true,
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "base", "width", "height" ]
                }
            }
        };
        static overrides={
            scales: {
                _index_: {
                    type: "category",
                    offset: true,
                    grid: {
                        offset: true
                    }
                },
                _value_: {
                    type: "linear",
                    beginAtZero: true
                }
            }
        };
        parsePrimitiveData(meta, data, start, count) {
            return parseArrayOrPrimitive(meta, data, start, count);
        }
        parseArrayData(meta, data, start, count) {
            return parseArrayOrPrimitive(meta, data, start, count);
        }
        parseObjectData(meta, data, start, count) {
            const {iScale, vScale} = meta;
            const {xAxisKey = "x", yAxisKey = "y"} = this._parsing;
            const iAxisKey = iScale.axis === "x" ? xAxisKey : yAxisKey;
            const vAxisKey = vScale.axis === "x" ? xAxisKey : yAxisKey;
            const parsed = [];
            let i, ilen, item, obj;
            for (i = start, ilen = start + count; i < ilen; ++i) {
                obj = data[i];
                item = {};
                item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
                parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
            }
            return parsed;
        }
        updateRangeFromParsed(range, scale, parsed, stack) {
            super.updateRangeFromParsed(range, scale, parsed, stack);
            const custom = parsed._custom;
            if (custom && scale === this._cachedMeta.vScale) {
                range.min = Math.min(range.min, custom.min);
                range.max = Math.max(range.max, custom.max);
            }
        }
        getMaxOverflow() {
            return 0;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const {iScale, vScale} = meta;
            const parsed = this.getParsed(index);
            const custom = parsed._custom;
            const value = isFloatBar(custom) ? "[" + custom.start + ", " + custom.end + "]" : "" + vScale.getLabelForValue(parsed[vScale.axis]);
            return {
                label: "" + iScale.getLabelForValue(parsed[iScale.axis]),
                value
            };
        }
        initialize() {
            this.enableOptionSharing = true;
            super.initialize();
            const meta = this._cachedMeta;
            meta.stack = this.getDataset().stack;
        }
        update(mode) {
            const meta = this._cachedMeta;
            this.updateElements(meta.data, 0, meta.data.length, mode);
        }
        updateElements(bars, start, count, mode) {
            const reset = mode === "reset";
            const {index, _cachedMeta: {vScale}} = this;
            const base = vScale.getBasePixel();
            const horizontal = vScale.isHorizontal();
            const ruler = this._getRuler();
            const {sharedOptions, includeOptions} = this._getSharedOptions(start, mode);
            for (let i = start; i < start + count; i++) {
                const parsed = this.getParsed(i);
                const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? {
                    base,
                    head: base
                } : this._calculateBarValuePixels(i);
                const ipixels = this._calculateBarIndexPixels(i, ruler);
                const stack = (parsed._stacks || {})[vScale.axis];
                const properties = {
                    horizontal,
                    base: vpixels.base,
                    enableBorderRadius: !stack || isFloatBar(parsed._custom) || index === stack._top || index === stack._bottom,
                    x: horizontal ? vpixels.head : ipixels.center,
                    y: horizontal ? ipixels.center : vpixels.head,
                    height: horizontal ? ipixels.size : Math.abs(vpixels.size),
                    width: horizontal ? Math.abs(vpixels.size) : ipixels.size
                };
                if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? "active" : mode);
                const options = properties.options || bars[i].options;
                setBorderSkipped(properties, options, stack, index);
                setInflateAmount(properties, options, ruler.ratio);
                this.updateElement(bars[i], i, properties, mode);
            }
        }
        _getStacks(last, dataIndex) {
            const {iScale} = this._cachedMeta;
            const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta => meta.controller.options.grouped));
            const stacked = iScale.options.stacked;
            const stacks = [];
            const currentParsed = this._cachedMeta.controller.getParsed(dataIndex);
            const iScaleValue = currentParsed && currentParsed[iScale.axis];
            const skipNull = meta => {
                const parsed = meta._parsed.find((item => item[iScale.axis] === iScaleValue));
                const val = parsed && parsed[meta.vScale.axis];
                if (isNullOrUndef(val) || isNaN(val)) return true;
            };
            for (const meta of metasets) {
                if (dataIndex !== void 0 && skipNull(meta)) continue;
                if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === void 0 && meta.stack === void 0) stacks.push(meta.stack);
                if (meta.index === last) break;
            }
            if (!stacks.length) stacks.push(void 0);
            return stacks;
        }
        _getStackCount(index) {
            return this._getStacks(void 0, index).length;
        }
        _getAxisCount() {
            return this._getAxis().length;
        }
        getFirstScaleIdForIndexAxis() {
            const scales = this.chart.scales;
            const indexScaleId = this.chart.options.indexAxis;
            return Object.keys(scales).filter((key => scales[key].axis === indexScaleId)).shift();
        }
        _getAxis() {
            const axis = {};
            const firstScaleAxisId = this.getFirstScaleIdForIndexAxis();
            for (const dataset of this.chart.data.datasets) axis[valueOrDefault(this.chart.options.indexAxis === "x" ? dataset.xAxisID : dataset.yAxisID, firstScaleAxisId)] = true;
            return Object.keys(axis);
        }
        _getStackIndex(datasetIndex, name, dataIndex) {
            const stacks = this._getStacks(datasetIndex, dataIndex);
            const index = name !== void 0 ? stacks.indexOf(name) : -1;
            return index === -1 ? stacks.length - 1 : index;
        }
        _getRuler() {
            const opts = this.options;
            const meta = this._cachedMeta;
            const iScale = meta.iScale;
            const pixels = [];
            let i, ilen;
            for (i = 0, ilen = meta.data.length; i < ilen; ++i) pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
            const barThickness = opts.barThickness;
            const min = barThickness || computeMinSampleSize(meta);
            return {
                min,
                pixels,
                start: iScale._startPixel,
                end: iScale._endPixel,
                stackCount: this._getStackCount(),
                scale: iScale,
                grouped: opts.grouped,
                ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
            };
        }
        _calculateBarValuePixels(index) {
            const {_cachedMeta: {vScale, _stacked, index: datasetIndex}, options: {base: baseValue, minBarLength}} = this;
            const actualBase = baseValue || 0;
            const parsed = this.getParsed(index);
            const custom = parsed._custom;
            const floating = isFloatBar(custom);
            let value = parsed[vScale.axis];
            let start = 0;
            let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
            let head, size;
            if (length !== value) {
                start = length - value;
                length = value;
            }
            if (floating) {
                value = custom.barStart;
                length = custom.barEnd - custom.barStart;
                if (value !== 0 && helpers_dataset_sign(value) !== helpers_dataset_sign(custom.barEnd)) start = 0;
                start += value;
            }
            const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
            let base = vScale.getPixelForValue(startValue);
            if (this.chart.getDataVisibility(index)) head = vScale.getPixelForValue(start + length); else head = base;
            size = head - base;
            if (Math.abs(size) < minBarLength) {
                size = barSign(size, vScale, actualBase) * minBarLength;
                if (value === actualBase) base -= size / 2;
                const startPixel = vScale.getPixelForDecimal(0);
                const endPixel = vScale.getPixelForDecimal(1);
                const min = Math.min(startPixel, endPixel);
                const max = Math.max(startPixel, endPixel);
                base = Math.max(Math.min(base, max), min);
                head = base + size;
                if (_stacked && !floating) parsed._stacks[vScale.axis]._visualValues[datasetIndex] = vScale.getValueForPixel(head) - vScale.getValueForPixel(base);
            }
            if (base === vScale.getPixelForValue(actualBase)) {
                const halfGrid = helpers_dataset_sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
                base += halfGrid;
                size -= halfGrid;
            }
            return {
                size,
                base,
                head,
                center: head + size / 2
            };
        }
        _calculateBarIndexPixels(index, ruler) {
            const scale = ruler.scale;
            const options = this.options;
            const skipNull = options.skipNull;
            const maxBarThickness = valueOrDefault(options.maxBarThickness, 1 / 0);
            let center, size;
            const axisCount = this._getAxisCount();
            if (ruler.grouped) {
                const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
                const range = options.barThickness === "flex" ? computeFlexCategoryTraits(index, ruler, options, stackCount * axisCount) : computeFitCategoryTraits(index, ruler, options, stackCount * axisCount);
                const axisID = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID;
                const axisNumber = this._getAxis().indexOf(valueOrDefault(axisID, this.getFirstScaleIdForIndexAxis()));
                const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : void 0) + axisNumber;
                center = range.start + range.chunk * stackIndex + range.chunk / 2;
                size = Math.min(maxBarThickness, range.chunk * range.ratio);
            } else {
                center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
                size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
            }
            return {
                base: center - size / 2,
                head: center + size / 2,
                center,
                size
            };
        }
        draw() {
            const meta = this._cachedMeta;
            const vScale = meta.vScale;
            const rects = meta.data;
            const ilen = rects.length;
            let i = 0;
            for (;i < ilen; ++i) if (this.getParsed(i)[vScale.axis] !== null && !rects[i].hidden) rects[i].draw(this._ctx);
        }
    }
    class BubbleController extends DatasetController {
        static id="bubble";
        static defaults={
            datasetElementType: false,
            dataElementType: "point",
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "borderWidth", "radius" ]
                }
            }
        };
        static overrides={
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            }
        };
        initialize() {
            this.enableOptionSharing = true;
            super.initialize();
        }
        parsePrimitiveData(meta, data, start, count) {
            const parsed = super.parsePrimitiveData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
            return parsed;
        }
        parseArrayData(meta, data, start, count) {
            const parsed = super.parseArrayData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) {
                const item = data[start + i];
                parsed[i]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i + start).radius);
            }
            return parsed;
        }
        parseObjectData(meta, data, start, count) {
            const parsed = super.parseObjectData(meta, data, start, count);
            for (let i = 0; i < parsed.length; i++) {
                const item = data[start + i];
                parsed[i]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
            }
            return parsed;
        }
        getMaxOverflow() {
            const data = this._cachedMeta.data;
            let max = 0;
            for (let i = data.length - 1; i >= 0; --i) max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
            return max > 0 && max;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const labels = this.chart.data.labels || [];
            const {xScale, yScale} = meta;
            const parsed = this.getParsed(index);
            const x = xScale.getLabelForValue(parsed.x);
            const y = yScale.getLabelForValue(parsed.y);
            const r = parsed._custom;
            return {
                label: labels[index] || "",
                value: "(" + x + ", " + y + (r ? ", " + r : "") + ")"
            };
        }
        update(mode) {
            const points = this._cachedMeta.data;
            this.updateElements(points, 0, points.length, mode);
        }
        updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const {iScale, vScale} = this._cachedMeta;
            const {sharedOptions, includeOptions} = this._getSharedOptions(start, mode);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            for (let i = start; i < start + count; i++) {
                const point = points[i];
                const parsed = !reset && this.getParsed(i);
                const properties = {};
                const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(.5) : iScale.getPixelForValue(parsed[iAxis]);
                const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
                properties.skip = isNaN(iPixel) || isNaN(vPixel);
                if (includeOptions) {
                    properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
                    if (reset) properties.options.radius = 0;
                }
                this.updateElement(point, i, properties, mode);
            }
        }
        resolveDataElementOptions(index, mode) {
            const parsed = this.getParsed(index);
            let values = super.resolveDataElementOptions(index, mode);
            if (values.$shared) values = Object.assign({}, values, {
                $shared: false
            });
            const radius = values.radius;
            if (mode !== "active") values.radius = 0;
            values.radius += valueOrDefault(parsed && parsed._custom, radius);
            return values;
        }
    }
    function getRatioAndOffset(rotation, circumference, cutout) {
        let ratioX = 1;
        let ratioY = 1;
        let offsetX = 0;
        let offsetY = 0;
        if (circumference < TAU) {
            const startAngle = rotation;
            const endAngle = startAngle + circumference;
            const startX = Math.cos(startAngle);
            const startY = Math.sin(startAngle);
            const endX = Math.cos(endAngle);
            const endY = Math.sin(endAngle);
            const calcMax = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
            const calcMin = (angle, a, b) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
            const maxX = calcMax(0, startX, endX);
            const maxY = calcMax(HALF_PI, startY, endY);
            const minX = calcMin(PI, startX, endX);
            const minY = calcMin(PI + HALF_PI, startY, endY);
            ratioX = (maxX - minX) / 2;
            ratioY = (maxY - minY) / 2;
            offsetX = -(maxX + minX) / 2;
            offsetY = -(maxY + minY) / 2;
        }
        return {
            ratioX,
            ratioY,
            offsetX,
            offsetY
        };
    }
    class DoughnutController extends DatasetController {
        static id="doughnut";
        static defaults={
            datasetElementType: false,
            dataElementType: "arc",
            animation: {
                animateRotate: true,
                animateScale: false
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing" ]
                }
            },
            cutout: "50%",
            rotation: 0,
            circumference: 360,
            radius: "100%",
            spacing: 0,
            indexAxis: "r"
        };
        static descriptors={
            _scriptable: name => name !== "spacing",
            _indexable: name => name !== "spacing" && !name.startsWith("borderDash") && !name.startsWith("hoverBorderDash")
        };
        static overrides={
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(chart) {
                            const data = chart.data;
                            const {labels: {pointStyle, textAlign, color, useBorderRadius, borderRadius}} = chart.legend.options;
                            if (data.labels.length && data.datasets.length) return data.labels.map(((label, i) => {
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                return {
                                    text: label,
                                    fillStyle: style.backgroundColor,
                                    fontColor: color,
                                    hidden: !chart.getDataVisibility(i),
                                    lineDash: style.borderDash,
                                    lineDashOffset: style.borderDashOffset,
                                    lineJoin: style.borderJoinStyle,
                                    lineWidth: style.borderWidth,
                                    strokeStyle: style.borderColor,
                                    textAlign,
                                    pointStyle,
                                    borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
                                    index: i
                                };
                            }));
                            return [];
                        }
                    },
                    onClick(e, legendItem, legend) {
                        legend.chart.toggleDataVisibility(legendItem.index);
                        legend.chart.update();
                    }
                }
            }
        };
        constructor(chart, datasetIndex) {
            super(chart, datasetIndex);
            this.enableOptionSharing = true;
            this.innerRadius = void 0;
            this.outerRadius = void 0;
            this.offsetX = void 0;
            this.offsetY = void 0;
        }
        linkScales() {}
        parse(start, count) {
            const data = this.getDataset().data;
            const meta = this._cachedMeta;
            if (this._parsing === false) meta._parsed = data; else {
                let getter = i => +data[i];
                if (helpers_dataset_isObject(data[start])) {
                    const {key = "value"} = this._parsing;
                    getter = i => +resolveObjectKey(data[i], key);
                }
                let i, ilen;
                for (i = start, ilen = start + count; i < ilen; ++i) meta._parsed[i] = getter(i);
            }
        }
        _getRotation() {
            return toRadians(this.options.rotation - 90);
        }
        _getCircumference() {
            return toRadians(this.options.circumference);
        }
        _getRotationExtents() {
            let min = TAU;
            let max = -TAU;
            for (let i = 0; i < this.chart.data.datasets.length; ++i) if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
                const controller = this.chart.getDatasetMeta(i).controller;
                const rotation = controller._getRotation();
                const circumference = controller._getCircumference();
                min = Math.min(min, rotation);
                max = Math.max(max, rotation + circumference);
            }
            return {
                rotation: min,
                circumference: max - min
            };
        }
        update(mode) {
            const chart = this.chart;
            const {chartArea} = chart;
            const meta = this._cachedMeta;
            const arcs = meta.data;
            const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
            const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
            const cutout = Math.min(helpers_dataset_toPercentage(this.options.cutout, maxSize), 1);
            const chartWeight = this._getRingWeight(this.index);
            const {circumference, rotation} = this._getRotationExtents();
            const {ratioX, ratioY, offsetX, offsetY} = getRatioAndOffset(rotation, circumference, cutout);
            const maxWidth = (chartArea.width - spacing) / ratioX;
            const maxHeight = (chartArea.height - spacing) / ratioY;
            const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
            const outerRadius = toDimension(this.options.radius, maxRadius);
            const innerRadius = Math.max(outerRadius * cutout, 0);
            const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
            this.offsetX = offsetX * outerRadius;
            this.offsetY = offsetY * outerRadius;
            meta.total = this.calculateTotal();
            this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
            this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
            this.updateElements(arcs, 0, arcs.length, mode);
        }
        _circumference(i, reset) {
            const opts = this.options;
            const meta = this._cachedMeta;
            const circumference = this._getCircumference();
            if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) return 0;
            return this.calculateCircumference(meta._parsed[i] * circumference / TAU);
        }
        updateElements(arcs, start, count, mode) {
            const reset = mode === "reset";
            const chart = this.chart;
            const chartArea = chart.chartArea;
            const opts = chart.options;
            const animationOpts = opts.animation;
            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;
            const animateScale = reset && animationOpts.animateScale;
            const innerRadius = animateScale ? 0 : this.innerRadius;
            const outerRadius = animateScale ? 0 : this.outerRadius;
            const {sharedOptions, includeOptions} = this._getSharedOptions(start, mode);
            let startAngle = this._getRotation();
            let i;
            for (i = 0; i < start; ++i) startAngle += this._circumference(i, reset);
            for (i = start; i < start + count; ++i) {
                const circumference = this._circumference(i, reset);
                const arc = arcs[i];
                const properties = {
                    x: centerX + this.offsetX,
                    y: centerY + this.offsetY,
                    startAngle,
                    endAngle: startAngle + circumference,
                    circumference,
                    outerRadius,
                    innerRadius
                };
                if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? "active" : mode);
                startAngle += circumference;
                this.updateElement(arc, i, properties, mode);
            }
        }
        calculateTotal() {
            const meta = this._cachedMeta;
            const metaData = meta.data;
            let total = 0;
            let i;
            for (i = 0; i < metaData.length; i++) {
                const value = meta._parsed[i];
                if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) total += Math.abs(value);
            }
            return total;
        }
        calculateCircumference(value) {
            const total = this._cachedMeta.total;
            if (total > 0 && !isNaN(value)) return TAU * (Math.abs(value) / total);
            return 0;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const chart = this.chart;
            const labels = chart.data.labels || [];
            const value = formatNumber(meta._parsed[index], chart.options.locale);
            return {
                label: labels[index] || "",
                value
            };
        }
        getMaxBorderWidth(arcs) {
            let max = 0;
            const chart = this.chart;
            let i, ilen, meta, controller, options;
            if (!arcs) for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) if (chart.isDatasetVisible(i)) {
                meta = chart.getDatasetMeta(i);
                arcs = meta.data;
                controller = meta.controller;
                break;
            }
            if (!arcs) return 0;
            for (i = 0, ilen = arcs.length; i < ilen; ++i) {
                options = controller.resolveDataElementOptions(i);
                if (options.borderAlign !== "inner") max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
            }
            return max;
        }
        getMaxOffset(arcs) {
            let max = 0;
            for (let i = 0, ilen = arcs.length; i < ilen; ++i) {
                const options = this.resolveDataElementOptions(i);
                max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
            }
            return max;
        }
        _getRingWeightOffset(datasetIndex) {
            let ringWeightOffset = 0;
            for (let i = 0; i < datasetIndex; ++i) if (this.chart.isDatasetVisible(i)) ringWeightOffset += this._getRingWeight(i);
            return ringWeightOffset;
        }
        _getRingWeight(datasetIndex) {
            return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
        }
        _getVisibleDatasetWeightTotal() {
            return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
        }
    }
    class LineController extends DatasetController {
        static id="line";
        static defaults={
            datasetElementType: "line",
            dataElementType: "point",
            showLine: true,
            spanGaps: false
        };
        static overrides={
            scales: {
                _index_: {
                    type: "category"
                },
                _value_: {
                    type: "linear"
                }
            }
        };
        initialize() {
            this.enableOptionSharing = true;
            this.supportsDecimation = true;
            super.initialize();
        }
        update(mode) {
            const meta = this._cachedMeta;
            const {dataset: line, data: points = [], _dataset} = meta;
            const animationsDisabled = this.chart._animationsDisabled;
            let {start, count} = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
            this._drawStart = start;
            this._drawCount = count;
            if (_scaleRangesChanged(meta)) {
                start = 0;
                count = points.length;
            }
            line._chart = this.chart;
            line._datasetIndex = this.index;
            line._decimated = !!_dataset._decimated;
            line.points = points;
            const options = this.resolveDatasetElementOptions(mode);
            if (!this.options.showLine) options.borderWidth = 0;
            options.segment = this.options.segment;
            this.updateElement(line, void 0, {
                animated: !animationsDisabled,
                options
            }, mode);
            this.updateElements(points, start, count, mode);
        }
        updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const {iScale, vScale, _stacked, _dataset} = this._cachedMeta;
            const {sharedOptions, includeOptions} = this._getSharedOptions(start, mode);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const {spanGaps, segment} = this.options;
            const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
            const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
            const end = start + count;
            const pointsCount = points.length;
            let prevParsed = start > 0 && this.getParsed(start - 1);
            for (let i = 0; i < pointsCount; ++i) {
                const point = points[i];
                const properties = directUpdate ? point : {};
                if (i < start || i >= end) {
                    properties.skip = true;
                    continue;
                }
                const parsed = this.getParsed(i);
                const nullData = isNullOrUndef(parsed[vAxis]);
                const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
                const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
                properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
                properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
                if (segment) {
                    properties.parsed = parsed;
                    properties.raw = _dataset.data[i];
                }
                if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
                if (!directUpdate) this.updateElement(point, i, properties, mode);
                prevParsed = parsed;
            }
        }
        getMaxOverflow() {
            const meta = this._cachedMeta;
            const dataset = meta.dataset;
            const border = dataset.options && dataset.options.borderWidth || 0;
            const data = meta.data || [];
            if (!data.length) return border;
            const firstPoint = data[0].size(this.resolveDataElementOptions(0));
            const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
            return Math.max(border, firstPoint, lastPoint) / 2;
        }
        draw() {
            const meta = this._cachedMeta;
            meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
            super.draw();
        }
    }
    class PolarAreaController extends DatasetController {
        static id="polarArea";
        static defaults={
            dataElementType: "arc",
            animation: {
                animateRotate: true,
                animateScale: true
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius" ]
                }
            },
            indexAxis: "r",
            startAngle: 0
        };
        static overrides={
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                const {labels: {pointStyle, color}} = chart.legend.options;
                                return data.labels.map(((label, i) => {
                                    const meta = chart.getDatasetMeta(0);
                                    const style = meta.controller.getStyle(i);
                                    return {
                                        text: label,
                                        fillStyle: style.backgroundColor,
                                        strokeStyle: style.borderColor,
                                        fontColor: color,
                                        lineWidth: style.borderWidth,
                                        pointStyle,
                                        hidden: !chart.getDataVisibility(i),
                                        index: i
                                    };
                                }));
                            }
                            return [];
                        }
                    },
                    onClick(e, legendItem, legend) {
                        legend.chart.toggleDataVisibility(legendItem.index);
                        legend.chart.update();
                    }
                }
            },
            scales: {
                r: {
                    type: "radialLinear",
                    angleLines: {
                        display: false
                    },
                    beginAtZero: true,
                    grid: {
                        circular: true
                    },
                    pointLabels: {
                        display: false
                    },
                    startAngle: 0
                }
            }
        };
        constructor(chart, datasetIndex) {
            super(chart, datasetIndex);
            this.innerRadius = void 0;
            this.outerRadius = void 0;
        }
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const chart = this.chart;
            const labels = chart.data.labels || [];
            const value = formatNumber(meta._parsed[index].r, chart.options.locale);
            return {
                label: labels[index] || "",
                value
            };
        }
        parseObjectData(meta, data, start, count) {
            return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
        }
        update(mode) {
            const arcs = this._cachedMeta.data;
            this._updateRadius();
            this.updateElements(arcs, 0, arcs.length, mode);
        }
        getMinMax() {
            const meta = this._cachedMeta;
            const range = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            };
            meta.data.forEach(((element, index) => {
                const parsed = this.getParsed(index).r;
                if (!isNaN(parsed) && this.chart.getDataVisibility(index)) {
                    if (parsed < range.min) range.min = parsed;
                    if (parsed > range.max) range.max = parsed;
                }
            }));
            return range;
        }
        _updateRadius() {
            const chart = this.chart;
            const chartArea = chart.chartArea;
            const opts = chart.options;
            const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            const outerRadius = Math.max(minSize / 2, 0);
            const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
            const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
            this.outerRadius = outerRadius - radiusLength * this.index;
            this.innerRadius = this.outerRadius - radiusLength;
        }
        updateElements(arcs, start, count, mode) {
            const reset = mode === "reset";
            const chart = this.chart;
            const opts = chart.options;
            const animationOpts = opts.animation;
            const scale = this._cachedMeta.rScale;
            const centerX = scale.xCenter;
            const centerY = scale.yCenter;
            const datasetStartAngle = scale.getIndexAngle(0) - .5 * PI;
            let angle = datasetStartAngle;
            let i;
            const defaultAngle = 360 / this.countVisibleElements();
            for (i = 0; i < start; ++i) angle += this._computeAngle(i, mode, defaultAngle);
            for (i = start; i < start + count; i++) {
                const arc = arcs[i];
                let startAngle = angle;
                let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
                let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(this.getParsed(i).r) : 0;
                angle = endAngle;
                if (reset) {
                    if (animationOpts.animateScale) outerRadius = 0;
                    if (animationOpts.animateRotate) startAngle = endAngle = datasetStartAngle;
                }
                const properties = {
                    x: centerX,
                    y: centerY,
                    innerRadius: 0,
                    outerRadius,
                    startAngle,
                    endAngle,
                    options: this.resolveDataElementOptions(i, arc.active ? "active" : mode)
                };
                this.updateElement(arc, i, properties, mode);
            }
        }
        countVisibleElements() {
            const meta = this._cachedMeta;
            let count = 0;
            meta.data.forEach(((element, index) => {
                if (!isNaN(this.getParsed(index).r) && this.chart.getDataVisibility(index)) count++;
            }));
            return count;
        }
        _computeAngle(index, mode, defaultAngle) {
            return this.chart.getDataVisibility(index) ? toRadians(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
        }
    }
    class PieController extends DoughnutController {
        static id="pie";
        static defaults={
            cutout: 0,
            rotation: 0,
            circumference: 360,
            radius: "100%"
        };
    }
    class RadarController extends DatasetController {
        static id="radar";
        static defaults={
            datasetElementType: "line",
            dataElementType: "point",
            indexAxis: "r",
            showLine: true,
            elements: {
                line: {
                    fill: "start"
                }
            }
        };
        static overrides={
            aspectRatio: 1,
            scales: {
                r: {
                    type: "radialLinear"
                }
            }
        };
        getLabelAndValue(index) {
            const vScale = this._cachedMeta.vScale;
            const parsed = this.getParsed(index);
            return {
                label: vScale.getLabels()[index],
                value: "" + vScale.getLabelForValue(parsed[vScale.axis])
            };
        }
        parseObjectData(meta, data, start, count) {
            return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
        }
        update(mode) {
            const meta = this._cachedMeta;
            const line = meta.dataset;
            const points = meta.data || [];
            const labels = meta.iScale.getLabels();
            line.points = points;
            if (mode !== "resize") {
                const options = this.resolveDatasetElementOptions(mode);
                if (!this.options.showLine) options.borderWidth = 0;
                const properties = {
                    _loop: true,
                    _fullLoop: labels.length === points.length,
                    options
                };
                this.updateElement(line, void 0, properties, mode);
            }
            this.updateElements(points, 0, points.length, mode);
        }
        updateElements(points, start, count, mode) {
            const scale = this._cachedMeta.rScale;
            const reset = mode === "reset";
            for (let i = start; i < start + count; i++) {
                const point = points[i];
                const options = this.resolveDataElementOptions(i, point.active ? "active" : mode);
                const pointPosition = scale.getPointPositionForValue(i, this.getParsed(i).r);
                const x = reset ? scale.xCenter : pointPosition.x;
                const y = reset ? scale.yCenter : pointPosition.y;
                const properties = {
                    x,
                    y,
                    angle: pointPosition.angle,
                    skip: isNaN(x) || isNaN(y),
                    options
                };
                this.updateElement(point, i, properties, mode);
            }
        }
    }
    class ScatterController extends DatasetController {
        static id="scatter";
        static defaults={
            datasetElementType: false,
            dataElementType: "point",
            showLine: false,
            fill: false
        };
        static overrides={
            interaction: {
                mode: "point"
            },
            scales: {
                x: {
                    type: "linear"
                },
                y: {
                    type: "linear"
                }
            }
        };
        getLabelAndValue(index) {
            const meta = this._cachedMeta;
            const labels = this.chart.data.labels || [];
            const {xScale, yScale} = meta;
            const parsed = this.getParsed(index);
            const x = xScale.getLabelForValue(parsed.x);
            const y = yScale.getLabelForValue(parsed.y);
            return {
                label: labels[index] || "",
                value: "(" + x + ", " + y + ")"
            };
        }
        update(mode) {
            const meta = this._cachedMeta;
            const {data: points = []} = meta;
            const animationsDisabled = this.chart._animationsDisabled;
            let {start, count} = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
            this._drawStart = start;
            this._drawCount = count;
            if (_scaleRangesChanged(meta)) {
                start = 0;
                count = points.length;
            }
            if (this.options.showLine) {
                if (!this.datasetElementType) this.addElements();
                const {dataset: line, _dataset} = meta;
                line._chart = this.chart;
                line._datasetIndex = this.index;
                line._decimated = !!_dataset._decimated;
                line.points = points;
                const options = this.resolveDatasetElementOptions(mode);
                options.segment = this.options.segment;
                this.updateElement(line, void 0, {
                    animated: !animationsDisabled,
                    options
                }, mode);
            } else if (this.datasetElementType) {
                delete meta.dataset;
                this.datasetElementType = false;
            }
            this.updateElements(points, start, count, mode);
        }
        addElements() {
            const {showLine} = this.options;
            if (!this.datasetElementType && showLine) this.datasetElementType = this.chart.registry.getElement("line");
            super.addElements();
        }
        updateElements(points, start, count, mode) {
            const reset = mode === "reset";
            const {iScale, vScale, _stacked, _dataset} = this._cachedMeta;
            const firstOpts = this.resolveDataElementOptions(start, mode);
            const sharedOptions = this.getSharedOptions(firstOpts);
            const includeOptions = this.includeOptions(mode, sharedOptions);
            const iAxis = iScale.axis;
            const vAxis = vScale.axis;
            const {spanGaps, segment} = this.options;
            const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
            const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
            let prevParsed = start > 0 && this.getParsed(start - 1);
            for (let i = start; i < start + count; ++i) {
                const point = points[i];
                const parsed = this.getParsed(i);
                const properties = directUpdate ? point : {};
                const nullData = isNullOrUndef(parsed[vAxis]);
                const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
                const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
                properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
                properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
                if (segment) {
                    properties.parsed = parsed;
                    properties.raw = _dataset.data[i];
                }
                if (includeOptions) properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? "active" : mode);
                if (!directUpdate) this.updateElement(point, i, properties, mode);
                prevParsed = parsed;
            }
            this.updateSharedOptions(sharedOptions, mode, firstOpts);
        }
        getMaxOverflow() {
            const meta = this._cachedMeta;
            const data = meta.data || [];
            if (!this.options.showLine) {
                let max = 0;
                for (let i = data.length - 1; i >= 0; --i) max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
                return max > 0 && max;
            }
            const dataset = meta.dataset;
            const border = dataset.options && dataset.options.borderWidth || 0;
            if (!data.length) return border;
            const firstPoint = data[0].size(this.resolveDataElementOptions(0));
            const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
            return Math.max(border, firstPoint, lastPoint) / 2;
        }
    }
    var controllers = Object.freeze({
        __proto__: null,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController
    });
    function chart_abstract() {
        throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
    }
    class DateAdapterBase {
        static override(members) {
            Object.assign(DateAdapterBase.prototype, members);
        }
        options;
        constructor(options) {
            this.options = options || {};
        }
        init() {}
        formats() {
            return chart_abstract();
        }
        parse() {
            return chart_abstract();
        }
        format() {
            return chart_abstract();
        }
        add() {
            return chart_abstract();
        }
        diff() {
            return chart_abstract();
        }
        startOf() {
            return chart_abstract();
        }
        endOf() {
            return chart_abstract();
        }
    }
    var adapters = {
        _date: DateAdapterBase
    };
    function binarySearch(metaset, axis, value, intersect) {
        const {controller, data, _sorted} = metaset;
        const iScale = controller._cachedMeta.iScale;
        const spanGaps = metaset.dataset ? metaset.dataset.options ? metaset.dataset.options.spanGaps : null : null;
        if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
            const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
            if (!intersect) {
                const result = lookupMethod(data, axis, value);
                if (spanGaps) {
                    const {vScale} = controller._cachedMeta;
                    const {_parsed} = metaset;
                    const distanceToDefinedLo = _parsed.slice(0, result.lo + 1).reverse().findIndex((point => !isNullOrUndef(point[vScale.axis])));
                    result.lo -= Math.max(0, distanceToDefinedLo);
                    const distanceToDefinedHi = _parsed.slice(result.hi).findIndex((point => !isNullOrUndef(point[vScale.axis])));
                    result.hi += Math.max(0, distanceToDefinedHi);
                }
                return result;
            } else if (controller._sharedOptions) {
                const el = data[0];
                const range = typeof el.getRange === "function" && el.getRange(axis);
                if (range) {
                    const start = lookupMethod(data, axis, value - range);
                    const end = lookupMethod(data, axis, value + range);
                    return {
                        lo: start.lo,
                        hi: end.hi
                    };
                }
            }
        }
        return {
            lo: 0,
            hi: data.length - 1
        };
    }
    function evaluateInteractionItems(chart, axis, position, handler, intersect) {
        const metasets = chart.getSortedVisibleDatasetMetas();
        const value = position[axis];
        for (let i = 0, ilen = metasets.length; i < ilen; ++i) {
            const {index, data} = metasets[i];
            const {lo, hi} = binarySearch(metasets[i], axis, value, intersect);
            for (let j = lo; j <= hi; ++j) {
                const element = data[j];
                if (!element.skip) handler(element, index, j);
            }
        }
    }
    function getDistanceMetricForAxis(axis) {
        const useX = axis.indexOf("x") !== -1;
        const useY = axis.indexOf("y") !== -1;
        return function(pt1, pt2) {
            const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
            const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
            return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        };
    }
    function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
        const items = [];
        if (!includeInvisible && !chart.isPointInArea(position)) return items;
        const evaluationFunc = function(element, datasetIndex, index) {
            if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) return;
            if (element.inRange(position.x, position.y, useFinalPosition)) items.push({
                element,
                datasetIndex,
                index
            });
        };
        evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
        return items;
    }
    function getNearestRadialItems(chart, position, axis, useFinalPosition) {
        let items = [];
        function evaluationFunc(element, datasetIndex, index) {
            const {startAngle, endAngle} = element.getProps([ "startAngle", "endAngle" ], useFinalPosition);
            const {angle} = getAngleFromPoint(element, {
                x: position.x,
                y: position.y
            });
            if (_angleBetween(angle, startAngle, endAngle)) items.push({
                element,
                datasetIndex,
                index
            });
        }
        evaluateInteractionItems(chart, axis, position, evaluationFunc);
        return items;
    }
    function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
        let items = [];
        const distanceMetric = getDistanceMetricForAxis(axis);
        let minDistance = Number.POSITIVE_INFINITY;
        function evaluationFunc(element, datasetIndex, index) {
            const inRange = element.inRange(position.x, position.y, useFinalPosition);
            if (intersect && !inRange) return;
            const center = element.getCenterPoint(useFinalPosition);
            const pointInArea = !!includeInvisible || chart.isPointInArea(center);
            if (!pointInArea && !inRange) return;
            const distance = distanceMetric(position, center);
            if (distance < minDistance) {
                items = [ {
                    element,
                    datasetIndex,
                    index
                } ];
                minDistance = distance;
            } else if (distance === minDistance) items.push({
                element,
                datasetIndex,
                index
            });
        }
        evaluateInteractionItems(chart, axis, position, evaluationFunc);
        return items;
    }
    function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
        if (!includeInvisible && !chart.isPointInArea(position)) return [];
        return axis === "r" && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
    }
    function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
        const items = [];
        const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
        let intersectsItem = false;
        evaluateInteractionItems(chart, axis, position, ((element, datasetIndex, index) => {
            if (element[rangeMethod] && element[rangeMethod](position[axis], useFinalPosition)) {
                items.push({
                    element,
                    datasetIndex,
                    index
                });
                intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
            }
        }));
        if (intersect && !intersectsItem) return [];
        return items;
    }
    var Interaction = {
        evaluateInteractionItems,
        modes: {
            index(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                const axis = options.axis || "x";
                const includeInvisible = options.includeInvisible || false;
                const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
                const elements = [];
                if (!items.length) return [];
                chart.getSortedVisibleDatasetMetas().forEach((meta => {
                    const index = items[0].index;
                    const element = meta.data[index];
                    if (element && !element.skip) elements.push({
                        element,
                        datasetIndex: meta.index,
                        index
                    });
                }));
                return elements;
            },
            dataset(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                const axis = options.axis || "xy";
                const includeInvisible = options.includeInvisible || false;
                let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
                if (items.length > 0) {
                    const datasetIndex = items[0].datasetIndex;
                    const data = chart.getDatasetMeta(datasetIndex).data;
                    items = [];
                    for (let i = 0; i < data.length; ++i) items.push({
                        element: data[i],
                        datasetIndex,
                        index: i
                    });
                }
                return items;
            },
            point(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                const axis = options.axis || "xy";
                const includeInvisible = options.includeInvisible || false;
                return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
            },
            nearest(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                const axis = options.axis || "xy";
                const includeInvisible = options.includeInvisible || false;
                return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
            },
            x(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                return getAxisItems(chart, position, "x", options.intersect, useFinalPosition);
            },
            y(chart, e, options, useFinalPosition) {
                const position = getRelativePosition(e, chart);
                return getAxisItems(chart, position, "y", options.intersect, useFinalPosition);
            }
        }
    };
    const STATIC_POSITIONS = [ "left", "top", "right", "bottom" ];
    function filterByPosition(array, position) {
        return array.filter((v => v.pos === position));
    }
    function filterDynamicPositionByAxis(array, axis) {
        return array.filter((v => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis));
    }
    function sortByWeight(array, reverse) {
        return array.sort(((a, b) => {
            const v0 = reverse ? b : a;
            const v1 = reverse ? a : b;
            return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
        }));
    }
    function wrapBoxes(boxes) {
        const layoutBoxes = [];
        let i, ilen, box, pos, stack, stackWeight;
        for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
            box = boxes[i];
            ({position: pos, options: {stack, stackWeight = 1}} = box);
            layoutBoxes.push({
                index: i,
                box,
                pos,
                horizontal: box.isHorizontal(),
                weight: box.weight,
                stack: stack && pos + stack,
                stackWeight
            });
        }
        return layoutBoxes;
    }
    function buildStacks(layouts) {
        const stacks = {};
        for (const wrap of layouts) {
            const {stack, pos, stackWeight} = wrap;
            if (!stack || !STATIC_POSITIONS.includes(pos)) continue;
            const _stack = stacks[stack] || (stacks[stack] = {
                count: 0,
                placed: 0,
                weight: 0,
                size: 0
            });
            _stack.count++;
            _stack.weight += stackWeight;
        }
        return stacks;
    }
    function setLayoutDims(layouts, params) {
        const stacks = buildStacks(layouts);
        const {vBoxMaxWidth, hBoxMaxHeight} = params;
        let i, ilen, layout;
        for (i = 0, ilen = layouts.length; i < ilen; ++i) {
            layout = layouts[i];
            const {fullSize} = layout.box;
            const stack = stacks[layout.stack];
            const factor = stack && layout.stackWeight / stack.weight;
            if (layout.horizontal) {
                layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
                layout.height = hBoxMaxHeight;
            } else {
                layout.width = vBoxMaxWidth;
                layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
            }
        }
        return stacks;
    }
    function buildLayoutBoxes(boxes) {
        const layoutBoxes = wrapBoxes(boxes);
        const fullSize = sortByWeight(layoutBoxes.filter((wrap => wrap.box.fullSize)), true);
        const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
        const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
        const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
        const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
        const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
        const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
        return {
            fullSize,
            leftAndTop: left.concat(top),
            rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
            chartArea: filterByPosition(layoutBoxes, "chartArea"),
            vertical: left.concat(right).concat(centerVertical),
            horizontal: top.concat(bottom).concat(centerHorizontal)
        };
    }
    function getCombinedMax(maxPadding, chartArea, a, b) {
        return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
    }
    function updateMaxPadding(maxPadding, boxPadding) {
        maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
        maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
        maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
        maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
    }
    function updateDims(chartArea, params, layout, stacks) {
        const {pos, box} = layout;
        const maxPadding = chartArea.maxPadding;
        if (!helpers_dataset_isObject(pos)) {
            if (layout.size) chartArea[pos] -= layout.size;
            const stack = stacks[layout.stack] || {
                size: 0,
                count: 1
            };
            stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
            layout.size = stack.size / stack.count;
            chartArea[pos] += layout.size;
        }
        if (box.getPadding) updateMaxPadding(maxPadding, box.getPadding());
        const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
        const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
        const widthChanged = newWidth !== chartArea.w;
        const heightChanged = newHeight !== chartArea.h;
        chartArea.w = newWidth;
        chartArea.h = newHeight;
        return layout.horizontal ? {
            same: widthChanged,
            other: heightChanged
        } : {
            same: heightChanged,
            other: widthChanged
        };
    }
    function handleMaxPadding(chartArea) {
        const maxPadding = chartArea.maxPadding;
        function updatePos(pos) {
            const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
            chartArea[pos] += change;
            return change;
        }
        chartArea.y += updatePos("top");
        chartArea.x += updatePos("left");
        updatePos("right");
        updatePos("bottom");
    }
    function getMargins(horizontal, chartArea) {
        const maxPadding = chartArea.maxPadding;
        function marginForPositions(positions) {
            const margin = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
            positions.forEach((pos => {
                margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
            }));
            return margin;
        }
        return horizontal ? marginForPositions([ "left", "right" ]) : marginForPositions([ "top", "bottom" ]);
    }
    function fitBoxes(boxes, chartArea, params, stacks) {
        const refitBoxes = [];
        let i, ilen, layout, box, refit, changed;
        for (i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i) {
            layout = boxes[i];
            box = layout.box;
            box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
            const {same, other} = updateDims(chartArea, params, layout, stacks);
            refit |= same && refitBoxes.length;
            changed = changed || other;
            if (!box.fullSize) refitBoxes.push(layout);
        }
        return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
    }
    function setBoxDims(box, left, top, width, height) {
        box.top = top;
        box.left = left;
        box.right = left + width;
        box.bottom = top + height;
        box.width = width;
        box.height = height;
    }
    function placeBoxes(boxes, chartArea, params, stacks) {
        const userPadding = params.padding;
        let {x, y} = chartArea;
        for (const layout of boxes) {
            const box = layout.box;
            const stack = stacks[layout.stack] || {
                count: 1,
                placed: 0,
                weight: 1
            };
            const weight = layout.stackWeight / stack.weight || 1;
            if (layout.horizontal) {
                const width = chartArea.w * weight;
                const height = stack.size || box.height;
                if (defined(stack.start)) y = stack.start;
                if (box.fullSize) setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height); else setBoxDims(box, chartArea.left + stack.placed, y, width, height);
                stack.start = y;
                stack.placed += width;
                y = box.bottom;
            } else {
                const height = chartArea.h * weight;
                const width = stack.size || box.width;
                if (defined(stack.start)) x = stack.start;
                if (box.fullSize) setBoxDims(box, x, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top); else setBoxDims(box, x, chartArea.top + stack.placed, width, height);
                stack.start = x;
                stack.placed += height;
                x = box.right;
            }
        }
        chartArea.x = x;
        chartArea.y = y;
    }
    var layouts = {
        addBox(chart, item) {
            if (!chart.boxes) chart.boxes = [];
            item.fullSize = item.fullSize || false;
            item.position = item.position || "top";
            item.weight = item.weight || 0;
            item._layers = item._layers || function() {
                return [ {
                    z: 0,
                    draw(chartArea) {
                        item.draw(chartArea);
                    }
                } ];
            };
            chart.boxes.push(item);
        },
        removeBox(chart, layoutItem) {
            const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
            if (index !== -1) chart.boxes.splice(index, 1);
        },
        configure(chart, item, options) {
            item.fullSize = options.fullSize;
            item.position = options.position;
            item.weight = options.weight;
        },
        update(chart, width, height, minPadding) {
            if (!chart) return;
            const padding = toPadding(chart.options.layout.padding);
            const availableWidth = Math.max(width - padding.width, 0);
            const availableHeight = Math.max(height - padding.height, 0);
            const boxes = buildLayoutBoxes(chart.boxes);
            const verticalBoxes = boxes.vertical;
            const horizontalBoxes = boxes.horizontal;
            each(chart.boxes, (box => {
                if (typeof box.beforeLayout === "function") box.beforeLayout();
            }));
            const visibleVerticalBoxCount = verticalBoxes.reduce(((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1), 0) || 1;
            const params = Object.freeze({
                outerWidth: width,
                outerHeight: height,
                padding,
                availableWidth,
                availableHeight,
                vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
                hBoxMaxHeight: availableHeight / 2
            });
            const maxPadding = Object.assign({}, padding);
            updateMaxPadding(maxPadding, toPadding(minPadding));
            const chartArea = Object.assign({
                maxPadding,
                w: availableWidth,
                h: availableHeight,
                x: padding.left,
                y: padding.top
            }, padding);
            const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
            fitBoxes(boxes.fullSize, chartArea, params, stacks);
            fitBoxes(verticalBoxes, chartArea, params, stacks);
            if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) fitBoxes(verticalBoxes, chartArea, params, stacks);
            handleMaxPadding(chartArea);
            placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
            chartArea.x += chartArea.w;
            chartArea.y += chartArea.h;
            placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
            chart.chartArea = {
                left: chartArea.left,
                top: chartArea.top,
                right: chartArea.left + chartArea.w,
                bottom: chartArea.top + chartArea.h,
                height: chartArea.h,
                width: chartArea.w
            };
            each(boxes.chartArea, (layout => {
                const box = layout.box;
                Object.assign(box, chart.chartArea);
                box.update(chartArea.w, chartArea.h, {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                });
            }));
        }
    };
    class BasePlatform {
        acquireContext(canvas, aspectRatio) {}
        releaseContext(context) {
            return false;
        }
        addEventListener(chart, type, listener) {}
        removeEventListener(chart, type, listener) {}
        getDevicePixelRatio() {
            return 1;
        }
        getMaximumSize(element, width, height, aspectRatio) {
            width = Math.max(0, width || element.width);
            height = height || element.height;
            return {
                width,
                height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
            };
        }
        isAttached(canvas) {
            return true;
        }
        updateConfig(config) {}
    }
    class BasicPlatform extends BasePlatform {
        acquireContext(item) {
            return item && item.getContext && item.getContext("2d") || null;
        }
        updateConfig(config) {
            config.options.animation = false;
        }
    }
    const EXPANDO_KEY = "$chartjs";
    const EVENT_TYPES = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
    };
    const isNullOrEmpty = value => value === null || value === "";
    function initCanvas(canvas, aspectRatio) {
        const style = canvas.style;
        const renderHeight = canvas.getAttribute("height");
        const renderWidth = canvas.getAttribute("width");
        canvas[EXPANDO_KEY] = {
            initial: {
                height: renderHeight,
                width: renderWidth,
                style: {
                    display: style.display,
                    height: style.height,
                    width: style.width
                }
            }
        };
        style.display = style.display || "block";
        style.boxSizing = style.boxSizing || "border-box";
        if (isNullOrEmpty(renderWidth)) {
            const displayWidth = readUsedSize(canvas, "width");
            if (displayWidth !== void 0) canvas.width = displayWidth;
        }
        if (isNullOrEmpty(renderHeight)) if (canvas.style.height === "") canvas.height = canvas.width / (aspectRatio || 2); else {
            const displayHeight = readUsedSize(canvas, "height");
            if (displayHeight !== void 0) canvas.height = displayHeight;
        }
        return canvas;
    }
    const eventListenerOptions = supportsEventListenerOptions ? {
        passive: true
    } : false;
    function addListener(node, type, listener) {
        if (node) node.addEventListener(type, listener, eventListenerOptions);
    }
    function removeListener(chart, type, listener) {
        if (chart && chart.canvas) chart.canvas.removeEventListener(type, listener, eventListenerOptions);
    }
    function fromNativeEvent(event, chart) {
        const type = EVENT_TYPES[event.type] || event.type;
        const {x, y} = getRelativePosition(event, chart);
        return {
            type,
            chart,
            native: event,
            x: x !== void 0 ? x : null,
            y: y !== void 0 ? y : null
        };
    }
    function nodeListContains(nodeList, canvas) {
        for (const node of nodeList) if (node === canvas || node.contains(canvas)) return true;
    }
    function createAttachObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const observer = new MutationObserver((entries => {
            let trigger = false;
            for (const entry of entries) {
                trigger = trigger || nodeListContains(entry.addedNodes, canvas);
                trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
            }
            if (trigger) listener();
        }));
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        return observer;
    }
    function createDetachObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const observer = new MutationObserver((entries => {
            let trigger = false;
            for (const entry of entries) {
                trigger = trigger || nodeListContains(entry.removedNodes, canvas);
                trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
            }
            if (trigger) listener();
        }));
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        return observer;
    }
    const drpListeningCharts = new Map;
    let oldDevicePixelRatio = 0;
    function onWindowResize() {
        const dpr = window.devicePixelRatio;
        if (dpr === oldDevicePixelRatio) return;
        oldDevicePixelRatio = dpr;
        drpListeningCharts.forEach(((resize, chart) => {
            if (chart.currentDevicePixelRatio !== dpr) resize();
        }));
    }
    function listenDevicePixelRatioChanges(chart, resize) {
        if (!drpListeningCharts.size) window.addEventListener("resize", onWindowResize);
        drpListeningCharts.set(chart, resize);
    }
    function unlistenDevicePixelRatioChanges(chart) {
        drpListeningCharts.delete(chart);
        if (!drpListeningCharts.size) window.removeEventListener("resize", onWindowResize);
    }
    function createResizeObserver(chart, type, listener) {
        const canvas = chart.canvas;
        const container = canvas && _getParentNode(canvas);
        if (!container) return;
        const resize = throttled(((width, height) => {
            const w = container.clientWidth;
            listener(width, height);
            if (w < container.clientWidth) listener();
        }), window);
        const observer = new ResizeObserver((entries => {
            const entry = entries[0];
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            if (width === 0 && height === 0) return;
            resize(width, height);
        }));
        observer.observe(container);
        listenDevicePixelRatioChanges(chart, resize);
        return observer;
    }
    function releaseObserver(chart, type, observer) {
        if (observer) observer.disconnect();
        if (type === "resize") unlistenDevicePixelRatioChanges(chart);
    }
    function createProxyAndListen(chart, type, listener) {
        const canvas = chart.canvas;
        const proxy = throttled((event => {
            if (chart.ctx !== null) listener(fromNativeEvent(event, chart));
        }), chart);
        addListener(canvas, type, proxy);
        return proxy;
    }
    class DomPlatform extends BasePlatform {
        acquireContext(canvas, aspectRatio) {
            const context = canvas && canvas.getContext && canvas.getContext("2d");
            if (context && context.canvas === canvas) {
                initCanvas(canvas, aspectRatio);
                return context;
            }
            return null;
        }
        releaseContext(context) {
            const canvas = context.canvas;
            if (!canvas[EXPANDO_KEY]) return false;
            const initial = canvas[EXPANDO_KEY].initial;
            [ "height", "width" ].forEach((prop => {
                const value = initial[prop];
                if (isNullOrUndef(value)) canvas.removeAttribute(prop); else canvas.setAttribute(prop, value);
            }));
            const style = initial.style || {};
            Object.keys(style).forEach((key => {
                canvas.style[key] = style[key];
            }));
            canvas.width = canvas.width;
            delete canvas[EXPANDO_KEY];
            return true;
        }
        addEventListener(chart, type, listener) {
            this.removeEventListener(chart, type);
            const proxies = chart.$proxies || (chart.$proxies = {});
            const handlers = {
                attach: createAttachObserver,
                detach: createDetachObserver,
                resize: createResizeObserver
            };
            const handler = handlers[type] || createProxyAndListen;
            proxies[type] = handler(chart, type, listener);
        }
        removeEventListener(chart, type) {
            const proxies = chart.$proxies || (chart.$proxies = {});
            const proxy = proxies[type];
            if (!proxy) return;
            const handlers = {
                attach: releaseObserver,
                detach: releaseObserver,
                resize: releaseObserver
            };
            const handler = handlers[type] || removeListener;
            handler(chart, type, proxy);
            proxies[type] = void 0;
        }
        getDevicePixelRatio() {
            return window.devicePixelRatio;
        }
        getMaximumSize(canvas, width, height, aspectRatio) {
            return getMaximumSize(canvas, width, height, aspectRatio);
        }
        isAttached(canvas) {
            const container = canvas && _getParentNode(canvas);
            return !!(container && container.isConnected);
        }
    }
    function _detectPlatform(canvas) {
        if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) return BasicPlatform;
        return DomPlatform;
    }
    class Element {
        static defaults={};
        static defaultRoutes=void 0;
        x;
        y;
        active=false;
        options;
        $animations;
        tooltipPosition(useFinalPosition) {
            const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
            return {
                x,
                y
            };
        }
        hasValue() {
            return isNumber(this.x) && isNumber(this.y);
        }
        getProps(props, final) {
            const anims = this.$animations;
            if (!final || !anims) return this;
            const ret = {};
            props.forEach((prop => {
                ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
            }));
            return ret;
        }
    }
    function autoSkip(scale, ticks) {
        const tickOpts = scale.options.ticks;
        const determinedMaxTicks = determineMaxTicks(scale);
        const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
        const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
        const numMajorIndices = majorIndices.length;
        const first = majorIndices[0];
        const last = majorIndices[numMajorIndices - 1];
        const newTicks = [];
        if (numMajorIndices > ticksLimit) {
            skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
            return newTicks;
        }
        const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
        if (numMajorIndices > 0) {
            let i, ilen;
            const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
            skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
            for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
            skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
            return newTicks;
        }
        skip(ticks, newTicks, spacing);
        return newTicks;
    }
    function determineMaxTicks(scale) {
        const offset = scale.options.offset;
        const tickLength = scale._tickSize();
        const maxScale = scale._length / tickLength + (offset ? 0 : 1);
        const maxChart = scale._maxLength / tickLength;
        return Math.floor(Math.min(maxScale, maxChart));
    }
    function calculateSpacing(majorIndices, ticks, ticksLimit) {
        const evenMajorSpacing = getEvenSpacing(majorIndices);
        const spacing = ticks.length / ticksLimit;
        if (!evenMajorSpacing) return Math.max(spacing, 1);
        const factors = _factorize(evenMajorSpacing);
        for (let i = 0, ilen = factors.length - 1; i < ilen; i++) {
            const factor = factors[i];
            if (factor > spacing) return factor;
        }
        return Math.max(spacing, 1);
    }
    function getMajorIndices(ticks) {
        const result = [];
        let i, ilen;
        for (i = 0, ilen = ticks.length; i < ilen; i++) if (ticks[i].major) result.push(i);
        return result;
    }
    function skipMajors(ticks, newTicks, majorIndices, spacing) {
        let count = 0;
        let next = majorIndices[0];
        let i;
        spacing = Math.ceil(spacing);
        for (i = 0; i < ticks.length; i++) if (i === next) {
            newTicks.push(ticks[i]);
            count++;
            next = majorIndices[count * spacing];
        }
    }
    function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
        const start = valueOrDefault(majorStart, 0);
        const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
        let count = 0;
        let length, i, next;
        spacing = Math.ceil(spacing);
        if (majorEnd) {
            length = majorEnd - majorStart;
            spacing = length / Math.floor(length / spacing);
        }
        next = start;
        while (next < 0) {
            count++;
            next = Math.round(start + count * spacing);
        }
        for (i = Math.max(start, 0); i < end; i++) if (i === next) {
            newTicks.push(ticks[i]);
            count++;
            next = Math.round(start + count * spacing);
        }
    }
    function getEvenSpacing(arr) {
        const len = arr.length;
        let i, diff;
        if (len < 2) return false;
        for (diff = arr[0], i = 1; i < len; ++i) if (arr[i] - arr[i - 1] !== diff) return false;
        return diff;
    }
    const reverseAlign = align => align === "left" ? "right" : align === "right" ? "left" : align;
    const offsetFromEdge = (scale, edge, offset) => edge === "top" || edge === "left" ? scale[edge] + offset : scale[edge] - offset;
    const getTicksLimit = (ticksLength, maxTicksLimit) => Math.min(maxTicksLimit || ticksLength, ticksLength);
    function sample(arr, numItems) {
        const result = [];
        const increment = arr.length / numItems;
        const len = arr.length;
        let i = 0;
        for (;i < len; i += increment) result.push(arr[Math.floor(i)]);
        return result;
    }
    function getPixelForGridLine(scale, index, offsetGridLines) {
        const length = scale.ticks.length;
        const validIndex = Math.min(index, length - 1);
        const start = scale._startPixel;
        const end = scale._endPixel;
        const epsilon = 1e-6;
        let lineValue = scale.getPixelForTick(validIndex);
        let offset;
        if (offsetGridLines) {
            if (length === 1) offset = Math.max(lineValue - start, end - lineValue); else if (index === 0) offset = (scale.getPixelForTick(1) - lineValue) / 2; else offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
            lineValue += validIndex < index ? offset : -offset;
            if (lineValue < start - epsilon || lineValue > end + epsilon) return;
        }
        return lineValue;
    }
    function garbageCollect(caches, length) {
        each(caches, (cache => {
            const gc = cache.gc;
            const gcLen = gc.length / 2;
            let i;
            if (gcLen > length) {
                for (i = 0; i < gcLen; ++i) delete cache.data[gc[i]];
                gc.splice(0, gcLen);
            }
        }));
    }
    function getTickMarkLength(options) {
        return options.drawTicks ? options.tickLength : 0;
    }
    function getTitleHeight(options, fallback) {
        if (!options.display) return 0;
        const font = toFont(options.font, fallback);
        const padding = toPadding(options.padding);
        const lines = helpers_dataset_isArray(options.text) ? options.text.length : 1;
        return lines * font.lineHeight + padding.height;
    }
    function createScaleContext(parent, scale) {
        return createContext(parent, {
            scale,
            type: "scale"
        });
    }
    function createTickContext(parent, index, tick) {
        return createContext(parent, {
            tick,
            index,
            type: "tick"
        });
    }
    function titleAlign(align, position, reverse) {
        let ret = _toLeftRightCenter(align);
        if (reverse && position !== "right" || !reverse && position === "right") ret = reverseAlign(ret);
        return ret;
    }
    function titleArgs(scale, offset, position, align) {
        const {top, left, bottom, right, chart} = scale;
        const {chartArea, scales} = chart;
        let rotation = 0;
        let maxWidth, titleX, titleY;
        const height = bottom - top;
        const width = right - left;
        if (scale.isHorizontal()) {
            titleX = _alignStartEnd(align, left, right);
            if (helpers_dataset_isObject(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
            } else if (position === "center") titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset; else titleY = offsetFromEdge(scale, position, offset);
            maxWidth = right - left;
        } else {
            if (helpers_dataset_isObject(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                titleX = scales[positionAxisID].getPixelForValue(value) - width + offset;
            } else if (position === "center") titleX = (chartArea.left + chartArea.right) / 2 - width + offset; else titleX = offsetFromEdge(scale, position, offset);
            titleY = _alignStartEnd(align, bottom, top);
            rotation = position === "left" ? -HALF_PI : HALF_PI;
        }
        return {
            titleX,
            titleY,
            maxWidth,
            rotation
        };
    }
    class Scale extends Element {
        constructor(cfg) {
            super();
            this.id = cfg.id;
            this.type = cfg.type;
            this.options = void 0;
            this.ctx = cfg.ctx;
            this.chart = cfg.chart;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.width = void 0;
            this.height = void 0;
            this._margins = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            };
            this.maxWidth = void 0;
            this.maxHeight = void 0;
            this.paddingTop = void 0;
            this.paddingBottom = void 0;
            this.paddingLeft = void 0;
            this.paddingRight = void 0;
            this.axis = void 0;
            this.labelRotation = void 0;
            this.min = void 0;
            this.max = void 0;
            this._range = void 0;
            this.ticks = [];
            this._gridLineItems = null;
            this._labelItems = null;
            this._labelSizes = null;
            this._length = 0;
            this._maxLength = 0;
            this._longestTextCache = {};
            this._startPixel = void 0;
            this._endPixel = void 0;
            this._reversePixels = false;
            this._userMax = void 0;
            this._userMin = void 0;
            this._suggestedMax = void 0;
            this._suggestedMin = void 0;
            this._ticksLength = 0;
            this._borderValue = 0;
            this._cache = {};
            this._dataLimitsCached = false;
            this.$context = void 0;
        }
        init(options) {
            this.options = options.setContext(this.getContext());
            this.axis = options.axis;
            this._userMin = this.parse(options.min);
            this._userMax = this.parse(options.max);
            this._suggestedMin = this.parse(options.suggestedMin);
            this._suggestedMax = this.parse(options.suggestedMax);
        }
        parse(raw, index) {
            return raw;
        }
        getUserBounds() {
            let {_userMin, _userMax, _suggestedMin, _suggestedMax} = this;
            _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
            _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
            _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
            _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
            return {
                min: finiteOrDefault(_userMin, _suggestedMin),
                max: finiteOrDefault(_userMax, _suggestedMax),
                minDefined: isNumberFinite(_userMin),
                maxDefined: isNumberFinite(_userMax)
            };
        }
        getMinMax(canStack) {
            let {min, max, minDefined, maxDefined} = this.getUserBounds();
            let range;
            if (minDefined && maxDefined) return {
                min,
                max
            };
            const metas = this.getMatchingVisibleMetas();
            for (let i = 0, ilen = metas.length; i < ilen; ++i) {
                range = metas[i].controller.getMinMax(this, canStack);
                if (!minDefined) min = Math.min(min, range.min);
                if (!maxDefined) max = Math.max(max, range.max);
            }
            min = maxDefined && min > max ? max : min;
            max = minDefined && min > max ? min : max;
            return {
                min: finiteOrDefault(min, finiteOrDefault(max, min)),
                max: finiteOrDefault(max, finiteOrDefault(min, max))
            };
        }
        getPadding() {
            return {
                left: this.paddingLeft || 0,
                top: this.paddingTop || 0,
                right: this.paddingRight || 0,
                bottom: this.paddingBottom || 0
            };
        }
        getTicks() {
            return this.ticks;
        }
        getLabels() {
            const data = this.chart.data;
            return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
        }
        getLabelItems(chartArea = this.chart.chartArea) {
            const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
            return items;
        }
        beforeLayout() {
            this._cache = {};
            this._dataLimitsCached = false;
        }
        beforeUpdate() {
            callback(this.options.beforeUpdate, [ this ]);
        }
        update(maxWidth, maxHeight, margins) {
            const {beginAtZero, grace, ticks: tickOpts} = this.options;
            const sampleSize = tickOpts.sampleSize;
            this.beforeUpdate();
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this._margins = margins = Object.assign({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, margins);
            this.ticks = null;
            this._labelSizes = null;
            this._gridLineItems = null;
            this._labelItems = null;
            this.beforeSetDimensions();
            this.setDimensions();
            this.afterSetDimensions();
            this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
            if (!this._dataLimitsCached) {
                this.beforeDataLimits();
                this.determineDataLimits();
                this.afterDataLimits();
                this._range = _addGrace(this, grace, beginAtZero);
                this._dataLimitsCached = true;
            }
            this.beforeBuildTicks();
            this.ticks = this.buildTicks() || [];
            this.afterBuildTicks();
            const samplingEnabled = sampleSize < this.ticks.length;
            this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
            this.configure();
            this.beforeCalculateLabelRotation();
            this.calculateLabelRotation();
            this.afterCalculateLabelRotation();
            if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
                this.ticks = autoSkip(this, this.ticks);
                this._labelSizes = null;
                this.afterAutoSkip();
            }
            if (samplingEnabled) this._convertTicksToLabels(this.ticks);
            this.beforeFit();
            this.fit();
            this.afterFit();
            this.afterUpdate();
        }
        configure() {
            let reversePixels = this.options.reverse;
            let startPixel, endPixel;
            if (this.isHorizontal()) {
                startPixel = this.left;
                endPixel = this.right;
            } else {
                startPixel = this.top;
                endPixel = this.bottom;
                reversePixels = !reversePixels;
            }
            this._startPixel = startPixel;
            this._endPixel = endPixel;
            this._reversePixels = reversePixels;
            this._length = endPixel - startPixel;
            this._alignToPixels = this.options.alignToPixels;
        }
        afterUpdate() {
            callback(this.options.afterUpdate, [ this ]);
        }
        beforeSetDimensions() {
            callback(this.options.beforeSetDimensions, [ this ]);
        }
        setDimensions() {
            if (this.isHorizontal()) {
                this.width = this.maxWidth;
                this.left = 0;
                this.right = this.width;
            } else {
                this.height = this.maxHeight;
                this.top = 0;
                this.bottom = this.height;
            }
            this.paddingLeft = 0;
            this.paddingTop = 0;
            this.paddingRight = 0;
            this.paddingBottom = 0;
        }
        afterSetDimensions() {
            callback(this.options.afterSetDimensions, [ this ]);
        }
        _callHooks(name) {
            this.chart.notifyPlugins(name, this.getContext());
            callback(this.options[name], [ this ]);
        }
        beforeDataLimits() {
            this._callHooks("beforeDataLimits");
        }
        determineDataLimits() {}
        afterDataLimits() {
            this._callHooks("afterDataLimits");
        }
        beforeBuildTicks() {
            this._callHooks("beforeBuildTicks");
        }
        buildTicks() {
            return [];
        }
        afterBuildTicks() {
            this._callHooks("afterBuildTicks");
        }
        beforeTickToLabelConversion() {
            callback(this.options.beforeTickToLabelConversion, [ this ]);
        }
        generateTickLabels(ticks) {
            const tickOpts = this.options.ticks;
            let i, ilen, tick;
            for (i = 0, ilen = ticks.length; i < ilen; i++) {
                tick = ticks[i];
                tick.label = callback(tickOpts.callback, [ tick.value, i, ticks ], this);
            }
        }
        afterTickToLabelConversion() {
            callback(this.options.afterTickToLabelConversion, [ this ]);
        }
        beforeCalculateLabelRotation() {
            callback(this.options.beforeCalculateLabelRotation, [ this ]);
        }
        calculateLabelRotation() {
            const options = this.options;
            const tickOpts = options.ticks;
            const numTicks = getTicksLimit(this.ticks.length, options.ticks.maxTicksLimit);
            const minRotation = tickOpts.minRotation || 0;
            const maxRotation = tickOpts.maxRotation;
            let labelRotation = minRotation;
            let tickWidth, maxHeight, maxLabelDiagonal;
            if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
                this.labelRotation = minRotation;
                return;
            }
            const labelSizes = this._getLabelSizes();
            const maxLabelWidth = labelSizes.widest.width;
            const maxLabelHeight = labelSizes.highest.height;
            const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
            tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
            if (maxLabelWidth + 6 > tickWidth) {
                tickWidth = maxWidth / (numTicks - (options.offset ? .5 : 1));
                maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
                maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
                labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
                labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
            }
            this.labelRotation = labelRotation;
        }
        afterCalculateLabelRotation() {
            callback(this.options.afterCalculateLabelRotation, [ this ]);
        }
        afterAutoSkip() {}
        beforeFit() {
            callback(this.options.beforeFit, [ this ]);
        }
        fit() {
            const minSize = {
                width: 0,
                height: 0
            };
            const {chart, options: {ticks: tickOpts, title: titleOpts, grid: gridOpts}} = this;
            const display = this._isVisible();
            const isHorizontal = this.isHorizontal();
            if (display) {
                const titleHeight = getTitleHeight(titleOpts, chart.options.font);
                if (isHorizontal) {
                    minSize.width = this.maxWidth;
                    minSize.height = getTickMarkLength(gridOpts) + titleHeight;
                } else {
                    minSize.height = this.maxHeight;
                    minSize.width = getTickMarkLength(gridOpts) + titleHeight;
                }
                if (tickOpts.display && this.ticks.length) {
                    const {first, last, widest, highest} = this._getLabelSizes();
                    const tickPadding = tickOpts.padding * 2;
                    const angleRadians = toRadians(this.labelRotation);
                    const cos = Math.cos(angleRadians);
                    const sin = Math.sin(angleRadians);
                    if (isHorizontal) {
                        const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
                        minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
                    } else {
                        const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
                        minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
                    }
                    this._calculatePadding(first, last, sin, cos);
                }
            }
            this._handleMargins();
            if (isHorizontal) {
                this.width = this._length = chart.width - this._margins.left - this._margins.right;
                this.height = minSize.height;
            } else {
                this.width = minSize.width;
                this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
            }
        }
        _calculatePadding(first, last, sin, cos) {
            const {ticks: {align, padding}, position} = this.options;
            const isRotated = this.labelRotation !== 0;
            const labelsBelowTicks = position !== "top" && this.axis === "x";
            if (this.isHorizontal()) {
                const offsetLeft = this.getPixelForTick(0) - this.left;
                const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
                let paddingLeft = 0;
                let paddingRight = 0;
                if (isRotated) if (labelsBelowTicks) {
                    paddingLeft = cos * first.width;
                    paddingRight = sin * last.height;
                } else {
                    paddingLeft = sin * first.height;
                    paddingRight = cos * last.width;
                } else if (align === "start") paddingRight = last.width; else if (align === "end") paddingLeft = first.width; else if (align !== "inner") {
                    paddingLeft = first.width / 2;
                    paddingRight = last.width / 2;
                }
                this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
                this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
            } else {
                let paddingTop = last.height / 2;
                let paddingBottom = first.height / 2;
                if (align === "start") {
                    paddingTop = 0;
                    paddingBottom = first.height;
                } else if (align === "end") {
                    paddingTop = last.height;
                    paddingBottom = 0;
                }
                this.paddingTop = paddingTop + padding;
                this.paddingBottom = paddingBottom + padding;
            }
        }
        _handleMargins() {
            if (this._margins) {
                this._margins.left = Math.max(this.paddingLeft, this._margins.left);
                this._margins.top = Math.max(this.paddingTop, this._margins.top);
                this._margins.right = Math.max(this.paddingRight, this._margins.right);
                this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
            }
        }
        afterFit() {
            callback(this.options.afterFit, [ this ]);
        }
        isHorizontal() {
            const {axis, position} = this.options;
            return position === "top" || position === "bottom" || axis === "x";
        }
        isFullSize() {
            return this.options.fullSize;
        }
        _convertTicksToLabels(ticks) {
            this.beforeTickToLabelConversion();
            this.generateTickLabels(ticks);
            let i, ilen;
            for (i = 0, ilen = ticks.length; i < ilen; i++) if (isNullOrUndef(ticks[i].label)) {
                ticks.splice(i, 1);
                ilen--;
                i--;
            }
            this.afterTickToLabelConversion();
        }
        _getLabelSizes() {
            let labelSizes = this._labelSizes;
            if (!labelSizes) {
                const sampleSize = this.options.ticks.sampleSize;
                let ticks = this.ticks;
                if (sampleSize < ticks.length) ticks = sample(ticks, sampleSize);
                this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
            }
            return labelSizes;
        }
        _computeLabelSizes(ticks, length, maxTicksLimit) {
            const {ctx, _longestTextCache: caches} = this;
            const widths = [];
            const heights = [];
            const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
            let widestLabelSize = 0;
            let highestLabelSize = 0;
            let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
            for (i = 0; i < length; i += increment) {
                label = ticks[i].label;
                tickFont = this._resolveTickFontOptions(i);
                ctx.font = fontString = tickFont.string;
                cache = caches[fontString] = caches[fontString] || {
                    data: {},
                    gc: []
                };
                lineHeight = tickFont.lineHeight;
                width = height = 0;
                if (!isNullOrUndef(label) && !helpers_dataset_isArray(label)) {
                    width = _measureText(ctx, cache.data, cache.gc, width, label);
                    height = lineHeight;
                } else if (helpers_dataset_isArray(label)) for (j = 0, jlen = label.length; j < jlen; ++j) {
                    nestedLabel = label[j];
                    if (!isNullOrUndef(nestedLabel) && !helpers_dataset_isArray(nestedLabel)) {
                        width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                        height += lineHeight;
                    }
                }
                widths.push(width);
                heights.push(height);
                widestLabelSize = Math.max(width, widestLabelSize);
                highestLabelSize = Math.max(height, highestLabelSize);
            }
            garbageCollect(caches, length);
            const widest = widths.indexOf(widestLabelSize);
            const highest = heights.indexOf(highestLabelSize);
            const valueAt = idx => ({
                width: widths[idx] || 0,
                height: heights[idx] || 0
            });
            return {
                first: valueAt(0),
                last: valueAt(length - 1),
                widest: valueAt(widest),
                highest: valueAt(highest),
                widths,
                heights
            };
        }
        getLabelForValue(value) {
            return value;
        }
        getPixelForValue(value, index) {
            return NaN;
        }
        getValueForPixel(pixel) {}
        getPixelForTick(index) {
            const ticks = this.ticks;
            if (index < 0 || index > ticks.length - 1) return null;
            return this.getPixelForValue(ticks[index].value);
        }
        getPixelForDecimal(decimal) {
            if (this._reversePixels) decimal = 1 - decimal;
            const pixel = this._startPixel + decimal * this._length;
            return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
        }
        getDecimalForPixel(pixel) {
            const decimal = (pixel - this._startPixel) / this._length;
            return this._reversePixels ? 1 - decimal : decimal;
        }
        getBasePixel() {
            return this.getPixelForValue(this.getBaseValue());
        }
        getBaseValue() {
            const {min, max} = this;
            return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
        }
        getContext(index) {
            const ticks = this.ticks || [];
            if (index >= 0 && index < ticks.length) {
                const tick = ticks[index];
                return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
            }
            return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
        }
        _tickSize() {
            const optionTicks = this.options.ticks;
            const rot = toRadians(this.labelRotation);
            const cos = Math.abs(Math.cos(rot));
            const sin = Math.abs(Math.sin(rot));
            const labelSizes = this._getLabelSizes();
            const padding = optionTicks.autoSkipPadding || 0;
            const w = labelSizes ? labelSizes.widest.width + padding : 0;
            const h = labelSizes ? labelSizes.highest.height + padding : 0;
            return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
        }
        _isVisible() {
            const display = this.options.display;
            if (display !== "auto") return !!display;
            return this.getMatchingVisibleMetas().length > 0;
        }
        _computeGridLineItems(chartArea) {
            const axis = this.axis;
            const chart = this.chart;
            const options = this.options;
            const {grid, position, border} = options;
            const offset = grid.offset;
            const isHorizontal = this.isHorizontal();
            const ticks = this.ticks;
            const ticksLength = ticks.length + (offset ? 1 : 0);
            const tl = getTickMarkLength(grid);
            const items = [];
            const borderOpts = border.setContext(this.getContext());
            const axisWidth = borderOpts.display ? borderOpts.width : 0;
            const axisHalfWidth = axisWidth / 2;
            const alignBorderValue = function(pixel) {
                return _alignPixel(chart, pixel, axisWidth);
            };
            let borderValue, i, lineValue, alignedLineValue;
            let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
            if (position === "top") {
                borderValue = alignBorderValue(this.bottom);
                ty1 = this.bottom - tl;
                ty2 = borderValue - axisHalfWidth;
                y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
                y2 = chartArea.bottom;
            } else if (position === "bottom") {
                borderValue = alignBorderValue(this.top);
                y1 = chartArea.top;
                y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
                ty1 = borderValue + axisHalfWidth;
                ty2 = this.top + tl;
            } else if (position === "left") {
                borderValue = alignBorderValue(this.right);
                tx1 = this.right - tl;
                tx2 = borderValue - axisHalfWidth;
                x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
                x2 = chartArea.right;
            } else if (position === "right") {
                borderValue = alignBorderValue(this.left);
                x1 = chartArea.left;
                x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
                tx1 = borderValue + axisHalfWidth;
                tx2 = this.left + tl;
            } else if (axis === "x") {
                if (position === "center") borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + .5); else if (helpers_dataset_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
                }
                y1 = chartArea.top;
                y2 = chartArea.bottom;
                ty1 = borderValue + axisHalfWidth;
                ty2 = ty1 + tl;
            } else if (axis === "y") {
                if (position === "center") borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2); else if (helpers_dataset_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
                }
                tx1 = borderValue - axisHalfWidth;
                tx2 = tx1 - tl;
                x1 = chartArea.left;
                x2 = chartArea.right;
            }
            const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
            const step = Math.max(1, Math.ceil(ticksLength / limit));
            for (i = 0; i < ticksLength; i += step) {
                const context = this.getContext(i);
                const optsAtIndex = grid.setContext(context);
                const optsAtIndexBorder = border.setContext(context);
                const lineWidth = optsAtIndex.lineWidth;
                const lineColor = optsAtIndex.color;
                const borderDash = optsAtIndexBorder.dash || [];
                const borderDashOffset = optsAtIndexBorder.dashOffset;
                const tickWidth = optsAtIndex.tickWidth;
                const tickColor = optsAtIndex.tickColor;
                const tickBorderDash = optsAtIndex.tickBorderDash || [];
                const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
                lineValue = getPixelForGridLine(this, i, offset);
                if (lineValue === void 0) continue;
                alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
                if (isHorizontal) tx1 = tx2 = x1 = x2 = alignedLineValue; else ty1 = ty2 = y1 = y2 = alignedLineValue;
                items.push({
                    tx1,
                    ty1,
                    tx2,
                    ty2,
                    x1,
                    y1,
                    x2,
                    y2,
                    width: lineWidth,
                    color: lineColor,
                    borderDash,
                    borderDashOffset,
                    tickWidth,
                    tickColor,
                    tickBorderDash,
                    tickBorderDashOffset
                });
            }
            this._ticksLength = ticksLength;
            this._borderValue = borderValue;
            return items;
        }
        _computeLabelItems(chartArea) {
            const axis = this.axis;
            const options = this.options;
            const {position, ticks: optionTicks} = options;
            const isHorizontal = this.isHorizontal();
            const ticks = this.ticks;
            const {align, crossAlign, padding, mirror} = optionTicks;
            const tl = getTickMarkLength(options.grid);
            const tickAndPadding = tl + padding;
            const hTickAndPadding = mirror ? -padding : tickAndPadding;
            const rotation = -toRadians(this.labelRotation);
            const items = [];
            let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
            let textBaseline = "middle";
            if (position === "top") {
                y = this.bottom - hTickAndPadding;
                textAlign = this._getXAxisLabelAlignment();
            } else if (position === "bottom") {
                y = this.top + hTickAndPadding;
                textAlign = this._getXAxisLabelAlignment();
            } else if (position === "left") {
                const ret = this._getYAxisLabelAlignment(tl);
                textAlign = ret.textAlign;
                x = ret.x;
            } else if (position === "right") {
                const ret = this._getYAxisLabelAlignment(tl);
                textAlign = ret.textAlign;
                x = ret.x;
            } else if (axis === "x") {
                if (position === "center") y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding; else if (helpers_dataset_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
                }
                textAlign = this._getXAxisLabelAlignment();
            } else if (axis === "y") {
                if (position === "center") x = (chartArea.left + chartArea.right) / 2 - tickAndPadding; else if (helpers_dataset_isObject(position)) {
                    const positionAxisID = Object.keys(position)[0];
                    const value = position[positionAxisID];
                    x = this.chart.scales[positionAxisID].getPixelForValue(value);
                }
                textAlign = this._getYAxisLabelAlignment(tl).textAlign;
            }
            if (axis === "y") if (align === "start") textBaseline = "top"; else if (align === "end") textBaseline = "bottom";
            const labelSizes = this._getLabelSizes();
            for (i = 0, ilen = ticks.length; i < ilen; ++i) {
                tick = ticks[i];
                label = tick.label;
                const optsAtIndex = optionTicks.setContext(this.getContext(i));
                pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
                font = this._resolveTickFontOptions(i);
                lineHeight = font.lineHeight;
                lineCount = helpers_dataset_isArray(label) ? label.length : 1;
                const halfCount = lineCount / 2;
                const color = optsAtIndex.color;
                const strokeColor = optsAtIndex.textStrokeColor;
                const strokeWidth = optsAtIndex.textStrokeWidth;
                let tickTextAlign = textAlign;
                if (isHorizontal) {
                    x = pixel;
                    if (textAlign === "inner") if (i === ilen - 1) tickTextAlign = !this.options.reverse ? "right" : "left"; else if (i === 0) tickTextAlign = !this.options.reverse ? "left" : "right"; else tickTextAlign = "center";
                    if (position === "top") if (crossAlign === "near" || rotation !== 0) textOffset = -lineCount * lineHeight + lineHeight / 2; else if (crossAlign === "center") textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight; else textOffset = -labelSizes.highest.height + lineHeight / 2; else if (crossAlign === "near" || rotation !== 0) textOffset = lineHeight / 2; else if (crossAlign === "center") textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight; else textOffset = labelSizes.highest.height - lineCount * lineHeight;
                    if (mirror) textOffset *= -1;
                    if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) x += lineHeight / 2 * Math.sin(rotation);
                } else {
                    y = pixel;
                    textOffset = (1 - lineCount) * lineHeight / 2;
                }
                let backdrop;
                if (optsAtIndex.showLabelBackdrop) {
                    const labelPadding = toPadding(optsAtIndex.backdropPadding);
                    const height = labelSizes.heights[i];
                    const width = labelSizes.widths[i];
                    let top = textOffset - labelPadding.top;
                    let left = 0 - labelPadding.left;
                    switch (textBaseline) {
                      case "middle":
                        top -= height / 2;
                        break;

                      case "bottom":
                        top -= height;
                        break;
                    }
                    switch (textAlign) {
                      case "center":
                        left -= width / 2;
                        break;

                      case "right":
                        left -= width;
                        break;

                      case "inner":
                        if (i === ilen - 1) left -= width; else if (i > 0) left -= width / 2;
                        break;
                    }
                    backdrop = {
                        left,
                        top,
                        width: width + labelPadding.width,
                        height: height + labelPadding.height,
                        color: optsAtIndex.backdropColor
                    };
                }
                items.push({
                    label,
                    font,
                    textOffset,
                    options: {
                        rotation,
                        color,
                        strokeColor,
                        strokeWidth,
                        textAlign: tickTextAlign,
                        textBaseline,
                        translation: [ x, y ],
                        backdrop
                    }
                });
            }
            return items;
        }
        _getXAxisLabelAlignment() {
            const {position, ticks} = this.options;
            const rotation = -toRadians(this.labelRotation);
            if (rotation) return position === "top" ? "left" : "right";
            let align = "center";
            if (ticks.align === "start") align = "left"; else if (ticks.align === "end") align = "right"; else if (ticks.align === "inner") align = "inner";
            return align;
        }
        _getYAxisLabelAlignment(tl) {
            const {position, ticks: {crossAlign, mirror, padding}} = this.options;
            const labelSizes = this._getLabelSizes();
            const tickAndPadding = tl + padding;
            const widest = labelSizes.widest.width;
            let textAlign;
            let x;
            if (position === "left") if (mirror) {
                x = this.right + padding;
                if (crossAlign === "near") textAlign = "left"; else if (crossAlign === "center") {
                    textAlign = "center";
                    x += widest / 2;
                } else {
                    textAlign = "right";
                    x += widest;
                }
            } else {
                x = this.right - tickAndPadding;
                if (crossAlign === "near") textAlign = "right"; else if (crossAlign === "center") {
                    textAlign = "center";
                    x -= widest / 2;
                } else {
                    textAlign = "left";
                    x = this.left;
                }
            } else if (position === "right") if (mirror) {
                x = this.left + padding;
                if (crossAlign === "near") textAlign = "right"; else if (crossAlign === "center") {
                    textAlign = "center";
                    x -= widest / 2;
                } else {
                    textAlign = "left";
                    x -= widest;
                }
            } else {
                x = this.left + tickAndPadding;
                if (crossAlign === "near") textAlign = "left"; else if (crossAlign === "center") {
                    textAlign = "center";
                    x += widest / 2;
                } else {
                    textAlign = "right";
                    x = this.right;
                }
            } else textAlign = "right";
            return {
                textAlign,
                x
            };
        }
        _computeLabelArea() {
            if (this.options.ticks.mirror) return;
            const chart = this.chart;
            const position = this.options.position;
            if (position === "left" || position === "right") return {
                top: 0,
                left: this.left,
                bottom: chart.height,
                right: this.right
            };
            if (position === "top" || position === "bottom") return {
                top: this.top,
                left: 0,
                bottom: this.bottom,
                right: chart.width
            };
        }
        drawBackground() {
            const {ctx, options: {backgroundColor}, left, top, width, height} = this;
            if (backgroundColor) {
                ctx.save();
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(left, top, width, height);
                ctx.restore();
            }
        }
        getLineWidthForValue(value) {
            const grid = this.options.grid;
            if (!this._isVisible() || !grid.display) return 0;
            const ticks = this.ticks;
            const index = ticks.findIndex((t => t.value === value));
            if (index >= 0) {
                const opts = grid.setContext(this.getContext(index));
                return opts.lineWidth;
            }
            return 0;
        }
        drawGrid(chartArea) {
            const grid = this.options.grid;
            const ctx = this.ctx;
            const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
            let i, ilen;
            const drawLine = (p1, p2, style) => {
                if (!style.width || !style.color) return;
                ctx.save();
                ctx.lineWidth = style.width;
                ctx.strokeStyle = style.color;
                ctx.setLineDash(style.borderDash || []);
                ctx.lineDashOffset = style.borderDashOffset;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
                ctx.restore();
            };
            if (grid.display) for (i = 0, ilen = items.length; i < ilen; ++i) {
                const item = items[i];
                if (grid.drawOnChartArea) drawLine({
                    x: item.x1,
                    y: item.y1
                }, {
                    x: item.x2,
                    y: item.y2
                }, item);
                if (grid.drawTicks) drawLine({
                    x: item.tx1,
                    y: item.ty1
                }, {
                    x: item.tx2,
                    y: item.ty2
                }, {
                    color: item.tickColor,
                    width: item.tickWidth,
                    borderDash: item.tickBorderDash,
                    borderDashOffset: item.tickBorderDashOffset
                });
            }
        }
        drawBorder() {
            const {chart, ctx, options: {border, grid}} = this;
            const borderOpts = border.setContext(this.getContext());
            const axisWidth = border.display ? borderOpts.width : 0;
            if (!axisWidth) return;
            const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
            const borderValue = this._borderValue;
            let x1, x2, y1, y2;
            if (this.isHorizontal()) {
                x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
                x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
                y1 = y2 = borderValue;
            } else {
                y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
                y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
                x1 = x2 = borderValue;
            }
            ctx.save();
            ctx.lineWidth = borderOpts.width;
            ctx.strokeStyle = borderOpts.color;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
        }
        drawLabels(chartArea) {
            const optionTicks = this.options.ticks;
            if (!optionTicks.display) return;
            const ctx = this.ctx;
            const area = this._computeLabelArea();
            if (area) clipArea(ctx, area);
            const items = this.getLabelItems(chartArea);
            for (const item of items) {
                const renderTextOptions = item.options;
                const tickFont = item.font;
                const label = item.label;
                const y = item.textOffset;
                renderText(ctx, label, 0, y, tickFont, renderTextOptions);
            }
            if (area) unclipArea(ctx);
        }
        drawTitle() {
            const {ctx, options: {position, title, reverse}} = this;
            if (!title.display) return;
            const font = toFont(title.font);
            const padding = toPadding(title.padding);
            const align = title.align;
            let offset = font.lineHeight / 2;
            if (position === "bottom" || position === "center" || helpers_dataset_isObject(position)) {
                offset += padding.bottom;
                if (helpers_dataset_isArray(title.text)) offset += font.lineHeight * (title.text.length - 1);
            } else offset += padding.top;
            const {titleX, titleY, maxWidth, rotation} = titleArgs(this, offset, position, align);
            renderText(ctx, title.text, 0, 0, font, {
                color: title.color,
                maxWidth,
                rotation,
                textAlign: titleAlign(align, position, reverse),
                textBaseline: "middle",
                translation: [ titleX, titleY ]
            });
        }
        draw(chartArea) {
            if (!this._isVisible()) return;
            this.drawBackground();
            this.drawGrid(chartArea);
            this.drawBorder();
            this.drawTitle();
            this.drawLabels(chartArea);
        }
        _layers() {
            const opts = this.options;
            const tz = opts.ticks && opts.ticks.z || 0;
            const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
            const bz = valueOrDefault(opts.border && opts.border.z, 0);
            if (!this._isVisible() || this.draw !== Scale.prototype.draw) return [ {
                z: tz,
                draw: chartArea => {
                    this.draw(chartArea);
                }
            } ];
            return [ {
                z: gz,
                draw: chartArea => {
                    this.drawBackground();
                    this.drawGrid(chartArea);
                    this.drawTitle();
                }
            }, {
                z: bz,
                draw: () => {
                    this.drawBorder();
                }
            }, {
                z: tz,
                draw: chartArea => {
                    this.drawLabels(chartArea);
                }
            } ];
        }
        getMatchingVisibleMetas(type) {
            const metas = this.chart.getSortedVisibleDatasetMetas();
            const axisID = this.axis + "AxisID";
            const result = [];
            let i, ilen;
            for (i = 0, ilen = metas.length; i < ilen; ++i) {
                const meta = metas[i];
                if (meta[axisID] === this.id && (!type || meta.type === type)) result.push(meta);
            }
            return result;
        }
        _resolveTickFontOptions(index) {
            const opts = this.options.ticks.setContext(this.getContext(index));
            return toFont(opts.font);
        }
        _maxDigits() {
            const fontSize = this._resolveTickFontOptions(0).lineHeight;
            return (this.isHorizontal() ? this.width : this.height) / fontSize;
        }
    }
    class TypedRegistry {
        constructor(type, scope, override) {
            this.type = type;
            this.scope = scope;
            this.override = override;
            this.items = Object.create(null);
        }
        isForType(type) {
            return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
        }
        register(item) {
            const proto = Object.getPrototypeOf(item);
            let parentScope;
            if (isIChartComponent(proto)) parentScope = this.register(proto);
            const items = this.items;
            const id = item.id;
            const scope = this.scope + "." + id;
            if (!id) throw new Error("class does not have id: " + item);
            if (id in items) return scope;
            items[id] = item;
            registerDefaults(item, scope, parentScope);
            if (this.override) defaults.override(item.id, item.overrides);
            return scope;
        }
        get(id) {
            return this.items[id];
        }
        unregister(item) {
            const items = this.items;
            const id = item.id;
            const scope = this.scope;
            if (id in items) delete items[id];
            if (scope && id in defaults[scope]) {
                delete defaults[scope][id];
                if (this.override) delete overrides[id];
            }
        }
    }
    function registerDefaults(item, scope, parentScope) {
        const itemDefaults = helpers_dataset_merge(Object.create(null), [ parentScope ? defaults.get(parentScope) : {}, defaults.get(scope), item.defaults ]);
        defaults.set(scope, itemDefaults);
        if (item.defaultRoutes) routeDefaults(scope, item.defaultRoutes);
        if (item.descriptors) defaults.describe(scope, item.descriptors);
    }
    function routeDefaults(scope, routes) {
        Object.keys(routes).forEach((property => {
            const propertyParts = property.split(".");
            const sourceName = propertyParts.pop();
            const sourceScope = [ scope ].concat(propertyParts).join(".");
            const parts = routes[property].split(".");
            const targetName = parts.pop();
            const targetScope = parts.join(".");
            defaults.route(sourceScope, sourceName, targetScope, targetName);
        }));
    }
    function isIChartComponent(proto) {
        return "id" in proto && "defaults" in proto;
    }
    class Registry {
        constructor() {
            this.controllers = new TypedRegistry(DatasetController, "datasets", true);
            this.elements = new TypedRegistry(Element, "elements");
            this.plugins = new TypedRegistry(Object, "plugins");
            this.scales = new TypedRegistry(Scale, "scales");
            this._typedRegistries = [ this.controllers, this.scales, this.elements ];
        }
        add(...args) {
            this._each("register", args);
        }
        remove(...args) {
            this._each("unregister", args);
        }
        addControllers(...args) {
            this._each("register", args, this.controllers);
        }
        addElements(...args) {
            this._each("register", args, this.elements);
        }
        addPlugins(...args) {
            this._each("register", args, this.plugins);
        }
        addScales(...args) {
            this._each("register", args, this.scales);
        }
        getController(id) {
            return this._get(id, this.controllers, "controller");
        }
        getElement(id) {
            return this._get(id, this.elements, "element");
        }
        getPlugin(id) {
            return this._get(id, this.plugins, "plugin");
        }
        getScale(id) {
            return this._get(id, this.scales, "scale");
        }
        removeControllers(...args) {
            this._each("unregister", args, this.controllers);
        }
        removeElements(...args) {
            this._each("unregister", args, this.elements);
        }
        removePlugins(...args) {
            this._each("unregister", args, this.plugins);
        }
        removeScales(...args) {
            this._each("unregister", args, this.scales);
        }
        _each(method, args, typedRegistry) {
            [ ...args ].forEach((arg => {
                const reg = typedRegistry || this._getRegistryForType(arg);
                if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) this._exec(method, reg, arg); else each(arg, (item => {
                    const itemReg = typedRegistry || this._getRegistryForType(item);
                    this._exec(method, itemReg, item);
                }));
            }));
        }
        _exec(method, registry, component) {
            const camelMethod = _capitalize(method);
            callback(component["before" + camelMethod], [], component);
            registry[method](component);
            callback(component["after" + camelMethod], [], component);
        }
        _getRegistryForType(type) {
            for (let i = 0; i < this._typedRegistries.length; i++) {
                const reg = this._typedRegistries[i];
                if (reg.isForType(type)) return reg;
            }
            return this.plugins;
        }
        _get(id, typedRegistry, type) {
            const item = typedRegistry.get(id);
            if (item === void 0) throw new Error('"' + id + '" is not a registered ' + type + ".");
            return item;
        }
    }
    var registry = new Registry;
    class PluginService {
        constructor() {
            this._init = void 0;
        }
        notify(chart, hook, args, filter) {
            if (hook === "beforeInit") {
                this._init = this._createDescriptors(chart, true);
                this._notify(this._init, chart, "install");
            }
            if (this._init === void 0) return;
            const descriptors = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
            const result = this._notify(descriptors, chart, hook, args);
            if (hook === "afterDestroy") {
                this._notify(descriptors, chart, "stop");
                this._notify(this._init, chart, "uninstall");
                this._init = void 0;
            }
            return result;
        }
        _notify(descriptors, chart, hook, args) {
            args = args || {};
            for (const descriptor of descriptors) {
                const plugin = descriptor.plugin;
                const method = plugin[hook];
                const params = [ chart, args, descriptor.options ];
                if (callback(method, params, plugin) === false && args.cancelable) return false;
            }
            return true;
        }
        invalidate() {
            if (!isNullOrUndef(this._cache)) {
                this._oldCache = this._cache;
                this._cache = void 0;
            }
        }
        _descriptors(chart) {
            if (this._cache) return this._cache;
            const descriptors = this._cache = this._createDescriptors(chart);
            this._notifyStateChanges(chart);
            return descriptors;
        }
        _createDescriptors(chart, all) {
            const config = chart && chart.config;
            const options = valueOrDefault(config.options && config.options.plugins, {});
            const plugins = allPlugins(config);
            return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
        }
        _notifyStateChanges(chart) {
            const previousDescriptors = this._oldCache || [];
            const descriptors = this._cache;
            const diff = (a, b) => a.filter((x => !b.some((y => x.plugin.id === y.plugin.id))));
            this._notify(diff(previousDescriptors, descriptors), chart, "stop");
            this._notify(diff(descriptors, previousDescriptors), chart, "start");
        }
    }
    function allPlugins(config) {
        const localIds = {};
        const plugins = [];
        const keys = Object.keys(registry.plugins.items);
        for (let i = 0; i < keys.length; i++) plugins.push(registry.getPlugin(keys[i]));
        const local = config.plugins || [];
        for (let i = 0; i < local.length; i++) {
            const plugin = local[i];
            if (plugins.indexOf(plugin) === -1) {
                plugins.push(plugin);
                localIds[plugin.id] = true;
            }
        }
        return {
            plugins,
            localIds
        };
    }
    function getOpts(options, all) {
        if (!all && options === false) return null;
        if (options === true) return {};
        return options;
    }
    function createDescriptors(chart, {plugins, localIds}, options, all) {
        const result = [];
        const context = chart.getContext();
        for (const plugin of plugins) {
            const id = plugin.id;
            const opts = getOpts(options[id], all);
            if (opts === null) continue;
            result.push({
                plugin,
                options: pluginOpts(chart.config, {
                    plugin,
                    local: localIds[id]
                }, opts, context)
            });
        }
        return result;
    }
    function pluginOpts(config, {plugin, local}, opts, context) {
        const keys = config.pluginScopeKeys(plugin);
        const scopes = config.getOptionScopes(opts, keys);
        if (local && plugin.defaults) scopes.push(plugin.defaults);
        return config.createResolver(scopes, context, [ "" ], {
            scriptable: false,
            indexable: false,
            allKeys: true
        });
    }
    function getIndexAxis(type, options) {
        const datasetDefaults = defaults.datasets[type] || {};
        const datasetOptions = (options.datasets || {})[type] || {};
        return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
    }
    function getAxisFromDefaultScaleID(id, indexAxis) {
        let axis = id;
        if (id === "_index_") axis = indexAxis; else if (id === "_value_") axis = indexAxis === "x" ? "y" : "x";
        return axis;
    }
    function getDefaultScaleIDFromAxis(axis, indexAxis) {
        return axis === indexAxis ? "_index_" : "_value_";
    }
    function idMatchesAxis(id) {
        if (id === "x" || id === "y" || id === "r") return id;
    }
    function axisFromPosition(position) {
        if (position === "top" || position === "bottom") return "x";
        if (position === "left" || position === "right") return "y";
    }
    function determineAxis(id, ...scaleOptions) {
        if (idMatchesAxis(id)) return id;
        for (const opts of scaleOptions) {
            const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
            if (axis) return axis;
        }
        throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
    }
    function getAxisFromDataset(id, axis, dataset) {
        if (dataset[axis + "AxisID"] === id) return {
            axis
        };
    }
    function retrieveAxisFromDatasets(id, config) {
        if (config.data && config.data.datasets) {
            const boundDs = config.data.datasets.filter((d => d.xAxisID === id || d.yAxisID === id));
            if (boundDs.length) return getAxisFromDataset(id, "x", boundDs[0]) || getAxisFromDataset(id, "y", boundDs[0]);
        }
        return {};
    }
    function mergeScaleConfig(config, options) {
        const chartDefaults = overrides[config.type] || {
            scales: {}
        };
        const configScales = options.scales || {};
        const chartIndexAxis = getIndexAxis(config.type, options);
        const scales = Object.create(null);
        Object.keys(configScales).forEach((id => {
            const scaleConf = configScales[id];
            if (!helpers_dataset_isObject(scaleConf)) return console.error(`Invalid scale configuration for scale: ${id}`);
            if (scaleConf._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
            const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), defaults.scales[scaleConf.type]);
            const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
            const defaultScaleOptions = chartDefaults.scales || {};
            scales[id] = mergeIf(Object.create(null), [ {
                axis
            }, scaleConf, defaultScaleOptions[axis], defaultScaleOptions[defaultId] ]);
        }));
        config.data.datasets.forEach((dataset => {
            const type = dataset.type || config.type;
            const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
            const datasetDefaults = overrides[type] || {};
            const defaultScaleOptions = datasetDefaults.scales || {};
            Object.keys(defaultScaleOptions).forEach((defaultID => {
                const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
                const id = dataset[axis + "AxisID"] || axis;
                scales[id] = scales[id] || Object.create(null);
                mergeIf(scales[id], [ {
                    axis
                }, configScales[id], defaultScaleOptions[defaultID] ]);
            }));
        }));
        Object.keys(scales).forEach((key => {
            const scale = scales[key];
            mergeIf(scale, [ defaults.scales[scale.type], defaults.scale ]);
        }));
        return scales;
    }
    function initOptions(config) {
        const options = config.options || (config.options = {});
        options.plugins = valueOrDefault(options.plugins, {});
        options.scales = mergeScaleConfig(config, options);
    }
    function initData(data) {
        data = data || {};
        data.datasets = data.datasets || [];
        data.labels = data.labels || [];
        return data;
    }
    function initConfig(config) {
        config = config || {};
        config.data = initData(config.data);
        initOptions(config);
        return config;
    }
    const keyCache = new Map;
    const keysCached = new Set;
    function cachedKeys(cacheKey, generate) {
        let keys = keyCache.get(cacheKey);
        if (!keys) {
            keys = generate();
            keyCache.set(cacheKey, keys);
            keysCached.add(keys);
        }
        return keys;
    }
    const addIfFound = (set, obj, key) => {
        const opts = resolveObjectKey(obj, key);
        if (opts !== void 0) set.add(opts);
    };
    class Config {
        constructor(config) {
            this._config = initConfig(config);
            this._scopeCache = new Map;
            this._resolverCache = new Map;
        }
        get platform() {
            return this._config.platform;
        }
        get type() {
            return this._config.type;
        }
        set type(type) {
            this._config.type = type;
        }
        get data() {
            return this._config.data;
        }
        set data(data) {
            this._config.data = initData(data);
        }
        get options() {
            return this._config.options;
        }
        set options(options) {
            this._config.options = options;
        }
        get plugins() {
            return this._config.plugins;
        }
        update() {
            const config = this._config;
            this.clearCache();
            initOptions(config);
        }
        clearCache() {
            this._scopeCache.clear();
            this._resolverCache.clear();
        }
        datasetScopeKeys(datasetType) {
            return cachedKeys(datasetType, (() => [ [ `datasets.${datasetType}`, "" ] ]));
        }
        datasetAnimationScopeKeys(datasetType, transition) {
            return cachedKeys(`${datasetType}.transition.${transition}`, (() => [ [ `datasets.${datasetType}.transitions.${transition}`, `transitions.${transition}` ], [ `datasets.${datasetType}`, "" ] ]));
        }
        datasetElementScopeKeys(datasetType, elementType) {
            return cachedKeys(`${datasetType}-${elementType}`, (() => [ [ `datasets.${datasetType}.elements.${elementType}`, `datasets.${datasetType}`, `elements.${elementType}`, "" ] ]));
        }
        pluginScopeKeys(plugin) {
            const id = plugin.id;
            const type = this.type;
            return cachedKeys(`${type}-plugin-${id}`, (() => [ [ `plugins.${id}`, ...plugin.additionalOptionScopes || [] ] ]));
        }
        _cachedScopes(mainScope, resetCache) {
            const _scopeCache = this._scopeCache;
            let cache = _scopeCache.get(mainScope);
            if (!cache || resetCache) {
                cache = new Map;
                _scopeCache.set(mainScope, cache);
            }
            return cache;
        }
        getOptionScopes(mainScope, keyLists, resetCache) {
            const {options, type} = this;
            const cache = this._cachedScopes(mainScope, resetCache);
            const cached = cache.get(keyLists);
            if (cached) return cached;
            const scopes = new Set;
            keyLists.forEach((keys => {
                if (mainScope) {
                    scopes.add(mainScope);
                    keys.forEach((key => addIfFound(scopes, mainScope, key)));
                }
                keys.forEach((key => addIfFound(scopes, options, key)));
                keys.forEach((key => addIfFound(scopes, overrides[type] || {}, key)));
                keys.forEach((key => addIfFound(scopes, defaults, key)));
                keys.forEach((key => addIfFound(scopes, descriptors, key)));
            }));
            const array = Array.from(scopes);
            if (array.length === 0) array.push(Object.create(null));
            if (keysCached.has(keyLists)) cache.set(keyLists, array);
            return array;
        }
        chartOptionScopes() {
            const {options, type} = this;
            return [ options, overrides[type] || {}, defaults.datasets[type] || {}, {
                type
            }, defaults, descriptors ];
        }
        resolveNamedOptions(scopes, names, context, prefixes = [ "" ]) {
            const result = {
                $shared: true
            };
            const {resolver, subPrefixes} = getResolver(this._resolverCache, scopes, prefixes);
            let options = resolver;
            if (needContext(resolver, names)) {
                result.$shared = false;
                context = helpers_dataset_isFunction(context) ? context() : context;
                const subResolver = this.createResolver(scopes, context, subPrefixes);
                options = _attachContext(resolver, context, subResolver);
            }
            for (const prop of names) result[prop] = options[prop];
            return result;
        }
        createResolver(scopes, context, prefixes = [ "" ], descriptorDefaults) {
            const {resolver} = getResolver(this._resolverCache, scopes, prefixes);
            return helpers_dataset_isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
        }
    }
    function getResolver(resolverCache, scopes, prefixes) {
        let cache = resolverCache.get(scopes);
        if (!cache) {
            cache = new Map;
            resolverCache.set(scopes, cache);
        }
        const cacheKey = prefixes.join();
        let cached = cache.get(cacheKey);
        if (!cached) {
            const resolver = _createResolver(scopes, prefixes);
            cached = {
                resolver,
                subPrefixes: prefixes.filter((p => !p.toLowerCase().includes("hover")))
            };
            cache.set(cacheKey, cached);
        }
        return cached;
    }
    const hasFunction = value => helpers_dataset_isObject(value) && Object.getOwnPropertyNames(value).some((key => helpers_dataset_isFunction(value[key])));
    function needContext(proxy, names) {
        const {isScriptable, isIndexable} = _descriptors(proxy);
        for (const prop of names) {
            const scriptable = isScriptable(prop);
            const indexable = isIndexable(prop);
            const value = (indexable || scriptable) && proxy[prop];
            if (scriptable && (helpers_dataset_isFunction(value) || hasFunction(value)) || indexable && helpers_dataset_isArray(value)) return true;
        }
        return false;
    }
    var version = "4.5.1";
    const KNOWN_POSITIONS = [ "top", "bottom", "left", "right", "chartArea" ];
    function positionIsHorizontal(position, axis) {
        return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
    }
    function compare2Level(l1, l2) {
        return function(a, b) {
            return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
        };
    }
    function onAnimationsComplete(context) {
        const chart = context.chart;
        const animationOptions = chart.options.animation;
        chart.notifyPlugins("afterRender");
        callback(animationOptions && animationOptions.onComplete, [ context ], chart);
    }
    function onAnimationProgress(context) {
        const chart = context.chart;
        const animationOptions = chart.options.animation;
        callback(animationOptions && animationOptions.onProgress, [ context ], chart);
    }
    function getCanvas(item) {
        if (_isDomSupported() && typeof item === "string") item = document.getElementById(item); else if (item && item.length) item = item[0];
        if (item && item.canvas) item = item.canvas;
        return item;
    }
    const instances = {};
    const getChart = key => {
        const canvas = getCanvas(key);
        return Object.values(instances).filter((c => c.canvas === canvas)).pop();
    };
    function moveNumericKeys(obj, start, move) {
        const keys = Object.keys(obj);
        for (const key of keys) {
            const intKey = +key;
            if (intKey >= start) {
                const value = obj[key];
                delete obj[key];
                if (move > 0 || intKey > start) obj[intKey + move] = value;
            }
        }
    }
    function determineLastEvent(e, lastEvent, inChartArea, isClick) {
        if (!inChartArea || e.type === "mouseout") return null;
        if (isClick) return lastEvent;
        return e;
    }
    class Chart {
        static defaults=defaults;
        static instances=instances;
        static overrides=overrides;
        static registry=registry;
        static version=version;
        static getChart=getChart;
        static register(...items) {
            registry.add(...items);
            invalidatePlugins();
        }
        static unregister(...items) {
            registry.remove(...items);
            invalidatePlugins();
        }
        constructor(item, userConfig) {
            const config = this.config = new Config(userConfig);
            const initialCanvas = getCanvas(item);
            const existingChart = getChart(initialCanvas);
            if (existingChart) throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "'" + " must be destroyed before the canvas with ID '" + existingChart.canvas.id + "' can be reused.");
            const options = config.createResolver(config.chartOptionScopes(), this.getContext());
            this.platform = new (config.platform || _detectPlatform(initialCanvas));
            this.platform.updateConfig(config);
            const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
            const canvas = context && context.canvas;
            const height = canvas && canvas.height;
            const width = canvas && canvas.width;
            this.id = uid();
            this.ctx = context;
            this.canvas = canvas;
            this.width = width;
            this.height = height;
            this._options = options;
            this._aspectRatio = this.aspectRatio;
            this._layers = [];
            this._metasets = [];
            this._stacks = void 0;
            this.boxes = [];
            this.currentDevicePixelRatio = void 0;
            this.chartArea = void 0;
            this._active = [];
            this._lastEvent = void 0;
            this._listeners = {};
            this._responsiveListeners = void 0;
            this._sortedMetasets = [];
            this.scales = {};
            this._plugins = new PluginService;
            this.$proxies = {};
            this._hiddenIndices = {};
            this.attached = false;
            this._animationsDisabled = void 0;
            this.$context = void 0;
            this._doResize = helpers_dataset_debounce((mode => this.update(mode)), options.resizeDelay || 0);
            this._dataChanges = [];
            instances[this.id] = this;
            if (!context || !canvas) {
                console.error("Failed to create chart: can't acquire context from the given item");
                return;
            }
            animator.listen(this, "complete", onAnimationsComplete);
            animator.listen(this, "progress", onAnimationProgress);
            this._initialize();
            if (this.attached) this.update();
        }
        get aspectRatio() {
            const {options: {aspectRatio, maintainAspectRatio}, width, height, _aspectRatio} = this;
            if (!isNullOrUndef(aspectRatio)) return aspectRatio;
            if (maintainAspectRatio && _aspectRatio) return _aspectRatio;
            return height ? width / height : null;
        }
        get data() {
            return this.config.data;
        }
        set data(data) {
            this.config.data = data;
        }
        get options() {
            return this._options;
        }
        set options(options) {
            this.config.options = options;
        }
        get registry() {
            return registry;
        }
        _initialize() {
            this.notifyPlugins("beforeInit");
            if (this.options.responsive) this.resize(); else retinaScale(this, this.options.devicePixelRatio);
            this.bindEvents();
            this.notifyPlugins("afterInit");
            return this;
        }
        clear() {
            clearCanvas(this.canvas, this.ctx);
            return this;
        }
        stop() {
            animator.stop(this);
            return this;
        }
        resize(width, height) {
            if (!animator.running(this)) this._resize(width, height); else this._resizeBeforeDraw = {
                width,
                height
            };
        }
        _resize(width, height) {
            const options = this.options;
            const canvas = this.canvas;
            const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
            const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
            const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
            const mode = this.width ? "resize" : "attach";
            this.width = newSize.width;
            this.height = newSize.height;
            this._aspectRatio = this.aspectRatio;
            if (!retinaScale(this, newRatio, true)) return;
            this.notifyPlugins("resize", {
                size: newSize
            });
            callback(options.onResize, [ this, newSize ], this);
            if (this.attached) if (this._doResize(mode)) this.render();
        }
        ensureScalesHaveIDs() {
            const options = this.options;
            const scalesOptions = options.scales || {};
            each(scalesOptions, ((axisOptions, axisID) => {
                axisOptions.id = axisID;
            }));
        }
        buildOrUpdateScales() {
            const options = this.options;
            const scaleOpts = options.scales;
            const scales = this.scales;
            const updated = Object.keys(scales).reduce(((obj, id) => {
                obj[id] = false;
                return obj;
            }), {});
            let items = [];
            if (scaleOpts) items = items.concat(Object.keys(scaleOpts).map((id => {
                const scaleOptions = scaleOpts[id];
                const axis = determineAxis(id, scaleOptions);
                const isRadial = axis === "r";
                const isHorizontal = axis === "x";
                return {
                    options: scaleOptions,
                    dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
                    dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
                };
            })));
            each(items, (item => {
                const scaleOptions = item.options;
                const id = scaleOptions.id;
                const axis = determineAxis(id, scaleOptions);
                const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
                if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) scaleOptions.position = item.dposition;
                updated[id] = true;
                let scale = null;
                if (id in scales && scales[id].type === scaleType) scale = scales[id]; else {
                    const scaleClass = registry.getScale(scaleType);
                    scale = new scaleClass({
                        id,
                        type: scaleType,
                        ctx: this.ctx,
                        chart: this
                    });
                    scales[scale.id] = scale;
                }
                scale.init(scaleOptions, options);
            }));
            each(updated, ((hasUpdated, id) => {
                if (!hasUpdated) delete scales[id];
            }));
            each(scales, (scale => {
                layouts.configure(this, scale, scale.options);
                layouts.addBox(this, scale);
            }));
        }
        _updateMetasets() {
            const metasets = this._metasets;
            const numData = this.data.datasets.length;
            const numMeta = metasets.length;
            metasets.sort(((a, b) => a.index - b.index));
            if (numMeta > numData) {
                for (let i = numData; i < numMeta; ++i) this._destroyDatasetMeta(i);
                metasets.splice(numData, numMeta - numData);
            }
            this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
        }
        _removeUnreferencedMetasets() {
            const {_metasets: metasets, data: {datasets}} = this;
            if (metasets.length > datasets.length) delete this._stacks;
            metasets.forEach(((meta, index) => {
                if (datasets.filter((x => x === meta._dataset)).length === 0) this._destroyDatasetMeta(index);
            }));
        }
        buildOrUpdateControllers() {
            const newControllers = [];
            const datasets = this.data.datasets;
            let i, ilen;
            this._removeUnreferencedMetasets();
            for (i = 0, ilen = datasets.length; i < ilen; i++) {
                const dataset = datasets[i];
                let meta = this.getDatasetMeta(i);
                const type = dataset.type || this.config.type;
                if (meta.type && meta.type !== type) {
                    this._destroyDatasetMeta(i);
                    meta = this.getDatasetMeta(i);
                }
                meta.type = type;
                meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
                meta.order = dataset.order || 0;
                meta.index = i;
                meta.label = "" + dataset.label;
                meta.visible = this.isDatasetVisible(i);
                if (meta.controller) {
                    meta.controller.updateIndex(i);
                    meta.controller.linkScales();
                } else {
                    const ControllerClass = registry.getController(type);
                    const {datasetElementType, dataElementType} = defaults.datasets[type];
                    Object.assign(ControllerClass, {
                        dataElementType: registry.getElement(dataElementType),
                        datasetElementType: datasetElementType && registry.getElement(datasetElementType)
                    });
                    meta.controller = new ControllerClass(this, i);
                    newControllers.push(meta.controller);
                }
            }
            this._updateMetasets();
            return newControllers;
        }
        _resetElements() {
            each(this.data.datasets, ((dataset, datasetIndex) => {
                this.getDatasetMeta(datasetIndex).controller.reset();
            }), this);
        }
        reset() {
            this._resetElements();
            this.notifyPlugins("reset");
        }
        update(mode) {
            const config = this.config;
            config.update();
            const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
            const animsDisabled = this._animationsDisabled = !options.animation;
            this._updateScales();
            this._checkEventBindings();
            this._updateHiddenIndices();
            this._plugins.invalidate();
            if (this.notifyPlugins("beforeUpdate", {
                mode,
                cancelable: true
            }) === false) return;
            const newControllers = this.buildOrUpdateControllers();
            this.notifyPlugins("beforeElementsUpdate");
            let minPadding = 0;
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; i++) {
                const {controller} = this.getDatasetMeta(i);
                const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
                controller.buildOrUpdateElements(reset);
                minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
            }
            minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
            this._updateLayout(minPadding);
            if (!animsDisabled) each(newControllers, (controller => {
                controller.reset();
            }));
            this._updateDatasets(mode);
            this.notifyPlugins("afterUpdate", {
                mode
            });
            this._layers.sort(compare2Level("z", "_idx"));
            const {_active, _lastEvent} = this;
            if (_lastEvent) this._eventHandler(_lastEvent, true); else if (_active.length) this._updateHoverStyles(_active, _active, true);
            this.render();
        }
        _updateScales() {
            each(this.scales, (scale => {
                layouts.removeBox(this, scale);
            }));
            this.ensureScalesHaveIDs();
            this.buildOrUpdateScales();
        }
        _checkEventBindings() {
            const options = this.options;
            const existingEvents = new Set(Object.keys(this._listeners));
            const newEvents = new Set(options.events);
            if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
                this.unbindEvents();
                this.bindEvents();
            }
        }
        _updateHiddenIndices() {
            const {_hiddenIndices} = this;
            const changes = this._getUniformDataChanges() || [];
            for (const {method, start, count} of changes) {
                const move = method === "_removeElements" ? -count : count;
                moveNumericKeys(_hiddenIndices, start, move);
            }
        }
        _getUniformDataChanges() {
            const _dataChanges = this._dataChanges;
            if (!_dataChanges || !_dataChanges.length) return;
            this._dataChanges = [];
            const datasetCount = this.data.datasets.length;
            const makeSet = idx => new Set(_dataChanges.filter((c => c[0] === idx)).map(((c, i) => i + "," + c.splice(1).join(","))));
            const changeSet = makeSet(0);
            for (let i = 1; i < datasetCount; i++) if (!setsEqual(changeSet, makeSet(i))) return;
            return Array.from(changeSet).map((c => c.split(","))).map((a => ({
                method: a[1],
                start: +a[2],
                count: +a[3]
            })));
        }
        _updateLayout(minPadding) {
            if (this.notifyPlugins("beforeLayout", {
                cancelable: true
            }) === false) return;
            layouts.update(this, this.width, this.height, minPadding);
            const area = this.chartArea;
            const noArea = area.width <= 0 || area.height <= 0;
            this._layers = [];
            each(this.boxes, (box => {
                if (noArea && box.position === "chartArea") return;
                if (box.configure) box.configure();
                this._layers.push(...box._layers());
            }), this);
            this._layers.forEach(((item, index) => {
                item._idx = index;
            }));
            this.notifyPlugins("afterLayout");
        }
        _updateDatasets(mode) {
            if (this.notifyPlugins("beforeDatasetsUpdate", {
                mode,
                cancelable: true
            }) === false) return;
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this.getDatasetMeta(i).controller.configure();
            for (let i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this._updateDataset(i, helpers_dataset_isFunction(mode) ? mode({
                datasetIndex: i
            }) : mode);
            this.notifyPlugins("afterDatasetsUpdate", {
                mode
            });
        }
        _updateDataset(index, mode) {
            const meta = this.getDatasetMeta(index);
            const args = {
                meta,
                index,
                mode,
                cancelable: true
            };
            if (this.notifyPlugins("beforeDatasetUpdate", args) === false) return;
            meta.controller._update(mode);
            args.cancelable = false;
            this.notifyPlugins("afterDatasetUpdate", args);
        }
        render() {
            if (this.notifyPlugins("beforeRender", {
                cancelable: true
            }) === false) return;
            if (animator.has(this)) {
                if (this.attached && !animator.running(this)) animator.start(this);
            } else {
                this.draw();
                onAnimationsComplete({
                    chart: this
                });
            }
        }
        draw() {
            let i;
            if (this._resizeBeforeDraw) {
                const {width, height} = this._resizeBeforeDraw;
                this._resizeBeforeDraw = null;
                this._resize(width, height);
            }
            this.clear();
            if (this.width <= 0 || this.height <= 0) return;
            if (this.notifyPlugins("beforeDraw", {
                cancelable: true
            }) === false) return;
            const layers = this._layers;
            for (i = 0; i < layers.length && layers[i].z <= 0; ++i) layers[i].draw(this.chartArea);
            this._drawDatasets();
            for (;i < layers.length; ++i) layers[i].draw(this.chartArea);
            this.notifyPlugins("afterDraw");
        }
        _getSortedDatasetMetas(filterVisible) {
            const metasets = this._sortedMetasets;
            const result = [];
            let i, ilen;
            for (i = 0, ilen = metasets.length; i < ilen; ++i) {
                const meta = metasets[i];
                if (!filterVisible || meta.visible) result.push(meta);
            }
            return result;
        }
        getSortedVisibleDatasetMetas() {
            return this._getSortedDatasetMetas(true);
        }
        _drawDatasets() {
            if (this.notifyPlugins("beforeDatasetsDraw", {
                cancelable: true
            }) === false) return;
            const metasets = this.getSortedVisibleDatasetMetas();
            for (let i = metasets.length - 1; i >= 0; --i) this._drawDataset(metasets[i]);
            this.notifyPlugins("afterDatasetsDraw");
        }
        _drawDataset(meta) {
            const ctx = this.ctx;
            const args = {
                meta,
                index: meta.index,
                cancelable: true
            };
            const clip = getDatasetClipArea(this, meta);
            if (this.notifyPlugins("beforeDatasetDraw", args) === false) return;
            if (clip) clipArea(ctx, clip);
            meta.controller.draw();
            if (clip) unclipArea(ctx);
            args.cancelable = false;
            this.notifyPlugins("afterDatasetDraw", args);
        }
        isPointInArea(point) {
            return _isPointInArea(point, this.chartArea, this._minPadding);
        }
        getElementsAtEventForMode(e, mode, options, useFinalPosition) {
            const method = Interaction.modes[mode];
            if (typeof method === "function") return method(this, e, options, useFinalPosition);
            return [];
        }
        getDatasetMeta(datasetIndex) {
            const dataset = this.data.datasets[datasetIndex];
            const metasets = this._metasets;
            let meta = metasets.filter((x => x && x._dataset === dataset)).pop();
            if (!meta) {
                meta = {
                    type: null,
                    data: [],
                    dataset: null,
                    controller: null,
                    hidden: null,
                    xAxisID: null,
                    yAxisID: null,
                    order: dataset && dataset.order || 0,
                    index: datasetIndex,
                    _dataset: dataset,
                    _parsed: [],
                    _sorted: false
                };
                metasets.push(meta);
            }
            return meta;
        }
        getContext() {
            return this.$context || (this.$context = createContext(null, {
                chart: this,
                type: "chart"
            }));
        }
        getVisibleDatasetCount() {
            return this.getSortedVisibleDatasetMetas().length;
        }
        isDatasetVisible(datasetIndex) {
            const dataset = this.data.datasets[datasetIndex];
            if (!dataset) return false;
            const meta = this.getDatasetMeta(datasetIndex);
            return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
        }
        setDatasetVisibility(datasetIndex, visible) {
            const meta = this.getDatasetMeta(datasetIndex);
            meta.hidden = !visible;
        }
        toggleDataVisibility(index) {
            this._hiddenIndices[index] = !this._hiddenIndices[index];
        }
        getDataVisibility(index) {
            return !this._hiddenIndices[index];
        }
        _updateVisibility(datasetIndex, dataIndex, visible) {
            const mode = visible ? "show" : "hide";
            const meta = this.getDatasetMeta(datasetIndex);
            const anims = meta.controller._resolveAnimations(void 0, mode);
            if (defined(dataIndex)) {
                meta.data[dataIndex].hidden = !visible;
                this.update();
            } else {
                this.setDatasetVisibility(datasetIndex, visible);
                anims.update(meta, {
                    visible
                });
                this.update((ctx => ctx.datasetIndex === datasetIndex ? mode : void 0));
            }
        }
        hide(datasetIndex, dataIndex) {
            this._updateVisibility(datasetIndex, dataIndex, false);
        }
        show(datasetIndex, dataIndex) {
            this._updateVisibility(datasetIndex, dataIndex, true);
        }
        _destroyDatasetMeta(datasetIndex) {
            const meta = this._metasets[datasetIndex];
            if (meta && meta.controller) meta.controller._destroy();
            delete this._metasets[datasetIndex];
        }
        _stop() {
            let i, ilen;
            this.stop();
            animator.remove(this);
            for (i = 0, ilen = this.data.datasets.length; i < ilen; ++i) this._destroyDatasetMeta(i);
        }
        destroy() {
            this.notifyPlugins("beforeDestroy");
            const {canvas, ctx} = this;
            this._stop();
            this.config.clearCache();
            if (canvas) {
                this.unbindEvents();
                clearCanvas(canvas, ctx);
                this.platform.releaseContext(ctx);
                this.canvas = null;
                this.ctx = null;
            }
            delete instances[this.id];
            this.notifyPlugins("afterDestroy");
        }
        toBase64Image(...args) {
            return this.canvas.toDataURL(...args);
        }
        bindEvents() {
            this.bindUserEvents();
            if (this.options.responsive) this.bindResponsiveEvents(); else this.attached = true;
        }
        bindUserEvents() {
            const listeners = this._listeners;
            const platform = this.platform;
            const _add = (type, listener) => {
                platform.addEventListener(this, type, listener);
                listeners[type] = listener;
            };
            const listener = (e, x, y) => {
                e.offsetX = x;
                e.offsetY = y;
                this._eventHandler(e);
            };
            each(this.options.events, (type => _add(type, listener)));
        }
        bindResponsiveEvents() {
            if (!this._responsiveListeners) this._responsiveListeners = {};
            const listeners = this._responsiveListeners;
            const platform = this.platform;
            const _add = (type, listener) => {
                platform.addEventListener(this, type, listener);
                listeners[type] = listener;
            };
            const _remove = (type, listener) => {
                if (listeners[type]) {
                    platform.removeEventListener(this, type, listener);
                    delete listeners[type];
                }
            };
            const listener = (width, height) => {
                if (this.canvas) this.resize(width, height);
            };
            let detached;
            const attached = () => {
                _remove("attach", attached);
                this.attached = true;
                this.resize();
                _add("resize", listener);
                _add("detach", detached);
            };
            detached = () => {
                this.attached = false;
                _remove("resize", listener);
                this._stop();
                this._resize(0, 0);
                _add("attach", attached);
            };
            if (platform.isAttached(this.canvas)) attached(); else detached();
        }
        unbindEvents() {
            each(this._listeners, ((listener, type) => {
                this.platform.removeEventListener(this, type, listener);
            }));
            this._listeners = {};
            each(this._responsiveListeners, ((listener, type) => {
                this.platform.removeEventListener(this, type, listener);
            }));
            this._responsiveListeners = void 0;
        }
        updateHoverStyle(items, mode, enabled) {
            const prefix = enabled ? "set" : "remove";
            let meta, item, i, ilen;
            if (mode === "dataset") {
                meta = this.getDatasetMeta(items[0].datasetIndex);
                meta.controller["_" + prefix + "DatasetHoverStyle"]();
            }
            for (i = 0, ilen = items.length; i < ilen; ++i) {
                item = items[i];
                const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
                if (controller) controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
            }
        }
        getActiveElements() {
            return this._active || [];
        }
        setActiveElements(activeElements) {
            const lastActive = this._active || [];
            const active = activeElements.map((({datasetIndex, index}) => {
                const meta = this.getDatasetMeta(datasetIndex);
                if (!meta) throw new Error("No dataset found at index " + datasetIndex);
                return {
                    datasetIndex,
                    element: meta.data[index],
                    index
                };
            }));
            const changed = !_elementsEqual(active, lastActive);
            if (changed) {
                this._active = active;
                this._lastEvent = null;
                this._updateHoverStyles(active, lastActive);
            }
        }
        notifyPlugins(hook, args, filter) {
            return this._plugins.notify(this, hook, args, filter);
        }
        isPluginEnabled(pluginId) {
            return this._plugins._cache.filter((p => p.plugin.id === pluginId)).length === 1;
        }
        _updateHoverStyles(active, lastActive, replay) {
            const hoverOptions = this.options.hover;
            const diff = (a, b) => a.filter((x => !b.some((y => x.datasetIndex === y.datasetIndex && x.index === y.index))));
            const deactivated = diff(lastActive, active);
            const activated = replay ? active : diff(active, lastActive);
            if (deactivated.length) this.updateHoverStyle(deactivated, hoverOptions.mode, false);
            if (activated.length && hoverOptions.mode) this.updateHoverStyle(activated, hoverOptions.mode, true);
        }
        _eventHandler(e, replay) {
            const args = {
                event: e,
                replay,
                cancelable: true,
                inChartArea: this.isPointInArea(e)
            };
            const eventFilter = plugin => (plugin.options.events || this.options.events).includes(e.native.type);
            if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) return;
            const changed = this._handleEvent(e, replay, args.inChartArea);
            args.cancelable = false;
            this.notifyPlugins("afterEvent", args, eventFilter);
            if (changed || args.changed) this.render();
            return this;
        }
        _handleEvent(e, replay, inChartArea) {
            const {_active: lastActive = [], options} = this;
            const useFinalPosition = replay;
            const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
            const isClick = _isClickEvent(e);
            const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
            if (inChartArea) {
                this._lastEvent = null;
                callback(options.onHover, [ e, active, this ], this);
                if (isClick) callback(options.onClick, [ e, active, this ], this);
            }
            const changed = !_elementsEqual(active, lastActive);
            if (changed || replay) {
                this._active = active;
                this._updateHoverStyles(active, lastActive, replay);
            }
            this._lastEvent = lastEvent;
            return changed;
        }
        _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
            if (e.type === "mouseout") return [];
            if (!inChartArea) return lastActive;
            const hoverOptions = this.options.hover;
            return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
        }
    }
    function invalidatePlugins() {
        return each(Chart.instances, (chart => chart._plugins.invalidate()));
    }
    function clipSelf(ctx, element, endAngle) {
        const {startAngle, x, y, outerRadius, innerRadius, options} = element;
        const {borderWidth, borderJoinStyle} = options;
        const outerAngleClip = Math.min(borderWidth / outerRadius, _normalizeAngle(startAngle - endAngle));
        ctx.beginPath();
        ctx.arc(x, y, outerRadius - borderWidth / 2, startAngle + outerAngleClip / 2, endAngle - outerAngleClip / 2);
        if (innerRadius > 0) {
            const innerAngleClip = Math.min(borderWidth / innerRadius, _normalizeAngle(startAngle - endAngle));
            ctx.arc(x, y, innerRadius + borderWidth / 2, endAngle - innerAngleClip / 2, startAngle + innerAngleClip / 2, true);
        } else {
            const clipWidth = Math.min(borderWidth / 2, outerRadius * _normalizeAngle(startAngle - endAngle));
            if (borderJoinStyle === "round") ctx.arc(x, y, clipWidth, endAngle - PI / 2, startAngle + PI / 2, true); else if (borderJoinStyle === "bevel") {
                const r = 2 * clipWidth * clipWidth;
                const endX = -r * Math.cos(endAngle + PI / 2) + x;
                const endY = -r * Math.sin(endAngle + PI / 2) + y;
                const startX = r * Math.cos(startAngle + PI / 2) + x;
                const startY = r * Math.sin(startAngle + PI / 2) + y;
                ctx.lineTo(endX, endY);
                ctx.lineTo(startX, startY);
            }
        }
        ctx.closePath();
        ctx.moveTo(0, 0);
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.clip("evenodd");
    }
    function clipArc(ctx, element, endAngle) {
        const {startAngle, pixelMargin, x, y, outerRadius, innerRadius} = element;
        let angleMargin = pixelMargin / outerRadius;
        ctx.beginPath();
        ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
        if (innerRadius > pixelMargin) {
            angleMargin = pixelMargin / innerRadius;
            ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
        } else ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
        ctx.closePath();
        ctx.clip();
    }
    function toRadiusCorners(value) {
        return _readValueToProps(value, [ "outerStart", "outerEnd", "innerStart", "innerEnd" ]);
    }
    function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
        const o = toRadiusCorners(arc.options.borderRadius);
        const halfThickness = (outerRadius - innerRadius) / 2;
        const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
        const computeOuterLimit = val => {
            const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
            return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
        };
        return {
            outerStart: computeOuterLimit(o.outerStart),
            outerEnd: computeOuterLimit(o.outerEnd),
            innerStart: _limitValue(o.innerStart, 0, innerLimit),
            innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
        };
    }
    function rThetaToXY(r, theta, x, y) {
        return {
            x: x + r * Math.cos(theta),
            y: y + r * Math.sin(theta)
        };
    }
    function pathArc(ctx, element, offset, spacing, end, circular) {
        const {x, y, startAngle: start, pixelMargin, innerRadius: innerR} = element;
        const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
        const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
        let spacingOffset = 0;
        const alpha = end - start;
        if (spacing) {
            const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
            const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
            const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
            const adjustedAngle = avNogSpacingRadius !== 0 ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha;
            spacingOffset = (alpha - adjustedAngle) / 2;
        }
        const beta = Math.max(.001, alpha * outerRadius - offset / PI) / outerRadius;
        const angleOffset = (alpha - beta) / 2;
        const startAngle = start + angleOffset + spacingOffset;
        const endAngle = end - angleOffset - spacingOffset;
        const {outerStart, outerEnd, innerStart, innerEnd} = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
        const outerStartAdjustedRadius = outerRadius - outerStart;
        const outerEndAdjustedRadius = outerRadius - outerEnd;
        const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
        const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
        const innerStartAdjustedRadius = innerRadius + innerStart;
        const innerEndAdjustedRadius = innerRadius + innerEnd;
        const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
        const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
        ctx.beginPath();
        if (circular) {
            const outerMidAdjustedAngle = (outerStartAdjustedAngle + outerEndAdjustedAngle) / 2;
            ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerMidAdjustedAngle);
            ctx.arc(x, y, outerRadius, outerMidAdjustedAngle, outerEndAdjustedAngle);
            if (outerEnd > 0) {
                const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
            }
            const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
            ctx.lineTo(p4.x, p4.y);
            if (innerEnd > 0) {
                const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
            }
            const innerMidAdjustedAngle = (endAngle - innerEnd / innerRadius + (startAngle + innerStart / innerRadius)) / 2;
            ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, innerMidAdjustedAngle, true);
            ctx.arc(x, y, innerRadius, innerMidAdjustedAngle, startAngle + innerStart / innerRadius, true);
            if (innerStart > 0) {
                const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
            }
            const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
            ctx.lineTo(p8.x, p8.y);
            if (outerStart > 0) {
                const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
                ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
            }
        } else {
            ctx.moveTo(x, y);
            const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x;
            const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y;
            ctx.lineTo(outerStartX, outerStartY);
            const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x;
            const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y;
            ctx.lineTo(outerEndX, outerEndY);
        }
        ctx.closePath();
    }
    function drawArc(ctx, element, offset, spacing, circular) {
        const {fullCircles, startAngle, circumference} = element;
        let endAngle = element.endAngle;
        if (fullCircles) {
            pathArc(ctx, element, offset, spacing, endAngle, circular);
            for (let i = 0; i < fullCircles; ++i) ctx.fill();
            if (!isNaN(circumference)) endAngle = startAngle + (circumference % TAU || TAU);
        }
        pathArc(ctx, element, offset, spacing, endAngle, circular);
        ctx.fill();
        return endAngle;
    }
    function drawBorder(ctx, element, offset, spacing, circular) {
        const {fullCircles, startAngle, circumference, options} = element;
        const {borderWidth, borderJoinStyle, borderDash, borderDashOffset, borderRadius} = options;
        const inner = options.borderAlign === "inner";
        if (!borderWidth) return;
        ctx.setLineDash(borderDash || []);
        ctx.lineDashOffset = borderDashOffset;
        if (inner) {
            ctx.lineWidth = borderWidth * 2;
            ctx.lineJoin = borderJoinStyle || "round";
        } else {
            ctx.lineWidth = borderWidth;
            ctx.lineJoin = borderJoinStyle || "bevel";
        }
        let endAngle = element.endAngle;
        if (fullCircles) {
            pathArc(ctx, element, offset, spacing, endAngle, circular);
            for (let i = 0; i < fullCircles; ++i) ctx.stroke();
            if (!isNaN(circumference)) endAngle = startAngle + (circumference % TAU || TAU);
        }
        if (inner) clipArc(ctx, element, endAngle);
        if (options.selfJoin && endAngle - startAngle >= PI && borderRadius === 0 && borderJoinStyle !== "miter") clipSelf(ctx, element, endAngle);
        if (!fullCircles) {
            pathArc(ctx, element, offset, spacing, endAngle, circular);
            ctx.stroke();
        }
    }
    class ArcElement extends Element {
        static id="arc";
        static defaults={
            borderAlign: "center",
            borderColor: "#fff",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: void 0,
            borderRadius: 0,
            borderWidth: 2,
            offset: 0,
            spacing: 0,
            angle: void 0,
            circular: true,
            selfJoin: false
        };
        static defaultRoutes={
            backgroundColor: "backgroundColor"
        };
        static descriptors={
            _scriptable: true,
            _indexable: name => name !== "borderDash"
        };
        circumference;
        endAngle;
        fullCircles;
        innerRadius;
        outerRadius;
        pixelMargin;
        startAngle;
        constructor(cfg) {
            super();
            this.options = void 0;
            this.circumference = void 0;
            this.startAngle = void 0;
            this.endAngle = void 0;
            this.innerRadius = void 0;
            this.outerRadius = void 0;
            this.pixelMargin = 0;
            this.fullCircles = 0;
            if (cfg) Object.assign(this, cfg);
        }
        inRange(chartX, chartY, useFinalPosition) {
            const point = this.getProps([ "x", "y" ], useFinalPosition);
            const {angle, distance} = getAngleFromPoint(point, {
                x: chartX,
                y: chartY
            });
            const {startAngle, endAngle, innerRadius, outerRadius, circumference} = this.getProps([ "startAngle", "endAngle", "innerRadius", "outerRadius", "circumference" ], useFinalPosition);
            const rAdjust = (this.options.spacing + this.options.borderWidth) / 2;
            const _circumference = valueOrDefault(circumference, endAngle - startAngle);
            const nonZeroBetween = _angleBetween(angle, startAngle, endAngle) && startAngle !== endAngle;
            const betweenAngles = _circumference >= TAU || nonZeroBetween;
            const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
            return betweenAngles && withinRadius;
        }
        getCenterPoint(useFinalPosition) {
            const {x, y, startAngle, endAngle, innerRadius, outerRadius} = this.getProps([ "x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius" ], useFinalPosition);
            const {offset, spacing} = this.options;
            const halfAngle = (startAngle + endAngle) / 2;
            const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
            return {
                x: x + Math.cos(halfAngle) * halfRadius,
                y: y + Math.sin(halfAngle) * halfRadius
            };
        }
        tooltipPosition(useFinalPosition) {
            return this.getCenterPoint(useFinalPosition);
        }
        draw(ctx) {
            const {options, circumference} = this;
            const offset = (options.offset || 0) / 4;
            const spacing = (options.spacing || 0) / 2;
            const circular = options.circular;
            this.pixelMargin = options.borderAlign === "inner" ? .33 : 0;
            this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
            if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) return;
            ctx.save();
            const halfAngle = (this.startAngle + this.endAngle) / 2;
            ctx.translate(Math.cos(halfAngle) * offset, Math.sin(halfAngle) * offset);
            const fix = 1 - Math.sin(Math.min(PI, circumference || 0));
            const radiusOffset = offset * fix;
            ctx.fillStyle = options.backgroundColor;
            ctx.strokeStyle = options.borderColor;
            drawArc(ctx, this, radiusOffset, spacing, circular);
            drawBorder(ctx, this, radiusOffset, spacing, circular);
            ctx.restore();
        }
    }
    function setStyle(ctx, options, style = options) {
        ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
        ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
        ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
        ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
        ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
        ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
    }
    function lineTo(ctx, previous, target) {
        ctx.lineTo(target.x, target.y);
    }
    function getLineMethod(options) {
        if (options.stepped) return _steppedLineTo;
        if (options.tension || options.cubicInterpolationMode === "monotone") return _bezierCurveTo;
        return lineTo;
    }
    function pathVars(points, segment, params = {}) {
        const count = points.length;
        const {start: paramsStart = 0, end: paramsEnd = count - 1} = params;
        const {start: segmentStart, end: segmentEnd} = segment;
        const start = Math.max(paramsStart, segmentStart);
        const end = Math.min(paramsEnd, segmentEnd);
        const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
        return {
            count,
            start,
            loop: segment.loop,
            ilen: end < start && !outside ? count + end - start : end - start
        };
    }
    function pathSegment(ctx, line, segment, params) {
        const {points, options} = line;
        const {count, start, loop, ilen} = pathVars(points, segment, params);
        const lineMethod = getLineMethod(options);
        let {move = true, reverse} = params || {};
        let i, point, prev;
        for (i = 0; i <= ilen; ++i) {
            point = points[(start + (reverse ? ilen - i : i)) % count];
            if (point.skip) continue; else if (move) {
                ctx.moveTo(point.x, point.y);
                move = false;
            } else lineMethod(ctx, prev, point, reverse, options.stepped);
            prev = point;
        }
        if (loop) {
            point = points[(start + (reverse ? ilen : 0)) % count];
            lineMethod(ctx, prev, point, reverse, options.stepped);
        }
        return !!loop;
    }
    function fastPathSegment(ctx, line, segment, params) {
        const points = line.points;
        const {count, start, ilen} = pathVars(points, segment, params);
        const {move = true, reverse} = params || {};
        let avgX = 0;
        let countX = 0;
        let i, point, prevX, minY, maxY, lastY;
        const pointIndex = index => (start + (reverse ? ilen - index : index)) % count;
        const drawX = () => {
            if (minY !== maxY) {
                ctx.lineTo(avgX, maxY);
                ctx.lineTo(avgX, minY);
                ctx.lineTo(avgX, lastY);
            }
        };
        if (move) {
            point = points[pointIndex(0)];
            ctx.moveTo(point.x, point.y);
        }
        for (i = 0; i <= ilen; ++i) {
            point = points[pointIndex(i)];
            if (point.skip) continue;
            const x = point.x;
            const y = point.y;
            const truncX = x | 0;
            if (truncX === prevX) {
                if (y < minY) minY = y; else if (y > maxY) maxY = y;
                avgX = (countX * avgX + x) / ++countX;
            } else {
                drawX();
                ctx.lineTo(x, y);
                prevX = truncX;
                countX = 0;
                minY = maxY = y;
            }
            lastY = y;
        }
        drawX();
    }
    function _getSegmentMethod(line) {
        const opts = line.options;
        const borderDash = opts.borderDash && opts.borderDash.length;
        const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== "monotone" && !opts.stepped && !borderDash;
        return useFastPath ? fastPathSegment : pathSegment;
    }
    function _getInterpolationMethod(options) {
        if (options.stepped) return _steppedInterpolation;
        if (options.tension || options.cubicInterpolationMode === "monotone") return _bezierInterpolation;
        return _pointInLine;
    }
    function strokePathWithCache(ctx, line, start, count) {
        let path = line._path;
        if (!path) {
            path = line._path = new Path2D;
            if (line.path(path, start, count)) path.closePath();
        }
        setStyle(ctx, line.options);
        ctx.stroke(path);
    }
    function strokePathDirect(ctx, line, start, count) {
        const {segments, options} = line;
        const segmentMethod = _getSegmentMethod(line);
        for (const segment of segments) {
            setStyle(ctx, options, segment.style);
            ctx.beginPath();
            if (segmentMethod(ctx, line, segment, {
                start,
                end: start + count - 1
            })) ctx.closePath();
            ctx.stroke();
        }
    }
    const usePath2D = typeof Path2D === "function";
    function draw(ctx, line, start, count) {
        if (usePath2D && !line.options.segment) strokePathWithCache(ctx, line, start, count); else strokePathDirect(ctx, line, start, count);
    }
    class LineElement extends Element {
        static id="line";
        static defaults={
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            borderWidth: 3,
            capBezierPoints: true,
            cubicInterpolationMode: "default",
            fill: false,
            spanGaps: false,
            stepped: false,
            tension: 0
        };
        static defaultRoutes={
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        static descriptors={
            _scriptable: true,
            _indexable: name => name !== "borderDash" && name !== "fill"
        };
        constructor(cfg) {
            super();
            this.animated = true;
            this.options = void 0;
            this._chart = void 0;
            this._loop = void 0;
            this._fullLoop = void 0;
            this._path = void 0;
            this._points = void 0;
            this._segments = void 0;
            this._decimated = false;
            this._pointsUpdated = false;
            this._datasetIndex = void 0;
            if (cfg) Object.assign(this, cfg);
        }
        updateControlPoints(chartArea, indexAxis) {
            const options = this.options;
            if ((options.tension || options.cubicInterpolationMode === "monotone") && !options.stepped && !this._pointsUpdated) {
                const loop = options.spanGaps ? this._loop : this._fullLoop;
                _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
                this._pointsUpdated = true;
            }
        }
        set points(points) {
            this._points = points;
            delete this._segments;
            delete this._path;
            this._pointsUpdated = false;
        }
        get points() {
            return this._points;
        }
        get segments() {
            return this._segments || (this._segments = _computeSegments(this, this.options.segment));
        }
        first() {
            const segments = this.segments;
            const points = this.points;
            return segments.length && points[segments[0].start];
        }
        last() {
            const segments = this.segments;
            const points = this.points;
            const count = segments.length;
            return count && points[segments[count - 1].end];
        }
        interpolate(point, property) {
            const options = this.options;
            const value = point[property];
            const points = this.points;
            const segments = _boundSegments(this, {
                property,
                start: value,
                end: value
            });
            if (!segments.length) return;
            const result = [];
            const _interpolate = _getInterpolationMethod(options);
            let i, ilen;
            for (i = 0, ilen = segments.length; i < ilen; ++i) {
                const {start, end} = segments[i];
                const p1 = points[start];
                const p2 = points[end];
                if (p1 === p2) {
                    result.push(p1);
                    continue;
                }
                const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
                const interpolated = _interpolate(p1, p2, t, options.stepped);
                interpolated[property] = point[property];
                result.push(interpolated);
            }
            return result.length === 1 ? result[0] : result;
        }
        pathSegment(ctx, segment, params) {
            const segmentMethod = _getSegmentMethod(this);
            return segmentMethod(ctx, this, segment, params);
        }
        path(ctx, start, count) {
            const segments = this.segments;
            const segmentMethod = _getSegmentMethod(this);
            let loop = this._loop;
            start = start || 0;
            count = count || this.points.length - start;
            for (const segment of segments) loop &= segmentMethod(ctx, this, segment, {
                start,
                end: start + count - 1
            });
            return !!loop;
        }
        draw(ctx, chartArea, start, count) {
            const options = this.options || {};
            const points = this.points || [];
            if (points.length && options.borderWidth) {
                ctx.save();
                draw(ctx, this, start, count);
                ctx.restore();
            }
            if (this.animated) {
                this._pointsUpdated = false;
                this._path = void 0;
            }
        }
    }
    function inRange$1(el, pos, axis, useFinalPosition) {
        const options = el.options;
        const {[axis]: value} = el.getProps([ axis ], useFinalPosition);
        return Math.abs(pos - value) < options.radius + options.hitRadius;
    }
    class PointElement extends Element {
        static id="point";
        parsed;
        skip;
        stop;
        static defaults={
            borderWidth: 1,
            hitRadius: 1,
            hoverBorderWidth: 1,
            hoverRadius: 4,
            pointStyle: "circle",
            radius: 3,
            rotation: 0
        };
        static defaultRoutes={
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        constructor(cfg) {
            super();
            this.options = void 0;
            this.parsed = void 0;
            this.skip = void 0;
            this.stop = void 0;
            if (cfg) Object.assign(this, cfg);
        }
        inRange(mouseX, mouseY, useFinalPosition) {
            const options = this.options;
            const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
            return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
        }
        inXRange(mouseX, useFinalPosition) {
            return inRange$1(this, mouseX, "x", useFinalPosition);
        }
        inYRange(mouseY, useFinalPosition) {
            return inRange$1(this, mouseY, "y", useFinalPosition);
        }
        getCenterPoint(useFinalPosition) {
            const {x, y} = this.getProps([ "x", "y" ], useFinalPosition);
            return {
                x,
                y
            };
        }
        size(options) {
            options = options || this.options || {};
            let radius = options.radius || 0;
            radius = Math.max(radius, radius && options.hoverRadius || 0);
            const borderWidth = radius && options.borderWidth || 0;
            return (radius + borderWidth) * 2;
        }
        draw(ctx, area) {
            const options = this.options;
            if (this.skip || options.radius < .1 || !_isPointInArea(this, area, this.size(options) / 2)) return;
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth;
            ctx.fillStyle = options.backgroundColor;
            drawPoint(ctx, options, this.x, this.y);
        }
        getRange() {
            const options = this.options || {};
            return options.radius + options.hitRadius;
        }
    }
    function getBarBounds(bar, useFinalPosition) {
        const {x, y, base, width, height} = bar.getProps([ "x", "y", "base", "width", "height" ], useFinalPosition);
        let left, right, top, bottom, half;
        if (bar.horizontal) {
            half = height / 2;
            left = Math.min(x, base);
            right = Math.max(x, base);
            top = y - half;
            bottom = y + half;
        } else {
            half = width / 2;
            left = x - half;
            right = x + half;
            top = Math.min(y, base);
            bottom = Math.max(y, base);
        }
        return {
            left,
            top,
            right,
            bottom
        };
    }
    function skipOrLimit(skip, value, min, max) {
        return skip ? 0 : _limitValue(value, min, max);
    }
    function parseBorderWidth(bar, maxW, maxH) {
        const value = bar.options.borderWidth;
        const skip = bar.borderSkipped;
        const o = toTRBL(value);
        return {
            t: skipOrLimit(skip.top, o.top, 0, maxH),
            r: skipOrLimit(skip.right, o.right, 0, maxW),
            b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
            l: skipOrLimit(skip.left, o.left, 0, maxW)
        };
    }
    function parseBorderRadius(bar, maxW, maxH) {
        const {enableBorderRadius} = bar.getProps([ "enableBorderRadius" ]);
        const value = bar.options.borderRadius;
        const o = toTRBLCorners(value);
        const maxR = Math.min(maxW, maxH);
        const skip = bar.borderSkipped;
        const enableBorder = enableBorderRadius || helpers_dataset_isObject(value);
        return {
            topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
            topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
            bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
            bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
        };
    }
    function boundingRects(bar) {
        const bounds = getBarBounds(bar);
        const width = bounds.right - bounds.left;
        const height = bounds.bottom - bounds.top;
        const border = parseBorderWidth(bar, width / 2, height / 2);
        const radius = parseBorderRadius(bar, width / 2, height / 2);
        return {
            outer: {
                x: bounds.left,
                y: bounds.top,
                w: width,
                h: height,
                radius
            },
            inner: {
                x: bounds.left + border.l,
                y: bounds.top + border.t,
                w: width - border.l - border.r,
                h: height - border.t - border.b,
                radius: {
                    topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
                    topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
                    bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
                    bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
                }
            }
        };
    }
    function inRange(bar, x, y, useFinalPosition) {
        const skipX = x === null;
        const skipY = y === null;
        const skipBoth = skipX && skipY;
        const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
        return bounds && (skipX || _isBetween(x, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
    }
    function hasRadius(radius) {
        return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
    }
    function addNormalRectPath(ctx, rect) {
        ctx.rect(rect.x, rect.y, rect.w, rect.h);
    }
    function inflateRect(rect, amount, refRect = {}) {
        const x = rect.x !== refRect.x ? -amount : 0;
        const y = rect.y !== refRect.y ? -amount : 0;
        const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
        const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
        return {
            x: rect.x + x,
            y: rect.y + y,
            w: rect.w + w,
            h: rect.h + h,
            radius: rect.radius
        };
    }
    class BarElement extends Element {
        static id="bar";
        static defaults={
            borderSkipped: "start",
            borderWidth: 0,
            borderRadius: 0,
            inflateAmount: "auto",
            pointStyle: void 0
        };
        static defaultRoutes={
            backgroundColor: "backgroundColor",
            borderColor: "borderColor"
        };
        constructor(cfg) {
            super();
            this.options = void 0;
            this.horizontal = void 0;
            this.base = void 0;
            this.width = void 0;
            this.height = void 0;
            this.inflateAmount = void 0;
            if (cfg) Object.assign(this, cfg);
        }
        draw(ctx) {
            const {inflateAmount, options: {borderColor, backgroundColor}} = this;
            const {inner, outer} = boundingRects(this);
            const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
            ctx.save();
            if (outer.w !== inner.w || outer.h !== inner.h) {
                ctx.beginPath();
                addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
                ctx.clip();
                addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
                ctx.fillStyle = borderColor;
                ctx.fill("evenodd");
            }
            ctx.beginPath();
            addRectPath(ctx, inflateRect(inner, inflateAmount));
            ctx.fillStyle = backgroundColor;
            ctx.fill();
            ctx.restore();
        }
        inRange(mouseX, mouseY, useFinalPosition) {
            return inRange(this, mouseX, mouseY, useFinalPosition);
        }
        inXRange(mouseX, useFinalPosition) {
            return inRange(this, mouseX, null, useFinalPosition);
        }
        inYRange(mouseY, useFinalPosition) {
            return inRange(this, null, mouseY, useFinalPosition);
        }
        getCenterPoint(useFinalPosition) {
            const {x, y, base, horizontal} = this.getProps([ "x", "y", "base", "horizontal" ], useFinalPosition);
            return {
                x: horizontal ? (x + base) / 2 : x,
                y: horizontal ? y : (y + base) / 2
            };
        }
        getRange(axis) {
            return axis === "x" ? this.width / 2 : this.height / 2;
        }
    }
    var chart_elements = Object.freeze({
        __proto__: null,
        ArcElement,
        BarElement,
        LineElement,
        PointElement
    });
    const BORDER_COLORS = [ "rgb(54, 162, 235)", "rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(201, 203, 207)" ];
    const BACKGROUND_COLORS = BORDER_COLORS.map((color => color.replace("rgb(", "rgba(").replace(")", ", 0.5)")));
    function getBorderColor(i) {
        return BORDER_COLORS[i % BORDER_COLORS.length];
    }
    function getBackgroundColor(i) {
        return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
    }
    function colorizeDefaultDataset(dataset, i) {
        dataset.borderColor = getBorderColor(i);
        dataset.backgroundColor = getBackgroundColor(i);
        return ++i;
    }
    function colorizeDoughnutDataset(dataset, i) {
        dataset.backgroundColor = dataset.data.map((() => getBorderColor(i++)));
        return i;
    }
    function colorizePolarAreaDataset(dataset, i) {
        dataset.backgroundColor = dataset.data.map((() => getBackgroundColor(i++)));
        return i;
    }
    function getColorizer(chart) {
        let i = 0;
        return (dataset, datasetIndex) => {
            const controller = chart.getDatasetMeta(datasetIndex).controller;
            if (controller instanceof DoughnutController) i = colorizeDoughnutDataset(dataset, i); else if (controller instanceof PolarAreaController) i = colorizePolarAreaDataset(dataset, i); else if (controller) i = colorizeDefaultDataset(dataset, i);
        };
    }
    function containsColorsDefinitions(descriptors) {
        let k;
        for (k in descriptors) if (descriptors[k].borderColor || descriptors[k].backgroundColor) return true;
        return false;
    }
    function containsColorsDefinition(descriptor) {
        return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
    }
    function containsDefaultColorsDefenitions() {
        return defaults.borderColor !== "rgba(0,0,0,0.1)" || defaults.backgroundColor !== "rgba(0,0,0,0.1)";
    }
    var plugin_colors = {
        id: "colors",
        defaults: {
            enabled: true,
            forceOverride: false
        },
        beforeLayout(chart, _args, options) {
            if (!options.enabled) return;
            const {data: {datasets}, options: chartOptions} = chart.config;
            const {elements} = chartOptions;
            const containsColorDefenition = containsColorsDefinitions(datasets) || containsColorsDefinition(chartOptions) || elements && containsColorsDefinitions(elements) || containsDefaultColorsDefenitions();
            if (!options.forceOverride && containsColorDefenition) return;
            const colorizer = getColorizer(chart);
            datasets.forEach(colorizer);
        }
    };
    function lttbDecimation(data, start, count, availableWidth, options) {
        const samples = options.samples || availableWidth;
        if (samples >= count) return data.slice(start, start + count);
        const decimated = [];
        const bucketWidth = (count - 2) / (samples - 2);
        let sampledIndex = 0;
        const endIndex = start + count - 1;
        let a = start;
        let i, maxAreaPoint, maxArea, area, nextA;
        decimated[sampledIndex++] = data[a];
        for (i = 0; i < samples - 2; i++) {
            let avgX = 0;
            let avgY = 0;
            let j;
            const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
            const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
            const avgRangeLength = avgRangeEnd - avgRangeStart;
            for (j = avgRangeStart; j < avgRangeEnd; j++) {
                avgX += data[j].x;
                avgY += data[j].y;
            }
            avgX /= avgRangeLength;
            avgY /= avgRangeLength;
            const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
            const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
            const {x: pointAx, y: pointAy} = data[a];
            maxArea = area = -1;
            for (j = rangeOffs; j < rangeTo; j++) {
                area = .5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));
                if (area > maxArea) {
                    maxArea = area;
                    maxAreaPoint = data[j];
                    nextA = j;
                }
            }
            decimated[sampledIndex++] = maxAreaPoint;
            a = nextA;
        }
        decimated[sampledIndex++] = data[endIndex];
        return decimated;
    }
    function minMaxDecimation(data, start, count, availableWidth) {
        let avgX = 0;
        let countX = 0;
        let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
        const decimated = [];
        const endIndex = start + count - 1;
        const xMin = data[start].x;
        const xMax = data[endIndex].x;
        const dx = xMax - xMin;
        for (i = start; i < start + count; ++i) {
            point = data[i];
            x = (point.x - xMin) / dx * availableWidth;
            y = point.y;
            const truncX = x | 0;
            if (truncX === prevX) {
                if (y < minY) {
                    minY = y;
                    minIndex = i;
                } else if (y > maxY) {
                    maxY = y;
                    maxIndex = i;
                }
                avgX = (countX * avgX + point.x) / ++countX;
            } else {
                const lastIndex = i - 1;
                if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
                    const intermediateIndex1 = Math.min(minIndex, maxIndex);
                    const intermediateIndex2 = Math.max(minIndex, maxIndex);
                    if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) decimated.push({
                        ...data[intermediateIndex1],
                        x: avgX
                    });
                    if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) decimated.push({
                        ...data[intermediateIndex2],
                        x: avgX
                    });
                }
                if (i > 0 && lastIndex !== startIndex) decimated.push(data[lastIndex]);
                decimated.push(point);
                prevX = truncX;
                countX = 0;
                minY = maxY = y;
                minIndex = maxIndex = startIndex = i;
            }
        }
        return decimated;
    }
    function cleanDecimatedDataset(dataset) {
        if (dataset._decimated) {
            const data = dataset._data;
            delete dataset._decimated;
            delete dataset._data;
            Object.defineProperty(dataset, "data", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: data
            });
        }
    }
    function cleanDecimatedData(chart) {
        chart.data.datasets.forEach((dataset => {
            cleanDecimatedDataset(dataset);
        }));
    }
    function getStartAndCountOfVisiblePointsSimplified(meta, points) {
        const pointCount = points.length;
        let start = 0;
        let count;
        const {iScale} = meta;
        const {min, max, minDefined, maxDefined} = iScale.getUserBounds();
        if (minDefined) start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
        if (maxDefined) count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start; else count = pointCount - start;
        return {
            start,
            count
        };
    }
    var plugin_decimation = {
        id: "decimation",
        defaults: {
            algorithm: "min-max",
            enabled: false
        },
        beforeElementsUpdate: (chart, args, options) => {
            if (!options.enabled) {
                cleanDecimatedData(chart);
                return;
            }
            const availableWidth = chart.width;
            chart.data.datasets.forEach(((dataset, datasetIndex) => {
                const {_data, indexAxis} = dataset;
                const meta = chart.getDatasetMeta(datasetIndex);
                const data = _data || dataset.data;
                if (resolve([ indexAxis, chart.options.indexAxis ]) === "y") return;
                if (!meta.controller.supportsDecimation) return;
                const xAxis = chart.scales[meta.xAxisID];
                if (xAxis.type !== "linear" && xAxis.type !== "time") return;
                if (chart.options.parsing) return;
                let {start, count} = getStartAndCountOfVisiblePointsSimplified(meta, data);
                const threshold = options.threshold || 4 * availableWidth;
                if (count <= threshold) {
                    cleanDecimatedDataset(dataset);
                    return;
                }
                if (isNullOrUndef(_data)) {
                    dataset._data = data;
                    delete dataset.data;
                    Object.defineProperty(dataset, "data", {
                        configurable: true,
                        enumerable: true,
                        get: function() {
                            return this._decimated;
                        },
                        set: function(d) {
                            this._data = d;
                        }
                    });
                }
                let decimated;
                switch (options.algorithm) {
                  case "lttb":
                    decimated = lttbDecimation(data, start, count, availableWidth, options);
                    break;

                  case "min-max":
                    decimated = minMaxDecimation(data, start, count, availableWidth);
                    break;

                  default:
                    throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
                }
                dataset._decimated = decimated;
            }));
        },
        destroy(chart) {
            cleanDecimatedData(chart);
        }
    };
    function _segments(line, target, property) {
        const segments = line.segments;
        const points = line.points;
        const tpoints = target.points;
        const parts = [];
        for (const segment of segments) {
            let {start, end} = segment;
            end = _findSegmentEnd(start, end, points);
            const bounds = _getBounds(property, points[start], points[end], segment.loop);
            if (!target.segments) {
                parts.push({
                    source: segment,
                    target: bounds,
                    start: points[start],
                    end: points[end]
                });
                continue;
            }
            const targetSegments = _boundSegments(target, bounds);
            for (const tgt of targetSegments) {
                const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
                const fillSources = _boundSegment(segment, points, subBounds);
                for (const fillSource of fillSources) parts.push({
                    source: fillSource,
                    target: tgt,
                    start: {
                        [property]: _getEdge(bounds, subBounds, "start", Math.max)
                    },
                    end: {
                        [property]: _getEdge(bounds, subBounds, "end", Math.min)
                    }
                });
            }
        }
        return parts;
    }
    function _getBounds(property, first, last, loop) {
        if (loop) return;
        let start = first[property];
        let end = last[property];
        if (property === "angle") {
            start = _normalizeAngle(start);
            end = _normalizeAngle(end);
        }
        return {
            property,
            start,
            end
        };
    }
    function _pointsFromSegments(boundary, line) {
        const {x = null, y = null} = boundary || {};
        const linePoints = line.points;
        const points = [];
        line.segments.forEach((({start, end}) => {
            end = _findSegmentEnd(start, end, linePoints);
            const first = linePoints[start];
            const last = linePoints[end];
            if (y !== null) {
                points.push({
                    x: first.x,
                    y
                });
                points.push({
                    x: last.x,
                    y
                });
            } else if (x !== null) {
                points.push({
                    x,
                    y: first.y
                });
                points.push({
                    x,
                    y: last.y
                });
            }
        }));
        return points;
    }
    function _findSegmentEnd(start, end, points) {
        for (;end > start; end--) {
            const point = points[end];
            if (!isNaN(point.x) && !isNaN(point.y)) break;
        }
        return end;
    }
    function _getEdge(a, b, prop, fn) {
        if (a && b) return fn(a[prop], b[prop]);
        return a ? a[prop] : b ? b[prop] : 0;
    }
    function _createBoundaryLine(boundary, line) {
        let points = [];
        let _loop = false;
        if (helpers_dataset_isArray(boundary)) {
            _loop = true;
            points = boundary;
        } else points = _pointsFromSegments(boundary, line);
        return points.length ? new LineElement({
            points,
            options: {
                tension: 0
            },
            _loop,
            _fullLoop: _loop
        }) : null;
    }
    function _shouldApplyFill(source) {
        return source && source.fill !== false;
    }
    function _resolveTarget(sources, index, propagate) {
        const source = sources[index];
        let fill = source.fill;
        const visited = [ index ];
        let target;
        if (!propagate) return fill;
        while (fill !== false && visited.indexOf(fill) === -1) {
            if (!isNumberFinite(fill)) return fill;
            target = sources[fill];
            if (!target) return false;
            if (target.visible) return fill;
            visited.push(fill);
            fill = target.fill;
        }
        return false;
    }
    function _decodeFill(line, index, count) {
        const fill = parseFillOption(line);
        if (helpers_dataset_isObject(fill)) return isNaN(fill.value) ? false : fill;
        let target = parseFloat(fill);
        if (isNumberFinite(target) && Math.floor(target) === target) return decodeTargetIndex(fill[0], index, target, count);
        return [ "origin", "start", "end", "stack", "shape" ].indexOf(fill) >= 0 && fill;
    }
    function decodeTargetIndex(firstCh, index, target, count) {
        if (firstCh === "-" || firstCh === "+") target = index + target;
        if (target === index || target < 0 || target >= count) return false;
        return target;
    }
    function _getTargetPixel(fill, scale) {
        let pixel = null;
        if (fill === "start") pixel = scale.bottom; else if (fill === "end") pixel = scale.top; else if (helpers_dataset_isObject(fill)) pixel = scale.getPixelForValue(fill.value); else if (scale.getBasePixel) pixel = scale.getBasePixel();
        return pixel;
    }
    function _getTargetValue(fill, scale, startValue) {
        let value;
        if (fill === "start") value = startValue; else if (fill === "end") value = scale.options.reverse ? scale.min : scale.max; else if (helpers_dataset_isObject(fill)) value = fill.value; else value = scale.getBaseValue();
        return value;
    }
    function parseFillOption(line) {
        const options = line.options;
        const fillOption = options.fill;
        let fill = valueOrDefault(fillOption && fillOption.target, fillOption);
        if (fill === void 0) fill = !!options.backgroundColor;
        if (fill === false || fill === null) return false;
        if (fill === true) return "origin";
        return fill;
    }
    function _buildStackLine(source) {
        const {scale, index, line} = source;
        const points = [];
        const segments = line.segments;
        const sourcePoints = line.points;
        const linesBelow = getLinesBelow(scale, index);
        linesBelow.push(_createBoundaryLine({
            x: null,
            y: scale.bottom
        }, line));
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            for (let j = segment.start; j <= segment.end; j++) addPointsBelow(points, sourcePoints[j], linesBelow);
        }
        return new LineElement({
            points,
            options: {}
        });
    }
    function getLinesBelow(scale, index) {
        const below = [];
        const metas = scale.getMatchingVisibleMetas("line");
        for (let i = 0; i < metas.length; i++) {
            const meta = metas[i];
            if (meta.index === index) break;
            if (!meta.hidden) below.unshift(meta.dataset);
        }
        return below;
    }
    function addPointsBelow(points, sourcePoint, linesBelow) {
        const postponed = [];
        for (let j = 0; j < linesBelow.length; j++) {
            const line = linesBelow[j];
            const {first, last, point} = findPoint(line, sourcePoint, "x");
            if (!point || first && last) continue;
            if (first) postponed.unshift(point); else {
                points.push(point);
                if (!last) break;
            }
        }
        points.push(...postponed);
    }
    function findPoint(line, sourcePoint, property) {
        const point = line.interpolate(sourcePoint, property);
        if (!point) return {};
        const pointValue = point[property];
        const segments = line.segments;
        const linePoints = line.points;
        let first = false;
        let last = false;
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const firstValue = linePoints[segment.start][property];
            const lastValue = linePoints[segment.end][property];
            if (_isBetween(pointValue, firstValue, lastValue)) {
                first = pointValue === firstValue;
                last = pointValue === lastValue;
                break;
            }
        }
        return {
            first,
            last,
            point
        };
    }
    class simpleArc {
        constructor(opts) {
            this.x = opts.x;
            this.y = opts.y;
            this.radius = opts.radius;
        }
        pathSegment(ctx, bounds, opts) {
            const {x, y, radius} = this;
            bounds = bounds || {
                start: 0,
                end: TAU
            };
            ctx.arc(x, y, radius, bounds.end, bounds.start, true);
            return !opts.bounds;
        }
        interpolate(point) {
            const {x, y, radius} = this;
            const angle = point.angle;
            return {
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
                angle
            };
        }
    }
    function _getTarget(source) {
        const {chart, fill, line} = source;
        if (isNumberFinite(fill)) return getLineByIndex(chart, fill);
        if (fill === "stack") return _buildStackLine(source);
        if (fill === "shape") return true;
        const boundary = computeBoundary(source);
        if (boundary instanceof simpleArc) return boundary;
        return _createBoundaryLine(boundary, line);
    }
    function getLineByIndex(chart, index) {
        const meta = chart.getDatasetMeta(index);
        const visible = meta && chart.isDatasetVisible(index);
        return visible ? meta.dataset : null;
    }
    function computeBoundary(source) {
        const scale = source.scale || {};
        if (scale.getPointPositionForValue) return computeCircularBoundary(source);
        return computeLinearBoundary(source);
    }
    function computeLinearBoundary(source) {
        const {scale = {}, fill} = source;
        const pixel = _getTargetPixel(fill, scale);
        if (isNumberFinite(pixel)) {
            const horizontal = scale.isHorizontal();
            return {
                x: horizontal ? pixel : null,
                y: horizontal ? null : pixel
            };
        }
        return null;
    }
    function computeCircularBoundary(source) {
        const {scale, fill} = source;
        const options = scale.options;
        const length = scale.getLabels().length;
        const start = options.reverse ? scale.max : scale.min;
        const value = _getTargetValue(fill, scale, start);
        const target = [];
        if (options.grid.circular) {
            const center = scale.getPointPositionForValue(0, start);
            return new simpleArc({
                x: center.x,
                y: center.y,
                radius: scale.getDistanceFromCenterForValue(value)
            });
        }
        for (let i = 0; i < length; ++i) target.push(scale.getPointPositionForValue(i, value));
        return target;
    }
    function _drawfill(ctx, source, area) {
        const target = _getTarget(source);
        const {chart, index, line, scale, axis} = source;
        const lineOpts = line.options;
        const fillOption = lineOpts.fill;
        const color = lineOpts.backgroundColor;
        const {above = color, below = color} = fillOption || {};
        const meta = chart.getDatasetMeta(index);
        const clip = getDatasetClipArea(chart, meta);
        if (target && line.points.length) {
            clipArea(ctx, area);
            doFill(ctx, {
                line,
                target,
                above,
                below,
                area,
                scale,
                axis,
                clip
            });
            unclipArea(ctx);
        }
    }
    function doFill(ctx, cfg) {
        const {line, target, above, below, area, scale, clip} = cfg;
        const property = line._loop ? "angle" : cfg.axis;
        ctx.save();
        let fillColor = below;
        if (below !== above) if (property === "x") {
            clipVertical(ctx, target, area.top);
            fill(ctx, {
                line,
                target,
                color: above,
                scale,
                property,
                clip
            });
            ctx.restore();
            ctx.save();
            clipVertical(ctx, target, area.bottom);
        } else if (property === "y") {
            clipHorizontal(ctx, target, area.left);
            fill(ctx, {
                line,
                target,
                color: below,
                scale,
                property,
                clip
            });
            ctx.restore();
            ctx.save();
            clipHorizontal(ctx, target, area.right);
            fillColor = above;
        }
        fill(ctx, {
            line,
            target,
            color: fillColor,
            scale,
            property,
            clip
        });
        ctx.restore();
    }
    function clipVertical(ctx, target, clipY) {
        const {segments, points} = target;
        let first = true;
        let lineLoop = false;
        ctx.beginPath();
        for (const segment of segments) {
            const {start, end} = segment;
            const firstPoint = points[start];
            const lastPoint = points[_findSegmentEnd(start, end, points)];
            if (first) {
                ctx.moveTo(firstPoint.x, firstPoint.y);
                first = false;
            } else {
                ctx.lineTo(firstPoint.x, clipY);
                ctx.lineTo(firstPoint.x, firstPoint.y);
            }
            lineLoop = !!target.pathSegment(ctx, segment, {
                move: lineLoop
            });
            if (lineLoop) ctx.closePath(); else ctx.lineTo(lastPoint.x, clipY);
        }
        ctx.lineTo(target.first().x, clipY);
        ctx.closePath();
        ctx.clip();
    }
    function clipHorizontal(ctx, target, clipX) {
        const {segments, points} = target;
        let first = true;
        let lineLoop = false;
        ctx.beginPath();
        for (const segment of segments) {
            const {start, end} = segment;
            const firstPoint = points[start];
            const lastPoint = points[_findSegmentEnd(start, end, points)];
            if (first) {
                ctx.moveTo(firstPoint.x, firstPoint.y);
                first = false;
            } else {
                ctx.lineTo(clipX, firstPoint.y);
                ctx.lineTo(firstPoint.x, firstPoint.y);
            }
            lineLoop = !!target.pathSegment(ctx, segment, {
                move: lineLoop
            });
            if (lineLoop) ctx.closePath(); else ctx.lineTo(clipX, lastPoint.y);
        }
        ctx.lineTo(clipX, target.first().y);
        ctx.closePath();
        ctx.clip();
    }
    function fill(ctx, cfg) {
        const {line, target, property, color, scale, clip} = cfg;
        const segments = _segments(line, target, property);
        for (const {source: src, target: tgt, start, end} of segments) {
            const {style: {backgroundColor = color} = {}} = src;
            const notShape = target !== true;
            ctx.save();
            ctx.fillStyle = backgroundColor;
            clipBounds(ctx, scale, clip, notShape && _getBounds(property, start, end));
            ctx.beginPath();
            const lineLoop = !!line.pathSegment(ctx, src);
            let loop;
            if (notShape) {
                if (lineLoop) ctx.closePath(); else interpolatedLineTo(ctx, target, end, property);
                const targetLoop = !!target.pathSegment(ctx, tgt, {
                    move: lineLoop,
                    reverse: true
                });
                loop = lineLoop && targetLoop;
                if (!loop) interpolatedLineTo(ctx, target, start, property);
            }
            ctx.closePath();
            ctx.fill(loop ? "evenodd" : "nonzero");
            ctx.restore();
        }
    }
    function clipBounds(ctx, scale, clip, bounds) {
        const chartArea = scale.chart.chartArea;
        const {property, start, end} = bounds || {};
        if (property === "x" || property === "y") {
            let left, top, right, bottom;
            if (property === "x") {
                left = start;
                top = chartArea.top;
                right = end;
                bottom = chartArea.bottom;
            } else {
                left = chartArea.left;
                top = start;
                right = chartArea.right;
                bottom = end;
            }
            ctx.beginPath();
            if (clip) {
                left = Math.max(left, clip.left);
                right = Math.min(right, clip.right);
                top = Math.max(top, clip.top);
                bottom = Math.min(bottom, clip.bottom);
            }
            ctx.rect(left, top, right - left, bottom - top);
            ctx.clip();
        }
    }
    function interpolatedLineTo(ctx, target, point, property) {
        const interpolatedPoint = target.interpolate(point, property);
        if (interpolatedPoint) ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
    }
    var index = {
        id: "filler",
        afterDatasetsUpdate(chart, _args, options) {
            const count = (chart.data.datasets || []).length;
            const sources = [];
            let meta, i, line, source;
            for (i = 0; i < count; ++i) {
                meta = chart.getDatasetMeta(i);
                line = meta.dataset;
                source = null;
                if (line && line.options && line instanceof LineElement) source = {
                    visible: chart.isDatasetVisible(i),
                    index: i,
                    fill: _decodeFill(line, i, count),
                    chart,
                    axis: meta.controller.options.indexAxis,
                    scale: meta.vScale,
                    line
                };
                meta.$filler = source;
                sources.push(source);
            }
            for (i = 0; i < count; ++i) {
                source = sources[i];
                if (!source || source.fill === false) continue;
                source.fill = _resolveTarget(sources, i, options.propagate);
            }
        },
        beforeDraw(chart, _args, options) {
            const draw = options.drawTime === "beforeDraw";
            const metasets = chart.getSortedVisibleDatasetMetas();
            const area = chart.chartArea;
            for (let i = metasets.length - 1; i >= 0; --i) {
                const source = metasets[i].$filler;
                if (!source) continue;
                source.line.updateControlPoints(area, source.axis);
                if (draw && source.fill) _drawfill(chart.ctx, source, area);
            }
        },
        beforeDatasetsDraw(chart, _args, options) {
            if (options.drawTime !== "beforeDatasetsDraw") return;
            const metasets = chart.getSortedVisibleDatasetMetas();
            for (let i = metasets.length - 1; i >= 0; --i) {
                const source = metasets[i].$filler;
                if (_shouldApplyFill(source)) _drawfill(chart.ctx, source, chart.chartArea);
            }
        },
        beforeDatasetDraw(chart, args, options) {
            const source = args.meta.$filler;
            if (!_shouldApplyFill(source) || options.drawTime !== "beforeDatasetDraw") return;
            _drawfill(chart.ctx, source, chart.chartArea);
        },
        defaults: {
            propagate: true,
            drawTime: "beforeDatasetDraw"
        }
    };
    const getBoxSize = (labelOpts, fontSize) => {
        let {boxHeight = fontSize, boxWidth = fontSize} = labelOpts;
        if (labelOpts.usePointStyle) {
            boxHeight = Math.min(boxHeight, fontSize);
            boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
        }
        return {
            boxWidth,
            boxHeight,
            itemHeight: Math.max(fontSize, boxHeight)
        };
    };
    const itemsEqual = (a, b) => a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
    class Legend extends Element {
        constructor(config) {
            super();
            this._added = false;
            this.legendHitBoxes = [];
            this._hoveredItem = null;
            this.doughnutMode = false;
            this.chart = config.chart;
            this.options = config.options;
            this.ctx = config.ctx;
            this.legendItems = void 0;
            this.columnSizes = void 0;
            this.lineWidths = void 0;
            this.maxHeight = void 0;
            this.maxWidth = void 0;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.height = void 0;
            this.width = void 0;
            this._margins = void 0;
            this.position = void 0;
            this.weight = void 0;
            this.fullSize = void 0;
        }
        update(maxWidth, maxHeight, margins) {
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this._margins = margins;
            this.setDimensions();
            this.buildLabels();
            this.fit();
        }
        setDimensions() {
            if (this.isHorizontal()) {
                this.width = this.maxWidth;
                this.left = this._margins.left;
                this.right = this.width;
            } else {
                this.height = this.maxHeight;
                this.top = this._margins.top;
                this.bottom = this.height;
            }
        }
        buildLabels() {
            const labelOpts = this.options.labels || {};
            let legendItems = callback(labelOpts.generateLabels, [ this.chart ], this) || [];
            if (labelOpts.filter) legendItems = legendItems.filter((item => labelOpts.filter(item, this.chart.data)));
            if (labelOpts.sort) legendItems = legendItems.sort(((a, b) => labelOpts.sort(a, b, this.chart.data)));
            if (this.options.reverse) legendItems.reverse();
            this.legendItems = legendItems;
        }
        fit() {
            const {options, ctx} = this;
            if (!options.display) {
                this.width = this.height = 0;
                return;
            }
            const labelOpts = options.labels;
            const labelFont = toFont(labelOpts.font);
            const fontSize = labelFont.size;
            const titleHeight = this._computeTitleHeight();
            const {boxWidth, itemHeight} = getBoxSize(labelOpts, fontSize);
            let width, height;
            ctx.font = labelFont.string;
            if (this.isHorizontal()) {
                width = this.maxWidth;
                height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
            } else {
                height = this.maxHeight;
                width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
            }
            this.width = Math.min(width, options.maxWidth || this.maxWidth);
            this.height = Math.min(height, options.maxHeight || this.maxHeight);
        }
        _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
            const {ctx, maxWidth, options: {labels: {padding}}} = this;
            const hitboxes = this.legendHitBoxes = [];
            const lineWidths = this.lineWidths = [ 0 ];
            const lineHeight = itemHeight + padding;
            let totalHeight = titleHeight;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            let row = -1;
            let top = -lineHeight;
            this.legendItems.forEach(((legendItem, i) => {
                const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
                if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
                    totalHeight += lineHeight;
                    lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
                    top += lineHeight;
                    row++;
                }
                hitboxes[i] = {
                    left: 0,
                    top,
                    row,
                    width: itemWidth,
                    height: itemHeight
                };
                lineWidths[lineWidths.length - 1] += itemWidth + padding;
            }));
            return totalHeight;
        }
        _fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
            const {ctx, maxHeight, options: {labels: {padding}}} = this;
            const hitboxes = this.legendHitBoxes = [];
            const columnSizes = this.columnSizes = [];
            const heightLimit = maxHeight - titleHeight;
            let totalWidth = padding;
            let currentColWidth = 0;
            let currentColHeight = 0;
            let left = 0;
            let col = 0;
            this.legendItems.forEach(((legendItem, i) => {
                const {itemWidth, itemHeight} = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
                if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
                    totalWidth += currentColWidth + padding;
                    columnSizes.push({
                        width: currentColWidth,
                        height: currentColHeight
                    });
                    left += currentColWidth + padding;
                    col++;
                    currentColWidth = currentColHeight = 0;
                }
                hitboxes[i] = {
                    left,
                    top: currentColHeight,
                    col,
                    width: itemWidth,
                    height: itemHeight
                };
                currentColWidth = Math.max(currentColWidth, itemWidth);
                currentColHeight += itemHeight + padding;
            }));
            totalWidth += currentColWidth;
            columnSizes.push({
                width: currentColWidth,
                height: currentColHeight
            });
            return totalWidth;
        }
        adjustHitBoxes() {
            if (!this.options.display) return;
            const titleHeight = this._computeTitleHeight();
            const {legendHitBoxes: hitboxes, options: {align, labels: {padding}, rtl}} = this;
            const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
            if (this.isHorizontal()) {
                let row = 0;
                let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                for (const hitbox of hitboxes) {
                    if (row !== hitbox.row) {
                        row = hitbox.row;
                        left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                    }
                    hitbox.top += this.top + titleHeight + padding;
                    hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
                    left += hitbox.width + padding;
                }
            } else {
                let col = 0;
                let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                for (const hitbox of hitboxes) {
                    if (hitbox.col !== col) {
                        col = hitbox.col;
                        top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                    }
                    hitbox.top = top;
                    hitbox.left += this.left + padding;
                    hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
                    top += hitbox.height + padding;
                }
            }
        }
        isHorizontal() {
            return this.options.position === "top" || this.options.position === "bottom";
        }
        draw() {
            if (this.options.display) {
                const ctx = this.ctx;
                clipArea(ctx, this);
                this._draw();
                unclipArea(ctx);
            }
        }
        _draw() {
            const {options: opts, columnSizes, lineWidths, ctx} = this;
            const {align, labels: labelOpts} = opts;
            const defaultColor = defaults.color;
            const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
            const labelFont = toFont(labelOpts.font);
            const {padding} = labelOpts;
            const fontSize = labelFont.size;
            const halfFontSize = fontSize / 2;
            let cursor;
            this.drawTitle();
            ctx.textAlign = rtlHelper.textAlign("left");
            ctx.textBaseline = "middle";
            ctx.lineWidth = .5;
            ctx.font = labelFont.string;
            const {boxWidth, boxHeight, itemHeight} = getBoxSize(labelOpts, fontSize);
            const drawLegendBox = function(x, y, legendItem) {
                if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) return;
                ctx.save();
                const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
                ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
                ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
                ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
                ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
                ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
                if (labelOpts.usePointStyle) {
                    const drawOptions = {
                        radius: boxHeight * Math.SQRT2 / 2,
                        pointStyle: legendItem.pointStyle,
                        rotation: legendItem.rotation,
                        borderWidth: lineWidth
                    };
                    const centerX = rtlHelper.xPlus(x, boxWidth / 2);
                    const centerY = y + halfFontSize;
                    drawPointLegend(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
                } else {
                    const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
                    const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
                    const borderRadius = toTRBLCorners(legendItem.borderRadius);
                    ctx.beginPath();
                    if (Object.values(borderRadius).some((v => v !== 0))) addRoundedRectPath(ctx, {
                        x: xBoxLeft,
                        y: yBoxTop,
                        w: boxWidth,
                        h: boxHeight,
                        radius: borderRadius
                    }); else ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
                    ctx.fill();
                    if (lineWidth !== 0) ctx.stroke();
                }
                ctx.restore();
            };
            const fillText = function(x, y, legendItem) {
                renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
                    strikethrough: legendItem.hidden,
                    textAlign: rtlHelper.textAlign(legendItem.textAlign)
                });
            };
            const isHorizontal = this.isHorizontal();
            const titleHeight = this._computeTitleHeight();
            if (isHorizontal) cursor = {
                x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
                y: this.top + padding + titleHeight,
                line: 0
            }; else cursor = {
                x: this.left + padding,
                y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
                line: 0
            };
            overrideTextDirection(this.ctx, opts.textDirection);
            const lineHeight = itemHeight + padding;
            this.legendItems.forEach(((legendItem, i) => {
                ctx.strokeStyle = legendItem.fontColor;
                ctx.fillStyle = legendItem.fontColor;
                const textWidth = ctx.measureText(legendItem.text).width;
                const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
                const width = boxWidth + halfFontSize + textWidth;
                let x = cursor.x;
                let y = cursor.y;
                rtlHelper.setWidth(this.width);
                if (isHorizontal) {
                    if (i > 0 && x + width + padding > this.right) {
                        y = cursor.y += lineHeight;
                        cursor.line++;
                        x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
                    }
                } else if (i > 0 && y + lineHeight > this.bottom) {
                    x = cursor.x = x + columnSizes[cursor.line].width + padding;
                    cursor.line++;
                    y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
                }
                const realX = rtlHelper.x(x);
                drawLegendBox(realX, y, legendItem);
                x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
                fillText(rtlHelper.x(x), y, legendItem);
                if (isHorizontal) cursor.x += width + padding; else if (typeof legendItem.text !== "string") {
                    const fontLineHeight = labelFont.lineHeight;
                    cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight) + padding;
                } else cursor.y += lineHeight;
            }));
            restoreTextDirection(this.ctx, opts.textDirection);
        }
        drawTitle() {
            const opts = this.options;
            const titleOpts = opts.title;
            const titleFont = toFont(titleOpts.font);
            const titlePadding = toPadding(titleOpts.padding);
            if (!titleOpts.display) return;
            const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
            const ctx = this.ctx;
            const position = titleOpts.position;
            const halfFontSize = titleFont.size / 2;
            const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
            let y;
            let left = this.left;
            let maxWidth = this.width;
            if (this.isHorizontal()) {
                maxWidth = Math.max(...this.lineWidths);
                y = this.top + topPaddingPlusHalfFontSize;
                left = _alignStartEnd(opts.align, left, this.right - maxWidth);
            } else {
                const maxHeight = this.columnSizes.reduce(((acc, size) => Math.max(acc, size.height)), 0);
                y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
            }
            const x = _alignStartEnd(position, left, left + maxWidth);
            ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
            ctx.textBaseline = "middle";
            ctx.strokeStyle = titleOpts.color;
            ctx.fillStyle = titleOpts.color;
            ctx.font = titleFont.string;
            renderText(ctx, titleOpts.text, x, y, titleFont);
        }
        _computeTitleHeight() {
            const titleOpts = this.options.title;
            const titleFont = toFont(titleOpts.font);
            const titlePadding = toPadding(titleOpts.padding);
            return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
        }
        _getLegendItemAt(x, y) {
            let i, hitBox, lh;
            if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
                lh = this.legendHitBoxes;
                for (i = 0; i < lh.length; ++i) {
                    hitBox = lh[i];
                    if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) return this.legendItems[i];
                }
            }
            return null;
        }
        handleEvent(e) {
            const opts = this.options;
            if (!isListened(e.type, opts)) return;
            const hoveredItem = this._getLegendItemAt(e.x, e.y);
            if (e.type === "mousemove" || e.type === "mouseout") {
                const previous = this._hoveredItem;
                const sameItem = itemsEqual(previous, hoveredItem);
                if (previous && !sameItem) callback(opts.onLeave, [ e, previous, this ], this);
                this._hoveredItem = hoveredItem;
                if (hoveredItem && !sameItem) callback(opts.onHover, [ e, hoveredItem, this ], this);
            } else if (hoveredItem) callback(opts.onClick, [ e, hoveredItem, this ], this);
        }
    }
    function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
        const itemWidth = calculateItemWidth(legendItem, boxWidth, labelFont, ctx);
        const itemHeight = calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight);
        return {
            itemWidth,
            itemHeight
        };
    }
    function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
        let legendItemText = legendItem.text;
        if (legendItemText && typeof legendItemText !== "string") legendItemText = legendItemText.reduce(((a, b) => a.length > b.length ? a : b));
        return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
    }
    function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
        let itemHeight = _itemHeight;
        if (typeof legendItem.text !== "string") itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
        return itemHeight;
    }
    function calculateLegendItemHeight(legendItem, fontLineHeight) {
        const labelHeight = legendItem.text ? legendItem.text.length : 0;
        return fontLineHeight * labelHeight;
    }
    function isListened(type, opts) {
        if ((type === "mousemove" || type === "mouseout") && (opts.onHover || opts.onLeave)) return true;
        if (opts.onClick && (type === "click" || type === "mouseup")) return true;
        return false;
    }
    var plugin_legend = {
        id: "legend",
        _element: Legend,
        start(chart, _args, options) {
            const legend = chart.legend = new Legend({
                ctx: chart.ctx,
                options,
                chart
            });
            layouts.configure(chart, legend, options);
            layouts.addBox(chart, legend);
        },
        stop(chart) {
            layouts.removeBox(chart, chart.legend);
            delete chart.legend;
        },
        beforeUpdate(chart, _args, options) {
            const legend = chart.legend;
            layouts.configure(chart, legend, options);
            legend.options = options;
        },
        afterUpdate(chart) {
            const legend = chart.legend;
            legend.buildLabels();
            legend.adjustHitBoxes();
        },
        afterEvent(chart, args) {
            if (!args.replay) chart.legend.handleEvent(args.event);
        },
        defaults: {
            display: true,
            position: "top",
            align: "center",
            fullSize: true,
            reverse: false,
            weight: 1e3,
            onClick(e, legendItem, legend) {
                const index = legendItem.datasetIndex;
                const ci = legend.chart;
                if (ci.isDatasetVisible(index)) {
                    ci.hide(index);
                    legendItem.hidden = true;
                } else {
                    ci.show(index);
                    legendItem.hidden = false;
                }
            },
            onHover: null,
            onLeave: null,
            labels: {
                color: ctx => ctx.chart.options.color,
                boxWidth: 40,
                padding: 10,
                generateLabels(chart) {
                    const datasets = chart.data.datasets;
                    const {labels: {usePointStyle, pointStyle, textAlign, color, useBorderRadius, borderRadius}} = chart.legend.options;
                    return chart._getSortedDatasetMetas().map((meta => {
                        const style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
                        const borderWidth = toPadding(style.borderWidth);
                        return {
                            text: datasets[meta.index].label,
                            fillStyle: style.backgroundColor,
                            fontColor: color,
                            hidden: !meta.visible,
                            lineCap: style.borderCapStyle,
                            lineDash: style.borderDash,
                            lineDashOffset: style.borderDashOffset,
                            lineJoin: style.borderJoinStyle,
                            lineWidth: (borderWidth.width + borderWidth.height) / 4,
                            strokeStyle: style.borderColor,
                            pointStyle: pointStyle || style.pointStyle,
                            rotation: style.rotation,
                            textAlign: textAlign || style.textAlign,
                            borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
                            datasetIndex: meta.index
                        };
                    }), this);
                }
            },
            title: {
                color: ctx => ctx.chart.options.color,
                display: false,
                position: "center",
                text: ""
            }
        },
        descriptors: {
            _scriptable: name => !name.startsWith("on"),
            labels: {
                _scriptable: name => ![ "generateLabels", "filter", "sort" ].includes(name)
            }
        }
    };
    class Title extends Element {
        constructor(config) {
            super();
            this.chart = config.chart;
            this.options = config.options;
            this.ctx = config.ctx;
            this._padding = void 0;
            this.top = void 0;
            this.bottom = void 0;
            this.left = void 0;
            this.right = void 0;
            this.width = void 0;
            this.height = void 0;
            this.position = void 0;
            this.weight = void 0;
            this.fullSize = void 0;
        }
        update(maxWidth, maxHeight) {
            const opts = this.options;
            this.left = 0;
            this.top = 0;
            if (!opts.display) {
                this.width = this.height = this.right = this.bottom = 0;
                return;
            }
            this.width = this.right = maxWidth;
            this.height = this.bottom = maxHeight;
            const lineCount = helpers_dataset_isArray(opts.text) ? opts.text.length : 1;
            this._padding = toPadding(opts.padding);
            const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
            if (this.isHorizontal()) this.height = textSize; else this.width = textSize;
        }
        isHorizontal() {
            const pos = this.options.position;
            return pos === "top" || pos === "bottom";
        }
        _drawArgs(offset) {
            const {top, left, bottom, right, options} = this;
            const align = options.align;
            let rotation = 0;
            let maxWidth, titleX, titleY;
            if (this.isHorizontal()) {
                titleX = _alignStartEnd(align, left, right);
                titleY = top + offset;
                maxWidth = right - left;
            } else {
                if (options.position === "left") {
                    titleX = left + offset;
                    titleY = _alignStartEnd(align, bottom, top);
                    rotation = PI * -.5;
                } else {
                    titleX = right - offset;
                    titleY = _alignStartEnd(align, top, bottom);
                    rotation = PI * .5;
                }
                maxWidth = bottom - top;
            }
            return {
                titleX,
                titleY,
                maxWidth,
                rotation
            };
        }
        draw() {
            const ctx = this.ctx;
            const opts = this.options;
            if (!opts.display) return;
            const fontOpts = toFont(opts.font);
            const lineHeight = fontOpts.lineHeight;
            const offset = lineHeight / 2 + this._padding.top;
            const {titleX, titleY, maxWidth, rotation} = this._drawArgs(offset);
            renderText(ctx, opts.text, 0, 0, fontOpts, {
                color: opts.color,
                maxWidth,
                rotation,
                textAlign: _toLeftRightCenter(opts.align),
                textBaseline: "middle",
                translation: [ titleX, titleY ]
            });
        }
    }
    function createTitle(chart, titleOpts) {
        const title = new Title({
            ctx: chart.ctx,
            options: titleOpts,
            chart
        });
        layouts.configure(chart, title, titleOpts);
        layouts.addBox(chart, title);
        chart.titleBlock = title;
    }
    var plugin_title = {
        id: "title",
        _element: Title,
        start(chart, _args, options) {
            createTitle(chart, options);
        },
        stop(chart) {
            const titleBlock = chart.titleBlock;
            layouts.removeBox(chart, titleBlock);
            delete chart.titleBlock;
        },
        beforeUpdate(chart, _args, options) {
            const title = chart.titleBlock;
            layouts.configure(chart, title, options);
            title.options = options;
        },
        defaults: {
            align: "center",
            display: false,
            font: {
                weight: "bold"
            },
            fullSize: true,
            padding: 10,
            position: "top",
            text: "",
            weight: 2e3
        },
        defaultRoutes: {
            color: "color"
        },
        descriptors: {
            _scriptable: true,
            _indexable: false
        }
    };
    const chart_map = new WeakMap;
    var plugin_subtitle = {
        id: "subtitle",
        start(chart, _args, options) {
            const title = new Title({
                ctx: chart.ctx,
                options,
                chart
            });
            layouts.configure(chart, title, options);
            layouts.addBox(chart, title);
            chart_map.set(chart, title);
        },
        stop(chart) {
            layouts.removeBox(chart, chart_map.get(chart));
            chart_map.delete(chart);
        },
        beforeUpdate(chart, _args, options) {
            const title = chart_map.get(chart);
            layouts.configure(chart, title, options);
            title.options = options;
        },
        defaults: {
            align: "center",
            display: false,
            font: {
                weight: "normal"
            },
            fullSize: true,
            padding: 0,
            position: "top",
            text: "",
            weight: 1500
        },
        defaultRoutes: {
            color: "color"
        },
        descriptors: {
            _scriptable: true,
            _indexable: false
        }
    };
    const positioners = {
        average(items) {
            if (!items.length) return false;
            let i, len;
            let xSet = new Set;
            let y = 0;
            let count = 0;
            for (i = 0, len = items.length; i < len; ++i) {
                const el = items[i].element;
                if (el && el.hasValue()) {
                    const pos = el.tooltipPosition();
                    xSet.add(pos.x);
                    y += pos.y;
                    ++count;
                }
            }
            if (count === 0 || xSet.size === 0) return false;
            const xAverage = [ ...xSet ].reduce(((a, b) => a + b)) / xSet.size;
            return {
                x: xAverage,
                y: y / count
            };
        },
        nearest(items, eventPosition) {
            if (!items.length) return false;
            let x = eventPosition.x;
            let y = eventPosition.y;
            let minDistance = Number.POSITIVE_INFINITY;
            let i, len, nearestElement;
            for (i = 0, len = items.length; i < len; ++i) {
                const el = items[i].element;
                if (el && el.hasValue()) {
                    const center = el.getCenterPoint();
                    const d = distanceBetweenPoints(eventPosition, center);
                    if (d < minDistance) {
                        minDistance = d;
                        nearestElement = el;
                    }
                }
            }
            if (nearestElement) {
                const tp = nearestElement.tooltipPosition();
                x = tp.x;
                y = tp.y;
            }
            return {
                x,
                y
            };
        }
    };
    function pushOrConcat(base, toPush) {
        if (toPush) if (helpers_dataset_isArray(toPush)) Array.prototype.push.apply(base, toPush); else base.push(toPush);
        return base;
    }
    function splitNewlines(str) {
        if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) return str.split("\n");
        return str;
    }
    function createTooltipItem(chart, item) {
        const {element, datasetIndex, index} = item;
        const controller = chart.getDatasetMeta(datasetIndex).controller;
        const {label, value} = controller.getLabelAndValue(index);
        return {
            chart,
            label,
            parsed: controller.getParsed(index),
            raw: chart.data.datasets[datasetIndex].data[index],
            formattedValue: value,
            dataset: controller.getDataset(),
            dataIndex: index,
            datasetIndex,
            element
        };
    }
    function getTooltipSize(tooltip, options) {
        const ctx = tooltip.chart.ctx;
        const {body, footer, title} = tooltip;
        const {boxWidth, boxHeight} = options;
        const bodyFont = toFont(options.bodyFont);
        const titleFont = toFont(options.titleFont);
        const footerFont = toFont(options.footerFont);
        const titleLineCount = title.length;
        const footerLineCount = footer.length;
        const bodyLineItemCount = body.length;
        const padding = toPadding(options.padding);
        let height = padding.height;
        let width = 0;
        let combinedBodyLength = body.reduce(((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length), 0);
        combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
        if (titleLineCount) height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
        if (combinedBodyLength) {
            const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
            height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
        }
        if (footerLineCount) height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
        let widthPadding = 0;
        const maxLineWidth = function(line) {
            width = Math.max(width, ctx.measureText(line).width + widthPadding);
        };
        ctx.save();
        ctx.font = titleFont.string;
        each(tooltip.title, maxLineWidth);
        ctx.font = bodyFont.string;
        each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
        widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
        each(body, (bodyItem => {
            each(bodyItem.before, maxLineWidth);
            each(bodyItem.lines, maxLineWidth);
            each(bodyItem.after, maxLineWidth);
        }));
        widthPadding = 0;
        ctx.font = footerFont.string;
        each(tooltip.footer, maxLineWidth);
        ctx.restore();
        width += padding.width;
        return {
            width,
            height
        };
    }
    function determineYAlign(chart, size) {
        const {y, height} = size;
        if (y < height / 2) return "top"; else if (y > chart.height - height / 2) return "bottom";
        return "center";
    }
    function doesNotFitWithAlign(xAlign, chart, options, size) {
        const {x, width} = size;
        const caret = options.caretSize + options.caretPadding;
        if (xAlign === "left" && x + width + caret > chart.width) return true;
        if (xAlign === "right" && x - width - caret < 0) return true;
    }
    function determineXAlign(chart, options, size, yAlign) {
        const {x, width} = size;
        const {width: chartWidth, chartArea: {left, right}} = chart;
        let xAlign = "center";
        if (yAlign === "center") xAlign = x <= (left + right) / 2 ? "left" : "right"; else if (x <= width / 2) xAlign = "left"; else if (x >= chartWidth - width / 2) xAlign = "right";
        if (doesNotFitWithAlign(xAlign, chart, options, size)) xAlign = "center";
        return xAlign;
    }
    function determineAlignment(chart, options, size) {
        const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
        return {
            xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
            yAlign
        };
    }
    function alignX(size, xAlign) {
        let {x, width} = size;
        if (xAlign === "right") x -= width; else if (xAlign === "center") x -= width / 2;
        return x;
    }
    function alignY(size, yAlign, paddingAndSize) {
        let {y, height} = size;
        if (yAlign === "top") y += paddingAndSize; else if (yAlign === "bottom") y -= height + paddingAndSize; else y -= height / 2;
        return y;
    }
    function getBackgroundPoint(options, size, alignment, chart) {
        const {caretSize, caretPadding, cornerRadius} = options;
        const {xAlign, yAlign} = alignment;
        const paddingAndSize = caretSize + caretPadding;
        const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(cornerRadius);
        let x = alignX(size, xAlign);
        const y = alignY(size, yAlign, paddingAndSize);
        if (yAlign === "center") {
            if (xAlign === "left") x += paddingAndSize; else if (xAlign === "right") x -= paddingAndSize;
        } else if (xAlign === "left") x -= Math.max(topLeft, bottomLeft) + caretSize; else if (xAlign === "right") x += Math.max(topRight, bottomRight) + caretSize;
        return {
            x: _limitValue(x, 0, chart.width - size.width),
            y: _limitValue(y, 0, chart.height - size.height)
        };
    }
    function getAlignedX(tooltip, align, options) {
        const padding = toPadding(options.padding);
        return align === "center" ? tooltip.x + tooltip.width / 2 : align === "right" ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
    }
    function getBeforeAfterBodyLines(callback) {
        return pushOrConcat([], splitNewlines(callback));
    }
    function createTooltipContext(parent, tooltip, tooltipItems) {
        return createContext(parent, {
            tooltip,
            tooltipItems,
            type: "tooltip"
        });
    }
    function overrideCallbacks(callbacks, context) {
        const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
        return override ? callbacks.override(override) : callbacks;
    }
    const defaultCallbacks = {
        beforeTitle: helpers_dataset_noop,
        title(tooltipItems) {
            if (tooltipItems.length > 0) {
                const item = tooltipItems[0];
                const labels = item.chart.data.labels;
                const labelCount = labels ? labels.length : 0;
                if (this && this.options && this.options.mode === "dataset") return item.dataset.label || ""; else if (item.label) return item.label; else if (labelCount > 0 && item.dataIndex < labelCount) return labels[item.dataIndex];
            }
            return "";
        },
        afterTitle: helpers_dataset_noop,
        beforeBody: helpers_dataset_noop,
        beforeLabel: helpers_dataset_noop,
        label(tooltipItem) {
            if (this && this.options && this.options.mode === "dataset") return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
            let label = tooltipItem.dataset.label || "";
            if (label) label += ": ";
            const value = tooltipItem.formattedValue;
            if (!isNullOrUndef(value)) label += value;
            return label;
        },
        labelColor(tooltipItem) {
            const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
            const options = meta.controller.getStyle(tooltipItem.dataIndex);
            return {
                borderColor: options.borderColor,
                backgroundColor: options.backgroundColor,
                borderWidth: options.borderWidth,
                borderDash: options.borderDash,
                borderDashOffset: options.borderDashOffset,
                borderRadius: 0
            };
        },
        labelTextColor() {
            return this.options.bodyColor;
        },
        labelPointStyle(tooltipItem) {
            const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
            const options = meta.controller.getStyle(tooltipItem.dataIndex);
            return {
                pointStyle: options.pointStyle,
                rotation: options.rotation
            };
        },
        afterLabel: helpers_dataset_noop,
        afterBody: helpers_dataset_noop,
        beforeFooter: helpers_dataset_noop,
        footer: helpers_dataset_noop,
        afterFooter: helpers_dataset_noop
    };
    function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
        const result = callbacks[name].call(ctx, arg);
        if (typeof result === "undefined") return defaultCallbacks[name].call(ctx, arg);
        return result;
    }
    class Tooltip extends Element {
        static positioners=positioners;
        constructor(config) {
            super();
            this.opacity = 0;
            this._active = [];
            this._eventPosition = void 0;
            this._size = void 0;
            this._cachedAnimations = void 0;
            this._tooltipItems = [];
            this.$animations = void 0;
            this.$context = void 0;
            this.chart = config.chart;
            this.options = config.options;
            this.dataPoints = void 0;
            this.title = void 0;
            this.beforeBody = void 0;
            this.body = void 0;
            this.afterBody = void 0;
            this.footer = void 0;
            this.xAlign = void 0;
            this.yAlign = void 0;
            this.x = void 0;
            this.y = void 0;
            this.height = void 0;
            this.width = void 0;
            this.caretX = void 0;
            this.caretY = void 0;
            this.labelColors = void 0;
            this.labelPointStyles = void 0;
            this.labelTextColors = void 0;
        }
        initialize(options) {
            this.options = options;
            this._cachedAnimations = void 0;
            this.$context = void 0;
        }
        _resolveAnimations() {
            const cached = this._cachedAnimations;
            if (cached) return cached;
            const chart = this.chart;
            const options = this.options.setContext(this.getContext());
            const opts = options.enabled && chart.options.animation && options.animations;
            const animations = new Animations(this.chart, opts);
            if (opts._cacheable) this._cachedAnimations = Object.freeze(animations);
            return animations;
        }
        getContext() {
            return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
        }
        getTitle(context, options) {
            const {callbacks} = options;
            const beforeTitle = invokeCallbackWithFallback(callbacks, "beforeTitle", this, context);
            const title = invokeCallbackWithFallback(callbacks, "title", this, context);
            const afterTitle = invokeCallbackWithFallback(callbacks, "afterTitle", this, context);
            let lines = [];
            lines = pushOrConcat(lines, splitNewlines(beforeTitle));
            lines = pushOrConcat(lines, splitNewlines(title));
            lines = pushOrConcat(lines, splitNewlines(afterTitle));
            return lines;
        }
        getBeforeBody(tooltipItems, options) {
            return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "beforeBody", this, tooltipItems));
        }
        getBody(tooltipItems, options) {
            const {callbacks} = options;
            const bodyItems = [];
            each(tooltipItems, (context => {
                const bodyItem = {
                    before: [],
                    lines: [],
                    after: []
                };
                const scoped = overrideCallbacks(callbacks, context);
                pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, "beforeLabel", this, context)));
                pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, "label", this, context));
                pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, "afterLabel", this, context)));
                bodyItems.push(bodyItem);
            }));
            return bodyItems;
        }
        getAfterBody(tooltipItems, options) {
            return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "afterBody", this, tooltipItems));
        }
        getFooter(tooltipItems, options) {
            const {callbacks} = options;
            const beforeFooter = invokeCallbackWithFallback(callbacks, "beforeFooter", this, tooltipItems);
            const footer = invokeCallbackWithFallback(callbacks, "footer", this, tooltipItems);
            const afterFooter = invokeCallbackWithFallback(callbacks, "afterFooter", this, tooltipItems);
            let lines = [];
            lines = pushOrConcat(lines, splitNewlines(beforeFooter));
            lines = pushOrConcat(lines, splitNewlines(footer));
            lines = pushOrConcat(lines, splitNewlines(afterFooter));
            return lines;
        }
        _createItems(options) {
            const active = this._active;
            const data = this.chart.data;
            const labelColors = [];
            const labelPointStyles = [];
            const labelTextColors = [];
            let tooltipItems = [];
            let i, len;
            for (i = 0, len = active.length; i < len; ++i) tooltipItems.push(createTooltipItem(this.chart, active[i]));
            if (options.filter) tooltipItems = tooltipItems.filter(((element, index, array) => options.filter(element, index, array, data)));
            if (options.itemSort) tooltipItems = tooltipItems.sort(((a, b) => options.itemSort(a, b, data)));
            each(tooltipItems, (context => {
                const scoped = overrideCallbacks(options.callbacks, context);
                labelColors.push(invokeCallbackWithFallback(scoped, "labelColor", this, context));
                labelPointStyles.push(invokeCallbackWithFallback(scoped, "labelPointStyle", this, context));
                labelTextColors.push(invokeCallbackWithFallback(scoped, "labelTextColor", this, context));
            }));
            this.labelColors = labelColors;
            this.labelPointStyles = labelPointStyles;
            this.labelTextColors = labelTextColors;
            this.dataPoints = tooltipItems;
            return tooltipItems;
        }
        update(changed, replay) {
            const options = this.options.setContext(this.getContext());
            const active = this._active;
            let properties;
            let tooltipItems = [];
            if (!active.length) {
                if (this.opacity !== 0) properties = {
                    opacity: 0
                };
            } else {
                const position = positioners[options.position].call(this, active, this._eventPosition);
                tooltipItems = this._createItems(options);
                this.title = this.getTitle(tooltipItems, options);
                this.beforeBody = this.getBeforeBody(tooltipItems, options);
                this.body = this.getBody(tooltipItems, options);
                this.afterBody = this.getAfterBody(tooltipItems, options);
                this.footer = this.getFooter(tooltipItems, options);
                const size = this._size = getTooltipSize(this, options);
                const positionAndSize = Object.assign({}, position, size);
                const alignment = determineAlignment(this.chart, options, positionAndSize);
                const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
                this.xAlign = alignment.xAlign;
                this.yAlign = alignment.yAlign;
                properties = {
                    opacity: 1,
                    x: backgroundPoint.x,
                    y: backgroundPoint.y,
                    width: size.width,
                    height: size.height,
                    caretX: position.x,
                    caretY: position.y
                };
            }
            this._tooltipItems = tooltipItems;
            this.$context = void 0;
            if (properties) this._resolveAnimations().update(this, properties);
            if (changed && options.external) options.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay
            });
        }
        drawCaret(tooltipPoint, ctx, size, options) {
            const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
            ctx.lineTo(caretPosition.x1, caretPosition.y1);
            ctx.lineTo(caretPosition.x2, caretPosition.y2);
            ctx.lineTo(caretPosition.x3, caretPosition.y3);
        }
        getCaretPosition(tooltipPoint, size, options) {
            const {xAlign, yAlign} = this;
            const {caretSize, cornerRadius} = options;
            const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(cornerRadius);
            const {x: ptX, y: ptY} = tooltipPoint;
            const {width, height} = size;
            let x1, x2, x3, y1, y2, y3;
            if (yAlign === "center") {
                y2 = ptY + height / 2;
                if (xAlign === "left") {
                    x1 = ptX;
                    x2 = x1 - caretSize;
                    y1 = y2 + caretSize;
                    y3 = y2 - caretSize;
                } else {
                    x1 = ptX + width;
                    x2 = x1 + caretSize;
                    y1 = y2 - caretSize;
                    y3 = y2 + caretSize;
                }
                x3 = x1;
            } else {
                if (xAlign === "left") x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize; else if (xAlign === "right") x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize; else x2 = this.caretX;
                if (yAlign === "top") {
                    y1 = ptY;
                    y2 = y1 - caretSize;
                    x1 = x2 - caretSize;
                    x3 = x2 + caretSize;
                } else {
                    y1 = ptY + height;
                    y2 = y1 + caretSize;
                    x1 = x2 + caretSize;
                    x3 = x2 - caretSize;
                }
                y3 = y1;
            }
            return {
                x1,
                x2,
                x3,
                y1,
                y2,
                y3
            };
        }
        drawTitle(pt, ctx, options) {
            const title = this.title;
            const length = title.length;
            let titleFont, titleSpacing, i;
            if (length) {
                const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
                pt.x = getAlignedX(this, options.titleAlign, options);
                ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
                ctx.textBaseline = "middle";
                titleFont = toFont(options.titleFont);
                titleSpacing = options.titleSpacing;
                ctx.fillStyle = options.titleColor;
                ctx.font = titleFont.string;
                for (i = 0; i < length; ++i) {
                    ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
                    pt.y += titleFont.lineHeight + titleSpacing;
                    if (i + 1 === length) pt.y += options.titleMarginBottom - titleSpacing;
                }
            }
        }
        _drawColorBox(ctx, pt, i, rtlHelper, options) {
            const labelColor = this.labelColors[i];
            const labelPointStyle = this.labelPointStyles[i];
            const {boxHeight, boxWidth} = options;
            const bodyFont = toFont(options.bodyFont);
            const colorX = getAlignedX(this, "left", options);
            const rtlColorX = rtlHelper.x(colorX);
            const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
            const colorY = pt.y + yOffSet;
            if (options.usePointStyle) {
                const drawOptions = {
                    radius: Math.min(boxWidth, boxHeight) / 2,
                    pointStyle: labelPointStyle.pointStyle,
                    rotation: labelPointStyle.rotation,
                    borderWidth: 1
                };
                const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
                const centerY = colorY + boxHeight / 2;
                ctx.strokeStyle = options.multiKeyBackground;
                ctx.fillStyle = options.multiKeyBackground;
                drawPoint(ctx, drawOptions, centerX, centerY);
                ctx.strokeStyle = labelColor.borderColor;
                ctx.fillStyle = labelColor.backgroundColor;
                drawPoint(ctx, drawOptions, centerX, centerY);
            } else {
                ctx.lineWidth = helpers_dataset_isObject(labelColor.borderWidth) ? Math.max(...Object.values(labelColor.borderWidth)) : labelColor.borderWidth || 1;
                ctx.strokeStyle = labelColor.borderColor;
                ctx.setLineDash(labelColor.borderDash || []);
                ctx.lineDashOffset = labelColor.borderDashOffset || 0;
                const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
                const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
                const borderRadius = toTRBLCorners(labelColor.borderRadius);
                if (Object.values(borderRadius).some((v => v !== 0))) {
                    ctx.beginPath();
                    ctx.fillStyle = options.multiKeyBackground;
                    addRoundedRectPath(ctx, {
                        x: outerX,
                        y: colorY,
                        w: boxWidth,
                        h: boxHeight,
                        radius: borderRadius
                    });
                    ctx.fill();
                    ctx.stroke();
                    ctx.fillStyle = labelColor.backgroundColor;
                    ctx.beginPath();
                    addRoundedRectPath(ctx, {
                        x: innerX,
                        y: colorY + 1,
                        w: boxWidth - 2,
                        h: boxHeight - 2,
                        radius: borderRadius
                    });
                    ctx.fill();
                } else {
                    ctx.fillStyle = options.multiKeyBackground;
                    ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
                    ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
                    ctx.fillStyle = labelColor.backgroundColor;
                    ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
                }
            }
            ctx.fillStyle = this.labelTextColors[i];
        }
        drawBody(pt, ctx, options) {
            const {body} = this;
            const {bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding} = options;
            const bodyFont = toFont(options.bodyFont);
            let bodyLineHeight = bodyFont.lineHeight;
            let xLinePadding = 0;
            const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
            const fillLineOfText = function(line) {
                ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
                pt.y += bodyLineHeight + bodySpacing;
            };
            const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
            let bodyItem, textColor, lines, i, j, ilen, jlen;
            ctx.textAlign = bodyAlign;
            ctx.textBaseline = "middle";
            ctx.font = bodyFont.string;
            pt.x = getAlignedX(this, bodyAlignForCalculation, options);
            ctx.fillStyle = options.bodyColor;
            each(this.beforeBody, fillLineOfText);
            xLinePadding = displayColors && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
            for (i = 0, ilen = body.length; i < ilen; ++i) {
                bodyItem = body[i];
                textColor = this.labelTextColors[i];
                ctx.fillStyle = textColor;
                each(bodyItem.before, fillLineOfText);
                lines = bodyItem.lines;
                if (displayColors && lines.length) {
                    this._drawColorBox(ctx, pt, i, rtlHelper, options);
                    bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
                }
                for (j = 0, jlen = lines.length; j < jlen; ++j) {
                    fillLineOfText(lines[j]);
                    bodyLineHeight = bodyFont.lineHeight;
                }
                each(bodyItem.after, fillLineOfText);
            }
            xLinePadding = 0;
            bodyLineHeight = bodyFont.lineHeight;
            each(this.afterBody, fillLineOfText);
            pt.y -= bodySpacing;
        }
        drawFooter(pt, ctx, options) {
            const footer = this.footer;
            const length = footer.length;
            let footerFont, i;
            if (length) {
                const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
                pt.x = getAlignedX(this, options.footerAlign, options);
                pt.y += options.footerMarginTop;
                ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
                ctx.textBaseline = "middle";
                footerFont = toFont(options.footerFont);
                ctx.fillStyle = options.footerColor;
                ctx.font = footerFont.string;
                for (i = 0; i < length; ++i) {
                    ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
                    pt.y += footerFont.lineHeight + options.footerSpacing;
                }
            }
        }
        drawBackground(pt, ctx, tooltipSize, options) {
            const {xAlign, yAlign} = this;
            const {x, y} = pt;
            const {width, height} = tooltipSize;
            const {topLeft, topRight, bottomLeft, bottomRight} = toTRBLCorners(options.cornerRadius);
            ctx.fillStyle = options.backgroundColor;
            ctx.strokeStyle = options.borderColor;
            ctx.lineWidth = options.borderWidth;
            ctx.beginPath();
            ctx.moveTo(x + topLeft, y);
            if (yAlign === "top") this.drawCaret(pt, ctx, tooltipSize, options);
            ctx.lineTo(x + width - topRight, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
            if (yAlign === "center" && xAlign === "right") this.drawCaret(pt, ctx, tooltipSize, options);
            ctx.lineTo(x + width, y + height - bottomRight);
            ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
            if (yAlign === "bottom") this.drawCaret(pt, ctx, tooltipSize, options);
            ctx.lineTo(x + bottomLeft, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
            if (yAlign === "center" && xAlign === "left") this.drawCaret(pt, ctx, tooltipSize, options);
            ctx.lineTo(x, y + topLeft);
            ctx.quadraticCurveTo(x, y, x + topLeft, y);
            ctx.closePath();
            ctx.fill();
            if (options.borderWidth > 0) ctx.stroke();
        }
        _updateAnimationTarget(options) {
            const chart = this.chart;
            const anims = this.$animations;
            const animX = anims && anims.x;
            const animY = anims && anims.y;
            if (animX || animY) {
                const position = positioners[options.position].call(this, this._active, this._eventPosition);
                if (!position) return;
                const size = this._size = getTooltipSize(this, options);
                const positionAndSize = Object.assign({}, position, this._size);
                const alignment = determineAlignment(chart, options, positionAndSize);
                const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
                if (animX._to !== point.x || animY._to !== point.y) {
                    this.xAlign = alignment.xAlign;
                    this.yAlign = alignment.yAlign;
                    this.width = size.width;
                    this.height = size.height;
                    this.caretX = position.x;
                    this.caretY = position.y;
                    this._resolveAnimations().update(this, point);
                }
            }
        }
        _willRender() {
            return !!this.opacity;
        }
        draw(ctx) {
            const options = this.options.setContext(this.getContext());
            let opacity = this.opacity;
            if (!opacity) return;
            this._updateAnimationTarget(options);
            const tooltipSize = {
                width: this.width,
                height: this.height
            };
            const pt = {
                x: this.x,
                y: this.y
            };
            opacity = Math.abs(opacity) < .001 ? 0 : opacity;
            const padding = toPadding(options.padding);
            const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
            if (options.enabled && hasTooltipContent) {
                ctx.save();
                ctx.globalAlpha = opacity;
                this.drawBackground(pt, ctx, tooltipSize, options);
                overrideTextDirection(ctx, options.textDirection);
                pt.y += padding.top;
                this.drawTitle(pt, ctx, options);
                this.drawBody(pt, ctx, options);
                this.drawFooter(pt, ctx, options);
                restoreTextDirection(ctx, options.textDirection);
                ctx.restore();
            }
        }
        getActiveElements() {
            return this._active || [];
        }
        setActiveElements(activeElements, eventPosition) {
            const lastActive = this._active;
            const active = activeElements.map((({datasetIndex, index}) => {
                const meta = this.chart.getDatasetMeta(datasetIndex);
                if (!meta) throw new Error("Cannot find a dataset at index " + datasetIndex);
                return {
                    datasetIndex,
                    element: meta.data[index],
                    index
                };
            }));
            const changed = !_elementsEqual(lastActive, active);
            const positionChanged = this._positionChanged(active, eventPosition);
            if (changed || positionChanged) {
                this._active = active;
                this._eventPosition = eventPosition;
                this._ignoreReplayEvents = true;
                this.update(true);
            }
        }
        handleEvent(e, replay, inChartArea = true) {
            if (replay && this._ignoreReplayEvents) return false;
            this._ignoreReplayEvents = false;
            const options = this.options;
            const lastActive = this._active || [];
            const active = this._getActiveElements(e, lastActive, replay, inChartArea);
            const positionChanged = this._positionChanged(active, e);
            const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
            if (changed) {
                this._active = active;
                if (options.enabled || options.external) {
                    this._eventPosition = {
                        x: e.x,
                        y: e.y
                    };
                    this.update(true, replay);
                }
            }
            return changed;
        }
        _getActiveElements(e, lastActive, replay, inChartArea) {
            const options = this.options;
            if (e.type === "mouseout") return [];
            if (!inChartArea) return lastActive.filter((i => this.chart.data.datasets[i.datasetIndex] && this.chart.getDatasetMeta(i.datasetIndex).controller.getParsed(i.index) !== void 0));
            const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
            if (options.reverse) active.reverse();
            return active;
        }
        _positionChanged(active, e) {
            const {caretX, caretY, options} = this;
            const position = positioners[options.position].call(this, active, e);
            return position !== false && (caretX !== position.x || caretY !== position.y);
        }
    }
    var plugin_tooltip = {
        id: "tooltip",
        _element: Tooltip,
        positioners,
        afterInit(chart, _args, options) {
            if (options) chart.tooltip = new Tooltip({
                chart,
                options
            });
        },
        beforeUpdate(chart, _args, options) {
            if (chart.tooltip) chart.tooltip.initialize(options);
        },
        reset(chart, _args, options) {
            if (chart.tooltip) chart.tooltip.initialize(options);
        },
        afterDraw(chart) {
            const tooltip = chart.tooltip;
            if (tooltip && tooltip._willRender()) {
                const args = {
                    tooltip
                };
                if (chart.notifyPlugins("beforeTooltipDraw", {
                    ...args,
                    cancelable: true
                }) === false) return;
                tooltip.draw(chart.ctx);
                chart.notifyPlugins("afterTooltipDraw", args);
            }
        },
        afterEvent(chart, args) {
            if (chart.tooltip) {
                const useFinalPosition = args.replay;
                if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) args.changed = true;
            }
        },
        defaults: {
            enabled: true,
            external: null,
            position: "average",
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "#fff",
            titleFont: {
                weight: "bold"
            },
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleAlign: "left",
            bodyColor: "#fff",
            bodySpacing: 2,
            bodyFont: {},
            bodyAlign: "left",
            footerColor: "#fff",
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFont: {
                weight: "bold"
            },
            footerAlign: "left",
            padding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            boxHeight: (ctx, opts) => opts.bodyFont.size,
            boxWidth: (ctx, opts) => opts.bodyFont.size,
            multiKeyBackground: "#fff",
            displayColors: true,
            boxPadding: 0,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            animation: {
                duration: 400,
                easing: "easeOutQuart"
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: [ "x", "y", "width", "height", "caretX", "caretY" ]
                },
                opacity: {
                    easing: "linear",
                    duration: 200
                }
            },
            callbacks: defaultCallbacks
        },
        defaultRoutes: {
            bodyFont: "font",
            footerFont: "font",
            titleFont: "font"
        },
        descriptors: {
            _scriptable: name => name !== "filter" && name !== "itemSort" && name !== "external",
            _indexable: false,
            callbacks: {
                _scriptable: false,
                _indexable: false
            },
            animation: {
                _fallback: false
            },
            animations: {
                _fallback: "animation"
            }
        },
        additionalOptionScopes: [ "interaction" ]
    };
    var plugins = Object.freeze({
        __proto__: null,
        Colors: plugin_colors,
        Decimation: plugin_decimation,
        Filler: index,
        Legend: plugin_legend,
        SubTitle: plugin_subtitle,
        Title: plugin_title,
        Tooltip: plugin_tooltip
    });
    const addIfString = (labels, raw, index, addedLabels) => {
        if (typeof raw === "string") {
            index = labels.push(raw) - 1;
            addedLabels.unshift({
                index,
                label: raw
            });
        } else if (isNaN(raw)) index = null;
        return index;
    };
    function findOrAddLabel(labels, raw, index, addedLabels) {
        const first = labels.indexOf(raw);
        if (first === -1) return addIfString(labels, raw, index, addedLabels);
        const last = labels.lastIndexOf(raw);
        return first !== last ? index : first;
    }
    const validIndex = (index, max) => index === null ? null : _limitValue(Math.round(index), 0, max);
    function _getLabelForValue(value) {
        const labels = this.getLabels();
        if (value >= 0 && value < labels.length) return labels[value];
        return value;
    }
    class CategoryScale extends Scale {
        static id="category";
        static defaults={
            ticks: {
                callback: _getLabelForValue
            }
        };
        constructor(cfg) {
            super(cfg);
            this._startValue = void 0;
            this._valueRange = 0;
            this._addedLabels = [];
        }
        init(scaleOptions) {
            const added = this._addedLabels;
            if (added.length) {
                const labels = this.getLabels();
                for (const {index, label} of added) if (labels[index] === label) labels.splice(index, 1);
                this._addedLabels = [];
            }
            super.init(scaleOptions);
        }
        parse(raw, index) {
            if (isNullOrUndef(raw)) return null;
            const labels = this.getLabels();
            index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw), this._addedLabels);
            return validIndex(index, labels.length - 1);
        }
        determineDataLimits() {
            const {minDefined, maxDefined} = this.getUserBounds();
            let {min, max} = this.getMinMax(true);
            if (this.options.bounds === "ticks") {
                if (!minDefined) min = 0;
                if (!maxDefined) max = this.getLabels().length - 1;
            }
            this.min = min;
            this.max = max;
        }
        buildTicks() {
            const min = this.min;
            const max = this.max;
            const offset = this.options.offset;
            const ticks = [];
            let labels = this.getLabels();
            labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
            this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
            this._startValue = this.min - (offset ? .5 : 0);
            for (let value = min; value <= max; value++) ticks.push({
                value
            });
            return ticks;
        }
        getLabelForValue(value) {
            return _getLabelForValue.call(this, value);
        }
        configure() {
            super.configure();
            if (!this.isHorizontal()) this._reversePixels = !this._reversePixels;
        }
        getPixelForValue(value) {
            if (typeof value !== "number") value = this.parse(value);
            return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
        }
        getPixelForTick(index) {
            const ticks = this.ticks;
            if (index < 0 || index > ticks.length - 1) return null;
            return this.getPixelForValue(ticks[index].value);
        }
        getValueForPixel(pixel) {
            return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
        }
        getBasePixel() {
            return this.bottom;
        }
    }
    function generateTicks$1(generationOptions, dataRange) {
        const ticks = [];
        const MIN_SPACING = 1e-14;
        const {bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds} = generationOptions;
        const unit = step || 1;
        const maxSpaces = maxTicks - 1;
        const {min: rmin, max: rmax} = dataRange;
        const minDefined = !isNullOrUndef(min);
        const maxDefined = !isNullOrUndef(max);
        const countDefined = !isNullOrUndef(count);
        const minSpacing = (rmax - rmin) / (maxDigits + 1);
        let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
        let factor, niceMin, niceMax, numSpaces;
        if (spacing < MIN_SPACING && !minDefined && !maxDefined) return [ {
            value: rmin
        }, {
            value: rmax
        } ];
        numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
        if (numSpaces > maxSpaces) spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
        if (!isNullOrUndef(precision)) {
            factor = Math.pow(10, precision);
            spacing = Math.ceil(spacing * factor) / factor;
        }
        if (bounds === "ticks") {
            niceMin = Math.floor(rmin / spacing) * spacing;
            niceMax = Math.ceil(rmax / spacing) * spacing;
        } else {
            niceMin = rmin;
            niceMax = rmax;
        }
        if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
            numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
            spacing = (max - min) / numSpaces;
            niceMin = min;
            niceMax = max;
        } else if (countDefined) {
            niceMin = minDefined ? min : niceMin;
            niceMax = maxDefined ? max : niceMax;
            numSpaces = count - 1;
            spacing = (niceMax - niceMin) / numSpaces;
        } else {
            numSpaces = (niceMax - niceMin) / spacing;
            if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) numSpaces = Math.round(numSpaces); else numSpaces = Math.ceil(numSpaces);
        }
        const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
        factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
        niceMin = Math.round(niceMin * factor) / factor;
        niceMax = Math.round(niceMax * factor) / factor;
        let j = 0;
        if (minDefined) if (includeBounds && niceMin !== min) {
            ticks.push({
                value: min
            });
            if (niceMin < min) j++;
            if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) j++;
        } else if (niceMin < min) j++;
        for (;j < numSpaces; ++j) {
            const tickValue = Math.round((niceMin + j * spacing) * factor) / factor;
            if (maxDefined && tickValue > max) break;
            ticks.push({
                value: tickValue
            });
        }
        if (maxDefined && includeBounds && niceMax !== max) if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) ticks[ticks.length - 1].value = max; else ticks.push({
            value: max
        }); else if (!maxDefined || niceMax === max) ticks.push({
            value: niceMax
        });
        return ticks;
    }
    function relativeLabelSize(value, minSpacing, {horizontal, minRotation}) {
        const rad = toRadians(minRotation);
        const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || .001;
        const length = .75 * minSpacing * ("" + value).length;
        return Math.min(minSpacing / ratio, length);
    }
    class LinearScaleBase extends Scale {
        constructor(cfg) {
            super(cfg);
            this.start = void 0;
            this.end = void 0;
            this._startValue = void 0;
            this._endValue = void 0;
            this._valueRange = 0;
        }
        parse(raw, index) {
            if (isNullOrUndef(raw)) return null;
            if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) return null;
            return +raw;
        }
        handleTickRangeOptions() {
            const {beginAtZero} = this.options;
            const {minDefined, maxDefined} = this.getUserBounds();
            let {min, max} = this;
            const setMin = v => min = minDefined ? min : v;
            const setMax = v => max = maxDefined ? max : v;
            if (beginAtZero) {
                const minSign = helpers_dataset_sign(min);
                const maxSign = helpers_dataset_sign(max);
                if (minSign < 0 && maxSign < 0) setMax(0); else if (minSign > 0 && maxSign > 0) setMin(0);
            }
            if (min === max) {
                let offset = max === 0 ? 1 : Math.abs(max * .05);
                setMax(max + offset);
                if (!beginAtZero) setMin(min - offset);
            }
            this.min = min;
            this.max = max;
        }
        getTickLimit() {
            const tickOpts = this.options.ticks;
            let {maxTicksLimit, stepSize} = tickOpts;
            let maxTicks;
            if (stepSize) {
                maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
                if (maxTicks > 1e3) {
                    console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
                    maxTicks = 1e3;
                }
            } else {
                maxTicks = this.computeTickLimit();
                maxTicksLimit = maxTicksLimit || 11;
            }
            if (maxTicksLimit) maxTicks = Math.min(maxTicksLimit, maxTicks);
            return maxTicks;
        }
        computeTickLimit() {
            return Number.POSITIVE_INFINITY;
        }
        buildTicks() {
            const opts = this.options;
            const tickOpts = opts.ticks;
            let maxTicks = this.getTickLimit();
            maxTicks = Math.max(2, maxTicks);
            const numericGeneratorOptions = {
                maxTicks,
                bounds: opts.bounds,
                min: opts.min,
                max: opts.max,
                precision: tickOpts.precision,
                step: tickOpts.stepSize,
                count: tickOpts.count,
                maxDigits: this._maxDigits(),
                horizontal: this.isHorizontal(),
                minRotation: tickOpts.minRotation || 0,
                includeBounds: tickOpts.includeBounds !== false
            };
            const dataRange = this._range || this;
            const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
            if (opts.bounds === "ticks") _setMinAndMaxByKey(ticks, this, "value");
            if (opts.reverse) {
                ticks.reverse();
                this.start = this.max;
                this.end = this.min;
            } else {
                this.start = this.min;
                this.end = this.max;
            }
            return ticks;
        }
        configure() {
            const ticks = this.ticks;
            let start = this.min;
            let end = this.max;
            super.configure();
            if (this.options.offset && ticks.length) {
                const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
                start -= offset;
                end += offset;
            }
            this._startValue = start;
            this._endValue = end;
            this._valueRange = end - start;
        }
        getLabelForValue(value) {
            return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
        }
    }
    class LinearScale extends LinearScaleBase {
        static id="linear";
        static defaults={
            ticks: {
                callback: Ticks.formatters.numeric
            }
        };
        determineDataLimits() {
            const {min, max} = this.getMinMax(true);
            this.min = isNumberFinite(min) ? min : 0;
            this.max = isNumberFinite(max) ? max : 1;
            this.handleTickRangeOptions();
        }
        computeTickLimit() {
            const horizontal = this.isHorizontal();
            const length = horizontal ? this.width : this.height;
            const minRotation = toRadians(this.options.ticks.minRotation);
            const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || .001;
            const tickFont = this._resolveTickFontOptions(0);
            return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
        }
        getPixelForValue(value) {
            return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
        }
        getValueForPixel(pixel) {
            return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
        }
    }
    const log10Floor = v => Math.floor(log10(v));
    const changeExponent = (v, m) => Math.pow(10, log10Floor(v) + m);
    function isMajor(tickVal) {
        const remain = tickVal / Math.pow(10, log10Floor(tickVal));
        return remain === 1;
    }
    function steps(min, max, rangeExp) {
        const rangeStep = Math.pow(10, rangeExp);
        const start = Math.floor(min / rangeStep);
        const end = Math.ceil(max / rangeStep);
        return end - start;
    }
    function startExp(min, max) {
        const range = max - min;
        let rangeExp = log10Floor(range);
        while (steps(min, max, rangeExp) > 10) rangeExp++;
        while (steps(min, max, rangeExp) < 10) rangeExp--;
        return Math.min(rangeExp, log10Floor(min));
    }
    function generateTicks(generationOptions, {min, max}) {
        min = finiteOrDefault(generationOptions.min, min);
        const ticks = [];
        const minExp = log10Floor(min);
        let exp = startExp(min, max);
        let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
        const stepSize = Math.pow(10, exp);
        const base = minExp > exp ? Math.pow(10, minExp) : 0;
        const start = Math.round((min - base) * precision) / precision;
        const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
        let significand = Math.floor((start - offset) / Math.pow(10, exp));
        let value = finiteOrDefault(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
        while (value < max) {
            ticks.push({
                value,
                major: isMajor(value),
                significand
            });
            if (significand >= 10) significand = significand < 15 ? 15 : 20; else significand++;
            if (significand >= 20) {
                exp++;
                significand = 2;
                precision = exp >= 0 ? 1 : precision;
            }
            value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
        }
        const lastTick = finiteOrDefault(generationOptions.max, value);
        ticks.push({
            value: lastTick,
            major: isMajor(lastTick),
            significand
        });
        return ticks;
    }
    class LogarithmicScale extends Scale {
        static id="logarithmic";
        static defaults={
            ticks: {
                callback: Ticks.formatters.logarithmic,
                major: {
                    enabled: true
                }
            }
        };
        constructor(cfg) {
            super(cfg);
            this.start = void 0;
            this.end = void 0;
            this._startValue = void 0;
            this._valueRange = 0;
        }
        parse(raw, index) {
            const value = LinearScaleBase.prototype.parse.apply(this, [ raw, index ]);
            if (value === 0) {
                this._zero = true;
                return;
            }
            return isNumberFinite(value) && value > 0 ? value : null;
        }
        determineDataLimits() {
            const {min, max} = this.getMinMax(true);
            this.min = isNumberFinite(min) ? Math.max(0, min) : null;
            this.max = isNumberFinite(max) ? Math.max(0, max) : null;
            if (this.options.beginAtZero) this._zero = true;
            if (this._zero && this.min !== this._suggestedMin && !isNumberFinite(this._userMin)) this.min = min === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
            this.handleTickRangeOptions();
        }
        handleTickRangeOptions() {
            const {minDefined, maxDefined} = this.getUserBounds();
            let min = this.min;
            let max = this.max;
            const setMin = v => min = minDefined ? min : v;
            const setMax = v => max = maxDefined ? max : v;
            if (min === max) if (min <= 0) {
                setMin(1);
                setMax(10);
            } else {
                setMin(changeExponent(min, -1));
                setMax(changeExponent(max, +1));
            }
            if (min <= 0) setMin(changeExponent(max, -1));
            if (max <= 0) setMax(changeExponent(min, +1));
            this.min = min;
            this.max = max;
        }
        buildTicks() {
            const opts = this.options;
            const generationOptions = {
                min: this._userMin,
                max: this._userMax
            };
            const ticks = generateTicks(generationOptions, this);
            if (opts.bounds === "ticks") _setMinAndMaxByKey(ticks, this, "value");
            if (opts.reverse) {
                ticks.reverse();
                this.start = this.max;
                this.end = this.min;
            } else {
                this.start = this.min;
                this.end = this.max;
            }
            return ticks;
        }
        getLabelForValue(value) {
            return value === void 0 ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
        }
        configure() {
            const start = this.min;
            super.configure();
            this._startValue = log10(start);
            this._valueRange = log10(this.max) - log10(start);
        }
        getPixelForValue(value) {
            if (value === void 0 || value === 0) value = this.min;
            if (value === null || isNaN(value)) return NaN;
            return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
        }
        getValueForPixel(pixel) {
            const decimal = this.getDecimalForPixel(pixel);
            return Math.pow(10, this._startValue + decimal * this._valueRange);
        }
    }
    function getTickBackdropHeight(opts) {
        const tickOpts = opts.ticks;
        if (tickOpts.display && opts.display) {
            const padding = toPadding(tickOpts.backdropPadding);
            return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
        }
        return 0;
    }
    function measureLabelSize(ctx, font, label) {
        label = helpers_dataset_isArray(label) ? label : [ label ];
        return {
            w: _longestText(ctx, font.string, label),
            h: label.length * font.lineHeight
        };
    }
    function determineLimits(angle, pos, size, min, max) {
        if (angle === min || angle === max) return {
            start: pos - size / 2,
            end: pos + size / 2
        }; else if (angle < min || angle > max) return {
            start: pos - size,
            end: pos
        };
        return {
            start: pos,
            end: pos + size
        };
    }
    function fitWithPointLabels(scale) {
        const orig = {
            l: scale.left + scale._padding.left,
            r: scale.right - scale._padding.right,
            t: scale.top + scale._padding.top,
            b: scale.bottom - scale._padding.bottom
        };
        const limits = Object.assign({}, orig);
        const labelSizes = [];
        const padding = [];
        const valueCount = scale._pointLabels.length;
        const pointLabelOpts = scale.options.pointLabels;
        const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
        for (let i = 0; i < valueCount; i++) {
            const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
            padding[i] = opts.padding;
            const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
            const plFont = toFont(opts.font);
            const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
            labelSizes[i] = textSize;
            const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
            const angle = Math.round(toDegrees(angleRadians));
            const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
            const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
            updateLimits(limits, orig, angleRadians, hLimits, vLimits);
        }
        scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
        scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
    }
    function updateLimits(limits, orig, angle, hLimits, vLimits) {
        const sin = Math.abs(Math.sin(angle));
        const cos = Math.abs(Math.cos(angle));
        let x = 0;
        let y = 0;
        if (hLimits.start < orig.l) {
            x = (orig.l - hLimits.start) / sin;
            limits.l = Math.min(limits.l, orig.l - x);
        } else if (hLimits.end > orig.r) {
            x = (hLimits.end - orig.r) / sin;
            limits.r = Math.max(limits.r, orig.r + x);
        }
        if (vLimits.start < orig.t) {
            y = (orig.t - vLimits.start) / cos;
            limits.t = Math.min(limits.t, orig.t - y);
        } else if (vLimits.end > orig.b) {
            y = (vLimits.end - orig.b) / cos;
            limits.b = Math.max(limits.b, orig.b + y);
        }
    }
    function createPointLabelItem(scale, index, itemOpts) {
        const outerDistance = scale.drawingArea;
        const {extra, additionalAngle, padding, size} = itemOpts;
        const pointLabelPosition = scale.getPointPosition(index, outerDistance + extra + padding, additionalAngle);
        const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
        const y = yForAngle(pointLabelPosition.y, size.h, angle);
        const textAlign = getTextAlignForAngle(angle);
        const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
        return {
            visible: true,
            x: pointLabelPosition.x,
            y,
            textAlign,
            left,
            top: y,
            right: left + size.w,
            bottom: y + size.h
        };
    }
    function isNotOverlapped(item, area) {
        if (!area) return true;
        const {left, top, right, bottom} = item;
        const apexesInArea = _isPointInArea({
            x: left,
            y: top
        }, area) || _isPointInArea({
            x: left,
            y: bottom
        }, area) || _isPointInArea({
            x: right,
            y: top
        }, area) || _isPointInArea({
            x: right,
            y: bottom
        }, area);
        return !apexesInArea;
    }
    function buildPointLabelItems(scale, labelSizes, padding) {
        const items = [];
        const valueCount = scale._pointLabels.length;
        const opts = scale.options;
        const {centerPointLabels, display} = opts.pointLabels;
        const itemOpts = {
            extra: getTickBackdropHeight(opts) / 2,
            additionalAngle: centerPointLabels ? PI / valueCount : 0
        };
        let area;
        for (let i = 0; i < valueCount; i++) {
            itemOpts.padding = padding[i];
            itemOpts.size = labelSizes[i];
            const item = createPointLabelItem(scale, i, itemOpts);
            items.push(item);
            if (display === "auto") {
                item.visible = isNotOverlapped(item, area);
                if (item.visible) area = item;
            }
        }
        return items;
    }
    function getTextAlignForAngle(angle) {
        if (angle === 0 || angle === 180) return "center"; else if (angle < 180) return "left";
        return "right";
    }
    function leftForTextAlign(x, w, align) {
        if (align === "right") x -= w; else if (align === "center") x -= w / 2;
        return x;
    }
    function yForAngle(y, h, angle) {
        if (angle === 90 || angle === 270) y -= h / 2; else if (angle > 270 || angle < 90) y -= h;
        return y;
    }
    function drawPointLabelBox(ctx, opts, item) {
        const {left, top, right, bottom} = item;
        const {backdropColor} = opts;
        if (!isNullOrUndef(backdropColor)) {
            const borderRadius = toTRBLCorners(opts.borderRadius);
            const padding = toPadding(opts.backdropPadding);
            ctx.fillStyle = backdropColor;
            const backdropLeft = left - padding.left;
            const backdropTop = top - padding.top;
            const backdropWidth = right - left + padding.width;
            const backdropHeight = bottom - top + padding.height;
            if (Object.values(borderRadius).some((v => v !== 0))) {
                ctx.beginPath();
                addRoundedRectPath(ctx, {
                    x: backdropLeft,
                    y: backdropTop,
                    w: backdropWidth,
                    h: backdropHeight,
                    radius: borderRadius
                });
                ctx.fill();
            } else ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
        }
    }
    function drawPointLabels(scale, labelCount) {
        const {ctx, options: {pointLabels}} = scale;
        for (let i = labelCount - 1; i >= 0; i--) {
            const item = scale._pointLabelItems[i];
            if (!item.visible) continue;
            const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
            drawPointLabelBox(ctx, optsAtIndex, item);
            const plFont = toFont(optsAtIndex.font);
            const {x, y, textAlign} = item;
            renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
                color: optsAtIndex.color,
                textAlign,
                textBaseline: "middle"
            });
        }
    }
    function pathRadiusLine(scale, radius, circular, labelCount) {
        const {ctx} = scale;
        if (circular) ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU); else {
            let pointPosition = scale.getPointPosition(0, radius);
            ctx.moveTo(pointPosition.x, pointPosition.y);
            for (let i = 1; i < labelCount; i++) {
                pointPosition = scale.getPointPosition(i, radius);
                ctx.lineTo(pointPosition.x, pointPosition.y);
            }
        }
    }
    function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
        const ctx = scale.ctx;
        const circular = gridLineOpts.circular;
        const {color, lineWidth} = gridLineOpts;
        if (!circular && !labelCount || !color || !lineWidth || radius < 0) return;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash(borderOpts.dash || []);
        ctx.lineDashOffset = borderOpts.dashOffset;
        ctx.beginPath();
        pathRadiusLine(scale, radius, circular, labelCount);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    function createPointLabelContext(parent, index, label) {
        return createContext(parent, {
            label,
            index,
            type: "pointLabel"
        });
    }
    class RadialLinearScale extends LinearScaleBase {
        static id="radialLinear";
        static defaults={
            display: true,
            animate: true,
            position: "chartArea",
            angleLines: {
                display: true,
                lineWidth: 1,
                borderDash: [],
                borderDashOffset: 0
            },
            grid: {
                circular: false
            },
            startAngle: 0,
            ticks: {
                showLabelBackdrop: true,
                callback: Ticks.formatters.numeric
            },
            pointLabels: {
                backdropColor: void 0,
                backdropPadding: 2,
                display: true,
                font: {
                    size: 10
                },
                callback(label) {
                    return label;
                },
                padding: 5,
                centerPointLabels: false
            }
        };
        static defaultRoutes={
            "angleLines.color": "borderColor",
            "pointLabels.color": "color",
            "ticks.color": "color"
        };
        static descriptors={
            angleLines: {
                _fallback: "grid"
            }
        };
        constructor(cfg) {
            super(cfg);
            this.xCenter = void 0;
            this.yCenter = void 0;
            this.drawingArea = void 0;
            this._pointLabels = [];
            this._pointLabelItems = [];
        }
        setDimensions() {
            const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
            const w = this.width = this.maxWidth - padding.width;
            const h = this.height = this.maxHeight - padding.height;
            this.xCenter = Math.floor(this.left + w / 2 + padding.left);
            this.yCenter = Math.floor(this.top + h / 2 + padding.top);
            this.drawingArea = Math.floor(Math.min(w, h) / 2);
        }
        determineDataLimits() {
            const {min, max} = this.getMinMax(false);
            this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
            this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
            this.handleTickRangeOptions();
        }
        computeTickLimit() {
            return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
        }
        generateTickLabels(ticks) {
            LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
            this._pointLabels = this.getLabels().map(((value, index) => {
                const label = callback(this.options.pointLabels.callback, [ value, index ], this);
                return label || label === 0 ? label : "";
            })).filter(((v, i) => this.chart.getDataVisibility(i)));
        }
        fit() {
            const opts = this.options;
            if (opts.display && opts.pointLabels.display) fitWithPointLabels(this); else this.setCenterPoint(0, 0, 0, 0);
        }
        setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
            this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
            this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
            this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
        }
        getIndexAngle(index) {
            const angleMultiplier = TAU / (this._pointLabels.length || 1);
            const startAngle = this.options.startAngle || 0;
            return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
        }
        getDistanceFromCenterForValue(value) {
            if (isNullOrUndef(value)) return NaN;
            const scalingFactor = this.drawingArea / (this.max - this.min);
            if (this.options.reverse) return (this.max - value) * scalingFactor;
            return (value - this.min) * scalingFactor;
        }
        getValueForDistanceFromCenter(distance) {
            if (isNullOrUndef(distance)) return NaN;
            const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
            return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
        }
        getPointLabelContext(index) {
            const pointLabels = this._pointLabels || [];
            if (index >= 0 && index < pointLabels.length) {
                const pointLabel = pointLabels[index];
                return createPointLabelContext(this.getContext(), index, pointLabel);
            }
        }
        getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
            const angle = this.getIndexAngle(index) - HALF_PI + additionalAngle;
            return {
                x: Math.cos(angle) * distanceFromCenter + this.xCenter,
                y: Math.sin(angle) * distanceFromCenter + this.yCenter,
                angle
            };
        }
        getPointPositionForValue(index, value) {
            return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
        }
        getBasePosition(index) {
            return this.getPointPositionForValue(index || 0, this.getBaseValue());
        }
        getPointLabelPosition(index) {
            const {left, top, right, bottom} = this._pointLabelItems[index];
            return {
                left,
                top,
                right,
                bottom
            };
        }
        drawBackground() {
            const {backgroundColor, grid: {circular}} = this.options;
            if (backgroundColor) {
                const ctx = this.ctx;
                ctx.save();
                ctx.beginPath();
                pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
                ctx.closePath();
                ctx.fillStyle = backgroundColor;
                ctx.fill();
                ctx.restore();
            }
        }
        drawGrid() {
            const ctx = this.ctx;
            const opts = this.options;
            const {angleLines, grid, border} = opts;
            const labelCount = this._pointLabels.length;
            let i, offset, position;
            if (opts.pointLabels.display) drawPointLabels(this, labelCount);
            if (grid.display) this.ticks.forEach(((tick, index) => {
                if (index !== 0 || index === 0 && this.min < 0) {
                    offset = this.getDistanceFromCenterForValue(tick.value);
                    const context = this.getContext(index);
                    const optsAtIndex = grid.setContext(context);
                    const optsAtIndexBorder = border.setContext(context);
                    drawRadiusLine(this, optsAtIndex, offset, labelCount, optsAtIndexBorder);
                }
            }));
            if (angleLines.display) {
                ctx.save();
                for (i = labelCount - 1; i >= 0; i--) {
                    const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
                    const {color, lineWidth} = optsAtIndex;
                    if (!lineWidth || !color) continue;
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = color;
                    ctx.setLineDash(optsAtIndex.borderDash);
                    ctx.lineDashOffset = optsAtIndex.borderDashOffset;
                    offset = this.getDistanceFromCenterForValue(opts.reverse ? this.min : this.max);
                    position = this.getPointPosition(i, offset);
                    ctx.beginPath();
                    ctx.moveTo(this.xCenter, this.yCenter);
                    ctx.lineTo(position.x, position.y);
                    ctx.stroke();
                }
                ctx.restore();
            }
        }
        drawBorder() {}
        drawLabels() {
            const ctx = this.ctx;
            const opts = this.options;
            const tickOpts = opts.ticks;
            if (!tickOpts.display) return;
            const startAngle = this.getIndexAngle(0);
            let offset, width;
            ctx.save();
            ctx.translate(this.xCenter, this.yCenter);
            ctx.rotate(startAngle);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            this.ticks.forEach(((tick, index) => {
                if (index === 0 && this.min >= 0 && !opts.reverse) return;
                const optsAtIndex = tickOpts.setContext(this.getContext(index));
                const tickFont = toFont(optsAtIndex.font);
                offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
                if (optsAtIndex.showLabelBackdrop) {
                    ctx.font = tickFont.string;
                    width = ctx.measureText(tick.label).width;
                    ctx.fillStyle = optsAtIndex.backdropColor;
                    const padding = toPadding(optsAtIndex.backdropPadding);
                    ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
                }
                renderText(ctx, tick.label, 0, -offset, tickFont, {
                    color: optsAtIndex.color,
                    strokeColor: optsAtIndex.textStrokeColor,
                    strokeWidth: optsAtIndex.textStrokeWidth
                });
            }));
            ctx.restore();
        }
        drawTitle() {}
    }
    const INTERVALS = {
        millisecond: {
            common: true,
            size: 1,
            steps: 1e3
        },
        second: {
            common: true,
            size: 1e3,
            steps: 60
        },
        minute: {
            common: true,
            size: 6e4,
            steps: 60
        },
        hour: {
            common: true,
            size: 36e5,
            steps: 24
        },
        day: {
            common: true,
            size: 864e5,
            steps: 30
        },
        week: {
            common: false,
            size: 6048e5,
            steps: 4
        },
        month: {
            common: true,
            size: 2628e6,
            steps: 12
        },
        quarter: {
            common: false,
            size: 7884e6,
            steps: 4
        },
        year: {
            common: true,
            size: 3154e7
        }
    };
    const UNITS = Object.keys(INTERVALS);
    function sorter(a, b) {
        return a - b;
    }
    function parse(scale, input) {
        if (isNullOrUndef(input)) return null;
        const adapter = scale._adapter;
        const {parser, round, isoWeekday} = scale._parseOpts;
        let value = input;
        if (typeof parser === "function") value = parser(value);
        if (!isNumberFinite(value)) value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
        if (value === null) return null;
        if (round) value = round === "week" && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round);
        return +value;
    }
    function determineUnitForAutoTicks(minUnit, min, max, capacity) {
        const ilen = UNITS.length;
        for (let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
            const interval = INTERVALS[UNITS[i]];
            const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
            if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) return UNITS[i];
        }
        return UNITS[ilen - 1];
    }
    function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
        for (let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
            const unit = UNITS[i];
            if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) return unit;
        }
        return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
    }
    function determineMajorUnit(unit) {
        for (let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) if (INTERVALS[UNITS[i]].common) return UNITS[i];
    }
    function addTick(ticks, time, timestamps) {
        if (!timestamps) ticks[time] = true; else if (timestamps.length) {
            const {lo, hi} = _lookup(timestamps, time);
            const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
            ticks[timestamp] = true;
        }
    }
    function setMajorTicks(scale, ticks, map, majorUnit) {
        const adapter = scale._adapter;
        const first = +adapter.startOf(ticks[0].value, majorUnit);
        const last = ticks[ticks.length - 1].value;
        let major, index;
        for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
            index = map[major];
            if (index >= 0) ticks[index].major = true;
        }
        return ticks;
    }
    function ticksFromTimestamps(scale, values, majorUnit) {
        const ticks = [];
        const map = {};
        const ilen = values.length;
        let i, value;
        for (i = 0; i < ilen; ++i) {
            value = values[i];
            map[value] = i;
            ticks.push({
                value,
                major: false
            });
        }
        return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
    }
    class TimeScale extends Scale {
        static id="time";
        static defaults={
            bounds: "data",
            adapters: {},
            time: {
                parser: false,
                unit: false,
                round: false,
                isoWeekday: false,
                minUnit: "millisecond",
                displayFormats: {}
            },
            ticks: {
                source: "auto",
                callback: false,
                major: {
                    enabled: false
                }
            }
        };
        constructor(props) {
            super(props);
            this._cache = {
                data: [],
                labels: [],
                all: []
            };
            this._unit = "day";
            this._majorUnit = void 0;
            this._offsets = {};
            this._normalized = false;
            this._parseOpts = void 0;
        }
        init(scaleOpts, opts = {}) {
            const time = scaleOpts.time || (scaleOpts.time = {});
            const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
            adapter.init(opts);
            mergeIf(time.displayFormats, adapter.formats());
            this._parseOpts = {
                parser: time.parser,
                round: time.round,
                isoWeekday: time.isoWeekday
            };
            super.init(scaleOpts);
            this._normalized = opts.normalized;
        }
        parse(raw, index) {
            if (raw === void 0) return null;
            return parse(this, raw);
        }
        beforeLayout() {
            super.beforeLayout();
            this._cache = {
                data: [],
                labels: [],
                all: []
            };
        }
        determineDataLimits() {
            const options = this.options;
            const adapter = this._adapter;
            const unit = options.time.unit || "day";
            let {min, max, minDefined, maxDefined} = this.getUserBounds();
            function _applyBounds(bounds) {
                if (!minDefined && !isNaN(bounds.min)) min = Math.min(min, bounds.min);
                if (!maxDefined && !isNaN(bounds.max)) max = Math.max(max, bounds.max);
            }
            if (!minDefined || !maxDefined) {
                _applyBounds(this._getLabelBounds());
                if (options.bounds !== "ticks" || options.ticks.source !== "labels") _applyBounds(this.getMinMax(false));
            }
            min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
            max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
            this.min = Math.min(min, max - 1);
            this.max = Math.max(min + 1, max);
        }
        _getLabelBounds() {
            const arr = this.getLabelTimestamps();
            let min = Number.POSITIVE_INFINITY;
            let max = Number.NEGATIVE_INFINITY;
            if (arr.length) {
                min = arr[0];
                max = arr[arr.length - 1];
            }
            return {
                min,
                max
            };
        }
        buildTicks() {
            const options = this.options;
            const timeOpts = options.time;
            const tickOpts = options.ticks;
            const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
            if (options.bounds === "ticks" && timestamps.length) {
                this.min = this._userMin || timestamps[0];
                this.max = this._userMax || timestamps[timestamps.length - 1];
            }
            const min = this.min;
            const max = this.max;
            const ticks = _filterBetween(timestamps, min, max);
            this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
            this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
            this.initOffsets(timestamps);
            if (options.reverse) ticks.reverse();
            return ticksFromTimestamps(this, ticks, this._majorUnit);
        }
        afterAutoSkip() {
            if (this.options.offsetAfterAutoskip) this.initOffsets(this.ticks.map((tick => +tick.value)));
        }
        initOffsets(timestamps = []) {
            let start = 0;
            let end = 0;
            let first, last;
            if (this.options.offset && timestamps.length) {
                first = this.getDecimalForValue(timestamps[0]);
                if (timestamps.length === 1) start = 1 - first; else start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
                last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
                if (timestamps.length === 1) end = last; else end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
            }
            const limit = timestamps.length < 3 ? .5 : .25;
            start = _limitValue(start, 0, limit);
            end = _limitValue(end, 0, limit);
            this._offsets = {
                start,
                end,
                factor: 1 / (start + 1 + end)
            };
        }
        _generate() {
            const adapter = this._adapter;
            const min = this.min;
            const max = this.max;
            const options = this.options;
            const timeOpts = options.time;
            const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
            const stepSize = valueOrDefault(options.ticks.stepSize, 1);
            const weekday = minor === "week" ? timeOpts.isoWeekday : false;
            const hasWeekday = isNumber(weekday) || weekday === true;
            const ticks = {};
            let first = min;
            let time, count;
            if (hasWeekday) first = +adapter.startOf(first, "isoWeek", weekday);
            first = +adapter.startOf(first, hasWeekday ? "day" : minor);
            if (adapter.diff(max, min, minor) > 1e5 * stepSize) throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
            const timestamps = options.ticks.source === "data" && this.getDataTimestamps();
            for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), 
            count++) addTick(ticks, time, timestamps);
            if (time === max || options.bounds === "ticks" || count === 1) addTick(ticks, time, timestamps);
            return Object.keys(ticks).sort(sorter).map((x => +x));
        }
        getLabelForValue(value) {
            const adapter = this._adapter;
            const timeOpts = this.options.time;
            if (timeOpts.tooltipFormat) return adapter.format(value, timeOpts.tooltipFormat);
            return adapter.format(value, timeOpts.displayFormats.datetime);
        }
        format(value, format) {
            const options = this.options;
            const formats = options.time.displayFormats;
            const unit = this._unit;
            const fmt = format || formats[unit];
            return this._adapter.format(value, fmt);
        }
        _tickFormatFunction(time, index, ticks, format) {
            const options = this.options;
            const formatter = options.ticks.callback;
            if (formatter) return callback(formatter, [ time, index, ticks ], this);
            const formats = options.time.displayFormats;
            const unit = this._unit;
            const majorUnit = this._majorUnit;
            const minorFormat = unit && formats[unit];
            const majorFormat = majorUnit && formats[majorUnit];
            const tick = ticks[index];
            const major = majorUnit && majorFormat && tick && tick.major;
            return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
        }
        generateTickLabels(ticks) {
            let i, ilen, tick;
            for (i = 0, ilen = ticks.length; i < ilen; ++i) {
                tick = ticks[i];
                tick.label = this._tickFormatFunction(tick.value, i, ticks);
            }
        }
        getDecimalForValue(value) {
            return value === null ? NaN : (value - this.min) / (this.max - this.min);
        }
        getPixelForValue(value) {
            const offsets = this._offsets;
            const pos = this.getDecimalForValue(value);
            return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
        }
        getValueForPixel(pixel) {
            const offsets = this._offsets;
            const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
            return this.min + pos * (this.max - this.min);
        }
        _getLabelSize(label) {
            const ticksOpts = this.options.ticks;
            const tickLabelWidth = this.ctx.measureText(label).width;
            const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
            const cosRotation = Math.cos(angle);
            const sinRotation = Math.sin(angle);
            const tickFontSize = this._resolveTickFontOptions(0).size;
            return {
                w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
                h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
            };
        }
        _getLabelCapacity(exampleTime) {
            const timeOpts = this.options.time;
            const displayFormats = timeOpts.displayFormats;
            const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
            const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [ exampleTime ], this._majorUnit), format);
            const size = this._getLabelSize(exampleLabel);
            const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
            return capacity > 0 ? capacity : 1;
        }
        getDataTimestamps() {
            let timestamps = this._cache.data || [];
            let i, ilen;
            if (timestamps.length) return timestamps;
            const metas = this.getMatchingVisibleMetas();
            if (this._normalized && metas.length) return this._cache.data = metas[0].controller.getAllParsedValues(this);
            for (i = 0, ilen = metas.length; i < ilen; ++i) timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
            return this._cache.data = this.normalize(timestamps);
        }
        getLabelTimestamps() {
            const timestamps = this._cache.labels || [];
            let i, ilen;
            if (timestamps.length) return timestamps;
            const labels = this.getLabels();
            for (i = 0, ilen = labels.length; i < ilen; ++i) timestamps.push(parse(this, labels[i]));
            return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
        }
        normalize(values) {
            return _arrayUnique(values.sort(sorter));
        }
    }
    function chart_interpolate(table, val, reverse) {
        let lo = 0;
        let hi = table.length - 1;
        let prevSource, nextSource, prevTarget, nextTarget;
        if (reverse) {
            if (val >= table[lo].pos && val <= table[hi].pos) ({lo, hi} = _lookupByKey(table, "pos", val));
            ({pos: prevSource, time: prevTarget} = table[lo]);
            ({pos: nextSource, time: nextTarget} = table[hi]);
        } else {
            if (val >= table[lo].time && val <= table[hi].time) ({lo, hi} = _lookupByKey(table, "time", val));
            ({time: prevSource, pos: prevTarget} = table[lo]);
            ({time: nextSource, pos: nextTarget} = table[hi]);
        }
        const span = nextSource - prevSource;
        return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
    }
    class TimeSeriesScale extends TimeScale {
        static id="timeseries";
        static defaults=TimeScale.defaults;
        constructor(props) {
            super(props);
            this._table = [];
            this._minPos = void 0;
            this._tableRange = void 0;
        }
        initOffsets() {
            const timestamps = this._getTimestampsForTable();
            const table = this._table = this.buildLookupTable(timestamps);
            this._minPos = chart_interpolate(table, this.min);
            this._tableRange = chart_interpolate(table, this.max) - this._minPos;
            super.initOffsets(timestamps);
        }
        buildLookupTable(timestamps) {
            const {min, max} = this;
            const items = [];
            const table = [];
            let i, ilen, prev, curr, next;
            for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
                curr = timestamps[i];
                if (curr >= min && curr <= max) items.push(curr);
            }
            if (items.length < 2) return [ {
                time: min,
                pos: 0
            }, {
                time: max,
                pos: 1
            } ];
            for (i = 0, ilen = items.length; i < ilen; ++i) {
                next = items[i + 1];
                prev = items[i - 1];
                curr = items[i];
                if (Math.round((next + prev) / 2) !== curr) table.push({
                    time: curr,
                    pos: i / (ilen - 1)
                });
            }
            return table;
        }
        _generate() {
            const min = this.min;
            const max = this.max;
            let timestamps = super.getDataTimestamps();
            if (!timestamps.includes(min) || !timestamps.length) timestamps.splice(0, 0, min);
            if (!timestamps.includes(max) || timestamps.length === 1) timestamps.push(max);
            return timestamps.sort(((a, b) => a - b));
        }
        _getTimestampsForTable() {
            let timestamps = this._cache.all || [];
            if (timestamps.length) return timestamps;
            const data = this.getDataTimestamps();
            const label = this.getLabelTimestamps();
            if (data.length && label.length) timestamps = this.normalize(data.concat(label)); else timestamps = data.length ? data : label;
            timestamps = this._cache.all = timestamps;
            return timestamps;
        }
        getDecimalForValue(value) {
            return (chart_interpolate(this._table, value) - this._minPos) / this._tableRange;
        }
        getValueForPixel(pixel) {
            const offsets = this._offsets;
            const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
            return chart_interpolate(this._table, decimal * this._tableRange + this._minPos, true);
        }
    }
    var scales = Object.freeze({
        __proto__: null,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale
    });
    const registerables = [ controllers, chart_elements, plugins, scales ];
    Chart.register(...registerables);
    const auto = Chart;
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
        if (e.target.closest("[data-emoji-btn]")) {
            const btn = e.target.closest("[data-emoji-btn]");
            const wrapper = btn.closest("[data-emoji-wrapper]");
            wrapper.classList.toggle("emoji-open");
        } else if (!e.target.closest("[data-emoji-block]") && document.querySelector("[data-emoji-wrapper]")) {
            const emojiWrappers = document.querySelectorAll("[data-emoji-wrapper]");
            emojiWrappers.forEach((wrapper => {
                wrapper.classList.remove("emoji-open");
            }));
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
            const grid = new Muuri(container, {
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
    const finnickInputs = document.querySelectorAll(".finnick__input");
    if (finnickInputs) finnickInputs.forEach((input => {
        input.addEventListener("focus", (e => {
            const root = e.target.closest(".finnick");
            if (root) root.classList.add("--open");
        }));
        input.addEventListener("blur", (e => {
            const root = e.target.closest(".finnick");
            if (root) root.classList.remove("--open");
        }));
    }));
    const emojiBlocks = document.querySelectorAll("[data-emoji-block]");
    if (emojiBlocks) emojiBlocks.forEach((emojiBlock => {
        const picker = new emoji_popover_es({
            container: "[data-emoji-block]",
            button: "[data-emoji-btn]",
            targetElement: "[data-emoji-input]",
            emojiList: [ {
                value: "🤣",
                label: "laugh and cry"
            }, {
                value: "😀",
                label: "grinning face"
            }, {
                value: "😁",
                label: "beaming smile"
            }, {
                value: "😂",
                label: "joy tears"
            }, {
                value: "😅",
                label: "relieved laugh"
            }, {
                value: "😊",
                label: "smiling"
            }, {
                value: "😇",
                label: "innocent"
            }, {
                value: "😍",
                label: "heart eyes"
            }, {
                value: "😘",
                label: "kiss"
            }, {
                value: "😎",
                label: "cool"
            }, {
                value: "🤩",
                label: "star eyes"
            }, {
                value: "🤔",
                label: "thinking"
            }, {
                value: "😐",
                label: "neutral"
            }, {
                value: "😴",
                label: "sleepy"
            }, {
                value: "😢",
                label: "crying"
            }, {
                value: "😭",
                label: "loudly crying"
            }, {
                value: "😡",
                label: "angry"
            }, {
                value: "🤯",
                label: "mind blown"
            }, {
                value: "🤝",
                label: "handshake"
            }, {
                value: "👍",
                label: "thumbs up"
            }, {
                value: "👎",
                label: "thumbs down"
            }, {
                value: "👏",
                label: "clap"
            }, {
                value: "🙏",
                label: "praying"
            }, {
                value: "💪",
                label: "strong"
            }, {
                value: "🔥",
                label: "fire"
            }, {
                value: "✨",
                label: "sparkles"
            }, {
                value: "💯",
                label: "hundred"
            }, {
                value: "❤️",
                label: "heart red"
            }, {
                value: "💛",
                label: "heart yellow"
            }, {
                value: "💚",
                label: "heart green"
            }, {
                value: "💙",
                label: "heart blue"
            }, {
                value: "💜",
                label: "heart purple"
            }, {
                value: "🧡",
                label: "heart orange"
            }, {
                value: "🤍",
                label: "heart white"
            }, {
                value: "🤎",
                label: "heart brown"
            }, {
                value: "🤖",
                label: "robot"
            }, {
                value: "🎧",
                label: "headphones"
            }, {
                value: "📎",
                label: "paperclip"
            }, {
                value: "📸",
                label: "camera"
            }, {
                value: "🎉",
                label: "party"
            }, {
                value: "⚙️",
                label: "gear"
            }, {
                value: "🔍",
                label: "magnifier"
            }, {
                value: "🌟",
                label: "star"
            }, {
                value: "⭐",
                label: "star simple"
            }, {
                value: "🌈",
                label: "rainbow"
            }, {
                value: "🍕",
                label: "pizza"
            } ]
        });
        picker.onSelect((l => {
            const wrapper = emojiBlock.closest("[data-emoji-wrapper]");
            if (wrapper) {
                const input = wrapper.querySelector("[data-emoji-input]");
                if (input) input.value += l;
            }
        }));
    }));
    function getChartFontSize() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 768) return window.innerHeight * .011278195489; else return 12;
    }
    const externalTooltipHandler = context => {
        const {chart, tooltip} = context;
        let tooltipEl = chart.canvas.parentNode.querySelector(".chartjs-tooltip");
        if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.classList.add("chartjs-tooltip");
            chart.canvas.parentNode.appendChild(tooltipEl);
        }
        if (!tooltip || tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }
        tooltipEl.innerHTML = "";
        if (tooltip.title && tooltip.title.length) {
            const titleDiv = document.createElement("div");
            titleDiv.classList.add("chartjs-tooltip-title");
            titleDiv.innerHTML = tooltip.title.join("<br>");
            tooltipEl.appendChild(titleDiv);
        }
        if (tooltip.body && tooltip.body.length) tooltip.body.forEach(((b, i) => {
            const bodyDiv = document.createElement("div");
            bodyDiv.classList.add("chartjs-tooltip-body");
            const text = document.createTextNode(b.lines.join(" "));
            bodyDiv.appendChild(text);
            tooltipEl.appendChild(bodyDiv);
        }));
        chart.canvas.getBoundingClientRect();
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = tooltip.caretX + "px";
        tooltipEl.style.top = tooltip.caretY + "px";
    };
    function renderFbx01Chart({labels, values, currency}) {
        const els = document.querySelectorAll("[data-dash-chart]");
        if (els) els.forEach((el => {
            const ctx = el.getContext("2d");
            const currencySymbol = currency === "USD" ? "$" : currency;
            new auto(ctx, {
                type: "bar",
                data: {
                    labels,
                    datasets: [ {
                        label: "FBX01",
                        data: values,
                        backgroundColor: "#FFF",
                        hoverBackgroundColor: "#998EE0",
                        borderRadius: 4,
                        barPercentage: .8,
                        categoryPercentage: .8
                    } ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: ctx => `${currencySymbol}${Number(ctx.parsed.y).toLocaleString()}`
                            },
                            enabled: false,
                            position: "nearest",
                            external: externalTooltipHandler
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "#2A2E4A",
                                font: {
                                    size: getChartFontSize(),
                                    weight: "bolder"
                                },
                                maxRotation: 0,
                                autoSkip: true,
                                maxTicksLimit: 6
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            display: false
                        }
                    }
                }
            });
        }));
    }
    renderFbx01Chart({
        labels: [ "04 JUL", "11 JUL", "18 JUL", "25 JUL", "15 AUG", "22 AUG", "29 SEP", "5 SEP", "12 SEP", "19 SEP", "26 SEP", "3 OCT", "11 OCT", "18 OCT", "01 NOV", "08 NOV" ],
        values: [ 3124, 2368.8, 2325.2, 2334, 1940.2, 1744, 1724, 2162.6, 2309.2, 2184.6, 1852.8, 1554.4, 1431, 1687.2, 1999, 2958.4 ],
        barColor: "#998ee0",
        currency: "USD"
    });
    window["FLS"] = false;
    addLoadedClass();
    spoilers();
    tabs();
    formRating();
})();