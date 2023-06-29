import * as Updates from 'expo-updates';
// The currently running info, constructed from Updates constants
export const currentlyRunning = {
    updateId: Updates.updateId,
    channel: Updates.channel,
    createdAt: Updates.createdAt,
    isEmbeddedLaunch: Updates.isEmbeddedLaunch,
    isEmergencyLaunch: Updates.isEmergencyLaunch,
    manifest: Updates.manifest,
    runtimeVersion: Updates.runtimeVersion,
};
/////// Internal functions ////////
// Constructs the availableUpdate from the update manifest
export const availableUpdateFromContext = (context) => {
    const manifest = context?.latestManifest;
    const isRollback = context.isRollback;
    return manifest || isRollback
        ? {
            updateId: manifest?.id ?? null,
            createdAt: manifest && 'createdAt' in manifest && manifest.createdAt
                ? new Date(manifest.createdAt)
                : manifest && 'publishedTime' in manifest && manifest.publishedTime
                    ? new Date(manifest.publishedTime)
                    : null,
            manifest: manifest || null,
            isRollback,
        }
        : undefined;
};
//# sourceMappingURL=UseUpdatesUtils.js.map