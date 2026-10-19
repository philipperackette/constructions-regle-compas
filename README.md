[![CI](https://github.com/philipperackette/constructions-regle-compas/actions/workflows/ci.yml/badge.svg)](https://github.com/philipperackette/constructions-regle-compas/actions/workflows/ci.yml)

# Constructions à la règle et au compas

Polygones réguliers constructibles selon le critère de Gauss-Wantzel.

**En ligne :** https://philipperackette.github.io/constructions-regle-compas/

## Vérifications automatiques

À chaque push et pull request, GitHub Actions lance ESLint et HTMLHint, puis des tests Playwright dans Chromium, sur écran d'ordinateur et de téléphone. Ils vérifient que chaque page s'ouvre sans erreur JavaScript ni défilement horizontal. Tests propres à ce site : le critère de Gauss-Wantzel, comparé à « φ(n) est une puissance de 2 » pour n ≤ 5000, et des cas comme 17, 257, 65 537 ou 3 × 65 537.

Le site lui-même n'a aucune dépendance : `package.json` ne sert qu'à ces vérifications.

```bash
npm ci
npm run lint
npx playwright install chromium
npm test
```
