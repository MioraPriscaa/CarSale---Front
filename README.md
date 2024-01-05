# -- CarSale--front
Vente de voiture d'occasion

Admin: 
	-IdPersonne
	-Nom 
	-Prenom
	-Mail
	-Contact
	-motdepass : crypté
	-vola

Personne:
	-IdPersonne
	-Nom 
	-Prenom
	-sexe
	-dateNaissance
	-Mail
	-Contact
	-motdepass : crypté
	-type de compte : Vendeur / client  

Catégorie:
	-IdCatégorie
	-designation (4x4 , SUV , .... )

Marque:
	-IdMarque
	-designation

Model:
	-IdModel
	-IdMarque
	-designation

Voiture:
	-idVoiture
	-idPersonne(Proprietaire)
	-idCatégorie
	-idModel
	-couleur
	-plaque d'immatriculation
	-Etat: /10
	-prix
	

DetailVoiture:
	-idVoiture
	-date: 
	-Desciption : (Text)
	
Statut Voiture:
	-idSatut
	-idVoiture
	-Date
	-Statut : (10-19 Vendu ,  20 -29 En atente de validation, ) 
			10 vendu fa mbola tsy livré
			11 vendu sady livré
			......

Transaction:
	-idTransaction
	-idVoiture
	-idPersonne (Mivarotra)
	-idPersonne (Mividy)
	-prix
	-date

Caisse: 
	-idTransaction
	-dateTransaction
	-montant
	-Type (Debiteur, 
