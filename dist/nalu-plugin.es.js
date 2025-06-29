function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
  return t;
}
function _superPropGet(t, o, e, r) {
  var p = _get(_getPrototypeOf(t), o, e);
  return p;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function makeNaluIntegralHistogram(_ref) {
  var _NaluIntegralHistogram;
  var Plot = _ref.Plot,
    SettingTypes = _ref.SettingTypes;
  return _NaluIntegralHistogram = /*#__PURE__*/function (_Plot) {
    function NaluIntegralHistogram() {
      _classCallCheck(this, NaluIntegralHistogram);
      return _callSuper(this, NaluIntegralHistogram, arguments);
    }
    _inherits(NaluIntegralHistogram, _Plot);
    return _createClass(NaluIntegralHistogram, [{
      key: "initPlot",
      value: function initPlot(raw) {
        var data = this.extractPlotData(raw);
        return {
          data: data ? [data] : [],
          layout: this.buildLayout(data)
        };
      }
    }, {
      key: "updatePlot",
      value: function updatePlot(raw) {
        var data = this.extractPlotData(raw);
        return {
          data: data ? [data] : [],
          layout: undefined // no layout update needed
        };
      }
    }, {
      key: "extractPlotData",
      value: function extractPlotData(raw) {
        var _raw$data, _fXaxis$fXmin, _fXaxis$fXmax;
        var histList = raw === null || raw === void 0 || (_raw$data = raw.data) === null || _raw$data === void 0 ? void 0 : _raw$data.arr;
        if (!Array.isArray(histList) || histList.length === 0) {
          console.warn('No histograms found or empty array.');
          return null;
        }
        var targetChannel = this.settings.selectedChannel;

        // Find the histogram whose name or title contains "channel_<targetChannel>"
        var hist = histList.find(function (h) {
          var _h$fName, _h$fTitle;
          var name = ((_h$fName = h.fName) === null || _h$fName === void 0 ? void 0 : _h$fName.toLowerCase()) || '';
          var title = ((_h$fTitle = h.fTitle) === null || _h$fTitle === void 0 ? void 0 : _h$fTitle.toLowerCase()) || '';
          var pattern = new RegExp("channel[_\\s]*".concat(targetChannel, "\\b"));
          return pattern.test(name) || pattern.test(title);
        });
        if (!hist) {
          console.warn("No histogram found for channel ".concat(targetChannel));
          return null;
        }
        var fArray = hist.fArray;
        if (!Array.isArray(fArray)) {
          console.warn("Histogram for channel ".concat(targetChannel, " has invalid fArray"));
          return null;
        }
        var fXaxis = hist.fXaxis || {};
        var nBins = fXaxis.fNbins || fArray.length - 2;
        var xMin = (_fXaxis$fXmin = fXaxis.fXmin) !== null && _fXaxis$fXmin !== void 0 ? _fXaxis$fXmin : 0;
        var xMax = (_fXaxis$fXmax = fXaxis.fXmax) !== null && _fXaxis$fXmax !== void 0 ? _fXaxis$fXmax : 1;
        var binWidth = (xMax - xMin) / nBins;
        var binEdges = [];
        for (var i = 0; i <= nBins; i++) {
          binEdges.push(xMin + i * binWidth);
        }
        var counts = fArray.slice(1, nBins + 1); // skip underflow bin
        var yVals = [0].concat(_toConsumableArray(counts)); // bar plot expects same length for x/y

        return {
          type: 'bar',
          x: binEdges,
          y: yVals,
          name: hist.fName || "hist_channel_".concat(targetChannel),
          marker: {
            color: 'steelblue'
          },
          hoverinfo: 'x+y+name',
          width: binWidth
        };
      }
    }, {
      key: "buildLayout",
      value: function buildLayout(dataTrace) {
        if (!dataTrace) return {};
        var xVals = dataTrace.x;
        return {
          autosize: true,
          margin: {
            t: 30,
            r: 20,
            l: 40,
            b: 40
          },
          xaxis: {
            title: 'Integral',
            range: [xVals[0], xVals[xVals.length - 1]]
          },
          yaxis: {
            title: 'Counts'
          },
          bargap: 0,
          legend: {
            orientation: 'h',
            y: -0.2
          }
        };
      }
    }], [{
      key: "settingSchema",
      get: function get() {
        return _objectSpread2(_objectSpread2({}, _superPropGet(NaluIntegralHistogram, "settingSchema", this)), {}, {
          selectedChannel: {
            type: SettingTypes.INT,
            "default": 0,
            label: 'Channel #',
            onChange: 'onUpdateTick',
            advanced: false
          },
          dataUrl: {
            type: SettingTypes.STRING,
            "default": 'http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/ChannelIntegralHistogramCollection',
            label: 'Data URL',
            onChange: 'onUpdateTick',
            advanced: true
          }
        });
      }
    }]);
  }(Plot), _defineProperty(_NaluIntegralHistogram, "displayName", 'Nalu Integral Histogram'), _defineProperty(_NaluIntegralHistogram, "name", 'NaluIntegralHistogram'), _NaluIntegralHistogram;
}

function makeNaluWaveformTraces(_ref) {
  var _NaluWaveformTraces;
  var Plot = _ref.Plot,
    SettingTypes = _ref.SettingTypes;
  return _NaluWaveformTraces = /*#__PURE__*/function (_Plot) {
    function NaluWaveformTraces() {
      _classCallCheck(this, NaluWaveformTraces);
      return _callSuper(this, NaluWaveformTraces, arguments);
    }
    _inherits(NaluWaveformTraces, _Plot);
    return _createClass(NaluWaveformTraces, [{
      key: "initPlot",
      value:
      // Called once at init: define layout + first data
      function initPlot(json) {
        var trace = this.buildTrace(json);
        return {
          data: trace ? [trace] : [],
          layout: {
            autosize: true,
            margin: {
              t: 30,
              r: 20,
              l: 40,
              b: 40
            },
            xaxis: {
              title: 'Sample Number'
            },
            yaxis: {
              title: 'ADC Value'
            },
            legend: {
              orientation: 'h',
              y: -0.2
            }
          }
        };
      }

      // Called periodically: only update data (reuse layout)
    }, {
      key: "updatePlot",
      value: function updatePlot(json) {
        var trace = this.buildTrace(json);
        return {
          data: trace ? [trace] : [],
          layout: undefined // don't touch layout unless needed
        };
      }

      // Shared trace construction logic
    }, {
      key: "buildTrace",
      value: function buildTrace(raw) {
        var _raw$data;
        var waveformList = raw === null || raw === void 0 || (_raw$data = raw.data) === null || _raw$data === void 0 ? void 0 : _raw$data.arr;
        if (!Array.isArray(waveformList) || waveformList.length === 0) {
          console.warn('No waveforms found or empty array.');
          return null;
        }
        var selectedChannel = this.settings.selectedChannel;
        var waveform = waveformList.find(function (wf) {
          return wf.channel_num === selectedChannel;
        });
        if (!waveform || !Array.isArray(waveform.trace)) {
          console.warn("No waveform found for selected channel ".concat(selectedChannel));
          return null;
        }
        return {
          type: 'scatter',
          mode: 'lines',
          x: waveform.trace.map(function (_, i) {
            return i;
          }),
          y: waveform.trace,
          name: "Channel ".concat(selectedChannel, " Trace"),
          line: {
            color: 'steelblue'
          },
          hoverinfo: 'x+y+name'
        };
      }
    }], [{
      key: "settingSchema",
      get: function get() {
        return _objectSpread2(_objectSpread2({}, _superPropGet(NaluWaveformTraces, "settingSchema", this)), {}, {
          selectedChannel: {
            type: SettingTypes.INT,
            "default": 0,
            label: 'Channel #',
            onChange: 'onUpdateTick',
            advanced: false
          },
          dataUrl: {
            type: SettingTypes.STRING,
            "default": 'http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/NaluWaveformCollection',
            label: 'Data URL',
            onChange: 'onUpdateTick',
            advanced: true
          }
        });
      }
    }]);
  }(Plot), _defineProperty(_NaluWaveformTraces, "displayName", 'Nalu Waveform Traces'), _defineProperty(_NaluWaveformTraces, "name", 'NaluWaveformTraces'), _NaluWaveformTraces;
}

function makeNaluTimingTicker(_ref) {
  var _NaluTimingTicker;
  var Plot = _ref.Plot,
    SettingTypes = _ref.SettingTypes;
  return _NaluTimingTicker = /*#__PURE__*/function (_Plot) {
    function NaluTimingTicker(props) {
      var _this;
      _classCallCheck(this, NaluTimingTicker);
      _this = _callSuper(this, NaluTimingTicker, [props]);
      _this.buffer = {
        timestamps: [],
        data_rate: [],
        event_time: [],
        total_time: [],
        parse_time: [],
        udp_time: []
      };
      _this.fields = [{
        key: 'data_rate',
        label: 'Data Rate (MB/s)'
      }, {
        key: 'event_time',
        label: 'Event Time (s)'
      }, {
        key: 'total_time',
        label: 'Total Time (s)'
      }, {
        key: 'parse_time',
        label: 'Parse Time (s)'
      }, {
        key: 'udp_time',
        label: 'UDP Time (s)'
      }];
      _this.colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];
      return _this;
    }
    _inherits(NaluTimingTicker, _Plot);
    return _createClass(NaluTimingTicker, [{
      key: "onBufferResize",
      value: function onBufferResize() {
        var _this2 = this;
        var len = this.settings.bufferLength;
        Object.keys(this.buffer).forEach(function (key) {
          _this2.buffer[key] = _this2.buffer[key].slice(-len);
        });
      }
    }, {
      key: "initPlot",
      value: function initPlot(json) {
        this.addEntryToBuffer(json);
        return {
          data: this.buildTraces(),
          layout: this.buildLayout()
        };
      }
    }, {
      key: "updatePlot",
      value: function updatePlot(json) {
        this.addEntryToBuffer(json);
        return {
          data: this.buildTraces(),
          layout: undefined // layout stays untouched
        };
      }
    }, {
      key: "addEntryToBuffer",
      value: function addEntryToBuffer(raw) {
        var _raw$data,
          _this3 = this;
        var entry = raw === null || raw === void 0 || (_raw$data = raw.data) === null || _raw$data === void 0 || (_raw$data = _raw$data.arr) === null || _raw$data === void 0 ? void 0 : _raw$data[0];
        if (!entry) return;
        var timestamp = new Date().toISOString();
        this.buffer.timestamps.push(timestamp);
        this.buffer.data_rate.push(entry.data_rate);
        this.buffer.event_time.push(entry.event_time);
        this.buffer.total_time.push(entry.total_time);
        this.buffer.parse_time.push(entry.parse_time);
        this.buffer.udp_time.push(entry.udp_time);
        var maxLen = this.settings.bufferLength;
        Object.keys(this.buffer).forEach(function (key) {
          _this3.buffer[key] = _this3.buffer[key].slice(-maxLen);
        });
      }
    }, {
      key: "buildTraces",
      value: function buildTraces() {
        var _this4 = this;
        return this.fields.map(function (field, i) {
          return {
            type: 'scatter',
            mode: 'lines+markers',
            x: _this4.buffer.timestamps,
            y: _this4.buffer[field.key],
            name: field.label,
            xaxis: "x".concat(i + 1),
            yaxis: "y".concat(i + 1),
            marker: {
              color: _this4.colors[i % _this4.colors.length]
            },
            line: {
              color: _this4.colors[i % _this4.colors.length]
            }
          };
        });
      }
    }, {
      key: "buildLayout",
      value: function buildLayout() {
        var layout = {
          autosize: true,
          margin: {
            t: 40,
            r: 20,
            l: 40,
            b: 30
          },
          grid: {
            rows: this.fields.length,
            columns: 1,
            pattern: 'independent'
          },
          legend: {
            orientation: 'h',
            y: -0.2
          }
        };
        this.fields.forEach(function (field, i) {
          layout["xaxis".concat(i + 1)] = {
            title: 'Time',
            showgrid: false
          };
          layout["yaxis".concat(i + 1)] = {
            title: field.label,
            showgrid: true
          };
        });
        return layout;
      }
    }], [{
      key: "settingSchema",
      get: function get() {
        return _objectSpread2(_objectSpread2({}, _superPropGet(NaluTimingTicker, "settingSchema", this)), {}, {
          bufferLength: {
            type: SettingTypes.INT,
            "default": 20,
            label: 'Buffer Length',
            onChange: 'onBufferResize',
            advanced: true
          },
          dataUrl: {
            type: SettingTypes.STRING,
            "default": 'http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/NaluTimeCollection',
            label: 'Data URL',
            onChange: 'onUpdateTick',
            advanced: true
          }
        });
      }
    }]);
  }(Plot), _defineProperty(_NaluTimingTicker, "displayName", 'Nalu Timing Ticker'), _defineProperty(_NaluTimingTicker, "name", 'NaluTimingTicker'), _NaluTimingTicker;
}

