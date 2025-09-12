from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
#router.register('healt-check/', views.HealthCheckView, basename='healt-check')

urlpatterns = [
    path('', include(router.urls)),
    path('health/', views.HealthCheckView.as_view(), name='health-check'),
]