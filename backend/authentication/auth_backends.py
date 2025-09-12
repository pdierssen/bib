from .models import User
from django.contrib.auth.backends import BaseBackend

class NFCAuthenticationBackend(BaseBackend):
    def authenticate(self, request, nfc_id=None, **kwargs):
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
