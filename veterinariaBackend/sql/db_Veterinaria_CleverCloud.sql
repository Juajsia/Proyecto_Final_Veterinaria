--------------------------------------------------------------------------------
/*Creación de la base de Datos*/
--------------------------------------------------------------------------------

Drop database if exists bf0vupe6gntjsg5qfsaz;
create database bf0vupe6gntjsg5qfsaz;
use bf0vupe6gntjsg5qfsaz;

--------------------------------------------------------------------------------
/*Declaración de las Tablas*/
--------------------------------------------------------------------------------
CREATE TABLE persona (
    cedula INT NOT NULL UNIQUE primary key,
    Primer_nombre VARCHAR(30) NOT NULL,
    Segundo_nombre VARCHAR(30) NULL,
    Primer_Apellido VARCHAR(30) NOT NULL,
    Segundo_Apellido VARCHAR(30) NOT NULL,
    edad INT NOT NULL,
    IdRol INT NOT NULL
);

CREATE TABLE rol (
    IdRol INT NOT NULL AUTO_INCREMENT,
    NombreRol VARCHAR(20) NOT NULL,
    PRIMARY KEY (IdRol)
);

CREATE TABLE credenciales (
	Usuario varchar(30) not null unique primary key,
    Contrasenia varchar(255),
    idPersona INT NOT NULL
);

CREATE TABLE mascota (
    IdMascota binary(16) NOT NULL UNIQUE,
    Nombre VARCHAR(20) NOT NULL,
    Edad INT NOT NULL,
    Especie VARCHAR(20) NOT NULL,
    Raza VARCHAR(20) NOT NULL,
    Color VARCHAR(20) NOT NULL,
    Tamanio VARCHAR(10) NOT NULL,
    Peso VARCHAR(10) NOT NULL,
    IdDuenio INT NOT NULL,
    PRIMARY KEY (IdMascota)
);

CREATE TABLE historia_clinica (
    IdHistoria_Clinica INT NOT NULL UNIQUE AUTO_INCREMENT,
    Fecha DATE NOT NULL,
    Motivo VARCHAR(200) NOT NULL,
    Sintomatologia TINYTEXT NOT NULL,
    Diagnostico TEXT NOT NULL,
    Procedimiento TEXT NULL,
    MedicamentosAlergia VARCHAR(100) NOT NULL,
    IdMascota binary(16) NOT NULL,
    IdOrden INT NULL,
    IdVeterinario INT NOT NULL,
    PRIMARY KEY (IdHistoria_Clinica)
);

create table historial_vacunas (
	IdHistorialVacunas INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    Fecha DATE NOT NULL,
    IdVacuna INT NOT NULL,
    IdMascota binary(16) NOT NULL
);

create table vacuna (
	IdVacuna INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) not null
);

create table orden (
	IdOrden INT NOT NULL UNIQUE AUTO_INCREMENT,
    IdMascota binary(16) NOT NULL,
    Anulada boolean not null default false,
    primary key (IdOrden)
);

create table orden_medicamento (
	IdOrden INT NOT NULL,
    IdMedicamento INT NOT NULL,
    Dosis varchar(15) not null,
    primary key(IdOrden, IdMedicamento)
);

create table medicamento (
	IdMedicamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) not null
);

CREATE TABLE factura (
    IdFactura INT NOT NULL UNIQUE AUTO_INCREMENT,
    valorTotal FLOAT NOT NULL, 
    fecha DATE NOT NULL,
    IdOrden INT NULL,
    IdDuenio INT NOT NULL,
    PRIMARY KEY (IdFactura)
);

create table factura_producto (
	IdFactura INT NOT NULL,
    IdProducto INT NOT NULL,
    cantidad int not null default 0,
    primary key(IdFactura, IdProducto)
);

create table producto (
	IdProducto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) not null,
    valor float not null
);

