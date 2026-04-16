# react-native-trustpilot

A lightweight React Native component for embedding [Trustpilot](https://www.trustpilot.com) widgets in your mobile app. It wraps the official Trustpilot JavaScript bootstrap via a `WebView`, so the widget always renders exactly as it does on the web — no unofficial APIs, no scraping, no maintenance overhead.

**Features**

- Drop-in `<TrustpilotWidget>` component
- Supports all Trustpilot template IDs (free and premium)
- Light and dark theme
- Locale support out of the box
- Optional API token for authenticated widgets
- `onLoad` / `onError` callbacks
- Works with bare React Native and Expo managed workflow

## Requirements

- React Native ≥ 0.70 **or** Expo SDK ≥ 49
- [`react-native-webview`](https://github.com/react-native-webview/react-native-webview) ≥ 11

## Installation

**React Native (bare)**

```sh
npm install react-native-trustpilot react-native-webview
cd ios && pod install  # iOS only
```

**Expo managed workflow**

```sh
npx expo install react-native-trustpilot react-native-webview
```

`react-native-webview` is supported in Expo Go and all Expo SDK versions ≥ 49. No config plugin or extra setup is required.

## Development

This repo includes a `Makefile` for common tasks:

```sh
make bootstrap    # install all dependencies (root + example)
make build        # build the library
make check        # build + lint + typecheck in one shot
make start        # start the Expo dev server
make ios          # run on iOS simulator
make android      # run on Android emulator
make web          # run in browser
make clean        # remove build artifacts
```

Run `make` with no arguments to print the full command list.

## Usage

```tsx
import { TrustpilotWidget } from 'react-native-trustpilot';

export default function App() {
  return (
    <TrustpilotWidget
      businessUnitId="YOUR_BUSINESS_UNIT_ID"
      domain="example.com"
      locale="en-US"
      theme="light"
      height={150}
      onLoad={() => console.log('loaded')}
      onError={(msg) => console.error(msg)}
    />
  );
}
```

## Props

| Prop             | Type                      | Default                           | Description                                             |
| ---------------- | ------------------------- | --------------------------------- | ------------------------------------------------------- |
| `businessUnitId` | `string`                  | **required**                      | Your Trustpilot Business Unit ID                        |
| `domain`         | `string`                  | **required**                      | Domain registered on Trustpilot (e.g. `"example.com"`) |
| `templateId`     | `string`                  | `'5419b6a8b0d04a076446a9ad'`      | Trustpilot widget template ID (see below)               |
| `theme`          | `"light" \| "dark"`       | `"light"`                         | Widget color theme                                      |
| `locale`         | `TrustpilotLocale`        | `"en-US"`                         | Widget display locale                                   |
| `height`         | `number`                  | `150`                             | Container height in pixels                              |
| `width`          | `number \| string`        | `"100%"`                          | Container width                                         |
| `tags`           | `string`                  | —                                 | Filter reviews by tag (e.g. `"SelectedReview"`)         |
| `token`          | `string`                  | —                                 | Trustpilot API key for authenticated widgets            |
| `onLoad`         | `() => void`              | —                                 | Called when the widget finishes loading                 |
| `onError`        | `(error: string) => void` | —                                 | Called when the widget fails to load                    |

## Template IDs

### Free

| Name             | Template ID                        | Recommended height |
| ---------------- | ---------------------------------- | ------------------ |
| Review Collector | `56278e9abfbbba0bdcd568bc`         | 52                 |
| Mini             | `5419b6a8b0d04a076446a9ad`         | 150                |
| Micro Star       | `54ad5defc6454f065c28af8b`         | 130                |
| Horizontal       | `5406e65db0d04a09e042d5fc`         | 28                 |
| Starter          | `539adbd6dec7e10e686debee`         | 500                |

### Premium (requires a paid Trustpilot plan)

| Name         | Template ID                        | Recommended height |
| ------------ | ---------------------------------- | ------------------ |
| Slider       | `5418052cfbfb950d88702476`         | 240                |
| Grid         | `53aa8807dec7e10d38f59f32`         | 500                |
| Carousel     | `53aa8912dec7e10d38f59f36`         | 140                |
| Fully Custom | `5763bccae0a06d08e809ecbb`         | 500                |

Premium templates render a "Get the Premium plan to use this widget" message until the Trustpilot account associated with your domain is upgraded. This is enforced server-side by Trustpilot.

## Finding Your Credentials

**Business Unit ID & Token**

1. Log in to [Trustpilot Business](https://businessapp.b2b.trustpilot.com/)
2. Go to **Integrations → TrustBoxes**
3. Copy `data-businessunit-id` and `data-token` from any widget embed code

**API Token (optional)**

Required only for authenticated widgets. Create one at [developers.trustpilot.com](https://developers.trustpilot.com).

## Dark Mode

Pass `theme="dark"` to switch the widget to Trustpilot's dark variant. Re-mount the widget when the theme changes by using `key`:

```tsx
<TrustpilotWidget
  key={theme}
  businessUnitId="..."
  domain="..."
  theme={theme}
/>
```

## License

MIT
