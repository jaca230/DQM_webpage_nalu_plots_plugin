export default function makeNaluTimingTable({ Table, SettingTypes }) {
  return class NaluTimingTable extends Table {
    static displayName = 'Nalu Timing Table';
    static name = 'NaluTimingTable';

    static get settingSchema() {
      return {
        ...super.settingSchema,
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
      this.state = { data: null, loading: true, error: null };
    }

    onInit() {
      this.fetchData();
    }

    onUpdateTick() {
      this.fetchData();
    }

    fetchData() {
      fetch(this.getDataUrl())
        .then(res => res.ok ? res.json() : Promise.reject(`HTTP ${res.status}`))
        .then(json => {
          const item = json?.data?.arr?.[0];
          if (!item) throw new Error('No data found.');
          this.setState({ data: item, loading: false, error: null });
        })
        .catch(err => {
          this.setState({ error: err.message, loading: false });
        });
    }

    render() {
      const { loading, error, data } = this.state;
      if (loading) return <div>Loading...</div>;
      if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
      if (!data) return <div>No data</div>;

      const entries = Object.entries(data).filter(([k]) => k !== '_typename' && k !== 'fBits' && k !== 'fUniqueID');
      return (
        <div className="no-drag" style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr><th style={thStyle}>Metric</th><th style={thStyle}>Value</th></tr>
            </thead>
            <tbody>
              {entries.map(([key, val]) => (
                <tr key={key}>
                  <td style={tdStyle}>{key}</td>
                  <td style={tdStyle}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };
}

const thStyle = { borderBottom: '2px solid #ccc', padding: '8px', textAlign: 'left', backgroundColor: '#f5f5f5' };
const tdStyle = { borderBottom: '1px solid #ddd', padding: '8px' };
