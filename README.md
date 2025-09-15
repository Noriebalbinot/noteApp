# Notes App – Documentação

Aplicação de notas (criar, editar, excluir) com API (Effect + Drizzle + libSQL) e Web (React + Vite + TanStack Query).

## Como rodar localmente

Os scripts automatizam:

- Copiar `.env` da raiz para `api/.env` (ou criar um padrão)
- Instalar dependências apenas se necessário
- Aplicar o schema do banco com drizzle-kit
- Subir API e Web em paralelo com encerramento limpo

Pré-requisitos

- Node 18+ (ou Bun)
- Um gerenciador de pacotes disponível: bun, pnpm, npm ou yarn (detecção automática)

Ambiente (.env)

- Se existir `./.env`, ele será copiado para `./api/.env` no início.
- Padrão caso não exista `.env` na raiz:
  - `DB_FILE_NAME=file:local.db`
- Para forçar sobrescrita de `api/.env` a partir da raiz, use a variável `FORCE_COPY_ENV=1`.

Executar com um comando

- Bash (Git Bash/WSL):

```bash
./run.sh
```

Serviços em execução

- API: http://localhost:3000
- Web: http://localhost:5173 (Vite faz proxy de `/notes` para a API)

Execução manual (opcional)

1. API

```powershell
cd api
bunx drizzle-kit push ; bun src/Program.ts
```

2. Web

```powershell
cd web
bun run dev
```

## Decisões técnicas e trade-offs

- Effect + Drizzle (libSQL/SQLite): oferece forte tipagem, camadas e composição por efeitos; trade-off é a curva de aprendizado maior do que stacks mais simples (ex.: Express puro).
- TanStack Query: reduz boilerplate de requisições com cache, invalidação, estados de loading/erro; adiciona dependência e conceitos a aprender.
- Vite com proxy: evita URLs fixas no frontend e simplifica o desenvolvimento local; depende do dev server para o proxy.
- Tokens de design (CSS variables HSL): paleta aplicada via variáveis torna o tema consistente e fácil de ajustar; requer disciplina para manter os tokens alinhados (ex.: futuros temas/dark mode).
- Scripts portáveis (run.sh): detecção de bun/pnpm/npm/yarn, instalação condicional e start concorrente; scripts ficam mais extensos, mas melhoram onboarding.

## Como a IA foi utilizada no design

- Conversão da paleta teal/verde em variáveis CSS HSL (`web/src/index.css`), por exemplo: `--color-primary`, `--color-secondary`, `--color-muted`, `--color-border`.
- Sugestões de estados de foco/hover acessíveis, sombras suaves e raios de borda em componentes (botões, cards e modal) para manter consistência visual.
- Integração do TanStack Query (QueryClientProvider) e um app shell simples (header fixo com CTA + conteúdo), focando em clareza e minimalismo.

Exemplos de prompts/processo

- “Aplique esta paleta como variáveis CSS (HSL) e refatore componentes para consumi-las.”
- “Garanta foco/hover com contraste adequado e um ring consistente.”

## API – Referência rápida

Base: `http://localhost:3000/notes`

- GET `/all` → retorna `Note[]`
- GET `/:id` → retorna `Note`
- POST `/create` → body `{ title: string; content: string }` → retorna `Note`
- PATCH `/edit/:id` → body `{ id: number; title: string; content: string }` → retorna `Note`
- DELETE `/delete/:id` → retorna `{ message: string }`

Tipo `Note`

```ts
interface Note {
  id: number
  title: string
  content: string
  created_at: string // ISO
  updated_at: string // ISO
}
```

Banco de dados

- Drizzle ORM + libSQL (SQLite-like)

## Estrutura

- `api/`: servidor HTTP com Effect, rotas de notas, Drizzle e libSQL.
- `web/`: frontend React com Vite; TanStack Query + Axios para dados.
- `run.sh`: scripts para instalar (se necessário), migrar e subir tudo.
