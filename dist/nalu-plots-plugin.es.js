var x = Object.defineProperty;
var N = (e, t, a) => t in e ? x(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var m = (e, t, a) => N(e, typeof t != "symbol" ? t + "" : t, a);
function b({ Plot: e, SettingTypes: t }) {
  var a;
  return a = class extends e {
    static get settingSchema() {
      return {
        ...super.settingSchema,
        selectedChannel: {
          type: t.INT,
          default: 0,
          label: "Channel #",
          onChange: "onUpdateTick",
          advanced: !1
        },
        dataUrl: {
          type: t.STRING,
          default: "http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/ChannelIntegralHistogramCollection",
          label: "Data URL",
          onChange: "onUpdateTick",
          advanced: !0
        }
      };
    }
    formatPlotly(n) {
      var f;
      const i = (f = n == null ? void 0 : n.data) == null ? void 0 : f.arr;
      if (!Array.isArray(i) || i.length === 0)
        return console.warn("No histograms found or empty array."), { data: [], layout: {} };
      const s = this.settings.selectedChannel;
      if (s < 0 || s >= i.length)
        return console.warn(`Selected channel ${s} is out of bounds.`), { data: [], layout: {} };
      const r = i[s];
      if (!r || !Array.isArray(r.fArray))
        return console.warn(`Histogram at selected index ${s} is invalid:`, r), { data: [], layout: {} };
      const g = r.fArray, l = r.fXaxis || {}, c = l.fNbins || g.length - 2, h = l.fXmin ?? 0, y = ((l.fXmax ?? 1) - h) / c, o = [];
      for (let d = 0; d <= c; d++)
        o.push(h + d * y);
      const p = [0, ...g.slice(1, c + 1)];
      return {
        data: [
          {
            type: "bar",
            x: o,
            y: p,
            name: r.fName || `hist_${s}`,
            marker: { color: "steelblue" },
            hoverinfo: "x+y+name",
            width: y
          }
        ],
        layout: {
          autosize: !0,
          margin: { t: 30, r: 20, l: 40, b: 40 },
          xaxis: {
            title: "Integral",
            range: [o[0], o[o.length - 1]]
          },
          yaxis: { title: "Counts" },
          bargap: 0,
          legend: { orientation: "h", y: -0.2 }
        }
      };
    }
  }, m(a, "displayName", "Nalu Integral Histogram"), a;
}
function k({ registry: e, baseClasses: t }) {
  const { Plot: a, SettingTypes: u } = t, n = b({ Plot: a, SettingTypes: u });
  e.register(n.displayName, n);
}
export {
  k as default
};
