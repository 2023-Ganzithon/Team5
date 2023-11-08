from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    nickname = models.CharField(max_length=128)
    image = models.ImageField(upload_to="profile/", default="default.png")
    points = models.IntegerField(default=0)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # 여기에서 기본 닉네임을 자동으로 생성합니다
        기본_닉네임 = f"유저{instance.id}"
        Profile.objects.create(user=instance, nickname=기본_닉네임)
