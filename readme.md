# Demo UpTek

## Informazioni generali

- pin per accedere a window: 8468
- collegare tutti i devices tramite porte usb e collegare la stampante all'alimentatore (cavo rosso e nero )
- lanciare xampp e far partire il server
- andare su localhost/demo_uptek/app/

## Struttura cartelle
- app: contiene i file HTML
- assets:
  - icons
- core:
  - operation.php: riceve le chiamate AJAX e lancia gli script python
  - devices_script:
    - printer:
      - input.txt && output.txt: testo del biglietto da stampare $NAME$ e $ROOM$ vengono cambiati a run time con quelli corretti
      - printer.py: script per la stampante
    - scanner:
      - getUserData.py: script per la lettura del codice MRZ presente sui documenti
      - getBarCode.py: script per la lettura del codice a barre
- js:
  - un file js per ogni pagina HTML
  - animations.js: funzione che si occupa del cambio di pagina
- memory:
  - client-info.csv: tabella contenente i dati degli utenti che hanno fatto il check-in
  - client-picture: salva le foto degli utenti che hanno fatto il check-in
- style:
  - scss:
    - _base.scss: contiene le regole per i font, i colori e i mixinis
    - _components.scss: regole per la definizione dei singoli componenti
    - _layout.scss: regole per il body, le singole pagine e i containers
    - _utils.scss: regole per alcune classi di utilità (es. hidden) e il bottone del touch sopra allo slider
    - main.scss: include tutti gli altri file
  - main.css: css compilato dal scss
  
## Da sistemare

- [ ] centratura logo
- [ ] traduzioni
- [ ] bordo pagination
- [x] avvio lettore in automatico oppure timeout all'avvio
- [ ] finto documento (?)
- [ ] bottone indietro sul lettura documento non funzione
- [ ] pagination bordi
- [ ] no matite, input text
- [x] posizione touch icon 
- [x] bloccare zoom

- [x] sistemare paginazione
- [x] check valori form
- [x] collegare tutti i bottoni
- [x] salvare csv
- [ ] salvare immagine
