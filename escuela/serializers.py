from rest_framework import serializers
from .models import *



class AlumnoPostSerializer(serializers.ModelSerializer):

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


# class CursoDeleteSerializer(serializers.ModelSerializer):

#     class Meta:
#         model: Curso
#         fields: '__all__'      

#     def validate(self, data):
#         inscripciones = Inscripcion.objects.filter(curso_id=data["id"])
#         if len(inscripciones) > 0:
#             raise serializers.ValidationError("Existen inscripciones.")
#         return data 


class InscripcionSerializer(serializers.ModelSerializer):
    curso = CursoSerializer(read_only=True, many=False)

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
    docente = serializers.PrimaryKeyRelatedField(queryset=Docente.objects.all())
    
    class Meta:
        model = Materia
        fields = '__all__'

class CalificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion
        fields = '__all__'


class AlumnoSerializer(serializers.ModelSerializer):
    inscripciones = InscripcionSerializer(read_only=True, many=True)

    class Meta:
        model = Alumno
        fields = '__all__'
