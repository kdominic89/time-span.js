;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    }
    else if (typeof module === 'object' && module.exports) {
        // Node, CommonJS-like
        module.exports = factory();
    }
    else {
        // Browser globals (root is window)
        root.TimeSpan = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    'use strict';

    const TIME_SPAN_MS = Symbol('milliseconds');

    class TimeSpan {
        constructor(timeSpan=0) {
            Object.defineProperty(this, TIME_SPAN_MS, { value: TimeSpan.parse(timeSpan), writable: true });
        }
        
        get milliseconds() {
            return this[TIME_SPAN_MS];
        }

        get seconds() {
            return this.milliseconds / TimeSpan.TO_SECOND;
        }

        get minutes() {
            return this.milliseconds / TimeSpan.TO_MINUTE;
        }

        get hours() {
            return this.milliseconds / TimeSpan.TO_HOUR;
        }

        get days() {
            return this.milliseconds / TimeSpan.TO_DAY;
        }

        get object() {
            return {
                d:   Math.floor(this.days),
                h:   Math.floor(this.hours   % 24),
                min: Math.floor(this.minutes % 60),
                s:   Math.floor(this.seconds % 60),
                ms:  Math.floor(this.milliseconds % 1000)
            };
        }
        
        add(timeSpan) {
            try {
                const ts = TimeSpan.parse(timeSpan);
                this[TIME_SPAN_MS] += ts;
            }
            catch (_) {}

            return this;
        }

        sub(timeSpan) {
            try {
                const ts = TimeSpan.parse(timeSpan);
                this[TIME_SPAN_MS] -= ts;
            }
            catch (_) {}

            return this;
        }

        inRange(max, min=0) {
            try {
                const minTs = TimeSpan.parse(min);
                const maxTs = TimeSpan.parse(max);

                return this.milliseconds >= minTs && this.milliseconds <= maxTs;
            }
            catch (_) {
                return false;
            }
        }

        valueOf() {
            return this.milliseconds;
        }

        toString() {
            const obj = this.object;
            return `${obj.d}d ${obj.h}h ${obj.min}min ${obj.s}s ${obj.ms}ms`
        }

        toJSON() {
            return this.toString();
        }

        static TO_SECOND =     1000;
        static TO_MINUTE =    60000;
        static TO_HOUR   =  3600000;
        static TO_DAY    = 86400000;
        
        static parse(timeSpan) {
            let parsedTS = null;

            if (timeSpan instanceof TimeSpan) {
                return timeSpan.milliseconds;
            }

            if (timeSpan instanceof Date) {
                return timeSpan.getTime();
            }

            if (typeof timeSpan === 'number' || timeSpan instanceof Number) {
                parsedTS = timeSpan;
            }
            else if (typeof timeSpan === 'string') {
                if (timeSpan.match(/\d+\s*d|\d+\s*h|\d+\s*min|\d+\s*s|\d+\s*ms/g) === null) {
                    throw new Error(`Parameter 'timeSpan' must be a String like '0d 0h 0min 0s 0ms' (parts are optional)`);
                }
                const d   = TimeSpan._sumFromMatchArray(timeSpan.match(/\d+\s*d/g));
                const h   = TimeSpan._sumFromMatchArray(timeSpan.match(/\d+\s*h/g));
                const min = TimeSpan._sumFromMatchArray(timeSpan.match(/\d+\s*min/g));
                const s   = TimeSpan._sumFromMatchArray(timeSpan.match(/\d+\s*s/g));
                const ms  = TimeSpan._sumFromMatchArray(timeSpan.match(/\d+\s*ms/g));

                parsedTS = d*TimeSpan.TO_DAY + h*TimeSpan.TO_HOUR + min*TimeSpan.TO_MINUTE + s*TimeSpan.TO_SECOND + ms;
            }
            else if (timeSpan !== null && typeof timeSpan === 'object' || timeSpan instanceof Object) {
                const { d=0, h=0, min=0, s=0, ms=0 } = timeSpan;

                parsedTS = d*TimeSpan.TO_DAY + h*TimeSpan.TO_HOUR + min*TimeSpan.TO_MINUTE + s*TimeSpan.TO_SECOND + ms;
            }

            if (typeof parsedTS === 'number' || parsedTS instanceof Number) {
                if (Number.isFinite(parsedTS) && parsedTS >= 0 && parsedTS <= Number.MAX_SAFE_INTEGER) {
                    return parsedTS;
                }
                throw new Error(`Parameter 'timeSpan' must be parsed to a Number between 0 - ${Number.MAX_SAFE_INTEGER}.`);
            }
            throw new Error(`Parameter 'timeSpan' could not be parsed to a Number.`);
        }

        static _sumFromMatchArray(match) {
            return match === null || !Array.isArray(match) ? 0 : match.map((item) => Number.parseInt(item)).reduce((p, c) => p + c, 0);
        }
    }
    return TimeSpan;
}));
