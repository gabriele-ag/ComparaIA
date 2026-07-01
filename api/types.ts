export type AIProduct = {
  title: string; // Nome del tool AI
  category: string; // Es. "Generazione Testo", "Immagini", "Video", ecc.
  description: string; // Breve descrizione del tool
  brand: string; // Nome dell'azienda (es. OpenAI, Google, Adobe...)
  website: string; // URL ufficiale
  logoUrl: string; // URL immagine/logo
  price: string; // Es. "Gratuito", "Da 20€/mese", "Freemium"
  hasFreeVersion: boolean; // true/false
  apiAvailable: boolean; // true/false
  supportedLanguages: string[]; // ["IT", "EN", "FR", ...]
  platforms: string[]; // ["Web", "iOS", "Android", "Desktop"]
  releaseYear: number; // Anno di rilascio
  rating: number; // Valutazione media (es. 4.5 su 5)
  integrations: string[]; // Es. ["Slack", "Zapier", "Notion"]
  privacyLevel: "High" | "Medium" | "Low"; // Livello di protezione dati
  useCases: string[]; // Es. ["Copywriting", "Coding", "Design", "Analytics"]
};