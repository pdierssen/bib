from rest_framework import status, generics, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class RegisterView(generics.GenericAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,) # einheitlich in []
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    queryset = User.objects.all()
    permission_classes = []
    serializer_class = UserRegistrationSerializer # da einen mit readonly?
    def post(self, request):
        nfc_id = request.data.get('nfc_id')
        user = authenticate(nfc_id=nfc_id)
        if user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})

class AuthTestView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Hello {request.user.nfc_id}, you are authenticated!"})