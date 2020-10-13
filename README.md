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
