import "dotenv/config";
import { prisma } from "./prisma";
import { GuessResult } from "@prisma/client";

// const guessResult = GuessResult;

// const teams = [
//   { name: "Alemanha", flag: "alemanha" },
//   { name: "Arabia Saudita", flag: "arabia_saudita" },
//   { name: "Africa do Sul", flag: "africa_do_sul" },
//   { name: "Argelia", flag: "argelia" },
//   { name: "Argentina", flag: "argentina" },
//   { name: "Australia", flag: "australia" },
//   { name: "Austria", flag: "austria" },
//   { name: "Belgica", flag: "belgica" },
//   { name: "Bosnia e Herzegovina", flag: "bosnia_e_herzegovina" },
//   { name: "Brasil", flag: "brasil" },
//   { name: "Cabo Verde", flag: "cabo_verde" },
//   { name: "Canada", flag: "canada" },
//   { name: "Catar", flag: "catar" },
//   { name: "Colombia", flag: "colombia" },
//   { name: "Coreia do Sul", flag: "coreia_do_sul" },
//   { name: "Costa do Marfim", flag: "costa_do_marfim" },
//   { name: "Croacia", flag: "croacia" },
//   { name: "Curacao", flag: "curacao" },
//   { name: "Egito", flag: "egito" },
//   { name: "Equador", flag: "equador" },
//   { name: "Escocia", flag: "escocia" },
//   { name: "Espanha", flag: "espanha" },
//   { name: "Estados Unidos", flag: "estados_unidos" },
//   { name: "Franca", flag: "franca" },
//   { name: "Gana", flag: "gana" },
//   { name: "Haiti", flag: "haiti" },
//   { name: "Holanda", flag: "holanda" },
//   { name: "Inglaterra", flag: "inglaterra" },
//   { name: "Ira", flag: "ira" },
//   { name: "Iraque", flag: "iraque" },
//   { name: "Japao", flag: "japao" },
//   { name: "Jordania", flag: "jordania" },
//   { name: "Marrocos", flag: "marrocos" },
//   { name: "Mexico", flag: "mexico" },
//   { name: "Noruega", flag: "noruega" },
//   { name: "Nova Zelandia", flag: "nova_zelandia" },
//   { name: "Panama", flag: "panama" },
//   { name: "Paraguai", flag: "paraguai" },
//   { name: "Portugal", flag: "portugal" },
//   {
//     name: "Republica Democratica do Congo",
//     flag: "republica_democratica_do_congo",
//   },
//   { name: "Senegal", flag: "senegal" },
//   { name: "Suecia", flag: "suecia" },
//   { name: "Suica", flag: "suica" },
//   { name: "Tchequia", flag: "tchequia" },
//   { name: "Tunisia", flag: "tunisia" },
//   { name: "Turquia", flag: "turquia" },
//   { name: "Uruguai", flag: "uruguai" },
//   { name: "Uzbequistao", flag: "uzbequistao" },
// ];

// (async () => {
//   await prisma.team.createMany({
//     data: teams,
//   });
// })();

