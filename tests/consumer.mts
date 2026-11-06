import * as api from '@lp-labs/histogram-binning';
import { histogram } from '@lp-labs/histogram-binning';
const bins = histogram([1, 2, 3, 4], 'sturges');
if (bins.reduce((n, bin) => n + bin.count, 0) !== 4) throw new Error('Sample count mismatch');
// @ts-expect-error invalid argument must be rejected by declarations
api.histogram('not an array');
