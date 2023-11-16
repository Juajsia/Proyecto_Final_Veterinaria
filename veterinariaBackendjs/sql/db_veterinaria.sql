--------------------------------------------------------------------------------
/*Creación de la base de Datos*/
--------------------------------------------------------------------------------

Drop database if exists db_Veterinaria;
create database db_Veterinaria;
use db_Veterinaria;

--------------------------------------------------------------------------------
/*Declaración de las Tablas*/
--------------------------------------------------------------------------------
CREATE TABLE Persona (
    cedula INT NOT NULL UNIQUE primary key,
    Primer_nombre VARCHAR(30) NOT NULL,
    Segundo_nombre VARCHAR(30) NULL,
    Primer_Apellido VARCHAR(30) NOT NULL,
    Segundo_Apellido VARCHAR(30) NOT NULL,
    edad INT NOT NULL,
    IdRol INT NOT NULL
);

CREATE TABLE Rol (
    IdRol INT NOT NULL AUTO_INCREMENT,
    NombreRol VARCHAR(20) NOT NULL,
    PRIMARY KEY (IdRol)
);

CREATE TABLE Credenciales (
	Usuario varchar(30) not null unique primary key,
    Contrasenia varchar(255),
    idPersona INT NOT NULL
);

CREATE TABLE Mascota (
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

CREATE TABLE Historia_Clinica (
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

create table Historial_Vacunas (
	IdHistorialVacunas INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    Fecha DATE NOT NULL,
    IdVacuna INT NOT NULL,
    IdMascota binary(16) NOT NULL
);

create table Vacuna (
	IdVacuna INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) not null
);

create table Orden (
	IdOrden INT NOT NULL UNIQUE AUTO_INCREMENT,
    IdMascota binary(16) NOT NULL,
    Anulada boolean not null default false,
    primary key (IdOrden)
);

create table orden_Medicamento (
	IdOrden INT NOT NULL,
    IdMedicamento INT NOT NULL,
    Dosis varchar(15) not null,
    primary key(IdOrden, IdMedicamento)
);

create table Medicamento (
	IdMedicamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) not null
);

CREATE TABLE Factura (
    IdFactura INT NOT NULL UNIQUE AUTO_INCREMENT,
    valorTotal FLOAT NOT NULL, 
    fecha DATE NOT NULL,
    IdOrden INT NULL,
    IdDuenio INT NOT NULL,
    PRIMARY KEY (IdFactura)
);

create table Factura_Producto (
	IdFactura INT NOT NULL,
    IdProducto INT NOT NULL,
    cantidad int not null default 0,
    primary key(IdFactura, IdProducto)
);

create table Producto (
	IdProducto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) not null,
    valor float not null
);

--------------------------------------------------------------------------------
/*Declaración de Constraints*/
--------------------------------------------------------------------------------
alter table Persona add foreign key (Idrol) references Rol(IdRol);

alter table Credenciales add foreign key (idPersona) references Persona(cedula);

alter table Mascota add(
	foreign key (IdDuenio) references Persona(cedula)
);

alter table Historia_Clinica add(
	foreign key (IdMascota) references Mascota(IdMascota),
    foreign key (IdOrden) references Orden(IdOrden),
	foreign key (IdVeterinario) references Persona(Cedula)
);

alter table Historial_Vacunas add(
	foreign key(IdMascota) references Mascota(IdMascota),
    foreign key (IdVacuna) references Vacuna(IdVacuna)
);

alter table Orden add (
	foreign key (IdMascota) references Mascota(IdMascota)
);

alter table orden_Medicamento add (
	foreign key (IdOrden) references Orden(IdOrden),
    foreign key (IdMedicamento) references Medicamento(IdMedicamento)
);

alter table Factura add (
	foreign key (IdOrden) references Orden(IdOrden),
    foreign key (IdDuenio) references Persona(Cedula)
);