// export const matchesFromFirstRound = [
//   {
//     team1Id: "e3c45336-df79-4f9b-bbd4-ad8ec35d9d13",
//     team2Id: "e47c69f0-bfd9-44fb-8300-829ea806401e",
//     score1: 2,
//     score2: 0,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-11T19:00:00Z"),
//   },
//   {
//     team1Id: "493e25d9-5cd4-4955-b1c8-36a79d625569",
//     team2Id: "3416e9da-f98b-4e03-a317-e2af4025dbb3",
//     score1: 2,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-12T02:00:00Z"),
//   },
//   {
//     team1Id: "eaf0a116-6b1c-4e28-989e-56538d08c294",
//     team2Id: "f55bad97-50f7-4d4c-a0d3-a15867fd3d55",
//     score1: 1,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-12T19:00:00Z"),
//   },
//   {
//     team1Id: "fc406d8a-fc3d-47a8-94c9-61b4c64ed425",
//     team2Id: "751ed56f-65f5-41fa-bbf4-b6432c8b2b09",
//     score1: 4,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-13T01:00:00Z"),
//   },
//   {
//     team1Id: "58c6dc2b-3cf5-4207-86b1-7a14190fd767",
//     team2Id: "b8f83bd0-50d7-4356-b6c6-99b2de62bafa",
//     score1: 1,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-13T19:00:00Z"),
//   },
//   {
//     team1Id: "a60c3370-16d1-4abd-bea6-9980beb3cff0",
//     team2Id: "f2f11145-276b-4e11-9bd4-28c0535923ed",
//     score1: 1,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-13T22:00:00Z"),
//   },
//   {
//     team1Id: "06dc0073-c109-45e0-9c03-91baaffe4ef4",
//     team2Id: "ae92a2b0-8b15-4e70-9149-1ef12a420b9f",
//     score1: 0,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-14T01:00:00Z"),
//   },
//   {
//     team1Id: "3088d5e5-ae6a-4b9f-a77e-ae0244e2351d",
//     team2Id: "8c990ada-2432-4a7f-8db3-46efc85607ed",
//     score1: 2,
//     score2: 0,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-14T04:00:00Z"),
//   },
//   {
//     team1Id: "7ef8d3f9-cf9b-45ed-844b-79be98f224f2",
//     team2Id: "06a16d1b-8452-495c-9ba2-1416b808939f",
//     score1: 7,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-14T17:00:00Z"),
//   },
//   {
//     team1Id: "7cc81f71-8491-4e00-8947-7a95e18239c4",
//     team2Id: "f233b3b5-5ba3-4507-81a6-86e1c71beda8",
//     score1: 2,
//     score2: 2,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-14T20:00:00Z"),
//   },
//   {
//     team1Id: "f00bccac-2cdb-49fa-bbc7-5d5b08290739",
//     team2Id: "4b4acc12-66ce-4010-9756-f9850f51988f",
//     score1: 1,
//     score2: 0,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-14T23:00:00Z"),
//   },
//   {
//     team1Id: "ba2d31c3-ce78-40a8-b608-8e42b075b75e",
//     team2Id: "5aa3d4f1-a342-4be5-a576-a1f8fec613eb",
//     score1: 5,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-15T02:00:00Z"),
//   },
//   {
//     team1Id: "35967464-e320-4919-aa17-1f08634e0973",
//     team2Id: "cac069c0-7efa-42fe-8906-221d5ce5eb6e",
//     score1: 0,
//     score2: 0,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-15T16:00:00Z"),
//   },
//   {
//     team1Id: "174013c6-1c46-4259-b783-4802711ac53c",
//     team2Id: "0ae6c99f-fe03-4fc1-9bc7-9098d6364231",
//     score1: 1,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-15T19:00:00Z"),
//   },
//   {
//     team1Id: "eda987ef-e34b-4dd2-a92b-4b8151b3e2a3",
//     team2Id: "50a09df9-705f-449f-8e71-e695bf389203",
//     score1: 1,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-15T22:00:00Z"),
//   },
//   {
//     team1Id: "b7ca01d1-d1b4-448b-86a6-72d25449bfc2",
//     team2Id: "f763c536-cdb0-4130-aaa8-9d9edd1eb850",
//     score1: 2,
//     score2: 2,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-16T01:00:00Z"),
//   },
//   {
//     team1Id: "94084ee4-bfb8-4d3e-975d-ca238346934b",
//     team2Id: "3ed86a3d-24c4-408d-a680-7b9949d8c556",
//     score1: 3,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-16T19:00:00Z"),
//   },
//   {
//     team1Id: "9788504f-42e2-4b86-9f72-c012f062b471",
//     team2Id: "e95ff731-f466-4282-8e64-6e579a94a15f",
//     score1: 1,
//     score2: 4,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-16T22:00:00Z"),
//   },
//   {
//     team1Id: "76f0de61-fd7c-495f-bf93-ea7c1a0cfe75",
//     team2Id: "619ef6da-ee56-416c-a8e4-19a1f55f4c3c",
//     score1: 3,
//     score2: 0,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-17T01:00:00Z"),
//   },
//   {
//     team1Id: "98c9f94a-8813-4e88-bf3d-e695cd573ab5",
//     team2Id: "02936285-f184-4c6a-bd72-0b921985a077",
//     score1: 3,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-17T04:00:00Z"),
//   },
//   {
//     team1Id: "541d0b65-e0c7-440c-b943-7663162e5905",
//     team2Id: "0dc0b187-d384-4fa0-9dba-58d25ef52473",
//     score1: 1,
//     score2: 1,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-17T17:00:00Z"),
//   },
//   {
//     team1Id: "76af804a-d17a-4b9f-90c2-a0e596348ed0",
//     team2Id: "64c883e1-7186-4de0-9ddb-a3a69914bccf",
//     score1: 4,
//     score2: 2,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-17T20:00:00Z"),
//   },
//   {
//     team1Id: "6a64323a-45df-4ffa-9304-97f8af6f3dde",
//     team2Id: "5f32cf93-6e11-4189-9165-f9c0be39c2d6",
//     score1: 1,
//     score2: 0,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-17T23:00:00Z"),
//   },
//   {
//     team1Id: "a8b3ae52-1108-477e-84b7-916c33b20995",
//     team2Id: "48badd5b-defa-4a57-9caa-93cde68e91b2",
//     score1: 1,
//     score2: 3,
//     round: "1",
//     finished: true,
//     matchDateTime: new Date("2026-06-18T02:00:00Z"),
//   },
// ];