--------------------------------------------------------------------------------
/*Declaración de Constraints*/
--------------------------------------------------------------------------------
alter table persona add foreign key (Idrol) references rol(IdRol);

alter table credenciales add foreign key (idPersona) references persona(cedula);

alter table mascota add(
	foreign key (IdDuenio) references persona(cedula)
);

alter table historia_clinica add(
	foreign key (IdMascota) references mascota(IdMascota),
    foreign key (IdOrden) references orden(IdOrden),
	foreign key (IdVeterinario) references persona(Cedula)
);

alter table historial_vacunas add(
	foreign key(IdMascota) references mascota(IdMascota),
    foreign key (IdVacuna) references vacuna(IdVacuna)
);

alter table orden add (
	foreign key (IdMascota) references mascota(IdMascota)
);

alter table orden_medicamento add (
	foreign key (IdOrden) references orden(IdOrden),
    foreign key (IdMedicamento) references medicamento(IdMedicamento)
);

alter table factura add (
	foreign key (IdOrden) references orden(IdOrden),
    foreign key (IdDuenio) references persona(Cedula)
);

alter table factura_producto add (
	foreign key (IdFactura) references factura(IdFactura),
    foreign key (IdProducto) references producto(IdProducto)
);

--------------------------------------------------------------------------------
/*Creación de Procedimientos almacenados*/
--------------------------------------------------------------------------------

/*CRUD tabla Persona*/
Drop procedure if exists Create_Persona;
DELIMITER &&  
CREATE PROCEDURE Create_Persona (in cedula INT,
    in Primer_nombre VARCHAR(30) ,
    in Segundo_nombre VARCHAR(30),
    in Primer_Apellido VARCHAR(30),
    in Segundo_Apellido VARCHAR(30),
    in edad INT,
    in IdRol INT)
BEGIN    
	insert into persona values (cedula,Primer_nombre,Segundo_nombre,Primer_Apellido,Segundo_Apellido,edad,IdRol);
END &&  
DELIMITER ;   

Drop procedure if exists Actualizar_Persona;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Persona (in id INT,
    in P_nombre VARCHAR(30) ,
    in S_nombre VARCHAR(30),
    in P_Apellido VARCHAR(30),
    in S_Apellido VARCHAR(30),
    in P_edad INT,
    in Rol INT)
BEGIN    
	 update persona set Primer_nombre = P_nombre , Segundo_nombre = S_nombre,
     Primer_Apellido = P_Apellido, Segundo_Apellido = S_Apellido,edad = P_edad, IdRol = Rol 
     where cedula=id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Persona;
DELIMITER &&  
CREATE PROCEDURE Consultar_Persona (in id INT)
BEGIN    
	 select * from persona where cedula=id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Persona;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Persona (in id INT)
BEGIN    
	 delete from persona where cedula=id;
END &&  
DELIMITER ;


/*CRUD tabla Mascota*/
Drop procedure if exists Crear_Mascota;
DELIMITER &&  
CREATE PROCEDURE Crear_Mascota (in Nombre VARCHAR(20),
    in Edad INT,
    in Especie VARCHAR(20),
    in Raza VARCHAR(20),
    in Color VARCHAR(20),
    in Tamanio VARCHAR(10),
    in Peso VARCHAR(10),
    in IdDuenio INT)
BEGIN    
	 insert into mascota (idMascota,Nombre,Edad,Especie,Raza,Color,Tamanio,Peso,IdDuenio) 
     values (UUID_TO_BIN(UUID()),Nombre,Edad,Especie,Raza,Color,Tamanio,Peso,IdDuenio);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Mascota;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Mascota (in ID varchar(36),
	in P_Nombre VARCHAR(20),
    in P_Edad INT,
    in P_Especie VARCHAR(20),
    in P_Raza VARCHAR(20),
    in P_Color VARCHAR(20),
    in P_Tamanio VARCHAR(10),
    in P_Peso VARCHAR(10),
    in P_IdDuenio INT)
