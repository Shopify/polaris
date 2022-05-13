/**
 * Describes types that can be narrowed.
 *
 * {@link https://github.com/millsp/ts-toolbelt/blob/319e55123b9571d49f34eca3e5926e41ca73e0f3/sources/Function/_Internal.ts#L18 TS Toolbelt source - Narrowable}
 */
export type Narrowable = string | number | bigint | boolean;

/**
 * Force `Input` to comply with `Target`. `Input` must be a shape of `Target`. In other words, `Input`
 * must extend `Target` and have the same properties - no more, no less.

 * {@link https://github.com/millsp/ts-toolbelt/blob/319e551/sources/Function/Exact.ts#L9 TS Toolbelt source - Exact}
 * 
 * @param Input
 * @param Target
 */
export type Exact<Input, Target> = Target extends unknown
  ? Input extends Target
    ? Input extends Narrowable
      ? Input
      : {
          [K in keyof Input]: K extends keyof Target
            ? Exact<Input[K], Target[K]>
            : never;
        }
    : Target
  : never;
