from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from contact.models import ContactMessage


class ContactAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_contact_message_success(self):
        payload = {
            "name": "Maria Morales",
            "email": "maria@example.com",
            "message": "Hola, me gustaría consultar por envíos internacionales de los anillos."
        }
        response = self.client.post('/api/contact/', data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        msg = ContactMessage.objects.first()
        self.assertEqual(msg.name, "Maria Morales")
        self.assertEqual(msg.email, "maria@example.com")
        self.assertFalse(msg.is_read)

    def test_create_contact_message_invalid_email(self):
        payload = {
            "name": "Maria Morales",
            "email": "not-an-email",
            "message": "Mensaje de prueba"
        }
        response = self.client.post('/api/contact/', data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_create_contact_message_empty_fields(self):
        payload = {
            "name": "   ",
            "email": "test@example.com",
            "message": ""
        }
        response = self.client.post('/api/contact/', data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_contact_get_not_allowed(self):
        response = self.client.get('/api/contact/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_create_contact_message_strips_html_tags(self):
        payload = {
            "name": "<b>Maria Morales</b>",
            "email": "maria@example.com",
            "message": "<p>Hola <strong>amigos</strong>!</p>"
        }
        response = self.client.post('/api/contact/', data=payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        msg = ContactMessage.objects.first()
        self.assertEqual(msg.name, "Maria Morales")
        self.assertEqual(msg.message, "Hola amigos!")

    def test_create_contact_message_html_only_empty(self):
        payload = {
            "name": "<p>   </p>",
            "email": "maria@example.com",
            "message": "<div></div>"
        }
        response = self.client.post('/api/contact/', data=payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)
        self.assertIn('message', response.data)
