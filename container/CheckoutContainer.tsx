import React, { useEffect ,useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckoutComponent from "../component/CheckoutComponent";
import orderingStore from "../store/orderingStore";
import useAuthStore from "../store/useAuthStore";
import useCmsStore from "../store/useCmsStore";
import useSessionStore from "../store/useSessionStore";

const CheckoutContainer = ({ navigation }) => {
  const {
    getCart,
    cartItems,
    loading,
    updateQty,
    deleteCartItem,
    getMerchant,
    merchantData,
    clearCart,
    loyaltySettings,
    apply_coupon
  } = orderingStore();
  const {saveUserAddress,getProfile,profile} = useAuthStore()
  const { cmsData } = useCmsStore();
const [checkoutUi, setCheckoutUi] = useState({});
const [addressUiConfig, setAddressUiConfig] = useState({});
const { profileData } = useSessionStore();

  useEffect(() => {
    getCart();
    getMerchant()
    getProfile()
  }, []);
  // console.log(merchantData,"merchantData");

  useEffect(() => {
  if (!Array.isArray(cmsData)) return;

  const config = cmsData.find(
    (item) => item.modelSlug === "checkoutPageConfiguration"
  );

  if (!config?.cms) return;

  const formatted = Object.values(config.cms).reduce((acc, field) => {
    acc[field.fieldKey] = field.fieldValue;
    return acc;
  }, {});

  setCheckoutUi(formatted);
}, [cmsData]);

useEffect(() => {
  if (!Array.isArray(cmsData)) return;

  const config = cmsData.find(
    (item) => item.modelSlug === "addressPageConfiguration"
  );

  if (!config?.cms) return;

  const formatted = Object.values(config.cms).reduce((acc, field) => {
    acc[field.fieldKey] = field.fieldValue;
    return acc;
  }, {});

  setAddressUiConfig(formatted);

}, [cmsData]);
  

  return (
    <SafeAreaView style={{ flex: 1, width:"100%",backgroundColor:checkoutUi?.headerBgColor}}>
      <CheckoutComponent
        navigation={navigation}
        cartItems={cartItems}
        loading={loading}
        updateQty={updateQty}
        deleteCartItem={deleteCartItem}
        getCart={getCart}
        merchantData={merchantData}
        clearCart={clearCart}
        saveUserAddress={saveUserAddress}
        profile={profile}
        getProfile={getProfile}
        uiConfig={checkoutUi}
        addressUiConfig={addressUiConfig}
        loyaltySettings={loyaltySettings}
        profileData={profileData}
        apply_coupon={apply_coupon}
      />
    </SafeAreaView>
  );
};

export default CheckoutContainer;
