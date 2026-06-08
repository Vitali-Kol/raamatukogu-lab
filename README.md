# Raamatukogu

Raamatukogu on lihtne veebipõhine raamatukogu haldussüsteem.  
Rakendus võimaldab kasutajatel registreeruda, sisse logida, raamatuid otsida ja laenata.  
Süsteem jälgib aktiivseid laene, tagastusi ja kasutajate statistikat.

## Tehnoloogiad

- Node.js
- Express.js
- CORS
- JavaScript 
- GitHub Actions 
- Docker 

## Käivitamine

* npm install
* npm start
* ja server töötab: http://localhost:3000

## Testikasutajad

POST /api/users/signup

{
  "username": "test",
  "password": "123",
  "name": "Test Kasutaja"
}

## API endpointid

### Kasutajad

| Meetod | URL               | Kirjeldus               |
| ------ | ----------------- | ----------------------- |
| POST   | /api/users/signup | Loo uus kasutaja        |
| POST   | /api/users/login  | Logi sisse ja saa token |
| POST   | /api/users/logout | Logi välja              |
| GET    | /api/users/me     | Praegune kasutaja       |


### Raamatud

| Meetod | URL                     | Kirjeldus                       |
| ------ | ----------------------- | ------------------------------- |
| GET    | /api/books              | Kõik raamatud                   |
| GET    | /api/books/:id          | Raamat ID järgi                 |
| GET    | /api/books/search       | Otsi pealkirja või autori järgi |
| GET    | /api/books/genres       | Kõik žanrid                     |
| GET    | /api/books/genre/:genre | Raamatud žanri järgi            |


### Laenud

| Meetod | URL                   | Kirjeldus      |
| ------ | --------------------- | -------------- |
| POST   | /api/loans            | Laena raamat   |
| POST   | /api/loans/:id/return | Tagasta raamat |
| GET    | /api/loans            | Kõik laenud    |
| GET    | /api/loans/me         | Minu laenud    |


## Testid

* Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
* npm test


## GitHub Actions

GitHub Actions kontrollib projekti automaatselt iga kord, kui vajutate käsku `main`.

See:
- paigaldab sõltuvused
- käivitab teste
- kontrollib koodi vigade suhtes

Kui midagi ei tööta, jookseb torujuhe kokku; kui kõik on korras, töötab see edukalt.
