from rest_framework.serializers import ModelSerializer
from . import models

class DonationSerializer(ModelSerializer):
    class Meta:
        model = models.Donation
        fields = '__all__'

