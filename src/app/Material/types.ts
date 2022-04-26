import { AbstractControl, FormControlStatus, FormGroup } from '@angular/forms';

type Observable<T> = import('rxjs').Observable<T>;

export interface AbstractControlTyped<T> extends AbstractControl {
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: FormControlStatus;
  statusChanges: Observable<FormControlStatus>;
  get<V = unknown>(path: Array<string | number> | string): AbstractControlTyped<V> | null;
  setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}

export interface FormGroupTyped<T> extends FormGroup {
  controls: { [P in keyof T]: AbstractControlTyped<T[P]> };
  registerControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): AbstractControlTyped<T[P]>;
  registerControl<V = any>(name: string, control: AbstractControlTyped<V>): AbstractControlTyped<V>;
  addControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): void;
  addControl<V = any>(name: string, control: AbstractControlTyped<V>): void;
  removeControl(name: keyof T): void;
  removeControl(name: string): void;
  setControl<P extends keyof T>(name: P, control: AbstractControlTyped<T[P]>): void;
  setControl<V = any>(name: string, control: AbstractControlTyped<V>): void;
  contains(name: keyof T): boolean;
  contains(name: string): boolean;
  get<P extends keyof T>(path: P): AbstractControlTyped<T[P]>;
  getRawValue(): T & { [disabledProp in string | number]: any };
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: FormControlStatus;
  statusChanges: Observable<FormControlStatus>;
  get<V = unknown>(path: Array<string | number> | string): AbstractControlTyped<V> | null;
  setValue<V>(value: V extends T ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  patchValue<V>(value: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
  reset<V>(value?: V extends Partial<T> ? V : never, options?: { onlySelf?: boolean; emitEvent?: boolean }): void;
}