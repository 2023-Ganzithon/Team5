from rest_framework import serializers
from .models import Donate


class DonatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donate
        fields = ("price", "donation")
