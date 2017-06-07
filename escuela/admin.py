from django.contrib import admin

# Register your models here.
from escuela.models import Alumno, Docente, Calificacion, Curso, Inscripcion, Materia, Plan

admin.site.register(Alumno)
admin.site.register(Docente)
admin.site.register(Calificacion)
admin.site.register(Curso)
admin.site.register(Inscripcion)
admin.site.register(Materia)
admin.site.register(Plan)
