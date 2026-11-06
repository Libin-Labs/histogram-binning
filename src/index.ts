export interface Bin {
  readonly lower: number;
  readonly upper: number;
  readonly count: number;
}
function quantile(sorted: number[], p: number): number {
  const x = (sorted.length - 1) * p,
    i = Math.floor(x),
    f = x - i;
  return sorted[i]! * (1 - f) + sorted[Math.min(i + 1, sorted.length - 1)]! * f;
}
export function histogram(
  values: readonly number[],
  method: 'sqrt' | 'sturges' | 'fd' = 'sturges',
): Bin[] {
  if (!Array.isArray(values) || values.length < 1 || values.length > 1000000)
    throw new RangeError('Expected 1..1000000 samples');
  if (values.some((v) => typeof v !== 'number' || !Number.isFinite(v)))
    throw new TypeError('Samples must be finite');
  if (!['sqrt', 'sturges', 'fd'].includes(method)) throw new TypeError('Unknown binning method');
  const sorted = [...values].sort((a, b) => a - b),
    min = sorted[0]!,
    max = sorted[sorted.length - 1]!;
  if (min === max) return [{ lower: min, upper: max, count: values.length }];
  let k: number;
  if (method === 'sqrt') k = Math.ceil(Math.sqrt(values.length));
  else if (method === 'sturges') k = Math.ceil(Math.log2(values.length) + 1);
  else if (method === 'fd') {
    const width =
      (2 * (quantile(sorted, 0.75) - quantile(sorted, 0.25))) / Math.cbrt(values.length);
    k = width > 0 ? Math.ceil((max - min) / width) : Math.ceil(Math.sqrt(values.length));
  } else throw new TypeError('Unknown binning method');
  k = Math.max(1, Math.min(4096, k));
  const step = (max - min) / k,
    bins = Array.from({ length: k }, (_, i) => ({
      lower: min + i * step,
      upper: i === k - 1 ? max : min + (i + 1) * step,
      count: 0,
    }));
  for (const v of values) {
    const index = Math.min(k - 1, Math.floor((v - min) / step));
    bins[index]!.count++;
  }
  return bins;
}
