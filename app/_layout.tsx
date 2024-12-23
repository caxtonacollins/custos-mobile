'use strict'

import React, {useEffect, useRef} from 'react';
import {DarkTheme, DefaultTheme, ThemeProvider,} from '@react-navigation/native';
import '@walletconnect/react-native-compat';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {PaperProvider} from 'react-native-paper';
import 'react-native-reanimated';
import {WagmiProvider} from 'wagmi';
import {mainnet, polygon, } from '@wagmi/core/chains';
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {AppKit, createAppKit, defaultWagmiConfig} from '@reown/appkit-wagmi-react-native';
import {useColorScheme} from '@/hooks/useColorScheme';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Drawer} from "expo-router/drawer"
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navbar, {DrawerContent} from '@/components/Navbar';
import {Stack} from "expo-router";

import '@/utils/polyfill'
import {getCustomWallets} from "@/utils/misc";
import WalletProvider from "@/context";

/*
const projectId = 'b26784ec0e0189fd763096b91bb6eb6d';

const metadata = {
  name: 'Custos Diretriz',
  description: 'Custos Diretriz Mobile App',
  url: 'https://www.custosdiretriz.com/',
  icons: ['https://www.custosdiretriz.com/ecllipse.png'],
  redirect: {
    universal: 'custosdiretriz.com',
  },
};

const chains = [mainnet, polygon] as const;

const queryClient = new QueryClient();
*/

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const drawerRef = useRef(null);

  const [loaded] = useFonts({
    'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  });

  // const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

  const customWallets = getCustomWallets();
  /*createAppKit({
    projectId,
    wagmiConfig,
    metadata,
    includeWalletIds: [
      "bc949c5d968ae81310268bf9193f9c9fb7bb4e1283e1284af8f2bd4992535fd6"
    ],
    customWallets: customWallets,
    defaultChain: mainnet,
    enableAnalytics: true,
  });*/

  useEffect(() => {
    if (loaded) {
      console.log('Font loaded successfully');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <WalletProvider>
          {/*<WagmiProvider config={wagmiConfig}>*/}
          {/*  <QueryClientProvider client={queryClient}>*/}
              <GestureHandlerRootView style={{flex: 1, width: "100%"}}>
                <Drawer
                  drawerContent={() => {
                    return <DrawerContent/>
                  }}
                  screenOptions={{
                    drawerContentStyle: {
                      width: "100%"
                    }
                  }}
                >
                  {/* <Drawer.Navigator
                    drawerContent={(props: any) => <CustomDrawerContent {...props} />}
                    ref={drawerRef}
                    screenOptions={{
                      drawerStyle: {
                        width: '100%',
                      },
                    }}
                  > */}
                  <Drawer.Screen name="index" options={{
                    header: () => (
                      <Navbar/>
                    )
                  }}/>
                  <Drawer.Screen name="(tabs)" options={{
                    header: () => (
                      <Navbar/>
                    ),
                    headerShown: false
                  }}/>
                  {/* </Drawer.Navigator> */}
                </Drawer>
                {/*<Stack>
                  <Stack.Screen
                    name="index"
                    options={{
                      headerShown: false
                    }}/>
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      headerShown: false
                    }}/>
                </Stack>*/}
              </GestureHandlerRootView>
              {/*<AppKit/>*/}
          {/*  </QueryClientProvider>*/}
          {/*</WagmiProvider>*/}
        </WalletProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
