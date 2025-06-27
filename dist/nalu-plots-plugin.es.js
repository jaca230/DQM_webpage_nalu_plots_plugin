var ne = Object.defineProperty;
var se = (l, i, n) => i in l ? ne(l, i, { enumerable: !0, configurable: !0, writable: !0, value: n }) : l[i] = n;
var x = (l, i, n) => se(l, typeof i != "symbol" ? i + "" : i, n);
import oe from "react";
function le({ Plot: l, SettingTypes: i }) {
  var n;
  return n = class extends l {
    static get settingSchema() {
      return {
        ...super.settingSchema,
        selectedChannel: {
          type: i.INT,
          default: 0,
          label: "Channel #",
          onChange: "onUpdateTick",
          advanced: !1
        },
        dataUrl: {
          type: i.STRING,
          default: "http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/ChannelIntegralHistogramCollection",
          label: "Data URL",
          onChange: "onUpdateTick",
          advanced: !0
        }
      };
    }
    formatPlotly(t) {
      var A;
      const a = (A = t == null ? void 0 : t.data) == null ? void 0 : A.arr;
      if (!Array.isArray(a) || a.length === 0)
        return console.warn("No histograms found or empty array."), { data: [], layout: {} };
      const s = this.settings.selectedChannel;
      if (s < 0 || s >= a.length)
        return console.warn(`Selected channel ${s} is out of bounds.`), { data: [], layout: {} };
      const o = a[s];
      if (!o || !Array.isArray(o.fArray))
        return console.warn(`Histogram at selected index ${s} is invalid:`, o), { data: [], layout: {} };
      const u = o.fArray, p = o.fXaxis || {}, y = p.fNbins || u.length - 2, g = p.fXmin ?? 0, E = ((p.fXmax ?? 1) - g) / y, m = [];
      for (let k = 0; k <= y; k++)
        m.push(g + k * E);
      const P = [0, ...u.slice(1, y + 1)];
      return {
        data: [
          {
            type: "bar",
            x: m,
            y: P,
            name: o.fName || `hist_${s}`,
            marker: { color: "steelblue" },
            hoverinfo: "x+y+name",
            width: E
          }
        ],
        layout: {
          autosize: !0,
          margin: { t: 30, r: 20, l: 40, b: 40 },
          xaxis: {
            title: "Integral",
            range: [m[0], m[m.length - 1]]
          },
          yaxis: { title: "Counts" },
          bargap: 0,
          legend: { orientation: "h", y: -0.2 }
        }
      };
    }
  }, x(n, "displayName", "Nalu Integral Histogram"), x(n, "name", "NaluIntegralHistogram"), n;
}
function ie({ Plot: l, SettingTypes: i }) {
  var n;
  return n = class extends l {
    static get settingSchema() {
      return {
        ...super.settingSchema,
        selectedChannel: {
          type: i.INT,
          default: 0,
          label: "Channel #",
          onChange: "onUpdateTick",
          advanced: !1
        },
        dataUrl: {
          type: i.STRING,
          default: "http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/NaluWaveformCollection",
          label: "Data URL",
          onChange: "onUpdateTick",
          advanced: !0
        }
      };
    }
    formatPlotly(t) {
      var y;
      const a = (y = t == null ? void 0 : t.data) == null ? void 0 : y.arr;
      if (!Array.isArray(a) || a.length === 0)
        return console.warn("No waveforms found or empty array."), { data: [], layout: {} };
      const s = this.settings.selectedChannel, o = a.find((g) => g.channel_num === s);
      if (!o || !Array.isArray(o.trace))
        return console.warn(`No waveform found for selected channel ${s}`), { data: [], layout: {} };
      const u = o.trace.map((g, _) => _), p = o.trace;
      return {
        data: [
          {
            type: "scatter",
            mode: "lines",
            x: u,
            y: p,
            name: `Channel ${s} Trace`,
            line: { color: "steelblue" },
            hoverinfo: "x+y+name"
          }
        ],
        layout: {
          autosize: !0,
          margin: { t: 30, r: 20, l: 40, b: 40 },
          xaxis: {
            title: "Sample Number",
            range: [0, u.length - 1]
          },
          yaxis: { title: "ADC Value" },
          legend: { orientation: "h", y: -0.2 }
        }
      };
    }
  }, x(n, "displayName", "Nalu Waveform Traces"), x(n, "name", "NaluWaveformTraces"), n;
}
function ce({ Plot: l, SettingTypes: i }) {
  var n;
  return n = class extends l {
    static get settingSchema() {
      return {
        ...super.settingSchema,
        bufferLength: {
          type: i.INT,
          default: 20,
          label: "Buffer Length",
          onChange: "onBufferResize",
          advanced: !0
        },
        dataUrl: {
          type: i.STRING,
          default: "http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/NaluTimeCollection",
          label: "Data URL",
          onChange: "onUpdateTick",
          advanced: !0
        }
      };
    }
    constructor(t) {
      super(t), this.buffer = {
        timestamps: [],
        data_rate: [],
        event_time: [],
        total_time: [],
        parse_time: [],
        udp_time: []
      };
    }
    onBufferResize() {
      const t = this.settings.bufferLength;
      Object.keys(this.buffer).forEach((a) => {
        this.buffer[a] = this.buffer[a].slice(-t);
      });
    }
    formatPlotly(t) {
      var _, E;
      if (!((E = (_ = t == null ? void 0 : t.data) == null ? void 0 : _.arr) != null && E.length))
        return { data: [], layout: {} };
      const a = t.data.arr[0], s = (/* @__PURE__ */ new Date()).toISOString();
      this.buffer.timestamps.push(s), this.buffer.data_rate.push(a.data_rate), this.buffer.event_time.push(a.event_time), this.buffer.total_time.push(a.total_time), this.buffer.parse_time.push(a.parse_time), this.buffer.udp_time.push(a.udp_time);
      const o = this.settings.bufferLength;
      Object.keys(this.buffer).forEach((m) => {
        this.buffer[m] = this.buffer[m].slice(-o);
      });
      const u = [
        { key: "data_rate", label: "Data Rate" },
        { key: "event_time", label: "Event Time" },
        { key: "total_time", label: "Total Time" },
        { key: "parse_time", label: "Parse Time" },
        { key: "udp_time", label: "UDP Time" }
      ], p = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"], y = u.map((m, T) => ({
        type: "scatter",
        mode: "lines+markers",
        x: this.buffer.timestamps,
        y: this.buffer[m.key],
        name: m.label,
        xaxis: `x${T + 1}`,
        yaxis: `y${T + 1}`,
        marker: { color: p[T % p.length] },
        line: { color: p[T % p.length] }
      })), g = {
        autosize: !0,
        margin: { t: 40, r: 20, l: 40, b: 30 },
        grid: { rows: 5, columns: 1, pattern: "independent" },
        legend: { orientation: "h", y: -0.2 }
      };
      return u.forEach((m, T) => {
        g[`xaxis${T + 1}`] = {
          title: "Time",
          showgrid: !1
        }, g[`yaxis${T + 1}`] = {
          title: m.label,
          showgrid: !0
        };
      }), { data: y, layout: g };
    }
  }, x(n, "displayName", "Nalu Timing Ticker"), x(n, "name", "NaluTimingTicker"), n;
}
var C = { exports: {} }, j = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var V;
function ue() {
  if (V) return j;
  V = 1;
  var l = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function n(h, t, a) {
    var s = null;
    if (a !== void 0 && (s = "" + a), t.key !== void 0 && (s = "" + t.key), "key" in t) {
      a = {};
      for (var o in t)
        o !== "key" && (a[o] = t[o]);
    } else a = t;
    return t = a.ref, {
      $$typeof: l,
      type: h,
      key: s,
      ref: t !== void 0 ? t : null,
      props: a
    };
  }
  return j.Fragment = i, j.jsx = n, j.jsxs = n, j;
}
var S = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var G;
function fe() {
  return G || (G = 1, process.env.NODE_ENV !== "production" && function() {
    function l(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === te ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case T:
          return "Fragment";
        case A:
          return "Profiler";
        case P:
          return "StrictMode";
        case Z:
          return "Suspense";
        case Q:
          return "SuspenseList";
        case ee:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case m:
            return "Portal";
          case B:
            return (e.displayName || "Context") + ".Provider";
          case k:
            return (e._context.displayName || "Context") + ".Consumer";
          case J:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case K:
            return r = e.displayName || null, r !== null ? r : l(e.type) || "Memo";
          case $:
            r = e._payload, e = e._init;
            try {
              return l(e(r));
            } catch {
            }
        }
      return null;
    }
    function i(e) {
      return "" + e;
    }
    function n(e) {
      try {
        i(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var c = r.error, f = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return c.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          f
        ), i(e);
      }
    }
    function h(e) {
      if (e === T) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === $)
        return "<...>";
      try {
        var r = l(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function t() {
      var e = O.A;
      return e === null ? null : e.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function s(e) {
      if (L.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function o(e, r) {
      function c() {
        Y || (Y = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      c.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: c,
        configurable: !0
      });
    }
    function u() {
      var e = l(this.type);
      return W[e] || (W[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function p(e, r, c, f, R, v, I, U) {
      return c = v.ref, e = {
        $$typeof: E,
        type: e,
        key: r,
        props: v,
        _owner: R
      }, (c !== void 0 ? c : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: u
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: I
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: U
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function y(e, r, c, f, R, v, I, U) {
      var d = r.children;
      if (d !== void 0)
        if (f)
          if (re(d)) {
            for (f = 0; f < d.length; f++)
              g(d[f]);
            Object.freeze && Object.freeze(d);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else g(d);
      if (L.call(r, "key")) {
        d = l(e);
        var N = Object.keys(r).filter(function(ae) {
          return ae !== "key";
        });
        f = 0 < N.length ? "{key: someKey, " + N.join(": ..., ") + ": ...}" : "{key: someKey}", z[d + f] || (N = 0 < N.length ? "{" + N.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          f,
          d,
          N,
          d
        ), z[d + f] = !0);
      }
      if (d = null, c !== void 0 && (n(c), d = "" + c), s(r) && (n(r.key), d = "" + r.key), "key" in r) {
        c = {};
        for (var D in r)
          D !== "key" && (c[D] = r[D]);
      } else c = r;
      return d && o(
        c,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), p(
        e,
        d,
        v,
        R,
        t(),
        c,
        I,
        U
      );
    }
    function g(e) {
      typeof e == "object" && e !== null && e.$$typeof === E && e._store && (e._store.validated = 1);
    }
    var _ = oe, E = Symbol.for("react.transitional.element"), m = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), P = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), k = Symbol.for("react.consumer"), B = Symbol.for("react.context"), J = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), $ = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), te = Symbol.for("react.client.reference"), O = _.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = Object.prototype.hasOwnProperty, re = Array.isArray, w = console.createTask ? console.createTask : function() {
      return null;
    };
    _ = {
      "react-stack-bottom-frame": function(e) {
        return e();
      }
    };
    var Y, W = {}, F = _["react-stack-bottom-frame"].bind(
      _,
      a
    )(), M = w(h(a)), z = {};
    S.Fragment = T, S.jsx = function(e, r, c, f, R) {
      var v = 1e4 > O.recentlyCreatedOwnerStacks++;
      return y(
        e,
        r,
        c,
        !1,
        f,
        R,
        v ? Error("react-stack-top-frame") : F,
        v ? w(h(e)) : M
      );
    }, S.jsxs = function(e, r, c, f, R) {
      var v = 1e4 > O.recentlyCreatedOwnerStacks++;
      return y(
        e,
        r,
        c,
        !0,
        f,
        R,
        v ? Error("react-stack-top-frame") : F,
        v ? w(h(e)) : M
      );
    };
  }()), S;
}
var H;
function de() {
  return H || (H = 1, process.env.NODE_ENV === "production" ? C.exports = ue() : C.exports = fe()), C.exports;
}
var b = de();
function me({ Table: l, SettingTypes: i }) {
  var n;
  return n = class extends l {
    static get settingSchema() {
      return {
        ...super.settingSchema,
        dataUrl: {
          type: i.STRING,
          default: "http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/NaluTimeCollection",
          label: "Data URL",
          onChange: "onUpdateTick",
          advanced: !0
        }
      };
    }
    constructor(t) {
      super(t), this.state = { data: null, loading: !0, error: null };
    }
    onInit() {
      this.fetchData();
    }
    onUpdateTick() {
      this.fetchData();
    }
    fetchData() {
      fetch(this.getDataUrl()).then((t) => t.ok ? t.json() : Promise.reject(`HTTP ${t.status}`)).then((t) => {
        var s, o;
        const a = (o = (s = t == null ? void 0 : t.data) == null ? void 0 : s.arr) == null ? void 0 : o[0];
        if (!a) throw new Error("No data found.");
        this.setState({ data: a, loading: !1, error: null });
      }).catch((t) => {
        this.setState({ error: t.message, loading: !1 });
      });
    }
    render() {
      const { loading: t, error: a, data: s } = this.state;
      if (t) return /* @__PURE__ */ b.jsx("div", { children: "Loading..." });
      if (a) return /* @__PURE__ */ b.jsxs("div", { style: { color: "red" }, children: [
        "Error: ",
        a
      ] });
      if (!s) return /* @__PURE__ */ b.jsx("div", { children: "No data" });
      const o = Object.entries(s).filter(([u]) => u !== "_typename" && u !== "fBits" && u !== "fUniqueID");
      return /* @__PURE__ */ b.jsx("div", { className: "no-drag", style: { overflowX: "auto" }, children: /* @__PURE__ */ b.jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
        /* @__PURE__ */ b.jsx("thead", { children: /* @__PURE__ */ b.jsxs("tr", { children: [
          /* @__PURE__ */ b.jsx("th", { style: X, children: "Metric" }),
          /* @__PURE__ */ b.jsx("th", { style: X, children: "Value" })
        ] }) }),
        /* @__PURE__ */ b.jsx("tbody", { children: o.map(([u, p]) => /* @__PURE__ */ b.jsxs("tr", { children: [
          /* @__PURE__ */ b.jsx("td", { style: q, children: u }),
          /* @__PURE__ */ b.jsx("td", { style: q, children: p })
        ] }, u)) })
      ] }) });
    }
  }, x(n, "displayName", "Nalu Timing Table"), x(n, "name", "NaluTimingTable"), n;
}
const X = { borderBottom: "2px solid #ccc", padding: "8px", textAlign: "left", backgroundColor: "#f5f5f5" }, q = { borderBottom: "1px solid #ddd", padding: "8px" };
function _e({ registry: l, baseClasses: i }) {
  const { Plot: n, SettingTypes: h, Table: t } = i, a = le({ Plot: n, SettingTypes: h }), s = ie({ Plot: n, SettingTypes: h }), o = ce({ Plot: n, SettingTypes: h }), u = me({ Table: t, SettingTypes: h });
  l.register(a.name, a), l.register(s.name, s), l.register(o.name, o), l.register(u.name, u);
}
export {
  _e as default
};
