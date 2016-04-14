echo "Etape 1: Generation d’une paire de cles (cle prive et cle public)"
openssl genrsa -out maCle.pem 1024
pause

echo "Etape 2: Visualisation des cles RSA (Contenu du fichier)"
more maCle.pem
pause

echo "Visualisation avanceedes cles RSA"
openssl rsa -in maCle.pem -text -noout
pause

echo "Etape 3: Chiffrement(Encrypt) d’un fichier de cles RSA"
openssl rsa -in maCle.pem -des3 -out maClePrivate.pem
pause

echo "Etape 4: Exportation de la partie publique"
openssl rsa -in maClePrivate.pem -pubout -out maClePublique.pem
pause

echo "Etape 5: Chiffrement de donnees avec RSA"
openssl rsautl -encrypt -in fichier_entree.txt -inkey maClePublique.pem  -pubin -out fichier_chiffre.txt
pause

echo "Visualisation le fichier chiffre"
more fichier_chiffre.txt
pause

echo "Etape 6: Dechiffrement de donnees avec RSA"
openssl rsautl -decrypt -in fichier_chiffre.txt -inkey maClePrivate.pem  -out fichier_dechiffre.txt
pause

echo "Visualisation le fichier dechiffre"
more fichier_dechiffre.txt
pause