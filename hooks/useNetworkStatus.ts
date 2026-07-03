import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

interface UseNetworkStatusReturn {
  isNetworkLost: boolean;
  isChecking: boolean;
}

const useNetworkStatus = (): UseNetworkStatusReturn => {
  const [isNetworkLost, setIsNetworkLost] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkNetworkConnection = async () => {
    try {
      setIsChecking(true);
      const state = await NetInfo.fetch();
      const hasConnection = Boolean(state.isConnected) && state.isInternetReachable !== false;
      setIsNetworkLost(!hasConnection);
    } catch (error) {
      setIsNetworkLost(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        checkNetworkConnection();
      }
    };

    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      if (!isMounted) return;

      const hasConnection = Boolean(state.isConnected) && state.isInternetReachable !== false;
      setIsNetworkLost(!hasConnection);
    });

    checkNetworkConnection();
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      isMounted = false;
      unsubscribeNetInfo();
      appStateSubscription.remove();
    };
  }, []);

  return {
    isNetworkLost,
    isChecking,
  };
};

export default useNetworkStatus;
