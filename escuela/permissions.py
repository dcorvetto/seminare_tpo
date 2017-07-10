from rest_framework import permissions

class IsSurvey(permissions.BasePermission):


    def has_object_permission(self, request, view, obj):

        if request.method == 'DELETE' and obj.survey:
            return False


        return True
