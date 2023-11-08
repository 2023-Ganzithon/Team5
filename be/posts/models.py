from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from users.models import Profile


# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True)
    shoppingmall = models.CharField(max_length=128)
    title = models.CharField(max_length=128)
    body = models.TextField()
    image = models.ImageField(upload_to="post/", default="default.png")
    published_date = models.DateTimeField(default=timezone.now)
    star = models.IntegerField(default=5)
