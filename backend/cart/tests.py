from decimal import Decimal
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from products.models import Category, Product
from cart.models import Cart, CartItem


class CartTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(
            name="Collares",
            name_en="Necklaces",
            slug="collares"
        )
        self.product1 = Product.objects.create(
            name="Collar de Plata Andina",
            name_en="Andean Silver Necklace",
            description="Hermoso collar artesanal",
            description_en="Beautiful handmade necklace",
            price=Decimal('120.00'),
            currency="PEN",
            category=self.category,
            is_active=True
        )
        self.product2 = Product.objects.create(
            name="Aretes Filigrana",
            name_en="Filigree Earrings",
            description="Aretes finos de filigrana",
            description_en="Fine filigree earrings",
            price=Decimal('75.50'),
            currency="PEN",
            category=self.category,
            is_active=True
        )
        self.inactive_product = Product.objects.create(
            name="Producto Inactivo",
            name_en="Inactive Product",
            description="No disponible",
            description_en="Not available",
            price=Decimal('50.00'),
            category=self.category,
            is_active=False
        )
        self.session_key = "test-session-12345"

    def test_create_cart_and_add_item(self):
        """
        Test creating a cart and adding a single item via POST /api/cart/add/.
        """
        response = self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 1},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['session_key'], self.session_key)
        self.assertEqual(response.data['total_items'], 1)
        self.assertEqual(Decimal(str(response.data['total'])), Decimal('120.00'))
        self.assertEqual(len(response.data['items']), 1)
        
        item_data = response.data['items'][0]
        self.assertEqual(item_data['product']['id'], self.product1.id)
        self.assertEqual(item_data['quantity'], 1)
        self.assertEqual(Decimal(str(item_data['subtotal'])), Decimal('120.00'))

        # Verify database state
        cart = Cart.objects.get(session_key=self.session_key)
        self.assertEqual(cart.items.count(), 1)
        self.assertEqual(cart.total_items, 1)

    def test_add_same_product_twice_increments_quantity(self):
        """
        Adding the same product multiple times should increment quantity without creating duplicate rows.
        """
        # First add: 2 units
        self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 2},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        # Second add: 3 units
        response = self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 3},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_items'], 5)
        self.assertEqual(Decimal(str(response.data['total'])), Decimal('600.00'))
        self.assertEqual(len(response.data['items']), 1)

        item_data = response.data['items'][0]
        self.assertEqual(item_data['quantity'], 5)
        self.assertEqual(Decimal(str(item_data['subtotal'])), Decimal('600.00'))

        # Ensure only 1 database row exists for this cart and product
        cart = Cart.objects.get(session_key=self.session_key)
        self.assertEqual(cart.items.count(), 1)
        self.assertEqual(CartItem.objects.filter(cart=cart, product=self.product1).count(), 1)

    def test_remove_item_from_cart(self):
        """
        Test deleting an item from the cart via DELETE /api/cart/remove/<item_id>/.
        """
        # Add two different products
        self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 1},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        response_add2 = self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product2.id, 'quantity': 2},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(len(response_add2.data['items']), 2)

        cart = Cart.objects.get(session_key=self.session_key)
        item_to_remove = cart.items.get(product=self.product1)

        # Remove product1 item
        response_remove = self.client.delete(
            f'/api/cart/remove/{item_to_remove.id}/',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(response_remove.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_remove.data['items']), 1)
        self.assertEqual(response_remove.data['total_items'], 2)
        self.assertEqual(Decimal(str(response_remove.data['total'])), Decimal('151.00'))

        # Check DB
        self.assertFalse(CartItem.objects.filter(id=item_to_remove.id).exists())
        self.assertEqual(cart.items.count(), 1)

    def test_calculate_total_and_subtotal(self):
        """
        Test subtotal and total properties on models and serializer representation.
        product1: 120.00 x 2 = 240.00
        product2: 75.50 x 3 = 226.50
        Total: 466.50
        """
        cart = Cart.objects.create(session_key="calc-session")
        item1 = CartItem.objects.create(cart=cart, product=self.product1, quantity=2)
        item2 = CartItem.objects.create(cart=cart, product=self.product2, quantity=3)

        self.assertEqual(item1.subtotal, Decimal('240.00'))
        self.assertEqual(item2.subtotal, Decimal('226.50'))
        self.assertEqual(cart.total, Decimal('466.50'))
        self.assertEqual(cart.total_items, 5)

        # Verify via GET /api/cart/
        response = self.client.get('/api/cart/', HTTP_X_SESSION_KEY="calc-session")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Decimal(str(response.data['total'])), Decimal('466.50'))
        self.assertEqual(response.data['total_items'], 5)

    def test_update_item_quantity(self):
        """
        Test updating item quantity via PATCH /api/cart/update/<item_id>/.
        """
        add_res = self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 1},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        item_id = add_res.data['items'][0]['id']

        response = self.client.patch(
            f'/api/cart/update/{item_id}/',
            data={'quantity': 4},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_items'], 4)
        self.assertEqual(Decimal(str(response.data['total'])), Decimal('480.00'))
        self.assertEqual(response.data['items'][0]['quantity'], 4)

    def test_clear_cart(self):
        """
        Test clearing the entire cart via DELETE /api/cart/clear/.
        """
        self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 2},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product2.id, 'quantity': 1},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )

        response = self.client.delete('/api/cart/clear/', HTTP_X_SESSION_KEY=self.session_key)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_items'], 0)
        self.assertEqual(Decimal(str(response.data['total'])), Decimal('0.00'))
        self.assertEqual(len(response.data['items']), 0)

        cart = Cart.objects.get(session_key=self.session_key)
        self.assertEqual(cart.items.count(), 0)

    def test_cart_isolation_prevents_unauthorized_access(self):
        """
        Test that a visitor cannot update or remove items belonging to another visitor's cart.
        """
        # User A cart
        res_a = self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 1},
            format='json',
            HTTP_X_SESSION_KEY="user-a-session"
        )
        item_a_id = res_a.data['items'][0]['id']

        # User B attempts to update User A's item
        update_res = self.client.patch(
            f'/api/cart/update/{item_a_id}/',
            data={'quantity': 10},
            format='json',
            HTTP_X_SESSION_KEY="user-b-session"
        )
        self.assertEqual(update_res.status_code, status.HTTP_404_NOT_FOUND)

        # User B attempts to delete User A's item
        delete_res = self.client.delete(
            f'/api/cart/remove/{item_a_id}/',
            HTTP_X_SESSION_KEY="user-b-session"
        )
        self.assertEqual(delete_res.status_code, status.HTTP_404_NOT_FOUND)

        # Ensure User A's item remains unchanged
        item_a = CartItem.objects.get(id=item_a_id)
        self.assertEqual(item_a.quantity, 1)

    def test_session_key_via_query_param(self):
        """
        Test that session_key can be passed as a query parameter.
        """
        response = self.client.get('/api/cart/?session_key=custom-query-session')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['session_key'], 'custom-query-session')
        self.assertEqual(response.data['total_items'], 0)

    def test_add_inactive_or_nonexistent_product_validation(self):
        """
        Adding nonexistent or inactive products should fail validation with 400.
        """
        # Nonexistent product
        res_nonexistent = self.client.post(
            '/api/cart/add/',
            data={'product_id': 999999, 'quantity': 1},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(res_nonexistent.status_code, status.HTTP_400_BAD_REQUEST)

        # Inactive product
        res_inactive = self.client.post(
            '/api/cart/add/',
            data={'product_id': self.inactive_product.id, 'quantity': 1},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(res_inactive.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_quantity_validation(self):
        """
        Quantity less than 1 should return 400.
        """
        # Add to cart with quantity 0
        res_zero = self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 0},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(res_zero.status_code, status.HTTP_400_BAD_REQUEST)

        # Add initial item
        add_res = self.client.post(
            '/api/cart/add/',
            data={'product_id': self.product1.id, 'quantity': 1},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        item_id = add_res.data['items'][0]['id']

        # Update with negative quantity
        update_res = self.client.patch(
            f'/api/cart/update/{item_id}/',
            data={'quantity': -2},
            format='json',
            HTTP_X_SESSION_KEY=self.session_key
        )
        self.assertEqual(update_res.status_code, status.HTTP_400_BAD_REQUEST)
