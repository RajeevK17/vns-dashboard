
from django.urls import path
from . import views
urlpatterns = [
    path('', views.BASE, name='BASE'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('login_trails/', views.login_trails, name='login_trails'),
    path('activity/', views.activity, name='activity'),
    path('security/', views.security, name='security'), #change password
    path('rate_plan/', views.rate_plan, name='rate_plan'),
    path('edit_profile/', views.edit_profile, name='edit_profile')
]
