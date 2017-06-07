from django.db import models


# Create your models here.
class Provincia(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Alumno(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    numero_doc = models.CharField(max_length=15)
    TIPOS_DOC = (
        ('DNI', 'Documento Nacional de Identidad'),
        ('LE', 'Libreta de enrolamiento'),
        ('PS', 'Pasaporte')
    )
    tipo_doc = models.CharField(max_length=3, choices=TIPOS_DOC)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=12)
    domicilio = models.CharField(max_length=50)
    cp = models.CharField(max_length=8)
    localidad = models.CharField(max_length=50)
    provincia = models.ForeignKey(Provincia)
    anio_ingreeo = models.CharField(max_length=8)
    libro_matriz = models.CharField(max_length=40)
    anio_egreso = models.IntegerField(max_length=8)
    GENEROS = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro')
    )
    genero = models.CharField(max_length=1, choices=GENEROS)
    observaciones = models.TextField()
    escuela_origen = models.CharField(max_length=40)
    cooperadora_paga = models.BooleanField()
    celular = models.CharField(max_length=12)
    lugar_nacimiento = models.CharField(max_length=40)
    tipo_escuela_origen = models.CharField(max_length=40) #TODO: agregar choices
    pais = models.CharField(max_length=40)
    partida_nacimiento = models.BooleanField()
    fotocopia_dni = models.BooleanField()
    certificado_estudios = models.BooleanField()

    def __str__(self):
        return self.nombre


class Plan(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class Curso(models.Model):
    anio_lectivo = models.IntegerField(null=True, blank=True)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name="cursos")

    def __str__(self):
        return self.anio_lectivo.__str__()


class Inscripcion(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, related_name="inscripciones")
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="inscripciones")
    estado = models.CharField(max_length=4) # TODO: agregar choices
    estado_pase = models.CharField(max_length=4) # TODO: agregar choices


class Materia(models.Model):
    nombre = models.CharField(max_length=50)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name="materias")
    horas = models.IntegerField(max_length=8)
    activa = models.BooleanField()

    def __str__(self):
        return self.nombre


class Docente(models.Model):
    materias = models.ManyToManyField('Materia', blank=True, related_name="docentes")
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    numero_doc = models.CharField(max_length=15)
    TIPOS_DOC = (
        ('DNI', 'Documento Nacional de Identidad'),
        ('LE', 'Libreta de enrolamiento'),
        ('PS', 'Pasaporte')
    )
    tipo_doc = models.CharField(max_length=3, choices=TIPOS_DOC)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=12)
    domicilio = models.CharField(max_length=50)
    cp = models.CharField(max_length=8)
    localidad = models.CharField(max_length=50)
    provincia = models.ForeignKey(Provincia)
    fecha_ingreso = models.DateField()
    fecha_egreso = models.DateField()
    libro_matriz = models.CharField(max_length=40)
    anio_egreso = models.IntegerField(max_length=8)
    GENEROS = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro')
    )
    genero = models.CharField(max_length=1, choices=GENEROS)
    activo = models.BooleanField()
    licencia = models.BooleanField()
    baja = models.BooleanField()
    calificacion = models.CharField(max_length=40)

    def __str__(self):
        return self.nombre


class Calificacion(models.Model):
    nota = models.FloatField(default=1)
    fecha = models.DateField()
    tipo = models.CharField(max_length=4) #TODO: agregar choices
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, related_name="calificaciones")
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name="calificaciones")
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="calificaciones")
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE, related_name="calificaciones")

    def __str__(self):
        return self.nota.__str__()
