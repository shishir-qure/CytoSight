"""
File utilities for handling external file server URLs
"""
from django.conf import settings
import os


def get_external_file_url(file_field):
    """
    Generate an external file server URL for a Django FileField.
    
    Args:
        file_field: Django FileField instance
        
    Returns:
        str: External file server URL
    """
    if not file_field or not file_field.name:
        return None
    
    # Get the relative path from the file field
    relative_path = file_field.name
    
    # Get external media URL with fallback
    external_media_url = getattr(settings, 'EXTERNAL_MEDIA_URL', None)
    if not external_media_url:
        # Fallback to constructing from FILE_SERVER_HOST
        file_server_host = getattr(settings, 'FILE_SERVER_HOST', 'http://localhost:3001')
        external_media_url = f"{file_server_host}/"
    
    # Construct the external URL
    external_url = f"{external_media_url}{relative_path}"
    
    return external_url


def get_external_file_urls(file_queryset):
    """
    Generate external file server URLs for a queryset of files.
    
    Args:
        file_queryset: Django queryset containing objects with file fields
        
    Returns:
        list: List of external file server URLs
    """
    urls = []
    for file_obj in file_queryset:
        if hasattr(file_obj, 'file') and file_obj.file:
            url = get_external_file_url(file_obj.file)
            if url:
                urls.append(url)
    
    return urls


def get_file_server_info():
    """
    Get file server configuration information.
    
    Returns:
        dict: File server configuration
    """
    # Get settings with fallbacks
    file_server_host = getattr(settings, 'FILE_SERVER_HOST', 'http://localhost:3001')
    file_server_port = getattr(settings, 'FILE_SERVER_PORT', '3001')
    external_media_url = getattr(settings, 'EXTERNAL_MEDIA_URL', f"{file_server_host}/")
    media_root = getattr(settings, 'MEDIA_ROOT', '/tmp/media')
    
    return {
        'host': file_server_host,
        'port': file_server_port,
        'external_media_url': external_media_url,
        'media_root': str(media_root)
    } 