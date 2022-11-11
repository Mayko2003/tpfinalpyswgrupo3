# TP FINAL PYSW 2022
Programacion y Servicios WEB, TP FINAL, Grupo 3

Integrantes:

Chorolque Mariano 😕 💤

Fernandez Torres Fernando 😴 ⭐

Paredes Samuel Elias 😎 🎶

Rodriguez Luis Eduardo 😐 🌟

Tintilay Santiago 😐 👍

# Tecnologias Utilizadas
Angular
Express js
Mongodb

# Instalacion con Docker

1. Crear imagen frontend

   Deberas situarte sobre la carpeta de frontend para crear la imagen a partir del archivo dockerfile, luego ejecuta el siguiente comando:
   
   ```
   docker build -t pysw-frontend .
   ```
   Nota: puedes cambiar el nombre de la imagen denominada pysw-frontend, pero recuerda cambiar los contenedores que la usen.

2. Crear imagen backend
  
   Deberas situarte sobre la carpeta de backend para crear la imagen a partir del archivo dockerfile, luego ejecuta el siguiente comando
   
   ```
   docker build -t pysw-backend .
   ```
   Nota: puedes cambiar el nombre de la imagen denominada pysw-backend, pero recuerda cambiar los contenedores que la usen.

3. Crear una red en docker
   
   Para que la conexion entre contenedores funcione deberas crearte una red docker:
   
   ```
   docker network create tpfinal
   ```
   Nota: el nombre de la red se puede cambiar pero recuerda modificar el docker-compose.yml tambien
   
4. Crear contenedores con docker compose

  Deberas situarte en la raiz del repositorio donde se encuentra el archivo docker-compose.yml y luego levartarlo:
  
  ```
  docker compose up
  ```
  Una vez hecho esto podras probar la aplicacion en lolcahost:4200 si es que utilizaste dicho puerto, sino utiliza modifica el url.
