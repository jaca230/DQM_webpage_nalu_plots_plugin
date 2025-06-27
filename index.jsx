// index.js

import makeNaluIntegralHistogram from './figures/NaluIntegralHistogram.jsx';

export default function registerFigures({ registry, baseClasses }) {
  const { Plot, SettingTypes } = baseClasses;

  const NaluIntegralHistogram = makeNaluIntegralHistogram({ Plot, SettingTypes });

  registry.register(NaluIntegralHistogram.displayName, NaluIntegralHistogram);
}
