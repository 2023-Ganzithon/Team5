from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from users.models import Profile


# Create your models here.
class Donate(models.Model):
    donator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="donate")
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True)
    donation = models.CharField(max_length=128)
    price = models.IntegerField(verbose_name="기부 금액")
    date = models.DateTimeField(default=timezone.now)
