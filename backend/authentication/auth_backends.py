from .models import User
from django.contrib.auth.backends import BaseBackend

class NFCAuthenticationBackend(BaseBackend):
    def authenticate(self, request, nfc_id=None, password= None, **kwargs):
        if nfc_id:
            try:
                user = User.objects.get(nfc_id=nfc_id)
                return user
            except User.DoesNotExist:
                return None
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

#    def has_perm(self, user, perm, obj=None):
from datetime import timedelta
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class ExpiringTokenAuthentication(TokenAuthentication):
    """
    TokenAuthentication that expires after 10 minutes.
    """
    token_ttl = timedelta(minutes=10)

    def authenticate_credentials(self, key):
        user, token = super().authenticate_credentials(key)
        print(token.created)
        if timezone.now() - token.created > self.token_ttl:
            raise AuthenticationFailed("Token has expired")

        return (user, token)
