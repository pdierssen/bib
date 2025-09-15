from rest_framework import serializers

from authentication.serializers import UserSerializer
from .models import Author, Publisher, Book, Lending


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    publisher = PublisherSerializer(many=False)

    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        publisher_data = validated_data.pop('publisher')
        publisher, _ = Publisher.objects.get_or_create(
            name=publisher_data.get('name'),
        )
        authors_data = validated_data.pop('authors', [])
        book = Book.objects.create(publisher=publisher, **validated_data)

        author_instances = []
        for author_data in authors_data:
            author, _ = Author.objects.get_or_create(
                name=author_data.get('name'),
            )
            author_instances.append(author)


        book.authors.set(author_instances)
        return book




class LendingSerializer(serializers.ModelSerializer):
    '''For view purposes'''
    user = UserSerializer()
    book = BookSerializer()

    class Meta:
        model = Lending
        fields = '__all__'

class LendingCreateSerializer(serializers.ModelSerializer):
    '''Serializer for creating lending objects'''

    class Meta:
        model = Lending
        fields = ['user', 'book']