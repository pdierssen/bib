from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HealthCheckView(APIView):
    """
    A simple API view that returns a 200 OK status.
    This is useful for health checks or testing if the API is running.
    """
    def get(self, request, *args, **kwargs):
        # Simply return an empty response with a 200 OK status code.
        return Response(status=status.HTTP_200_OK)