/// <reference types="react-scripts" />

// تعريفات الوحدات المفقودة
// React types
interface React {
  // Hooks
  function useState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
  function useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  function createContext<T>(defaultValue?: T): React.Context<T | undefined>;
  function useContext<T>(context: React.Context<T | undefined>): T;
  function useReducer<R extends React.Reducer<any, any>, I>(reducer: R, initializerArg: I, initializer?: (arg: I) => React.ReducerState<R>): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: React.DependencyList): T;
  function useMemo<T>(factory: () => T, deps: React.DependencyList): T;
  function useRef<T>(initialValue: T | null): React.MutableRefObject<T>;
  function useImperativeHandle<T, R extends T>(ref: React.Ref<R>, init: () => T, deps?: React.DependencyList): void;
  function useLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  function useDebugValue<T>(value: T, formatFn?: (value: T) => string): void;
  
  // Components
  const Fragment: React.FC;
  const StrictMode: React.FC;
  const Suspense: React.FC;
  
  // Higher-order components
  function lazy<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>): React.LazyExoticComponent<T>;
  function memo<T extends ComponentType<any>>(Component: T, propsAreEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean): React.MemoExoticComponent<T>;
  function forwardRef<T, P = {}>(Component: React.ForwardRefRenderFunction<T, P>): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
  
  // Element creation
  function createElement<P extends React.HTMLAttributes<T> | React.SVGAttributes<T> | React.ButtonHTMLAttributes<T> | React.AnchorHTMLAttributes<T> | React.InputHTMLAttributes<T> | React.SelectHTMLAttributes<T> | React.TextareaHTMLAttributes<T>, T extends HTMLElement = HTMLElement>(type: string | React.ComponentType<P>, props?: (P & React.RefAttributes<T>) | null, ...children: React.ReactNode[]): React.ReactElement<P, string | React.ComponentType<P>>;
  function cloneElement<C extends React.ReactElement<any, string | React.ComponentType<any>>>(element: C, props?: React.ComponentProps<C> & React.RefAttributes<React.ComponentProps<C>>, ...children: React.ReactNode[]): React.ReactElement<C, string | React.ComponentType<C>>;
  function isValidElement<P>(object: React.ReactElement<any, string | React.ComponentType<any>> | any): object is React.ReactElement<P, string | React.ComponentType<P>>;
  function createRef<T extends HTMLElement | null = null>(): React.RefObject<T>;
  
  // Other utilities
  const Profiler: React.FC<React.ProfilerProps>;
  function createPortal<T extends Element>(children: React.ReactNode, container: T, key?: React.Key): React.ReactPortal;
  const version: string;
  const Children: {
    map<T, C>(children: React.ReactNode, fn: (child: React.ReactElement<T>, index: number) => C): C[];
    forEach<T>(children: React.ReactNode, fn: (child: React.ReactElement<T>, index: number) => void): void;
    count(children: React.ReactNode): number;
    only<T>(children: React.ReactNode): React.ReactElement<T>;
    toArray<T>(children: React.ReactNode): Array<React.ReactElement<T>>;
  };
  const Component: React.ComponentClass<any>;
  const PureComponent: React.ComponentClass<any>;
}

// Global React namespace
declare namespace React {
  interface ComponentClass<P = {}> {
    new(props: P): Component<P, any>;
  }
  
