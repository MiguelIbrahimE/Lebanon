from django.contrib import admin
from django.urls import path
from tourism.views import get_destinations

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/destinations/', get_destinations, name='get_destinations'),
]
