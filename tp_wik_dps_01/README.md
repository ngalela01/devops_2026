# TP WIK DPS 01

Petit serveur HTTP fait avec NestJS et TypeScript.

## Installation

```bash
pnpm install
```

## Configuration

Le port est configure avec la variable `PING_LISTEN_PORT`.

Exemple dans `.env` :

```env
PING_LISTEN_PORT=3000
INSTANCE_ID=local-dev
```

Un fichier `.env.example` est present comme exemple.

Si `PING_LISTEN_PORT` n'est pas defini, le serveur ecoute sur le port `3000`.

## Lancer le projet

```bash
pnpm start:dev
```

Le serveur est ensuite disponible sur :

```text
http://localhost:3000
```

## Routes

### GET /ping

Retourne les headers de la requete en JSON.

```bash
curl http://localhost:3000/ping
```

### GET /stats

Route bonus. Elle retourne quelques infos sur le serveur :

```bash
curl http://localhost:3000/stats
```

Exemple :

```json
{
  "totalRequests": 1,
  "uptime": 8.52,
  "instanceId": "local-dev"
}
```

`totalRequests` augmente a chaque requete recue, meme pour `/ping`, `/stats` et les routes en `404`.

### Autres routes

Toutes les autres requetes renvoient une reponse vide avec le code `404`.

Exemples :

```bash
curl -i http://localhost:3000/test
curl -i -X POST http://localhost:3000/ping
```

## Bonus : deux instances

Pour tester deux instances, lancer deux terminaux avec deux ports differents.

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

Ensuite :

```bash
curl http://localhost:3000/stats
curl http://localhost:3001/stats
```

Les compteurs ne seront pas forcement identiques, car chaque instance garde son compteur en memoire. Pour avoir un compteur commun, il faudrait utiliser un stockage partage comme une base de donnees.

## Commandes utiles

```bash
pnpm build
pnpm lint
```
