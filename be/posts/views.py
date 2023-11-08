from rest_framework import viewsets
from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer
from .permissions import CustomReadOnly
from users.models import Profile

from django_filters.rest_framework import DjangoFilterBackend


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [CustomReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["shoppingmall", "star"]

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return PostSerializer
        return PostCreateSerializer

    def perform_create(self, serializer):
        # Get the current user's profile
        profile = Profile.objects.get(user=self.request.user)

        # Set the author and profile for the post
        serializer.save(author=self.request.user, profile=profile)

        # point 가산 로직
        # profile.point += 10
        # profile.save()

        # return redirect('')
