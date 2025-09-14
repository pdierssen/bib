from django.db import models
import uuid
from django.contrib.auth import get_user_model

User = get_user_model()

class Author(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Publisher(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    nfc_id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author)
    isbn = models.CharField(max_length=100)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    edition = models.CharField(max_length=100)

class Lending(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()