function makeNaluTimingTable(_ref) {
  var _NaluTimingTable;
  var Table = _ref.Table,
    SettingTypes = _ref.SettingTypes;
  return _NaluTimingTable = /*#__PURE__*/function (_Table) {
    function NaluTimingTable(props) {
      var _this;
      _classCallCheck(this, NaluTimingTable);
      _this = _callSuper(this, NaluTimingTable, [props]);
      _this.state = {
        data: null,
        loading: true,
        error: null
      };
      return _this;
    }
    _inherits(NaluTimingTable, _Table);
    return _createClass(NaluTimingTable, [{
      key: "onInit",
      value: function onInit() {
        this.fetchData();
      }
    }, {
      key: "onUpdateTick",
      value: function onUpdateTick() {
        this.fetchData();
      }
    }, {
      key: "fetchData",
      value: function fetchData() {
        var _this2 = this;
        fetch(this.getDataUrl()).then(function (res) {
          return res.ok ? res.json() : Promise.reject("HTTP ".concat(res.status));
        }).then(function (json) {
          var _json$data;
          var item = json === null || json === void 0 || (_json$data = json.data) === null || _json$data === void 0 || (_json$data = _json$data.arr) === null || _json$data === void 0 ? void 0 : _json$data[0];
          if (!item) throw new Error('No data found.');
          _this2.setState({
            data: item,
            loading: false,
            error: null
          });
        })["catch"](function (err) {
          _this2.setState({
            error: err.message,
            loading: false
          });
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$state = this.state,
          loading = _this$state.loading,
          error = _this$state.error,
          data = _this$state.data;
        if (loading) return /*#__PURE__*/React.createElement("div", null, "Loading...");
        if (error) return /*#__PURE__*/React.createElement("div", {
          style: {
            color: 'red'
          }
        }, "Error: ", error);
        if (!data) return /*#__PURE__*/React.createElement("div", null, "No data");
        var entries = Object.entries(data).filter(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 1),
            k = _ref3[0];
          return k !== '_typename' && k !== 'fBits' && k !== 'fUniqueID';
        });
        var metricLabels = {
          collection_cycle_index: 'Cycle Index',
          collection_cycle_timestamp_ns: 'Timestamp (ns)',
          udp_time: 'UDP Receive Time (µs)',
          parse_time: 'Parse Time (µs)',
          event_time: 'Event Processing Time (µs)',
          total_time: 'Total Cycle Time (µs)',
          data_processed: 'Data Processed (KB)',
          data_rate: 'Data Rate (MB/s)'
        };
        var formatValue = function formatValue(key, val) {
          if (typeof val !== 'number') return val;
          switch (key) {
            case 'collection_cycle_index':
            case 'collection_cycle_timestamp_ns':
              return Math.round(val);
            case 'udp_time':
            case 'parse_time':
            case 'event_time':
            case 'total_time':
              return (val * 1e6).toFixed(3);
            case 'data_processed':
              return (val / 1e3).toFixed(3);
            // bytes → KB

            default:
              return val.toFixed(3);
          }
        };
        return /*#__PURE__*/React.createElement("div", {
          className: "no-drag",
          style: {
            overflowX: 'auto'
          }
        }, /*#__PURE__*/React.createElement("table", {
          style: {
            borderCollapse: 'collapse',
            width: '100%'
          }
        }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
          style: thStyle
        }, "Metric"), /*#__PURE__*/React.createElement("th", {
          style: thStyle
        }, "Value"))), /*#__PURE__*/React.createElement("tbody", null, entries.map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
            key = _ref5[0],
            val = _ref5[1];
          return /*#__PURE__*/React.createElement("tr", {
            key: key
          }, /*#__PURE__*/React.createElement("td", {
            style: tdStyle
          }, metricLabels[key] || key), /*#__PURE__*/React.createElement("td", {
            style: tdStyle
          }, formatValue(key, val)));
        }))));
      }
    }], [{
      key: "settingSchema",
      get: function get() {
        return _objectSpread2(_objectSpread2({}, _superPropGet(NaluTimingTable, "settingSchema", this)), {}, {
          dataUrl: {
            type: SettingTypes.STRING,
            "default": 'http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/NaluTimeCollection',
            label: 'Data URL',
            onChange: 'onUpdateTick',
            advanced: true
          }
        });
      }
    }]);
  }(Table), _defineProperty(_NaluTimingTable, "displayName", 'Nalu Timing Table'), _defineProperty(_NaluTimingTable, "name", 'NaluTimingTable'), _NaluTimingTable;
}
var thStyle = {
  borderBottom: '2px solid #ccc',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f5f5f5'
};
var tdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px'
};

function registerFigures(_ref) {
  var registry = _ref.registry,
    baseClasses = _ref.baseClasses;
  var Plot = baseClasses.Plot,
    SettingTypes = baseClasses.SettingTypes,
    Table = baseClasses.Table;
  var NaluIntegralHistogram = makeNaluIntegralHistogram({
    Plot: Plot,
    SettingTypes: SettingTypes
  });
  var NaluWaveformTraces = makeNaluWaveformTraces({
    Plot: Plot,
    SettingTypes: SettingTypes
  });
  var NaluTimingTicker = makeNaluTimingTicker({
    Plot: Plot,
    SettingTypes: SettingTypes
  });
  var NaluTimingTable = makeNaluTimingTable({
    Table: Table,
    SettingTypes: SettingTypes
  });
  registry.register(NaluIntegralHistogram.name, NaluIntegralHistogram);
  registry.register(NaluWaveformTraces.name, NaluWaveformTraces);
  registry.register(NaluTimingTicker.name, NaluTimingTicker);
  registry.register(NaluTimingTable.name, NaluTimingTable);
}

// Also expose globally for eval/script loading
if (typeof window !== 'undefined') {
  window.PluginRegister = registerFigures;
}

export { registerFigures as default };
