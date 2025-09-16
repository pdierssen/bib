import datetime

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


def validate_lending_enty(self, data):
    book_nfc_id = data.get('book')

    lending_entry_with_same_book = Lending.objects.filter(
        book=book_nfc_id
    )
    if lending_entry_with_same_book.exists():
        raise serializers.ValidationError("This Book is already taken.")

    return data


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
        fields = ['book']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['start_date'] = datetime.date.today()
        deltatime = datetime.timedelta(days=30)
        validated_data['end_date'] = datetime.date.today() + deltatime
        return super().create(validated_data)

    def validate(self, data):
        return validate_lending_enty(self, data)