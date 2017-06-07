from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *


class AlumnoViewSet(ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer


class CursoViewSet(ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class MateriaViewSet(ModelViewSet):
    queryset = Materia.objects.all()
    serializer_class = MateriaSerializer


class InscripcionViewSet(ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer


class DocenteViewSet(ModelViewSet):
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer



