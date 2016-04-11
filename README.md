# projet2: Mini-serveur HTTP, couriel, pour le partage de messages
## Description

Concevoir et impl�menter un simple serveur de partage de messages chifr�s avec la cryptographie asymetrique RSA.

Ce projet comporte plusieurs parties:

    1. Description du syst�me du point de vue de fonctionnalit� (sp�cification fonctionnelle):
        - d�finir ce qui est possible � faire: "cr�er un nouveau message", "chercher les messages des autres pairs", "ajouter un nouveau contact", etc...
        - cr�er un mod�le pour le stockage des messages: "base de donn�e", "syst�me de fichiers", etc...
    2. R�alisation du serveur HTTP cot� client web qui va g�rer l'interaction avec l'utilisateur :
        - impl�menter le serveur HTTP (en javascript c�t� serveur: "nodejs" et "express")
        - faire le re-design de la page web du devoir 1 (http, css, javascript) pour l'adopter au serveur
    3. D�finition d'un protocole de communication entre les pairs (peers) qui permettra l'�change (synchronisation) de messages locaux entre eux
    4. R�alisation du serveur HTTP cot� "pair"
    5. Consid�rations sur la s�curit�
		Pour des raisons de confidentialit�, votre syst�me va utiliser le chiffrement asymetrique RSA pour chiffrer et d�chiffrer les messages

## �valuation

L'�valuation du travail porte sur:

    1. sp�cification fonctionnelle (10%)
    2. qualit� de l'interface (40%)
    3. qualit� du code serveur (40%)
    4. analyse de la s�curit� (10%)

Remarque

Le travail en groupes (de 4 � 8) est conseill� mais pas garant d'une meilleure note!

# Installation
	1. Installer le module express en ex�cutant:
		$ npm install express --save
	  
	2. Installer le module jade en ex�cutant:
		$ npm install jade --save

	3. Installer le module basic-auth en ex�cutant:
		$ npm install basic-auth --save
	  
	4. Installer le module crypto en ex�cutant:
		$ npm install crypto --save
		
	5. Installer le module fs en ex�cutant:
		$ npm install fs --save
		
	5. Installer le module fs en ex�cutant:
		$ npm install body-parser --save