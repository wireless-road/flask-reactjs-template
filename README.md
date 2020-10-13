## intro

this is web service application template that uses following stack:
* **Python** (**flask**)
* **ReactJS** (functional components)
* **Redux** and **react-redux**
* **PostgreSQL**
* **Docker** and **docker-compose**
* **Gitlab CI**

Main idea of that template is using it as starting point for rapid development web services. Implements basic authorization/authentication functionality using JWT tokens.

## backend

is based on **Flask** framework. Gives highest level of flexibility on choosing tools and technologies for web applications development.

Used extensions:
* **flask-sqlalchemy**
* **flask-migrate**
* **flask-restful**
* **flask-jwt-extended**.

Authentication implemented using `JWT tokens`. All autorization/authentication related information stored in database.

Default user `guest\guest1` implemented for lauhching it out of box.

## frontend

developed using ReactJS. Used just as the most popular framework that gives ability to develop flexible SPA in short time.

build system:
* **npm**
* **webpack**
* **babel**

used components library:
* **material-ui**

served on backend as static prebuilt single `index.html` file.

used technologies:
* **redux** and **react-redux** to store state of all components at single place
* **route** to implement Front side URL navigation
* **local storage** to store `JWT tokens`
* **redux-logger** for development purpoces

## database

**Postgresql** used as main SQL database to store data. There was no serious reason to use exactly PostgreSQL. This is just what used historically. Database migration (`flask db`) implemented to simplify deploy and future schema updating processes.

##### db schema:
- table `alembic_version` with following fields:
  - version_num
- table `userr` with following fields:
  - id
  - username
  - email
  - password_hash  
- table `post` with following fields:
  - id
  - title
  - body
  - timestamp
  - user_id
- table `revoked_tokens` with following fields:
  - id
  - jti    

## devops

**docker** and **docker-compose** used for containerization. `Dockerfile` and `docker-compose.yml` can be found in root folder of project.

## ci/cd
deploy automatization using `gitlab runners` implemented. `.gitlab-ci.yml` can be found in root folder of project.

## project structure

* **application.py** is entrypoint for flask backend. All backend related sources placed in **/app** folder.
* **/migrations** - folder used by `flask db` to migrate database. In a case of any future database changes dont forget to run `flask db migrate` to register changes in db. try to divide changes in db to small logically separated chunks like you do it on merge requests using git.
* **/ui** - contains ReactJS based Frontend UI project.
* **/static_** - contains prebuilt frontend SPA page generated using `make ui-build` command. Not necessary to put it under git control. Did it just for quick launching without installed js/node programms.
* **Dockerfile**, **docker-compose.yml**, **entrypoint.sh**, **Makefile**, **wait-for-it.sh** used for deploying using docker containers.
* **requirements.txt** - contains list of used python packets. Similar for fronted can be found in **/ui/package.json**.

## to-do

* implement failed requests handling.
* add registration UI form to implement email verification based users registration.
* add `GraphQL` or `Swagger` to simplify syncronization between backend and frontend during API development.
* add `react native` template to this project that uses same source base with existing reactJS project and compatible with existing backend and database schema as starting point on mobile application development.

## user manual

* login as `guest/guest1` at [flask-reactjs-template](https://flask-reactjs-template.m2m-tele.com/)
* run `docker-compose up` from root folder of project and access `http://localhost:8887/` using browser. Use `guest/guest1` credentials to login.
* to run without docker: `make ui-install && make ui-build && flask run`. But you must setup correct environment variables shown in `database.conf` file to access your local **postgresql** database.

## security

Don't place `database.conf` file under git version control. Find another way to deliver environment variables to `production` and `development` machines.