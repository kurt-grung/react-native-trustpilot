import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import type { WebViewErrorEvent, WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import type { TrustpilotWidgetProps } from './types';

const DEFAULT_TEMPLATE_ID = '5419b6a8b0d04a076446a9ad';
const DEFAULT_HEIGHT = 150;

function buildHtml(
  businessUnitId: string,
  templateId: string,
  locale: string,
  height: number,
  theme: string,
  tags?: string,
  token?: string
): string {
  const extra = [
    tags ? `data-tags="${tags}"` : '',
    token ? `data-token="${token}"` : '',
  ]
    .filter(Boolean)
    .join('\n      ');

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { background: transparent; overflow: hidden; }
    </style>
  </head>
  <body>
    <div
      class="trustpilot-widget"
      data-locale="${locale}"
      data-template-id="${templateId}"
      data-businessunit-id="${businessUnitId}"
      data-style-height="${height}px"
      data-style-width="100%"
      data-theme="${theme}"
      ${extra}
    >
      <a href="https://www.trustpilot.com/review/${businessUnitId}" target="_blank" rel="noopener">Trustpilot</a>
    </div>
    <script
      type="text/javascript"
      src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
      async
    ></script>
  </body>
</html>`;
}

export function TrustpilotWidget({
  businessUnitId,
  templateId = DEFAULT_TEMPLATE_ID,
  theme = 'light',
  locale = 'en-US',
  height = DEFAULT_HEIGHT,
  tags,
  token,
  onLoad,
  onError,
}: TrustpilotWidgetProps) {
  const html = buildHtml(businessUnitId, templateId, locale, height, theme, tags, token);

  const handleLoad = useCallback(
    (_event: WebViewNavigationEvent) => {
      onLoad?.();
    },
    [onLoad]
  );

  const handleError = useCallback(
    (event: WebViewErrorEvent) => {
      onError?.(event.nativeEvent.description);
    },
    [onError]
  );

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        source={{ html, baseUrl: 'https://widget.trustpilot.com' }}
        style={styles.webview}
        scrollEnabled={false}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
        mixedContentMode="always"
        onLoad={handleLoad}
        onError={handleError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
