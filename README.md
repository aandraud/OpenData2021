# OpenData2021

## Description du projet 
Notre projet va porter sur la COVID-19 en France, nous allons faire un serveur qui nous permettra de faire des requêtes pour analyser et exploiter les données que nous avons trouvé.

Nous avons 2 jeux de données sur la COVID-19 en France:
1. un premier concernant les vaccinations effectuées par département. (source: https://public.opendatasoft.com/explore/dataset/covid-19-france-vaccinations-age-sexe-dep/api/?disjunctive.variable_label&sort=date)
2. un second concernant les hospitalisations liées à la COVID-19 par département. (source: https://public.opendatasoft.com/explore/dataset/donnees-hospitalieres-covid-19-dep-france/api/?disjunctive.countrycode_iso_3166_1_alpha3&disjunctive.nom_dep_min)

## Requêtes

### Vaccination :

#### Requête : Données sur l'état de l'art du schéma vaccinal complet (2 doses) selon deux variables peuvent être selectionnées sexe et l'age

- **Exemple de la route : vaccination/vaccination_par_dep?dep=34&variable=age**

Paramètres : 

| Variable souhaitée | dep | variable  |
| ------- | --- | --- |
| Paramètre | Int | choix(sex/age) |




Requête 1 (sur le jeu de données sur les vaccinations):
- Taux de personnes ayant un schéma vaccinal complet (couv_complet, en %) dans le département sélectionné au jour J-2.

Requête 2 (sur le jeu de données sur les hospitalisations): https://opendata2021.herokuapp.com/hospitalisation/
- Récupérer le nombre de patients en soins intensifs (day_intcare) parmi l'ensemble des patients hospitalisés (day_hosp) dans le département sélectionné au jour J-2 (données les plus récentes).

Requête 3 (sur les 2 jeux de données): https://opendata2021.herokuapp.com/dep/
- Récupérer plusieurs informations pertinentes sur les hospitalisations et la vaccination sur le département sélectionné au jour J-2 (données les plus récentes).

## Gestion des erreurs
Pour la requête 2: 
Si on tape https://opendata2021.herokuapp.com/dep/donnees_par_dep/ <--- pas de paramètres donc erreur
Si on tape https://opendata2021.herokuapp.com/dep/donnees_par_dep/?dep=  <-- il y a bien un paramètre mais le de numéro de département n'est pas spécifié donc erreur
Si on tape https://opendata2021.herokuapp.com/dep/donnees_par_dep/?dep=34 <-- l'affichage des données est fonctionnel
## Dévoloppement du code
### Ajout d'une fonctionnalité
Créer un fichier contenant une route dans le dossier route suivant le modèle index.js.
Ajouter la route dans app.js
