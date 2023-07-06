import { EventSubscription } from 'fbemitter';
import { UseUpdatesEvent, UpdatesNativeStateChangeEvent } from './UseUpdates.types';
export declare const emitUseUpdatesEvent: (event: UseUpdatesEvent) => void;
export declare const useUpdateEvents: (listener: (event: UseUpdatesEvent) => void) => void;
export declare const addUpdatesStateChangeListener: (listener: (event: UpdatesNativeStateChangeEvent) => void) => EventSubscription;
export declare const emitStateChangeEvent: (event: UpdatesNativeStateChangeEvent) => void;
//# sourceMappingURL=UseUpdatesEmitter.d.ts.map