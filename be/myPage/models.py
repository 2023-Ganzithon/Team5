from django.db import models

GROUP = (
    ('개인', '개인'),
    ('자선단체', '자선단체'),
)

# Create your models here.
class Donation(models.Model):
    image = models.ImageField(verbose_name="기부처 사진", blank=False, null=False, upload_to="donation_images/")
    group = models.CharField(verbose_name="그룹설정", choices=GROUP, default='개인', max_length=10)
    title = models.CharField(verbose_name="제목", max_length=128)
    comment = models.TextField(verbose_name="한줄 소개")
    goal = models.IntegerField(verbose_name="목표 금액")

    def __str__(self):
        return self.comment