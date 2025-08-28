(() => {
    var __webpack_modules__ = {
        990: () => {
            "use strict";
            if (typeof Object.assign !== "function") Object.assign = function(target) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                if (!target) throw TypeError("Cannot convert undefined or null to object");
                var _loop_1 = function(source) {
                    if (source) Object.keys(source).forEach((function(key) {
                        return target[key] = source[key];
                    }));
                };
                for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                    var source = args_1[_a];
                    _loop_1(source);
                }
                return target;
            };
        },
        757: function(module) {
            /**
 * lightgallery | 2.7.2 | September 20th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
            !function(t, e) {
                true ? module.exports = e() : 0;
            }(0, (function() {
                "use strict";
                var t = function() {
                    return (t = Object.assign || function(t) {
                        for (var e, i = 1, s = arguments.length; i < s; i++) for (var h in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, h) && (t[h] = e[h]);
                        return t;
                    }).apply(this, arguments);
                }, e = {
                    thumbnail: !0,
                    animateThumb: !0,
                    currentPagerPosition: "middle",
                    alignThumbnails: "middle",
                    thumbWidth: 100,
                    thumbHeight: "80px",
                    thumbMargin: 5,
                    appendThumbnailsTo: ".lg-components",
                    toggleThumb: !1,
                    enableThumbDrag: !0,
                    enableThumbSwipe: !0,
                    thumbnailSwipeThreshold: 10,
                    loadYouTubeThumbnail: !0,
                    youTubeThumbSize: 1,
                    thumbnailPluginStrings: {
                        toggleThumbnails: "Toggle thumbnails"
                    }
                }, i = "lgContainerResize", s = "lgUpdateSlides", h = "lgBeforeOpen", n = "lgBeforeSlide";
                return function() {
                    function o(t, e) {
                        return this.thumbOuterWidth = 0, this.thumbTotalWidth = 0, this.translateX = 0, 
                        this.thumbClickable = !1, this.core = t, this.$LG = e, this;
                    }
                    return o.prototype.init = function() {
                        this.settings = t(t({}, e), this.core.settings), this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.galleryItems.length * (this.settings.thumbWidth + this.settings.thumbMargin), 
                        this.translateX = 0, this.setAnimateThumbStyles(), this.core.settings.allowMediaOverlap || (this.settings.toggleThumb = !1), 
                        this.settings.thumbnail && (this.build(), this.settings.animateThumb ? (this.settings.enableThumbDrag && this.enableThumbDrag(), 
                        this.settings.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, 
                        this.toggleThumbBar(), this.thumbKeyPress());
                    }, o.prototype.build = function() {
                        var t = this;
                        this.setThumbMarkup(), this.manageActiveClassOnSlideChange(), this.$lgThumb.first().on("click.lg touchend.lg", (function(e) {
                            var i = t.$LG(e.target);
                            i.hasAttribute("data-lg-item-id") && setTimeout((function() {
                                if (t.thumbClickable && !t.core.lgBusy) {
                                    var e = parseInt(i.attr("data-lg-item-id"));
                                    t.core.slide(e, !1, !0, !1);
                                }
                            }), 50);
                        })), this.core.LGel.on(n + ".thumb", (function(e) {
                            var i = e.detail.index;
                            t.animateThumb(i);
                        })), this.core.LGel.on(h + ".thumb", (function() {
                            t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                        })), this.core.LGel.on(s + ".thumb", (function() {
                            t.rebuildThumbnails();
                        })), this.core.LGel.on(i + ".thumb", (function() {
                            t.core.lgOpened && setTimeout((function() {
                                t.thumbOuterWidth = t.core.outer.get().offsetWidth, t.animateThumb(t.core.index), 
                                t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                            }), 50);
                        }));
                    }, o.prototype.setThumbMarkup = function() {
                        var t = "lg-thumb-outer ";
                        this.settings.alignThumbnails && (t += "lg-thumb-align-" + this.settings.alignThumbnails);
                        var e = '<div class="' + t + '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
                        this.core.outer.addClass("lg-has-thumb"), ".lg-components" === this.settings.appendThumbnailsTo ? this.core.$lgComponents.append(e) : this.core.outer.append(e), 
                        this.$thumbOuter = this.core.outer.find(".lg-thumb-outer").first(), this.$lgThumb = this.core.outer.find(".lg-thumb").first(), 
                        this.settings.animateThumb && this.core.outer.find(".lg-thumb").css("transition-duration", this.core.settings.speed + "ms").css("width", this.thumbTotalWidth + "px").css("position", "relative"), 
                        this.setThumbItemHtml(this.core.galleryItems);
                    }, o.prototype.enableThumbDrag = function() {
                        var t = this, e = {
                            cords: {
                                startX: 0,
                                endX: 0
                            },
                            isMoved: !1,
                            newTranslateX: 0,
                            startTime: new Date,
                            endTime: new Date,
                            touchMoveTime: 0
                        }, i = !1;
                        this.$thumbOuter.addClass("lg-grab"), this.core.outer.find(".lg-thumb").first().on("mousedown.lg.thumb", (function(s) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (s.preventDefault(), e.cords.startX = s.pageX, 
                            e.startTime = new Date, t.thumbClickable = !1, i = !0, t.core.outer.get().scrollLeft += 1, 
                            t.core.outer.get().scrollLeft -= 1, t.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"));
                        })), this.$LG(window).on("mousemove.lg.thumb.global" + this.core.lgId, (function(s) {
                            t.core.lgOpened && i && (e.cords.endX = s.pageX, e = t.onThumbTouchMove(e));
                        })), this.$LG(window).on("mouseup.lg.thumb.global" + this.core.lgId, (function() {
                            t.core.lgOpened && (e.isMoved ? e = t.onThumbTouchEnd(e) : t.thumbClickable = !0, 
                            i && (i = !1, t.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab")));
                        }));
                    }, o.prototype.enableThumbSwipe = function() {
                        var t = this, e = {
                            cords: {
                                startX: 0,
                                endX: 0
                            },
                            isMoved: !1,
                            newTranslateX: 0,
                            startTime: new Date,
                            endTime: new Date,
                            touchMoveTime: 0
                        };
                        this.$lgThumb.on("touchstart.lg", (function(i) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e.cords.startX = i.targetTouches[0].pageX, 
                            t.thumbClickable = !1, e.startTime = new Date);
                        })), this.$lgThumb.on("touchmove.lg", (function(i) {
                            t.thumbTotalWidth > t.thumbOuterWidth && (i.preventDefault(), e.cords.endX = i.targetTouches[0].pageX, 
                            e = t.onThumbTouchMove(e));
                        })), this.$lgThumb.on("touchend.lg", (function() {
                            e.isMoved ? e = t.onThumbTouchEnd(e) : t.thumbClickable = !0;
                        }));
                    }, o.prototype.rebuildThumbnails = function() {
                        var t = this;
                        this.$thumbOuter.addClass("lg-rebuilding-thumbnails"), setTimeout((function() {
                            t.thumbTotalWidth = t.core.galleryItems.length * (t.settings.thumbWidth + t.settings.thumbMargin), 
                            t.$lgThumb.css("width", t.thumbTotalWidth + "px"), t.$lgThumb.empty(), t.setThumbItemHtml(t.core.galleryItems), 
                            t.animateThumb(t.core.index);
                        }), 50), setTimeout((function() {
                            t.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
                        }), 200);
                    }, o.prototype.setTranslate = function(t) {
                        this.$lgThumb.css("transform", "translate3d(-" + t + "px, 0px, 0px)");
                    }, o.prototype.getPossibleTransformX = function(t) {
                        return t > this.thumbTotalWidth - this.thumbOuterWidth && (t = this.thumbTotalWidth - this.thumbOuterWidth), 
                        t < 0 && (t = 0), t;
                    }, o.prototype.animateThumb = function(t) {
                        if (this.$lgThumb.css("transition-duration", this.core.settings.speed + "ms"), this.settings.animateThumb) {
                            var e = 0;
                            switch (this.settings.currentPagerPosition) {
                              case "left":
                                e = 0;
                                break;

                              case "middle":
                                e = this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                                break;

                              case "right":
                                e = this.thumbOuterWidth - this.settings.thumbWidth;
                            }
                            this.translateX = (this.settings.thumbWidth + this.settings.thumbMargin) * t - 1 - e, 
                            this.translateX > this.thumbTotalWidth - this.thumbOuterWidth && (this.translateX = this.thumbTotalWidth - this.thumbOuterWidth), 
                            this.translateX < 0 && (this.translateX = 0), this.setTranslate(this.translateX);
                        }
                    }, o.prototype.onThumbTouchMove = function(t) {
                        return t.newTranslateX = this.translateX, t.isMoved = !0, t.touchMoveTime = (new Date).valueOf(), 
                        t.newTranslateX -= t.cords.endX - t.cords.startX, t.newTranslateX = this.getPossibleTransformX(t.newTranslateX), 
                        this.setTranslate(t.newTranslateX), this.$thumbOuter.addClass("lg-dragging"), t;
                    }, o.prototype.onThumbTouchEnd = function(t) {
                        t.isMoved = !1, t.endTime = new Date, this.$thumbOuter.removeClass("lg-dragging");
                        var e = t.endTime.valueOf() - t.startTime.valueOf(), i = t.cords.endX - t.cords.startX, s = Math.abs(i) / e;
                        return s > .15 && t.endTime.valueOf() - t.touchMoveTime < 30 ? ((s += 1) > 2 && (s += 1), 
                        s += s * (Math.abs(i) / this.thumbOuterWidth), this.$lgThumb.css("transition-duration", Math.min(s - 1, 2) + "settings"), 
                        i *= s, this.translateX = this.getPossibleTransformX(this.translateX - i), this.setTranslate(this.translateX)) : this.translateX = t.newTranslateX, 
                        Math.abs(t.cords.endX - t.cords.startX) < this.settings.thumbnailSwipeThreshold && (this.thumbClickable = !0), 
                        t;
                    }, o.prototype.getThumbHtml = function(t, e, i) {
                        var s, h = this.core.galleryItems[e].__slideVideoInfo || {};
                        s = h.youtube && this.settings.loadYouTubeThumbnail ? "//img.youtube.com/vi/" + h.youtube[1] + "/" + this.settings.youTubeThumbSize + ".jpg" : t;
                        var n = i ? 'alt="' + i + '"' : "";
                        return '<div data-lg-item-id="' + e + '" class="lg-thumb-item ' + (e === this.core.index ? " active" : "") + '"\n        style="width:' + this.settings.thumbWidth + "px; height: " + this.settings.thumbHeight + ";\n            margin-right: " + this.settings.thumbMargin + 'px;">\n            <img ' + n + ' data-lg-item-id="' + e + '" src="' + s + '" />\n        </div>';
                    }, o.prototype.getThumbItemHtml = function(t) {
                        for (var e = "", i = 0; i < t.length; i++) e += this.getThumbHtml(t[i].thumb, i, t[i].alt);
                        return e;
                    }, o.prototype.setThumbItemHtml = function(t) {
                        var e = this.getThumbItemHtml(t);
                        this.$lgThumb.html(e);
                    }, o.prototype.setAnimateThumbStyles = function() {
                        this.settings.animateThumb && this.core.outer.addClass("lg-animate-thumb");
                    }, o.prototype.manageActiveClassOnSlideChange = function() {
                        var t = this;
                        this.core.LGel.on(n + ".thumb", (function(e) {
                            var i = t.core.outer.find(".lg-thumb-item"), s = e.detail.index;
                            i.removeClass("active"), i.eq(s).addClass("active");
                        }));
                    }, o.prototype.toggleThumbBar = function() {
                        var t = this;
                        this.settings.toggleThumb && (this.core.outer.addClass("lg-can-toggle"), this.core.$toolbar.append('<button type="button" aria-label="' + this.settings.thumbnailPluginStrings.toggleThumbnails + '" class="lg-toggle-thumb lg-icon"></button>'), 
                        this.core.outer.find(".lg-toggle-thumb").first().on("click.lg", (function() {
                            t.core.outer.toggleClass("lg-components-open");
                        })));
                    }, o.prototype.thumbKeyPress = function() {
                        var t = this;
                        this.$LG(window).on("keydown.lg.thumb.global" + this.core.lgId, (function(e) {
                            t.core.lgOpened && t.settings.toggleThumb && (38 === e.keyCode ? (e.preventDefault(), 
                            t.core.outer.addClass("lg-components-open")) : 40 === e.keyCode && (e.preventDefault(), 
                            t.core.outer.removeClass("lg-components-open")));
                        }));
                    }, o.prototype.destroy = function() {
                        this.settings.thumbnail && (this.$LG(window).off(".lg.thumb.global" + this.core.lgId), 
                        this.core.LGel.off(".lg.thumb"), this.core.LGel.off(".thumb"), this.$thumbOuter.remove(), 
                        this.core.outer.removeClass("lg-has-thumb"));
                    }, o;
                }();
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
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
                    const searchInput = `<div class="${this.selectClasses.classSelectSearch}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></div>`;
                    optionsHTML = searchInput + optionsHTML;
                }
                selectItemOptions.innerHTML = optionsHTML;
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
 */        var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
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
            var holidaysSliderEl = document.querySelector(".holidays-dash__slider");
            if (holidaysSliderEl) {
                var holidaysSlider = new splide_esm_Splide(holidaysSliderEl, {
                    arrows: true,
                    perMove: 1,
                    omitEnd: true,
                    pagination: false,
                    gap: 8,
                    updateOnMove: true,
                    grid: {
                        rows: 2,
                        cols: 1,
                        gap: {
                            row: "0.5rem",
                            col: "0.5rem"
                        }
                    }
                });
                holidaysSlider.mount({
                    Grid
                });
            }
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
        /*!
 * lightgallery | 2.7.2 | September 20th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var lightgallery_es5_assign = function() {
            lightgallery_es5_assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return lightgallery_es5_assign.apply(this, arguments);
        };
        function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
            var r = Array(s), k = 0;
            for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
            k++) r[k] = a[j];
            return r;
        }
        var lGEvents = {
            afterAppendSlide: "lgAfterAppendSlide",
            init: "lgInit",
            hasVideo: "lgHasVideo",
            containerResize: "lgContainerResize",
            updateSlides: "lgUpdateSlides",
            afterAppendSubHtml: "lgAfterAppendSubHtml",
            beforeOpen: "lgBeforeOpen",
            afterOpen: "lgAfterOpen",
            slideItemLoad: "lgSlideItemLoad",
            beforeSlide: "lgBeforeSlide",
            afterSlide: "lgAfterSlide",
            posterClick: "lgPosterClick",
            dragStart: "lgDragStart",
            dragMove: "lgDragMove",
            dragEnd: "lgDragEnd",
            beforeNextSlide: "lgBeforeNextSlide",
            beforePrevSlide: "lgBeforePrevSlide",
            beforeClose: "lgBeforeClose",
            afterClose: "lgAfterClose",
            rotateLeft: "lgRotateLeft",
            rotateRight: "lgRotateRight",
            flipHorizontal: "lgFlipHorizontal",
            flipVertical: "lgFlipVertical",
            autoplay: "lgAutoplay",
            autoplayStart: "lgAutoplayStart",
            autoplayStop: "lgAutoplayStop"
        };
        var lightGalleryCoreSettings = {
            mode: "lg-slide",
            easing: "ease",
            speed: 400,
            licenseKey: "0000-0000-000-0000",
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 300,
            container: "",
            startAnimationDuration: 400,
            zoomFromOrigin: true,
            hideBarsDelay: 0,
            showBarsAfter: 1e4,
            slideDelay: 0,
            supportLegacyBrowser: true,
            allowMediaOverlap: false,
            videoMaxSize: "1280-720",
            loadYouTubePoster: true,
            defaultCaptionHeight: 0,
            ariaLabelledby: "",
            ariaDescribedby: "",
            resetScrollPosition: true,
            hideScrollbar: false,
            closable: true,
            swipeToClose: true,
            closeOnTap: true,
            showCloseIcon: true,
            showMaximizeIcon: false,
            loop: true,
            escKey: true,
            keyPress: true,
            trapFocus: true,
            controls: true,
            slideEndAnimation: true,
            hideControlOnEnd: false,
            mousewheel: false,
            getCaptionFromTitleOrAlt: true,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: false,
            preload: 2,
            numberOfSlideItemsInDom: 10,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: 0,
            iframeWidth: "100%",
            iframeHeight: "100%",
            iframeMaxWidth: "100%",
            iframeMaxHeight: "100%",
            download: true,
            counter: true,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: true,
            enableDrag: true,
            dynamic: false,
            dynamicEl: [],
            extraProps: [],
            exThumbImage: "",
            isMobile: void 0,
            mobileSettings: {
                controls: false,
                showCloseIcon: false,
                download: false
            },
            plugins: [],
            strings: {
                closeGallery: "Close gallery",
                toggleMaximize: "Toggle maximize",
                previousSlide: "Previous slide",
                nextSlide: "Next slide",
                download: "Download",
                playVideo: "Play video",
                mediaLoadingFailed: "Oops... Failed to load content..."
            }
        };
        function initLgPolyfills() {
            (function() {
                if (typeof window.CustomEvent === "function") return false;
                function CustomEvent(event, params) {
                    params = params || {
                        bubbles: false,
                        cancelable: false,
                        detail: null
                    };
                    var evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }
                window.CustomEvent = CustomEvent;
            })();
            (function() {
                if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            })();
        }
        var lgQuery = function() {
            function lgQuery(selector) {
                this.cssVenderPrefixes = [ "TransitionDuration", "TransitionTimingFunction", "Transform", "Transition" ];
                this.selector = this._getSelector(selector);
                this.firstElement = this._getFirstEl();
                return this;
            }
            lgQuery.generateUUID = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(c) {
                    var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
                    return v.toString(16);
                }));
            };
            lgQuery.prototype._getSelector = function(selector, context) {
                if (context === void 0) context = document;
                if (typeof selector !== "string") return selector;
                context = context || document;
                var fl = selector.substring(0, 1);
                if (fl === "#") return context.querySelector(selector); else return context.querySelectorAll(selector);
            };
            lgQuery.prototype._each = function(func) {
                if (!this.selector) return this;
                if (this.selector.length !== void 0) [].forEach.call(this.selector, func); else func(this.selector, 0);
                return this;
            };
            lgQuery.prototype._setCssVendorPrefix = function(el, cssProperty, value) {
                var property = cssProperty.replace(/-([a-z])/gi, (function(s, group1) {
                    return group1.toUpperCase();
                }));
                if (this.cssVenderPrefixes.indexOf(property) !== -1) {
                    el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
                    el.style["webkit" + property] = value;
                    el.style["moz" + property] = value;
                    el.style["ms" + property] = value;
                    el.style["o" + property] = value;
                } else el.style[property] = value;
            };
            lgQuery.prototype._getFirstEl = function() {
                if (this.selector && this.selector.length !== void 0) return this.selector[0]; else return this.selector;
            };
            lgQuery.prototype.isEventMatched = function(event, eventName) {
                var eventNamespace = eventName.split(".");
                return event.split(".").filter((function(e) {
                    return e;
                })).every((function(e) {
                    return eventNamespace.indexOf(e) !== -1;
                }));
            };
            lgQuery.prototype.attr = function(attr, value) {
                if (value === void 0) {
                    if (!this.firstElement) return "";
                    return this.firstElement.getAttribute(attr);
                }
                this._each((function(el) {
                    el.setAttribute(attr, value);
                }));
                return this;
            };
            lgQuery.prototype.find = function(selector) {
                return $LG(this._getSelector(selector, this.selector));
            };
            lgQuery.prototype.first = function() {
                if (this.selector && this.selector.length !== void 0) return $LG(this.selector[0]); else return $LG(this.selector);
            };
            lgQuery.prototype.eq = function(index) {
                return $LG(this.selector[index]);
            };
            lgQuery.prototype.parent = function() {
                return $LG(this.selector.parentElement);
            };
            lgQuery.prototype.get = function() {
                return this._getFirstEl();
            };
            lgQuery.prototype.removeAttr = function(attributes) {
                var attrs = attributes.split(" ");
                this._each((function(el) {
                    attrs.forEach((function(attr) {
                        return el.removeAttribute(attr);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.wrap = function(className) {
                if (!this.firstElement) return this;
                var wrapper = document.createElement("div");
                wrapper.className = className;
                this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
                this.firstElement.parentNode.removeChild(this.firstElement);
                wrapper.appendChild(this.firstElement);
                return this;
            };
            lgQuery.prototype.addClass = function(classNames) {
                if (classNames === void 0) classNames = "";
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.add(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.removeClass = function(classNames) {
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.remove(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.hasClass = function(className) {
                if (!this.firstElement) return false;
                return this.firstElement.classList.contains(className);
            };
            lgQuery.prototype.hasAttribute = function(attribute) {
                if (!this.firstElement) return false;
                return this.firstElement.hasAttribute(attribute);
            };
            lgQuery.prototype.toggleClass = function(className) {
                if (!this.firstElement) return this;
                if (this.hasClass(className)) this.removeClass(className); else this.addClass(className);
                return this;
            };
            lgQuery.prototype.css = function(property, value) {
                var _this = this;
                this._each((function(el) {
                    _this._setCssVendorPrefix(el, property, value);
                }));
                return this;
            };
            lgQuery.prototype.on = function(events, listener) {
                var _this = this;
                if (!this.selector) return this;
                events.split(" ").forEach((function(event) {
                    if (!Array.isArray(lgQuery.eventListeners[event])) lgQuery.eventListeners[event] = [];
                    lgQuery.eventListeners[event].push(listener);
                    _this.selector.addEventListener(event.split(".")[0], listener);
                }));
                return this;
            };
            lgQuery.prototype.once = function(event, listener) {
                var _this = this;
                this.on(event, (function() {
                    _this.off(event);
                    listener(event);
                }));
                return this;
            };
            lgQuery.prototype.off = function(event) {
                var _this = this;
                if (!this.selector) return this;
                Object.keys(lgQuery.eventListeners).forEach((function(eventName) {
                    if (_this.isEventMatched(event, eventName)) {
                        lgQuery.eventListeners[eventName].forEach((function(listener) {
                            _this.selector.removeEventListener(eventName.split(".")[0], listener);
                        }));
                        lgQuery.eventListeners[eventName] = [];
                    }
                }));
                return this;
            };
            lgQuery.prototype.trigger = function(event, detail) {
                if (!this.firstElement) return this;
                var customEvent = new CustomEvent(event.split(".")[0], {
                    detail: detail || null
                });
                this.firstElement.dispatchEvent(customEvent);
                return this;
            };
            lgQuery.prototype.load = function(url) {
                var _this = this;
                fetch(url).then((function(res) {
                    return res.text();
                })).then((function(html) {
                    _this.selector.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.html = function(html) {
                if (html === void 0) {
                    if (!this.firstElement) return "";
                    return this.firstElement.innerHTML;
                }
                this._each((function(el) {
                    el.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.append = function(html) {
                this._each((function(el) {
                    if (typeof html === "string") el.insertAdjacentHTML("beforeend", html); else el.appendChild(html);
                }));
                return this;
            };
            lgQuery.prototype.prepend = function(html) {
                this._each((function(el) {
                    el.insertAdjacentHTML("afterbegin", html);
                }));
                return this;
            };
            lgQuery.prototype.remove = function() {
                this._each((function(el) {
                    el.parentNode.removeChild(el);
                }));
                return this;
            };
            lgQuery.prototype.empty = function() {
                this._each((function(el) {
                    el.innerHTML = "";
                }));
                return this;
            };
            lgQuery.prototype.scrollTop = function(scrollTop) {
                if (scrollTop !== void 0) {
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    return this;
                } else return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            };
            lgQuery.prototype.scrollLeft = function(scrollLeft) {
                if (scrollLeft !== void 0) {
                    document.body.scrollLeft = scrollLeft;
                    document.documentElement.scrollLeft = scrollLeft;
                    return this;
                } else return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            };
            lgQuery.prototype.offset = function() {
                if (!this.firstElement) return {
                    left: 0,
                    top: 0
                };
                var rect = this.firstElement.getBoundingClientRect();
                var bodyMarginLeft = $LG("body").style().marginLeft;
                return {
                    left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
                    top: rect.top + this.scrollTop()
                };
            };
            lgQuery.prototype.style = function() {
                if (!this.firstElement) return {};
                return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
            };
            lgQuery.prototype.width = function() {
                var style = this.style();
                return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            };
            lgQuery.prototype.height = function() {
                var style = this.style();
                return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
            };
            lgQuery.eventListeners = {};
            return lgQuery;
        }();
        function $LG(selector) {
            initLgPolyfills();
            return new lgQuery(selector);
        }
        var defaultDynamicOptions = [ "src", "sources", "subHtml", "subHtmlUrl", "html", "video", "poster", "slideName", "responsive", "srcset", "sizes", "iframe", "downloadUrl", "download", "width", "facebookShareUrl", "tweetText", "iframeTitle", "twitterShareUrl", "pinterestShareUrl", "pinterestText", "fbHtml", "disqusIdentifier", "disqusUrl" ];
        function convertToData(attr) {
            if (attr === "href") return "src";
            attr = attr.replace("data-", "");
            attr = attr.charAt(0).toLowerCase() + attr.slice(1);
            attr = attr.replace(/-([a-z])/g, (function(g) {
                return g[1].toUpperCase();
            }));
            return attr;
        }
        var utils = {
            getSize: function(el, container, spacing, defaultLgSize) {
                if (spacing === void 0) spacing = 0;
                var LGel = $LG(el);
                var lgSize = LGel.attr("data-lg-size") || defaultLgSize;
                if (!lgSize) return;
                var isResponsiveSizes = lgSize.split(",");
                if (isResponsiveSizes[1]) {
                    var wWidth = window.innerWidth;
                    for (var i = 0; i < isResponsiveSizes.length; i++) {
                        var size_1 = isResponsiveSizes[i];
                        var responsiveWidth = parseInt(size_1.split("-")[2], 10);
                        if (responsiveWidth > wWidth) {
                            lgSize = size_1;
                            break;
                        }
                        if (i === isResponsiveSizes.length - 1) lgSize = size_1;
                    }
                }
                var size = lgSize.split("-");
                var width = parseInt(size[0], 10);
                var height = parseInt(size[1], 10);
                var cWidth = container.width();
                var cHeight = container.height() - spacing;
                var maxWidth = Math.min(cWidth, width);
                var maxHeight = Math.min(cHeight, height);
                var ratio = Math.min(maxWidth / width, maxHeight / height);
                return {
                    width: width * ratio,
                    height: height * ratio
                };
            },
            getTransform: function(el, container, top, bottom, imageSize) {
                if (!imageSize) return;
                var LGel = $LG(el).find("img").first();
                if (!LGel.get()) return;
                var containerRect = container.get().getBoundingClientRect();
                var wWidth = containerRect.width;
                var wHeight = container.height() - (top + bottom);
                var elWidth = LGel.width();
                var elHeight = LGel.height();
                var elStyle = LGel.style();
                var x = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
                var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
                var scX = elWidth / imageSize.width;
                var scY = elHeight / imageSize.height;
                var transform = "translate3d(" + (x *= -1) + "px, " + (y *= -1) + "px, 0) scale3d(" + scX + ", " + scY + ", 1)";
                return transform;
            },
            getIframeMarkup: function(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
                var title = iframeTitle ? 'title="' + iframeTitle + '"' : "";
                return '<div class="lg-video-cont lg-has-iframe" style="width:' + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + '">\n                    <iframe class="lg-object" frameborder="0" ' + title + ' src="' + src + '"  allowfullscreen="true"></iframe>\n                </div>';
            },
            getImgMarkup: function(index, src, altAttr, srcset, sizes, sources) {
                var srcsetAttr = srcset ? 'srcset="' + srcset + '"' : "";
                var sizesAttr = sizes ? 'sizes="' + sizes + '"' : "";
                var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + ' class="lg-object lg-image" data-index="' + index + '" src="' + src + '" />';
                var sourceTag = "";
                if (sources) {
                    var sourceObj = typeof sources === "string" ? JSON.parse(sources) : sources;
                    sourceTag = sourceObj.map((function(source) {
                        var attrs = "";
                        Object.keys(source).forEach((function(key) {
                            attrs += " " + key + '="' + source[key] + '"';
                        }));
                        return "<source " + attrs + "></source>";
                    }));
                }
                return "" + sourceTag + imgMarkup;
            },
            getResponsiveSrc: function(srcItms) {
                var rsWidth = [];
                var rsSrc = [];
                var src = "";
                for (var i = 0; i < srcItms.length; i++) {
                    var _src = srcItms[i].split(" ");
                    if (_src[0] === "") _src.splice(0, 1);
                    rsSrc.push(_src[0]);
                    rsWidth.push(_src[1]);
                }
                var wWidth = window.innerWidth;
                for (var j = 0; j < rsWidth.length; j++) if (parseInt(rsWidth[j], 10) > wWidth) {
                    src = rsSrc[j];
                    break;
                }
                return src;
            },
            isImageLoaded: function(img) {
                if (!img) return false;
                if (!img.complete) return false;
                if (img.naturalWidth === 0) return false;
                return true;
            },
            getVideoPosterMarkup: function(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
                var videoClass = "";
                if (_isVideo && _isVideo.youtube) videoClass = "lg-has-youtube"; else if (_isVideo && _isVideo.vimeo) videoClass = "lg-has-vimeo"; else videoClass = "lg-has-html5";
                return '<div class="lg-video-cont ' + videoClass + '" style="' + videoContStyle + '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' + playVideoString + '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' + playVideoString + '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' + (dummyImg || "") + '\n            <img class="lg-object lg-video-poster" src="' + _poster + '" />\n        </div>';
            },
            getFocusableElements: function(container) {
                var elements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
                var visibleElements = [].filter.call(elements, (function(element) {
                    var style = window.getComputedStyle(element);
                    return style.display !== "none" && style.visibility !== "hidden";
                }));
                return visibleElements;
            },
            getDynamicOptions: function(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
                var dynamicElements = [];
                var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
                [].forEach.call(items, (function(item) {
                    var dynamicEl = {};
                    for (var i = 0; i < item.attributes.length; i++) {
                        var attr = item.attributes[i];
                        if (attr.specified) {
                            var dynamicAttr = convertToData(attr.name);
                            var label = "";
                            if (availableDynamicOptions.indexOf(dynamicAttr) > -1) label = dynamicAttr;
                            if (label) dynamicEl[label] = attr.value;
                        }
                    }
                    var currentItem = $LG(item);
                    var alt = currentItem.find("img").first().attr("alt");
                    var title = currentItem.attr("title");
                    var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find("img").first().attr("src");
                    dynamicEl.thumb = thumb;
                    if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) dynamicEl.subHtml = title || alt || "";
                    dynamicEl.alt = alt || title || "";
                    dynamicElements.push(dynamicEl);
                }));
                return dynamicElements;
            },
            isMobile: function() {
                return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            },
            isVideo: function(src, isHTML5VIdeo, index) {
                if (!src) if (isHTML5VIdeo) return {
                    html5: true
                }; else {
                    console.error("lightGallery :- data-src is not provided on slide item " + (index + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");
                    return;
                }
                var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
                var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
                var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
                if (youtube) return {
                    youtube
                }; else if (vimeo) return {
                    vimeo
                }; else if (wistia) return {
                    wistia
                };
            }
        };
        var lgId = 0;
        var LightGallery = function() {
            function LightGallery(element, options) {
                this.lgOpened = false;
                this.index = 0;
                this.plugins = [];
                this.lGalleryOn = false;
                this.lgBusy = false;
                this.currentItemsInDom = [];
                this.prevScrollTop = 0;
                this.bodyPaddingRight = 0;
                this.isDummyImageRemoved = false;
                this.dragOrSwipeEnabled = false;
                this.mediaContainerPosition = {
                    top: 0,
                    bottom: 0
                };
                if (!element) return this;
                lgId++;
                this.lgId = lgId;
                this.el = element;
                this.LGel = $LG(element);
                this.generateSettings(options);
                this.buildModules();
                if (this.settings.dynamic && this.settings.dynamicEl !== void 0 && !Array.isArray(this.settings.dynamicEl)) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                this.galleryItems = this.getItems();
                this.normalizeSettings();
                this.init();
                this.validateLicense();
                return this;
            }
            LightGallery.prototype.generateSettings = function(options) {
                this.settings = lightgallery_es5_assign(lightgallery_es5_assign({}, lightGalleryCoreSettings), options);
                if (this.settings.isMobile && typeof this.settings.isMobile === "function" ? this.settings.isMobile() : utils.isMobile()) {
                    var mobileSettings = lightgallery_es5_assign(lightgallery_es5_assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
                    this.settings = lightgallery_es5_assign(lightgallery_es5_assign({}, this.settings), mobileSettings);
                }
            };
            LightGallery.prototype.normalizeSettings = function() {
                if (this.settings.slideEndAnimation) this.settings.hideControlOnEnd = false;
                if (!this.settings.closable) this.settings.swipeToClose = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                if (this.settings.dynamic) this.zoomFromOrigin = false;
                if (!this.settings.container) this.settings.container = document.body;
                this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
            };
            LightGallery.prototype.init = function() {
                var _this = this;
                this.addSlideVideoInfo(this.galleryItems);
                this.buildStructure();
                this.LGel.trigger(lGEvents.init, {
                    instance: this
                });
                if (this.settings.keyPress) this.keyPress();
                setTimeout((function() {
                    _this.enableDrag();
                    _this.enableSwipe();
                    _this.triggerPosterClick();
                }), 50);
                this.arrow();
                if (this.settings.mousewheel) this.mousewheel();
                if (!this.settings.dynamic) this.openGalleryOnItemClick();
            };
            LightGallery.prototype.openGalleryOnItemClick = function() {
                var _this = this;
                var _loop_1 = function(index) {
                    var element = this_1.items[index];
                    var $element = $LG(element);
                    var uuid = lgQuery.generateUUID();
                    $element.attr("data-lg-id", uuid).on("click.lgcustom-item-" + uuid, (function(e) {
                        e.preventDefault();
                        var currentItemIndex = _this.settings.index || index;
                        _this.openGallery(currentItemIndex, element);
                    }));
                };
                var this_1 = this;
                for (var index = 0; index < this.items.length; index++) _loop_1(index);
            };
            LightGallery.prototype.buildModules = function() {
                var _this = this;
                this.settings.plugins.forEach((function(plugin) {
                    _this.plugins.push(new plugin(_this, $LG));
                }));
            };
            LightGallery.prototype.validateLicense = function() {
                if (!this.settings.licenseKey) console.error("Please provide a valid license key"); else if (this.settings.licenseKey === "0000-0000-000-0000") console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
            };
            LightGallery.prototype.getSlideItem = function(index) {
                return $LG(this.getSlideItemId(index));
            };
            LightGallery.prototype.getSlideItemId = function(index) {
                return "#lg-item-" + this.lgId + "-" + index;
            };
            LightGallery.prototype.getIdName = function(id) {
                return id + "-" + this.lgId;
            };
            LightGallery.prototype.getElementById = function(id) {
                return $LG("#" + this.getIdName(id));
            };
            LightGallery.prototype.manageSingleSlideClassName = function() {
                if (this.galleryItems.length < 2) this.outer.addClass("lg-single-item"); else this.outer.removeClass("lg-single-item");
            };
            LightGallery.prototype.buildStructure = function() {
                var _this = this;
                var container = this.$container && this.$container.get();
                if (container) return;
                var controls = "";
                var subHtmlCont = "";
                if (this.settings.controls) controls = '<button type="button" id="' + this.getIdName("lg-prev") + '" aria-label="' + this.settings.strings["previousSlide"] + '" class="lg-prev lg-icon"> ' + this.settings.prevHtml + ' </button>\n                <button type="button" id="' + this.getIdName("lg-next") + '" aria-label="' + this.settings.strings["nextSlide"] + '" class="lg-next lg-icon"> ' + this.settings.nextHtml + " </button>";
                if (this.settings.appendSubHtmlTo !== ".lg-item") subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
                var addClasses = "";
                if (this.settings.allowMediaOverlap) addClasses += "lg-media-overlap ";
                var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "";
                var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "";
                var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : "");
                var closeIcon = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="' + this.settings.strings["closeGallery"] + '" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "";
                var maximizeIcon = this.settings.showMaximizeIcon ? '<button type="button" aria-label="' + this.settings.strings["toggleMaximize"] + '" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "";
                var template = '\n        <div class="' + containerClassName + '" id="' + this.getIdName("lg-container") + '" tabindex="-1" aria-modal="true" ' + ariaLabelledby + " " + ariaDescribedby + ' role="dialog"\n        >\n            <div id="' + this.getIdName("lg-backdrop") + '" class="lg-backdrop"></div>\n\n            <div id="' + this.getIdName("lg-outer") + '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' + addClasses + ' ">\n\n              <div id="' + this.getIdName("lg-content") + '" class="lg-content">\n                <div id="' + this.getIdName("lg-inner") + '" class="lg-inner">\n                </div>\n                ' + controls + '\n              </div>\n                <div id="' + this.getIdName("lg-toolbar") + '" class="lg-toolbar lg-group">\n                    ' + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (this.settings.appendSubHtmlTo === ".lg-outer" ? subHtmlCont : "") + '\n                <div id="' + this.getIdName("lg-components") + '" class="lg-components">\n                    ' + (this.settings.appendSubHtmlTo === ".lg-sub-html" ? subHtmlCont : "") + "\n                </div>\n            </div>\n        </div>\n        ";
                $LG(this.settings.container).append(template);
                if (document.body !== this.settings.container) $LG(this.settings.container).css("position", "relative");
                this.outer = this.getElementById("lg-outer");
                this.$lgComponents = this.getElementById("lg-components");
                this.$backdrop = this.getElementById("lg-backdrop");
                this.$container = this.getElementById("lg-container");
                this.$inner = this.getElementById("lg-inner");
                this.$content = this.getElementById("lg-content");
                this.$toolbar = this.getElementById("lg-toolbar");
                this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
                var outerClassNames = this.settings.mode + " ";
                this.manageSingleSlideClassName();
                if (this.settings.enableDrag) outerClassNames += "lg-grab ";
                this.outer.addClass(outerClassNames);
                this.$inner.css("transition-timing-function", this.settings.easing);
                this.$inner.css("transition-duration", this.settings.speed + "ms");
                if (this.settings.download) this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="' + this.settings.strings["download"] + '" download class="lg-download lg-icon"></a>');
                this.counter();
                $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, (function() {
                    _this.refreshOnResize();
                }));
                this.hideBars();
                this.manageCloseGallery();
                this.toggleMaximize();
                this.initModules();
            };
            LightGallery.prototype.refreshOnResize = function() {
                if (this.lgOpened) {
                    var currentGalleryItem = this.galleryItems[this.index];
                    var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
                    this.mediaContainerPosition = this.getMediaContainerPosition();
                    var _a = this.mediaContainerPosition, top_1 = _a.top, bottom = _a.bottom;
                    this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    if (__slideVideoInfo) this.resizeVideoSlide(this.index, this.currentImageSize);
                    if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
                        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                        this.outer.find(".lg-current .lg-dummy-img").first().attr("style", imgStyle);
                    }
                    this.LGel.trigger(lGEvents.containerResize);
                }
            };
            LightGallery.prototype.resizeVideoSlide = function(index, imageSize) {
                var lgVideoStyle = this.getVideoContStyle(imageSize);
                var currentSlide = this.getSlideItem(index);
                currentSlide.find(".lg-video-cont").attr("style", lgVideoStyle);
            };
            LightGallery.prototype.updateSlides = function(items, index) {
                if (this.index > items.length - 1) this.index = items.length - 1;
                if (items.length === 1) this.index = 0;
                if (!items.length) {
                    this.closeGallery();
                    return;
                }
                var currentSrc = this.galleryItems[index].src;
                this.galleryItems = items;
                this.updateControls();
                this.$inner.empty();
                this.currentItemsInDom = [];
                var _index = 0;
                this.galleryItems.some((function(galleryItem, itemIndex) {
                    if (galleryItem.src === currentSrc) {
                        _index = itemIndex;
                        return true;
                    }
                    return false;
                }));
                this.currentItemsInDom = this.organizeSlideItems(_index, -1);
                this.loadContent(_index, true);
                this.getSlideItem(_index).addClass("lg-current");
                this.index = _index;
                this.updateCurrentCounter(_index);
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.getItems = function() {
                this.items = [];
                if (!this.settings.dynamic) {
                    if (this.settings.selector === "this") this.items.push(this.el); else if (this.settings.selector) if (typeof this.settings.selector === "string") if (this.settings.selectWithin) {
                        var selectWithin = $LG(this.settings.selectWithin);
                        this.items = selectWithin.find(this.settings.selector).get();
                    } else this.items = this.el.querySelectorAll(this.settings.selector); else this.items = this.settings.selector; else this.items = this.el.children;
                    return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
                } else return this.settings.dynamicEl || [];
            };
            LightGallery.prototype.shouldHideScrollbar = function() {
                return this.settings.hideScrollbar && document.body === this.settings.container;
            };
            LightGallery.prototype.hideScrollbar = function() {
                if (!this.shouldHideScrollbar()) return;
                this.bodyPaddingRight = parseFloat($LG("body").style().paddingRight);
                var bodyRect = document.documentElement.getBoundingClientRect();
                var scrollbarWidth = window.innerWidth - bodyRect.width;
                $LG(document.body).css("padding-right", scrollbarWidth + this.bodyPaddingRight + "px");
                $LG(document.body).addClass("lg-overlay-open");
            };
            LightGallery.prototype.resetScrollBar = function() {
                if (!this.shouldHideScrollbar()) return;
                $LG(document.body).css("padding-right", this.bodyPaddingRight + "px");
                $LG(document.body).removeClass("lg-overlay-open");
            };
            LightGallery.prototype.openGallery = function(index, element) {
                var _this = this;
                if (index === void 0) index = this.settings.index;
                if (this.lgOpened) return;
                this.lgOpened = true;
                this.outer.removeClass("lg-hide-items");
                this.hideScrollbar();
                this.$container.addClass("lg-show");
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
                this.currentItemsInDom = itemsToBeInsertedToDom;
                var items = "";
                itemsToBeInsertedToDom.forEach((function(item) {
                    items = items + '<div id="' + item + '" class="lg-item"></div>';
                }));
                this.$inner.append(items);
                this.addHtml(index);
                var transform = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var _a = this.mediaContainerPosition, top = _a.top, bottom = _a.bottom;
                if (!this.settings.allowMediaOverlap) this.setMediaContainerPosition(top, bottom);
                var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
                if (this.zoomFromOrigin && element) {
                    this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
                }
                if (!this.zoomFromOrigin || !transform) {
                    this.outer.addClass(this.settings.startClass);
                    this.getSlideItem(index).removeClass("lg-complete");
                }
                var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
                setTimeout((function() {
                    _this.outer.addClass("lg-components-open");
                }), timeout);
                this.index = index;
                this.LGel.trigger(lGEvents.beforeOpen);
                this.getSlideItem(index).addClass("lg-current");
                this.lGalleryOn = false;
                this.prevScrollTop = $LG(window).scrollTop();
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) {
                        var currentSlide_1 = _this.getSlideItem(index);
                        currentSlide_1.css("transform", transform);
                        setTimeout((function() {
                            currentSlide_1.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", _this.settings.startAnimationDuration + "ms");
                            _this.outer.addClass("lg-zoom-from-image");
                        }));
                        setTimeout((function() {
                            currentSlide_1.css("transform", "translate3d(0, 0, 0)");
                        }), 100);
                    }
                    setTimeout((function() {
                        _this.$backdrop.addClass("in");
                        _this.$container.addClass("lg-show-in");
                    }), 10);
                    setTimeout((function() {
                        if (_this.settings.trapFocus && document.body === _this.settings.container) _this.trapFocus();
                    }), _this.settings.backdropDuration + 50);
                    if (!_this.zoomFromOrigin || !transform) setTimeout((function() {
                        _this.outer.addClass("lg-visible");
                    }), _this.settings.backdropDuration);
                    _this.slide(index, false, false, false);
                    _this.LGel.trigger(lGEvents.afterOpen);
                }));
                if (document.body === this.settings.container) $LG("html").addClass("lg-on");
            };
            LightGallery.prototype.getMediaContainerPosition = function() {
                if (this.settings.allowMediaOverlap) return {
                    top: 0,
                    bottom: 0
                };
                var top = this.$toolbar.get().clientHeight || 0;
                var subHtml = this.outer.find(".lg-components .lg-sub-html").get();
                var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
                var thumbContainer = this.outer.find(".lg-thumb-outer").get();
                var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
                var bottom = thumbHeight + captionHeight;
                return {
                    top,
                    bottom
                };
            };
            LightGallery.prototype.setMediaContainerPosition = function(top, bottom) {
                if (top === void 0) top = 0;
                if (bottom === void 0) bottom = 0;
                this.$content.css("top", top + "px").css("bottom", bottom + "px");
            };
            LightGallery.prototype.hideBars = function() {
                var _this = this;
                setTimeout((function() {
                    _this.outer.removeClass("lg-hide-items");
                    if (_this.settings.hideBarsDelay > 0) {
                        _this.outer.on("mousemove.lg click.lg touchstart.lg", (function() {
                            _this.outer.removeClass("lg-hide-items");
                            clearTimeout(_this.hideBarTimeout);
                            _this.hideBarTimeout = setTimeout((function() {
                                _this.outer.addClass("lg-hide-items");
                            }), _this.settings.hideBarsDelay);
                        }));
                        _this.outer.trigger("mousemove.lg");
                    }
                }), this.settings.showBarsAfter);
            };
            LightGallery.prototype.initPictureFill = function($img) {
                if (this.settings.supportLegacyBrowser) try {
                    picturefill({
                        elements: [ $img.get() ]
                    });
                } catch (e) {
                    console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.");
                }
            };
            LightGallery.prototype.counter = function() {
                if (this.settings.counter) {
                    var counterHtml = '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' + this.getIdName("lg-counter-current") + '" class="lg-counter-current">' + (this.index + 1) + ' </span> /\n                <span id="' + this.getIdName("lg-counter-all") + '" class="lg-counter-all">' + this.galleryItems.length + " </span></div>";
                    this.outer.find(this.settings.appendCounterTo).append(counterHtml);
                }
            };
            LightGallery.prototype.addHtml = function(index) {
                var subHtml;
                var subHtmlUrl;
                if (this.galleryItems[index].subHtmlUrl) subHtmlUrl = this.galleryItems[index].subHtmlUrl; else subHtml = this.galleryItems[index].subHtml;
                if (!subHtmlUrl) if (subHtml) {
                    var fL = subHtml.substring(0, 1);
                    if (fL === "." || fL === "#") if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) subHtml = $LG(this.items).eq(index).find(subHtml).first().html(); else subHtml = $LG(subHtml).first().html();
                } else subHtml = "";
                if (this.settings.appendSubHtmlTo !== ".lg-item") if (subHtmlUrl) this.outer.find(".lg-sub-html").load(subHtmlUrl); else this.outer.find(".lg-sub-html").html(subHtml); else {
                    var currentSlide = $LG(this.getSlideItemId(index));
                    if (subHtmlUrl) currentSlide.load(subHtmlUrl); else currentSlide.append('<div class="lg-sub-html">' + subHtml + "</div>");
                }
                if (typeof subHtml !== "undefined" && subHtml !== null) if (subHtml === "") this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html"); else this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html");
                this.LGel.trigger(lGEvents.afterAppendSubHtml, {
                    index
                });
            };
            LightGallery.prototype.preload = function(index) {
                for (var i = 1; i <= this.settings.preload; i++) {
                    if (i >= this.galleryItems.length - index) break;
                    this.loadContent(index + i, false);
                }
                for (var j = 1; j <= this.settings.preload; j++) {
                    if (index - j < 0) break;
                    this.loadContent(index - j, false);
                }
            };
            LightGallery.prototype.getDummyImgStyles = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getVideoContStyle = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getDummyImageContent = function($currentSlide, index, alt) {
                var $currentItem;
                if (!this.settings.dynamic) $currentItem = $LG(this.items).eq(index);
                if ($currentItem) {
                    var _dummyImgSrc = void 0;
                    if (!this.settings.exThumbImage) _dummyImgSrc = $currentItem.find("img").first().attr("src"); else _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
                    if (!_dummyImgSrc) return "";
                    var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                    var dummyImgContent = "<img " + alt + ' style="' + imgStyle + '" class="lg-dummy-img" src="' + _dummyImgSrc + '" />';
                    $currentSlide.addClass("lg-first-slide");
                    this.outer.addClass("lg-first-slide-loading");
                    return dummyImgContent;
                }
                return "";
            };
            LightGallery.prototype.setImgMarkup = function(src, $currentSlide, index) {
                var currentGalleryItem = this.galleryItems[index];
                var alt = currentGalleryItem.alt, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var imgContent = "";
                var altAttr = alt ? 'alt="' + alt + '"' : "";
                if (this.isFirstSlideWithZoomAnimation()) imgContent = this.getDummyImageContent($currentSlide, index, altAttr); else imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
                var imgMarkup = '<picture class="lg-img-wrap"> ' + imgContent + "</picture>";
                $currentSlide.prepend(imgMarkup);
            };
            LightGallery.prototype.onSlideObjectLoad = function($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
                var mediaObject = $slide.find(".lg-object").first();
                if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) onLoad(); else {
                    mediaObject.on("load.lg error.lg", (function() {
                        onLoad && onLoad();
                    }));
                    mediaObject.on("error.lg", (function() {
                        onError && onError();
                    }));
                }
            };
            LightGallery.prototype.onLgObjectLoad = function(currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
                var _this = this;
                this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, (function() {
                    _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
                }), (function() {
                    currentSlide.addClass("lg-complete lg-complete_");
                    currentSlide.html('<span class="lg-error-msg">' + _this.settings.strings["mediaLoadingFailed"] + "</span>");
                }));
            };
            LightGallery.prototype.triggerSlideItemLoad = function($currentSlide, index, delay, speed, isFirstSlide) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var _speed = isFirstSlide && this.getSlideType(currentGalleryItem) === "video" && !currentGalleryItem.poster ? speed : 0;
                setTimeout((function() {
                    $currentSlide.addClass("lg-complete lg-complete_");
                    _this.LGel.trigger(lGEvents.slideItemLoad, {
                        index,
                        delay: delay || 0,
                        isFirstSlide
                    });
                }), _speed);
            };
            LightGallery.prototype.isFirstSlideWithZoomAnimation = function() {
                return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
            };
            LightGallery.prototype.addSlideVideoInfo = function(items) {
                var _this = this;
                items.forEach((function(element, index) {
                    element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
                    if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
                }));
            };
            LightGallery.prototype.loadContent = function(index, rec) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var $currentSlide = $LG(this.getSlideItemId(index));
                var poster = currentGalleryItem.poster, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var src = currentGalleryItem.src;
                var video = currentGalleryItem.video;
                var _html5Video = video && typeof video === "string" ? JSON.parse(video) : video;
                if (currentGalleryItem.responsive) {
                    var srcDyItms = currentGalleryItem.responsive.split(",");
                    src = utils.getResponsiveSrc(srcDyItms) || src;
                }
                var videoInfo = currentGalleryItem.__slideVideoInfo;
                var lgVideoStyle = "";
                var iframe = !!currentGalleryItem.iframe;
                var isFirstSlide = !this.lGalleryOn;
                var delay = 0;
                if (isFirstSlide) if (this.zoomFromOrigin && this.currentImageSize) delay = this.settings.startAnimationDuration + 10; else delay = this.settings.backdropDuration + 10;
                if (!$currentSlide.hasClass("lg-loaded")) {
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_2 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
                        lgVideoStyle = this.getVideoContStyle(videoSize);
                    }
                    if (iframe) {
                        var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
                        $currentSlide.prepend(markup);
                    } else if (poster) {
                        var dummyImg = "";
                        var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
                        if (hasStartAnimation) dummyImg = this.getDummyImageContent($currentSlide, index, "");
                        markup = utils.getVideoPosterMarkup(poster, dummyImg || "", lgVideoStyle, this.settings.strings["playVideo"], videoInfo);
                        $currentSlide.prepend(markup);
                    } else if (videoInfo) {
                        markup = '<div class="lg-video-cont " style="' + lgVideoStyle + '"></div>';
                        $currentSlide.prepend(markup);
                    } else {
                        this.setImgMarkup(src, $currentSlide, index);
                        if (srcset || sources) {
                            var $img = $currentSlide.find(".lg-object");
                            this.initPictureFill($img);
                        }
                    }
                    if (poster || videoInfo) this.LGel.trigger(lGEvents.hasVideo, {
                        index,
                        src,
                        html5Video: _html5Video,
                        hasPoster: !!poster
                    });
                    this.LGel.trigger(lGEvents.afterAppendSlide, {
                        index
                    });
                    if (this.lGalleryOn && this.settings.appendSubHtmlTo === ".lg-item") this.addHtml(index);
                }
                var _speed = 0;
                if (delay && !$LG(document.body).hasClass("lg-from-hash")) _speed = delay;
                if (this.isFirstSlideWithZoomAnimation()) {
                    setTimeout((function() {
                        $currentSlide.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style");
                    }), this.settings.startAnimationDuration + 100);
                    if (!$currentSlide.hasClass("lg-loaded")) setTimeout((function() {
                        if (_this.getSlideType(currentGalleryItem) === "image") {
                            var alt = currentGalleryItem.alt;
                            var altAttr = alt ? 'alt="' + alt + '"' : "";
                            $currentSlide.find(".lg-img-wrap").append(utils.getImgMarkup(index, src, altAttr, srcset, sizes, currentGalleryItem.sources));
                            if (srcset || sources) {
                                var $img = $currentSlide.find(".lg-object");
                                _this.initPictureFill($img);
                            }
                        }
                        if (_this.getSlideType(currentGalleryItem) === "image" || _this.getSlideType(currentGalleryItem) === "video" && poster) {
                            _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
                            _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }));
                        }
                    }), this.settings.startAnimationDuration + 100);
                }
                $currentSlide.addClass("lg-loaded");
                if (!this.isFirstSlideWithZoomAnimation() || this.getSlideType(currentGalleryItem) === "video" && !poster) this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
                if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass("lg-complete_") && !this.lGalleryOn) setTimeout((function() {
                    $currentSlide.addClass("lg-complete");
                }), this.settings.backdropDuration);
                this.lGalleryOn = true;
                if (rec === true) if (!$currentSlide.hasClass("lg-complete_")) $currentSlide.find(".lg-object").first().on("load.lg error.lg", (function() {
                    _this.preload(index);
                })); else this.preload(index);
            };
            LightGallery.prototype.loadContentOnFirstSlideLoad = function(index, $currentSlide, speed) {
                var _this = this;
                setTimeout((function() {
                    $currentSlide.find(".lg-dummy-img").remove();
                    $currentSlide.removeClass("lg-first-slide");
                    _this.outer.removeClass("lg-first-slide-loading");
                    _this.isDummyImageRemoved = true;
                    _this.preload(index);
                }), speed + 300);
            };
            LightGallery.prototype.getItemsToBeInsertedToDom = function(index, prevIndex, numberOfItems) {
                var _this = this;
                if (numberOfItems === void 0) numberOfItems = 0;
                var itemsToBeInsertedToDom = [];
                var possibleNumberOfItems = Math.max(numberOfItems, 3);
                possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
                var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
                if (this.galleryItems.length <= 3) {
                    this.galleryItems.forEach((function(_element, index) {
                        itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
                    }));
                    return itemsToBeInsertedToDom;
                }
                if (index < (this.galleryItems.length - 1) / 2) {
                    for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    var numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
                } else {
                    for (idx = index; idx <= this.galleryItems.length - 1 && idx < index + possibleNumberOfItems / 2; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
                }
                if (this.settings.loop) if (index === this.galleryItems.length - 1) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0); else if (index === 0) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
                if (itemsToBeInsertedToDom.indexOf(prevIndexItem) === -1) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.organizeSlideItems = function(index, prevIndex) {
                var _this = this;
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
                itemsToBeInsertedToDom.forEach((function(item) {
                    if (_this.currentItemsInDom.indexOf(item) === -1) _this.$inner.append('<div id="' + item + '" class="lg-item"></div>');
                }));
                this.currentItemsInDom.forEach((function(item) {
                    if (itemsToBeInsertedToDom.indexOf(item) === -1) $LG("#" + item).remove();
                }));
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.getPreviousSlideIndex = function() {
                var prevIndex = 0;
                try {
                    var currentItemId = this.outer.find(".lg-current").first().attr("id");
                    prevIndex = parseInt(currentItemId.split("-")[3]) || 0;
                } catch (error) {
                    prevIndex = 0;
                }
                return prevIndex;
            };
            LightGallery.prototype.setDownloadValue = function(index) {
                if (this.settings.download) {
                    var currentGalleryItem = this.galleryItems[index];
                    var hideDownloadBtn = currentGalleryItem.downloadUrl === false || currentGalleryItem.downloadUrl === "false";
                    if (hideDownloadBtn) this.outer.addClass("lg-hide-download"); else {
                        var $download = this.getElementById("lg-download");
                        this.outer.removeClass("lg-hide-download");
                        $download.attr("href", currentGalleryItem.downloadUrl || currentGalleryItem.src);
                        if (currentGalleryItem.download) $download.attr("download", currentGalleryItem.download);
                    }
                }
            };
            LightGallery.prototype.makeSlideAnimation = function(direction, currentSlideItem, previousSlideItem) {
                var _this = this;
                if (this.lGalleryOn) previousSlideItem.addClass("lg-slide-progress");
                setTimeout((function() {
                    _this.outer.addClass("lg-no-trans");
                    _this.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide");
                    if (direction === "prev") {
                        currentSlideItem.addClass("lg-prev-slide");
                        previousSlideItem.addClass("lg-next-slide");
                    } else {
                        currentSlideItem.addClass("lg-next-slide");
                        previousSlideItem.addClass("lg-prev-slide");
                    }
                    setTimeout((function() {
                        _this.outer.find(".lg-item").removeClass("lg-current");
                        currentSlideItem.addClass("lg-current");
                        _this.outer.removeClass("lg-no-trans");
                    }), 50);
                }), this.lGalleryOn ? this.settings.slideDelay : 0);
            };
            LightGallery.prototype.slide = function(index, fromTouch, fromThumb, direction) {
                var _this = this;
                var prevIndex = this.getPreviousSlideIndex();
                this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
                if (this.lGalleryOn && prevIndex === index) return;
                var numberOfGalleryItems = this.galleryItems.length;
                if (!this.lgBusy) {
                    if (this.settings.counter) this.updateCurrentCounter(index);
                    var currentSlideItem = this.getSlideItem(index);
                    var previousSlideItem_1 = this.getSlideItem(prevIndex);
                    var currentGalleryItem = this.galleryItems[index];
                    var videoInfo = currentGalleryItem.__slideVideoInfo;
                    this.outer.attr("data-lg-slide-type", this.getSlideType(currentGalleryItem));
                    this.setDownloadValue(index);
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_3 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
                        this.resizeVideoSlide(index, videoSize);
                    }
                    this.LGel.trigger(lGEvents.beforeSlide, {
                        prevIndex,
                        index,
                        fromTouch: !!fromTouch,
                        fromThumb: !!fromThumb
                    });
                    this.lgBusy = true;
                    clearTimeout(this.hideBarTimeout);
                    this.arrowDisable(index);
                    if (!direction) if (index < prevIndex) direction = "prev"; else if (index > prevIndex) direction = "next";
                    if (!fromTouch) this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1); else {
                        this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
                        var touchPrev = void 0;
                        var touchNext = void 0;
                        if (numberOfGalleryItems > 2) {
                            touchPrev = index - 1;
                            touchNext = index + 1;
                            if (index === 0 && prevIndex === numberOfGalleryItems - 1) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            } else if (index === numberOfGalleryItems - 1 && prevIndex === 0) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            }
                        } else {
                            touchPrev = 0;
                            touchNext = 1;
                        }
                        if (direction === "prev") this.getSlideItem(touchNext).addClass("lg-next-slide"); else this.getSlideItem(touchPrev).addClass("lg-prev-slide");
                        currentSlideItem.addClass("lg-current");
                    }
                    if (!this.lGalleryOn) this.loadContent(index, true); else setTimeout((function() {
                        _this.loadContent(index, true);
                        if (_this.settings.appendSubHtmlTo !== ".lg-item") _this.addHtml(index);
                    }), this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
                    setTimeout((function() {
                        _this.lgBusy = false;
                        previousSlideItem_1.removeClass("lg-slide-progress");
                        _this.LGel.trigger(lGEvents.afterSlide, {
                            prevIndex,
                            index,
                            fromTouch,
                            fromThumb
                        });
                    }), (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
                }
                this.index = index;
            };
            LightGallery.prototype.updateCurrentCounter = function(index) {
                this.getElementById("lg-counter-current").html(index + 1 + "");
            };
            LightGallery.prototype.updateCounterTotal = function() {
                this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
            };
            LightGallery.prototype.getSlideType = function(item) {
                if (item.__slideVideoInfo) return "video"; else if (item.iframe) return "iframe"; else return "image";
            };
            LightGallery.prototype.touchMove = function(startCoords, endCoords, e) {
                var distanceX = endCoords.pageX - startCoords.pageX;
                var distanceY = endCoords.pageY - startCoords.pageY;
                var allowSwipe = false;
                if (this.swipeDirection) allowSwipe = true; else if (Math.abs(distanceX) > 15) {
                    this.swipeDirection = "horizontal";
                    allowSwipe = true;
                } else if (Math.abs(distanceY) > 15) {
                    this.swipeDirection = "vertical";
                    allowSwipe = true;
                }
                if (!allowSwipe) return;
                var $currentSlide = this.getSlideItem(this.index);
                if (this.swipeDirection === "horizontal") {
                    e === null || e === void 0 ? void 0 : e.preventDefault();
                    this.outer.addClass("lg-dragging");
                    this.setTranslate($currentSlide, distanceX, 0);
                    var width = $currentSlide.get().offsetWidth;
                    var slideWidthAmount = width * 15 / 100;
                    var gutter = slideWidthAmount - Math.abs(distanceX * 10 / 100);
                    this.setTranslate(this.outer.find(".lg-prev-slide").first(), -width + distanceX - gutter, 0);
                    this.setTranslate(this.outer.find(".lg-next-slide").first(), width + distanceX + gutter, 0);
                } else if (this.swipeDirection === "vertical") if (this.settings.swipeToClose) {
                    e === null || e === void 0 ? void 0 : e.preventDefault();
                    this.$container.addClass("lg-dragging-vertical");
                    var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
                    this.$backdrop.css("opacity", opacity);
                    var scale = 1 - Math.abs(distanceY) / (window.innerWidth * 2);
                    this.setTranslate($currentSlide, 0, distanceY, scale, scale);
                    if (Math.abs(distanceY) > 100) this.outer.addClass("lg-hide-items").removeClass("lg-components-open");
                }
            };
            LightGallery.prototype.touchEnd = function(endCoords, startCoords, event) {
                var _this = this;
                var distance;
                if (this.settings.mode !== "lg-slide") this.outer.addClass("lg-slide");
                setTimeout((function() {
                    _this.$container.removeClass("lg-dragging-vertical");
                    _this.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
                    var triggerClick = true;
                    if (_this.swipeDirection === "horizontal") {
                        distance = endCoords.pageX - startCoords.pageX;
                        var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
                        if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToNextSlide(true);
                            triggerClick = false;
                        } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToPrevSlide(true);
                            triggerClick = false;
                        }
                    } else if (_this.swipeDirection === "vertical") {
                        distance = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
                            _this.closeGallery();
                            return;
                        } else _this.$backdrop.css("opacity", 1);
                    }
                    _this.outer.find(".lg-item").removeAttr("style");
                    if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
                        var target = $LG(event.target);
                        if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                    }
                    _this.swipeDirection = void 0;
                }));
                setTimeout((function() {
                    if (!_this.outer.hasClass("lg-dragging") && _this.settings.mode !== "lg-slide") _this.outer.removeClass("lg-slide");
                }), this.settings.speed + 100);
            };
            LightGallery.prototype.enableSwipe = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isMoved = false;
                var isSwiping = false;
                if (this.settings.enableSwipe) {
                    this.$inner.on("touchstart.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if (($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) && !_this.outer.hasClass("lg-zoomed") && !_this.lgBusy && e.touches.length === 1) {
                            isSwiping = true;
                            _this.touchAction = "swipe";
                            _this.manageSwipeClass();
                            startCoords = {
                                pageX: e.touches[0].pageX,
                                pageY: e.touches[0].pageY
                            };
                        }
                    }));
                    this.$inner.on("touchmove.lg", (function(e) {
                        if (isSwiping && _this.touchAction === "swipe" && e.touches.length === 1) {
                            endCoords = {
                                pageX: e.touches[0].pageX,
                                pageY: e.touches[0].pageY
                            };
                            _this.touchMove(startCoords, endCoords, e);
                            isMoved = true;
                        }
                    }));
                    this.$inner.on("touchend.lg", (function(event) {
                        if (_this.touchAction === "swipe") {
                            if (isMoved) {
                                isMoved = false;
                                _this.touchEnd(endCoords, startCoords, event);
                            } else if (isSwiping) {
                                var target = $LG(event.target);
                                if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                            }
                            _this.touchAction = void 0;
                            isSwiping = false;
                        }
                    }));
                }
            };
            LightGallery.prototype.enableDrag = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isDraging = false;
                var isMoved = false;
                if (this.settings.enableDrag) {
                    this.outer.on("mousedown.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if ($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) if (!_this.outer.hasClass("lg-zoomed") && !_this.lgBusy) {
                            e.preventDefault();
                            if (!_this.lgBusy) {
                                _this.manageSwipeClass();
                                startCoords = {
                                    pageX: e.pageX,
                                    pageY: e.pageY
                                };
                                isDraging = true;
                                _this.outer.get().scrollLeft += 1;
                                _this.outer.get().scrollLeft -= 1;
                                _this.outer.removeClass("lg-grab").addClass("lg-grabbing");
                                _this.LGel.trigger(lGEvents.dragStart);
                            }
                        }
                    }));
                    $LG(window).on("mousemove.lg.global" + this.lgId, (function(e) {
                        if (isDraging && _this.lgOpened) {
                            isMoved = true;
                            endCoords = {
                                pageX: e.pageX,
                                pageY: e.pageY
                            };
                            _this.touchMove(startCoords, endCoords);
                            _this.LGel.trigger(lGEvents.dragMove);
                        }
                    }));
                    $LG(window).on("mouseup.lg.global" + this.lgId, (function(event) {
                        if (!_this.lgOpened) return;
                        var target = $LG(event.target);
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords, startCoords, event);
                            _this.LGel.trigger(lGEvents.dragEnd);
                        } else if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                        if (isDraging) {
                            isDraging = false;
                            _this.outer.removeClass("lg-grabbing").addClass("lg-grab");
                        }
                    }));
                }
            };
            LightGallery.prototype.triggerPosterClick = function() {
                var _this = this;
                this.$inner.on("click.lg", (function(event) {
                    if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) _this.LGel.trigger(lGEvents.posterClick);
                }));
            };
            LightGallery.prototype.manageSwipeClass = function() {
                var _touchNext = this.index + 1;
                var _touchPrev = this.index - 1;
                if (this.settings.loop && this.galleryItems.length > 2) if (this.index === 0) _touchPrev = this.galleryItems.length - 1; else if (this.index === this.galleryItems.length - 1) _touchNext = 0;
                this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide");
                if (_touchPrev > -1) this.getSlideItem(_touchPrev).addClass("lg-prev-slide");
                this.getSlideItem(_touchNext).addClass("lg-next-slide");
            };
            LightGallery.prototype.goToNextSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index + 1 < this.galleryItems.length) {
                    this.index++;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (_loop) {
                    this.index = 0;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-right-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-right-end");
                    }), 400);
                }
            };
            LightGallery.prototype.goToPrevSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index > 0) {
                    this.index--;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (_loop) {
                    this.index = this.galleryItems.length - 1;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-left-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-left-end");
                    }), 400);
                }
            };
            LightGallery.prototype.keyPress = function() {
                var _this = this;
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (_this.lgOpened && _this.settings.escKey === true && e.keyCode === 27) {
                        e.preventDefault();
                        if (_this.settings.allowMediaOverlap && _this.outer.hasClass("lg-can-toggle") && _this.outer.hasClass("lg-components-open")) _this.outer.removeClass("lg-components-open"); else _this.closeGallery();
                    }
                    if (_this.lgOpened && _this.galleryItems.length > 1) {
                        if (e.keyCode === 37) {
                            e.preventDefault();
                            _this.goToPrevSlide();
                        }
                        if (e.keyCode === 39) {
                            e.preventDefault();
                            _this.goToNextSlide();
                        }
                    }
                }));
            };
            LightGallery.prototype.arrow = function() {
                var _this = this;
                this.getElementById("lg-prev").on("click.lg", (function() {
                    _this.goToPrevSlide();
                }));
                this.getElementById("lg-next").on("click.lg", (function() {
                    _this.goToNextSlide();
                }));
            };
            LightGallery.prototype.arrowDisable = function(index) {
                if (!this.settings.loop && this.settings.hideControlOnEnd) {
                    var $prev = this.getElementById("lg-prev");
                    var $next = this.getElementById("lg-next");
                    if (index + 1 === this.galleryItems.length) $next.attr("disabled", "disabled").addClass("disabled"); else $next.removeAttr("disabled").removeClass("disabled");
                    if (index === 0) $prev.attr("disabled", "disabled").addClass("disabled"); else $prev.removeAttr("disabled").removeClass("disabled");
                }
            };
            LightGallery.prototype.setTranslate = function($el, xValue, yValue, scaleX, scaleY) {
                if (scaleX === void 0) scaleX = 1;
                if (scaleY === void 0) scaleY = 1;
                $el.css("transform", "translate3d(" + xValue + "px, " + yValue + "px, 0px) scale3d(" + scaleX + ", " + scaleY + ", 1)");
            };
            LightGallery.prototype.mousewheel = function() {
                var _this = this;
                var lastCall = 0;
                this.outer.on("wheel.lg", (function(e) {
                    if (!e.deltaY || _this.galleryItems.length < 2) return;
                    e.preventDefault();
                    var now = (new Date).getTime();
                    if (now - lastCall < 1e3) return;
                    lastCall = now;
                    if (e.deltaY > 0) _this.goToNextSlide(); else if (e.deltaY < 0) _this.goToPrevSlide();
                }));
            };
            LightGallery.prototype.isSlideElement = function(target) {
                return target.hasClass("lg-outer") || target.hasClass("lg-item") || target.hasClass("lg-img-wrap");
            };
            LightGallery.prototype.isPosterElement = function(target) {
                var playButton = this.getSlideItem(this.index).find(".lg-video-play-button").get();
                return target.hasClass("lg-video-poster") || target.hasClass("lg-video-play-button") || playButton && playButton.contains(target.get());
            };
            LightGallery.prototype.toggleMaximize = function() {
                var _this = this;
                this.getElementById("lg-maximize").on("click.lg", (function() {
                    _this.$container.toggleClass("lg-inline");
                    _this.refreshOnResize();
                }));
            };
            LightGallery.prototype.invalidateItems = function() {
                for (var index = 0; index < this.items.length; index++) {
                    var element = this.items[index];
                    var $element = $LG(element);
                    $element.off("click.lgcustom-item-" + $element.attr("data-lg-id"));
                }
            };
            LightGallery.prototype.trapFocus = function() {
                var _this = this;
                this.$container.get().focus({
                    preventScroll: true
                });
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (!_this.lgOpened) return;
                    var isTabPressed = e.key === "Tab" || e.keyCode === 9;
                    if (!isTabPressed) return;
                    var focusableEls = utils.getFocusableElements(_this.$container.get());
                    var firstFocusableEl = focusableEls[0];
                    var lastFocusableEl = focusableEls[focusableEls.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            e.preventDefault();
                        }
                    } else if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }));
            };
            LightGallery.prototype.manageCloseGallery = function() {
                var _this = this;
                if (!this.settings.closable) return;
                var mousedown = false;
                this.getElementById("lg-close").on("click.lg", (function() {
                    _this.closeGallery();
                }));
                if (this.settings.closeOnTap) {
                    this.outer.on("mousedown.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target)) mousedown = true; else mousedown = false;
                    }));
                    this.outer.on("mousemove.lg", (function() {
                        mousedown = false;
                    }));
                    this.outer.on("mouseup.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target) && mousedown) if (!_this.outer.hasClass("lg-dragging")) _this.closeGallery();
                    }));
                }
            };
            LightGallery.prototype.closeGallery = function(force) {
                var _this = this;
                if (!this.lgOpened || !this.settings.closable && !force) return 0;
                this.LGel.trigger(lGEvents.beforeClose);
                if (this.settings.resetScrollPosition && !this.settings.hideScrollbar) $LG(window).scrollTop(this.prevScrollTop);
                var currentItem = this.items[this.index];
                var transform;
                if (this.zoomFromOrigin && currentItem) {
                    var _a = this.mediaContainerPosition, top_4 = _a.top, bottom = _a.bottom;
                    var _b = this.galleryItems[this.index], __slideVideoInfo = _b.__slideVideoInfo, poster = _b.poster;
                    var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
                    transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
                }
                if (this.zoomFromOrigin && transform) {
                    this.outer.addClass("lg-closing lg-zoom-from-image");
                    this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration", this.settings.startAnimationDuration + "ms").css("transform", transform);
                } else {
                    this.outer.addClass("lg-hide-items");
                    this.outer.removeClass("lg-zoom-from-image");
                }
                this.destroyModules();
                this.lGalleryOn = false;
                this.isDummyImageRemoved = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                clearTimeout(this.hideBarTimeout);
                this.hideBarTimeout = false;
                $LG("html").removeClass("lg-on");
                this.outer.removeClass("lg-visible lg-components-open");
                this.$backdrop.removeClass("in").css("opacity", 0);
                var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
                this.$container.removeClass("lg-show-in");
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) _this.outer.removeClass("lg-zoom-from-image");
                    _this.$container.removeClass("lg-show");
                    _this.resetScrollBar();
                    _this.$backdrop.removeAttr("style").css("transition-duration", _this.settings.backdropDuration + "ms");
                    _this.outer.removeClass("lg-closing " + _this.settings.startClass);
                    _this.getSlideItem(_this.index).removeClass("lg-start-end-progress");
                    _this.$inner.empty();
                    if (_this.lgOpened) _this.LGel.trigger(lGEvents.afterClose, {
                        instance: _this
                    });
                    if (_this.$container.get()) _this.$container.get().blur();
                    _this.lgOpened = false;
                }), removeTimeout + 100);
                return removeTimeout + 100;
            };
            LightGallery.prototype.initModules = function() {
                this.plugins.forEach((function(module) {
                    try {
                        module.init();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly initiated");
                    }
                }));
            };
            LightGallery.prototype.destroyModules = function(destroy) {
                this.plugins.forEach((function(module) {
                    try {
                        if (destroy) module.destroy(); else module.closeGallery && module.closeGallery();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
                    }
                }));
            };
            LightGallery.prototype.refresh = function(galleryItems) {
                if (!this.settings.dynamic) this.invalidateItems();
                if (galleryItems) this.galleryItems = galleryItems; else this.galleryItems = this.getItems();
                this.updateControls();
                this.openGalleryOnItemClick();
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.updateControls = function() {
                this.addSlideVideoInfo(this.galleryItems);
                this.updateCounterTotal();
                this.manageSingleSlideClassName();
            };
            LightGallery.prototype.destroyGallery = function() {
                this.destroyModules(true);
                if (!this.settings.dynamic) this.invalidateItems();
                $LG(window).off(".lg.global" + this.lgId);
                this.LGel.off(".lg");
                this.$container.remove();
            };
            LightGallery.prototype.destroy = function() {
                var closeTimeout = this.closeGallery(true);
                if (closeTimeout) setTimeout(this.destroyGallery.bind(this), closeTimeout); else this.destroyGallery();
                return closeTimeout;
            };
            return LightGallery;
        }();
        function lightGallery(el, options) {
            return new LightGallery(el, options);
        }
        const lightgallery_es5 = lightGallery;
        var lg_thumbnail_min = __webpack_require__(757);
        const galleries = document.querySelectorAll("[data-gallery]");
        if (galleries.length) {
            let galleyItems = [];
            galleries.forEach((gallery => {
                galleyItems.push({
                    gallery,
                    galleryClass: lightgallery_es5(gallery, {
                        plugins: [ lg_thumbnail_min ],
                        licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
                        speed: 500,
                        download: false
                    })
                });
            }));
            modules_flsModules.gallery = galleyItems;
        }
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
        var HOOKS = [ "onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition" ];
        var defaults = {
            _disable: [],
            allowInput: false,
            allowInvalidPreload: false,
            altFormat: "F j, Y",
            altInput: false,
            altInputClass: "form-control input",
            animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
            ariaDateFormat: "F j, Y",
            autoFillDefaultTime: true,
            clickOpens: true,
            closeOnSelect: true,
            conjunction: ", ",
            dateFormat: "Y-m-d",
            defaultHour: 12,
            defaultMinute: 0,
            defaultSeconds: 0,
            disable: [],
            disableMobile: false,
            enableSeconds: false,
            enableTime: false,
            errorHandler: function(err) {
                return typeof console !== "undefined" && console.warn(err);
            },
            getWeek: function(givenDate) {
                var date = new Date(givenDate.getTime());
                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
                var week1 = new Date(date.getFullYear(), 0, 4);
                return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
            },
            hourIncrement: 1,
            ignoredFocusElements: [],
            inline: false,
            locale: "default",
            minuteIncrement: 5,
            mode: "single",
            monthSelectorType: "dropdown",
            nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
            noCalendar: false,
            now: new Date,
            onChange: [],
            onClose: [],
            onDayCreate: [],
            onDestroy: [],
            onKeyDown: [],
            onMonthChange: [],
            onOpen: [],
            onParseConfig: [],
            onReady: [],
            onValueUpdate: [],
            onYearChange: [],
            onPreCalendarPosition: [],
            plugins: [],
            position: "auto",
            positionElement: void 0,
            prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
            shorthandCurrentMonth: false,
            showMonths: 1,
            static: false,
            time_24hr: false,
            weekNumbers: false,
            wrap: false
        };
        var english = {
            weekdays: {
                shorthand: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                longhand: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
            },
            months: {
                shorthand: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                longhand: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
            },
            daysInMonth: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
            firstDayOfWeek: 0,
            ordinal: function(nth) {
                var s = nth % 100;
                if (s > 3 && s < 21) return "th";
                switch (s % 10) {
                  case 1:
                    return "st";

                  case 2:
                    return "nd";

                  case 3:
                    return "rd";

                  default:
                    return "th";
                }
            },
            rangeSeparator: " to ",
            weekAbbreviation: "Wk",
            scrollTitle: "Scroll to increment",
            toggleTitle: "Click to toggle",
            amPM: [ "AM", "PM" ],
            yearAriaLabel: "Year",
            monthAriaLabel: "Month",
            hourAriaLabel: "Hour",
            minuteAriaLabel: "Minute",
            time_24hr: false
        };
        const l10n_default = english;
        var utils_pad = function(number, length) {
            if (length === void 0) length = 2;
            return ("000" + number).slice(length * -1);
        };
        var utils_int = function(bool) {
            return bool === true ? 1 : 0;
        };
        function utils_debounce(fn, wait) {
            var t;
            return function() {
                var _this = this;
                var args = arguments;
                clearTimeout(t);
                t = setTimeout((function() {
                    return fn.apply(_this, args);
                }), wait);
            };
        }
        var arrayify = function(obj) {
            return obj instanceof Array ? obj : [ obj ];
        };
        function dom_toggleClass(elem, className, bool) {
            if (bool === true) return elem.classList.add(className);
            elem.classList.remove(className);
        }
        function createElement(tag, className, content) {
            var e = window.document.createElement(tag);
            className = className || "";
            content = content || "";
            e.className = className;
            if (content !== void 0) e.textContent = content;
            return e;
        }
        function clearNode(node) {
            while (node.firstChild) node.removeChild(node.firstChild);
        }
        function findParent(node, condition) {
            if (condition(node)) return node; else if (node.parentNode) return findParent(node.parentNode, condition);
            return;
        }
        function createNumberInput(inputClassName, opts) {
            var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
            if (navigator.userAgent.indexOf("MSIE 9.0") === -1) numInput.type = "number"; else {
                numInput.type = "text";
                numInput.pattern = "\\d*";
            }
            if (opts !== void 0) for (var key in opts) numInput.setAttribute(key, opts[key]);
            wrapper.appendChild(numInput);
            wrapper.appendChild(arrowUp);
            wrapper.appendChild(arrowDown);
            return wrapper;
        }
        function getEventTarget(event) {
            try {
                if (typeof event.composedPath === "function") {
                    var path = event.composedPath();
                    return path[0];
                }
                return event.target;
            } catch (error) {
                return event.target;
            }
        }
        var doNothing = function() {
            return;
        };
        var monthToStr = function(monthNumber, shorthand, locale) {
            return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
        };
        var revFormat = {
            D: doNothing,
            F: function(dateObj, monthName, locale) {
                dateObj.setMonth(locale.months.longhand.indexOf(monthName));
            },
            G: function(dateObj, hour) {
                dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
            },
            H: function(dateObj, hour) {
                dateObj.setHours(parseFloat(hour));
            },
            J: function(dateObj, day) {
                dateObj.setDate(parseFloat(day));
            },
            K: function(dateObj, amPM, locale) {
                dateObj.setHours(dateObj.getHours() % 12 + 12 * utils_int(new RegExp(locale.amPM[1], "i").test(amPM)));
            },
            M: function(dateObj, shortMonth, locale) {
                dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
            },
            S: function(dateObj, seconds) {
                dateObj.setSeconds(parseFloat(seconds));
            },
            U: function(_, unixSeconds) {
                return new Date(parseFloat(unixSeconds) * 1e3);
            },
            W: function(dateObj, weekNum, locale) {
                var weekNumber = parseInt(weekNum);
                var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
                date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
                return date;
            },
            Y: function(dateObj, year) {
                dateObj.setFullYear(parseFloat(year));
            },
            Z: function(_, ISODate) {
                return new Date(ISODate);
            },
            d: function(dateObj, day) {
                dateObj.setDate(parseFloat(day));
            },
            h: function(dateObj, hour) {
                dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
            },
            i: function(dateObj, minutes) {
                dateObj.setMinutes(parseFloat(minutes));
            },
            j: function(dateObj, day) {
                dateObj.setDate(parseFloat(day));
            },
            l: doNothing,
            m: function(dateObj, month) {
                dateObj.setMonth(parseFloat(month) - 1);
            },
            n: function(dateObj, month) {
                dateObj.setMonth(parseFloat(month) - 1);
            },
            s: function(dateObj, seconds) {
                dateObj.setSeconds(parseFloat(seconds));
            },
            u: function(_, unixMillSeconds) {
                return new Date(parseFloat(unixMillSeconds));
            },
            w: doNothing,
            y: function(dateObj, year) {
                dateObj.setFullYear(2e3 + parseFloat(year));
            }
        };
        var tokenRegex = {
            D: "",
            F: "",
            G: "(\\d\\d|\\d)",
            H: "(\\d\\d|\\d)",
            J: "(\\d\\d|\\d)\\w+",
            K: "",
            M: "",
            S: "(\\d\\d|\\d)",
            U: "(.+)",
            W: "(\\d\\d|\\d)",
            Y: "(\\d{4})",
            Z: "(.+)",
            d: "(\\d\\d|\\d)",
            h: "(\\d\\d|\\d)",
            i: "(\\d\\d|\\d)",
            j: "(\\d\\d|\\d)",
            l: "",
            m: "(\\d\\d|\\d)",
            n: "(\\d\\d|\\d)",
            s: "(\\d\\d|\\d)",
            u: "(.+)",
            w: "(\\d\\d|\\d)",
            y: "(\\d{2})"
        };
        var formats = {
            Z: function(date) {
                return date.toISOString();
            },
            D: function(date, locale, options) {
                return locale.weekdays.shorthand[formats.w(date, locale, options)];
            },
            F: function(date, locale, options) {
                return monthToStr(formats.n(date, locale, options) - 1, false, locale);
            },
            G: function(date, locale, options) {
                return utils_pad(formats.h(date, locale, options));
            },
            H: function(date) {
                return utils_pad(date.getHours());
            },
            J: function(date, locale) {
                return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
            },
            K: function(date, locale) {
                return locale.amPM[utils_int(date.getHours() > 11)];
            },
            M: function(date, locale) {
                return monthToStr(date.getMonth(), true, locale);
            },
            S: function(date) {
                return utils_pad(date.getSeconds());
            },
            U: function(date) {
                return date.getTime() / 1e3;
            },
            W: function(date, _, options) {
                return options.getWeek(date);
            },
            Y: function(date) {
                return utils_pad(date.getFullYear(), 4);
            },
            d: function(date) {
                return utils_pad(date.getDate());
            },
            h: function(date) {
                return date.getHours() % 12 ? date.getHours() % 12 : 12;
            },
            i: function(date) {
                return utils_pad(date.getMinutes());
            },
            j: function(date) {
                return date.getDate();
            },
            l: function(date, locale) {
                return locale.weekdays.longhand[date.getDay()];
            },
            m: function(date) {
                return utils_pad(date.getMonth() + 1);
            },
            n: function(date) {
                return date.getMonth() + 1;
            },
            s: function(date) {
                return date.getSeconds();
            },
            u: function(date) {
                return date.getTime();
            },
            w: function(date) {
                return date.getDay();
            },
            y: function(date) {
                return String(date.getFullYear()).substring(2);
            }
        };
        var createDateFormatter = function(_a) {
            var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
            return function(dateObj, frmt, overrideLocale) {
                var locale = overrideLocale || l10n;
                if (config.formatDate !== void 0 && !isMobile) return config.formatDate(dateObj, frmt, locale);
                return frmt.split("").map((function(c, i, arr) {
                    return formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "";
                })).join("");
            };
        };
        var createDateParser = function(_a) {
            var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
            return function(date, givenFormat, timeless, customLocale) {
                if (date !== 0 && !date) return;
                var locale = customLocale || l10n;
                var parsedDate;
                var dateOrig = date;
                if (date instanceof Date) parsedDate = new Date(date.getTime()); else if (typeof date !== "string" && date.toFixed !== void 0) parsedDate = new Date(date); else if (typeof date === "string") {
                    var format = givenFormat || (config || defaults).dateFormat;
                    var datestr = String(date).trim();
                    if (datestr === "today") {
                        parsedDate = new Date;
                        timeless = true;
                    } else if (config && config.parseDate) parsedDate = config.parseDate(date, format); else if (/Z$/.test(datestr) || /GMT$/.test(datestr)) parsedDate = new Date(date); else {
                        var matched = void 0, ops = [];
                        for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                            var token = format[i];
                            var isBackSlash = token === "\\";
                            var escaped = format[i - 1] === "\\" || isBackSlash;
                            if (tokenRegex[token] && !escaped) {
                                regexStr += tokenRegex[token];
                                var match = new RegExp(regexStr).exec(date);
                                if (match && (matched = true)) ops[token !== "Y" ? "push" : "unshift"]({
                                    fn: revFormat[token],
                                    val: match[++matchIndex]
                                });
                            } else if (!isBackSlash) regexStr += ".";
                        }
                        parsedDate = !config || !config.noCalendar ? new Date((new Date).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((new Date).setHours(0, 0, 0, 0));
                        ops.forEach((function(_a) {
                            var fn = _a.fn, val = _a.val;
                            return parsedDate = fn(parsedDate, val, locale) || parsedDate;
                        }));
                        parsedDate = matched ? parsedDate : void 0;
                    }
                }
                if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                    config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                    return;
                }
                if (timeless === true) parsedDate.setHours(0, 0, 0, 0);
                return parsedDate;
            };
        };
        function compareDates(date1, date2, timeless) {
            if (timeless === void 0) timeless = true;
            if (timeless !== false) return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
            return date1.getTime() - date2.getTime();
        }
        var isBetween = function(ts, ts1, ts2) {
            return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
        };
        var calculateSecondsSinceMidnight = function(hours, minutes, seconds) {
            return hours * 3600 + minutes * 60 + seconds;
        };
        var parseSeconds = function(secondsSinceMidnight) {
            var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
            return [ hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60 ];
        };
        var duration = {
            DAY: 864e5
        };
        function getDefaultHours(config) {
            var hours = config.defaultHour;
            var minutes = config.defaultMinute;
            var seconds = config.defaultSeconds;
            if (config.minDate !== void 0) {
                var minHour = config.minDate.getHours();
                var minMinutes = config.minDate.getMinutes();
                var minSeconds = config.minDate.getSeconds();
                if (hours < minHour) hours = minHour;
                if (hours === minHour && minutes < minMinutes) minutes = minMinutes;
                if (hours === minHour && minutes === minMinutes && seconds < minSeconds) seconds = config.minDate.getSeconds();
            }
            if (config.maxDate !== void 0) {
                var maxHr = config.maxDate.getHours();
                var maxMinutes = config.maxDate.getMinutes();
                hours = Math.min(hours, maxHr);
                if (hours === maxHr) minutes = Math.min(maxMinutes, minutes);
                if (hours === maxHr && minutes === maxMinutes) seconds = config.maxDate.getSeconds();
            }
            return {
                hours,
                minutes,
                seconds
            };
        }
        __webpack_require__(990);
        var esm_assign = void 0 && (void 0).__assign || function() {
            esm_assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return esm_assign.apply(this, arguments);
        };
        var esm_spreadArrays = void 0 && (void 0).__spreadArrays || function() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
            var r = Array(s), k = 0;
            for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
            k++) r[k] = a[j];
            return r;
        };
        var DEBOUNCED_CHANGE_MS = 300;
        function FlatpickrInstance(element, instanceConfig) {
            var self = {
                config: esm_assign(esm_assign({}, defaults), flatpickr.defaultConfig),
                l10n: l10n_default
            };
            self.parseDate = createDateParser({
                config: self.config,
                l10n: self.l10n
            });
            self._handlers = [];
            self.pluginElements = [];
            self.loadedPlugins = [];
            self._bind = bind;
            self._setHoursFromDate = setHoursFromDate;
            self._positionCalendar = positionCalendar;
            self.changeMonth = changeMonth;
            self.changeYear = changeYear;
            self.clear = clear;
            self.close = close;
            self.onMouseOver = onMouseOver;
            self._createElement = createElement;
            self.createDay = createDay;
            self.destroy = destroy;
            self.isEnabled = isEnabled;
            self.jumpToDate = jumpToDate;
            self.updateValue = updateValue;
            self.open = open;
            self.redraw = redraw;
            self.set = set;
            self.setDate = setDate;
            self.toggle = toggle;
            function setupHelperFunctions() {
                self.utils = {
                    getDaysInMonth: function(month, yr) {
                        if (month === void 0) month = self.currentMonth;
                        if (yr === void 0) yr = self.currentYear;
                        if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;
                        return self.l10n.daysInMonth[month];
                    }
                };
            }
            function init() {
                self.element = self.input = element;
                self.isOpen = false;
                parseConfig();
                setupLocale();
                setupInputs();
                setupDates();
                setupHelperFunctions();
                if (!self.isMobile) build();
                bindEvents();
                if (self.selectedDates.length || self.config.noCalendar) {
                    if (self.config.enableTime) setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : void 0);
                    updateValue(false);
                }
                setCalendarWidth();
                var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                if (!self.isMobile && isSafari) positionCalendar();
                triggerEvent("onReady");
            }
            function getClosestActiveElement() {
                var _a;
                return ((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
            }
            function bindToInstance(fn) {
                return fn.bind(self);
            }
            function setCalendarWidth() {
                var config = self.config;
                if (config.weekNumbers === false && config.showMonths === 1) return; else if (config.noCalendar !== true) window.requestAnimationFrame((function() {
                    if (self.calendarContainer !== void 0) {
                        self.calendarContainer.style.visibility = "hidden";
                        self.calendarContainer.style.display = "block";
                    }
                    if (self.daysContainer !== void 0) {
                        var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                        self.daysContainer.style.width = daysWidth + "px";
                        self.calendarContainer.style.width = daysWidth + (self.weekWrapper !== void 0 ? self.weekWrapper.offsetWidth : 0) + "px";
                        self.calendarContainer.style.removeProperty("visibility");
                        self.calendarContainer.style.removeProperty("display");
                    }
                }));
            }
            function updateTime(e) {
                if (self.selectedDates.length === 0) {
                    var defaultDate = self.config.minDate === void 0 || compareDates(new Date, self.config.minDate) >= 0 ? new Date : new Date(self.config.minDate.getTime());
                    var defaults = getDefaultHours(self.config);
                    defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
                    self.selectedDates = [ defaultDate ];
                    self.latestSelectedDateObj = defaultDate;
                }
                if (e !== void 0 && e.type !== "blur") timeWrapper(e);
                var prevValue = self._input.value;
                setHoursFromInputs();
                updateValue();
                if (self._input.value !== prevValue) self._debouncedChange();
            }
            function ampm2military(hour, amPM) {
                return hour % 12 + 12 * utils_int(amPM === self.l10n.amPM[1]);
            }
            function military2ampm(hour) {
                switch (hour % 24) {
                  case 0:
                  case 12:
                    return 12;

                  default:
                    return hour % 12;
                }
            }
            function setHoursFromInputs() {
                if (self.hourElement === void 0 || self.minuteElement === void 0) return;
                var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== void 0 ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;
                if (self.amPM !== void 0) hours = ampm2military(hours, self.amPM.textContent);
                var limitMinHours = self.config.minTime !== void 0 || self.config.minDate && self.minDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.minDate, true) === 0;
                var limitMaxHours = self.config.maxTime !== void 0 || self.config.maxDate && self.maxDateHasTime && self.latestSelectedDateObj && compareDates(self.latestSelectedDateObj, self.config.maxDate, true) === 0;
                if (self.config.maxTime !== void 0 && self.config.minTime !== void 0 && self.config.minTime > self.config.maxTime) {
                    var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
                    var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
                    var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
                    if (currentTime > maxBound && currentTime < minBound) {
                        var result = parseSeconds(minBound);
                        hours = result[0];
                        minutes = result[1];
                        seconds = result[2];
                    }
                } else {
                    if (limitMaxHours) {
                        var maxTime = self.config.maxTime !== void 0 ? self.config.maxTime : self.config.maxDate;
                        hours = Math.min(hours, maxTime.getHours());
                        if (hours === maxTime.getHours()) minutes = Math.min(minutes, maxTime.getMinutes());
                        if (minutes === maxTime.getMinutes()) seconds = Math.min(seconds, maxTime.getSeconds());
                    }
                    if (limitMinHours) {
                        var minTime = self.config.minTime !== void 0 ? self.config.minTime : self.config.minDate;
                        hours = Math.max(hours, minTime.getHours());
                        if (hours === minTime.getHours() && minutes < minTime.getMinutes()) minutes = minTime.getMinutes();
                        if (minutes === minTime.getMinutes()) seconds = Math.max(seconds, minTime.getSeconds());
                    }
                }
                setHours(hours, minutes, seconds);
            }
            function setHoursFromDate(dateObj) {
                var date = dateObj || self.latestSelectedDateObj;
                if (date && date instanceof Date) setHours(date.getHours(), date.getMinutes(), date.getSeconds());
            }
            function setHours(hours, minutes, seconds) {
                if (self.latestSelectedDateObj !== void 0) self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
                if (!self.hourElement || !self.minuteElement || self.isMobile) return;
                self.hourElement.value = utils_pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * utils_int(hours % 12 === 0) : hours);
                self.minuteElement.value = utils_pad(minutes);
                if (self.amPM !== void 0) self.amPM.textContent = self.l10n.amPM[utils_int(hours >= 12)];
                if (self.secondElement !== void 0) self.secondElement.value = utils_pad(seconds);
            }
            function onYearInput(event) {
                var eventTarget = getEventTarget(event);
                var year = parseInt(eventTarget.value) + (event.delta || 0);
                if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) changeYear(year);
            }
            function bind(element, event, handler, options) {
                if (event instanceof Array) return event.forEach((function(ev) {
                    return bind(element, ev, handler, options);
                }));
                if (element instanceof Array) return element.forEach((function(el) {
                    return bind(el, event, handler, options);
                }));
                element.addEventListener(event, handler, options);
                self._handlers.push({
                    remove: function() {
                        return element.removeEventListener(event, handler, options);
                    }
                });
            }
            function triggerChange() {
                triggerEvent("onChange");
            }
            function bindEvents() {
                if (self.config.wrap) [ "open", "close", "toggle", "clear" ].forEach((function(evt) {
                    Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), (function(el) {
                        return bind(el, "click", self[evt]);
                    }));
                }));
                if (self.isMobile) {
                    setupMobile();
                    return;
                }
                var debouncedResize = utils_debounce(onResize, 50);
                self._debouncedChange = utils_debounce(triggerChange, DEBOUNCED_CHANGE_MS);
                if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent)) bind(self.daysContainer, "mouseover", (function(e) {
                    if (self.config.mode === "range") onMouseOver(getEventTarget(e));
                }));
                bind(self._input, "keydown", onKeyDown);
                if (self.calendarContainer !== void 0) bind(self.calendarContainer, "keydown", onKeyDown);
                if (!self.config.inline && !self.config.static) bind(window, "resize", debouncedResize);
                if (window.ontouchstart !== void 0) bind(window.document, "touchstart", documentClick); else bind(window.document, "mousedown", documentClick);
                bind(window.document, "focus", documentClick, {
                    capture: true
                });
                if (self.config.clickOpens === true) {
                    bind(self._input, "focus", self.open);
                    bind(self._input, "click", self.open);
                }
                if (self.daysContainer !== void 0) {
                    bind(self.monthNav, "click", onMonthNavClick);
                    bind(self.monthNav, [ "keyup", "increment" ], onYearInput);
                    bind(self.daysContainer, "click", selectDate);
                }
                if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0) {
                    var selText = function(e) {
                        return getEventTarget(e).select();
                    };
                    bind(self.timeContainer, [ "increment" ], updateTime);
                    bind(self.timeContainer, "blur", updateTime, {
                        capture: true
                    });
                    bind(self.timeContainer, "click", timeIncrement);
                    bind([ self.hourElement, self.minuteElement ], [ "focus", "click" ], selText);
                    if (self.secondElement !== void 0) bind(self.secondElement, "focus", (function() {
                        return self.secondElement && self.secondElement.select();
                    }));
                    if (self.amPM !== void 0) bind(self.amPM, "click", (function(e) {
                        updateTime(e);
                    }));
                }
                if (self.config.allowInput) bind(self._input, "blur", onBlur);
            }
            function jumpToDate(jumpDate, triggerChange) {
                var jumpTo = jumpDate !== void 0 ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate && self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);
                var oldYear = self.currentYear;
                var oldMonth = self.currentMonth;
                try {
                    if (jumpTo !== void 0) {
                        self.currentYear = jumpTo.getFullYear();
                        self.currentMonth = jumpTo.getMonth();
                    }
                } catch (e) {
                    e.message = "Invalid date supplied: " + jumpTo;
                    self.config.errorHandler(e);
                }
                if (triggerChange && self.currentYear !== oldYear) {
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
                if (triggerChange && (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) triggerEvent("onMonthChange");
                self.redraw();
            }
            function timeIncrement(e) {
                var eventTarget = getEventTarget(e);
                if (~eventTarget.className.indexOf("arrow")) incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
            }
            function incrementNumInput(e, delta, inputElem) {
                var target = e && getEventTarget(e);
                var input = inputElem || target && target.parentNode && target.parentNode.firstChild;
                var event = createEvent("increment");
                event.delta = delta;
                input && input.dispatchEvent(event);
            }
            function build() {
                var fragment = window.document.createDocumentFragment();
                self.calendarContainer = createElement("div", "flatpickr-calendar");
                self.calendarContainer.tabIndex = -1;
                if (!self.config.noCalendar) {
                    fragment.appendChild(buildMonthNav());
                    self.innerContainer = createElement("div", "flatpickr-innerContainer");
                    if (self.config.weekNumbers) {
                        var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                        self.innerContainer.appendChild(weekWrapper);
                        self.weekNumbers = weekNumbers;
                        self.weekWrapper = weekWrapper;
                    }
                    self.rContainer = createElement("div", "flatpickr-rContainer");
                    self.rContainer.appendChild(buildWeekdays());
                    if (!self.daysContainer) {
                        self.daysContainer = createElement("div", "flatpickr-days");
                        self.daysContainer.tabIndex = -1;
                    }
                    buildDays();
                    self.rContainer.appendChild(self.daysContainer);
                    self.innerContainer.appendChild(self.rContainer);
                    fragment.appendChild(self.innerContainer);
                }
                if (self.config.enableTime) fragment.appendChild(buildTime());
                dom_toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
                dom_toggleClass(self.calendarContainer, "animate", self.config.animate === true);
                dom_toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
                self.calendarContainer.appendChild(fragment);
                var customAppend = self.config.appendTo !== void 0 && self.config.appendTo.nodeType !== void 0;
                if (self.config.inline || self.config.static) {
                    self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                    if (self.config.inline) if (!customAppend && self.element.parentNode) self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling); else if (self.config.appendTo !== void 0) self.config.appendTo.appendChild(self.calendarContainer);
                    if (self.config.static) {
                        var wrapper = createElement("div", "flatpickr-wrapper");
                        if (self.element.parentNode) self.element.parentNode.insertBefore(wrapper, self.element);
                        wrapper.appendChild(self.element);
                        if (self.altInput) wrapper.appendChild(self.altInput);
                        wrapper.appendChild(self.calendarContainer);
                    }
                }
                if (!self.config.static && !self.config.inline) (self.config.appendTo !== void 0 ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
            }
            function createDay(className, date, _dayNumber, i) {
                var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
                dayElement.dateObj = date;
                dayElement.$i = i;
                dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
                if (className.indexOf("hidden") === -1 && compareDates(date, self.now) === 0) {
                    self.todayDateElem = dayElement;
                    dayElement.classList.add("today");
                    dayElement.setAttribute("aria-current", "date");
                }
                if (dateIsEnabled) {
                    dayElement.tabIndex = -1;
                    if (isDateSelected(date)) {
                        dayElement.classList.add("selected");
                        self.selectedDateElem = dayElement;
                        if (self.config.mode === "range") {
                            dom_toggleClass(dayElement, "startRange", self.selectedDates[0] && compareDates(date, self.selectedDates[0], true) === 0);
                            dom_toggleClass(dayElement, "endRange", self.selectedDates[1] && compareDates(date, self.selectedDates[1], true) === 0);
                            if (className === "nextMonthDay") dayElement.classList.add("inRange");
                        }
                    }
                } else dayElement.classList.add("flatpickr-disabled");
                if (self.config.mode === "range") if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");
                if (self.weekNumbers && self.config.showMonths === 1 && className !== "prevMonthDay" && i % 7 === 6) self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
                triggerEvent("onDayCreate", dayElement);
                return dayElement;
            }
            function focusOnDayElem(targetNode) {
                targetNode.focus();
                if (self.config.mode === "range") onMouseOver(targetNode);
            }
            function getFirstAvailableDay(delta) {
                var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
                var endMonth = delta > 0 ? self.config.showMonths : -1;
                for (var m = startMonth; m != endMonth; m += delta) {
                    var month = self.daysContainer.children[m];
                    var startIndex = delta > 0 ? 0 : month.children.length - 1;
                    var endIndex = delta > 0 ? month.children.length : -1;
                    for (var i = startIndex; i != endIndex; i += delta) {
                        var c = month.children[i];
                        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj)) return c;
                    }
                }
                return;
            }
            function getNextAvailableDay(current, delta) {
                var givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self.currentMonth;
                var endMonth = delta > 0 ? self.config.showMonths : -1;
                var loopDelta = delta > 0 ? 1 : -1;
                for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                    var month = self.daysContainer.children[m];
                    var startIndex = givenMonth - self.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
                    var numMonthDays = month.children.length;
                    for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                        var c = month.children[i];
                        if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta)) return focusOnDayElem(c);
                    }
                }
                self.changeMonth(loopDelta);
                focusOnDay(getFirstAvailableDay(loopDelta), 0);
                return;
            }
            function focusOnDay(current, offset) {
                var activeElement = getClosestActiveElement();
                var dayFocused = isInView(activeElement || document.body);
                var startElem = current !== void 0 ? current : dayFocused ? activeElement : self.selectedDateElem !== void 0 && isInView(self.selectedDateElem) ? self.selectedDateElem : self.todayDateElem !== void 0 && isInView(self.todayDateElem) ? self.todayDateElem : getFirstAvailableDay(offset > 0 ? 1 : -1);
                if (startElem === void 0) self._input.focus(); else if (!dayFocused) focusOnDayElem(startElem); else getNextAvailableDay(startElem, offset);
            }
            function buildMonthDays(year, month) {
                var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
                var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
                var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
                var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
                for (;dayNumber <= prevMonthDays; dayNumber++, dayIndex++) days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
                for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
                for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, 
                dayIndex++) days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
                var dayContainer = createElement("div", "dayContainer");
                dayContainer.appendChild(days);
                return dayContainer;
            }
            function buildDays() {
                if (self.daysContainer === void 0) return;
                clearNode(self.daysContainer);
                if (self.weekNumbers) clearNode(self.weekNumbers);
                var frag = document.createDocumentFragment();
                for (var i = 0; i < self.config.showMonths; i++) {
                    var d = new Date(self.currentYear, self.currentMonth, 1);
                    d.setMonth(self.currentMonth + i);
                    frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
                }
                self.daysContainer.appendChild(frag);
                self.days = self.daysContainer.firstChild;
                if (self.config.mode === "range" && self.selectedDates.length === 1) onMouseOver();
            }
            function buildMonthSwitch() {
                if (self.config.showMonths > 1 || self.config.monthSelectorType !== "dropdown") return;
                var shouldBuildMonth = function(month) {
                    if (self.config.minDate !== void 0 && self.currentYear === self.config.minDate.getFullYear() && month < self.config.minDate.getMonth()) return false;
                    return !(self.config.maxDate !== void 0 && self.currentYear === self.config.maxDate.getFullYear() && month > self.config.maxDate.getMonth());
                };
                self.monthsDropdownContainer.tabIndex = -1;
                self.monthsDropdownContainer.innerHTML = "";
                for (var i = 0; i < 12; i++) {
                    if (!shouldBuildMonth(i)) continue;
                    var month = createElement("option", "flatpickr-monthDropdown-month");
                    month.value = new Date(self.currentYear, i).getMonth().toString();
                    month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                    month.tabIndex = -1;
                    if (self.currentMonth === i) month.selected = true;
                    self.monthsDropdownContainer.appendChild(month);
                }
            }
            function buildMonth() {
                var container = createElement("div", "flatpickr-month");
                var monthNavFragment = window.document.createDocumentFragment();
                var monthElement;
                if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") monthElement = createElement("span", "cur-month"); else {
                    self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                    self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
                    bind(self.monthsDropdownContainer, "change", (function(e) {
                        var target = getEventTarget(e);
                        var selectedMonth = parseInt(target.value, 10);
                        self.changeMonth(selectedMonth - self.currentMonth);
                        triggerEvent("onMonthChange");
                    }));
                    buildMonthSwitch();
                    monthElement = self.monthsDropdownContainer;
                }
                var yearInput = createNumberInput("cur-year", {
                    tabindex: "-1"
                });
                var yearElement = yearInput.getElementsByTagName("input")[0];
                yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
                if (self.config.minDate) yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
                if (self.config.maxDate) {
                    yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                    yearElement.disabled = !!self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
                }
                var currentMonth = createElement("div", "flatpickr-current-month");
                currentMonth.appendChild(monthElement);
                currentMonth.appendChild(yearInput);
                monthNavFragment.appendChild(currentMonth);
                container.appendChild(monthNavFragment);
                return {
                    container,
                    yearElement,
                    monthElement
                };
            }
            function buildMonths() {
                clearNode(self.monthNav);
                self.monthNav.appendChild(self.prevMonthNav);
                if (self.config.showMonths) {
                    self.yearElements = [];
                    self.monthElements = [];
                }
                for (var m = self.config.showMonths; m--; ) {
                    var month = buildMonth();
                    self.yearElements.push(month.yearElement);
                    self.monthElements.push(month.monthElement);
                    self.monthNav.appendChild(month.container);
                }
                self.monthNav.appendChild(self.nextMonthNav);
            }
            function buildMonthNav() {
                self.monthNav = createElement("div", "flatpickr-months");
                self.yearElements = [];
                self.monthElements = [];
                self.prevMonthNav = createElement("span", "flatpickr-prev-month");
                self.prevMonthNav.innerHTML = self.config.prevArrow;
                self.nextMonthNav = createElement("span", "flatpickr-next-month");
                self.nextMonthNav.innerHTML = self.config.nextArrow;
                buildMonths();
                Object.defineProperty(self, "_hidePrevMonthArrow", {
                    get: function() {
                        return self.__hidePrevMonthArrow;
                    },
                    set: function(bool) {
                        if (self.__hidePrevMonthArrow !== bool) {
                            dom_toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                            self.__hidePrevMonthArrow = bool;
                        }
                    }
                });
                Object.defineProperty(self, "_hideNextMonthArrow", {
                    get: function() {
                        return self.__hideNextMonthArrow;
                    },
                    set: function(bool) {
                        if (self.__hideNextMonthArrow !== bool) {
                            dom_toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                            self.__hideNextMonthArrow = bool;
                        }
                    }
                });
                self.currentYearElement = self.yearElements[0];
                updateNavigationCurrentMonth();
                return self.monthNav;
            }
            function buildTime() {
                self.calendarContainer.classList.add("hasTime");
                if (self.config.noCalendar) self.calendarContainer.classList.add("noCalendar");
                var defaults = getDefaultHours(self.config);
                self.timeContainer = createElement("div", "flatpickr-time");
                self.timeContainer.tabIndex = -1;
                var separator = createElement("span", "flatpickr-time-separator", ":");
                var hourInput = createNumberInput("flatpickr-hour", {
                    "aria-label": self.l10n.hourAriaLabel
                });
                self.hourElement = hourInput.getElementsByTagName("input")[0];
                var minuteInput = createNumberInput("flatpickr-minute", {
                    "aria-label": self.l10n.minuteAriaLabel
                });
                self.minuteElement = minuteInput.getElementsByTagName("input")[0];
                self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
                self.hourElement.value = utils_pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.time_24hr ? defaults.hours : military2ampm(defaults.hours));
                self.minuteElement.value = utils_pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : defaults.minutes);
                self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
                self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
                self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
                self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
                self.hourElement.setAttribute("maxlength", "2");
                self.minuteElement.setAttribute("min", "0");
                self.minuteElement.setAttribute("max", "59");
                self.minuteElement.setAttribute("maxlength", "2");
                self.timeContainer.appendChild(hourInput);
                self.timeContainer.appendChild(separator);
                self.timeContainer.appendChild(minuteInput);
                if (self.config.time_24hr) self.timeContainer.classList.add("time24hr");
                if (self.config.enableSeconds) {
                    self.timeContainer.classList.add("hasSeconds");
                    var secondInput = createNumberInput("flatpickr-second");
                    self.secondElement = secondInput.getElementsByTagName("input")[0];
                    self.secondElement.value = utils_pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getSeconds() : defaults.seconds);
                    self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                    self.secondElement.setAttribute("min", "0");
                    self.secondElement.setAttribute("max", "59");
                    self.secondElement.setAttribute("maxlength", "2");
                    self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                    self.timeContainer.appendChild(secondInput);
                }
                if (!self.config.time_24hr) {
                    self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[utils_int((self.latestSelectedDateObj ? self.hourElement.value : self.config.defaultHour) > 11)]);
                    self.amPM.title = self.l10n.toggleTitle;
                    self.amPM.tabIndex = -1;
                    self.timeContainer.appendChild(self.amPM);
                }
                return self.timeContainer;
            }
            function buildWeekdays() {
                if (!self.weekdayContainer) self.weekdayContainer = createElement("div", "flatpickr-weekdays"); else clearNode(self.weekdayContainer);
                for (var i = self.config.showMonths; i--; ) {
                    var container = createElement("div", "flatpickr-weekdaycontainer");
                    self.weekdayContainer.appendChild(container);
                }
                updateWeekdays();
                return self.weekdayContainer;
            }
            function updateWeekdays() {
                if (!self.weekdayContainer) return;
                var firstDayOfWeek = self.l10n.firstDayOfWeek;
                var weekdays = esm_spreadArrays(self.l10n.weekdays.shorthand);
                if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) weekdays = esm_spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
                for (var i = self.config.showMonths; i--; ) self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
            }
            function buildWeeks() {
                self.calendarContainer.classList.add("hasWeeks");
                var weekWrapper = createElement("div", "flatpickr-weekwrapper");
                weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
                var weekNumbers = createElement("div", "flatpickr-weeks");
                weekWrapper.appendChild(weekNumbers);
                return {
                    weekWrapper,
                    weekNumbers
                };
            }
            function changeMonth(value, isOffset) {
                if (isOffset === void 0) isOffset = true;
                var delta = isOffset ? value : value - self.currentMonth;
                if (delta < 0 && self._hidePrevMonthArrow === true || delta > 0 && self._hideNextMonthArrow === true) return;
                self.currentMonth += delta;
                if (self.currentMonth < 0 || self.currentMonth > 11) {
                    self.currentYear += self.currentMonth > 11 ? 1 : -1;
                    self.currentMonth = (self.currentMonth + 12) % 12;
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
                buildDays();
                triggerEvent("onMonthChange");
                updateNavigationCurrentMonth();
            }
            function clear(triggerChangeEvent, toInitial) {
                if (triggerChangeEvent === void 0) triggerChangeEvent = true;
                if (toInitial === void 0) toInitial = true;
                self.input.value = "";
                if (self.altInput !== void 0) self.altInput.value = "";
                if (self.mobileInput !== void 0) self.mobileInput.value = "";
                self.selectedDates = [];
                self.latestSelectedDateObj = void 0;
                if (toInitial === true) {
                    self.currentYear = self._initialDate.getFullYear();
                    self.currentMonth = self._initialDate.getMonth();
                }
                if (self.config.enableTime === true) {
                    var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                    setHours(hours, minutes, seconds);
                }
                self.redraw();
                if (triggerChangeEvent) triggerEvent("onChange");
            }
            function close() {
                self.isOpen = false;
                if (!self.isMobile) {
                    if (self.calendarContainer !== void 0) self.calendarContainer.classList.remove("open");
                    if (self._input !== void 0) self._input.classList.remove("active");
                }
                triggerEvent("onClose");
            }
            function destroy() {
                if (self.config !== void 0) triggerEvent("onDestroy");
                for (var i = self._handlers.length; i--; ) self._handlers[i].remove();
                self._handlers = [];
                if (self.mobileInput) {
                    if (self.mobileInput.parentNode) self.mobileInput.parentNode.removeChild(self.mobileInput);
                    self.mobileInput = void 0;
                } else if (self.calendarContainer && self.calendarContainer.parentNode) if (self.config.static && self.calendarContainer.parentNode) {
                    var wrapper = self.calendarContainer.parentNode;
                    wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                    if (wrapper.parentNode) {
                        while (wrapper.firstChild) wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                        wrapper.parentNode.removeChild(wrapper);
                    }
                } else self.calendarContainer.parentNode.removeChild(self.calendarContainer);
                if (self.altInput) {
                    self.input.type = "text";
                    if (self.altInput.parentNode) self.altInput.parentNode.removeChild(self.altInput);
                    delete self.altInput;
                }
                if (self.input) {
                    self.input.type = self.input._type;
                    self.input.classList.remove("flatpickr-input");
                    self.input.removeAttribute("readonly");
                }
                [ "_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config" ].forEach((function(k) {
                    try {
                        delete self[k];
                    } catch (_) {}
                }));
            }
            function isCalendarElem(elem) {
                return self.calendarContainer.contains(elem);
            }
            function documentClick(e) {
                if (self.isOpen && !self.config.inline) {
                    var eventTarget_1 = getEventTarget(e);
                    var isCalendarElement = isCalendarElem(eventTarget_1);
                    var isInput = eventTarget_1 === self.input || eventTarget_1 === self.altInput || self.element.contains(eventTarget_1) || e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));
                    var lostFocus = !isInput && !isCalendarElement && !isCalendarElem(e.relatedTarget);
                    var isIgnored = !self.config.ignoredFocusElements.some((function(elem) {
                        return elem.contains(eventTarget_1);
                    }));
                    if (lostFocus && isIgnored) {
                        if (self.config.allowInput) self.setDate(self._input.value, false, self.config.altInput ? self.config.altFormat : self.config.dateFormat);
                        if (self.timeContainer !== void 0 && self.minuteElement !== void 0 && self.hourElement !== void 0 && self.input.value !== "" && self.input.value !== void 0) updateTime();
                        self.close();
                        if (self.config && self.config.mode === "range" && self.selectedDates.length === 1) self.clear(false);
                    }
                }
            }
            function changeYear(newYear) {
                if (!newYear || self.config.minDate && newYear < self.config.minDate.getFullYear() || self.config.maxDate && newYear > self.config.maxDate.getFullYear()) return;
                var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
                self.currentYear = newYearNum || self.currentYear;
                if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth); else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
                if (isNewYear) {
                    self.redraw();
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
            }
            function isEnabled(date, timeless) {
                var _a;
                if (timeless === void 0) timeless = true;
                var dateToCheck = self.parseDate(date, void 0, timeless);
                if (self.config.minDate && dateToCheck && compareDates(dateToCheck, self.config.minDate, timeless !== void 0 ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && dateToCheck && compareDates(dateToCheck, self.config.maxDate, timeless !== void 0 ? timeless : !self.maxDateHasTime) > 0) return false;
                if (!self.config.enable && self.config.disable.length === 0) return true;
                if (dateToCheck === void 0) return false;
                var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
                for (var i = 0, d = void 0; i < array.length; i++) {
                    d = array[i];
                    if (typeof d === "function" && d(dateToCheck)) return bool; else if (d instanceof Date && dateToCheck !== void 0 && d.getTime() === dateToCheck.getTime()) return bool; else if (typeof d === "string") {
                        var parsed = self.parseDate(d, void 0, true);
                        return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
                    } else if (typeof d === "object" && dateToCheck !== void 0 && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime()) return bool;
                }
                return !bool;
            }
            function isInView(elem) {
                if (self.daysContainer !== void 0) return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self.daysContainer.contains(elem);
                return false;
            }
            function onBlur(e) {
                var isInput = e.target === self._input;
                var valueChanged = self._input.value.trimEnd() !== getDateStr();
                if (isInput && valueChanged && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
            }
            function onKeyDown(e) {
                var eventTarget = getEventTarget(e);
                var isInput = self.config.wrap ? element.contains(eventTarget) : eventTarget === self._input;
                var allowInput = self.config.allowInput;
                var allowKeydown = self.isOpen && (!allowInput || !isInput);
                var allowInlineKeydown = self.config.inline && isInput && !allowInput;
                if (e.keyCode === 13 && isInput) if (allowInput) {
                    self.setDate(self._input.value, true, eventTarget === self.altInput ? self.config.altFormat : self.config.dateFormat);
                    self.close();
                    return eventTarget.blur();
                } else self.open(); else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
                    var isTimeObj = !!self.timeContainer && self.timeContainer.contains(eventTarget);
                    switch (e.keyCode) {
                      case 13:
                        if (isTimeObj) {
                            e.preventDefault();
                            updateTime();
                            focusAndClose();
                        } else selectDate(e);
                        break;

                      case 27:
                        e.preventDefault();
                        focusAndClose();
                        break;

                      case 8:
                      case 46:
                        if (isInput && !self.config.allowInput) {
                            e.preventDefault();
                            self.clear();
                        }
                        break;

                      case 37:
                      case 39:
                        if (!isTimeObj && !isInput) {
                            e.preventDefault();
                            var activeElement = getClosestActiveElement();
                            if (self.daysContainer !== void 0 && (allowInput === false || activeElement && isInView(activeElement))) {
                                var delta_1 = e.keyCode === 39 ? 1 : -1;
                                if (!e.ctrlKey) focusOnDay(void 0, delta_1); else {
                                    e.stopPropagation();
                                    changeMonth(delta_1);
                                    focusOnDay(getFirstAvailableDay(1), 0);
                                }
                            }
                        } else if (self.hourElement) self.hourElement.focus();
                        break;

                      case 38:
                      case 40:
                        e.preventDefault();
                        var delta = e.keyCode === 40 ? 1 : -1;
                        if (self.daysContainer && eventTarget.$i !== void 0 || eventTarget === self.input || eventTarget === self.altInput) {
                            if (e.ctrlKey) {
                                e.stopPropagation();
                                changeYear(self.currentYear - delta);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            } else if (!isTimeObj) focusOnDay(void 0, delta * 7);
                        } else if (eventTarget === self.currentYearElement) changeYear(self.currentYear - delta); else if (self.config.enableTime) {
                            if (!isTimeObj && self.hourElement) self.hourElement.focus();
                            updateTime(e);
                            self._debouncedChange();
                        }
                        break;

                      case 9:
                        if (isTimeObj) {
                            var elems = [ self.hourElement, self.minuteElement, self.secondElement, self.amPM ].concat(self.pluginElements).filter((function(x) {
                                return x;
                            }));
                            var i = elems.indexOf(eventTarget);
                            if (i !== -1) {
                                var target = elems[i + (e.shiftKey ? -1 : 1)];
                                e.preventDefault();
                                (target || self._input).focus();
                            }
                        } else if (!self.config.noCalendar && self.daysContainer && self.daysContainer.contains(eventTarget) && e.shiftKey) {
                            e.preventDefault();
                            self._input.focus();
                        }
                        break;

                      default:
                        break;
                    }
                }
                if (self.amPM !== void 0 && eventTarget === self.amPM) switch (e.key) {
                  case self.l10n.amPM[0].charAt(0):
                  case self.l10n.amPM[0].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[0];
                    setHoursFromInputs();
                    updateValue();
                    break;

                  case self.l10n.amPM[1].charAt(0):
                  case self.l10n.amPM[1].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[1];
                    setHoursFromInputs();
                    updateValue();
                    break;
                }
                if (isInput || isCalendarElem(eventTarget)) triggerEvent("onKeyDown", e);
            }
            function onMouseOver(elem, cellClass) {
                if (cellClass === void 0) cellClass = "flatpickr-day";
                if (self.selectedDates.length !== 1 || elem && (!elem.classList.contains(cellClass) || elem.classList.contains("flatpickr-disabled"))) return;
                var hoverDate = elem ? elem.dateObj.getTime() : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
                var containsDisabled = false;
                var minRange = 0, maxRange = 0;
                for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) if (!isEnabled(new Date(t), true)) {
                    containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
                    if (t < initialDate && (!minRange || t > minRange)) minRange = t; else if (t > initialDate && (!maxRange || t < maxRange)) maxRange = t;
                }
                var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
                hoverableCells.forEach((function(dayElem) {
                    var date = dayElem.dateObj;
                    var timestamp = date.getTime();
                    var outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
                    if (outOfRange) {
                        dayElem.classList.add("notAllowed");
                        [ "inRange", "startRange", "endRange" ].forEach((function(c) {
                            dayElem.classList.remove(c);
                        }));
                        return;
                    } else if (containsDisabled && !outOfRange) return;
                    [ "startRange", "inRange", "endRange", "notAllowed" ].forEach((function(c) {
                        dayElem.classList.remove(c);
                    }));
                    if (elem !== void 0) {
                        elem.classList.add(hoverDate <= self.selectedDates[0].getTime() ? "startRange" : "endRange");
                        if (initialDate < hoverDate && timestamp === initialDate) dayElem.classList.add("startRange"); else if (initialDate > hoverDate && timestamp === initialDate) dayElem.classList.add("endRange");
                        if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate)) dayElem.classList.add("inRange");
                    }
                }));
            }
            function onResize() {
                if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
            }
            function open(e, positionElement) {
                if (positionElement === void 0) positionElement = self._positionElement;
                if (self.isMobile === true) {
                    if (e) {
                        e.preventDefault();
                        var eventTarget = getEventTarget(e);
                        if (eventTarget) eventTarget.blur();
                    }
                    if (self.mobileInput !== void 0) {
                        self.mobileInput.focus();
                        self.mobileInput.click();
                    }
                    triggerEvent("onOpen");
                    return;
                } else if (self._input.disabled || self.config.inline) return;
                var wasOpen = self.isOpen;
                self.isOpen = true;
                if (!wasOpen) {
                    self.calendarContainer.classList.add("open");
                    self._input.classList.add("active");
                    triggerEvent("onOpen");
                    positionCalendar(positionElement);
                }
                if (self.config.enableTime === true && self.config.noCalendar === true) if (self.config.allowInput === false && (e === void 0 || !self.timeContainer.contains(e.relatedTarget))) setTimeout((function() {
                    return self.hourElement.select();
                }), 50);
            }
            function minMaxDateSetter(type) {
                return function(date) {
                    var dateObj = self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat);
                    var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                    if (dateObj !== void 0) self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
                    if (self.selectedDates) {
                        self.selectedDates = self.selectedDates.filter((function(d) {
                            return isEnabled(d);
                        }));
                        if (!self.selectedDates.length && type === "min") setHoursFromDate(dateObj);
                        updateValue();
                    }
                    if (self.daysContainer) {
                        redraw();
                        if (dateObj !== void 0) self.currentYearElement[type] = dateObj.getFullYear().toString(); else self.currentYearElement.removeAttribute(type);
                        self.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
                    }
                };
            }
            function parseConfig() {
                var boolOpts = [ "wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile" ];
                var userConfig = esm_assign(esm_assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
                var formats = {};
                self.config.parseDate = userConfig.parseDate;
                self.config.formatDate = userConfig.formatDate;
                Object.defineProperty(self.config, "enable", {
                    get: function() {
                        return self.config._enable;
                    },
                    set: function(dates) {
                        self.config._enable = parseDateRules(dates);
                    }
                });
                Object.defineProperty(self.config, "disable", {
                    get: function() {
                        return self.config._disable;
                    },
                    set: function(dates) {
                        self.config._disable = parseDateRules(dates);
                    }
                });
                var timeMode = userConfig.mode === "time";
                if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                    var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                    formats.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
                }
                if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
                    var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                    formats.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + " h:i" + (userConfig.enableSeconds ? ":S" : "") + " K";
                }
                Object.defineProperty(self.config, "minDate", {
                    get: function() {
                        return self.config._minDate;
                    },
                    set: minMaxDateSetter("min")
                });
                Object.defineProperty(self.config, "maxDate", {
                    get: function() {
                        return self.config._maxDate;
                    },
                    set: minMaxDateSetter("max")
                });
                var minMaxTimeSetter = function(type) {
                    return function(val) {
                        self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
                    };
                };
                Object.defineProperty(self.config, "minTime", {
                    get: function() {
                        return self.config._minTime;
                    },
                    set: minMaxTimeSetter("min")
                });
                Object.defineProperty(self.config, "maxTime", {
                    get: function() {
                        return self.config._maxTime;
                    },
                    set: minMaxTimeSetter("max")
                });
                if (userConfig.mode === "time") {
                    self.config.noCalendar = true;
                    self.config.enableTime = true;
                }
                Object.assign(self.config, formats, userConfig);
                for (var i = 0; i < boolOpts.length; i++) self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
                HOOKS.filter((function(hook) {
                    return self.config[hook] !== void 0;
                })).forEach((function(hook) {
                    self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
                }));
                self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                for (i = 0; i < self.config.plugins.length; i++) {
                    var pluginConf = self.config.plugins[i](self) || {};
                    for (var key in pluginConf) if (HOOKS.indexOf(key) > -1) self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]); else if (typeof userConfig[key] === "undefined") self.config[key] = pluginConf[key];
                }
                if (!userConfig.altInputClass) self.config.altInputClass = getInputElem().className + " " + self.config.altInputClass;
                triggerEvent("onParseConfig");
            }
            function getInputElem() {
                return self.config.wrap ? element.querySelector("[data-input]") : element;
            }
            function setupLocale() {
                if (typeof self.config.locale !== "object" && typeof flatpickr.l10ns[self.config.locale] === "undefined") self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
                self.l10n = esm_assign(esm_assign({}, flatpickr.l10ns.default), typeof self.config.locale === "object" ? self.config.locale : self.config.locale !== "default" ? flatpickr.l10ns[self.config.locale] : void 0);
                tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
                tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
                tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
                tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
                tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
                var userConfig = esm_assign(esm_assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
                if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) self.config.time_24hr = self.l10n.time_24hr;
                self.formatDate = createDateFormatter(self);
                self.parseDate = createDateParser({
                    config: self.config,
                    l10n: self.l10n
                });
            }
            function positionCalendar(customPositionElement) {
                if (typeof self.config.position === "function") return void self.config.position(self, customPositionElement);
                if (self.calendarContainer === void 0) return;
                triggerEvent("onPreCalendarPosition");
                var positionElement = customPositionElement || self._positionElement;
                var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function(acc, child) {
                    return acc + child.offsetHeight;
                }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
                var top = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
                dom_toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
                dom_toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
                if (self.config.inline) return;
                var left = window.pageXOffset + inputBounds.left;
                var isCenter = false;
                var isRight = false;
                if (configPosHorizontal === "center") {
                    left -= (calendarWidth - inputBounds.width) / 2;
                    isCenter = true;
                } else if (configPosHorizontal === "right") {
                    left -= calendarWidth - inputBounds.width;
                    isRight = true;
                }
                dom_toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
                dom_toggleClass(self.calendarContainer, "arrowCenter", isCenter);
                dom_toggleClass(self.calendarContainer, "arrowRight", isRight);
                var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
                var rightMost = left + calendarWidth > window.document.body.offsetWidth;
                var centerMost = right + calendarWidth > window.document.body.offsetWidth;
                dom_toggleClass(self.calendarContainer, "rightMost", rightMost);
                if (self.config.static) return;
                self.calendarContainer.style.top = top + "px";
                if (!rightMost) {
                    self.calendarContainer.style.left = left + "px";
                    self.calendarContainer.style.right = "auto";
                } else if (!centerMost) {
                    self.calendarContainer.style.left = "auto";
                    self.calendarContainer.style.right = right + "px";
                } else {
                    var doc = getDocumentStyleSheet();
                    if (doc === void 0) return;
                    var bodyWidth = window.document.body.offsetWidth;
                    var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                    var centerBefore = ".flatpickr-calendar.centerMost:before";
                    var centerAfter = ".flatpickr-calendar.centerMost:after";
                    var centerIndex = doc.cssRules.length;
                    var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                    dom_toggleClass(self.calendarContainer, "rightMost", false);
                    dom_toggleClass(self.calendarContainer, "centerMost", true);
                    doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                    self.calendarContainer.style.left = centerLeft + "px";
                    self.calendarContainer.style.right = "auto";
                }
            }
            function getDocumentStyleSheet() {
                var editableSheet = null;
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var sheet = document.styleSheets[i];
                    if (!sheet.cssRules) continue;
                    try {
                        sheet.cssRules;
                    } catch (err) {
                        continue;
                    }
                    editableSheet = sheet;
                    break;
                }
                return editableSheet != null ? editableSheet : createStyleSheet();
            }
            function createStyleSheet() {
                var style = document.createElement("style");
                document.head.appendChild(style);
                return style.sheet;
            }
            function redraw() {
                if (self.config.noCalendar || self.isMobile) return;
                buildMonthSwitch();
                updateNavigationCurrentMonth();
                buildDays();
            }
            function focusAndClose() {
                self._input.focus();
                if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) setTimeout(self.close, 0); else self.close();
            }
            function selectDate(e) {
                e.preventDefault();
                e.stopPropagation();
                var isSelectable = function(day) {
                    return day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
                };
                var t = findParent(getEventTarget(e), isSelectable);
                if (t === void 0) return;
                var target = t;
                var selectedDate = self.latestSelectedDateObj = new Date(target.dateObj.getTime());
                var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth || selectedDate.getMonth() > self.currentMonth + self.config.showMonths - 1) && self.config.mode !== "range";
                self.selectedDateElem = target;
                if (self.config.mode === "single") self.selectedDates = [ selectedDate ]; else if (self.config.mode === "multiple") {
                    var selectedIndex = isDateSelected(selectedDate);
                    if (selectedIndex) self.selectedDates.splice(parseInt(selectedIndex), 1); else self.selectedDates.push(selectedDate);
                } else if (self.config.mode === "range") {
                    if (self.selectedDates.length === 2) self.clear(false, false);
                    self.latestSelectedDateObj = selectedDate;
                    self.selectedDates.push(selectedDate);
                    if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort((function(a, b) {
                        return a.getTime() - b.getTime();
                    }));
                }
                setHoursFromInputs();
                if (shouldChangeMonth) {
                    var isNewYear = self.currentYear !== selectedDate.getFullYear();
                    self.currentYear = selectedDate.getFullYear();
                    self.currentMonth = selectedDate.getMonth();
                    if (isNewYear) {
                        triggerEvent("onYearChange");
                        buildMonthSwitch();
                    }
                    triggerEvent("onMonthChange");
                }
                updateNavigationCurrentMonth();
                buildDays();
                updateValue();
                if (!shouldChangeMonth && self.config.mode !== "range" && self.config.showMonths === 1) focusOnDayElem(target); else if (self.selectedDateElem !== void 0 && self.hourElement === void 0) self.selectedDateElem && self.selectedDateElem.focus();
                if (self.hourElement !== void 0) self.hourElement !== void 0 && self.hourElement.focus();
                if (self.config.closeOnSelect) {
                    var single = self.config.mode === "single" && !self.config.enableTime;
                    var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;
                    if (single || range) focusAndClose();
                }
                triggerChange();
            }
            var CALLBACKS = {
                locale: [ setupLocale, updateWeekdays ],
                showMonths: [ buildMonths, setCalendarWidth, buildWeekdays ],
                minDate: [ jumpToDate ],
                maxDate: [ jumpToDate ],
                positionElement: [ updatePositionElement ],
                clickOpens: [ function() {
                    if (self.config.clickOpens === true) {
                        bind(self._input, "focus", self.open);
                        bind(self._input, "click", self.open);
                    } else {
                        self._input.removeEventListener("focus", self.open);
                        self._input.removeEventListener("click", self.open);
                    }
                } ]
            };
            function set(option, value) {
                if (option !== null && typeof option === "object") {
                    Object.assign(self.config, option);
                    for (var key in option) if (CALLBACKS[key] !== void 0) CALLBACKS[key].forEach((function(x) {
                        return x();
                    }));
                } else {
                    self.config[option] = value;
                    if (CALLBACKS[option] !== void 0) CALLBACKS[option].forEach((function(x) {
                        return x();
                    })); else if (HOOKS.indexOf(option) > -1) self.config[option] = arrayify(value);
                }
                self.redraw();
                updateValue(true);
            }
            function setSelectedDate(inputDate, format) {
                var dates = [];
                if (inputDate instanceof Array) dates = inputDate.map((function(d) {
                    return self.parseDate(d, format);
                })); else if (inputDate instanceof Date || typeof inputDate === "number") dates = [ self.parseDate(inputDate, format) ]; else if (typeof inputDate === "string") switch (self.config.mode) {
                  case "single":
                  case "time":
                    dates = [ self.parseDate(inputDate, format) ];
                    break;

                  case "multiple":
                    dates = inputDate.split(self.config.conjunction).map((function(date) {
                        return self.parseDate(date, format);
                    }));
                    break;

                  case "range":
                    dates = inputDate.split(self.l10n.rangeSeparator).map((function(date) {
                        return self.parseDate(date, format);
                    }));
                    break;

                  default:
                    break;
                } else self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
                self.selectedDates = self.config.allowInvalidPreload ? dates : dates.filter((function(d) {
                    return d instanceof Date && isEnabled(d, false);
                }));
                if (self.config.mode === "range") self.selectedDates.sort((function(a, b) {
                    return a.getTime() - b.getTime();
                }));
            }
            function setDate(date, triggerChange, format) {
                if (triggerChange === void 0) triggerChange = false;
                if (format === void 0) format = self.config.dateFormat;
                if (date !== 0 && !date || date instanceof Array && date.length === 0) return self.clear(triggerChange);
                setSelectedDate(date, format);
                self.latestSelectedDateObj = self.selectedDates[self.selectedDates.length - 1];
                self.redraw();
                jumpToDate(void 0, triggerChange);
                setHoursFromDate();
                if (self.selectedDates.length === 0) self.clear(false);
                updateValue(triggerChange);
                if (triggerChange) triggerEvent("onChange");
            }
            function parseDateRules(arr) {
                return arr.slice().map((function(rule) {
                    if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) return self.parseDate(rule, void 0, true); else if (rule && typeof rule === "object" && rule.from && rule.to) return {
                        from: self.parseDate(rule.from, void 0),
                        to: self.parseDate(rule.to, void 0)
                    };
                    return rule;
                })).filter((function(x) {
                    return x;
                }));
            }
            function setupDates() {
                self.selectedDates = [];
                self.now = self.parseDate(self.config.now) || new Date;
                var preloadedDate = self.config.defaultDate || ((self.input.nodeName === "INPUT" || self.input.nodeName === "TEXTAREA") && self.input.placeholder && self.input.value === self.input.placeholder ? null : self.input.value);
                if (preloadedDate) setSelectedDate(preloadedDate, self.config.dateFormat);
                self._initialDate = self.selectedDates.length > 0 ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now.getTime() ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now.getTime() ? self.config.maxDate : self.now;
                self.currentYear = self._initialDate.getFullYear();
                self.currentMonth = self._initialDate.getMonth();
                if (self.selectedDates.length > 0) self.latestSelectedDateObj = self.selectedDates[0];
                if (self.config.minTime !== void 0) self.config.minTime = self.parseDate(self.config.minTime, "H:i");
                if (self.config.maxTime !== void 0) self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
                self.minDateHasTime = !!self.config.minDate && (self.config.minDate.getHours() > 0 || self.config.minDate.getMinutes() > 0 || self.config.minDate.getSeconds() > 0);
                self.maxDateHasTime = !!self.config.maxDate && (self.config.maxDate.getHours() > 0 || self.config.maxDate.getMinutes() > 0 || self.config.maxDate.getSeconds() > 0);
            }
            function setupInputs() {
                self.input = getInputElem();
                if (!self.input) {
                    self.config.errorHandler(new Error("Invalid input element specified"));
                    return;
                }
                self.input._type = self.input.type;
                self.input.type = "text";
                self.input.classList.add("flatpickr-input");
                self._input = self.input;
                if (self.config.altInput) {
                    self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
                    self._input = self.altInput;
                    self.altInput.placeholder = self.input.placeholder;
                    self.altInput.disabled = self.input.disabled;
                    self.altInput.required = self.input.required;
                    self.altInput.tabIndex = self.input.tabIndex;
                    self.altInput.type = "text";
                    self.input.setAttribute("type", "hidden");
                    if (!self.config.static && self.input.parentNode) self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
                }
                if (!self.config.allowInput) self._input.setAttribute("readonly", "readonly");
                updatePositionElement();
            }
            function updatePositionElement() {
                self._positionElement = self.config.positionElement || self._input;
            }
            function setupMobile() {
                var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";
                self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
                self.mobileInput.tabIndex = 1;
                self.mobileInput.type = inputType;
                self.mobileInput.disabled = self.input.disabled;
                self.mobileInput.required = self.input.required;
                self.mobileInput.placeholder = self.input.placeholder;
                self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
                if (self.selectedDates.length > 0) self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
                if (self.config.minDate) self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
                if (self.config.maxDate) self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
                if (self.input.getAttribute("step")) self.mobileInput.step = String(self.input.getAttribute("step"));
                self.input.type = "hidden";
                if (self.altInput !== void 0) self.altInput.type = "hidden";
                try {
                    if (self.input.parentNode) self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
                } catch (_a) {}
                bind(self.mobileInput, "change", (function(e) {
                    self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
                    triggerEvent("onChange");
                    triggerEvent("onClose");
                }));
            }
            function toggle(e) {
                if (self.isOpen === true) return self.close();
                self.open(e);
            }
            function triggerEvent(event, data) {
                if (self.config === void 0) return;
                var hooks = self.config[event];
                if (hooks !== void 0 && hooks.length > 0) for (var i = 0; hooks[i] && i < hooks.length; i++) hooks[i](self.selectedDates, self.input.value, self, data);
                if (event === "onChange") {
                    self.input.dispatchEvent(createEvent("change"));
                    self.input.dispatchEvent(createEvent("input"));
                }
            }
            function createEvent(name) {
                var e = document.createEvent("Event");
                e.initEvent(name, true, true);
                return e;
            }
            function isDateSelected(date) {
                for (var i = 0; i < self.selectedDates.length; i++) {
                    var selectedDate = self.selectedDates[i];
                    if (selectedDate instanceof Date && compareDates(selectedDate, date) === 0) return "" + i;
                }
                return false;
            }
            function isDateInRange(date) {
                if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
                return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
            }
            function updateNavigationCurrentMonth() {
                if (self.config.noCalendar || self.isMobile || !self.monthNav) return;
                self.yearElements.forEach((function(yearElement, i) {
                    var d = new Date(self.currentYear, self.currentMonth, 1);
                    d.setMonth(self.currentMonth + i);
                    if (self.config.showMonths > 1 || self.config.monthSelectorType === "static") self.monthElements[i].textContent = monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " "; else self.monthsDropdownContainer.value = d.getMonth().toString();
                    yearElement.value = d.getFullYear().toString();
                }));
                self._hidePrevMonthArrow = self.config.minDate !== void 0 && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());
                self._hideNextMonthArrow = self.config.maxDate !== void 0 && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
            }
            function getDateStr(specificFormat) {
                var format = specificFormat || (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
                return self.selectedDates.map((function(dObj) {
                    return self.formatDate(dObj, format);
                })).filter((function(d, i, arr) {
                    return self.config.mode !== "range" || self.config.enableTime || arr.indexOf(d) === i;
                })).join(self.config.mode !== "range" ? self.config.conjunction : self.l10n.rangeSeparator);
            }
            function updateValue(triggerChange) {
                if (triggerChange === void 0) triggerChange = true;
                if (self.mobileInput !== void 0 && self.mobileFormatStr) self.mobileInput.value = self.latestSelectedDateObj !== void 0 ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
                self.input.value = getDateStr(self.config.dateFormat);
                if (self.altInput !== void 0) self.altInput.value = getDateStr(self.config.altFormat);
                if (triggerChange !== false) triggerEvent("onValueUpdate");
            }
            function onMonthNavClick(e) {
                var eventTarget = getEventTarget(e);
                var isPrevMonth = self.prevMonthNav.contains(eventTarget);
                var isNextMonth = self.nextMonthNav.contains(eventTarget);
                if (isPrevMonth || isNextMonth) changeMonth(isPrevMonth ? -1 : 1); else if (self.yearElements.indexOf(eventTarget) >= 0) eventTarget.select(); else if (eventTarget.classList.contains("arrowUp")) self.changeYear(self.currentYear + 1); else if (eventTarget.classList.contains("arrowDown")) self.changeYear(self.currentYear - 1);
            }
            function timeWrapper(e) {
                e.preventDefault();
                var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
                if (self.amPM !== void 0 && eventTarget === self.amPM) self.amPM.textContent = self.l10n.amPM[utils_int(self.amPM.textContent === self.l10n.amPM[0])];
                var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
                var newValue = curValue + step * delta;
                if (typeof input.value !== "undefined" && input.value.length === 2) {
                    var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                    if (newValue < min) {
                        newValue = max + newValue + utils_int(!isHourElem) + (utils_int(isHourElem) && utils_int(!self.amPM));
                        if (isMinuteElem) incrementNumInput(void 0, -1, self.hourElement);
                    } else if (newValue > max) {
                        newValue = input === self.hourElement ? newValue - max - utils_int(!self.amPM) : min;
                        if (isMinuteElem) incrementNumInput(void 0, 1, self.hourElement);
                    }
                    if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) self.amPM.textContent = self.l10n.amPM[utils_int(self.amPM.textContent === self.l10n.amPM[0])];
                    input.value = utils_pad(newValue);
                }
            }
            init();
            return self;
        }
        function _flatpickr(nodeList, config) {
            var nodes = Array.prototype.slice.call(nodeList).filter((function(x) {
                return x instanceof HTMLElement;
            }));
            var instances = [];
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                try {
                    if (node.getAttribute("data-fp-omit") !== null) continue;
                    if (node._flatpickr !== void 0) {
                        node._flatpickr.destroy();
                        node._flatpickr = void 0;
                    }
                    node._flatpickr = FlatpickrInstance(node, config || {});
                    instances.push(node._flatpickr);
                } catch (e) {
                    console.error(e);
                }
            }
            return instances.length === 1 ? instances[0] : instances;
        }
        if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
            HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
                return _flatpickr(this, config);
            };
            HTMLElement.prototype.flatpickr = function(config) {
                return _flatpickr([ this ], config);
            };
        }
        var flatpickr = function(selector, config) {
            if (typeof selector === "string") return _flatpickr(window.document.querySelectorAll(selector), config); else if (selector instanceof Node) return _flatpickr([ selector ], config); else return _flatpickr(selector, config);
        };
        flatpickr.defaultConfig = {};
        flatpickr.l10ns = {
            en: esm_assign({}, l10n_default),
            default: esm_assign({}, l10n_default)
        };
        flatpickr.localize = function(l10n) {
            flatpickr.l10ns.default = esm_assign(esm_assign({}, flatpickr.l10ns.default), l10n);
        };
        flatpickr.setDefaults = function(config) {
            flatpickr.defaultConfig = esm_assign(esm_assign({}, flatpickr.defaultConfig), config);
        };
        flatpickr.parseDate = createDateParser({});
        flatpickr.formatDate = createDateFormatter({});
        flatpickr.compareDates = compareDates;
        if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") jQuery.fn.flatpickr = function(config) {
            return _flatpickr(this, config);
        };
        Date.prototype.fp_incr = function(days) {
            return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
        };
        if (typeof window !== "undefined") window.flatpickr = flatpickr;
        const esm = flatpickr;
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
        const calendars = document.querySelectorAll("[data-calendar]");
        if (calendars) {
            esm.localize({
                weekdays: {
                    shorthand: [ "S", "M", "T", "W", "T", "F", "S" ],
                    longhand: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
                },
                firstDayOfWeek: 1
            });
            calendars.forEach((calendarEl => {
                const config = {
                    inline: true,
                    monthSelectorType: "static",
                    dateFormat: "d/m/Y",
                    mode: "range"
                };
                esm(calendarEl, config);
            }));
        }
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
        window["FLS"] = false;
        addLoadedClass();
        spoilers();
        tabs();
        formRating();
    })();
})();