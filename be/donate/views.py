from .serializers import DonatePostSerializer
from myPage.serializers import DonationSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from myPage.models import Donation
from users.models import Profile


class DonatePostView(APIView):
    def post(self, request):
        serializer = DonatePostSerializer(data=request.data)
        profile = Profile.objects.get(user=self.request.user)

        if serializer.is_valid():
            serializer.save(donator=self.request.user, profile=profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DonationReadView(APIView):
    def get(self, request):
        donations = Donation.objects.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
