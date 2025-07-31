import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabsLayout () {
    return(
        <Tabs screenOptions={{headerShown: false}} >  
            <Tabs.Screen
                name="home" // Corresponds to app/(tabs)/home.tsx
                options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                ),
                }}
            />
            <Tabs.Screen
                name="track" // Corresponds to app/(tabs)/home.tsx
                options={{
                title: "Track",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                ),
                }}
            />
            <Tabs.Screen
                name="consultation" // Corresponds to app/(tabs)/home.tsx
                options={{
                title: "Track",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                ),
                }}
            />
            <Tabs.Screen
                name="settings" // Corresponds to app/(tabs)/settings.tsx
                options={{
                title: "Settings",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings-outline" color={color} size={size} />
                ),
                }}
            />
        </Tabs>
    )
} 