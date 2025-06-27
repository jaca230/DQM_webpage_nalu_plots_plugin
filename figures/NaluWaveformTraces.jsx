export default function makeNaluWaveformTraces({ Plot, SettingTypes }) {
  return class NaluWaveformTraces extends Plot {
    static displayName = 'Nalu Waveform Traces';
    static name = 'NaluWaveformTraces';

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
            'http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/NaluWaveformCollection',
          label: 'Data URL',
          onChange: 'onUpdateTick',
          advanced: true,
        },
      };
    }

    formatPlotly(raw) {
      const waveformList = raw?.data?.arr;
      if (!Array.isArray(waveformList) || waveformList.length === 0) {
        console.warn('No waveforms found or empty array.');
        return { data: [], layout: {} };
      }

      const selectedChannel = this.settings.selectedChannel;
      const waveform = waveformList.find(wf => wf.channel_num === selectedChannel);

      if (!waveform || !Array.isArray(waveform.trace)) {
        console.warn(`No waveform found for selected channel ${selectedChannel}`);
        return { data: [], layout: {} };
      }

      const xValues = waveform.trace.map((_, i) => i);
      const yValues = waveform.trace;

      return {
        data: [
          {
            type: 'scatter',
            mode: 'lines',
            x: xValues,
            y: yValues,
            name: `Channel ${selectedChannel} Trace`,
            line: { color: 'steelblue' },
            hoverinfo: 'x+y+name',
          },
        ],
        layout: {
          autosize: true,
          margin: { t: 30, r: 20, l: 40, b: 40 },
          xaxis: {
            title: 'Sample Number',
            range: [0, xValues.length - 1],
          },
          yaxis: { title: 'ADC Value' },
          legend: { orientation: 'h', y: -0.2 },
        },
      };
    }
  };
}