// (async () => {
//   await prisma.match.createMany({
//     data: matchesFromFirstRound,
//   });
// })();

// export const matchesFromSecondRound = [
//   {
//     team1Id: "e3c45336-df79-4f9b-bbd4-ad8ec35d9d13", // Mexico
//     team2Id: "493e25d9-5cd4-4955-b1c8-36a79d625569", // Korea Republic
//     matchDateTime: new Date("2026-06-18T22:00:00-03:00"),
//     score1: 1,
//     score2: 0,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "3416e9da-f98b-4e03-a317-e2af4025dbb3", // Czechia
//     team2Id: "e47c69f0-bfd9-44fb-8300-829ea806401e", // South Africa
//     matchDateTime: new Date("2026-06-18T13:00:00-03:00"),
//     score1: 1,
//     score2: 1,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "b8f83bd0-50d7-4356-b6c6-99b2de62bafa", // Switzerland
//     team2Id: "f55bad97-50f7-4d4c-a0d3-a15867fd3d55", // Bosnia and Herzegovina
//     matchDateTime: new Date("2026-06-18T16:00:00-03:00"),
//     score1: 4,
//     score2: 1,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "eaf0a116-6b1c-4e28-989e-56538d08c294", // Canada
//     team2Id: "58c6dc2b-3cf5-4207-86b1-7a14190fd767", // Qatar
//     matchDateTime: new Date("2026-06-18T19:00:00-03:00"),
//     score1: 6,
//     score2: 0,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "ae92a2b0-8b15-4e70-9149-1ef12a420b9f", // Scotland
//     team2Id: "f2f11145-276b-4e11-9bd4-28c0535923ed", // Morocco
//     matchDateTime: new Date("2026-06-19T19:00:00-03:00"),
//     score1: 0,
//     score2: 1,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "a60c3370-16d1-4abd-bea6-9980beb3cff0", // Brazil
//     team2Id: "06dc0073-c109-45e0-9c03-91baaffe4ef4", // Haiti
//     matchDateTime: new Date("2026-06-19T21:30:00-03:00"),
//     score1: 3,
//     score2: 0,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "fc406d8a-fc3d-47a8-94c9-61b4c64ed425", // USA
//     team2Id: "3088d5e5-ae6a-4b9f-a77e-ae0244e2351d", // Australia
//     matchDateTime: new Date("2026-06-19T16:00:00-03:00"),
//     score1: 2,
//     score2: 0,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "8c990ada-2432-4a7f-8db3-46efc85607ed", // Turkiye
//     team2Id: "751ed56f-65f5-41fa-bbf4-b6432c8b2b09", // Paraguay
//     matchDateTime: new Date("2026-06-20T00:00:00-03:00"),
//     score1: 0,
//     score2: 1,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "7ef8d3f9-cf9b-45ed-844b-79be98f224f2", // Germany
//     team2Id: "f00bccac-2cdb-49fa-bbc7-5d5b08290739", // Ivory Coast
//     matchDateTime: new Date("2026-06-20T17:00:00-03:00"),
//     score1: 2,
//     score2: 1,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "4b4acc12-66ce-4010-9756-f9850f51988f", // Ecuador
//     team2Id: "06a16d1b-8452-495c-9ba2-1416b808939f", // Curacao
//     matchDateTime: new Date("2026-06-20T21:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "7cc81f71-8491-4e00-8947-7a95e18239c4", // Netherlands
//     team2Id: "ba2d31c3-ce78-40a8-b608-8e42b075b75e", // Sweden
//     matchDateTime: new Date("2026-06-20T14:00:00-03:00"),
//     score1: 5,
//     score2: 1,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "5aa3d4f1-a342-4be5-a576-a1f8fec613eb", // Tunisia
//     team2Id: "f233b3b5-5ba3-4507-81a6-86e1c71beda8", // Japan
//     matchDateTime: new Date("2026-06-21T01:00:00-03:00"),
//     score1: 0,
//     score2: 4,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "174013c6-1c46-4259-b783-4802711ac53c", // Belgium
//     team2Id: "b7ca01d1-d1b4-448b-86a6-72d25449bfc2", // IR Iran
//     matchDateTime: new Date("2026-06-21T16:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "f763c536-cdb0-4130-aaa8-9d9edd1eb850", // New Zealand
//     team2Id: "0ae6c99f-fe03-4fc1-9bc7-9098d6364231", // Egypt
//     matchDateTime: new Date("2026-06-21T22:00:00-03:00"),
//     score1: 1,
//     score2: 3,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "35967464-e320-4919-aa17-1f08634e0973", // Spain
//     team2Id: "eda987ef-e34b-4dd2-a92b-4b8151b3e2a3", // Saudi Arabia
//     matchDateTime: new Date("2026-06-21T13:00:00-03:00"),
//     score1: 4,
//     score2: 0,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "50a09df9-705f-449f-8e71-e695bf389203", // Uruguay
//     team2Id: "cac069c0-7efa-42fe-8906-221d5ce5eb6e", // Cape Verde
//     matchDateTime: new Date("2026-06-21T19:00:00-03:00"),
//     score1: 2,
//     score2: 2,
//     finished: true,
//     round: "2",
//   },
//   {
//     team1Id: "94084ee4-bfb8-4d3e-975d-ca238346934b", // France
//     team2Id: "9788504f-42e2-4b86-9f72-c012f062b471", // Iraq
//     matchDateTime: new Date("2026-06-22T18:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//     round: "2",
//   },
//   {
//     team1Id: "e95ff731-f466-4282-8e64-6e579a94a15f", // Norway
//     team2Id: "3ed86a3d-24c4-408d-a680-7b9949d8c556", // Senegal
//     matchDateTime: new Date("2026-06-22T21:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//     round: "2",
//   },
//   {
//     team1Id: "76f0de61-fd7c-495f-bf93-ea7c1a0cfe75", // Argentina
//     team2Id: "98c9f94a-8813-4e88-bf3d-e695cd573ab5", // Austria
//     matchDateTime: new Date("2026-06-22T14:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//     round: "2",
//   },
//   {
//     team1Id: "02936285-f184-4c6a-bd72-0b921985a077", // Jordan
//     team2Id: "619ef6da-ee56-416c-a8e4-19a1f55f4c3c", // Algeria
//     matchDateTime: new Date("2026-06-23T00:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//     round: "2",
//   },
//   {
//     team1Id: "541d0b65-e0c7-440c-b943-7663162e5905", // Portugal
//     team2Id: "a8b3ae52-1108-477e-84b7-916c33b20995", // Uzbekistan
//     matchDateTime: new Date("2026-06-23T14:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//     round: "2",
//   },
//   {
//     team1Id: "76af804a-d17a-4b9f-90c2-a0e596348ed0", // England
//     team2Id: "6a64323a-45df-4ffa-9304-97f8af6f3dde", // Ghana
//     matchDateTime: new Date("2026-06-23T17:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//     round: "2",
//   },
//   {
//     team1Id: "5f32cf93-6e11-4189-9165-f9c0be39c2d6", // Panama
//     team2Id: "64c883e1-7186-4de0-9ddb-a3a69914bccf", // Croatia
//     matchDateTime: new Date("2026-06-23T20:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//     round: "2",
//   },
//   {
//     team1Id: "48badd5b-defa-4a57-9caa-93cde68e91b2", // Colombia
//     team2Id: "0dc0b187-d384-4fa0-9dba-58d25ef52473", // Congo DR
//     matchDateTime: new Date("2026-06-23T23:00:00-03:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//     round: "2",
//   },
// ];

