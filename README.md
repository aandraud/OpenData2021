# OpenData2021

## Description du projet 
Notre projet va porter sur la COVID-19 en France, nous allons faire un serveur qui nous permettra de faire des requêtes pour analyser et exploiter les données que nous avons trouvé.

Nous avons 2 jeux de données sur la COVID-19 en France:
- un premier concernant les vaccinations par département. (source: https://public.opendatasoft.com/explore/dataset/covid-19-france-vaccinations-age-sexe-dep/api/?disjunctive.variable_label&sort=date&lang=&rows=5&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7InR5cGUiOiJzcGxpbmUiLCJmdW5jIjoiQ09VTlQiLCJ5QXhpcyI6Im5fY29tcGxldCIsInNjaWVudGlmaWNEaXNwbGF5Ijp0cnVlLCJjb2xvciI6InJhbmdlLWN1c3RvbSJ9XSwieEF4aXMiOiJkYXRlIiwibWF4cG9pbnRzIjoiIiwidGltZXNjYWxlIjoieWVhciIsInNvcnQiOiIiLCJjb25maWciOnsiZGF0YXNldCI6ImNvdmlkLTE5LWZyYW5jZS12YWNjaW5hdGlvbnMtYWdlLXNleGUtZGVwIiwib3B0aW9ucyI6eyJkaXNqdW5jdGl2ZS52YXJpYWJsZV9sYWJlbCI6dHJ1ZSwic29ydCI6ImRhdGUiLCJsYW5nIjoiRlIiLCJyb3dzIjoiNSJ9fSwic2VyaWVzQnJlYWtkb3duIjoibl9jb21wbGV0In1dLCJkaXNwbGF5TGVnZW5kIjp0cnVlLCJhbGlnbk1vbnRoIjp0cnVlLCJ0aW1lc2NhbGUiOiIifQ%3D%3D)
- un second concernant les hospitalisations liées à la COVID-19. (source: https://public.opendatasoft.com/explore/dataset/donnees-hospitalieres-covid-19-dep-france/api/?disjunctive.countrycode_iso_3166_1_alpha3&disjunctive.nom_dep_min)

Requête 1 (sur le jeu de données sur les vaccinations):
- Taux de personnes ayant un schéma vaccinal complet (couv_complet, en %) dans le département sélectionné au jour J.

Requête 2 (sur le jeu de données sur les hospitalisations):
- Nombre de patients en soins intensifs (day_intcare) parmi l'ensemble des patients hospitalisés (day_hosp) dans le département sélectionné au jour J.

Requête 3 (sur les 2 jeux de données):
- Evolution du taux de vaccination et du taux d'hospitalisations dans le département sélectionné depuis janvier 2021.

Requête avec toutes les données sur le département 


## Dev Helper
### Ajout d'une fonctionnalité
Créer un fichier contenant une route dans le dossier route suivant le modèle index.js.
Ajouter la route dans app.js