BEGIN    
	 update mascota set Nombre = P_Nombre, Edad = P_Edad, Especie = P_Especie, Raza = P_Raza,
     Color = P_Color, Tamanio = P_Tamanio, Peso = P_Peso, IdDuenio = P_IdDuenio  where IdMascota = UUID_TO_BIN(ID);
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Mascota;
DELIMITER &&  
CREATE PROCEDURE Consultar_Mascota (in id varchar(36))
BEGIN    
	 select BIN_TO_UUID(idMascota) IDMascota,Nombre,Edad,Especie,Raza,Color,Tamanio,Peso,IdDuenio from mascota where IdMascota= UUID_TO_BIN(id);
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Mascota;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Mascota (in id varchar(36))
BEGIN    
	 delete from mascota where IdMascota = UUID_TO_BIN(id);
END &&  
DELIMITER ;


/*CRUD tabla Credenciales*/
Drop procedure if exists Crear_Credenciales;
DELIMITER &&  
CREATE PROCEDURE Crear_Credenciales (in Usuario varchar(30),
    in Contrasenia varchar(255),
    in idPersona INT)
BEGIN    
	 insert into credenciales (Usuario, Contrasenia, idPersona) 
     values (Usuario, Contrasenia, idPersona);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Credenciales;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Credenciales (in Oldid varchar(30), in Newid varchar(30),
    in P_Contrasenia varchar(255),
    in P_idPersona INT)
BEGIN    
	 update credenciales set Usuario = Newid, Contrasenia = P_Contrasenia, idPersona = P_idPersona where Usuario = Oldid;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Credenciales;
DELIMITER &&  
CREATE PROCEDURE Consultar_Credenciales (in id varchar(30))
BEGIN    
	 select * from credenciales where Usuario=id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Credenciales;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Credenciales (in id varchar(30))
BEGIN    
	 delete from credenciales where Usuario=id;
END &&  
DELIMITER ;


/*CRUD tabla Historia_Clinica*/
Drop procedure if exists Crear_Historia_Clinica;
DELIMITER &&  
CREATE PROCEDURE Crear_Historia_Clinica (
    in Motivo VARCHAR(200),
    in Sintomatologia TINYTEXT,
    in Diagnostico TEXT,
    in Procedimiento TEXT,
    in MedicamentosAlergia VARCHAR(100),
    in IdMascota varchar(36),
    in IdOrden INT,
    in IdVeterinario INT)
BEGIN    
	 insert into historia_clinica 
     (Fecha, Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, IdMascota, IdOrden, IdVeterinario)
     values( (select NOW()), Motivo, Sintomatologia, Diagnostico, Procedimiento, MedicamentosAlergia, UUID_TO_BIN(IdMascota), IdOrden, IdVeterinario);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Historia_Clinica;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Historia_Clinica (
	in id INT,
	in P_Fecha DATE,
    in P_Motivo VARCHAR(200),
    in P_Sintomatologia TINYTEXT,
    in P_Diagnostico TEXT,
    in P_Procedimiento TEXT,
    in P_MedicamentosAlergia VARCHAR(100),
    in P_IdMascota varchar(36),
    in P_IdOrden INT,
    in P_IdVeterinario INT)
BEGIN    
	 update historia_clinica set Fecha = P_Fecha, Motivo = P_Motivo, Sintomatologia = P_Sintomatologia, 
     Diagnostico = P_Diagnostico ,Procedimiento = P_Procedimiento, MedicamentosAlergia = P_MedicamentosAlergia, 
     IdMascota = UUID_TO_BIN(P_IdMascota),IdOrden = P_IdOrden, IdVeterinario = P_IdVeterinario where IdHistoria_Clinica = id;
END &&
DELIMITER ;

