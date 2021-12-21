# ePizza

# Praktische info

## Omschrijving
Platform om pizza's te bestellen. Je hebt de keuze om ze af te halen of te laten leveren. 

* Nieuwe klant kan een account aanmaken
* Ingelogde users en gasten kunnen één of meerdere pizza's bestellen via levering of via meenemen.
* Na bestellen weergave van een tracker om te weten in hoever de pizza klaar is.
* Klanten kunnen reviews achterlaten die de administrator kan zien.
* Pizza's en toppings die je kan bestellen hangt af van de hoeveelheid stock er aanwezig is.
* Pizzaprijs is afhankelijk van het type, grootte en beleg.
* Administrator heeft een dashboard met een overzicht van bestellingen, reviews en de aanwezige stock.
* Administrator kan de prijs en stock van toppings op elk moment aanpassen
* In het besteloverzicht kan de administrator bestellingen in detail bekijken, en de status van de bestelling wijzigen.

## Rollen
* Administrator
* Klant
* Gast

## Technische uitwerking
**Frontend**
Framework: Vue
Styling: Tailwindcss
Bundler: Vite
Typescript

**Frontend**
Framework: NestJS
Security: Firebase
Database: Mysql, Mariadb
API: REST & GraphQl

**Tools**
Github
Teleport
Docker
Kubernetes

## User Testing
* Admin
    * docent@howest.be - P@ssword
* Testaccounts
    * pizza1@howest.be - P@ssword2
    * pizza2@howest.be - P@ssword3
    * pizza3@howest.be - P@ssword3
    * woutvancoppenolle6@gmail.com - test123

## Werkverdeling
### Glenn Troncquo
* Specialisatie backend
* Database
* Frontend
* Backend

### Wout Van Coppenolle
* Staat meer in voor design
* Frontend
* Backend

## Milestones

### Milestone 1 (20 oktober)
- [x] Design in XD volledig uitgewerkt
- [x] Setup & structuur vue project afgewerkt
- [x] ERD-model, Database in backend
- [x] Backend structuur & seeding database (nestjs)

### Milestone 2 (10 november)
- [x] PKCE-flow met 'Firebase'
- [x] Design in vue uitgewerkt
- [x] Integratie tussen front- en backend
- [x] Backend authorizatie + authenticatie

### Milestone 3 (24 november)
- [x] Werkversie front- en backend

### Milestone 4 (8 december)
- [x] Applicatie bijna in laatste stadium, afwerken details

### Milestone 5 (20 december)
- [x] Bug fixing
- [x] Unit & Integration testing
- [x] Presentatie volledig afgewerkt product


# Rapportering
## Werktijden [gepland] (actueel)
* Frontend
    * Wireframes [12u] (15u)
    * Structuur project [1u] (2u)
    * Landingpage, Appheader, Appfooter [7u] (15u)
    * Appheader logica restoreAuth Firebase [4u] (6u)
    * Forgot Password pagina [4u] (4u)
    * Menu Pagina [8u] (19u)
    * Detailpagina pizza [8u] (16u)
    * Itembasket + logica Vuex [6u] (12u)
    * Login Pagina [8u] (8u)
    * Register Pagina [6u] (10u)
    * Accountbeheer pagina [6u] (10u)
    * Order pagina [12u] (16u)
    * Tracking pagina [12u] (16u)
    * Admin sidebar [2u] (2u)
    * Admin Stock pagina [6u] (12u)
    * Admin Order pagina [8u] (10u)
    * Admin review pagina [8u] (10u)
    * Admin Order detail pagina [10u] (10u)
    * Fix & Bugs [10u] (10u)
    * PWA [2u] (2u)
    * Testing [4u] (4u)
    * Multilanguage [4u] (4u)
    * Pipeline [3u] (4u)
    * Dockerizing [2u] (2u)
