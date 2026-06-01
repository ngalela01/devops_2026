# TP WIK DPS 01

API HTTP realisee avec NestJS et TypeScript.

## Objectif

Le serveur expose une seule route valide :

- `GET /ping` : retourne les headers de la requete au format JSON.

Toutes les autres routes ou methodes retournent une reponse `404` sans body.

## Technologies utilisees

- Node.js
- NestJS
- TypeScript
- pnpm
- dotenv

## Installation

Installer les dependances :

```bash
pnpm install
```

## Configuration

Le port d'ecoute peut etre configure dans le fichier `.env` :

```env
PING_LISTEN_PORT=8080
```

Si `PING_LISTEN_PORT` n'est pas defini, l'application utilise `PORT`, puis `8080` par defaut.

## Lancement

Lancer le serveur en mode developpement :

```bash
pnpm start:dev
```

Lancer le serveur en mode classique :

```bash
pnpm start
```

L'application est ensuite accessible sur :

```text
http://localhost:8080
```

## Routes

### GET /ping

Retourne les headers de la requete.

Exemple :

```bash
curl http://localhost:8080/ping
```

Exemple de reponse :

```json
{
  "host": "localhost:8080",
  "user-agent": "curl/8.0.0",
  "accept": "*/*"
}
```

### Autres routes

Toutes les autres routes retournent une erreur `404` sans body.

Exemples :

```bash
curl -i http://localhost:8080/
curl -i http://localhost:8080/test
curl -i -X POST http://localhost:8080/ping
```

Resultat attendu :

```text
HTTP/1.1 404 Not Found
```

## Scripts utiles

Compiler le projet :

```bash
pnpm build
```

Lancer les tests :

```bash
pnpm test
```

Lancer le lint :

```bash
pnpm lint
```

## Fichiers principaux

- `src/main.ts` : demarrage de l'application NestJS et lecture du port.
- `src/app.module.ts` : module principal de l'application.
- `src/app.controller.ts` : declaration des routes `/ping` et `404`.
