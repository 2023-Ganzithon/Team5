from rest_framework import viewsets
from .models import Donate
from .serializers import DonateSerializer, DonatePostSerializer
from users.models import Profile


class DonatePostViewSet(viewsets.ModelViewSet):
    queryset = Donate.objects.all()

    def get_serializer_class(self):
        if self.action == "list" or "retrieve":
            return DonateSerializer
        return DonatePostSerializer

    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        serializer.save(donator=self.request.user, profile=profile)
