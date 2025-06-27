// figures/NaluIntegralHistogram.jsx

export default function makeNaluIntegralHistogram({ Plot, SettingTypes }) {
  return class NaluIntegralHistogram extends Plot {
    static displayName = 'Nalu Integral Histogram';

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

    formatPlotly(raw) {
      const histList = raw?.data?.arr;
      if (!Array.isArray(histList) || histList.length === 0) {
        console.warn('No histograms found or empty array.');
        return { data: [], layout: {} };
      }

      const index = this.settings.selectedChannel;
      if (index < 0 || index >= histList.length) {
        console.warn(`Selected channel ${index} is out of bounds.`);
        return { data: [], layout: {} };
      }

      const hist = histList[index];
      if (!hist || !Array.isArray(hist.fArray)) {
        console.warn(`Histogram at selected index ${index} is invalid:`, hist);
        return { data: [], layout: {} };
      }

      const fArray = hist.fArray;
      const fXaxis = hist.fXaxis || {};
      const nBins = fXaxis.fNbins || (fArray.length - 2);
      const xMin = fXaxis.fXmin ?? 0;
      const xMax = fXaxis.fXmax ?? 1;
      const binWidth = (xMax - xMin) / nBins;

      const binEdges = [];
      for (let i = 0; i <= nBins; i++) {
        binEdges.push(xMin + i * binWidth);
      }

      const counts = fArray.slice(1, nBins + 1);
      const yVals = [0, ...counts];

      return {
        data: [
          {
            type: 'bar',
            x: binEdges,
            y: yVals,
            name: hist.fName || `hist_${index}`,
            marker: { color: 'steelblue' },
            hoverinfo: 'x+y+name',
            width: binWidth,
          },
        ],
        layout: {
          autosize: true,
          margin: { t: 30, r: 20, l: 40, b: 40 },
          xaxis: {
            title: 'Integral',
            range: [binEdges[0], binEdges[binEdges.length - 1]],
          },
          yaxis: { title: 'Counts' },
          bargap: 0,
          legend: { orientation: 'h', y: -0.2 },
        },
      };
    }
  };
}
