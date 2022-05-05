!function() {
    function a1(e) {
        if (!(this instanceof a1)) return e || (e = null), null === e ? new a1 : new a1(e);
        if ("function" == typeof e) return this.random = e, this;
        arguments.length && (this.seed = 0);
        for(var n = 0; n < arguments.length; n++){
            var i = 0;
            if ("[object String]" === Object.prototype.toString.call(arguments[n])) for(var r = 0; r < arguments[n].length; r++){
                for(var o = 0, t = 0; t < arguments[n].length; t++)o = arguments[n].charCodeAt(t) + (o << 6) + (o << 16) - o;
                i += o;
            }
            else i = arguments[n];
            this.seed += (arguments.length - n) * i;
        }
        return this.mt = this.mersenne_twister(this.seed), this.bimd5 = this.blueimp_md5(), this.random = function() {
            return this.mt.random(this.seed);
        }, this;
    }
    function e1(a, e) {
        if (a = a || {}, e) for(var n in e)void 0 === a[n] && (a[n] = e[n]);
        return a;
    }
    function n1(a, e) {
        if (a) throw new RangeError(e);
    }
    function i1(a) {
        return function() {
            return this.natural(a);
        };
    }
    function r1(a, e) {
        for(var n, i = p1(a), r = 0, o = i.length; r < o; r++)e[n = i[r]] = a[n] || e[n];
    }
    function o1(a, e) {
        for(var n = 0, i = a.length; n < i; n++)e[n] = a[n];
    }
    function t1(a, e) {
        var n = Array.isArray(a), i = e || (n ? new Array(a.length) : {});
        return n ? o1(a, i) : r1(a, i), i;
    }
    var s1 = 9007199254740992, l1 = "abcdefghijklmnopqrstuvwxyz", c1 = l1.toUpperCase(), m1 = "0123456789abcdef", u1 = Array.prototype.slice;
    a1.prototype.VERSION = "1.0.13";
    var d1 = function() {
        throw new Error("No Base64 encoder available.");
    };
    "function" == typeof btoa ? d1 = btoa : "function" == typeof Buffer && (d1 = function(a) {
        return new Buffer(a).toString("base64");
    }), a1.prototype.bool = function(a) {
        return a = e1(a, {
            likelihood: 50
        }), n1(a.likelihood < 0 || a.likelihood > 100, "Chance: Likelihood accepts values from 0 to 100."), 100 * this.random() < a.likelihood;
    }, a1.prototype.animal = function(a) {
        return void 0 !== (a = e1(a)).type ? (n1(!this.get("animals")[a.type.toLowerCase()], "Please pick from desert, ocean, grassland, forest, zoo, pets, farm."), this.pick(this.get("animals")[a.type.toLowerCase()])) : (animalTypeArray = [
            "desert",
            "forest",
            "ocean",
            "zoo",
            "farm",
            "pet",
            "grassland"
        ], this.pick(this.get("animals")[this.pick(animalTypeArray)]));
    }, a1.prototype.character = function(a) {
        n1((a = e1(a)).alpha && a.symbols, "Chance: Cannot specify both alpha and symbols.");
        var i, r;
        return i = "lower" === a.casing ? l1 : "upper" === a.casing ? c1 : l1 + c1, (r = a.pool ? a.pool : a.alpha ? i : a.symbols ? "!@#$%^&*()[]" : i + "0123456789!@#$%^&*()[]").charAt(this.natural({
            max: r.length - 1
        }));
    }, a1.prototype.floating = function(a) {
        n1((a = e1(a, {
            fixed: 4
        })).fixed && a.precision, "Chance: Cannot specify both fixed and precision.");
        var i, r = Math.pow(10, a.fixed), o = s1 / r, t = -o;
        n1(a.min && a.fixed && a.min < t, "Chance: Min specified is out of range with fixed. Min should be, at least, " + t), n1(a.max && a.fixed && a.max > o, "Chance: Max specified is out of range with fixed. Max should be, at most, " + o), a = e1(a, {
            min: t,
            max: o
        });
        var l = ((i = this.integer({
            min: a.min * r,
            max: a.max * r
        })) / r).toFixed(a.fixed);
        return parseFloat(l);
    }, a1.prototype.integer = function(a) {
        return a = e1(a, {
            min: -9007199254740992,
            max: s1
        }), n1(a.min > a.max, "Chance: Min cannot be greater than Max."), Math.floor(this.random() * (a.max - a.min + 1) + a.min);
    }, a1.prototype.natural = function(a) {
        return "number" == typeof (a = e1(a, {
            min: 0,
            max: s1
        })).numerals && (n1(a.numerals < 1, "Chance: Numerals cannot be less than one."), a.min = Math.pow(10, a.numerals - 1), a.max = Math.pow(10, a.numerals) - 1), n1(a.min < 0, "Chance: Min cannot be less than zero."), this.integer(a);
    }, a1.prototype.hex = function(a) {
        n1((a = e1(a, {
            min: 0,
            max: s1,
            casing: "lower"
        })).min < 0, "Chance: Min cannot be less than zero.");
        var i = this.natural({
            min: a.min,
            max: a.max
        });
        return "upper" === a.casing ? i.toString(16).toUpperCase() : i.toString(16);
    }, a1.prototype.letter = function(a) {
        a = e1(a, {
            casing: "lower"
        });
        var n = this.character({
            pool: "abcdefghijklmnopqrstuvwxyz"
        });
        return "upper" === a.casing && (n = n.toUpperCase()), n;
    }, a1.prototype.string = function(a) {
        n1((a = e1(a, {
            length: this.natural({
                min: 5,
                max: 20
            })
        })).length < 0, "Chance: Length cannot be less than zero.");
        var i = a.length;
        return this.n(this.character, i, a).join("");
    }, a1.prototype.capitalize = function(a) {
        return a.charAt(0).toUpperCase() + a.substr(1);
    }, a1.prototype.mixin = function(e) {
        for(var n in e)a1.prototype[n] = e[n];
        return this;
    }, a1.prototype.unique = function(a2, e2, i) {
        n1("function" != typeof a2, "Chance: The first argument must be a function.");
        var r = function(a, e) {
            return -1 !== a.indexOf(e);
        };
        i && (r = i.comparator || r);
        for(var o, t = [], s = 0, l = 50 * e2, c = u1.call(arguments, 2); t.length < e2;){
            var m = JSON.parse(JSON.stringify(c));
            if (o = a2.apply(this, m), r(t, o) || (t.push(o), s = 0), ++s > l) throw new RangeError("Chance: num is likely too large for sample set");
        }
        return t;
    }, a1.prototype.n = function(a, e) {
        n1("function" != typeof a, "Chance: The first argument must be a function."), void 0 === e && (e = 1);
        var i = e, r = [], o = u1.call(arguments, 2);
        for(i = Math.max(0, i); i--;)r.push(a.apply(this, o));
        return r;
    }, a1.prototype.pad = function(a, e, n) {
        return n = n || "0", (a += "").length >= e ? a : new Array(e - a.length + 1).join(n) + a;
    }, a1.prototype.pick = function(a, e) {
        if (0 === a.length) throw new RangeError("Chance: Cannot pick() from an empty array");
        return e && 1 !== e ? this.shuffle(a).slice(0, e) : a[this.natural({
            max: a.length - 1
        })];
    }, a1.prototype.pickone = function(a) {
        if (0 === a.length) throw new RangeError("Chance: Cannot pickone() from an empty array");
        return a[this.natural({
            max: a.length - 1
        })];
    }, a1.prototype.pickset = function(a, e) {
        if (0 === e) return [];
        if (0 === a.length) throw new RangeError("Chance: Cannot pickset() from an empty array");
        if (e < 0) throw new RangeError("Chance: Count must be a positive number");
        return e && 1 !== e ? this.shuffle(a).slice(0, e) : [
            this.pickone(a)
        ];
    }, a1.prototype.shuffle = function(a) {
        for(var e = a.slice(0), n = [], i = 0, r = Number(e.length), o = 0; o < r; o++)i = this.natural({
            max: e.length - 1
        }), n[o] = e[i], e.splice(i, 1);
        return n;
    }, a1.prototype.weighted = function(a, e, n) {
        if (a.length !== e.length) throw new RangeError("Chance: Length of array and weights must match");
        for(var i, r = 0, o = 0; o < e.length; ++o){
            if (i = e[o], isNaN(i)) throw new RangeError("Chance: All weights must be numbers");
            i > 0 && (r += i);
        }
        if (0 === r) throw new RangeError("Chance: No valid entries in array weights");
        var t, s = this.random() * r, l = 0, c = -1;
        for(o = 0; o < e.length; ++o){
            if (i = e[o], l += i, i > 0) {
                if (s <= l) {
                    t = o;
                    break;
                }
                c = o;
            }
            o === e.length - 1 && (t = c);
        }
        var m = a[t];
        return (n = void 0 !== n && n) && (a.splice(t, 1), e.splice(t, 1)), m;
    }, a1.prototype.paragraph = function(a) {
        var n = (a = e1(a)).sentences || this.natural({
            min: 3,
            max: 7
        });
        return this.n(this.sentence, n).join(" ");
    }, a1.prototype.sentence = function(a) {
        var n, i = (a = e1(a)).words || this.natural({
            min: 12,
            max: 18
        }), r = a.punctuation;
        return n = this.n(this.word, i).join(" "), n = this.capitalize(n), !1 === r || /^[\.\?;!:]$/.test(r) || (r = "."), r && (n += r), n;
    }, a1.prototype.syllable = function(a) {
        for(var n, i = (a = e1(a)).length || this.natural({
            min: 2,
            max: 3
        }), r = "", o = 0; o < i; o++)r += n = 0 === o ? this.character({
            pool: "bcdfghjklmnprstvwzaeiou"
        }) : -1 === "bcdfghjklmnprstvwz".indexOf(n) ? this.character({
            pool: "bcdfghjklmnprstvwz"
        }) : this.character({
            pool: "aeiou"
        });
        return a.capitalize && (r = this.capitalize(r)), r;
    }, a1.prototype.word = function(a) {
        n1((a = e1(a)).syllables && a.length, "Chance: Cannot specify both syllables AND length.");
        var i = a.syllables || this.natural({
            min: 1,
            max: 3
        }), r = "";
        if (a.length) {
            do r += this.syllable();
            while (r.length < a.length)
            r = r.substring(0, a.length);
        } else for(var o = 0; o < i; o++)r += this.syllable();
        return a.capitalize && (r = this.capitalize(r)), r;
    }, a1.prototype.age = function(a) {
        var n;
        switch((a = e1(a)).type){
            case "child":
                n = {
                    min: 0,
                    max: 12
                };
                break;
            case "teen":
                n = {
                    min: 13,
                    max: 19
                };
                break;
            case "adult":
                n = {
                    min: 18,
                    max: 65
                };
                break;
            case "senior":
                n = {
                    min: 65,
                    max: 100
                };
                break;
            case "all":
                n = {
                    min: 0,
                    max: 100
                };
                break;
            default:
                n = {
                    min: 18,
                    max: 65
                };
        }
        return this.natural(n);
    }, a1.prototype.birthday = function(a) {
        var n = this.age(a), i = (new Date).getFullYear();
        if (a && a.type) {
            var r = new Date, o = new Date;
            r.setFullYear(i - n - 1), o.setFullYear(i - n), a = e1(a, {
                min: r,
                max: o
            });
        } else a = e1(a, {
            year: i - n
        });
        return this.date(a);
    }, a1.prototype.cpf = function(a) {
        a = e1(a, {
            formatted: !0
        });
        var n = this.n(this.natural, 9, {
            max: 9
        }), i = 2 * n[8] + 3 * n[7] + 4 * n[6] + 5 * n[5] + 6 * n[4] + 7 * n[3] + 8 * n[2] + 9 * n[1] + 10 * n[0];
        (i = 11 - i % 11) >= 10 && (i = 0);
        var r = 2 * i + 3 * n[8] + 4 * n[7] + 5 * n[6] + 6 * n[5] + 7 * n[4] + 8 * n[3] + 9 * n[2] + 10 * n[1] + 11 * n[0];
        (r = 11 - r % 11) >= 10 && (r = 0);
        var o = "" + n[0] + n[1] + n[2] + "." + n[3] + n[4] + n[5] + "." + n[6] + n[7] + n[8] + "-" + i + r;
        return a.formatted ? o : o.replace(/\D/g, "");
    }, a1.prototype.cnpj = function(a) {
        a = e1(a, {
            formatted: !0
        });
        var n = this.n(this.natural, 12, {
            max: 12
        }), i = 2 * n[11] + 3 * n[10] + 4 * n[9] + 5 * n[8] + 6 * n[7] + 7 * n[6] + 8 * n[5] + 9 * n[4] + 2 * n[3] + 3 * n[2] + 4 * n[1] + 5 * n[0];
        (i = 11 - i % 11) < 2 && (i = 0);
        var r = 2 * i + 3 * n[11] + 4 * n[10] + 5 * n[9] + 6 * n[8] + 7 * n[7] + 8 * n[6] + 9 * n[5] + 2 * n[4] + 3 * n[3] + 4 * n[2] + 5 * n[1] + 6 * n[0];
        (r = 11 - r % 11) < 2 && (r = 0);
        var o = "" + n[0] + n[1] + "." + n[2] + n[3] + n[4] + "." + n[5] + n[6] + n[7] + "/" + n[8] + n[9] + n[10] + n[11] + "-" + i + r;
        return a.formatted ? o : o.replace(/\D/g, "");
    }, a1.prototype.first = function(a) {
        return a = e1(a, {
            gender: this.gender(),
            nationality: "en"
        }), this.pick(this.get("firstNames")[a.gender.toLowerCase()][a.nationality.toLowerCase()]);
    }, a1.prototype.profession = function(a) {
        return (a = e1(a)).rank ? this.pick([
            "Apprentice ",
            "Junior ",
            "Senior ",
            "Lead "
        ]) + this.pick(this.get("profession")) : this.pick(this.get("profession"));
    }, a1.prototype.company = function() {
        return this.pick(this.get("company"));
    }, a1.prototype.gender = function(a) {
        return a = e1(a, {
            extraGenders: []
        }), this.pick([
            "Male",
            "Female"
        ].concat(a.extraGenders));
    }, a1.prototype.last = function(a) {
        return a = e1(a, {
            nationality: "en"
        }), this.pick(this.get("lastNames")[a.nationality.toLowerCase()]);
    }, a1.prototype.israelId = function() {
        for(var a = this.string({
            pool: "0123456789",
            length: 8
        }), e = 0, n = 0; n < a.length; n++){
            var i = a[n] * (n / 2 === parseInt(n / 2) ? 1 : 2);
            i = this.pad(i, 2).toString(), e += i = parseInt(i[0]) + parseInt(i[1]);
        }
        return a += (10 - parseInt(e.toString().slice(-1))).toString().slice(-1);
    }, a1.prototype.mrz = function(a3) {
        var n2 = function(a4) {
            var e = "<ABCDEFGHIJKLMNOPQRSTUVWXYXZ".split(""), n = [
                7,
                3,
                1
            ], i = 0;
            return "string" != typeof a4 && (a4 = a4.toString()), a4.split("").forEach(function(a, r) {
                var o = e.indexOf(a);
                a = -1 !== o ? 0 === o ? 0 : o + 9 : parseInt(a, 10), i += a *= n[r % n.length];
            }), i % 10;
        }, i2 = this;
        return a3 = e1(a3, {
            first: this.first(),
            last: this.last(),
            passportNumber: this.integer({
                min: 1e8,
                max: 999999999
            }),
            dob: function() {
                var a = i2.birthday({
                    type: "adult"
                });
                return [
                    a.getFullYear().toString().substr(2),
                    i2.pad(a.getMonth() + 1, 2),
                    i2.pad(a.getDate(), 2)
                ].join("");
            }(),
            expiry: function() {
                var a = new Date;
                return [
                    (a.getFullYear() + 5).toString().substr(2),
                    i2.pad(a.getMonth() + 1, 2),
                    i2.pad(a.getDate(), 2)
                ].join("");
            }(),
            gender: "Female" === this.gender() ? "F" : "M",
            issuer: "GBR",
            nationality: "GBR"
        }), function(a5) {
            var e = function(a) {
                return new Array(a + 1).join("<");
            }, i = [
                "P<",
                a5.issuer,
                a5.last.toUpperCase(),
                "<<",
                a5.first.toUpperCase(),
                e(39 - (a5.last.length + a5.first.length + 2)),
                a5.passportNumber,
                n2(a5.passportNumber),
                a5.nationality,
                a5.dob,
                n2(a5.dob),
                a5.gender,
                a5.expiry,
                n2(a5.expiry),
                e(14),
                n2(e(14))
            ].join("");
            return i + n2(i.substr(44, 10) + i.substr(57, 7) + i.substr(65, 7));
        }(a3);
    }, a1.prototype.name = function(a) {
        a = e1(a);
        var n, i = this.first(a), r = this.last(a);
        return n = a.middle ? i + " " + this.first(a) + " " + r : a.middle_initial ? i + " " + this.character({
            alpha: !0,
            casing: "upper"
        }) + ". " + r : i + " " + r, a.prefix && (n = this.prefix(a) + " " + n), a.suffix && (n = n + " " + this.suffix(a)), n;
    }, a1.prototype.name_prefixes = function(a) {
        var e = [
            {
                name: "Doctor",
                abbreviation: "Dr."
            }
        ];
        return "male" !== (a = (a = a || "all").toLowerCase()) && "all" !== a || e.push({
            name: "Mister",
            abbreviation: "Mr."
        }), "female" !== a && "all" !== a || (e.push({
            name: "Miss",
            abbreviation: "Miss"
        }), e.push({
            name: "Misses",
            abbreviation: "Mrs."
        })), e;
    }, a1.prototype.prefix = function(a) {
        return this.name_prefix(a);
    }, a1.prototype.name_prefix = function(a) {
        return (a = e1(a, {
            gender: "all"
        })).full ? this.pick(this.name_prefixes(a.gender)).name : this.pick(this.name_prefixes(a.gender)).abbreviation;
    }, a1.prototype.HIDN = function() {
        var a = "";
        return a += this.string({
            pool: "0123456789",
            length: 6
        }), a += this.string({
            pool: "ABCDEFGHIJKLMNOPQRSTUVWXYXZ",
            length: 2
        });
    }, a1.prototype.ssn = function(a) {
        var n = (a = e1(a, {
            ssnFour: !1,
            dashes: !0
        })).dashes ? "-" : "";
        return a.ssnFour ? this.string({
            pool: "1234567890",
            length: 4
        }) : this.string({
            pool: "1234567890",
            length: 3
        }) + n + this.string({
            pool: "1234567890",
            length: 2
        }) + n + this.string({
            pool: "1234567890",
            length: 4
        });
    }, a1.prototype.name_suffixes = function() {
        return [
            {
                name: "Doctor of Osteopathic Medicine",
                abbreviation: "D.O."
            },
            {
                name: "Doctor of Philosophy",
                abbreviation: "Ph.D."
            },
            {
                name: "Esquire",
                abbreviation: "Esq."
            },
            {
                name: "Junior",
                abbreviation: "Jr."
            },
            {
                name: "Juris Doctor",
                abbreviation: "J.D."
            },
            {
                name: "Master of Arts",
                abbreviation: "M.A."
            },
            {
                name: "Master of Business Administration",
                abbreviation: "M.B.A."
            },
            {
                name: "Master of Science",
                abbreviation: "M.S."
            },
            {
                name: "Medical Doctor",
                abbreviation: "M.D."
            },
            {
                name: "Senior",
                abbreviation: "Sr."
            },
            {
                name: "The Third",
                abbreviation: "III"
            },
            {
                name: "The Fourth",
                abbreviation: "IV"
            },
            {
                name: "Bachelor of Engineering",
                abbreviation: "B.E"
            },
            {
                name: "Bachelor of Technology",
                abbreviation: "B.TECH"
            }
        ];
    }, a1.prototype.suffix = function(a) {
        return this.name_suffix(a);
    }, a1.prototype.name_suffix = function(a) {
        return (a = e1(a)).full ? this.pick(this.name_suffixes()).name : this.pick(this.name_suffixes()).abbreviation;
    }, a1.prototype.nationalities = function() {
        return this.get("nationalities");
    }, a1.prototype.nationality = function() {
        return this.pick(this.nationalities()).name;
    }, a1.prototype.android_id = function() {
        return "APA91" + this.string({
            pool: "0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_",
            length: 178
        });
    }, a1.prototype.apple_token = function() {
        return this.string({
            pool: "abcdef1234567890",
            length: 64
        });
    }, a1.prototype.wp8_anid2 = function() {
        return d1(this.hash({
            length: 32
        }));
    }, a1.prototype.wp7_anid = function() {
        return "A=" + this.guid().replace(/-/g, "").toUpperCase() + "&E=" + this.hash({
            length: 3
        }) + "&W=" + this.integer({
            min: 0,
            max: 9
        });
    }, a1.prototype.bb_pin = function() {
        return this.hash({
            length: 8
        });
    }, a1.prototype.avatar = function(a) {
        var n = {
            protocol: null,
            email: null,
            fileExtension: null,
            size: null,
            fallback: null,
            rating: null
        };
        if (a) {
            if ("string" == typeof a) n.email = a, a = {};
            else {
                if ("object" != typeof a) return null;
                if ("Array" === a.constructor) return null;
            }
        } else n.email = this.email(), a = {};
        return (n = e1(a, n)).email || (n.email = this.email()), n.protocol = ({
            http: "http",
            https: "https"
        })[n.protocol] ? n.protocol + ":" : "", n.size = parseInt(n.size, 0) ? n.size : "", n.rating = ({
            g: "g",
            pg: "pg",
            r: "r",
            x: "x"
        })[n.rating] ? n.rating : "", n.fallback = ({
            404: "404",
            mm: "mm",
            identicon: "identicon",
            monsterid: "monsterid",
            wavatar: "wavatar",
            retro: "retro",
            blank: "blank"
        })[n.fallback] ? n.fallback : "", n.fileExtension = ({
            bmp: "bmp",
            gif: "gif",
            jpg: "jpg",
            png: "png"
        })[n.fileExtension] ? n.fileExtension : "", n.protocol + "//www.gravatar.com/avatar/" + this.bimd5.md5(n.email) + (n.fileExtension ? "." + n.fileExtension : "") + (n.size || n.rating || n.fallback ? "?" : "") + (n.size ? "&s=" + n.size.toString() : "") + (n.rating ? "&r=" + n.rating : "") + (n.fallback ? "&d=" + n.fallback : "");
    }, a1.prototype.color = function(a6) {
        function n(a, e) {
            return [
                a,
                a,
                a
            ].join(e || "");
        }
        function i3(a) {
            var e = a ? "rgba" : "rgb", i = a ? "," + this.floating({
                min: b2,
                max: p2
            }) : "";
            return e + "(" + (o ? n(this.natural({
                min: t,
                max: s
            }), ",") : this.natural({
                min: m,
                max: u
            }) + "," + this.natural({
                min: d,
                max: h
            }) + "," + this.natural({
                max: 255
            })) + i + ")";
        }
        function r2(e, i, r) {
            var b = r ? "#" : "", p = "";
            return o ? (p = n(this.pad(this.hex({
                min: t,
                max: s
            }), 2)), "shorthex" === a6.format && (p = n(this.hex({
                min: 0,
                max: 15
            })))) : p = "shorthex" === a6.format ? this.pad(this.hex({
                min: Math.floor(l / 16),
                max: Math.floor(c / 16)
            }), 1) + this.pad(this.hex({
                min: Math.floor(m / 16),
                max: Math.floor(u / 16)
            }), 1) + this.pad(this.hex({
                min: Math.floor(d / 16),
                max: Math.floor(h / 16)
            }), 1) : void 0 !== l || void 0 !== c || void 0 !== m || void 0 !== u || void 0 !== d || void 0 !== h ? this.pad(this.hex({
                min: l,
                max: c
            }), 2) + this.pad(this.hex({
                min: m,
                max: u
            }), 2) + this.pad(this.hex({
                min: d,
                max: h
            }), 2) : this.pad(this.hex({
                min: t,
                max: s
            }), 2) + this.pad(this.hex({
                min: t,
                max: s
            }), 2) + this.pad(this.hex({
                min: t,
                max: s
            }), 2), b + p;
        }
        var o = (a6 = e1(a6, {
            format: this.pick([
                "hex",
                "shorthex",
                "rgb",
                "rgba",
                "0x",
                "name"
            ]),
            grayscale: !1,
            casing: "lower",
            min: 0,
            max: 255,
            min_red: void 0,
            max_red: void 0,
            min_green: void 0,
            max_green: void 0,
            min_blue: void 0,
            max_blue: void 0,
            min_alpha: 0,
            max_alpha: 1
        })).grayscale, t = a6.min, s = a6.max, l = a6.min_red, c = a6.max_red, m = a6.min_green, u = a6.max_green, d = a6.min_blue, h = a6.max_blue, b2 = a6.min_alpha, p2 = a6.max_alpha;
        void 0 === a6.min_red && (l = t), void 0 === a6.max_red && (c = s), void 0 === a6.min_green && (m = t), void 0 === a6.max_green && (u = s), void 0 === a6.min_blue && (d = t), void 0 === a6.max_blue && (h = s), void 0 === a6.min_alpha && (b2 = 0), void 0 === a6.max_alpha && (p2 = 1), o && 0 === t && 255 === s && void 0 !== l && void 0 !== c && (t = (l + m + d) / 3, s = (c + u + h) / 3);
        var C;
        if ("hex" === a6.format) C = r2.call(this, 2, 6, !0);
        else if ("shorthex" === a6.format) C = r2.call(this, 1, 3, !0);
        else if ("rgb" === a6.format) C = i3.call(this, !1);
        else if ("rgba" === a6.format) C = i3.call(this, !0);
        else {
            if ("0x" !== a6.format) {
                if ("name" === a6.format) return this.pick(this.get("colorNames"));
                throw new RangeError('Invalid format provided. Please provide one of "hex", "shorthex", "rgb", "rgba", "0x" or "name".');
            }
            C = "0x" + r2.call(this, 2, 6);
        }
        return "upper" === a6.casing && (C = C.toUpperCase()), C;
    }, a1.prototype.domain = function(a) {
        return a = e1(a), this.word() + "." + (a.tld || this.tld());
    }, a1.prototype.email = function(a) {
        return a = e1(a), this.word({
            length: a.length
        }) + "@" + (a.domain || this.domain());
    }, a1.prototype.fbid = function() {
        return "10000" + this.string({
            pool: "1234567890",
            length: 11
        });
    }, a1.prototype.google_analytics = function() {
        return "UA-" + this.pad(this.natural({
            max: 999999
        }), 6) + "-" + this.pad(this.natural({
            max: 99
        }), 2);
    }, a1.prototype.hashtag = function() {
        return "#" + this.word();
    }, a1.prototype.ip = function() {
        return this.natural({
            min: 1,
            max: 254
        }) + "." + this.natural({
            max: 255
        }) + "." + this.natural({
            max: 255
        }) + "." + this.natural({
            min: 1,
            max: 254
        });
    }, a1.prototype.ipv6 = function() {
        return this.n(this.hash, 8, {
            length: 4
        }).join(":");
    }, a1.prototype.klout = function() {
        return this.natural({
            min: 1,
            max: 99
        });
    }, a1.prototype.semver = function(a) {
        a = e1(a, {
            include_prerelease: !0
        });
        var n = this.pickone([
            "^",
            "~",
            "<",
            ">",
            "<=",
            ">=",
            "="
        ]);
        a.range && (n = a.range);
        var i = "";
        return a.include_prerelease && (i = this.weighted([
            "",
            "-dev",
            "-beta",
            "-alpha"
        ], [
            50,
            10,
            5,
            1
        ])), n + this.rpg("3d10").join(".") + i;
    }, a1.prototype.tlds = function() {
        return [
            "com",
            "org",
            "edu",
            "gov",
            "co.uk",
            "net",
            "io",
            "ac",
            "ad",
            "ae",
            "af",
            "ag",
            "ai",
            "al",
            "am",
            "an",
            "ao",
            "aq",
            "ar",
            "as",
            "at",
            "au",
            "aw",
            "ax",
            "az",
            "ba",
            "bb",
            "bd",
            "be",
            "bf",
            "bg",
            "bh",
            "bi",
            "bj",
            "bm",
            "bn",
            "bo",
            "bq",
            "br",
            "bs",
            "bt",
            "bv",
            "bw",
            "by",
            "bz",
            "ca",
            "cc",
            "cd",
            "cf",
            "cg",
            "ch",
            "ci",
            "ck",
            "cl",
            "cm",
            "cn",
            "co",
            "cr",
            "cu",
            "cv",
            "cw",
            "cx",
            "cy",
            "cz",
            "de",
            "dj",
            "dk",
            "dm",
            "do",
            "dz",
            "ec",
            "ee",
            "eg",
            "eh",
            "er",
            "es",
            "et",
            "eu",
            "fi",
            "fj",
            "fk",
            "fm",
            "fo",
            "fr",
            "ga",
            "gb",
            "gd",
            "ge",
            "gf",
            "gg",
            "gh",
            "gi",
            "gl",
            "gm",
            "gn",
            "gp",
            "gq",
            "gr",
            "gs",
            "gt",
            "gu",
            "gw",
            "gy",
            "hk",
            "hm",
            "hn",
            "hr",
            "ht",
            "hu",
            "id",
            "ie",
            "il",
            "im",
            "in",
            "io",
            "iq",
            "ir",
            "is",
            "it",
            "je",
            "jm",
            "jo",
            "jp",
            "ke",
            "kg",
            "kh",
            "ki",
            "km",
            "kn",
            "kp",
            "kr",
            "kw",
            "ky",
            "kz",
            "la",
            "lb",
            "lc",
            "li",
            "lk",
            "lr",
            "ls",
            "lt",
            "lu",
            "lv",
            "ly",
            "ma",
            "mc",
            "md",
            "me",
            "mg",
            "mh",
            "mk",
            "ml",
            "mm",
            "mn",
            "mo",
            "mp",
            "mq",
            "mr",
            "ms",
            "mt",
            "mu",
            "mv",
            "mw",
            "mx",
            "my",
            "mz",
            "na",
            "nc",
            "ne",
            "nf",
            "ng",
            "ni",
            "nl",
            "no",
            "np",
            "nr",
            "nu",
            "nz",
            "om",
            "pa",
            "pe",
            "pf",
            "pg",
            "ph",
            "pk",
            "pl",
            "pm",
            "pn",
            "pr",
            "ps",
            "pt",
            "pw",
            "py",
            "qa",
            "re",
            "ro",
            "rs",
            "ru",
            "rw",
            "sa",
            "sb",
            "sc",
            "sd",
            "se",
            "sg",
            "sh",
            "si",
            "sj",
            "sk",
            "sl",
            "sm",
            "sn",
            "so",
            "sr",
            "ss",
            "st",
            "su",
            "sv",
            "sx",
            "sy",
            "sz",
            "tc",
            "td",
            "tf",
            "tg",
            "th",
            "tj",
            "tk",
            "tl",
            "tm",
            "tn",
            "to",
            "tp",
            "tr",
            "tt",
            "tv",
            "tw",
            "tz",
            "ua",
            "ug",
            "uk",
            "us",
            "uy",
            "uz",
            "va",
            "vc",
            "ve",
            "vg",
            "vi",
            "vn",
            "vu",
            "wf",
            "ws",
            "ye",
            "yt",
            "za",
            "zm",
            "zw"
        ];
    }, a1.prototype.tld = function() {
        return this.pick(this.tlds());
    }, a1.prototype.twitter = function() {
        return "@" + this.word();
    }, a1.prototype.url = function(a) {
        var n = (a = e1(a, {
            protocol: "http",
            domain: this.domain(a),
            domain_prefix: "",
            path: this.word(),
            extensions: []
        })).extensions.length > 0 ? "." + this.pick(a.extensions) : "", i = a.domain_prefix ? a.domain_prefix + "." + a.domain : a.domain;
        return a.protocol + "://" + i + "/" + a.path + n;
    }, a1.prototype.port = function() {
        return this.integer({
            min: 0,
            max: 65535
        });
    }, a1.prototype.locale = function(a) {
        return (a = e1(a)).region ? this.pick(this.get("locale_regions")) : this.pick(this.get("locale_languages"));
    }, a1.prototype.locales = function(a) {
        return (a = e1(a)).region ? this.get("locale_regions") : this.get("locale_languages");
    }, a1.prototype.address = function(a) {
        return a = e1(a), this.natural({
            min: 5,
            max: 2e3
        }) + " " + this.street(a);
    }, a1.prototype.altitude = function(a) {
        return a = e1(a, {
            fixed: 5,
            min: 0,
            max: 8848
        }), this.floating({
            min: a.min,
            max: a.max,
            fixed: a.fixed
        });
    }, a1.prototype.areacode = function(a) {
        a = e1(a, {
            parens: !0
        });
        var n = this.natural({
            min: 2,
            max: 9
        }).toString() + this.natural({
            min: 0,
            max: 8
        }).toString() + this.natural({
            min: 0,
            max: 9
        }).toString();
        return a.parens ? "(" + n + ")" : n;
    }, a1.prototype.city = function() {
        return this.capitalize(this.word({
            syllables: 3
        }));
    }, a1.prototype.coordinates = function(a) {
        return this.latitude(a) + ", " + this.longitude(a);
    }, a1.prototype.countries = function() {
        return this.get("countries");
    }, a1.prototype.country = function(a) {
        a = e1(a);
        var n = this.pick(this.countries());
        return a.full ? n.name : n.abbreviation;
    }, a1.prototype.depth = function(a) {
        return a = e1(a, {
            fixed: 5,
            min: -10994,
            max: 0
        }), this.floating({
            min: a.min,
            max: a.max,
            fixed: a.fixed
        });
    }, a1.prototype.geohash = function(a) {
        return a = e1(a, {
            length: 7
        }), this.string({
            length: a.length,
            pool: "0123456789bcdefghjkmnpqrstuvwxyz"
        });
    }, a1.prototype.geojson = function(a) {
        return this.latitude(a) + ", " + this.longitude(a) + ", " + this.altitude(a);
    }, a1.prototype.latitude = function(a) {
        return a = e1(a, {
            fixed: 5,
            min: -90,
            max: 90
        }), this.floating({
            min: a.min,
            max: a.max,
            fixed: a.fixed
        });
    }, a1.prototype.longitude = function(a) {
        return a = e1(a, {
            fixed: 5,
            min: -180,
            max: 180
        }), this.floating({
            min: a.min,
            max: a.max,
            fixed: a.fixed
        });
    }, a1.prototype.phone = function(a7) {
        var n, i = this, r = function(a8) {
            var e = [];
            return a8.sections.forEach(function(a) {
                e.push(i.string({
                    pool: "0123456789",
                    length: a
                }));
            }), a8.area + e.join(" ");
        };
        (a7 = e1(a7, {
            formatted: !0,
            country: "us",
            mobile: !1
        })).formatted || (a7.parens = !1);
        var o;
        switch(a7.country){
            case "fr":
                a7.mobile ? (n = this.pick([
                    "06",
                    "07"
                ]) + i.string({
                    pool: "0123456789",
                    length: 8
                }), o = a7.formatted ? n.match(/../g).join(" ") : n) : (n = this.pick([
                    "01" + this.pick([
                        "30",
                        "34",
                        "39",
                        "40",
                        "41",
                        "42",
                        "43",
                        "44",
                        "45",
                        "46",
                        "47",
                        "48",
                        "49",
                        "53",
                        "55",
                        "56",
                        "58",
                        "60",
                        "64",
                        "69",
                        "70",
                        "72",
                        "73",
                        "74",
                        "75",
                        "76",
                        "77",
                        "78",
                        "79",
                        "80",
                        "81",
                        "82",
                        "83"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 6
                    }),
                    "02" + this.pick([
                        "14",
                        "18",
                        "22",
                        "23",
                        "28",
                        "29",
                        "30",
                        "31",
                        "32",
                        "33",
                        "34",
                        "35",
                        "36",
                        "37",
                        "38",
                        "40",
                        "41",
                        "43",
                        "44",
                        "45",
                        "46",
                        "47",
                        "48",
                        "49",
                        "50",
                        "51",
                        "52",
                        "53",
                        "54",
                        "56",
                        "57",
                        "61",
                        "62",
                        "69",
                        "72",
                        "76",
                        "77",
                        "78",
                        "85",
                        "90",
                        "96",
                        "97",
                        "98",
                        "99"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 6
                    }),
                    "03" + this.pick([
                        "10",
                        "20",
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                        "28",
                        "29",
                        "39",
                        "44",
                        "45",
                        "51",
                        "52",
                        "54",
                        "55",
                        "57",
                        "58",
                        "59",
                        "60",
                        "61",
                        "62",
                        "63",
                        "64",
                        "65",
                        "66",
                        "67",
                        "68",
                        "69",
                        "70",
                        "71",
                        "72",
                        "73",
                        "80",
                        "81",
                        "82",
                        "83",
                        "84",
                        "85",
                        "86",
                        "87",
                        "88",
                        "89",
                        "90"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 6
                    }),
                    "04" + this.pick([
                        "11",
                        "13",
                        "15",
                        "20",
                        "22",
                        "26",
                        "27",
                        "30",
                        "32",
                        "34",
                        "37",
                        "42",
                        "43",
                        "44",
                        "50",
                        "56",
                        "57",
                        "63",
                        "66",
                        "67",
                        "68",
                        "69",
                        "70",
                        "71",
                        "72",
                        "73",
                        "74",
                        "75",
                        "76",
                        "77",
                        "78",
                        "79",
                        "80",
                        "81",
                        "82",
                        "83",
                        "84",
                        "85",
                        "86",
                        "88",
                        "89",
                        "90",
                        "91",
                        "92",
                        "93",
                        "94",
                        "95",
                        "97",
                        "98"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 6
                    }),
                    "05" + this.pick([
                        "08",
                        "16",
                        "17",
                        "19",
                        "24",
                        "31",
                        "32",
                        "33",
                        "34",
                        "35",
                        "40",
                        "45",
                        "46",
                        "47",
                        "49",
                        "53",
                        "55",
                        "56",
                        "57",
                        "58",
                        "59",
                        "61",
                        "62",
                        "63",
                        "64",
                        "65",
                        "67",
                        "79",
                        "81",
                        "82",
                        "86",
                        "87",
                        "90",
                        "94"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 6
                    }),
                    "09" + i.string({
                        pool: "0123456789",
                        length: 8
                    })
                ]), o = a7.formatted ? n.match(/../g).join(" ") : n);
                break;
            case "uk":
                a7.mobile ? (n = this.pick([
                    {
                        area: "07" + this.pick([
                            "4",
                            "5",
                            "7",
                            "8",
                            "9"
                        ]),
                        sections: [
                            2,
                            6
                        ]
                    },
                    {
                        area: "07624 ",
                        sections: [
                            6
                        ]
                    }
                ]), o = a7.formatted ? r(n) : r(n).replace(" ", "")) : (n = this.pick([
                    {
                        area: "01" + this.character({
                            pool: "234569"
                        }) + "1 ",
                        sections: [
                            3,
                            4
                        ]
                    },
                    {
                        area: "020 " + this.character({
                            pool: "378"
                        }),
                        sections: [
                            3,
                            4
                        ]
                    },
                    {
                        area: "023 " + this.character({
                            pool: "89"
                        }),
                        sections: [
                            3,
                            4
                        ]
                    },
                    {
                        area: "024 7",
                        sections: [
                            3,
                            4
                        ]
                    },
                    {
                        area: "028 " + this.pick([
                            "25",
                            "28",
                            "37",
                            "71",
                            "82",
                            "90",
                            "92",
                            "95"
                        ]),
                        sections: [
                            2,
                            4
                        ]
                    },
                    {
                        area: "012" + this.pick([
                            "04",
                            "08",
                            "54",
                            "76",
                            "97",
                            "98"
                        ]) + " ",
                        sections: [
                            6
                        ]
                    },
                    {
                        area: "013" + this.pick([
                            "63",
                            "64",
                            "84",
                            "86"
                        ]) + " ",
                        sections: [
                            6
                        ]
                    },
                    {
                        area: "014" + this.pick([
                            "04",
                            "20",
                            "60",
                            "61",
                            "80",
                            "88"
                        ]) + " ",
                        sections: [
                            6
                        ]
                    },
                    {
                        area: "015" + this.pick([
                            "24",
                            "27",
                            "62",
                            "66"
                        ]) + " ",
                        sections: [
                            6
                        ]
                    },
                    {
                        area: "016" + this.pick([
                            "06",
                            "29",
                            "35",
                            "47",
                            "59",
                            "95"
                        ]) + " ",
                        sections: [
                            6
                        ]
                    },
                    {
                        area: "017" + this.pick([
                            "26",
                            "44",
                            "50",
                            "68"
                        ]) + " ",
                        sections: [
                            6
                        ]
                    },
                    {
                        area: "018" + this.pick([
                            "27",
                            "37",
                            "84",
                            "97"
                        ]) + " ",
                        sections: [
                            6
                        ]
                    },
                    {
                        area: "019" + this.pick([
                            "00",
                            "05",
                            "35",
                            "46",
                            "49",
                            "63",
                            "95"
                        ]) + " ",
                        sections: [
                            6
                        ]
                    }
                ]), o = a7.formatted ? r(n) : r(n).replace(" ", "", "g"));
                break;
            case "za":
                a7.mobile ? (n = this.pick([
                    "060" + this.pick([
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 6
                    }),
                    "061" + this.pick([
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "8"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 6
                    }),
                    "06" + i.string({
                        pool: "0123456789",
                        length: 7
                    }),
                    "071" + this.pick([
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 6
                    }),
                    "07" + this.pick([
                        "2",
                        "3",
                        "4",
                        "6",
                        "7",
                        "8",
                        "9"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 7
                    }),
                    "08" + this.pick([
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 7
                    })
                ]), o = a7.formatted || n) : (n = this.pick([
                    "01" + this.pick([
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 7
                    }),
                    "02" + this.pick([
                        "1",
                        "2",
                        "3",
                        "4",
                        "7",
                        "8"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 7
                    }),
                    "03" + this.pick([
                        "1",
                        "2",
                        "3",
                        "5",
                        "6",
                        "9"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 7
                    }),
                    "04" + this.pick([
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 7
                    }),
                    "05" + this.pick([
                        "1",
                        "3",
                        "4",
                        "6",
                        "7",
                        "8"
                    ]) + i.string({
                        pool: "0123456789",
                        length: 7
                    })
                ]), o = a7.formatted || n);
                break;
            case "us":
                var t = this.areacode(a7).toString(), s = this.natural({
                    min: 2,
                    max: 9
                }).toString() + this.natural({
                    min: 0,
                    max: 9
                }).toString() + this.natural({
                    min: 0,
                    max: 9
                }).toString(), l = this.natural({
                    min: 1e3,
                    max: 9999
                }).toString();
                o = a7.formatted ? t + " " + s + "-" + l : t + s + l;
        }
        return o;
    }, a1.prototype.postal = function() {
        return this.character({
            pool: "XVTSRPNKLMHJGECBA"
        }) + this.natural({
            max: 9
        }) + this.character({
            alpha: !0,
            casing: "upper"
        }) + " " + (this.natural({
            max: 9
        }) + this.character({
            alpha: !0,
            casing: "upper"
        }) + this.natural({
            max: 9
        }));
    }, a1.prototype.counties = function(a) {
        return a = e1(a, {
            country: "uk"
        }), this.get("counties")[a.country.toLowerCase()];
    }, a1.prototype.county = function(a) {
        return this.pick(this.counties(a)).name;
    }, a1.prototype.provinces = function(a) {
        return a = e1(a, {
            country: "ca"
        }), this.get("provinces")[a.country.toLowerCase()];
    }, a1.prototype.province = function(a) {
        return a && a.full ? this.pick(this.provinces(a)).name : this.pick(this.provinces(a)).abbreviation;
    }, a1.prototype.state = function(a) {
        return a && a.full ? this.pick(this.states(a)).name : this.pick(this.states(a)).abbreviation;
    }, a1.prototype.states = function(a) {
        var n;
        switch((a = e1(a, {
            country: "us",
            us_states_and_dc: !0
        })).country.toLowerCase()){
            case "us":
                var i = this.get("us_states_and_dc"), r = this.get("territories"), o = this.get("armed_forces");
                n = [], a.us_states_and_dc && (n = n.concat(i)), a.territories && (n = n.concat(r)), a.armed_forces && (n = n.concat(o));
                break;
            case "it":
                n = this.get("country_regions")[a.country.toLowerCase()];
                break;
            case "uk":
                n = this.get("counties")[a.country.toLowerCase()];
        }
        return n;
    }, a1.prototype.street = function(a) {
        var n;
        switch((a = e1(a, {
            country: "us",
            syllables: 2
        })).country.toLowerCase()){
            case "us":
                n = this.word({
                    syllables: a.syllables
                }), n = this.capitalize(n), n += " ", n += a.short_suffix ? this.street_suffix(a).abbreviation : this.street_suffix(a).name;
                break;
            case "it":
                n = this.word({
                    syllables: a.syllables
                }), n = this.capitalize(n), n = (a.short_suffix ? this.street_suffix(a).abbreviation : this.street_suffix(a).name) + " " + n;
        }
        return n;
    }, a1.prototype.street_suffix = function(a) {
        return a = e1(a, {
            country: "us"
        }), this.pick(this.street_suffixes(a));
    }, a1.prototype.street_suffixes = function(a) {
        return a = e1(a, {
            country: "us"
        }), this.get("street_suffixes")[a.country.toLowerCase()];
    }, a1.prototype.zip = function(a) {
        var e = this.n(this.natural, 5, {
            max: 9
        });
        return a && !0 === a.plusfour && (e.push("-"), e = e.concat(this.n(this.natural, 4, {
            max: 9
        }))), e.join("");
    }, a1.prototype.ampm = function() {
        return this.bool() ? "am" : "pm";
    }, a1.prototype.date = function(a) {
        var n, i;
        if (a && (a.min || a.max)) {
            var r = void 0 !== (a = e1(a, {
                american: !0,
                string: !1
            })).min ? a.min.getTime() : 1, o = void 0 !== a.max ? a.max.getTime() : 864e13;
            i = new Date(this.integer({
                min: r,
                max: o
            }));
        } else {
            var t = this.month({
                raw: !0
            }), s = t.days;
            a && a.month && (s = this.get("months")[(a.month % 12 + 12) % 12].days), a = e1(a, {
                year: parseInt(this.year(), 10),
                month: t.numeric - 1,
                day: this.natural({
                    min: 1,
                    max: s
                }),
                hour: this.hour({
                    twentyfour: !0
                }),
                minute: this.minute(),
                second: this.second(),
                millisecond: this.millisecond(),
                american: !0,
                string: !1
            }), i = new Date(a.year, a.month, a.day, a.hour, a.minute, a.second, a.millisecond);
        }
        return n = a.american ? i.getMonth() + 1 + "/" + i.getDate() + "/" + i.getFullYear() : i.getDate() + "/" + (i.getMonth() + 1) + "/" + i.getFullYear(), a.string ? n : i;
    }, a1.prototype.hammertime = function(a) {
        return this.date(a).getTime();
    }, a1.prototype.hour = function(a) {
        return a = e1(a, {
            min: a && a.twentyfour ? 0 : 1,
            max: a && a.twentyfour ? 23 : 12
        }), n1(a.min < 0, "Chance: Min cannot be less than 0."), n1(a.twentyfour && a.max > 23, "Chance: Max cannot be greater than 23 for twentyfour option."), n1(!a.twentyfour && a.max > 12, "Chance: Max cannot be greater than 12."), n1(a.min > a.max, "Chance: Min cannot be greater than Max."), this.natural({
            min: a.min,
            max: a.max
        });
    }, a1.prototype.millisecond = function() {
        return this.natural({
            max: 999
        });
    }, a1.prototype.minute = a1.prototype.second = function(a) {
        return a = e1(a, {
            min: 0,
            max: 59
        }), n1(a.min < 0, "Chance: Min cannot be less than 0."), n1(a.max > 59, "Chance: Max cannot be greater than 59."), n1(a.min > a.max, "Chance: Min cannot be greater than Max."), this.natural({
            min: a.min,
            max: a.max
        });
    }, a1.prototype.month = function(a) {
        n1((a = e1(a, {
            min: 1,
            max: 12
        })).min < 1, "Chance: Min cannot be less than 1."), n1(a.max > 12, "Chance: Max cannot be greater than 12."), n1(a.min > a.max, "Chance: Min cannot be greater than Max.");
        var i = this.pick(this.months().slice(a.min - 1, a.max));
        return a.raw ? i : i.name;
    }, a1.prototype.months = function() {
        return this.get("months");
    }, a1.prototype.second = function() {
        return this.natural({
            max: 59
        });
    }, a1.prototype.timestamp = function() {
        return this.natural({
            min: 1,
            max: parseInt((new Date).getTime() / 1e3, 10)
        });
    }, a1.prototype.weekday = function(a) {
        var n = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ];
        return (a = e1(a, {
            weekday_only: !1
        })).weekday_only || (n.push("Saturday"), n.push("Sunday")), this.pickone(n);
    }, a1.prototype.year = function(a) {
        return a = e1(a, {
            min: (new Date).getFullYear()
        }), a.max = void 0 !== a.max ? a.max : a.min + 100, this.natural(a).toString();
    }, a1.prototype.cc = function(a) {
        var n, i, r;
        return n = (a = e1(a)).type ? this.cc_type({
            name: a.type,
            raw: !0
        }) : this.cc_type({
            raw: !0
        }), i = n.prefix.split(""), r = n.length - n.prefix.length - 1, (i = i.concat(this.n(this.integer, r, {
            min: 0,
            max: 9
        }))).push(this.luhn_calculate(i.join(""))), i.join("");
    }, a1.prototype.cc_types = function() {
        return this.get("cc_types");
    }, a1.prototype.cc_type = function(a) {
        a = e1(a);
        var n = this.cc_types(), i = null;
        if (a.name) {
            for(var r = 0; r < n.length; r++)if (n[r].name === a.name || n[r].short_name === a.name) {
                i = n[r];
                break;
            }
            if (null === i) throw new RangeError("Chance: Credit card type '" + a.name + "' is not supported");
        } else i = this.pick(n);
        return a.raw ? i : i.name;
    }, a1.prototype.currency_types = function() {
        return this.get("currency_types");
    }, a1.prototype.currency = function() {
        return this.pick(this.currency_types());
    }, a1.prototype.timezones = function() {
        return this.get("timezones");
    }, a1.prototype.timezone = function() {
        return this.pick(this.timezones());
    }, a1.prototype.currency_pair = function(a9) {
        var e3 = this.unique(this.currency, 2, {
            comparator: function(a10, e) {
                return a10.reduce(function(a, n) {
                    return a || n.code === e.code;
                }, !1);
            }
        });
        return a9 ? e3[0].code + "/" + e3[1].code : e3;
    }, a1.prototype.dollar = function(a) {
        a = e1(a, {
            max: 1e4,
            min: 0
        });
        var n = this.floating({
            min: a.min,
            max: a.max,
            fixed: 2
        }).toString(), i = n.split(".")[1];
        return void 0 === i ? n += ".00" : i.length < 2 && (n += "0"), n < 0 ? "-$" + n.replace("-", "") : "$" + n;
    }, a1.prototype.euro = function(a) {
        return Number(this.dollar(a).replace("$", "")).toLocaleString() + "€";
    }, a1.prototype.exp = function(a) {
        a = e1(a);
        var n = {};
        return n.year = this.exp_year(), n.year === (new Date).getFullYear().toString() ? n.month = this.exp_month({
            future: !0
        }) : n.month = this.exp_month(), a.raw ? n : n.month + "/" + n.year;
    }, a1.prototype.exp_month = function(a) {
        a = e1(a);
        var n, i, r = (new Date).getMonth() + 1;
        if (a.future && 12 !== r) do n = this.month({
            raw: !0
        }).numeric, i = parseInt(n, 10);
        while (i <= r)
        else n = this.month({
            raw: !0
        }).numeric;
        return n;
    }, a1.prototype.exp_year = function() {
        var a = (new Date).getMonth() + 1, e = (new Date).getFullYear();
        return this.year({
            min: 12 === a ? e + 1 : e,
            max: e + 10
        });
    }, a1.prototype.vat = function(a) {
        switch((a = e1(a, {
            country: "it"
        })).country.toLowerCase()){
            case "it":
                return this.it_vat();
        }
    }, a1.prototype.iban = function() {
        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return this.string({
            length: 2,
            pool: a
        }) + this.pad(this.integer({
            min: 0,
            max: 99
        }), 2) + this.string({
            length: 4,
            pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        }) + this.pad(this.natural(), this.natural({
            min: 6,
            max: 26
        }));
    }, a1.prototype.it_vat = function() {
        var a = this.natural({
            min: 1,
            max: 18e5
        });
        return (a = this.pad(a, 7) + this.pad(this.pick(this.provinces({
            country: "it"
        })).code, 3)) + this.luhn_calculate(a);
    }, a1.prototype.cf = function(a11) {
        var e4 = (a11 = a11 || {}).gender ? a11.gender : this.gender(), n3 = a11.first ? a11.first : this.first({
            gender: e4,
            nationality: "it"
        }), i4 = a11.last ? a11.last : this.last({
            nationality: "it"
        }), r3 = a11.birthday ? a11.birthday : this.birthday(), o2 = a11.city ? a11.city : this.pickone([
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "L",
            "M",
            "Z"
        ]) + this.pad(this.natural({
            max: 999
        }), 3), t = [], s = function(a12, e) {
            var n, i = [];
            return a12.length < 3 ? i = a12.split("").concat("XXX".split("")).splice(0, 3) : ((n = a12.toUpperCase().split("").map(function(a) {
                return -1 !== "BCDFGHJKLMNPRSTVWZ".indexOf(a) ? a : void 0;
            }).join("")).length > 3 && (n = e ? n.substr(0, 3) : n[0] + n.substr(2, 2)), n.length < 3 && (i = n, n = a12.toUpperCase().split("").map(function(a) {
                return -1 !== "AEIOU".indexOf(a) ? a : void 0;
            }).join("").substr(0, 3 - i.length)), i += n), i;
        };
        return t = t.concat(s(i4, !0), s(n3), function(a, e, n) {
            return a.getFullYear().toString().substr(2) + [
                "A",
                "B",
                "C",
                "D",
                "E",
                "H",
                "L",
                "M",
                "P",
                "R",
                "S",
                "T"
            ][a.getMonth()] + n.pad(a.getDate() + ("female" === e.toLowerCase() ? 40 : 0), 2);
        }(r3, e4, this), o2.toUpperCase().split("")).join(""), (t += function(a) {
            for(var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", n = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", r = 0, o = 0; o < 15; o++)r += o % 2 != 0 ? i.indexOf(n[e.indexOf(a[o])]) : "BAKPLCQDREVOSFTGUHMINJWZYX".indexOf(n[e.indexOf(a[o])]);
            return i[r % 26];
        }(t.toUpperCase())).toUpperCase();
    }, a1.prototype.pl_pesel = function() {
        for(var a = this.natural({
            min: 1,
            max: 9999999999
        }), e = this.pad(a, 10).split(""), n = 0; n < e.length; n++)e[n] = parseInt(e[n]);
        var i = (1 * e[0] + 3 * e[1] + 7 * e[2] + 9 * e[3] + 1 * e[4] + 3 * e[5] + 7 * e[6] + 9 * e[7] + 1 * e[8] + 3 * e[9]) % 10;
        return 0 !== i && (i = 10 - i), e.join("") + i;
    }, a1.prototype.pl_nip = function() {
        for(var a = this.natural({
            min: 1,
            max: 999999999
        }), e = this.pad(a, 9).split(""), n = 0; n < e.length; n++)e[n] = parseInt(e[n]);
        var i = (6 * e[0] + 5 * e[1] + 7 * e[2] + 2 * e[3] + 3 * e[4] + 4 * e[5] + 5 * e[6] + 6 * e[7] + 7 * e[8]) % 11;
        return 10 === i ? this.pl_nip() : e.join("") + i;
    }, a1.prototype.pl_regon = function() {
        for(var a = this.natural({
            min: 1,
            max: 99999999
        }), e = this.pad(a, 8).split(""), n = 0; n < e.length; n++)e[n] = parseInt(e[n]);
        var i = (8 * e[0] + 9 * e[1] + 2 * e[2] + 3 * e[3] + 4 * e[4] + 5 * e[5] + 6 * e[6] + 7 * e[7]) % 11;
        return 10 === i && (i = 0), e.join("") + i;
    }, a1.prototype.note = function(a) {
        a = e1(a, {
            notes: "flatKey"
        });
        var n = {
            naturals: [
                "C",
                "D",
                "E",
                "F",
                "G",
                "A",
                "B"
            ],
            flats: [
                "D♭",
                "E♭",
                "G♭",
                "A♭",
                "B♭"
            ],
            sharps: [
                "C♯",
                "D♯",
                "F♯",
                "G♯",
                "A♯"
            ]
        };
        return n.all = n.naturals.concat(n.flats.concat(n.sharps)), n.flatKey = n.naturals.concat(n.flats), n.sharpKey = n.naturals.concat(n.sharps), this.pickone(n[a.notes]);
    }, a1.prototype.midi_note = function(a) {
        return a = e1(a, {
            min: 0,
            max: 127
        }), this.integer({
            min: a.min,
            max: a.max
        });
    }, a1.prototype.chord_quality = function(a) {
        var n = [
            "maj",
            "min",
            "aug",
            "dim"
        ];
        return (a = e1(a, {
            jazz: !0
        })).jazz && (n = [
            "maj7",
            "min7",
            "7",
            "sus",
            "dim",
            "ø"
        ]), this.pickone(n);
    }, a1.prototype.chord = function(a) {
        return a = e1(a), this.note(a) + this.chord_quality(a);
    }, a1.prototype.tempo = function(a) {
        return a = e1(a, {
            min: 40,
            max: 320
        }), this.integer({
            min: a.min,
            max: a.max
        });
    }, a1.prototype.coin = function(a) {
        return this.bool() ? "heads" : "tails";
    }, a1.prototype.d4 = i1({
        min: 1,
        max: 4
    }), a1.prototype.d6 = i1({
        min: 1,
        max: 6
    }), a1.prototype.d8 = i1({
        min: 1,
        max: 8
    }), a1.prototype.d10 = i1({
        min: 1,
        max: 10
    }), a1.prototype.d12 = i1({
        min: 1,
        max: 12
    }), a1.prototype.d20 = i1({
        min: 1,
        max: 20
    }), a1.prototype.d30 = i1({
        min: 1,
        max: 30
    }), a1.prototype.d100 = i1({
        min: 1,
        max: 100
    }), a1.prototype.rpg = function(a13, n) {
        if (n = e1(n), a13) {
            var i = a13.toLowerCase().split("d"), r = [];
            if (2 !== i.length || !parseInt(i[0], 10) || !parseInt(i[1], 10)) throw new Error("Chance: Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die");
            for(var o = i[0]; o > 0; o--)r[o - 1] = this.natural({
                min: 1,
                max: i[1]
            });
            return void 0 !== n.sum && n.sum ? r.reduce(function(a, e) {
                return a + e;
            }) : r;
        }
        throw new RangeError("Chance: A type of die roll must be included");
    }, a1.prototype.guid = function(a) {
        a = e1(a, {
            version: 5
        });
        var n = "abcdef1234567890";
        return this.string({
            pool: n,
            length: 8
        }) + "-" + this.string({
            pool: n,
            length: 4
        }) + "-" + a.version + this.string({
            pool: n,
            length: 3
        }) + "-" + this.string({
            pool: "ab89",
            length: 1
        }) + this.string({
            pool: n,
            length: 3
        }) + "-" + this.string({
            pool: n,
            length: 12
        });
    }, a1.prototype.hash = function(a) {
        var n = "upper" === (a = e1(a, {
            length: 40,
            casing: "lower"
        })).casing ? m1.toUpperCase() : m1;
        return this.string({
            pool: n,
            length: a.length
        });
    }, a1.prototype.luhn_check = function(a) {
        var e = a.toString();
        return +e.substring(e.length - 1) === this.luhn_calculate(+e.substring(0, e.length - 1));
    }, a1.prototype.luhn_calculate = function(a) {
        for(var e, n = a.toString().split("").reverse(), i = 0, r = 0, o = n.length; o > r; ++r)e = +n[r], r % 2 == 0 && (e *= 2) > 9 && (e -= 9), i += e;
        return 9 * i % 10;
    }, a1.prototype.md5 = function(a) {
        var n = {
            str: "",
            key: null,
            raw: !1
        };
        if (a) {
            if ("string" == typeof a) n.str = a, a = {};
            else {
                if ("object" != typeof a) return null;
                if ("Array" === a.constructor) return null;
            }
        } else n.str = this.string(), a = {};
        if (!(n = e1(a, n)).str) throw new Error("A parameter is required to return an md5 hash.");
        return this.bimd5.md5(n.str, n.key, n.raw);
    }, a1.prototype.file = function(a) {
        var e, n, i = a || {}, r = Object.keys(this.get("fileExtension"));
        if (e = this.word({
            length: i.length
        }), i.extension) return n = i.extension, e + "." + n;
        if (i.extensions) {
            if (Array.isArray(i.extensions)) return n = this.pickone(i.extensions), e + "." + n;
            if (i.extensions.constructor === Object) {
                var o = i.extensions, t = Object.keys(o);
                return n = this.pickone(o[this.pickone(t)]), e + "." + n;
            }
            throw new Error("Chance: Extensions must be an Array or Object");
        }
        if (i.fileType) {
            var s = i.fileType;
            if (-1 !== r.indexOf(s)) return n = this.pickone(this.get("fileExtension")[s]), e + "." + n;
            throw new RangeError("Chance: Expect file type value to be 'raster', 'vector', '3d' or 'document'");
        }
        return n = this.pickone(this.get("fileExtension")[this.pickone(r)]), e + "." + n;
    };
    var h1 = {
        firstNames: {
            male: {
                en: [
                    "James",
                    "John",
                    "Robert",
                    "Michael",
                    "William",
                    "David",
                    "Richard",
                    "Joseph",
                    "Charles",
                    "Thomas",
                    "Christopher",
                    "Daniel",
                    "Matthew",
                    "George",
                    "Donald",
                    "Anthony",
                    "Paul",
                    "Mark",
                    "Edward",
                    "Steven",
                    "Kenneth",
                    "Andrew",
                    "Brian",
                    "Joshua",
                    "Kevin",
                    "Ronald",
                    "Timothy",
                    "Jason",
                    "Jeffrey",
                    "Frank",
                    "Gary",
                    "Ryan",
                    "Nicholas",
                    "Eric",
                    "Stephen",
                    "Jacob",
                    "Larry",
                    "Jonathan",
                    "Scott",
                    "Raymond",
                    "Justin",
                    "Brandon",
                    "Gregory",
                    "Samuel",
                    "Benjamin",
                    "Patrick",
                    "Jack",
                    "Henry",
                    "Walter",
                    "Dennis",
                    "Jerry",
                    "Alexander",
                    "Peter",
                    "Tyler",
                    "Douglas",
                    "Harold",
                    "Aaron",
                    "Jose",
                    "Adam",
                    "Arthur",
                    "Zachary",
                    "Carl",
                    "Nathan",
                    "Albert",
                    "Kyle",
                    "Lawrence",
                    "Joe",
                    "Willie",
                    "Gerald",
                    "Roger",
                    "Keith",
                    "Jeremy",
                    "Terry",
                    "Harry",
                    "Ralph",
                    "Sean",
                    "Jesse",
                    "Roy",
                    "Louis",
                    "Billy",
                    "Austin",
                    "Bruce",
                    "Eugene",
                    "Christian",
                    "Bryan",
                    "Wayne",
                    "Russell",
                    "Howard",
                    "Fred",
                    "Ethan",
                    "Jordan",
                    "Philip",
                    "Alan",
                    "Juan",
                    "Randy",
                    "Vincent",
                    "Bobby",
                    "Dylan",
                    "Johnny",
                    "Phillip",
                    "Victor",
                    "Clarence",
                    "Ernest",
                    "Martin",
                    "Craig",
                    "Stanley",
                    "Shawn",
                    "Travis",
                    "Bradley",
                    "Leonard",
                    "Earl",
                    "Gabriel",
                    "Jimmy",
                    "Francis",
                    "Todd",
                    "Noah",
                    "Danny",
                    "Dale",
                    "Cody",
                    "Carlos",
                    "Allen",
                    "Frederick",
                    "Logan",
                    "Curtis",
                    "Alex",
                    "Joel",
                    "Luis",
                    "Norman",
                    "Marvin",
                    "Glenn",
                    "Tony",
                    "Nathaniel",
                    "Rodney",
                    "Melvin",
                    "Alfred",
                    "Steve",
                    "Cameron",
                    "Chad",
                    "Edwin",
                    "Caleb",
                    "Evan",
                    "Antonio",
                    "Lee",
                    "Herbert",
                    "Jeffery",
                    "Isaac",
                    "Derek",
                    "Ricky",
                    "Marcus",
                    "Theodore",
                    "Elijah",
                    "Luke",
                    "Jesus",
                    "Eddie",
                    "Troy",
                    "Mike",
                    "Dustin",
                    "Ray",
                    "Adrian",
                    "Bernard",
                    "Leroy",
                    "Angel",
                    "Randall",
                    "Wesley",
                    "Ian",
                    "Jared",
                    "Mason",
                    "Hunter",
                    "Calvin",
                    "Oscar",
                    "Clifford",
                    "Jay",
                    "Shane",
                    "Ronnie",
                    "Barry",
                    "Lucas",
                    "Corey",
                    "Manuel",
                    "Leo",
                    "Tommy",
                    "Warren",
                    "Jackson",
                    "Isaiah",
                    "Connor",
                    "Don",
                    "Dean",
                    "Jon",
                    "Julian",
                    "Miguel",
                    "Bill",
                    "Lloyd",
                    "Charlie",
                    "Mitchell",
                    "Leon",
                    "Jerome",
                    "Darrell",
                    "Jeremiah",
                    "Alvin",
                    "Brett",
                    "Seth",
                    "Floyd",
                    "Jim",
                    "Blake",
                    "Micheal",
                    "Gordon",
                    "Trevor",
                    "Lewis",
                    "Erik",
                    "Edgar",
                    "Vernon",
                    "Devin",
                    "Gavin",
                    "Jayden",
                    "Chris",
                    "Clyde",
                    "Tom",
                    "Derrick",
                    "Mario",
                    "Brent",
                    "Marc",
                    "Herman",
                    "Chase",
                    "Dominic",
                    "Ricardo",
                    "Franklin",
                    "Maurice",
                    "Max",
                    "Aiden",
                    "Owen",
                    "Lester",
                    "Gilbert",
                    "Elmer",
                    "Gene",
                    "Francisco",
                    "Glen",
                    "Cory",
                    "Garrett",
                    "Clayton",
                    "Sam",
                    "Jorge",
                    "Chester",
                    "Alejandro",
                    "Jeff",
                    "Harvey",
                    "Milton",
                    "Cole",
                    "Ivan",
                    "Andre",
                    "Duane",
                    "Landon"
                ],
                it: [
                    "Adolfo",
                    "Alberto",
                    "Aldo",
                    "Alessandro",
                    "Alessio",
                    "Alfredo",
                    "Alvaro",
                    "Andrea",
                    "Angelo",
                    "Angiolo",
                    "Antonino",
                    "Antonio",
                    "Attilio",
                    "Benito",
                    "Bernardo",
                    "Bruno",
                    "Carlo",
                    "Cesare",
                    "Christian",
                    "Claudio",
                    "Corrado",
                    "Cosimo",
                    "Cristian",
                    "Cristiano",
                    "Daniele",
                    "Dario",
                    "David",
                    "Davide",
                    "Diego",
                    "Dino",
                    "Domenico",
                    "Duccio",
                    "Edoardo",
                    "Elia",
                    "Elio",
                    "Emanuele",
                    "Emiliano",
                    "Emilio",
                    "Enrico",
                    "Enzo",
                    "Ettore",
                    "Fabio",
                    "Fabrizio",
                    "Federico",
                    "Ferdinando",
                    "Fernando",
                    "Filippo",
                    "Francesco",
                    "Franco",
                    "Gabriele",
                    "Giacomo",
                    "Giampaolo",
                    "Giampiero",
                    "Giancarlo",
                    "Gianfranco",
                    "Gianluca",
                    "Gianmarco",
                    "Gianni",
                    "Gino",
                    "Giorgio",
                    "Giovanni",
                    "Giuliano",
                    "Giulio",
                    "Giuseppe",
                    "Graziano",
                    "Gregorio",
                    "Guido",
                    "Iacopo",
                    "Jacopo",
                    "Lapo",
                    "Leonardo",
                    "Lorenzo",
                    "Luca",
                    "Luciano",
                    "Luigi",
                    "Manuel",
                    "Marcello",
                    "Marco",
                    "Marino",
                    "Mario",
                    "Massimiliano",
                    "Massimo",
                    "Matteo",
                    "Mattia",
                    "Maurizio",
                    "Mauro",
                    "Michele",
                    "Mirko",
                    "Mohamed",
                    "Nello",
                    "Neri",
                    "Niccolò",
                    "Nicola",
                    "Osvaldo",
                    "Otello",
                    "Paolo",
                    "Pier Luigi",
                    "Piero",
                    "Pietro",
                    "Raffaele",
                    "Remo",
                    "Renato",
                    "Renzo",
                    "Riccardo",
                    "Roberto",
                    "Rolando",
                    "Romano",
                    "Salvatore",
                    "Samuele",
                    "Sandro",
                    "Sergio",
                    "Silvano",
                    "Simone",
                    "Stefano",
                    "Thomas",
                    "Tommaso",
                    "Ubaldo",
                    "Ugo",
                    "Umberto",
                    "Valerio",
                    "Valter",
                    "Vasco",
                    "Vincenzo",
                    "Vittorio"
                ],
                nl: [
                    "Aaron",
                    "Abel",
                    "Adam",
                    "Adriaan",
                    "Albert",
                    "Alexander",
                    "Ali",
                    "Arjen",
                    "Arno",
                    "Bart",
                    "Bas",
                    "Bastiaan",
                    "Benjamin",
                    "Bob",
                    "Boris",
                    "Bram",
                    "Brent",
                    "Cas",
                    "Casper",
                    "Chris",
                    "Christiaan",
                    "Cornelis",
                    "Daan",
                    "Daley",
                    "Damian",
                    "Dani",
                    "Daniel",
                    "Daniël",
                    "David",
                    "Dean",
                    "Dirk",
                    "Dylan",
                    "Egbert",
                    "Elijah",
                    "Erik",
                    "Erwin",
                    "Evert",
                    "Ezra",
                    "Fabian",
                    "Fedde",
                    "Finn",
                    "Florian",
                    "Floris",
                    "Frank",
                    "Frans",
                    "Frederik",
                    "Freek",
                    "Geert",
                    "Gerard",
                    "Gerben",
                    "Gerrit",
                    "Gijs",
                    "Guus",
                    "Hans",
                    "Hendrik",
                    "Henk",
                    "Herman",
                    "Hidde",
                    "Hugo",
                    "Jaap",
                    "Jan Jaap",
                    "Jan-Willem",
                    "Jack",
                    "Jacob",
                    "Jan",
                    "Jason",
                    "Jasper",
                    "Jayden",
                    "Jelle",
                    "Jelte",
                    "Jens",
                    "Jeroen",
                    "Jesse",
                    "Jim",
                    "Job",
                    "Joep",
                    "Johannes",
                    "John",
                    "Jonathan",
                    "Joris",
                    "Joshua",
                    "Joël",
                    "Julian",
                    "Kees",
                    "Kevin",
                    "Koen",
                    "Lars",
                    "Laurens",
                    "Leendert",
                    "Lennard",
                    "Lodewijk",
                    "Luc",
                    "Luca",
                    "Lucas",
                    "Lukas",
                    "Luuk",
                    "Maarten",
                    "Marcus",
                    "Martijn",
                    "Martin",
                    "Matthijs",
                    "Maurits",
                    "Max",
                    "Mees",
                    "Melle",
                    "Mick",
                    "Mika",
                    "Milan",
                    "Mohamed",
                    "Mohammed",
                    "Morris",
                    "Muhammed",
                    "Nathan",
                    "Nick",
                    "Nico",
                    "Niek",
                    "Niels",
                    "Noah",
                    "Noud",
                    "Olivier",
                    "Oscar",
                    "Owen",
                    "Paul",
                    "Pepijn",
                    "Peter",
                    "Pieter",
                    "Pim",
                    "Quinten",
                    "Reinier",
                    "Rens",
                    "Robin",
                    "Ruben",
                    "Sam",
                    "Samuel",
                    "Sander",
                    "Sebastiaan",
                    "Sem",
                    "Sep",
                    "Sepp",
                    "Siem",
                    "Simon",
                    "Stan",
                    "Stef",
                    "Steven",
                    "Stijn",
                    "Sven",
                    "Teun",
                    "Thijmen",
                    "Thijs",
                    "Thomas",
                    "Tijn",
                    "Tim",
                    "Timo",
                    "Tobias",
                    "Tom",
                    "Victor",
                    "Vince",
                    "Willem",
                    "Wim",
                    "Wouter",
                    "Yusuf"
                ]
            },
            female: {
                en: [
                    "Mary",
                    "Emma",
                    "Elizabeth",
                    "Minnie",
                    "Margaret",
                    "Ida",
                    "Alice",
                    "Bertha",
                    "Sarah",
                    "Annie",
                    "Clara",
                    "Ella",
                    "Florence",
                    "Cora",
                    "Martha",
                    "Laura",
                    "Nellie",
                    "Grace",
                    "Carrie",
                    "Maude",
                    "Mabel",
                    "Bessie",
                    "Jennie",
                    "Gertrude",
                    "Julia",
                    "Hattie",
                    "Edith",
                    "Mattie",
                    "Rose",
                    "Catherine",
                    "Lillian",
                    "Ada",
                    "Lillie",
                    "Helen",
                    "Jessie",
                    "Louise",
                    "Ethel",
                    "Lula",
                    "Myrtle",
                    "Eva",
                    "Frances",
                    "Lena",
                    "Lucy",
                    "Edna",
                    "Maggie",
                    "Pearl",
                    "Daisy",
                    "Fannie",
                    "Josephine",
                    "Dora",
                    "Rosa",
                    "Katherine",
                    "Agnes",
                    "Marie",
                    "Nora",
                    "May",
                    "Mamie",
                    "Blanche",
                    "Stella",
                    "Ellen",
                    "Nancy",
                    "Effie",
                    "Sallie",
                    "Nettie",
                    "Della",
                    "Lizzie",
                    "Flora",
                    "Susie",
                    "Maud",
                    "Mae",
                    "Etta",
                    "Harriet",
                    "Sadie",
                    "Caroline",
                    "Katie",
                    "Lydia",
                    "Elsie",
                    "Kate",
                    "Susan",
                    "Mollie",
                    "Alma",
                    "Addie",
                    "Georgia",
                    "Eliza",
                    "Lulu",
                    "Nannie",
                    "Lottie",
                    "Amanda",
                    "Belle",
                    "Charlotte",
                    "Rebecca",
                    "Ruth",
                    "Viola",
                    "Olive",
                    "Amelia",
                    "Hannah",
                    "Jane",
                    "Virginia",
                    "Emily",
                    "Matilda",
                    "Irene",
                    "Kathryn",
                    "Esther",
                    "Willie",
                    "Henrietta",
                    "Ollie",
                    "Amy",
                    "Rachel",
                    "Sara",
                    "Estella",
                    "Theresa",
                    "Augusta",
                    "Ora",
                    "Pauline",
                    "Josie",
                    "Lola",
                    "Sophia",
                    "Leona",
                    "Anne",
                    "Mildred",
                    "Ann",
                    "Beulah",
                    "Callie",
                    "Lou",
                    "Delia",
                    "Eleanor",
                    "Barbara",
                    "Iva",
                    "Louisa",
                    "Maria",
                    "Mayme",
                    "Evelyn",
                    "Estelle",
                    "Nina",
                    "Betty",
                    "Marion",
                    "Bettie",
                    "Dorothy",
                    "Luella",
                    "Inez",
                    "Lela",
                    "Rosie",
                    "Allie",
                    "Millie",
                    "Janie",
                    "Cornelia",
                    "Victoria",
                    "Ruby",
                    "Winifred",
                    "Alta",
                    "Celia",
                    "Christine",
                    "Beatrice",
                    "Birdie",
                    "Harriett",
                    "Mable",
                    "Myra",
                    "Sophie",
                    "Tillie",
                    "Isabel",
                    "Sylvia",
                    "Carolyn",
                    "Isabelle",
                    "Leila",
                    "Sally",
                    "Ina",
                    "Essie",
                    "Bertie",
                    "Nell",
                    "Alberta",
                    "Katharine",
                    "Lora",
                    "Rena",
                    "Mina",
                    "Rhoda",
                    "Mathilda",
                    "Abbie",
                    "Eula",
                    "Dollie",
                    "Hettie",
                    "Eunice",
                    "Fanny",
                    "Ola",
                    "Lenora",
                    "Adelaide",
                    "Christina",
                    "Lelia",
                    "Nelle",
                    "Sue",
                    "Johanna",
                    "Lilly",
                    "Lucinda",
                    "Minerva",
                    "Lettie",
                    "Roxie",
                    "Cynthia",
                    "Helena",
                    "Hilda",
                    "Hulda",
                    "Bernice",
                    "Genevieve",
                    "Jean",
                    "Cordelia",
                    "Marian",
                    "Francis",
                    "Jeanette",
                    "Adeline",
                    "Gussie",
                    "Leah",
                    "Lois",
                    "Lura",
                    "Mittie",
                    "Hallie",
                    "Isabella",
                    "Olga",
                    "Phoebe",
                    "Teresa",
                    "Hester",
                    "Lida",
                    "Lina",
                    "Winnie",
                    "Claudia",
                    "Marguerite",
                    "Vera",
                    "Cecelia",
                    "Bess",
                    "Emilie",
                    "Rosetta",
                    "Verna",
                    "Myrtie",
                    "Cecilia",
                    "Elva",
                    "Olivia",
                    "Ophelia",
                    "Georgie",
                    "Elnora",
                    "Violet",
                    "Adele",
                    "Lily",
                    "Linnie",
                    "Loretta",
                    "Madge",
                    "Polly",
                    "Virgie",
                    "Eugenia",
                    "Lucile",
                    "Lucille",
                    "Mabelle",
                    "Rosalie"
                ],
                it: [
                    "Ada",
                    "Adriana",
                    "Alessandra",
                    "Alessia",
                    "Alice",
                    "Angela",
                    "Anna",
                    "Anna Maria",
                    "Annalisa",
                    "Annita",
                    "Annunziata",
                    "Antonella",
                    "Arianna",
                    "Asia",
                    "Assunta",
                    "Aurora",
                    "Barbara",
                    "Beatrice",
                    "Benedetta",
                    "Bianca",
                    "Bruna",
                    "Camilla",
                    "Carla",
                    "Carlotta",
                    "Carmela",
                    "Carolina",
                    "Caterina",
                    "Catia",
                    "Cecilia",
                    "Chiara",
                    "Cinzia",
                    "Clara",
                    "Claudia",
                    "Costanza",
                    "Cristina",
                    "Daniela",
                    "Debora",
                    "Diletta",
                    "Dina",
                    "Donatella",
                    "Elena",
                    "Eleonora",
                    "Elisa",
                    "Elisabetta",
                    "Emanuela",
                    "Emma",
                    "Eva",
                    "Federica",
                    "Fernanda",
                    "Fiorella",
                    "Fiorenza",
                    "Flora",
                    "Franca",
                    "Francesca",
                    "Gabriella",
                    "Gaia",
                    "Gemma",
                    "Giada",
                    "Gianna",
                    "Gina",
                    "Ginevra",
                    "Giorgia",
                    "Giovanna",
                    "Giulia",
                    "Giuliana",
                    "Giuseppa",
                    "Giuseppina",
                    "Grazia",
                    "Graziella",
                    "Greta",
                    "Ida",
                    "Ilaria",
                    "Ines",
                    "Iolanda",
                    "Irene",
                    "Irma",
                    "Isabella",
                    "Jessica",
                    "Laura",
                    "Lea",
                    "Letizia",
                    "Licia",
                    "Lidia",
                    "Liliana",
                    "Lina",
                    "Linda",
                    "Lisa",
                    "Livia",
                    "Loretta",
                    "Luana",
                    "Lucia",
                    "Luciana",
                    "Lucrezia",
                    "Luisa",
                    "Manuela",
                    "Mara",
                    "Marcella",
                    "Margherita",
                    "Maria",
                    "Maria Cristina",
                    "Maria Grazia",
                    "Maria Luisa",
                    "Maria Pia",
                    "Maria Teresa",
                    "Marina",
                    "Marisa",
                    "Marta",
                    "Martina",
                    "Marzia",
                    "Matilde",
                    "Melissa",
                    "Michela",
                    "Milena",
                    "Mirella",
                    "Monica",
                    "Natalina",
                    "Nella",
                    "Nicoletta",
                    "Noemi",
                    "Olga",
                    "Paola",
                    "Patrizia",
                    "Piera",
                    "Pierina",
                    "Raffaella",
                    "Rebecca",
                    "Renata",
                    "Rina",
                    "Rita",
                    "Roberta",
                    "Rosa",
                    "Rosanna",
                    "Rossana",
                    "Rossella",
                    "Sabrina",
                    "Sandra",
                    "Sara",
                    "Serena",
                    "Silvana",
                    "Silvia",
                    "Simona",
                    "Simonetta",
                    "Sofia",
                    "Sonia",
                    "Stefania",
                    "Susanna",
                    "Teresa",
                    "Tina",
                    "Tiziana",
                    "Tosca",
                    "Valentina",
                    "Valeria",
                    "Vanda",
                    "Vanessa",
                    "Vanna",
                    "Vera",
                    "Veronica",
                    "Vilma",
                    "Viola",
                    "Virginia",
                    "Vittoria"
                ],
                nl: [
                    "Ada",
                    "Arianne",
                    "Afke",
                    "Amanda",
                    "Amber",
                    "Amy",
                    "Aniek",
                    "Anita",
                    "Anja",
                    "Anna",
                    "Anne",
                    "Annelies",
                    "Annemarie",
                    "Annette",
                    "Anouk",
                    "Astrid",
                    "Aukje",
                    "Barbara",
                    "Bianca",
                    "Carla",
                    "Carlijn",
                    "Carolien",
                    "Chantal",
                    "Charlotte",
                    "Claudia",
                    "Daniëlle",
                    "Debora",
                    "Diane",
                    "Dora",
                    "Eline",
                    "Elise",
                    "Ella",
                    "Ellen",
                    "Emma",
                    "Esmee",
                    "Evelien",
                    "Esther",
                    "Erica",
                    "Eva",
                    "Femke",
                    "Fleur",
                    "Floor",
                    "Froukje",
                    "Gea",
                    "Gerda",
                    "Hanna",
                    "Hanneke",
                    "Heleen",
                    "Hilde",
                    "Ilona",
                    "Ina",
                    "Inge",
                    "Ingrid",
                    "Iris",
                    "Isabel",
                    "Isabelle",
                    "Janneke",
                    "Jasmijn",
                    "Jeanine",
                    "Jennifer",
                    "Jessica",
                    "Johanna",
                    "Joke",
                    "Julia",
                    "Julie",
                    "Karen",
                    "Karin",
                    "Katja",
                    "Kim",
                    "Lara",
                    "Laura",
                    "Lena",
                    "Lianne",
                    "Lieke",
                    "Lilian",
                    "Linda",
                    "Lisa",
                    "Lisanne",
                    "Lotte",
                    "Louise",
                    "Maaike",
                    "Manon",
                    "Marga",
                    "Maria",
                    "Marissa",
                    "Marit",
                    "Marjolein",
                    "Martine",
                    "Marleen",
                    "Melissa",
                    "Merel",
                    "Miranda",
                    "Michelle",
                    "Mirjam",
                    "Mirthe",
                    "Naomi",
                    "Natalie",
                    "Nienke",
                    "Nina",
                    "Noortje",
                    "Olivia",
                    "Patricia",
                    "Paula",
                    "Paulien",
                    "Ramona",
                    "Ria",
                    "Rianne",
                    "Roos",
                    "Rosanne",
                    "Ruth",
                    "Sabrina",
                    "Sandra",
                    "Sanne",
                    "Sara",
                    "Saskia",
                    "Silvia",
                    "Sofia",
                    "Sophie",
                    "Sonja",
                    "Suzanne",
                    "Tamara",
                    "Tess",
                    "Tessa",
                    "Tineke",
                    "Valerie",
                    "Vanessa",
                    "Veerle",
                    "Vera",
                    "Victoria",
                    "Wendy",
                    "Willeke",
                    "Yvonne",
                    "Zoë"
                ]
            }
        },
        lastNames: {
            en: [
                "Smith",
                "Johnson",
                "Williams",
                "Jones",
                "Brown",
                "Davis",
                "Miller",
                "Wilson",
                "Moore",
                "Taylor",
                "Anderson",
                "Thomas",
                "Jackson",
                "White",
                "Harris",
                "Martin",
                "Thompson",
                "Garcia",
                "Martinez",
                "Robinson",
                "Clark",
                "Rodriguez",
                "Lewis",
                "Lee",
                "Walker",
                "Hall",
                "Allen",
                "Young",
                "Hernandez",
                "King",
                "Wright",
                "Lopez",
                "Hill",
                "Scott",
                "Green",
                "Adams",
                "Baker",
                "Gonzalez",
                "Nelson",
                "Carter",
                "Mitchell",
                "Perez",
                "Roberts",
                "Turner",
                "Phillips",
                "Campbell",
                "Parker",
                "Evans",
                "Edwards",
                "Collins",
                "Stewart",
                "Sanchez",
                "Morris",
                "Rogers",
                "Reed",
                "Cook",
                "Morgan",
                "Bell",
                "Murphy",
                "Bailey",
                "Rivera",
                "Cooper",
                "Richardson",
                "Cox",
                "Howard",
                "Ward",
                "Torres",
                "Peterson",
                "Gray",
                "Ramirez",
                "James",
                "Watson",
                "Brooks",
                "Kelly",
                "Sanders",
                "Price",
                "Bennett",
                "Wood",
                "Barnes",
                "Ross",
                "Henderson",
                "Coleman",
                "Jenkins",
                "Perry",
                "Powell",
                "Long",
                "Patterson",
                "Hughes",
                "Flores",
                "Washington",
                "Butler",
                "Simmons",
                "Foster",
                "Gonzales",
                "Bryant",
                "Alexander",
                "Russell",
                "Griffin",
                "Diaz",
                "Hayes",
                "Myers",
                "Ford",
                "Hamilton",
                "Graham",
                "Sullivan",
                "Wallace",
                "Woods",
                "Cole",
                "West",
                "Jordan",
                "Owens",
                "Reynolds",
                "Fisher",
                "Ellis",
                "Harrison",
                "Gibson",
                "McDonald",
                "Cruz",
                "Marshall",
                "Ortiz",
                "Gomez",
                "Murray",
                "Freeman",
                "Wells",
                "Webb",
                "Simpson",
                "Stevens",
                "Tucker",
                "Porter",
                "Hunter",
                "Hicks",
                "Crawford",
                "Henry",
                "Boyd",
                "Mason",
                "Morales",
                "Kennedy",
                "Warren",
                "Dixon",
                "Ramos",
                "Reyes",
                "Burns",
                "Gordon",
                "Shaw",
                "Holmes",
                "Rice",
                "Robertson",
                "Hunt",
                "Black",
                "Daniels",
                "Palmer",
                "Mills",
                "Nichols",
                "Grant",
                "Knight",
                "Ferguson",
                "Rose",
                "Stone",
                "Hawkins",
                "Dunn",
                "Perkins",
                "Hudson",
                "Spencer",
                "Gardner",
                "Stephens",
                "Payne",
                "Pierce",
                "Berry",
                "Matthews",
                "Arnold",
                "Wagner",
                "Willis",
                "Ray",
                "Watkins",
                "Olson",
                "Carroll",
                "Duncan",
                "Snyder",
                "Hart",
                "Cunningham",
                "Bradley",
                "Lane",
                "Andrews",
                "Ruiz",
                "Harper",
                "Fox",
                "Riley",
                "Armstrong",
                "Carpenter",
                "Weaver",
                "Greene",
                "Lawrence",
                "Elliott",
                "Chavez",
                "Sims",
                "Austin",
                "Peters",
                "Kelley",
                "Franklin",
                "Lawson",
                "Fields",
                "Gutierrez",
                "Ryan",
                "Schmidt",
                "Carr",
                "Vasquez",
                "Castillo",
                "Wheeler",
                "Chapman",
                "Oliver",
                "Montgomery",
                "Richards",
                "Williamson",
                "Johnston",
                "Banks",
                "Meyer",
                "Bishop",
                "McCoy",
                "Howell",
                "Alvarez",
                "Morrison",
                "Hansen",
                "Fernandez",
                "Garza",
                "Harvey",
                "Little",
                "Burton",
                "Stanley",
                "Nguyen",
                "George",
                "Jacobs",
                "Reid",
                "Kim",
                "Fuller",
                "Lynch",
                "Dean",
                "Gilbert",
                "Garrett",
                "Romero",
                "Welch",
                "Larson",
                "Frazier",
                "Burke",
                "Hanson",
                "Day",
                "Mendoza",
                "Moreno",
                "Bowman",
                "Medina",
                "Fowler",
                "Brewer",
                "Hoffman",
                "Carlson",
                "Silva",
                "Pearson",
                "Holland",
                "Douglas",
                "Fleming",
                "Jensen",
                "Vargas",
                "Byrd",
                "Davidson",
                "Hopkins",
                "May",
                "Terry",
                "Herrera",
                "Wade",
                "Soto",
                "Walters",
                "Curtis",
                "Neal",
                "Caldwell",
                "Lowe",
                "Jennings",
                "Barnett",
                "Graves",
                "Jimenez",
                "Horton",
                "Shelton",
                "Barrett",
                "Obrien",
                "Castro",
                "Sutton",
                "Gregory",
                "McKinney",
                "Lucas",
                "Miles",
                "Craig",
                "Rodriquez",
                "Chambers",
                "Holt",
                "Lambert",
                "Fletcher",
                "Watts",
                "Bates",
                "Hale",
                "Rhodes",
                "Pena",
                "Beck",
                "Newman",
                "Haynes",
                "McDaniel",
                "Mendez",
                "Bush",
                "Vaughn",
                "Parks",
                "Dawson",
                "Santiago",
                "Norris",
                "Hardy",
                "Love",
                "Steele",
                "Curry",
                "Powers",
                "Schultz",
                "Barker",
                "Guzman",
                "Page",
                "Munoz",
                "Ball",
                "Keller",
                "Chandler",
                "Weber",
                "Leonard",
                "Walsh",
                "Lyons",
                "Ramsey",
                "Wolfe",
                "Schneider",
                "Mullins",
                "Benson",
                "Sharp",
                "Bowen",
                "Daniel",
                "Barber",
                "Cummings",
                "Hines",
                "Baldwin",
                "Griffith",
                "Valdez",
                "Hubbard",
                "Salazar",
                "Reeves",
                "Warner",
                "Stevenson",
                "Burgess",
                "Santos",
                "Tate",
                "Cross",
                "Garner",
                "Mann",
                "Mack",
                "Moss",
                "Thornton",
                "Dennis",
                "McGee",
                "Farmer",
                "Delgado",
                "Aguilar",
                "Vega",
                "Glover",
                "Manning",
                "Cohen",
                "Harmon",
                "Rodgers",
                "Robbins",
                "Newton",
                "Todd",
                "Blair",
                "Higgins",
                "Ingram",
                "Reese",
                "Cannon",
                "Strickland",
                "Townsend",
                "Potter",
                "Goodwin",
                "Walton",
                "Rowe",
                "Hampton",
                "Ortega",
                "Patton",
                "Swanson",
                "Joseph",
                "Francis",
                "Goodman",
                "Maldonado",
                "Yates",
                "Becker",
                "Erickson",
                "Hodges",
                "Rios",
                "Conner",
                "Adkins",
                "Webster",
                "Norman",
                "Malone",
                "Hammond",
                "Flowers",
                "Cobb",
                "Moody",
                "Quinn",
                "Blake",
                "Maxwell",
                "Pope",
                "Floyd",
                "Osborne",
                "Paul",
                "McCarthy",
                "Guerrero",
                "Lindsey",
                "Estrada",
                "Sandoval",
                "Gibbs",
                "Tyler",
                "Gross",
                "Fitzgerald",
                "Stokes",
                "Doyle",
                "Sherman",
                "Saunders",
                "Wise",
                "Colon",
                "Gill",
                "Alvarado",
                "Greer",
                "Padilla",
                "Simon",
                "Waters",
                "Nunez",
                "Ballard",
                "Schwartz",
                "McBride",
                "Houston",
                "Christensen",
                "Klein",
                "Pratt",
                "Briggs",
                "Parsons",
                "McLaughlin",
                "Zimmerman",
                "French",
                "Buchanan",
                "Moran",
                "Copeland",
                "Roy",
                "Pittman",
                "Brady",
                "McCormick",
                "Holloway",
                "Brock",
                "Poole",
                "Frank",
                "Logan",
                "Owen",
                "Bass",
                "Marsh",
                "Drake",
                "Wong",
                "Jefferson",
                "Park",
                "Morton",
                "Abbott",
                "Sparks",
                "Patrick",
                "Norton",
                "Huff",
                "Clayton",
                "Massey",
                "Lloyd",
                "Figueroa",
                "Carson",
                "Bowers",
                "Roberson",
                "Barton",
                "Tran",
                "Lamb",
                "Harrington",
                "Casey",
                "Boone",
                "Cortez",
                "Clarke",
                "Mathis",
                "Singleton",
                "Wilkins",
                "Cain",
                "Bryan",
                "Underwood",
                "Hogan",
                "McKenzie",
                "Collier",
                "Luna",
                "Phelps",
                "McGuire",
                "Allison",
                "Bridges",
                "Wilkerson",
                "Nash",
                "Summers",
                "Atkins"
            ],
            it: [
                "Acciai",
                "Aglietti",
                "Agostini",
                "Agresti",
                "Ahmed",
                "Aiazzi",
                "Albanese",
                "Alberti",
                "Alessi",
                "Alfani",
                "Alinari",
                "Alterini",
                "Amato",
                "Ammannati",
                "Ancillotti",
                "Andrei",
                "Andreini",
                "Andreoni",
                "Angeli",
                "Anichini",
                "Antonelli",
                "Antonini",
                "Arena",
                "Ariani",
                "Arnetoli",
                "Arrighi",
                "Baccani",
                "Baccetti",
                "Bacci",
                "Bacherini",
                "Badii",
                "Baggiani",
                "Baglioni",
                "Bagni",
                "Bagnoli",
                "Baldassini",
                "Baldi",
                "Baldini",
                "Ballerini",
                "Balli",
                "Ballini",
                "Balloni",
                "Bambi",
                "Banchi",
                "Bandinelli",
                "Bandini",
                "Bani",
                "Barbetti",
                "Barbieri",
                "Barchielli",
                "Bardazzi",
                "Bardelli",
                "Bardi",
                "Barducci",
                "Bargellini",
                "Bargiacchi",
                "Barni",
                "Baroncelli",
                "Baroncini",
                "Barone",
                "Baroni",
                "Baronti",
                "Bartalesi",
                "Bartoletti",
                "Bartoli",
                "Bartolini",
                "Bartoloni",
                "Bartolozzi",
                "Basagni",
                "Basile",
                "Bassi",
                "Batacchi",
                "Battaglia",
                "Battaglini",
                "Bausi",
                "Becagli",
                "Becattini",
                "Becchi",
                "Becucci",
                "Bellandi",
                "Bellesi",
                "Belli",
                "Bellini",
                "Bellucci",
                "Bencini",
                "Benedetti",
                "Benelli",
                "Beni",
                "Benini",
                "Bensi",
                "Benucci",
                "Benvenuti",
                "Berlincioni",
                "Bernacchioni",
                "Bernardi",
                "Bernardini",
                "Berni",
                "Bernini",
                "Bertelli",
                "Berti",
                "Bertini",
                "Bessi",
                "Betti",
                "Bettini",
                "Biagi",
                "Biagini",
                "Biagioni",
                "Biagiotti",
                "Biancalani",
                "Bianchi",
                "Bianchini",
                "Bianco",
                "Biffoli",
                "Bigazzi",
                "Bigi",
                "Biliotti",
                "Billi",
                "Binazzi",
                "Bindi",
                "Bini",
                "Biondi",
                "Bizzarri",
                "Bocci",
                "Bogani",
                "Bolognesi",
                "Bonaiuti",
                "Bonanni",
                "Bonciani",
                "Boncinelli",
                "Bondi",
                "Bonechi",
                "Bongini",
                "Boni",
                "Bonini",
                "Borchi",
                "Boretti",
                "Borghi",
                "Borghini",
                "Borgioli",
                "Borri",
                "Borselli",
                "Boschi",
                "Bottai",
                "Bracci",
                "Braccini",
                "Brandi",
                "Braschi",
                "Bravi",
                "Brazzini",
                "Breschi",
                "Brilli",
                "Brizzi",
                "Brogelli",
                "Brogi",
                "Brogioni",
                "Brunelli",
                "Brunetti",
                "Bruni",
                "Bruno",
                "Brunori",
                "Bruschi",
                "Bucci",
                "Bucciarelli",
                "Buccioni",
                "Bucelli",
                "Bulli",
                "Burberi",
                "Burchi",
                "Burgassi",
                "Burroni",
                "Bussotti",
                "Buti",
                "Caciolli",
                "Caiani",
                "Calabrese",
                "Calamai",
                "Calamandrei",
                "Caldini",
                "Calo'",
                "Calonaci",
                "Calosi",
                "Calvelli",
                "Cambi",
                "Camiciottoli",
                "Cammelli",
                "Cammilli",
                "Campolmi",
                "Cantini",
                "Capanni",
                "Capecchi",
                "Caponi",
                "Cappelletti",
                "Cappelli",
                "Cappellini",
                "Cappugi",
                "Capretti",
                "Caputo",
                "Carbone",
                "Carboni",
                "Cardini",
                "Carlesi",
                "Carletti",
                "Carli",
                "Caroti",
                "Carotti",
                "Carrai",
                "Carraresi",
                "Carta",
                "Caruso",
                "Casalini",
                "Casati",
                "Caselli",
                "Casini",
                "Castagnoli",
                "Castellani",
                "Castelli",
                "Castellucci",
                "Catalano",
                "Catarzi",
                "Catelani",
                "Cavaciocchi",
                "Cavallaro",
                "Cavallini",
                "Cavicchi",
                "Cavini",
                "Ceccarelli",
                "Ceccatelli",
                "Ceccherelli",
                "Ceccherini",
                "Cecchi",
                "Cecchini",
                "Cecconi",
                "Cei",
                "Cellai",
                "Celli",
                "Cellini",
                "Cencetti",
                "Ceni",
                "Cenni",
                "Cerbai",
                "Cesari",
                "Ceseri",
                "Checcacci",
                "Checchi",
                "Checcucci",
                "Cheli",
                "Chellini",
                "Chen",
                "Cheng",
                "Cherici",
                "Cherubini",
                "Chiaramonti",
                "Chiarantini",
                "Chiarelli",
                "Chiari",
                "Chiarini",
                "Chiarugi",
                "Chiavacci",
                "Chiesi",
                "Chimenti",
                "Chini",
                "Chirici",
                "Chiti",
                "Ciabatti",
                "Ciampi",
                "Cianchi",
                "Cianfanelli",
                "Cianferoni",
                "Ciani",
                "Ciapetti",
                "Ciappi",
                "Ciardi",
                "Ciatti",
                "Cicali",
                "Ciccone",
                "Cinelli",
                "Cini",
                "Ciobanu",
                "Ciolli",
                "Cioni",
                "Cipriani",
                "Cirillo",
                "Cirri",
                "Ciucchi",
                "Ciuffi",
                "Ciulli",
                "Ciullini",
                "Clemente",
                "Cocchi",
                "Cognome",
                "Coli",
                "Collini",
                "Colombo",
                "Colzi",
                "Comparini",
                "Conforti",
                "Consigli",
                "Conte",
                "Conti",
                "Contini",
                "Coppini",
                "Coppola",
                "Corsi",
                "Corsini",
                "Corti",
                "Cortini",
                "Cosi",
                "Costa",
                "Costantini",
                "Costantino",
                "Cozzi",
                "Cresci",
                "Crescioli",
                "Cresti",
                "Crini",
                "Curradi",
                "D'Agostino",
                "D'Alessandro",
                "D'Amico",
                "D'Angelo",
                "Daddi",
                "Dainelli",
                "Dallai",
                "Danti",
                "Davitti",
                "De Angelis",
                "De Luca",
                "De Marco",
                "De Rosa",
                "De Santis",
                "De Simone",
                "De Vita",
                "Degl'Innocenti",
                "Degli Innocenti",
                "Dei",
                "Del Lungo",
                "Del Re",
                "Di Marco",
                "Di Stefano",
                "Dini",
                "Diop",
                "Dobre",
                "Dolfi",
                "Donati",
                "Dondoli",
                "Dong",
                "Donnini",
                "Ducci",
                "Dumitru",
                "Ermini",
                "Esposito",
                "Evangelisti",
                "Fabbri",
                "Fabbrini",
                "Fabbrizzi",
                "Fabbroni",
                "Fabbrucci",
                "Fabiani",
                "Facchini",
                "Faggi",
                "Fagioli",
                "Failli",
                "Faini",
                "Falciani",
                "Falcini",
                "Falcone",
                "Fallani",
                "Falorni",
                "Falsini",
                "Falugiani",
                "Fancelli",
                "Fanelli",
                "Fanetti",
                "Fanfani",
                "Fani",
                "Fantappie'",
                "Fantechi",
                "Fanti",
                "Fantini",
                "Fantoni",
                "Farina",
                "Fattori",
                "Favilli",
                "Fedi",
                "Fei",
                "Ferrante",
                "Ferrara",
                "Ferrari",
                "Ferraro",
                "Ferretti",
                "Ferri",
                "Ferrini",
                "Ferroni",
                "Fiaschi",
                "Fibbi",
                "Fiesoli",
                "Filippi",
                "Filippini",
                "Fini",
                "Fioravanti",
                "Fiore",
                "Fiorentini",
                "Fiorini",
                "Fissi",
                "Focardi",
                "Foggi",
                "Fontana",
                "Fontanelli",
                "Fontani",
                "Forconi",
                "Formigli",
                "Forte",
                "Forti",
                "Fortini",
                "Fossati",
                "Fossi",
                "Francalanci",
                "Franceschi",
                "Franceschini",
                "Franchi",
                "Franchini",
                "Franci",
                "Francini",
                "Francioni",
                "Franco",
                "Frassineti",
                "Frati",
                "Fratini",
                "Frilli",
                "Frizzi",
                "Frosali",
                "Frosini",
                "Frullini",
                "Fusco",
                "Fusi",
                "Gabbrielli",
                "Gabellini",
                "Gagliardi",
                "Galanti",
                "Galardi",
                "Galeotti",
                "Galletti",
                "Galli",
                "Gallo",
                "Gallori",
                "Gambacciani",
                "Gargani",
                "Garofalo",
                "Garuglieri",
                "Gashi",
                "Gasperini",
                "Gatti",
                "Gelli",
                "Gensini",
                "Gentile",
                "Gentili",
                "Geri",
                "Gerini",
                "Gheri",
                "Ghini",
                "Giachetti",
                "Giachi",
                "Giacomelli",
                "Gianassi",
                "Giani",
                "Giannelli",
                "Giannetti",
                "Gianni",
                "Giannini",
                "Giannoni",
                "Giannotti",
                "Giannozzi",
                "Gigli",
                "Giordano",
                "Giorgetti",
                "Giorgi",
                "Giovacchini",
                "Giovannelli",
                "Giovannetti",
                "Giovannini",
                "Giovannoni",
                "Giuliani",
                "Giunti",
                "Giuntini",
                "Giusti",
                "Gonnelli",
                "Goretti",
                "Gori",
                "Gradi",
                "Gramigni",
                "Grassi",
                "Grasso",
                "Graziani",
                "Grazzini",
                "Greco",
                "Grifoni",
                "Grillo",
                "Grimaldi",
                "Grossi",
                "Gualtieri",
                "Guarducci",
                "Guarino",
                "Guarnieri",
                "Guasti",
                "Guerra",
                "Guerri",
                "Guerrini",
                "Guidi",
                "Guidotti",
                "He",
                "Hoxha",
                "Hu",
                "Huang",
                "Iandelli",
                "Ignesti",
                "Innocenti",
                "Jin",
                "La Rosa",
                "Lai",
                "Landi",
                "Landini",
                "Lanini",
                "Lapi",
                "Lapini",
                "Lari",
                "Lascialfari",
                "Lastrucci",
                "Latini",
                "Lazzeri",
                "Lazzerini",
                "Lelli",
                "Lenzi",
                "Leonardi",
                "Leoncini",
                "Leone",
                "Leoni",
                "Lepri",
                "Li",
                "Liao",
                "Lin",
                "Linari",
                "Lippi",
                "Lisi",
                "Livi",
                "Lombardi",
                "Lombardini",
                "Lombardo",
                "Longo",
                "Lopez",
                "Lorenzi",
                "Lorenzini",
                "Lorini",
                "Lotti",
                "Lu",
                "Lucchesi",
                "Lucherini",
                "Lunghi",
                "Lupi",
                "Madiai",
                "Maestrini",
                "Maffei",
                "Maggi",
                "Maggini",
                "Magherini",
                "Magini",
                "Magnani",
                "Magnelli",
                "Magni",
                "Magnolfi",
                "Magrini",
                "Malavolti",
                "Malevolti",
                "Manca",
                "Mancini",
                "Manetti",
                "Manfredi",
                "Mangani",
                "Mannelli",
                "Manni",
                "Mannini",
                "Mannucci",
                "Manuelli",
                "Manzini",
                "Marcelli",
                "Marchese",
                "Marchetti",
                "Marchi",
                "Marchiani",
                "Marchionni",
                "Marconi",
                "Marcucci",
                "Margheri",
                "Mari",
                "Mariani",
                "Marilli",
                "Marinai",
                "Marinari",
                "Marinelli",
                "Marini",
                "Marino",
                "Mariotti",
                "Marsili",
                "Martelli",
                "Martinelli",
                "Martini",
                "Martino",
                "Marzi",
                "Masi",
                "Masini",
                "Masoni",
                "Massai",
                "Materassi",
                "Mattei",
                "Matteini",
                "Matteucci",
                "Matteuzzi",
                "Mattioli",
                "Mattolini",
                "Matucci",
                "Mauro",
                "Mazzanti",
                "Mazzei",
                "Mazzetti",
                "Mazzi",
                "Mazzini",
                "Mazzocchi",
                "Mazzoli",
                "Mazzoni",
                "Mazzuoli",
                "Meacci",
                "Mecocci",
                "Meini",
                "Melani",
                "Mele",
                "Meli",
                "Mengoni",
                "Menichetti",
                "Meoni",
                "Merlini",
                "Messeri",
                "Messina",
                "Meucci",
                "Miccinesi",
                "Miceli",
                "Micheli",
                "Michelini",
                "Michelozzi",
                "Migliori",
                "Migliorini",
                "Milani",
                "Miniati",
                "Misuri",
                "Monaco",
                "Montagnani",
                "Montagni",
                "Montanari",
                "Montelatici",
                "Monti",
                "Montigiani",
                "Montini",
                "Morandi",
                "Morandini",
                "Morelli",
                "Moretti",
                "Morganti",
                "Mori",
                "Morini",
                "Moroni",
                "Morozzi",
                "Mugnai",
                "Mugnaini",
                "Mustafa",
                "Naldi",
                "Naldini",
                "Nannelli",
                "Nanni",
                "Nannini",
                "Nannucci",
                "Nardi",
                "Nardini",
                "Nardoni",
                "Natali",
                "Ndiaye",
                "Nencetti",
                "Nencini",
                "Nencioni",
                "Neri",
                "Nesi",
                "Nesti",
                "Niccolai",
                "Niccoli",
                "Niccolini",
                "Nigi",
                "Nistri",
                "Nocentini",
                "Noferini",
                "Novelli",
                "Nucci",
                "Nuti",
                "Nutini",
                "Oliva",
                "Olivieri",
                "Olmi",
                "Orlandi",
                "Orlandini",
                "Orlando",
                "Orsini",
                "Ortolani",
                "Ottanelli",
                "Pacciani",
                "Pace",
                "Paci",
                "Pacini",
                "Pagani",
                "Pagano",
                "Paggetti",
                "Pagliai",
                "Pagni",
                "Pagnini",
                "Paladini",
                "Palagi",
                "Palchetti",
                "Palloni",
                "Palmieri",
                "Palumbo",
                "Pampaloni",
                "Pancani",
                "Pandolfi",
                "Pandolfini",
                "Panerai",
                "Panichi",
                "Paoletti",
                "Paoli",
                "Paolini",
                "Papi",
                "Papini",
                "Papucci",
                "Parenti",
                "Parigi",
                "Parisi",
                "Parri",
                "Parrini",
                "Pasquini",
                "Passeri",
                "Pecchioli",
                "Pecorini",
                "Pellegrini",
                "Pepi",
                "Perini",
                "Perrone",
                "Peruzzi",
                "Pesci",
                "Pestelli",
                "Petri",
                "Petrini",
                "Petrucci",
                "Pettini",
                "Pezzati",
                "Pezzatini",
                "Piani",
                "Piazza",
                "Piazzesi",
                "Piazzini",
                "Piccardi",
                "Picchi",
                "Piccini",
                "Piccioli",
                "Pieraccini",
                "Pieraccioni",
                "Pieralli",
                "Pierattini",
                "Pieri",
                "Pierini",
                "Pieroni",
                "Pietrini",
                "Pini",
                "Pinna",
                "Pinto",
                "Pinzani",
                "Pinzauti",
                "Piras",
                "Pisani",
                "Pistolesi",
                "Poggesi",
                "Poggi",
                "Poggiali",
                "Poggiolini",
                "Poli",
                "Pollastri",
                "Porciani",
                "Pozzi",
                "Pratellesi",
                "Pratesi",
                "Prosperi",
                "Pruneti",
                "Pucci",
                "Puccini",
                "Puccioni",
                "Pugi",
                "Pugliese",
                "Puliti",
                "Querci",
                "Quercioli",
                "Raddi",
                "Radu",
                "Raffaelli",
                "Ragazzini",
                "Ranfagni",
                "Ranieri",
                "Rastrelli",
                "Raugei",
                "Raveggi",
                "Renai",
                "Renzi",
                "Rettori",
                "Ricci",
                "Ricciardi",
                "Ridi",
                "Ridolfi",
                "Rigacci",
                "Righi",
                "Righini",
                "Rinaldi",
                "Risaliti",
                "Ristori",
                "Rizzo",
                "Rocchi",
                "Rocchini",
                "Rogai",
                "Romagnoli",
                "Romanelli",
                "Romani",
                "Romano",
                "Romei",
                "Romeo",
                "Romiti",
                "Romoli",
                "Romolini",
                "Rontini",
                "Rosati",
                "Roselli",
                "Rosi",
                "Rossetti",
                "Rossi",
                "Rossini",
                "Rovai",
                "Ruggeri",
                "Ruggiero",
                "Russo",
                "Sabatini",
                "Saccardi",
                "Sacchetti",
                "Sacchi",
                "Sacco",
                "Salerno",
                "Salimbeni",
                "Salucci",
                "Salvadori",
                "Salvestrini",
                "Salvi",
                "Salvini",
                "Sanesi",
                "Sani",
                "Sanna",
                "Santi",
                "Santini",
                "Santoni",
                "Santoro",
                "Santucci",
                "Sardi",
                "Sarri",
                "Sarti",
                "Sassi",
                "Sbolci",
                "Scali",
                "Scarpelli",
                "Scarselli",
                "Scopetani",
                "Secci",
                "Selvi",
                "Senatori",
                "Senesi",
                "Serafini",
                "Sereni",
                "Serra",
                "Sestini",
                "Sguanci",
                "Sieni",
                "Signorini",
                "Silvestri",
                "Simoncini",
                "Simonetti",
                "Simoni",
                "Singh",
                "Sodi",
                "Soldi",
                "Somigli",
                "Sorbi",
                "Sorelli",
                "Sorrentino",
                "Sottili",
                "Spina",
                "Spinelli",
                "Staccioli",
                "Staderini",
                "Stefanelli",
                "Stefani",
                "Stefanini",
                "Stella",
                "Susini",
                "Tacchi",
                "Tacconi",
                "Taddei",
                "Tagliaferri",
                "Tamburini",
                "Tanganelli",
                "Tani",
                "Tanini",
                "Tapinassi",
                "Tarchi",
                "Tarchiani",
                "Targioni",
                "Tassi",
                "Tassini",
                "Tempesti",
                "Terzani",
                "Tesi",
                "Testa",
                "Testi",
                "Tilli",
                "Tinti",
                "Tirinnanzi",
                "Toccafondi",
                "Tofanari",
                "Tofani",
                "Tognaccini",
                "Tonelli",
                "Tonini",
                "Torelli",
                "Torrini",
                "Tosi",
                "Toti",
                "Tozzi",
                "Trambusti",
                "Trapani",
                "Tucci",
                "Turchi",
                "Ugolini",
                "Ulivi",
                "Valente",
                "Valenti",
                "Valentini",
                "Vangelisti",
                "Vanni",
                "Vannini",
                "Vannoni",
                "Vannozzi",
                "Vannucchi",
                "Vannucci",
                "Ventura",
                "Venturi",
                "Venturini",
                "Vestri",
                "Vettori",
                "Vichi",
                "Viciani",
                "Vieri",
                "Vigiani",
                "Vignoli",
                "Vignolini",
                "Vignozzi",
                "Villani",
                "Vinci",
                "Visani",
                "Vitale",
                "Vitali",
                "Viti",
                "Viviani",
                "Vivoli",
                "Volpe",
                "Volpi",
                "Wang",
                "Wu",
                "Xu",
                "Yang",
                "Ye",
                "Zagli",
                "Zani",
                "Zanieri",
                "Zanobini",
                "Zecchi",
                "Zetti",
                "Zhang",
                "Zheng",
                "Zhou",
                "Zhu",
                "Zingoni",
                "Zini",
                "Zoppi"
            ],
            nl: [
                "Albers",
                "Alblas",
                "Appelman",
                "Baars",
                "Baas",
                "Bakker",
                "Blank",
                "Bleeker",
                "Blok",
                "Blom",
                "Boer",
                "Boers",
                "Boldewijn",
                "Boon",
                "Boot",
                "Bos",
                "Bosch",
                "Bosma",
                "Bosman",
                "Bouma",
                "Bouman",
                "Bouwman",
                "Brands",
                "Brouwer",
                "Burger",
                "Buijs",
                "Buitenhuis",
                "Ceder",
                "Cohen",
                "Dekker",
                "Dekkers",
                "Dijkman",
                "Dijkstra",
                "Driessen",
                "Drost",
                "Engel",
                "Evers",
                "Faber",
                "Franke",
                "Gerritsen",
                "Goedhart",
                "Goossens",
                "Groen",
                "Groenenberg",
                "Groot",
                "Haan",
                "Hart",
                "Heemskerk",
                "Hendriks",
                "Hermans",
                "Hoekstra",
                "Hofman",
                "Hopman",
                "Huisman",
                "Jacobs",
                "Jansen",
                "Janssen",
                "Jonker",
                "Jaspers",
                "Keijzer",
                "Klaassen",
                "Klein",
                "Koek",
                "Koenders",
                "Kok",
                "Kool",
                "Koopman",
                "Koopmans",
                "Koning",
                "Koster",
                "Kramer",
                "Kroon",
                "Kuijpers",
                "Kuiper",
                "Kuipers",
                "Kurt",
                "Koster",
                "Kwakman",
                "Los",
                "Lubbers",
                "Maas",
                "Markus",
                "Martens",
                "Meijer",
                "Mol",
                "Molenaar",
                "Mulder",
                "Nieuwenhuis",
                "Peeters",
                "Peters",
                "Pengel",
                "Pieters",
                "Pool",
                "Post",
                "Postma",
                "Prins",
                "Pronk",
                "Reijnders",
                "Rietveld",
                "Roest",
                "Roos",
                "Sanders",
                "Schaap",
                "Scheffer",
                "Schenk",
                "Schilder",
                "Schipper",
                "Schmidt",
                "Scholten",
                "Schouten",
                "Schut",
                "Schutte",
                "Schuurman",
                "Simons",
                "Smeets",
                "Smit",
                "Smits",
                "Snel",
                "Swinkels",
                "Tas",
                "Terpstra",
                "Timmermans",
                "Tol",
                "Tromp",
                "Troost",
                "Valk",
                "Veenstra",
                "Veldkamp",
                "Verbeek",
                "Verheul",
                "Verhoeven",
                "Vermeer",
                "Vermeulen",
                "Verweij",
                "Vink",
                "Visser",
                "Voorn",
                "Vos",
                "Wagenaar",
                "Wiersema",
                "Willems",
                "Willemsen",
                "Witteveen",
                "Wolff",
                "Wolters",
                "Zijlstra",
                "Zwart",
                "de Beer",
                "de Boer",
                "de Bruijn",
                "de Bruin",
                "de Graaf",
                "de Groot",
                "de Haan",
                "de Haas",
                "de Jager",
                "de Jong",
                "de Jonge",
                "de Koning",
                "de Lange",
                "de Leeuw",
                "de Ridder",
                "de Rooij",
                "de Ruiter",
                "de Vos",
                "de Vries",
                "de Waal",
                "de Wit",
                "de Zwart",
                "van Beek",
                "van Boven",
                "van Dam",
                "van Dijk",
                "van Dongen",
                "van Doorn",
                "van Egmond",
                "van Eijk",
                "van Es",
                "van Gelder",
                "van Gelderen",
                "van Houten",
                "van Hulst",
                "van Kempen",
                "van Kesteren",
                "van Leeuwen",
                "van Loon",
                "van Mill",
                "van Noord",
                "van Ommen",
                "van Ommeren",
                "van Oosten",
                "van Oostveen",
                "van Rijn",
                "van Schaik",
                "van Veen",
                "van Vliet",
                "van Wijk",
                "van Wijngaarden",
                "van den Poel",
                "van de Pol",
                "van den Ploeg",
                "van de Ven",
                "van den Berg",
                "van den Bosch",
                "van den Brink",
                "van den Broek",
                "van den Heuvel",
                "van der Heijden",
                "van der Horst",
                "van der Hulst",
                "van der Kroon",
                "van der Laan",
                "van der Linden",
                "van der Meer",
                "van der Meij",
                "van der Meulen",
                "van der Molen",
                "van der Sluis",
                "van der Spek",
                "van der Veen",
                "van der Velde",
                "van der Velden",
                "van der Vliet",
                "van der Wal"
            ]
        },
        countries: [
            {
                name: "Afghanistan",
                abbreviation: "AF"
            },
            {
                name: "Åland Islands",
                abbreviation: "AX"
            },
            {
                name: "Albania",
                abbreviation: "AL"
            },
            {
                name: "Algeria",
                abbreviation: "DZ"
            },
            {
                name: "American Samoa",
                abbreviation: "AS"
            },
            {
                name: "Andorra",
                abbreviation: "AD"
            },
            {
                name: "Angola",
                abbreviation: "AO"
            },
            {
                name: "Anguilla",
                abbreviation: "AI"
            },
            {
                name: "Antarctica",
                abbreviation: "AQ"
            },
            {
                name: "Antigua & Barbuda",
                abbreviation: "AG"
            },
            {
                name: "Argentina",
                abbreviation: "AR"
            },
            {
                name: "Armenia",
                abbreviation: "AM"
            },
            {
                name: "Aruba",
                abbreviation: "AW"
            },
            {
                name: "Ascension Island",
                abbreviation: "AC"
            },
            {
                name: "Australia",
                abbreviation: "AU"
            },
            {
                name: "Austria",
                abbreviation: "AT"
            },
            {
                name: "Azerbaijan",
                abbreviation: "AZ"
            },
            {
                name: "Bahamas",
                abbreviation: "BS"
            },
            {
                name: "Bahrain",
                abbreviation: "BH"
            },
            {
                name: "Bangladesh",
                abbreviation: "BD"
            },
            {
                name: "Barbados",
                abbreviation: "BB"
            },
            {
                name: "Belarus",
                abbreviation: "BY"
            },
            {
                name: "Belgium",
                abbreviation: "BE"
            },
            {
                name: "Belize",
                abbreviation: "BZ"
            },
            {
                name: "Benin",
                abbreviation: "BJ"
            },
            {
                name: "Bermuda",
                abbreviation: "BM"
            },
            {
                name: "Bhutan",
                abbreviation: "BT"
            },
            {
                name: "Bolivia",
                abbreviation: "BO"
            },
            {
                name: "Bosnia & Herzegovina",
                abbreviation: "BA"
            },
            {
                name: "Botswana",
                abbreviation: "BW"
            },
            {
                name: "Brazil",
                abbreviation: "BR"
            },
            {
                name: "British Indian Ocean Territory",
                abbreviation: "IO"
            },
            {
                name: "British Virgin Islands",
                abbreviation: "VG"
            },
            {
                name: "Brunei",
                abbreviation: "BN"
            },
            {
                name: "Bulgaria",
                abbreviation: "BG"
            },
            {
                name: "Burkina Faso",
                abbreviation: "BF"
            },
            {
                name: "Burundi",
                abbreviation: "BI"
            },
            {
                name: "Cambodia",
                abbreviation: "KH"
            },
            {
                name: "Cameroon",
                abbreviation: "CM"
            },
            {
                name: "Canada",
                abbreviation: "CA"
            },
            {
                name: "Canary Islands",
                abbreviation: "IC"
            },
            {
                name: "Cape Verde",
                abbreviation: "CV"
            },
            {
                name: "Caribbean Netherlands",
                abbreviation: "BQ"
            },
            {
                name: "Cayman Islands",
                abbreviation: "KY"
            },
            {
                name: "Central African Republic",
                abbreviation: "CF"
            },
            {
                name: "Ceuta & Melilla",
                abbreviation: "EA"
            },
            {
                name: "Chad",
                abbreviation: "TD"
            },
            {
                name: "Chile",
                abbreviation: "CL"
            },
            {
                name: "China",
                abbreviation: "CN"
            },
            {
                name: "Christmas Island",
                abbreviation: "CX"
            },
            {
                name: "Cocos (Keeling) Islands",
                abbreviation: "CC"
            },
            {
                name: "Colombia",
                abbreviation: "CO"
            },
            {
                name: "Comoros",
                abbreviation: "KM"
            },
            {
                name: "Congo - Brazzaville",
                abbreviation: "CG"
            },
            {
                name: "Congo - Kinshasa",
                abbreviation: "CD"
            },
            {
                name: "Cook Islands",
                abbreviation: "CK"
            },
            {
                name: "Costa Rica",
                abbreviation: "CR"
            },
            {
                name: "Côte d'Ivoire",
                abbreviation: "CI"
            },
            {
                name: "Croatia",
                abbreviation: "HR"
            },
            {
                name: "Cuba",
                abbreviation: "CU"
            },
            {
                name: "Curaçao",
                abbreviation: "CW"
            },
            {
                name: "Cyprus",
                abbreviation: "CY"
            },
            {
                name: "Czech Republic",
                abbreviation: "CZ"
            },
            {
                name: "Denmark",
                abbreviation: "DK"
            },
            {
                name: "Diego Garcia",
                abbreviation: "DG"
            },
            {
                name: "Djibouti",
                abbreviation: "DJ"
            },
            {
                name: "Dominica",
                abbreviation: "DM"
            },
            {
                name: "Dominican Republic",
                abbreviation: "DO"
            },
            {
                name: "Ecuador",
                abbreviation: "EC"
            },
            {
                name: "Egypt",
                abbreviation: "EG"
            },
            {
                name: "El Salvador",
                abbreviation: "SV"
            },
            {
                name: "Equatorial Guinea",
                abbreviation: "GQ"
            },
            {
                name: "Eritrea",
                abbreviation: "ER"
            },
            {
                name: "Estonia",
                abbreviation: "EE"
            },
            {
                name: "Ethiopia",
                abbreviation: "ET"
            },
            {
                name: "Falkland Islands",
                abbreviation: "FK"
            },
            {
                name: "Faroe Islands",
                abbreviation: "FO"
            },
            {
                name: "Fiji",
                abbreviation: "FJ"
            },
            {
                name: "Finland",
                abbreviation: "FI"
            },
            {
                name: "France",
                abbreviation: "FR"
            },
            {
                name: "French Guiana",
                abbreviation: "GF"
            },
            {
                name: "French Polynesia",
                abbreviation: "PF"
            },
            {
                name: "French Southern Territories",
                abbreviation: "TF"
            },
            {
                name: "Gabon",
                abbreviation: "GA"
            },
            {
                name: "Gambia",
                abbreviation: "GM"
            },
            {
                name: "Georgia",
                abbreviation: "GE"
            },
            {
                name: "Germany",
                abbreviation: "DE"
            },
            {
                name: "Ghana",
                abbreviation: "GH"
            },
            {
                name: "Gibraltar",
                abbreviation: "GI"
            },
            {
                name: "Greece",
                abbreviation: "GR"
            },
            {
                name: "Greenland",
                abbreviation: "GL"
            },
            {
                name: "Grenada",
                abbreviation: "GD"
            },
            {
                name: "Guadeloupe",
                abbreviation: "GP"
            },
            {
                name: "Guam",
                abbreviation: "GU"
            },
            {
                name: "Guatemala",
                abbreviation: "GT"
            },
            {
                name: "Guernsey",
                abbreviation: "GG"
            },
            {
                name: "Guinea",
                abbreviation: "GN"
            },
            {
                name: "Guinea-Bissau",
                abbreviation: "GW"
            },
            {
                name: "Guyana",
                abbreviation: "GY"
            },
            {
                name: "Haiti",
                abbreviation: "HT"
            },
            {
                name: "Honduras",
                abbreviation: "HN"
            },
            {
                name: "Hong Kong SAR China",
                abbreviation: "HK"
            },
            {
                name: "Hungary",
                abbreviation: "HU"
            },
            {
                name: "Iceland",
                abbreviation: "IS"
            },
            {
                name: "India",
                abbreviation: "IN"
            },
            {
                name: "Indonesia",
                abbreviation: "ID"
            },
            {
                name: "Iran",
                abbreviation: "IR"
            },
            {
                name: "Iraq",
                abbreviation: "IQ"
            },
            {
                name: "Ireland",
                abbreviation: "IE"
            },
            {
                name: "Isle of Man",
                abbreviation: "IM"
            },
            {
                name: "Israel",
                abbreviation: "IL"
            },
            {
                name: "Italy",
                abbreviation: "IT"
            },
            {
                name: "Jamaica",
                abbreviation: "JM"
            },
            {
                name: "Japan",
                abbreviation: "JP"
            },
            {
                name: "Jersey",
                abbreviation: "JE"
            },
            {
                name: "Jordan",
                abbreviation: "JO"
            },
            {
                name: "Kazakhstan",
                abbreviation: "KZ"
            },
            {
                name: "Kenya",
                abbreviation: "KE"
            },
            {
                name: "Kiribati",
                abbreviation: "KI"
            },
            {
                name: "Kosovo",
                abbreviation: "XK"
            },
            {
                name: "Kuwait",
                abbreviation: "KW"
            },
            {
                name: "Kyrgyzstan",
                abbreviation: "KG"
            },
            {
                name: "Laos",
                abbreviation: "LA"
            },
            {
                name: "Latvia",
                abbreviation: "LV"
            },
            {
                name: "Lebanon",
                abbreviation: "LB"
            },
            {
                name: "Lesotho",
                abbreviation: "LS"
            },
            {
                name: "Liberia",
                abbreviation: "LR"
            },
            {
                name: "Libya",
                abbreviation: "LY"
            },
            {
                name: "Liechtenstein",
                abbreviation: "LI"
            },
            {
                name: "Lithuania",
                abbreviation: "LT"
            },
            {
                name: "Luxembourg",
                abbreviation: "LU"
            },
            {
                name: "Macau SAR China",
                abbreviation: "MO"
            },
            {
                name: "Macedonia",
                abbreviation: "MK"
            },
            {
                name: "Madagascar",
                abbreviation: "MG"
            },
            {
                name: "Malawi",
                abbreviation: "MW"
            },
            {
                name: "Malaysia",
                abbreviation: "MY"
            },
            {
                name: "Maldives",
                abbreviation: "MV"
            },
            {
                name: "Mali",
                abbreviation: "ML"
            },
            {
                name: "Malta",
                abbreviation: "MT"
            },
            {
                name: "Marshall Islands",
                abbreviation: "MH"
            },
            {
                name: "Martinique",
                abbreviation: "MQ"
            },
            {
                name: "Mauritania",
                abbreviation: "MR"
            },
            {
                name: "Mauritius",
                abbreviation: "MU"
            },
            {
                name: "Mayotte",
                abbreviation: "YT"
            },
            {
                name: "Mexico",
                abbreviation: "MX"
            },
            {
                name: "Micronesia",
                abbreviation: "FM"
            },
            {
                name: "Moldova",
                abbreviation: "MD"
            },
            {
                name: "Monaco",
                abbreviation: "MC"
            },
            {
                name: "Mongolia",
                abbreviation: "MN"
            },
            {
                name: "Montenegro",
                abbreviation: "ME"
            },
            {
                name: "Montserrat",
                abbreviation: "MS"
            },
            {
                name: "Morocco",
                abbreviation: "MA"
            },
            {
                name: "Mozambique",
                abbreviation: "MZ"
            },
            {
                name: "Myanmar (Burma)",
                abbreviation: "MM"
            },
            {
                name: "Namibia",
                abbreviation: "NA"
            },
            {
                name: "Nauru",
                abbreviation: "NR"
            },
            {
                name: "Nepal",
                abbreviation: "NP"
            },
            {
                name: "Netherlands",
                abbreviation: "NL"
            },
            {
                name: "New Caledonia",
                abbreviation: "NC"
            },
            {
                name: "New Zealand",
                abbreviation: "NZ"
            },
            {
                name: "Nicaragua",
                abbreviation: "NI"
            },
            {
                name: "Niger",
                abbreviation: "NE"
            },
            {
                name: "Nigeria",
                abbreviation: "NG"
            },
            {
                name: "Niue",
                abbreviation: "NU"
            },
            {
                name: "Norfolk Island",
                abbreviation: "NF"
            },
            {
                name: "North Korea",
                abbreviation: "KP"
            },
            {
                name: "Northern Mariana Islands",
                abbreviation: "MP"
            },
            {
                name: "Norway",
                abbreviation: "NO"
            },
            {
                name: "Oman",
                abbreviation: "OM"
            },
            {
                name: "Pakistan",
                abbreviation: "PK"
            },
            {
                name: "Palau",
                abbreviation: "PW"
            },
            {
                name: "Palestinian Territories",
                abbreviation: "PS"
            },
            {
                name: "Panama",
                abbreviation: "PA"
            },
            {
                name: "Papua New Guinea",
                abbreviation: "PG"
            },
            {
                name: "Paraguay",
                abbreviation: "PY"
            },
            {
                name: "Peru",
                abbreviation: "PE"
            },
            {
                name: "Philippines",
                abbreviation: "PH"
            },
            {
                name: "Pitcairn Islands",
                abbreviation: "PN"
            },
            {
                name: "Poland",
                abbreviation: "PL"
            },
            {
                name: "Portugal",
                abbreviation: "PT"
            },
            {
                name: "Puerto Rico",
                abbreviation: "PR"
            },
            {
                name: "Qatar",
                abbreviation: "QA"
            },
            {
                name: "Réunion",
                abbreviation: "RE"
            },
            {
                name: "Romania",
                abbreviation: "RO"
            },
            {
                name: "Russia",
                abbreviation: "RU"
            },
            {
                name: "Rwanda",
                abbreviation: "RW"
            },
            {
                name: "Samoa",
                abbreviation: "WS"
            },
            {
                name: "San Marino",
                abbreviation: "SM"
            },
            {
                name: "São Tomé and Príncipe",
                abbreviation: "ST"
            },
            {
                name: "Saudi Arabia",
                abbreviation: "SA"
            },
            {
                name: "Senegal",
                abbreviation: "SN"
            },
            {
                name: "Serbia",
                abbreviation: "RS"
            },
            {
                name: "Seychelles",
                abbreviation: "SC"
            },
            {
                name: "Sierra Leone",
                abbreviation: "SL"
            },
            {
                name: "Singapore",
                abbreviation: "SG"
            },
            {
                name: "Sint Maarten",
                abbreviation: "SX"
            },
            {
                name: "Slovakia",
                abbreviation: "SK"
            },
            {
                name: "Slovenia",
                abbreviation: "SI"
            },
            {
                name: "Solomon Islands",
                abbreviation: "SB"
            },
            {
                name: "Somalia",
                abbreviation: "SO"
            },
            {
                name: "South Africa",
                abbreviation: "ZA"
            },
            {
                name: "South Georgia & South Sandwich Islands",
                abbreviation: "GS"
            },
            {
                name: "South Korea",
                abbreviation: "KR"
            },
            {
                name: "South Sudan",
                abbreviation: "SS"
            },
            {
                name: "Spain",
                abbreviation: "ES"
            },
            {
                name: "Sri Lanka",
                abbreviation: "LK"
            },
            {
                name: "St. Barthélemy",
                abbreviation: "BL"
            },
            {
                name: "St. Helena",
                abbreviation: "SH"
            },
            {
                name: "St. Kitts & Nevis",
                abbreviation: "KN"
            },
            {
                name: "St. Lucia",
                abbreviation: "LC"
            },
            {
                name: "St. Martin",
                abbreviation: "MF"
            },
            {
                name: "St. Pierre & Miquelon",
                abbreviation: "PM"
            },
            {
                name: "St. Vincent & Grenadines",
                abbreviation: "VC"
            },
            {
                name: "Sudan",
                abbreviation: "SD"
            },
            {
                name: "Suriname",
                abbreviation: "SR"
            },
            {
                name: "Svalbard & Jan Mayen",
                abbreviation: "SJ"
            },
            {
                name: "Swaziland",
                abbreviation: "SZ"
            },
            {
                name: "Sweden",
                abbreviation: "SE"
            },
            {
                name: "Switzerland",
                abbreviation: "CH"
            },
            {
                name: "Syria",
                abbreviation: "SY"
            },
            {
                name: "Taiwan",
                abbreviation: "TW"
            },
            {
                name: "Tajikistan",
                abbreviation: "TJ"
            },
            {
                name: "Tanzania",
                abbreviation: "TZ"
            },
            {
                name: "Thailand",
                abbreviation: "TH"
            },
            {
                name: "Timor-Leste",
                abbreviation: "TL"
            },
            {
                name: "Togo",
                abbreviation: "TG"
            },
            {
                name: "Tokelau",
                abbreviation: "TK"
            },
            {
                name: "Tonga",
                abbreviation: "TO"
            },
            {
                name: "Trinidad & Tobago",
                abbreviation: "TT"
            },
            {
                name: "Tristan da Cunha",
                abbreviation: "TA"
            },
            {
                name: "Tunisia",
                abbreviation: "TN"
            },
            {
                name: "Turkey",
                abbreviation: "TR"
            },
            {
                name: "Turkmenistan",
                abbreviation: "TM"
            },
            {
                name: "Turks & Caicos Islands",
                abbreviation: "TC"
            },
            {
                name: "Tuvalu",
                abbreviation: "TV"
            },
            {
                name: "U.S. Outlying Islands",
                abbreviation: "UM"
            },
            {
                name: "U.S. Virgin Islands",
                abbreviation: "VI"
            },
            {
                name: "Uganda",
                abbreviation: "UG"
            },
            {
                name: "Ukraine",
                abbreviation: "UA"
            },
            {
                name: "United Arab Emirates",
                abbreviation: "AE"
            },
            {
                name: "United Kingdom",
                abbreviation: "GB"
            },
            {
                name: "United States",
                abbreviation: "US"
            },
            {
                name: "Uruguay",
                abbreviation: "UY"
            },
            {
                name: "Uzbekistan",
                abbreviation: "UZ"
            },
            {
                name: "Vanuatu",
                abbreviation: "VU"
            },
            {
                name: "Vatican City",
                abbreviation: "VA"
            },
            {
                name: "Venezuela",
                abbreviation: "VE"
            },
            {
                name: "Vietnam",
                abbreviation: "VN"
            },
            {
                name: "Wallis & Futuna",
                abbreviation: "WF"
            },
            {
                name: "Western Sahara",
                abbreviation: "EH"
            },
            {
                name: "Yemen",
                abbreviation: "YE"
            },
            {
                name: "Zambia",
                abbreviation: "ZM"
            },
            {
                name: "Zimbabwe",
                abbreviation: "ZW"
            }
        ],
        counties: {
            uk: [
                {
                    name: "Bath and North East Somerset"
                },
                {
                    name: "Aberdeenshire"
                },
                {
                    name: "Anglesey"
                },
                {
                    name: "Angus"
                },
                {
                    name: "Bedford"
                },
                {
                    name: "Blackburn with Darwen"
                },
                {
                    name: "Blackpool"
                },
                {
                    name: "Bournemouth"
                },
                {
                    name: "Bracknell Forest"
                },
                {
                    name: "Brighton & Hove"
                },
                {
                    name: "Bristol"
                },
                {
                    name: "Buckinghamshire"
                },
                {
                    name: "Cambridgeshire"
                },
                {
                    name: "Carmarthenshire"
                },
                {
                    name: "Central Bedfordshire"
                },
                {
                    name: "Ceredigion"
                },
                {
                    name: "Cheshire East"
                },
                {
                    name: "Cheshire West and Chester"
                },
                {
                    name: "Clackmannanshire"
                },
                {
                    name: "Conwy"
                },
                {
                    name: "Cornwall"
                },
                {
                    name: "County Antrim"
                },
                {
                    name: "County Armagh"
                },
                {
                    name: "County Down"
                },
                {
                    name: "County Durham"
                },
                {
                    name: "County Fermanagh"
                },
                {
                    name: "County Londonderry"
                },
                {
                    name: "County Tyrone"
                },
                {
                    name: "Cumbria"
                },
                {
                    name: "Darlington"
                },
                {
                    name: "Denbighshire"
                },
                {
                    name: "Derby"
                },
                {
                    name: "Derbyshire"
                },
                {
                    name: "Devon"
                },
                {
                    name: "Dorset"
                },
                {
                    name: "Dumfries and Galloway"
                },
                {
                    name: "Dundee"
                },
                {
                    name: "East Lothian"
                },
                {
                    name: "East Riding of Yorkshire"
                },
                {
                    name: "East Sussex"
                },
                {
                    name: "Edinburgh?"
                },
                {
                    name: "Essex"
                },
                {
                    name: "Falkirk"
                },
                {
                    name: "Fife"
                },
                {
                    name: "Flintshire"
                },
                {
                    name: "Gloucestershire"
                },
                {
                    name: "Greater London"
                },
                {
                    name: "Greater Manchester"
                },
                {
                    name: "Gwent"
                },
                {
                    name: "Gwynedd"
                },
                {
                    name: "Halton"
                },
                {
                    name: "Hampshire"
                },
                {
                    name: "Hartlepool"
                },
                {
                    name: "Herefordshire"
                },
                {
                    name: "Hertfordshire"
                },
                {
                    name: "Highlands"
                },
                {
                    name: "Hull"
                },
                {
                    name: "Isle of Wight"
                },
                {
                    name: "Isles of Scilly"
                },
                {
                    name: "Kent"
                },
                {
                    name: "Lancashire"
                },
                {
                    name: "Leicester"
                },
                {
                    name: "Leicestershire"
                },
                {
                    name: "Lincolnshire"
                },
                {
                    name: "Lothian"
                },
                {
                    name: "Luton"
                },
                {
                    name: "Medway"
                },
                {
                    name: "Merseyside"
                },
                {
                    name: "Mid Glamorgan"
                },
                {
                    name: "Middlesbrough"
                },
                {
                    name: "Milton Keynes"
                },
                {
                    name: "Monmouthshire"
                },
                {
                    name: "Moray"
                },
                {
                    name: "Norfolk"
                },
                {
                    name: "North East Lincolnshire"
                },
                {
                    name: "North Lincolnshire"
                },
                {
                    name: "North Somerset"
                },
                {
                    name: "North Yorkshire"
                },
                {
                    name: "Northamptonshire"
                },
                {
                    name: "Northumberland"
                },
                {
                    name: "Nottingham"
                },
                {
                    name: "Nottinghamshire"
                },
                {
                    name: "Oxfordshire"
                },
                {
                    name: "Pembrokeshire"
                },
                {
                    name: "Perth and Kinross"
                },
                {
                    name: "Peterborough"
                },
                {
                    name: "Plymouth"
                },
                {
                    name: "Poole"
                },
                {
                    name: "Portsmouth"
                },
                {
                    name: "Powys"
                },
                {
                    name: "Reading"
                },
                {
                    name: "Redcar and Cleveland"
                },
                {
                    name: "Rutland"
                },
                {
                    name: "Scottish Borders"
                },
                {
                    name: "Shropshire"
                },
                {
                    name: "Slough"
                },
                {
                    name: "Somerset"
                },
                {
                    name: "South Glamorgan"
                },
                {
                    name: "South Gloucestershire"
                },
                {
                    name: "South Yorkshire"
                },
                {
                    name: "Southampton"
                },
                {
                    name: "Southend-on-Sea"
                },
                {
                    name: "Staffordshire"
                },
                {
                    name: "Stirlingshire"
                },
                {
                    name: "Stockton-on-Tees"
                },
                {
                    name: "Stoke-on-Trent"
                },
                {
                    name: "Strathclyde"
                },
                {
                    name: "Suffolk"
                },
                {
                    name: "Surrey"
                },
                {
                    name: "Swindon"
                },
                {
                    name: "Telford and Wrekin"
                },
                {
                    name: "Thurrock"
                },
                {
                    name: "Torbay"
                },
                {
                    name: "Tyne and Wear"
                },
                {
                    name: "Warrington"
                },
                {
                    name: "Warwickshire"
                },
                {
                    name: "West Berkshire"
                },
                {
                    name: "West Glamorgan"
                },
                {
                    name: "West Lothian"
                },
                {
                    name: "West Midlands"
                },
                {
                    name: "West Sussex"
                },
                {
                    name: "West Yorkshire"
                },
                {
                    name: "Western Isles"
                },
                {
                    name: "Wiltshire"
                },
                {
                    name: "Windsor and Maidenhead"
                },
                {
                    name: "Wokingham"
                },
                {
                    name: "Worcestershire"
                },
                {
                    name: "Wrexham"
                },
                {
                    name: "York"
                }
            ]
        },
        provinces: {
            ca: [
                {
                    name: "Alberta",
                    abbreviation: "AB"
                },
                {
                    name: "British Columbia",
                    abbreviation: "BC"
                },
                {
                    name: "Manitoba",
                    abbreviation: "MB"
                },
                {
                    name: "New Brunswick",
                    abbreviation: "NB"
                },
                {
                    name: "Newfoundland and Labrador",
                    abbreviation: "NL"
                },
                {
                    name: "Nova Scotia",
                    abbreviation: "NS"
                },
                {
                    name: "Ontario",
                    abbreviation: "ON"
                },
                {
                    name: "Prince Edward Island",
                    abbreviation: "PE"
                },
                {
                    name: "Quebec",
                    abbreviation: "QC"
                },
                {
                    name: "Saskatchewan",
                    abbreviation: "SK"
                },
                {
                    name: "Northwest Territories",
                    abbreviation: "NT"
                },
                {
                    name: "Nunavut",
                    abbreviation: "NU"
                },
                {
                    name: "Yukon",
                    abbreviation: "YT"
                }
            ],
            it: [
                {
                    name: "Agrigento",
                    abbreviation: "AG",
                    code: 84
                },
                {
                    name: "Alessandria",
                    abbreviation: "AL",
                    code: 6
                },
                {
                    name: "Ancona",
                    abbreviation: "AN",
                    code: 42
                },
                {
                    name: "Aosta",
                    abbreviation: "AO",
                    code: 7
                },
                {
                    name: "L'Aquila",
                    abbreviation: "AQ",
                    code: 66
                },
                {
                    name: "Arezzo",
                    abbreviation: "AR",
                    code: 51
                },
                {
                    name: "Ascoli-Piceno",
                    abbreviation: "AP",
                    code: 44
                },
                {
                    name: "Asti",
                    abbreviation: "AT",
                    code: 5
                },
                {
                    name: "Avellino",
                    abbreviation: "AV",
                    code: 64
                },
                {
                    name: "Bari",
                    abbreviation: "BA",
                    code: 72
                },
                {
                    name: "Barletta-Andria-Trani",
                    abbreviation: "BT",
                    code: 72
                },
                {
                    name: "Belluno",
                    abbreviation: "BL",
                    code: 25
                },
                {
                    name: "Benevento",
                    abbreviation: "BN",
                    code: 62
                },
                {
                    name: "Bergamo",
                    abbreviation: "BG",
                    code: 16
                },
                {
                    name: "Biella",
                    abbreviation: "BI",
                    code: 96
                },
                {
                    name: "Bologna",
                    abbreviation: "BO",
                    code: 37
                },
                {
                    name: "Bolzano",
                    abbreviation: "BZ",
                    code: 21
                },
                {
                    name: "Brescia",
                    abbreviation: "BS",
                    code: 17
                },
                {
                    name: "Brindisi",
                    abbreviation: "BR",
                    code: 74
                },
                {
                    name: "Cagliari",
                    abbreviation: "CA",
                    code: 92
                },
                {
                    name: "Caltanissetta",
                    abbreviation: "CL",
                    code: 85
                },
                {
                    name: "Campobasso",
                    abbreviation: "CB",
                    code: 70
                },
                {
                    name: "Carbonia Iglesias",
                    abbreviation: "CI",
                    code: 70
                },
                {
                    name: "Caserta",
                    abbreviation: "CE",
                    code: 61
                },
                {
                    name: "Catania",
                    abbreviation: "CT",
                    code: 87
                },
                {
                    name: "Catanzaro",
                    abbreviation: "CZ",
                    code: 79
                },
                {
                    name: "Chieti",
                    abbreviation: "CH",
                    code: 69
                },
                {
                    name: "Como",
                    abbreviation: "CO",
                    code: 13
                },
                {
                    name: "Cosenza",
                    abbreviation: "CS",
                    code: 78
                },
                {
                    name: "Cremona",
                    abbreviation: "CR",
                    code: 19
                },
                {
                    name: "Crotone",
                    abbreviation: "KR",
                    code: 101
                },
                {
                    name: "Cuneo",
                    abbreviation: "CN",
                    code: 4
                },
                {
                    name: "Enna",
                    abbreviation: "EN",
                    code: 86
                },
                {
                    name: "Fermo",
                    abbreviation: "FM",
                    code: 86
                },
                {
                    name: "Ferrara",
                    abbreviation: "FE",
                    code: 38
                },
                {
                    name: "Firenze",
                    abbreviation: "FI",
                    code: 48
                },
                {
                    name: "Foggia",
                    abbreviation: "FG",
                    code: 71
                },
                {
                    name: "Forli-Cesena",
                    abbreviation: "FC",
                    code: 71
                },
                {
                    name: "Frosinone",
                    abbreviation: "FR",
                    code: 60
                },
                {
                    name: "Genova",
                    abbreviation: "GE",
                    code: 10
                },
                {
                    name: "Gorizia",
                    abbreviation: "GO",
                    code: 31
                },
                {
                    name: "Grosseto",
                    abbreviation: "GR",
                    code: 53
                },
                {
                    name: "Imperia",
                    abbreviation: "IM",
                    code: 8
                },
                {
                    name: "Isernia",
                    abbreviation: "IS",
                    code: 94
                },
                {
                    name: "La-Spezia",
                    abbreviation: "SP",
                    code: 66
                },
                {
                    name: "Latina",
                    abbreviation: "LT",
                    code: 59
                },
                {
                    name: "Lecce",
                    abbreviation: "LE",
                    code: 75
                },
                {
                    name: "Lecco",
                    abbreviation: "LC",
                    code: 97
                },
                {
                    name: "Livorno",
                    abbreviation: "LI",
                    code: 49
                },
                {
                    name: "Lodi",
                    abbreviation: "LO",
                    code: 98
                },
                {
                    name: "Lucca",
                    abbreviation: "LU",
                    code: 46
                },
                {
                    name: "Macerata",
                    abbreviation: "MC",
                    code: 43
                },
                {
                    name: "Mantova",
                    abbreviation: "MN",
                    code: 20
                },
                {
                    name: "Massa-Carrara",
                    abbreviation: "MS",
                    code: 45
                },
                {
                    name: "Matera",
                    abbreviation: "MT",
                    code: 77
                },
                {
                    name: "Medio Campidano",
                    abbreviation: "VS",
                    code: 77
                },
                {
                    name: "Messina",
                    abbreviation: "ME",
                    code: 83
                },
                {
                    name: "Milano",
                    abbreviation: "MI",
                    code: 15
                },
                {
                    name: "Modena",
                    abbreviation: "MO",
                    code: 36
                },
                {
                    name: "Monza-Brianza",
                    abbreviation: "MB",
                    code: 36
                },
                {
                    name: "Napoli",
                    abbreviation: "NA",
                    code: 63
                },
                {
                    name: "Novara",
                    abbreviation: "NO",
                    code: 3
                },
                {
                    name: "Nuoro",
                    abbreviation: "NU",
                    code: 91
                },
                {
                    name: "Ogliastra",
                    abbreviation: "OG",
                    code: 91
                },
                {
                    name: "Olbia Tempio",
                    abbreviation: "OT",
                    code: 91
                },
                {
                    name: "Oristano",
                    abbreviation: "OR",
                    code: 95
                },
                {
                    name: "Padova",
                    abbreviation: "PD",
                    code: 28
                },
                {
                    name: "Palermo",
                    abbreviation: "PA",
                    code: 82
                },
                {
                    name: "Parma",
                    abbreviation: "PR",
                    code: 34
                },
                {
                    name: "Pavia",
                    abbreviation: "PV",
                    code: 18
                },
                {
                    name: "Perugia",
                    abbreviation: "PG",
                    code: 54
                },
                {
                    name: "Pesaro-Urbino",
                    abbreviation: "PU",
                    code: 41
                },
                {
                    name: "Pescara",
                    abbreviation: "PE",
                    code: 68
                },
                {
                    name: "Piacenza",
                    abbreviation: "PC",
                    code: 33
                },
                {
                    name: "Pisa",
                    abbreviation: "PI",
                    code: 50
                },
                {
                    name: "Pistoia",
                    abbreviation: "PT",
                    code: 47
                },
                {
                    name: "Pordenone",
                    abbreviation: "PN",
                    code: 93
                },
                {
                    name: "Potenza",
                    abbreviation: "PZ",
                    code: 76
                },
                {
                    name: "Prato",
                    abbreviation: "PO",
                    code: 100
                },
                {
                    name: "Ragusa",
                    abbreviation: "RG",
                    code: 88
                },
                {
                    name: "Ravenna",
                    abbreviation: "RA",
                    code: 39
                },
                {
                    name: "Reggio-Calabria",
                    abbreviation: "RC",
                    code: 35
                },
                {
                    name: "Reggio-Emilia",
                    abbreviation: "RE",
                    code: 35
                },
                {
                    name: "Rieti",
                    abbreviation: "RI",
                    code: 57
                },
                {
                    name: "Rimini",
                    abbreviation: "RN",
                    code: 99
                },
                {
                    name: "Roma",
                    abbreviation: "Roma",
                    code: 58
                },
                {
                    name: "Rovigo",
                    abbreviation: "RO",
                    code: 29
                },
                {
                    name: "Salerno",
                    abbreviation: "SA",
                    code: 65
                },
                {
                    name: "Sassari",
                    abbreviation: "SS",
                    code: 90
                },
                {
                    name: "Savona",
                    abbreviation: "SV",
                    code: 9
                },
                {
                    name: "Siena",
                    abbreviation: "SI",
                    code: 52
                },
                {
                    name: "Siracusa",
                    abbreviation: "SR",
                    code: 89
                },
                {
                    name: "Sondrio",
                    abbreviation: "SO",
                    code: 14
                },
                {
                    name: "Taranto",
                    abbreviation: "TA",
                    code: 73
                },
                {
                    name: "Teramo",
                    abbreviation: "TE",
                    code: 67
                },
                {
                    name: "Terni",
                    abbreviation: "TR",
                    code: 55
                },
                {
                    name: "Torino",
                    abbreviation: "TO",
                    code: 1
                },
                {
                    name: "Trapani",
                    abbreviation: "TP",
                    code: 81
                },
                {
                    name: "Trento",
                    abbreviation: "TN",
                    code: 22
                },
                {
                    name: "Treviso",
                    abbreviation: "TV",
                    code: 26
                },
                {
                    name: "Trieste",
                    abbreviation: "TS",
                    code: 32
                },
                {
                    name: "Udine",
                    abbreviation: "UD",
                    code: 30
                },
                {
                    name: "Varese",
                    abbreviation: "VA",
                    code: 12
                },
                {
                    name: "Venezia",
                    abbreviation: "VE",
                    code: 27
                },
                {
                    name: "Verbania",
                    abbreviation: "VB",
                    code: 27
                },
                {
                    name: "Vercelli",
                    abbreviation: "VC",
                    code: 2
                },
                {
                    name: "Verona",
                    abbreviation: "VR",
                    code: 23
                },
                {
                    name: "Vibo-Valentia",
                    abbreviation: "VV",
                    code: 102
                },
                {
                    name: "Vicenza",
                    abbreviation: "VI",
                    code: 24
                },
                {
                    name: "Viterbo",
                    abbreviation: "VT",
                    code: 56
                }
            ]
        },
        nationalities: [
            {
                name: "Afghan"
            },
            {
                name: "Albanian"
            },
            {
                name: "Algerian"
            },
            {
                name: "American"
            },
            {
                name: "Andorran"
            },
            {
                name: "Angolan"
            },
            {
                name: "Antiguans"
            },
            {
                name: "Argentinean"
            },
            {
                name: "Armenian"
            },
            {
                name: "Australian"
            },
            {
                name: "Austrian"
            },
            {
                name: "Azerbaijani"
            },
            {
                name: "Bahami"
            },
            {
                name: "Bahraini"
            },
            {
                name: "Bangladeshi"
            },
            {
                name: "Barbadian"
            },
            {
                name: "Barbudans"
            },
            {
                name: "Batswana"
            },
            {
                name: "Belarusian"
            },
            {
                name: "Belgian"
            },
            {
                name: "Belizean"
            },
            {
                name: "Beninese"
            },
            {
                name: "Bhutanese"
            },
            {
                name: "Bolivian"
            },
            {
                name: "Bosnian"
            },
            {
                name: "Brazilian"
            },
            {
                name: "British"
            },
            {
                name: "Bruneian"
            },
            {
                name: "Bulgarian"
            },
            {
                name: "Burkinabe"
            },
            {
                name: "Burmese"
            },
            {
                name: "Burundian"
            },
            {
                name: "Cambodian"
            },
            {
                name: "Cameroonian"
            },
            {
                name: "Canadian"
            },
            {
                name: "Cape Verdean"
            },
            {
                name: "Central African"
            },
            {
                name: "Chadian"
            },
            {
                name: "Chilean"
            },
            {
                name: "Chinese"
            },
            {
                name: "Colombian"
            },
            {
                name: "Comoran"
            },
            {
                name: "Congolese"
            },
            {
                name: "Costa Rican"
            },
            {
                name: "Croatian"
            },
            {
                name: "Cuban"
            },
            {
                name: "Cypriot"
            },
            {
                name: "Czech"
            },
            {
                name: "Danish"
            },
            {
                name: "Djibouti"
            },
            {
                name: "Dominican"
            },
            {
                name: "Dutch"
            },
            {
                name: "East Timorese"
            },
            {
                name: "Ecuadorean"
            },
            {
                name: "Egyptian"
            },
            {
                name: "Emirian"
            },
            {
                name: "Equatorial Guinean"
            },
            {
                name: "Eritrean"
            },
            {
                name: "Estonian"
            },
            {
                name: "Ethiopian"
            },
            {
                name: "Fijian"
            },
            {
                name: "Filipino"
            },
            {
                name: "Finnish"
            },
            {
                name: "French"
            },
            {
                name: "Gabonese"
            },
            {
                name: "Gambian"
            },
            {
                name: "Georgian"
            },
            {
                name: "German"
            },
            {
                name: "Ghanaian"
            },
            {
                name: "Greek"
            },
            {
                name: "Grenadian"
            },
            {
                name: "Guatemalan"
            },
            {
                name: "Guinea-Bissauan"
            },
            {
                name: "Guinean"
            },
            {
                name: "Guyanese"
            },
            {
                name: "Haitian"
            },
            {
                name: "Herzegovinian"
            },
            {
                name: "Honduran"
            },
            {
                name: "Hungarian"
            },
            {
                name: "I-Kiribati"
            },
            {
                name: "Icelander"
            },
            {
                name: "Indian"
            },
            {
                name: "Indonesian"
            },
            {
                name: "Iranian"
            },
            {
                name: "Iraqi"
            },
            {
                name: "Irish"
            },
            {
                name: "Israeli"
            },
            {
                name: "Italian"
            },
            {
                name: "Ivorian"
            },
            {
                name: "Jamaican"
            },
            {
                name: "Japanese"
            },
            {
                name: "Jordanian"
            },
            {
                name: "Kazakhstani"
            },
            {
                name: "Kenyan"
            },
            {
                name: "Kittian and Nevisian"
            },
            {
                name: "Kuwaiti"
            },
            {
                name: "Kyrgyz"
            },
            {
                name: "Laotian"
            },
            {
                name: "Latvian"
            },
            {
                name: "Lebanese"
            },
            {
                name: "Liberian"
            },
            {
                name: "Libyan"
            },
            {
                name: "Liechtensteiner"
            },
            {
                name: "Lithuanian"
            },
            {
                name: "Luxembourger"
            },
            {
                name: "Macedonian"
            },
            {
                name: "Malagasy"
            },
            {
                name: "Malawian"
            },
            {
                name: "Malaysian"
            },
            {
                name: "Maldivan"
            },
            {
                name: "Malian"
            },
            {
                name: "Maltese"
            },
            {
                name: "Marshallese"
            },
            {
                name: "Mauritanian"
            },
            {
                name: "Mauritian"
            },
            {
                name: "Mexican"
            },
            {
                name: "Micronesian"
            },
            {
                name: "Moldovan"
            },
            {
                name: "Monacan"
            },
            {
                name: "Mongolian"
            },
            {
                name: "Moroccan"
            },
            {
                name: "Mosotho"
            },
            {
                name: "Motswana"
            },
            {
                name: "Mozambican"
            },
            {
                name: "Namibian"
            },
            {
                name: "Nauruan"
            },
            {
                name: "Nepalese"
            },
            {
                name: "New Zealander"
            },
            {
                name: "Nicaraguan"
            },
            {
                name: "Nigerian"
            },
            {
                name: "Nigerien"
            },
            {
                name: "North Korean"
            },
            {
                name: "Northern Irish"
            },
            {
                name: "Norwegian"
            },
            {
                name: "Omani"
            },
            {
                name: "Pakistani"
            },
            {
                name: "Palauan"
            },
            {
                name: "Panamanian"
            },
            {
                name: "Papua New Guinean"
            },
            {
                name: "Paraguayan"
            },
            {
                name: "Peruvian"
            },
            {
                name: "Polish"
            },
            {
                name: "Portuguese"
            },
            {
                name: "Qatari"
            },
            {
                name: "Romani"
            },
            {
                name: "Russian"
            },
            {
                name: "Rwandan"
            },
            {
                name: "Saint Lucian"
            },
            {
                name: "Salvadoran"
            },
            {
                name: "Samoan"
            },
            {
                name: "San Marinese"
            },
            {
                name: "Sao Tomean"
            },
            {
                name: "Saudi"
            },
            {
                name: "Scottish"
            },
            {
                name: "Senegalese"
            },
            {
                name: "Serbian"
            },
            {
                name: "Seychellois"
            },
            {
                name: "Sierra Leonean"
            },
            {
                name: "Singaporean"
            },
            {
                name: "Slovakian"
            },
            {
                name: "Slovenian"
            },
            {
                name: "Solomon Islander"
            },
            {
                name: "Somali"
            },
            {
                name: "South African"
            },
            {
                name: "South Korean"
            },
            {
                name: "Spanish"
            },
            {
                name: "Sri Lankan"
            },
            {
                name: "Sudanese"
            },
            {
                name: "Surinamer"
            },
            {
                name: "Swazi"
            },
            {
                name: "Swedish"
            },
            {
                name: "Swiss"
            },
            {
                name: "Syrian"
            },
            {
                name: "Taiwanese"
            },
            {
                name: "Tajik"
            },
            {
                name: "Tanzanian"
            },
            {
                name: "Thai"
            },
            {
                name: "Togolese"
            },
            {
                name: "Tongan"
            },
            {
                name: "Trinidadian or Tobagonian"
            },
            {
                name: "Tunisian"
            },
            {
                name: "Turkish"
            },
            {
                name: "Tuvaluan"
            },
            {
                name: "Ugandan"
            },
            {
                name: "Ukrainian"
            },
            {
                name: "Uruguaya"
            },
            {
                name: "Uzbekistani"
            },
            {
                name: "Venezuela"
            },
            {
                name: "Vietnamese"
            },
            {
                name: "Wels"
            },
            {
                name: "Yemenit"
            },
            {
                name: "Zambia"
            },
            {
                name: "Zimbabwe"
            }
        ],
        locale_languages: [
            "aa",
            "ab",
            "ae",
            "af",
            "ak",
            "am",
            "an",
            "ar",
            "as",
            "av",
            "ay",
            "az",
            "ba",
            "be",
            "bg",
            "bh",
            "bi",
            "bm",
            "bn",
            "bo",
            "br",
            "bs",
            "ca",
            "ce",
            "ch",
            "co",
            "cr",
            "cs",
            "cu",
            "cv",
            "cy",
            "da",
            "de",
            "dv",
            "dz",
            "ee",
            "el",
            "en",
            "eo",
            "es",
            "et",
            "eu",
            "fa",
            "ff",
            "fi",
            "fj",
            "fo",
            "fr",
            "fy",
            "ga",
            "gd",
            "gl",
            "gn",
            "gu",
            "gv",
            "ha",
            "he",
            "hi",
            "ho",
            "hr",
            "ht",
            "hu",
            "hy",
            "hz",
            "ia",
            "id",
            "ie",
            "ig",
            "ii",
            "ik",
            "io",
            "is",
            "it",
            "iu",
            "ja",
            "jv",
            "ka",
            "kg",
            "ki",
            "kj",
            "kk",
            "kl",
            "km",
            "kn",
            "ko",
            "kr",
            "ks",
            "ku",
            "kv",
            "kw",
            "ky",
            "la",
            "lb",
            "lg",
            "li",
            "ln",
            "lo",
            "lt",
            "lu",
            "lv",
            "mg",
            "mh",
            "mi",
            "mk",
            "ml",
            "mn",
            "mr",
            "ms",
            "mt",
            "my",
            "na",
            "nb",
            "nd",
            "ne",
            "ng",
            "nl",
            "nn",
            "no",
            "nr",
            "nv",
            "ny",
            "oc",
            "oj",
            "om",
            "or",
            "os",
            "pa",
            "pi",
            "pl",
            "ps",
            "pt",
            "qu",
            "rm",
            "rn",
            "ro",
            "ru",
            "rw",
            "sa",
            "sc",
            "sd",
            "se",
            "sg",
            "si",
            "sk",
            "sl",
            "sm",
            "sn",
            "so",
            "sq",
            "sr",
            "ss",
            "st",
            "su",
            "sv",
            "sw",
            "ta",
            "te",
            "tg",
            "th",
            "ti",
            "tk",
            "tl",
            "tn",
            "to",
            "tr",
            "ts",
            "tt",
            "tw",
            "ty",
            "ug",
            "uk",
            "ur",
            "uz",
            "ve",
            "vi",
            "vo",
            "wa",
            "wo",
            "xh",
            "yi",
            "yo",
            "za",
            "zh",
            "zu"
        ],
        locale_regions: [
            "agq-CM",
            "asa-TZ",
            "ast-ES",
            "bas-CM",
            "bem-ZM",
            "bez-TZ",
            "brx-IN",
            "cgg-UG",
            "chr-US",
            "dav-KE",
            "dje-NE",
            "dsb-DE",
            "dua-CM",
            "dyo-SN",
            "ebu-KE",
            "ewo-CM",
            "fil-PH",
            "fur-IT",
            "gsw-CH",
            "gsw-FR",
            "gsw-LI",
            "guz-KE",
            "haw-US",
            "hsb-DE",
            "jgo-CM",
            "jmc-TZ",
            "kab-DZ",
            "kam-KE",
            "kde-TZ",
            "kea-CV",
            "khq-ML",
            "kkj-CM",
            "kln-KE",
            "kok-IN",
            "ksb-TZ",
            "ksf-CM",
            "ksh-DE",
            "lag-TZ",
            "lkt-US",
            "luo-KE",
            "luy-KE",
            "mas-KE",
            "mas-TZ",
            "mer-KE",
            "mfe-MU",
            "mgh-MZ",
            "mgo-CM",
            "mua-CM",
            "naq-NA",
            "nmg-CM",
            "nnh-CM",
            "nus-SD",
            "nyn-UG",
            "rof-TZ",
            "rwk-TZ",
            "sah-RU",
            "saq-KE",
            "sbp-TZ",
            "seh-MZ",
            "ses-ML",
            "shi-Latn",
            "shi-Latn-MA",
            "shi-Tfng",
            "shi-Tfng-MA",
            "smn-FI",
            "teo-KE",
            "teo-UG",
            "twq-NE",
            "tzm-Latn",
            "tzm-Latn-MA",
            "vai-Latn",
            "vai-Latn-LR",
            "vai-Vaii",
            "vai-Vaii-LR",
            "vun-TZ",
            "wae-CH",
            "xog-UG",
            "yav-CM",
            "zgh-MA",
            "af-NA",
            "af-ZA",
            "ak-GH",
            "am-ET",
            "ar-001",
            "ar-AE",
            "ar-BH",
            "ar-DJ",
            "ar-DZ",
            "ar-EG",
            "ar-EH",
            "ar-ER",
            "ar-IL",
            "ar-IQ",
            "ar-JO",
            "ar-KM",
            "ar-KW",
            "ar-LB",
            "ar-LY",
            "ar-MA",
            "ar-MR",
            "ar-OM",
            "ar-PS",
            "ar-QA",
            "ar-SA",
            "ar-SD",
            "ar-SO",
            "ar-SS",
            "ar-SY",
            "ar-TD",
            "ar-TN",
            "ar-YE",
            "as-IN",
            "az-Cyrl",
            "az-Cyrl-AZ",
            "az-Latn",
            "az-Latn-AZ",
            "be-BY",
            "bg-BG",
            "bm-Latn",
            "bm-Latn-ML",
            "bn-BD",
            "bn-IN",
            "bo-CN",
            "bo-IN",
            "br-FR",
            "bs-Cyrl",
            "bs-Cyrl-BA",
            "bs-Latn",
            "bs-Latn-BA",
            "ca-AD",
            "ca-ES",
            "ca-ES-VALENCIA",
            "ca-FR",
            "ca-IT",
            "cs-CZ",
            "cy-GB",
            "da-DK",
            "da-GL",
            "de-AT",
            "de-BE",
            "de-CH",
            "de-DE",
            "de-LI",
            "de-LU",
            "dz-BT",
            "ee-GH",
            "ee-TG",
            "el-CY",
            "el-GR",
            "en-001",
            "en-150",
            "en-AG",
            "en-AI",
            "en-AS",
            "en-AU",
            "en-BB",
            "en-BE",
            "en-BM",
            "en-BS",
            "en-BW",
            "en-BZ",
            "en-CA",
            "en-CC",
            "en-CK",
            "en-CM",
            "en-CX",
            "en-DG",
            "en-DM",
            "en-ER",
            "en-FJ",
            "en-FK",
            "en-FM",
            "en-GB",
            "en-GD",
            "en-GG",
            "en-GH",
            "en-GI",
            "en-GM",
            "en-GU",
            "en-GY",
            "en-HK",
            "en-IE",
            "en-IM",
            "en-IN",
            "en-IO",
            "en-JE",
            "en-JM",
            "en-KE",
            "en-KI",
            "en-KN",
            "en-KY",
            "en-LC",
            "en-LR",
            "en-LS",
            "en-MG",
            "en-MH",
            "en-MO",
            "en-MP",
            "en-MS",
            "en-MT",
            "en-MU",
            "en-MW",
            "en-MY",
            "en-NA",
            "en-NF",
            "en-NG",
            "en-NR",
            "en-NU",
            "en-NZ",
            "en-PG",
            "en-PH",
            "en-PK",
            "en-PN",
            "en-PR",
            "en-PW",
            "en-RW",
            "en-SB",
            "en-SC",
            "en-SD",
            "en-SG",
            "en-SH",
            "en-SL",
            "en-SS",
            "en-SX",
            "en-SZ",
            "en-TC",
            "en-TK",
            "en-TO",
            "en-TT",
            "en-TV",
            "en-TZ",
            "en-UG",
            "en-UM",
            "en-US",
            "en-US-POSIX",
            "en-VC",
            "en-VG",
            "en-VI",
            "en-VU",
            "en-WS",
            "en-ZA",
            "en-ZM",
            "en-ZW",
            "eo-001",
            "es-419",
            "es-AR",
            "es-BO",
            "es-CL",
            "es-CO",
            "es-CR",
            "es-CU",
            "es-DO",
            "es-EA",
            "es-EC",
            "es-ES",
            "es-GQ",
            "es-GT",
            "es-HN",
            "es-IC",
            "es-MX",
            "es-NI",
            "es-PA",
            "es-PE",
            "es-PH",
            "es-PR",
            "es-PY",
            "es-SV",
            "es-US",
            "es-UY",
            "es-VE",
            "et-EE",
            "eu-ES",
            "fa-AF",
            "fa-IR",
            "ff-CM",
            "ff-GN",
            "ff-MR",
            "ff-SN",
            "fi-FI",
            "fo-FO",
            "fr-BE",
            "fr-BF",
            "fr-BI",
            "fr-BJ",
            "fr-BL",
            "fr-CA",
            "fr-CD",
            "fr-CF",
            "fr-CG",
            "fr-CH",
            "fr-CI",
            "fr-CM",
            "fr-DJ",
            "fr-DZ",
            "fr-FR",
            "fr-GA",
            "fr-GF",
            "fr-GN",
            "fr-GP",
            "fr-GQ",
            "fr-HT",
            "fr-KM",
            "fr-LU",
            "fr-MA",
            "fr-MC",
            "fr-MF",
            "fr-MG",
            "fr-ML",
            "fr-MQ",
            "fr-MR",
            "fr-MU",
            "fr-NC",
            "fr-NE",
            "fr-PF",
            "fr-PM",
            "fr-RE",
            "fr-RW",
            "fr-SC",
            "fr-SN",
            "fr-SY",
            "fr-TD",
            "fr-TG",
            "fr-TN",
            "fr-VU",
            "fr-WF",
            "fr-YT",
            "fy-NL",
            "ga-IE",
            "gd-GB",
            "gl-ES",
            "gu-IN",
            "gv-IM",
            "ha-Latn",
            "ha-Latn-GH",
            "ha-Latn-NE",
            "ha-Latn-NG",
            "he-IL",
            "hi-IN",
            "hr-BA",
            "hr-HR",
            "hu-HU",
            "hy-AM",
            "id-ID",
            "ig-NG",
            "ii-CN",
            "is-IS",
            "it-CH",
            "it-IT",
            "it-SM",
            "ja-JP",
            "ka-GE",
            "ki-KE",
            "kk-Cyrl",
            "kk-Cyrl-KZ",
            "kl-GL",
            "km-KH",
            "kn-IN",
            "ko-KP",
            "ko-KR",
            "ks-Arab",
            "ks-Arab-IN",
            "kw-GB",
            "ky-Cyrl",
            "ky-Cyrl-KG",
            "lb-LU",
            "lg-UG",
            "ln-AO",
            "ln-CD",
            "ln-CF",
            "ln-CG",
            "lo-LA",
            "lt-LT",
            "lu-CD",
            "lv-LV",
            "mg-MG",
            "mk-MK",
            "ml-IN",
            "mn-Cyrl",
            "mn-Cyrl-MN",
            "mr-IN",
            "ms-Latn",
            "ms-Latn-BN",
            "ms-Latn-MY",
            "ms-Latn-SG",
            "mt-MT",
            "my-MM",
            "nb-NO",
            "nb-SJ",
            "nd-ZW",
            "ne-IN",
            "ne-NP",
            "nl-AW",
            "nl-BE",
            "nl-BQ",
            "nl-CW",
            "nl-NL",
            "nl-SR",
            "nl-SX",
            "nn-NO",
            "om-ET",
            "om-KE",
            "or-IN",
            "os-GE",
            "os-RU",
            "pa-Arab",
            "pa-Arab-PK",
            "pa-Guru",
            "pa-Guru-IN",
            "pl-PL",
            "ps-AF",
            "pt-AO",
            "pt-BR",
            "pt-CV",
            "pt-GW",
            "pt-MO",
            "pt-MZ",
            "pt-PT",
            "pt-ST",
            "pt-TL",
            "qu-BO",
            "qu-EC",
            "qu-PE",
            "rm-CH",
            "rn-BI",
            "ro-MD",
            "ro-RO",
            "ru-BY",
            "ru-KG",
            "ru-KZ",
            "ru-MD",
            "ru-RU",
            "ru-UA",
            "rw-RW",
            "se-FI",
            "se-NO",
            "se-SE",
            "sg-CF",
            "si-LK",
            "sk-SK",
            "sl-SI",
            "sn-ZW",
            "so-DJ",
            "so-ET",
            "so-KE",
            "so-SO",
            "sq-AL",
            "sq-MK",
            "sq-XK",
            "sr-Cyrl",
            "sr-Cyrl-BA",
            "sr-Cyrl-ME",
            "sr-Cyrl-RS",
            "sr-Cyrl-XK",
            "sr-Latn",
            "sr-Latn-BA",
            "sr-Latn-ME",
            "sr-Latn-RS",
            "sr-Latn-XK",
            "sv-AX",
            "sv-FI",
            "sv-SE",
            "sw-CD",
            "sw-KE",
            "sw-TZ",
            "sw-UG",
            "ta-IN",
            "ta-LK",
            "ta-MY",
            "ta-SG",
            "te-IN",
            "th-TH",
            "ti-ER",
            "ti-ET",
            "to-TO",
            "tr-CY",
            "tr-TR",
            "ug-Arab",
            "ug-Arab-CN",
            "uk-UA",
            "ur-IN",
            "ur-PK",
            "uz-Arab",
            "uz-Arab-AF",
            "uz-Cyrl",
            "uz-Cyrl-UZ",
            "uz-Latn",
            "uz-Latn-UZ",
            "vi-VN",
            "yi-001",
            "yo-BJ",
            "yo-NG",
            "zh-Hans",
            "zh-Hans-CN",
            "zh-Hans-HK",
            "zh-Hans-MO",
            "zh-Hans-SG",
            "zh-Hant",
            "zh-Hant-HK",
            "zh-Hant-MO",
            "zh-Hant-TW",
            "zu-ZA"
        ],
        us_states_and_dc: [
            {
                name: "Alabama",
                abbreviation: "AL"
            },
            {
                name: "Alaska",
                abbreviation: "AK"
            },
            {
                name: "Arizona",
                abbreviation: "AZ"
            },
            {
                name: "Arkansas",
                abbreviation: "AR"
            },
            {
                name: "California",
                abbreviation: "CA"
            },
            {
                name: "Colorado",
                abbreviation: "CO"
            },
            {
                name: "Connecticut",
                abbreviation: "CT"
            },
            {
                name: "Delaware",
                abbreviation: "DE"
            },
            {
                name: "District of Columbia",
                abbreviation: "DC"
            },
            {
                name: "Florida",
                abbreviation: "FL"
            },
            {
                name: "Georgia",
                abbreviation: "GA"
            },
            {
                name: "Hawaii",
                abbreviation: "HI"
            },
            {
                name: "Idaho",
                abbreviation: "ID"
            },
            {
                name: "Illinois",
                abbreviation: "IL"
            },
            {
                name: "Indiana",
                abbreviation: "IN"
            },
            {
                name: "Iowa",
                abbreviation: "IA"
            },
            {
                name: "Kansas",
                abbreviation: "KS"
            },
            {
                name: "Kentucky",
                abbreviation: "KY"
            },
            {
                name: "Louisiana",
                abbreviation: "LA"
            },
            {
                name: "Maine",
                abbreviation: "ME"
            },
            {
                name: "Maryland",
                abbreviation: "MD"
            },
            {
                name: "Massachusetts",
                abbreviation: "MA"
            },
            {
                name: "Michigan",
                abbreviation: "MI"
            },
            {
                name: "Minnesota",
                abbreviation: "MN"
            },
            {
                name: "Mississippi",
                abbreviation: "MS"
            },
            {
                name: "Missouri",
                abbreviation: "MO"
            },
            {
                name: "Montana",
                abbreviation: "MT"
            },
            {
                name: "Nebraska",
                abbreviation: "NE"
            },
            {
                name: "Nevada",
                abbreviation: "NV"
            },
            {
                name: "New Hampshire",
                abbreviation: "NH"
            },
            {
                name: "New Jersey",
                abbreviation: "NJ"
            },
            {
                name: "New Mexico",
                abbreviation: "NM"
            },
            {
                name: "New York",
                abbreviation: "NY"
            },
            {
                name: "North Carolina",
                abbreviation: "NC"
            },
            {
                name: "North Dakota",
                abbreviation: "ND"
            },
            {
                name: "Ohio",
                abbreviation: "OH"
            },
            {
                name: "Oklahoma",
                abbreviation: "OK"
            },
            {
                name: "Oregon",
                abbreviation: "OR"
            },
            {
                name: "Pennsylvania",
                abbreviation: "PA"
            },
            {
                name: "Rhode Island",
                abbreviation: "RI"
            },
            {
                name: "South Carolina",
                abbreviation: "SC"
            },
            {
                name: "South Dakota",
                abbreviation: "SD"
            },
            {
                name: "Tennessee",
                abbreviation: "TN"
            },
            {
                name: "Texas",
                abbreviation: "TX"
            },
            {
                name: "Utah",
                abbreviation: "UT"
            },
            {
                name: "Vermont",
                abbreviation: "VT"
            },
            {
                name: "Virginia",
                abbreviation: "VA"
            },
            {
                name: "Washington",
                abbreviation: "WA"
            },
            {
                name: "West Virginia",
                abbreviation: "WV"
            },
            {
                name: "Wisconsin",
                abbreviation: "WI"
            },
            {
                name: "Wyoming",
                abbreviation: "WY"
            }
        ],
        territories: [
            {
                name: "American Samoa",
                abbreviation: "AS"
            },
            {
                name: "Federated States of Micronesia",
                abbreviation: "FM"
            },
            {
                name: "Guam",
                abbreviation: "GU"
            },
            {
                name: "Marshall Islands",
                abbreviation: "MH"
            },
            {
                name: "Northern Mariana Islands",
                abbreviation: "MP"
            },
            {
                name: "Puerto Rico",
                abbreviation: "PR"
            },
            {
                name: "Virgin Islands, U.S.",
                abbreviation: "VI"
            }
        ],
        armed_forces: [
            {
                name: "Armed Forces Europe",
                abbreviation: "AE"
            },
            {
                name: "Armed Forces Pacific",
                abbreviation: "AP"
            },
            {
                name: "Armed Forces the Americas",
                abbreviation: "AA"
            }
        ],
        country_regions: {
            it: [
                {
                    name: "Valle d'Aosta",
                    abbreviation: "VDA"
                },
                {
                    name: "Piemonte",
                    abbreviation: "PIE"
                },
                {
                    name: "Lombardia",
                    abbreviation: "LOM"
                },
                {
                    name: "Veneto",
                    abbreviation: "VEN"
                },
                {
                    name: "Trentino Alto Adige",
                    abbreviation: "TAA"
                },
                {
                    name: "Friuli Venezia Giulia",
                    abbreviation: "FVG"
                },
                {
                    name: "Liguria",
                    abbreviation: "LIG"
                },
                {
                    name: "Emilia Romagna",
                    abbreviation: "EMR"
                },
                {
                    name: "Toscana",
                    abbreviation: "TOS"
                },
                {
                    name: "Umbria",
                    abbreviation: "UMB"
                },
                {
                    name: "Marche",
                    abbreviation: "MAR"
                },
                {
                    name: "Abruzzo",
                    abbreviation: "ABR"
                },
                {
                    name: "Lazio",
                    abbreviation: "LAZ"
                },
                {
                    name: "Campania",
                    abbreviation: "CAM"
                },
                {
                    name: "Puglia",
                    abbreviation: "PUG"
                },
                {
                    name: "Basilicata",
                    abbreviation: "BAS"
                },
                {
                    name: "Molise",
                    abbreviation: "MOL"
                },
                {
                    name: "Calabria",
                    abbreviation: "CAL"
                },
                {
                    name: "Sicilia",
                    abbreviation: "SIC"
                },
                {
                    name: "Sardegna",
                    abbreviation: "SAR"
                }
            ]
        },
        street_suffixes: {
            us: [
                {
                    name: "Avenue",
                    abbreviation: "Ave"
                },
                {
                    name: "Boulevard",
                    abbreviation: "Blvd"
                },
                {
                    name: "Center",
                    abbreviation: "Ctr"
                },
                {
                    name: "Circle",
                    abbreviation: "Cir"
                },
                {
                    name: "Court",
                    abbreviation: "Ct"
                },
                {
                    name: "Drive",
                    abbreviation: "Dr"
                },
                {
                    name: "Extension",
                    abbreviation: "Ext"
                },
                {
                    name: "Glen",
                    abbreviation: "Gln"
                },
                {
                    name: "Grove",
                    abbreviation: "Grv"
                },
                {
                    name: "Heights",
                    abbreviation: "Hts"
                },
                {
                    name: "Highway",
                    abbreviation: "Hwy"
                },
                {
                    name: "Junction",
                    abbreviation: "Jct"
                },
                {
                    name: "Key",
                    abbreviation: "Key"
                },
                {
                    name: "Lane",
                    abbreviation: "Ln"
                },
                {
                    name: "Loop",
                    abbreviation: "Loop"
                },
                {
                    name: "Manor",
                    abbreviation: "Mnr"
                },
                {
                    name: "Mill",
                    abbreviation: "Mill"
                },
                {
                    name: "Park",
                    abbreviation: "Park"
                },
                {
                    name: "Parkway",
                    abbreviation: "Pkwy"
                },
                {
                    name: "Pass",
                    abbreviation: "Pass"
                },
                {
                    name: "Path",
                    abbreviation: "Path"
                },
                {
                    name: "Pike",
                    abbreviation: "Pike"
                },
                {
                    name: "Place",
                    abbreviation: "Pl"
                },
                {
                    name: "Plaza",
                    abbreviation: "Plz"
                },
                {
                    name: "Point",
                    abbreviation: "Pt"
                },
                {
                    name: "Ridge",
                    abbreviation: "Rdg"
                },
                {
                    name: "River",
                    abbreviation: "Riv"
                },
                {
                    name: "Road",
                    abbreviation: "Rd"
                },
                {
                    name: "Square",
                    abbreviation: "Sq"
                },
                {
                    name: "Street",
                    abbreviation: "St"
                },
                {
                    name: "Terrace",
                    abbreviation: "Ter"
                },
                {
                    name: "Trail",
                    abbreviation: "Trl"
                },
                {
                    name: "Turnpike",
                    abbreviation: "Tpke"
                },
                {
                    name: "View",
                    abbreviation: "Vw"
                },
                {
                    name: "Way",
                    abbreviation: "Way"
                }
            ],
            it: [
                {
                    name: "Accesso",
                    abbreviation: "Acc."
                },
                {
                    name: "Alzaia",
                    abbreviation: "Alz."
                },
                {
                    name: "Arco",
                    abbreviation: "Arco"
                },
                {
                    name: "Archivolto",
                    abbreviation: "Acv."
                },
                {
                    name: "Arena",
                    abbreviation: "Arena"
                },
                {
                    name: "Argine",
                    abbreviation: "Argine"
                },
                {
                    name: "Bacino",
                    abbreviation: "Bacino"
                },
                {
                    name: "Banchi",
                    abbreviation: "Banchi"
                },
                {
                    name: "Banchina",
                    abbreviation: "Ban."
                },
                {
                    name: "Bastioni",
                    abbreviation: "Bas."
                },
                {
                    name: "Belvedere",
                    abbreviation: "Belv."
                },
                {
                    name: "Borgata",
                    abbreviation: "B.ta"
                },
                {
                    name: "Borgo",
                    abbreviation: "B.go"
                },
                {
                    name: "Calata",
                    abbreviation: "Cal."
                },
                {
                    name: "Calle",
                    abbreviation: "Calle"
                },
                {
                    name: "Campiello",
                    abbreviation: "Cam."
                },
                {
                    name: "Campo",
                    abbreviation: "Cam."
                },
                {
                    name: "Canale",
                    abbreviation: "Can."
                },
                {
                    name: "Carraia",
                    abbreviation: "Carr."
                },
                {
                    name: "Cascina",
                    abbreviation: "Cascina"
                },
                {
                    name: "Case sparse",
                    abbreviation: "c.s."
                },
                {
                    name: "Cavalcavia",
                    abbreviation: "Cv."
                },
                {
                    name: "Circonvallazione",
                    abbreviation: "Cv."
                },
                {
                    name: "Complanare",
                    abbreviation: "C.re"
                },
                {
                    name: "Contrada",
                    abbreviation: "C.da"
                },
                {
                    name: "Corso",
                    abbreviation: "C.so"
                },
                {
                    name: "Corte",
                    abbreviation: "C.te"
                },
                {
                    name: "Cortile",
                    abbreviation: "C.le"
                },
                {
                    name: "Diramazione",
                    abbreviation: "Dir."
                },
                {
                    name: "Fondaco",
                    abbreviation: "F.co"
                },
                {
                    name: "Fondamenta",
                    abbreviation: "F.ta"
                },
                {
                    name: "Fondo",
                    abbreviation: "F.do"
                },
                {
                    name: "Frazione",
                    abbreviation: "Fr."
                },
                {
                    name: "Isola",
                    abbreviation: "Is."
                },
                {
                    name: "Largo",
                    abbreviation: "L.go"
                },
                {
                    name: "Litoranea",
                    abbreviation: "Lit."
                },
                {
                    name: "Lungolago",
                    abbreviation: "L.go lago"
                },
                {
                    name: "Lungo Po",
                    abbreviation: "l.go Po"
                },
                {
                    name: "Molo",
                    abbreviation: "Molo"
                },
                {
                    name: "Mura",
                    abbreviation: "Mura"
                },
                {
                    name: "Passaggio privato",
                    abbreviation: "pass. priv."
                },
                {
                    name: "Passeggiata",
                    abbreviation: "Pass."
                },
                {
                    name: "Piazza",
                    abbreviation: "P.zza"
                },
                {
                    name: "Piazzale",
                    abbreviation: "P.le"
                },
                {
                    name: "Ponte",
                    abbreviation: "P.te"
                },
                {
                    name: "Portico",
                    abbreviation: "P.co"
                },
                {
                    name: "Rampa",
                    abbreviation: "Rampa"
                },
                {
                    name: "Regione",
                    abbreviation: "Reg."
                },
                {
                    name: "Rione",
                    abbreviation: "R.ne"
                },
                {
                    name: "Rio",
                    abbreviation: "Rio"
                },
                {
                    name: "Ripa",
                    abbreviation: "Ripa"
                },
                {
                    name: "Riva",
                    abbreviation: "Riva"
                },
                {
                    name: "Rondò",
                    abbreviation: "Rondò"
                },
                {
                    name: "Rotonda",
                    abbreviation: "Rot."
                },
                {
                    name: "Sagrato",
                    abbreviation: "Sagr."
                },
                {
                    name: "Salita",
                    abbreviation: "Sal."
                },
                {
                    name: "Scalinata",
                    abbreviation: "Scal."
                },
                {
                    name: "Scalone",
                    abbreviation: "Scal."
                },
                {
                    name: "Slargo",
                    abbreviation: "Sl."
                },
                {
                    name: "Sottoportico",
                    abbreviation: "Sott."
                },
                {
                    name: "Strada",
                    abbreviation: "Str."
                },
                {
                    name: "Stradale",
                    abbreviation: "Str.le"
                },
                {
                    name: "Strettoia",
                    abbreviation: "Strett."
                },
                {
                    name: "Traversa",
                    abbreviation: "Trav."
                },
                {
                    name: "Via",
                    abbreviation: "V."
                },
                {
                    name: "Viale",
                    abbreviation: "V.le"
                },
                {
                    name: "Vicinale",
                    abbreviation: "Vic.le"
                },
                {
                    name: "Vicolo",
                    abbreviation: "Vic."
                }
            ],
            uk: [
                {
                    name: "Avenue",
                    abbreviation: "Ave"
                },
                {
                    name: "Close",
                    abbreviation: "Cl"
                },
                {
                    name: "Court",
                    abbreviation: "Ct"
                },
                {
                    name: "Crescent",
                    abbreviation: "Cr"
                },
                {
                    name: "Drive",
                    abbreviation: "Dr"
                },
                {
                    name: "Garden",
                    abbreviation: "Gdn"
                },
                {
                    name: "Gardens",
                    abbreviation: "Gdns"
                },
                {
                    name: "Green",
                    abbreviation: "Gn"
                },
                {
                    name: "Grove",
                    abbreviation: "Gr"
                },
                {
                    name: "Lane",
                    abbreviation: "Ln"
                },
                {
                    name: "Mount",
                    abbreviation: "Mt"
                },
                {
                    name: "Place",
                    abbreviation: "Pl"
                },
                {
                    name: "Park",
                    abbreviation: "Pk"
                },
                {
                    name: "Ridge",
                    abbreviation: "Rdg"
                },
                {
                    name: "Road",
                    abbreviation: "Rd"
                },
                {
                    name: "Square",
                    abbreviation: "Sq"
                },
                {
                    name: "Street",
                    abbreviation: "St"
                },
                {
                    name: "Terrace",
                    abbreviation: "Ter"
                },
                {
                    name: "Valley",
                    abbreviation: "Val"
                }
            ]
        },
        months: [
            {
                name: "January",
                short_name: "Jan",
                numeric: "01",
                days: 31
            },
            {
                name: "February",
                short_name: "Feb",
                numeric: "02",
                days: 28
            },
            {
                name: "March",
                short_name: "Mar",
                numeric: "03",
                days: 31
            },
            {
                name: "April",
                short_name: "Apr",
                numeric: "04",
                days: 30
            },
            {
                name: "May",
                short_name: "May",
                numeric: "05",
                days: 31
            },
            {
                name: "June",
                short_name: "Jun",
                numeric: "06",
                days: 30
            },
            {
                name: "July",
                short_name: "Jul",
                numeric: "07",
                days: 31
            },
            {
                name: "August",
                short_name: "Aug",
                numeric: "08",
                days: 31
            },
            {
                name: "September",
                short_name: "Sep",
                numeric: "09",
                days: 30
            },
            {
                name: "October",
                short_name: "Oct",
                numeric: "10",
                days: 31
            },
            {
                name: "November",
                short_name: "Nov",
                numeric: "11",
                days: 30
            },
            {
                name: "December",
                short_name: "Dec",
                numeric: "12",
                days: 31
            }
        ],
        cc_types: [
            {
                name: "American Express",
                short_name: "amex",
                prefix: "34",
                length: 15
            },
            {
                name: "Bankcard",
                short_name: "bankcard",
                prefix: "5610",
                length: 16
            },
            {
                name: "China UnionPay",
                short_name: "chinaunion",
                prefix: "62",
                length: 16
            },
            {
                name: "Diners Club Carte Blanche",
                short_name: "dccarte",
                prefix: "300",
                length: 14
            },
            {
                name: "Diners Club enRoute",
                short_name: "dcenroute",
                prefix: "2014",
                length: 15
            },
            {
                name: "Diners Club International",
                short_name: "dcintl",
                prefix: "36",
                length: 14
            },
            {
                name: "Diners Club United States & Canada",
                short_name: "dcusc",
                prefix: "54",
                length: 16
            },
            {
                name: "Discover Card",
                short_name: "discover",
                prefix: "6011",
                length: 16
            },
            {
                name: "InstaPayment",
                short_name: "instapay",
                prefix: "637",
                length: 16
            },
            {
                name: "JCB",
                short_name: "jcb",
                prefix: "3528",
                length: 16
            },
            {
                name: "Laser",
                short_name: "laser",
                prefix: "6304",
                length: 16
            },
            {
                name: "Maestro",
                short_name: "maestro",
                prefix: "5018",
                length: 16
            },
            {
                name: "Mastercard",
                short_name: "mc",
                prefix: "51",
                length: 16
            },
            {
                name: "Solo",
                short_name: "solo",
                prefix: "6334",
                length: 16
            },
            {
                name: "Switch",
                short_name: "switch",
                prefix: "4903",
                length: 16
            },
            {
                name: "Visa",
                short_name: "visa",
                prefix: "4",
                length: 16
            },
            {
                name: "Visa Electron",
                short_name: "electron",
                prefix: "4026",
                length: 16
            }
        ],
        currency_types: [
            {
                code: "AED",
                name: "United Arab Emirates Dirham"
            },
            {
                code: "AFN",
                name: "Afghanistan Afghani"
            },
            {
                code: "ALL",
                name: "Albania Lek"
            },
            {
                code: "AMD",
                name: "Armenia Dram"
            },
            {
                code: "ANG",
                name: "Netherlands Antilles Guilder"
            },
            {
                code: "AOA",
                name: "Angola Kwanza"
            },
            {
                code: "ARS",
                name: "Argentina Peso"
            },
            {
                code: "AUD",
                name: "Australia Dollar"
            },
            {
                code: "AWG",
                name: "Aruba Guilder"
            },
            {
                code: "AZN",
                name: "Azerbaijan New Manat"
            },
            {
                code: "BAM",
                name: "Bosnia and Herzegovina Convertible Marka"
            },
            {
                code: "BBD",
                name: "Barbados Dollar"
            },
            {
                code: "BDT",
                name: "Bangladesh Taka"
            },
            {
                code: "BGN",
                name: "Bulgaria Lev"
            },
            {
                code: "BHD",
                name: "Bahrain Dinar"
            },
            {
                code: "BIF",
                name: "Burundi Franc"
            },
            {
                code: "BMD",
                name: "Bermuda Dollar"
            },
            {
                code: "BND",
                name: "Brunei Darussalam Dollar"
            },
            {
                code: "BOB",
                name: "Bolivia Boliviano"
            },
            {
                code: "BRL",
                name: "Brazil Real"
            },
            {
                code: "BSD",
                name: "Bahamas Dollar"
            },
            {
                code: "BTN",
                name: "Bhutan Ngultrum"
            },
            {
                code: "BWP",
                name: "Botswana Pula"
            },
            {
                code: "BYR",
                name: "Belarus Ruble"
            },
            {
                code: "BZD",
                name: "Belize Dollar"
            },
            {
                code: "CAD",
                name: "Canada Dollar"
            },
            {
                code: "CDF",
                name: "Congo/Kinshasa Franc"
            },
            {
                code: "CHF",
                name: "Switzerland Franc"
            },
            {
                code: "CLP",
                name: "Chile Peso"
            },
            {
                code: "CNY",
                name: "China Yuan Renminbi"
            },
            {
                code: "COP",
                name: "Colombia Peso"
            },
            {
                code: "CRC",
                name: "Costa Rica Colon"
            },
            {
                code: "CUC",
                name: "Cuba Convertible Peso"
            },
            {
                code: "CUP",
                name: "Cuba Peso"
            },
            {
                code: "CVE",
                name: "Cape Verde Escudo"
            },
            {
                code: "CZK",
                name: "Czech Republic Koruna"
            },
            {
                code: "DJF",
                name: "Djibouti Franc"
            },
            {
                code: "DKK",
                name: "Denmark Krone"
            },
            {
                code: "DOP",
                name: "Dominican Republic Peso"
            },
            {
                code: "DZD",
                name: "Algeria Dinar"
            },
            {
                code: "EGP",
                name: "Egypt Pound"
            },
            {
                code: "ERN",
                name: "Eritrea Nakfa"
            },
            {
                code: "ETB",
                name: "Ethiopia Birr"
            },
            {
                code: "EUR",
                name: "Euro Member Countries"
            },
            {
                code: "FJD",
                name: "Fiji Dollar"
            },
            {
                code: "FKP",
                name: "Falkland Islands (Malvinas) Pound"
            },
            {
                code: "GBP",
                name: "United Kingdom Pound"
            },
            {
                code: "GEL",
                name: "Georgia Lari"
            },
            {
                code: "GGP",
                name: "Guernsey Pound"
            },
            {
                code: "GHS",
                name: "Ghana Cedi"
            },
            {
                code: "GIP",
                name: "Gibraltar Pound"
            },
            {
                code: "GMD",
                name: "Gambia Dalasi"
            },
            {
                code: "GNF",
                name: "Guinea Franc"
            },
            {
                code: "GTQ",
                name: "Guatemala Quetzal"
            },
            {
                code: "GYD",
                name: "Guyana Dollar"
            },
            {
                code: "HKD",
                name: "Hong Kong Dollar"
            },
            {
                code: "HNL",
                name: "Honduras Lempira"
            },
            {
                code: "HRK",
                name: "Croatia Kuna"
            },
            {
                code: "HTG",
                name: "Haiti Gourde"
            },
            {
                code: "HUF",
                name: "Hungary Forint"
            },
            {
                code: "IDR",
                name: "Indonesia Rupiah"
            },
            {
                code: "ILS",
                name: "Israel Shekel"
            },
            {
                code: "IMP",
                name: "Isle of Man Pound"
            },
            {
                code: "INR",
                name: "India Rupee"
            },
            {
                code: "IQD",
                name: "Iraq Dinar"
            },
            {
                code: "IRR",
                name: "Iran Rial"
            },
            {
                code: "ISK",
                name: "Iceland Krona"
            },
            {
                code: "JEP",
                name: "Jersey Pound"
            },
            {
                code: "JMD",
                name: "Jamaica Dollar"
            },
            {
                code: "JOD",
                name: "Jordan Dinar"
            },
            {
                code: "JPY",
                name: "Japan Yen"
            },
            {
                code: "KES",
                name: "Kenya Shilling"
            },
            {
                code: "KGS",
                name: "Kyrgyzstan Som"
            },
            {
                code: "KHR",
                name: "Cambodia Riel"
            },
            {
                code: "KMF",
                name: "Comoros Franc"
            },
            {
                code: "KPW",
                name: "Korea (North) Won"
            },
            {
                code: "KRW",
                name: "Korea (South) Won"
            },
            {
                code: "KWD",
                name: "Kuwait Dinar"
            },
            {
                code: "KYD",
                name: "Cayman Islands Dollar"
            },
            {
                code: "KZT",
                name: "Kazakhstan Tenge"
            },
            {
                code: "LAK",
                name: "Laos Kip"
            },
            {
                code: "LBP",
                name: "Lebanon Pound"
            },
            {
                code: "LKR",
                name: "Sri Lanka Rupee"
            },
            {
                code: "LRD",
                name: "Liberia Dollar"
            },
            {
                code: "LSL",
                name: "Lesotho Loti"
            },
            {
                code: "LTL",
                name: "Lithuania Litas"
            },
            {
                code: "LYD",
                name: "Libya Dinar"
            },
            {
                code: "MAD",
                name: "Morocco Dirham"
            },
            {
                code: "MDL",
                name: "Moldova Leu"
            },
            {
                code: "MGA",
                name: "Madagascar Ariary"
            },
            {
                code: "MKD",
                name: "Macedonia Denar"
            },
            {
                code: "MMK",
                name: "Myanmar (Burma) Kyat"
            },
            {
                code: "MNT",
                name: "Mongolia Tughrik"
            },
            {
                code: "MOP",
                name: "Macau Pataca"
            },
            {
                code: "MRO",
                name: "Mauritania Ouguiya"
            },
            {
                code: "MUR",
                name: "Mauritius Rupee"
            },
            {
                code: "MVR",
                name: "Maldives (Maldive Islands) Rufiyaa"
            },
            {
                code: "MWK",
                name: "Malawi Kwacha"
            },
            {
                code: "MXN",
                name: "Mexico Peso"
            },
            {
                code: "MYR",
                name: "Malaysia Ringgit"
            },
            {
                code: "MZN",
                name: "Mozambique Metical"
            },
            {
                code: "NAD",
                name: "Namibia Dollar"
            },
            {
                code: "NGN",
                name: "Nigeria Naira"
            },
            {
                code: "NIO",
                name: "Nicaragua Cordoba"
            },
            {
                code: "NOK",
                name: "Norway Krone"
            },
            {
                code: "NPR",
                name: "Nepal Rupee"
            },
            {
                code: "NZD",
                name: "New Zealand Dollar"
            },
            {
                code: "OMR",
                name: "Oman Rial"
            },
            {
                code: "PAB",
                name: "Panama Balboa"
            },
            {
                code: "PEN",
                name: "Peru Nuevo Sol"
            },
            {
                code: "PGK",
                name: "Papua New Guinea Kina"
            },
            {
                code: "PHP",
                name: "Philippines Peso"
            },
            {
                code: "PKR",
                name: "Pakistan Rupee"
            },
            {
                code: "PLN",
                name: "Poland Zloty"
            },
            {
                code: "PYG",
                name: "Paraguay Guarani"
            },
            {
                code: "QAR",
                name: "Qatar Riyal"
            },
            {
                code: "RON",
                name: "Romania New Leu"
            },
            {
                code: "RSD",
                name: "Serbia Dinar"
            },
            {
                code: "RUB",
                name: "Russia Ruble"
            },
            {
                code: "RWF",
                name: "Rwanda Franc"
            },
            {
                code: "SAR",
                name: "Saudi Arabia Riyal"
            },
            {
                code: "SBD",
                name: "Solomon Islands Dollar"
            },
            {
                code: "SCR",
                name: "Seychelles Rupee"
            },
            {
                code: "SDG",
                name: "Sudan Pound"
            },
            {
                code: "SEK",
                name: "Sweden Krona"
            },
            {
                code: "SGD",
                name: "Singapore Dollar"
            },
            {
                code: "SHP",
                name: "Saint Helena Pound"
            },
            {
                code: "SLL",
                name: "Sierra Leone Leone"
            },
            {
                code: "SOS",
                name: "Somalia Shilling"
            },
            {
                code: "SPL",
                name: "Seborga Luigino"
            },
            {
                code: "SRD",
                name: "Suriname Dollar"
            },
            {
                code: "STD",
                name: "São Tomé and Príncipe Dobra"
            },
            {
                code: "SVC",
                name: "El Salvador Colon"
            },
            {
                code: "SYP",
                name: "Syria Pound"
            },
            {
                code: "SZL",
                name: "Swaziland Lilangeni"
            },
            {
                code: "THB",
                name: "Thailand Baht"
            },
            {
                code: "TJS",
                name: "Tajikistan Somoni"
            },
            {
                code: "TMT",
                name: "Turkmenistan Manat"
            },
            {
                code: "TND",
                name: "Tunisia Dinar"
            },
            {
                code: "TOP",
                name: "Tonga Pa'anga"
            },
            {
                code: "TRY",
                name: "Turkey Lira"
            },
            {
                code: "TTD",
                name: "Trinidad and Tobago Dollar"
            },
            {
                code: "TVD",
                name: "Tuvalu Dollar"
            },
            {
                code: "TWD",
                name: "Taiwan New Dollar"
            },
            {
                code: "TZS",
                name: "Tanzania Shilling"
            },
            {
                code: "UAH",
                name: "Ukraine Hryvnia"
            },
            {
                code: "UGX",
                name: "Uganda Shilling"
            },
            {
                code: "USD",
                name: "United States Dollar"
            },
            {
                code: "UYU",
                name: "Uruguay Peso"
            },
            {
                code: "UZS",
                name: "Uzbekistan Som"
            },
            {
                code: "VEF",
                name: "Venezuela Bolivar"
            },
            {
                code: "VND",
                name: "Viet Nam Dong"
            },
            {
                code: "VUV",
                name: "Vanuatu Vatu"
            },
            {
                code: "WST",
                name: "Samoa Tala"
            },
            {
                code: "XAF",
                name: "Communauté Financière Africaine (BEAC) CFA Franc BEAC"
            },
            {
                code: "XCD",
                name: "East Caribbean Dollar"
            },
            {
                code: "XDR",
                name: "International Monetary Fund (IMF) Special Drawing Rights"
            },
            {
                code: "XOF",
                name: "Communauté Financière Africaine (BCEAO) Franc"
            },
            {
                code: "XPF",
                name: "Comptoirs Français du Pacifique (CFP) Franc"
            },
            {
                code: "YER",
                name: "Yemen Rial"
            },
            {
                code: "ZAR",
                name: "South Africa Rand"
            },
            {
                code: "ZMW",
                name: "Zambia Kwacha"
            },
            {
                code: "ZWD",
                name: "Zimbabwe Dollar"
            }
        ],
        colorNames: [
            "AliceBlue",
            "Black",
            "Navy",
            "DarkBlue",
            "MediumBlue",
            "Blue",
            "DarkGreen",
            "Green",
            "Teal",
            "DarkCyan",
            "DeepSkyBlue",
            "DarkTurquoise",
            "MediumSpringGreen",
            "Lime",
            "SpringGreen",
            "Aqua",
            "Cyan",
            "MidnightBlue",
            "DodgerBlue",
            "LightSeaGreen",
            "ForestGreen",
            "SeaGreen",
            "DarkSlateGray",
            "LimeGreen",
            "MediumSeaGreen",
            "Turquoise",
            "RoyalBlue",
            "SteelBlue",
            "DarkSlateBlue",
            "MediumTurquoise",
            "Indigo",
            "DarkOliveGreen",
            "CadetBlue",
            "CornflowerBlue",
            "RebeccaPurple",
            "MediumAquaMarine",
            "DimGray",
            "SlateBlue",
            "OliveDrab",
            "SlateGray",
            "LightSlateGray",
            "MediumSlateBlue",
            "LawnGreen",
            "Chartreuse",
            "Aquamarine",
            "Maroon",
            "Purple",
            "Olive",
            "Gray",
            "SkyBlue",
            "LightSkyBlue",
            "BlueViolet",
            "DarkRed",
            "DarkMagenta",
            "SaddleBrown",
            "Ivory",
            "White",
            "DarkSeaGreen",
            "LightGreen",
            "MediumPurple",
            "DarkViolet",
            "PaleGreen",
            "DarkOrchid",
            "YellowGreen",
            "Sienna",
            "Brown",
            "DarkGray",
            "LightBlue",
            "GreenYellow",
            "PaleTurquoise",
            "LightSteelBlue",
            "PowderBlue",
            "FireBrick",
            "DarkGoldenRod",
            "MediumOrchid",
            "RosyBrown",
            "DarkKhaki",
            "Silver",
            "MediumVioletRed",
            "IndianRed",
            "Peru",
            "Chocolate",
            "Tan",
            "LightGray",
            "Thistle",
            "Orchid",
            "GoldenRod",
            "PaleVioletRed",
            "Crimson",
            "Gainsboro",
            "Plum",
            "BurlyWood",
            "LightCyan",
            "Lavender",
            "DarkSalmon",
            "Violet",
            "PaleGoldenRod",
            "LightCoral",
            "Khaki",
            "AliceBlue",
            "HoneyDew",
            "Azure",
            "SandyBrown",
            "Wheat",
            "Beige",
            "WhiteSmoke",
            "MintCream",
            "GhostWhite",
            "Salmon",
            "AntiqueWhite",
            "Linen",
            "LightGoldenRodYellow",
            "OldLace",
            "Red",
            "Fuchsia",
            "Magenta",
            "DeepPink",
            "OrangeRed",
            "Tomato",
            "HotPink",
            "Coral",
            "DarkOrange",
            "LightSalmon",
            "Orange",
            "LightPink",
            "Pink",
            "Gold",
            "PeachPuff",
            "NavajoWhite",
            "Moccasin",
            "Bisque",
            "MistyRose",
            "BlanchedAlmond",
            "PapayaWhip",
            "LavenderBlush",
            "SeaShell",
            "Cornsilk",
            "LemonChiffon",
            "FloralWhite",
            "Snow",
            "Yellow",
            "LightYellow"
        ],
        company: [
            "3Com Corp",
            "3M Company",
            "A.G. Edwards Inc.",
            "Abbott Laboratories",
            "Abercrombie & Fitch Co.",
            "ABM Industries Incorporated",
            "Ace Hardware Corporation",
            "ACT Manufacturing Inc.",
            "Acterna Corp.",
            "Adams Resources & Energy, Inc.",
            "ADC Telecommunications, Inc.",
            "Adelphia Communications Corporation",
            "Administaff, Inc.",
            "Adobe Systems Incorporated",
            "Adolph Coors Company",
            "Advance Auto Parts, Inc.",
            "Advanced Micro Devices, Inc.",
            "AdvancePCS, Inc.",
            "Advantica Restaurant Group, Inc.",
            "The AES Corporation",
            "Aetna Inc.",
            "Affiliated Computer Services, Inc.",
            "AFLAC Incorporated",
            "AGCO Corporation",
            "Agilent Technologies, Inc.",
            "Agway Inc.",
            "Apartment Investment and Management Company",
            "Air Products and Chemicals, Inc.",
            "Airborne, Inc.",
            "Airgas, Inc.",
            "AK Steel Holding Corporation",
            "Alaska Air Group, Inc.",
            "Alberto-Culver Company",
            "Albertson's, Inc.",
            "Alcoa Inc.",
            "Alleghany Corporation",
            "Allegheny Energy, Inc.",
            "Allegheny Technologies Incorporated",
            "Allergan, Inc.",
            "ALLETE, Inc.",
            "Alliant Energy Corporation",
            "Allied Waste Industries, Inc.",
            "Allmerica Financial Corporation",
            "The Allstate Corporation",
            "ALLTEL Corporation",
            "The Alpine Group, Inc.",
            "Amazon.com, Inc.",
            "AMC Entertainment Inc.",
            "American Power Conversion Corporation",
            "Amerada Hess Corporation",
            "AMERCO",
            "Ameren Corporation",
            "America West Holdings Corporation",
            "American Axle & Manufacturing Holdings, Inc.",
            "American Eagle Outfitters, Inc.",
            "American Electric Power Company, Inc.",
            "American Express Company",
            "American Financial Group, Inc.",
            "American Greetings Corporation",
            "American International Group, Inc.",
            "American Standard Companies Inc.",
            "American Water Works Company, Inc.",
            "AmerisourceBergen Corporation",
            "Ames Department Stores, Inc.",
            "Amgen Inc.",
            "Amkor Technology, Inc.",
            "AMR Corporation",
            "AmSouth Bancorp.",
            "Amtran, Inc.",
            "Anadarko Petroleum Corporation",
            "Analog Devices, Inc.",
            "Anheuser-Busch Companies, Inc.",
            "Anixter International Inc.",
            "AnnTaylor Inc.",
            "Anthem, Inc.",
            "AOL Time Warner Inc.",
            "Aon Corporation",
            "Apache Corporation",
            "Apple Computer, Inc.",
            "Applera Corporation",
            "Applied Industrial Technologies, Inc.",
            "Applied Materials, Inc.",
            "Aquila, Inc.",
            "ARAMARK Corporation",
            "Arch Coal, Inc.",
            "Archer Daniels Midland Company",
            "Arkansas Best Corporation",
            "Armstrong Holdings, Inc.",
            "Arrow Electronics, Inc.",
            "ArvinMeritor, Inc.",
            "Ashland Inc.",
            "Astoria Financial Corporation",
            "AT&T Corp.",
            "Atmel Corporation",
            "Atmos Energy Corporation",
            "Audiovox Corporation",
            "Autoliv, Inc.",
            "Automatic Data Processing, Inc.",
            "AutoNation, Inc.",
            "AutoZone, Inc.",
            "Avaya Inc.",
            "Avery Dennison Corporation",
            "Avista Corporation",
            "Avnet, Inc.",
            "Avon Products, Inc.",
            "Baker Hughes Incorporated",
            "Ball Corporation",
            "Bank of America Corporation",
            "The Bank of New York Company, Inc.",
            "Bank One Corporation",
            "Banknorth Group, Inc.",
            "Banta Corporation",
            "Barnes & Noble, Inc.",
            "Bausch & Lomb Incorporated",
            "Baxter International Inc.",
            "BB&T Corporation",
            "The Bear Stearns Companies Inc.",
            "Beazer Homes USA, Inc.",
            "Beckman Coulter, Inc.",
            "Becton, Dickinson and Company",
            "Bed Bath & Beyond Inc.",
            "Belk, Inc.",
            "Bell Microproducts Inc.",
            "BellSouth Corporation",
            "Belo Corp.",
            "Bemis Company, Inc.",
            "Benchmark Electronics, Inc.",
            "Berkshire Hathaway Inc.",
            "Best Buy Co., Inc.",
            "Bethlehem Steel Corporation",
            "Beverly Enterprises, Inc.",
            "Big Lots, Inc.",
            "BJ Services Company",
            "BJ's Wholesale Club, Inc.",
            "The Black & Decker Corporation",
            "Black Hills Corporation",
            "BMC Software, Inc.",
            "The Boeing Company",
            "Boise Cascade Corporation",
            "Borders Group, Inc.",
            "BorgWarner Inc.",
            "Boston Scientific Corporation",
            "Bowater Incorporated",
            "Briggs & Stratton Corporation",
            "Brightpoint, Inc.",
            "Brinker International, Inc.",
            "Bristol-Myers Squibb Company",
            "Broadwing, Inc.",
            "Brown Shoe Company, Inc.",
            "Brown-Forman Corporation",
            "Brunswick Corporation",
            "Budget Group, Inc.",
            "Burlington Coat Factory Warehouse Corporation",
            "Burlington Industries, Inc.",
            "Burlington Northern Santa Fe Corporation",
            "Burlington Resources Inc.",
            "C. H. Robinson Worldwide Inc.",
            "Cablevision Systems Corp",
            "Cabot Corp",
            "Cadence Design Systems, Inc.",
            "Calpine Corp.",
            "Campbell Soup Co.",
            "Capital One Financial Corp.",
            "Cardinal Health Inc.",
            "Caremark Rx Inc.",
            "Carlisle Cos. Inc.",
            "Carpenter Technology Corp.",
            "Casey's General Stores Inc.",
            "Caterpillar Inc.",
            "CBRL Group Inc.",
            "CDI Corp.",
            "CDW Computer Centers Inc.",
            "CellStar Corp.",
            "Cendant Corp",
            "Cenex Harvest States Cooperatives",
            "Centex Corp.",
            "CenturyTel Inc.",
            "Ceridian Corp.",
            "CH2M Hill Cos. Ltd.",
            "Champion Enterprises Inc.",
            "Charles Schwab Corp.",
            "Charming Shoppes Inc.",
            "Charter Communications Inc.",
            "Charter One Financial Inc.",
            "ChevronTexaco Corp.",
            "Chiquita Brands International Inc.",
            "Chubb Corp",
            "Ciena Corp.",
            "Cigna Corp",
            "Cincinnati Financial Corp.",
            "Cinergy Corp.",
            "Cintas Corp.",
            "Circuit City Stores Inc.",
            "Cisco Systems Inc.",
            "Citigroup, Inc",
            "Citizens Communications Co.",
            "CKE Restaurants Inc.",
            "Clear Channel Communications Inc.",
            "The Clorox Co.",
            "CMGI Inc.",
            "CMS Energy Corp.",
            "CNF Inc.",
            "Coca-Cola Co.",
            "Coca-Cola Enterprises Inc.",
            "Colgate-Palmolive Co.",
            "Collins & Aikman Corp.",
            "Comcast Corp.",
            "Comdisco Inc.",
            "Comerica Inc.",
            "Comfort Systems USA Inc.",
            "Commercial Metals Co.",
            "Community Health Systems Inc.",
            "Compass Bancshares Inc",
            "Computer Associates International Inc.",
            "Computer Sciences Corp.",
            "Compuware Corp.",
            "Comverse Technology Inc.",
            "ConAgra Foods Inc.",
            "Concord EFS Inc.",
            "Conectiv, Inc",
            "Conoco Inc",
            "Conseco Inc.",
            "Consolidated Freightways Corp.",
            "Consolidated Edison Inc.",
            "Constellation Brands Inc.",
            "Constellation Emergy Group Inc.",
            "Continental Airlines Inc.",
            "Convergys Corp.",
            "Cooper Cameron Corp.",
            "Cooper Industries Ltd.",
            "Cooper Tire & Rubber Co.",
            "Corn Products International Inc.",
            "Corning Inc.",
            "Costco Wholesale Corp.",
            "Countrywide Credit Industries Inc.",
            "Coventry Health Care Inc.",
            "Cox Communications Inc.",
            "Crane Co.",
            "Crompton Corp.",
            "Crown Cork & Seal Co. Inc.",
            "CSK Auto Corp.",
            "CSX Corp.",
            "Cummins Inc.",
            "CVS Corp.",
            "Cytec Industries Inc.",
            "D&K Healthcare Resources, Inc.",
            "D.R. Horton Inc.",
            "Dana Corporation",
            "Danaher Corporation",
            "Darden Restaurants Inc.",
            "DaVita Inc.",
            "Dean Foods Company",
            "Deere & Company",
            "Del Monte Foods Co",
            "Dell Computer Corporation",
            "Delphi Corp.",
            "Delta Air Lines Inc.",
            "Deluxe Corporation",
            "Devon Energy Corporation",
            "Di Giorgio Corporation",
            "Dial Corporation",
            "Diebold Incorporated",
            "Dillard's Inc.",
            "DIMON Incorporated",
            "Dole Food Company, Inc.",
            "Dollar General Corporation",
            "Dollar Tree Stores, Inc.",
            "Dominion Resources, Inc.",
            "Domino's Pizza LLC",
            "Dover Corporation, Inc.",
            "Dow Chemical Company",
            "Dow Jones & Company, Inc.",
            "DPL Inc.",
            "DQE Inc.",
            "Dreyer's Grand Ice Cream, Inc.",
            "DST Systems, Inc.",
            "DTE Energy Co.",
            "E.I. Du Pont de Nemours and Company",
            "Duke Energy Corp",
            "Dun & Bradstreet Inc.",
            "DURA Automotive Systems Inc.",
            "DynCorp",
            "Dynegy Inc.",
            "E*Trade Group, Inc.",
            "E.W. Scripps Company",
            "Earthlink, Inc.",
            "Eastman Chemical Company",
            "Eastman Kodak Company",
            "Eaton Corporation",
            "Echostar Communications Corporation",
            "Ecolab Inc.",
            "Edison International",
            "EGL Inc.",
            "El Paso Corporation",
            "Electronic Arts Inc.",
            "Electronic Data Systems Corp.",
            "Eli Lilly and Company",
            "EMC Corporation",
            "Emcor Group Inc.",
            "Emerson Electric Co.",
            "Encompass Services Corporation",
            "Energizer Holdings Inc.",
            "Energy East Corporation",
            "Engelhard Corporation",
            "Enron Corp.",
            "Entergy Corporation",
            "Enterprise Products Partners L.P.",
            "EOG Resources, Inc.",
            "Equifax Inc.",
            "Equitable Resources Inc.",
            "Equity Office Properties Trust",
            "Equity Residential Properties Trust",
            "Estee Lauder Companies Inc.",
            "Exelon Corporation",
            "Exide Technologies",
            "Expeditors International of Washington Inc.",
            "Express Scripts Inc.",
            "ExxonMobil Corporation",
            "Fairchild Semiconductor International Inc.",
            "Family Dollar Stores Inc.",
            "Farmland Industries Inc.",
            "Federal Mogul Corp.",
            "Federated Department Stores Inc.",
            "Federal Express Corp.",
            "Felcor Lodging Trust Inc.",
            "Ferro Corp.",
            "Fidelity National Financial Inc.",
            "Fifth Third Bancorp",
            "First American Financial Corp.",
            "First Data Corp.",
            "First National of Nebraska Inc.",
            "First Tennessee National Corp.",
            "FirstEnergy Corp.",
            "Fiserv Inc.",
            "Fisher Scientific International Inc.",
            "FleetBoston Financial Co.",
            "Fleetwood Enterprises Inc.",
            "Fleming Companies Inc.",
            "Flowers Foods Inc.",
            "Flowserv Corp",
            "Fluor Corp",
            "FMC Corp",
            "Foamex International Inc",
            "Foot Locker Inc",
            "Footstar Inc.",
            "Ford Motor Co",
            "Forest Laboratories Inc.",
            "Fortune Brands Inc.",
            "Foster Wheeler Ltd.",
            "FPL Group Inc.",
            "Franklin Resources Inc.",
            "Freeport McMoran Copper & Gold Inc.",
            "Frontier Oil Corp",
            "Furniture Brands International Inc.",
            "Gannett Co., Inc.",
            "Gap Inc.",
            "Gateway Inc.",
            "GATX Corporation",
            "Gemstar-TV Guide International Inc.",
            "GenCorp Inc.",
            "General Cable Corporation",
            "General Dynamics Corporation",
            "General Electric Company",
            "General Mills Inc",
            "General Motors Corporation",
            "Genesis Health Ventures Inc.",
            "Gentek Inc.",
            "Gentiva Health Services Inc.",
            "Genuine Parts Company",
            "Genuity Inc.",
            "Genzyme Corporation",
            "Georgia Gulf Corporation",
            "Georgia-Pacific Corporation",
            "Gillette Company",
            "Gold Kist Inc.",
            "Golden State Bancorp Inc.",
            "Golden West Financial Corporation",
            "Goldman Sachs Group Inc.",
            "Goodrich Corporation",
            "The Goodyear Tire & Rubber Company",
            "Granite Construction Incorporated",
            "Graybar Electric Company Inc.",
            "Great Lakes Chemical Corporation",
            "Great Plains Energy Inc.",
            "GreenPoint Financial Corp.",
            "Greif Bros. Corporation",
            "Grey Global Group Inc.",
            "Group 1 Automotive Inc.",
            "Guidant Corporation",
            "H&R Block Inc.",
            "H.B. Fuller Company",
            "H.J. Heinz Company",
            "Halliburton Co.",
            "Harley-Davidson Inc.",
            "Harman International Industries Inc.",
            "Harrah's Entertainment Inc.",
            "Harris Corp.",
            "Harsco Corp.",
            "Hartford Financial Services Group Inc.",
            "Hasbro Inc.",
            "Hawaiian Electric Industries Inc.",
            "HCA Inc.",
            "Health Management Associates Inc.",
            "Health Net Inc.",
            "Healthsouth Corp",
            "Henry Schein Inc.",
            "Hercules Inc.",
            "Herman Miller Inc.",
            "Hershey Foods Corp.",
            "Hewlett-Packard Company",
            "Hibernia Corp.",
            "Hillenbrand Industries Inc.",
            "Hilton Hotels Corp.",
            "Hollywood Entertainment Corp.",
            "Home Depot Inc.",
            "Hon Industries Inc.",
            "Honeywell International Inc.",
            "Hormel Foods Corp.",
            "Host Marriott Corp.",
            "Household International Corp.",
            "Hovnanian Enterprises Inc.",
            "Hub Group Inc.",
            "Hubbell Inc.",
            "Hughes Supply Inc.",
            "Humana Inc.",
            "Huntington Bancshares Inc.",
            "Idacorp Inc.",
            "IDT Corporation",
            "IKON Office Solutions Inc.",
            "Illinois Tool Works Inc.",
            "IMC Global Inc.",
            "Imperial Sugar Company",
            "IMS Health Inc.",
            "Ingles Market Inc",
            "Ingram Micro Inc.",
            "Insight Enterprises Inc.",
            "Integrated Electrical Services Inc.",
            "Intel Corporation",
            "International Paper Co.",
            "Interpublic Group of Companies Inc.",
            "Interstate Bakeries Corporation",
            "International Business Machines Corp.",
            "International Flavors & Fragrances Inc.",
            "International Multifoods Corporation",
            "Intuit Inc.",
            "IT Group Inc.",
            "ITT Industries Inc.",
            "Ivax Corp.",
            "J.B. Hunt Transport Services Inc.",
            "J.C. Penny Co.",
            "J.P. Morgan Chase & Co.",
            "Jabil Circuit Inc.",
            "Jack In The Box Inc.",
            "Jacobs Engineering Group Inc.",
            "JDS Uniphase Corp.",
            "Jefferson-Pilot Co.",
            "John Hancock Financial Services Inc.",
            "Johnson & Johnson",
            "Johnson Controls Inc.",
            "Jones Apparel Group Inc.",
            "KB Home",
            "Kellogg Company",
            "Kellwood Company",
            "Kelly Services Inc.",
            "Kemet Corp.",
            "Kennametal Inc.",
            "Kerr-McGee Corporation",
            "KeyCorp",
            "KeySpan Corp.",
            "Kimball International Inc.",
            "Kimberly-Clark Corporation",
            "Kindred Healthcare Inc.",
            "KLA-Tencor Corporation",
            "K-Mart Corp.",
            "Knight-Ridder Inc.",
            "Kohl's Corp.",
            "KPMG Consulting Inc.",
            "Kroger Co.",
            "L-3 Communications Holdings Inc.",
            "Laboratory Corporation of America Holdings",
            "Lam Research Corporation",
            "LandAmerica Financial Group Inc.",
            "Lands' End Inc.",
            "Landstar System Inc.",
            "La-Z-Boy Inc.",
            "Lear Corporation",
            "Legg Mason Inc.",
            "Leggett & Platt Inc.",
            "Lehman Brothers Holdings Inc.",
            "Lennar Corporation",
            "Lennox International Inc.",
            "Level 3 Communications Inc.",
            "Levi Strauss & Co.",
            "Lexmark International Inc.",
            "Limited Inc.",
            "Lincoln National Corporation",
            "Linens 'n Things Inc.",
            "Lithia Motors Inc.",
            "Liz Claiborne Inc.",
            "Lockheed Martin Corporation",
            "Loews Corporation",
            "Longs Drug Stores Corporation",
            "Louisiana-Pacific Corporation",
            "Lowe's Companies Inc.",
            "LSI Logic Corporation",
            "The LTV Corporation",
            "The Lubrizol Corporation",
            "Lucent Technologies Inc.",
            "Lyondell Chemical Company",
            "M & T Bank Corporation",
            "Magellan Health Services Inc.",
            "Mail-Well Inc.",
            "Mandalay Resort Group",
            "Manor Care Inc.",
            "Manpower Inc.",
            "Marathon Oil Corporation",
            "Mariner Health Care Inc.",
            "Markel Corporation",
            "Marriott International Inc.",
            "Marsh & McLennan Companies Inc.",
            "Marsh Supermarkets Inc.",
            "Marshall & Ilsley Corporation",
            "Martin Marietta Materials Inc.",
            "Masco Corporation",
            "Massey Energy Company",
            "MasTec Inc.",
            "Mattel Inc.",
            "Maxim Integrated Products Inc.",
            "Maxtor Corporation",
            "Maxxam Inc.",
            "The May Department Stores Company",
            "Maytag Corporation",
            "MBNA Corporation",
            "McCormick & Company Incorporated",
            "McDonald's Corporation",
            "The McGraw-Hill Companies Inc.",
            "McKesson Corporation",
            "McLeodUSA Incorporated",
            "M.D.C. Holdings Inc.",
            "MDU Resources Group Inc.",
            "MeadWestvaco Corporation",
            "Medtronic Inc.",
            "Mellon Financial Corporation",
            "The Men's Wearhouse Inc.",
            "Merck & Co., Inc.",
            "Mercury General Corporation",
            "Merrill Lynch & Co. Inc.",
            "Metaldyne Corporation",
            "Metals USA Inc.",
            "MetLife Inc.",
            "Metris Companies Inc",
            "MGIC Investment Corporation",
            "MGM Mirage",
            "Michaels Stores Inc.",
            "Micron Technology Inc.",
            "Microsoft Corporation",
            "Milacron Inc.",
            "Millennium Chemicals Inc.",
            "Mirant Corporation",
            "Mohawk Industries Inc.",
            "Molex Incorporated",
            "The MONY Group Inc.",
            "Morgan Stanley Dean Witter & Co.",
            "Motorola Inc.",
            "MPS Group Inc.",
            "Murphy Oil Corporation",
            "Nabors Industries Inc",
            "Nacco Industries Inc",
            "Nash Finch Company",
            "National City Corp.",
            "National Commerce Financial Corporation",
            "National Fuel Gas Company",
            "National Oilwell Inc",
            "National Rural Utilities Cooperative Finance Corporation",
            "National Semiconductor Corporation",
            "National Service Industries Inc",
            "Navistar International Corporation",
            "NCR Corporation",
            "The Neiman Marcus Group Inc.",
            "New Jersey Resources Corporation",
            "New York Times Company",
            "Newell Rubbermaid Inc",
            "Newmont Mining Corporation",
            "Nextel Communications Inc",
            "Nicor Inc",
            "Nike Inc",
            "NiSource Inc",
            "Noble Energy Inc",
            "Nordstrom Inc",
            "Norfolk Southern Corporation",
            "Nortek Inc",
            "North Fork Bancorporation Inc",
            "Northeast Utilities System",
            "Northern Trust Corporation",
            "Northrop Grumman Corporation",
            "NorthWestern Corporation",
            "Novellus Systems Inc",
            "NSTAR",
            "NTL Incorporated",
            "Nucor Corp",
            "Nvidia Corp",
            "NVR Inc",
            "Northwest Airlines Corp",
            "Occidental Petroleum Corp",
            "Ocean Energy Inc",
            "Office Depot Inc.",
            "OfficeMax Inc",
            "OGE Energy Corp",
            "Oglethorpe Power Corp.",
            "Ohio Casualty Corp.",
            "Old Republic International Corp.",
            "Olin Corp.",
            "OM Group Inc",
            "Omnicare Inc",
            "Omnicom Group",
            "On Semiconductor Corp",
            "ONEOK Inc",
            "Oracle Corp",
            "Oshkosh Truck Corp",
            "Outback Steakhouse Inc.",
            "Owens & Minor Inc.",
            "Owens Corning",
            "Owens-Illinois Inc",
            "Oxford Health Plans Inc",
            "Paccar Inc",
            "PacifiCare Health Systems Inc",
            "Packaging Corp. of America",
            "Pactiv Corp",
            "Pall Corp",
            "Pantry Inc",
            "Park Place Entertainment Corp",
            "Parker Hannifin Corp.",
            "Pathmark Stores Inc.",
            "Paychex Inc",
            "Payless Shoesource Inc",
            "Penn Traffic Co.",
            "Pennzoil-Quaker State Company",
            "Pentair Inc",
            "Peoples Energy Corp.",
            "PeopleSoft Inc",
            "Pep Boys Manny, Moe & Jack",
            "Potomac Electric Power Co.",
            "Pepsi Bottling Group Inc.",
            "PepsiAmericas Inc.",
            "PepsiCo Inc.",
            "Performance Food Group Co.",
            "Perini Corp",
            "PerkinElmer Inc",
            "Perot Systems Corp",
            "Petco Animal Supplies Inc.",
            "Peter Kiewit Sons', Inc.",
            "PETsMART Inc",
            "Pfizer Inc",
            "Pacific Gas & Electric Corp.",
            "Pharmacia Corp",
            "Phar Mor Inc.",
            "Phelps Dodge Corp.",
            "Philip Morris Companies Inc.",
            "Phillips Petroleum Co",
            "Phillips Van Heusen Corp.",
            "Phoenix Companies Inc",
            "Pier 1 Imports Inc.",
            "Pilgrim's Pride Corporation",
            "Pinnacle West Capital Corp",
            "Pioneer-Standard Electronics Inc.",
            "Pitney Bowes Inc.",
            "Pittston Brinks Group",
            "Plains All American Pipeline LP",
            "PNC Financial Services Group Inc.",
            "PNM Resources Inc",
            "Polaris Industries Inc.",
            "Polo Ralph Lauren Corp",
            "PolyOne Corp",
            "Popular Inc",
            "Potlatch Corp",
            "PPG Industries Inc",
            "PPL Corp",
            "Praxair Inc",
            "Precision Castparts Corp",
            "Premcor Inc.",
            "Pride International Inc",
            "Primedia Inc",
            "Principal Financial Group Inc.",
            "Procter & Gamble Co.",
            "Pro-Fac Cooperative Inc.",
            "Progress Energy Inc",
            "Progressive Corporation",
            "Protective Life Corp",
            "Provident Financial Group",
            "Providian Financial Corp.",
            "Prudential Financial Inc.",
            "PSS World Medical Inc",
            "Public Service Enterprise Group Inc.",
            "Publix Super Markets Inc.",
            "Puget Energy Inc.",
            "Pulte Homes Inc",
            "Qualcomm Inc",
            "Quanta Services Inc.",
            "Quantum Corp",
            "Quest Diagnostics Inc.",
            "Questar Corp",
            "Quintiles Transnational",
            "Qwest Communications Intl Inc",
            "R.J. Reynolds Tobacco Company",
            "R.R. Donnelley & Sons Company",
            "Radio Shack Corporation",
            "Raymond James Financial Inc.",
            "Raytheon Company",
            "Reader's Digest Association Inc.",
            "Reebok International Ltd.",
            "Regions Financial Corp.",
            "Regis Corporation",
            "Reliance Steel & Aluminum Co.",
            "Reliant Energy Inc.",
            "Rent A Center Inc",
            "Republic Services Inc",
            "Revlon Inc",
            "RGS Energy Group Inc",
            "Rite Aid Corp",
            "Riverwood Holding Inc.",
            "RoadwayCorp",
            "Robert Half International Inc.",
            "Rock-Tenn Co",
            "Rockwell Automation Inc",
            "Rockwell Collins Inc",
            "Rohm & Haas Co.",
            "Ross Stores Inc",
            "RPM Inc.",
            "Ruddick Corp",
            "Ryder System Inc",
            "Ryerson Tull Inc",
            "Ryland Group Inc.",
            "Sabre Holdings Corp",
            "Safeco Corp",
            "Safeguard Scientifics Inc.",
            "Safeway Inc",
            "Saks Inc",
            "Sanmina-SCI Inc",
            "Sara Lee Corp",
            "SBC Communications Inc",
            "Scana Corp.",
            "Schering-Plough Corp",
            "Scholastic Corp",
            "SCI Systems Onc.",
            "Science Applications Intl. Inc.",
            "Scientific-Atlanta Inc",
            "Scotts Company",
            "Seaboard Corp",
            "Sealed Air Corp",
            "Sears Roebuck & Co",
            "Sempra Energy",
            "Sequa Corp",
            "Service Corp. International",
            "ServiceMaster Co",
            "Shaw Group Inc",
            "Sherwin-Williams Company",
            "Shopko Stores Inc",
            "Siebel Systems Inc",
            "Sierra Health Services Inc",
            "Sierra Pacific Resources",
            "Silgan Holdings Inc.",
            "Silicon Graphics Inc",
            "Simon Property Group Inc",
            "SLM Corporation",
            "Smith International Inc",
            "Smithfield Foods Inc",
            "Smurfit-Stone Container Corp",
            "Snap-On Inc",
            "Solectron Corp",
            "Solutia Inc",
            "Sonic Automotive Inc.",
            "Sonoco Products Co.",
            "Southern Company",
            "Southern Union Company",
            "SouthTrust Corp.",
            "Southwest Airlines Co",
            "Southwest Gas Corp",
            "Sovereign Bancorp Inc.",
            "Spartan Stores Inc",
            "Spherion Corp",
            "Sports Authority Inc",
            "Sprint Corp.",
            "SPX Corp",
            "St. Jude Medical Inc",
            "St. Paul Cos.",
            "Staff Leasing Inc.",
            "StanCorp Financial Group Inc",
            "Standard Pacific Corp.",
            "Stanley Works",
            "Staples Inc",
            "Starbucks Corp",
            "Starwood Hotels & Resorts Worldwide Inc",
            "State Street Corp.",
            "Stater Bros. Holdings Inc.",
            "Steelcase Inc",
            "Stein Mart Inc",
            "Stewart & Stevenson Services Inc",
            "Stewart Information Services Corp",
            "Stilwell Financial Inc",
            "Storage Technology Corporation",
            "Stryker Corp",
            "Sun Healthcare Group Inc.",
            "Sun Microsystems Inc.",
            "SunGard Data Systems Inc.",
            "Sunoco Inc.",
            "SunTrust Banks Inc",
            "Supervalu Inc",
            "Swift Transportation, Co., Inc",
            "Symbol Technologies Inc",
            "Synovus Financial Corp.",
            "Sysco Corp",
            "Systemax Inc.",
            "Target Corp.",
            "Tech Data Corporation",
            "TECO Energy Inc",
            "Tecumseh Products Company",
            "Tektronix Inc",
            "Teleflex Incorporated",
            "Telephone & Data Systems Inc",
            "Tellabs Inc.",
            "Temple-Inland Inc",
            "Tenet Healthcare Corporation",
            "Tenneco Automotive Inc.",
            "Teradyne Inc",
            "Terex Corp",
            "Tesoro Petroleum Corp.",
            "Texas Industries Inc.",
            "Texas Instruments Incorporated",
            "Textron Inc",
            "Thermo Electron Corporation",
            "Thomas & Betts Corporation",
            "Tiffany & Co",
            "Timken Company",
            "TJX Companies Inc",
            "TMP Worldwide Inc",
            "Toll Brothers Inc",
            "Torchmark Corporation",
            "Toro Company",
            "Tower Automotive Inc.",
            "Toys 'R' Us Inc",
            "Trans World Entertainment Corp.",
            "TransMontaigne Inc",
            "Transocean Inc",
            "TravelCenters of America Inc.",
            "Triad Hospitals Inc",
            "Tribune Company",
            "Trigon Healthcare Inc.",
            "Trinity Industries Inc",
            "Trump Hotels & Casino Resorts Inc.",
            "TruServ Corporation",
            "TRW Inc",
            "TXU Corp",
            "Tyson Foods Inc",
            "U.S. Bancorp",
            "U.S. Industries Inc.",
            "UAL Corporation",
            "UGI Corporation",
            "Unified Western Grocers Inc",
            "Union Pacific Corporation",
            "Union Planters Corp",
            "Unisource Energy Corp",
            "Unisys Corporation",
            "United Auto Group Inc",
            "United Defense Industries Inc.",
            "United Parcel Service Inc",
            "United Rentals Inc",
            "United Stationers Inc",
            "United Technologies Corporation",
            "UnitedHealth Group Incorporated",
            "Unitrin Inc",
            "Universal Corporation",
            "Universal Forest Products Inc",
            "Universal Health Services Inc",
            "Unocal Corporation",
            "Unova Inc",
            "UnumProvident Corporation",
            "URS Corporation",
            "US Airways Group Inc",
            "US Oncology Inc",
            "USA Interactive",
            "USFreighways Corporation",
            "USG Corporation",
            "UST Inc",
            "Valero Energy Corporation",
            "Valspar Corporation",
            "Value City Department Stores Inc",
            "Varco International Inc",
            "Vectren Corporation",
            "Veritas Software Corporation",
            "Verizon Communications Inc",
            "VF Corporation",
            "Viacom Inc",
            "Viad Corp",
            "Viasystems Group Inc",
            "Vishay Intertechnology Inc",
            "Visteon Corporation",
            "Volt Information Sciences Inc",
            "Vulcan Materials Company",
            "W.R. Berkley Corporation",
            "W.R. Grace & Co",
            "W.W. Grainger Inc",
            "Wachovia Corporation",
            "Wakenhut Corporation",
            "Walgreen Co",
            "Wallace Computer Services Inc",
            "Wal-Mart Stores Inc",
            "Walt Disney Co",
            "Walter Industries Inc",
            "Washington Mutual Inc",
            "Washington Post Co.",
            "Waste Management Inc",
            "Watsco Inc",
            "Weatherford International Inc",
            "Weis Markets Inc.",
            "Wellpoint Health Networks Inc",
            "Wells Fargo & Company",
            "Wendy's International Inc",
            "Werner Enterprises Inc",
            "WESCO International Inc",
            "Western Digital Inc",
            "Western Gas Resources Inc",
            "WestPoint Stevens Inc",
            "Weyerhauser Company",
            "WGL Holdings Inc",
            "Whirlpool Corporation",
            "Whole Foods Market Inc",
            "Willamette Industries Inc.",
            "Williams Companies Inc",
            "Williams Sonoma Inc",
            "Winn Dixie Stores Inc",
            "Wisconsin Energy Corporation",
            "Wm Wrigley Jr Company",
            "World Fuel Services Corporation",
            "WorldCom Inc",
            "Worthington Industries Inc",
            "WPS Resources Corporation",
            "Wyeth",
            "Wyndham International Inc",
            "Xcel Energy Inc",
            "Xerox Corp",
            "Xilinx Inc",
            "XO Communications Inc",
            "Yellow Corporation",
            "York International Corp",
            "Yum Brands Inc.",
            "Zale Corporation",
            "Zions Bancorporation"
        ],
        fileExtension: {
            raster: [
                "bmp",
                "gif",
                "gpl",
                "ico",
                "jpeg",
                "psd",
                "png",
                "psp",
                "raw",
                "tiff"
            ],
            vector: [
                "3dv",
                "amf",
                "awg",
                "ai",
                "cgm",
                "cdr",
                "cmx",
                "dxf",
                "e2d",
                "egt",
                "eps",
                "fs",
                "odg",
                "svg",
                "xar"
            ],
            "3d": [
                "3dmf",
                "3dm",
                "3mf",
                "3ds",
                "an8",
                "aoi",
                "blend",
                "cal3d",
                "cob",
                "ctm",
                "iob",
                "jas",
                "max",
                "mb",
                "mdx",
                "obj",
                "x",
                "x3d"
            ],
            document: [
                "doc",
                "docx",
                "dot",
                "html",
                "xml",
                "odt",
                "odm",
                "ott",
                "csv",
                "rtf",
                "tex",
                "xhtml",
                "xps"
            ]
        },
        timezones: [
            {
                name: "Dateline Standard Time",
                abbr: "DST",
                offset: -12,
                isdst: !1,
                text: "(UTC-12:00) International Date Line West",
                utc: [
                    "Etc/GMT+12"
                ]
            },
            {
                name: "UTC-11",
                abbr: "U",
                offset: -11,
                isdst: !1,
                text: "(UTC-11:00) Coordinated Universal Time-11",
                utc: [
                    "Etc/GMT+11",
                    "Pacific/Midway",
                    "Pacific/Niue",
                    "Pacific/Pago_Pago"
                ]
            },
            {
                name: "Hawaiian Standard Time",
                abbr: "HST",
                offset: -10,
                isdst: !1,
                text: "(UTC-10:00) Hawaii",
                utc: [
                    "Etc/GMT+10",
                    "Pacific/Honolulu",
                    "Pacific/Johnston",
                    "Pacific/Rarotonga",
                    "Pacific/Tahiti"
                ]
            },
            {
                name: "Alaskan Standard Time",
                abbr: "AKDT",
                offset: -8,
                isdst: !0,
                text: "(UTC-09:00) Alaska",
                utc: [
                    "America/Anchorage",
                    "America/Juneau",
                    "America/Nome",
                    "America/Sitka",
                    "America/Yakutat"
                ]
            },
            {
                name: "Pacific Standard Time (Mexico)",
                abbr: "PDT",
                offset: -7,
                isdst: !0,
                text: "(UTC-08:00) Baja California",
                utc: [
                    "America/Santa_Isabel"
                ]
            },
            {
                name: "Pacific Standard Time",
                abbr: "PDT",
                offset: -7,
                isdst: !0,
                text: "(UTC-08:00) Pacific Time (US & Canada)",
                utc: [
                    "America/Dawson",
                    "America/Los_Angeles",
                    "America/Tijuana",
                    "America/Vancouver",
                    "America/Whitehorse",
                    "PST8PDT"
                ]
            },
            {
                name: "US Mountain Standard Time",
                abbr: "UMST",
                offset: -7,
                isdst: !1,
                text: "(UTC-07:00) Arizona",
                utc: [
                    "America/Creston",
                    "America/Dawson_Creek",
                    "America/Hermosillo",
                    "America/Phoenix",
                    "Etc/GMT+7"
                ]
            },
            {
                name: "Mountain Standard Time (Mexico)",
                abbr: "MDT",
                offset: -6,
                isdst: !0,
                text: "(UTC-07:00) Chihuahua, La Paz, Mazatlan",
                utc: [
                    "America/Chihuahua",
                    "America/Mazatlan"
                ]
            },
            {
                name: "Mountain Standard Time",
                abbr: "MDT",
                offset: -6,
                isdst: !0,
                text: "(UTC-07:00) Mountain Time (US & Canada)",
                utc: [
                    "America/Boise",
                    "America/Cambridge_Bay",
                    "America/Denver",
                    "America/Edmonton",
                    "America/Inuvik",
                    "America/Ojinaga",
                    "America/Yellowknife",
                    "MST7MDT"
                ]
            },
            {
                name: "Central America Standard Time",
                abbr: "CAST",
                offset: -6,
                isdst: !1,
                text: "(UTC-06:00) Central America",
                utc: [
                    "America/Belize",
                    "America/Costa_Rica",
                    "America/El_Salvador",
                    "America/Guatemala",
                    "America/Managua",
                    "America/Tegucigalpa",
                    "Etc/GMT+6",
                    "Pacific/Galapagos"
                ]
            },
            {
                name: "Central Standard Time",
                abbr: "CDT",
                offset: -5,
                isdst: !0,
                text: "(UTC-06:00) Central Time (US & Canada)",
                utc: [
                    "America/Chicago",
                    "America/Indiana/Knox",
                    "America/Indiana/Tell_City",
                    "America/Matamoros",
                    "America/Menominee",
                    "America/North_Dakota/Beulah",
                    "America/North_Dakota/Center",
                    "America/North_Dakota/New_Salem",
                    "America/Rainy_River",
                    "America/Rankin_Inlet",
                    "America/Resolute",
                    "America/Winnipeg",
                    "CST6CDT"
                ]
            },
            {
                name: "Central Standard Time (Mexico)",
                abbr: "CDT",
                offset: -5,
                isdst: !0,
                text: "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
                utc: [
                    "America/Bahia_Banderas",
                    "America/Cancun",
                    "America/Merida",
                    "America/Mexico_City",
                    "America/Monterrey"
                ]
            },
            {
                name: "Canada Central Standard Time",
                abbr: "CCST",
                offset: -6,
                isdst: !1,
                text: "(UTC-06:00) Saskatchewan",
                utc: [
                    "America/Regina",
                    "America/Swift_Current"
                ]
            },
            {
                name: "SA Pacific Standard Time",
                abbr: "SPST",
                offset: -5,
                isdst: !1,
                text: "(UTC-05:00) Bogota, Lima, Quito",
                utc: [
                    "America/Bogota",
                    "America/Cayman",
                    "America/Coral_Harbour",
                    "America/Eirunepe",
                    "America/Guayaquil",
                    "America/Jamaica",
                    "America/Lima",
                    "America/Panama",
                    "America/Rio_Branco",
                    "Etc/GMT+5"
                ]
            },
            {
                name: "Eastern Standard Time",
                abbr: "EDT",
                offset: -4,
                isdst: !0,
                text: "(UTC-05:00) Eastern Time (US & Canada)",
                utc: [
                    "America/Detroit",
                    "America/Havana",
                    "America/Indiana/Petersburg",
                    "America/Indiana/Vincennes",
                    "America/Indiana/Winamac",
                    "America/Iqaluit",
                    "America/Kentucky/Monticello",
                    "America/Louisville",
                    "America/Montreal",
                    "America/Nassau",
                    "America/New_York",
                    "America/Nipigon",
                    "America/Pangnirtung",
                    "America/Port-au-Prince",
                    "America/Thunder_Bay",
                    "America/Toronto",
                    "EST5EDT"
                ]
            },
            {
                name: "US Eastern Standard Time",
                abbr: "UEDT",
                offset: -4,
                isdst: !0,
                text: "(UTC-05:00) Indiana (East)",
                utc: [
                    "America/Indiana/Marengo",
                    "America/Indiana/Vevay",
                    "America/Indianapolis"
                ]
            },
            {
                name: "Venezuela Standard Time",
                abbr: "VST",
                offset: -4.5,
                isdst: !1,
                text: "(UTC-04:30) Caracas",
                utc: [
                    "America/Caracas"
                ]
            },
            {
                name: "Paraguay Standard Time",
                abbr: "PST",
                offset: -4,
                isdst: !1,
                text: "(UTC-04:00) Asuncion",
                utc: [
                    "America/Asuncion"
                ]
            },
            {
                name: "Atlantic Standard Time",
                abbr: "ADT",
                offset: -3,
                isdst: !0,
                text: "(UTC-04:00) Atlantic Time (Canada)",
                utc: [
                    "America/Glace_Bay",
                    "America/Goose_Bay",
                    "America/Halifax",
                    "America/Moncton",
                    "America/Thule",
                    "Atlantic/Bermuda"
                ]
            },
            {
                name: "Central Brazilian Standard Time",
                abbr: "CBST",
                offset: -4,
                isdst: !1,
                text: "(UTC-04:00) Cuiaba",
                utc: [
                    "America/Campo_Grande",
                    "America/Cuiaba"
                ]
            },
            {
                name: "SA Western Standard Time",
                abbr: "SWST",
                offset: -4,
                isdst: !1,
                text: "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
                utc: [
                    "America/Anguilla",
                    "America/Antigua",
                    "America/Aruba",
                    "America/Barbados",
                    "America/Blanc-Sablon",
                    "America/Boa_Vista",
                    "America/Curacao",
                    "America/Dominica",
                    "America/Grand_Turk",
                    "America/Grenada",
                    "America/Guadeloupe",
                    "America/Guyana",
                    "America/Kralendijk",
                    "America/La_Paz",
                    "America/Lower_Princes",
                    "America/Manaus",
                    "America/Marigot",
                    "America/Martinique",
                    "America/Montserrat",
                    "America/Port_of_Spain",
                    "America/Porto_Velho",
                    "America/Puerto_Rico",
                    "America/Santo_Domingo",
                    "America/St_Barthelemy",
                    "America/St_Kitts",
                    "America/St_Lucia",
                    "America/St_Thomas",
                    "America/St_Vincent",
                    "America/Tortola",
                    "Etc/GMT+4"
                ]
            },
            {
                name: "Pacific SA Standard Time",
                abbr: "PSST",
                offset: -4,
                isdst: !1,
                text: "(UTC-04:00) Santiago",
                utc: [
                    "America/Santiago",
                    "Antarctica/Palmer"
                ]
            },
            {
                name: "Newfoundland Standard Time",
                abbr: "NDT",
                offset: -2.5,
                isdst: !0,
                text: "(UTC-03:30) Newfoundland",
                utc: [
                    "America/St_Johns"
                ]
            },
            {
                name: "E. South America Standard Time",
                abbr: "ESAST",
                offset: -3,
                isdst: !1,
                text: "(UTC-03:00) Brasilia",
                utc: [
                    "America/Sao_Paulo"
                ]
            },
            {
                name: "Argentina Standard Time",
                abbr: "AST",
                offset: -3,
                isdst: !1,
                text: "(UTC-03:00) Buenos Aires",
                utc: [
                    "America/Argentina/La_Rioja",
                    "America/Argentina/Rio_Gallegos",
                    "America/Argentina/Salta",
                    "America/Argentina/San_Juan",
                    "America/Argentina/San_Luis",
                    "America/Argentina/Tucuman",
                    "America/Argentina/Ushuaia",
                    "America/Buenos_Aires",
                    "America/Catamarca",
                    "America/Cordoba",
                    "America/Jujuy",
                    "America/Mendoza"
                ]
            },
            {
                name: "SA Eastern Standard Time",
                abbr: "SEST",
                offset: -3,
                isdst: !1,
                text: "(UTC-03:00) Cayenne, Fortaleza",
                utc: [
                    "America/Araguaina",
                    "America/Belem",
                    "America/Cayenne",
                    "America/Fortaleza",
                    "America/Maceio",
                    "America/Paramaribo",
                    "America/Recife",
                    "America/Santarem",
                    "Antarctica/Rothera",
                    "Atlantic/Stanley",
                    "Etc/GMT+3"
                ]
            },
            {
                name: "Greenland Standard Time",
                abbr: "GDT",
                offset: -2,
                isdst: !0,
                text: "(UTC-03:00) Greenland",
                utc: [
                    "America/Godthab"
                ]
            },
            {
                name: "Montevideo Standard Time",
                abbr: "MST",
                offset: -3,
                isdst: !1,
                text: "(UTC-03:00) Montevideo",
                utc: [
                    "America/Montevideo"
                ]
            },
            {
                name: "Bahia Standard Time",
                abbr: "BST",
                offset: -3,
                isdst: !1,
                text: "(UTC-03:00) Salvador",
                utc: [
                    "America/Bahia"
                ]
            },
            {
                name: "UTC-02",
                abbr: "U",
                offset: -2,
                isdst: !1,
                text: "(UTC-02:00) Coordinated Universal Time-02",
                utc: [
                    "America/Noronha",
                    "Atlantic/South_Georgia",
                    "Etc/GMT+2"
                ]
            },
            {
                name: "Mid-Atlantic Standard Time",
                abbr: "MDT",
                offset: -1,
                isdst: !0,
                text: "(UTC-02:00) Mid-Atlantic - Old"
            },
            {
                name: "Azores Standard Time",
                abbr: "ADT",
                offset: 0,
                isdst: !0,
                text: "(UTC-01:00) Azores",
                utc: [
                    "America/Scoresbysund",
                    "Atlantic/Azores"
                ]
            },
            {
                name: "Cape Verde Standard Time",
                abbr: "CVST",
                offset: -1,
                isdst: !1,
                text: "(UTC-01:00) Cape Verde Is.",
                utc: [
                    "Atlantic/Cape_Verde",
                    "Etc/GMT+1"
                ]
            },
            {
                name: "Morocco Standard Time",
                abbr: "MDT",
                offset: 1,
                isdst: !0,
                text: "(UTC) Casablanca",
                utc: [
                    "Africa/Casablanca",
                    "Africa/El_Aaiun"
                ]
            },
            {
                name: "UTC",
                abbr: "CUT",
                offset: 0,
                isdst: !1,
                text: "(UTC) Coordinated Universal Time",
                utc: [
                    "America/Danmarkshavn",
                    "Etc/GMT"
                ]
            },
            {
                name: "GMT Standard Time",
                abbr: "GDT",
                offset: 1,
                isdst: !0,
                text: "(UTC) Dublin, Edinburgh, Lisbon, London",
                utc: [
                    "Atlantic/Canary",
                    "Atlantic/Faeroe",
                    "Atlantic/Madeira",
                    "Europe/Dublin",
                    "Europe/Guernsey",
                    "Europe/Isle_of_Man",
                    "Europe/Jersey",
                    "Europe/Lisbon",
                    "Europe/London"
                ]
            },
            {
                name: "Greenwich Standard Time",
                abbr: "GST",
                offset: 0,
                isdst: !1,
                text: "(UTC) Monrovia, Reykjavik",
                utc: [
                    "Africa/Abidjan",
                    "Africa/Accra",
                    "Africa/Bamako",
                    "Africa/Banjul",
                    "Africa/Bissau",
                    "Africa/Conakry",
                    "Africa/Dakar",
                    "Africa/Freetown",
                    "Africa/Lome",
                    "Africa/Monrovia",
                    "Africa/Nouakchott",
                    "Africa/Ouagadougou",
                    "Africa/Sao_Tome",
                    "Atlantic/Reykjavik",
                    "Atlantic/St_Helena"
                ]
            },
            {
                name: "W. Europe Standard Time",
                abbr: "WEDT",
                offset: 2,
                isdst: !0,
                text: "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
                utc: [
                    "Arctic/Longyearbyen",
                    "Europe/Amsterdam",
                    "Europe/Andorra",
                    "Europe/Berlin",
                    "Europe/Busingen",
                    "Europe/Gibraltar",
                    "Europe/Luxembourg",
                    "Europe/Malta",
                    "Europe/Monaco",
                    "Europe/Oslo",
                    "Europe/Rome",
                    "Europe/San_Marino",
                    "Europe/Stockholm",
                    "Europe/Vaduz",
                    "Europe/Vatican",
                    "Europe/Vienna",
                    "Europe/Zurich"
                ]
            },
            {
                name: "Central Europe Standard Time",
                abbr: "CEDT",
                offset: 2,
                isdst: !0,
                text: "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
                utc: [
                    "Europe/Belgrade",
                    "Europe/Bratislava",
                    "Europe/Budapest",
                    "Europe/Ljubljana",
                    "Europe/Podgorica",
                    "Europe/Prague",
                    "Europe/Tirane"
                ]
            },
            {
                name: "Romance Standard Time",
                abbr: "RDT",
                offset: 2,
                isdst: !0,
                text: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
                utc: [
                    "Africa/Ceuta",
                    "Europe/Brussels",
                    "Europe/Copenhagen",
                    "Europe/Madrid",
                    "Europe/Paris"
                ]
            },
            {
                name: "Central European Standard Time",
                abbr: "CEDT",
                offset: 2,
                isdst: !0,
                text: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
                utc: [
                    "Europe/Sarajevo",
                    "Europe/Skopje",
                    "Europe/Warsaw",
                    "Europe/Zagreb"
                ]
            },
            {
                name: "W. Central Africa Standard Time",
                abbr: "WCAST",
                offset: 1,
                isdst: !1,
                text: "(UTC+01:00) West Central Africa",
                utc: [
                    "Africa/Algiers",
                    "Africa/Bangui",
                    "Africa/Brazzaville",
                    "Africa/Douala",
                    "Africa/Kinshasa",
                    "Africa/Lagos",
                    "Africa/Libreville",
                    "Africa/Luanda",
                    "Africa/Malabo",
                    "Africa/Ndjamena",
                    "Africa/Niamey",
                    "Africa/Porto-Novo",
                    "Africa/Tunis",
                    "Etc/GMT-1"
                ]
            },
            {
                name: "Namibia Standard Time",
                abbr: "NST",
                offset: 1,
                isdst: !1,
                text: "(UTC+01:00) Windhoek",
                utc: [
                    "Africa/Windhoek"
                ]
            },
            {
                name: "GTB Standard Time",
                abbr: "GDT",
                offset: 3,
                isdst: !0,
                text: "(UTC+02:00) Athens, Bucharest",
                utc: [
                    "Asia/Nicosia",
                    "Europe/Athens",
                    "Europe/Bucharest",
                    "Europe/Chisinau"
                ]
            },
            {
                name: "Middle East Standard Time",
                abbr: "MEDT",
                offset: 3,
                isdst: !0,
                text: "(UTC+02:00) Beirut",
                utc: [
                    "Asia/Beirut"
                ]
            },
            {
                name: "Egypt Standard Time",
                abbr: "EST",
                offset: 2,
                isdst: !1,
                text: "(UTC+02:00) Cairo",
                utc: [
                    "Africa/Cairo"
                ]
            },
            {
                name: "Syria Standard Time",
                abbr: "SDT",
                offset: 3,
                isdst: !0,
                text: "(UTC+02:00) Damascus",
                utc: [
                    "Asia/Damascus"
                ]
            },
            {
                name: "E. Europe Standard Time",
                abbr: "EEDT",
                offset: 3,
                isdst: !0,
                text: "(UTC+02:00) E. Europe"
            },
            {
                name: "South Africa Standard Time",
                abbr: "SAST",
                offset: 2,
                isdst: !1,
                text: "(UTC+02:00) Harare, Pretoria",
                utc: [
                    "Africa/Blantyre",
                    "Africa/Bujumbura",
                    "Africa/Gaborone",
                    "Africa/Harare",
                    "Africa/Johannesburg",
                    "Africa/Kigali",
                    "Africa/Lubumbashi",
                    "Africa/Lusaka",
                    "Africa/Maputo",
                    "Africa/Maseru",
                    "Africa/Mbabane",
                    "Etc/GMT-2"
                ]
            },
            {
                name: "FLE Standard Time",
                abbr: "FDT",
                offset: 3,
                isdst: !0,
                text: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
                utc: [
                    "Europe/Helsinki",
                    "Europe/Kiev",
                    "Europe/Mariehamn",
                    "Europe/Riga",
                    "Europe/Sofia",
                    "Europe/Tallinn",
                    "Europe/Uzhgorod",
                    "Europe/Vilnius",
                    "Europe/Zaporozhye"
                ]
            },
            {
                name: "Turkey Standard Time",
                abbr: "TDT",
                offset: 3,
                isdst: !0,
                text: "(UTC+02:00) Istanbul",
                utc: [
                    "Europe/Istanbul"
                ]
            },
            {
                name: "Israel Standard Time",
                abbr: "JDT",
                offset: 3,
                isdst: !0,
                text: "(UTC+02:00) Jerusalem",
                utc: [
                    "Asia/Jerusalem"
                ]
            },
            {
                name: "Libya Standard Time",
                abbr: "LST",
                offset: 2,
                isdst: !1,
                text: "(UTC+02:00) Tripoli",
                utc: [
                    "Africa/Tripoli"
                ]
            },
            {
                name: "Jordan Standard Time",
                abbr: "JST",
                offset: 3,
                isdst: !1,
                text: "(UTC+03:00) Amman",
                utc: [
                    "Asia/Amman"
                ]
            },
            {
                name: "Arabic Standard Time",
                abbr: "AST",
                offset: 3,
                isdst: !1,
                text: "(UTC+03:00) Baghdad",
                utc: [
                    "Asia/Baghdad"
                ]
            },
            {
                name: "Kaliningrad Standard Time",
                abbr: "KST",
                offset: 3,
                isdst: !1,
                text: "(UTC+03:00) Kaliningrad, Minsk",
                utc: [
                    "Europe/Kaliningrad",
                    "Europe/Minsk"
                ]
            },
            {
                name: "Arab Standard Time",
                abbr: "AST",
                offset: 3,
                isdst: !1,
                text: "(UTC+03:00) Kuwait, Riyadh",
                utc: [
                    "Asia/Aden",
                    "Asia/Bahrain",
                    "Asia/Kuwait",
                    "Asia/Qatar",
                    "Asia/Riyadh"
                ]
            },
            {
                name: "E. Africa Standard Time",
                abbr: "EAST",
                offset: 3,
                isdst: !1,
                text: "(UTC+03:00) Nairobi",
                utc: [
                    "Africa/Addis_Ababa",
                    "Africa/Asmera",
                    "Africa/Dar_es_Salaam",
                    "Africa/Djibouti",
                    "Africa/Juba",
                    "Africa/Kampala",
                    "Africa/Khartoum",
                    "Africa/Mogadishu",
                    "Africa/Nairobi",
                    "Antarctica/Syowa",
                    "Etc/GMT-3",
                    "Indian/Antananarivo",
                    "Indian/Comoro",
                    "Indian/Mayotte"
                ]
            },
            {
                name: "Iran Standard Time",
                abbr: "IDT",
                offset: 4.5,
                isdst: !0,
                text: "(UTC+03:30) Tehran",
                utc: [
                    "Asia/Tehran"
                ]
            },
            {
                name: "Arabian Standard Time",
                abbr: "AST",
                offset: 4,
                isdst: !1,
                text: "(UTC+04:00) Abu Dhabi, Muscat",
                utc: [
                    "Asia/Dubai",
                    "Asia/Muscat",
                    "Etc/GMT-4"
                ]
            },
            {
                name: "Azerbaijan Standard Time",
                abbr: "ADT",
                offset: 5,
                isdst: !0,
                text: "(UTC+04:00) Baku",
                utc: [
                    "Asia/Baku"
                ]
            },
            {
                name: "Russian Standard Time",
                abbr: "RST",
                offset: 4,
                isdst: !1,
                text: "(UTC+04:00) Moscow, St. Petersburg, Volgograd",
                utc: [
                    "Europe/Moscow",
                    "Europe/Samara",
                    "Europe/Simferopol",
                    "Europe/Volgograd"
                ]
            },
            {
                name: "Mauritius Standard Time",
                abbr: "MST",
                offset: 4,
                isdst: !1,
                text: "(UTC+04:00) Port Louis",
                utc: [
                    "Indian/Mahe",
                    "Indian/Mauritius",
                    "Indian/Reunion"
                ]
            },
            {
                name: "Georgian Standard Time",
                abbr: "GST",
                offset: 4,
                isdst: !1,
                text: "(UTC+04:00) Tbilisi",
                utc: [
                    "Asia/Tbilisi"
                ]
            },
            {
                name: "Caucasus Standard Time",
                abbr: "CST",
                offset: 4,
                isdst: !1,
                text: "(UTC+04:00) Yerevan",
                utc: [
                    "Asia/Yerevan"
                ]
            },
            {
                name: "Afghanistan Standard Time",
                abbr: "AST",
                offset: 4.5,
                isdst: !1,
                text: "(UTC+04:30) Kabul",
                utc: [
                    "Asia/Kabul"
                ]
            },
            {
                name: "West Asia Standard Time",
                abbr: "WAST",
                offset: 5,
                isdst: !1,
                text: "(UTC+05:00) Ashgabat, Tashkent",
                utc: [
                    "Antarctica/Mawson",
                    "Asia/Aqtau",
                    "Asia/Aqtobe",
                    "Asia/Ashgabat",
                    "Asia/Dushanbe",
                    "Asia/Oral",
                    "Asia/Samarkand",
                    "Asia/Tashkent",
                    "Etc/GMT-5",
                    "Indian/Kerguelen",
                    "Indian/Maldives"
                ]
            },
            {
                name: "Pakistan Standard Time",
                abbr: "PST",
                offset: 5,
                isdst: !1,
                text: "(UTC+05:00) Islamabad, Karachi",
                utc: [
                    "Asia/Karachi"
                ]
            },
            {
                name: "India Standard Time",
                abbr: "IST",
                offset: 5.5,
                isdst: !1,
                text: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
                utc: [
                    "Asia/Calcutta"
                ]
            },
            {
                name: "Sri Lanka Standard Time",
                abbr: "SLST",
                offset: 5.5,
                isdst: !1,
                text: "(UTC+05:30) Sri Jayawardenepura",
                utc: [
                    "Asia/Colombo"
                ]
            },
            {
                name: "Nepal Standard Time",
                abbr: "NST",
                offset: 5.75,
                isdst: !1,
                text: "(UTC+05:45) Kathmandu",
                utc: [
                    "Asia/Katmandu"
                ]
            },
            {
                name: "Central Asia Standard Time",
                abbr: "CAST",
                offset: 6,
                isdst: !1,
                text: "(UTC+06:00) Astana",
                utc: [
                    "Antarctica/Vostok",
                    "Asia/Almaty",
                    "Asia/Bishkek",
                    "Asia/Qyzylorda",
                    "Asia/Urumqi",
                    "Etc/GMT-6",
                    "Indian/Chagos"
                ]
            },
            {
                name: "Bangladesh Standard Time",
                abbr: "BST",
                offset: 6,
                isdst: !1,
                text: "(UTC+06:00) Dhaka",
                utc: [
                    "Asia/Dhaka",
                    "Asia/Thimphu"
                ]
            },
            {
                name: "Ekaterinburg Standard Time",
                abbr: "EST",
                offset: 6,
                isdst: !1,
                text: "(UTC+06:00) Ekaterinburg",
                utc: [
                    "Asia/Yekaterinburg"
                ]
            },
            {
                name: "Myanmar Standard Time",
                abbr: "MST",
                offset: 6.5,
                isdst: !1,
                text: "(UTC+06:30) Yangon (Rangoon)",
                utc: [
                    "Asia/Rangoon",
                    "Indian/Cocos"
                ]
            },
            {
                name: "SE Asia Standard Time",
                abbr: "SAST",
                offset: 7,
                isdst: !1,
                text: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
                utc: [
                    "Antarctica/Davis",
                    "Asia/Bangkok",
                    "Asia/Hovd",
                    "Asia/Jakarta",
                    "Asia/Phnom_Penh",
                    "Asia/Pontianak",
                    "Asia/Saigon",
                    "Asia/Vientiane",
                    "Etc/GMT-7",
                    "Indian/Christmas"
                ]
            },
            {
                name: "N. Central Asia Standard Time",
                abbr: "NCAST",
                offset: 7,
                isdst: !1,
                text: "(UTC+07:00) Novosibirsk",
                utc: [
                    "Asia/Novokuznetsk",
                    "Asia/Novosibirsk",
                    "Asia/Omsk"
                ]
            },
            {
                name: "China Standard Time",
                abbr: "CST",
                offset: 8,
                isdst: !1,
                text: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
                utc: [
                    "Asia/Hong_Kong",
                    "Asia/Macau",
                    "Asia/Shanghai"
                ]
            },
            {
                name: "North Asia Standard Time",
                abbr: "NAST",
                offset: 8,
                isdst: !1,
                text: "(UTC+08:00) Krasnoyarsk",
                utc: [
                    "Asia/Krasnoyarsk"
                ]
            },
            {
                name: "Singapore Standard Time",
                abbr: "MPST",
                offset: 8,
                isdst: !1,
                text: "(UTC+08:00) Kuala Lumpur, Singapore",
                utc: [
                    "Asia/Brunei",
                    "Asia/Kuala_Lumpur",
                    "Asia/Kuching",
                    "Asia/Makassar",
                    "Asia/Manila",
                    "Asia/Singapore",
                    "Etc/GMT-8"
                ]
            },
            {
                name: "W. Australia Standard Time",
                abbr: "WAST",
                offset: 8,
                isdst: !1,
                text: "(UTC+08:00) Perth",
                utc: [
                    "Antarctica/Casey",
                    "Australia/Perth"
                ]
            },
            {
                name: "Taipei Standard Time",
                abbr: "TST",
                offset: 8,
                isdst: !1,
                text: "(UTC+08:00) Taipei",
                utc: [
                    "Asia/Taipei"
                ]
            },
            {
                name: "Ulaanbaatar Standard Time",
                abbr: "UST",
                offset: 8,
                isdst: !1,
                text: "(UTC+08:00) Ulaanbaatar",
                utc: [
                    "Asia/Choibalsan",
                    "Asia/Ulaanbaatar"
                ]
            },
            {
                name: "North Asia East Standard Time",
                abbr: "NAEST",
                offset: 9,
                isdst: !1,
                text: "(UTC+09:00) Irkutsk",
                utc: [
                    "Asia/Irkutsk"
                ]
            },
            {
                name: "Tokyo Standard Time",
                abbr: "TST",
                offset: 9,
                isdst: !1,
                text: "(UTC+09:00) Osaka, Sapporo, Tokyo",
                utc: [
                    "Asia/Dili",
                    "Asia/Jayapura",
                    "Asia/Tokyo",
                    "Etc/GMT-9",
                    "Pacific/Palau"
                ]
            },
            {
                name: "Korea Standard Time",
                abbr: "KST",
                offset: 9,
                isdst: !1,
                text: "(UTC+09:00) Seoul",
                utc: [
                    "Asia/Pyongyang",
                    "Asia/Seoul"
                ]
            },
            {
                name: "Cen. Australia Standard Time",
                abbr: "CAST",
                offset: 9.5,
                isdst: !1,
                text: "(UTC+09:30) Adelaide",
                utc: [
                    "Australia/Adelaide",
                    "Australia/Broken_Hill"
                ]
            },
            {
                name: "AUS Central Standard Time",
                abbr: "ACST",
                offset: 9.5,
                isdst: !1,
                text: "(UTC+09:30) Darwin",
                utc: [
                    "Australia/Darwin"
                ]
            },
            {
                name: "E. Australia Standard Time",
                abbr: "EAST",
                offset: 10,
                isdst: !1,
                text: "(UTC+10:00) Brisbane",
                utc: [
                    "Australia/Brisbane",
                    "Australia/Lindeman"
                ]
            },
            {
                name: "AUS Eastern Standard Time",
                abbr: "AEST",
                offset: 10,
                isdst: !1,
                text: "(UTC+10:00) Canberra, Melbourne, Sydney",
                utc: [
                    "Australia/Melbourne",
                    "Australia/Sydney"
                ]
            },
            {
                name: "West Pacific Standard Time",
                abbr: "WPST",
                offset: 10,
                isdst: !1,
                text: "(UTC+10:00) Guam, Port Moresby",
                utc: [
                    "Antarctica/DumontDUrville",
                    "Etc/GMT-10",
                    "Pacific/Guam",
                    "Pacific/Port_Moresby",
                    "Pacific/Saipan",
                    "Pacific/Truk"
                ]
            },
            {
                name: "Tasmania Standard Time",
                abbr: "TST",
                offset: 10,
                isdst: !1,
                text: "(UTC+10:00) Hobart",
                utc: [
                    "Australia/Currie",
                    "Australia/Hobart"
                ]
            },
            {
                name: "Yakutsk Standard Time",
                abbr: "YST",
                offset: 10,
                isdst: !1,
                text: "(UTC+10:00) Yakutsk",
                utc: [
                    "Asia/Chita",
                    "Asia/Khandyga",
                    "Asia/Yakutsk"
                ]
            },
            {
                name: "Central Pacific Standard Time",
                abbr: "CPST",
                offset: 11,
                isdst: !1,
                text: "(UTC+11:00) Solomon Is., New Caledonia",
                utc: [
                    "Antarctica/Macquarie",
                    "Etc/GMT-11",
                    "Pacific/Efate",
                    "Pacific/Guadalcanal",
                    "Pacific/Kosrae",
                    "Pacific/Noumea",
                    "Pacific/Ponape"
                ]
            },
            {
                name: "Vladivostok Standard Time",
                abbr: "VST",
                offset: 11,
                isdst: !1,
                text: "(UTC+11:00) Vladivostok",
                utc: [
                    "Asia/Sakhalin",
                    "Asia/Ust-Nera",
                    "Asia/Vladivostok"
                ]
            },
            {
                name: "New Zealand Standard Time",
                abbr: "NZST",
                offset: 12,
                isdst: !1,
                text: "(UTC+12:00) Auckland, Wellington",
                utc: [
                    "Antarctica/McMurdo",
                    "Pacific/Auckland"
                ]
            },
            {
                name: "UTC+12",
                abbr: "U",
                offset: 12,
                isdst: !1,
                text: "(UTC+12:00) Coordinated Universal Time+12",
                utc: [
                    "Etc/GMT-12",
                    "Pacific/Funafuti",
                    "Pacific/Kwajalein",
                    "Pacific/Majuro",
                    "Pacific/Nauru",
                    "Pacific/Tarawa",
                    "Pacific/Wake",
                    "Pacific/Wallis"
                ]
            },
            {
                name: "Fiji Standard Time",
                abbr: "FST",
                offset: 12,
                isdst: !1,
                text: "(UTC+12:00) Fiji",
                utc: [
                    "Pacific/Fiji"
                ]
            },
            {
                name: "Magadan Standard Time",
                abbr: "MST",
                offset: 12,
                isdst: !1,
                text: "(UTC+12:00) Magadan",
                utc: [
                    "Asia/Anadyr",
                    "Asia/Kamchatka",
                    "Asia/Magadan",
                    "Asia/Srednekolymsk"
                ]
            },
            {
                name: "Kamchatka Standard Time",
                abbr: "KDT",
                offset: 13,
                isdst: !0,
                text: "(UTC+12:00) Petropavlovsk-Kamchatsky - Old"
            },
            {
                name: "Tonga Standard Time",
                abbr: "TST",
                offset: 13,
                isdst: !1,
                text: "(UTC+13:00) Nuku'alofa",
                utc: [
                    "Etc/GMT-13",
                    "Pacific/Enderbury",
                    "Pacific/Fakaofo",
                    "Pacific/Tongatapu"
                ]
            },
            {
                name: "Samoa Standard Time",
                abbr: "SST",
                offset: 13,
                isdst: !1,
                text: "(UTC+13:00) Samoa",
                utc: [
                    "Pacific/Apia"
                ]
            }
        ],
        profession: [
            "Airline Pilot",
            "Academic Team",
            "Accountant",
            "Account Executive",
            "Actor",
            "Actuary",
            "Acquisition Analyst",
            "Administrative Asst.",
            "Administrative Analyst",
            "Administrator",
            "Advertising Director",
            "Aerospace Engineer",
            "Agent",
            "Agricultural Inspector",
            "Agricultural Scientist",
            "Air Traffic Controller",
            "Animal Trainer",
            "Anthropologist",
            "Appraiser",
            "Architect",
            "Art Director",
            "Artist",
            "Astronomer",
            "Athletic Coach",
            "Auditor",
            "Author",
            "Baker",
            "Banker",
            "Bankruptcy Attorney",
            "Benefits Manager",
            "Biologist",
            "Bio-feedback Specialist",
            "Biomedical Engineer",
            "Biotechnical Researcher",
            "Broadcaster",
            "Broker",
            "Building Manager",
            "Building Contractor",
            "Building Inspector",
            "Business Analyst",
            "Business Planner",
            "Business Manager",
            "Buyer",
            "Call Center Manager",
            "Career Counselor",
            "Cash Manager",
            "Ceramic Engineer",
            "Chief Executive Officer",
            "Chief Operation Officer",
            "Chef",
            "Chemical Engineer",
            "Chemist",
            "Child Care Manager",
            "Chief Medical Officer",
            "Chiropractor",
            "Cinematographer",
            "City Housing Manager",
            "City Manager",
            "Civil Engineer",
            "Claims Manager",
            "Clinical Research Assistant",
            "Collections Manager.",
            "Compliance Manager",
            "Comptroller",
            "Computer Manager",
            "Commercial Artist",
            "Communications Affairs Director",
            "Communications Director",
            "Communications Engineer",
            "Compensation Analyst",
            "Computer Programmer",
            "Computer Ops. Manager",
            "Computer Engineer",
            "Computer Operator",
            "Computer Graphics Specialist",
            "Construction Engineer",
            "Construction Manager",
            "Consultant",
            "Consumer Relations Manager",
            "Contract Administrator",
            "Copyright Attorney",
            "Copywriter",
            "Corporate Planner",
            "Corrections Officer",
            "Cosmetologist",
            "Credit Analyst",
            "Cruise Director",
            "Chief Information Officer",
            "Chief Technology Officer",
            "Customer Service Manager",
            "Cryptologist",
            "Dancer",
            "Data Security Manager",
            "Database Manager",
            "Day Care Instructor",
            "Dentist",
            "Designer",
            "Design Engineer",
            "Desktop Publisher",
            "Developer",
            "Development Officer",
            "Diamond Merchant",
            "Dietitian",
            "Direct Marketer",
            "Director",
            "Distribution Manager",
            "Diversity Manager",
            "Economist",
            "EEO Compliance Manager",
            "Editor",
            "Education Adminator",
            "Electrical Engineer",
            "Electro Optical Engineer",
            "Electronics Engineer",
            "Embassy Management",
            "Employment Agent",
            "Engineer Technician",
            "Entrepreneur",
            "Environmental Analyst",
            "Environmental Attorney",
            "Environmental Engineer",
            "Environmental Specialist",
            "Escrow Officer",
            "Estimator",
            "Executive Assistant",
            "Executive Director",
            "Executive Recruiter",
            "Facilities Manager",
            "Family Counselor",
            "Fashion Events Manager",
            "Fashion Merchandiser",
            "Fast Food Manager",
            "Film Producer",
            "Film Production Assistant",
            "Financial Analyst",
            "Financial Planner",
            "Financier",
            "Fine Artist",
            "Wildlife Specialist",
            "Fitness Consultant",
            "Flight Attendant",
            "Flight Engineer",
            "Floral Designer",
            "Food & Beverage Director",
            "Food Service Manager",
            "Forestry Technician",
            "Franchise Management",
            "Franchise Sales",
            "Fraud Investigator",
            "Freelance Writer",
            "Fund Raiser",
            "General Manager",
            "Geologist",
            "General Counsel",
            "Geriatric Specialist",
            "Gerontologist",
            "Glamour Photographer",
            "Golf Club Manager",
            "Gourmet Chef",
            "Graphic Designer",
            "Grounds Keeper",
            "Hazardous Waste Manager",
            "Health Care Manager",
            "Health Therapist",
            "Health Service Administrator",
            "Hearing Officer",
            "Home Economist",
            "Horticulturist",
            "Hospital Administrator",
            "Hotel Manager",
            "Human Resources Manager",
            "Importer",
            "Industrial Designer",
            "Industrial Engineer",
            "Information Director",
            "Inside Sales",
            "Insurance Adjuster",
            "Interior Decorator",
            "Internal Controls Director",
            "International Acct.",
            "International Courier",
            "International Lawyer",
            "Interpreter",
            "Investigator",
            "Investment Banker",
            "Investment Manager",
            "IT Architect",
            "IT Project Manager",
            "IT Systems Analyst",
            "Jeweler",
            "Joint Venture Manager",
            "Journalist",
            "Labor Negotiator",
            "Labor Organizer",
            "Labor Relations Manager",
            "Lab Services Director",
            "Lab Technician",
            "Land Developer",
            "Landscape Architect",
            "Law Enforcement Officer",
            "Lawyer",
            "Lead Software Engineer",
            "Lead Software Test Engineer",
            "Leasing Manager",
            "Legal Secretary",
            "Library Manager",
            "Litigation Attorney",
            "Loan Officer",
            "Lobbyist",
            "Logistics Manager",
            "Maintenance Manager",
            "Management Consultant",
            "Managed Care Director",
            "Managing Partner",
            "Manufacturing Director",
            "Manpower Planner",
            "Marine Biologist",
            "Market Res. Analyst",
            "Marketing Director",
            "Materials Manager",
            "Mathematician",
            "Membership Chairman",
            "Mechanic",
            "Mechanical Engineer",
            "Media Buyer",
            "Medical Investor",
            "Medical Secretary",
            "Medical Technician",
            "Mental Health Counselor",
            "Merchandiser",
            "Metallurgical Engineering",
            "Meteorologist",
            "Microbiologist",
            "MIS Manager",
            "Motion Picture Director",
            "Multimedia Director",
            "Musician",
            "Network Administrator",
            "Network Specialist",
            "Network Operator",
            "New Product Manager",
            "Novelist",
            "Nuclear Engineer",
            "Nuclear Specialist",
            "Nutritionist",
            "Nursing Administrator",
            "Occupational Therapist",
            "Oceanographer",
            "Office Manager",
            "Operations Manager",
            "Operations Research Director",
            "Optical Technician",
            "Optometrist",
            "Organizational Development Manager",
            "Outplacement Specialist",
            "Paralegal",
            "Park Ranger",
            "Patent Attorney",
            "Payroll Specialist",
            "Personnel Specialist",
            "Petroleum Engineer",
            "Pharmacist",
            "Photographer",
            "Physical Therapist",
            "Physician",
            "Physician Assistant",
            "Physicist",
            "Planning Director",
            "Podiatrist",
            "Political Analyst",
            "Political Scientist",
            "Politician",
            "Portfolio Manager",
            "Preschool Management",
            "Preschool Teacher",
            "Principal",
            "Private Banker",
            "Private Investigator",
            "Probation Officer",
            "Process Engineer",
            "Producer",
            "Product Manager",
            "Product Engineer",
            "Production Engineer",
            "Production Planner",
            "Professional Athlete",
            "Professional Coach",
            "Professor",
            "Project Engineer",
            "Project Manager",
            "Program Manager",
            "Property Manager",
            "Public Administrator",
            "Public Safety Director",
            "PR Specialist",
            "Publisher",
            "Purchasing Agent",
            "Publishing Director",
            "Quality Assurance Specialist",
            "Quality Control Engineer",
            "Quality Control Inspector",
            "Radiology Manager",
            "Railroad Engineer",
            "Real Estate Broker",
            "Recreational Director",
            "Recruiter",
            "Redevelopment Specialist",
            "Regulatory Affairs Manager",
            "Registered Nurse",
            "Rehabilitation Counselor",
            "Relocation Manager",
            "Reporter",
            "Research Specialist",
            "Restaurant Manager",
            "Retail Store Manager",
            "Risk Analyst",
            "Safety Engineer",
            "Sales Engineer",
            "Sales Trainer",
            "Sales Promotion Manager",
            "Sales Representative",
            "Sales Manager",
            "Service Manager",
            "Sanitation Engineer",
            "Scientific Programmer",
            "Scientific Writer",
            "Securities Analyst",
            "Security Consultant",
            "Security Director",
            "Seminar Presenter",
            "Ship's Officer",
            "Singer",
            "Social Director",
            "Social Program Planner",
            "Social Research",
            "Social Scientist",
            "Social Worker",
            "Sociologist",
            "Software Developer",
            "Software Engineer",
            "Software Test Engineer",
            "Soil Scientist",
            "Special Events Manager",
            "Special Education Teacher",
            "Special Projects Director",
            "Speech Pathologist",
            "Speech Writer",
            "Sports Event Manager",
            "Statistician",
            "Store Manager",
            "Strategic Alliance Director",
            "Strategic Planning Director",
            "Stress Reduction Specialist",
            "Stockbroker",
            "Surveyor",
            "Structural Engineer",
            "Superintendent",
            "Supply Chain Director",
            "System Engineer",
            "Systems Analyst",
            "Systems Programmer",
            "System Administrator",
            "Tax Specialist",
            "Teacher",
            "Technical Support Specialist",
            "Technical Illustrator",
            "Technical Writer",
            "Technology Director",
            "Telecom Analyst",
            "Telemarketer",
            "Theatrical Director",
            "Title Examiner",
            "Tour Escort",
            "Tour Guide Director",
            "Traffic Manager",
            "Trainer Translator",
            "Transportation Manager",
            "Travel Agent",
            "Treasurer",
            "TV Programmer",
            "Underwriter",
            "Union Representative",
            "University Administrator",
            "University Dean",
            "Urban Planner",
            "Veterinarian",
            "Vendor Relations Director",
            "Viticulturist",
            "Warehouse Manager"
        ],
        animals: {
            ocean: [
                "Acantharea",
                "Anemone",
                "Angelfish King",
                "Ahi Tuna",
                "Albacore",
                "American Oyster",
                "Anchovy",
                "Armored Snail",
                "Arctic Char",
                "Atlantic Bluefin Tuna",
                "Atlantic Cod",
                "Atlantic Goliath Grouper",
                "Atlantic Trumpetfish",
                "Atlantic Wolffish",
                "Baleen Whale",
                "Banded Butterflyfish",
                "Banded Coral Shrimp",
                "Banded Sea Krait",
                "Barnacle",
                "Barndoor Skate",
                "Barracuda",
                "Basking Shark",
                "Bass",
                "Beluga Whale",
                "Bluebanded Goby",
                "Bluehead Wrasse",
                "Bluefish",
                "Bluestreak Cleaner-Wrasse",
                "Blue Marlin",
                "Blue Shark",
                "Blue Spiny Lobster",
                "Blue Tang",
                "Blue Whale",
                "Broadclub Cuttlefish",
                "Bull Shark",
                "Chambered Nautilus",
                "Chilean Basket Star",
                "Chilean Jack Mackerel",
                "Chinook Salmon",
                "Christmas Tree Worm",
                "Clam",
                "Clown Anemonefish",
                "Clown Triggerfish",
                "Cod",
                "Coelacanth",
                "Cockscomb Cup Coral",
                "Common Fangtooth",
                "Conch",
                "Cookiecutter Shark",
                "Copepod",
                "Coral",
                "Corydoras",
                "Cownose Ray",
                "Crab",
                "Crown-of-Thorns Starfish",
                "Cushion Star",
                "Cuttlefish",
                "California Sea Otters",
                "Dolphin",
                "Dolphinfish",
                "Dory",
                "Devil Fish",
                "Dugong",
                "Dumbo Octopus",
                "Dungeness Crab",
                "Eccentric Sand Dollar",
                "Edible Sea Cucumber",
                "Eel",
                "Elephant Seal",
                "Elkhorn Coral",
                "Emperor Shrimp",
                "Estuarine Crocodile",
                "Fathead Sculpin",
                "Fiddler Crab",
                "Fin Whale",
                "Flameback",
                "Flamingo Tongue Snail",
                "Flashlight Fish",
                "Flatback Turtle",
                "Flatfish",
                "Flying Fish",
                "Flounder",
                "Fluke",
                "French Angelfish",
                "Frilled Shark",
                "Fugu (also called Pufferfish)",
                "Gar",
                "Geoduck",
                "Giant Barrel Sponge",
                "Giant Caribbean Sea Anemone",
                "Giant Clam",
                "Giant Isopod",
                "Giant Kingfish",
                "Giant Oarfish",
                "Giant Pacific Octopus",
                "Giant Pyrosome",
                "Giant Sea Star",
                "Giant Squid",
                "Glowing Sucker Octopus",
                "Giant Tube Worm",
                "Goblin Shark",
                "Goosefish",
                "Great White Shark",
                "Greenland Shark",
                "Grey Atlantic Seal",
                "Grouper",
                "Grunion",
                "Guineafowl Puffer",
                "Haddock",
                "Hake",
                "Halibut",
                "Hammerhead Shark",
                "Hapuka",
                "Harbor Porpoise",
                "Harbor Seal",
                "Hatchetfish",
                "Hawaiian Monk Seal",
                "Hawksbill Turtle",
                "Hector's Dolphin",
                "Hermit Crab",
                "Herring",
                "Hoki",
                "Horn Shark",
                "Horseshoe Crab",
                "Humpback Anglerfish",
                "Humpback Whale",
                "Icefish",
                "Imperator Angelfish",
                "Irukandji Jellyfish",
                "Isopod",
                "Ivory Bush Coral",
                "Japanese Spider Crab",
                "Jellyfish",
                "John Dory",
                "Juan Fernandez Fur Seal",
                "Killer Whale",
                "Kiwa Hirsuta",
                "Krill",
                "Lagoon Triggerfish",
                "Lamprey",
                "Leafy Seadragon",
                "Leopard Seal",
                "Limpet",
                "Ling",
                "Lionfish",
                "Lions Mane Jellyfish",
                "Lobe Coral",
                "Lobster",
                "Loggerhead Turtle",
                "Longnose Sawshark",
                "Longsnout Seahorse",
                "Lophelia Coral",
                "Marrus Orthocanna",
                "Manatee",
                "Manta Ray",
                "Marlin",
                "Megamouth Shark",
                "Mexican Lookdown",
                "Mimic Octopus",
                "Moon Jelly",
                "Mollusk",
                "Monkfish",
                "Moray Eel",
                "Mullet",
                "Mussel",
                "Megaladon",
                "Napoleon Wrasse",
                "Nassau Grouper",
                "Narwhal",
                "Nautilus",
                "Needlefish",
                "Northern Seahorse",
                "North Atlantic Right Whale",
                "Northern Red Snapper",
                "Norway Lobster",
                "Nudibranch",
                "Nurse Shark",
                "Oarfish",
                "Ocean Sunfish",
                "Oceanic Whitetip Shark",
                "Octopus",
                "Olive Sea Snake",
                "Orange Roughy",
                "Ostracod",
                "Otter",
                "Oyster",
                "Pacific Angelshark",
                "Pacific Blackdragon",
                "Pacific Halibut",
                "Pacific Sardine",
                "Pacific Sea Nettle Jellyfish",
                "Pacific White Sided Dolphin",
                "Pantropical Spotted Dolphin",
                "Patagonian Toothfish",
                "Peacock Mantis Shrimp",
                "Pelagic Thresher Shark",
                "Penguin",
                "Peruvian Anchoveta",
                "Pilchard",
                "Pink Salmon",
                "Pinniped",
                "Plankton",
                "Porpoise",
                "Polar Bear",
                "Portuguese Man o' War",
                "Pycnogonid Sea Spider",
                "Quahog",
                "Queen Angelfish",
                "Queen Conch",
                "Queen Parrotfish",
                "Queensland Grouper",
                "Ragfish",
                "Ratfish",
                "Rattail Fish",
                "Ray",
                "Red Drum",
                "Red King Crab",
                "Ringed Seal",
                "Risso's Dolphin",
                "Ross Seals",
                "Sablefish",
                "Salmon",
                "Sand Dollar",
                "Sandbar Shark",
                "Sawfish",
                "Sarcastic Fringehead",
                "Scalloped Hammerhead Shark",
                "Seahorse",
                "Sea Cucumber",
                "Sea Lion",
                "Sea Urchin",
                "Seal",
                "Shark",
                "Shortfin Mako Shark",
                "Shovelnose Guitarfish",
                "Shrimp",
                "Silverside Fish",
                "Skipjack Tuna",
                "Slender Snipe Eel",
                "Smalltooth Sawfish",
                "Smelts",
                "Sockeye Salmon",
                "Southern Stingray",
                "Sponge",
                "Spotted Porcupinefish",
                "Spotted Dolphin",
                "Spotted Eagle Ray",
                "Spotted Moray",
                "Squid",
                "Squidworm",
                "Starfish",
                "Stickleback",
                "Stonefish",
                "Stoplight Loosejaw",
                "Sturgeon",
                "Swordfish",
                "Tan Bristlemouth",
                "Tasseled Wobbegong",
                "Terrible Claw Lobster",
                "Threespot Damselfish",
                "Tiger Prawn",
                "Tiger Shark",
                "Tilefish",
                "Toadfish",
                "Tropical Two-Wing Flyfish",
                "Tuna",
                "Umbrella Squid",
                "Velvet Crab",
                "Venus Flytrap Sea Anemone",
                "Vigtorniella Worm",
                "Viperfish",
                "Vampire Squid",
                "Vaquita",
                "Wahoo",
                "Walrus",
                "West Indian Manatee",
                "Whale",
                "Whale Shark",
                "Whiptail Gulper",
                "White-Beaked Dolphin",
                "White-Ring Garden Eel",
                "White Shrimp",
                "Wobbegong",
                "Wrasse",
                "Wreckfish",
                "Xiphosura",
                "Yellowtail Damselfish",
                "Yelloweye Rockfish",
                "Yellow Cup Black Coral",
                "Yellow Tube Sponge",
                "Yellowfin Tuna",
                "Zebrashark",
                "Zooplankton"
            ],
            desert: [
                "Aardwolf",
                "Addax",
                "African Wild Ass",
                "Ant",
                "Antelope",
                "Armadillo",
                "Baboon",
                "Badger",
                "Bat",
                "Bearded Dragon",
                "Beetle",
                "Bird",
                "Black-footed Cat",
                "Boa",
                "Brown Bear",
                "Bustard",
                "Butterfly",
                "Camel",
                "Caracal",
                "Caracara",
                "Caterpillar",
                "Centipede",
                "Cheetah",
                "Chipmunk",
                "Chuckwalla",
                "Climbing Mouse",
                "Coati",
                "Cobra",
                "Cotton Rat",
                "Cougar",
                "Courser",
                "Crane Fly",
                "Crow",
                "Dassie Rat",
                "Dove",
                "Dunnart",
                "Eagle",
                "Echidna",
                "Elephant",
                "Emu",
                "Falcon",
                "Fly",
                "Fox",
                "Frogmouth",
                "Gecko",
                "Geoffroy's Cat",
                "Gerbil",
                "Grasshopper",
                "Guanaco",
                "Gundi",
                "Hamster",
                "Hawk",
                "Hedgehog",
                "Hyena",
                "Hyrax",
                "Jackal",
                "Kangaroo",
                "Kangaroo Rat",
                "Kestrel",
                "Kowari",
                "Kultarr",
                "Leopard",
                "Lion",
                "Macaw",
                "Meerkat",
                "Mouse",
                "Oryx",
                "Ostrich",
                "Owl",
                "Pronghorn",
                "Python",
                "Rabbit",
                "Raccoon",
                "Rattlesnake",
                "Rhinoceros",
                "Sand Cat",
                "Spectacled Bear",
                "Spiny Mouse",
                "Starling",
                "Stick Bug",
                "Tarantula",
                "Tit",
                "Toad",
                "Tortoise",
                "Tyrant Flycatcher",
                "Viper",
                "Vulture",
                "Waxwing",
                "Xerus",
                "Zebra"
            ],
            grassland: [
                "Aardvark",
                "Aardwolf",
                "Accentor",
                "African Buffalo",
                "African Wild Dog",
                "Alpaca",
                "Anaconda",
                "Ant",
                "Anteater",
                "Antelope",
                "Armadillo",
                "Baboon",
                "Badger",
                "Bandicoot",
                "Barbet",
                "Bat",
                "Bee",
                "Bee-eater",
                "Beetle",
                "Bird",
                "Bison",
                "Black-footed Cat",
                "Black-footed Ferret",
                "Bluebird",
                "Boa",
                "Bowerbird",
                "Brown Bear",
                "Bush Dog",
                "Bushshrike",
                "Bustard",
                "Butterfly",
                "Buzzard",
                "Caracal",
                "Caracara",
                "Cardinal",
                "Caterpillar",
                "Cheetah",
                "Chipmunk",
                "Civet",
                "Climbing Mouse",
                "Clouded Leopard",
                "Coati",
                "Cobra",
                "Cockatoo",
                "Cockroach",
                "Common Genet",
                "Cotton Rat",
                "Cougar",
                "Courser",
                "Coyote",
                "Crane",
                "Crane Fly",
                "Cricket",
                "Crow",
                "Culpeo",
                "Death Adder",
                "Deer",
                "Deer Mouse",
                "Dingo",
                "Dinosaur",
                "Dove",
                "Drongo",
                "Duck",
                "Duiker",
                "Dunnart",
                "Eagle",
                "Echidna",
                "Elephant",
                "Elk",
                "Emu",
                "Falcon",
                "Finch",
                "Flea",
                "Fly",
                "Flying Frog",
                "Fox",
                "Frog",
                "Frogmouth",
                "Garter Snake",
                "Gazelle",
                "Gecko",
                "Geoffroy's Cat",
                "Gerbil",
                "Giant Tortoise",
                "Giraffe",
                "Grasshopper",
                "Grison",
                "Groundhog",
                "Grouse",
                "Guanaco",
                "Guinea Pig",
                "Hamster",
                "Harrier",
                "Hartebeest",
                "Hawk",
                "Hedgehog",
                "Helmetshrike",
                "Hippopotamus",
                "Hornbill",
                "Hyena",
                "Hyrax",
                "Impala",
                "Jackal",
                "Jaguar",
                "Jaguarundi",
                "Kangaroo",
                "Kangaroo Rat",
                "Kestrel",
                "Kultarr",
                "Ladybug",
                "Leopard",
                "Lion",
                "Macaw",
                "Meerkat",
                "Mouse",
                "Newt",
                "Oryx",
                "Ostrich",
                "Owl",
                "Pangolin",
                "Pheasant",
                "Prairie Dog",
                "Pronghorn",
                "Przewalski's Horse",
                "Python",
                "Quoll",
                "Rabbit",
                "Raven",
                "Rhinoceros",
                "Shelduck",
                "Sloth Bear",
                "Spectacled Bear",
                "Squirrel",
                "Starling",
                "Stick Bug",
                "Tamandua",
                "Tasmanian Devil",
                "Thornbill",
                "Thrush",
                "Toad",
                "Tortoise"
            ],
            forest: [
                "Agouti",
                "Anaconda",
                "Anoa",
                "Ant",
                "Anteater",
                "Antelope",
                "Armadillo",
                "Asian Black Bear",
                "Aye-aye",
                "Babirusa",
                "Baboon",
                "Badger",
                "Bandicoot",
                "Banteng",
                "Barbet",
                "Basilisk",
                "Bat",
                "Bearded Dragon",
                "Bee",
                "Bee-eater",
                "Beetle",
                "Bettong",
                "Binturong",
                "Bird-of-paradise",
                "Bongo",
                "Bowerbird",
                "Bulbul",
                "Bush Dog",
                "Bushbaby",
                "Bushshrike",
                "Butterfly",
                "Buzzard",
                "Caecilian",
                "Cardinal",
                "Cassowary",
                "Caterpillar",
                "Centipede",
                "Chameleon",
                "Chimpanzee",
                "Cicada",
                "Civet",
                "Clouded Leopard",
                "Coati",
                "Cobra",
                "Cockatoo",
                "Cockroach",
                "Colugo",
                "Cotinga",
                "Cotton Rat",
                "Cougar",
                "Crane Fly",
                "Cricket",
                "Crocodile",
                "Crow",
                "Cuckoo",
                "Cuscus",
                "Death Adder",
                "Deer",
                "Dhole",
                "Dingo",
                "Dinosaur",
                "Drongo",
                "Duck",
                "Duiker",
                "Eagle",
                "Echidna",
                "Elephant",
                "Finch",
                "Flat-headed Cat",
                "Flea",
                "Flowerpecker",
                "Fly",
                "Flying Frog",
                "Fossa",
                "Frog",
                "Frogmouth",
                "Gaur",
                "Gecko",
                "Gorilla",
                "Grison",
                "Hawaiian Honeycreeper",
                "Hawk",
                "Hedgehog",
                "Helmetshrike",
                "Hornbill",
                "Hyrax",
                "Iguana",
                "Jackal",
                "Jaguar",
                "Jaguarundi",
                "Kestrel",
                "Ladybug",
                "Lemur",
                "Leopard",
                "Lion",
                "Macaw",
                "Mandrill",
                "Margay",
                "Monkey",
                "Mouse",
                "Mouse Deer",
                "Newt",
                "Okapi",
                "Old World Flycatcher",
                "Orangutan",
                "Owl",
                "Pangolin",
                "Peafowl",
                "Pheasant",
                "Possum",
                "Python",
                "Quokka",
                "Rabbit",
                "Raccoon",
                "Red Panda",
                "Red River Hog",
                "Rhinoceros",
                "Sloth Bear",
                "Spectacled Bear",
                "Squirrel",
                "Starling",
                "Stick Bug",
                "Sun Bear",
                "Tamandua",
                "Tamarin",
                "Tapir",
                "Tarantula",
                "Thrush",
                "Tiger",
                "Tit",
                "Toad",
                "Tortoise",
                "Toucan",
                "Trogon",
                "Trumpeter",
                "Turaco",
                "Turtle",
                "Tyrant Flycatcher",
                "Viper",
                "Vulture",
                "Wallaby",
                "Warbler",
                "Wasp",
                "Waxwing",
                "Weaver",
                "Weaver-finch",
                "Whistler",
                "White-eye",
                "Whydah",
                "Woodswallow",
                "Worm",
                "Wren",
                "Xenops",
                "Yellowjacket",
                "Accentor",
                "African Buffalo",
                "American Black Bear",
                "Anole",
                "Bird",
                "Bison",
                "Boa",
                "Brown Bear",
                "Chipmunk",
                "Common Genet",
                "Copperhead",
                "Coyote",
                "Deer Mouse",
                "Dormouse",
                "Elk",
                "Emu",
                "Fisher",
                "Fox",
                "Garter Snake",
                "Giant Panda",
                "Giant Tortoise",
                "Groundhog",
                "Grouse",
                "Guanaco",
                "Himalayan Tahr",
                "Kangaroo",
                "Koala",
                "Numbat",
                "Quoll",
                "Raccoon dog",
                "Tasmanian Devil",
                "Thornbill",
                "Turkey",
                "Vole",
                "Weasel",
                "Wildcat",
                "Wolf",
                "Wombat",
                "Woodchuck",
                "Woodpecker"
            ],
            farm: [
                "Alpaca",
                "Buffalo",
                "Banteng",
                "Cow",
                "Cat",
                "Chicken",
                "Carp",
                "Camel",
                "Donkey",
                "Dog",
                "Duck",
                "Emu",
                "Goat",
                "Gayal",
                "Guinea",
                "Goose",
                "Horse",
                "Honey",
                "Llama",
                "Pig",
                "Pigeon",
                "Rhea",
                "Rabbit",
                "Sheep",
                "Silkworm",
                "Turkey",
                "Yak",
                "Zebu"
            ],
            pet: [
                "Bearded Dragon",
                "Birds",
                "Burro",
                "Cats",
                "Chameleons",
                "Chickens",
                "Chinchillas",
                "Chinese Water Dragon",
                "Cows",
                "Dogs",
                "Donkey",
                "Ducks",
                "Ferrets",
                "Fish",
                "Geckos",
                "Geese",
                "Gerbils",
                "Goats",
                "Guinea Fowl",
                "Guinea Pigs",
                "Hamsters",
                "Hedgehogs",
                "Horses",
                "Iguanas",
                "Llamas",
                "Lizards",
                "Mice",
                "Mule",
                "Peafowl",
                "Pigs and Hogs",
                "Pigeons",
                "Ponies",
                "Pot Bellied Pig",
                "Rabbits",
                "Rats",
                "Sheep",
                "Skinks",
                "Snakes",
                "Stick Insects",
                "Sugar Gliders",
                "Tarantula",
                "Turkeys",
                "Turtles"
            ],
            zoo: [
                "Aardvark",
                "African Wild Dog",
                "Aldabra Tortoise",
                "American Alligator",
                "American Bison",
                "Amur Tiger",
                "Anaconda",
                "Andean Condor",
                "Asian Elephant",
                "Baby Doll Sheep",
                "Bald Eagle",
                "Barred Owl",
                "Blue Iguana",
                "Boer Goat",
                "California Sea Lion",
                "Caribbean Flamingo",
                "Chinchilla",
                "Collared Lemur",
                "Coquerel's Sifaka",
                "Cuban Amazon Parrot",
                "Ebony Langur",
                "Fennec Fox",
                "Fossa",
                "Gelada",
                "Giant Anteater",
                "Giraffe",
                "Gorilla",
                "Grizzly Bear",
                "Henkel's Leaf-tailed Gecko",
                "Indian Gharial",
                "Indian Rhinoceros",
                "King Cobra",
                "King Vulture",
                "Komodo Dragon",
                "Linne's Two-toed Sloth",
                "Lion",
                "Little Penguin",
                "Madagascar Tree Boa",
                "Magellanic Penguin",
                "Malayan Tapir",
                "Malayan Tiger",
                "Matschies Tree Kangaroo",
                "Mini Donkey",
                "Monarch Butterfly",
                "Nile crocodile",
                "North American Porcupine",
                "Nubian Ibex",
                "Okapi",
                "Poison Dart Frog",
                "Polar Bear",
                "Pygmy Marmoset",
                "Radiated Tortoise",
                "Red Panda",
                "Red Ruffed Lemur",
                "Ring-tailed Lemur",
                "Ring-tailed Mongoose",
                "Rock Hyrax",
                "Small Clawed Asian Otter",
                "Snow Leopard",
                "Snowy Owl",
                "Southern White-faced Owl",
                "Southern White Rhinocerous",
                "Squirrel Monkey",
                "Tufted Puffin",
                "White Cheeked Gibbon",
                "White-throated Bee Eater",
                "Zebra"
            ]
        }
    }, b1 = Object.prototype.hasOwnProperty, p1 = Object.keys || function(a) {
        var e = [];
        for(var n in a)b1.call(a, n) && e.push(n);
        return e;
    };
    a1.prototype.get = function(a) {
        return t1(h1[a]);
    }, a1.prototype.mac_address = function(a) {
        (a = e1(a)).separator || (a.separator = a.networkVersion ? "." : ":");
        return a.networkVersion ? this.n(this.string, 3, {
            pool: "ABCDEF1234567890",
            length: 4
        }).join(a.separator) : this.n(this.string, 6, {
            pool: "ABCDEF1234567890",
            length: 2
        }).join(a.separator);
    }, a1.prototype.normal = function(a) {
        if (a = e1(a, {
            mean: 0,
            dev: 1,
            pool: []
        }), n1(a.pool.constructor !== Array, "Chance: The pool option must be a valid array."), n1("number" != typeof a.mean, "Chance: Mean (mean) must be a number"), n1("number" != typeof a.dev, "Chance: Standard deviation (dev) must be a number"), a.pool.length > 0) return this.normal_pool(a);
        var i, r, o, t, s = a.mean, l = a.dev;
        do i = (r = 2 * this.random() - 1) * r + (o = 2 * this.random() - 1) * o;
        while (i >= 1)
        return t = r * Math.sqrt(-2 * Math.log(i) / i), l * t + s;
    }, a1.prototype.normal_pool = function(a) {
        var e = 0;
        do {
            var n = Math.round(this.normal({
                mean: a.mean,
                dev: a.dev
            }));
            if (n < a.pool.length && n >= 0) return a.pool[n];
            e++;
        }while (e < 100)
        throw new RangeError("Chance: Your pool is too small for the given mean and standard deviation. Please adjust.");
    }, a1.prototype.radio = function(a) {
        var n = "";
        switch((a = e1(a, {
            side: "?"
        })).side.toLowerCase()){
            case "east":
            case "e":
                n = "W";
                break;
            case "west":
            case "w":
                n = "K";
                break;
            default:
                n = this.character({
                    pool: "KW"
                });
        }
        return n + this.character({
            alpha: !0,
            casing: "upper"
        }) + this.character({
            alpha: !0,
            casing: "upper"
        }) + this.character({
            alpha: !0,
            casing: "upper"
        });
    }, a1.prototype.set = function(a, e) {
        "string" == typeof a ? h1[a] = e : h1 = t1(a, h1);
    }, a1.prototype.tv = function(a) {
        return this.radio(a);
    }, a1.prototype.cnpj = function() {
        var a = this.n(this.natural, 8, {
            max: 9
        }), e = 2 + 6 * a[7] + 7 * a[6] + 8 * a[5] + 9 * a[4] + 2 * a[3] + 3 * a[2] + 4 * a[1] + 5 * a[0];
        (e = 11 - e % 11) >= 10 && (e = 0);
        var n = 2 * e + 3 + 7 * a[7] + 8 * a[6] + 9 * a[5] + 2 * a[4] + 3 * a[3] + 4 * a[2] + 5 * a[1] + 6 * a[0];
        return (n = 11 - n % 11) >= 10 && (n = 0), "" + a[0] + a[1] + "." + a[2] + a[3] + a[4] + "." + a[5] + a[6] + a[7] + "/0001-" + e + n;
    }, a1.prototype.mersenne_twister = function(a) {
        return new C1(a);
    }, a1.prototype.blueimp_md5 = function() {
        return new g;
    };
    var C1 = function(a) {
        void 0 === a && (a = Math.floor(Math.random() * Math.pow(10, 13))), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(a);
    };
    C1.prototype.init_genrand = function(a) {
        for(this.mt[0] = a >>> 0, this.mti = 1; this.mti < this.N; this.mti++)a = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30, this.mt[this.mti] = (1812433253 * ((4294901760 & a) >>> 16) << 16) + 1812433253 * (65535 & a) + this.mti, this.mt[this.mti] >>>= 0;
    }, C1.prototype.init_by_array = function(a, e) {
        var n, i, r = 1, o = 0;
        for(this.init_genrand(19650218), n = this.N > e ? this.N : e; n; n--)i = this.mt[r - 1] ^ this.mt[r - 1] >>> 30, this.mt[r] = (this.mt[r] ^ (1664525 * ((4294901760 & i) >>> 16) << 16) + 1664525 * (65535 & i)) + a[o] + o, this.mt[r] >>>= 0, o++, ++r >= this.N && (this.mt[0] = this.mt[this.N - 1], r = 1), o >= e && (o = 0);
        for(n = this.N - 1; n; n--)i = this.mt[r - 1] ^ this.mt[r - 1] >>> 30, this.mt[r] = (this.mt[r] ^ (1566083941 * ((4294901760 & i) >>> 16) << 16) + 1566083941 * (65535 & i)) - r, this.mt[r] >>>= 0, ++r >= this.N && (this.mt[0] = this.mt[this.N - 1], r = 1);
        this.mt[0] = 2147483648;
    }, C1.prototype.genrand_int32 = function() {
        var a, e = new Array(0, this.MATRIX_A);
        if (this.mti >= this.N) {
            var n;
            for(this.mti === this.N + 1 && this.init_genrand(5489), n = 0; n < this.N - this.M; n++)a = this.mt[n] & this.UPPER_MASK | this.mt[n + 1] & this.LOWER_MASK, this.mt[n] = this.mt[n + this.M] ^ a >>> 1 ^ e[1 & a];
            for(; n < this.N - 1; n++)a = this.mt[n] & this.UPPER_MASK | this.mt[n + 1] & this.LOWER_MASK, this.mt[n] = this.mt[n + (this.M - this.N)] ^ a >>> 1 ^ e[1 & a];
            a = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ a >>> 1 ^ e[1 & a], this.mti = 0;
        }
        return a = this.mt[this.mti++], a ^= a >>> 11, a ^= a << 7 & 2636928640, a ^= a << 15 & 4022730752, (a ^= a >>> 18) >>> 0;
    }, C1.prototype.genrand_int31 = function() {
        return this.genrand_int32() >>> 1;
    }, C1.prototype.genrand_real1 = function() {
        return this.genrand_int32() * (1 / 4294967295);
    }, C1.prototype.random = function() {
        return this.genrand_int32() * (1 / 4294967296);
    }, C1.prototype.genrand_real3 = function() {
        return (this.genrand_int32() + .5) * (1 / 4294967296);
    }, C1.prototype.genrand_res53 = function() {
        return (67108864 * (this.genrand_int32() >>> 5) + (this.genrand_int32() >>> 6)) * (1 / 9007199254740992);
    };
    var g = function() {};
    g.prototype.VERSION = "1.0.1", g.prototype.safe_add = function(a, e) {
        var n = (65535 & a) + (65535 & e);
        return (a >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n;
    }, g.prototype.bit_roll = function(a, e) {
        return a << e | a >>> 32 - e;
    }, g.prototype.md5_cmn = function(a, e, n, i, r, o) {
        return this.safe_add(this.bit_roll(this.safe_add(this.safe_add(e, a), this.safe_add(i, o)), r), n);
    }, g.prototype.md5_ff = function(a, e, n, i, r, o, t) {
        return this.md5_cmn(e & n | ~e & i, a, e, r, o, t);
    }, g.prototype.md5_gg = function(a, e, n, i, r, o, t) {
        return this.md5_cmn(e & i | n & ~i, a, e, r, o, t);
    }, g.prototype.md5_hh = function(a, e, n, i, r, o, t) {
        return this.md5_cmn(e ^ n ^ i, a, e, r, o, t);
    }, g.prototype.md5_ii = function(a, e, n, i, r, o, t) {
        return this.md5_cmn(n ^ (e | ~i), a, e, r, o, t);
    }, g.prototype.binl_md5 = function(a, e) {
        a[e >> 5] |= 128 << e % 32, a[14 + (e + 64 >>> 9 << 4)] = e;
        var n, i, r, o, t, s = 1732584193, l = -271733879, c = -1732584194, m = 271733878;
        for(n = 0; n < a.length; n += 16)i = s, r = l, o = c, t = m, s = this.md5_ff(s, l, c, m, a[n], 7, -680876936), m = this.md5_ff(m, s, l, c, a[n + 1], 12, -389564586), c = this.md5_ff(c, m, s, l, a[n + 2], 17, 606105819), l = this.md5_ff(l, c, m, s, a[n + 3], 22, -1044525330), s = this.md5_ff(s, l, c, m, a[n + 4], 7, -176418897), m = this.md5_ff(m, s, l, c, a[n + 5], 12, 1200080426), c = this.md5_ff(c, m, s, l, a[n + 6], 17, -1473231341), l = this.md5_ff(l, c, m, s, a[n + 7], 22, -45705983), s = this.md5_ff(s, l, c, m, a[n + 8], 7, 1770035416), m = this.md5_ff(m, s, l, c, a[n + 9], 12, -1958414417), c = this.md5_ff(c, m, s, l, a[n + 10], 17, -42063), l = this.md5_ff(l, c, m, s, a[n + 11], 22, -1990404162), s = this.md5_ff(s, l, c, m, a[n + 12], 7, 1804603682), m = this.md5_ff(m, s, l, c, a[n + 13], 12, -40341101), c = this.md5_ff(c, m, s, l, a[n + 14], 17, -1502002290), l = this.md5_ff(l, c, m, s, a[n + 15], 22, 1236535329), s = this.md5_gg(s, l, c, m, a[n + 1], 5, -165796510), m = this.md5_gg(m, s, l, c, a[n + 6], 9, -1069501632), c = this.md5_gg(c, m, s, l, a[n + 11], 14, 643717713), l = this.md5_gg(l, c, m, s, a[n], 20, -373897302), s = this.md5_gg(s, l, c, m, a[n + 5], 5, -701558691), m = this.md5_gg(m, s, l, c, a[n + 10], 9, 38016083), c = this.md5_gg(c, m, s, l, a[n + 15], 14, -660478335), l = this.md5_gg(l, c, m, s, a[n + 4], 20, -405537848), s = this.md5_gg(s, l, c, m, a[n + 9], 5, 568446438), m = this.md5_gg(m, s, l, c, a[n + 14], 9, -1019803690), c = this.md5_gg(c, m, s, l, a[n + 3], 14, -187363961), l = this.md5_gg(l, c, m, s, a[n + 8], 20, 1163531501), s = this.md5_gg(s, l, c, m, a[n + 13], 5, -1444681467), m = this.md5_gg(m, s, l, c, a[n + 2], 9, -51403784), c = this.md5_gg(c, m, s, l, a[n + 7], 14, 1735328473), l = this.md5_gg(l, c, m, s, a[n + 12], 20, -1926607734), s = this.md5_hh(s, l, c, m, a[n + 5], 4, -378558), m = this.md5_hh(m, s, l, c, a[n + 8], 11, -2022574463), c = this.md5_hh(c, m, s, l, a[n + 11], 16, 1839030562), l = this.md5_hh(l, c, m, s, a[n + 14], 23, -35309556), s = this.md5_hh(s, l, c, m, a[n + 1], 4, -1530992060), m = this.md5_hh(m, s, l, c, a[n + 4], 11, 1272893353), c = this.md5_hh(c, m, s, l, a[n + 7], 16, -155497632), l = this.md5_hh(l, c, m, s, a[n + 10], 23, -1094730640), s = this.md5_hh(s, l, c, m, a[n + 13], 4, 681279174), m = this.md5_hh(m, s, l, c, a[n], 11, -358537222), c = this.md5_hh(c, m, s, l, a[n + 3], 16, -722521979), l = this.md5_hh(l, c, m, s, a[n + 6], 23, 76029189), s = this.md5_hh(s, l, c, m, a[n + 9], 4, -640364487), m = this.md5_hh(m, s, l, c, a[n + 12], 11, -421815835), c = this.md5_hh(c, m, s, l, a[n + 15], 16, 530742520), l = this.md5_hh(l, c, m, s, a[n + 2], 23, -995338651), s = this.md5_ii(s, l, c, m, a[n], 6, -198630844), m = this.md5_ii(m, s, l, c, a[n + 7], 10, 1126891415), c = this.md5_ii(c, m, s, l, a[n + 14], 15, -1416354905), l = this.md5_ii(l, c, m, s, a[n + 5], 21, -57434055), s = this.md5_ii(s, l, c, m, a[n + 12], 6, 1700485571), m = this.md5_ii(m, s, l, c, a[n + 3], 10, -1894986606), c = this.md5_ii(c, m, s, l, a[n + 10], 15, -1051523), l = this.md5_ii(l, c, m, s, a[n + 1], 21, -2054922799), s = this.md5_ii(s, l, c, m, a[n + 8], 6, 1873313359), m = this.md5_ii(m, s, l, c, a[n + 15], 10, -30611744), c = this.md5_ii(c, m, s, l, a[n + 6], 15, -1560198380), l = this.md5_ii(l, c, m, s, a[n + 13], 21, 1309151649), s = this.md5_ii(s, l, c, m, a[n + 4], 6, -145523070), m = this.md5_ii(m, s, l, c, a[n + 11], 10, -1120210379), c = this.md5_ii(c, m, s, l, a[n + 2], 15, 718787259), l = this.md5_ii(l, c, m, s, a[n + 9], 21, -343485551), s = this.safe_add(s, i), l = this.safe_add(l, r), c = this.safe_add(c, o), m = this.safe_add(m, t);
        return [
            s,
            l,
            c,
            m
        ];
    }, g.prototype.binl2rstr = function(a) {
        var e, n = "";
        for(e = 0; e < 32 * a.length; e += 8)n += String.fromCharCode(a[e >> 5] >>> e % 32 & 255);
        return n;
    }, g.prototype.rstr2binl = function(a) {
        var e, n = [];
        for(n[(a.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1)n[e] = 0;
        for(e = 0; e < 8 * a.length; e += 8)n[e >> 5] |= (255 & a.charCodeAt(e / 8)) << e % 32;
        return n;
    }, g.prototype.rstr_md5 = function(a) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(a), 8 * a.length));
    }, g.prototype.rstr_hmac_md5 = function(a, e) {
        var n, i, r = this.rstr2binl(a), o = [], t = [];
        for(o[15] = t[15] = void 0, r.length > 16 && (r = this.binl_md5(r, 8 * a.length)), n = 0; n < 16; n += 1)o[n] = 909522486 ^ r[n], t[n] = 1549556828 ^ r[n];
        return i = this.binl_md5(o.concat(this.rstr2binl(e)), 512 + 8 * e.length), this.binl2rstr(this.binl_md5(t.concat(i), 640));
    }, g.prototype.rstr2hex = function(a) {
        var e, n, i = "";
        for(n = 0; n < a.length; n += 1)e = a.charCodeAt(n), i += "0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(15 & e);
        return i;
    }, g.prototype.str2rstr_utf8 = function(a) {
        return unescape(encodeURIComponent(a));
    }, g.prototype.raw_md5 = function(a) {
        return this.rstr_md5(this.str2rstr_utf8(a));
    }, g.prototype.hex_md5 = function(a) {
        return this.rstr2hex(this.raw_md5(a));
    }, g.prototype.raw_hmac_md5 = function(a, e) {
        return this.rstr_hmac_md5(this.str2rstr_utf8(a), this.str2rstr_utf8(e));
    }, g.prototype.hex_hmac_md5 = function(a, e) {
        return this.rstr2hex(this.raw_hmac_md5(a, e));
    }, g.prototype.md5 = function(a, e, n) {
        return e ? n ? this.raw_hmac_md5(e, a) : this.hex_hmac_md5(e, a) : n ? this.raw_md5(a) : this.hex_md5(a);
    }, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (exports = module.exports = a1), exports.Chance = a1), "function" == typeof define && define.amd && define([], function() {
        return a1;
    }), "undefined" != typeof importScripts && (chance = new a1, self.Chance = a1), "object" == typeof window && "object" == typeof window.document && (window.Chance = a1, window.chance = new a1);
}(); //# sourceMappingURL=chance.min.js.map

//# sourceMappingURL=index.2c0125d3.js.map
