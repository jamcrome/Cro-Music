from django.urls import path
from .views import FileUpload, FileList

urlpatterns = [
    path('upload/', FileUpload.as_view(), name='file-upload'),
    path('files/', FileList.as_view(), name='file-list'),
]