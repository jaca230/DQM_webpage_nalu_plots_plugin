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

    // Called once at init: define layout + first data
    initPlot(json) {
      const trace = this.buildTrace(json);
      return {
        data: trace ? [trace] : [],
        layout: {
          autosize: true,
          margin: { t: 30, r: 20, l: 40, b: 40 },
          xaxis: { title: 'Sample Number' },
          yaxis: { title: 'ADC Value' },
          legend: { orientation: 'h', y: -0.2 },
        },
      };
    }

    // Called periodically: only update data (reuse layout)
    updatePlot(json) {
      const trace = this.buildTrace(json);
      return {
        data: trace ? [trace] : [],
        layout: undefined, // don't touch layout unless needed
      };
    }

    // Shared trace construction logic
    buildTrace(raw) {
      const waveformList = raw?.data?.arr;
      if (!Array.isArray(waveformList) || waveformList.length === 0) {
        console.warn('No waveforms found or empty array.');
        return null;
      }

      const selectedChannel = this.settings.selectedChannel;
      const waveform = waveformList.find(wf => wf.channel_num === selectedChannel);

      if (!waveform || !Array.isArray(waveform.trace)) {
        console.warn(`No waveform found for selected channel ${selectedChannel}`);
        return null;
      }

      return {
        type: 'scatter',
        mode: 'lines',
        x: waveform.trace.map((_, i) => i),
        y: waveform.trace,
        name: `Channel ${selectedChannel} Trace`,
        line: { color: 'steelblue' },
        hoverinfo: 'x+y+name',
      };
    }
  };
}