Drop procedure if exists Consultar_Historia_Clinica;
DELIMITER &&  
CREATE PROCEDURE Consultar_Historia_Clinica (in id int)
BEGIN    
		select h.IdHistoria_Clinica, h.Fecha, h.Motivo, h.Sintomatologia, h.Diagnostico, h.Procedimiento, h.MedicamentosAlergia, BIN_TO_UUID(h.IdMascota) IdMascota, m.Nombre NombreMascota, IdOrden, h.IdVeterinario, m.IdDuenio CedulaDueño from historia_clinica h 
		inner join mascota m on m.IdMascota = h.IdMascota
		where h.IdHistoria_Clinica = id;
END &&  
DELIMITER ;

Drop procedure if exists ConsultarPorIDMascota_Historia_Clinica;
DELIMITER &&  
CREATE PROCEDURE ConsultarPorIDMascota_Historia_Clinica (in id varchar(36))
BEGIN    
		select h.IdHistoria_Clinica, h.Fecha, h.Motivo, h.Sintomatologia, h.Diagnostico, h.Procedimiento, h.MedicamentosAlergia, BIN_TO_UUID(h.IdMascota) IdMascota, m.Nombre NombreMascota, IdOrden, h.IdVeterinario from historia_clinica h 
		inner join mascota m on m.IdMascota = h.IdMascota
		where h.IdMascota = UUID_TO_BIN(id);
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Historia_Clinica;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Historia_Clinica (in id INT)
BEGIN    
	 delete from historia_clinica where IdHistoria_Clinica = id;
END &&  
DELIMITER ;

/*CRUD tabla Historial_Vacunas*/
Drop procedure if exists Crear_Historial_Vacunas;
DELIMITER &&  
CREATE PROCEDURE Crear_Historial_Vacunas (
    in IdVacuna INT,
    in IdMascota varchar(36))
BEGIN    
	 insert into historial_vacunas (IdVacuna, Fecha, IdMascota) values(IdVacuna, (select NOW()), UUID_TO_BIN(IdMascota));
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Historial_Vacunas;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Historial_Vacunas (
	in id INT,
    in P_Fecha DATE,
	in P_IdVacuna INT,
    in P_IdMascota varchar(36))
BEGIN    
	 update historial_vacunas set Fecha = P_Fecha, IdVacuna = P_IdVacuna, IdMascota = UUID_TO_BIN(P_IdMascota) where IdHistorialVacunas = id;
END &&
DELIMITER ;

Drop procedure if exists Consultar_Historial_Vacunas;
DELIMITER &&  
CREATE PROCEDURE Consultar_Historial_Vacunas (in id INT)
BEGIN    
	 select hv.IdHistorialVacunas, DATE(hv.Fecha) Fecha, v.IdVacuna, v.nombre nombreVacuna, BIN_TO_UUID(m.IdMascota) IdMascota, m.Nombre nombreMascota, m.IdDuenio from 
     historial_vacunas hv inner join vacuna v on v.IdVacuna = hv.IdVacuna inner join mascota m on m.IdMascota = hv.IdMascota where hv.IdHistorialVacunas = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Historial_Vacunas;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Historial_Vacunas (in id INT)
BEGIN    
	 delete from historial_vacunas where IdHistorialVacunas = id;
END &&  
DELIMITER ;


/*CRUD tabla Vacuna*/
Drop procedure if exists Crear_Vacuna;
DELIMITER &&  
CREATE PROCEDURE Crear_Vacuna (in nombre varchar(50))
BEGIN    
	 insert into vacuna (nombre) values (nombre);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Vacuna;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Vacuna (in id INT, in P_nombre varchar(50))
BEGIN    
     update vacuna set nombre = P_nombre where IdVacuna = id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Vacuna;
DELIMITER &&  
CREATE PROCEDURE Consultar_Vacuna (in id INT)
BEGIN    
	 select * from vacuna where IdVacuna = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Vacuna;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Vacuna (in id INT)
BEGIN    
	 delete from vacuna where IdVacuna = id;
END &&  
DELIMITER ;


