from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

urlpatterns = [
    path('login/', login_user, name='login_user'),
    # path('register/', register, name='register'),
    # path('retrieve/', retrieve, name='retrieve'),

    # Users
    path('users/', get_users, name='get_users'),
    path('users/create/', create_user, name='create_user'),
    path('users/<int:user_id>/', user_info, name='user_info'),

    # Courses
    path('courses/', get_courses, name='get_courses'),
    path('courses/create/', create_course, name='create_course'),
    path('courses/<int:course_id>/', course_info, name='course_info'),

    # Applications
    path('applications/', get_applications, name='get_applications'),
    path('applications/create/', create_application, name='create_application'),
    path('applications/<int:application_id>/', application_info, name='application_info'),
    path('applications/<int:application_id>/select-ta/', select_ta, name='select_ta'),  # Added endpoint

    # Assignments
    path('assignments/', get_assignments, name='get_assignments'),
    path('assignments/create/', create_assignment, name='create_assignment'),
    path('assignments/<int:user_id>/', assignment_info, name='assignment_info'),

    # Notifications
    path('notifications/', get_notifications, name='get_notifications'),
    path('notifications/create/', create_notification, name='create_notification'),
    path('notifications/<int:user_id>/', notification_info, name='notification_info'),

    # Reviews
    path('reviews/', get_reviews, name='get_reviews'),
    path('reviews/create/', create_review, name='create_review'),
    path('reviews/<int:user_id>/', review_info, name='review_info'),
]
