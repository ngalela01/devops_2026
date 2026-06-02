# TP WIK DPS 02

API NestJS/TypeScript reprise du TP01, avec une partie Docker.

## Lancer en local

```bash
pnpm install
pnpm start:dev
```

Variables possibles :

```env
PING_LISTEN_PORT=3000
INSTANCE_ID=local-dev
```

## Routes

```bash
curl http://localhost:3000/ping
curl http://localhost:3000/stats
```

- `GET /ping` retourne les headers de la requete.
- `GET /stats` retourne le compteur, l'uptime et l'identifiant d'instance.
- Toute autre requete retourne `404` sans body.

## Image Docker simple stage

Build :

```bash
docker build -t wik-dps-tp02:single .
```

Run :

```bash
docker run --rm -p 3000:3000 --env PING_LISTEN_PORT=3000 --env INSTANCE_ID=single-stage wik-dps-tp02:single
```

Verification de l'utilisateur :

```bash
docker run --rm --entrypoint whoami wik-dps-tp02:single
```

La commande doit retourner :

```text
node
```

## Image Docker multi-stage

Le fichier `Dockerfile.multistage` contient :

- un stage `build` qui installe les dependances et compile le TypeScript ;
- un stage `runtime` qui ne contient que `dist`, `node_modules` de production et `package.json`.

Build :

```bash
docker build -f Dockerfile.multistage -t wik-dps-tp02:multi .
```

Run :

```bash
docker run --rm -p 3000:3000 --env PING_LISTEN_PORT=3000 --env INSTANCE_ID=multi-stage wik-dps-tp02:multi
```

Verifier que l'image finale tourne avec l'utilisateur `node` :

```bash
docker run --rm --entrypoint whoami wik-dps-tp02:multi
```

Verifier que les sources ne sont pas dans l'image finale :

```bash
docker run --rm --entrypoint sh wik-dps-tp02:multi -c "test ! -d src && echo no-src"
```

## Scan

Avec Docker Scout :

```bash
docker scout cves wik-dps-tp02:multi
```

## Notes

Le fichier `.dockerignore` evite de copier `node_modules`, `dist`, `.env` et `.git` dans le contexte Docker.
