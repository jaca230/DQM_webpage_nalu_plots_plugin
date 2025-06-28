export default function makeNaluTimingTicker({ Plot, SettingTypes }) {
  return class NaluTimingTicker extends Plot {
    static displayName = 'Nalu Timing Ticker';
    static name = 'NaluTimingTicker';

    static get settingSchema() {
      return {
        ...super.settingSchema,
        bufferLength: {
          type: SettingTypes.INT,
          default: 20,
          label: 'Buffer Length',
          onChange: 'onBufferResize',
          advanced: true,
        },
        dataUrl: {
          type: SettingTypes.STRING,
          default: 'http://127.0.0.1:8000/api/json_path?last=1&json_path=/data_products/NaluTimeCollection',
          label: 'Data URL',
          onChange: 'onUpdateTick',
          advanced: true,
        },
      };
    }

    constructor(props) {
      super(props);
      this.buffer = {
        timestamps: [],
        data_rate: [],
        event_time: [],
        total_time: [],
        parse_time: [],
        udp_time: [],
      };

      this.fields = [
        { key: 'data_rate', label: 'Data Rate' },
        { key: 'event_time', label: 'Event Time' },
        { key: 'total_time', label: 'Total Time' },
        { key: 'parse_time', label: 'Parse Time' },
        { key: 'udp_time', label: 'UDP Time' },
      ];

      this.colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];
    }

    onBufferResize() {
      const len = this.settings.bufferLength;
      Object.keys(this.buffer).forEach(key => {
        this.buffer[key] = this.buffer[key].slice(-len);
      });
    }

    initPlot(json) {
      this.addEntryToBuffer(json);
      return {
        data: this.buildTraces(),
        layout: this.buildLayout(),
      };
    }

    updatePlot(json) {
      this.addEntryToBuffer(json);
      return {
        data: this.buildTraces(),
        layout: undefined, // layout stays untouched
      };
    }

    addEntryToBuffer(raw) {
      const entry = raw?.data?.arr?.[0];
      if (!entry) return;

      const timestamp = new Date().toISOString();
      this.buffer.timestamps.push(timestamp);
      this.buffer.data_rate.push(entry.data_rate);
      this.buffer.event_time.push(entry.event_time);
      this.buffer.total_time.push(entry.total_time);
      this.buffer.parse_time.push(entry.parse_time);
      this.buffer.udp_time.push(entry.udp_time);

      const maxLen = this.settings.bufferLength;
      Object.keys(this.buffer).forEach(key => {
        this.buffer[key] = this.buffer[key].slice(-maxLen);
      });
    }

    buildTraces() {
      return this.fields.map((field, i) => ({
        type: 'scatter',
        mode: 'lines+markers',
        x: this.buffer.timestamps,
        y: this.buffer[field.key],
        name: field.label,
        xaxis: `x${i + 1}`,
        yaxis: `y${i + 1}`,
        marker: { color: this.colors[i % this.colors.length] },
        line: { color: this.colors[i % this.colors.length] },
      }));
    }

    buildLayout() {
      const layout = {
        autosize: true,
        margin: { t: 40, r: 20, l: 40, b: 30 },
        grid: { rows: this.fields.length, columns: 1, pattern: 'independent' },
        legend: { orientation: 'h', y: -0.2 },
      };

      this.fields.forEach((field, i) => {
        layout[`xaxis${i + 1}`] = {
          title: 'Time',
          showgrid: false,
        };
        layout[`yaxis${i + 1}`] = {
          title: field.label,
          showgrid: true,
        };
      });

      return layout;
    }
  };
}
