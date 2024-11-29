<div align="center">
    <p align="center">
        <a href="https://nodejs.org/">
            <img src="https://avatars.githubusercontent.com/u/9950313?s=200&v=4" alt="Node.js logo" height="140">
        </a>
    </p>
</div>
<br>
<p align="center">
    <a href="https://github.com/berkanumutlu/challenge-nodejs-library-management-api/stargazers" rel="nofollow"><img src="https://img.shields.io/github/stars/berkanumutlu/challenge-nodejs-library-management-api?style=flat&logo=github" alt="Library Management API Repo stars"></a>
    <a href="https://github.com/berkanumutlu/challenge-nodejs-library-management-api/blob/master/LICENSE" target="_blank" rel="nofollow"><img src="https://img.shields.io/github/license/berkanumutlu/challenge-nodejs-library-management-api" alt="License"></a>
    <a href="https://nodejs.org" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Node.js-v20.18.1-5FA04E?logo=nodedotjs&logoColor=white&labelColor=5FA04E" alt="Node.js Version"></a>
    <a href="https://expressjs.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Express.js-v4.21.1-black?logo=express&logoColor=white&labelColor=black" alt="Express.js Version"></a>
     <a href="https://zod.dev" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/zod-v3.23.8-3E67B1?logo=zod&logoColor=white&labelColor=3E67B1" alt="zod Version"></a>
    <a href="https://sequelize.org" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Sequelize-v6.37.5-52B0E7?logo=sequelize&logoColor=white&labelColor=52B0E7" alt="Sequelize Version"></a>
    <a href="https://www.postgresql.org/docs/release/15.7" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/PostgreSQL-v15.7-4169E1?logo=postgresql&logoColor=white&labelColor=4169E1" alt="PostgreSQL Version"></a>
    <a href="https://www.npmjs.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/NPM-v10.8.2-CB3837?logo=npm&logoColor=F7F7F7&labelColor=CB3837" alt="NPM Version"></a>
    <a href="https://www.docker.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Docker-v4.25.2-2496ED?logo=docker&logoColor=white&labelColor=2496ED" alt="Docker Version"></a>
</p>

# [Challenge] Library Management API with Node.js

It is a challenge project that aims to create a library management API using Node.js and PostgreSQL.

## Installation

**1)** Clone repository

```shell
$ git clone https://github.com/berkanumutlu/challenge-nodejs-library-management-api.git
```

Or with SSH

```shell
$ git clone git@github.com:berkanumutlu/challenge-nodejs-library-management-api.git
```

Or with Github CLI

```shell
$ git clone gh repo clone berkanumutlu/challenge-nodejs-library-management-api
```

**2)** Copy the example.env file and **make the required configuration changes** in the file

```shell
$ cp /src/api/example.env /src/api/.env
```

**3)** Install docker container (required docker)

```shell
$ docker-compose up -d
```

**4)** After installation, find your api container id on docker

```shell
$ docker ps

# Output:
CONTAINER ID   IMAGE                          COMMAND                  CREATED        STATUS          PORTS                           NAMES
...
1132d2cf9611   library-management-api-image   "docker-entrypoint.s…"   36 hours ago   Up 12 minutes   0.0.0.0:3000->3000/tcp          library-management-api
...
```

- And connect to the terminal of your app and api container

```shell
$ docker exec -it {API_CONTAINER_ID} bash
```

**5)** Install all the dependencies using npm

```shell
/user/local/api $ npm install
```

**6)** Generate mock data

```shell
/user/local/api $ npm run db:seed:mock
```

**7)** Restart your docker container

```shell
$ docker-compose restart
```

**8)** Now you're ready to use project

- To stop the Docker container, use the following command

```shell
$ docker-compose stop
```

## API

This section provides an overview of the available API endpoints for the Library Management App. Each endpoint's functionality, request details, and example responses are included below.

---

### User Management

---

#### 1. Get Users
- **URL**: `GET /users`
- **Description**: Retrieves a list of all users in the database.
- **Response**:
  ```json
  [
      { "id": 2, "name": "Enes Faruk Meniz" },
      { "id": 1, "name": "Eray Aslan" }
  ]
  ```

#### 2. Get User
- **URL**: `GET /users/:id`
- **Description**: Retrieves a specific user along with their borrowing history.
- **Response**:
  - If the user has no borrowing history:
    ```json
    {
        "id": 4,
        "name": "Kadir Mutlu",
        "books": { "past": [], "present": [] }
    }
    ```
  - If the user has borrowing history:
    ```json
    {
        "id": 2,
        "name": "Enes Faruk Meniz",
        "books": {
            "past": [
                { "name": "I, Robot", "userScore": 5 },
                { "name": "The Hitchhiker's Guide to the Galaxy", "userScore": 10 }
            ],
            "present": [
                { "name": "Brave New World" }
            ]
        }
    }
    ```

#### 3. Create User
- **URL**: `POST /users`
- **Description**: Creates a new user.
- **Request**:
  ```json
  { "name": "Esin Öner" }
  ```
- **Response**: Returns HTTP 201 Created upon success.

---

### Book Management

---

#### 4. Get Books
- **URL**: `GET /books`
- **Description**: Retrieves a list of all books in the database.
- **Response**:
  ```json
  [
      { "id": 4, "name": "1984" },
      { "id": 5, "name": "Brave New World" }
  ]
  ```

#### 5. Get Book
- **URL**: `GET /books/:id`
- **Description**: Retrieves details of a specific book along with its average user score.
- **Response**:
  - If the book is rated:
    ```json
    { "id": 2, "name": "I, Robot", "score": "5.33" }
    ```
  - If the book is not rated:
    ```json
    { "id": 3, "name": "Dune", "score": -1 }
    ```

#### 6. Create Book
- **URL**: `POST /books`
- **Description**: Adds a new book to the database.
- **Request**:
  ```json
  { "name": "Neuromancer" }
  ```
- **Response**: Returns HTTP 201 Created upon success.

---

### BorrowedBooks Management

---

#### 7. Borrow Book
- **URL**: `POST /users/:userId/borrow/:bookId`
- **Description**: Allows a user to borrow a book.
- **Response**: Returns HTTP 204 No Content upon success.

#### 8. Return Book
- **URL**: `POST /users/:userId/return/:bookId`
- **Description**: Allows a user to return a borrowed book.
- **Request**:
  ```json
  { "score": 9 }
  ```
- **Response**: Returns HTTP 204 No Content upon success.

---

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.