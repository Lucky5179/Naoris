/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var ey = Object.create;
  var Fn = Object.defineProperty;
  var ty = Object.getOwnPropertyDescriptor;
  var ny = Object.getOwnPropertyNames;
  var ry = Object.getPrototypeOf,
    iy = Object.prototype.hasOwnProperty;
  var me = (e, t) => () => (e && (t = e((e = 0))), t);
  var d = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Me = (e, t) => {
      for (var n in t) Fn(e, n, { get: t[n], enumerable: !0 });
    },
    ha = (e, t, n, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of ny(t))
          !iy.call(e, i) &&
            i !== n &&
            Fn(e, i, {
              get: () => t[i],
              enumerable: !(r = ty(t, i)) || r.enumerable,
            });
      return e;
    };
  var de = (e, t, n) => (
      (n = e != null ? ey(ry(e)) : {}),
      ha(
        t || !e || !e.__esModule
          ? Fn(n, "default", { value: e, enumerable: !0 })
          : n,
        e
      )
    ),
    $e = (e) => ha(Fn({}, "__esModule", { value: !0 }), e);
  var va = d(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let r = function (a) {
          let u = window.getComputedStyle(a, null),
            l = u.getPropertyValue("position"),
            _ = u.getPropertyValue("overflow"),
            v = u.getPropertyValue("display");
          (!l || l === "static") && (a.style.position = "relative"),
            _ !== "hidden" && (a.style.overflow = "hidden"),
            (!v || v === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            l = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let _ in l)
            u.getPropertyValue(_) !== l[_] && (a.style[_] = l[_]);
        },
        o = function (a) {
          let u = a.parentNode;
          r(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let l = a[u].nodeName.toLowerCase();
            if (l === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              l === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var ya = d(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(r) {
        Webflow.env("design") ||
          ($("video").each(function () {
            r && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            r ? n($(this)) : t($(this));
          }));
      }
      function t(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function n(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let r = window.matchMedia("(prefers-reduced-motion: reduce)");
        r.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          r.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                n(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var $r = d(() => {
    "use strict";
    window.tram = (function (e) {
      function t(f, I) {
        var A = new V.Bare();
        return A.init(f, I);
      }
      function n(f) {
        return f.replace(/[A-Z]/g, function (I) {
          return "-" + I.toLowerCase();
        });
      }
      function r(f) {
        var I = parseInt(f.slice(1), 16),
          A = (I >> 16) & 255,
          N = (I >> 8) & 255,
          k = 255 & I;
        return [A, N, k];
      }
      function i(f, I, A) {
        return (
          "#" + ((1 << 24) | (f << 16) | (I << 8) | A).toString(16).slice(1)
        );
      }
      function o() {}
      function s(f, I) {
        l("Type warning: Expected: [" + f + "] Got: [" + typeof I + "] " + I);
      }
      function a(f, I, A) {
        l("Units do not match [" + f + "]: " + I + ", " + A);
      }
      function u(f, I, A) {
        if ((I !== void 0 && (A = I), f === void 0)) return A;
        var N = A;
        return (
          xe.test(f) || !Ge.test(f)
            ? (N = parseInt(f, 10))
            : Ge.test(f) && (N = 1e3 * parseFloat(f)),
          0 > N && (N = 0),
          N === N ? N : A
        );
      }
      function l(f) {
        z.debug && window && window.console.warn(f);
      }
      function _(f) {
        for (var I = -1, A = f ? f.length : 0, N = []; ++I < A; ) {
          var k = f[I];
          k && N.push(k);
        }
        return N;
      }
      var v = (function (f, I, A) {
          function N(se) {
            return typeof se == "object";
          }
          function k(se) {
            return typeof se == "function";
          }
          function G() {}
          function ie(se, oe) {
            function B() {
              var Se = new ue();
              return k(Se.init) && Se.init.apply(Se, arguments), Se;
            }
            function ue() {}
            oe === A && ((oe = se), (se = Object)), (B.Bare = ue);
            var le,
              Ie = (G[f] = se[f]),
              Xe = (ue[f] = B[f] = new G());
            return (
              (Xe.constructor = B),
              (B.mixin = function (Se) {
                return (ue[f] = B[f] = ie(B, Se)[f]), B;
              }),
              (B.open = function (Se) {
                if (
                  ((le = {}),
                  k(Se) ? (le = Se.call(B, Xe, Ie, B, se)) : N(Se) && (le = Se),
                  N(le))
                )
                  for (var an in le) I.call(le, an) && (Xe[an] = le[an]);
                return k(Xe.init) || (Xe.init = se), B;
              }),
              B.open(oe)
            );
          }
          return ie;
        })("prototype", {}.hasOwnProperty),
        g = {
          ease: [
            "ease",
            function (f, I, A, N) {
              var k = (f /= N) * f,
                G = k * f;
              return (
                I +
                A * (-2.75 * G * k + 11 * k * k + -15.5 * G + 8 * k + 0.25 * f)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (f, I, A, N) {
              var k = (f /= N) * f,
                G = k * f;
              return I + A * (-1 * G * k + 3 * k * k + -3 * G + 2 * k);
            },
          ],
          "ease-out": [
            "ease-out",
            function (f, I, A, N) {
              var k = (f /= N) * f,
                G = k * f;
              return (
                I +
                A * (0.3 * G * k + -1.6 * k * k + 2.2 * G + -1.8 * k + 1.9 * f)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (f, I, A, N) {
              var k = (f /= N) * f,
                G = k * f;
              return I + A * (2 * G * k + -5 * k * k + 2 * G + 2 * k);
            },
          ],
          linear: [
            "linear",
            function (f, I, A, N) {
              return (A * f) / N + I;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (f, I, A, N) {
              return A * (f /= N) * f + I;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (f, I, A, N) {
              return -A * (f /= N) * (f - 2) + I;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (f, I, A, N) {
              return (f /= N / 2) < 1
                ? (A / 2) * f * f + I
                : (-A / 2) * (--f * (f - 2) - 1) + I;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (f, I, A, N) {
              return A * (f /= N) * f * f + I;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (f, I, A, N) {
              return A * ((f = f / N - 1) * f * f + 1) + I;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (f, I, A, N) {
              return (f /= N / 2) < 1
                ? (A / 2) * f * f * f + I
                : (A / 2) * ((f -= 2) * f * f + 2) + I;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (f, I, A, N) {
              return A * (f /= N) * f * f * f + I;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (f, I, A, N) {
              return -A * ((f = f / N - 1) * f * f * f - 1) + I;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (f, I, A, N) {
              return (f /= N / 2) < 1
                ? (A / 2) * f * f * f * f + I
                : (-A / 2) * ((f -= 2) * f * f * f - 2) + I;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (f, I, A, N) {
              return A * (f /= N) * f * f * f * f + I;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (f, I, A, N) {
              return A * ((f = f / N - 1) * f * f * f * f + 1) + I;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (f, I, A, N) {
              return (f /= N / 2) < 1
                ? (A / 2) * f * f * f * f * f + I
                : (A / 2) * ((f -= 2) * f * f * f * f + 2) + I;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (f, I, A, N) {
              return -A * Math.cos((f / N) * (Math.PI / 2)) + A + I;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (f, I, A, N) {
              return A * Math.sin((f / N) * (Math.PI / 2)) + I;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (f, I, A, N) {
              return (-A / 2) * (Math.cos((Math.PI * f) / N) - 1) + I;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (f, I, A, N) {
              return f === 0 ? I : A * Math.pow(2, 10 * (f / N - 1)) + I;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (f, I, A, N) {
              return f === N
                ? I + A
                : A * (-Math.pow(2, (-10 * f) / N) + 1) + I;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (f, I, A, N) {
              return f === 0
                ? I
                : f === N
                ? I + A
                : (f /= N / 2) < 1
                ? (A / 2) * Math.pow(2, 10 * (f - 1)) + I
                : (A / 2) * (-Math.pow(2, -10 * --f) + 2) + I;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (f, I, A, N) {
              return -A * (Math.sqrt(1 - (f /= N) * f) - 1) + I;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (f, I, A, N) {
              return A * Math.sqrt(1 - (f = f / N - 1) * f) + I;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (f, I, A, N) {
              return (f /= N / 2) < 1
                ? (-A / 2) * (Math.sqrt(1 - f * f) - 1) + I
                : (A / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + I;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (f, I, A, N, k) {
              return (
                k === void 0 && (k = 1.70158),
                A * (f /= N) * f * ((k + 1) * f - k) + I
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (f, I, A, N, k) {
              return (
                k === void 0 && (k = 1.70158),
                A * ((f = f / N - 1) * f * ((k + 1) * f + k) + 1) + I
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (f, I, A, N, k) {
              return (
                k === void 0 && (k = 1.70158),
                (f /= N / 2) < 1
                  ? (A / 2) * f * f * (((k *= 1.525) + 1) * f - k) + I
                  : (A / 2) *
                      ((f -= 2) * f * (((k *= 1.525) + 1) * f + k) + 2) +
                    I
              );
            },
          ],
        },
        y = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        b = document,
        T = window,
        R = "bkwld-tram",
        w = /[\-\.0-9]/g,
        L = /[A-Z]/,
        C = "number",
        D = /^(rgb|#)/,
        q = /(em|cm|mm|in|pt|pc|px)$/,
        M = /(em|cm|mm|in|pt|pc|px|%)$/,
        j = /(deg|rad|turn)$/,
        Y = "unitless",
        Q = /(all|none) 0s ease 0s/,
        J = /^(width|height)$/,
        W = " ",
        O = b.createElement("a"),
        E = ["Webkit", "Moz", "O", "ms"],
        F = ["-webkit-", "-moz-", "-o-", "-ms-"],
        X = function (f) {
          if (f in O.style) return { dom: f, css: f };
          var I,
            A,
            N = "",
            k = f.split("-");
          for (I = 0; I < k.length; I++)
            N += k[I].charAt(0).toUpperCase() + k[I].slice(1);
          for (I = 0; I < E.length; I++)
            if (((A = E[I] + N), A in O.style))
              return { dom: A, css: F[I] + f };
        },
        H = (t.support = {
          bind: Function.prototype.bind,
          transform: X("transform"),
          transition: X("transition"),
          backface: X("backface-visibility"),
          timing: X("transition-timing-function"),
        });
      if (H.transition) {
        var te = H.timing.dom;
        if (((O.style[te] = g["ease-in-back"][0]), !O.style[te]))
          for (var ne in y) g[ne][0] = y[ne];
      }
      var ce = (t.frame = (function () {
          var f =
            T.requestAnimationFrame ||
            T.webkitRequestAnimationFrame ||
            T.mozRequestAnimationFrame ||
            T.oRequestAnimationFrame ||
            T.msRequestAnimationFrame;
          return f && H.bind
            ? f.bind(T)
            : function (I) {
                T.setTimeout(I, 16);
              };
        })()),
        ge = (t.now = (function () {
          var f = T.performance,
            I = f && (f.now || f.webkitNow || f.msNow || f.mozNow);
          return I && H.bind
            ? I.bind(f)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        m = v(function (f) {
          function I(ae, fe) {
            var Ee = _(("" + ae).split(W)),
              he = Ee[0];
            fe = fe || {};
            var Re = K[he];
            if (!Re) return l("Unsupported property: " + he);
            if (!fe.weak || !this.props[he]) {
              var We = Re[0],
                De = this.props[he];
              return (
                De || (De = this.props[he] = new We.Bare()),
                De.init(this.$el, Ee, Re, fe),
                De
              );
            }
          }
          function A(ae, fe, Ee) {
            if (ae) {
              var he = typeof ae;
              if (
                (fe ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                he == "number" && fe)
              )
                return (
                  (this.timer = new ee({
                    duration: ae,
                    context: this,
                    complete: G,
                  })),
                  void (this.active = !0)
                );
              if (he == "string" && fe) {
                switch (ae) {
                  case "hide":
                    B.call(this);
                    break;
                  case "stop":
                    ie.call(this);
                    break;
                  case "redraw":
                    ue.call(this);
                    break;
                  default:
                    I.call(this, ae, Ee && Ee[1]);
                }
                return G.call(this);
              }
              if (he == "function") return void ae.call(this, this);
              if (he == "object") {
                var Re = 0;
                Xe.call(
                  this,
                  ae,
                  function (be, Jv) {
                    be.span > Re && (Re = be.span), be.stop(), be.animate(Jv);
                  },
                  function (be) {
                    "wait" in be && (Re = u(be.wait, 0));
                  }
                ),
                  Ie.call(this),
                  Re > 0 &&
                    ((this.timer = new ee({ duration: Re, context: this })),
                    (this.active = !0),
                    fe && (this.timer.complete = G));
                var We = this,
                  De = !1,
                  Mn = {};
                ce(function () {
                  Xe.call(We, ae, function (be) {
                    be.active && ((De = !0), (Mn[be.name] = be.nextStyle));
                  }),
                    De && We.$el.css(Mn);
                });
              }
            }
          }
          function N(ae) {
            (ae = u(ae, 0)),
              this.active
                ? this.queue.push({ options: ae })
                : ((this.timer = new ee({
                    duration: ae,
                    context: this,
                    complete: G,
                  })),
                  (this.active = !0));
          }
          function k(ae) {
            return this.active
              ? (this.queue.push({ options: ae, args: arguments }),
                void (this.timer.complete = G))
              : l(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function G() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var ae = this.queue.shift();
              A.call(this, ae.options, !0, ae.args);
            }
          }
          function ie(ae) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var fe;
            typeof ae == "string"
              ? ((fe = {}), (fe[ae] = 1))
              : (fe = typeof ae == "object" && ae != null ? ae : this.props),
              Xe.call(this, fe, Se),
              Ie.call(this);
          }
          function se(ae) {
            ie.call(this, ae), Xe.call(this, ae, an, $v);
          }
          function oe(ae) {
            typeof ae != "string" && (ae = "block"),
              (this.el.style.display = ae);
          }
          function B() {
            ie.call(this), (this.el.style.display = "none");
          }
          function ue() {
            this.el.offsetHeight;
          }
          function le() {
            ie.call(this),
              e.removeData(this.el, R),
              (this.$el = this.el = null);
          }
          function Ie() {
            var ae,
              fe,
              Ee = [];
            this.upstream && Ee.push(this.upstream);
            for (ae in this.props)
              (fe = this.props[ae]), fe.active && Ee.push(fe.string);
            (Ee = Ee.join(",")),
              this.style !== Ee &&
                ((this.style = Ee), (this.el.style[H.transition.dom] = Ee));
          }
          function Xe(ae, fe, Ee) {
            var he,
              Re,
              We,
              De,
              Mn = fe !== Se,
              be = {};
            for (he in ae)
              (We = ae[he]),
                he in pe
                  ? (be.transform || (be.transform = {}),
                    (be.transform[he] = We))
                  : (L.test(he) && (he = n(he)),
                    he in K ? (be[he] = We) : (De || (De = {}), (De[he] = We)));
            for (he in be) {
              if (((We = be[he]), (Re = this.props[he]), !Re)) {
                if (!Mn) continue;
                Re = I.call(this, he);
              }
              fe.call(this, Re, We);
            }
            Ee && De && Ee.call(this, De);
          }
          function Se(ae) {
            ae.stop();
          }
          function an(ae, fe) {
            ae.set(fe);
          }
          function $v(ae) {
            this.$el.css(ae);
          }
          function Ve(ae, fe) {
            f[ae] = function () {
              return this.children
                ? Zv.call(this, fe, arguments)
                : (this.el && fe.apply(this, arguments), this);
            };
          }
          function Zv(ae, fe) {
            var Ee,
              he = this.children.length;
            for (Ee = 0; he > Ee; Ee++) ae.apply(this.children[Ee], fe);
            return this;
          }
          (f.init = function (ae) {
            if (
              ((this.$el = e(ae)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              z.keepInherited && !z.fallback)
            ) {
              var fe = U(this.el, "transition");
              fe && !Q.test(fe) && (this.upstream = fe);
            }
            H.backface &&
              z.hideBackface &&
              p(this.el, H.backface.css, "hidden");
          }),
            Ve("add", I),
            Ve("start", A),
            Ve("wait", N),
            Ve("then", k),
            Ve("next", G),
            Ve("stop", ie),
            Ve("set", se),
            Ve("show", oe),
            Ve("hide", B),
            Ve("redraw", ue),
            Ve("destroy", le);
        }),
        V = v(m, function (f) {
          function I(A, N) {
            var k = e.data(A, R) || e.data(A, R, new m.Bare());
            return k.el || k.init(A), N ? k.start(N) : k;
          }
          f.init = function (A, N) {
            var k = e(A);
            if (!k.length) return this;
            if (k.length === 1) return I(k[0], N);
            var G = [];
            return (
              k.each(function (ie, se) {
                G.push(I(se, N));
              }),
              (this.children = G),
              this
            );
          };
        }),
        h = v(function (f) {
          function I() {
            var G = this.get();
            this.update("auto");
            var ie = this.get();
            return this.update(G), ie;
          }
          function A(G, ie, se) {
            return ie !== void 0 && (se = ie), G in g ? G : se;
          }
          function N(G) {
            var ie = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(G);
            return (ie ? i(ie[1], ie[2], ie[3]) : G).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var k = { duration: 500, ease: "ease", delay: 0 };
          (f.init = function (G, ie, se, oe) {
            (this.$el = G), (this.el = G[0]);
            var B = ie[0];
            se[2] && (B = se[2]),
              Z[B] && (B = Z[B]),
              (this.name = B),
              (this.type = se[1]),
              (this.duration = u(ie[1], this.duration, k.duration)),
              (this.ease = A(ie[2], this.ease, k.ease)),
              (this.delay = u(ie[3], this.delay, k.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = J.test(this.name)),
              (this.unit = oe.unit || this.unit || z.defaultUnit),
              (this.angle = oe.angle || this.angle || z.defaultAngle),
              z.fallback || oe.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    W +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? W + g[this.ease][0] : "") +
                    (this.delay ? W + this.delay + "ms" : "")));
          }),
            (f.set = function (G) {
              (G = this.convert(G, this.type)), this.update(G), this.redraw();
            }),
            (f.transition = function (G) {
              (this.active = !0),
                (G = this.convert(G, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  G == "auto" && (G = I.call(this))),
                (this.nextStyle = G);
            }),
            (f.fallback = function (G) {
              var ie =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (G = this.convert(G, this.type)),
                this.auto &&
                  (ie == "auto" && (ie = this.convert(this.get(), this.type)),
                  G == "auto" && (G = I.call(this))),
                (this.tween = new P({
                  from: ie,
                  to: G,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (f.get = function () {
              return U(this.el, this.name);
            }),
            (f.update = function (G) {
              p(this.el, this.name, G);
            }),
            (f.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                p(this.el, this.name, this.get()));
              var G = this.tween;
              G && G.context && G.destroy();
            }),
            (f.convert = function (G, ie) {
              if (G == "auto" && this.auto) return G;
              var se,
                oe = typeof G == "number",
                B = typeof G == "string";
              switch (ie) {
                case C:
                  if (oe) return G;
                  if (B && G.replace(w, "") === "") return +G;
                  se = "number(unitless)";
                  break;
                case D:
                  if (B) {
                    if (G === "" && this.original) return this.original;
                    if (ie.test(G))
                      return G.charAt(0) == "#" && G.length == 7 ? G : N(G);
                  }
                  se = "hex or rgb string";
                  break;
                case q:
                  if (oe) return G + this.unit;
                  if (B && ie.test(G)) return G;
                  se = "number(px) or string(unit)";
                  break;
                case M:
                  if (oe) return G + this.unit;
                  if (B && ie.test(G)) return G;
                  se = "number(px) or string(unit or %)";
                  break;
                case j:
                  if (oe) return G + this.angle;
                  if (B && ie.test(G)) return G;
                  se = "number(deg) or string(angle)";
                  break;
                case Y:
                  if (oe || (B && M.test(G))) return G;
                  se = "number(unitless) or string(unit or %)";
              }
              return s(se, G), G;
            }),
            (f.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        c = v(h, function (f, I) {
          f.init = function () {
            I.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), D));
          };
        }),
        S = v(h, function (f, I) {
          (f.init = function () {
            I.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (f.get = function () {
              return this.$el[this.name]();
            }),
            (f.update = function (A) {
              this.$el[this.name](A);
            });
        }),
        x = v(h, function (f, I) {
          function A(N, k) {
            var G, ie, se, oe, B;
            for (G in N)
              (oe = pe[G]),
                (se = oe[0]),
                (ie = oe[1] || G),
                (B = this.convert(N[G], se)),
                k.call(this, ie, B, se);
          }
          (f.init = function () {
            I.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                pe.perspective &&
                  z.perspective &&
                  ((this.current.perspective = z.perspective),
                  p(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (f.set = function (N) {
              A.call(this, N, function (k, G) {
                this.current[k] = G;
              }),
                p(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (f.transition = function (N) {
              var k = this.values(N);
              this.tween = new re({
                current: this.current,
                values: k,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var G,
                ie = {};
              for (G in this.current) ie[G] = G in k ? k[G] : this.current[G];
              (this.active = !0), (this.nextStyle = this.style(ie));
            }),
            (f.fallback = function (N) {
              var k = this.values(N);
              this.tween = new re({
                current: this.current,
                values: k,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (f.update = function () {
              p(this.el, this.name, this.style(this.current));
            }),
            (f.style = function (N) {
              var k,
                G = "";
              for (k in N) G += k + "(" + N[k] + ") ";
              return G;
            }),
            (f.values = function (N) {
              var k,
                G = {};
              return (
                A.call(this, N, function (ie, se, oe) {
                  (G[ie] = se),
                    this.current[ie] === void 0 &&
                      ((k = 0),
                      ~ie.indexOf("scale") && (k = 1),
                      (this.current[ie] = this.convert(k, oe)));
                }),
                G
              );
            });
        }),
        P = v(function (f) {
          function I(B) {
            se.push(B) === 1 && ce(A);
          }
          function A() {
            var B,
              ue,
              le,
              Ie = se.length;
            if (Ie)
              for (ce(A), ue = ge(), B = Ie; B--; )
                (le = se[B]), le && le.render(ue);
          }
          function N(B) {
            var ue,
              le = e.inArray(B, se);
            le >= 0 &&
              ((ue = se.slice(le + 1)),
              (se.length = le),
              ue.length && (se = se.concat(ue)));
          }
          function k(B) {
            return Math.round(B * oe) / oe;
          }
          function G(B, ue, le) {
            return i(
              B[0] + le * (ue[0] - B[0]),
              B[1] + le * (ue[1] - B[1]),
              B[2] + le * (ue[2] - B[2])
            );
          }
          var ie = { ease: g.ease[1], from: 0, to: 1 };
          (f.init = function (B) {
            (this.duration = B.duration || 0), (this.delay = B.delay || 0);
            var ue = B.ease || ie.ease;
            g[ue] && (ue = g[ue][1]),
              typeof ue != "function" && (ue = ie.ease),
              (this.ease = ue),
              (this.update = B.update || o),
              (this.complete = B.complete || o),
              (this.context = B.context || this),
              (this.name = B.name);
            var le = B.from,
              Ie = B.to;
            le === void 0 && (le = ie.from),
              Ie === void 0 && (Ie = ie.to),
              (this.unit = B.unit || ""),
              typeof le == "number" && typeof Ie == "number"
                ? ((this.begin = le), (this.change = Ie - le))
                : this.format(Ie, le),
              (this.value = this.begin + this.unit),
              (this.start = ge()),
              B.autoplay !== !1 && this.play();
          }),
            (f.play = function () {
              this.active ||
                (this.start || (this.start = ge()),
                (this.active = !0),
                I(this));
            }),
            (f.stop = function () {
              this.active && ((this.active = !1), N(this));
            }),
            (f.render = function (B) {
              var ue,
                le = B - this.start;
              if (this.delay) {
                if (le <= this.delay) return;
                le -= this.delay;
              }
              if (le < this.duration) {
                var Ie = this.ease(le, 0, 1, this.duration);
                return (
                  (ue = this.startRGB
                    ? G(this.startRGB, this.endRGB, Ie)
                    : k(this.begin + Ie * this.change)),
                  (this.value = ue + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ue = this.endHex || this.begin + this.change),
                (this.value = ue + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (f.format = function (B, ue) {
              if (((ue += ""), (B += ""), B.charAt(0) == "#"))
                return (
                  (this.startRGB = r(ue)),
                  (this.endRGB = r(B)),
                  (this.endHex = B),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var le = ue.replace(w, ""),
                  Ie = B.replace(w, "");
                le !== Ie && a("tween", ue, B), (this.unit = le);
              }
              (ue = parseFloat(ue)),
                (B = parseFloat(B)),
                (this.begin = this.value = ue),
                (this.change = B - ue);
            }),
            (f.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var se = [],
            oe = 1e3;
        }),
        ee = v(P, function (f) {
          (f.init = function (I) {
            (this.duration = I.duration || 0),
              (this.complete = I.complete || o),
              (this.context = I.context),
              this.play();
          }),
            (f.render = function (I) {
              var A = I - this.start;
              A < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        re = v(P, function (f, I) {
          (f.init = function (A) {
            (this.context = A.context),
              (this.update = A.update),
              (this.tweens = []),
              (this.current = A.current);
            var N, k;
            for (N in A.values)
              (k = A.values[N]),
                this.current[N] !== k &&
                  this.tweens.push(
                    new P({
                      name: N,
                      from: this.current[N],
                      to: k,
                      duration: A.duration,
                      delay: A.delay,
                      ease: A.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (f.render = function (A) {
              var N,
                k,
                G = this.tweens.length,
                ie = !1;
              for (N = G; N--; )
                (k = this.tweens[N]),
                  k.context &&
                    (k.render(A), (this.current[k.name] = k.value), (ie = !0));
              return ie
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (f.destroy = function () {
              if ((I.destroy.call(this), this.tweens)) {
                var A,
                  N = this.tweens.length;
                for (A = N; A--; ) this.tweens[A].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        z = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !H.transition,
          agentTests: [],
        });
      (t.fallback = function (f) {
        if (!H.transition) return (z.fallback = !0);
        z.agentTests.push("(" + f + ")");
        var I = new RegExp(z.agentTests.join("|"), "i");
        z.fallback = I.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (f) {
          return new P(f);
        }),
        (t.delay = function (f, I, A) {
          return new ee({ complete: I, duration: f, context: A });
        }),
        (e.fn.tram = function (f) {
          return t.call(null, this, f);
        });
      var p = e.style,
        U = e.css,
        Z = { transform: H.transform && H.transform.css },
        K = {
          color: [c, D],
          background: [c, D, "background-color"],
          "outline-color": [c, D],
          "border-color": [c, D],
          "border-top-color": [c, D],
          "border-right-color": [c, D],
          "border-bottom-color": [c, D],
          "border-left-color": [c, D],
          "border-width": [h, q],
          "border-top-width": [h, q],
          "border-right-width": [h, q],
          "border-bottom-width": [h, q],
          "border-left-width": [h, q],
          "border-spacing": [h, q],
          "letter-spacing": [h, q],
          margin: [h, q],
          "margin-top": [h, q],
          "margin-right": [h, q],
          "margin-bottom": [h, q],
          "margin-left": [h, q],
          padding: [h, q],
          "padding-top": [h, q],
          "padding-right": [h, q],
          "padding-bottom": [h, q],
          "padding-left": [h, q],
          "outline-width": [h, q],
          opacity: [h, C],
          top: [h, M],
          right: [h, M],
          bottom: [h, M],
          left: [h, M],
          "font-size": [h, M],
          "text-indent": [h, M],
          "word-spacing": [h, M],
          width: [h, M],
          "min-width": [h, M],
          "max-width": [h, M],
          height: [h, M],
          "min-height": [h, M],
          "max-height": [h, M],
          "line-height": [h, Y],
          "scroll-top": [S, C, "scrollTop"],
          "scroll-left": [S, C, "scrollLeft"],
        },
        pe = {};
      H.transform &&
        ((K.transform = [x]),
        (pe = {
          x: [M, "translateX"],
          y: [M, "translateY"],
          rotate: [j],
          rotateX: [j],
          rotateY: [j],
          scale: [C],
          scaleX: [C],
          scaleY: [C],
          skew: [j],
          skewX: [j],
          skewY: [j],
        })),
        H.transform &&
          H.backface &&
          ((pe.z = [M, "translateZ"]),
          (pe.rotateZ = [j]),
          (pe.scaleZ = [C]),
          (pe.perspective = [q]));
      var xe = /ms/,
        Ge = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Ea = d((KF, ma) => {
    "use strict";
    var oy = window.$,
      ay = $r() && oy.tram;
    ma.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        n = Array.prototype,
        r = Object.prototype,
        i = Function.prototype,
        o = n.push,
        s = n.slice,
        a = n.concat,
        u = r.toString,
        l = r.hasOwnProperty,
        _ = n.forEach,
        v = n.map,
        g = n.reduce,
        y = n.reduceRight,
        b = n.filter,
        T = n.every,
        R = n.some,
        w = n.indexOf,
        L = n.lastIndexOf,
        C = Array.isArray,
        D = Object.keys,
        q = i.bind,
        M =
          (e.each =
          e.forEach =
            function (E, F, X) {
              if (E == null) return E;
              if (_ && E.forEach === _) E.forEach(F, X);
              else if (E.length === +E.length) {
                for (var H = 0, te = E.length; H < te; H++)
                  if (F.call(X, E[H], H, E) === t) return;
              } else
                for (var ne = e.keys(E), H = 0, te = ne.length; H < te; H++)
                  if (F.call(X, E[ne[H]], ne[H], E) === t) return;
              return E;
            });
      (e.map = e.collect =
        function (E, F, X) {
          var H = [];
          return E == null
            ? H
            : v && E.map === v
            ? E.map(F, X)
            : (M(E, function (te, ne, ce) {
                H.push(F.call(X, te, ne, ce));
              }),
              H);
        }),
        (e.find = e.detect =
          function (E, F, X) {
            var H;
            return (
              j(E, function (te, ne, ce) {
                if (F.call(X, te, ne, ce)) return (H = te), !0;
              }),
              H
            );
          }),
        (e.filter = e.select =
          function (E, F, X) {
            var H = [];
            return E == null
              ? H
              : b && E.filter === b
              ? E.filter(F, X)
              : (M(E, function (te, ne, ce) {
                  F.call(X, te, ne, ce) && H.push(te);
                }),
                H);
          });
      var j =
        (e.some =
        e.any =
          function (E, F, X) {
            F || (F = e.identity);
            var H = !1;
            return E == null
              ? H
              : R && E.some === R
              ? E.some(F, X)
              : (M(E, function (te, ne, ce) {
                  if (H || (H = F.call(X, te, ne, ce))) return t;
                }),
                !!H);
          });
      (e.contains = e.include =
        function (E, F) {
          return E == null
            ? !1
            : w && E.indexOf === w
            ? E.indexOf(F) != -1
            : j(E, function (X) {
                return X === F;
              });
        }),
        (e.delay = function (E, F) {
          var X = s.call(arguments, 2);
          return setTimeout(function () {
            return E.apply(null, X);
          }, F);
        }),
        (e.defer = function (E) {
          return e.delay.apply(e, [E, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (E) {
          var F, X, H;
          return function () {
            F ||
              ((F = !0),
              (X = arguments),
              (H = this),
              ay.frame(function () {
                (F = !1), E.apply(H, X);
              }));
          };
        }),
        (e.debounce = function (E, F, X) {
          var H,
            te,
            ne,
            ce,
            ge,
            m = function () {
              var V = e.now() - ce;
              V < F
                ? (H = setTimeout(m, F - V))
                : ((H = null), X || ((ge = E.apply(ne, te)), (ne = te = null)));
            };
          return function () {
            (ne = this), (te = arguments), (ce = e.now());
            var V = X && !H;
            return (
              H || (H = setTimeout(m, F)),
              V && ((ge = E.apply(ne, te)), (ne = te = null)),
              ge
            );
          };
        }),
        (e.defaults = function (E) {
          if (!e.isObject(E)) return E;
          for (var F = 1, X = arguments.length; F < X; F++) {
            var H = arguments[F];
            for (var te in H) E[te] === void 0 && (E[te] = H[te]);
          }
          return E;
        }),
        (e.keys = function (E) {
          if (!e.isObject(E)) return [];
          if (D) return D(E);
          var F = [];
          for (var X in E) e.has(E, X) && F.push(X);
          return F;
        }),
        (e.has = function (E, F) {
          return l.call(E, F);
        }),
        (e.isObject = function (E) {
          return E === Object(E);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var Y = /(.)^/,
        Q = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        J = /\\|'|\r|\n|\u2028|\u2029/g,
        W = function (E) {
          return "\\" + Q[E];
        },
        O = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (E, F, X) {
          !F && X && (F = X), (F = e.defaults({}, F, e.templateSettings));
          var H = RegExp(
              [
                (F.escape || Y).source,
                (F.interpolate || Y).source,
                (F.evaluate || Y).source,
              ].join("|") + "|$",
              "g"
            ),
            te = 0,
            ne = "__p+='";
          E.replace(H, function (V, h, c, S, x) {
            return (
              (ne += E.slice(te, x).replace(J, W)),
              (te = x + V.length),
              h
                ? (ne +=
                    `'+
((__t=(` +
                    h +
                    `))==null?'':_.escape(__t))+
'`)
                : c
                ? (ne +=
                    `'+
((__t=(` +
                    c +
                    `))==null?'':__t)+
'`)
                : S &&
                  (ne +=
                    `';
` +
                    S +
                    `
__p+='`),
              V
            );
          }),
            (ne += `';
`);
          var ce = F.variable;
          if (ce) {
            if (!O.test(ce))
              throw new Error("variable is not a bare identifier: " + ce);
          } else
            (ne =
              `with(obj||{}){
` +
              ne +
              `}
`),
              (ce = "obj");
          ne =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ne +
            `return __p;
`;
          var ge;
          try {
            ge = new Function(F.variable || "obj", "_", ne);
          } catch (V) {
            throw ((V.source = ne), V);
          }
          var m = function (V) {
            return ge.call(this, V, e);
          };
          return (
            (m.source =
              "function(" +
              ce +
              `){
` +
              ne +
              "}"),
            m
          );
        }),
        e
      );
    })();
  });
  var Ce = d((jF, xa) => {
    "use strict";
    var ve = {},
      Rt = {},
      Ct = [],
      Jr = window.Webflow || [],
      ft = window.jQuery,
      Be = ft(window),
      sy = ft(document),
      Ze = ft.isFunction,
      He = (ve._ = Ea()),
      Ia = (ve.tram = $r() && ft.tram),
      kn = !1,
      ei = !1;
    Ia.config.hideBackface = !1;
    Ia.config.keepInherited = !0;
    ve.define = function (e, t, n) {
      Rt[e] && Ta(Rt[e]);
      var r = (Rt[e] = t(ft, He, n) || {});
      return ba(r), r;
    };
    ve.require = function (e) {
      return Rt[e];
    };
    function ba(e) {
      ve.env() &&
        (Ze(e.design) && Be.on("__wf_design", e.design),
        Ze(e.preview) && Be.on("__wf_preview", e.preview)),
        Ze(e.destroy) && Be.on("__wf_destroy", e.destroy),
        e.ready && Ze(e.ready) && uy(e);
    }
    function uy(e) {
      if (kn) {
        e.ready();
        return;
      }
      He.contains(Ct, e.ready) || Ct.push(e.ready);
    }
    function Ta(e) {
      Ze(e.design) && Be.off("__wf_design", e.design),
        Ze(e.preview) && Be.off("__wf_preview", e.preview),
        Ze(e.destroy) && Be.off("__wf_destroy", e.destroy),
        e.ready && Ze(e.ready) && cy(e);
    }
    function cy(e) {
      Ct = He.filter(Ct, function (t) {
        return t !== e.ready;
      });
    }
    ve.push = function (e) {
      if (kn) {
        Ze(e) && e();
        return;
      }
      Jr.push(e);
    };
    ve.env = function (e) {
      var t = window.__wf_design,
        n = typeof t < "u";
      if (!e) return n;
      if (e === "design") return n && t;
      if (e === "preview") return n && !t;
      if (e === "slug") return n && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var qn = navigator.userAgent.toLowerCase(),
      wa = (ve.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      ly = (ve.env.chrome =
        /chrome/.test(qn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(qn.match(/chrome\/(\d+)\./)[1], 10)),
      fy = (ve.env.ios = /(ipod|iphone|ipad)/.test(qn));
    ve.env.safari = /safari/.test(qn) && !ly && !fy;
    var Zr;
    wa &&
      sy.on("touchstart mousedown", function (e) {
        Zr = e.target;
      });
    ve.validClick = wa
      ? function (e) {
          return e === Zr || ft.contains(e, Zr);
        }
      : function () {
          return !0;
        };
    var Aa = "resize.webflow orientationchange.webflow load.webflow",
      dy = "scroll.webflow " + Aa;
    ve.resize = ti(Be, Aa);
    ve.scroll = ti(Be, dy);
    ve.redraw = ti();
    function ti(e, t) {
      var n = [],
        r = {};
      return (
        (r.up = He.throttle(function (i) {
          He.each(n, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, r.up),
        (r.on = function (i) {
          typeof i == "function" && (He.contains(n, i) || n.push(i));
        }),
        (r.off = function (i) {
          if (!arguments.length) {
            n = [];
            return;
          }
          n = He.filter(n, function (o) {
            return o !== i;
          });
        }),
        r
      );
    }
    ve.location = function (e) {
      window.location = e;
    };
    ve.env() && (ve.location = function () {});
    ve.ready = function () {
      (kn = !0), ei ? py() : He.each(Ct, _a), He.each(Jr, _a), ve.resize.up();
    };
    function _a(e) {
      Ze(e) && e();
    }
    function py() {
      (ei = !1), He.each(Rt, ba);
    }
    var _t;
    ve.load = function (e) {
      _t.then(e);
    };
    function Oa() {
      _t && (_t.reject(), Be.off("load", _t.resolve)),
        (_t = new ft.Deferred()),
        Be.on("load", _t.resolve);
    }
    ve.destroy = function (e) {
      (e = e || {}),
        (ei = !0),
        Be.triggerHandler("__wf_destroy"),
        e.domready != null && (kn = e.domready),
        He.each(Rt, Ta),
        ve.resize.off(),
        ve.scroll.off(),
        ve.redraw.off(),
        (Ct = []),
        (Jr = []),
        _t.state() === "pending" && Oa();
    };
    ft(ve.ready);
    Oa();
    xa.exports = window.Webflow = ve;
  });
  var Ca = d((YF, Ra) => {
    "use strict";
    var Sa = Ce();
    Sa.define(
      "brand",
      (Ra.exports = function (e) {
        var t = {},
          n = document,
          r = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          l;
        t.ready = function () {
          var y = r.attr("data-wf-status"),
            b = r.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(b) && s.hostname !== b && (y = !0),
            y &&
              !a &&
              ((l = l || v()),
              g(),
              setTimeout(g, 500),
              e(n).off(u, _).on(u, _));
        };
        function _() {
          var y =
            n.fullScreen ||
            n.mozFullScreen ||
            n.webkitIsFullScreen ||
            n.msFullscreenElement ||
            !!n.webkitFullscreenElement;
          e(l).attr("style", y ? "display: none !important;" : "");
        }
        function v() {
          var y = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            b = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            T = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return y.append(b, T), y[0];
        }
        function g() {
          var y = i.children(o),
            b = y.length && y.get(0) === l,
            T = Sa.env("editor");
          if (b) {
            T && y.remove();
            return;
          }
          y.length && y.remove(), T || i.append(l);
        }
        return t;
      })
    );
  });
  var Pa = d((QF, La) => {
    "use strict";
    var ni = Ce();
    ni.define(
      "edit",
      (La.exports = function (e, t, n) {
        if (
          ((n = n || {}),
          (ni.env("test") || ni.env("frame")) && !n.fixture && !gy())
        )
          return { exit: 1 };
        var r = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          l = n.load || g,
          _ = !1;
        try {
          _ =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        _
          ? l()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            l()
          : i.on(a, v).triggerHandler(a);
        function v() {
          u || (/\?edit/.test(s.hash) && l());
        }
        function g() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, v),
            L(function (D) {
              e.ajax({
                url: w("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: y(D),
              });
            });
        }
        function y(D) {
          return function (q) {
            if (!q) {
              console.error("Could not load editor data");
              return;
            }
            (q.thirdPartyCookiesSupported = D),
              b(R(q.scriptPath), function () {
                window.WebflowEditor(q);
              });
          };
        }
        function b(D, q) {
          e.ajax({ type: "GET", url: D, dataType: "script", cache: !0 }).then(
            q,
            T
          );
        }
        function T(D, q, M) {
          throw (console.error("Could not load editor script: " + q), M);
        }
        function R(D) {
          return D.indexOf("//") >= 0
            ? D
            : w("https://editor-api.webflow.com" + D);
        }
        function w(D) {
          return D.replace(/([^:])\/\//g, "$1/");
        }
        function L(D) {
          var q = window.document.createElement("iframe");
          (q.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (q.style.display = "none"),
            (q.sandbox = "allow-scripts allow-same-origin");
          var M = function (j) {
            j.data === "WF_third_party_cookies_unsupported"
              ? (C(q, M), D(!1))
              : j.data === "WF_third_party_cookies_supported" &&
                (C(q, M), D(!0));
          };
          (q.onerror = function () {
            C(q, M), D(!1);
          }),
            window.addEventListener("message", M, !1),
            window.document.body.appendChild(q);
        }
        function C(D, q) {
          window.removeEventListener("message", q, !1), D.remove();
        }
        return r;
      })
    );
    function gy() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Da = d(($F, Na) => {
    "use strict";
    var hy = Ce();
    hy.define(
      "focus-visible",
      (Na.exports = function () {
        function e(n) {
          var r = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(C) {
            return !!(
              C &&
              C !== document &&
              C.nodeName !== "HTML" &&
              C.nodeName !== "BODY" &&
              "classList" in C &&
              "contains" in C.classList
            );
          }
          function u(C) {
            var D = C.type,
              q = C.tagName;
            return !!(
              (q === "INPUT" && s[D] && !C.readOnly) ||
              (q === "TEXTAREA" && !C.readOnly) ||
              C.isContentEditable
            );
          }
          function l(C) {
            C.getAttribute("data-wf-focus-visible") ||
              C.setAttribute("data-wf-focus-visible", "true");
          }
          function _(C) {
            C.getAttribute("data-wf-focus-visible") &&
              C.removeAttribute("data-wf-focus-visible");
          }
          function v(C) {
            C.metaKey ||
              C.altKey ||
              C.ctrlKey ||
              (a(n.activeElement) && l(n.activeElement), (r = !0));
          }
          function g() {
            r = !1;
          }
          function y(C) {
            a(C.target) && (r || u(C.target)) && l(C.target);
          }
          function b(C) {
            a(C.target) &&
              C.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              _(C.target));
          }
          function T() {
            document.visibilityState === "hidden" && (i && (r = !0), R());
          }
          function R() {
            document.addEventListener("mousemove", L),
              document.addEventListener("mousedown", L),
              document.addEventListener("mouseup", L),
              document.addEventListener("pointermove", L),
              document.addEventListener("pointerdown", L),
              document.addEventListener("pointerup", L),
              document.addEventListener("touchmove", L),
              document.addEventListener("touchstart", L),
              document.addEventListener("touchend", L);
          }
          function w() {
            document.removeEventListener("mousemove", L),
              document.removeEventListener("mousedown", L),
              document.removeEventListener("mouseup", L),
              document.removeEventListener("pointermove", L),
              document.removeEventListener("pointerdown", L),
              document.removeEventListener("pointerup", L),
              document.removeEventListener("touchmove", L),
              document.removeEventListener("touchstart", L),
              document.removeEventListener("touchend", L);
          }
          function L(C) {
            (C.target.nodeName && C.target.nodeName.toLowerCase() === "html") ||
              ((r = !1), w());
          }
          document.addEventListener("keydown", v, !0),
            document.addEventListener("mousedown", g, !0),
            document.addEventListener("pointerdown", g, !0),
            document.addEventListener("touchstart", g, !0),
            document.addEventListener("visibilitychange", T, !0),
            R(),
            n.addEventListener("focus", y, !0),
            n.addEventListener("blur", b, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var qa = d((ZF, Fa) => {
    "use strict";
    var Ma = Ce();
    Ma.define(
      "focus",
      (Fa.exports = function () {
        var e = [],
          t = !1;
        function n(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function r(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          r(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Ma.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", n, !0),
            document.addEventListener("click", n, !0));
        }
        return { ready: o };
      })
    );
  });
  var Xa = d((JF, Ga) => {
    "use strict";
    var ri = window.jQuery,
      Je = {},
      Gn = [],
      ka = ".w-ix",
      Xn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), ri(t).triggerHandler(Je.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), ri(t).triggerHandler(Je.types.OUTRO));
        },
      };
    Je.triggers = {};
    Je.types = { INTRO: "w-ix-intro" + ka, OUTRO: "w-ix-outro" + ka };
    Je.init = function () {
      for (var e = Gn.length, t = 0; t < e; t++) {
        var n = Gn[t];
        n[0](0, n[1]);
      }
      (Gn = []), ri.extend(Je.triggers, Xn);
    };
    Je.async = function () {
      for (var e in Xn) {
        var t = Xn[e];
        Xn.hasOwnProperty(e) &&
          (Je.triggers[e] = function (n, r) {
            Gn.push([t, r]);
          });
      }
    };
    Je.async();
    Ga.exports = Je;
  });
  var Lt = d((e1, Wa) => {
    "use strict";
    var ii = Xa();
    function Ua(e, t) {
      var n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, null), e.dispatchEvent(n);
    }
    var vy = window.jQuery,
      Un = {},
      Va = ".w-ix",
      yy = {
        reset: function (e, t) {
          ii.triggers.reset(e, t);
        },
        intro: function (e, t) {
          ii.triggers.intro(e, t), Ua(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          ii.triggers.outro(e, t), Ua(t, "COMPONENT_INACTIVE");
        },
      };
    Un.triggers = {};
    Un.types = { INTRO: "w-ix-intro" + Va, OUTRO: "w-ix-outro" + Va };
    vy.extend(Un.triggers, yy);
    Wa.exports = Un;
  });
  var oi = d((t1, Ha) => {
    var my =
      typeof global == "object" && global && global.Object === Object && global;
    Ha.exports = my;
  });
  var ze = d((n1, Ba) => {
    var Ey = oi(),
      _y = typeof self == "object" && self && self.Object === Object && self,
      Iy = Ey || _y || Function("return this")();
    Ba.exports = Iy;
  });
  var Pt = d((r1, za) => {
    var by = ze(),
      Ty = by.Symbol;
    za.exports = Ty;
  });
  var Qa = d((i1, Ya) => {
    var Ka = Pt(),
      ja = Object.prototype,
      wy = ja.hasOwnProperty,
      Ay = ja.toString,
      sn = Ka ? Ka.toStringTag : void 0;
    function Oy(e) {
      var t = wy.call(e, sn),
        n = e[sn];
      try {
        e[sn] = void 0;
        var r = !0;
      } catch {}
      var i = Ay.call(e);
      return r && (t ? (e[sn] = n) : delete e[sn]), i;
    }
    Ya.exports = Oy;
  });
  var Za = d((o1, $a) => {
    var xy = Object.prototype,
      Sy = xy.toString;
    function Ry(e) {
      return Sy.call(e);
    }
    $a.exports = Ry;
  });
  var dt = d((a1, ts) => {
    var Ja = Pt(),
      Cy = Qa(),
      Ly = Za(),
      Py = "[object Null]",
      Ny = "[object Undefined]",
      es = Ja ? Ja.toStringTag : void 0;
    function Dy(e) {
      return e == null
        ? e === void 0
          ? Ny
          : Py
        : es && es in Object(e)
        ? Cy(e)
        : Ly(e);
    }
    ts.exports = Dy;
  });
  var ai = d((s1, ns) => {
    function My(e, t) {
      return function (n) {
        return e(t(n));
      };
    }
    ns.exports = My;
  });
  var si = d((u1, rs) => {
    var Fy = ai(),
      qy = Fy(Object.getPrototypeOf, Object);
    rs.exports = qy;
  });
  var at = d((c1, is) => {
    function ky(e) {
      return e != null && typeof e == "object";
    }
    is.exports = ky;
  });
  var ui = d((l1, as) => {
    var Gy = dt(),
      Xy = si(),
      Uy = at(),
      Vy = "[object Object]",
      Wy = Function.prototype,
      Hy = Object.prototype,
      os = Wy.toString,
      By = Hy.hasOwnProperty,
      zy = os.call(Object);
    function Ky(e) {
      if (!Uy(e) || Gy(e) != Vy) return !1;
      var t = Xy(e);
      if (t === null) return !0;
      var n = By.call(t, "constructor") && t.constructor;
      return typeof n == "function" && n instanceof n && os.call(n) == zy;
    }
    as.exports = Ky;
  });
  var ss = d((ci) => {
    "use strict";
    Object.defineProperty(ci, "__esModule", { value: !0 });
    ci.default = jy;
    function jy(e) {
      var t,
        n = e.Symbol;
      return (
        typeof n == "function"
          ? n.observable
            ? (t = n.observable)
            : ((t = n("observable")), (n.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var us = d((fi, li) => {
    "use strict";
    Object.defineProperty(fi, "__esModule", { value: !0 });
    var Yy = ss(),
      Qy = $y(Yy);
    function $y(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Nt;
    typeof self < "u"
      ? (Nt = self)
      : typeof window < "u"
      ? (Nt = window)
      : typeof global < "u"
      ? (Nt = global)
      : typeof li < "u"
      ? (Nt = li)
      : (Nt = Function("return this")());
    var Zy = (0, Qy.default)(Nt);
    fi.default = Zy;
  });
  var di = d((un) => {
    "use strict";
    un.__esModule = !0;
    un.ActionTypes = void 0;
    un.default = ds;
    var Jy = ui(),
      em = fs(Jy),
      tm = us(),
      cs = fs(tm);
    function fs(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ls = (un.ActionTypes = { INIT: "@@redux/INIT" });
    function ds(e, t, n) {
      var r;
      if (
        (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
        typeof n < "u")
      ) {
        if (typeof n != "function")
          throw new Error("Expected the enhancer to be a function.");
        return n(ds)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function l() {
        a === s && (a = s.slice());
      }
      function _() {
        return o;
      }
      function v(T) {
        if (typeof T != "function")
          throw new Error("Expected listener to be a function.");
        var R = !0;
        return (
          l(),
          a.push(T),
          function () {
            if (R) {
              (R = !1), l();
              var L = a.indexOf(T);
              a.splice(L, 1);
            }
          }
        );
      }
      function g(T) {
        if (!(0, em.default)(T))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof T.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, T));
        } finally {
          u = !1;
        }
        for (var R = (s = a), w = 0; w < R.length; w++) R[w]();
        return T;
      }
      function y(T) {
        if (typeof T != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = T), g({ type: ls.INIT });
      }
      function b() {
        var T,
          R = v;
        return (
          (T = {
            subscribe: function (L) {
              if (typeof L != "object")
                throw new TypeError("Expected the observer to be an object.");
              function C() {
                L.next && L.next(_());
              }
              C();
              var D = R(C);
              return { unsubscribe: D };
            },
          }),
          (T[cs.default] = function () {
            return this;
          }),
          T
        );
      }
      return (
        g({ type: ls.INIT }),
        (r = { dispatch: g, subscribe: v, getState: _, replaceReducer: y }),
        (r[cs.default] = b),
        r
      );
    }
  });
  var gi = d((pi) => {
    "use strict";
    pi.__esModule = !0;
    pi.default = nm;
    function nm(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var hs = d((hi) => {
    "use strict";
    hi.__esModule = !0;
    hi.default = sm;
    var ps = di(),
      rm = ui(),
      g1 = gs(rm),
      im = gi(),
      h1 = gs(im);
    function gs(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function om(e, t) {
      var n = t && t.type,
        r = (n && '"' + n.toString() + '"') || "an action";
      return (
        "Given action " +
        r +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function am(e) {
      Object.keys(e).forEach(function (t) {
        var n = e[t],
          r = n(void 0, { type: ps.ActionTypes.INIT });
        if (typeof r > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof n(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                ps.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function sm(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        typeof e[i] == "function" && (n[i] = e[i]);
      }
      var o = Object.keys(n);
      if (!1) var s;
      var a;
      try {
        am(n);
      } catch (u) {
        a = u;
      }
      return function () {
        var l =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          _ = arguments[1];
        if (a) throw a;
        if (!1) var v;
        for (var g = !1, y = {}, b = 0; b < o.length; b++) {
          var T = o[b],
            R = n[T],
            w = l[T],
            L = R(w, _);
          if (typeof L > "u") {
            var C = om(T, _);
            throw new Error(C);
          }
          (y[T] = L), (g = g || L !== w);
        }
        return g ? y : l;
      };
    }
  });
  var ys = d((vi) => {
    "use strict";
    vi.__esModule = !0;
    vi.default = um;
    function vs(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function um(e, t) {
      if (typeof e == "function") return vs(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var n = Object.keys(e), r = {}, i = 0; i < n.length; i++) {
        var o = n[i],
          s = e[o];
        typeof s == "function" && (r[o] = vs(s, t));
      }
      return r;
    }
  });
  var mi = d((yi) => {
    "use strict";
    yi.__esModule = !0;
    yi.default = cm;
    function cm() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var r = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, r.apply(void 0, arguments));
      };
    }
  });
  var ms = d((Ei) => {
    "use strict";
    Ei.__esModule = !0;
    var lm =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    Ei.default = gm;
    var fm = mi(),
      dm = pm(fm);
    function pm(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function gm() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (r) {
        return function (i, o, s) {
          var a = r(i, o, s),
            u = a.dispatch,
            l = [],
            _ = {
              getState: a.getState,
              dispatch: function (g) {
                return u(g);
              },
            };
          return (
            (l = t.map(function (v) {
              return v(_);
            })),
            (u = dm.default.apply(void 0, l)(a.dispatch)),
            lm({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var _i = d((Ue) => {
    "use strict";
    Ue.__esModule = !0;
    Ue.compose =
      Ue.applyMiddleware =
      Ue.bindActionCreators =
      Ue.combineReducers =
      Ue.createStore =
        void 0;
    var hm = di(),
      vm = Dt(hm),
      ym = hs(),
      mm = Dt(ym),
      Em = ys(),
      _m = Dt(Em),
      Im = ms(),
      bm = Dt(Im),
      Tm = mi(),
      wm = Dt(Tm),
      Am = gi(),
      _1 = Dt(Am);
    function Dt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Ue.createStore = vm.default;
    Ue.combineReducers = mm.default;
    Ue.bindActionCreators = _m.default;
    Ue.applyMiddleware = bm.default;
    Ue.compose = wm.default;
  });
  var Ke,
    Ii,
    et,
    Om,
    xm,
    Vn,
    Sm,
    bi = me(() => {
      "use strict";
      (Ke = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (Ii = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (et = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (Om = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (xm = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (Vn = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (Sm = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Le,
    Rm,
    Wn = me(() => {
      "use strict";
      (Le = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_RIVE: "PLUGIN_RIVE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (Rm = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var Cm,
    Es = me(() => {
      "use strict";
      Cm = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var Lm,
    Pm,
    Nm,
    Dm,
    Mm,
    Fm,
    qm,
    Ti,
    _s = me(() => {
      "use strict";
      Wn();
      ({
        TRANSFORM_MOVE: Lm,
        TRANSFORM_SCALE: Pm,
        TRANSFORM_ROTATE: Nm,
        TRANSFORM_SKEW: Dm,
        STYLE_SIZE: Mm,
        STYLE_FILTER: Fm,
        STYLE_FONT_VARIATION: qm,
      } = Le),
        (Ti = {
          [Lm]: !0,
          [Pm]: !0,
          [Nm]: !0,
          [Dm]: !0,
          [Mm]: !0,
          [Fm]: !0,
          [qm]: !0,
        });
    });
  var Te = {};
  Me(Te, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => eE,
    IX2_ANIMATION_FRAME_CHANGED: () => jm,
    IX2_CLEAR_REQUESTED: () => Bm,
    IX2_ELEMENT_STATE_CHANGED: () => Jm,
    IX2_EVENT_LISTENER_ADDED: () => zm,
    IX2_EVENT_STATE_CHANGED: () => Km,
    IX2_INSTANCE_ADDED: () => Qm,
    IX2_INSTANCE_REMOVED: () => Zm,
    IX2_INSTANCE_STARTED: () => $m,
    IX2_MEDIA_QUERIES_DEFINED: () => nE,
    IX2_PARAMETER_CHANGED: () => Ym,
    IX2_PLAYBACK_REQUESTED: () => Wm,
    IX2_PREVIEW_REQUESTED: () => Vm,
    IX2_RAW_DATA_IMPORTED: () => km,
    IX2_SESSION_INITIALIZED: () => Gm,
    IX2_SESSION_STARTED: () => Xm,
    IX2_SESSION_STOPPED: () => Um,
    IX2_STOP_REQUESTED: () => Hm,
    IX2_TEST_FRAME_RENDERED: () => rE,
    IX2_VIEWPORT_WIDTH_CHANGED: () => tE,
  });
  var km,
    Gm,
    Xm,
    Um,
    Vm,
    Wm,
    Hm,
    Bm,
    zm,
    Km,
    jm,
    Ym,
    Qm,
    $m,
    Zm,
    Jm,
    eE,
    tE,
    nE,
    rE,
    Is = me(() => {
      "use strict";
      (km = "IX2_RAW_DATA_IMPORTED"),
        (Gm = "IX2_SESSION_INITIALIZED"),
        (Xm = "IX2_SESSION_STARTED"),
        (Um = "IX2_SESSION_STOPPED"),
        (Vm = "IX2_PREVIEW_REQUESTED"),
        (Wm = "IX2_PLAYBACK_REQUESTED"),
        (Hm = "IX2_STOP_REQUESTED"),
        (Bm = "IX2_CLEAR_REQUESTED"),
        (zm = "IX2_EVENT_LISTENER_ADDED"),
        (Km = "IX2_EVENT_STATE_CHANGED"),
        (jm = "IX2_ANIMATION_FRAME_CHANGED"),
        (Ym = "IX2_PARAMETER_CHANGED"),
        (Qm = "IX2_INSTANCE_ADDED"),
        ($m = "IX2_INSTANCE_STARTED"),
        (Zm = "IX2_INSTANCE_REMOVED"),
        (Jm = "IX2_ELEMENT_STATE_CHANGED"),
        (eE = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (tE = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (nE = "IX2_MEDIA_QUERIES_DEFINED"),
        (rE = "IX2_TEST_FRAME_RENDERED");
    });
  var Oe = {};
  Me(Oe, {
    ABSTRACT_NODE: () => t_,
    AUTO: () => HE,
    BACKGROUND: () => kE,
    BACKGROUND_COLOR: () => qE,
    BAR_DELIMITER: () => KE,
    BORDER_COLOR: () => GE,
    BOUNDARY_SELECTOR: () => uE,
    CHILDREN: () => jE,
    COLON_DELIMITER: () => zE,
    COLOR: () => XE,
    COMMA_DELIMITER: () => BE,
    CONFIG_UNIT: () => vE,
    CONFIG_VALUE: () => dE,
    CONFIG_X_UNIT: () => pE,
    CONFIG_X_VALUE: () => cE,
    CONFIG_Y_UNIT: () => gE,
    CONFIG_Y_VALUE: () => lE,
    CONFIG_Z_UNIT: () => hE,
    CONFIG_Z_VALUE: () => fE,
    DISPLAY: () => UE,
    FILTER: () => NE,
    FLEX: () => VE,
    FONT_VARIATION_SETTINGS: () => DE,
    HEIGHT: () => FE,
    HTML_ELEMENT: () => JE,
    IMMEDIATE_CHILDREN: () => YE,
    IX2_ID_DELIMITER: () => iE,
    OPACITY: () => PE,
    PARENT: () => $E,
    PLAIN_OBJECT: () => e_,
    PRESERVE_3D: () => ZE,
    RENDER_GENERAL: () => r_,
    RENDER_PLUGIN: () => o_,
    RENDER_STYLE: () => i_,
    RENDER_TRANSFORM: () => n_,
    ROTATE_X: () => OE,
    ROTATE_Y: () => xE,
    ROTATE_Z: () => SE,
    SCALE_3D: () => AE,
    SCALE_X: () => bE,
    SCALE_Y: () => TE,
    SCALE_Z: () => wE,
    SIBLINGS: () => QE,
    SKEW: () => RE,
    SKEW_X: () => CE,
    SKEW_Y: () => LE,
    TRANSFORM: () => yE,
    TRANSLATE_3D: () => IE,
    TRANSLATE_X: () => mE,
    TRANSLATE_Y: () => EE,
    TRANSLATE_Z: () => _E,
    WF_PAGE: () => oE,
    WIDTH: () => ME,
    WILL_CHANGE: () => WE,
    W_MOD_IX: () => sE,
    W_MOD_JS: () => aE,
  });
  var iE,
    oE,
    aE,
    sE,
    uE,
    cE,
    lE,
    fE,
    dE,
    pE,
    gE,
    hE,
    vE,
    yE,
    mE,
    EE,
    _E,
    IE,
    bE,
    TE,
    wE,
    AE,
    OE,
    xE,
    SE,
    RE,
    CE,
    LE,
    PE,
    NE,
    DE,
    ME,
    FE,
    qE,
    kE,
    GE,
    XE,
    UE,
    VE,
    WE,
    HE,
    BE,
    zE,
    KE,
    jE,
    YE,
    QE,
    $E,
    ZE,
    JE,
    e_,
    t_,
    n_,
    r_,
    i_,
    o_,
    bs = me(() => {
      "use strict";
      (iE = "|"),
        (oE = "data-wf-page"),
        (aE = "w-mod-js"),
        (sE = "w-mod-ix"),
        (uE = ".w-dyn-item"),
        (cE = "xValue"),
        (lE = "yValue"),
        (fE = "zValue"),
        (dE = "value"),
        (pE = "xUnit"),
        (gE = "yUnit"),
        (hE = "zUnit"),
        (vE = "unit"),
        (yE = "transform"),
        (mE = "translateX"),
        (EE = "translateY"),
        (_E = "translateZ"),
        (IE = "translate3d"),
        (bE = "scaleX"),
        (TE = "scaleY"),
        (wE = "scaleZ"),
        (AE = "scale3d"),
        (OE = "rotateX"),
        (xE = "rotateY"),
        (SE = "rotateZ"),
        (RE = "skew"),
        (CE = "skewX"),
        (LE = "skewY"),
        (PE = "opacity"),
        (NE = "filter"),
        (DE = "font-variation-settings"),
        (ME = "width"),
        (FE = "height"),
        (qE = "backgroundColor"),
        (kE = "background"),
        (GE = "borderColor"),
        (XE = "color"),
        (UE = "display"),
        (VE = "flex"),
        (WE = "willChange"),
        (HE = "AUTO"),
        (BE = ","),
        (zE = ":"),
        (KE = "|"),
        (jE = "CHILDREN"),
        (YE = "IMMEDIATE_CHILDREN"),
        (QE = "SIBLINGS"),
        ($E = "PARENT"),
        (ZE = "preserve-3d"),
        (JE = "HTML_ELEMENT"),
        (e_ = "PLAIN_OBJECT"),
        (t_ = "ABSTRACT_NODE"),
        (n_ = "RENDER_TRANSFORM"),
        (r_ = "RENDER_GENERAL"),
        (i_ = "RENDER_STYLE"),
        (o_ = "RENDER_PLUGIN");
    });
  var Ts = {};
  Me(Ts, {
    ActionAppliesTo: () => Rm,
    ActionTypeConsts: () => Le,
    EventAppliesTo: () => Ii,
    EventBasedOn: () => et,
    EventContinuousMouseAxes: () => Om,
    EventLimitAffectedElements: () => xm,
    EventTypeConsts: () => Ke,
    IX2EngineActionTypes: () => Te,
    IX2EngineConstants: () => Oe,
    InteractionTypeConsts: () => Cm,
    QuickEffectDirectionConsts: () => Sm,
    QuickEffectIds: () => Vn,
    ReducedMotionTypes: () => Ti,
  });
  var Fe = me(() => {
    "use strict";
    bi();
    Wn();
    Es();
    _s();
    Is();
    bs();
    Wn();
    bi();
  });
  var a_,
    ws,
    As = me(() => {
      "use strict";
      Fe();
      ({ IX2_RAW_DATA_IMPORTED: a_ } = Te),
        (ws = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case a_:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Mt = d((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    var s_ =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    _e.clone = Bn;
    _e.addLast = Ss;
    _e.addFirst = Rs;
    _e.removeLast = Cs;
    _e.removeFirst = Ls;
    _e.insert = Ps;
    _e.removeAt = Ns;
    _e.replaceAt = Ds;
    _e.getIn = zn;
    _e.set = Kn;
    _e.setIn = jn;
    _e.update = Fs;
    _e.updateIn = qs;
    _e.merge = ks;
    _e.mergeDeep = Gs;
    _e.mergeIn = Xs;
    _e.omit = Us;
    _e.addDefaults = Vs;
    var Os = "INVALID_ARGS";
    function xs(e) {
      throw new Error(e);
    }
    function wi(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var u_ = {}.hasOwnProperty;
    function Bn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = wi(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        n[i] = e[i];
      }
      return n;
    }
    function qe(e, t, n) {
      var r = n;
      r == null && xs(Os);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var l = s[u];
        if (l != null) {
          var _ = wi(l);
          if (_.length)
            for (var v = 0; v <= _.length; v++) {
              var g = _[v];
              if (!(e && r[g] !== void 0)) {
                var y = l[g];
                t && Hn(r[g]) && Hn(y) && (y = qe(e, t, r[g], y)),
                  !(y === void 0 || y === r[g]) &&
                    (i || ((i = !0), (r = Bn(r))), (r[g] = y));
              }
            }
        }
      }
      return r;
    }
    function Hn(e) {
      var t = typeof e > "u" ? "undefined" : s_(e);
      return e != null && (t === "object" || t === "function");
    }
    function Ss(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Rs(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Cs(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Ls(e) {
      return e.length ? e.slice(1) : e;
    }
    function Ps(e, t, n) {
      return e
        .slice(0, t)
        .concat(Array.isArray(n) ? n : [n])
        .concat(e.slice(t));
    }
    function Ns(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Ds(e, t, n) {
      if (e[t] === n) return e;
      for (var r = e.length, i = Array(r), o = 0; o < r; o++) i[o] = e[o];
      return (i[t] = n), i;
    }
    function zn(e, t) {
      if ((!Array.isArray(t) && xs(Os), e != null)) {
        for (var n = e, r = 0; r < t.length; r++) {
          var i = t[r];
          if (((n = n?.[i]), n === void 0)) return n;
        }
        return n;
      }
    }
    function Kn(e, t, n) {
      var r = typeof t == "number" ? [] : {},
        i = e ?? r;
      if (i[t] === n) return i;
      var o = Bn(i);
      return (o[t] = n), o;
    }
    function Ms(e, t, n, r) {
      var i = void 0,
        o = t[r];
      if (r === t.length - 1) i = n;
      else {
        var s =
          Hn(e) && Hn(e[o]) ? e[o] : typeof t[r + 1] == "number" ? [] : {};
        i = Ms(s, t, n, r + 1);
      }
      return Kn(e, o, i);
    }
    function jn(e, t, n) {
      return t.length ? Ms(e, t, n, 0) : n;
    }
    function Fs(e, t, n) {
      var r = e?.[t],
        i = n(r);
      return Kn(e, t, i);
    }
    function qs(e, t, n) {
      var r = zn(e, t),
        i = n(r);
      return jn(e, t, i);
    }
    function ks(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !1, !1, e, t, n, r, i, o].concat(a))
        : qe(!1, !1, e, t, n, r, i, o);
    }
    function Gs(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !1, !0, e, t, n, r, i, o].concat(a))
        : qe(!1, !0, e, t, n, r, i, o);
    }
    function Xs(e, t, n, r, i, o, s) {
      var a = zn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          l = arguments.length,
          _ = Array(l > 7 ? l - 7 : 0),
          v = 7;
        v < l;
        v++
      )
        _[v - 7] = arguments[v];
      return (
        _.length
          ? (u = qe.call.apply(qe, [null, !1, !1, a, n, r, i, o, s].concat(_)))
          : (u = qe(!1, !1, a, n, r, i, o, s)),
        jn(e, t, u)
      );
    }
    function Us(e, t) {
      for (var n = Array.isArray(t) ? t : [t], r = !1, i = 0; i < n.length; i++)
        if (u_.call(e, n[i])) {
          r = !0;
          break;
        }
      if (!r) return e;
      for (var o = {}, s = wi(e), a = 0; a < s.length; a++) {
        var u = s[a];
        n.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Vs(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !0, !1, e, t, n, r, i, o].concat(a))
        : qe(!0, !1, e, t, n, r, i, o);
    }
    var c_ = {
      clone: Bn,
      addLast: Ss,
      addFirst: Rs,
      removeLast: Cs,
      removeFirst: Ls,
      insert: Ps,
      removeAt: Ns,
      replaceAt: Ds,
      getIn: zn,
      set: Kn,
      setIn: jn,
      update: Fs,
      updateIn: qs,
      merge: ks,
      mergeDeep: Gs,
      mergeIn: Xs,
      omit: Us,
      addDefaults: Vs,
    };
    _e.default = c_;
  });
  var Hs,
    l_,
    f_,
    d_,
    p_,
    g_,
    Ws,
    Bs,
    zs = me(() => {
      "use strict";
      Fe();
      (Hs = de(Mt())),
        ({
          IX2_PREVIEW_REQUESTED: l_,
          IX2_PLAYBACK_REQUESTED: f_,
          IX2_STOP_REQUESTED: d_,
          IX2_CLEAR_REQUESTED: p_,
        } = Te),
        (g_ = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Ws = Object.create(null, {
          [l_]: { value: "preview" },
          [f_]: { value: "playback" },
          [d_]: { value: "stop" },
          [p_]: { value: "clear" },
        })),
        (Bs = (e = g_, t) => {
          if (t.type in Ws) {
            let n = [Ws[t.type]];
            return (0, Hs.setIn)(e, [n], { ...t.payload });
          }
          return e;
        });
    });
  var Pe,
    h_,
    v_,
    y_,
    m_,
    E_,
    __,
    I_,
    b_,
    T_,
    w_,
    Ks,
    A_,
    js,
    Ys = me(() => {
      "use strict";
      Fe();
      (Pe = de(Mt())),
        ({
          IX2_SESSION_INITIALIZED: h_,
          IX2_SESSION_STARTED: v_,
          IX2_TEST_FRAME_RENDERED: y_,
          IX2_SESSION_STOPPED: m_,
          IX2_EVENT_LISTENER_ADDED: E_,
          IX2_EVENT_STATE_CHANGED: __,
          IX2_ANIMATION_FRAME_CHANGED: I_,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: b_,
          IX2_VIEWPORT_WIDTH_CHANGED: T_,
          IX2_MEDIA_QUERIES_DEFINED: w_,
        } = Te),
        (Ks = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (A_ = 20),
        (js = (e = Ks, t) => {
          switch (t.type) {
            case h_: {
              let { hasBoundaryNodes: n, reducedMotion: r } = t.payload;
              return (0, Pe.merge)(e, {
                hasBoundaryNodes: n,
                reducedMotion: r,
              });
            }
            case v_:
              return (0, Pe.set)(e, "active", !0);
            case y_: {
              let {
                payload: { step: n = A_ },
              } = t;
              return (0, Pe.set)(e, "tick", e.tick + n);
            }
            case m_:
              return Ks;
            case I_: {
              let {
                payload: { now: n },
              } = t;
              return (0, Pe.set)(e, "tick", n);
            }
            case E_: {
              let n = (0, Pe.addLast)(e.eventListeners, t.payload);
              return (0, Pe.set)(e, "eventListeners", n);
            }
            case __: {
              let { stateKey: n, newState: r } = t.payload;
              return (0, Pe.setIn)(e, ["eventState", n], r);
            }
            case b_: {
              let { actionListId: n, isPlaying: r } = t.payload;
              return (0, Pe.setIn)(e, ["playbackState", n], r);
            }
            case T_: {
              let { width: n, mediaQueries: r } = t.payload,
                i = r.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: l } = r[s];
                if (n >= u && n <= l) {
                  o = a;
                  break;
                }
              }
              return (0, Pe.merge)(e, { viewportWidth: n, mediaQueryKey: o });
            }
            case w_:
              return (0, Pe.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var $s = d((X1, Qs) => {
    function O_() {
      (this.__data__ = []), (this.size = 0);
    }
    Qs.exports = O_;
  });
  var Yn = d((U1, Zs) => {
    function x_(e, t) {
      return e === t || (e !== e && t !== t);
    }
    Zs.exports = x_;
  });
  var cn = d((V1, Js) => {
    var S_ = Yn();
    function R_(e, t) {
      for (var n = e.length; n--; ) if (S_(e[n][0], t)) return n;
      return -1;
    }
    Js.exports = R_;
  });
  var tu = d((W1, eu) => {
    var C_ = cn(),
      L_ = Array.prototype,
      P_ = L_.splice;
    function N_(e) {
      var t = this.__data__,
        n = C_(t, e);
      if (n < 0) return !1;
      var r = t.length - 1;
      return n == r ? t.pop() : P_.call(t, n, 1), --this.size, !0;
    }
    eu.exports = N_;
  });
  var ru = d((H1, nu) => {
    var D_ = cn();
    function M_(e) {
      var t = this.__data__,
        n = D_(t, e);
      return n < 0 ? void 0 : t[n][1];
    }
    nu.exports = M_;
  });
  var ou = d((B1, iu) => {
    var F_ = cn();
    function q_(e) {
      return F_(this.__data__, e) > -1;
    }
    iu.exports = q_;
  });
  var su = d((z1, au) => {
    var k_ = cn();
    function G_(e, t) {
      var n = this.__data__,
        r = k_(n, e);
      return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
    }
    au.exports = G_;
  });
  var ln = d((K1, uu) => {
    var X_ = $s(),
      U_ = tu(),
      V_ = ru(),
      W_ = ou(),
      H_ = su();
    function Ft(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Ft.prototype.clear = X_;
    Ft.prototype.delete = U_;
    Ft.prototype.get = V_;
    Ft.prototype.has = W_;
    Ft.prototype.set = H_;
    uu.exports = Ft;
  });
  var lu = d((j1, cu) => {
    var B_ = ln();
    function z_() {
      (this.__data__ = new B_()), (this.size = 0);
    }
    cu.exports = z_;
  });
  var du = d((Y1, fu) => {
    function K_(e) {
      var t = this.__data__,
        n = t.delete(e);
      return (this.size = t.size), n;
    }
    fu.exports = K_;
  });
  var gu = d((Q1, pu) => {
    function j_(e) {
      return this.__data__.get(e);
    }
    pu.exports = j_;
  });
  var vu = d(($1, hu) => {
    function Y_(e) {
      return this.__data__.has(e);
    }
    hu.exports = Y_;
  });
  var tt = d((Z1, yu) => {
    function Q_(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    yu.exports = Q_;
  });
  var Ai = d((J1, mu) => {
    var $_ = dt(),
      Z_ = tt(),
      J_ = "[object AsyncFunction]",
      eI = "[object Function]",
      tI = "[object GeneratorFunction]",
      nI = "[object Proxy]";
    function rI(e) {
      if (!Z_(e)) return !1;
      var t = $_(e);
      return t == eI || t == tI || t == J_ || t == nI;
    }
    mu.exports = rI;
  });
  var _u = d((e2, Eu) => {
    var iI = ze(),
      oI = iI["__core-js_shared__"];
    Eu.exports = oI;
  });
  var Tu = d((t2, bu) => {
    var Oi = _u(),
      Iu = (function () {
        var e = /[^.]+$/.exec((Oi && Oi.keys && Oi.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function aI(e) {
      return !!Iu && Iu in e;
    }
    bu.exports = aI;
  });
  var xi = d((n2, wu) => {
    var sI = Function.prototype,
      uI = sI.toString;
    function cI(e) {
      if (e != null) {
        try {
          return uI.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    wu.exports = cI;
  });
  var Ou = d((r2, Au) => {
    var lI = Ai(),
      fI = Tu(),
      dI = tt(),
      pI = xi(),
      gI = /[\\^$.*+?()[\]{}|]/g,
      hI = /^\[object .+?Constructor\]$/,
      vI = Function.prototype,
      yI = Object.prototype,
      mI = vI.toString,
      EI = yI.hasOwnProperty,
      _I = RegExp(
        "^" +
          mI
            .call(EI)
            .replace(gI, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function II(e) {
      if (!dI(e) || fI(e)) return !1;
      var t = lI(e) ? _I : hI;
      return t.test(pI(e));
    }
    Au.exports = II;
  });
  var Su = d((i2, xu) => {
    function bI(e, t) {
      return e?.[t];
    }
    xu.exports = bI;
  });
  var pt = d((o2, Ru) => {
    var TI = Ou(),
      wI = Su();
    function AI(e, t) {
      var n = wI(e, t);
      return TI(n) ? n : void 0;
    }
    Ru.exports = AI;
  });
  var Qn = d((a2, Cu) => {
    var OI = pt(),
      xI = ze(),
      SI = OI(xI, "Map");
    Cu.exports = SI;
  });
  var fn = d((s2, Lu) => {
    var RI = pt(),
      CI = RI(Object, "create");
    Lu.exports = CI;
  });
  var Du = d((u2, Nu) => {
    var Pu = fn();
    function LI() {
      (this.__data__ = Pu ? Pu(null) : {}), (this.size = 0);
    }
    Nu.exports = LI;
  });
  var Fu = d((c2, Mu) => {
    function PI(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Mu.exports = PI;
  });
  var ku = d((l2, qu) => {
    var NI = fn(),
      DI = "__lodash_hash_undefined__",
      MI = Object.prototype,
      FI = MI.hasOwnProperty;
    function qI(e) {
      var t = this.__data__;
      if (NI) {
        var n = t[e];
        return n === DI ? void 0 : n;
      }
      return FI.call(t, e) ? t[e] : void 0;
    }
    qu.exports = qI;
  });
  var Xu = d((f2, Gu) => {
    var kI = fn(),
      GI = Object.prototype,
      XI = GI.hasOwnProperty;
    function UI(e) {
      var t = this.__data__;
      return kI ? t[e] !== void 0 : XI.call(t, e);
    }
    Gu.exports = UI;
  });
  var Vu = d((d2, Uu) => {
    var VI = fn(),
      WI = "__lodash_hash_undefined__";
    function HI(e, t) {
      var n = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (n[e] = VI && t === void 0 ? WI : t),
        this
      );
    }
    Uu.exports = HI;
  });
  var Hu = d((p2, Wu) => {
    var BI = Du(),
      zI = Fu(),
      KI = ku(),
      jI = Xu(),
      YI = Vu();
    function qt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    qt.prototype.clear = BI;
    qt.prototype.delete = zI;
    qt.prototype.get = KI;
    qt.prototype.has = jI;
    qt.prototype.set = YI;
    Wu.exports = qt;
  });
  var Ku = d((g2, zu) => {
    var Bu = Hu(),
      QI = ln(),
      $I = Qn();
    function ZI() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Bu(),
          map: new ($I || QI)(),
          string: new Bu(),
        });
    }
    zu.exports = ZI;
  });
  var Yu = d((h2, ju) => {
    function JI(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    ju.exports = JI;
  });
  var dn = d((v2, Qu) => {
    var eb = Yu();
    function tb(e, t) {
      var n = e.__data__;
      return eb(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
    }
    Qu.exports = tb;
  });
  var Zu = d((y2, $u) => {
    var nb = dn();
    function rb(e) {
      var t = nb(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    $u.exports = rb;
  });
  var ec = d((m2, Ju) => {
    var ib = dn();
    function ob(e) {
      return ib(this, e).get(e);
    }
    Ju.exports = ob;
  });
  var nc = d((E2, tc) => {
    var ab = dn();
    function sb(e) {
      return ab(this, e).has(e);
    }
    tc.exports = sb;
  });
  var ic = d((_2, rc) => {
    var ub = dn();
    function cb(e, t) {
      var n = ub(this, e),
        r = n.size;
      return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
    }
    rc.exports = cb;
  });
  var $n = d((I2, oc) => {
    var lb = Ku(),
      fb = Zu(),
      db = ec(),
      pb = nc(),
      gb = ic();
    function kt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    kt.prototype.clear = lb;
    kt.prototype.delete = fb;
    kt.prototype.get = db;
    kt.prototype.has = pb;
    kt.prototype.set = gb;
    oc.exports = kt;
  });
  var sc = d((b2, ac) => {
    var hb = ln(),
      vb = Qn(),
      yb = $n(),
      mb = 200;
    function Eb(e, t) {
      var n = this.__data__;
      if (n instanceof hb) {
        var r = n.__data__;
        if (!vb || r.length < mb - 1)
          return r.push([e, t]), (this.size = ++n.size), this;
        n = this.__data__ = new yb(r);
      }
      return n.set(e, t), (this.size = n.size), this;
    }
    ac.exports = Eb;
  });
  var Si = d((T2, uc) => {
    var _b = ln(),
      Ib = lu(),
      bb = du(),
      Tb = gu(),
      wb = vu(),
      Ab = sc();
    function Gt(e) {
      var t = (this.__data__ = new _b(e));
      this.size = t.size;
    }
    Gt.prototype.clear = Ib;
    Gt.prototype.delete = bb;
    Gt.prototype.get = Tb;
    Gt.prototype.has = wb;
    Gt.prototype.set = Ab;
    uc.exports = Gt;
  });
  var lc = d((w2, cc) => {
    var Ob = "__lodash_hash_undefined__";
    function xb(e) {
      return this.__data__.set(e, Ob), this;
    }
    cc.exports = xb;
  });
  var dc = d((A2, fc) => {
    function Sb(e) {
      return this.__data__.has(e);
    }
    fc.exports = Sb;
  });
  var gc = d((O2, pc) => {
    var Rb = $n(),
      Cb = lc(),
      Lb = dc();
    function Zn(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.__data__ = new Rb(); ++t < n; ) this.add(e[t]);
    }
    Zn.prototype.add = Zn.prototype.push = Cb;
    Zn.prototype.has = Lb;
    pc.exports = Zn;
  });
  var vc = d((x2, hc) => {
    function Pb(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
        if (t(e[n], n, e)) return !0;
      return !1;
    }
    hc.exports = Pb;
  });
  var mc = d((S2, yc) => {
    function Nb(e, t) {
      return e.has(t);
    }
    yc.exports = Nb;
  });
  var Ri = d((R2, Ec) => {
    var Db = gc(),
      Mb = vc(),
      Fb = mc(),
      qb = 1,
      kb = 2;
    function Gb(e, t, n, r, i, o) {
      var s = n & qb,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var l = o.get(e),
        _ = o.get(t);
      if (l && _) return l == t && _ == e;
      var v = -1,
        g = !0,
        y = n & kb ? new Db() : void 0;
      for (o.set(e, t), o.set(t, e); ++v < a; ) {
        var b = e[v],
          T = t[v];
        if (r) var R = s ? r(T, b, v, t, e, o) : r(b, T, v, e, t, o);
        if (R !== void 0) {
          if (R) continue;
          g = !1;
          break;
        }
        if (y) {
          if (
            !Mb(t, function (w, L) {
              if (!Fb(y, L) && (b === w || i(b, w, n, r, o))) return y.push(L);
            })
          ) {
            g = !1;
            break;
          }
        } else if (!(b === T || i(b, T, n, r, o))) {
          g = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), g;
    }
    Ec.exports = Gb;
  });
  var Ic = d((C2, _c) => {
    var Xb = ze(),
      Ub = Xb.Uint8Array;
    _c.exports = Ub;
  });
  var Tc = d((L2, bc) => {
    function Vb(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r, i) {
          n[++t] = [i, r];
        }),
        n
      );
    }
    bc.exports = Vb;
  });
  var Ac = d((P2, wc) => {
    function Wb(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r) {
          n[++t] = r;
        }),
        n
      );
    }
    wc.exports = Wb;
  });
  var Cc = d((N2, Rc) => {
    var Oc = Pt(),
      xc = Ic(),
      Hb = Yn(),
      Bb = Ri(),
      zb = Tc(),
      Kb = Ac(),
      jb = 1,
      Yb = 2,
      Qb = "[object Boolean]",
      $b = "[object Date]",
      Zb = "[object Error]",
      Jb = "[object Map]",
      eT = "[object Number]",
      tT = "[object RegExp]",
      nT = "[object Set]",
      rT = "[object String]",
      iT = "[object Symbol]",
      oT = "[object ArrayBuffer]",
      aT = "[object DataView]",
      Sc = Oc ? Oc.prototype : void 0,
      Ci = Sc ? Sc.valueOf : void 0;
    function sT(e, t, n, r, i, o, s) {
      switch (n) {
        case aT:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case oT:
          return !(e.byteLength != t.byteLength || !o(new xc(e), new xc(t)));
        case Qb:
        case $b:
        case eT:
          return Hb(+e, +t);
        case Zb:
          return e.name == t.name && e.message == t.message;
        case tT:
        case rT:
          return e == t + "";
        case Jb:
          var a = zb;
        case nT:
          var u = r & jb;
          if ((a || (a = Kb), e.size != t.size && !u)) return !1;
          var l = s.get(e);
          if (l) return l == t;
          (r |= Yb), s.set(e, t);
          var _ = Bb(a(e), a(t), r, i, o, s);
          return s.delete(e), _;
        case iT:
          if (Ci) return Ci.call(e) == Ci.call(t);
      }
      return !1;
    }
    Rc.exports = sT;
  });
  var Jn = d((D2, Lc) => {
    function uT(e, t) {
      for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
      return e;
    }
    Lc.exports = uT;
  });
  var we = d((M2, Pc) => {
    var cT = Array.isArray;
    Pc.exports = cT;
  });
  var Li = d((F2, Nc) => {
    var lT = Jn(),
      fT = we();
    function dT(e, t, n) {
      var r = t(e);
      return fT(e) ? r : lT(r, n(e));
    }
    Nc.exports = dT;
  });
  var Mc = d((q2, Dc) => {
    function pT(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = 0, o = []; ++n < r; ) {
        var s = e[n];
        t(s, n, e) && (o[i++] = s);
      }
      return o;
    }
    Dc.exports = pT;
  });
  var Pi = d((k2, Fc) => {
    function gT() {
      return [];
    }
    Fc.exports = gT;
  });
  var Ni = d((G2, kc) => {
    var hT = Mc(),
      vT = Pi(),
      yT = Object.prototype,
      mT = yT.propertyIsEnumerable,
      qc = Object.getOwnPropertySymbols,
      ET = qc
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                hT(qc(e), function (t) {
                  return mT.call(e, t);
                }));
          }
        : vT;
    kc.exports = ET;
  });
  var Xc = d((X2, Gc) => {
    function _T(e, t) {
      for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
      return r;
    }
    Gc.exports = _T;
  });
  var Vc = d((U2, Uc) => {
    var IT = dt(),
      bT = at(),
      TT = "[object Arguments]";
    function wT(e) {
      return bT(e) && IT(e) == TT;
    }
    Uc.exports = wT;
  });
  var pn = d((V2, Bc) => {
    var Wc = Vc(),
      AT = at(),
      Hc = Object.prototype,
      OT = Hc.hasOwnProperty,
      xT = Hc.propertyIsEnumerable,
      ST = Wc(
        (function () {
          return arguments;
        })()
      )
        ? Wc
        : function (e) {
            return AT(e) && OT.call(e, "callee") && !xT.call(e, "callee");
          };
    Bc.exports = ST;
  });
  var Kc = d((W2, zc) => {
    function RT() {
      return !1;
    }
    zc.exports = RT;
  });
  var er = d((gn, Xt) => {
    var CT = ze(),
      LT = Kc(),
      Qc = typeof gn == "object" && gn && !gn.nodeType && gn,
      jc = Qc && typeof Xt == "object" && Xt && !Xt.nodeType && Xt,
      PT = jc && jc.exports === Qc,
      Yc = PT ? CT.Buffer : void 0,
      NT = Yc ? Yc.isBuffer : void 0,
      DT = NT || LT;
    Xt.exports = DT;
  });
  var tr = d((H2, $c) => {
    var MT = 9007199254740991,
      FT = /^(?:0|[1-9]\d*)$/;
    function qT(e, t) {
      var n = typeof e;
      return (
        (t = t ?? MT),
        !!t &&
          (n == "number" || (n != "symbol" && FT.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    $c.exports = qT;
  });
  var nr = d((B2, Zc) => {
    var kT = 9007199254740991;
    function GT(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= kT;
    }
    Zc.exports = GT;
  });
  var el = d((z2, Jc) => {
    var XT = dt(),
      UT = nr(),
      VT = at(),
      WT = "[object Arguments]",
      HT = "[object Array]",
      BT = "[object Boolean]",
      zT = "[object Date]",
      KT = "[object Error]",
      jT = "[object Function]",
      YT = "[object Map]",
      QT = "[object Number]",
      $T = "[object Object]",
      ZT = "[object RegExp]",
      JT = "[object Set]",
      ew = "[object String]",
      tw = "[object WeakMap]",
      nw = "[object ArrayBuffer]",
      rw = "[object DataView]",
      iw = "[object Float32Array]",
      ow = "[object Float64Array]",
      aw = "[object Int8Array]",
      sw = "[object Int16Array]",
      uw = "[object Int32Array]",
      cw = "[object Uint8Array]",
      lw = "[object Uint8ClampedArray]",
      fw = "[object Uint16Array]",
      dw = "[object Uint32Array]",
      ye = {};
    ye[iw] =
      ye[ow] =
      ye[aw] =
      ye[sw] =
      ye[uw] =
      ye[cw] =
      ye[lw] =
      ye[fw] =
      ye[dw] =
        !0;
    ye[WT] =
      ye[HT] =
      ye[nw] =
      ye[BT] =
      ye[rw] =
      ye[zT] =
      ye[KT] =
      ye[jT] =
      ye[YT] =
      ye[QT] =
      ye[$T] =
      ye[ZT] =
      ye[JT] =
      ye[ew] =
      ye[tw] =
        !1;
    function pw(e) {
      return VT(e) && UT(e.length) && !!ye[XT(e)];
    }
    Jc.exports = pw;
  });
  var nl = d((K2, tl) => {
    function gw(e) {
      return function (t) {
        return e(t);
      };
    }
    tl.exports = gw;
  });
  var il = d((hn, Ut) => {
    var hw = oi(),
      rl = typeof hn == "object" && hn && !hn.nodeType && hn,
      vn = rl && typeof Ut == "object" && Ut && !Ut.nodeType && Ut,
      vw = vn && vn.exports === rl,
      Di = vw && hw.process,
      yw = (function () {
        try {
          var e = vn && vn.require && vn.require("util").types;
          return e || (Di && Di.binding && Di.binding("util"));
        } catch {}
      })();
    Ut.exports = yw;
  });
  var rr = d((j2, sl) => {
    var mw = el(),
      Ew = nl(),
      ol = il(),
      al = ol && ol.isTypedArray,
      _w = al ? Ew(al) : mw;
    sl.exports = _w;
  });
  var Mi = d((Y2, ul) => {
    var Iw = Xc(),
      bw = pn(),
      Tw = we(),
      ww = er(),
      Aw = tr(),
      Ow = rr(),
      xw = Object.prototype,
      Sw = xw.hasOwnProperty;
    function Rw(e, t) {
      var n = Tw(e),
        r = !n && bw(e),
        i = !n && !r && ww(e),
        o = !n && !r && !i && Ow(e),
        s = n || r || i || o,
        a = s ? Iw(e.length, String) : [],
        u = a.length;
      for (var l in e)
        (t || Sw.call(e, l)) &&
          !(
            s &&
            (l == "length" ||
              (i && (l == "offset" || l == "parent")) ||
              (o &&
                (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
              Aw(l, u))
          ) &&
          a.push(l);
      return a;
    }
    ul.exports = Rw;
  });
  var ir = d((Q2, cl) => {
    var Cw = Object.prototype;
    function Lw(e) {
      var t = e && e.constructor,
        n = (typeof t == "function" && t.prototype) || Cw;
      return e === n;
    }
    cl.exports = Lw;
  });
  var fl = d(($2, ll) => {
    var Pw = ai(),
      Nw = Pw(Object.keys, Object);
    ll.exports = Nw;
  });
  var or = d((Z2, dl) => {
    var Dw = ir(),
      Mw = fl(),
      Fw = Object.prototype,
      qw = Fw.hasOwnProperty;
    function kw(e) {
      if (!Dw(e)) return Mw(e);
      var t = [];
      for (var n in Object(e)) qw.call(e, n) && n != "constructor" && t.push(n);
      return t;
    }
    dl.exports = kw;
  });
  var It = d((J2, pl) => {
    var Gw = Ai(),
      Xw = nr();
    function Uw(e) {
      return e != null && Xw(e.length) && !Gw(e);
    }
    pl.exports = Uw;
  });
  var yn = d((eq, gl) => {
    var Vw = Mi(),
      Ww = or(),
      Hw = It();
    function Bw(e) {
      return Hw(e) ? Vw(e) : Ww(e);
    }
    gl.exports = Bw;
  });
  var vl = d((tq, hl) => {
    var zw = Li(),
      Kw = Ni(),
      jw = yn();
    function Yw(e) {
      return zw(e, jw, Kw);
    }
    hl.exports = Yw;
  });
  var El = d((nq, ml) => {
    var yl = vl(),
      Qw = 1,
      $w = Object.prototype,
      Zw = $w.hasOwnProperty;
    function Jw(e, t, n, r, i, o) {
      var s = n & Qw,
        a = yl(e),
        u = a.length,
        l = yl(t),
        _ = l.length;
      if (u != _ && !s) return !1;
      for (var v = u; v--; ) {
        var g = a[v];
        if (!(s ? g in t : Zw.call(t, g))) return !1;
      }
      var y = o.get(e),
        b = o.get(t);
      if (y && b) return y == t && b == e;
      var T = !0;
      o.set(e, t), o.set(t, e);
      for (var R = s; ++v < u; ) {
        g = a[v];
        var w = e[g],
          L = t[g];
        if (r) var C = s ? r(L, w, g, t, e, o) : r(w, L, g, e, t, o);
        if (!(C === void 0 ? w === L || i(w, L, n, r, o) : C)) {
          T = !1;
          break;
        }
        R || (R = g == "constructor");
      }
      if (T && !R) {
        var D = e.constructor,
          q = t.constructor;
        D != q &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof D == "function" &&
            D instanceof D &&
            typeof q == "function" &&
            q instanceof q
          ) &&
          (T = !1);
      }
      return o.delete(e), o.delete(t), T;
    }
    ml.exports = Jw;
  });
  var Il = d((rq, _l) => {
    var eA = pt(),
      tA = ze(),
      nA = eA(tA, "DataView");
    _l.exports = nA;
  });
  var Tl = d((iq, bl) => {
    var rA = pt(),
      iA = ze(),
      oA = rA(iA, "Promise");
    bl.exports = oA;
  });
  var Al = d((oq, wl) => {
    var aA = pt(),
      sA = ze(),
      uA = aA(sA, "Set");
    wl.exports = uA;
  });
  var Fi = d((aq, Ol) => {
    var cA = pt(),
      lA = ze(),
      fA = cA(lA, "WeakMap");
    Ol.exports = fA;
  });
  var ar = d((sq, Nl) => {
    var qi = Il(),
      ki = Qn(),
      Gi = Tl(),
      Xi = Al(),
      Ui = Fi(),
      Pl = dt(),
      Vt = xi(),
      xl = "[object Map]",
      dA = "[object Object]",
      Sl = "[object Promise]",
      Rl = "[object Set]",
      Cl = "[object WeakMap]",
      Ll = "[object DataView]",
      pA = Vt(qi),
      gA = Vt(ki),
      hA = Vt(Gi),
      vA = Vt(Xi),
      yA = Vt(Ui),
      bt = Pl;
    ((qi && bt(new qi(new ArrayBuffer(1))) != Ll) ||
      (ki && bt(new ki()) != xl) ||
      (Gi && bt(Gi.resolve()) != Sl) ||
      (Xi && bt(new Xi()) != Rl) ||
      (Ui && bt(new Ui()) != Cl)) &&
      (bt = function (e) {
        var t = Pl(e),
          n = t == dA ? e.constructor : void 0,
          r = n ? Vt(n) : "";
        if (r)
          switch (r) {
            case pA:
              return Ll;
            case gA:
              return xl;
            case hA:
              return Sl;
            case vA:
              return Rl;
            case yA:
              return Cl;
          }
        return t;
      });
    Nl.exports = bt;
  });
  var Ul = d((uq, Xl) => {
    var Vi = Si(),
      mA = Ri(),
      EA = Cc(),
      _A = El(),
      Dl = ar(),
      Ml = we(),
      Fl = er(),
      IA = rr(),
      bA = 1,
      ql = "[object Arguments]",
      kl = "[object Array]",
      sr = "[object Object]",
      TA = Object.prototype,
      Gl = TA.hasOwnProperty;
    function wA(e, t, n, r, i, o) {
      var s = Ml(e),
        a = Ml(t),
        u = s ? kl : Dl(e),
        l = a ? kl : Dl(t);
      (u = u == ql ? sr : u), (l = l == ql ? sr : l);
      var _ = u == sr,
        v = l == sr,
        g = u == l;
      if (g && Fl(e)) {
        if (!Fl(t)) return !1;
        (s = !0), (_ = !1);
      }
      if (g && !_)
        return (
          o || (o = new Vi()),
          s || IA(e) ? mA(e, t, n, r, i, o) : EA(e, t, u, n, r, i, o)
        );
      if (!(n & bA)) {
        var y = _ && Gl.call(e, "__wrapped__"),
          b = v && Gl.call(t, "__wrapped__");
        if (y || b) {
          var T = y ? e.value() : e,
            R = b ? t.value() : t;
          return o || (o = new Vi()), i(T, R, n, r, o);
        }
      }
      return g ? (o || (o = new Vi()), _A(e, t, n, r, i, o)) : !1;
    }
    Xl.exports = wA;
  });
  var Wi = d((cq, Hl) => {
    var AA = Ul(),
      Vl = at();
    function Wl(e, t, n, r, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Vl(e) && !Vl(t))
        ? e !== e && t !== t
        : AA(e, t, n, r, Wl, i);
    }
    Hl.exports = Wl;
  });
  var zl = d((lq, Bl) => {
    var OA = Si(),
      xA = Wi(),
      SA = 1,
      RA = 2;
    function CA(e, t, n, r) {
      var i = n.length,
        o = i,
        s = !r;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = n[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = n[i];
        var u = a[0],
          l = e[u],
          _ = a[1];
        if (s && a[2]) {
          if (l === void 0 && !(u in e)) return !1;
        } else {
          var v = new OA();
          if (r) var g = r(l, _, u, e, t, v);
          if (!(g === void 0 ? xA(_, l, SA | RA, r, v) : g)) return !1;
        }
      }
      return !0;
    }
    Bl.exports = CA;
  });
  var Hi = d((fq, Kl) => {
    var LA = tt();
    function PA(e) {
      return e === e && !LA(e);
    }
    Kl.exports = PA;
  });
  var Yl = d((dq, jl) => {
    var NA = Hi(),
      DA = yn();
    function MA(e) {
      for (var t = DA(e), n = t.length; n--; ) {
        var r = t[n],
          i = e[r];
        t[n] = [r, i, NA(i)];
      }
      return t;
    }
    jl.exports = MA;
  });
  var Bi = d((pq, Ql) => {
    function FA(e, t) {
      return function (n) {
        return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
      };
    }
    Ql.exports = FA;
  });
  var Zl = d((gq, $l) => {
    var qA = zl(),
      kA = Yl(),
      GA = Bi();
    function XA(e) {
      var t = kA(e);
      return t.length == 1 && t[0][2]
        ? GA(t[0][0], t[0][1])
        : function (n) {
            return n === e || qA(n, e, t);
          };
    }
    $l.exports = XA;
  });
  var mn = d((hq, Jl) => {
    var UA = dt(),
      VA = at(),
      WA = "[object Symbol]";
    function HA(e) {
      return typeof e == "symbol" || (VA(e) && UA(e) == WA);
    }
    Jl.exports = HA;
  });
  var ur = d((vq, ef) => {
    var BA = we(),
      zA = mn(),
      KA = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      jA = /^\w*$/;
    function YA(e, t) {
      if (BA(e)) return !1;
      var n = typeof e;
      return n == "number" ||
        n == "symbol" ||
        n == "boolean" ||
        e == null ||
        zA(e)
        ? !0
        : jA.test(e) || !KA.test(e) || (t != null && e in Object(t));
    }
    ef.exports = YA;
  });
  var rf = d((yq, nf) => {
    var tf = $n(),
      QA = "Expected a function";
    function zi(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(QA);
      var n = function () {
        var r = arguments,
          i = t ? t.apply(this, r) : r[0],
          o = n.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, r);
        return (n.cache = o.set(i, s) || o), s;
      };
      return (n.cache = new (zi.Cache || tf)()), n;
    }
    zi.Cache = tf;
    nf.exports = zi;
  });
  var af = d((mq, of) => {
    var $A = rf(),
      ZA = 500;
    function JA(e) {
      var t = $A(e, function (r) {
          return n.size === ZA && n.clear(), r;
        }),
        n = t.cache;
      return t;
    }
    of.exports = JA;
  });
  var uf = d((Eq, sf) => {
    var e0 = af(),
      t0 =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      n0 = /\\(\\)?/g,
      r0 = e0(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(t0, function (n, r, i, o) {
            t.push(i ? o.replace(n0, "$1") : r || n);
          }),
          t
        );
      });
    sf.exports = r0;
  });
  var Ki = d((_q, cf) => {
    function i0(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
        i[n] = t(e[n], n, e);
      return i;
    }
    cf.exports = i0;
  });
  var hf = d((Iq, gf) => {
    var lf = Pt(),
      o0 = Ki(),
      a0 = we(),
      s0 = mn(),
      u0 = 1 / 0,
      ff = lf ? lf.prototype : void 0,
      df = ff ? ff.toString : void 0;
    function pf(e) {
      if (typeof e == "string") return e;
      if (a0(e)) return o0(e, pf) + "";
      if (s0(e)) return df ? df.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -u0 ? "-0" : t;
    }
    gf.exports = pf;
  });
  var yf = d((bq, vf) => {
    var c0 = hf();
    function l0(e) {
      return e == null ? "" : c0(e);
    }
    vf.exports = l0;
  });
  var En = d((Tq, mf) => {
    var f0 = we(),
      d0 = ur(),
      p0 = uf(),
      g0 = yf();
    function h0(e, t) {
      return f0(e) ? e : d0(e, t) ? [e] : p0(g0(e));
    }
    mf.exports = h0;
  });
  var Wt = d((wq, Ef) => {
    var v0 = mn(),
      y0 = 1 / 0;
    function m0(e) {
      if (typeof e == "string" || v0(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -y0 ? "-0" : t;
    }
    Ef.exports = m0;
  });
  var cr = d((Aq, _f) => {
    var E0 = En(),
      _0 = Wt();
    function I0(e, t) {
      t = E0(t, e);
      for (var n = 0, r = t.length; e != null && n < r; ) e = e[_0(t[n++])];
      return n && n == r ? e : void 0;
    }
    _f.exports = I0;
  });
  var lr = d((Oq, If) => {
    var b0 = cr();
    function T0(e, t, n) {
      var r = e == null ? void 0 : b0(e, t);
      return r === void 0 ? n : r;
    }
    If.exports = T0;
  });
  var Tf = d((xq, bf) => {
    function w0(e, t) {
      return e != null && t in Object(e);
    }
    bf.exports = w0;
  });
  var Af = d((Sq, wf) => {
    var A0 = En(),
      O0 = pn(),
      x0 = we(),
      S0 = tr(),
      R0 = nr(),
      C0 = Wt();
    function L0(e, t, n) {
      t = A0(t, e);
      for (var r = -1, i = t.length, o = !1; ++r < i; ) {
        var s = C0(t[r]);
        if (!(o = e != null && n(e, s))) break;
        e = e[s];
      }
      return o || ++r != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && R0(i) && S0(s, i) && (x0(e) || O0(e)));
    }
    wf.exports = L0;
  });
  var xf = d((Rq, Of) => {
    var P0 = Tf(),
      N0 = Af();
    function D0(e, t) {
      return e != null && N0(e, t, P0);
    }
    Of.exports = D0;
  });
  var Rf = d((Cq, Sf) => {
    var M0 = Wi(),
      F0 = lr(),
      q0 = xf(),
      k0 = ur(),
      G0 = Hi(),
      X0 = Bi(),
      U0 = Wt(),
      V0 = 1,
      W0 = 2;
    function H0(e, t) {
      return k0(e) && G0(t)
        ? X0(U0(e), t)
        : function (n) {
            var r = F0(n, e);
            return r === void 0 && r === t ? q0(n, e) : M0(t, r, V0 | W0);
          };
    }
    Sf.exports = H0;
  });
  var fr = d((Lq, Cf) => {
    function B0(e) {
      return e;
    }
    Cf.exports = B0;
  });
  var ji = d((Pq, Lf) => {
    function z0(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Lf.exports = z0;
  });
  var Nf = d((Nq, Pf) => {
    var K0 = cr();
    function j0(e) {
      return function (t) {
        return K0(t, e);
      };
    }
    Pf.exports = j0;
  });
  var Mf = d((Dq, Df) => {
    var Y0 = ji(),
      Q0 = Nf(),
      $0 = ur(),
      Z0 = Wt();
    function J0(e) {
      return $0(e) ? Y0(Z0(e)) : Q0(e);
    }
    Df.exports = J0;
  });
  var gt = d((Mq, Ff) => {
    var eO = Zl(),
      tO = Rf(),
      nO = fr(),
      rO = we(),
      iO = Mf();
    function oO(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? nO
        : typeof e == "object"
        ? rO(e)
          ? tO(e[0], e[1])
          : eO(e)
        : iO(e);
    }
    Ff.exports = oO;
  });
  var Yi = d((Fq, qf) => {
    var aO = gt(),
      sO = It(),
      uO = yn();
    function cO(e) {
      return function (t, n, r) {
        var i = Object(t);
        if (!sO(t)) {
          var o = aO(n, 3);
          (t = uO(t)),
            (n = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, n, r);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    qf.exports = cO;
  });
  var Qi = d((qq, kf) => {
    function lO(e, t, n, r) {
      for (var i = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    kf.exports = lO;
  });
  var Xf = d((kq, Gf) => {
    var fO = /\s/;
    function dO(e) {
      for (var t = e.length; t-- && fO.test(e.charAt(t)); );
      return t;
    }
    Gf.exports = dO;
  });
  var Vf = d((Gq, Uf) => {
    var pO = Xf(),
      gO = /^\s+/;
    function hO(e) {
      return e && e.slice(0, pO(e) + 1).replace(gO, "");
    }
    Uf.exports = hO;
  });
  var dr = d((Xq, Bf) => {
    var vO = Vf(),
      Wf = tt(),
      yO = mn(),
      Hf = 0 / 0,
      mO = /^[-+]0x[0-9a-f]+$/i,
      EO = /^0b[01]+$/i,
      _O = /^0o[0-7]+$/i,
      IO = parseInt;
    function bO(e) {
      if (typeof e == "number") return e;
      if (yO(e)) return Hf;
      if (Wf(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Wf(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = vO(e);
      var n = EO.test(e);
      return n || _O.test(e) ? IO(e.slice(2), n ? 2 : 8) : mO.test(e) ? Hf : +e;
    }
    Bf.exports = bO;
  });
  var jf = d((Uq, Kf) => {
    var TO = dr(),
      zf = 1 / 0,
      wO = 17976931348623157e292;
    function AO(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = TO(e)), e === zf || e === -zf)) {
        var t = e < 0 ? -1 : 1;
        return t * wO;
      }
      return e === e ? e : 0;
    }
    Kf.exports = AO;
  });
  var $i = d((Vq, Yf) => {
    var OO = jf();
    function xO(e) {
      var t = OO(e),
        n = t % 1;
      return t === t ? (n ? t - n : t) : 0;
    }
    Yf.exports = xO;
  });
  var $f = d((Wq, Qf) => {
    var SO = Qi(),
      RO = gt(),
      CO = $i(),
      LO = Math.max;
    function PO(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = n == null ? 0 : CO(n);
      return i < 0 && (i = LO(r + i, 0)), SO(e, RO(t, 3), i);
    }
    Qf.exports = PO;
  });
  var Zi = d((Hq, Zf) => {
    var NO = Yi(),
      DO = $f(),
      MO = NO(DO);
    Zf.exports = MO;
  });
  var td = {};
  Me(td, {
    ELEMENT_MATCHES: () => FO,
    FLEX_PREFIXED: () => Ji,
    IS_BROWSER_ENV: () => je,
    TRANSFORM_PREFIXED: () => ht,
    TRANSFORM_STYLE_PREFIXED: () => gr,
    withBrowser: () => pr,
  });
  var ed,
    je,
    pr,
    FO,
    Ji,
    ht,
    Jf,
    gr,
    hr = me(() => {
      "use strict";
      (ed = de(Zi())),
        (je = typeof window < "u"),
        (pr = (e, t) => (je ? e() : t)),
        (FO = pr(() =>
          (0, ed.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Ji = pr(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            n = "";
          try {
            let { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return n;
          } catch {
            return n;
          }
        }, "flex")),
        (ht = pr(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              n = "Transform",
              { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i] + n;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (Jf = ht.split("transform")[0]),
        (gr = Jf ? Jf + "TransformStyle" : "transformStyle");
    });
  var eo = d((Bq, ad) => {
    var qO = 4,
      kO = 0.001,
      GO = 1e-7,
      XO = 10,
      _n = 11,
      vr = 1 / (_n - 1),
      UO = typeof Float32Array == "function";
    function nd(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function rd(e, t) {
      return 3 * t - 6 * e;
    }
    function id(e) {
      return 3 * e;
    }
    function yr(e, t, n) {
      return ((nd(t, n) * e + rd(t, n)) * e + id(t)) * e;
    }
    function od(e, t, n) {
      return 3 * nd(t, n) * e * e + 2 * rd(t, n) * e + id(t);
    }
    function VO(e, t, n, r, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (n - t) / 2), (o = yr(s, r, i) - e), o > 0 ? (n = s) : (t = s);
      while (Math.abs(o) > GO && ++a < XO);
      return s;
    }
    function WO(e, t, n, r) {
      for (var i = 0; i < qO; ++i) {
        var o = od(t, n, r);
        if (o === 0) return t;
        var s = yr(t, n, r) - e;
        t -= s / o;
      }
      return t;
    }
    ad.exports = function (t, n, r, i) {
      if (!(0 <= t && t <= 1 && 0 <= r && r <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = UO ? new Float32Array(_n) : new Array(_n);
      if (t !== n || r !== i)
        for (var s = 0; s < _n; ++s) o[s] = yr(s * vr, t, r);
      function a(u) {
        for (var l = 0, _ = 1, v = _n - 1; _ !== v && o[_] <= u; ++_) l += vr;
        --_;
        var g = (u - o[_]) / (o[_ + 1] - o[_]),
          y = l + g * vr,
          b = od(y, t, r);
        return b >= kO ? WO(u, y, t, r) : b === 0 ? y : VO(u, l, l + vr, t, r);
      }
      return function (l) {
        return t === n && r === i
          ? l
          : l === 0
          ? 0
          : l === 1
          ? 1
          : yr(a(l), n, i);
      };
    };
  });
  var bn = {};
  Me(bn, {
    bounce: () => Ax,
    bouncePast: () => Ox,
    ease: () => HO,
    easeIn: () => BO,
    easeInOut: () => KO,
    easeOut: () => zO,
    inBack: () => vx,
    inCirc: () => dx,
    inCubic: () => $O,
    inElastic: () => Ex,
    inExpo: () => cx,
    inOutBack: () => mx,
    inOutCirc: () => gx,
    inOutCubic: () => JO,
    inOutElastic: () => Ix,
    inOutExpo: () => fx,
    inOutQuad: () => QO,
    inOutQuart: () => nx,
    inOutQuint: () => ox,
    inOutSine: () => ux,
    inQuad: () => jO,
    inQuart: () => ex,
    inQuint: () => rx,
    inSine: () => ax,
    outBack: () => yx,
    outBounce: () => hx,
    outCirc: () => px,
    outCubic: () => ZO,
    outElastic: () => _x,
    outExpo: () => lx,
    outQuad: () => YO,
    outQuart: () => tx,
    outQuint: () => ix,
    outSine: () => sx,
    swingFrom: () => Tx,
    swingFromTo: () => bx,
    swingTo: () => wx,
  });
  function jO(e) {
    return Math.pow(e, 2);
  }
  function YO(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function QO(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function $O(e) {
    return Math.pow(e, 3);
  }
  function ZO(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function JO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function ex(e) {
    return Math.pow(e, 4);
  }
  function tx(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function nx(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function rx(e) {
    return Math.pow(e, 5);
  }
  function ix(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function ox(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function ax(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function sx(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function ux(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function cx(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function lx(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function fx(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function dx(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function px(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function gx(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function hx(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function vx(e) {
    let t = st;
    return e * e * ((t + 1) * e - t);
  }
  function yx(e) {
    let t = st;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function mx(e) {
    let t = st;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Ex(e) {
    let t = st,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        -(
          r *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / n)
        ));
  }
  function _x(e) {
    let t = st,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        r * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / n) + 1);
  }
  function Ix(e) {
    let t = st,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (n || (n = 0.3 * 1.5),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        e < 1
          ? -0.5 *
            (r *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n))
          : r *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n) *
              0.5 +
            1);
  }
  function bx(e) {
    let t = st;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Tx(e) {
    let t = st;
    return e * e * ((t + 1) * e - t);
  }
  function wx(e) {
    let t = st;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Ax(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function Ox(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var In,
    st,
    HO,
    BO,
    zO,
    KO,
    to = me(() => {
      "use strict";
      (In = de(eo())),
        (st = 1.70158),
        (HO = (0, In.default)(0.25, 0.1, 0.25, 1)),
        (BO = (0, In.default)(0.42, 0, 1, 1)),
        (zO = (0, In.default)(0, 0, 0.58, 1)),
        (KO = (0, In.default)(0.42, 0, 0.58, 1));
    });
  var ud = {};
  Me(ud, {
    applyEasing: () => Sx,
    createBezierEasing: () => xx,
    optimizeFloat: () => Tn,
  });
  function Tn(e, t = 5, n = 10) {
    let r = Math.pow(n, t),
      i = Number(Math.round(e * r) / r);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function xx(e) {
    return (0, sd.default)(...e);
  }
  function Sx(e, t, n) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Tn(n ? (t > 0 ? n(t) : t) : t > 0 && e && bn[e] ? bn[e](t) : t);
  }
  var sd,
    no = me(() => {
      "use strict";
      to();
      sd = de(eo());
    });
  var fd = {};
  Me(fd, {
    createElementState: () => ld,
    ixElements: () => Vx,
    mergeActionState: () => ro,
  });
  function ld(e, t, n, r, i) {
    let o =
      n === Rx ? (0, Ht.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, Ht.mergeIn)(e, [r], { id: r, ref: t, refId: o, refType: n });
  }
  function ro(e, t, n, r, i) {
    let o = Hx(i);
    return (0, Ht.mergeIn)(e, [t, Ux, n], r, o);
  }
  function Hx(e) {
    let { config: t } = e;
    return Wx.reduce((n, r) => {
      let i = r[0],
        o = r[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (n[o] = a), n;
    }, {});
  }
  var Ht,
    Kq,
    Rx,
    jq,
    Cx,
    Lx,
    Px,
    Nx,
    Dx,
    Mx,
    Fx,
    qx,
    kx,
    Gx,
    Xx,
    cd,
    Ux,
    Vx,
    Wx,
    dd = me(() => {
      "use strict";
      Ht = de(Mt());
      Fe();
      ({
        HTML_ELEMENT: Kq,
        PLAIN_OBJECT: Rx,
        ABSTRACT_NODE: jq,
        CONFIG_X_VALUE: Cx,
        CONFIG_Y_VALUE: Lx,
        CONFIG_Z_VALUE: Px,
        CONFIG_VALUE: Nx,
        CONFIG_X_UNIT: Dx,
        CONFIG_Y_UNIT: Mx,
        CONFIG_Z_UNIT: Fx,
        CONFIG_UNIT: qx,
      } = Oe),
        ({
          IX2_SESSION_STOPPED: kx,
          IX2_INSTANCE_ADDED: Gx,
          IX2_ELEMENT_STATE_CHANGED: Xx,
        } = Te),
        (cd = {}),
        (Ux = "refState"),
        (Vx = (e = cd, t = {}) => {
          switch (t.type) {
            case kx:
              return cd;
            case Gx: {
              let {
                  elementId: n,
                  element: r,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, Ht.getIn)(u, [n, r]) !== r && (u = ld(u, r, s, n, o)),
                ro(u, n, a, i, o)
              );
            }
            case Xx: {
              let {
                elementId: n,
                actionTypeId: r,
                current: i,
                actionItem: o,
              } = t.payload;
              return ro(e, n, r, i, o);
            }
            default:
              return e;
          }
        });
      Wx = [
        [Cx, Dx],
        [Lx, Mx],
        [Px, Fx],
        [Nx, qx],
      ];
    });
  var pd = d((io) => {
    "use strict";
    Object.defineProperty(io, "__esModule", { value: !0 });
    function Bx(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    Bx(io, {
      clearPlugin: function () {
        return Zx;
      },
      createPluginInstance: function () {
        return Qx;
      },
      getPluginConfig: function () {
        return zx;
      },
      getPluginDestination: function () {
        return Yx;
      },
      getPluginDuration: function () {
        return Kx;
      },
      getPluginOrigin: function () {
        return jx;
      },
      renderPlugin: function () {
        return $x;
      },
    });
    var zx = (e) => e.value,
      Kx = (e, t) => {
        if (t.config.duration !== "auto") return null;
        let n = parseFloat(e.getAttribute("data-duration"));
        return n > 0
          ? n * 1e3
          : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      },
      jx = (e) => e || { value: 0 },
      Yx = (e) => ({ value: e.value }),
      Qx = (e) => {
        let t = window.Webflow.require("lottie").createInstance(e);
        return t.stop(), t.setSubframe(!0), t;
      },
      $x = (e, t, n) => {
        if (!e) return;
        let r = t[n.actionTypeId].value / 100;
        e.goToFrame(e.frames * r);
      },
      Zx = (e) => {
        window.Webflow.require("lottie").createInstance(e).stop();
      };
  });
  var hd = d((oo) => {
    "use strict";
    Object.defineProperty(oo, "__esModule", { value: !0 });
    function Jx(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    Jx(oo, {
      clearPlugin: function () {
        return cS;
      },
      createPluginInstance: function () {
        return sS;
      },
      getPluginConfig: function () {
        return rS;
      },
      getPluginDestination: function () {
        return aS;
      },
      getPluginDuration: function () {
        return iS;
      },
      getPluginOrigin: function () {
        return oS;
      },
      renderPlugin: function () {
        return uS;
      },
    });
    var eS = (e) => document.querySelector(`[data-w-id="${e}"]`),
      tS = () => window.Webflow.require("spline"),
      nS = (e, t) => e.filter((n) => !t.includes(n)),
      rS = (e, t) => e.value[t],
      iS = () => null,
      gd = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      oS = (e, t) => {
        let n = t.config.value,
          r = Object.keys(n);
        if (e) {
          let o = Object.keys(e),
            s = nS(r, o);
          return s.length ? s.reduce((u, l) => ((u[l] = gd[l]), u), e) : e;
        }
        return r.reduce((o, s) => ((o[s] = gd[s]), o), {});
      },
      aS = (e) => e.value,
      sS = (e, t) => {
        let n = t?.config?.target?.pluginElement;
        return n ? eS(n) : null;
      },
      uS = (e, t, n) => {
        let r = tS(),
          i = r.getInstance(e),
          o = n.config.target.objectId,
          s = (a) => {
            if (!a)
              throw new Error("Invalid spline app passed to renderSpline");
            let u = o && a.findObjectById(o);
            if (!u) return;
            let { PLUGIN_SPLINE: l } = t;
            l.positionX != null && (u.position.x = l.positionX),
              l.positionY != null && (u.position.y = l.positionY),
              l.positionZ != null && (u.position.z = l.positionZ),
              l.rotationX != null && (u.rotation.x = l.rotationX),
              l.rotationY != null && (u.rotation.y = l.rotationY),
              l.rotationZ != null && (u.rotation.z = l.rotationZ),
              l.scaleX != null && (u.scale.x = l.scaleX),
              l.scaleY != null && (u.scale.y = l.scaleY),
              l.scaleZ != null && (u.scale.z = l.scaleZ);
          };
        i ? s(i.spline) : r.setLoadHandler(e, s);
      },
      cS = () => null;
  });
  var vd = d((uo) => {
    "use strict";
    Object.defineProperty(uo, "__esModule", { value: !0 });
    function lS(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    lS(uo, {
      clearPlugin: function () {
        return ES;
      },
      createPluginInstance: function () {
        return yS;
      },
      getPluginConfig: function () {
        return pS;
      },
      getPluginDestination: function () {
        return vS;
      },
      getPluginDuration: function () {
        return gS;
      },
      getPluginOrigin: function () {
        return hS;
      },
      renderPlugin: function () {
        return mS;
      },
    });
    var ao = "--wf-rive-fit",
      so = "--wf-rive-alignment",
      fS = (e) => document.querySelector(`[data-w-id="${e}"]`),
      dS = () => window.Webflow.require("rive"),
      pS = (e, t) => e.value.inputs[t],
      gS = () => null,
      hS = (e, t) => {
        if (e) return e;
        let n = {},
          { inputs: r = {} } = t.config.value;
        for (let i in r) r[i] == null && (n[i] = 0);
        return n;
      },
      vS = (e) => e.value.inputs ?? {},
      yS = (e, t) => {
        if ((t.config?.target?.selectorGuids || []).length > 0) return e;
        let r = t?.config?.target?.pluginElement;
        return r ? fS(r) : null;
      },
      mS = (e, { PLUGIN_RIVE: t }, n) => {
        let r = dS(),
          i = r.getInstance(e),
          o = r.rive.StateMachineInputType,
          { name: s, inputs: a = {} } = n.config.value || {};
        function u(l) {
          if (l.loaded) _();
          else {
            let v = () => {
              _(), l?.off("load", v);
            };
            l?.on("load", v);
          }
          function _() {
            let v = l.stateMachineInputs(s);
            if (v != null) {
              if ((l.isPlaying || l.play(s, !1), ao in a || so in a)) {
                let g = l.layout,
                  y = a[ao] ?? g.fit,
                  b = a[so] ?? g.alignment;
                (y !== g.fit || b !== g.alignment) &&
                  (l.layout = g.copyWith({ fit: y, alignment: b }));
              }
              for (let g in a) {
                if (g === ao || g === so) continue;
                let y = v.find((b) => b.name === g);
                if (y != null)
                  switch (y.type) {
                    case o.Boolean: {
                      if (a[g] != null) {
                        let b = !!a[g];
                        y.value = b;
                      }
                      break;
                    }
                    case o.Number: {
                      let b = t[g];
                      b != null && (y.value = b);
                      break;
                    }
                    case o.Trigger: {
                      a[g] && y.fire();
                      break;
                    }
                  }
              }
            }
          }
        }
        i?.rive ? u(i.rive) : r.setLoadHandler(e, u);
      },
      ES = (e, t) => null;
  });
  var lo = d((co) => {
    "use strict";
    Object.defineProperty(co, "__esModule", { value: !0 });
    Object.defineProperty(co, "normalizeColor", {
      enumerable: !0,
      get: function () {
        return _S;
      },
    });
    var yd = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function _S(e) {
      let t,
        n,
        r,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof yd[o] == "string" ? yd[o].toLowerCase() : null) || o;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3 || u.length === 4
          ? ((t = parseInt(u[0] + u[0], 16)),
            (n = parseInt(u[1] + u[1], 16)),
            (r = parseInt(u[2] + u[2], 16)),
            u.length === 4 && (i = parseInt(u[3] + u[3], 16) / 255))
          : (u.length === 6 || u.length === 8) &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (n = parseInt(u.substring(2, 4), 16)),
            (r = parseInt(u.substring(4, 6), 16)),
            u.length === 8 && (i = parseInt(u.substring(6, 8), 16) / 255));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10)),
          (i = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          l = parseFloat(u[0]),
          _ = parseFloat(u[1].replace("%", "")) / 100,
          v = parseFloat(u[2].replace("%", "")) / 100;
        i = parseFloat(u[3]);
        let g = (1 - Math.abs(2 * v - 1)) * _,
          y = g * (1 - Math.abs(((l / 60) % 2) - 1)),
          b = v - g / 2,
          T,
          R,
          w;
        l >= 0 && l < 60
          ? ((T = g), (R = y), (w = 0))
          : l >= 60 && l < 120
          ? ((T = y), (R = g), (w = 0))
          : l >= 120 && l < 180
          ? ((T = 0), (R = g), (w = y))
          : l >= 180 && l < 240
          ? ((T = 0), (R = y), (w = g))
          : l >= 240 && l < 300
          ? ((T = y), (R = 0), (w = g))
          : ((T = g), (R = 0), (w = y)),
          (t = Math.round((T + b) * 255)),
          (n = Math.round((R + b) * 255)),
          (r = Math.round((w + b) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          l = parseFloat(u[0]),
          _ = parseFloat(u[1].replace("%", "")) / 100,
          v = parseFloat(u[2].replace("%", "")) / 100,
          g = (1 - Math.abs(2 * v - 1)) * _,
          y = g * (1 - Math.abs(((l / 60) % 2) - 1)),
          b = v - g / 2,
          T,
          R,
          w;
        l >= 0 && l < 60
          ? ((T = g), (R = y), (w = 0))
          : l >= 60 && l < 120
          ? ((T = y), (R = g), (w = 0))
          : l >= 120 && l < 180
          ? ((T = 0), (R = g), (w = y))
          : l >= 180 && l < 240
          ? ((T = 0), (R = y), (w = g))
          : l >= 240 && l < 300
          ? ((T = y), (R = 0), (w = g))
          : ((T = g), (R = 0), (w = y)),
          (t = Math.round((T + b) * 255)),
          (n = Math.round((R + b) * 255)),
          (r = Math.round((w + b) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: n, blue: r, alpha: i };
    }
  });
  var md = d((fo) => {
    "use strict";
    Object.defineProperty(fo, "__esModule", { value: !0 });
    function IS(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    IS(fo, {
      clearPlugin: function () {
        return CS;
      },
      createPluginInstance: function () {
        return xS;
      },
      getPluginConfig: function () {
        return TS;
      },
      getPluginDestination: function () {
        return OS;
      },
      getPluginDuration: function () {
        return wS;
      },
      getPluginOrigin: function () {
        return AS;
      },
      renderPlugin: function () {
        return RS;
      },
    });
    var bS = lo(),
      TS = (e, t) => e.value[t],
      wS = () => null,
      AS = (e, t) => {
        if (e) return e;
        let n = t.config.value,
          r = t.config.target.objectId,
          i = getComputedStyle(document.documentElement).getPropertyValue(r);
        if (n.size != null) return { size: parseInt(i, 10) };
        if (n.unit === "%" || n.unit === "-") return { size: parseFloat(i) };
        if (n.red != null && n.green != null && n.blue != null)
          return (0, bS.normalizeColor)(i);
      },
      OS = (e) => e.value,
      xS = () => null,
      SS = {
        color: {
          match: ({ red: e, green: t, blue: n, alpha: r }) =>
            [e, t, n, r].every((i) => i != null),
          getValue: ({ red: e, green: t, blue: n, alpha: r }) =>
            `rgba(${e}, ${t}, ${n}, ${r})`,
        },
        size: {
          match: ({ size: e }) => e != null,
          getValue: ({ size: e }, t) => {
            switch (t) {
              case "-":
                return e;
              default:
                return `${e}${t}`;
            }
          },
        },
      },
      RS = (e, t, n) => {
        let {
            target: { objectId: r },
            value: { unit: i },
          } = n.config,
          o = t.PLUGIN_VARIABLE,
          s = Object.values(SS).find((a) => a.match(o, i));
        s && document.documentElement.style.setProperty(r, s.getValue(o, i));
      },
      CS = (e, t) => {
        let n = t.config.target.objectId;
        document.documentElement.style.removeProperty(n);
      };
  });
  var _d = d((po) => {
    "use strict";
    Object.defineProperty(po, "__esModule", { value: !0 });
    Object.defineProperty(po, "pluginMethodMap", {
      enumerable: !0,
      get: function () {
        return MS;
      },
    });
    var mr = (Fe(), $e(Ts)),
      LS = Er(pd()),
      PS = Er(hd()),
      NS = Er(vd()),
      DS = Er(md());
    function Ed(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (Ed = function (r) {
        return r ? n : t;
      })(e);
    }
    function Er(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = Ed(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var MS = new Map([
      [mr.ActionTypeConsts.PLUGIN_LOTTIE, { ...LS }],
      [mr.ActionTypeConsts.PLUGIN_SPLINE, { ...PS }],
      [mr.ActionTypeConsts.PLUGIN_RIVE, { ...NS }],
      [mr.ActionTypeConsts.PLUGIN_VARIABLE, { ...DS }],
    ]);
  });
  var Id = {};
  Me(Id, {
    clearPlugin: () => Eo,
    createPluginInstance: () => qS,
    getPluginConfig: () => ho,
    getPluginDestination: () => yo,
    getPluginDuration: () => FS,
    getPluginOrigin: () => vo,
    isPluginType: () => Tt,
    renderPlugin: () => mo,
  });
  function Tt(e) {
    return go.pluginMethodMap.has(e);
  }
  var go,
    wt,
    ho,
    vo,
    FS,
    yo,
    qS,
    mo,
    Eo,
    _o = me(() => {
      "use strict";
      hr();
      go = de(_d());
      (wt = (e) => (t) => {
        if (!je) return () => null;
        let n = go.pluginMethodMap.get(t);
        if (!n) throw new Error(`IX2 no plugin configured for: ${t}`);
        let r = n[e];
        if (!r) throw new Error(`IX2 invalid plugin method: ${e}`);
        return r;
      }),
        (ho = wt("getPluginConfig")),
        (vo = wt("getPluginOrigin")),
        (FS = wt("getPluginDuration")),
        (yo = wt("getPluginDestination")),
        (qS = wt("createPluginInstance")),
        (mo = wt("renderPlugin")),
        (Eo = wt("clearPlugin"));
    });
  var Td = d((nk, bd) => {
    function kS(e, t) {
      return e == null || e !== e ? t : e;
    }
    bd.exports = kS;
  });
  var Ad = d((rk, wd) => {
    function GS(e, t, n, r) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (r && o && (n = e[++i]); ++i < o; ) n = t(n, e[i], i, e);
      return n;
    }
    wd.exports = GS;
  });
  var xd = d((ik, Od) => {
    function XS(e) {
      return function (t, n, r) {
        for (var i = -1, o = Object(t), s = r(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (n(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Od.exports = XS;
  });
  var Rd = d((ok, Sd) => {
    var US = xd(),
      VS = US();
    Sd.exports = VS;
  });
  var Io = d((ak, Cd) => {
    var WS = Rd(),
      HS = yn();
    function BS(e, t) {
      return e && WS(e, t, HS);
    }
    Cd.exports = BS;
  });
  var Pd = d((sk, Ld) => {
    var zS = It();
    function KS(e, t) {
      return function (n, r) {
        if (n == null) return n;
        if (!zS(n)) return e(n, r);
        for (
          var i = n.length, o = t ? i : -1, s = Object(n);
          (t ? o-- : ++o < i) && r(s[o], o, s) !== !1;

        );
        return n;
      };
    }
    Ld.exports = KS;
  });
  var bo = d((uk, Nd) => {
    var jS = Io(),
      YS = Pd(),
      QS = YS(jS);
    Nd.exports = QS;
  });
  var Md = d((ck, Dd) => {
    function $S(e, t, n, r, i) {
      return (
        i(e, function (o, s, a) {
          n = r ? ((r = !1), o) : t(n, o, s, a);
        }),
        n
      );
    }
    Dd.exports = $S;
  });
  var qd = d((lk, Fd) => {
    var ZS = Ad(),
      JS = bo(),
      eR = gt(),
      tR = Md(),
      nR = we();
    function rR(e, t, n) {
      var r = nR(e) ? ZS : tR,
        i = arguments.length < 3;
      return r(e, eR(t, 4), n, i, JS);
    }
    Fd.exports = rR;
  });
  var Gd = d((fk, kd) => {
    var iR = Qi(),
      oR = gt(),
      aR = $i(),
      sR = Math.max,
      uR = Math.min;
    function cR(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = r - 1;
      return (
        n !== void 0 &&
          ((i = aR(n)), (i = n < 0 ? sR(r + i, 0) : uR(i, r - 1))),
        iR(e, oR(t, 3), i, !0)
      );
    }
    kd.exports = cR;
  });
  var Ud = d((dk, Xd) => {
    var lR = Yi(),
      fR = Gd(),
      dR = lR(fR);
    Xd.exports = dR;
  });
  function Vd(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function pR(e, t) {
    if (Vd(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (let i = 0; i < n.length; i++)
      if (!Object.hasOwn(t, n[i]) || !Vd(e[n[i]], t[n[i]])) return !1;
    return !0;
  }
  var To,
    Wd = me(() => {
      "use strict";
      To = pR;
    });
  var sp = {};
  Me(sp, {
    cleanupHTMLElement: () => lC,
    clearAllStyles: () => cC,
    clearObjectCache: () => CR,
    getActionListProgress: () => dC,
    getAffectedElements: () => So,
    getComputedStyle: () => kR,
    getDestinationValues: () => BR,
    getElementId: () => DR,
    getInstanceId: () => PR,
    getInstanceOrigin: () => UR,
    getItemConfigByKey: () => HR,
    getMaxDurationItemIndex: () => ap,
    getNamespacedParameterId: () => hC,
    getRenderType: () => rp,
    getStyleProp: () => zR,
    mediaQueriesEqual: () => yC,
    observeStore: () => qR,
    reduceListToGroup: () => pC,
    reifyState: () => MR,
    renderHTMLElement: () => KR,
    shallowEqual: () => To,
    shouldAllowMediaQuery: () => vC,
    shouldNamespaceEventParameter: () => gC,
    stringifyTarget: () => mC,
  });
  function CR() {
    _r.clear();
  }
  function PR() {
    return "i" + LR++;
  }
  function DR(e, t) {
    for (let n in e) {
      let r = e[n];
      if (r && r.ref === t) return r.id;
    }
    return "e" + NR++;
  }
  function MR({ events: e, actionLists: t, site: n } = {}) {
    let r = (0, wr.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = n && n.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: r,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function qR({ store: e, select: t, onChange: n, comparator: r = FR }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let l = t(i());
      if (l == null) {
        s();
        return;
      }
      r(l, a) || ((a = l), n(a, e));
    }
    return s;
  }
  function zd(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function So({
    config: e,
    event: t,
    eventTarget: n,
    elementRoot: r,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (O, E) =>
          O.concat(
            So({
              config: { target: E },
              event: t,
              eventTarget: n,
              elementRoot: r,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: l,
        getSiblingElements: _,
        matchSelector: v,
        elementContains: g,
        isSiblingNode: y,
      } = i,
      { target: b } = e;
    if (!b) return [];
    let {
      id: T,
      objectId: R,
      selector: w,
      selectorGuids: L,
      appliesTo: C,
      useEventTarget: D,
    } = zd(b);
    if (R) return [_r.has(R) ? _r.get(R) : _r.set(R, {}).get(R)];
    if (C === Ii.PAGE) {
      let O = s(T);
      return O ? [O] : [];
    }
    let M = (t?.action?.config?.affectedElements ?? {})[T || w] || {},
      j = !!(M.id || M.selector),
      Y,
      Q,
      J,
      W = t && a(zd(t.target));
    if (
      (j
        ? ((Y = M.limitAffectedElements), (Q = W), (J = a(M)))
        : (Q = J = a({ id: T, selector: w, selectorGuids: L })),
      t && D)
    ) {
      let O = n && (J || D === !0) ? [n] : u(W);
      if (J) {
        if (D === xR) return u(J).filter((E) => O.some((F) => g(E, F)));
        if (D === Hd) return u(J).filter((E) => O.some((F) => g(F, E)));
        if (D === Bd) return u(J).filter((E) => O.some((F) => y(F, E)));
      }
      return O;
    }
    return Q == null || J == null
      ? []
      : je && r
      ? u(J).filter((O) => r.contains(O))
      : Y === Hd
      ? u(Q, J)
      : Y === OR
      ? l(u(Q)).filter(v(J))
      : Y === Bd
      ? _(u(Q)).filter(v(J))
      : u(J);
  }
  function kR({ element: e, actionItem: t }) {
    if (!je) return {};
    let { actionTypeId: n } = t;
    switch (n) {
      case Yt:
      case Qt:
      case $t:
      case Zt:
      case Or:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function UR(e, t = {}, n = {}, r, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = r;
    if (Tt(s)) return vo(s)(t[s], r);
    switch (r.actionTypeId) {
      case zt:
      case Kt:
      case jt:
      case xn:
        return t[r.actionTypeId] || Ro[r.actionTypeId];
      case Sn:
        return GR(t[r.actionTypeId], r.config.filters);
      case Rn:
        return XR(t[r.actionTypeId], r.config.fontVariations);
      case ep:
        return { value: (0, ut.default)(parseFloat(o(e, br)), 1) };
      case Yt: {
        let a = o(e, nt),
          u = o(e, rt),
          l,
          _;
        return (
          r.config.widthUnit === vt
            ? (l = Kd.test(a) ? parseFloat(a) : parseFloat(n.width))
            : (l = (0, ut.default)(parseFloat(a), parseFloat(n.width))),
          r.config.heightUnit === vt
            ? (_ = Kd.test(u) ? parseFloat(u) : parseFloat(n.height))
            : (_ = (0, ut.default)(parseFloat(u), parseFloat(n.height))),
          { widthValue: l, heightValue: _ }
        );
      }
      case Qt:
      case $t:
      case Zt:
        return aC({
          element: e,
          actionTypeId: r.actionTypeId,
          computedStyle: n,
          getStyle: o,
        });
      case Or:
        return { value: (0, ut.default)(o(e, Tr), n.display) };
      case RR:
        return t[r.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function BR({ element: e, actionItem: t, elementApi: n }) {
    if (Tt(t.actionTypeId)) return yo(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case zt:
      case Kt:
      case jt:
      case xn: {
        let { xValue: r, yValue: i, zValue: o } = t.config;
        return { xValue: r, yValue: i, zValue: o };
      }
      case Yt: {
        let { getStyle: r, setStyle: i, getProperty: o } = n,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: l } = t.config;
        if (!je) return { widthValue: u, heightValue: l };
        if (s === vt) {
          let _ = r(e, nt);
          i(e, nt, ""), (u = o(e, "offsetWidth")), i(e, nt, _);
        }
        if (a === vt) {
          let _ = r(e, rt);
          i(e, rt, ""), (l = o(e, "offsetHeight")), i(e, rt, _);
        }
        return { widthValue: u, heightValue: l };
      }
      case Qt:
      case $t:
      case Zt: {
        let {
          rValue: r,
          gValue: i,
          bValue: o,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = n,
            l = u(e, a),
            _ = (0, Qd.normalizeColor)(l);
          return {
            rValue: _.red,
            gValue: _.green,
            bValue: _.blue,
            aValue: _.alpha,
          };
        }
        return { rValue: r, gValue: i, bValue: o, aValue: s };
      }
      case Sn:
        return t.config.filters.reduce(VR, {});
      case Rn:
        return t.config.fontVariations.reduce(WR, {});
      default: {
        let { value: r } = t.config;
        return { value: r };
      }
    }
  }
  function rp(e) {
    if (/^TRANSFORM_/.test(e)) return Zd;
    if (/^STYLE_/.test(e)) return Oo;
    if (/^GENERAL_/.test(e)) return Ao;
    if (/^PLUGIN_/.test(e)) return Jd;
  }
  function zR(e, t) {
    return e === Oo ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function KR(e, t, n, r, i, o, s, a, u) {
    switch (a) {
      case Zd:
        return ZR(e, t, n, i, s);
      case Oo:
        return sC(e, t, n, i, o, s);
      case Ao:
        return uC(e, i, s);
      case Jd: {
        let { actionTypeId: l } = i;
        if (Tt(l)) return mo(l)(u, t, i);
      }
    }
  }
  function ZR(e, t, n, r, i) {
    let o = $R
        .map((a) => {
          let u = Ro[a],
            {
              xValue: l = u.xValue,
              yValue: _ = u.yValue,
              zValue: v = u.zValue,
              xUnit: g = "",
              yUnit: y = "",
              zUnit: b = "",
            } = t[a] || {};
          switch (a) {
            case zt:
              return `${vR}(${l}${g}, ${_}${y}, ${v}${b})`;
            case Kt:
              return `${yR}(${l}${g}, ${_}${y}, ${v}${b})`;
            case jt:
              return `${mR}(${l}${g}) ${ER}(${_}${y}) ${_R}(${v}${b})`;
            case xn:
              return `${IR}(${l}${g}, ${_}${y})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: s } = i;
    At(e, ht, i), s(e, ht, o), tC(r, n) && s(e, gr, bR);
  }
  function JR(e, t, n, r) {
    let i = (0, wr.default)(t, (s, a, u) => `${s} ${u}(${a}${QR(u, n)})`, ""),
      { setStyle: o } = r;
    At(e, wn, r), o(e, wn, i);
  }
  function eC(e, t, n, r) {
    let i = (0, wr.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = r;
    At(e, An, r), o(e, An, i);
  }
  function tC({ actionTypeId: e }, { xValue: t, yValue: n, zValue: r }) {
    return (
      (e === zt && r !== void 0) ||
      (e === Kt && r !== void 0) ||
      (e === jt && (t !== void 0 || n !== void 0))
    );
  }
  function oC(e, t) {
    let n = e.exec(t);
    return n ? n[1] : "";
  }
  function aC({ element: e, actionTypeId: t, computedStyle: n, getStyle: r }) {
    let i = xo[t],
      o = r(e, i),
      s = rC.test(o) ? o : n[i],
      a = oC(iC, s).split(On);
    return {
      rValue: (0, ut.default)(parseInt(a[0], 10), 255),
      gValue: (0, ut.default)(parseInt(a[1], 10), 255),
      bValue: (0, ut.default)(parseInt(a[2], 10), 255),
      aValue: (0, ut.default)(parseFloat(a[3]), 1),
    };
  }
  function sC(e, t, n, r, i, o) {
    let { setStyle: s } = o;
    switch (r.actionTypeId) {
      case Yt: {
        let { widthUnit: a = "", heightUnit: u = "" } = r.config,
          { widthValue: l, heightValue: _ } = n;
        l !== void 0 && (a === vt && (a = "px"), At(e, nt, o), s(e, nt, l + a)),
          _ !== void 0 &&
            (u === vt && (u = "px"), At(e, rt, o), s(e, rt, _ + u));
        break;
      }
      case Sn: {
        JR(e, n, r.config, o);
        break;
      }
      case Rn: {
        eC(e, n, r.config, o);
        break;
      }
      case Qt:
      case $t:
      case Zt: {
        let a = xo[r.actionTypeId],
          u = Math.round(n.rValue),
          l = Math.round(n.gValue),
          _ = Math.round(n.bValue),
          v = n.aValue;
        At(e, a, o),
          s(e, a, v >= 1 ? `rgb(${u},${l},${_})` : `rgba(${u},${l},${_},${v})`);
        break;
      }
      default: {
        let { unit: a = "" } = r.config;
        At(e, i, o), s(e, i, n.value + a);
        break;
      }
    }
  }
  function uC(e, t, n) {
    let { setStyle: r } = n;
    switch (t.actionTypeId) {
      case Or: {
        let { value: i } = t.config;
        i === TR && je ? r(e, Tr, Ji) : r(e, Tr, i);
        return;
      }
    }
  }
  function At(e, t, n) {
    if (!je) return;
    let r = np[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Bt);
    if (!s) {
      o(e, Bt, r);
      return;
    }
    let a = s.split(On).map(tp);
    a.indexOf(r) === -1 && o(e, Bt, a.concat(r).join(On));
  }
  function ip(e, t, n) {
    if (!je) return;
    let r = np[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Bt);
    !s ||
      s.indexOf(r) === -1 ||
      o(
        e,
        Bt,
        s
          .split(On)
          .map(tp)
          .filter((a) => a !== r)
          .join(On)
      );
  }
  function cC({ store: e, elementApi: t }) {
    let { ixData: n } = e.getState(),
      { events: r = {}, actionLists: i = {} } = n;
    Object.keys(r).forEach((o) => {
      let s = r[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        l = i[u];
      l && jd({ actionList: l, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        jd({ actionList: i[o], elementApi: t });
      });
  }
  function jd({ actionList: e = {}, event: t, elementApi: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e;
    r &&
      r.forEach((o) => {
        Yd({ actionGroup: o, event: t, elementApi: n });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            Yd({ actionGroup: a, event: t, elementApi: n });
          });
        });
  }
  function Yd({ actionGroup: e, event: t, elementApi: n }) {
    let { actionItems: r } = e;
    r.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      Tt(o)
        ? (a = (u) => Eo(o)(u, i))
        : (a = op({ effect: fC, actionTypeId: o, elementApi: n })),
        So({ config: s, event: t, elementApi: n }).forEach(a);
    });
  }
  function lC(e, t, n) {
    let { setStyle: r, getStyle: i } = n,
      { actionTypeId: o } = t;
    if (o === Yt) {
      let { config: s } = t;
      s.widthUnit === vt && r(e, nt, ""), s.heightUnit === vt && r(e, rt, "");
    }
    i(e, Bt) && op({ effect: ip, actionTypeId: o, elementApi: n })(e);
  }
  function fC(e, t, n) {
    let { setStyle: r } = n;
    ip(e, t, n), r(e, t, ""), t === ht && r(e, gr, "");
  }
  function ap(e) {
    let t = 0,
      n = 0;
    return (
      e.forEach((r, i) => {
        let { config: o } = r,
          s = o.delay + o.duration;
        s >= t && ((t = s), (n = i));
      }),
      n
    );
  }
  function dC(e, t) {
    let { actionItemGroups: n, useFirstGroupAsInitialState: r } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      n.forEach((u, l) => {
        if (r && l === 0) return;
        let { actionItems: _ } = u,
          v = _[ap(_)],
          { config: g, actionTypeId: y } = v;
        i.id === v.id && (a = s + o);
        let b = rp(y) === Ao ? 0 : g.duration;
        s += g.delay + b;
      }),
      s > 0 ? Tn(a / s) : 0
    );
  }
  function pC({ actionList: e, actionItemId: t, rawData: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, Ar.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      r && r.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: l }) => l.some(s));
        }),
      (0, Ar.setIn)(n, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function gC(e, { basedOn: t }) {
    return (
      (e === Ke.SCROLLING_IN_VIEW && (t === et.ELEMENT || t == null)) ||
      (e === Ke.MOUSE_MOVE && t === et.ELEMENT)
    );
  }
  function hC(e, t) {
    return e + SR + t;
  }
  function vC(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function yC(e, t) {
    return To(e && e.sort(), t && t.sort());
  }
  function mC(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + wo + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: n = "", useEventTarget: r = "" } = e;
    return t + wo + n + wo + r;
  }
  var ut,
    wr,
    Ir,
    Ar,
    Qd,
    gR,
    hR,
    vR,
    yR,
    mR,
    ER,
    _R,
    IR,
    bR,
    TR,
    br,
    wn,
    An,
    nt,
    rt,
    $d,
    wR,
    AR,
    Hd,
    OR,
    Bd,
    xR,
    Tr,
    Bt,
    vt,
    On,
    SR,
    wo,
    Zd,
    Ao,
    Oo,
    Jd,
    zt,
    Kt,
    jt,
    xn,
    ep,
    Sn,
    Rn,
    Yt,
    Qt,
    $t,
    Zt,
    Or,
    RR,
    tp,
    xo,
    np,
    _r,
    LR,
    NR,
    FR,
    Kd,
    GR,
    XR,
    VR,
    WR,
    HR,
    Ro,
    jR,
    YR,
    QR,
    $R,
    nC,
    rC,
    iC,
    op,
    up = me(() => {
      "use strict";
      (ut = de(Td())), (wr = de(qd())), (Ir = de(Ud())), (Ar = de(Mt()));
      Fe();
      Wd();
      no();
      Qd = de(lo());
      _o();
      hr();
      ({
        BACKGROUND: gR,
        TRANSFORM: hR,
        TRANSLATE_3D: vR,
        SCALE_3D: yR,
        ROTATE_X: mR,
        ROTATE_Y: ER,
        ROTATE_Z: _R,
        SKEW: IR,
        PRESERVE_3D: bR,
        FLEX: TR,
        OPACITY: br,
        FILTER: wn,
        FONT_VARIATION_SETTINGS: An,
        WIDTH: nt,
        HEIGHT: rt,
        BACKGROUND_COLOR: $d,
        BORDER_COLOR: wR,
        COLOR: AR,
        CHILDREN: Hd,
        IMMEDIATE_CHILDREN: OR,
        SIBLINGS: Bd,
        PARENT: xR,
        DISPLAY: Tr,
        WILL_CHANGE: Bt,
        AUTO: vt,
        COMMA_DELIMITER: On,
        COLON_DELIMITER: SR,
        BAR_DELIMITER: wo,
        RENDER_TRANSFORM: Zd,
        RENDER_GENERAL: Ao,
        RENDER_STYLE: Oo,
        RENDER_PLUGIN: Jd,
      } = Oe),
        ({
          TRANSFORM_MOVE: zt,
          TRANSFORM_SCALE: Kt,
          TRANSFORM_ROTATE: jt,
          TRANSFORM_SKEW: xn,
          STYLE_OPACITY: ep,
          STYLE_FILTER: Sn,
          STYLE_FONT_VARIATION: Rn,
          STYLE_SIZE: Yt,
          STYLE_BACKGROUND_COLOR: Qt,
          STYLE_BORDER: $t,
          STYLE_TEXT_COLOR: Zt,
          GENERAL_DISPLAY: Or,
          OBJECT_VALUE: RR,
        } = Le),
        (tp = (e) => e.trim()),
        (xo = Object.freeze({ [Qt]: $d, [$t]: wR, [Zt]: AR })),
        (np = Object.freeze({
          [ht]: hR,
          [$d]: gR,
          [br]: br,
          [wn]: wn,
          [nt]: nt,
          [rt]: rt,
          [An]: An,
        })),
        (_r = new Map());
      LR = 1;
      NR = 1;
      FR = (e, t) => e === t;
      (Kd = /px/),
        (GR = (e, t) =>
          t.reduce(
            (n, r) => (n[r.type] == null && (n[r.type] = jR[r.type]), n),
            e || {}
          )),
        (XR = (e, t) =>
          t.reduce(
            (n, r) => (
              n[r.type] == null &&
                (n[r.type] = YR[r.type] || r.defaultValue || 0),
              n
            ),
            e || {}
          ));
      (VR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (WR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (HR = (e, t, n) => {
          if (Tt(e)) return ho(e)(n, t);
          switch (e) {
            case Sn: {
              let r = (0, Ir.default)(n.filters, ({ type: i }) => i === t);
              return r ? r.value : 0;
            }
            case Rn: {
              let r = (0, Ir.default)(
                n.fontVariations,
                ({ type: i }) => i === t
              );
              return r ? r.value : 0;
            }
            default:
              return n[t];
          }
        });
      (Ro = {
        [zt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Kt]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [jt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [xn]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (jR = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (YR = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (QR = (e, t) => {
          let n = (0, Ir.default)(t.filters, ({ type: r }) => r === e);
          if (n && n.unit) return n.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        ($R = Object.keys(Ro));
      (nC = "\\(([^)]+)\\)"), (rC = /^rgb/), (iC = RegExp(`rgba?${nC}`));
      op =
        ({ effect: e, actionTypeId: t, elementApi: n }) =>
        (r) => {
          switch (t) {
            case zt:
            case Kt:
            case jt:
            case xn:
              e(r, ht, n);
              break;
            case Sn:
              e(r, wn, n);
              break;
            case Rn:
              e(r, An, n);
              break;
            case ep:
              e(r, br, n);
              break;
            case Yt:
              e(r, nt, n), e(r, rt, n);
              break;
            case Qt:
            case $t:
            case Zt:
              e(r, xo[t], n);
              break;
            case Or:
              e(r, Tr, n);
              break;
          }
        };
    });
  var Ot = d((Co) => {
    "use strict";
    Object.defineProperty(Co, "__esModule", { value: !0 });
    function EC(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    EC(Co, {
      IX2BrowserSupport: function () {
        return _C;
      },
      IX2EasingUtils: function () {
        return bC;
      },
      IX2Easings: function () {
        return IC;
      },
      IX2ElementsReducer: function () {
        return TC;
      },
      IX2VanillaPlugins: function () {
        return wC;
      },
      IX2VanillaUtils: function () {
        return AC;
      },
    });
    var _C = Jt((hr(), $e(td))),
      IC = Jt((to(), $e(bn))),
      bC = Jt((no(), $e(ud))),
      TC = Jt((dd(), $e(fd))),
      wC = Jt((_o(), $e(Id))),
      AC = Jt((up(), $e(sp)));
    function cp(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (cp = function (r) {
        return r ? n : t;
      })(e);
    }
    function Jt(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = cp(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
  });
  var Sr,
    ct,
    OC,
    xC,
    SC,
    RC,
    CC,
    LC,
    xr,
    lp,
    PC,
    NC,
    Lo,
    DC,
    MC,
    FC,
    qC,
    fp,
    dp = me(() => {
      "use strict";
      Fe();
      (Sr = de(Ot())),
        (ct = de(Mt())),
        ({
          IX2_RAW_DATA_IMPORTED: OC,
          IX2_SESSION_STOPPED: xC,
          IX2_INSTANCE_ADDED: SC,
          IX2_INSTANCE_STARTED: RC,
          IX2_INSTANCE_REMOVED: CC,
          IX2_ANIMATION_FRAME_CHANGED: LC,
        } = Te),
        ({
          optimizeFloat: xr,
          applyEasing: lp,
          createBezierEasing: PC,
        } = Sr.IX2EasingUtils),
        ({ RENDER_GENERAL: NC } = Oe),
        ({
          getItemConfigByKey: Lo,
          getRenderType: DC,
          getStyleProp: MC,
        } = Sr.IX2VanillaUtils),
        (FC = (e, t) => {
          let {
              position: n,
              parameterId: r,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: l,
              skipMotion: _,
              skipToValue: v,
            } = e,
            { parameters: g } = t.payload,
            y = Math.max(1 - s, 0.01),
            b = g[r];
          b == null && ((y = 1), (b = a));
          let T = Math.max(b, 0) || 0,
            R = xr(T - n),
            w = _ ? v : xr(n + R * y),
            L = w * 100;
          if (w === n && e.current) return e;
          let C, D, q, M;
          for (let Y = 0, { length: Q } = i; Y < Q; Y++) {
            let { keyframe: J, actionItems: W } = i[Y];
            if ((Y === 0 && (C = W[0]), L >= J)) {
              C = W[0];
              let O = i[Y + 1],
                E = O && L !== J;
              (D = E ? O.actionItems[0] : null),
                E && ((q = J / 100), (M = (O.keyframe - J) / 100));
            }
          }
          let j = {};
          if (C && !D)
            for (let Y = 0, { length: Q } = o; Y < Q; Y++) {
              let J = o[Y];
              j[J] = Lo(u, J, C.config);
            }
          else if (C && D && q !== void 0 && M !== void 0) {
            let Y = (w - q) / M,
              Q = C.config.easing,
              J = lp(Q, Y, l);
            for (let W = 0, { length: O } = o; W < O; W++) {
              let E = o[W],
                F = Lo(u, E, C.config),
                te = (Lo(u, E, D.config) - F) * J + F;
              j[E] = te;
            }
          }
          return (0, ct.merge)(e, { position: w, current: j });
        }),
        (qC = (e, t) => {
          let {
              active: n,
              origin: r,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: l,
              destinationKeys: _,
              pluginDuration: v,
              instanceDelay: g,
              customEasingFn: y,
              skipMotion: b,
            } = e,
            T = u.config.easing,
            { duration: R, delay: w } = u.config;
          v != null && (R = v),
            (w = g ?? w),
            s === NC ? (R = 0) : (o || b) && (R = w = 0);
          let { now: L } = t.payload;
          if (n && r) {
            let C = L - (i + w);
            if (a) {
              let Y = L - i,
                Q = R + w,
                J = xr(Math.min(Math.max(0, Y / Q), 1));
              e = (0, ct.set)(e, "verboseTimeElapsed", Q * J);
            }
            if (C < 0) return e;
            let D = xr(Math.min(Math.max(0, C / R), 1)),
              q = lp(T, D, y),
              M = {},
              j = null;
            return (
              _.length &&
                (j = _.reduce((Y, Q) => {
                  let J = l[Q],
                    W = parseFloat(r[Q]) || 0,
                    E = (parseFloat(J) - W) * q + W;
                  return (Y[Q] = E), Y;
                }, {})),
              (M.current = j),
              (M.position = D),
              D === 1 && ((M.active = !1), (M.complete = !0)),
              (0, ct.merge)(e, M)
            );
          }
          return e;
        }),
        (fp = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case OC:
              return t.payload.ixInstances || Object.freeze({});
            case xC:
              return Object.freeze({});
            case SC: {
              let {
                  instanceId: n,
                  elementId: r,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: l,
                  isCarrier: _,
                  origin: v,
                  destination: g,
                  immediate: y,
                  verbose: b,
                  continuous: T,
                  parameterId: R,
                  actionGroups: w,
                  smoothing: L,
                  restingValue: C,
                  pluginInstance: D,
                  pluginDuration: q,
                  instanceDelay: M,
                  skipMotion: j,
                  skipToValue: Y,
                } = t.payload,
                { actionTypeId: Q } = i,
                J = DC(Q),
                W = MC(J, Q),
                O = Object.keys(g).filter(
                  (F) => g[F] != null && typeof g[F] != "string"
                ),
                { easing: E } = i.config;
              return (0, ct.set)(e, n, {
                id: n,
                elementId: r,
                active: !1,
                position: 0,
                start: 0,
                origin: v,
                destination: g,
                destinationKeys: O,
                immediate: y,
                verbose: b,
                current: null,
                actionItem: i,
                actionTypeId: Q,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: l,
                renderType: J,
                isCarrier: _,
                styleProp: W,
                continuous: T,
                parameterId: R,
                actionGroups: w,
                smoothing: L,
                restingValue: C,
                pluginInstance: D,
                pluginDuration: q,
                instanceDelay: M,
                skipMotion: j,
                skipToValue: Y,
                customEasingFn:
                  Array.isArray(E) && E.length === 4 ? PC(E) : void 0,
              });
            }
            case RC: {
              let { instanceId: n, time: r } = t.payload;
              return (0, ct.mergeIn)(e, [n], {
                active: !0,
                complete: !1,
                start: r,
              });
            }
            case CC: {
              let { instanceId: n } = t.payload;
              if (!e[n]) return e;
              let r = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== n && (r[a] = e[a]);
              }
              return r;
            }
            case LC: {
              let n = e,
                r = Object.keys(e),
                { length: i } = r;
              for (let o = 0; o < i; o++) {
                let s = r[o],
                  a = e[s],
                  u = a.continuous ? FC : qC;
                n = (0, ct.set)(n, s, u(a, t));
              }
              return n;
            }
            default:
              return e;
          }
        });
    });
  var kC,
    GC,
    XC,
    pp,
    gp = me(() => {
      "use strict";
      Fe();
      ({
        IX2_RAW_DATA_IMPORTED: kC,
        IX2_SESSION_STOPPED: GC,
        IX2_PARAMETER_CHANGED: XC,
      } = Te),
        (pp = (e = {}, t) => {
          switch (t.type) {
            case kC:
              return t.payload.ixParameters || {};
            case GC:
              return {};
            case XC: {
              let { key: n, value: r } = t.payload;
              return (e[n] = r), e;
            }
            default:
              return e;
          }
        });
    });
  var yp = {};
  Me(yp, { default: () => VC });
  var hp,
    vp,
    UC,
    VC,
    mp = me(() => {
      "use strict";
      hp = de(_i());
      As();
      zs();
      Ys();
      vp = de(Ot());
      dp();
      gp();
      ({ ixElements: UC } = vp.IX2ElementsReducer),
        (VC = (0, hp.combineReducers)({
          ixData: ws,
          ixRequest: Bs,
          ixSession: js,
          ixElements: UC,
          ixInstances: fp,
          ixParameters: pp,
        }));
    });
  var _p = d((Ck, Ep) => {
    var WC = dt(),
      HC = we(),
      BC = at(),
      zC = "[object String]";
    function KC(e) {
      return typeof e == "string" || (!HC(e) && BC(e) && WC(e) == zC);
    }
    Ep.exports = KC;
  });
  var bp = d((Lk, Ip) => {
    var jC = ji(),
      YC = jC("length");
    Ip.exports = YC;
  });
  var wp = d((Pk, Tp) => {
    var QC = "\\ud800-\\udfff",
      $C = "\\u0300-\\u036f",
      ZC = "\\ufe20-\\ufe2f",
      JC = "\\u20d0-\\u20ff",
      eL = $C + ZC + JC,
      tL = "\\ufe0e\\ufe0f",
      nL = "\\u200d",
      rL = RegExp("[" + nL + QC + eL + tL + "]");
    function iL(e) {
      return rL.test(e);
    }
    Tp.exports = iL;
  });
  var Np = d((Nk, Pp) => {
    var Op = "\\ud800-\\udfff",
      oL = "\\u0300-\\u036f",
      aL = "\\ufe20-\\ufe2f",
      sL = "\\u20d0-\\u20ff",
      uL = oL + aL + sL,
      cL = "\\ufe0e\\ufe0f",
      lL = "[" + Op + "]",
      Po = "[" + uL + "]",
      No = "\\ud83c[\\udffb-\\udfff]",
      fL = "(?:" + Po + "|" + No + ")",
      xp = "[^" + Op + "]",
      Sp = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Rp = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      dL = "\\u200d",
      Cp = fL + "?",
      Lp = "[" + cL + "]?",
      pL = "(?:" + dL + "(?:" + [xp, Sp, Rp].join("|") + ")" + Lp + Cp + ")*",
      gL = Lp + Cp + pL,
      hL = "(?:" + [xp + Po + "?", Po, Sp, Rp, lL].join("|") + ")",
      Ap = RegExp(No + "(?=" + No + ")|" + hL + gL, "g");
    function vL(e) {
      for (var t = (Ap.lastIndex = 0); Ap.test(e); ) ++t;
      return t;
    }
    Pp.exports = vL;
  });
  var Mp = d((Dk, Dp) => {
    var yL = bp(),
      mL = wp(),
      EL = Np();
    function _L(e) {
      return mL(e) ? EL(e) : yL(e);
    }
    Dp.exports = _L;
  });
  var qp = d((Mk, Fp) => {
    var IL = or(),
      bL = ar(),
      TL = It(),
      wL = _p(),
      AL = Mp(),
      OL = "[object Map]",
      xL = "[object Set]";
    function SL(e) {
      if (e == null) return 0;
      if (TL(e)) return wL(e) ? AL(e) : e.length;
      var t = bL(e);
      return t == OL || t == xL ? e.size : IL(e).length;
    }
    Fp.exports = SL;
  });
  var Gp = d((Fk, kp) => {
    var RL = "Expected a function";
    function CL(e) {
      if (typeof e != "function") throw new TypeError(RL);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    kp.exports = CL;
  });
  var Do = d((qk, Xp) => {
    var LL = pt(),
      PL = (function () {
        try {
          var e = LL(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Xp.exports = PL;
  });
  var Mo = d((kk, Vp) => {
    var Up = Do();
    function NL(e, t, n) {
      t == "__proto__" && Up
        ? Up(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (e[t] = n);
    }
    Vp.exports = NL;
  });
  var Hp = d((Gk, Wp) => {
    var DL = Mo(),
      ML = Yn(),
      FL = Object.prototype,
      qL = FL.hasOwnProperty;
    function kL(e, t, n) {
      var r = e[t];
      (!(qL.call(e, t) && ML(r, n)) || (n === void 0 && !(t in e))) &&
        DL(e, t, n);
    }
    Wp.exports = kL;
  });
  var Kp = d((Xk, zp) => {
    var GL = Hp(),
      XL = En(),
      UL = tr(),
      Bp = tt(),
      VL = Wt();
    function WL(e, t, n, r) {
      if (!Bp(e)) return e;
      t = XL(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = VL(t[i]),
          l = n;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var _ = a[u];
          (l = r ? r(_, u, a) : void 0),
            l === void 0 && (l = Bp(_) ? _ : UL(t[i + 1]) ? [] : {});
        }
        GL(a, u, l), (a = a[u]);
      }
      return e;
    }
    zp.exports = WL;
  });
  var Yp = d((Uk, jp) => {
    var HL = cr(),
      BL = Kp(),
      zL = En();
    function KL(e, t, n) {
      for (var r = -1, i = t.length, o = {}; ++r < i; ) {
        var s = t[r],
          a = HL(e, s);
        n(a, s) && BL(o, zL(s, e), a);
      }
      return o;
    }
    jp.exports = KL;
  });
  var $p = d((Vk, Qp) => {
    var jL = Jn(),
      YL = si(),
      QL = Ni(),
      $L = Pi(),
      ZL = Object.getOwnPropertySymbols,
      JL = ZL
        ? function (e) {
            for (var t = []; e; ) jL(t, QL(e)), (e = YL(e));
            return t;
          }
        : $L;
    Qp.exports = JL;
  });
  var Jp = d((Wk, Zp) => {
    function eP(e) {
      var t = [];
      if (e != null) for (var n in Object(e)) t.push(n);
      return t;
    }
    Zp.exports = eP;
  });
  var tg = d((Hk, eg) => {
    var tP = tt(),
      nP = ir(),
      rP = Jp(),
      iP = Object.prototype,
      oP = iP.hasOwnProperty;
    function aP(e) {
      if (!tP(e)) return rP(e);
      var t = nP(e),
        n = [];
      for (var r in e)
        (r == "constructor" && (t || !oP.call(e, r))) || n.push(r);
      return n;
    }
    eg.exports = aP;
  });
  var rg = d((Bk, ng) => {
    var sP = Mi(),
      uP = tg(),
      cP = It();
    function lP(e) {
      return cP(e) ? sP(e, !0) : uP(e);
    }
    ng.exports = lP;
  });
  var og = d((zk, ig) => {
    var fP = Li(),
      dP = $p(),
      pP = rg();
    function gP(e) {
      return fP(e, pP, dP);
    }
    ig.exports = gP;
  });
  var sg = d((Kk, ag) => {
    var hP = Ki(),
      vP = gt(),
      yP = Yp(),
      mP = og();
    function EP(e, t) {
      if (e == null) return {};
      var n = hP(mP(e), function (r) {
        return [r];
      });
      return (
        (t = vP(t)),
        yP(e, n, function (r, i) {
          return t(r, i[0]);
        })
      );
    }
    ag.exports = EP;
  });
  var cg = d((jk, ug) => {
    var _P = gt(),
      IP = Gp(),
      bP = sg();
    function TP(e, t) {
      return bP(e, IP(_P(t)));
    }
    ug.exports = TP;
  });
  var fg = d((Yk, lg) => {
    var wP = or(),
      AP = ar(),
      OP = pn(),
      xP = we(),
      SP = It(),
      RP = er(),
      CP = ir(),
      LP = rr(),
      PP = "[object Map]",
      NP = "[object Set]",
      DP = Object.prototype,
      MP = DP.hasOwnProperty;
    function FP(e) {
      if (e == null) return !0;
      if (
        SP(e) &&
        (xP(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          RP(e) ||
          LP(e) ||
          OP(e))
      )
        return !e.length;
      var t = AP(e);
      if (t == PP || t == NP) return !e.size;
      if (CP(e)) return !wP(e).length;
      for (var n in e) if (MP.call(e, n)) return !1;
      return !0;
    }
    lg.exports = FP;
  });
  var pg = d((Qk, dg) => {
    var qP = Mo(),
      kP = Io(),
      GP = gt();
    function XP(e, t) {
      var n = {};
      return (
        (t = GP(t, 3)),
        kP(e, function (r, i, o) {
          qP(n, i, t(r, i, o));
        }),
        n
      );
    }
    dg.exports = XP;
  });
  var hg = d(($k, gg) => {
    function UP(e, t) {
      for (
        var n = -1, r = e == null ? 0 : e.length;
        ++n < r && t(e[n], n, e) !== !1;

      );
      return e;
    }
    gg.exports = UP;
  });
  var yg = d((Zk, vg) => {
    var VP = fr();
    function WP(e) {
      return typeof e == "function" ? e : VP;
    }
    vg.exports = WP;
  });
  var Eg = d((Jk, mg) => {
    var HP = hg(),
      BP = bo(),
      zP = yg(),
      KP = we();
    function jP(e, t) {
      var n = KP(e) ? HP : BP;
      return n(e, zP(t));
    }
    mg.exports = jP;
  });
  var Ig = d((eG, _g) => {
    var YP = ze(),
      QP = function () {
        return YP.Date.now();
      };
    _g.exports = QP;
  });
  var wg = d((tG, Tg) => {
    var $P = tt(),
      Fo = Ig(),
      bg = dr(),
      ZP = "Expected a function",
      JP = Math.max,
      eN = Math.min;
    function tN(e, t, n) {
      var r,
        i,
        o,
        s,
        a,
        u,
        l = 0,
        _ = !1,
        v = !1,
        g = !0;
      if (typeof e != "function") throw new TypeError(ZP);
      (t = bg(t) || 0),
        $P(n) &&
          ((_ = !!n.leading),
          (v = "maxWait" in n),
          (o = v ? JP(bg(n.maxWait) || 0, t) : o),
          (g = "trailing" in n ? !!n.trailing : g));
      function y(M) {
        var j = r,
          Y = i;
        return (r = i = void 0), (l = M), (s = e.apply(Y, j)), s;
      }
      function b(M) {
        return (l = M), (a = setTimeout(w, t)), _ ? y(M) : s;
      }
      function T(M) {
        var j = M - u,
          Y = M - l,
          Q = t - j;
        return v ? eN(Q, o - Y) : Q;
      }
      function R(M) {
        var j = M - u,
          Y = M - l;
        return u === void 0 || j >= t || j < 0 || (v && Y >= o);
      }
      function w() {
        var M = Fo();
        if (R(M)) return L(M);
        a = setTimeout(w, T(M));
      }
      function L(M) {
        return (a = void 0), g && r ? y(M) : ((r = i = void 0), s);
      }
      function C() {
        a !== void 0 && clearTimeout(a), (l = 0), (r = u = i = a = void 0);
      }
      function D() {
        return a === void 0 ? s : L(Fo());
      }
      function q() {
        var M = Fo(),
          j = R(M);
        if (((r = arguments), (i = this), (u = M), j)) {
          if (a === void 0) return b(u);
          if (v) return clearTimeout(a), (a = setTimeout(w, t)), y(u);
        }
        return a === void 0 && (a = setTimeout(w, t)), s;
      }
      return (q.cancel = C), (q.flush = D), q;
    }
    Tg.exports = tN;
  });
  var Og = d((nG, Ag) => {
    var nN = wg(),
      rN = tt(),
      iN = "Expected a function";
    function oN(e, t, n) {
      var r = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(iN);
      return (
        rN(n) &&
          ((r = "leading" in n ? !!n.leading : r),
          (i = "trailing" in n ? !!n.trailing : i)),
        nN(e, t, { leading: r, maxWait: t, trailing: i })
      );
    }
    Ag.exports = oN;
  });
  var Sg = {};
  Me(Sg, {
    actionListPlaybackChanged: () => tn,
    animationFrameChanged: () => Cr,
    clearRequested: () => CN,
    elementStateChanged: () => Ho,
    eventListenerAdded: () => Rr,
    eventStateChanged: () => Uo,
    instanceAdded: () => Vo,
    instanceRemoved: () => Wo,
    instanceStarted: () => Lr,
    mediaQueriesDefined: () => zo,
    parameterChanged: () => en,
    playbackRequested: () => SN,
    previewRequested: () => xN,
    rawDataImported: () => qo,
    sessionInitialized: () => ko,
    sessionStarted: () => Go,
    sessionStopped: () => Xo,
    stopRequested: () => RN,
    testFrameRendered: () => LN,
    viewportWidthChanged: () => Bo,
  });
  var xg,
    aN,
    sN,
    uN,
    cN,
    lN,
    fN,
    dN,
    pN,
    gN,
    hN,
    vN,
    yN,
    mN,
    EN,
    _N,
    IN,
    bN,
    TN,
    wN,
    AN,
    ON,
    qo,
    ko,
    Go,
    Xo,
    xN,
    SN,
    RN,
    CN,
    Rr,
    LN,
    Uo,
    Cr,
    en,
    Vo,
    Lr,
    Wo,
    Ho,
    tn,
    Bo,
    zo,
    Pr = me(() => {
      "use strict";
      Fe();
      (xg = de(Ot())),
        ({
          IX2_RAW_DATA_IMPORTED: aN,
          IX2_SESSION_INITIALIZED: sN,
          IX2_SESSION_STARTED: uN,
          IX2_SESSION_STOPPED: cN,
          IX2_PREVIEW_REQUESTED: lN,
          IX2_PLAYBACK_REQUESTED: fN,
          IX2_STOP_REQUESTED: dN,
          IX2_CLEAR_REQUESTED: pN,
          IX2_EVENT_LISTENER_ADDED: gN,
          IX2_TEST_FRAME_RENDERED: hN,
          IX2_EVENT_STATE_CHANGED: vN,
          IX2_ANIMATION_FRAME_CHANGED: yN,
          IX2_PARAMETER_CHANGED: mN,
          IX2_INSTANCE_ADDED: EN,
          IX2_INSTANCE_STARTED: _N,
          IX2_INSTANCE_REMOVED: IN,
          IX2_ELEMENT_STATE_CHANGED: bN,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: TN,
          IX2_VIEWPORT_WIDTH_CHANGED: wN,
          IX2_MEDIA_QUERIES_DEFINED: AN,
        } = Te),
        ({ reifyState: ON } = xg.IX2VanillaUtils),
        (qo = (e) => ({ type: aN, payload: { ...ON(e) } })),
        (ko = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: sN,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Go = () => ({ type: uN })),
        (Xo = () => ({ type: cN })),
        (xN = ({ rawData: e, defer: t }) => ({
          type: lN,
          payload: { defer: t, rawData: e },
        })),
        (SN = ({
          actionTypeId: e = Le.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: n,
          eventId: r,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: fN,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: n,
            testManual: s,
            eventId: r,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (RN = (e) => ({ type: dN, payload: { actionListId: e } })),
        (CN = () => ({ type: pN })),
        (Rr = (e, t) => ({
          type: gN,
          payload: { target: e, listenerParams: t },
        })),
        (LN = (e = 1) => ({ type: hN, payload: { step: e } })),
        (Uo = (e, t) => ({ type: vN, payload: { stateKey: e, newState: t } })),
        (Cr = (e, t) => ({ type: yN, payload: { now: e, parameters: t } })),
        (en = (e, t) => ({ type: mN, payload: { key: e, value: t } })),
        (Vo = (e) => ({ type: EN, payload: { ...e } })),
        (Lr = (e, t) => ({ type: _N, payload: { instanceId: e, time: t } })),
        (Wo = (e) => ({ type: IN, payload: { instanceId: e } })),
        (Ho = (e, t, n, r) => ({
          type: bN,
          payload: { elementId: e, actionTypeId: t, current: n, actionItem: r },
        })),
        (tn = ({ actionListId: e, isPlaying: t }) => ({
          type: TN,
          payload: { actionListId: e, isPlaying: t },
        })),
        (Bo = ({ width: e, mediaQueries: t }) => ({
          type: wN,
          payload: { width: e, mediaQueries: t },
        })),
        (zo = () => ({ type: AN }));
    });
  var Ne = {};
  Me(Ne, {
    elementContains: () => Yo,
    getChildElements: () => UN,
    getClosestElement: () => Cn,
    getProperty: () => FN,
    getQuerySelector: () => jo,
    getRefType: () => Qo,
    getSiblingElements: () => VN,
    getStyle: () => MN,
    getValidDocument: () => kN,
    isSiblingNode: () => XN,
    matchSelector: () => qN,
    queryDocument: () => GN,
    setStyle: () => DN,
  });
  function DN(e, t, n) {
    e.style[t] = n;
  }
  function MN(e, t) {
    if (t.startsWith("--"))
      return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(t);
    if (e.style instanceof CSSStyleDeclaration) return e.style[t];
  }
  function FN(e, t) {
    return e[t];
  }
  function qN(e) {
    return (t) => t[Ko](e);
  }
  function jo({ id: e, selector: t }) {
    if (e) {
      let n = e;
      if (e.indexOf(Rg) !== -1) {
        let r = e.split(Rg),
          i = r[0];
        if (((n = r[1]), i !== document.documentElement.getAttribute(Lg)))
          return null;
      }
      return `[data-w-id="${n}"], [data-w-id^="${n}_instance"]`;
    }
    return t;
  }
  function kN(e) {
    return e == null || e === document.documentElement.getAttribute(Lg)
      ? document
      : null;
  }
  function GN(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function Yo(e, t) {
    return e.contains(t);
  }
  function XN(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function UN(e) {
    let t = [];
    for (let n = 0, { length: r } = e || []; n < r; n++) {
      let { children: i } = e[n],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function VN(e = []) {
    let t = [],
      n = [];
    for (let r = 0, { length: i } = e; r < i; r++) {
      let { parentNode: o } = e[r];
      if (!o || !o.children || !o.children.length || n.indexOf(o) !== -1)
        continue;
      n.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function Qo(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? PN
        : NN
      : null;
  }
  var Cg,
    Ko,
    Rg,
    PN,
    NN,
    Lg,
    Cn,
    Pg = me(() => {
      "use strict";
      Cg = de(Ot());
      Fe();
      ({ ELEMENT_MATCHES: Ko } = Cg.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Rg,
          HTML_ELEMENT: PN,
          PLAIN_OBJECT: NN,
          WF_PAGE: Lg,
        } = Oe);
      Cn = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let n = e;
            do {
              if (n[Ko] && n[Ko](t)) return n;
              n = n.parentNode;
            } while (n != null);
            return null;
          };
    });
  var $o = d((oG, Dg) => {
    var WN = tt(),
      Ng = Object.create,
      HN = (function () {
        function e() {}
        return function (t) {
          if (!WN(t)) return {};
          if (Ng) return Ng(t);
          e.prototype = t;
          var n = new e();
          return (e.prototype = void 0), n;
        };
      })();
    Dg.exports = HN;
  });
  var Nr = d((aG, Mg) => {
    function BN() {}
    Mg.exports = BN;
  });
  var Mr = d((sG, Fg) => {
    var zN = $o(),
      KN = Nr();
    function Dr(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    Dr.prototype = zN(KN.prototype);
    Dr.prototype.constructor = Dr;
    Fg.exports = Dr;
  });
  var Xg = d((uG, Gg) => {
    var qg = Pt(),
      jN = pn(),
      YN = we(),
      kg = qg ? qg.isConcatSpreadable : void 0;
    function QN(e) {
      return YN(e) || jN(e) || !!(kg && e && e[kg]);
    }
    Gg.exports = QN;
  });
  var Wg = d((cG, Vg) => {
    var $N = Jn(),
      ZN = Xg();
    function Ug(e, t, n, r, i) {
      var o = -1,
        s = e.length;
      for (n || (n = ZN), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && n(a)
          ? t > 1
            ? Ug(a, t - 1, n, r, i)
            : $N(i, a)
          : r || (i[i.length] = a);
      }
      return i;
    }
    Vg.exports = Ug;
  });
  var Bg = d((lG, Hg) => {
    var JN = Wg();
    function eD(e) {
      var t = e == null ? 0 : e.length;
      return t ? JN(e, 1) : [];
    }
    Hg.exports = eD;
  });
  var Kg = d((fG, zg) => {
    function tD(e, t, n) {
      switch (n.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, n[0]);
        case 2:
          return e.call(t, n[0], n[1]);
        case 3:
          return e.call(t, n[0], n[1], n[2]);
      }
      return e.apply(t, n);
    }
    zg.exports = tD;
  });
  var Qg = d((dG, Yg) => {
    var nD = Kg(),
      jg = Math.max;
    function rD(e, t, n) {
      return (
        (t = jg(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var r = arguments, i = -1, o = jg(r.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = r[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
          return (a[t] = n(s)), nD(e, this, a);
        }
      );
    }
    Yg.exports = rD;
  });
  var Zg = d((pG, $g) => {
    function iD(e) {
      return function () {
        return e;
      };
    }
    $g.exports = iD;
  });
  var th = d((gG, eh) => {
    var oD = Zg(),
      Jg = Do(),
      aD = fr(),
      sD = Jg
        ? function (e, t) {
            return Jg(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: oD(t),
              writable: !0,
            });
          }
        : aD;
    eh.exports = sD;
  });
  var rh = d((hG, nh) => {
    var uD = 800,
      cD = 16,
      lD = Date.now;
    function fD(e) {
      var t = 0,
        n = 0;
      return function () {
        var r = lD(),
          i = cD - (r - n);
        if (((n = r), i > 0)) {
          if (++t >= uD) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    nh.exports = fD;
  });
  var oh = d((vG, ih) => {
    var dD = th(),
      pD = rh(),
      gD = pD(dD);
    ih.exports = gD;
  });
  var sh = d((yG, ah) => {
    var hD = Bg(),
      vD = Qg(),
      yD = oh();
    function mD(e) {
      return yD(vD(e, void 0, hD), e + "");
    }
    ah.exports = mD;
  });
  var lh = d((mG, ch) => {
    var uh = Fi(),
      ED = uh && new uh();
    ch.exports = ED;
  });
  var dh = d((EG, fh) => {
    function _D() {}
    fh.exports = _D;
  });
  var Zo = d((_G, gh) => {
    var ph = lh(),
      ID = dh(),
      bD = ph
        ? function (e) {
            return ph.get(e);
          }
        : ID;
    gh.exports = bD;
  });
  var vh = d((IG, hh) => {
    var TD = {};
    hh.exports = TD;
  });
  var Jo = d((bG, mh) => {
    var yh = vh(),
      wD = Object.prototype,
      AD = wD.hasOwnProperty;
    function OD(e) {
      for (
        var t = e.name + "", n = yh[t], r = AD.call(yh, t) ? n.length : 0;
        r--;

      ) {
        var i = n[r],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    mh.exports = OD;
  });
  var qr = d((TG, Eh) => {
    var xD = $o(),
      SD = Nr(),
      RD = 4294967295;
    function Fr(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = RD),
        (this.__views__ = []);
    }
    Fr.prototype = xD(SD.prototype);
    Fr.prototype.constructor = Fr;
    Eh.exports = Fr;
  });
  var Ih = d((wG, _h) => {
    function CD(e, t) {
      var n = -1,
        r = e.length;
      for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
      return t;
    }
    _h.exports = CD;
  });
  var Th = d((AG, bh) => {
    var LD = qr(),
      PD = Mr(),
      ND = Ih();
    function DD(e) {
      if (e instanceof LD) return e.clone();
      var t = new PD(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = ND(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    bh.exports = DD;
  });
  var Oh = d((OG, Ah) => {
    var MD = qr(),
      wh = Mr(),
      FD = Nr(),
      qD = we(),
      kD = at(),
      GD = Th(),
      XD = Object.prototype,
      UD = XD.hasOwnProperty;
    function kr(e) {
      if (kD(e) && !qD(e) && !(e instanceof MD)) {
        if (e instanceof wh) return e;
        if (UD.call(e, "__wrapped__")) return GD(e);
      }
      return new wh(e);
    }
    kr.prototype = FD.prototype;
    kr.prototype.constructor = kr;
    Ah.exports = kr;
  });
  var Sh = d((xG, xh) => {
    var VD = qr(),
      WD = Zo(),
      HD = Jo(),
      BD = Oh();
    function zD(e) {
      var t = HD(e),
        n = BD[t];
      if (typeof n != "function" || !(t in VD.prototype)) return !1;
      if (e === n) return !0;
      var r = WD(n);
      return !!r && e === r[0];
    }
    xh.exports = zD;
  });
  var Ph = d((SG, Lh) => {
    var Rh = Mr(),
      KD = sh(),
      jD = Zo(),
      ea = Jo(),
      YD = we(),
      Ch = Sh(),
      QD = "Expected a function",
      $D = 8,
      ZD = 32,
      JD = 128,
      eM = 256;
    function tM(e) {
      return KD(function (t) {
        var n = t.length,
          r = n,
          i = Rh.prototype.thru;
        for (e && t.reverse(); r--; ) {
          var o = t[r];
          if (typeof o != "function") throw new TypeError(QD);
          if (i && !s && ea(o) == "wrapper") var s = new Rh([], !0);
        }
        for (r = s ? r : n; ++r < n; ) {
          o = t[r];
          var a = ea(o),
            u = a == "wrapper" ? jD(o) : void 0;
          u &&
          Ch(u[0]) &&
          u[1] == (JD | $D | ZD | eM) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[ea(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && Ch(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var l = arguments,
            _ = l[0];
          if (s && l.length == 1 && YD(_)) return s.plant(_).value();
          for (var v = 0, g = n ? t[v].apply(this, l) : _; ++v < n; )
            g = t[v].call(this, g);
          return g;
        };
      });
    }
    Lh.exports = tM;
  });
  var Dh = d((RG, Nh) => {
    var nM = Ph(),
      rM = nM();
    Nh.exports = rM;
  });
  var Fh = d((CG, Mh) => {
    function iM(e, t, n) {
      return (
        e === e &&
          (n !== void 0 && (e = e <= n ? e : n),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    Mh.exports = iM;
  });
  var kh = d((LG, qh) => {
    var oM = Fh(),
      ta = dr();
    function aM(e, t, n) {
      return (
        n === void 0 && ((n = t), (t = void 0)),
        n !== void 0 && ((n = ta(n)), (n = n === n ? n : 0)),
        t !== void 0 && ((t = ta(t)), (t = t === t ? t : 0)),
        oM(ta(e), t, n)
      );
    }
    qh.exports = aM;
  });
  var Kh,
    jh,
    Yh,
    Qh,
    sM,
    uM,
    cM,
    lM,
    fM,
    dM,
    pM,
    gM,
    hM,
    vM,
    yM,
    mM,
    EM,
    _M,
    IM,
    $h,
    Zh,
    bM,
    TM,
    wM,
    Jh,
    AM,
    OM,
    ev,
    xM,
    na,
    tv,
    Gh,
    Xh,
    nv,
    Pn,
    SM,
    it,
    rv,
    RM,
    ke,
    Ye,
    Nn,
    iv,
    ra,
    Uh,
    ia,
    CM,
    Ln,
    LM,
    PM,
    NM,
    ov,
    Vh,
    DM,
    Wh,
    MM,
    FM,
    qM,
    Hh,
    Gr,
    Xr,
    Bh,
    zh,
    av,
    sv = me(() => {
      "use strict";
      (Kh = de(Dh())), (jh = de(lr())), (Yh = de(kh()));
      Fe();
      oa();
      Pr();
      (Qh = de(Ot())),
        ({
          MOUSE_CLICK: sM,
          MOUSE_SECOND_CLICK: uM,
          MOUSE_DOWN: cM,
          MOUSE_UP: lM,
          MOUSE_OVER: fM,
          MOUSE_OUT: dM,
          DROPDOWN_CLOSE: pM,
          DROPDOWN_OPEN: gM,
          SLIDER_ACTIVE: hM,
          SLIDER_INACTIVE: vM,
          TAB_ACTIVE: yM,
          TAB_INACTIVE: mM,
          NAVBAR_CLOSE: EM,
          NAVBAR_OPEN: _M,
          MOUSE_MOVE: IM,
          PAGE_SCROLL_DOWN: $h,
          SCROLL_INTO_VIEW: Zh,
          SCROLL_OUT_OF_VIEW: bM,
          PAGE_SCROLL_UP: TM,
          SCROLLING_IN_VIEW: wM,
          PAGE_FINISH: Jh,
          ECOMMERCE_CART_CLOSE: AM,
          ECOMMERCE_CART_OPEN: OM,
          PAGE_START: ev,
          PAGE_SCROLL: xM,
        } = Ke),
        (na = "COMPONENT_ACTIVE"),
        (tv = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Gh } = Oe),
        ({ getNamespacedParameterId: Xh } = Qh.IX2VanillaUtils),
        (nv = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (Pn = nv(({ element: e, nativeEvent: t }) => e === t.target)),
        (SM = nv(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (it = (0, Kh.default)([Pn, SM])),
        (rv = (e, t) => {
          if (t) {
            let { ixData: n } = e.getState(),
              { events: r } = n,
              i = r[t];
            if (i && !CM[i.eventTypeId]) return i;
          }
          return null;
        }),
        (RM = ({ store: e, event: t }) => {
          let { action: n } = t,
            { autoStopEventId: r } = n.config;
          return !!rv(e, r);
        }),
        (ke = ({ store: e, event: t, element: n, eventStateKey: r }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            l = rv(e, u);
          return (
            l &&
              nn({
                store: e,
                eventId: u,
                eventTarget: n,
                eventStateKey: u + Gh + r.split(Gh)[1],
                actionListId: (0, jh.default)(l, "action.config.actionListId"),
              }),
            nn({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            Dn({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            i
          );
        }),
        (Ye = (e, t) => (n, r) => e(n, r) === !0 ? t(n, r) : r),
        (Nn = { handler: Ye(it, ke) }),
        (iv = { ...Nn, types: [na, tv].join(" ") }),
        (ra = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Uh = "mouseover mouseout"),
        (ia = { types: ra }),
        (CM = { PAGE_START: ev, PAGE_FINISH: Jh }),
        (Ln = (() => {
          let e = window.pageXOffset !== void 0,
            n =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : n.scrollLeft,
            scrollTop: e ? window.pageYOffset : n.scrollTop,
            stiffScrollTop: (0, Yh.default)(
              e ? window.pageYOffset : n.scrollTop,
              0,
              n.scrollHeight - window.innerHeight
            ),
            scrollWidth: n.scrollWidth,
            scrollHeight: n.scrollHeight,
            clientWidth: n.clientWidth,
            clientHeight: n.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (LM = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (PM = ({ element: e, nativeEvent: t }) => {
          let { type: n, target: r, relatedTarget: i } = t,
            o = e.contains(r);
          if (n === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(n === "mouseout" && o && s);
        }),
        (NM = (e) => {
          let {
              element: t,
              event: { config: n },
            } = e,
            { clientWidth: r, clientHeight: i } = Ln(),
            o = n.scrollOffsetValue,
            u = n.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return LM(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: r,
            bottom: i - u,
          });
        }),
        (ov = (e) => (t, n) => {
          let { type: r } = t.nativeEvent,
            i = [na, tv].indexOf(r) !== -1 ? r === na : n.isActive,
            o = { ...n, isActive: i };
          return ((!n || o.isActive !== n.isActive) && e(t, o)) || o;
        }),
        (Vh = (e) => (t, n) => {
          let r = { elementHovered: PM(t) };
          return (
            ((n ? r.elementHovered !== n.elementHovered : r.elementHovered) &&
              e(t, r)) ||
            r
          );
        }),
        (DM = (e) => (t, n) => {
          let r = { ...n, elementVisible: NM(t) };
          return (
            ((n ? r.elementVisible !== n.elementVisible : r.elementVisible) &&
              e(t, r)) ||
            r
          );
        }),
        (Wh =
          (e) =>
          (t, n = {}) => {
            let { stiffScrollTop: r, scrollHeight: i, innerHeight: o } = Ln(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: l } = s,
              _ = l === "PX",
              v = i - o,
              g = Number((r / v).toFixed(2));
            if (n && n.percentTop === g) return n;
            let y = (_ ? u : (o * (u || 0)) / 100) / v,
              b,
              T,
              R = 0;
            n &&
              ((b = g > n.percentTop),
              (T = n.scrollingDown !== b),
              (R = T ? g : n.anchorTop));
            let w = a === $h ? g >= R + y : g <= R - y,
              L = {
                ...n,
                percentTop: g,
                inBounds: w,
                anchorTop: R,
                scrollingDown: b,
              };
            return (n && w && (T || L.inBounds !== n.inBounds) && e(t, L)) || L;
          }),
        (MM = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (FM = (e) => (t, n) => {
          let r = { finished: document.readyState === "complete" };
          return r.finished && !(n && n.finshed) && e(t), r;
        }),
        (qM = (e) => (t, n) => {
          let r = { started: !0 };
          return n || e(t), r;
        }),
        (Hh =
          (e) =>
          (t, n = { clickCount: 0 }) => {
            let r = { clickCount: (n.clickCount % 2) + 1 };
            return (r.clickCount !== n.clickCount && e(t, r)) || r;
          }),
        (Gr = (e = !0) => ({
          ...iv,
          handler: Ye(
            e ? it : Pn,
            ov((t, n) => (n.isActive ? Nn.handler(t, n) : n))
          ),
        })),
        (Xr = (e = !0) => ({
          ...iv,
          handler: Ye(
            e ? it : Pn,
            ov((t, n) => (n.isActive ? n : Nn.handler(t, n)))
          ),
        })),
        (Bh = {
          ...ia,
          handler: DM((e, t) => {
            let { elementVisible: n } = t,
              { event: r, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[r.action.config.autoStopEventId] && t.triggered
              ? t
              : (r.eventTypeId === Zh) === n
              ? (ke(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (zh = 0.05),
        (av = {
          [hM]: Gr(),
          [vM]: Xr(),
          [gM]: Gr(),
          [pM]: Xr(),
          [_M]: Gr(!1),
          [EM]: Xr(!1),
          [yM]: Gr(),
          [mM]: Xr(),
          [OM]: { types: "ecommerce-cart-open", handler: Ye(it, ke) },
          [AM]: { types: "ecommerce-cart-close", handler: Ye(it, ke) },
          [sM]: {
            types: "click",
            handler: Ye(
              it,
              Hh((e, { clickCount: t }) => {
                RM(e) ? t === 1 && ke(e) : ke(e);
              })
            ),
          },
          [uM]: {
            types: "click",
            handler: Ye(
              it,
              Hh((e, { clickCount: t }) => {
                t === 2 && ke(e);
              })
            ),
          },
          [cM]: { ...Nn, types: "mousedown" },
          [lM]: { ...Nn, types: "mouseup" },
          [fM]: {
            types: Uh,
            handler: Ye(
              it,
              Vh((e, t) => {
                t.elementHovered && ke(e);
              })
            ),
          },
          [dM]: {
            types: Uh,
            handler: Ye(
              it,
              Vh((e, t) => {
                t.elementHovered || ke(e);
              })
            ),
          },
          [IM]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: n,
                nativeEvent: r,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: l,
                  restingState: _ = 0,
                } = n,
                {
                  clientX: v = o.clientX,
                  clientY: g = o.clientY,
                  pageX: y = o.pageX,
                  pageY: b = o.pageY,
                } = r,
                T = a === "X_AXIS",
                R = r.type === "mouseout",
                w = _ / 100,
                L = u,
                C = !1;
              switch (s) {
                case et.VIEWPORT: {
                  w = T
                    ? Math.min(v, window.innerWidth) / window.innerWidth
                    : Math.min(g, window.innerHeight) / window.innerHeight;
                  break;
                }
                case et.PAGE: {
                  let {
                    scrollLeft: D,
                    scrollTop: q,
                    scrollWidth: M,
                    scrollHeight: j,
                  } = Ln();
                  w = T ? Math.min(D + y, M) / M : Math.min(q + b, j) / j;
                  break;
                }
                case et.ELEMENT:
                default: {
                  L = Xh(i, u);
                  let D = r.type.indexOf("mouse") === 0;
                  if (D && it({ element: t, nativeEvent: r }) !== !0) break;
                  let q = t.getBoundingClientRect(),
                    { left: M, top: j, width: Y, height: Q } = q;
                  if (!D && !MM({ left: v, top: g }, q)) break;
                  (C = !0), (w = T ? (v - M) / Y : (g - j) / Q);
                  break;
                }
              }
              return (
                R && (w > 1 - zh || w < zh) && (w = Math.round(w)),
                (s !== et.ELEMENT || C || C !== o.elementHovered) &&
                  ((w = l ? 1 - w : w), e.dispatch(en(L, w))),
                {
                  elementHovered: C,
                  clientX: v,
                  clientY: g,
                  pageX: y,
                  pageY: b,
                }
              );
            },
          },
          [xM]: {
            types: ra,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: n, reverse: r } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = Ln(),
                a = i / (o - s);
              (a = r ? 1 - a : a), e.dispatch(en(n, a));
            },
          },
          [wM]: {
            types: ra,
            handler: (
              { element: e, store: t, eventConfig: n, eventStateKey: r },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: l,
                } = Ln(),
                {
                  basedOn: _,
                  selectedAxis: v,
                  continuousParameterGroupId: g,
                  startsEntering: y,
                  startsExiting: b,
                  addEndOffset: T,
                  addStartOffset: R,
                  addOffsetValue: w = 0,
                  endOffsetValue: L = 0,
                } = n,
                C = v === "X_AXIS";
              if (_ === et.VIEWPORT) {
                let D = C ? o / a : s / u;
                return (
                  D !== i.scrollPercent && t.dispatch(en(g, D)),
                  { scrollPercent: D }
                );
              } else {
                let D = Xh(r, g),
                  q = e.getBoundingClientRect(),
                  M = (R ? w : 0) / 100,
                  j = (T ? L : 0) / 100;
                (M = y ? M : 1 - M), (j = b ? j : 1 - j);
                let Y = q.top + Math.min(q.height * M, l),
                  J = q.top + q.height * j - Y,
                  W = Math.min(l + J, u),
                  E = Math.min(Math.max(0, l - Y), W) / W;
                return (
                  E !== i.scrollPercent && t.dispatch(en(D, E)),
                  { scrollPercent: E }
                );
              }
            },
          },
          [Zh]: Bh,
          [bM]: Bh,
          [$h]: {
            ...ia,
            handler: Wh((e, t) => {
              t.scrollingDown && ke(e);
            }),
          },
          [TM]: {
            ...ia,
            handler: Wh((e, t) => {
              t.scrollingDown || ke(e);
            }),
          },
          [Jh]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ye(Pn, FM(ke)),
          },
          [ev]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ye(Pn, qM(ke)),
          },
        });
    });
  var wv = {};
  Me(wv, {
    observeRequests: () => rF,
    startActionGroup: () => Dn,
    startEngine: () => zr,
    stopActionGroup: () => nn,
    stopAllActionGroups: () => Iv,
    stopEngine: () => Kr,
  });
  function rF(e) {
    xt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: aF }),
      xt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: sF }),
      xt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: uF }),
      xt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: cF });
  }
  function iF(e) {
    xt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Kr(e),
          yv({ store: e, elementApi: Ne }),
          zr({ store: e, allowEvents: !0 }),
          mv();
      },
    });
  }
  function oF(e, t) {
    let n = xt({
      store: e,
      select: ({ ixSession: r }) => r.tick,
      onChange: (r) => {
        t(r), n();
      },
    });
  }
  function aF({ rawData: e, defer: t }, n) {
    let r = () => {
      zr({ store: n, rawData: e, allowEvents: !0 }), mv();
    };
    t ? setTimeout(r, 0) : r();
  }
  function mv() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function sF(e, t) {
    let {
        actionTypeId: n,
        actionListId: r,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: l = !0,
      } = e,
      { rawData: _ } = e;
    if (r && i && _ && a) {
      let v = _.actionLists[r];
      v && (_ = zM({ actionList: v, actionItemId: i, rawData: _ }));
    }
    if (
      (zr({ store: t, rawData: _, allowEvents: s, testManual: u }),
      (r && n === Le.GENERAL_START_ACTION) || aa(n))
    ) {
      nn({ store: t, actionListId: r }),
        _v({ store: t, actionListId: r, eventId: o });
      let v = Dn({
        store: t,
        eventId: o,
        actionListId: r,
        immediate: a,
        verbose: l,
      });
      l && v && t.dispatch(tn({ actionListId: r, isPlaying: !a }));
    }
  }
  function uF({ actionListId: e }, t) {
    e ? nn({ store: t, actionListId: e }) : Iv({ store: t }), Kr(t);
  }
  function cF(e, t) {
    Kr(t), yv({ store: t, elementApi: Ne });
  }
  function zr({ store: e, rawData: t, allowEvents: n, testManual: r }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(qo(t)),
      i.active ||
        (e.dispatch(
          ko({
            hasBoundaryNodes: !!document.querySelector(Vr),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        n &&
          (hF(e), lF(), e.getState().ixSession.hasDefinedMediaQueries && iF(e)),
        e.dispatch(Go()),
        fF(e, r));
  }
  function lF() {
    let { documentElement: e } = document;
    e.className.indexOf(uv) === -1 && (e.className += ` ${uv}`);
  }
  function fF(e, t) {
    let n = (r) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(Cr(r, o)), t ? oF(e, n) : requestAnimationFrame(n));
    };
    n(window.performance.now());
  }
  function Kr(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: n } = t;
      n.forEach(dF), QM(), e.dispatch(Xo());
    }
  }
  function dF({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function pF({
    store: e,
    eventStateKey: t,
    eventTarget: n,
    eventId: r,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: l, ixSession: _ } = e.getState(),
      { events: v } = l,
      g = v[r],
      { eventTypeId: y } = g,
      b = {},
      T = {},
      R = [],
      { continuousActionGroups: w } = s,
      { id: L } = s;
    KM(y, i) && (L = jM(t, L));
    let C = _.hasBoundaryNodes && n ? Cn(n, Vr) : null;
    w.forEach((D) => {
      let { keyframe: q, actionItems: M } = D;
      M.forEach((j) => {
        let { actionTypeId: Y } = j,
          { target: Q } = j.config;
        if (!Q) return;
        let J = Q.boundaryMode ? C : null,
          W = $M(Q) + sa + Y;
        if (((T[W] = gF(T[W], q, j)), !b[W])) {
          b[W] = !0;
          let { config: O } = j;
          Wr({
            config: O,
            event: g,
            eventTarget: n,
            elementRoot: J,
            elementApi: Ne,
          }).forEach((E) => {
            R.push({ element: E, key: W });
          });
        }
      });
    }),
      R.forEach(({ element: D, key: q }) => {
        let M = T[q],
          j = (0, lt.default)(M, "[0].actionItems[0]", {}),
          { actionTypeId: Y } = j,
          J = (
            Y === Le.PLUGIN_RIVE
              ? (j.config?.target?.selectorGuids || []).length === 0
              : Br(Y)
          )
            ? ca(Y)(D, j)
            : null,
          W = ua({ element: D, actionItem: j, elementApi: Ne }, J);
        la({
          store: e,
          element: D,
          eventId: r,
          actionListId: o,
          actionItem: j,
          destination: W,
          continuous: !0,
          parameterId: L,
          actionGroups: M,
          smoothing: a,
          restingValue: u,
          pluginInstance: J,
        });
      });
  }
  function gF(e = [], t, n) {
    let r = [...e],
      i;
    return (
      r.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = r.length), r.push({ keyframe: t, actionItems: [] })),
      r[i].actionItems.push(n),
      r
    );
  }
  function hF(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: n } = t;
    Ev(e),
      (0, rn.default)(n, (i, o) => {
        let s = av[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        IF({ logic: s, store: e, events: i });
      });
    let { ixSession: r } = e.getState();
    r.eventListeners.length && yF(e);
  }
  function yF(e) {
    let t = () => {
      Ev(e);
    };
    vF.forEach((n) => {
      window.addEventListener(n, t), e.dispatch(Rr(window, [n, t]));
    }),
      t();
  }
  function Ev(e) {
    let { ixSession: t, ixData: n } = e.getState(),
      r = window.innerWidth;
    if (r !== t.viewportWidth) {
      let { mediaQueries: i } = n;
      e.dispatch(Bo({ width: r, mediaQueries: i }));
    }
  }
  function IF({ logic: e, store: t, events: n }) {
    bF(n);
    let { types: r, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = mF(n, _F);
    if (!(0, fv.default)(a)) return;
    (0, rn.default)(a, (v, g) => {
      let y = n[g],
        { action: b, id: T, mediaQueries: R = o.mediaQueryKeys } = y,
        { actionListId: w } = b.config;
      ZM(R, o.mediaQueryKeys) || t.dispatch(zo()),
        b.actionTypeId === Le.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(y.config) ? y.config : [y.config]).forEach((C) => {
            let { continuousParameterGroupId: D } = C,
              q = (0, lt.default)(s, `${w}.continuousParameterGroups`, []),
              M = (0, lv.default)(q, ({ id: Q }) => Q === D),
              j = (C.smoothing || 0) / 100,
              Y = (C.restingState || 0) / 100;
            M &&
              v.forEach((Q, J) => {
                let W = T + sa + J;
                pF({
                  store: t,
                  eventStateKey: W,
                  eventTarget: Q,
                  eventId: T,
                  eventConfig: C,
                  actionListId: w,
                  parameterGroup: M,
                  smoothing: j,
                  restingValue: Y,
                });
              });
          }),
        (b.actionTypeId === Le.GENERAL_START_ACTION || aa(b.actionTypeId)) &&
          _v({ store: t, actionListId: w, eventId: T });
    });
    let u = (v) => {
        let { ixSession: g } = t.getState();
        EF(a, (y, b, T) => {
          let R = n[b],
            w = g.eventState[T],
            { action: L, mediaQueries: C = o.mediaQueryKeys } = R;
          if (!Hr(C, g.mediaQueryKey)) return;
          let D = (q = {}) => {
            let M = i(
              {
                store: t,
                element: y,
                event: R,
                eventConfig: q,
                nativeEvent: v,
                eventStateKey: T,
              },
              w
            );
            JM(M, w) || t.dispatch(Uo(T, M));
          };
          L.actionTypeId === Le.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(R.config) ? R.config : [R.config]).forEach(D)
            : D();
        });
      },
      l = (0, hv.default)(u, nF),
      _ = ({ target: v = document, types: g, throttle: y }) => {
        g.split(" ")
          .filter(Boolean)
          .forEach((b) => {
            let T = y ? l : u;
            v.addEventListener(b, T), t.dispatch(Rr(v, [b, T]));
          });
      };
    Array.isArray(r) ? r.forEach(_) : typeof r == "string" && _(e);
  }
  function bF(e) {
    if (!tF) return;
    let t = {},
      n = "";
    for (let r in e) {
      let { eventTypeId: i, target: o } = e[r],
        s = jo(o);
      t[s] ||
        ((i === Ke.MOUSE_CLICK || i === Ke.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (n += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (n) {
      let r = document.createElement("style");
      (r.textContent = n), document.body.appendChild(r);
    }
  }
  function _v({ store: e, actionListId: t, eventId: n }) {
    let { ixData: r, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = r,
      a = s[n],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let l = (0, lt.default)(u, "actionItemGroups[0].actionItems", []),
        _ = (0, lt.default)(a, "mediaQueries", r.mediaQueryKeys);
      if (!Hr(_, i.mediaQueryKey)) return;
      l.forEach((v) => {
        let { config: g, actionTypeId: y } = v,
          b =
            g?.target?.useEventTarget === !0 && g?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : g,
          T = Wr({ config: b, event: a, elementApi: Ne }),
          R = Br(y);
        T.forEach((w) => {
          let L = R ? ca(y)(w, v) : null;
          la({
            destination: ua({ element: w, actionItem: v, elementApi: Ne }, L),
            immediate: !0,
            store: e,
            element: w,
            eventId: n,
            actionItem: v,
            actionListId: t,
            pluginInstance: L,
          });
        });
      });
    }
  }
  function Iv({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, rn.default)(t, (n) => {
      if (!n.continuous) {
        let { actionListId: r, verbose: i } = n;
        fa(n, e), i && e.dispatch(tn({ actionListId: r, isPlaying: !1 }));
      }
    });
  }
  function nn({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && n ? Cn(n, Vr) : null;
    (0, rn.default)(o, (u) => {
      let l = (0, lt.default)(u, "actionItem.config.target.boundaryMode"),
        _ = r ? u.eventStateKey === r : !0;
      if (u.actionListId === i && u.eventId === t && _) {
        if (a && l && !Yo(a, u.element)) return;
        fa(u, e),
          u.verbose && e.dispatch(tn({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function Dn({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: l } = e.getState(),
      { events: _ } = u,
      v = _[t] || {},
      { mediaQueries: g = u.mediaQueryKeys } = v,
      y = (0, lt.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: b, useFirstGroupAsInitialState: T } = y;
    if (!b || !b.length) return !1;
    o >= b.length && (0, lt.default)(v, "config.loop") && (o = 0),
      o === 0 && T && o++;
    let w =
        (o === 0 || (o === 1 && T)) && aa(v.action?.actionTypeId)
          ? v.config.delay
          : void 0,
      L = (0, lt.default)(b, [o, "actionItems"], []);
    if (!L.length || !Hr(g, l.mediaQueryKey)) return !1;
    let C = l.hasBoundaryNodes && n ? Cn(n, Vr) : null,
      D = WM(L),
      q = !1;
    return (
      L.forEach((M, j) => {
        let { config: Y, actionTypeId: Q } = M,
          J = Br(Q),
          { target: W } = Y;
        if (!W) return;
        let O = W.boundaryMode ? C : null;
        Wr({
          config: Y,
          event: v,
          eventTarget: n,
          elementRoot: O,
          elementApi: Ne,
        }).forEach((F, X) => {
          let H = J ? ca(Q)(F, M) : null,
            te = J ? eF(Q)(F, M) : null;
          q = !0;
          let ne = D === j && X === 0,
            ce = HM({ element: F, actionItem: M }),
            ge = ua({ element: F, actionItem: M, elementApi: Ne }, H);
          la({
            store: e,
            element: F,
            actionItem: M,
            eventId: t,
            eventTarget: n,
            eventStateKey: r,
            actionListId: i,
            groupIndex: o,
            isCarrier: ne,
            computedStyle: ce,
            destination: ge,
            immediate: s,
            verbose: a,
            pluginInstance: H,
            pluginDuration: te,
            instanceDelay: w,
          });
        });
      }),
      q
    );
  }
  function la(e) {
    let { store: t, computedStyle: n, ...r } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: l,
        eventId: _,
      } = r,
      v = !u,
      g = UM(),
      { ixElements: y, ixSession: b, ixData: T } = t.getState(),
      R = XM(y, i),
      { refState: w } = y[R] || {},
      L = Qo(i),
      C = b.reducedMotion && Ti[o.actionTypeId],
      D;
    if (C && u)
      switch (T.events[_]?.eventTypeId) {
        case Ke.MOUSE_MOVE:
        case Ke.MOUSE_MOVE_IN_VIEWPORT:
          D = l;
          break;
        default:
          D = 0.5;
          break;
      }
    let q = BM(i, w, n, o, Ne, a);
    if (
      (t.dispatch(
        Vo({
          instanceId: g,
          elementId: R,
          origin: q,
          refType: L,
          skipMotion: C,
          skipToValue: D,
          ...r,
        })
      ),
      bv(document.body, "ix2-animation-started", g),
      s)
    ) {
      TF(t, g);
      return;
    }
    xt({ store: t, select: ({ ixInstances: M }) => M[g], onChange: Tv }),
      v && t.dispatch(Lr(g, b.tick));
  }
  function fa(e, t) {
    bv(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: n, actionItem: r } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[n] || {};
    s === vv && YM(o, r, Ne), t.dispatch(Wo(e.id));
  }
  function bv(e, t, n) {
    let r = document.createEvent("CustomEvent");
    r.initCustomEvent(t, !0, !0, n), e.dispatchEvent(r);
  }
  function TF(e, t) {
    let { ixParameters: n } = e.getState();
    e.dispatch(Lr(t, 0)), e.dispatch(Cr(performance.now(), n));
    let { ixInstances: r } = e.getState();
    Tv(r[t], e);
  }
  function Tv(e, t) {
    let {
        active: n,
        continuous: r,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: l,
        groupIndex: _,
        eventId: v,
        eventTarget: g,
        eventStateKey: y,
        actionListId: b,
        isCarrier: T,
        styleProp: R,
        verbose: w,
        pluginInstance: L,
      } = e,
      { ixData: C, ixSession: D } = t.getState(),
      { events: q } = C,
      M = q && q[v] ? q[v] : {},
      { mediaQueries: j = C.mediaQueryKeys } = M;
    if (Hr(j, D.mediaQueryKey) && (r || n || i)) {
      if (l || (u === GM && i)) {
        t.dispatch(Ho(o, a, l, s));
        let { ixElements: Y } = t.getState(),
          { ref: Q, refType: J, refState: W } = Y[o] || {},
          O = W && W[a];
        (J === vv || Br(a)) && VM(Q, W, O, v, s, R, Ne, u, L);
      }
      if (i) {
        if (T) {
          let Y = Dn({
            store: t,
            eventId: v,
            eventTarget: g,
            eventStateKey: y,
            actionListId: b,
            groupIndex: _ + 1,
            verbose: w,
          });
          w && !Y && t.dispatch(tn({ actionListId: b, isPlaying: !1 }));
        }
        fa(e, t);
      }
    }
  }
  var lv,
    lt,
    fv,
    dv,
    pv,
    gv,
    rn,
    hv,
    Ur,
    kM,
    aa,
    sa,
    Vr,
    vv,
    GM,
    uv,
    Wr,
    XM,
    ua,
    xt,
    UM,
    VM,
    yv,
    WM,
    HM,
    BM,
    zM,
    KM,
    jM,
    Hr,
    YM,
    QM,
    $M,
    ZM,
    JM,
    Br,
    ca,
    eF,
    cv,
    tF,
    nF,
    vF,
    mF,
    EF,
    _F,
    oa = me(() => {
      "use strict";
      (lv = de(Zi())),
        (lt = de(lr())),
        (fv = de(qp())),
        (dv = de(cg())),
        (pv = de(fg())),
        (gv = de(pg())),
        (rn = de(Eg())),
        (hv = de(Og()));
      Fe();
      Ur = de(Ot());
      Pr();
      Pg();
      sv();
      (kM = Object.keys(Vn)),
        (aa = (e) => kM.includes(e)),
        ({
          COLON_DELIMITER: sa,
          BOUNDARY_SELECTOR: Vr,
          HTML_ELEMENT: vv,
          RENDER_GENERAL: GM,
          W_MOD_IX: uv,
        } = Oe),
        ({
          getAffectedElements: Wr,
          getElementId: XM,
          getDestinationValues: ua,
          observeStore: xt,
          getInstanceId: UM,
          renderHTMLElement: VM,
          clearAllStyles: yv,
          getMaxDurationItemIndex: WM,
          getComputedStyle: HM,
          getInstanceOrigin: BM,
          reduceListToGroup: zM,
          shouldNamespaceEventParameter: KM,
          getNamespacedParameterId: jM,
          shouldAllowMediaQuery: Hr,
          cleanupHTMLElement: YM,
          clearObjectCache: QM,
          stringifyTarget: $M,
          mediaQueriesEqual: ZM,
          shallowEqual: JM,
        } = Ur.IX2VanillaUtils),
        ({
          isPluginType: Br,
          createPluginInstance: ca,
          getPluginDuration: eF,
        } = Ur.IX2VanillaPlugins),
        (cv = navigator.userAgent),
        (tF = cv.match(/iPad/i) || cv.match(/iPhone/)),
        (nF = 12);
      vF = ["resize", "orientationchange"];
      (mF = (e, t) => (0, dv.default)((0, gv.default)(e, t), pv.default)),
        (EF = (e, t) => {
          (0, rn.default)(e, (n, r) => {
            n.forEach((i, o) => {
              let s = r + sa + o;
              t(i, r, s);
            });
          });
        }),
        (_F = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Wr({ config: t, elementApi: Ne });
        });
    });
  var xv = d((pa) => {
    "use strict";
    Object.defineProperty(pa, "__esModule", { value: !0 });
    function wF(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    wF(pa, {
      actions: function () {
        return xF;
      },
      destroy: function () {
        return Ov;
      },
      init: function () {
        return LF;
      },
      setEnv: function () {
        return CF;
      },
      store: function () {
        return jr;
      },
    });
    var AF = _i(),
      OF = SF((mp(), $e(yp))),
      da = (oa(), $e(wv)),
      xF = RF((Pr(), $e(Sg)));
    function SF(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Av(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (Av = function (r) {
        return r ? n : t;
      })(e);
    }
    function RF(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = Av(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var jr = (0, AF.createStore)(OF.default);
    function CF(e) {
      e() && (0, da.observeRequests)(jr);
    }
    function LF(e) {
      Ov(), (0, da.startEngine)({ store: jr, rawData: e, allowEvents: !0 });
    }
    function Ov() {
      (0, da.stopEngine)(jr);
    }
  });
  var Lv = d((UG, Cv) => {
    "use strict";
    var Sv = Ce(),
      Rv = xv();
    Rv.setEnv(Sv.env);
    Sv.define(
      "ix2",
      (Cv.exports = function () {
        return Rv;
      })
    );
  });
  var Nv = d((VG, Pv) => {
    "use strict";
    var on = Ce();
    on.define(
      "links",
      (Pv.exports = function (e, t) {
        var n = {},
          r = e(window),
          i,
          o = on.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          l = /index\.(html|php)$/,
          _ = /\/$/,
          v,
          g;
        n.ready = n.design = n.preview = y;
        function y() {
          (i = o && on.env("design")),
            (g = on.env("slug") || s.pathname || ""),
            on.scroll.off(T),
            (v = []);
          for (var w = document.links, L = 0; L < w.length; ++L) b(w[L]);
          v.length && (on.scroll.on(T), T());
        }
        function b(w) {
          if (!w.getAttribute("hreflang")) {
            var L =
              (i && w.getAttribute("href-disabled")) || w.getAttribute("href");
            if (((a.href = L), !(L.indexOf(":") >= 0))) {
              var C = e(w);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var D = e(a.hash);
                D.length && v.push({ link: C, sec: D, active: !1 });
                return;
              }
              if (!(L === "#" || L === "")) {
                var q =
                  a.href === s.href || L === g || (l.test(L) && _.test(g));
                R(C, u, q);
              }
            }
          }
        }
        function T() {
          var w = r.scrollTop(),
            L = r.height();
          t.each(v, function (C) {
            if (!C.link.attr("hreflang")) {
              var D = C.link,
                q = C.sec,
                M = q.offset().top,
                j = q.outerHeight(),
                Y = L * 0.5,
                Q = q.is(":visible") && M + j - Y >= w && M + Y <= w + L;
              C.active !== Q && ((C.active = Q), R(D, u, Q));
            }
          });
        }
        function R(w, L, C) {
          var D = w.hasClass(L);
          (C && D) || (!C && !D) || (C ? w.addClass(L) : w.removeClass(L));
        }
        return n;
      })
    );
  });
  var Mv = d((WG, Dv) => {
    "use strict";
    var Yr = Ce();
    Yr.define(
      "scroll",
      (Dv.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          n = window.location,
          r = b() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (O) {
              window.setTimeout(O, 15);
            },
          u = Yr.env("editor") ? ".w-editor-body" : "body",
          l =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          _ = 'a[href="#"]',
          v = 'a[href*="#"]:not(.w-tab-link):not(' + _ + ")",
          g = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          y = document.createElement("style");
        y.appendChild(document.createTextNode(g));
        function b() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var T = /^#[a-zA-Z0-9][\w:.-]*$/;
        function R(O) {
          return T.test(O.hash) && O.host + O.pathname === n.host + n.pathname;
        }
        let w =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function L() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            w.matches
          );
        }
        function C(O, E) {
          var F;
          switch (E) {
            case "add":
              (F = O.attr("tabindex")),
                F
                  ? O.attr("data-wf-tabindex-swap", F)
                  : O.attr("tabindex", "-1");
              break;
            case "remove":
              (F = O.attr("data-wf-tabindex-swap")),
                F
                  ? (O.attr("tabindex", F),
                    O.removeAttr("data-wf-tabindex-swap"))
                  : O.removeAttr("tabindex");
              break;
          }
          O.toggleClass("wf-force-outline-none", E === "add");
        }
        function D(O) {
          var E = O.currentTarget;
          if (
            !(
              Yr.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(E.className))
            )
          ) {
            var F = R(E) ? E.hash : "";
            if (F !== "") {
              var X = e(F);
              X.length &&
                (O && (O.preventDefault(), O.stopPropagation()),
                q(F, O),
                window.setTimeout(
                  function () {
                    M(X, function () {
                      C(X, "add"),
                        X.get(0).focus({ preventScroll: !0 }),
                        C(X, "remove");
                    });
                  },
                  O ? 0 : 300
                ));
            }
          }
        }
        function q(O) {
          if (
            n.hash !== O &&
            r &&
            r.pushState &&
            !(Yr.env.chrome && n.protocol === "file:")
          ) {
            var E = r.state && r.state.hash;
            E !== O && r.pushState({ hash: O }, "", O);
          }
        }
        function M(O, E) {
          var F = i.scrollTop(),
            X = j(O);
          if (F !== X) {
            var H = Y(O, F, X),
              te = Date.now(),
              ne = function () {
                var ce = Date.now() - te;
                window.scroll(0, Q(F, X, ce, H)),
                  ce <= H ? a(ne) : typeof E == "function" && E();
              };
            a(ne);
          }
        }
        function j(O) {
          var E = e(l),
            F = E.css("position") === "fixed" ? E.outerHeight() : 0,
            X = O.offset().top - F;
          if (O.data("scroll") === "mid") {
            var H = i.height() - F,
              te = O.outerHeight();
            te < H && (X -= Math.round((H - te) / 2));
          }
          return X;
        }
        function Y(O, E, F) {
          if (L()) return 0;
          var X = 1;
          return (
            s.add(O).each(function (H, te) {
              var ne = parseFloat(te.getAttribute("data-scroll-time"));
              !isNaN(ne) && ne >= 0 && (X = ne);
            }),
            (472.143 * Math.log(Math.abs(E - F) + 125) - 2e3) * X
          );
        }
        function Q(O, E, F, X) {
          return F > X ? E : O + (E - O) * J(F / X);
        }
        function J(O) {
          return O < 0.5
            ? 4 * O * O * O
            : (O - 1) * (2 * O - 2) * (2 * O - 2) + 1;
        }
        function W() {
          var { WF_CLICK_EMPTY: O, WF_CLICK_SCROLL: E } = t;
          o.on(E, v, D),
            o.on(O, _, function (F) {
              F.preventDefault();
            }),
            document.head.insertBefore(y, document.head.firstChild);
        }
        return { ready: W };
      })
    );
  });
  var qv = d((HG, Fv) => {
    "use strict";
    var PF = Ce();
    PF.define(
      "touch",
      (Fv.exports = function (e) {
        var t = {},
          n = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new r(o) : null
            );
          });
        function r(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            l,
            _;
          o.addEventListener("touchstart", v, !1),
            o.addEventListener("touchmove", g, !1),
            o.addEventListener("touchend", y, !1),
            o.addEventListener("touchcancel", b, !1),
            o.addEventListener("mousedown", v, !1),
            o.addEventListener("mousemove", g, !1),
            o.addEventListener("mouseup", y, !1),
            o.addEventListener("mouseout", b, !1);
          function v(R) {
            var w = R.touches;
            (w && w.length > 1) ||
              ((s = !0),
              w ? ((a = !0), (l = w[0].clientX)) : (l = R.clientX),
              (_ = l));
          }
          function g(R) {
            if (s) {
              if (a && R.type === "mousemove") {
                R.preventDefault(), R.stopPropagation();
                return;
              }
              var w = R.touches,
                L = w ? w[0].clientX : R.clientX,
                C = L - _;
              (_ = L),
                Math.abs(C) > u &&
                  n &&
                  String(n()) === "" &&
                  (i("swipe", R, { direction: C > 0 ? "right" : "left" }), b());
            }
          }
          function y(R) {
            if (s && ((s = !1), a && R.type === "mouseup")) {
              R.preventDefault(), R.stopPropagation(), (a = !1);
              return;
            }
          }
          function b() {
            s = !1;
          }
          function T() {
            o.removeEventListener("touchstart", v, !1),
              o.removeEventListener("touchmove", g, !1),
              o.removeEventListener("touchend", y, !1),
              o.removeEventListener("touchcancel", b, !1),
              o.removeEventListener("mousedown", v, !1),
              o.removeEventListener("mousemove", g, !1),
              o.removeEventListener("mouseup", y, !1),
              o.removeEventListener("mouseout", b, !1),
              (o = null);
          }
          this.destroy = T;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var Xv = d((BG, Gv) => {
    "use strict";
    var St = Ce(),
      NF = Lt(),
      Qe = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      kv = !0,
      DF = /^#[a-zA-Z0-9\-_]+$/;
    St.define(
      "dropdown",
      (Gv.exports = function (e, t) {
        var n = t.debounce,
          r = {},
          i = St.env(),
          o = !1,
          s,
          a = St.env.touch,
          u = ".w-dropdown",
          l = "w--open",
          _ = NF.triggers,
          v = 900,
          g = "focusout" + u,
          y = "keydown" + u,
          b = "mouseenter" + u,
          T = "mousemove" + u,
          R = "mouseleave" + u,
          w = (a ? "click" : "mouseup") + u,
          L = "w-close" + u,
          C = "setting" + u,
          D = e(document),
          q;
        (r.ready = M),
          (r.design = function () {
            o && E(), (o = !1), M();
          }),
          (r.preview = function () {
            (o = !0), M();
          });
        function M() {
          (s = i && St.env("design")), (q = D.find(u)), q.each(j);
        }
        function j(c, S) {
          var x = e(S),
            P = e.data(S, u);
          P ||
            (P = e.data(S, u, {
              open: !1,
              el: x,
              config: {},
              selectedIdx: -1,
            })),
            (P.toggle = P.el.children(".w-dropdown-toggle")),
            (P.list = P.el.children(".w-dropdown-list")),
            (P.links = P.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (P.complete = H(P)),
            (P.mouseLeave = ne(P)),
            (P.mouseUpOutside = X(P)),
            (P.mouseMoveOutside = ce(P)),
            Y(P);
          var ee = P.toggle.attr("id"),
            re = P.list.attr("id");
          ee || (ee = "w-dropdown-toggle-" + c),
            re || (re = "w-dropdown-list-" + c),
            P.toggle.attr("id", ee),
            P.toggle.attr("aria-controls", re),
            P.toggle.attr("aria-haspopup", "menu"),
            P.toggle.attr("aria-expanded", "false"),
            P.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            P.toggle.prop("tagName") !== "BUTTON" &&
              (P.toggle.attr("role", "button"),
              P.toggle.attr("tabindex") || P.toggle.attr("tabindex", "0")),
            P.list.attr("id", re),
            P.list.attr("aria-labelledby", ee),
            P.links.each(function (p, U) {
              U.hasAttribute("tabindex") || U.setAttribute("tabindex", "0"),
                DF.test(U.hash) && U.addEventListener("click", O.bind(null, P));
            }),
            P.el.off(u),
            P.toggle.off(u),
            P.nav && P.nav.off(u);
          var z = J(P, kv);
          s && P.el.on(C, Q(P)),
            s ||
              (i && ((P.hovering = !1), O(P)),
              P.config.hover && P.toggle.on(b, te(P)),
              P.el.on(L, z),
              P.el.on(y, ge(P)),
              P.el.on(g, h(P)),
              P.toggle.on(w, z),
              P.toggle.on(y, V(P)),
              (P.nav = P.el.closest(".w-nav")),
              P.nav.on(L, z));
        }
        function Y(c) {
          var S = Number(c.el.css("z-index"));
          (c.manageZ = S === v || S === v + 1),
            (c.config = {
              hover: c.el.attr("data-hover") === "true" && !a,
              delay: c.el.attr("data-delay"),
            });
        }
        function Q(c) {
          return function (S, x) {
            (x = x || {}),
              Y(c),
              x.open === !0 && W(c),
              x.open === !1 && O(c, { immediate: !0 });
          };
        }
        function J(c, S) {
          return n(function (x) {
            if (c.open || (x && x.type === "w-close"))
              return O(c, { forceClose: S });
            W(c);
          });
        }
        function W(c) {
          if (!c.open) {
            F(c),
              (c.open = !0),
              c.list.addClass(l),
              c.toggle.addClass(l),
              c.toggle.attr("aria-expanded", "true"),
              _.intro(0, c.el[0]),
              St.redraw.up(),
              c.manageZ && c.el.css("z-index", v + 1);
            var S = St.env("editor");
            s || D.on(w, c.mouseUpOutside),
              c.hovering && !S && c.el.on(R, c.mouseLeave),
              c.hovering && S && D.on(T, c.mouseMoveOutside),
              window.clearTimeout(c.delayId);
          }
        }
        function O(c, { immediate: S, forceClose: x } = {}) {
          if (c.open && !(c.config.hover && c.hovering && !x)) {
            c.toggle.attr("aria-expanded", "false"), (c.open = !1);
            var P = c.config;
            if (
              (_.outro(0, c.el[0]),
              D.off(w, c.mouseUpOutside),
              D.off(T, c.mouseMoveOutside),
              c.el.off(R, c.mouseLeave),
              window.clearTimeout(c.delayId),
              !P.delay || S)
            )
              return c.complete();
            c.delayId = window.setTimeout(c.complete, P.delay);
          }
        }
        function E() {
          D.find(u).each(function (c, S) {
            e(S).triggerHandler(L);
          });
        }
        function F(c) {
          var S = c.el[0];
          q.each(function (x, P) {
            var ee = e(P);
            ee.is(S) || ee.has(S).length || ee.triggerHandler(L);
          });
        }
        function X(c) {
          return (
            c.mouseUpOutside && D.off(w, c.mouseUpOutside),
            n(function (S) {
              if (c.open) {
                var x = e(S.target);
                if (!x.closest(".w-dropdown-toggle").length) {
                  var P = e.inArray(c.el[0], x.parents(u)) === -1,
                    ee = St.env("editor");
                  if (P) {
                    if (ee) {
                      var re =
                          x.parents().length === 1 &&
                          x.parents("svg").length === 1,
                        z = x.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (re || z) return;
                    }
                    O(c);
                  }
                }
              }
            })
          );
        }
        function H(c) {
          return function () {
            c.list.removeClass(l),
              c.toggle.removeClass(l),
              c.manageZ && c.el.css("z-index", "");
          };
        }
        function te(c) {
          return function () {
            (c.hovering = !0), W(c);
          };
        }
        function ne(c) {
          return function () {
            (c.hovering = !1), c.links.is(":focus") || O(c);
          };
        }
        function ce(c) {
          return n(function (S) {
            if (c.open) {
              var x = e(S.target),
                P = e.inArray(c.el[0], x.parents(u)) === -1;
              if (P) {
                var ee = x.parents(".w-editor-bem-EditorHoverControls").length,
                  re = x.parents(".w-editor-bem-RTToolbar").length,
                  z = e(".w-editor-bem-EditorOverlay"),
                  p =
                    z.find(".w-editor-edit-outline").length ||
                    z.find(".w-editor-bem-RTToolbar").length;
                if (ee || re || p) return;
                (c.hovering = !1), O(c);
              }
            }
          });
        }
        function ge(c) {
          return function (S) {
            if (!(s || !c.open))
              switch (
                ((c.selectedIdx = c.links.index(document.activeElement)),
                S.keyCode)
              ) {
                case Qe.HOME:
                  return c.open
                    ? ((c.selectedIdx = 0), m(c), S.preventDefault())
                    : void 0;
                case Qe.END:
                  return c.open
                    ? ((c.selectedIdx = c.links.length - 1),
                      m(c),
                      S.preventDefault())
                    : void 0;
                case Qe.ESCAPE:
                  return O(c), c.toggle.focus(), S.stopPropagation();
                case Qe.ARROW_RIGHT:
                case Qe.ARROW_DOWN:
                  return (
                    (c.selectedIdx = Math.min(
                      c.links.length - 1,
                      c.selectedIdx + 1
                    )),
                    m(c),
                    S.preventDefault()
                  );
                case Qe.ARROW_LEFT:
                case Qe.ARROW_UP:
                  return (
                    (c.selectedIdx = Math.max(-1, c.selectedIdx - 1)),
                    m(c),
                    S.preventDefault()
                  );
              }
          };
        }
        function m(c) {
          c.links[c.selectedIdx] && c.links[c.selectedIdx].focus();
        }
        function V(c) {
          var S = J(c, kv);
          return function (x) {
            if (!s) {
              if (!c.open)
                switch (x.keyCode) {
                  case Qe.ARROW_UP:
                  case Qe.ARROW_DOWN:
                    return x.stopPropagation();
                }
              switch (x.keyCode) {
                case Qe.SPACE:
                case Qe.ENTER:
                  return S(), x.stopPropagation(), x.preventDefault();
              }
            }
          };
        }
        function h(c) {
          return n(function (S) {
            var { relatedTarget: x, target: P } = S,
              ee = c.el[0],
              re = ee.contains(x) || ee.contains(P);
            return re || O(c), S.stopPropagation();
          });
        }
        return r;
      })
    );
  });
  var Uv = d((ga) => {
    "use strict";
    Object.defineProperty(ga, "__esModule", { value: !0 });
    Object.defineProperty(ga, "default", {
      enumerable: !0,
      get: function () {
        return MF;
      },
    });
    function MF(e, t, n, r, i, o, s, a, u, l, _, v, g) {
      return function (y) {
        e(y);
        var b = y.form,
          T = {
            name: b.attr("data-name") || b.attr("name") || "Untitled Form",
            pageId: b.attr("data-wf-page-id") || "",
            elementId: b.attr("data-wf-element-id") || "",
            source: t.href,
            test: n.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              b.html()
            ),
            trackingCookies: r(),
          };
        let R = b.attr("data-wf-flow");
        R && (T.wfFlow = R), i(y);
        var w = o(b, T.fields);
        if (w) return s(w);
        if (((T.fileUploads = a(b)), u(y), !l)) {
          _(y);
          return;
        }
        v.ajax({
          url: g,
          type: "POST",
          data: T,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (L) {
            L && L.code === 200 && (y.success = !0), _(y);
          })
          .fail(function () {
            _(y);
          });
      };
    }
  });
  var Wv = d((KG, Vv) => {
    "use strict";
    var Qr = Ce(),
      FF = (e, t, n, r) => {
        let i = document.createElement("div");
        t.appendChild(i),
          turnstile.render(i, {
            sitekey: e,
            callback: function (o) {
              n(o);
            },
            "error-callback": function () {
              r();
            },
          });
      };
    Qr.define(
      "forms",
      (Vv.exports = function (e, t) {
        let n = "TURNSTILE_LOADED";
        var r = {},
          i = e(document),
          o,
          s = window.location,
          a = window.XDomainRequest && !window.atob,
          u = ".w-form",
          l,
          _ = /e(-)?mail/i,
          v = /^\S+@\S+$/,
          g = window.alert,
          y = Qr.env(),
          b,
          T,
          R;
        let w = i.find("[data-turnstile-sitekey]").data("turnstile-sitekey"),
          L;
        var C = /list-manage[1-9]?.com/i,
          D = t.debounce(function () {
            g(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              M(), q(), !y && !b && Y();
            };
        function q() {
          (l = e("html").attr("data-wf-site")),
            (T = "https://webflow.com/api/v1/form/" + l),
            a &&
              T.indexOf("https://webflow.com") >= 0 &&
              (T = T.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (R = `${T}/signFile`),
            (o = e(u + " form")),
            o.length && o.each(j);
        }
        function M() {
          w &&
            ((L = document.createElement("script")),
            (L.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"),
            document.head.appendChild(L),
            (L.onload = () => {
              i.trigger(n);
            }));
        }
        function j(h, c) {
          var S = e(c),
            x = e.data(c, u);
          x || (x = e.data(c, u, { form: S })), Q(x);
          var P = S.closest("div.w-form");
          (x.done = P.find("> .w-form-done")),
            (x.fail = P.find("> .w-form-fail")),
            (x.fileUploads = P.find(".w-file-upload")),
            x.fileUploads.each(function (z) {
              ge(z, x);
            }),
            w &&
              ((x.wait = !1),
              J(x),
              i.on(typeof turnstile < "u" ? "ready" : n, function () {
                FF(
                  w,
                  c,
                  (z) => {
                    (x.turnstileToken = z), Q(x);
                  },
                  () => {
                    J(x);
                  }
                );
              }));
          var ee =
            x.form.attr("aria-label") || x.form.attr("data-name") || "Form";
          x.done.attr("aria-label") || x.form.attr("aria-label", ee),
            x.done.attr("tabindex", "-1"),
            x.done.attr("role", "region"),
            x.done.attr("aria-label") ||
              x.done.attr("aria-label", ee + " success"),
            x.fail.attr("tabindex", "-1"),
            x.fail.attr("role", "region"),
            x.fail.attr("aria-label") ||
              x.fail.attr("aria-label", ee + " failure");
          var re = (x.action = S.attr("action"));
          if (
            ((x.handler = null),
            (x.redirect = S.attr("data-redirect")),
            C.test(re))
          ) {
            x.handler = te;
            return;
          }
          if (!re) {
            if (l) {
              x.handler = (() => {
                let z = Uv().default;
                return z(Q, s, Qr, F, ce, W, g, O, J, l, ne, e, T);
              })();
              return;
            }
            D();
          }
        }
        function Y() {
          (b = !0),
            i.on("submit", u + " form", function (z) {
              var p = e.data(this, u);
              p.handler && ((p.evt = z), p.handler(p));
            });
          let h = ".w-checkbox-input",
            c = ".w-radio-input",
            S = "w--redirected-checked",
            x = "w--redirected-focus",
            P = "w--redirected-focus-visible",
            ee = ":focus-visible, [data-wf-focus-visible]",
            re = [
              ["checkbox", h],
              ["radio", c],
            ];
          i.on(
            "change",
            u + ' form input[type="checkbox"]:not(' + h + ")",
            (z) => {
              e(z.target).siblings(h).toggleClass(S);
            }
          ),
            i.on("change", u + ' form input[type="radio"]', (z) => {
              e(`input[name="${z.target.name}"]:not(${h})`).map((U, Z) =>
                e(Z).siblings(c).removeClass(S)
              );
              let p = e(z.target);
              p.hasClass("w-radio-input") || p.siblings(c).addClass(S);
            }),
            re.forEach(([z, p]) => {
              i.on(
                "focus",
                u + ` form input[type="${z}"]:not(` + p + ")",
                (U) => {
                  e(U.target).siblings(p).addClass(x),
                    e(U.target).filter(ee).siblings(p).addClass(P);
                }
              ),
                i.on(
                  "blur",
                  u + ` form input[type="${z}"]:not(` + p + ")",
                  (U) => {
                    e(U.target).siblings(p).removeClass(`${x} ${P}`);
                  }
                );
            });
        }
        function Q(h) {
          var c = (h.btn = h.form.find(':input[type="submit"]'));
          (h.wait = h.btn.attr("data-wait") || null),
            (h.success = !1),
            c.prop("disabled", !!(w && !h.turnstileToken)),
            h.label && c.val(h.label);
        }
        function J(h) {
          var c = h.btn,
            S = h.wait;
          c.prop("disabled", !0), S && ((h.label = c.val()), c.val(S));
        }
        function W(h, c) {
          var S = null;
          return (
            (c = c || {}),
            h
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (x, P) {
                var ee = e(P),
                  re = ee.attr("type"),
                  z =
                    ee.attr("data-name") ||
                    ee.attr("name") ||
                    "Field " + (x + 1);
                z = encodeURIComponent(z);
                var p = ee.val();
                if (re === "checkbox") p = ee.is(":checked");
                else if (re === "radio") {
                  if (c[z] === null || typeof c[z] == "string") return;
                  p =
                    h
                      .find('input[name="' + ee.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof p == "string" && (p = e.trim(p)),
                  (c[z] = p),
                  (S = S || X(ee, re, z, p));
              }),
            S
          );
        }
        function O(h) {
          var c = {};
          return (
            h.find(':input[type="file"]').each(function (S, x) {
              var P = e(x),
                ee = P.attr("data-name") || P.attr("name") || "File " + (S + 1),
                re = P.attr("data-value");
              typeof re == "string" && (re = e.trim(re)), (c[ee] = re);
            }),
            c
          );
        }
        let E = { _mkto_trk: "marketo" };
        function F() {
          return document.cookie.split("; ").reduce(function (c, S) {
            let x = S.split("="),
              P = x[0];
            if (P in E) {
              let ee = E[P],
                re = x.slice(1).join("=");
              c[ee] = re;
            }
            return c;
          }, {});
        }
        function X(h, c, S, x) {
          var P = null;
          return (
            c === "password"
              ? (P = "Passwords cannot be submitted.")
              : h.attr("required")
              ? x
                ? _.test(h.attr("type")) &&
                  (v.test(x) ||
                    (P = "Please enter a valid email address for: " + S))
                : (P = "Please fill out the required field: " + S)
              : S === "g-recaptcha-response" &&
                !x &&
                (P = "Please confirm you\u2019re not a robot."),
            P
          );
        }
        function H(h) {
          ce(h), ne(h);
        }
        function te(h) {
          Q(h);
          var c = h.form,
            S = {};
          if (/^https/.test(s.href) && !/^https/.test(h.action)) {
            c.attr("method", "post");
            return;
          }
          ce(h);
          var x = W(c, S);
          if (x) return g(x);
          J(h);
          var P;
          t.each(S, function (p, U) {
            _.test(U) && (S.EMAIL = p),
              /^((full[ _-]?)?name)$/i.test(U) && (P = p),
              /^(first[ _-]?name)$/i.test(U) && (S.FNAME = p),
              /^(last[ _-]?name)$/i.test(U) && (S.LNAME = p);
          }),
            P &&
              !S.FNAME &&
              ((P = P.split(" ")),
              (S.FNAME = P[0]),
              (S.LNAME = S.LNAME || P[1]));
          var ee = h.action.replace("/post?", "/post-json?") + "&c=?",
            re = ee.indexOf("u=") + 2;
          re = ee.substring(re, ee.indexOf("&", re));
          var z = ee.indexOf("id=") + 3;
          (z = ee.substring(z, ee.indexOf("&", z))),
            (S["b_" + re + "_" + z] = ""),
            e
              .ajax({ url: ee, data: S, dataType: "jsonp" })
              .done(function (p) {
                (h.success = p.result === "success" || /already/.test(p.msg)),
                  h.success || console.info("MailChimp error: " + p.msg),
                  ne(h);
              })
              .fail(function () {
                ne(h);
              });
        }
        function ne(h) {
          var c = h.form,
            S = h.redirect,
            x = h.success;
          if (x && S) {
            Qr.location(S);
            return;
          }
          h.done.toggle(x),
            h.fail.toggle(!x),
            x ? h.done.focus() : h.fail.focus(),
            c.toggle(!x),
            Q(h);
        }
        function ce(h) {
          h.evt && h.evt.preventDefault(), (h.evt = null);
        }
        function ge(h, c) {
          if (!c.fileUploads || !c.fileUploads[h]) return;
          var S,
            x = e(c.fileUploads[h]),
            P = x.find("> .w-file-upload-default"),
            ee = x.find("> .w-file-upload-uploading"),
            re = x.find("> .w-file-upload-success"),
            z = x.find("> .w-file-upload-error"),
            p = P.find(".w-file-upload-input"),
            U = P.find(".w-file-upload-label"),
            Z = U.children(),
            K = z.find(".w-file-upload-error-msg"),
            pe = re.find(".w-file-upload-file"),
            xe = re.find(".w-file-remove-link"),
            Ge = pe.find(".w-file-upload-file-name"),
            f = K.attr("data-w-size-error"),
            I = K.attr("data-w-type-error"),
            A = K.attr("data-w-generic-error");
          if (
            (y ||
              U.on("click keydown", function (oe) {
                (oe.type === "keydown" && oe.which !== 13 && oe.which !== 32) ||
                  (oe.preventDefault(), p.click());
              }),
            U.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            xe.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            y)
          )
            p.on("click", function (oe) {
              oe.preventDefault();
            }),
              U.on("click", function (oe) {
                oe.preventDefault();
              }),
              Z.on("click", function (oe) {
                oe.preventDefault();
              });
          else {
            xe.on("click keydown", function (oe) {
              if (oe.type === "keydown") {
                if (oe.which !== 13 && oe.which !== 32) return;
                oe.preventDefault();
              }
              p.removeAttr("data-value"),
                p.val(""),
                Ge.html(""),
                P.toggle(!0),
                re.toggle(!1),
                U.focus();
            }),
              p.on("change", function (oe) {
                (S = oe.target && oe.target.files && oe.target.files[0]),
                  S &&
                    (P.toggle(!1),
                    z.toggle(!1),
                    ee.toggle(!0),
                    ee.focus(),
                    Ge.text(S.name),
                    se() || J(c),
                    (c.fileUploads[h].uploading = !0),
                    m(S, G));
              });
            var N = U.outerHeight();
            p.height(N), p.width(1);
          }
          function k(oe) {
            var B = oe.responseJSON && oe.responseJSON.msg,
              ue = A;
            typeof B == "string" && B.indexOf("InvalidFileTypeError") === 0
              ? (ue = I)
              : typeof B == "string" &&
                B.indexOf("MaxFileSizeError") === 0 &&
                (ue = f),
              K.text(ue),
              p.removeAttr("data-value"),
              p.val(""),
              ee.toggle(!1),
              P.toggle(!0),
              z.toggle(!0),
              z.focus(),
              (c.fileUploads[h].uploading = !1),
              se() || Q(c);
          }
          function G(oe, B) {
            if (oe) return k(oe);
            var ue = B.fileName,
              le = B.postData,
              Ie = B.fileId,
              Xe = B.s3Url;
            p.attr("data-value", Ie), V(Xe, le, S, ue, ie);
          }
          function ie(oe) {
            if (oe) return k(oe);
            ee.toggle(!1),
              re.css("display", "inline-block"),
              re.focus(),
              (c.fileUploads[h].uploading = !1),
              se() || Q(c);
          }
          function se() {
            var oe = (c.fileUploads && c.fileUploads.toArray()) || [];
            return oe.some(function (B) {
              return B.uploading;
            });
          }
        }
        function m(h, c) {
          var S = new URLSearchParams({ name: h.name, size: h.size });
          e.ajax({ type: "GET", url: `${R}?${S}`, crossDomain: !0 })
            .done(function (x) {
              c(null, x);
            })
            .fail(function (x) {
              c(x);
            });
        }
        function V(h, c, S, x, P) {
          var ee = new FormData();
          for (var re in c) ee.append(re, c[re]);
          ee.append("file", S, x),
            e
              .ajax({
                type: "POST",
                url: h,
                data: ee,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                P(null);
              })
              .fail(function (z) {
                P(z);
              });
        }
        return r;
      })
    );
  });
  var Bv = d((jG, Hv) => {
    "use strict";
    var yt = Ce(),
      qF = Lt(),
      Ae = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    yt.define(
      "navbar",
      (Hv.exports = function (e, t) {
        var n = {},
          r = e.tram,
          i = e(window),
          o = e(document),
          s = t.debounce,
          a,
          u,
          l,
          _,
          v = yt.env(),
          g = '<div class="w-nav-overlay" data-wf-ignore />',
          y = ".w-nav",
          b = "w--open",
          T = "w--nav-dropdown-open",
          R = "w--nav-dropdown-toggle-open",
          w = "w--nav-dropdown-list-open",
          L = "w--nav-link-open",
          C = qF.triggers,
          D = e();
        (n.ready = n.design = n.preview = q),
          (n.destroy = function () {
            (D = e()), M(), u && u.length && u.each(J);
          });
        function q() {
          (l = v && yt.env("design")),
            (_ = yt.env("editor")),
            (a = e(document.body)),
            (u = o.find(y)),
            u.length && (u.each(Q), M(), j());
        }
        function M() {
          yt.resize.off(Y);
        }
        function j() {
          yt.resize.on(Y);
        }
        function Y() {
          u.each(h);
        }
        function Q(p, U) {
          var Z = e(U),
            K = e.data(U, y);
          K ||
            (K = e.data(U, y, {
              open: !1,
              el: Z,
              config: {},
              selectedIdx: -1,
            })),
            (K.menu = Z.find(".w-nav-menu")),
            (K.links = K.menu.find(".w-nav-link")),
            (K.dropdowns = K.menu.find(".w-dropdown")),
            (K.dropdownToggle = K.menu.find(".w-dropdown-toggle")),
            (K.dropdownList = K.menu.find(".w-dropdown-list")),
            (K.button = Z.find(".w-nav-button")),
            (K.container = Z.find(".w-container")),
            (K.overlayContainerId = "w-nav-overlay-" + p),
            (K.outside = m(K));
          var pe = Z.find(".w-nav-brand");
          pe &&
            pe.attr("href") === "/" &&
            pe.attr("aria-label") == null &&
            pe.attr("aria-label", "home"),
            K.button.attr("style", "-webkit-user-select: text;"),
            K.button.attr("aria-label") == null &&
              K.button.attr("aria-label", "menu"),
            K.button.attr("role", "button"),
            K.button.attr("tabindex", "0"),
            K.button.attr("aria-controls", K.overlayContainerId),
            K.button.attr("aria-haspopup", "menu"),
            K.button.attr("aria-expanded", "false"),
            K.el.off(y),
            K.button.off(y),
            K.menu.off(y),
            E(K),
            l
              ? (W(K), K.el.on("setting" + y, F(K)))
              : (O(K),
                K.button.on("click" + y, ce(K)),
                K.menu.on("click" + y, "a", ge(K)),
                K.button.on("keydown" + y, X(K)),
                K.el.on("keydown" + y, H(K))),
            h(p, U);
        }
        function J(p, U) {
          var Z = e.data(U, y);
          Z && (W(Z), e.removeData(U, y));
        }
        function W(p) {
          p.overlay && (z(p, !0), p.overlay.remove(), (p.overlay = null));
        }
        function O(p) {
          p.overlay ||
            ((p.overlay = e(g).appendTo(p.el)),
            p.overlay.attr("id", p.overlayContainerId),
            (p.parent = p.menu.parent()),
            z(p, !0));
        }
        function E(p) {
          var U = {},
            Z = p.config || {},
            K = (U.animation = p.el.attr("data-animation") || "default");
          (U.animOver = /^over/.test(K)),
            (U.animDirect = /left$/.test(K) ? -1 : 1),
            Z.animation !== K && p.open && t.defer(ne, p),
            (U.easing = p.el.attr("data-easing") || "ease"),
            (U.easing2 = p.el.attr("data-easing2") || "ease");
          var pe = p.el.attr("data-duration");
          (U.duration = pe != null ? Number(pe) : 400),
            (U.docHeight = p.el.attr("data-doc-height")),
            (p.config = U);
        }
        function F(p) {
          return function (U, Z) {
            Z = Z || {};
            var K = i.width();
            E(p),
              Z.open === !0 && ee(p, !0),
              Z.open === !1 && z(p, !0),
              p.open &&
                t.defer(function () {
                  K !== i.width() && ne(p);
                });
          };
        }
        function X(p) {
          return function (U) {
            switch (U.keyCode) {
              case Ae.SPACE:
              case Ae.ENTER:
                return ce(p)(), U.preventDefault(), U.stopPropagation();
              case Ae.ESCAPE:
                return z(p), U.preventDefault(), U.stopPropagation();
              case Ae.ARROW_RIGHT:
              case Ae.ARROW_DOWN:
              case Ae.HOME:
              case Ae.END:
                return p.open
                  ? (U.keyCode === Ae.END
                      ? (p.selectedIdx = p.links.length - 1)
                      : (p.selectedIdx = 0),
                    te(p),
                    U.preventDefault(),
                    U.stopPropagation())
                  : (U.preventDefault(), U.stopPropagation());
            }
          };
        }
        function H(p) {
          return function (U) {
            if (p.open)
              switch (
                ((p.selectedIdx = p.links.index(document.activeElement)),
                U.keyCode)
              ) {
                case Ae.HOME:
                case Ae.END:
                  return (
                    U.keyCode === Ae.END
                      ? (p.selectedIdx = p.links.length - 1)
                      : (p.selectedIdx = 0),
                    te(p),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case Ae.ESCAPE:
                  return (
                    z(p),
                    p.button.focus(),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case Ae.ARROW_LEFT:
                case Ae.ARROW_UP:
                  return (
                    (p.selectedIdx = Math.max(-1, p.selectedIdx - 1)),
                    te(p),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case Ae.ARROW_RIGHT:
                case Ae.ARROW_DOWN:
                  return (
                    (p.selectedIdx = Math.min(
                      p.links.length - 1,
                      p.selectedIdx + 1
                    )),
                    te(p),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
              }
          };
        }
        function te(p) {
          if (p.links[p.selectedIdx]) {
            var U = p.links[p.selectedIdx];
            U.focus(), ge(U);
          }
        }
        function ne(p) {
          p.open && (z(p, !0), ee(p, !0));
        }
        function ce(p) {
          return s(function () {
            p.open ? z(p) : ee(p);
          });
        }
        function ge(p) {
          return function (U) {
            var Z = e(this),
              K = Z.attr("href");
            if (!yt.validClick(U.currentTarget)) {
              U.preventDefault();
              return;
            }
            K && K.indexOf("#") === 0 && p.open && z(p);
          };
        }
        function m(p) {
          return (
            p.outside && o.off("click" + y, p.outside),
            function (U) {
              var Z = e(U.target);
              (_ && Z.closest(".w-editor-bem-EditorOverlay").length) || V(p, Z);
            }
          );
        }
        var V = s(function (p, U) {
          if (p.open) {
            var Z = U.closest(".w-nav-menu");
            p.menu.is(Z) || z(p);
          }
        });
        function h(p, U) {
          var Z = e.data(U, y),
            K = (Z.collapsed = Z.button.css("display") !== "none");
          if ((Z.open && !K && !l && z(Z, !0), Z.container.length)) {
            var pe = S(Z);
            Z.links.each(pe), Z.dropdowns.each(pe);
          }
          Z.open && re(Z);
        }
        var c = "max-width";
        function S(p) {
          var U = p.container.css(c);
          return (
            U === "none" && (U = ""),
            function (Z, K) {
              (K = e(K)), K.css(c, ""), K.css(c) === "none" && K.css(c, U);
            }
          );
        }
        function x(p, U) {
          U.setAttribute("data-nav-menu-open", "");
        }
        function P(p, U) {
          U.removeAttribute("data-nav-menu-open");
        }
        function ee(p, U) {
          if (p.open) return;
          (p.open = !0),
            p.menu.each(x),
            p.links.addClass(L),
            p.dropdowns.addClass(T),
            p.dropdownToggle.addClass(R),
            p.dropdownList.addClass(w),
            p.button.addClass(b);
          var Z = p.config,
            K = Z.animation;
          (K === "none" || !r.support.transform || Z.duration <= 0) && (U = !0);
          var pe = re(p),
            xe = p.menu.outerHeight(!0),
            Ge = p.menu.outerWidth(!0),
            f = p.el.height(),
            I = p.el[0];
          if (
            (h(0, I),
            C.intro(0, I),
            yt.redraw.up(),
            l || o.on("click" + y, p.outside),
            U)
          ) {
            k();
            return;
          }
          var A = "transform " + Z.duration + "ms " + Z.easing;
          if (
            (p.overlay &&
              ((D = p.menu.prev()), p.overlay.show().append(p.menu)),
            Z.animOver)
          ) {
            r(p.menu)
              .add(A)
              .set({ x: Z.animDirect * Ge, height: pe })
              .start({ x: 0 })
              .then(k),
              p.overlay && p.overlay.width(Ge);
            return;
          }
          var N = f + xe;
          r(p.menu).add(A).set({ y: -N }).start({ y: 0 }).then(k);
          function k() {
            p.button.attr("aria-expanded", "true");
          }
        }
        function re(p) {
          var U = p.config,
            Z = U.docHeight ? o.height() : a.height();
          return (
            U.animOver
              ? p.menu.height(Z)
              : p.el.css("position") !== "fixed" && (Z -= p.el.outerHeight(!0)),
            p.overlay && p.overlay.height(Z),
            Z
          );
        }
        function z(p, U) {
          if (!p.open) return;
          (p.open = !1), p.button.removeClass(b);
          var Z = p.config;
          if (
            ((Z.animation === "none" ||
              !r.support.transform ||
              Z.duration <= 0) &&
              (U = !0),
            C.outro(0, p.el[0]),
            o.off("click" + y, p.outside),
            U)
          ) {
            r(p.menu).stop(), I();
            return;
          }
          var K = "transform " + Z.duration + "ms " + Z.easing2,
            pe = p.menu.outerHeight(!0),
            xe = p.menu.outerWidth(!0),
            Ge = p.el.height();
          if (Z.animOver) {
            r(p.menu)
              .add(K)
              .start({ x: xe * Z.animDirect })
              .then(I);
            return;
          }
          var f = Ge + pe;
          r(p.menu).add(K).start({ y: -f }).then(I);
          function I() {
            p.menu.height(""),
              r(p.menu).set({ x: 0, y: 0 }),
              p.menu.each(P),
              p.links.removeClass(L),
              p.dropdowns.removeClass(T),
              p.dropdownToggle.removeClass(R),
              p.dropdownList.removeClass(w),
              p.overlay &&
                p.overlay.children().length &&
                (D.length ? p.menu.insertAfter(D) : p.menu.prependTo(p.parent),
                p.overlay.attr("style", "").hide()),
              p.el.triggerHandler("w-close"),
              p.button.attr("aria-expanded", "false");
          }
        }
        return n;
      })
    );
  });
  var jv = d((YG, Kv) => {
    "use strict";
    var mt = Ce(),
      kF = Lt(),
      ot = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      zv =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    mt.define(
      "slider",
      (Kv.exports = function (e, t) {
        var n = {},
          r = e.tram,
          i = e(document),
          o,
          s,
          a = mt.env(),
          u = ".w-slider",
          l = '<div class="w-slider-dot" data-wf-ignore />',
          _ =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          v = "w-slider-force-show",
          g = kF.triggers,
          y,
          b = !1;
        (n.ready = function () {
          (s = mt.env("design")), T();
        }),
          (n.design = function () {
            (s = !0), setTimeout(T, 1e3);
          }),
          (n.preview = function () {
            (s = !1), T();
          }),
          (n.redraw = function () {
            (b = !0), T(), (b = !1);
          }),
          (n.destroy = R);
        function T() {
          (o = i.find(u)), o.length && (o.each(C), !y && (R(), w()));
        }
        function R() {
          mt.resize.off(L), mt.redraw.off(n.redraw);
        }
        function w() {
          mt.resize.on(L), mt.redraw.on(n.redraw);
        }
        function L() {
          o.filter(":visible").each(H);
        }
        function C(m, V) {
          var h = e(V),
            c = e.data(V, u);
          c ||
            (c = e.data(V, u, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: h,
              config: {},
            })),
            (c.mask = h.children(".w-slider-mask")),
            (c.left = h.children(".w-slider-arrow-left")),
            (c.right = h.children(".w-slider-arrow-right")),
            (c.nav = h.children(".w-slider-nav")),
            (c.slides = c.mask.children(".w-slide")),
            c.slides.each(g.reset),
            b && (c.maskWidth = 0),
            h.attr("role") === void 0 && h.attr("role", "region"),
            h.attr("aria-label") === void 0 && h.attr("aria-label", "carousel");
          var S = c.mask.attr("id");
          if (
            (S || ((S = "w-slider-mask-" + m), c.mask.attr("id", S)),
            !s && !c.ariaLiveLabel && (c.ariaLiveLabel = e(_).appendTo(c.mask)),
            c.left.attr("role", "button"),
            c.left.attr("tabindex", "0"),
            c.left.attr("aria-controls", S),
            c.left.attr("aria-label") === void 0 &&
              c.left.attr("aria-label", "previous slide"),
            c.right.attr("role", "button"),
            c.right.attr("tabindex", "0"),
            c.right.attr("aria-controls", S),
            c.right.attr("aria-label") === void 0 &&
              c.right.attr("aria-label", "next slide"),
            !r.support.transform)
          ) {
            c.left.hide(), c.right.hide(), c.nav.hide(), (y = !0);
            return;
          }
          c.el.off(u),
            c.left.off(u),
            c.right.off(u),
            c.nav.off(u),
            D(c),
            s
              ? (c.el.on("setting" + u, E(c)), O(c), (c.hasTimer = !1))
              : (c.el.on("swipe" + u, E(c)),
                c.left.on("click" + u, Y(c)),
                c.right.on("click" + u, Q(c)),
                c.left.on("keydown" + u, j(c, Y)),
                c.right.on("keydown" + u, j(c, Q)),
                c.nav.on("keydown" + u, "> div", E(c)),
                c.config.autoplay &&
                  !c.hasTimer &&
                  ((c.hasTimer = !0), (c.timerCount = 1), W(c)),
                c.el.on("mouseenter" + u, M(c, !0, "mouse")),
                c.el.on("focusin" + u, M(c, !0, "keyboard")),
                c.el.on("mouseleave" + u, M(c, !1, "mouse")),
                c.el.on("focusout" + u, M(c, !1, "keyboard"))),
            c.nav.on("click" + u, "> div", E(c)),
            a ||
              c.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var x = h.filter(":hidden");
          x.addClass(v);
          var P = h.parents(":hidden");
          P.addClass(v), b || H(m, V), x.removeClass(v), P.removeClass(v);
        }
        function D(m) {
          var V = {};
          (V.crossOver = 0),
            (V.animation = m.el.attr("data-animation") || "slide"),
            V.animation === "outin" &&
              ((V.animation = "cross"), (V.crossOver = 0.5)),
            (V.easing = m.el.attr("data-easing") || "ease");
          var h = m.el.attr("data-duration");
          if (
            ((V.duration = h != null ? parseInt(h, 10) : 500),
            q(m.el.attr("data-infinite")) && (V.infinite = !0),
            q(m.el.attr("data-disable-swipe")) && (V.disableSwipe = !0),
            q(m.el.attr("data-hide-arrows"))
              ? (V.hideArrows = !0)
              : m.config.hideArrows && (m.left.show(), m.right.show()),
            q(m.el.attr("data-autoplay")))
          ) {
            (V.autoplay = !0),
              (V.delay = parseInt(m.el.attr("data-delay"), 10) || 2e3),
              (V.timerMax = parseInt(m.el.attr("data-autoplay-limit"), 10));
            var c = "mousedown" + u + " touchstart" + u;
            s ||
              m.el.off(c).one(c, function () {
                O(m);
              });
          }
          var S = m.right.width();
          (V.edge = S ? S + 40 : 100), (m.config = V);
        }
        function q(m) {
          return m === "1" || m === "true";
        }
        function M(m, V, h) {
          return function (c) {
            if (V) m.hasFocus[h] = V;
            else if (
              e.contains(m.el.get(0), c.relatedTarget) ||
              ((m.hasFocus[h] = V),
              (m.hasFocus.mouse && h === "keyboard") ||
                (m.hasFocus.keyboard && h === "mouse"))
            )
              return;
            V
              ? (m.ariaLiveLabel.attr("aria-live", "polite"),
                m.hasTimer && O(m))
              : (m.ariaLiveLabel.attr("aria-live", "off"), m.hasTimer && W(m));
          };
        }
        function j(m, V) {
          return function (h) {
            switch (h.keyCode) {
              case ot.SPACE:
              case ot.ENTER:
                return V(m)(), h.preventDefault(), h.stopPropagation();
            }
          };
        }
        function Y(m) {
          return function () {
            X(m, { index: m.index - 1, vector: -1 });
          };
        }
        function Q(m) {
          return function () {
            X(m, { index: m.index + 1, vector: 1 });
          };
        }
        function J(m, V) {
          var h = null;
          V === m.slides.length && (T(), te(m)),
            t.each(m.anchors, function (c, S) {
              e(c.els).each(function (x, P) {
                e(P).index() === V && (h = S);
              });
            }),
            h != null && X(m, { index: h, immediate: !0 });
        }
        function W(m) {
          O(m);
          var V = m.config,
            h = V.timerMax;
          (h && m.timerCount++ > h) ||
            (m.timerId = window.setTimeout(function () {
              m.timerId == null || s || (Q(m)(), W(m));
            }, V.delay));
        }
        function O(m) {
          window.clearTimeout(m.timerId), (m.timerId = null);
        }
        function E(m) {
          return function (V, h) {
            h = h || {};
            var c = m.config;
            if (s && V.type === "setting") {
              if (h.select === "prev") return Y(m)();
              if (h.select === "next") return Q(m)();
              if ((D(m), te(m), h.select == null)) return;
              J(m, h.select);
              return;
            }
            if (V.type === "swipe")
              return c.disableSwipe || mt.env("editor")
                ? void 0
                : h.direction === "left"
                ? Q(m)()
                : h.direction === "right"
                ? Y(m)()
                : void 0;
            if (m.nav.has(V.target).length) {
              var S = e(V.target).index();
              if (
                (V.type === "click" && X(m, { index: S }), V.type === "keydown")
              )
                switch (V.keyCode) {
                  case ot.ENTER:
                  case ot.SPACE: {
                    X(m, { index: S }), V.preventDefault();
                    break;
                  }
                  case ot.ARROW_LEFT:
                  case ot.ARROW_UP: {
                    F(m.nav, Math.max(S - 1, 0)), V.preventDefault();
                    break;
                  }
                  case ot.ARROW_RIGHT:
                  case ot.ARROW_DOWN: {
                    F(m.nav, Math.min(S + 1, m.pages)), V.preventDefault();
                    break;
                  }
                  case ot.HOME: {
                    F(m.nav, 0), V.preventDefault();
                    break;
                  }
                  case ot.END: {
                    F(m.nav, m.pages), V.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function F(m, V) {
          var h = m.children().eq(V).focus();
          m.children().not(h);
        }
        function X(m, V) {
          V = V || {};
          var h = m.config,
            c = m.anchors;
          m.previous = m.index;
          var S = V.index,
            x = {};
          S < 0
            ? ((S = c.length - 1),
              h.infinite &&
                ((x.x = -m.endX), (x.from = 0), (x.to = c[0].width)))
            : S >= c.length &&
              ((S = 0),
              h.infinite &&
                ((x.x = c[c.length - 1].width),
                (x.from = -c[c.length - 1].x),
                (x.to = x.from - x.x))),
            (m.index = S);
          var P = m.nav
            .children()
            .eq(S)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          m.nav
            .children()
            .not(P)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            h.hideArrows &&
              (m.index === c.length - 1 ? m.right.hide() : m.right.show(),
              m.index === 0 ? m.left.hide() : m.left.show());
          var ee = m.offsetX || 0,
            re = (m.offsetX = -c[m.index].x),
            z = { x: re, opacity: 1, visibility: "" },
            p = e(c[m.index].els),
            U = e(c[m.previous] && c[m.previous].els),
            Z = m.slides.not(p),
            K = h.animation,
            pe = h.easing,
            xe = Math.round(h.duration),
            Ge = V.vector || (m.index > m.previous ? 1 : -1),
            f = "opacity " + xe + "ms " + pe,
            I = "transform " + xe + "ms " + pe;
          if (
            (p.find(zv).removeAttr("tabindex"),
            p.removeAttr("aria-hidden"),
            p.find("*").removeAttr("aria-hidden"),
            Z.find(zv).attr("tabindex", "-1"),
            Z.attr("aria-hidden", "true"),
            Z.find("*").attr("aria-hidden", "true"),
            s || (p.each(g.intro), Z.each(g.outro)),
            V.immediate && !b)
          ) {
            r(p).set(z), k();
            return;
          }
          if (m.index === m.previous) return;
          if (
            (s || m.ariaLiveLabel.text(`Slide ${S + 1} of ${c.length}.`),
            K === "cross")
          ) {
            var A = Math.round(xe - xe * h.crossOver),
              N = Math.round(xe - A);
            (f = "opacity " + A + "ms " + pe),
              r(U).set({ visibility: "" }).add(f).start({ opacity: 0 }),
              r(p)
                .set({ visibility: "", x: re, opacity: 0, zIndex: m.depth++ })
                .add(f)
                .wait(N)
                .then({ opacity: 1 })
                .then(k);
            return;
          }
          if (K === "fade") {
            r(U).set({ visibility: "" }).stop(),
              r(p)
                .set({ visibility: "", x: re, opacity: 0, zIndex: m.depth++ })
                .add(f)
                .start({ opacity: 1 })
                .then(k);
            return;
          }
          if (K === "over") {
            (z = { x: m.endX }),
              r(U).set({ visibility: "" }).stop(),
              r(p)
                .set({
                  visibility: "",
                  zIndex: m.depth++,
                  x: re + c[m.index].width * Ge,
                })
                .add(I)
                .start({ x: re })
                .then(k);
            return;
          }
          h.infinite && x.x
            ? (r(m.slides.not(U))
                .set({ visibility: "", x: x.x })
                .add(I)
                .start({ x: re }),
              r(U).set({ visibility: "", x: x.from }).add(I).start({ x: x.to }),
              (m.shifted = U))
            : (h.infinite &&
                m.shifted &&
                (r(m.shifted).set({ visibility: "", x: ee }),
                (m.shifted = null)),
              r(m.slides).set({ visibility: "" }).add(I).start({ x: re }));
          function k() {
            (p = e(c[m.index].els)),
              (Z = m.slides.not(p)),
              K !== "slide" && (z.visibility = "hidden"),
              r(Z).set(z);
          }
        }
        function H(m, V) {
          var h = e.data(V, u);
          if (h) {
            if (ce(h)) return te(h);
            s && ge(h) && te(h);
          }
        }
        function te(m) {
          var V = 1,
            h = 0,
            c = 0,
            S = 0,
            x = m.maskWidth,
            P = x - m.config.edge;
          P < 0 && (P = 0),
            (m.anchors = [{ els: [], x: 0, width: 0 }]),
            m.slides.each(function (re, z) {
              c - h > P &&
                (V++,
                (h += x),
                (m.anchors[V - 1] = { els: [], x: c, width: 0 })),
                (S = e(z).outerWidth(!0)),
                (c += S),
                (m.anchors[V - 1].width += S),
                m.anchors[V - 1].els.push(z);
              var p = re + 1 + " of " + m.slides.length;
              e(z).attr("aria-label", p), e(z).attr("role", "group");
            }),
            (m.endX = c),
            s && (m.pages = null),
            m.nav.length && m.pages !== V && ((m.pages = V), ne(m));
          var ee = m.index;
          ee >= V && (ee = V - 1), X(m, { immediate: !0, index: ee });
        }
        function ne(m) {
          var V = [],
            h,
            c = m.el.attr("data-nav-spacing");
          c && (c = parseFloat(c) + "px");
          for (var S = 0, x = m.pages; S < x; S++)
            (h = e(l)),
              h
                .attr("aria-label", "Show slide " + (S + 1) + " of " + x)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              m.nav.hasClass("w-num") && h.text(S + 1),
              c != null && h.css({ "margin-left": c, "margin-right": c }),
              V.push(h);
          m.nav.empty().append(V);
        }
        function ce(m) {
          var V = m.mask.width();
          return m.maskWidth !== V ? ((m.maskWidth = V), !0) : !1;
        }
        function ge(m) {
          var V = 0;
          return (
            m.slides.each(function (h, c) {
              V += e(c).outerWidth(!0);
            }),
            m.slidesWidth !== V ? ((m.slidesWidth = V), !0) : !1
          );
        }
        return n;
      })
    );
  });
  var Qv = d((QG, Yv) => {
    "use strict";
    var Et = Ce(),
      GF = Lt();
    Et.define(
      "tabs",
      (Yv.exports = function (e) {
        var t = {},
          n = e.tram,
          r = e(document),
          i,
          o,
          s = Et.env,
          a = s.safari,
          u = s(),
          l = "data-w-tab",
          _ = "data-w-pane",
          v = ".w-tabs",
          g = "w--current",
          y = "w--tab-active",
          b = GF.triggers,
          T = !1;
        (t.ready = t.design = t.preview = R),
          (t.redraw = function () {
            (T = !0), R(), (T = !1);
          }),
          (t.destroy = function () {
            (i = r.find(v)), i.length && (i.each(C), w());
          });
        function R() {
          (o = u && Et.env("design")),
            (i = r.find(v)),
            i.length &&
              (i.each(D), Et.env("preview") && !T && i.each(C), w(), L());
        }
        function w() {
          Et.redraw.off(t.redraw);
        }
        function L() {
          Et.redraw.on(t.redraw);
        }
        function C(W, O) {
          var E = e.data(O, v);
          E &&
            (E.links && E.links.each(b.reset),
            E.panes && E.panes.each(b.reset));
        }
        function D(W, O) {
          var E = v.substr(1) + "-" + W,
            F = e(O),
            X = e.data(O, v);
          if (
            (X || (X = e.data(O, v, { el: F, config: {} })),
            (X.current = null),
            (X.tabIdentifier = E + "-" + l),
            (X.paneIdentifier = E + "-" + _),
            (X.menu = F.children(".w-tab-menu")),
            (X.links = X.menu.children(".w-tab-link")),
            (X.content = F.children(".w-tab-content")),
            (X.panes = X.content.children(".w-tab-pane")),
            X.el.off(v),
            X.links.off(v),
            X.menu.attr("role", "tablist"),
            X.links.attr("tabindex", "-1"),
            q(X),
            !o)
          ) {
            X.links.on("click" + v, j(X)), X.links.on("keydown" + v, Y(X));
            var H = X.links.filter("." + g),
              te = H.attr(l);
            te && Q(X, { tab: te, immediate: !0 });
          }
        }
        function q(W) {
          var O = {};
          O.easing = W.el.attr("data-easing") || "ease";
          var E = parseInt(W.el.attr("data-duration-in"), 10);
          E = O.intro = E === E ? E : 0;
          var F = parseInt(W.el.attr("data-duration-out"), 10);
          (F = O.outro = F === F ? F : 0),
            (O.immediate = !E && !F),
            (W.config = O);
        }
        function M(W) {
          var O = W.current;
          return Array.prototype.findIndex.call(
            W.links,
            (E) => E.getAttribute(l) === O,
            null
          );
        }
        function j(W) {
          return function (O) {
            O.preventDefault();
            var E = O.currentTarget.getAttribute(l);
            E && Q(W, { tab: E });
          };
        }
        function Y(W) {
          return function (O) {
            var E = M(W),
              F = O.key,
              X = {
                ArrowLeft: E - 1,
                ArrowUp: E - 1,
                ArrowRight: E + 1,
                ArrowDown: E + 1,
                End: W.links.length - 1,
                Home: 0,
              };
            if (F in X) {
              O.preventDefault();
              var H = X[F];
              H === -1 && (H = W.links.length - 1),
                H === W.links.length && (H = 0);
              var te = W.links[H],
                ne = te.getAttribute(l);
              ne && Q(W, { tab: ne });
            }
          };
        }
        function Q(W, O) {
          O = O || {};
          var E = W.config,
            F = E.easing,
            X = O.tab;
          if (X !== W.current) {
            W.current = X;
            var H;
            W.links.each(function (h, c) {
              var S = e(c);
              if (O.immediate || E.immediate) {
                var x = W.panes[h];
                c.id || (c.id = W.tabIdentifier + "-" + h),
                  x.id || (x.id = W.paneIdentifier + "-" + h),
                  (c.href = "#" + x.id),
                  c.setAttribute("role", "tab"),
                  c.setAttribute("aria-controls", x.id),
                  c.setAttribute("aria-selected", "false"),
                  x.setAttribute("role", "tabpanel"),
                  x.setAttribute("aria-labelledby", c.id);
              }
              c.getAttribute(l) === X
                ? ((H = c),
                  S.addClass(g)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(b.intro))
                : S.hasClass(g) &&
                  S.removeClass(g)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(b.outro);
            });
            var te = [],
              ne = [];
            W.panes.each(function (h, c) {
              var S = e(c);
              c.getAttribute(l) === X
                ? te.push(c)
                : S.hasClass(y) && ne.push(c);
            });
            var ce = e(te),
              ge = e(ne);
            if (O.immediate || E.immediate) {
              ce.addClass(y).each(b.intro),
                ge.removeClass(y),
                T || Et.redraw.up();
              return;
            } else {
              var m = window.scrollX,
                V = window.scrollY;
              H.focus(), window.scrollTo(m, V);
            }
            ge.length && E.outro
              ? (ge.each(b.outro),
                n(ge)
                  .add("opacity " + E.outro + "ms " + F, { fallback: a })
                  .start({ opacity: 0 })
                  .then(() => J(E, ge, ce)))
              : J(E, ge, ce);
          }
        }
        function J(W, O, E) {
          if (
            (O.removeClass(y).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }),
            E.addClass(y).each(b.intro),
            Et.redraw.up(),
            !W.intro)
          )
            return n(E).set({ opacity: 1 });
          n(E)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + W.intro + "ms " + W.easing, { fallback: a })
            .start({ opacity: 1 });
        }
        return t;
      })
    );
  });
  va();
  ya();
  Ca();
  Pa();
  Da();
  qa();
  Lt();
  Lv();
  Nv();
  Mv();
  qv();
  Xv();
  Wv();
  Bv();
  jv();
  Qv();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec03044b4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec03044b4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711483057227,
    },
    "e-2": {
      id: "e-2",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-529",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec03044b4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec03044b4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711483057228,
    },
    "e-3": {
      id: "e-3",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-4",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec03044b5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec03044b5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711484503875,
    },
    "e-4": {
      id: "e-4",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-3",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec03044b5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec03044b5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711484503875,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-534",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".accordion-item-trigger",
        originalId:
          "63d2c94b125a1b8ca1fbf068|4a77ad99-4217-8e5c-f19e-cd1f81e34dce",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".accordion-item-trigger",
          originalId:
            "63d2c94b125a1b8ca1fbf068|4a77ad99-4217-8e5c-f19e-cd1f81e34dce",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620228530328,
    },
    "e-6": {
      id: "e-6",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".accordion-item-trigger",
        originalId:
          "63d2c94b125a1b8ca1fbf068|4a77ad99-4217-8e5c-f19e-cd1f81e34dce",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".accordion-item-trigger",
          originalId:
            "63d2c94b125a1b8ca1fbf068|4a77ad99-4217-8e5c-f19e-cd1f81e34dce",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620228530334,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-526",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec03044ea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec03044ea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711986707685,
    },
    "e-20": {
      id: "e-20",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-530",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec03044ea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec03044ea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711986707685,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-527",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec03044eb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec03044eb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711986707685,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-522",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec03044eb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec03044eb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711986707685,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-24",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec0304518",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec0304518",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711986905081,
    },
    "e-24": {
      id: "e-24",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-523",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec0304518",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec0304518",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711986905081,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-26",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec0304519",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec0304519",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711986905081,
    },
    "e-26": {
      id: "e-26",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-25",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec0304519",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec0304519",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711986905081,
    },
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-28",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec0304540",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec0304540",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711989242352,
    },
    "e-28": {
      id: "e-28",
      name: "",
      animationType: "preset",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-27",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec0304540",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec0304540",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711989242352,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec0304541",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec0304541",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711989242352,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "3ca82213-b53a-997a-3841-b55ec0304541",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "3ca82213-b53a-997a-3841-b55ec0304541",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1711989242352,
    },
    "e-31": {
      id: "e-31",
      name: "",
      animationType: "custom",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-32",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|9fdc8eb4-58ea-deb0-f752-b0ea3ece7ad0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|9fdc8eb4-58ea-deb0-f752-b0ea3ece7ad0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005402497,
    },
    "e-32": {
      id: "e-32",
      name: "",
      animationType: "custom",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-31",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|9fdc8eb4-58ea-deb0-f752-b0ea3ece7ad0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|9fdc8eb4-58ea-deb0-f752-b0ea3ece7ad0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005402497,
    },
    "e-33": {
      id: "e-33",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-34",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|bd65a7b0-a113-c5e5-8024-19178643ac0b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|bd65a7b0-a113-c5e5-8024-19178643ac0b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005528725,
    },
    "e-34": {
      id: "e-34",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-33",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|bd65a7b0-a113-c5e5-8024-19178643ac0b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|bd65a7b0-a113-c5e5-8024-19178643ac0b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005528725,
    },
    "e-35": {
      id: "e-35",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-36",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|543b6606-22e5-cf06-e995-206acedbf93d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|543b6606-22e5-cf06-e995-206acedbf93d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005529296,
    },
    "e-36": {
      id: "e-36",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-35",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|543b6606-22e5-cf06-e995-206acedbf93d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|543b6606-22e5-cf06-e995-206acedbf93d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005529296,
    },
    "e-37": {
      id: "e-37",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-38",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|78884fd8-b959-6038-54a2-a8d5661afb04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|78884fd8-b959-6038-54a2-a8d5661afb04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005529637,
    },
    "e-38": {
      id: "e-38",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-37",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|78884fd8-b959-6038-54a2-a8d5661afb04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|78884fd8-b959-6038-54a2-a8d5661afb04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005529637,
    },
    "e-39": {
      id: "e-39",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-40",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|3e785ad0-5005-19be-f79c-ac1dd7ccb740",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|3e785ad0-5005-19be-f79c-ac1dd7ccb740",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005529931,
    },
    "e-40": {
      id: "e-40",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-39",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|3e785ad0-5005-19be-f79c-ac1dd7ccb740",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|3e785ad0-5005-19be-f79c-ac1dd7ccb740",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005529931,
    },
    "e-41": {
      id: "e-41",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_ACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-42",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|e255c588-cb37-4256-0f61-cd58b7df4d20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|e255c588-cb37-4256-0f61-cd58b7df4d20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005530494,
    },
    "e-42": {
      id: "e-42",
      name: "",
      animationType: "preset",
      eventTypeId: "TAB_INACTIVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-41",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|e255c588-cb37-4256-0f61-cd58b7df4d20",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|e255c588-cb37-4256-0f61-cd58b7df4d20",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712005530494,
    },
    "e-43": {
      id: "e-43",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-44",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|dacb4d35-d107-c46b-56d7-ce34cb412ecb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|dacb4d35-d107-c46b-56d7-ce34cb412ecb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712077957924,
    },
    "e-44": {
      id: "e-44",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-43",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|dacb4d35-d107-c46b-56d7-ce34cb412ecb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|dacb4d35-d107-c46b-56d7-ce34cb412ecb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712077957925,
    },
    "e-45": {
      id: "e-45",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-46",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6e|3a6f89a7-abf5-e0c0-2e7e-23faa5ac1780",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6e|3a6f89a7-abf5-e0c0-2e7e-23faa5ac1780",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712079799619,
    },
    "e-46": {
      id: "e-46",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-45",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6e|3a6f89a7-abf5-e0c0-2e7e-23faa5ac1780",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6e|3a6f89a7-abf5-e0c0-2e7e-23faa5ac1780",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712079799619,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f69",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 33,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712091674806,
    },
    "e-50": {
      id: "e-50",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712091913356,
    },
    "e-51": {
      id: "e-51",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f66",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712091926092,
    },
    "e-52": {
      id: "e-52",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f67",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f67",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712091949616,
    },
    "e-53": {
      id: "e-53",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712091962623,
    },
    "e-54": {
      id: "e-54",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712091974950,
    },
    "e-55": {
      id: "e-55",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6a",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712091988839,
    },
    "e-56": {
      id: "e-56",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6c",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712092012052,
    },
    "e-57": {
      id: "e-57",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6d",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712092024645,
    },
    "e-58": {
      id: "e-58",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712092052611,
    },
    "e-59": {
      id: "e-59",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-73", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f65",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f65",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-73-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1712092067345,
    },
    "e-62": {
      id: "e-62",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-63",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|9570a86f-0f10-6106-b9b5-d986cbe38bb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|9570a86f-0f10-6106-b9b5-d986cbe38bb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712201794840,
    },
    "e-63": {
      id: "e-63",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-62",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|9570a86f-0f10-6106-b9b5-d986cbe38bb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|9570a86f-0f10-6106-b9b5-d986cbe38bb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712201794840,
    },
    "e-70": {
      id: "e-70",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-71",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|0234d1da-0934-0b7f-a541-e3d53c67d904",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|0234d1da-0934-0b7f-a541-e3d53c67d904",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712201978860,
    },
    "e-71": {
      id: "e-71",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-70",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|0234d1da-0934-0b7f-a541-e3d53c67d904",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|0234d1da-0934-0b7f-a541-e3d53c67d904",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712201978860,
    },
    "e-76": {
      id: "e-76",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-77" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|5e27abbc-73c5-a5da-4823-50e974b1c6e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|5e27abbc-73c5-a5da-4823-50e974b1c6e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712203707739,
    },
    "e-78": {
      id: "e-78",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-79" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|c58f5b60-b783-05ef-b94f-5ebbffeea910",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|c58f5b60-b783-05ef-b94f-5ebbffeea910",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712203721561,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-81" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|b3fe3afb-7d88-30e1-9863-8a74499ec160",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|b3fe3afb-7d88-30e1-9863-8a74499ec160",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712203740753,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-83" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|3cd19f23-a3d3-3f2e-f98f-868de639a61c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|3cd19f23-a3d3-3f2e-f98f-868de639a61c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 500,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712203765302,
    },
    "e-84": {
      id: "e-84",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-85" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|fee8b131-26f6-0b6b-6c7c-faa70d2605e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|fee8b131-26f6-0b6b-6c7c-faa70d2605e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712203779811,
    },
    "e-86": {
      id: "e-86",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-87" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|6025e05e-3c83-ebcb-63cb-0b4ac1668c48",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|6025e05e-3c83-ebcb-63cb-0b4ac1668c48",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712203819866,
    },
    "e-88": {
      id: "e-88",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-89" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|31fff0e0-2c5a-be96-959a-6dcb098a9f08",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|31fff0e0-2c5a-be96-959a-6dcb098a9f08",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712203840938,
    },
    "e-90": {
      id: "e-90",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-91" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|6f3ed020-7d66-f75b-003a-bb09d6e4e715",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|6f3ed020-7d66-f75b-003a-bb09d6e4e715",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712203868472,
    },
    "e-92": {
      id: "e-92",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-93" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|56efdca9-f4bd-888f-b4ea-bf32e2015651",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|56efdca9-f4bd-888f-b4ea-bf32e2015651",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712203925119,
    },
    "e-94": {
      id: "e-94",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-95" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|bf52c3f7-ca59-21df-c8ca-cde6eafa3d8e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|bf52c3f7-ca59-21df-c8ca-cde6eafa3d8e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712203963667,
    },
    "e-96": {
      id: "e-96",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-97" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|cf88ffa8-5862-34dd-4c71-a8c23e07f577",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|cf88ffa8-5862-34dd-4c71-a8c23e07f577",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712203987041,
    },
    "e-98": {
      id: "e-98",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-99" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|f402cfb7-ec22-0e2e-74a2-31dbb5e92d2e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|f402cfb7-ec22-0e2e-74a2-31dbb5e92d2e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204002751,
    },
    "e-100": {
      id: "e-100",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-101" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|b63020cf-e400-590f-1e1c-7fa8db66277a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|b63020cf-e400-590f-1e1c-7fa8db66277a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1000,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204014431,
    },
    "e-104": {
      id: "e-104",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-105" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|dfc062af-a362-c5a8-e1bc-54551eeecf7d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|dfc062af-a362-c5a8-e1bc-54551eeecf7d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204107110,
    },
    "e-106": {
      id: "e-106",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-107" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|7f923073-4863-39d8-fdc6-355d16413e66",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|7f923073-4863-39d8-fdc6-355d16413e66",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204117126,
    },
    "e-108": {
      id: "e-108",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-109" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|aa15fc3a-ab81-c1a0-30be-e46a5aad2ebc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|aa15fc3a-ab81-c1a0-30be-e46a5aad2ebc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204127037,
    },
    "e-110": {
      id: "e-110",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-111" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|684628c0-5f0d-c3a9-e0b8-9126ff1515e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|684628c0-5f0d-c3a9-e0b8-9126ff1515e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204145439,
    },
    "e-112": {
      id: "e-112",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-113" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|0bec7227-74b5-8e4b-4b6f-41da6ae5a569",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|0bec7227-74b5-8e4b-4b6f-41da6ae5a569",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1000,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204156225,
    },
    "e-114": {
      id: "e-114",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-115" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|e07bf1e6-9954-e76e-07b6-12e174536708",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|e07bf1e6-9954-e76e-07b6-12e174536708",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204169567,
    },
    "e-116": {
      id: "e-116",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-117" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|1f43575f-6d7b-61d4-5222-b07d0db7c81e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|1f43575f-6d7b-61d4-5222-b07d0db7c81e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204215758,
    },
    "e-118": {
      id: "e-118",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-119" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|62518106-4784-6dbe-5ed2-71896f6be019",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|62518106-4784-6dbe-5ed2-71896f6be019",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204224471,
    },
    "e-122": {
      id: "e-122",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-123" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|49ff55d0-fe53-8f56-7fad-257fb274f5a0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|49ff55d0-fe53-8f56-7fad-257fb274f5a0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204444403,
    },
    "e-124": {
      id: "e-124",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-125" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|0d4d66ce-c1e2-8885-1ff8-bdf785e6ce25",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|0d4d66ce-c1e2-8885-1ff8-bdf785e6ce25",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204460332,
    },
    "e-126": {
      id: "e-126",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-127" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|3a38dd7f-bd9a-0206-d91c-cb95da8396f3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|3a38dd7f-bd9a-0206-d91c-cb95da8396f3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204488164,
    },
    "e-128": {
      id: "e-128",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-129" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|c914e1a2-f701-a5b2-cd91-412cab748327",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|c914e1a2-f701-a5b2-cd91-412cab748327",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204501332,
    },
    "e-130": {
      id: "e-130",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-131" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|421085ee-c11f-0a54-8085-9efee2a1ebf5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|421085ee-c11f-0a54-8085-9efee2a1ebf5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204517276,
    },
    "e-132": {
      id: "e-132",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-133" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|73d54692-8623-2d24-b31b-4c07657ea5df",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|73d54692-8623-2d24-b31b-4c07657ea5df",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 300,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204525288,
    },
    "e-134": {
      id: "e-134",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-135" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|3345658a-ddcc-aded-2365-e00c22de9b69",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|3345658a-ddcc-aded-2365-e00c22de9b69",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204574307,
    },
    "e-136": {
      id: "e-136",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-137" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|bf7d0277-88f9-3745-7e1c-c2200487a2a6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|bf7d0277-88f9-3745-7e1c-c2200487a2a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204586498,
    },
    "e-138": {
      id: "e-138",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-139" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|c59fc30f-87f3-5a26-0e5e-063045cbf2a4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|c59fc30f-87f3-5a26-0e5e-063045cbf2a4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204627313,
    },
    "e-140": {
      id: "e-140",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-141" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|a84b7d10-071d-09c4-db4d-309f115a945e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|a84b7d10-071d-09c4-db4d-309f115a945e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204639234,
    },
    "e-142": {
      id: "e-142",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-143" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|e630ec4d-6e66-38e3-f5b0-cf336394439e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|e630ec4d-6e66-38e3-f5b0-cf336394439e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204655202,
    },
    "e-144": {
      id: "e-144",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-145" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|8d62902e-c17f-f532-47e5-b986f6a7403b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|8d62902e-c17f-f532-47e5-b986f6a7403b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204667235,
    },
    "e-146": {
      id: "e-146",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-147" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|84c17b91-58f7-cf9b-adc1-bc634795421c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|84c17b91-58f7-cf9b-adc1-bc634795421c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1000,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204709100,
    },
    "e-148": {
      id: "e-148",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-149" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|657c1af9-7910-6a5e-7f13-c96eb517de57",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|657c1af9-7910-6a5e-7f13-c96eb517de57",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204737048,
    },
    "e-150": {
      id: "e-150",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-151" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|8ce9b7a4-cb00-2365-35d2-5b2e588e7d2c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|8ce9b7a4-cb00-2365-35d2-5b2e588e7d2c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204745309,
    },
    "e-152": {
      id: "e-152",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-153" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|1ceed8b9-ab1a-f451-0e64-57c3aed8f520",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|1ceed8b9-ab1a-f451-0e64-57c3aed8f520",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712204766205,
    },
    "e-154": {
      id: "e-154",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-155" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|d2c42bc0-1eb4-263d-9fa9-28c2bb670bb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|d2c42bc0-1eb4-263d-9fa9-28c2bb670bb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204852856,
    },
    "e-156": {
      id: "e-156",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-157" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|28923fc7-a10d-6e2d-1b31-4616e594bb2a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|28923fc7-a10d-6e2d-1b31-4616e594bb2a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204869133,
    },
    "e-168": {
      id: "e-168",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-169" },
      },
      mediaQueries: ["main"],
      target: {
        id: "bfd4424b-21c0-e75b-353b-7273d7fd73c6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "bfd4424b-21c0-e75b-353b-7273d7fd73c6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204987087,
    },
    "e-170": {
      id: "e-170",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-171" },
      },
      mediaQueries: ["main"],
      target: {
        id: "bfd4424b-21c0-e75b-353b-7273d7fd73da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "bfd4424b-21c0-e75b-353b-7273d7fd73da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712204998099,
    },
    "e-172": {
      id: "e-172",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-173" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|5c988b4c-cea6-d65a-752f-2fe6c339d740",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|5c988b4c-cea6-d65a-752f-2fe6c339d740",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205007097,
    },
    "e-174": {
      id: "e-174",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-175" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|095c7972-6cd6-1be1-1572-86006344cb68",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|095c7972-6cd6-1be1-1572-86006344cb68",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205026273,
    },
    "e-176": {
      id: "e-176",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-177" },
      },
      mediaQueries: ["main"],
      target: {
        id: "5772e94b-310b-1af7-3336-b2868ec81acd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5772e94b-310b-1af7-3336-b2868ec81acd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205047463,
    },
    "e-178": {
      id: "e-178",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-179" },
      },
      mediaQueries: ["main"],
      target: {
        id: "5772e94b-310b-1af7-3336-b2868ec81acf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5772e94b-310b-1af7-3336-b2868ec81acf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205058356,
    },
    "e-180": {
      id: "e-180",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-181" },
      },
      mediaQueries: ["main"],
      target: {
        id: "5772e94b-310b-1af7-3336-b2868ec81adf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5772e94b-310b-1af7-3336-b2868ec81adf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205068138,
    },
    "e-182": {
      id: "e-182",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-183" },
      },
      mediaQueries: ["main"],
      target: {
        id: "5772e94b-310b-1af7-3336-b2868ec81aed",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5772e94b-310b-1af7-3336-b2868ec81aed",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205076295,
    },
    "e-184": {
      id: "e-184",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-185" },
      },
      mediaQueries: ["main"],
      target: {
        id: "5772e94b-310b-1af7-3336-b2868ec81af7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5772e94b-310b-1af7-3336-b2868ec81af7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1000,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205092262,
    },
    "e-186": {
      id: "e-186",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-187" },
      },
      mediaQueries: ["main"],
      target: {
        id: "5772e94b-310b-1af7-3336-b2868ec81b07",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5772e94b-310b-1af7-3336-b2868ec81b07",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205109034,
    },
    "e-188": {
      id: "e-188",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-189" },
      },
      mediaQueries: ["main"],
      target: {
        id: "d43416da-b48e-35b1-7ea9-7db1bc36d5c9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "d43416da-b48e-35b1-7ea9-7db1bc36d5c9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205251411,
    },
    "e-190": {
      id: "e-190",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-191" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|7258fa5b-3c54-20cc-49b2-1e9cdebbc2c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|7258fa5b-3c54-20cc-49b2-1e9cdebbc2c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205386872,
    },
    "e-192": {
      id: "e-192",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-193" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603ae7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603ae7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205404850,
    },
    "e-194": {
      id: "e-194",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-195" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603ae8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603ae8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205416416,
    },
    "e-196": {
      id: "e-196",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-197" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603af2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603af2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205426218,
    },
    "e-198": {
      id: "e-198",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-199" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603afa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603afa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205433852,
    },
    "e-200": {
      id: "e-200",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-201" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603afd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603afd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205450163,
    },
    "e-202": {
      id: "e-202",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-203" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603afe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|f756a008-8f2e-56fd-bff9-06a7c6603afe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205461673,
    },
    "e-206": {
      id: "e-206",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-207" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f66|28841ea3-78f3-7ac6-e9df-00d9fedf5957",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|28841ea3-78f3-7ac6-e9df-00d9fedf5957",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205479576,
    },
    "e-208": {
      id: "e-208",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-209" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|e7604ef8-2887-df30-4c4d-969a5f1d70ee",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|e7604ef8-2887-df30-4c4d-969a5f1d70ee",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205498466,
    },
    "e-210": {
      id: "e-210",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-211" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|f7830aca-c559-55b9-28d1-45fc439d9574",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|f7830aca-c559-55b9-28d1-45fc439d9574",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205509985,
    },
    "e-212": {
      id: "e-212",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-213" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|f7830aca-c559-55b9-28d1-45fc439d9573",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|f7830aca-c559-55b9-28d1-45fc439d9573",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205524171,
    },
    "e-214": {
      id: "e-214",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-215" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|1d226532-d6b5-14cd-3325-fd47091b064f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|1d226532-d6b5-14cd-3325-fd47091b064f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205537089,
    },
    "e-216": {
      id: "e-216",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-217" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|1d226532-d6b5-14cd-3325-fd47091b0650",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|1d226532-d6b5-14cd-3325-fd47091b0650",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205549218,
    },
    "e-218": {
      id: "e-218",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-219" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|d2b1597e-2b18-9eb7-9df2-ba1519c7d1a2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|d2b1597e-2b18-9eb7-9df2-ba1519c7d1a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205589401,
    },
    "e-220": {
      id: "e-220",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-221" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|c9d75a05-3de6-7820-f640-a63104f09767",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|c9d75a05-3de6-7820-f640-a63104f09767",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205596526,
    },
    "e-222": {
      id: "e-222",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-223" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|37bd5fc0-1b18-ea34-e952-a6e57cbc6a10",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|37bd5fc0-1b18-ea34-e952-a6e57cbc6a10",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205612126,
    },
    "e-226": {
      id: "e-226",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-227" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|fe8b05ac-6cf0-e74a-4fa8-b53fa7454601",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|fe8b05ac-6cf0-e74a-4fa8-b53fa7454601",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205634271,
    },
    "e-228": {
      id: "e-228",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-229" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|fe8b05ac-6cf0-e74a-4fa8-b53fa745460d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|fe8b05ac-6cf0-e74a-4fa8-b53fa745460d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205650273,
    },
    "e-230": {
      id: "e-230",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-231" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|9e1cb1b3-e1a9-339c-3e55-4f935fa508c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|9e1cb1b3-e1a9-339c-3e55-4f935fa508c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205659778,
    },
    "e-232": {
      id: "e-232",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-233" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|9e1cb1b3-e1a9-339c-3e55-4f935fa508d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|9e1cb1b3-e1a9-339c-3e55-4f935fa508d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205671296,
    },
    "e-234": {
      id: "e-234",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-235" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f69|e7604ef8-2887-df30-4c4d-969a5f1d70ee",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|e7604ef8-2887-df30-4c4d-969a5f1d70ee",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205756277,
    },
    "e-236": {
      id: "e-236",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-237" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f69|44b360ef-95b6-22f7-be60-33ced6f73737",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|44b360ef-95b6-22f7-be60-33ced6f73737",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205782549,
    },
    "e-238": {
      id: "e-238",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-239" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f69|5a6577d6-5e9b-88eb-69cf-303c3fa2bcf6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|5a6577d6-5e9b-88eb-69cf-303c3fa2bcf6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205793426,
    },
    "e-240": {
      id: "e-240",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-241" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f69|18e05a15-fe39-20b5-f0c5-f72ab868a150",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|18e05a15-fe39-20b5-f0c5-f72ab868a150",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205803566,
    },
    "e-246": {
      id: "e-246",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-247" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f69|497a6ce0-c7f9-567a-8f10-3c0e376a13bc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|497a6ce0-c7f9-567a-8f10-3c0e376a13bc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205857330,
    },
    "e-248": {
      id: "e-248",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-249" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f69|45967574-6d17-079b-b297-8bb5cafd5187",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|45967574-6d17-079b-b297-8bb5cafd5187",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205868764,
    },
    "e-250": {
      id: "e-250",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-251" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f69|d5b6f587-7e0b-634f-57ca-94eed050f57a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|d5b6f587-7e0b-634f-57ca-94eed050f57a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205878521,
    },
    "e-252": {
      id: "e-252",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-253" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f69|6daccaf0-f483-5b1d-61f7-7148e4707a7b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|6daccaf0-f483-5b1d-61f7-7148e4707a7b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712205895513,
    },
    "e-254": {
      id: "e-254",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-255" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f69|9329a0cd-6cbd-a4f5-f802-9779e1d6a817",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|9329a0cd-6cbd-a4f5-f802-9779e1d6a817",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205926357,
    },
    "e-256": {
      id: "e-256",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-257" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f67|b5332dc4-5802-36bc-de04-e73d9caa5a9b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f67|b5332dc4-5802-36bc-de04-e73d9caa5a9b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712205995170,
    },
    "e-258": {
      id: "e-258",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-259" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f67|b5332dc4-5802-36bc-de04-e73d9caa5a9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f67|b5332dc4-5802-36bc-de04-e73d9caa5a9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712206003794,
    },
    "e-260": {
      id: "e-260",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-261" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f67|1a5b52de-00ec-bf51-8204-dcb08be32e94",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f67|1a5b52de-00ec-bf51-8204-dcb08be32e94",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712206022074,
    },
    "e-262": {
      id: "e-262",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-263" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f67|7df9c061-d208-c887-72a5-e09c4d8b6195",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f67|7df9c061-d208-c887-72a5-e09c4d8b6195",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712206048949,
    },
    "e-264": {
      id: "e-264",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-265" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|b5332dc4-5802-36bc-de04-e73d9caa5a9c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|b5332dc4-5802-36bc-de04-e73d9caa5a9c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712206761624,
    },
    "e-266": {
      id: "e-266",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-267" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|0e82271d-f88e-e55f-cf79-21c3accfcd03",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|0e82271d-f88e-e55f-cf79-21c3accfcd03",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712206772558,
    },
    "e-270": {
      id: "e-270",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-271" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6b|c0054102-de20-343f-6420-05621c54d4b7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6b|c0054102-de20-343f-6420-05621c54d4b7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712206813149,
    },
    "e-272": {
      id: "e-272",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-273" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6b|72d54b8e-5bed-0251-6d42-3effbb0c2926",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6b|72d54b8e-5bed-0251-6d42-3effbb0c2926",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712206822626,
    },
    "e-274": {
      id: "e-274",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-275" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6b|da80041e-d412-a3ba-f01b-a51b152baf46",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6b|da80041e-d412-a3ba-f01b-a51b152baf46",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712206850630,
    },
    "e-276": {
      id: "e-276",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-277" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6b|550fcffe-e9b5-edd7-bc49-cb0c3b9f1dcc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6b|550fcffe-e9b5-edd7-bc49-cb0c3b9f1dcc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712206966251,
    },
    "e-278": {
      id: "e-278",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-279" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6a|b5332dc4-5802-36bc-de04-e73d9caa5a9c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6a|b5332dc4-5802-36bc-de04-e73d9caa5a9c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712206983887,
    },
    "e-288": {
      id: "e-288",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-289" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|c0054102-de20-343f-6420-05621c54d4b7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|c0054102-de20-343f-6420-05621c54d4b7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712207094947,
    },
    "e-290": {
      id: "e-290",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-291" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|72d54b8e-5bed-0251-6d42-3effbb0c2926",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|72d54b8e-5bed-0251-6d42-3effbb0c2926",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712207104576,
    },
    "e-292": {
      id: "e-292",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-293" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|150d274a-aa3c-6620-15ce-d2cbf57e70e6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|150d274a-aa3c-6620-15ce-d2cbf57e70e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712207176474,
    },
    "e-294": {
      id: "e-294",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-295" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|0826b4cd-f245-9459-db0d-bd4a2f483271",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|0826b4cd-f245-9459-db0d-bd4a2f483271",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712207198844,
    },
    "e-296": {
      id: "e-296",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-297" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|22af0df0-b7af-47d1-79ab-417bd3067b03",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|22af0df0-b7af-47d1-79ab-417bd3067b03",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712207232061,
    },
    "e-298": {
      id: "e-298",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-299" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|edabd926-af72-102b-4860-205398a3b052",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|edabd926-af72-102b-4860-205398a3b052",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712207242624,
    },
    "e-300": {
      id: "e-300",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-301" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|99ec436d-7fdd-2a9b-3b5a-ca7897d70ef3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|99ec436d-7fdd-2a9b-3b5a-ca7897d70ef3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712207252823,
    },
    "e-302": {
      id: "e-302",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-303" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|54bdf5f0-c75e-0e38-d1d6-56cd8b7722f0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|54bdf5f0-c75e-0e38-d1d6-56cd8b7722f0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712207265558,
    },
    "e-304": {
      id: "e-304",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-305" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6c|82076760-3e67-8c28-ae4f-75c4994599ab",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c|82076760-3e67-8c28-ae4f-75c4994599ab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712207280409,
    },
    "e-306": {
      id: "e-306",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-307" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|c0054102-de20-343f-6420-05621c54d4b7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|c0054102-de20-343f-6420-05621c54d4b7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712208083351,
    },
    "e-308": {
      id: "e-308",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-309" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|d47e0fcd-8af7-08be-48a0-6b92859ca7d5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|d47e0fcd-8af7-08be-48a0-6b92859ca7d5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712208106872,
    },
    "e-312": {
      id: "e-312",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-313" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|3c801cbe-5d84-af3b-0907-93a7bc84103b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|3c801cbe-5d84-af3b-0907-93a7bc84103b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712208205764,
    },
    "e-314": {
      id: "e-314",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-315" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|553ca40a-c34c-a1a4-49ce-90be40bda9ef",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|553ca40a-c34c-a1a4-49ce-90be40bda9ef",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712208232520,
    },
    "e-316": {
      id: "e-316",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-317" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|3e62326d-a449-fe28-8762-d657cfd7a957",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|3e62326d-a449-fe28-8762-d657cfd7a957",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712208251653,
    },
    "e-318": {
      id: "e-318",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-319" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|f18aa515-7205-96b4-8841-bd0ac10f71d2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|f18aa515-7205-96b4-8841-bd0ac10f71d2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712208262087,
    },
    "e-320": {
      id: "e-320",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-321" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|1776e665-256c-ac4b-7c28-9e19f8657769",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|1776e665-256c-ac4b-7c28-9e19f8657769",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712208272618,
    },
    "e-322": {
      id: "e-322",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-323" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|5f22d7f8-8083-4e21-71ac-c1b44b14a709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|5f22d7f8-8083-4e21-71ac-c1b44b14a709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712208283778,
    },
    "e-324": {
      id: "e-324",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-325" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|d542bd5c-bd91-2bc9-94e8-465742ea497a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|d542bd5c-bd91-2bc9-94e8-465742ea497a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712208305158,
    },
    "e-326": {
      id: "e-326",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-327" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6d|85dc1bb6-74e9-09db-5648-baf31d3a667a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|85dc1bb6-74e9-09db-5648-baf31d3a667a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712208317571,
    },
    "e-328": {
      id: "e-328",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-329" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6d|16a51a84-b04b-d2a6-7ec0-7605fa2620fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|16a51a84-b04b-d2a6-7ec0-7605fa2620fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712208342517,
    },
    "e-330": {
      id: "e-330",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-331" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6d|3d6aef59-0f49-affa-424a-7721931ad055",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d|3d6aef59-0f49-affa-424a-7721931ad055",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 700,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712208351693,
    },
    "e-334": {
      id: "e-334",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-335" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6e|a2bdeef0-4079-565f-17d4-d5f85d18d6ab",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6e|a2bdeef0-4079-565f-17d4-d5f85d18d6ab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712209996615,
    },
    "e-336": {
      id: "e-336",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-337" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f6e|3a6f89a7-abf5-e0c0-2e7e-23faa5ac177e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6e|3a6f89a7-abf5-e0c0-2e7e-23faa5ac177e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712210005673,
    },
    "e-342": {
      id: "e-342",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-343" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f65|5c6e0156-0ef5-ddda-96e0-6c74b9a6d03b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f65|5c6e0156-0ef5-ddda-96e0-6c74b9a6d03b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712210058403,
    },
    "e-361": {
      id: "e-361",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-362" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f66|2ff352d9-fba3-ef50-c7d0-fc814cb44705",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|2ff352d9-fba3-ef50-c7d0-fc814cb44705",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712320251942,
    },
    "e-363": {
      id: "e-363",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-364" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|2ff352d9-fba3-ef50-c7d0-fc814cb44707",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|2ff352d9-fba3-ef50-c7d0-fc814cb44707",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712320251942,
    },
    "e-365": {
      id: "e-365",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-366" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|88a53985-f452-f9a8-97f8-4d99b33da3e2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|88a53985-f452-f9a8-97f8-4d99b33da3e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1712325484768,
    },
    "e-367": {
      id: "e-367",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-368" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|45e38094-32d0-2a35-c4d6-7d64ed632892",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|45e38094-32d0-2a35-c4d6-7d64ed632892",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712583242764,
    },
    "e-369": {
      id: "e-369",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-370" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|b06d6917-8136-ba34-ec72-bdced0efaf49",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|b06d6917-8136-ba34-ec72-bdced0efaf49",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1712658294404,
    },
    "e-373": {
      id: "e-373",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-374",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1712926387818,
    },
    "e-378": {
      id: "e-378",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-379",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|d68127df-706a-99d6-437b-095923ce3460",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|d68127df-706a-99d6-437b-095923ce3460",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713433082304,
    },
    "e-379": {
      id: "e-379",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-378",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|d68127df-706a-99d6-437b-095923ce3460",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|d68127df-706a-99d6-437b-095923ce3460",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713433082304,
    },
    "e-380": {
      id: "e-380",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-381",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|e0734b01-382f-3e71-aa10-47f4560de31b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|e0734b01-382f-3e71-aa10-47f4560de31b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713433143745,
    },
    "e-381": {
      id: "e-381",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-380",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|e0734b01-382f-3e71-aa10-47f4560de31b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|e0734b01-382f-3e71-aa10-47f4560de31b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713433143745,
    },
    "e-382": {
      id: "e-382",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-383",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|5ecbdaa8-652c-8ddc-ebae-250a1df9a9a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|5ecbdaa8-652c-8ddc-ebae-250a1df9a9a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713433195230,
    },
    "e-383": {
      id: "e-383",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-382",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|5ecbdaa8-652c-8ddc-ebae-250a1df9a9a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|5ecbdaa8-652c-8ddc-ebae-250a1df9a9a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713433195230,
    },
    "e-384": {
      id: "e-384",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-385" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|b0896488-cff9-c69a-0e21-166e3b98ef8d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|b0896488-cff9-c69a-0e21-166e3b98ef8d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1713441702729,
    },
    "e-388": {
      id: "e-388",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-22", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-22-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1713441836684,
    },
    "e-391": {
      id: "e-391",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-392",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|9570a86f-0f10-6106-b9b5-d986cbe38bb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|9570a86f-0f10-6106-b9b5-d986cbe38bb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-392": {
      id: "e-392",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-391",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|9570a86f-0f10-6106-b9b5-d986cbe38bb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|9570a86f-0f10-6106-b9b5-d986cbe38bb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-393": {
      id: "e-393",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-394",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|0234d1da-0934-0b7f-a541-e3d53c67d904",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|0234d1da-0934-0b7f-a541-e3d53c67d904",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-394": {
      id: "e-394",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-393",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|0234d1da-0934-0b7f-a541-e3d53c67d904",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|0234d1da-0934-0b7f-a541-e3d53c67d904",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-479": {
      id: "e-479",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-480" },
      },
      mediaQueries: ["main"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|5c988b4c-cea6-d65a-752f-2fe6c339d740",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|5c988b4c-cea6-d65a-752f-2fe6c339d740",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1713441836684,
    },
    "e-498": {
      id: "e-498",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-499",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-501": {
      id: "e-501",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-502",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|d68127df-706a-99d6-437b-095923ce3460",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|d68127df-706a-99d6-437b-095923ce3460",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-502": {
      id: "e-502",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-501",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|d68127df-706a-99d6-437b-095923ce3460",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|d68127df-706a-99d6-437b-095923ce3460",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-503": {
      id: "e-503",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-504",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|e0734b01-382f-3e71-aa10-47f4560de31b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|e0734b01-382f-3e71-aa10-47f4560de31b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-504": {
      id: "e-504",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-503",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|e0734b01-382f-3e71-aa10-47f4560de31b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|e0734b01-382f-3e71-aa10-47f4560de31b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-505": {
      id: "e-505",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-506",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|5ecbdaa8-652c-8ddc-ebae-250a1df9a9a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|5ecbdaa8-652c-8ddc-ebae-250a1df9a9a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-506": {
      id: "e-506",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-505",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|5ecbdaa8-652c-8ddc-ebae-250a1df9a9a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|5ecbdaa8-652c-8ddc-ebae-250a1df9a9a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713441836684,
    },
    "e-507": {
      id: "e-507",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-508" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|b0896488-cff9-c69a-0e21-166e3b98ef8d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|b0896488-cff9-c69a-0e21-166e3b98ef8d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1713441836684,
    },
    "e-509": {
      id: "e-509",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-510",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|892de7a2-989d-c574-873e-ef9a9ebdd132",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|892de7a2-989d-c574-873e-ef9a9ebdd132",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442081346,
    },
    "e-510": {
      id: "e-510",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-509",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|892de7a2-989d-c574-873e-ef9a9ebdd132",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|892de7a2-989d-c574-873e-ef9a9ebdd132",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442081346,
    },
    "e-511": {
      id: "e-511",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-512",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|89b54d73-4b49-ff97-f993-ace5d696d916",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|89b54d73-4b49-ff97-f993-ace5d696d916",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442123095,
    },
    "e-512": {
      id: "e-512",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-511",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|89b54d73-4b49-ff97-f993-ace5d696d916",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|89b54d73-4b49-ff97-f993-ace5d696d916",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442123095,
    },
    "e-513": {
      id: "e-513",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-514",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|ea23aa79-50c7-7cba-0a17-f6f641e4a560",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|ea23aa79-50c7-7cba-0a17-f6f641e4a560",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442145684,
    },
    "e-514": {
      id: "e-514",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-513",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|ea23aa79-50c7-7cba-0a17-f6f641e4a560",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|ea23aa79-50c7-7cba-0a17-f6f641e4a560",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442145684,
    },
    "e-515": {
      id: "e-515",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-516",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|4d206311-adf3-4d69-547f-6f7606ee2fc1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|4d206311-adf3-4d69-547f-6f7606ee2fc1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442179334,
    },
    "e-516": {
      id: "e-516",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-515",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|4d206311-adf3-4d69-547f-6f7606ee2fc1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|4d206311-adf3-4d69-547f-6f7606ee2fc1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442179334,
    },
    "e-517": {
      id: "e-517",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-518",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|e1a4006c-777c-3d8f-fd02-932346221d7a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|e1a4006c-777c-3d8f-fd02-932346221d7a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442200956,
    },
    "e-518": {
      id: "e-518",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-517",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb|e1a4006c-777c-3d8f-fd02-932346221d7a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb|e1a4006c-777c-3d8f-fd02-932346221d7a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713442200956,
    },
    "e-527": {
      id: "e-527",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-523",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee9038a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee9038a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1583188059407,
    },
    "e-531": {
      id: "e-531",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-532",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee902bd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee902bd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1583183083342,
    },
    "e-532": {
      id: "e-532",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-531",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee902bd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee902bd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1583183083344,
    },
    "e-551": {
      id: "e-551",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-552",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90303",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90303",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713975411010,
    },
    "e-552": {
      id: "e-552",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-551",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90303",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90303",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713975411010,
    },
    "e-553": {
      id: "e-553",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-554",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90330",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90330",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713978947951,
    },
    "e-554": {
      id: "e-554",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-553",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90330",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90330",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713978947951,
    },
    "e-555": {
      id: "e-555",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-556",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee902bd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee902bd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979168548,
    },
    "e-556": {
      id: "e-556",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-555",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee902bd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee902bd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979168551,
    },
    "e-557": {
      id: "e-557",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-558",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90303",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90303",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979194699,
    },
    "e-558": {
      id: "e-558",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-557",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90303",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90303",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979194702,
    },
    "e-559": {
      id: "e-559",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-560",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90330",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90330",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979268962,
    },
    "e-560": {
      id: "e-560",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-559",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90330",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90330",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979268968,
    },
    "e-561": {
      id: "e-561",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-562",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90357",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90357",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979409903,
    },
    "e-562": {
      id: "e-562",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-561",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90357",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90357",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979409903,
    },
    "e-563": {
      id: "e-563",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-564",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90357",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90357",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979409903,
    },
    "e-564": {
      id: "e-564",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-563",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c28fa0ec-9ab9-0582-7a14-25dedee90357",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c28fa0ec-9ab9-0582-7a14-25dedee90357",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713979409903,
    },
    "e-581": {
      id: "e-581",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-582",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f65",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f65",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713981756475,
    },
    "e-582": {
      id: "e-582",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-581",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f65",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f65",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1713981756481,
    },
    "e-585": {
      id: "e-585",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-586",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0bd9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0bd9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-586": {
      id: "e-586",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-585",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0bd9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0bd9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-587": {
      id: "e-587",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-46",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-588",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0ca6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0ca6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-589": {
      id: "e-589",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-590",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c1f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c1f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-590": {
      id: "e-590",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-589",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c1f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c1f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-591": {
      id: "e-591",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-592",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-592": {
      id: "e-592",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-591",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-593": {
      id: "e-593",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-594",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0bd9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0bd9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-594": {
      id: "e-594",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-593",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0bd9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0bd9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-595": {
      id: "e-595",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-596",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c1f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c1f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-596": {
      id: "e-596",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-595",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c1f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c1f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-597": {
      id: "e-597",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-598",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-598": {
      id: "e-598",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-597",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-599": {
      id: "e-599",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-600",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c73",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c73",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-600": {
      id: "e-600",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-599",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c73",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c73",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-601": {
      id: "e-601",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-602",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c73",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c73",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-602": {
      id: "e-602",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-601",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c73",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "54e4f536-b0a8-ff92-ee18-c6fb2f1e0c73",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161069352,
    },
    "e-603": {
      id: "e-603",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-604",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db06709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db06709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-604": {
      id: "e-604",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-603",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db06709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db06709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-605": {
      id: "e-605",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-49",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-606",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db067d6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db067d6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-607": {
      id: "e-607",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-608",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db0674f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db0674f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-608": {
      id: "e-608",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-607",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db0674f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db0674f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-609": {
      id: "e-609",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-610",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db0677c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db0677c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-610": {
      id: "e-610",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-609",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db0677c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db0677c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-611": {
      id: "e-611",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-612",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db06709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db06709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-612": {
      id: "e-612",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-611",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db06709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db06709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-613": {
      id: "e-613",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-614",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db0674f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db0674f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-614": {
      id: "e-614",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-613",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db0674f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db0674f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-615": {
      id: "e-615",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-616",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db0677c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db0677c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-616": {
      id: "e-616",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-615",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db0677c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db0677c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-617": {
      id: "e-617",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-618",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db067a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db067a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-618": {
      id: "e-618",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-617",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db067a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db067a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-619": {
      id: "e-619",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-620",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db067a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db067a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-620": {
      id: "e-620",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-619",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "07e1bc73-03ff-4ed3-ad25-23068db067a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "07e1bc73-03ff-4ed3-ad25-23068db067a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161533649,
    },
    "e-621": {
      id: "e-621",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-50",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-622",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba058d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba058d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-622": {
      id: "e-622",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-51",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-621",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba058d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba058d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-623": {
      id: "e-623",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-52",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-624",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba065a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba065a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-625": {
      id: "e-625",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-50",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-626",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba05d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba05d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-626": {
      id: "e-626",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-51",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-625",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba05d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba05d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-627": {
      id: "e-627",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-50",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-628",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0600",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0600",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-628": {
      id: "e-628",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-51",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-627",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0600",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0600",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-629": {
      id: "e-629",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-50",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-630",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba058d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba058d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-630": {
      id: "e-630",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-51",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-629",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba058d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba058d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-631": {
      id: "e-631",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-50",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-632",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba05d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba05d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-632": {
      id: "e-632",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-51",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-631",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba05d3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba05d3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-633": {
      id: "e-633",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-50",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-634",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0600",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0600",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-634": {
      id: "e-634",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-51",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-633",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0600",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0600",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-635": {
      id: "e-635",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-50",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-636",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0627",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0627",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-636": {
      id: "e-636",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-51",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-635",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0627",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0627",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-637": {
      id: "e-637",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-50",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-638",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0627",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0627",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-638": {
      id: "e-638",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-51",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-637",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0627",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c809a5e2-45e6-836d-41d1-cd2cf0ba0627",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161670647,
    },
    "e-639": {
      id: "e-639",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-640",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f6c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f6c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-640": {
      id: "e-640",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-639",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f6c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f6c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-641": {
      id: "e-641",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-55",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-642",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f790",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f790",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-643": {
      id: "e-643",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-644",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-644": {
      id: "e-644",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-643",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-645": {
      id: "e-645",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-646",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f736",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f736",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-646": {
      id: "e-646",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-645",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f736",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f736",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-647": {
      id: "e-647",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-648",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f6c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f6c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-648": {
      id: "e-648",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-647",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f6c3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f6c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-649": {
      id: "e-649",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-650",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-650": {
      id: "e-650",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-649",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-651": {
      id: "e-651",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-652",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f736",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f736",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-652": {
      id: "e-652",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-651",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f736",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f736",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-653": {
      id: "e-653",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-654",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f75d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f75d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-654": {
      id: "e-654",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-653",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f75d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f75d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-655": {
      id: "e-655",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-656",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f75d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f75d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-656": {
      id: "e-656",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-655",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "10ce327b-beb5-1690-b0f3-a0339da7f75d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "10ce327b-beb5-1690-b0f3-a0339da7f75d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1714161743735,
    },
    "e-657": {
      id: "e-657",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-658" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|b82f4768-8800-7898-444e-a6f0b4a14348",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|b82f4768-8800-7898-444e-a6f0b4a14348",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714162695584,
    },
    "e-659": {
      id: "e-659",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-660" },
      },
      mediaQueries: ["main"],
      target: {
        id: "a3d46568-6c77-a900-fbf5-4a0e7ba1c35b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "a3d46568-6c77-a900-fbf5-4a0e7ba1c35b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714164617424,
    },
    "e-661": {
      id: "e-661",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-662" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|91ed6dfb-4df3-daa7-f6a0-b612a8537487",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|91ed6dfb-4df3-daa7-f6a0-b612a8537487",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714164760151,
    },
    "e-663": {
      id: "e-663",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-664" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|d11ba3de-aa67-eb9f-94e8-236804a93f25",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|d11ba3de-aa67-eb9f-94e8-236804a93f25",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714165756775,
    },
    "e-665": {
      id: "e-665",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-666" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|cfa1a9cd-cb52-72b8-cc9d-7aa5b494fb29",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|cfa1a9cd-cb52-72b8-cc9d-7aa5b494fb29",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714165770441,
    },
    "e-667": {
      id: "e-667",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-668" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|17018a73-32c2-01c6-69e9-8f890a99dab7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|17018a73-32c2-01c6-69e9-8f890a99dab7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166045335,
    },
    "e-669": {
      id: "e-669",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-670" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|6e2e5f94-bd12-7ac6-bcc5-7be2d0f0ac10",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|6e2e5f94-bd12-7ac6-bcc5-7be2d0f0ac10",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166185064,
    },
    "e-671": {
      id: "e-671",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-672" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|6e2e5f94-bd12-7ac6-bcc5-7be2d0f0ac16",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|6e2e5f94-bd12-7ac6-bcc5-7be2d0f0ac16",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166210053,
    },
    "e-673": {
      id: "e-673",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-674" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|eb25b827-a6d1-3b73-65e0-11632297a047",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|eb25b827-a6d1-3b73-65e0-11632297a047",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166254250,
    },
    "e-675": {
      id: "e-675",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-676" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|eb25b827-a6d1-3b73-65e0-11632297a04d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|eb25b827-a6d1-3b73-65e0-11632297a04d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166270913,
    },
    "e-677": {
      id: "e-677",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-678" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|98b3a8db-ee72-f6bc-c57b-2fec4c8d5c8d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|98b3a8db-ee72-f6bc-c57b-2fec4c8d5c8d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166416385,
    },
    "e-679": {
      id: "e-679",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-680" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|42000d9f-7d2e-c6f3-64ab-15c5d554449f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|42000d9f-7d2e-c6f3-64ab-15c5d554449f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166431618,
    },
    "e-681": {
      id: "e-681",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-682" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|0d0c2916-5754-2e80-f560-e869aea926b8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|0d0c2916-5754-2e80-f560-e869aea926b8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166461004,
    },
    "e-683": {
      id: "e-683",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-684" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|0d0c2916-5754-2e80-f560-e869aea926c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|0d0c2916-5754-2e80-f560-e869aea926c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166474737,
    },
    "e-685": {
      id: "e-685",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-686" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f66|7fe38d93-0fde-38c6-64f4-2e9d88c96c44",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66|7fe38d93-0fde-38c6-64f4-2e9d88c96c44",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: null,
        effectIn: true,
      },
      createdOn: 1714166490273,
    },
    "e-687": {
      id: "e-687",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-688" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|ec404633-424d-c4ff-5037-106f2b442981",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|ec404633-424d-c4ff-5037-106f2b442981",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1714725289630,
    },
    "e-689": {
      id: "e-689",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-690" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|bf0912cc-ce1f-934d-05e7-d7eed96d480d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|bf0912cc-ce1f-934d-05e7-d7eed96d480d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1714725293955,
    },
    "e-693": {
      id: "e-693",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-56",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-694",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|810ad14f-c156-9475-fdb7-a0fe993a653c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|810ad14f-c156-9475-fdb7-a0fe993a653c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715178021557,
    },
    "e-695": {
      id: "e-695",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-57",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-696",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|1efe27cc-b69a-e476-9b0c-47afc3ff48bf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|1efe27cc-b69a-e476-9b0c-47afc3ff48bf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715184464638,
    },
    "e-699": {
      id: "e-699",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6641d1df7619c2f29e1090e8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d1df7619c2f29e1090e8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1715589600576,
    },
    "e-704": {
      id: "e-704",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-705" },
      },
      mediaQueries: ["main"],
      target: {
        id: "6641d1df7619c2f29e1090e8|5c988b4c-cea6-d65a-752f-2fe6c339d740",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d1df7619c2f29e1090e8|5c988b4c-cea6-d65a-752f-2fe6c339d740",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1715589600576,
    },
    "e-706": {
      id: "e-706",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-707",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6641d1df7619c2f29e1090e8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d1df7619c2f29e1090e8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715589600576,
    },
    "e-708": {
      id: "e-708",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6641d3420973fd6c03140d12",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d3420973fd6c03140d12",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1715589954538,
    },
    "e-709": {
      id: "e-709",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-710" },
      },
      mediaQueries: ["main"],
      target: {
        id: "6641d3420973fd6c03140d12|5c988b4c-cea6-d65a-752f-2fe6c339d740",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d3420973fd6c03140d12|5c988b4c-cea6-d65a-752f-2fe6c339d740",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1715589954538,
    },
    "e-711": {
      id: "e-711",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-712",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6641d3420973fd6c03140d12",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d3420973fd6c03140d12",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715589954538,
    },
    "e-715": {
      id: "e-715",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1715806842390,
    },
    "e-720": {
      id: "e-720",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-721" },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|6909ea52-46c8-805f-00de-8f45f6f13f5c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|6909ea52-46c8-805f-00de-8f45f6f13f5c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: null,
        effectIn: true,
      },
      createdOn: 1715806842390,
    },
    "e-827": {
      id: "e-827",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-828",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad979e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad979e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-828": {
      id: "e-828",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-827",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad979e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad979e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-829": {
      id: "e-829",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-62",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-830",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97abb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97abb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-831": {
      id: "e-831",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-832",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-832": {
      id: "e-832",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-831",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-833": {
      id: "e-833",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-834",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-834": {
      id: "e-834",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-833",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-835": {
      id: "e-835",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-836",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad979e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad979e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-836": {
      id: "e-836",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-835",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad979e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad979e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-837": {
      id: "e-837",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-838",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-838": {
      id: "e-838",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-837",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-839": {
      id: "e-839",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-840",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-840": {
      id: "e-840",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-839",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-841": {
      id: "e-841",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-842",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-842": {
      id: "e-842",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-841",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-843": {
      id: "e-843",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-844",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-844": {
      id: "e-844",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-843",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60|afa47836-4367-0419-b1eb-08f23ad97a7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715887510139,
    },
    "e-847": {
      id: "e-847",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-848",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d630e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d630e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-848": {
      id: "e-848",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-847",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d630e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d630e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-849": {
      id: "e-849",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-65",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-850",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d631af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d631af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-851": {
      id: "e-851",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-852",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63122",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63122",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-852": {
      id: "e-852",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-851",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63122",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63122",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-853": {
      id: "e-853",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-854",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63151",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63151",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-854": {
      id: "e-854",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-853",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63151",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63151",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-855": {
      id: "e-855",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-856",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d630e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d630e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-856": {
      id: "e-856",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-855",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d630e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d630e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-857": {
      id: "e-857",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-858",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63122",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63122",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-858": {
      id: "e-858",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-857",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63122",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63122",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-859": {
      id: "e-859",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-860",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63151",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63151",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-860": {
      id: "e-860",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-859",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63151",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d63151",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-861": {
      id: "e-861",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-862",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d6317a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d6317a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-862": {
      id: "e-862",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-861",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d6317a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d6317a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-863": {
      id: "e-863",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-864",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d6317a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d6317a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-864": {
      id: "e-864",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-863",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d6317a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68|93247fa3-db3b-d36f-bf61-fa1005d6317a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1715889835153,
    },
    "e-881": {
      id: "e-881",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-68", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664ce36df751ad923ba04994",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664ce36df751ad923ba04994",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-68-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1716314990464,
    },
    "e-882": {
      id: "e-882",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-883" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664ce36df751ad923ba04994|538f9ca1-ec94-8933-f3e9-f2bd765669d8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664ce36df751ad923ba04994|538f9ca1-ec94-8933-f3e9-f2bd765669d8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1716316469611,
    },
    "e-884": {
      id: "e-884",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-885" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664ce36df751ad923ba04994|47a4900c-2930-3d44-08e4-39b230a3dff2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664ce36df751ad923ba04994|47a4900c-2930-3d44-08e4-39b230a3dff2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716316920172,
    },
    "e-886": {
      id: "e-886",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-887" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664ce36df751ad923ba04994|268620f3-8f5e-e27a-818d-fb13e6350c02",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664ce36df751ad923ba04994|268620f3-8f5e-e27a-818d-fb13e6350c02",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716319540394,
    },
    "e-888": {
      id: "e-888",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-889" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664ce36df751ad923ba04994|e7bbb5e2-0227-6d75-1bbf-74a342878709",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664ce36df751ad923ba04994|e7bbb5e2-0227-6d75-1bbf-74a342878709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716319541036,
    },
    "e-890": {
      id: "e-890",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1716321810861,
    },
    "e-895": {
      id: "e-895",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-896" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664cfe11794fe4dc08b667b9|a2d586ae-587b-697e-e128-77bc5a5ccf86",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|a2d586ae-587b-697e-e128-77bc5a5ccf86",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716402155091,
    },
    "e-897": {
      id: "e-897",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-898" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664cfe11794fe4dc08b667b9|018ca908-b372-678e-dc1f-629e569a5311",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|018ca908-b372-678e-dc1f-629e569a5311",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716402156916,
    },
    "e-899": {
      id: "e-899",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-900" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664cfe11794fe4dc08b667b9|9d0d84f0-8f15-33c3-3b96-c93e8f571491",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|9d0d84f0-8f15-33c3-3b96-c93e8f571491",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716402159555,
    },
    "e-903": {
      id: "e-903",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-904" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664cfe11794fe4dc08b667b9|f99f97d5-4a76-2c29-aa94-b708a6bb84c7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|f99f97d5-4a76-2c29-aa94-b708a6bb84c7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716403589986,
    },
    "e-905": {
      id: "e-905",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-906" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664cfe11794fe4dc08b667b9|56ca6095-8a62-3598-3c87-029eea9b60e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|56ca6095-8a62-3598-3c87-029eea9b60e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716403591954,
    },
    "e-907": {
      id: "e-907",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-908" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664cfe11794fe4dc08b667b9|153a3dc0-aa9b-7872-4cde-58791c0ff934",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|153a3dc0-aa9b-7872-4cde-58791c0ff934",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716403592668,
    },
    "e-909": {
      id: "e-909",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-910" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664cfe11794fe4dc08b667b9|57e4fafa-0b58-f956-307e-73c69f2b3064",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|57e4fafa-0b58-f956-307e-73c69f2b3064",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716403594373,
    },
    "e-911": {
      id: "e-911",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-912" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664cfe11794fe4dc08b667b9|b22648f2-a188-eec7-13f7-7d97efd6b700",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|b22648f2-a188-eec7-13f7-7d97efd6b700",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716403594755,
    },
    "e-933": {
      id: "e-933",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-65",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-934",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|cfb4fffb-d6e5-90f3-57ec-59183907ffa7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|cfb4fffb-d6e5-90f3-57ec-59183907ffa7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716405807073,
    },
    "e-935": {
      id: "e-935",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664e46e455816d2c24568c80",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1716405988628,
    },
    "e-936": {
      id: "e-936",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-937" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664e46e455816d2c24568c80|a2d586ae-587b-697e-e128-77bc5a5ccf86",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|a2d586ae-587b-697e-e128-77bc5a5ccf86",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716405988628,
    },
    "e-938": {
      id: "e-938",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-939" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664e46e455816d2c24568c80|018ca908-b372-678e-dc1f-629e569a5311",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|018ca908-b372-678e-dc1f-629e569a5311",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716405988628,
    },
    "e-940": {
      id: "e-940",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-941" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664e46e455816d2c24568c80|9d0d84f0-8f15-33c3-3b96-c93e8f571491",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|9d0d84f0-8f15-33c3-3b96-c93e8f571491",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716405988628,
    },
    "e-944": {
      id: "e-944",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-945" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664e46e455816d2c24568c80|f99f97d5-4a76-2c29-aa94-b708a6bb84c7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|f99f97d5-4a76-2c29-aa94-b708a6bb84c7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716405988628,
    },
    "e-946": {
      id: "e-946",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-947" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664e46e455816d2c24568c80|56ca6095-8a62-3598-3c87-029eea9b60e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|56ca6095-8a62-3598-3c87-029eea9b60e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716405988628,
    },
    "e-948": {
      id: "e-948",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-949" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664e46e455816d2c24568c80|153a3dc0-aa9b-7872-4cde-58791c0ff934",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|153a3dc0-aa9b-7872-4cde-58791c0ff934",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716405988628,
    },
    "e-950": {
      id: "e-950",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-951" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664e46e455816d2c24568c80|57e4fafa-0b58-f956-307e-73c69f2b3064",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|57e4fafa-0b58-f956-307e-73c69f2b3064",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716405988628,
    },
    "e-952": {
      id: "e-952",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-953" },
      },
      mediaQueries: ["main"],
      target: {
        id: "664e46e455816d2c24568c80|b22648f2-a188-eec7-13f7-7d97efd6b700",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|b22648f2-a188-eec7-13f7-7d97efd6b700",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1716405988628,
    },
    "e-958": {
      id: "e-958",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-65",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-959",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "664e46e455816d2c24568c80|cfb4fffb-d6e5-90f3-57ec-59183907ffa7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664e46e455816d2c24568c80|cfb4fffb-d6e5-90f3-57ec-59183907ffa7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716405988628,
    },
    "e-960": {
      id: "e-960",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-961",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|68f91b4c-c744-ed07-5ed9-8f5ff87fd246",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|68f91b4c-c744-ed07-5ed9-8f5ff87fd246",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716463082773,
    },
    "e-961": {
      id: "e-961",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-960",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|68f91b4c-c744-ed07-5ed9-8f5ff87fd246",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|68f91b4c-c744-ed07-5ed9-8f5ff87fd246",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716463082773,
    },
    "e-962": {
      id: "e-962",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-963",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|6fcc1950-4e87-d502-9a1d-b70e37ca86fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|6fcc1950-4e87-d502-9a1d-b70e37ca86fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716467050032,
    },
    "e-963": {
      id: "e-963",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-962",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|6fcc1950-4e87-d502-9a1d-b70e37ca86fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|6fcc1950-4e87-d502-9a1d-b70e37ca86fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716467050032,
    },
    "e-964": {
      id: "e-964",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-965",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|82bbf430-cff7-6d18-570b-e45cc222ea64",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|82bbf430-cff7-6d18-570b-e45cc222ea64",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716467050694,
    },
    "e-965": {
      id: "e-965",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-964",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|82bbf430-cff7-6d18-570b-e45cc222ea64",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|82bbf430-cff7-6d18-570b-e45cc222ea64",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716467050694,
    },
    "e-966": {
      id: "e-966",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-967",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|48c35bec-1f91-40e8-7d94-12a81ce682e4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|48c35bec-1f91-40e8-7d94-12a81ce682e4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716467051405,
    },
    "e-967": {
      id: "e-967",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-966",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "664cfe11794fe4dc08b667b9|48c35bec-1f91-40e8-7d94-12a81ce682e4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "664cfe11794fe4dc08b667b9|48c35bec-1f91-40e8-7d94-12a81ce682e4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716467051405,
    },
    "e-974": {
      id: "e-974",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-975",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900688223,
    },
    "e-975": {
      id: "e-975",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-974",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900688230,
    },
    "e-976": {
      id: "e-976",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-977",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f66",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900725160,
    },
    "e-977": {
      id: "e-977",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-976",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f66",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f66",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900725223,
    },
    "e-978": {
      id: "e-978",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-979",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f67",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f67",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900758218,
    },
    "e-979": {
      id: "e-979",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-978",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f67",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f67",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900758261,
    },
    "e-980": {
      id: "e-980",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-981",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f69",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900792063,
    },
    "e-981": {
      id: "e-981",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-980",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f69",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900792134,
    },
    "e-982": {
      id: "e-982",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-983",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900824667,
    },
    "e-983": {
      id: "e-983",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-982",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f68",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f68",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900824672,
    },
    "e-984": {
      id: "e-984",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-985",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6a",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900857940,
    },
    "e-985": {
      id: "e-985",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-984",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6a",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900857985,
    },
    "e-986": {
      id: "e-986",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-987",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900888898,
    },
    "e-987": {
      id: "e-987",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-986",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900888944,
    },
    "e-988": {
      id: "e-988",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-989",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6d",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900918222,
    },
    "e-989": {
      id: "e-989",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-988",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6d",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6d",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900918277,
    },
    "e-990": {
      id: "e-990",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-991",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900945191,
    },
    "e-991": {
      id: "e-991",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-990",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900945237,
    },
    "e-992": {
      id: "e-992",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-993",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6c",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900983730,
    },
    "e-993": {
      id: "e-993",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-992",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f6c",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f6c",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716900983777,
    },
    "e-994": {
      id: "e-994",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-995",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716901032661,
    },
    "e-995": {
      id: "e-995",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-994",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66452279b2eb79345451da60",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66452279b2eb79345451da60",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716901032666,
    },
    "e-996": {
      id: "e-996",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-997",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716901057772,
    },
    "e-997": {
      id: "e-997",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-996",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66210c2b3a22e4d11f366fbb",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66210c2b3a22e4d11f366fbb",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716901057817,
    },
    "e-998": {
      id: "e-998",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-999",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6641d1df7619c2f29e1090e8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d1df7619c2f29e1090e8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716901324936,
    },
    "e-999": {
      id: "e-999",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-998",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6641d1df7619c2f29e1090e8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d1df7619c2f29e1090e8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716901324948,
    },
    "e-1000": {
      id: "e-1000",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1001",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6641d3420973fd6c03140d12",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d3420973fd6c03140d12",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716901486074,
    },
    "e-1001": {
      id: "e-1001",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1000",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6641d3420973fd6c03140d12",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6641d3420973fd6c03140d12",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1716901486085,
    },
    "e-1127": {
      id: "e-1127",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-71", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|084e7a3e-72b7-dc48-9e23-a075a0294f1f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|084e7a3e-72b7-dc48-9e23-a075a0294f1f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-71-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1717442522230,
    },
    "e-1128": {
      id: "e-1128",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-1129" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f69|028c0fdc-410a-2828-08d6-7909e56c3d10",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f69|028c0fdc-410a-2828-08d6-7909e56c3d10",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1717663340737,
    },
    "e-1130": {
      id: "e-1130",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-74",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1131",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "666882741ab3abc7cbc54ad9|3a6f89a7-abf5-e0c0-2e7e-23faa5ac1780",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|3a6f89a7-abf5-e0c0-2e7e-23faa5ac1780",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718125172951,
    },
    "e-1131": {
      id: "e-1131",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-75",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1130",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "666882741ab3abc7cbc54ad9|3a6f89a7-abf5-e0c0-2e7e-23faa5ac1780",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|3a6f89a7-abf5-e0c0-2e7e-23faa5ac1780",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718125172951,
    },
    "e-1132": {
      id: "e-1132",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-73", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "666882741ab3abc7cbc54ad9",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-73-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1718125172951,
    },
    "e-1133": {
      id: "e-1133",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1134" },
      },
      mediaQueries: ["main"],
      target: {
        id: "666882741ab3abc7cbc54ad9|a2bdeef0-4079-565f-17d4-d5f85d18d6ab",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|a2bdeef0-4079-565f-17d4-d5f85d18d6ab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1718125172951,
    },
    "e-1135": {
      id: "e-1135",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-1136" },
      },
      mediaQueries: ["main"],
      target: {
        id: "666882741ab3abc7cbc54ad9|3a6f89a7-abf5-e0c0-2e7e-23faa5ac177e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|3a6f89a7-abf5-e0c0-2e7e-23faa5ac177e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1718125172951,
    },
    "e-1137": {
      id: "e-1137",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1138",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "666882741ab3abc7cbc54ad9",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718125172951,
    },
    "e-1138": {
      id: "e-1138",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1137",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "666882741ab3abc7cbc54ad9",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718125172951,
    },
    "e-1139": {
      id: "e-1139",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1140" },
      },
      mediaQueries: ["main"],
      target: {
        id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c4813",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c4813",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1718128131650,
    },
    "e-1141": {
      id: "e-1141",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1142" },
      },
      mediaQueries: ["main"],
      target: {
        id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c4815",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c4815",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: null,
        effectIn: true,
      },
      createdOn: 1718128131650,
    },
    "e-1143": {
      id: "e-1143",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1144" },
      },
      mediaQueries: ["main"],
      target: {
        id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c4823",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c4823",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: null,
        effectIn: true,
      },
      createdOn: 1718128131650,
    },
    "e-1145": {
      id: "e-1145",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1146" },
      },
      mediaQueries: ["main"],
      target: {
        id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c4831",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c4831",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 800,
        direction: null,
        effectIn: true,
      },
      createdOn: 1718128131650,
    },
    "e-1147": {
      id: "e-1147",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1148" },
      },
      mediaQueries: ["main"],
      target: {
        id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c483b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c483b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1000,
        direction: null,
        effectIn: true,
      },
      createdOn: 1718128131650,
    },
    "e-1149": {
      id: "e-1149",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1150" },
      },
      mediaQueries: ["main"],
      target: {
        id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c484b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "666882741ab3abc7cbc54ad9|e993cc32-4078-013c-c2e7-fad3338c484b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 1200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1718128131650,
    },
    "e-1163": {
      id: "e-1163",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-14", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-14-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1718196854565,
    },
    "e-1164": {
      id: "e-1164",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1165" },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|6909ea52-46c8-805f-00de-8f45f6f13f5c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|6909ea52-46c8-805f-00de-8f45f6f13f5c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 100,
        direction: null,
        effectIn: true,
      },
      createdOn: 1718196854565,
    },
    "e-1166": {
      id: "e-1166",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1167",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad979e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad979e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1167": {
      id: "e-1167",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1166",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad979e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad979e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1168": {
      id: "e-1168",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-62",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1169",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97abb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97abb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1170": {
      id: "e-1170",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1171",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1171": {
      id: "e-1171",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1170",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1172": {
      id: "e-1172",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1173",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1173": {
      id: "e-1173",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1172",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1174": {
      id: "e-1174",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1175",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad979e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad979e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1175": {
      id: "e-1175",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1174",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad979e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad979e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1176": {
      id: "e-1176",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1177",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1177": {
      id: "e-1177",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1176",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1178": {
      id: "e-1178",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1179",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1179": {
      id: "e-1179",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1178",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a56",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a56",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1180": {
      id: "e-1180",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1181",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1181": {
      id: "e-1181",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1180",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1182": {
      id: "e-1182",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1183",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1183": {
      id: "e-1183",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1182",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3|afa47836-4367-0419-b1eb-08f23ad97a7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1186": {
      id: "e-1186",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1187",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1187": {
      id: "e-1187",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-1186",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66699a750dd1ee57f4f083d3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66699a750dd1ee57f4f083d3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1718196854565,
    },
    "e-1188": {
      id: "e-1188",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1189" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f65|202cdfbb-d45d-601d-b86c-e6e9f4f33011",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f65|202cdfbb-d45d-601d-b86c-e6e9f4f33011",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1721931043475,
    },
    "e-1190": {
      id: "e-1190",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-1191" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f65|a33e2772-1733-4c20-2d4d-891292ed786e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f65|a33e2772-1733-4c20-2d4d-891292ed786e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1721931057208,
    },
    "e-1192": {
      id: "e-1192",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-1196" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035bcf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035bcf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 600,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1725914372505,
    },
    "e-1194": {
      id: "e-1194",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1193" },
      },
      mediaQueries: ["main"],
      target: {
        id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035bbd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035bbd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1725906259224,
    },
    "e-1197": {
      id: "e-1197",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-1195" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035be3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035be3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1725914394689,
    },
    "e-1200": {
      id: "e-1200",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-1199" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035bc3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035bc3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1725914358715,
    },
    "e-1201": {
      id: "e-1201",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "FADE_EFFECT",
        instant: false,
        config: { actionListId: "fadeIn", autoStopEventId: "e-1198" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035bdb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|91609c9b-38c1-7bff-a69a-b0d31a035bdb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1725914383845,
    },
    "e-1202": {
      id: "e-1202",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-1203" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "660e449a26dad71301a18f64|2322d0f8-2020-3463-7a9e-8408c04e490e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "660e449a26dad71301a18f64|2322d0f8-2020-3463-7a9e-8408c04e490e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 400,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1731349035124,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Menu Dropdown Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-triangle",
                  selectorGuids: ["9ce3e5c8-a0ca-b775-32b5-d8ad5baf1013"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-menu-list",
                  selectorGuids: ["16990466-792c-fc6a-06b9-d1384460f62c"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-5",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-triangle",
                  selectorGuids: ["9ce3e5c8-a0ca-b775-32b5-d8ad5baf1013"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-menu-list",
                  selectorGuids: ["16990466-792c-fc6a-06b9-d1384460f62c"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-n-6",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                filters: [
                  {
                    type: "brightness",
                    filterId: "de65",
                    value: 500,
                    unit: "%",
                  },
                ],
              },
            },
            {
              id: "a-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1711483060464,
    },
    "a-2": {
      id: "a-2",
      title: "Menu Dropdown Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-menu-list",
                  selectorGuids: ["16990466-792c-fc6a-06b9-d1384460f62c"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-2-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-2-n-6",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                filters: [
                  {
                    type: "brightness",
                    filterId: "ce43",
                    value: 100,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-triangle",
                  selectorGuids: ["9ce3e5c8-a0ca-b775-32b5-d8ad5baf1013"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1711483060464,
    },
    "a-3": {
      id: "a-3",
      title: "Menu Dropdown Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                filters: [
                  {
                    type: "brightness",
                    filterId: "73c3",
                    value: 500,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1711484509104,
    },
    "a-4": {
      id: "a-4",
      title: "Menu Dropdown Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                filters: [
                  {
                    type: "brightness",
                    filterId: "73c3",
                    value: 100,
                    unit: "%",
                  },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1711484509104,
    },
    "a-7": {
      id: "a-7",
      title: "FAQ Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-faq-list",
                  selectorGuids: ["631958eb-a8f9-fe7f-6d0c-2485c3e8d5f4"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-7-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-faq-list",
                  selectorGuids: ["631958eb-a8f9-fe7f-6d0c-2485c3e8d5f4"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-7-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".plus-faq",
                  selectorGuids: ["a28f45be-3224-2b7f-c013-ee748c0c2c8f"],
                },
                zValue: 135,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1620168038743,
    },
    "a-8": {
      id: "a-8",
      title: "FAQ Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".dropdown-faq-list",
                  selectorGuids: ["631958eb-a8f9-fe7f-6d0c-2485c3e8d5f4"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-8-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".plus-faq",
                  selectorGuids: ["a28f45be-3224-2b7f-c013-ee748c0c2c8f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620228911228,
    },
    "a-9": {
      id: "a-9",
      title: "Core Tech Roadmap Active",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".core-tech-tab-arrow",
                  selectorGuids: ["3b495e6d-bbec-5341-34b6-b8c8116a591a"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712005411017,
    },
    "a-10": {
      id: "a-10",
      title: "Core Tech Roadmap Normal",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".core-tech-tab-arrow",
                  selectorGuids: ["3b495e6d-bbec-5341-34b6-b8c8116a591a"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712005411017,
    },
    "a-11": {
      id: "a-11",
      title: "News Card Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".latest-news-item-image",
                  selectorGuids: ["8830889b-ac76-7206-a094-ca7096df700e"],
                },
                xValue: 1.1,
                yValue: 1.1,
                locked: true,
              },
            },
            {
              id: "a-11-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".post-info",
                  selectorGuids: ["b620f60f-4f2f-3d10-65d2-fd677b4c6277"],
                },
                yValue: -20,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712077961476,
    },
    "a-12": {
      id: "a-12",
      title: "News Card Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".latest-news-item-image",
                  selectorGuids: ["8830889b-ac76-7206-a094-ca7096df700e"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-12-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".post-info",
                  selectorGuids: ["b620f60f-4f2f-3d10-65d2-fd677b4c6277"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712077961476,
    },
    "a-14": {
      id: "a-14",
      title: "Navbar Scroll Animation",
      continuousParameterGroups: [
        {
          id: "a-14-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-14-n",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".navbar-2",
                      selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05426"],
                    },
                    globalSwatchId: "",
                    rValue: 19,
                    bValue: 36,
                    gValue: 25,
                    aValue: 0,
                  },
                },
              ],
            },
            {
              keyframe: 15,
              actionItems: [
                {
                  id: "a-14-n-2",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".navbar-2",
                      selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05426"],
                    },
                    globalSwatchId: "",
                    rValue: 19,
                    bValue: 36,
                    gValue: 25,
                    aValue: 0.95,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712091679378,
    },
    "a-73": {
      id: "a-73",
      title: "Navbar Scroll Animation WB",
      continuousParameterGroups: [
        {
          id: "a-73-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-73-n",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".navbar-2",
                      selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05426"],
                    },
                    globalSwatchId: "",
                    rValue: 19,
                    bValue: 36,
                    gValue: 25,
                    aValue: 0.95,
                  },
                },
              ],
            },
            {
              keyframe: 15,
              actionItems: [
                {
                  id: "a-73-n-2",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".navbar-2",
                      selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05426"],
                    },
                    globalSwatchId: "",
                    rValue: 19,
                    bValue: 36,
                    gValue: 25,
                    aValue: 0.95,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712091679378,
    },
    "a-20": {
      id: "a-20",
      title: "Logo Carousel",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-20-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".logos-grid",
                  selectorGuids: ["898e051f-50c2-91f4-3d0b-a0c1eb60a4ea"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-20-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 30000,
                target: {
                  selector: ".logos-grid",
                  selectorGuids: ["898e051f-50c2-91f4-3d0b-a0c1eb60a4ea"],
                },
                xValue: -200,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712926391772,
    },
    "a-22": {
      id: "a-22",
      title: "Navbar Scroll Animation 3",
      continuousParameterGroups: [
        {
          id: "a-22-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-22-n",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "66210c2b3a22e4d11f366fbb|3ca82213-b53a-997a-3841-b55ec03044ac",
                    },
                    globalSwatchId: "",
                    rValue: 19,
                    bValue: 36,
                    gValue: 25,
                    aValue: 0,
                  },
                },
              ],
            },
            {
              keyframe: 15,
              actionItems: [
                {
                  id: "a-22-n-2",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "66210c2b3a22e4d11f366fbb|3ca82213-b53a-997a-3841-b55ec03044ac",
                    },
                    globalSwatchId: "",
                    rValue: 19,
                    bValue: 36,
                    gValue: 25,
                    aValue: 0.95,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712091679378,
    },
    "a-27": {
      id: "a-27",
      title: "dropup all",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-27-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".down",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d0541f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-25": {
      id: "a-25",
      title: "dropdown",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-25-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-25-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1583178118436,
    },
    "a-26": {
      id: "a-26",
      title: "dropup",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-26-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-13": {
      id: "a-13",
      title: "Navbar Scroll Up",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  selector: ".navbar-2",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05426"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712091573784,
    },
    "a-15": {
      id: "a-15",
      title: "Navbar Scroll Down",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  selector: ".navbar-2",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05426"],
                },
                yValue: -138,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1712091573784,
    },
    "a-44": {
      id: "a-44",
      title: "dropdown 6",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-44-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-44-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-44-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-44-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-44-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1583178118436,
    },
    "a-45": {
      id: "a-45",
      title: "dropup 6",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-45-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-45-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-45-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-triangle",
                  selectorGuids: ["9ce3e5c8-a0ca-b775-32b5-d8ad5baf1013"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-46": {
      id: "a-46",
      title: "dropup all 6",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-46-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-46-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".down",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d0541f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-47": {
      id: "a-47",
      title: "dropdown 7",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-47-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-47-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-47-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-47-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-47-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1583178118436,
    },
    "a-48": {
      id: "a-48",
      title: "dropup 7",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-48-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-48-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-49": {
      id: "a-49",
      title: "dropup all 7",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-49-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-49-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".down",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d0541f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-50": {
      id: "a-50",
      title: "dropdown 8",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-50-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-50-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-50-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-50-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-50-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1583178118436,
    },
    "a-51": {
      id: "a-51",
      title: "dropup 8",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-51-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-51-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-52": {
      id: "a-52",
      title: "dropup all 8",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-52-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-52-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".down",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d0541f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-53": {
      id: "a-53",
      title: "dropdown 9",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-53-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-53-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-53-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-53-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-53-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1583178118436,
    },
    "a-54": {
      id: "a-54",
      title: "dropup 9",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-54-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-54-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-55": {
      id: "a-55",
      title: "dropup all 9",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-55-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-55-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".down",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d0541f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-56": {
      id: "a-56",
      title: "Technical Roadmap 1st click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-56-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".new-roadmap-content",
                  selectorGuids: ["f26d914b-dbc7-48f3-c868-c010907c6e79"],
                },
                value: "none",
              },
            },
            {
              id: "a-56-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".core-tech-tabs",
                  selectorGuids: ["28ad5e26-9156-590e-09bc-50bbaccdc2f9"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-56-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".core-tech-tabs",
                  selectorGuids: ["28ad5e26-9156-590e-09bc-50bbaccdc2f9"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-56-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".new-roadmap-content",
                  selectorGuids: ["f26d914b-dbc7-48f3-c868-c010907c6e79"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1715177872329,
    },
    "a-57": {
      id: "a-57",
      title: "Simple Roadmap 1st click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-57-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".new-roadmap-content",
                  selectorGuids: ["f26d914b-dbc7-48f3-c868-c010907c6e79"],
                },
                value: "block",
              },
            },
            {
              id: "a-57-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".core-tech-tabs",
                  selectorGuids: ["28ad5e26-9156-590e-09bc-50bbaccdc2f9"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-57-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".core-tech-tabs",
                  selectorGuids: ["28ad5e26-9156-590e-09bc-50bbaccdc2f9"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-57-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".new-roadmap-content",
                  selectorGuids: ["f26d914b-dbc7-48f3-c868-c010907c6e79"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1715177872329,
    },
    "a-60": {
      id: "a-60",
      title: "dropdown 10",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-60-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-60-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-60-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-60-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-60-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1583178118436,
    },
    "a-61": {
      id: "a-61",
      title: "dropup 10",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-61-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-61-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-61-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 100,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-triangle",
                  selectorGuids: ["9ce3e5c8-a0ca-b775-32b5-d8ad5baf1013"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-62": {
      id: "a-62",
      title: "dropup all 10",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-62-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-62-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".down",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d0541f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-63": {
      id: "a-63",
      title: "dropdown 11",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-63-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-63-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-63-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-63-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-63-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1583178118436,
    },
    "a-64": {
      id: "a-64",
      title: "dropup 11",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-64-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-64-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-toggle-icon",
                  selectorGuids: ["8a3770e3-0f21-59d2-c719-fe343420ef33"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-65": {
      id: "a-65",
      title: "dropup all 11",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-65-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".dropdowncontainer",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d05423"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-65-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  selector: ".down",
                  selectorGuids: ["106187b9-2c45-9dd8-16bc-907a64d0541f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1583178272169,
    },
    "a-68": {
      id: "a-68",
      title: "Navbar Pre-Sale Scroll Animation",
      continuousParameterGroups: [
        {
          id: "a-68-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-68-n",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "664ce36df751ad923ba04994|2bded01f-7488-6d63-89b5-ab44bea9a592",
                    },
                    globalSwatchId: "",
                    rValue: 19,
                    bValue: 36,
                    gValue: 25,
                    aValue: 0,
                  },
                },
              ],
            },
            {
              keyframe: 15,
              actionItems: [
                {
                  id: "a-68-n-2",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "664ce36df751ad923ba04994|2bded01f-7488-6d63-89b5-ab44bea9a592",
                    },
                    globalSwatchId: "",
                    rValue: 19,
                    bValue: 36,
                    gValue: 25,
                    aValue: 0.95,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712091679378,
    },
    "a-69": {
      id: "a-69",
      title: "Token Roadmap Mobile Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-69-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".token-roadmap-collapse",
                  selectorGuids: ["34650e1c-a505-4a62-f350-e80eb00e1801"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-69-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".token-roadmap-collapse",
                  selectorGuids: ["34650e1c-a505-4a62-f350-e80eb00e1801"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-69-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".plus-faq",
                  selectorGuids: ["a28f45be-3224-2b7f-c013-ee748c0c2c8f"],
                },
                zValue: 135,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-69-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".token-roadmap-toggle",
                  selectorGuids: ["f626bbac-d785-b9e7-34a7-415c74cafbdf"],
                },
                globalSwatchId: "",
                rValue: 30,
                bValue: 49,
                gValue: 36,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1620168038743,
    },
    "a-70": {
      id: "a-70",
      title: "Token Roadmap Mobile Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-70-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".token-roadmap-collapse",
                  selectorGuids: ["34650e1c-a505-4a62-f350-e80eb00e1801"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-70-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".plus-faq",
                  selectorGuids: ["a28f45be-3224-2b7f-c013-ee748c0c2c8f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-70-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".token-roadmap-toggle",
                  selectorGuids: ["f626bbac-d785-b9e7-34a7-415c74cafbdf"],
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 0,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620228911228,
    },
    "a-71": {
      id: "a-71",
      title: "Planet Scroll Animation New Narrative",
      continuousParameterGroups: [
        {
          id: "a-71-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 25,
              actionItems: [
                {
                  id: "a-71-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".background-video.background-video-2",
                      selectorGuids: [
                        "cf56ff2d-68f8-19ce-c899-ac4ed76528d6",
                        "62859985-6c4c-1894-7b37-ceb5f2f0d8c8",
                      ],
                    },
                    xValue: 1.2,
                    yValue: 1.2,
                    locked: true,
                  },
                },
                {
                  id: "a-71-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".background-video.background-video-2",
                      selectorGuids: [
                        "cf56ff2d-68f8-19ce-c899-ac4ed76528d6",
                        "62859985-6c4c-1894-7b37-ceb5f2f0d8c8",
                      ],
                    },
                    xValue: 0,
                    yValue: -27,
                    xUnit: "%",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-71-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".planet-text-new-narrative",
                      selectorGuids: ["d9f9a002-a4d0-5658-53e6-ef9fc7aa42b4"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 75,
              actionItems: [
                {
                  id: "a-71-n-4",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".background-video.background-video-2",
                      selectorGuids: [
                        "cf56ff2d-68f8-19ce-c899-ac4ed76528d6",
                        "62859985-6c4c-1894-7b37-ceb5f2f0d8c8",
                      ],
                    },
                    xValue: 1.9,
                    yValue: 1.9,
                    locked: true,
                  },
                },
                {
                  id: "a-71-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "ease",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".background-video.background-video-2",
                      selectorGuids: [
                        "cf56ff2d-68f8-19ce-c899-ac4ed76528d6",
                        "62859985-6c4c-1894-7b37-ceb5f2f0d8c8",
                      ],
                    },
                    xValue: -55,
                    yValue: 156,
                    xUnit: "%",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-71-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".planet-text-new-narrative",
                      selectorGuids: ["d9f9a002-a4d0-5658-53e6-ef9fc7aa42b4"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1712237712665,
    },
    "a-74": {
      id: "a-74",
      title: "News List Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-74-n",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".body-2-dark-left-bold",
                  selectorGuids: ["d193b0fb-01c5-6dfd-b418-a301e51e65b0"],
                },
                globalSwatchId: "--complementary",
                rValue: 15,
                bValue: 255,
                gValue: 118,
                aValue: 1,
              },
            },
            {
              id: "a-74-n-3",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".new-latest-news-item-image",
                  selectorGuids: ["1619cfe4-014f-f050-3551-f8fe94e8de56"],
                },
                filters: [
                  { type: "saturate", filterId: "e31a", value: 0, unit: "%" },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1718128345400,
    },
    "a-75": {
      id: "a-75",
      title: "News List Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-75-n-2",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "ease",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".body-2-dark-left-bold",
                  selectorGuids: ["d193b0fb-01c5-6dfd-b418-a301e51e65b0"],
                },
                globalSwatchId: "--neutral-600",
                rValue: 88,
                bValue: 128,
                gValue: 101,
                aValue: 1,
              },
            },
            {
              id: "a-75-n-3",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".new-latest-news-item-image",
                  selectorGuids: ["1619cfe4-014f-f050-3551-f8fe94e8de56"],
                },
                filters: [
                  { type: "saturate", filterId: "e31a", value: 100, unit: "%" },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1718128345400,
    },
    fadeIn: {
      id: "fadeIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