  interface Component<P, S = {}> {
    props: Readonly<P>;
    state: Readonly<S>;
    context: any;
    refs: {
      [key: string]: any;
    };
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): React.ReactNode;
    componentDidMount?(): void;
    componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any): void;
    componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getDerivedStateFromProps?(nextProps: Readonly<P>, prevState: Readonly<S>): Partial<S> | null;
    getDerivedStateFromError?(error: Error): Partial<S> | null;
  }
  
  interface FC<P = {}> {
    (props: P, context?: any): React.ReactElement | null;
    displayName?: string;
  }
  
  interface RefObject<T> {
    readonly current: T | null;
  }
  
  interface Ref<T> {
    bivarianceHack(instance: T | null): void;
  };
  
  type RefCallback<T> = (instance: T | null) => void;
  
  type Ref<T> = RefCallback<T> | RefObject<T> | null;
  
  interface Context<T> {
    Provider: React.FC<{ value: T; children?: React.ReactNode }>;
    Consumer: React.FC<{ children: (value: T) => React.ReactNode }>;
    displayName?: string;
    __proto__?: Context<T>;
  }
  
  interface EffectCallback {
    (): (() => void) | void;
  }
  
  interface DependencyList {
    [key: string]: any;
  }
  
  interface Reducer<S, A> {
    (state: S, action: A): S;
  }
  
  interface ReducerState<R extends Reducer<any, any>> {
    [P in keyof R]: R extends (state: infer S, action: any) => any ? S : never;
  }[keyof R];
  
  interface ReducerAction<R extends Reducer<any, any>> {
    [P in keyof R]: R extends (state: any, action: infer A) => any ? A : never;
  }[keyof R];
  
  interface ForwardRefRenderFunction<T, P = {}> {
    (props: P, ref: React.Ref<T>): React.ReactElement | null;
  }
  
  interface MemoExoticComponent<T extends ComponentType<any>> extends ComponentType<React.ComponentProps<T>> {
    readonly original: T;
  }
  
  interface LazyExoticComponent<T extends ComponentType<any>> extends ComponentType<React.ComponentProps<T>> {
    readonly _result: T;
  }
  
  interface ErrorInfo {
    componentStack: string;
  }
  
  interface HTMLAttributes<T> {
    key?: React.Key;
    ref?: React.Ref<T>;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }
  
  interface SVGAttributes<T> {
    key?: React.Key;
    ref?: React.Ref<T>;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }
  
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }
  
  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string;
    target?: string;
    rel?: string;
  }
  
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
    value?: string | number | readonly string[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    name?: string;
  }
  
  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[];
    defaultValue?: string | string[];
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    name?: string;
  }
  
  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    name?: string;
  }
  
  interface CSSProperties {
    [key: string]: any;
  }
  
  interface SetStateAction<S> {
    (prevState: S): S;
    (prevState: S): S;
  }
  
  interface Dispatch<T> {
    (action: T): void;
  }
  
  // SyntheticEvent and ChangeEvent
  interface SyntheticEvent<T = Element, E = Event> {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: T;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: E;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
  }
  
  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
}

// MUI Material types
declare module '@mui/material' {
  export * from '@mui/material';
  
  // Re-export commonly used components
  export const Box: any;
  export const Button: any;
  export const Typography: any;
  export const Dialog: any;
  export const DialogTitle: any;
  export const DialogContent: any;
  export const DialogActions: any;
  export const TextField: any;
  export const Table: any;
  export const TableBody: any;
  export const TableCell: any;
  export const TableHead: any;
  export const TableRow: any;
  export const Paper: any;
  export const IconButton: any;
  export const Alert: any;
  export const FormControl: any;
  export const Select: any;
  export const MenuItem: any;
  export const Card: any;
  export const CardContent: any;
}

declare module '@mui/x-date-pickers' {
  export * from '@mui/x-date-pickers';
  export const LocalizationProvider: any;
}

declare module '@mui/x-date-pickers/AdapterDateFns' {
  export * from '@mui/x-date-pickers/AdapterDateFns';
  export const AdapterDateFns: any;
}

declare module 'date-fns/locale' {
  export const arSA: any;
}

declare module '@mui/icons-material/Edit' {
  const EditIcon: any;
  export default EditIcon;
}

declare module '@mui/icons-material/Delete' {
  const DeleteIcon: any;
  export default DeleteIcon;
}

declare module '@mui/icons-material/FileDownload' {
  const FileDownloadIcon: any;
  export default FileDownloadIcon;
}

declare module '@mui/icons-material/Add' {
  const AddIcon: any;
  export default AddIcon;
}

declare module '@mui/icons-material/AccountBalanceWallet' {
  const AccountBalanceWalletIcon: any;
  export default AccountBalanceWalletIcon;
}

