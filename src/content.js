export const links = {
  github: 'https://github.com/arturict/tagvico-ai',
  releases: 'https://github.com/arturict/tagvico-ai/releases',
  license: 'https://github.com/arturict/tagvico-ai/blob/main/LICENSE',
  docs: '/docs/',
  install: '/docs/installation',
  providers: '/docs/providers',
};

export const composeSnippet = `services:
  tagvico-ai:
    image: ghcr.io/arturict/tagvico-ai:3.5.0
    container_name: tagvico-ai
    restart: unless-stopped
    cap_drop:
      - ALL
    security_opt:
      - no-new-privileges=true
    ports:
      - "\${TAGVICO_AI_BIND_ADDRESS:-127.0.0.1}:8080:3000"
    environment:
      TAGVICO_AI_PORT: "3000"
      TAGVICO_AI_BIND_ADDRESS: "\${TAGVICO_AI_BIND_ADDRESS:-127.0.0.1}"
      TAGVICO_TELEMETRY_ENDPOINT: "\${TAGVICO_TELEMETRY_ENDPOINT:-https://telemetry.tagvico.arturf.ch/v1/heartbeat}"
    volumes:
      - tagvico_ai_data:/app/data

volumes:
  tagvico_ai_data:
`;

export const dockerRunSnippet = `docker volume create tagvico_ai_data
docker run -d \\
  --name tagvico-ai \\
  --restart unless-stopped \\
  --cap-drop ALL \\
  --security-opt no-new-privileges=true \\
  -p 127.0.0.1:8080:3000 \\
  -e TAGVICO_AI_PORT=3000 \\
  -e TAGVICO_AI_BIND_ADDRESS=127.0.0.1 \\
  -e TAGVICO_TELEMETRY_ENDPOINT=https://telemetry.tagvico.arturf.ch/v1/heartbeat \\
  -v tagvico_ai_data:/app/data \\
  ghcr.io/arturict/tagvico-ai:3.5.0
`;

export const alts = {
  chat: 'The Tagvico start page: a message box that says Ask about your documents, suggested questions and the most urgent open item',
  answer: 'A Tagvico answer to the question when the CSS premium is due, with the two Paperless documents it used shown as source pills',
  approval: 'A Tagvico proposal to decide on an insurance renewal, with Reject and Approve buttons and the note that nothing happens until an owner or adult approves',
  'needs-you': 'The Needs you list in Tagvico with overdue, this week and later items, each with a due date and a Done button',
  person: 'A household member page in Tagvico showing her role, that she can approve changes, and her two open items',
  models: 'Tagvico provider settings listing ChatGPT plan, OpenAI, OpenRouter, Ollama and an OpenAI-compatible endpoint',
  channels: 'Tagvico channel settings for Telegram, with a bot token field, allowed people and deadline reminders',
  filing: 'Tagvico automation settings with the Review first write mode selected',
};

export const models = [
  {
    name: 'ChatGPT plan',
    note: 'New in 3.5',
    text: 'Sign in with ChatGPT and use your Plus or Pro plan. No API key. Requests count toward your plan, and you can limit or disconnect Tagvico under ChatGPT Settings, Usage.',
  },
  { name: 'OpenAI', text: 'Use your own API key with the OpenAI API.' },
  { name: 'OpenRouter', text: 'One key for many hosted models.' },
  { name: 'Ollama', text: 'Run models on your own hardware, so document text stays on your network.' },
];

export const trust = [
  {
    title: 'Your archive stays on your server',
    text: 'Paperless-ngx keeps the documents. Tagvico keeps approvals, history and settings in a database on its own volume.',
  },
  {
    title: 'The AI provider you pick sees document text',
    text: 'Questions and filing send the text they need to that provider. With Ollama, it never leaves your network.',
  },
  {
    title: 'ChatGPT plan sends text to OpenAI with store set to false',
    text: 'Sign-in tokens stay on your server and never reach the browser. Sign out revokes the session at OpenAI.',
  },
  {
    title: 'Usage statistics are off until you turn them on',
    text: 'The optional counter sends no document text, titles, names or addresses, and you can preview exactly what it would send.',
  },
];
