from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer, PostCreateSerializer
from .permissions import CustomReadOnly
from users.models import Profile


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = [CustomReadOnly]

    def get_serializer_class(self):
        if self.action == "list" or "retrieve":
            return PostSerializer
        return PostCreateSerializer

    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        serializer.save(author=self.request.user, profile=profile)
