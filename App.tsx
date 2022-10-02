/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, type PropsWithChildren} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function bioCheck() {
    const rnBiometrics = new ReactNativeBiometrics();

    const {biometryType} = await rnBiometrics.isSensorAvailable();

    console.log('biometryType', biometryType);

    if (biometryType === BiometryTypes.FaceID) {
      //do something face id specific
      console.log(' with biometrics sup');
      rnBiometrics.createKeys().then(resultObject => {
        const {publicKey} = resultObject;
        console.log(publicKey);
        // sendPublicKeyToServer(publicKey);
      });

      // rnBiometrics.biometricKeysExist().then(resultObject => {
      //   const {keysExist} = resultObject;

      //   if (keysExist) {
      //     console.log('Keys exist', keysExist);
      //   } else {
      //     console.log('Keys do not exist or were deleted');
      //   }
      // });

      rnBiometrics
        .simplePrompt({promptMessage: 'Confirm fingerprint'})
        .then(resultObject => {
          const {success} = resultObject;

          if (success) {
            console.log('successful biometrics provided');
          } else {
            console.log('user cancelled biometric prompt');
          }
        })
        .catch(() => {
          console.log('biometrics failed');
        });
    } else {
      console.log(' no biometrics');
    }
  }

  useEffect(() => {
    bioCheck();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Biometrics">Biometrics prompt test</Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
