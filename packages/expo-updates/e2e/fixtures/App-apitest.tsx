/**
 * Test app that shows some features of the Updates API
 */
import {
  checkForUpdate,
  downloadUpdate,
  useUpdates,
  useUpdatesState,
} from '@expo/use-updates';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [updateMessage, setUpdateMessage] = React.useState('');

  // Displays a message showing whether or not the app is running
  // a downloaded update
  const runTypeMessage = Updates.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : 'This app is running an update';

  const checkAutomaticallyMessage = `Automatic check setting = ${Updates.checkAutomatically}`;

  const {
    isUpdateAvailable,
    isUpdatePending,
    isChecking,
    isDownloading,
    availableUpdate,
    error,
  } = useUpdates();

  const state = useUpdatesState();

  useEffect(() => {
    const checkingMessage = isChecking ? 'Checking for an update...\n' : '';
    const downloadingMessage = isDownloading ? 'Downloading...\n' : '';
    const availableMessage = isUpdateAvailable
      ? availableUpdate?.isRollback
        ? 'Rollback directive found\n'
        : `Found a new update: manifest = \n${manifestToString(
            availableUpdate?.manifest,
          )}...` + '\n'
      : 'No new update available\n';
    const errorMessage = error ? `Error in update API: ${error.message}` : '';
    setUpdateMessage(
      checkingMessage + downloadingMessage + availableMessage + errorMessage,
    );
  }, [isUpdateAvailable, isUpdatePending, isChecking, isDownloading, error]);

  useEffect(() => {
    const handleReloadAsync = async () => {
      let countdown = 5;
      while (countdown > 0) {
        setUpdateMessage(
          `Downloaded update... launching it in ${countdown} seconds.`,
        );
        countdown = countdown - 1;
        await delay(1000);
      }
      await Updates.reloadAsync();
    };
    if (isUpdatePending) {
      handleReloadAsync();
    }
  }, [isUpdatePending]);

  useEffect(() => {
    if (error) {
      setUpdateMessage(`Error in update API: ${error.message}`);
    }
  }, [error]);

  const handleCheckButtonPress = () => {
    checkForUpdate();
  };

  const handleDownloadButtonPress = () => {
    downloadUpdate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Updates JS API test</Text>
      <Text> </Text>
      <Text>{runTypeMessage}</Text>
      <Text>{checkAutomaticallyMessage}</Text>
      <Text> </Text>
      <Text style={styles.titleText}>Status</Text>
      <Text style={styles.updateMessageText}>{updateMessage}</Text>
      <Text style={styles.updateMessageText}>{JSON.stringify(state)}</Text>
      <Pressable style={styles.button} onPress={handleCheckButtonPress}>
        <Text style={styles.buttonText}>Check manually for updates</Text>
      </Pressable>
      {isUpdateAvailable ? (
        <Pressable style={styles.button} onPress={handleDownloadButtonPress}>
          <Text style={styles.buttonText}>Download update</Text>
        </Pressable>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4630EB',
  },
  buttonText: {
    color: 'white',
  },
  updateMessageText: {
    margin: 10,
    height: 200,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '90%',
    borderColor: '#4630EB',
    borderWidth: 1,
    borderRadius: 4,
  },
  titleText: {
    fontWeight: 'bold',
  },
});

///////////////////////////

/**
 * Promise wrapper for setTimeout()
 * @param {delay} timeout Timeout in ms
 * @returns a Promise that resolves after the timeout has elapsed
 */
const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const manifestToString = (manifest?: Updates.Manifest) => {
  return manifest
    ? JSON.stringify(
        {
          id: manifest.id,
          createdAt: manifest.createdAt,
          // metadata: manifest.metadata,
        },
        null,
        2,
      )
    : 'null';
};
