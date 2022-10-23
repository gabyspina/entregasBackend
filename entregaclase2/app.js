class Usuario {
	constructor(nombre, apellido, libros, mascotas) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas;
	}

	getFullName() {
		return `El nombre completo es ${this.nombre} ${this.apellido}`;
	}

	addMascota = (mascota) => {
		this.mascotas.push(mascota);
		console.log('mascota agragada:', mascota);
	};
	countMascotas() {
		console.log('cantidad de mascotas : ', this.mascotas.length);
	}
	addBook(nombre, autor) {
		this.libros.push({ nombre, autor });
		console.log(`El libro agregado es ${nombre} del autor ${autor}`);
	}
	getBookNames() {
		this.libros.forEach((item) => {
			console.log(`${item.nombre}`);
		});
	}
}

let user1 = new Usuario(
	'Gabriel',
	'Spina',
	[
		{
			nombre: 'Harry Potter y la piedra filosofal',
			autor: 'J.K. Rowling',
		},
		{
			nombre: 'El padrino',
			autor: 'Mario Puzzo',
		},
	],
	['perro', 'gato', 'pez']
);

console.log(user1.getFullName());

user1.addBook('libro 1', 'autor 1');
console.log(user1.libros);

user1.addMascota('tiuron');
console.log('Las mascotas son: ', user1.mascotas);

user1.countMascotas();