alter table Factura_Producto add (
	foreign key (IdFactura) references Factura(IdFactura),
    foreign key (IdProducto) references Producto(IdProducto)
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
	insert into Persona values (cedula,Primer_nombre,Segundo_nombre,Primer_Apellido,Segundo_Apellido,edad,IdRol);
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
	 update Persona set Primer_nombre = P_nombre , Segundo_nombre = S_nombre,
     Primer_Apellido = P_Apellido, Segundo_Apellido = S_Apellido,edad = P_edad, IdRol = Rol 
     where cedula=id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Persona;
DELIMITER &&  
CREATE PROCEDURE Consultar_Persona (in id INT)
BEGIN    
	 select * from Persona where cedula=id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Persona;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Persona (in id INT)
BEGIN    
	 delete from Persona where cedula=id;
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
	 insert into Mascota (idMascota,Nombre,Edad,Especie,Raza,Color,Tamanio,Peso,IdDuenio) 
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
	 update Mascota set Nombre = P_Nombre, Edad = P_Edad, Especie = P_Especie, Raza = P_Raza,
     Color = P_Color, Tamanio = P_Tamanio, Peso = P_Peso, IdDuenio = P_IdDuenio  where IdMascota = UUID_TO_BIN(ID);
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Mascota;
DELIMITER &&  
CREATE PROCEDURE Consultar_Mascota (in id varchar(36))
BEGIN    
	 select BIN_TO_UUID(idMascota) IDMascota,Nombre,Edad,Especie,Raza,Color,Tamanio,Peso,IdDuenio from Mascota where IdMascota= UUID_TO_BIN(id);
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Mascota;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Mascota (in id varchar(36))
BEGIN    
	 delete from Mascota where IdMascota = UUID_TO_BIN(id);
END &&  
DELIMITER ;


/*CRUD tabla Credenciales*/
Drop procedure if exists Crear_Credenciales;
DELIMITER &&  
CREATE PROCEDURE Crear_Credenciales (in Usuario varchar(30),
    in Contrasenia varchar(255),
    in idPersona INT)
BEGIN    
	 insert into Credenciales (Usuario, Contrasenia, idPersona) 
     values (Usuario, Contrasenia, idPersona);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Credenciales;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Credenciales (in Oldid varchar(30), in Newid varchar(30),
    in P_Contrasenia varchar(255),
    in P_idPersona INT)
BEGIN    
	 update Credenciales set Usuario = Newid, Contrasenia = P_Contrasenia, idPersona = P_idPersona where Usuario = Oldid;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Credenciales;
DELIMITER &&  
CREATE PROCEDURE Consultar_Credenciales (in id varchar(30))
BEGIN    
	 select * from Credenciales where Usuario=id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Credenciales;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Credenciales (in id varchar(30))
BEGIN    
	 delete from Credenciales where Usuario=id;
END &&  
DELIMITER ;


/*CRUD tabla Historia_Clinica*/
Drop procedure if exists Crear_Historia_Clinica;
DELIMITER &&  
CREATE PROCEDURE Crear_Historia_Clinica (
    in Fecha DATE,
    in Motivo VARCHAR(200),
    in Sintomatologia TINYTEXT,
    in Diagnostico TEXT,
    in Procedimiento TEXT,
    in MedicamentosAlergia VARCHAR(100),
    in IdMascota varchar(36),
    in IdOrden INT,
    in IdVeterinario INT,
    in IdHistorialVacunas INT)
BEGIN    
	 insert into Historia_Clinica 
     (Fecha, Motivo, Sintomatologia, Diagnostico, Procedimiento, Medicamento, Dosis,
     Vacuna, MedicamentosAlergia, DetalleProcedimiento, IdMascota, IdOrden, IdVeterinario)
     values(Fecha, Motivo, Sintomatologia, Diagnostico, Procedimiento, Medicamento, Dosis,
     Vacuna, MedicamentosAlergia, DetalleProcedimiento, UUID_TO_BIN(IdMascota), IdOrden, IdVeterinario);
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
    in P_IdVeterinario INT,
    in P_IdHistorialVacunas INT)
