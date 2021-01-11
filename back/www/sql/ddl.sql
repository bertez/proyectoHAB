USE api_viajes;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `experiences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
);

CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `experience_id` int NOT NULL,
  `rating` int NOT NULL,
  `text` varchar(511) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  FOREIGN KEY (experience_id)
    REFERENCES experiences(id)
    ON DELETE CASCADE
);





 



