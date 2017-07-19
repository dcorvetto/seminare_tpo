from django.db import models
import datetime as dt


# Create your models here.

class Alumno(models.Model):
    nombre = models.CharField(blank=True, null=True, max_length=50)
    apellido = models.CharField(blank=True, null=True, max_length=50)
    numero_doc = models.CharField(max_length=15)
    TIPOS_DOC = (
        ('DNI', 'Documento Nacional de Identidad'),
        ('LE', 'Libreta de enrolamiento'),
        ('PS', 'Pasaporte'),
        ('DE', 'Documento Extranjero')
    )
    tipo_doc = models.CharField(max_length=3, choices=TIPOS_DOC, default=TIPOS_DOC[0][0])
    fecha_nacimiento = models.DateField(blank=True, null=True)
    telefono = models.CharField(blank=True, null=True, max_length=12)
    domicilio = models.CharField(blank=True, null=True, max_length=50)
    cp = models.CharField(blank=True, null=True, max_length=8)
    localidad = models.CharField(blank=True, null=True, max_length=50)
    provincia = models.CharField(blank=True, null=True, max_length=40)
    anio_ingreso = models.CharField(blank=True, null=True, max_length=8)
    numero_folio = models.CharField(blank=True, null=True, max_length=40)
    libro_matriz = models.CharField(blank=True, null=True, max_length=40)
    egreso = models.BooleanField(default=False)
    anio_egreso = models.IntegerField(blank=True, null=True, max_length=8)
    GENEROS = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro')
    )
    genero = models.CharField(blank=True, null=True, max_length=1, choices=GENEROS)
    observaciones = models.TextField(blank=True, null=True)
    escuela_origen = models.CharField(blank=True, null=True, max_length=40)
    cooperadora_paga = models.BooleanField(default=False)
    celular = models.CharField(blank=True, null=True, max_length=12)
    nacionalidad = models.CharField(blank=True, null=True, max_length=40)
    tipo_escuela_origen = models.CharField(blank=True, null=True, max_length=40) #TODO: agregar choices
    pais = models.CharField(blank=True, null=True, max_length=40)
    partida_nacimiento = models.BooleanField(default=False)
    foto = models.BooleanField(default=False)
    fotocopia_dni = models.BooleanField(default=False)
    certificado_estudios = models.BooleanField(default=False)
    abandono = models.BooleanField(default=False)
    anio_abandono = models.IntegerField(blank=True, null=True, max_length=8)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre


class Plan(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Curso(models.Model):
    anio_lectivo = models.IntegerField(null=True, blank=True)
    nombre = models.CharField(max_length=40, unique=True)
    plan = models.ForeignKey(Plan, on_delete=models.PROTECT, related_name="cursos")
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.anio_lectivo.__str__()


class Inscripcion(models.Model):
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, related_name="inscripciones")
    curso = models.ForeignKey(Curso, on_delete=models.PROTECT, related_name="inscripciones")
    estado = models.CharField(blank=True, null=True, max_length=30, default="Confirmada") 
    estado_pase = models.CharField(blank=True, null=True, max_length=30, default="No aplica")


class Docente(models.Model):
    nombre = models.CharField(blank=True, null=True, max_length=50)
    apellido = models.CharField(blank=True, null=True, max_length=50)
    numero_doc = models.CharField(max_length=15)
    TIPOS_DOC = (
        ('DNI', 'Documento Nacional de Identidad'),
        ('LE', 'Libreta de enrolamiento'),
        ('PS', 'Pasaporte')
    )
    tipo_doc = models.CharField(max_length=3, choices=TIPOS_DOC, default=TIPOS_DOC[0][0])
    cuil = models.CharField(blank=True, null=True, max_length=40)
    fecha_nacimiento = models.DateField(blank=True, null=True)
    telefono = models.CharField(blank=True, null=True, max_length=12)
    domicilio = models.CharField(blank=True, null=True, max_length=50)
    cp = models.CharField(blank=True, null=True, max_length=8)
    localidad = models.CharField(blank=True, null=True, max_length=50)
    provincia = models.CharField(blank=True, null=True, max_length=40)
    fecha_ingreso = models.DateField(blank=True, null=True)
    fecha_egreso = models.DateField(blank=True, null=True)
    libro_matriz = models.CharField(blank=True, null=True, max_length=40)
    GENEROS = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro')
    )
    estado = models.CharField(max_length=10, default="activo")
    genero = models.CharField(blank=True, null=True, max_length=1, choices=GENEROS)
    fecha_licencia_desde = models.DateField(blank=True, null=True)
    fecha_licencia_hasta = models.DateField(blank=True, null=True)
    tipo_licencia = models.CharField(max_length=15, blank=True, null=True)
    fecha_suspendido_desde = models.DateField(blank=True, null=True)
    fecha_suspendido_hasta = models.DateField(blank=True, null=True)
    calificacion = models.CharField(blank=True, null=True, max_length=40)

    def __str__(self):
        return self.nombre

class Materia(models.Model):
    nombre = models.CharField(blank=True, null=True, max_length=50)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name="materias")
    horas = models.IntegerField(blank=True, null=True, max_length=8)
    activa = models.BooleanField(default=True)
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE, related_name="materias")

    def __str__(self):
        return self.nombre


class Calificacion(models.Model):
    nota = models.FloatField(default=1)
    fecha = models.DateTimeField(blank=True, null=True, default=dt.datetime.now)
    tipo = models.CharField(blank=True, null=True, max_length=20) 
    alumno = models.ForeignKey(Alumno, on_delete=models.CASCADE, related_name="calificaciones")
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE, related_name="calificaciones")
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="calificaciones")
    docente = models.ForeignKey(Docente, on_delete=models.CASCADE, related_name="calificaciones")

    def __str__(self):
        return self.nota.__str__()

    class Meta:
        unique_together = ("curso","materia","alumno","tipo")