BEGIN    
	 update Historia_Clinica set Fecha = P_Fecha, Motivo = P_Motivo, Sintomatologia = P_Sintomatologia, 
     Diagnostico = P_Diagnostico ,Procedimiento = P_Procedimiento, Medicamento = p_Medicamento, Dosis = P_Dosis, 
     Vacuna = P_Vacuna, MedicamentosAlergia = P_MedicamentosAlergia, DetalleProcedimiento = P_DetalleProcedimiento, 
     Anulacion = P_Anulacion, IdMascota = UUID_TO_BIN(P_IdMascota),IdOrden = P_IdOrden, IdVeterinario = P_IdVeterinario, IdHistorialVacunas = P_IdHistorialVacunas where IdHistoria_Clinica = id;
END &&
DELIMITER ;

Drop procedure if exists Consultar_Historia_Clinica;
DELIMITER &&  
CREATE PROCEDURE Consultar_Historia_Clinica (in id INT)
BEGIN    
	 select IdHistoria_Clinica, Fecha, Motivo, Sintomatologia, Diagnostico, Procedimiento, Medicamento, Dosis, Vacuna, MedicamentosAlergia, DetalleProcedimiento, BIN_TO_UUID(IdMascota), IdOrden, IdVeterinario 
     from historia_clinica where IdHistoria_Clinica = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Historia_Clinica;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Historia_Clinica (in id INT)
BEGIN    
	 delete from Historia_Clinica where IdHistoria_Clinica = id;
END &&  
DELIMITER ;

/*CRUD tabla Historial_Vacunas*/
Drop procedure if exists Crear_Historial_Vacunas;
DELIMITER &&  
CREATE PROCEDURE Crear_Historial_Vacunas (
    in IdVacuna INT,
    in Fecha DATE,
    in IdMascota varchar(36))
BEGIN    
	 insert into Historial_Vacunas (IdVacuna, Fecha, IdMascota) values(IdVacuna, Fecha, UUID_TO_BIN(IdMascota));
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
	 update Historial_Vacunas set Fecha = P_Fecha, IdVacuna = P_IdVacuna, IdMascota = UUID_TO_BIN(P_IdMascota) where IdHistorialVacunas = id;
END &&
DELIMITER ;

Drop procedure if exists Consultar_Historial_Vacunas;
DELIMITER &&  
CREATE PROCEDURE Consultar_Historial_Vacunas (in id INT)
BEGIN    
	 select IdHistorialVacunas, Fecha, IdVacuna, UUID_TO_BIN(IdMascota) where IdHistorialVacunas = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Historial_Vacunas;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Historial_Vacunas (in id INT)
BEGIN    
	 delete from Historial_Vacunas where IdHistorialVacunas = id;
END &&  
DELIMITER ;


/*CRUD tabla Vacuna*/
Drop procedure if exists Crear_Vacuna;
DELIMITER &&  
CREATE PROCEDURE Crear_Vacuna (in nombre varchar(50))
BEGIN    
	 insert into Vacuna (nombre) values (nombre);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Vacuna;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Vacuna (in id INT, in P_nombre varchar(50))
BEGIN    
     update Vacuna set nombre = P_nombre where IdVacuna = id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Vacuna;
DELIMITER &&  
CREATE PROCEDURE Consultar_Vacuna (in id INT)
BEGIN    
	 select * from Vacuna where IdVacuna = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Vacuna;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Vacuna (in id INT)
BEGIN    
	 delete from Vacuna where IdVacuna = id;
END &&  
DELIMITER ;


/*CRUD tabla Orden*/
Drop procedure if exists Crear_Orden;
DELIMITER &&  
CREATE PROCEDURE Crear_Orden (
    in IdMascota varchar(36),
    in Anulada boolean)
BEGIN    
	 insert into Orden (IdMascota,Anulada) values (UUID_TO_BIN(IdMascota),Anulada);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Orden;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Orden (in id INT, in P_IdMascota varchar(36), in P_Anulada boolean)
BEGIN    
     update Orden set IdMascota = UUID_TO_BIN(P_IdMascota), Anulada = P_Anulada where IdOrden = id;
END &&
DELIMITER ;

Drop procedure if exists Consultar_Orden;
DELIMITER &&  
CREATE PROCEDURE Consultar_Orden(in id INT)
BEGIN    
	 select IdOrden, UUID_TO_BIN(IdMascota) IdMascota, Anulada from Orden where IdOrden = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Orden;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Orden (in id INT)
