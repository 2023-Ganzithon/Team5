from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import Profile
from map.models import Park

# Create your models here.
class Donation(models.Model):
    image = models.ImageField(verbose_name="기부처 사진", blank=False, null=False, upload_to="donation_images/")
    group = models.CharField(verbose_name="그룹설정", max_length=20)
    title = models.CharField(verbose_name="제목", max_length=128)
    comment = models.TextField(verbose_name="한줄 소개")
    goal = models.IntegerField(verbose_name="목표 금액")

    def __str__(self):
        return self.comment
    
class MyPoint(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    earnedPoint = models.IntegerField(default=0)  # 얻은 포인트
    donatedPoint = models.IntegerField(default=0) # 기부한 포인트
    pointActivityDate = models.DateTimeField(null=True, blank=True)  # 포인트 활동 날짜
    park = models.ForeignKey(Park, on_delete=models.CASCADE, null=True, blank=True)  # 관련된 공원정보
    # donatedName = models.ForeignKey() # 여긴 기부처이름 아직 모델을 안받아서

    def __str__(self):
        return self.user.username

# user 모델의 토탈 point 실시간 업로드     
@receiver(post_save, sender=MyPoint)
def update_user_points(sender, instance, **kwargs):
    user = instance.user
    earned_points = MyPoint.objects.filter(user=user).aggregate(earned_points=models.Sum('earnedPoint'))['earned_points'] or 0
    donated_points = MyPoint.objects.filter(user=user).aggregate(donated_points=models.Sum('donatedPoint'))['donated_points'] or 0
    total_points = earned_points - donated_points
    user.profile.points = total_points
    user.profile.save()
    




