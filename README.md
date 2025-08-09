# teka-s-site

# Sorted by Stef — Static Website (Professional)

## O que está incluído
- `index.html` — página principal (sem backend)
- `styles.css` — estilos responsivos e acessíveis
- `script.js` — interações: flatpickr, validação, lazy-load, modal

## Como testar localmente
1. Crie uma pasta e cole `index.html`, `styles.css`, `script.js`.
2. Abra `index.html` no navegador (ou rode um servidor local: `npx http-server` ou `python -m http.server`).

## Deploy rápido
### GitHub Pages
1. Crie repo no GitHub e faça push dos arquivos.
2. Em Settings → Pages, escolha branch `main` e pasta `/root`.
3. Aguarde — seu site estará em `https://<username>.github.io/<repo>/`.

### Vercel (recomendado para futuro Next.js)
1. Crie conta em vercel.com e conecte ao repo.
2. Deploy automático no push. Site ficará em `https://your-site.vercel.app`.

## Próximos passos (opções)
- Integrar envio de formulário (Netlify Forms / Formspree / Supabase Functions / Firebase Functions).
- Substituir imagens por fotos reais (WebP, otimizadas) e usar CDN.
- Migrar para Next.js (SSR / SEO / escala) — posso gerar o scaffold completo.
- Automações: Google Calendar / Calendly / envio de email via SendGrid.

## Notas de Acessibilidade
- Skip link, labels e atributos ARIA básicos adicionados.
- Contraste de cores ajustado (recomendável testar com Lighthouse/axe).

## a fazer:
- 🔧 Gerar repo e deploy Vercel agora? — responde `deploy`.
- ⚙️ Migrar para Next.js com backend (Auth + Firestore)? — responde `next`.
- 🎨 Personalizar identidade visual (cores, fontes, imagens)? — responde `design`.
