from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myPage/', include('myPage.urls')),
    path('map/', include('map.urls')),
]
