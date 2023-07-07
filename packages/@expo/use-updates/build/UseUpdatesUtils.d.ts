import * as Updates from 'expo-updates';
import type { CurrentlyRunningInfo, UpdatesNativeStateMachineContext, UseUpdatesStateType } from './UseUpdates.types';
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
export declare const readNativeContext: () => Promise<UpdatesNativeStateMachineContext>;
export declare const canReadNativeContext: () => boolean;
export declare const defaultUseUpdatesState: UseUpdatesStateType;
export declare const reduceUpdatesStateFromContext: (updatesState: UseUpdatesStateType, context: UpdatesNativeStateMachineContext) => {
    isChecking: boolean;
    lastCheckForUpdateTimeSinceRestart: Date;
    availableUpdate?: import("./UseUpdates.types").UpdateInfo | undefined;
    downloadedUpdate?: import("./UseUpdates.types").UpdateInfo | undefined;
    error?: Error | undefined;
    isUpdateAvailable: boolean;
    isUpdatePending: boolean;
    isDownloading: boolean;
    logEntries?: Updates.UpdatesLogEntry[] | undefined;
} | {
    isUpdateAvailable: boolean;
    isUpdatePending: any;
    isChecking: false;
    isDownloading: boolean;
    availableUpdate: {
        updateId: any;
        createdAt: Date | null;
        manifest: any;
        isRollback: any;
    } | undefined;
    downloadedUpdate: {
        updateId: any;
        createdAt: Date | null;
        manifest: any;
        isRollback: any;
    } | undefined;
    error: Error | undefined;
    lastCheckForUpdateTimeSinceRestart?: Date | undefined;
    logEntries?: Updates.UpdatesLogEntry[] | undefined;
};
//# sourceMappingURL=UseUpdatesUtils.d.ts.map