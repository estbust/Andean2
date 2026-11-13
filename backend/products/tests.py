from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from products.models import Category, Product


class ProductAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(
            name="Anillos",
            name_en="Rings",
            slug="anillos"
        )
        self.product1 = Product.objects.create(
            name="Anillo en punta",
            name_en="Chevron Ring",
            description="Anillo con forma semi triangular con marquecitas, en talla 19",
            description_en="Semi-triangular ring adorned with marcasites, size 19",
            price=90.00,
            currency="PEN",
            category=self.category,
            image="products/chevron-ring.png",
            is_featured=False,
            is_active=True
        )
        self.product2 = Product.objects.create(
            name="Anillo de serpiente",
            name_en="Snake Ring",
            description="Anillo en forma de serpiente en plata quemada con marquecitas, en talla 19",
            description_en="Oxidized silver serpent ring embellished with marcasites, size 19",
            price=190.00,
            currency="PEN",
            category=self.category,
            image="products/snake-ring.png",
            is_featured=True,
            is_active=True
        )
        self.inactive_product = Product.objects.create(
            name="Anillo inactivo",
            name_en="Inactive Ring",
            description="No visible",
            description_en="Not visible",
            price=50.00,
            currency="PEN",
            category=self.category,
            is_featured=False,
            is_active=False
        )

    def test_list_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Inactive product should NOT be in the response
        self.assertEqual(len(response.data), 2)
        # Check image URL is absolute
        first_product = response.data[0]
        self.assertTrue(first_product['image'].startswith('http://testserver/media/products/'))

    def test_retrieve_product_by_slug(self):
        response = self.client.get(f'/api/products/{self.product1.slug}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Anillo en punta")
        self.assertEqual(response.data['category']['slug'], "anillos")

    def test_filter_by_category(self):
        response = self.client.get('/api/products/?category=anillos')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        # Non-existing category slug returns empty list
        response_empty = self.client.get('/api/products/?category=collares')
        self.assertEqual(response_empty.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_empty.data), 0)

    def test_filter_by_featured(self):
        response = self.client.get('/api/products/?featured=true')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['slug'], self.product2.slug)

    def test_list_categories(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['slug'], "anillos")

    def test_auto_slug_generation(self):
        p = Product.objects.create(
            name="Nuevo Anillo Exclusivo",
            name_en="New Exclusive Ring",
            description="Desc",
            description_en="Desc EN",
            price=150.00,
            category=self.category
        )
        self.assertEqual(p.slug, "nuevo-anillo-exclusivo")
