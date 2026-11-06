# @lp-labs/histogram-binning

Numeric histogram construction with square-root, Sturges and Freedman-Diaconis bin rules.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/histogram-binning
```

## Working example

```js
import { histogram } from '@lp-labs/histogram-binning';
const bins = histogram([1, 2, 3, 4], 'sturges');
if (bins.reduce((n, bin) => n + bin.count, 0) !== 4) throw new Error('Sample count mismatch');
```

CommonJS: `const api = require('@lp-labs/histogram-binning')`.

## Behavior, customization and limits

Accepts finite samples and returns equal-width bins; the final bin includes the maximum. Constant-valued data returns one bin. Freedman-Diaconis quartiles use linear interpolation; this is descriptive binning, not a density estimator.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface Bin {
  readonly lower: number;
  readonly upper: number;
  readonly count: number;
}
export declare function histogram(
  values: readonly number[],
  method?: 'sqrt' | 'sturges' | 'fd',
): Bin[];
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
