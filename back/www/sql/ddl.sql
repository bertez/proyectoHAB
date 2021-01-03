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
  `nombre` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
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




INSERT INTO users (name, email, password) VALUES 
 ("antonio", "antonio@mail.com", "password1"),
 ("luis", "luis@mail.com", "password2"),
 ("sofia", "sofia@mail.com", "password3"),
 ("Manuel", "manuel@mail.com", "password4"),
 ("iria", "iria@mail.com", "password5");
 




INSERT INTO experiences (nombre, tipo, descripcion) VALUES 
 ("comer en galicia", "gastronomia", "lorem"),
 ("ruta de vinos", "gastronomia", "lorem"),
 ("ruta courel", "senderismo", "lorem"),
 ("escalade Irun", "escalada", "lorem"),
 ("submarinismo", "acuatica", "lorem");