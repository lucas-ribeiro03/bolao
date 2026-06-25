# 🏆 Bolão Copa 2026

Aplicação web para grupos de amigos disputarem um bolão de apostas esportivas. Os usuários enviam palpites para as partidas de cada rodada e concorrem em um ranking geral baseado nos acertos.

**Demo:** [bolao-copa-nine-eta.vercel.app](https://bolao-copa-nine-eta.vercel.app)

---

## 📋 Visão Geral

O Bolão Copa 2026 permite que usuários se cadastrem, façam login e enviem palpites de placar para os jogos da rodada que estiver aberta. Depois que todos os palpites de uma rodada são finalizados pelo administrador, o sistema calcula automaticamente a pontuação de cada palpite e atualiza a classificação geral.

### Funcionalidades principais

- Cadastro e autenticação de usuários
- Envio de palpites por rodada (com bloqueio de edição após o envio)
- Cálculo automático do resultado dos palpites quando um jogo é finalizado
- Ranking geral dos participantes
- Visualização dos palpites de outros usuários — liberada somente depois que o próprio usuário enviar todos os palpites da rodada
- Histórico de jogos e resultados
- Área administrativa para gerenciar seleções, jogos e a rodada atual

---

## 🛠️ Stack Tecnológica

**Frontend**
- [Next.js](https://nextjs.org) (App Router)
- React
- TypeScript
- Tailwind CSS
- [shadcn/ui](https://ui.shadcn.com)
- Lucide React

**Backend**
- Next.js Server Actions
- Next.js Route Handlers

**Banco de Dados**
- PostgreSQL
- Prisma ORM
- Docker Compose (ambiente local)

**Autenticação**
- Auth.js (NextAuth)
- Credentials Provider (com hash de senha via bcrypt)

**Hospedagem**
- Aplicação: [Vercel](https://vercel.com)
- Banco de dados: [Neon PostgreSQL](https://neon.tech)

---

## 🎲 Regras do Jogo

A pontuação de cada palpite é calculada comparando o placar informado pelo usuário com o resultado real da partida:

| Resultado do palpite | Condição                              | Pontos |
|-----------------------|----------------------------------------|--------|
| `EXACT_SCORE`         | Acertou o placar exato                 | 3      |
| `WINNER`              | Acertou apenas o vencedor ou o empate  | 1      |
| `WRONG`               | Errou                                  | 0      |
| `PENDING`             | Jogo ainda não finalizado              | 0      |

> Acertar o placar exato concede apenas os 3 pontos — não soma pontos adicionais por também ter acertado o vencedor.

### Fluxo de palpites

1. O usuário acessa a tela de palpites.
2. O sistema busca os jogos da rodada que está aberta (definida pelo administrador).
3. O usuário informa o placar previsto para cada partida da rodada.
4. O usuário envia todos os palpites de uma vez — não é possível enviar parcialmente.
5. Os palpites são salvos e se tornam **imutáveis**.

### Bloqueio de envio

Os palpites de uma rodada só podem ser enviados até **10 minutos antes** do início da primeira partida da rodada. Após esse prazo, o envio é bloqueado para todos os jogos daquela rodada.

### Visualização dos palpites de outros usuários

Um usuário só pode ver os palpites dos demais participantes em uma rodada depois de **enviar todos os seus próprios palpites** daquela rodada.

### Recálculo automático

Sempre que um jogo é marcado como finalizado (`finished = true`) e seu placar é informado, o sistema recalcula automaticamente o resultado de todos os palpites vinculados àquele jogo. O ranking geral é calculado no frontend, somando os pontos de cada usuário.

---

## 🗄️ Modelagem do Banco de Dados

```prisma
enum Role {
  ADMIN
  USER
}

enum GuessResult {
  PENDING
  EXACT_SCORE
  WINNER
  WRONG
}

model User {
  id        String   @id @default(cuid())
  username  String   @unique
  email     String   @unique
  password  String
  role      Role     @default(USER)
  guesses   Guess[]
  createdAt DateTime @default(now())
}

model Team {
  id        String  @id @default(cuid())
  name      String  @unique
  badgeUrl  String?
  homeGames Match[] @relation("Team1")
  awayGames Match[] @relation("Team2")
}

model Match {
  id            String   @id @default(cuid())
  team1Id       String
  team2Id       String
  team1         Team     @relation("Team1", fields: [team1Id], references: [id])
  team2         Team     @relation("Team2", fields: [team2Id], references: [id])
  round         String
  matchDateTime DateTime
  score1        Int?
  score2        Int?
  finished      Boolean  @default(false)
  guesses       Guess[]
  createdAt     DateTime @default(now())

  @@index([round])
  @@index([matchDateTime])
}

model Guess {
  id        String      @id @default(cuid())
  userId    String
  matchId   String
  score1    Int
  score2    Int
  result    GuessResult @default(PENDING)
  user      User        @relation(fields: [userId], references: [id])
  match     Match       @relation(fields: [matchId], references: [id])
  createdAt DateTime    @default(now())

  @@unique([userId, matchId])
  @@index([userId])
  @@index([matchId])
}

model Settings {
  id           String   @id @default(cuid())
  currentRound String
  updatedAt    DateTime @updatedAt
}
```

A tabela `Settings` controla qual rodada está atualmente aberta para o envio de palpites — essa configuração é definida manualmente pelo administrador.

---

## 🗺️ Estrutura de Rotas

### Públicas

| Rota | Descrição |
|------|-----------|
| `/login` | Login |
| `/register` | Cadastro de usuário |

### Privadas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial — ranking geral e próximo jogo |
| `/guess` | Envio de palpites da rodada atual / visualização de palpites |
| `/ranking` | Visualização do ranking geral |

### Administrativa

| Rota | Descrição |
|------|-----------|
| `/admin` | Restrita a usuários com role `ADMIN`. Permite definir a rodada atual para palpites e informar o resultado / finalizar partidas |
| `/admin/settings` | Atualização da rodada atual |

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 20.x
- Docker e Docker Compose (para o banco de dados PostgreSQL local)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/lucas-ribeiro03/bolao.git
cd bolao

# Instale as dependências
npm install

# Suba o banco de dados PostgreSQL via Docker
docker compose up -d

# Configure as variáveis de ambiente
cp .env.example .env
# edite o .env com a sua DATABASE_URL e demais variáveis necessárias

# Execute as migrations do Prisma
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

> **Nota:** se o arquivo `.env.example` não existir no repositório, crie um `.env` na raiz do projeto com, no mínimo, a variável `DATABASE_URL` apontando para o banco PostgreSQL (local ou Neon) e as variáveis exigidas pelo Auth.js.

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor em modo produção |

---

## 📁 Estrutura do Projeto

```
.
├── app/            # Rotas e páginas (Next.js App Router)
├── components/      # Componentes React (composições sobre shadcn/ui)
├── constants/        # Constantes da aplicação
├── hooks/            # Hooks customizados
├── lib/              # Utilitários e configurações gerais
├── prisma/           # Schema e migrations do banco de dados
├── schemas/          # Schemas de validação (Zod)
├── services/         # Camada de acesso ao banco — uma pasta por entidade
├── types/            # Tipagens TypeScript compartilhadas
└── public/           # Arquivos estáticos
```

A aplicação segue o padrão de **services** para acesso ao banco de dados — nenhuma consulta Prisma é feita diretamente em componentes. Todas as operações de escrita são implementadas como **Server Actions**.

---

## 🎨 Padrões de Interface

Toda a interface é construída utilizando componentes do **shadcn/ui**, com estilização via **Tailwind CSS**. Formulários utilizam **React Hook Form** + **Zod** para validação, e modais seguem os componentes `Dialog`, `AlertDialog` ou `Sheet` do shadcn/ui.

---

## 📦 Deploy

A aplicação está hospedada na **Vercel**, com o banco de dados PostgreSQL hospedado no **Neon**.

---

## 📄 Licença

Este projeto não possui licença definida até o momento.
