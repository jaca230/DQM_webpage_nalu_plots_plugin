import makeNaluIntegralHistogram from './figures/NaluIntegralHistogram.jsx';
import makeNaluWaveformTraces from './figures/NaluWaveformTraces.jsx';
import makeNaluTimingTicker from './figures/NaluTimingTicker.jsx';
import makeNaluTimingTable from './figures/NaluTimingTable.jsx';

function registerFigures({ registry, baseClasses }) {
  const { Plot, SettingTypes, Table } = baseClasses;

  const NaluIntegralHistogram = makeNaluIntegralHistogram({ Plot, SettingTypes });
  const NaluWaveformTraces = makeNaluWaveformTraces({ Plot, SettingTypes });
  const NaluTimingTicker = makeNaluTimingTicker({ Plot, SettingTypes });
  const NaluTimingTable = makeNaluTimingTable({ Table, SettingTypes });

  registry.register(NaluIntegralHistogram.name, NaluIntegralHistogram);
  registry.register(NaluWaveformTraces.name, NaluWaveformTraces);
  registry.register(NaluTimingTicker.name, NaluTimingTicker);
  registry.register(NaluTimingTable.name, NaluTimingTable);
}

// Export for ES module import
export default registerFigures;

// Also expose globally for eval/script loading
if (typeof window !== 'undefined') {
  window.PluginRegister = registerFigures;
}
