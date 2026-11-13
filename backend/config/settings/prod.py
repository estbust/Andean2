"""
Production settings for Andean Morphia Jewelry backend.
"""
import os
from .base import *

DEBUG = False

# Allowed hosts: inherits localhost, 127.0.0.1, .onrender.com from base.py
# and extends with ALLOWED_HOSTS env var or default production domains.
if os.environ.get('ALLOWED_HOSTS'):
    ALLOWED_HOSTS = list(dict.fromkeys(
        ALLOWED_HOSTS + [
            host.strip()
            for host in os.environ.get('ALLOWED_HOSTS').split(',')
            if host.strip()
        ]
    ))
else:
    ALLOWED_HOSTS = list(dict.fromkeys(
        ALLOWED_HOSTS + ['andeanmorphia.com', 'www.andeanmorphia.com']
    ))

# Database configuration:
# Inherits DATABASE_URL from base.py (using dj_database_url.parse()).
# Optional fallback if DB_NAME is set without DATABASE_URL:
if not os.environ.get('DATABASE_URL') and os.environ.get('DB_NAME'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get('DB_NAME', 'andean_morphia'),
            'USER': os.environ.get('DB_USER', 'andean_user'),
            'PASSWORD': os.environ.get('DB_PASSWORD', ''),
            'HOST': os.environ.get('DB_HOST', 'localhost'),
            'PORT': os.environ.get('DB_PORT', '5432'),
        }
    }

# CORS settings for production (inherits base origins and extends with environment variable)
if os.environ.get('CORS_ALLOWED_ORIGINS'):
    CORS_ALLOWED_ORIGINS = list(dict.fromkeys(
        CORS_ALLOWED_ORIGINS + [
            origin.strip()
            for origin in os.environ.get('CORS_ALLOWED_ORIGINS').split(',')
            if origin.strip()
        ]
    ))

# Security headers for production
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
