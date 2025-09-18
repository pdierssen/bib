from rest_framework.decorators import action
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
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookSerializer

    def list(self, request, *args, **kwargs):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

class LendingViewSet(viewsets.ModelViewSet):
    queryset = Lending.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action != 'destroy':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'create':
            return LendingCreateSerializer
        return LendingSerializer

    def list(self, request, *args, **kwargs):
        user = self.request.user
        lendings = Lending.objects.filter(
            user=user
        )
        serializer = LendingSerializer(lendings, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"])
    def return_by_nfc(self, request):
        user = self.request.user
        nfc_id = request.data.get("book")
        if not nfc_id:
            return Response({"error": "nfc_id required"}, status=status.HTTP_400_BAD_REQUEST)

        lending = Lending.objects.filter(
            book=nfc_id,
            user=user
        )
        if not lending:
            return Response({"error": "You have not borrowed this book"}, status=status.HTTP_404_NOT_FOUND)
        lending.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

