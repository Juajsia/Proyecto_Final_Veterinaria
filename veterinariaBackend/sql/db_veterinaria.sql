Drop database if exists db_Veterinaria;
create database db_Veterinaria;
use db_Veterinaria;

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
	Usuario varchar(30) not null primary key,
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
    Tamaño VARCHAR(10) NOT NULL,
    Peso VARCHAR(10) NOT NULL,
    IdDuenio INT NOT NULL,
    IdHistoria INT NOT NULL,
    PRIMARY KEY (IdMascota)
);

create table Historia_Clinica(
	IdHistoria INT NOT NULL UNIQUE AUTO_INCREMENT,
    IdMascota binary(16) NOT NULL,
    primary key (IdHistoria)
);

CREATE TABLE Registro (
    IdRegistro INT NOT NULL UNIQUE AUTO_INCREMENT,
    Fecha DATE NOT NULL,
    Motivo VARCHAR(200) NOT NULL,
    Sintomatologia TINYTEXT NOT NULL,
    Diagnostico TEXT NOT NULL,
    Procedimiento TEXT NULL,
    MedicamentosAlergia VARCHAR(100) NOT NULL,
    IdHistoria INT NOT NULL,
    IdOrden INT NULL,
    IdVeterinario INT NOT NULL,
    IdHistorialVacunas INT NOT NULL,
    PRIMARY KEY (IdRegistro)
);

create table Historial_Vacunas (
	IdHistorialVacunas INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
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
    nombre varchar(50) not null
);

-- -----------------------------------------------------------------------------

alter table Persona add foreign key (Idrol) references Rol(IdRol);

alter table Credenciales add foreign key (idPersona) references Persona(cedula);

alter table Mascota add(
	foreign key (IdDuenio) references Persona(cedula),
	foreign key (IdHistoria) references Historia_Clinica(IdHistoria)
);

alter table Historia_Clinica add foreign key(IdMascota) references Mascota(IdMascota);

alter table Registro add(
	foreign key (IdHistoria) references Historia_Clinica(IdHistoria),
    foreign key (IdOrden) references Orden(IdOrden),
	foreign key (IdVeterinario) references Persona(Cedula),
    foreign key (IdHistorialVacunas) references Historial_Vacunas(IdHistorialVacunas)
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
