!function (e) {
    var t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        var r = t[o] = {i: o, l: !1, exports: {}};
        return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var r in e) n.d(o, r, function (t) {
            return e[t]
        }.bind(null, r));
        return o
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function (e, t, n) {
    n(1), e.exports = n(2)
}, function (e, t) {
    var n = "http://test.kluatr.ru/api/user/login";
    document.getElementById("login-button").addEventListener("click", function (e) {
        var t = new XMLHttpRequest,
            o = "email=" + encodeURIComponent(document.getElementById("login").value) + "&password=" + encodeURIComponent(document.getElementById("pass").value);
        t.open("POST", n, !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), t.onreadystatechange = function () {
            4 === t.readyState && (200 === t.status ? function (e) {
                document.getElementById("login-done").classList.remove("hide"), document.getElementById("login-form").classList.add("hide"), document.getElementById("user-name").innerHTML += e.name
            }(JSON.parse(this.responseText).data) : 400 === t.status ? document.getElementById("error-msg").classList.remove("hide") : alert("Что-то пошло не так"))
        }, t.send(o)
    }, !0)
}, function (e, t, n) {
}]);
//# sourceMappingURL=bundle.js.map