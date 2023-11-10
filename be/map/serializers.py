from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Park


class ParkSerializer(ModelSerializer):
    class Meta:
        model = Park
        fields = "__all__"