// (async () => {
//   await prisma.match.createMany({
//     data: matchesFromSecondRound,
//   });
// })();

// export const guessesFromLucas = [
//   {
//     matchId: "8bef9e7b-24c5-425b-aa28-285ba020c5a0", // Tchéquia x África do Sul
//     result: guessResult.WRONG,
//     score1: 3,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "5dae5141-b150-4acf-9d22-2351cbb37f21", // México x Coreia do Sul
//     result: guessResult.WRONG,
//     score1: 2,
//     score2: 2,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "38cb81b1-b3e1-4bd4-9b15-775c04f8a6ba", // Suíça x Bósnia
//     result: guessResult.WINNER,
//     score1: 2,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "bb6e26b9-8950-41b6-a0f9-c397a52b90bb", // Canadá x Qatar
//     result: guessResult.WINNER,
//     score1: 3,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "fa4f3d84-6da5-4462-8fff-a94a040143a0", // Estados Unidos x Austrália
//     result: guessResult.EXACT_SCORE,
//     score1: 2,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "b01b7b72-c728-487f-a6ae-373cc8e99f63", // Turquia x Paraguai
//     result: guessResult.WRONG,
//     score1: 3,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "a1d3a789-44e1-406c-a43e-098504a8071e", // Brasil x Haiti
//     result: guessResult.EXACT_SCORE,
//     score1: 3,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "33ed2070-d347-4a92-8619-0803dd1d33f7", // Escócia x Marrocos
//     result: guessResult.WINNER,
//     score1: 1,
//     score2: 2,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "2b0e7e0f-a117-4f08-a84c-422bc7f9ab48", // Alemanha x Costa do Marfim
//     result: guessResult.WINNER,
//     score1: 4,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "37b24e77-2c17-4821-97b1-11f86ae6f701", // Equador x curaçao
//     result: guessResult.WRONG,
//     score1: 3,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "9b3a4bab-017f-46fe-889e-dde1757a05ad", // Holanda x Suécia
//     result: guessResult.WRONG,
//     score1: 3,
//     score2: 3,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "66eef89a-ba9c-4a02-952b-95d7eb1fcfb5", // Tunísia x Japão
//     result: guessResult.WINNER,
//     score1: 0,
//     score2: 2,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "796b81d4-15e5-40e5-8008-335ecf84469f", // Espanha x Arábia Saudita
//     result: guessResult.WINNER,
//     score1: 3,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "85190eb2-7913-431d-a821-f41dc1ce72f2", // Uruguai x Cabo Verde
//     result: guessResult.WRONG,
//     score1: 2,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "576b9d76-bc27-44f6-b5c2-4668a82f8394", // Bélgica x Irã
//     result: guessResult.WRONG,
//     score1: 4,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "1a89fe5a-eae0-4290-a420-3a9692ec8cf9", // Nova Zelândia x Egito
//     result: guessResult.WINNER,
//     score1: 0,
//     score2: 2,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "57906ee7-93a7-4238-b228-2c1249ade80e", // Argentina x Áustria
//     result: guessResult.PENDING,
//     score1: 2,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "ad745ae0-ea05-412f-8afb-d192e22dc7e3", // Jordânia x Argélia
//     result: guessResult.PENDING,
//     score1: 2,
//     score2: 2,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "1c1e9c4c-9adf-4506-aa16-a6c8d6c582fc", // França x Iraque
//     result: guessResult.PENDING,
//     score1: 4,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "a38ab1b1-b152-4eb5-bbb6-c613e886d727", // Noruega x Senegal
//     result: guessResult.PENDING,
//     score1: 2,
//     score2: 2,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "0de1e4e3-1ade-481e-be23-9620fcd83be7", // Portugal x Uzbequistão
//     result: guessResult.PENDING,
//     score1: 3,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "4bed029f-f09f-4302-9e98-8bfc858fea77", // Colômbia x Congo
//     result: guessResult.PENDING,
//     score1: 3,
//     score2: 2,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "0563e5ab-9b40-406c-91e0-39fbbb3ea683", // Inglaterra x Gana
//     result: guessResult.PENDING,
//     score1: 5,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "33a595b8-2518-4082-af8b-d3ba1a9e8bc9", // Panamá x Croácia
//     result: guessResult.PENDING,
//     score1: 0,
//     score2: 3,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "d9f3509b-5df7-4d6a-894b-f14aeff94d97", // mexico x africa do sul
//     result: guessResult.EXACT_SCORE,
//     score1: 2,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "7d36cf7b-ad12-4b96-9566-92a6c1a2cc99", // brasil x marrocos
//     result: guessResult.EXACT_SCORE,
//     score1: 1,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "ec722944-e50c-48f3-9363-cbd42e54c108", // alemanha x curaçao
//     result: guessResult.WINNER,
//     score1: 4,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "fb8d8034-4d90-4eb5-8d33-f421aacbabf1", // holanda x japao
//     result: guessResult.WRONG,
//     score1: 2,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "4c1c8cff-fb7c-4b13-b743-51c8a9e426de", // espanha x cabo verde
//     result: guessResult.WRONG,
//     score1: 5,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "c883cc35-4e19-4a10-8814-aa30f47e6b10", // belgica x egito
//     result: guessResult.WRONG,
//     score1: 3,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "57e5fd89-4f55-4393-9160-d55eacbebcde", // uruguay x arabia
//     result: guessResult.EXACT_SCORE,
//     score1: 1,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "261b8ba9-0c97-4a5a-a495-e21b01eb30fb", // frança x senegal
//     result: guessResult.EXACT_SCORE,
//     score1: 3,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "5da312df-2275-4d47-9220-35e95bd7dcef", // portgual x congo
//     result: guessResult.WRONG,
//     score1: 6,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "c9d81088-f182-4fae-9962-bb6239457a40", // inglaterra x croacia
//     result: guessResult.WINNER,
//     score1: 3,
//     score2: 1,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
//   {
//     matchId: "033db1b9-c786-4208-bac7-0443c4b3dcb8", // argentina x argélia
//     result: guessResult.EXACT_SCORE,
//     score1: 3,
//     score2: 0,
//     userId: "820f846e-80a1-433e-98de-479871583b53",
//   },
// ];

