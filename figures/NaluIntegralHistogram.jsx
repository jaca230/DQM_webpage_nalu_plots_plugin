export default function makeNaluIntegralHistogram({ Plot, SettingTypes }) {
  return class NaluIntegralHistogram extends Plot {
    static displayName = 'Nalu Integral Histogram';
    static name = 'NaluIntegralHistogram';

    static get settingSchema() {
      return {
        ...super.settingSchema,
        selectedChannel: {
          type: SettingTypes.INT,
          default: 0,
          label: 'Channel #',
          onChange: 'onUpdateTick',
          advanced: false,
        },
        dataUrl: {
          type: SettingTypes.STRING,
          default:
            'http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/ChannelIntegralHistogramCollection',
          label: 'Data URL',
          onChange: 'onUpdateTick',
          advanced: true,
        },
      };
    }

    initPlot(raw) {
      const data = this.extractPlotData(raw);
      return {
        data: data ? [data] : [],
        layout: this.buildLayout(data),
      };
    }

    updatePlot(raw) {
      const data = this.extractPlotData(raw);
      return {
        data: data ? [data] : [],
        layout: undefined, // no layout update needed
      };
    }

    extractPlotData(raw) {
      const histList = raw?.data?.arr;
      if (!Array.isArray(histList) || histList.length === 0) {
        console.warn('No histograms found or empty array.');
        return null;
      }

      const targetChannel = this.settings.selectedChannel;

      // Find the histogram whose name or title contains "channel_<targetChannel>"
      const hist = histList.find(h => {
        const name = h.fName?.toLowerCase() || '';
        const title = h.fTitle?.toLowerCase() || '';
        const pattern = new RegExp(`channel[_\\s]*${targetChannel}\\b`);
        return pattern.test(name) || pattern.test(title);
      });

      if (!hist) {
        console.warn(`No histogram found for channel ${targetChannel}`);
        return null;
      }

      const fArray = hist.fArray;
      if (!Array.isArray(fArray)) {
        console.warn(`Histogram for channel ${targetChannel} has invalid fArray`);
        return null;
      }

      const fXaxis = hist.fXaxis || {};
      const nBins = fXaxis.fNbins || (fArray.length - 2);
      const xMin = fXaxis.fXmin ?? 0;
      const xMax = fXaxis.fXmax ?? 1;
      const binWidth = (xMax - xMin) / nBins;

      const binEdges = [];
      for (let i = 0; i <= nBins; i++) {
        binEdges.push(xMin + i * binWidth);
      }

      const counts = fArray.slice(1, nBins + 1); // skip underflow bin
      const yVals = [0, ...counts]; // bar plot expects same length for x/y

      return {
        type: 'bar',
        x: binEdges,
        y: yVals,
        name: hist.fName || `hist_channel_${targetChannel}`,
        marker: { color: 'steelblue' },
        hoverinfo: 'x+y+name',
        width: binWidth,
      };
    }


    buildLayout(dataTrace) {
      if (!dataTrace) return {};

      const xVals = dataTrace.x;
      return {
        autosize: true,
        margin: { t: 30, r: 20, l: 40, b: 40 },
        xaxis: {
          title: 'Integral',
          range: [xVals[0], xVals[xVals.length - 1]],
        },
        yaxis: { title: 'Counts' },
        bargap: 0,
        legend: { orientation: 'h', y: -0.2 },
      };
    }
  };
}
