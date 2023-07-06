import type { CurrentlyRunningInfo } from './UseUpdates.types';
export declare const currentlyRunning: CurrentlyRunningInfo;
export declare const availableUpdateFromContext: (context: {
    [key: string]: any;
}) => {
    updateId: any;
    createdAt: Date | null;
    manifest: any;
    isRollback: any;
} | undefined;
export declare const downloadedUpdateFromContext: (context: {
    [key: string]: any;
}) => {
    updateId: any;
    createdAt: Date | null;
    manifest: any;
    isRollback: any;
} | undefined;
//# sourceMappingURL=UseUpdatesUtils.d.ts.map