from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, nfc_id, password=None, **extra_fields):
        if not nfc_id:
            raise ValueError('Users must have nfc_id')
        user = self.model(nfc_id=nfc_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, nfc_id, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser muss is_staff=True haben.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser muss is_superuser=True haben.')

        return self.create_user(nfc_id, password, **extra_fields)

class User(AbstractUser):
    username = None # see initial migration
    email = None
    nfc_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'nfc_id'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.first_name + " " + self.last_name