/*CRUD tabla Orden*/
Drop procedure if exists Crear_Orden;
DELIMITER &&  
CREATE PROCEDURE Crear_Orden (
    in IdMascota varchar(36),
    in Anulada boolean)
BEGIN    
	 insert into orden (IdMascota,Anulada) values (UUID_TO_BIN(IdMascota),Anulada);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Orden;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Orden (in id INT, in P_IdMascota varchar(36), in P_Anulada boolean)
BEGIN    
     update orden set IdMascota = UUID_TO_BIN(P_IdMascota), Anulada = P_Anulada where IdOrden = id;
END &&
DELIMITER ;

Drop procedure if exists Consultar_Orden;
DELIMITER &&  
CREATE PROCEDURE Consultar_Orden(in id INT)
BEGIN    
	 select IdOrden, UUID_TO_BIN(IdMascota) IdMascota, Anulada from orden where IdOrden = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Orden;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Orden (in id INT)
BEGIN    
	 delete from orden where IdOrden = id;
END &&  
DELIMITER ;

/*CRUD tabla Orden_Medicamento*/
Drop procedure if exists Crear_Orden_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Crear_Orden_Medicamento (
    in IdOrden INT,
    in IdMedicamento INT,
    in Dosis varchar(15))
BEGIN    
	 insert into orden_medicamento (IdOrden, IdMedicamento, Dosis) values(IdOrden, IdMedicamento, Dosis);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Orden_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Orden_Medicamento (
	in P_IdOrden INT,
    in P_IdMedicamento INT,
    in P_Dosis varchar(15),
    in N_IdMedicamento INT)
BEGIN    
	 update orden_medicamento set IdMedicamento = N_IdMedicamento, Dosis = P_Dosis where IdOrden = P_IdOrden AND IdMedicamento = P_IdMedicamento;
END &&
DELIMITER ;

Drop procedure if exists Consultar_Orden_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Consultar_Orden_Medicamento (in P_IdOrden INT)
BEGIN    
	 select * from orden_medicamento where IdOrden = P_IdOrden;
END &&  
DELIMITER ;

Drop procedure if exists EliminarTodo_Orden_Medicamento;
DELIMITER &&  
CREATE PROCEDURE EliminarTodo_Orden_Medicamento (in P_IdOrden INT)
BEGIN    
	 delete from orden_medicamento where IdOrden = P_IdOrden;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Orden_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Orden_Medicamento (in P_IdOrden INT, in P_IdMedicamento INT)
BEGIN    
	 delete from orden_medicamento where IdOrden = P_IdOrden AND IdMedicamento = P_IdMedicamento;
END &&  
DELIMITER ;

/*CRUD tabla Medicamento*/
Drop procedure if exists Crear_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Crear_Medicamento (in nombre varchar(50))
BEGIN    
	 insert into medicamento (nombre) values (nombre);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Medicamento (in id INT, in P_nombre varchar(50))
BEGIN    
     update medicamento set nombre = P_nombre where IdMedicamento = id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Consultar_Medicamento (in id INT)
BEGIN    
	 select * from medicamento where IdMedicamento = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Medicamento (in id INT)
BEGIN    
	 delete from medicamento where IdMedicamento = id;
END &&  
DELIMITER ;


/*CRUD tabla Factura*/
Drop procedure if exists Crear_Factura;
DELIMITER &&  
CREATE PROCEDURE Crear_Factura( 
    in valorTotal FLOAT, 
    in fecha DATE,
    in IdOrden INT,
    in IdDuenio INT)
BEGIN    
	 insert into factura (valorTotal, fecha, IdOrden, IdDuenio) 
     values (valorTotal, fecha, IdOrden, IdDuenio);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Factura;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Factura(
	in id int,
    in P_valorTotal FLOAT, 
    in P_fecha DATE,
    in P_IdOrden INT,
    in P_IdDuenio INT)
