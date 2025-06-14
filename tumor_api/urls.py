from django.urls import path
from .views import (
    PatientListView,
    PatientDetailView,
    MediaUploadView,
    MediaDownloadView,
    ImageSeriesUploadView,
    ImageSeriesDownloadView,
    PatientAIReportView,
    AddToTumorBoardView,
    AddMessageView,
    PhysicianNotesView
)

urlpatterns = [
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('patients/<int:patient_id>/', PatientDetailView.as_view(), name='patient-detail'),
    path('patients/<int:patient_id>/ai-report/', PatientAIReportView.as_view(), name='patient-ai-report'),
    path('patients/<int:patient_id>/add_to_tumor_board/', AddToTumorBoardView.as_view(), name='add-to-tumor-board'),
    path('patients/<int:patient_id>/messages/add/', AddMessageView.as_view(), name='add-message'),
    path('patients/<int:patient_id>/notes/', PhysicianNotesView.as_view(), name='physician-notes'),
    path('media/upload/', MediaUploadView.as_view(), name='media-upload'),
    path('media/download/<int:pk>/', MediaDownloadView.as_view(), name='media-download'),
    path('series/upload/', ImageSeriesUploadView.as_view(), name='series-upload'),
    path('series/download/<int:pk>/', ImageSeriesDownloadView.as_view(), name='series-download'),
]