// async function main() {
//   await prisma.guess.createMany({
//     data: guessesFromLucas,
//   });

//   console.log("Guesses criados com sucesso.");
// }

// main()
//   .catch(console.error)
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// (async () => {
//   await prisma.settings.create({
//     data: {
//       currentRound: "2",
//     },
//   });
// })();

//
// const matchesTest = [
//   {
//     team1Id: "e47c69f0-bfd9-44fb-8300-829ea806401e",
//     team2Id: "eaf0a116-6b1c-4e28-989e-56538d08c294",
//     round: "16_avos",
//     matchDateTime: new Date("2026-06-28T16:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "a60c3370-16d1-4abd-bea6-9980beb3cff0",
//     team2Id: "f233b3b5-5ba3-4507-81a6-86e1c71beda8",
//     round: "16_avos",
//     matchDateTime: new Date("2026-06-29T14:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "7ef8d3f9-cf9b-45ed-844b-79be98f224f2",
//     team2Id: "751ed56f-65f5-41fa-bbf4-b6432c8b2b09",
//     round: "16_avos",
//     matchDateTime: new Date("2026-06-29T17:30:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "7cc81f71-8491-4e00-8947-7a95e18239c4",
//     team2Id: "f2f11145-276b-4e11-9bd4-28c0535923ed",
//     round: "16_avos",
//     matchDateTime: new Date("2026-06-29T22:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "f00bccac-2cdb-49fa-bbc7-5d5b08290739",
//     team2Id: "e95ff731-f466-4282-8e64-6e579a94a15f",
//     round: "16_avos",
//     matchDateTime: new Date("2026-06-30T14:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "94084ee4-bfb8-4d3e-975d-ca238346934b",
//     team2Id: "ba2d31c3-ce78-40a8-b608-8e42b075b75e",
//     round: "16_avos",
//     matchDateTime: new Date("2026-06-30T18:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "e3c45336-df79-4f9b-bbd4-ad8ec35d9d13",
//     team2Id: "4b4acc12-66ce-4010-9756-f9850f51988f",
//     round: "16_avos",
//     matchDateTime: new Date("2026-06-30T22:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "76af804a-d17a-4b9f-90c2-a0e596348ed0",
//     team2Id: "0dc0b187-d384-4fa0-9dba-58d25ef52473",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-01T13:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "174013c6-1c46-4259-b783-4802711ac53c",
//     team2Id: "3ed86a3d-24c4-408d-a680-7b9949d8c556",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-01T17:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "fc406d8a-fc3d-47a8-94c9-61b4c64ed425",
//     team2Id: "f55bad97-50f7-4d4c-a0d3-a15867fd3d55",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-01T21:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "35967464-e320-4919-aa17-1f08634e0973",
//     team2Id: "98c9f94a-8813-4e88-bf3d-e695cd573ab5",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-02T16:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "541d0b65-e0c7-440c-b943-7663162e5905",
//     team2Id: "64c883e1-7186-4de0-9ddb-a3a69914bccf",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-02T20:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "b8f83bd0-50d7-4356-b6c6-99b2de62bafa",
//     team2Id: "619ef6da-ee56-416c-a8e4-19a1f55f4c3c",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-03T00:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "3088d5e5-ae6a-4b9f-a77e-ae0244e2351d",
//     team2Id: "0ae6c99f-fe03-4fc1-9bc7-9098d6364231",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-03T15:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "76f0de61-fd7c-495f-bf93-ea7c1a0cfe75",
//     team2Id: "cac069c0-7efa-42fe-8906-221d5ce5eb6e",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-03T19:00:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
//   {
//     team1Id: "48badd5b-defa-4a57-9caa-93cde68e91b2",
//     team2Id: "6a64323a-45df-4ffa-9304-97f8af6f3dde",
//     round: "16_avos",
//     matchDateTime: new Date("2026-07-03T22:30:00"),
//     score1: 0,
//     score2: 0,
//     finished: false,
//   },
// ];

