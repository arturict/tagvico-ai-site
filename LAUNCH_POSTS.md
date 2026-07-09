# Tagvico v2 alpha: launch post drafts

These drafts are intentionally factual about the current alpha: Tagvico is self-hosted, connects to Paperless-ngx through its API, and supports local, API-backed, and experimental Codex subscription workflows. Confirm the release tag and any provider compatibility changes before publishing.

## Where to post first

1. **r/Paperlessngx** — the best fit. Lead with the filing/review problem and disclose that this is your project. Because the first Tagvico post is recent, publish this as a substantial v2 update rather than repeating the original launch.
2. **r/SideProject** — explicitly welcomes project showcases. Use the shorter, personal builder version and ask for workflow feedback.
3. **r/selfhosted** — wait until the v2 image, migration notes, and setup documentation are production-ready. Follow the community's software-post and AI-disclosure rules.
4. **r/LLMDevs** — use only for a technical post about constrained output, provider adapters, or the durable review queue; do not paste the general launch copy.
5. **r/opensource** — participate first, then write a manual, community-specific post. Do not submit AI-generated copy unchanged.
6. **r/ChatGPT** — use the current weekly self-promotion megathread, not a standalone launch post.

Skip **r/homelab** and **r/LocalLLaMA** for now because their current software-promotion rules include account/karma requirements. Re-read every community's live rules immediately before posting; moderators can change them.

## Reddit — r/selfhosted / r/Paperlessngx

**Title:** I built Tagvico v2: self-hosted AI filing for Paperless-ngx, with controlled tags and a review queue

I use Paperless-ngx for my documents, but I wanted the AI layer to be something I could inspect and control instead of a one-way “prompt and pray” automation.

So I built **Tagvico**. It is a self-hosted companion that reads the OCR text Paperless already has and proposes metadata such as titles, tags, correspondents, document types, dates, languages, custom fields, and optional owners.

The v2 alpha focuses on the parts I think make this safe enough to actually use:

- Controlled Tag Groups, so a model works with the vocabulary I define instead of inventing near-duplicate tags
- A review flow for uncertain suggestions and dry-run metadata diffs before writes
- Processing history, rescans, restore actions, and durable failure queues
- A choice of inference boundary: local or cloud Ollama, OpenAI/OpenRouter/Anthropic/Azure APIs, OpenCode Go, compatible endpoints such as LM Studio or vLLM, or experimental ChatGPT/Codex and GitHub Copilot subscription connections

It is MIT licensed and still alpha, so I would genuinely value blunt feedback — especially from people who already automate Paperless.

Repo: https://github.com/arturict/tagvico-ai

What guardrail would you require before you let an LLM update a real archive automatically?

**Community note:** read each community’s self-promotion rules first, be explicit that this is an alpha project, and do not repost the same draft where duplicate rules prohibit it.

## Reddit — a shorter, problem-first version

**Title:** What would make you trust AI filing in Paperless-ngx?

I am building Tagvico, a self-hosted AI companion for Paperless-ngx. The question I keep coming back to is not “can a model tag a PDF?” — it is “how do you stop it from slowly making your archive worse?”

The current alpha therefore has Tag Groups, reviewable dry runs, processing history, rescan/restore actions, and queues for jobs that need attention. You can use local or cloud Ollama, your own provider API key, or experimental ChatGPT/Codex and GitHub Copilot connections.

I would love feedback on the workflow, not just stars: what is the one safety control you would want before switching automatic writes on?

https://github.com/arturict/tagvico-ai

## X — launch thread (direct, artifact-first builder voice)

**Post 1**

I built Tagvico v2 because “ask an LLM to tag my PDFs” is easy.

Keeping a Paperless archive consistent after 10,000 documents is the hard part.

Tagvico is a self-hosted AI companion for Paperless-ngx with controlled Tag Groups, reviewable writes, and provider choice.

Open source, MIT, alpha:
https://github.com/arturict/tagvico-ai

**Post 2**

The v2 idea is simple:

don’t make people become prompt engineers to file documents.

Connect Paperless.
Choose where inference runs.
Pick the fields and vocabulary Tagvico can touch.
Review a dry run.
Then let the scheduled scan do the boring work.

**Post 3**

The most important v2 feature is probably the least flashy: Tag Groups.

Instead of letting a model make up tags forever, it works inside the vocabulary you define. Unknown suggestions go to review.

Small constraint. Much cleaner archive.

**Post 4**

Your archive, your inference boundary:

- local/remote Ollama
- Ollama Cloud, OpenAI, OpenRouter, Anthropic, Azure
- OpenCode Go, LM Studio, vLLM, LiteLLM, or another compatible endpoint
- experimental ChatGPT/Codex and GitHub Copilot connections

No hosted Tagvico service in the middle.

## X — single-post alternative

Tagvico v2 is a self-hosted AI filing layer for Paperless-ngx.

It reads Paperless OCR, proposes metadata, and writes only what you allow.

Local/cloud Ollama, your own API key, or experimental ChatGPT/Codex and GitHub Copilot connections. Controlled Tag Groups and a review queue keep the archive coherent.

MIT · alpha · feedback welcome
https://github.com/arturict/tagvico-ai

## X — candid build-in-public alternative

My first Tagvico post got enough attention that I stopped treating it like a weekend script.

v2 is the result: safer dry runs, controlled Tag Groups, a durable review queue, and more ways to use inference you already pay for — including experimental ChatGPT/Codex and GitHub Copilot connections.

Still alpha. Still open source. I would rather hear what breaks than pretend it is finished.

https://github.com/arturict/tagvico-ai

## Before publishing

- Replace “alpha” only after the release image, migrations, and clean-install test pass.
- Add one real screenshot or a short screen capture of ingest → suggestion → review → apply.
- Disclose: “I built this” and, where required, that AI assisted with development or copy editing.
- Do not name-drop or mimic individual creators. The drafts borrow only broad traits: directness, a concrete artifact, candid constraints, and one clear question.
- Publish natively and reply to every substantive question; do not cross-post the identical text on the same day.
