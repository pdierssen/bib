from django.db import models
import uuid
from django.contrib.auth import get_user_model

User = get_user_model()

class Author(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Publisher(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(models.Model):
    nfc_id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=200)
    authors = models.ManyToManyField(Author)
    isbn = models.CharField(max_length=30)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    edition = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Lending(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()


    def __str__(self):
        return self.user.__str__() + " " + self.book.__str__()