from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = "eruces" #secure

    class Meta:
        model = User
        fields = ['nfc_id', 'first_name', 'last_name']

    def validate(self, attrs=None):
        if attrs is None:
            raise serializers.ValidationError({"IS none"})
        if attrs['nfc_id'] is None:
            raise serializers.ValidationError({"NFC is none"})

        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'nfc_id']