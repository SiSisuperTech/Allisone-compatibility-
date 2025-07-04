## Solutions pour résoudre le problème de cache

### 🌐 **Cache du navigateur :**
1. **Actualisation forcée** : Ctrl + F5 (ou Cmd + Shift + R sur Mac)
2. **Vider le cache** : F12 → Network → cocher "Disable cache"
3. **Mode navigation privée** pour tester sans cache

### ⏰ **Cache CDN/Serveur :**
1. **Attendre 5-15 minutes** (GitHub Pages peut prendre du temps)
2. **Vérifier l'URL directe** : https://votre-site.github.io
3. **Tester depuis un autre appareil/réseau**

### 🔧 **Si le problème persiste :**

#### Option 1: Forcer un nouveau déploiement
```bash
# Créer un commit vide pour forcer le redéploiement
git commit --allow-empty -m "Force redeploy - update PMS data cache"
git push origin main
```

#### Option 2: Vérifier la configuration du site
- Le site utilise-t-elle GitHub Pages ?
- Y a-t-il un fichier `.github/workflows/` qui gère le déploiement ?
- Le site est-il déployé sur Vercel/Netlify/autre ?

#### Option 3: Ajouter un cache buster
Dans le code de l'app, ajouter un paramètre de version :
```javascript
const cacheVersion = Date.now();
fetch(`https://raw.githubusercontent.com/.../pms-software.json?v=${cacheVersion}`)
```

### 🔍 **Debug rapide :**
1. Ouvrir DevTools (F12)
2. Onglet Network
3. Actualiser la page
4. Chercher la requête vers `pms-software.json`
5. Vérifier si elle retourne 33 ou 10 entrées
