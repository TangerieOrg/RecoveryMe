import type { PropsWithChildren, ReactNode, Ref } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

// Third-party components ignore className on native unless wrapped
const SafeAreaView = withUniwind(RNSafeAreaView);

interface Props {
    title?: string;
    leading?: ReactNode;
    scrollRef?: Ref<ScrollView>;
}

export default function Screen({ title, leading, scrollRef, children } : PropsWithChildren<Props>) {
    return <SafeAreaView edges={["top"]} className="flex-1 bg-background">
        <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled" contentContainerClassName="px-5 pt-4 pb-10 gap-5">
            <View className="flex-row items-center gap-3">
                {leading}
                { title && <Text className="flex-1 text-3xl font-bold text-foreground tracking-tight">{title}</Text> }
            </View>
            <View className="gap-5">{children}</View>
        </ScrollView>
    </SafeAreaView>
}
