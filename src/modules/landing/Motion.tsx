/** The moving parts of the home page: drifting shapes, a pulse ring, a name strip. */
import React, { useEffect, useState } from "react";
import { View, Text, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { fonts, palette } from "@shared/designSystem";

/** Drifts its child up and down, with a slight tilt. */
export function Float({
  children,
  distance = 14,
  duration = 3200,
  delay = 0,
  tilt = 6,
  style,
}: {
  children: React.ReactNode;
  distance?: number;
  duration?: number;
  delay?: number;
  tilt?: number;
  style?: ViewStyle;
}) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      ),
    );
  }, [t, delay, duration]);
  const anim = useAnimatedStyle(() => ({
    transform: [
      { translateY: -distance * t.value },
      { rotate: `${tilt * (t.value - 0.5)}deg` },
    ],
  }));
  return <Animated.View style={[style, anim]}>{children}</Animated.View>;
}

/** A ring that grows and fades, like a heartbeat spreading outwards. */
export function PulseRing({ size, delay = 0 }: { size: number; delay?: number }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration: 2600, easing: Easing.out(Easing.quad) }), -1),
    );
  }, [t, delay]);
  const anim = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 - t.value),
    transform: [{ scale: 0.6 + t.value }],
  }));
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: palette.teal[300],
        },
        anim,
      ]}
    />
  );
}

/** A two-tone medicine capsule. */
export function Capsule({ width = 72, color }: { width?: number; color: string }) {
  const h = width * 0.4;
  return (
    <View
      style={{
        width,
        height: h,
        borderRadius: h / 2,
        flexDirection: "row",
        overflow: "hidden",
        boxShadow: "0 12px 30px rgba(0,0,0,0.28)",
      }}
    >
      <View style={{ flex: 1, backgroundColor: color }} />
      <View style={{ flex: 1, backgroundColor: palette.neutral[0] }} />
    </View>
  );
}

/** A round scored tablet. */
export function Tablet({ size = 44 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: palette.neutral[0],
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,0.28)",
      }}
    >
      <View style={{ width: size * 0.6, height: 2, backgroundColor: palette.ink[200] }} />
    </View>
  );
}

/** An endless strip of names, sliding left (or right when `reverse`). */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const [half, setHalf] = useState(0);
  const x = useSharedValue(0);
  useEffect(() => {
    if (!half) return;
    x.value = reverse ? -half : 0;
    x.value = withRepeat(
      withTiming(reverse ? 0 : -half, { duration: half * 28, easing: Easing.linear }),
      -1,
    );
  }, [half, reverse, x]);
  const anim = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  return (
    <View style={{ overflow: "hidden" }}>
      <Animated.View
        style={[{ flexDirection: "row", alignSelf: "flex-start" }, anim]}
        onLayout={(e) => setHalf(e.nativeEvent.layout.width / 2)}
      >
        {[...items, ...items].map((name, i) => (
          <View
            key={`${name}-${i}`}
            aria-hidden={i >= items.length}
            style={{
              marginRight: 12,
              paddingHorizontal: 22,
              paddingVertical: 12,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: palette.ink[200],
              backgroundColor: palette.neutral[0],
            }}
          >
            <Text
              style={{ fontFamily: fonts.semibold, fontSize: 15, color: palette.ink[700] }}
            >
              {name}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}
