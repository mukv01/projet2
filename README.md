# projet2: Mini-serveur HTTP, couriel, pour le partage de messages
## Description

Concevoir et implémenter un simple serveur de partage de messages chifrés avec la cryptographie asymetrique RSA.

Ce projet comporte plusieurs parties:

    1. Description du système du point de vue de fonctionnalité (spécification fonctionnelle):
        - définir ce qui est possible à faire: "créer un nouveau message", "chercher les messages des autres pairs", "ajouter un nouveau contact", etc...
        - créer un modèle pour le stockage des messages: "base de donnée", "système de fichiers", etc...
    2. Réalisation du serveur HTTP coté client web qui va gérer l'interaction avec l'utilisateur :
        - implémenter le serveur HTTP (en javascript côté serveur: "nodejs" et "express")
        - faire le re-design de la page web du devoir 1 (http, css, javascript) pour l'adopter au serveur
    3. Définition d'un protocole de communication entre les pairs (peers) qui permettra l'échange (synchronisation) de messages locaux entre eux
    4. Réalisation du serveur HTTP coté "pair"
    5. Considérations sur la sécurité
		Pour des raisons de confidentialité, votre système va utiliser le chiffrement asymetrique RSA pour chiffrer et déchiffrer les messages

## Évaluation

L'évaluation du travail porte sur:

    1. spécification fonctionnelle (10%)
    2. qualité de l'interface (40%)
    3. qualité du code serveur (40%)
    4. analyse de la sécurité (10%)

Remarque

Le travail en groupes (de 4 à 8) est conseillé mais pas garant d'une meilleure note!

# Installation
	1. Installer le module express en exécutant:
		$ npm install express --save
	  
	2. Installer le module jade en exécutant:
		$ npm install jade --save

	3. Installer le module basic-auth en exécutant:
		$ npm install basic-auth --save
	  
	4. Installer le module crypto en exécutant:
		$ npm install crypto --save
		
	5. Installer le module fs en exécutant:
		$ npm install fs --save
		
	5. Installer le module fs en exécutant:
		$ npm install body-parser --save