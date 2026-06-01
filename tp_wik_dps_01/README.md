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
PING_LISTEN_PORT=3000
INSTANCE_ID=local-dev
```

Si `PING_LISTEN_PORT` n'est pas defini, l'application utilise le port `3000` par defaut.

`INSTANCE_ID` permet d'identifier l'instance qui repond. Si cette variable n'est pas definie, l'application utilise le hostname de la machine.

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
http://localhost:3000
```

## Routes

### GET /ping

Retourne les headers de la requete.

Exemple :

```bash
curl http://localhost:3000/ping
```

Exemple de reponse :

```json
{
  "host": "localhost:3000",
  "user-agent": "curl/8.0.0",
  "accept": "*/*"
}
```

### GET /stats

Retourne des informations sur l'instance courante.

Exemple :

```bash
curl http://localhost:3000/stats
```

Exemple de reponse :

```json
{
  "totalRequests": 1,
  "uptime": 12.345,
  "instanceId": "local-dev"
}
```

Champs retournes :

- `totalRequests` : nombre total de requetes recues par cette instance depuis son demarrage.
- `uptime` : temps de fonctionnement du serveur en secondes.
- `instanceId` : identifiant de l'instance, lu depuis `INSTANCE_ID` ou depuis le hostname.

La route `/stats` compte aussi comme une requete. Si elle est ouverte dans un navigateur, celui-ci peut aussi demander `/favicon.ico`, ce qui augmente le compteur car les `404` sont comptees.

### Autres routes

Toutes les autres routes retournent une erreur `404` sans body.

Exemples :

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/test
curl -i -X POST http://localhost:3000/ping
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

Lancer le lint :

```bash
pnpm lint
```

## Fichiers principaux

- `src/main.ts` : demarrage de l'application NestJS et lecture du port.
- `src/app.module.ts` : module principal de l'application.
- `src/app.controller.ts` : declaration des routes `/ping`, `/stats` et `404`.
- `src/counterStore.ts` : interface du stockage du compteur.
- `src/in-memory-counter-store.ts` : implementation en memoire du compteur.

## Bonus : plusieurs instances

Il est possible de lancer deux instances de l'API sur deux ports differents.

Terminal 1 :

```powershell
$env:PING_LISTEN_PORT=3000
$env:INSTANCE_ID="api-1"
pnpm start:dev
```

Terminal 2 :

```powershell
$env:PING_LISTEN_PORT=3001
$env:INSTANCE_ID="api-2"
pnpm start:dev
```

Tester les deux instances :

```bash
curl http://localhost:3000/stats
curl http://localhost:3001/stats
curl http://localhost:3000/ping
curl http://localhost:3001/ping
curl http://localhost:3000/stats
curl http://localhost:3001/stats
```

Les compteurs peuvent etre differents car le compteur est stocke en memoire dans chaque processus Node.js. Chaque instance possede donc son propre compteur et ne connait pas les requetes recues par les autres instances.

Pour partager le compteur entre plusieurs instances, il faudrait utiliser un stockage externe commun, par exemple Redis, PostgreSQL ou un autre service partage. Redis serait adapte pour ce cas car il permet d'incrementer un compteur partage avec une operation atomique.
