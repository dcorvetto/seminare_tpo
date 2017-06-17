from .api import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'alumnos', AlumnoViewSet)
router.register(r'docentes', DocenteViewSet)
router.register(r'materias', MateriaViewSet)
router.register(r'calificaciones', CalificacionViewSet)
router.register(r'planes', PlanViewSet)
router.register(r'cursos', CursoViewSet)
router.register(r'inscripciones', InscripcionViewSet)

urlpatterns = router.urls