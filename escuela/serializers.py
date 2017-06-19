from rest_framework import serializers
from .models import *


class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = '__all__'


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'


class CursoSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(read_only=True, many=False)

    class Meta:
        model = Curso
        fields = '__all__'


class CursoPostSerializer(serializers.ModelSerializer):
    plan = serializers.PrimaryKeyRelatedField(queryset=Plan.objects.all())

    class Meta:
        model = Curso
        fields = '__all__'


class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = '__all__'


class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docente
        fields = '__all__'


class MateriaSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(read_only=True, many=False)
    
    class Meta:
        model = Materia
        fields = '__all__'

class MateriaPostSerializer(serializers.ModelSerializer):
    plan = serializers.PrimaryKeyRelatedField(queryset=Plan.objects.all())
    
    class Meta:
        model = Materia
        fields = '__all__'

class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = '__all__'


