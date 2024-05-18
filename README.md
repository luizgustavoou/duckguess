# Duckguess

## :memo: About the Project
Duckguess is inspired by the classic game "Jogo das Três Pistas," popularized by TV host Silvio Santos. This application provides a digital experience of the game, allowing users to choose from a variety of themes and challenge their friends.

This project was developed as the final submission for the Web Development 1 course at IMD/UFRN.

## Web Layout
https://github.com/luizgustavoou/duckguess/assets/89609312/27531141-340b-4abd-8bae-d23dad763112

![image](https://github.com/luizgustavoou/duckguess/assets/89609312/d5150d7d-c2d5-4cd2-b0d8-0f201016b7ed)
![image](https://github.com/luizgustavoou/duckguess/assets/89609312/4faa1971-b8d4-41f7-b074-9bd9fd535477)
![image](https://github.com/luizgustavoou/duckguess/assets/89609312/b3ec44c2-77fd-41b6-9b05-9992157d87c0)
![image](https://github.com/luizgustavoou/duckguess/assets/89609312/17fb00d4-4ae8-45e9-9875-430ef2b4fa5f)
![image](https://github.com/luizgustavoou/duckguess/assets/89609312/9274d83e-3527-4b47-93b5-7f2e67f2a4ac)

## :books: Features
* Authentication
* Choose the theme for the game's riddles
* Select two players to compete in a match
* Guess answers and receive hints
* Scoring inversely proportional to the number of hints received

# :wrench: Technologies Used
## Backend
* NestJS
* TypeORM
* MySQL

## Frontend
* React
* Redux
* react-router-dom
* hookform/resolvers
* zod
* react-icons

## Infrastructure
* Docker

## :rocket: Running the Project
Prerequisites: npm / yarn and Docker installed

```bash
# clone the repository
git clone https://github.com/luizgustavoou/duckguess.git

# navigate to the project directory
cd duckguess

# install backend dependencies
cd duckguess-api/

npm i

# install frontend dependencies
cd ../

cd duckguess-front/

npm i


# run the application
cd ../

docker compose up -d
```

## :soon: Future Implementations
* Display a user ranking list
* Show users' match history

## :dart: Project Status
Completed

# Author
<a href="https://github.com/luizgustavoou">Luiz Gustavo de Oliveira Umbelino</a><br>
<a href="https://github.com/JoabUrbano">Joab Urbano</a><br>
