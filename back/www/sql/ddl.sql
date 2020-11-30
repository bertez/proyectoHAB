use proyecto_experience;

create table users (
id int unsigned primary key auto_increment,
name varchar (50) not null,
email varchar (50)not null unique,
password varchar(128) not null
);


create table multimedia (
id int unsigned primary key auto_increment,
video varchar(50),
foto varchar (50),
location varchar(50),
id_experience int unsigned,
foreign key (id_experience) references experience(id)
);

create table experience (
id int unsigned primary key auto_increment,
nombre varchar (50),
tipo varchar (50),
descripcion varchar (500),
id_users int unsigned,
foreign key (id_users) references users(id)
);
create table commentary (
id int unsigned primary key auto_increment,
texto varchar(500),
fecha_comentario timestamp default current_timestamp,
id_users int unsigned,
foreign key (id_users) references users(id),
id_experience int unsigned,
foreign key (id_experience) references experience(id)
);


INSERT INTO users (name, email, password) VALUES 
 ("antonio", "antonio@mail.com", "password1"),
 ("luis", "luis@mail.com", "password2"),
 ("sofia", "sofia@mail.com", "password3"),
 ("Manuel", "manuel@mail.com", "password4"),
 ("iria", "iria@mail.com", "password5");
 




INSERT INTO experience (nombre, tipo, descripcion) VALUES 
 ("comer en galicia", "gastronomia", "lorem"),
 ("ruta de vinos", "gastronomia", "lorem"),
 ("ruta courel", "senderismo", "lorem"),
 ("escalade Irun", "escalada", "lorem"),
 ("submarinismo", "acuatica", "lorem");