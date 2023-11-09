from rest_framework import serializers
from .models import Donate
from users.serializers import ProfileSerializer


class DonateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = Donate
        fields = (
            "pk",
            "profile",
            "donation",
            "price",
            "date",
        )


class DonatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donate
        fields = ("price", "donation")
