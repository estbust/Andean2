"""
Development settings for Andean Morphia Jewelry backend.
"""
from .base import *

DEBUG = True

# Inherit base ALLOWED_HOSTS and add 0.0.0.0 for local container/network testing
ALLOWED_HOSTS = list(dict.fromkeys(ALLOWED_HOSTS + ['0.0.0.0']))

# DATABASES is inherited from base.py (SQLite by default, or DATABASE_URL if defined)

# CORS settings for development (extends base origins)
CORS_ALLOWED_ORIGINS = list(dict.fromkeys(CORS_ALLOWED_ORIGINS + [
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]))

CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^http://(localhost|127\.0\.0\.1):517\d$",
]

CORS_ALLOW_CREDENTIALS = True

# Media storage: fallback to local FileSystemStorage in development / tests if Cloudinary is not configured
if not (os.environ.get('CLOUDINARY_URL') or os.environ.get('CLOUDINARY_CLOUD_NAME')):
    DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
    STORAGES = {
        **STORAGES,
        'default': {
            'BACKEND': 'django.core.files.storage.FileSystemStorage',
        },
    }
