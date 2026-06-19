# CLAUDE.md

# Bolão dos Amigos

## Visão Geral

O Bolão dos Amigos é uma aplicação web desenvolvida para permitir que usuários realizem palpites em partidas esportivas e disputem uma classificação baseada na pontuação obtida através dos acertos.

A aplicação possui autenticação de usuários, sistema de palpites por rodada, classificação geral, visualização de resultados dos jogos e comparação de palpites entre participantes.

---

# Objetivos

- Permitir cadastro e autenticação de usuários.
- Permitir que usuários realizem palpites para jogos de uma rodada.
- Impedir edição de palpites após envio.
- Calcular automaticamente os resultados dos palpites.
- Exibir ranking geral dos participantes.
- Permitir visualização dos palpites dos demais participantes apenas após o envio dos próprios palpites da rodada.
- Exibir resultados de jogos anteriores.
- Exibir próximos jogos.

---

# Stack Tecnológica

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Lucide React

## Backend

- Next.js Server Actions
- Next.js Route Handlers

## Banco de Dados

- PostgreSQL
- Prisma ORM
- Docker Compose

## Autenticação

- Auth.js
- Credentials Provider

## Hospedagem

### Aplicação

- Vercel

### Banco de Dados

- Neon PostgreSQL

---

# Regras de Negócio

## Pontuação

### Acertou o placar exato

Pontuação:

```txt
3 pontos
```

Exemplo:

```txt
Resultado: Brasil 2 x 1 Argentina

Palpite: Brasil 2 x 1 Argentina
```

Resultado do palpite:

```txt
EXACT_SCORE
```

---

### Acertou apenas vencedor ou empate

Pontuação:

```txt
1 ponto
```

Exemplo:

```txt
Resultado: Brasil 2 x 1 Argentina

Palpite: Brasil 1 x 0 Argentina
```

Resultado do palpite:

```txt
WINNER
```

---

### Errou

Pontuação:

```txt
0 pontos
```

Resultado:

```txt
WRONG
```

---

### Jogo não finalizado

Resultado:

```txt
PENDING
```

Pontuação:

```txt
0 pontos
```

---

## Observações

Acertar o placar exato NÃO gera 4 pontos.

O usuário recebe apenas:

```txt
3 pontos
```

---

# Fluxo de Palpites

1. Usuário acessa a tela de palpites.
2. Sistema busca os jogos da rodada aberta.
3. Usuário informa o placar previsto para cada partida.
4. Usuário envia os palpites.
5. Sistema salva todos os palpites.
6. Os palpites tornam-se imutáveis.

---

# Visualização de Palpites

Os usuários NÃO podem visualizar os palpites dos demais participantes antes de realizar seus próprios palpites.

Condição:

```txt
Usuário precisa ter enviado todos os palpites da rodada.
```

Após isso, o sistema libera a visualização dos demais palpites.

---

# Cadastro de usuário

A senha nunca será armazenada em texto puro.

Será utilizada criptografia com bcrypt.

const passwordHash = await bcrypt.hash(password, 10);

# Bloqueio de palpites

O palpite da rodada só poderá ser feito no máximo 10 minutos antes do inicio da primeira partida da rodada

Para fazer essa validação, instancie uma nova data, se essa data for a mesma da data do jogo e faltar menos de 10 minutos para o primeiro jogo da rodada não será mais possível enviar palpites para nenhum jogo da rodada.

O sistema não permitirá enviar apenas parte dos jogos da rodada.
Todos os jogos da rodada devem possuir um palpite.

const firstMatch = await prisma.match.findFirst({
where: {
round: "1",
},
orderBy: {
matchDateTime: "asc",
},
});

const deadline = new Date(
firstMatch.matchDateTime.getTime() - 10 _ 60 _ 1000
);

if (new Date() >= deadline) {
throw new Error("Palpites encerrados");
}

# Lista dos palpites

- Palpites que foram corretos (3 pontos), serão mostrados com fundo verde
- Palpites meio corretos (1 ponto), serão mostrados com fundo amarelo
- Palpites errados (0 pontos), serão mostrados com fundo vermelho
- Palpites de jogos que ainda não foram marcados como finished, serão mostrados com fundo padrão da aplicação
- O fundo colorido será exibido apenas para jogos finalizados.

# Calculo de pontos

Ao informar o resultado de uma partida e marcá-la como finished=true, o sistema deverá recalcular automaticamente todos os palpites vinculados ao jogo.

O resultado individual dos palpites é persistida no banco.

O ranking é calculado no frontend através da soma dos resultados dos palpites retornados pela API.

# Configuração da Rodada Atual

A aplicação não determinará automaticamente qual rodada está aberta para envio de palpites.

O administrador será responsável por definir qual rodada estará disponível para os usuários realizarem seus palpites.

---

## Tabela de Configurações

```prisma
model Settings {
  id           String   @id @default(cuid())

  currentRound String

  updatedAt    DateTime @updatedAt
}
```

A tabela Settings será utilizada para armazenar configurações globais da aplicação.

Inicialmente será utilizada apenas para controlar a rodada atualmente aberta para palpites.

