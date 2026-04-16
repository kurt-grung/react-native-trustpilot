export type TrustpilotTheme = 'light' | 'dark';

export type TrustpilotLocale =
  | 'en-US'
  | 'en-GB'
  | 'de-DE'
  | 'fr-FR'
  | 'es-ES'
  | 'it-IT'
  | 'nl-NL'
  | 'da-DK'
  | 'sv-SE'
  | 'nb-NO'
  | 'fi-FI'
  | 'pt-BR'
  | (string & {});

export interface TrustpilotWidgetProps {
  /** Your Trustpilot Business Unit ID */
  businessUnitId: string;
  /** Your domain as registered on Trustpilot (e.g. "example.com") */
  domain: string;
  /** Widget template ID from Trustpilot */
  templateId?: string;
  /** Display theme */
  theme?: TrustpilotTheme;
  /** Widget locale */
  locale?: TrustpilotLocale;
  /** Height of the widget container in pixels */
  height?: number;
  /** Width of the widget container — defaults to '100%' */
  width?: number | string;
  /** Filter reviews by tag (e.g. "SelectedReview") */
  tags?: string;
  /** Trustpilot API token for authenticated widgets */
  token?: string;
  /** Called when the widget finishes loading */
  onLoad?: () => void;
  /** Called when the widget fails to load */
  onError?: (error: string) => void;
}
