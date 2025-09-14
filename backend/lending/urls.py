from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'books', views.BookViewSet, basename='books')
router.register(r'lendings', views.LendingViewSet, basename='lendings')
urlpatterns = [
    path('', include(router.urls)),
    path('health/', views.HealthCheckView.as_view(), name='health-check'),
]