---

## Funcionamento

Ao acessar a página:

```txt
/palpites
```

O sistema deverá buscar a rodada configurada em:

```txt
Settings.currentRound
```

Em seguida buscar todos os jogos dessa rodada.

Exemplo:

```ts
const settings = await prisma.settings.findFirst();

const matches = await prisma.match.findMany({
  where: {
    round: settings.currentRound,
  },
});
```

---

## Área Administrativa

Na área administrativa deverá existir uma opção:

```txt
Rodada Atual para Palpites
```

O administrador poderá selecionar qual rodada estará aberta.

Exemplo:

```txt
RODADA_1
RODADA_2
RODADA_3
QUARTAS
SEMIFINAL
FINAL
```

Ao salvar a configuração:

```txt
Settings.currentRound
```

será atualizado.

---

# Padrão de Rodadas

O campo:

```prisma
round String
```

deverá seguir valores padronizados.

Exemplos:

```txt
RODADA_1
RODADA_2
RODADA_3
RODADA_4
QUARTAS
SEMIFINAL
FINAL
```

O administrador não deverá digitar valores manualmente.

A seleção da rodada deverá ser feita através de um componente Select para evitar inconsistências.

Exemplos de valores inválidos:

```txt
Rodada 1
rodada 1
RODADA 1
R1
```

---

# Filtro de Palpites por Rodada

A tela:

```txt
/meus-palpites
```

deverá possuir filtro por rodada.

Exemplo:

```txt
[Todas]
[RODADA_1]
[RODADA_2]
[RODADA_3]
[QUARTAS]
[SEMIFINAL]
[FINAL]
```

Ao selecionar uma rodada, apenas os palpites referentes aos jogos daquela rodada deverão ser exibidos.

---

# Visualização de Palpites dos Outros Usuários

A visualização dos palpites dos demais participantes deverá possuir filtro por rodada.

Exemplo:

```txt
[RODADA_1]
[RODADA_2]
[RODADA_3]
[QUARTAS]
[SEMIFINAL]
[FINAL]
```

# Modelagem do Banco de Dados

## User

```prisma
enum Role {
  ADMIN
  USER
}

model User {
  id        String   @id @default(cuid())

  username  String   @unique
  email     String   @unique
  password  String

  role      Role @default(USER)

  guesses   Guess[]

  createdAt DateTime @default(now())
}
```

---

## Team

```prisma
model Team {
  id        String @id @default(cuid())

  name      String @unique
  badgeUrl  String?

  homeGames Match[] @relation("Team1")
  awayGames Match[] @relation("Team2")
}
```

---

## Match

```prisma
model Match {
  id        String @id @default(cuid())

  team1Id   String
  team2Id   String

  team1     Team @relation("Team1", fields: [team1Id], references: [id])
  team2     Team @relation("Team2", fields: [team2Id], references: [id])

  round     String

  matchDateTime DateTime

  score1    Int?
  score2    Int?

  finished Boolean @default(false)

  guesses   Guess[]

  createdAt DateTime @default(now())

    @@index([round])
    @@index([matchDateTime])
}
```

---

## GuessResult

```prisma
enum GuessResult {
  PENDING
  EXACT_SCORE
  WINNER
  WRONG
}
```

---

## Guess

```prisma
model Guess {
  id        String @id @default(cuid())

  userId    String
  matchId   String

  score1    Int
  score2    Int

  result    GuessResult @default(PENDING)

  user      User  @relation(fields: [userId], references: [id])
  match     Match @relation(fields: [matchId], references: [id])

  createdAt DateTime @default(now())

  @@unique([userId, matchId])

  @@index([userId])
  @@index([matchId])
}

```

---

# Estrutura de Rotas

## Públicas

```txt
/
```

Página inicial.

Conteúdo:

- Ranking geral
- Próximo jogo mais próximo

---

```txt
/login
```

Login.

---

```txt
/register
```

Cadastro.

---

## Privadas

```txt
/palpites
```

Realizar palpites da rodada atual.

---

```txt
/meus-palpites
```

Visualização dos palpites do usuário.

---

```txt
/palpites/rodada/[round]
```

Visualização dos palpites de todos os usuários da rodada.

---

```txt
/jogos
```

Histórico de resultados.

---

# Área Administrativa

A rota /admin deverá ser acessível apenas por usuários com role ADMIN.

## Objetivo

Permitir gerenciamento dos dados da competição.

---

## Funcionalidades

### Seleções

- Criar seleção
- Editar seleção
- Excluir seleção

---

### Jogos

- Criar jogo
- Editar jogo
- Excluir jogo
- Informar resultado

- Na criação do jogo terá a opção obrigatória de informar a rodada correspondente

---

# Cálculo de Resultado dos Palpites

## Acertou placar

```ts
guess.score1 === match.score1 && guess.score2 === match.score2;
```

Resultado:

```txt
EXACT_SCORE
```

---

## Acertou vencedor

