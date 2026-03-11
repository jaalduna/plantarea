from fastapi import APIRouter

from plantarea.api.products import router as products_router
from plantarea.api.nurseries import router as nurseries_router
from plantarea.api.orders import router as orders_router
from plantarea.api.categories import router as categories_router
from plantarea.api.admin import router as admin_router

api_router = APIRouter(prefix="/api")
api_router.include_router(products_router)
api_router.include_router(nurseries_router)
api_router.include_router(orders_router)
api_router.include_router(categories_router)
api_router.include_router(admin_router)

__all__ = ["api_router"]
