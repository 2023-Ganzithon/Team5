from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from myPage.models import Donation


# Create your models here.
class Donate(models.Model):
    donator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="donate")
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE)
    price = models.IntegerField(verbose_name="기부 금액")
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = "donate_donate"