declare module 'xlsx' {
  export const utils: {
    json_to_sheet: (data: any[]) => any;
    book_new: () => any;
    book_append_sheet: (wb: any, ws: any, name: string) => void;
    writeFile: (wb: any, filename: string) => void;
    write_file: (wb: any, filename: string) => void;
  };
  
  // إضافة دالة writeFile مباشرة على الكائن الرئيسي
  export function writeFile(wb: any, filename: string): void;
  
  export default {
    utils: {
      json_to_sheet: (data: any[]) => any;
      book_new: () => any;
      book_append_sheet: (wb: any, ws: any, name: string) => void;
      writeFile: (wb: any, filename: string) => void;
      write_file: (wb: any, filename: string) => void;
    },
    writeFile: (wb: any, filename: string) => void
  };
}

// Add React namespace
declare namespace React {
  interface ComponentClass<P = {}> {
    new(props: P): Component<P, any>;
  }
  
  interface Component<P, S = {}> {
    props: Readonly<P>;
    state: Readonly<S>;
    context: any;
    refs: {
      [key: string]: any;
    };
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): React.ReactNode;
    componentDidMount?(): void;
    componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any): void;
    componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getDerivedStateFromProps?(nextProps: Readonly<P>, prevState: Readonly<S>): Partial<S> | null;
    getDerivedStateFromError?(error: Error): Partial<S> | null;
  }
  
  interface FC<P = {}> {
    (props: P, context?: any): React.ReactElement | null;
    displayName?: string;
  }
  
  interface RefObject<T> {
    readonly current: T | null;
  }
  
  interface Ref<T> {
    bivarianceHack(instance: T | null): void;
  };
  
  type RefCallback<T> = (instance: T | null) => void;
  
  type Ref<T> = RefCallback<T> | RefObject<T> | null;
  
  interface Context<T> {
    Provider: React.FC<{ value: T; children?: React.ReactNode }>;
    Consumer: React.FC<{ children: (value: T) => React.ReactNode }>;
    displayName?: string;
    __proto__?: Context<T>;
  }
  
  interface EffectCallback {
    (): (() => void) | void;
  }
  
  interface DependencyList {
    [key: string]: any;
  }
  
  interface Reducer<S, A> {
    (state: S, action: A): S;
  }
  
  interface ReducerState<R extends Reducer<any, any>> {
    [P in keyof R]: R extends (state: infer S, action: any) => any ? S : never;
  }[keyof R];
  
  interface ReducerAction<R extends Reducer<any, any>> {
    [P in keyof R]: R extends (state: any, action: infer A) => any ? A : never;
  }[keyof R];
  
  interface ForwardRefRenderFunction<T, P = {}> {
    (props: P, ref: React.Ref<T>): React.ReactElement | null;
  }
  
  interface ForwardRefExoticComponent<P> extends React.Component<P> {
    displayName?: string;
  }
  
  interface MemoExoticComponent<T extends ComponentType<any>> extends React.ComponentType<React.ComponentProps<T>> {
    readonly _memoizedProps: React.ComponentProps<T> | undefined;
    readonly _memoizedState: any | undefined;
    displayName?: string;
  }
  
  type ComponentType<P = {}> = ComponentClass<P> | FC<P>;
  
  interface HTMLAttributes<T> {
    ref?: Ref<T>;
  }
  
  interface SVGAttributes<T> {
    ref?: Ref<T>;
  }
  
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }
  
  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string;
    target?: string;
  }
  
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
    value?: string | number | readonly string[];
    checked?: boolean;
    disabled?: boolean;
  }
  
  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[];
    disabled?: boolean;
  }
  
  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string;
    disabled?: boolean;
  }
  
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = any> {
    type: T;
    props: P;
    key: Key | null;
  }
  
  type Key = string | number;
  
  interface ReactNode {}
  
  type JSXElementConstructor<P> = ((props: P) => React.ReactElement<any, any>) | (new (props: P) => React.Component<any, any>);
  
  interface ErrorInfo {
    componentStack: string;
  }
}

// تعريف JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