BEGIN    
	 delete from Orden where IdOrden = id;
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
	 insert into Orden_Medicamento (IdOrden, IdMedicamento, Dosis) values(IdOrden, IdMedicamento, Dosis);
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
	 update Orden_Medicamento set IdMedicamento = N_IdMedicamento, Dosis = P_Dosis where IdOrden = P_IdOrden AND IdMedicamento = P_IdMedicamento;
END &&
DELIMITER ;

Drop procedure if exists Consultar_Historial_Vacunas;
DELIMITER &&  
CREATE PROCEDURE Consultar_Historial_Vacunas (in P_IdOrden INT)
BEGIN    
	 select * from Historial_Vacunas where IdOrden = P_IdOrden;
END &&  
DELIMITER ;

Drop procedure if exists EliminarTodo_Orden_Medicamento;
DELIMITER &&  
CREATE PROCEDURE EliminarTodo_Orden_Medicamento (in P_IdOrden INT)
BEGIN    
	 delete from Orden_Medicamento where IdOrden = P_IdOrden;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Orden_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Orden_Medicamento (in P_IdOrden INT, in P_IdMedicamento INT)
BEGIN    
	 delete from Orden_Medicamento where IdOrden = P_IdOrden AND IdMedicamento = P_IdMedicamento;
END &&  
DELIMITER ;

/*CRUD tabla Medicamento*/
Drop procedure if exists Crear_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Crear_Medicamento (in nombre varchar(50))
BEGIN    
	 insert into Medicamento (nombre) values (nombre);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Medicamento (in id INT, in P_nombre varchar(50))
BEGIN    
     update Medicamento set nombre = P_nombre where IdMedicamento = id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Consultar_Medicamento (in id INT)
BEGIN    
	 select * from Medicamento where IdMedicamento = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Medicamento (in id INT)
BEGIN    
	 delete from Medicamento where IdMedicamento = id;
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
	 update Factura set valorTotal = P_valorTotal, fecha = P_fecha, IdOrden = P_IdOrden, IdDuenio = P_IdDuenio where IdFactura = id;
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
	 update Orden_Medicamento set IdProducto = N_Idproducto, cantidad = P_cantidad where IdFactura = P_IdFactura AND IdProducto = P_Idproducto;
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
	 delete from Orden_factura_producto where IdFactura = P_IdFactura AND IdProducto = P_Idproductoo;
END &&  
DELIMITER ;

/*CRUD tabla producto*/
Drop procedure if exists Crear_Producto;
DELIMITER &&  
CREATE PROCEDURE Crear_Producto (in nombre varchar(50), in valor float)
BEGIN    
	 insert into Producto (nombre, valor) values (nombre, valor);
END &&  
DELIMITER ;

Drop procedure if exists Actualizar_Producto;
DELIMITER &&  
CREATE PROCEDURE Actualizar_Producto (in id INT, in P_nombre varchar(50), in P_valor float)
BEGIN    
     update Producto set nombre = P_nombre, valor = P_valor where IdProducto = id;
END &&  
DELIMITER ;

Drop procedure if exists Consultar_Producto;
DELIMITER &&  
CREATE PROCEDURE Consultar_Producto (in id INT)
BEGIN    
	 select * from Producto where IdProducto = id;
END &&  
DELIMITER ;

Drop procedure if exists Eliminar_Medicamento;
DELIMITER &&  
CREATE PROCEDURE Eliminar_Medicamento (in id INT)
BEGIN    
	 delete from Producto where IdProducto = id;
END &&  
DELIMITER ;

insert into rol (nombreRol) values
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


/*
GRANT 'Admin' TO 'User_Administrador'@'localhost';
GRANT 'Veterinario' TO 'User_Veterinario'@'localhost';
GRANT 'Vendedor' TO 'User_Vendedor'@'localhost';
GRANT 'login_management' TO 'User_Login'@'localhost';
*/
FLUSH PRIVILEGES;

select * from persona;