BEGIN    
	 update factura set valorTotal = P_valorTotal, fecha = P_fecha, IdOrden = P_IdOrden, IdDuenio = P_IdDuenio where IdFactura = id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Factura;
DELIMITER &&  
CREATE PROCEDURE Consultar_Factura(in id INT)
BEGIN    
	 select * from factura where IdFactura = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Factura;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Factura (in id INT)
BEGIN    
	 delete from factura where IdFactura = id;
END &&  
DELIMITER ;

/*CRUD tabla factura_producto*/
Drop procedure if exists Crear_factura_producto;
DELIMITER &&  
CREATE PROCEDURE Crear_factura_producto (
    in IdFactura INT,
    in Idproducto INT,
    in cantidad int)
BEGIN    
	 insert into factura_producto (IdFactura, IdProducto, cantidad) values(IdOrden, IdMedicamento, Dosis);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_factura_producto;
DELIMITER &&  
CREATE PROCEDURE Actualizar_factura_producto (
	in P_IdFactura INT,
    in P_Idproducto INT,
    in P_cantidad int,
    in N_Idproducto INT)
BEGIN    
	 update factura_producto set IdProducto = N_Idproducto, cantidad = P_cantidad where IdFactura = P_IdFactura AND IdProducto = P_Idproducto;
END &&
DELIMITER ;

Drop procedure if exists Consultar_factura_producto;
DELIMITER &&  
CREATE PROCEDURE Consultar_factura_producto (in P_IdFactura INT)
BEGIN    
	 select * from factura_producto where IdFactura = P_IdFactura;
END &&  
DELIMITER ;

Drop procedure if exists EliminarTodo_factura_producto;
DELIMITER &&  
CREATE PROCEDURE EliminarTodo_factura_producto (in P_IdFactura INT)
BEGIN    
	 delete from factura_producto where IdFactura = P_IdFactura;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_factura_producto;
DELIMITER &&  
CREATE PROCEDURE Eliminar_factura_producto (in P_IdFactura INT, in P_Idproductoo INT)
BEGIN    
	 delete from factura_producto where IdFactura = P_IdFactura AND IdProducto = P_Idproductoo;
END &&  
DELIMITER ;

/*CRUD tabla producto*/
Drop procedure if exists Crear_Producto;
DELIMITER &&  
CREATE PROCEDURE Crear_Producto (in nombre varchar(50), in valor float)
BEGIN    
	 insert into producto (nombre, valor) values (nombre, valor);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Producto;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Producto (in id INT, in P_nombre varchar(50), in P_valor float)
BEGIN    
     update producto set nombre = P_nombre, valor = P_valor where IdProducto = id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Producto;
DELIMITER &&  
CREATE PROCEDURE Consultar_Producto (in id INT)
BEGIN    
	 select * from producto where IdProducto = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Producto;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Producto (in id INT)
BEGIN    
	 delete from producto where IdProducto = id;
END &&  
DELIMITER ;

insert into rol (NombreRol) values
("Administrador"),
("Veterinario"),
("Vendedor"),
("Dueño");


-- Creación de Roles 
/*
Drop role if exists 'Admin', 'Veterinario', 'Vendedor', 'login_management';
create role 'Admin', 'Veterinario', 'Vendedor', 'login_management';

GRANT SELECT ON db_Veterinaria.credenciales to 'login_management';
GRANT SELECT ON db_Veterinaria.persona to 'login_management';

GRANT SELECT, INSERT, UPDATE, DELETE ON db_veterinaria.* TO 'Admin';

GRANT SELECT, INSERT, UPDATE ON db_veterinaria.mascota TO 'Veterinario';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.historia_clinica TO 'Veterinario';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.orden TO 'Veterinario';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.medicamento TO 'Veterinario';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.orden_medicamento TO 'Veterinario';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.historial_vacunas TO 'Veterinario';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.vacuna TO 'Veterinario';

GRANT SELECT, INSERT, UPDATE ON db_veterinaria.Factura TO 'Vendedor';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.factura_producto TO 'Vendedor';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.producto TO 'Vendedor';
GRANT SELECT ON db_veterinaria.Orden TO 'Vendedor';
*/
-- creación de los Usuarios