* Backend
    * Database structuur [4u] (5u)
    * Opzetten api, NestJS structuur [2u] (5u)
    * Omzetten database structuur => Typeorm, correct relaties leggen [8u] (12u)
    * Seeding [2u] (5u)
    * Firebase authenticatie [4u] (8u)
    * Role authenticatie [6u] (6u)
    * Guards opzetten [2u] (6u)
    * Api endpoints [4u] (8u)
    * Graphql implementatie [2u] [4u]
    * Error handling [4u] (6u)
    * Fix & Bugs [10u] (10u)
    * Pipeline [2u] (2u)
    * Dockerizing [2u] (2u)
    * Kubernetes [3u] (6u)
 
 #### Totaal [208u] (304u)
 ### Conclusie
 Waar we bij veel zaken dachten er snel van af te zijn. Kwamen er meestal bugs, moeilijkheden of problemen bij kijken. Soms kwam er ook een volledige herwerking of redesign aan te pas.


## Grootst behaalde succes
* Implementatie van dynamische stock zodat deze aangepast wordt zowel in de menu pagina, pizza detail pagina en basket component. Dit aan de hand van een centrale store in Vuex.
* Transitions tussen paginas
* Opzetten Guards voor role verifaction

## Grootste moeilijkheid
* Private registry, uiteindelijk niet gelukt
* Opzetten van testing, documentatie is niet echt duidelijk over welke versie Jest geïnstalleerd moet worden en hoe de config moet opgesteld worden. Eens alles correct opgesteld was ging het wel vlot.
* Opzetten Guards voor role verifaction
* NestJS structuur


## Extra's


# Checklist frontend
#### Framework
- [x] Vue & TypeScript

#### Testing
- [x] Unit test
#### Styling
- [x] TailwindCSS
- [x] Loading states
- [x] Skeletons
- [x] Input validatie
#### PWA
- [x] De web app kan fullscreen launchen en heeft een correcte PWA-setup

#### Multi-language
- [x] Support voor Nederlands & Engels
#### Error-logging
- [x] Error-logging met Sentry

#### Development setup
- [ ] Gebruik van codeclimate.com voor code testing en reviews is een meerwaarde. Gebruik de npm-packages op een correcte manier. Geen onnodige npm-packages, correcte flags.
#### Staging / deployment
- [x] Applicatie draait in Docker

#### Build optimisation
- [x] Gebruik van Vite

#### Eigen inbreng
- [x] Vue
- [x] Page transitions
- [x] Testing in deployment pipeline (aparte GitHub repo)


# Checlist backend
#### Backend API
- [X] Is een NodeJS Express API die via Docker gehost wordt op Kubernetes

#### Database
- [X] Gegevens worden persistent gestockeerd in de meest passende datastructuur.
SQL
#### Realtime
- [X] Backend communiceert naar frontend in realtime en vice-versa met de gepaste protocollen.

#### Autorisatie & authenticatie
- [X] Firebase of dergelijke
- [X] PKCE flow gebruiken
- [X] Minimaal 2 rollen: gebruiker en administrator
- [X] Admin is voorzien: “docent@howest.be” met paswoord “P@ssw0rd”

#### Kwetsbaarheid
- [X] CORS is enabled.
- [X] Extra beveiligingen tegen Cross Site Forgery, Cross Site Scripting

#### API docs
- [X] De API documenteert zichzelf op basis van een self-documenting library. Swagger
- [X] Ook statuscodes bij foutcondities worden gedocumenteerd

#### Framework
- [X] Kies een goede manier om je project te structureren
- [X] Via een seeder wordt de database bij opstarten van de applicatie automatisch aangemaakt.

#### Microservices
- [X] Gebruik logische microservices in Docker / Kubernetes.
- [X] Eén service maakt gebruik van gRPC of GraphQL

#### Foutcontrole
- [X] Het crashen van de applicatie wordt verhinderd door het gebruik van een try/catch structuur, !! wordt niet bijgehouden via een logger
- [X] Foutboodschappen worden altijd via een JSON aan de front bezorgd

#### Source controle
- [X] Source controle gebeurt via GitHub door regelmatig te pushen. 

#### Staging / deployment
- [X] De applicatie draait volledig in Docker.
- [X] Container wordt automatisch via GitHub Actions gebuild en gepushed naar een Image Registry !! Zonder versiebeheer
- [X] Image beschikbaar op DockerHub -> https://hub.docker.com/repository/docker/glenntroncquo/project-backend
- [] Kies een gepaste Kubernetes deployment methodiek (Canary, blue-green, rolling …)

#### Extra features
- [X] Gebruik nieuw framework -> Nestjs