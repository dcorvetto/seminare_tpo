from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *

class MultiSerializerViewSet(ModelViewSet):
    serializers = {
        'default': None,
    }

    def get_serializer_class(self):
            return self.serializers.get(self.action,
                        self.serializers['default'])

class AlumnoViewSet(ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer


class CursoViewSet(MultiSerializerViewSet):
    queryset = Curso.objects.all()
    serializers = {
        'default':    CursoSerializer,
        'create':  CursoPostSerializer,
        'retrieve': CursoPostSerializer,
        'update': CursoPostSerializer
    }


    def get_queryset(self):
        queryset = Curso.objects.all()
        plan_id = self.request.query_params.get('planId', None)
        curso_nombre = self.request.query_params.get('cursoNombre', None)

        if curso_nombre is not None:
            queryset = queryset.filter(nombre__contains=curso_nombre)
        if plan_id is not None:
            queryset = queryset.filter(plan_id=plan_id)
        return queryset


class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class MateriaViewSet(MultiSerializerViewSet):
    queryset = Materia.objects.all()
    serializers = {
        'default':    MateriaSerializer,
        'create':  MateriaPostSerializer,
        'retrieve': MateriaPostSerializer,
        'update': MateriaPostSerializer
    }


    def get_queryset(self):
        queryset = Materia.objects.all()
        plan_id = self.request.query_params.get('planId', None)
        curso_nombre = self.request.query_params.get('cursoNombre', None)

        if curso_nombre is not None:
            queryset = queryset.filter(nombre__contains=curso_nombre)
        if plan_id is not None:
            queryset = queryset.filter(plan_id=plan_id)
        return queryset


class InscripcionViewSet(ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer


class DocenteViewSet(ModelViewSet):
    queryset = Docente.objects.all()
    serializer_class = DocenteSerializer


class CalificacionViewSet(ModelViewSet):
    queryset = Calificacion.objects.all()
    serializer_class = CalificacionSerializer
