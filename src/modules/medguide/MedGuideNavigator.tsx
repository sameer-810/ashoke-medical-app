import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "@shared/store/useAuthStore";
import MedGuideScreen from "@modules/medguide/screens/MedGuideScreen";
import MedicineDetailScreen from "@modules/medguide/screens/MedicineDetailScreen";
import CatalogListScreen from "@modules/medguide/screens/CatalogListScreen";
import CatalogFormScreen from "@modules/medguide/screens/CatalogFormScreen";

export type MedGuideStackParamList = {
  MedGuideSearch: undefined;
  MedicineDetail: { id: string };
  /** Catalogue maintenance. Registered for the Admin only. */
  CatalogList: undefined;
  CatalogForm: { id?: string };
};

const Stack = createNativeStackNavigator<MedGuideStackParamList>();

export default function MedGuideNavigator() {
  const isAdmin = useAuthStore((s) => s.user?.role === "admin");
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MedGuideSearch" component={MedGuideScreen} />
      <Stack.Screen name="MedicineDetail" component={MedicineDetailScreen} />
      {isAdmin ? (
        <>
          <Stack.Screen name="CatalogList" component={CatalogListScreen} />
          <Stack.Screen name="CatalogForm" component={CatalogFormScreen} />
        </>
      ) : null}
    </Stack.Navigator>
  );
}
