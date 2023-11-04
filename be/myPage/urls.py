from django.urls import path, include
from . import views
from .views import DonationRegisterView

urlpatterns =[
   path('myPage/', DonationRegisterView.as_view(), name="donationRegister"), 
]