/** Public home page (web only): why to buy from the store, and the staff login. */
import React from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  type TextStyle,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import {
  Clock,
  HeartPulse,
  LogIn,
  MapPin,
  MessageCircle,
  Phone,
  Pill,
  Plus,
  Syringe,
} from "lucide-react-native";
import { fonts, palette } from "@shared/designSystem";
import { COMPANIES, LICENCES, QUALITY_STEPS, REASONS, STORE } from "./content";
import { Capsule, Float, Marquee, PulseRing, Tablet } from "./Motion";

type Nav = { navigate: (screen: string) => void };

const MAX = 1120;
const h2: TextStyle = {
  fontFamily: fonts.display,
  fontSize: 30,
  lineHeight: 38,
  color: palette.ink[900],
};
const body: TextStyle = {
  fontFamily: fonts.bodyRegular,
  fontSize: 15,
  lineHeight: 24,
  color: palette.ink[600],
};
const eyebrow: TextStyle = {
  fontFamily: fonts.semibold,
  fontSize: 12,
  letterSpacing: 1.6,
  textTransform: "uppercase",
  color: palette.teal[700],
  marginBottom: 10,
};

function Section({ children, tint }: { children: React.ReactNode; tint?: boolean }) {
  return (
    <View
      style={{
        backgroundColor: tint ? palette.neutral[50] : palette.neutral[0],
        paddingVertical: 72,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ width: "100%", maxWidth: MAX, alignSelf: "center" }}>{children}</View>
    </View>
  );
}

function LoginButton({ onPress, large }: { onPress: () => void; large?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Staff login"
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: large ? 26 : 18,
        paddingVertical: large ? 15 : 10,
        borderRadius: 999,
        backgroundColor: palette.cobalt[600],
        opacity: pressed ? 0.85 : 1,
        boxShadow: "0 10px 26px rgba(255,153,51,0.35)",
      })}
    >
      <LogIn size={large ? 20 : 17} color={palette.ink[900]} />
      <Text
        style={{
          fontFamily: fonts.semibold,
          fontSize: large ? 16 : 14,
          color: palette.ink[900],
        }}
      >
        Staff Login
      </Text>
    </Pressable>
  );
}

function HeroArt({ size }: { size: number }) {
  const core = size * 0.42;
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <PulseRing size={size * 0.8} />
      <PulseRing size={size * 0.8} delay={1300} />
      <View
        style={{
          width: core,
          height: core,
          borderRadius: core / 2,
          backgroundColor: "rgba(255,255,255,0.12)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.3)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeartPulse size={core * 0.5} color={palette.neutral[0]} strokeWidth={1.5} />
      </View>
      <Float style={{ position: "absolute", top: "8%", left: "10%" }} duration={3400}>
        <Capsule color={palette.cobalt[600]} width={size * 0.22} />
      </Float>
      <Float style={{ position: "absolute", top: "16%", right: "6%" }} delay={500} tilt={-10}>
        <Tablet size={size * 0.13} />
      </Float>
      <Float style={{ position: "absolute", bottom: "12%", left: "6%" }} delay={900} duration={3800}>
        <Pill size={size * 0.13} color={palette.teal[200]} strokeWidth={1.5} />
      </Float>
      <Float style={{ position: "absolute", bottom: "8%", right: "12%" }} delay={300} tilt={12}>
        <Capsule color={palette.teal[400]} width={size * 0.26} />
      </Float>
      <Float style={{ position: "absolute", top: "46%", right: "0%" }} delay={1200} distance={10}>
        <Syringe size={size * 0.1} color={palette.cobalt[400]} strokeWidth={1.5} />
      </Float>
      <Float style={{ position: "absolute", top: "40%", left: "0%" }} delay={700} distance={18}>
        <Plus size={size * 0.1} color={palette.teal[300]} strokeWidth={3} />
      </Float>
    </View>
  );
}

function ContactRow({
  icon: Icon,
  text,
  url,
}: {
  icon: typeof Phone;
  text: string;
  url?: string;
}) {
  if (!text) return null;
  const row = (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8 }}>
      <Icon size={18} color={palette.teal[300]} />
      <Text style={[body, { color: palette.neutral[0], flexShrink: 1 }]}>{text}</Text>
    </View>
  );
  return url ? (
    <Pressable accessibilityRole="link" onPress={() => void Linking.openURL(url)}>
      {row}
    </Pressable>
  ) : (
    row
  );
}

