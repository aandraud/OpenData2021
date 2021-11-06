# OpenData2021

## Description du projet 
Notre projet va porter sur la COVID-19 en France, nous allons faire un serveur qui nous permettra de faire des requêtes pour analyser et exploiter les données que nous avons trouvé.

Nous avons 2 jeux de données sur la COVID-19 en France provenant d'une API:
1. un premier concernant les vaccinations effectuées par département. (source: https://public.opendatasoft.com/explore/dataset/covid-19-france-vaccinations-age-sexe-dep/api/?disjunctive.variable_label&sort=date)
2. un second concernant les hospitalisations liées à la COVID-19 par département. (source: https://public.opendatasoft.com/explore/dataset/donnees-hospitalieres-covid-19-dep-france/api/?disjunctive.countrycode_iso_3166_1_alpha3&disjunctive.nom_dep_min)

Un troisième jeu de données sur les températures départementales provenant d'une autre API. (source: https://opendata.reseaux-energies.fr/explore/dataset/temperature-quotidienne-departementale/api/?disjunctive.departement )

Nous avons choisi ces 3 jeux de données pour voir s'il y avait des corrélations, dans le cadre de la COVID-19 pour chaque département, entre les vaccinations et les hospitalisations et entre les hospitalisations et la température moyenne du département. 

Le serveur de l'application est heroku: https://opendata2021.herokuapp.com/



## Requêtes

### Vaccination :

#### Requête : Données à jour du schéma vaccinal complet (2 doses) selon deux variables sélectionnées (sexe et âge)

- **Exemple de la route : vaccination/vaccination_par_dep?dep=34&variable=age**

Paramètres : 

| Variable souhaitée | dep | variable  |
| ------- | --- | --- |
| Paramètre | Int | choix(sex/age) |

#### Gestion Erreur

L'erreur est attrapée et gérée par notre API en envoyant dans tous les cas une réponse au client :

- vaccination/vaccination_par_dep > Pas de paramètres
- vaccination/vaccination_par_dep?dep= > Il y a un paramètre mais la valeur du paramètre n'est pas spécifié
- vaccination/vaccination_par_dep?dep=34 > Affichage des données

### Hospitalisation :

#### Requête : Données sur le nombre de patients en soins intensifs (day_intcare) parmi l'ensemble des patients hospitalisés (day_hosp) dans le département sélectionné au jour J-2 (données les plus récentes).

- **Exemple de la route : hospitalisation/hospitalisation_par_dep?dep=34**

Paramètres : 

| Variable souhaitée | dep
| ------- | ---
| Paramètre | Int

#### Gestion Erreur

L'erreur est attrapée et gérée par notre API en envoyant dans tous les cas une réponse au client :

- hospitalisation/hospitalisation_par_dep > Pas de paramètres
- hospitalisation/hospitalisation_par_dep?dep= > Il y a un paramètre mais la valeur du paramètre n'est pas spécifié
- hospitalisation/hospitalisation_par_dep?dep=34 > Affichage des données


### Fusion des 3 jeux de données :

#### Requête : Données pertinentes sur les hospitalisations, la vaccination et la température sur le département sélectionné au jour J-2 (données les plus récentes). 

- **Exemple de la route : dep/dep_par_dep?dep=34**

Paramètres : 

| Variable souhaitée | dep
| ------- | ---
| Paramètre | Int

#### Gestion Erreur

L'erreur est attrapée et gérée par notre API en envoyant dans tous les cas une réponse au client :

- dep/donnees_par_dep/ > Pas de paramètres
- dep/donnees_par_dep/?dep= > Il y a un paramètre mais la valeur du paramètre n'est pas spécifié
- dep/donnees_par_dep/?dep=34 > Affichage des données



## Modules utilisés

- "express": "^4.17.1" > framework standard pour le développement de serveur en Node.js
- "https": "^1.0.0" > permet de faire des requêtes https
- "js2xmlparser": "^4.0.2" > permet de convertir un JSON en XML
- "xml-js": "^1.6.11" > permet de convertir un XML en JSON



## Restructuration des données reçues
- Nettoyage des données reçues
- Création d'un schéma et vocabulaire RDFXML
- Type de contenu renvoyé: RDFXML, XML et JSON (par défaut)
