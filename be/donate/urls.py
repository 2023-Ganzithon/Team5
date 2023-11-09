from rest_framework import routers
from .views import DonatePostViewSet

router = routers.SimpleRouter()
router.register("donate", DonatePostViewSet)

urlpatterns = router.urls
