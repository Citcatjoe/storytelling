# Logique du Modèle de Données Foncier

Ce document consigne le raisonnement derrière la structure du fichier `data.json` pour permettre une exposition claire aux collaborateurs du projet.

## 🎯 Objectif du Modèle
L'enjeu est de transformer des données cadastrales brutes (PDF) en un dataset structuré capable de supporter des visualisations complexes (Cartographie, Beeswarm, Statistiques) tout en évitant les biais d'interprétation liés à la nature juridique des biens.

---

## 🏗️ La Logique de Granularité (Le défi du "Split")

### Le Problème : La Fragmentation (PPE/COP)
Une parcelle foncière (ex: `1121`) peut être divisée en plusieurs unités administratives (appartements en PPE, co-propriétés). 
*   **Risque** : Si un propriétaire possède 30 appartements sur une seule parcelle, une analyse statistique simple pourrait faire croire qu'il possède 30 terrains différents, faussant la perception de son empire foncier.

### La Solution : Architecture à Double Niveau
Pour résoudre ce risque, nous avons implémenté deux champs clés :
1.  **`parcel_id`** : Le numéro précis (ex: `1121-4`). C'est l'unité de **mention** (la plus précise).
2.  **`parcel_root`** : La racine du numéro (ex: `1121`). C'est l'unité de **regroupement**.

> [!TIP]
> **Usage interne** : Dans le code, pour compter le "nombre de terrains" réels, il suffit de compter les occurrences uniques de la paire `{commune, parcel_root}`.

---

## 📖 Dictionnaire des Champs (Refactorisé)

| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | `num` | Identifiant unique et incrémental de l'entrée. |
| `owner_name` | `str` | Nom du propriétaire (Individu ou Société). |
| `owner_birth_date` | `str` | Date de naissance (ISO) pour les individus, `null` pour les sociétés. |
| `commune` | `str` | Commune de localisation du bien. |
| `canton` | `str` | Contexte cantonal (actuellement "vaud"). |
| `is_shared` | `bool` | `true` si le bien (`commune`+`parcel_id`) est partagé par plusieurs propriétaires. |
| `legal_nature` | `str` | Nature juridique : **B-F** (Bien-Fonds), **PPE** (Étage), **COP** (Copropriété). |
| `is_fragment` | `bool` | `true` si l'entrée est une sous-unité d'une parcelle. |
| `parcel_root` | `str` | La racine foncière permettant d'agréger les fragments. |
| `parcel_id` | `str` | Le numéro d'identification complet et précis. |
| `land_category` | `str` | Catégorie de bien (actuellement "parcelle"). |

---

## 🔍 État de Complétion et Qualité des Données

Au 21 avril 2026, l'audit du dataset révèle l'état suivant :

### 1. Valeurs Nulles Systématiques
*   **`owner_birth_date`** : Présente des valeurs `null` pour **302 entrées**. 
    *   *Raison* : Il s'agit de **personnes morales** (SA, SA, etc.) pour lesquelles la notion de date de naissance n'existe pas. C'est un état attendu et non une erreur.

### 2. Données Manquantes (Dette de données)
*   **`legal_nature`** : Présente des valeurs `null` pour **31 entrées**.
    *   *Observation* : Ces biens proviennent de la liste initiale et n'ont pas été précisés par les listes secondaires. 
    *   *Impact* : Ces biens ne pourront pas être filtrés par type "Bien-Fonds" ou "PPE" tant qu'ils ne sont pas qualifiés.
    *   *Cibles principales* : Orllati Real Estate SA (21 biens), Orllati Métal SA (3 biens) et divers individus.

---

## 🚀 Évolutions et Visions Futures

### 1. Gestion de la Fragmentation Massive
Certaines parcelles à venir comportent plus de 30 fragments. La structure actuelle permet d'anticiper cela :
- Possibilité d'**ignorer la fragmentation** via un filtre simple sur `is_fragment`.
- Possibilité de **calculer des poids** (ex: 1/30ème de la parcelle base).

### 2. Enrichissement Temporel et Financier
Le modèle est prêt à recevoir des champs :
- `acquisition_date` : Pour tracer l'historique des achats.
- `acquisition_price` : Pour des analyses de valeur immobilière.

### 3. Interconnexion (HDP)
Le champ `owner` pourra servir de clé étrangère pour lier ces parcelles à d'autres bases de données (ex: listings de sociétés d'investissement ou enquêtes journalistiques "HDP").
