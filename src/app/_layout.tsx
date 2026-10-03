import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState } from "react-native";

export default function Layout() {
    return <>
        <Stack screenOptions={{ headerShown: false }}/>
        {/* <Celebration/> */}
        <StatusBar style="auto"/>
    </>
}