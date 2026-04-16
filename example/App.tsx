import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { TrustpilotWidget } from 'react-native-trustpilot';
import type { TrustpilotTheme } from 'react-native-trustpilot';

const BUSINESS_UNIT_ID = process.env.EXPO_PUBLIC_TP_BUSINESS_UNIT_ID ?? '';
const DOMAIN = process.env.EXPO_PUBLIC_TP_DOMAIN ?? '';
const TOKEN = process.env.EXPO_PUBLIC_TP_TOKEN ?? '';

type Template = {
  id: string;
  name: string;
  height: number;
  premium?: boolean;
};

type Locale = { code: string; label: string };

const LOCALES: Locale[] = [
  { code: 'en-US', label: 'EN' },
  { code: 'de-DE', label: 'DE' },
];

const TEMPLATES: Template[] = [
  // Free — available on your plan
  { id: '56278e9abfbbba0bdcd568bc', name: 'Review Collector', height: 52 },
  // Premium — require a paid Trustpilot plan
  { id: '5419b6a8b0d04a076446a9ad', name: 'Mini', height: 150, premium: true },
  { id: '54ad5defc6454f065c28af8b', name: 'Micro Star', height: 130, premium: true },
  { id: '5406e65db0d04a09e042d5fc', name: 'Horizontal', height: 28, premium: true },
  { id: '539adbd6dec7e10e686debee', name: 'Starter', height: 500, premium: true },
  { id: '5418052cfbfb950d88702476', name: 'Slider', height: 240, premium: true },
  { id: '53aa8807dec7e10d38f59f32', name: 'Grid', height: 500, premium: true },
  { id: '53aa8912dec7e10d38f59f36', name: 'Carousel', height: 140, premium: true },
  { id: '5763bccae0a06d08e809ecbb', name: 'Fully Custom', height: 500, premium: true },
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Template>(TEMPLATES[0]!);
  const [locale, setLocale] = useState<Locale>(LOCALES[0]!);

  const theme: TrustpilotTheme = isDark ? 'dark' : 'light';

  function handleSelect(template: Template) {
    setLoaded(false);
    setError(null);
    setSelected(template);
  }

  function handleLocale(l: Locale) {
    setLoaded(false);
    setError(null);
    setLocale(l);
  }

  return (
    <ScrollView
      style={[styles.root, isDark && styles.rootDark]}
      contentContainerStyle={styles.content}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Text style={[styles.heading, isDark && styles.textLight]}>
        Trustpilot Widget Testbed
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, isDark && styles.textLight]}>
          Dark theme
        </Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>

      <Text style={[styles.sectionLabel, isDark && styles.textLight]}>
        Template
      </Text>

      <View style={styles.chipRow}>
        {TEMPLATES.map((t) => {
          const isActive = t.id === selected.id;
          return (
            <Pressable
              key={t.id}
              onPress={() => handleSelect(t)}
              style={[
                styles.chip,
                isActive && styles.chipActive,
                t.premium && styles.chipPremium,
                t.premium && isActive && styles.chipPremiumActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive && styles.chipTextActive,
                  t.premium && styles.chipTextPremium,
                  t.premium && isActive && styles.chipTextPremiumActive,
                ]}
              >
                {t.name}
                {t.premium ? ' ★' : ''}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.sectionLabel, isDark && styles.textLight]}>
        Locale
      </Text>

      <View style={styles.chipRow}>
        {LOCALES.map((l) => {
          const isActive = l.code === locale.code;
          return (
            <Pressable
              key={l.code}
              onPress={() => handleLocale(l)}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {l.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.widgetContainer}>
        <TrustpilotWidget
          key={`${selected.id}-${theme}-${locale.code}`}
          businessUnitId={BUSINESS_UNIT_ID}
          domain={DOMAIN}
          templateId={selected.id}
          token={TOKEN}
          locale={locale.code}
          theme={theme}
          height={selected.height}
          onLoad={() => {
            setLoaded(true);
            setError(null);
          }}
          onError={(msg) => setError(msg)}
        />
      </View>

      {loaded && !error && (
        <Text style={styles.statusOk}>Widget loaded successfully</Text>
      )}
      {error != null && (
        <Text style={styles.statusError}>Error: {error}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  rootDark: {
    backgroundColor: '#111',
  },
  content: {
    padding: 24,
    paddingTop: 64,
    gap: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111',
  },
  textLight: {
    color: '#f9f9f9',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: -4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: '#00b67a',
    borderColor: '#00b67a',
  },
  chipPremium: {
    borderColor: '#f59e0b',
    backgroundColor: '#fffbeb',
  },
  chipPremiumActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  chipTextActive: {
    color: '#fff',
  },
  chipTextPremium: {
    color: '#b45309',
  },
  chipTextPremiumActive: {
    color: '#fff',
  },
  widgetContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    marginTop: 8,
  },
  statusOk: {
    color: '#16a34a',
    fontSize: 13,
    textAlign: 'center',
  },
  statusError: {
    color: '#dc2626',
    fontSize: 13,
    textAlign: 'center',
  },
});
