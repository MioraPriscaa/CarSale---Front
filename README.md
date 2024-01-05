# CarSale---Front
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
	-IdVoiture
	-IdPersonne(Proprietaire)
	-IdCatégorie
	-IdModel
	-couleur
	-plaque d'immatriculation
	-Etat: /10
	-prix
	

DetailVoiture:
	-IdVoiture
	-date: 
	-Desciption : (Text)
	
Statut Voiture:
	-idSatut
	-IdVoiture
	-Date
	-Statut : (10-19 Vendu ,  20 -29 En atente de validation, ) 
			10 vendu fa mbola tsy livré
			11 vendu sady livré
			......

Transaction:
	-idTransaction
	-idVoiture
	-IdPersonne (Mivarotra)
	-IdPersonne (Mividy)
	-prix
	
	-date

Caisse: 
	-IdTransaction
	-dateTransaction
	-montant
	-Type (Debiteur, 