if (
guess.score1 === match.score1 &&
guess.score2 === match.score2
) {
result = "EXACT_SCORE";
} else if (
(
guess.score1 > guess.score2 &&
match.score1 > match.score2
) ||
(
guess.score1 < guess.score2 &&
match.score1 < match.score2
) ||
(
guess.score1 === guess.score2 &&
match.score1 === match.score2
)
) {
result = "WINNER";
} else {
result = "WRONG";
}

---

## Errou

Resultado:

```txt
WRONG
```

---

# Ranking

A classificação será calculada no frontend.

const points = user.guesses.reduce((total, guess) => {
switch (guess.result) {
case "EXACT_SCORE":
return total + 3;

    case "WINNER":
      return total + 1;

    default:
      return total;

}
}, 0);

## Conversão

| Resultado   | Pontos |
| ----------- | ------ |
| EXACT_SCORE | 3      |
| WINNER      | 1      |
| WRONG       | 0      |
| PENDING     | 0      |

---

## Ordenação

```ts
users.sort((a, b) => b.points - a.points);
```

---

# MVP Inicial

## Funcionalidades obrigatórias

- Cadastro
- Login
- Cadastro de seleções
- Cadastro de jogos
- Cadastro de palpites
- Visualização de palpites
- Visualização de resultados
- Ranking geral
- Área administrativa

# Padrão Obrigatório de Interface

## Shadcn/UI

Toda a interface da aplicação deverá ser construída utilizando componentes do Shadcn/UI.

O projeto NÃO deverá criar componentes visuais do zero quando existir um componente equivalente disponível no Shadcn/UI.

Exemplos:

- Button
- Card
- Dialog
- Sheet
- Drawer
- Table
- Form
- Input
- Select
- Dropdown Menu
- Popover
- Tooltip
- Tabs
- Badge
- Alert
- Alert Dialog
- Accordion
- Skeleton
- Pagination
- Calendar
- Combobox
- Sonner
- Data Table

---

## Regra Obrigatória para IA

A IA NÃO DEVE criar componentes customizados do zero para resolver problemas já atendidos pelo Shadcn/UI.

Antes de implementar qualquer tela, formulário ou funcionalidade visual, a IA deve verificar se existe um componente oficial do Shadcn/UI adequado para o caso.

---

## Componentes Customizados

Componentes customizados somente poderão ser criados quando:

- Forem compostos por componentes do Shadcn/UI.
- Representarem regras de negócio específicas da aplicação.
- Não existir componente equivalente no Shadcn/UI.

Exemplo válido:

```tsx
export function MatchCard() {
  return (
    <Card>
      <CardHeader />
      <CardContent />
    </Card>
  );
}
```

Neste caso o componente é apenas uma composição de componentes do Shadcn/UI.

---

## Estilização

Toda estilização deverá ser realizada utilizando:

- Tailwind CSS
- Componentes Shadcn/UI

Evitar:

- CSS Modules
- Styled Components
- Emotion
- CSS customizado desnecessário

---

## Formulários

Todos os formulários deverão utilizar:

- Form (Shadcn)
- React Hook Form
- Zod

Exemplo:

```txt
Cadastro
Login
Cadastro de Seleção
Cadastro de Jogos
Cadastro de Palpites
```

---

## Tabelas

Todas as tabelas deverão utilizar:

- Table do Shadcn/UI

Exemplos:

```txt
Ranking
```

---

## Modais

Todos os modais deverão utilizar:

- Dialog
- AlertDialog
- Sheet

do Shadcn/UI.

---

## Proibição

A IA NÃO DEVE gerar código semelhante a:

```tsx
<button className="bg-blue-500 rounded px-4 py-2">Salvar</button>
```

Quando existir:

```tsx
<Button>Salvar</Button>
```

A IA deve sempre priorizar o componente oficial do Shadcn/UI.

## Biblioteca Oficial de Componentes

O Shadcn/UI é a única biblioteca de componentes permitida no projeto.

Não utilizar:

- Material UI
- Chakra UI
- Ant Design
- Mantine
- NextUI
- React Bootstrap

sem autorização explícita.

# Acesso ao Banco de Dados

Não realizar consultas Prisma diretamente em componentes.

Criar serviços específicos para cada entidade.

Estrutura:

src/services/
├── user/
├── match/
├── guess/
├── team/
└── settings/

Exemplo:

src/services/match/get-matches-by-round.ts
src/services/guess/create-guesses.ts
src/services/team/create-team.ts

# Server Actions

Todas as operações de escrita deverão utilizar Server Actions.

Exemplos:

- Cadastro de usuário
- Login
- Cadastro de seleção
- Cadastro de jogo
- Cadastro de palpites
- Atualização de configurações
- Informar resultado de jogo

Evitar criar Route Handlers para operações internas da aplicação quando Server Actions forem suficientes.

Route Handlers devem ser utilizados apenas quando houver necessidade de exposição de API.

# Qualidade de Código

A IA não deve utilizar:

- any
- @ts-ignore
- eslint-disable
- tipos genéricos desnecessários

Todo código deve ser estritamente tipado utilizando TypeScript.

Sempre que possível utilizar inferência do Prisma e Zod para geração de tipos.