// (async () => {
//   await prisma.match.createMany({
//     data: matchesTest,
//   });
// })();
const matches = [
  {
    team1Id: "008bba04-505e-468a-b798-01f121954c93", // Senegal
    team2Id: "0960c8ab-77f2-4c54-b099-2d0843895e4a", // Uruguai
    round: "16_avos",
    matchDateTime: new Date("2026-06-30T14:00:00"),
    score1: 0,
    score2: 0,
    finished: false,
  },
  {
    team1Id: "17f2f12b-5574-4504-af36-d2741ed7579e", // Curaçao
    team2Id: "18793eaf-7fec-47bb-9c83-389cc4ad2a74", // Iraque
    round: "16_avos",
    matchDateTime: new Date("2026-06-30T17:00:00"),
    score1: 0,
    score2: 0,
    finished: false,
  },
  {
    team1Id: "342a6f79-819f-4660-a0c5-23fee2eae833", // Escócia
    team2Id: "470a94a0-935b-4fdd-aa32-61a02d66b576", // Coreia do Sul
    round: "16_avos",
    matchDateTime: new Date("2026-06-30T20:00:00"),
    score1: 0,
    score2: 0,
    finished: false,
  },
  {
    team1Id: "4cc65ca1-2926-437e-91bf-ef0f8379b050", // Argentina
    team2Id: "54bfc9d8-3954-4298-b479-cfa67d478e50", // Arábia Saudita
    round: "16_avos",
    matchDateTime: new Date("2026-07-01T14:00:00"),
    score1: 0,
    score2: 0,
    finished: false,
  },
  {
    team1Id: "55954c7e-8e44-44ba-a383-71ebbbc14f7e", // Croácia
    team2Id: "56256706-9c15-4600-9766-d8edba53d7d8", // Congo
    round: "16_avos",
    matchDateTime: new Date("2026-07-01T17:00:00"),
    score1: 0,
    score2: 0,
    finished: false,
  },
  {
    team1Id: "5f4c1576-324d-4a38-bf12-40d9ef9f1a20", // Gana
    team2Id: "6238da06-4caa-4905-9bac-fce115300869", // Uzbequistão
    round: "16_avos",
    matchDateTime: new Date("2026-07-01T20:00:00"),
    score1: 0,
    score2: 0,
    finished: false,
  },
];
(async () => {
  await prisma.match.createMany({
    data: matches,
  });
})();