/*
Drop user if exists 'User_Administrador'@'localhost', 'User_Veterinario'@'localhost', 'User_Vendedor'@'localhost', 'User_Login'@'localhost';
CREATE USER 'User_Administrador'@'localhost' IDENTIFIED BY 'admin123';
CREATE USER 'User_Veterinario'@'localhost' IDENTIFIED BY 'veterinario123';
CREATE USER 'User_Vendedor'@'localhost' IDENTIFIED BY 'vendedor123';
CREATE USER 'User_Login'@'localhost' IDENTIFIED BY 'Login1234';

-- Asignar Roles

GRANT SELECT ON db_Veterinaria.credenciales to 'User_Login'@'localhost';
GRANT SELECT ON db_Veterinaria.persona to 'User_Login'@'localhost';

GRANT SELECT, INSERT, UPDATE, DELETE ON db_veterinaria.* TO 'User_Administrador'@'localhost';

GRANT SELECT, INSERT, UPDATE ON db_veterinaria.mascota TO 'User_Veterinario'@'localhost';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.historia_clinica TO 'User_Veterinario'@'localhost';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.orden TO 'User_Veterinario'@'localhost';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.medicamento TO 'User_Veterinario'@'localhost';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.orden_medicamento TO 'User_Veterinario'@'localhost';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.historial_vacunas TO 'User_Veterinario'@'localhost';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.vacuna TO 'User_Veterinario'@'localhost';

GRANT SELECT, INSERT, UPDATE ON db_veterinaria.Factura TO 'User_Vendedor'@'localhost';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.factura_producto TO 'User_Vendedor'@'localhost';
GRANT SELECT, INSERT, UPDATE ON db_veterinaria.producto TO 'User_Vendedor'@'localhost';
GRANT SELECT ON db_veterinaria.Orden TO 'User_Vendedor'@'localhost';
*/

/*
GRANT 'Admin' TO 'User_Administrador'@'localhost';
GRANT 'Veterinario' TO 'User_Veterinario'@'localhost';
GRANT 'Vendedor' TO 'User_Vendedor'@'localhost';
GRANT 'login_management' TO 'User_Login'@'localhost';
*/
-- FLUSH PRIVILEGES;

insert into persona values(1234, 'Admin', 'Admin', 'Admin', 'Admin', 100, 1);
insert into persona values(1111, 'Juan', 'Jose', 'Estrada', 'Velez', 20, 2);
insert into persona values(4321, 'Isac', '', 'Cortes', 'Buitrago', 19, 3);
insert into persona values(5412, 'Juan', 'pablo', 'Adams', 'Parra', 21, 4);
insert into persona values(6666, 'Emmanuel', '', 'Bolivar', 'Marin', 20, 2);
insert into persona values(2211, 'Juan', 'Esteban', 'Henao', 'Giraldo', 20, 2);

insert into mascota values(UUID_TO_BIN(UUID()), 'Lucas', 4, 'Pajaro', 'canario', 'amarillo', 20, 5, 6666);
insert into mascota values(UUID_TO_BIN(UUID()), 'Luna', 10, 'Perro', 'Hijueputa', 'Negro', 20, 5, 4321);
insert into mascota values(UUID_TO_BIN(UUID()), 'Toby', 2, 'Gato', 'casita', 'gris', 40, 8, 5412);
insert into mascota values(UUID_TO_BIN(UUID()), 'Kiara', 3, 'Perro', 'beagle', 'Naranja/negro', 40, 15, 1111);

insert into credenciales values('Admin1', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 1234); /* password: P@ssw0rd */
insert into credenciales values('Juan1', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 1111); /* password: P@ssw0rd */