export default function LandingScreen({ navigation }: { navigation: Nav }) {
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const cols = width >= 1000 ? 3 : width >= 640 ? 2 : 1;
  const toLogin = () => navigation.navigate("Login");
  const mid = Math.ceil(COMPANIES.length / 2);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: palette.neutral[0] }}
      stickyHeaderIndices={[0]}
    >
      <View
        style={{
          backgroundColor: "rgba(11,42,7,0.92)",
          paddingHorizontal: 20,
          paddingVertical: 12,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: MAX,
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flexShrink: 1 }}>
            <Image
              source={require("../../../assets/brand/mark.png")}
              style={{ width: 36, height: 36, borderRadius: 8 }}
              accessibilityLabel="Ashok Medical logo"
            />
            <Text
              numberOfLines={1}
              style={{
                fontFamily: fonts.semibold,
                fontSize: 16,
                color: palette.neutral[0],
                flexShrink: 1,
              }}
            >
              {wide ? STORE.name : "Ashok Medical"}
            </Text>
          </View>
          <LoginButton onPress={toLogin} />
        </View>
      </View>

      <LinearGradient
        colors={["#0B2A07", palette.teal[800], palette.ink[900]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 20, paddingVertical: wide ? 88 : 56 }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: MAX,
            alignSelf: "center",
            flexDirection: wide ? "row" : "column",
            alignItems: "center",
            gap: 40,
          }}
        >
          <View style={{ flex: wide ? 1 : undefined, width: wide ? undefined : "100%" }}>
            <Animated.View entering={FadeInDown.duration(600)}>
              <Text style={[eyebrow, { color: palette.cobalt[500] }]}>{STORE.tagline}</Text>
              <Text
                accessibilityRole="header"
                style={{
                  fontFamily: fonts.display,
                  fontSize: wide ? 52 : 36,
                  lineHeight: wide ? 62 : 44,
                  color: palette.neutral[0],
                }}
              >
                Genuine medicines, from people who check every strip.
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(150).duration(600)}>
              <Text
                style={[
                  body,
                  { color: palette.teal[100], fontSize: 17, lineHeight: 28, marginTop: 18, maxWidth: 520 },
                ]}
              >
                {STORE.name} is a licensed chemist. Every medicine is bought from an
                authorised distributor, tracked by batch and expiry, and sold with a
                proper bill.
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(300).duration(600)}
              style={{ flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 30, alignItems: "center" }}
            >
              <LoginButton onPress={toLogin} large />
              {STORE.phone ? (
                <Pressable
                  accessibilityRole="link"
                  onPress={() => void Linking.openURL(`tel:${STORE.phone}`)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    paddingHorizontal: 22,
                    paddingVertical: 14,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.4)",
                  }}
                >
                  <Phone size={18} color={palette.neutral[0]} />
                  <Text style={{ fontFamily: fonts.semibold, fontSize: 16, color: palette.neutral[0] }}>
                    Call the store
                  </Text>
                </Pressable>
              ) : null}
            </Animated.View>
          </View>
          <Animated.View entering={FadeInDown.delay(200).duration(800)}>
            <HeroArt size={wide ? 420 : Math.min(width - 40, 320)} />
          </Animated.View>
        </View>
      </LinearGradient>

      <Section tint>
        <Text style={[eyebrow, { textAlign: "center" }]}>Trusted brands</Text>
        <Text accessibilityRole="header" style={[h2, { textAlign: "center", marginBottom: 32 }]}>
          Medicines from the companies doctors prescribe
        </Text>
        <View style={{ gap: 12 }}>
          <Marquee items={COMPANIES.slice(0, mid)} />
          <Marquee items={COMPANIES.slice(mid)} reverse />
        </View>
      </Section>

      <Section>
        <Text style={eyebrow}>Why buy from us</Text>
        <Text accessibilityRole="header" style={[h2, { marginBottom: 36, maxWidth: 620 }]}>
          What you get here that you should expect from every chemist
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", margin: -10 }}>
          {REASONS.map(({ icon: Icon, title, text }) => (
            <View key={title} style={{ width: `${100 / cols}%`, padding: 10 }}>
              <View
                style={{
                  flex: 1,
                  padding: 24,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: palette.ink[200],
                  backgroundColor: palette.neutral[0],
                  boxShadow: "0 8px 24px rgba(14,27,51,0.06)",
                }}
              >
                <View
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    backgroundColor: palette.teal[50],
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon size={22} color={palette.teal[700]} />
                </View>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 17, color: palette.ink[900], marginBottom: 6 }}>
                  {title}
                </Text>
                <Text style={body}>{text}</Text>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <Section tint>
        <Text style={eyebrow}>Quality of medicine</Text>
        <Text accessibilityRole="header" style={[h2, { marginBottom: 36 }]}>
          From the distributor to your hand
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", margin: -10 }}>
          {QUALITY_STEPS.map(({ icon: Icon, title, text }, i) => (
            <View key={title} style={{ width: wide ? "25%" : cols === 1 ? "100%" : "50%", padding: 10 }}>
              <Text style={{ fontFamily: fonts.display, fontSize: 40, color: palette.teal[200] }}>
                0{i + 1}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 8 }}>
                <Icon size={20} color={palette.teal[700]} />
                <Text style={{ fontFamily: fonts.semibold, fontSize: 18, color: palette.ink[900] }}>
                  {title}
                </Text>
              </View>
              <Text style={body}>{text}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section>
        <View style={{ flexDirection: wide ? "row" : "column", gap: 40 }}>
          <View style={{ flex: wide ? 1 : undefined }}>
            <Text style={eyebrow}>Licensed &amp; registered</Text>
            <Text accessibilityRole="header" style={[h2, { marginBottom: 14 }]}>
              Our licences
            </Text>
            <Text style={body}>
              A chemist must hold a drug licence and work under a registered
              pharmacist. Ours are listed here and displayed at the counter. You
              are welcome to ask to see them.
            </Text>
          </View>
          <View
            style={{
              flex: wide ? 1 : undefined,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: palette.ink[200],
              overflow: "hidden",
            }}
          >
            {LICENCES.map(({ label, value }, i) => (
              <View
                key={label}
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: 8,
                  padding: 18,
                  borderTopWidth: i ? 1 : 0,
                  borderTopColor: palette.ink[100],
                }}
              >
                <Text style={{ fontFamily: fonts.bodyMedium, fontSize: 15, color: palette.ink[600] }}>
                  {label}
                </Text>
                <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: palette.ink[900] }}>
                  {value || "Displayed at the store"}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Section>

      <View style={{ backgroundColor: palette.ink[900], paddingHorizontal: 20, paddingVertical: 56 }}>
        <View
          style={{
            width: "100%",
            maxWidth: MAX,
            alignSelf: "center",
            flexDirection: wide ? "row" : "column",
            justifyContent: "space-between",
            gap: 28,
          }}
        >
          <View style={{ flexShrink: 1 }}>
            <Text style={{ fontFamily: fonts.display, fontSize: 22, color: palette.neutral[0] }}>
              {STORE.name}
            </Text>
            <Text style={[body, { color: palette.ink[300], marginTop: 6, marginBottom: 12 }]}>
              {STORE.tagline}
            </Text>
            <ContactRow icon={MapPin} text={STORE.address} url={STORE.mapUrl || undefined} />
            <ContactRow icon={Phone} text={STORE.phone} url={`tel:${STORE.phone}`} />
            <ContactRow
              icon={MessageCircle}
              text={STORE.whatsapp && `WhatsApp ${STORE.whatsapp}`}
              url={`https://wa.me/${STORE.whatsapp.replace(/\D/g, "")}`}
            />
            <ContactRow icon={Clock} text={STORE.hours} />
          </View>
          <View style={{ alignItems: wide ? "flex-end" : "flex-start", gap: 10 }}>
            <Text style={[body, { color: palette.ink[300] }]}>Work here?</Text>
            <LoginButton onPress={toLogin} large />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
