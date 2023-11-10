from rest_framework import serializers
from .models import Donate
from users.serializers import ProfileSerializer


class DonatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donate
        fields = ("profile", "price")
