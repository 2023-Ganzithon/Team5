from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime
from map.models import Park
from users.models import Profile


class Donation(models.Model):
    image = models.ImageField(
        verbose_name="기부처 사진", blank=False, null=False, upload_to="donation_images/"
    )
    name = models.CharField(verbose_name="개인/그룹 이름", max_length=20)
    title = models.CharField(verbose_name="제목", max_length=128)
    comment = models.TextField(verbose_name="한줄 소개")
    goal = models.IntegerField(verbose_name="목표 금액")

    def __str__(self):
        return self.comment


class ParkVisitPoint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    park = models.ForeignKey(Park, on_delete=models.CASCADE)
    earnedPoint = models.IntegerField(default=0)
    pointActivityDate = models.DateTimeField(default=datetime.now)


class ShoppingMallReviewPoint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mall = models.CharField(max_length=128)  # 쇼핑몰의 이름을 문자열로 저장
    earnedPoint = models.IntegerField(default=0)
    pointActivityDate = models.DateTimeField(default=datetime.now)


from donate.models import Donate


# 유저의 총 포인트도 실시간 업데이트하는
@receiver(post_save, sender=ParkVisitPoint)
@receiver(post_save, sender=ShoppingMallReviewPoint)
@receiver(post_save, sender=Donate)
def update_user_points(sender, instance, **kwargs):
    user = instance.user
    # 공원 포인트와 쇼핑몰 리뷰 포인트를 모두 가져와서 합침
    park_points = (
        ParkVisitPoint.objects.filter(user=user).aggregate(
            earned_points=models.Sum("earnedPoint")
        )["earned_points"]
        or 0
    )
    mall_points = (
        ShoppingMallReviewPoint.objects.filter(user=user).aggregate(
            earned_points=models.Sum("earnedPoint")
        )["earned_points"]
        or 0
    )
    donation_points = (
        Donate.objects.filter(user=user).aggregate(used_points=models.Sum("price"))[
            "used_points"
        ]
        or 0
    )

    total_points = park_points + mall_points - donation_points
    user.profile.points = total_points
    user.profile.save()
