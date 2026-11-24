import pytest
from decimal import Decimal
from rest_framework import status
from rest_framework.test import APIClient
from .models import Product

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def produto_padrao(db):
    return Product.objects.create(
        name="Café Coado Tradicional",
        category="Cafés",
        price=Decimal("4.50"),
        stock=50
    )


# ============================================================
# 1. TESTES DE CAMINHO FELIZ (CRUD)
# ============================================================
@pytest.mark.django_db
class TestProductAPISuccess:

    def test_listar_produtos(self, api_client, produto_padrao):
        """GET /api/products/ - Deve retornar status 200 e lista de produtos"""
        response = api_client.get("/api/products/")
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["name"] == "Café Coado Tradicional"

    def test_criar_produto_valido(self, api_client):
        """POST /api/products/ - Deve cadastrar produto com 201 Created"""
        payload = {
            "name": "Bolo de Fubá",
            "category": "Doces",
            "price": "7.00",
            "stock": 15
        }
        response = api_client.post("/api/products/", payload, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["name"] == payload["name"]
        assert Product.objects.filter(name="Bolo de Fubá").exists()

    def test_atualizar_produto_put(self, api_client, produto_padrao):
        """PUT /api/products/{id}/ - Atualização completa"""
        payload = {
            "name": "Café Coado Orgânico",
            "category": "Cafés",
            "price": "6.00",
            "stock": 40
        }
        url = f"/api/products/{produto_padrao.id}/"
        response = api_client.put(url, payload, format="json")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["name"] == "Café Coado Orgânico"

    def test_atualizar_produto_patch(self, api_client, produto_padrao):
        """PATCH /api/products/{id}/ - Atualização parcial"""
        payload = {"price": "5.20"}
        url = f"/api/products/{produto_padrao.id}/"
        response = api_client.patch(url, payload, format="json")
        assert response.status_code == status.HTTP_200_OK
        assert Decimal(response.data["price"]) == Decimal("5.20")
        assert response.data["name"] == produto_padrao.name

    def test_deletar_produto(self, api_client, produto_padrao):
        """DELETE /api/products/{id}/ - Deleção de registro"""
        url = f"/api/products/{produto_padrao.id}/"
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Product.objects.filter(id=produto_padrao.id).exists()


# ============================================================
# 2. TESTES DE EXCEÇÃO E VALIDAÇÕES DE NEGÓCIO (Limites/Regras)
# ============================================================
@pytest.mark.django_db
class TestProductAPIValidations:

    def test_preco_zero_ou_negativo_invalido(self, api_client):
        """POST /api/products/ - RN-01: Preço deve ser >= 0.01"""
        payload = {
            "name": "Café Inválido",
            "category": "Cafés",
            "price": "0.00",
            "stock": 10
        }
        response = api_client.post("/api/products/", payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "price" in response.data

    def test_estoque_negativo_invalido(self, api_client):
        """POST /api/products/ - RN-02: Estoque não pode ser negativo (< 0)"""
        payload = {
            "name": "Café Estoque Negativo",
            "category": "Cafés",
            "price": "5.00",
            "stock": -1
        }
        response = api_client.post("/api/products/", payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "stock" in response.data

    def test_nome_excedendo_limite_caracteres(self, api_client):
        """POST /api/products/ - RN-03: Nome com mais de 100 caracteres"""
        payload = {
            "name": "A" * 101,
            "category": "Cafés",
            "price": "5.00",
            "stock": 10
        }
        response = api_client.post("/api/products/", payload, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "name" in response.data

    def test_produto_inexistente_retorna_404(self, api_client):
        """GET /api/products/999/ - ID inexistente deve retornar 404"""
        response = api_client.get("/api/products/999/")
        assert response.status_code == status.HTTP_404_NOT_FOUND
