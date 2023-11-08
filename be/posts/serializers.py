from rest_framework import serializers
from .models import Post
from users.serializers import ProfileSerializer


class PostSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = Post
        fields = (
            "pk",
            "profile",
            "shoppingmall",
            "title",
            "body",
            "image",
            "published_date",
            "star",
        )


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("shoppingmall", "title", "body", "image", "star")
