from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework import status, generics, permissions

from .models import Book, Lending
from .serializers import BookSerializer, LendingSerializer, LendingCreateSerializer


class HealthCheckView(APIView):
    """
    A simple API view that returns a 200 OK status.
    This is useful for health checks or testing if the API is running.
    """
    def get(self, request, *args, **kwargs):
        # Simply return an empty response with a 200 OK status code.
        return Response(status=status.HTTP_200_OK)

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BookSerializer

    def list(self, request, *args, **kwargs):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

class LendingViewSet(viewsets.ModelViewSet):
    queryset = Lending.objects.all()
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'create':
            return LendingCreateSerializer
        return LendingSerializer

    def list(self, request, *args, **kwargs):
        lendings = Lending.objects.all()
        serializer = LendingSerializer(lendings, many=True)
        return Response(serializer.data)





