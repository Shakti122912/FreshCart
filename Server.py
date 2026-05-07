<Plan>
- Backend: Products + categories + orders endpoints, seed products on startup
- Frontend: Cart context (localStorage), Header w/ cart drawer, Hero, Categories, Product grid, Checkout, Order Confirmation, Footer
- Use Cormorant Garamond + Work Sans, organic earthy palette, sharp edges
</Plan>
Action: file_editor create /app/backend/server.py --file-text "from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix=\"/api\")


# ===== Models =====
class Product(BaseModel):
    model_config = ConfigDict(extra=\"ignore\")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    price: float
    unit: str
    image: str
    description: str
    badge: Optional[str] = None
    in_stock: bool = True


class Category(BaseModel):
    slug: str
    name: str
    image: str
    tagline: str


class CartItem(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int
    image: str
    unit: str


class OrderCreate(BaseModel):
    items: List[CartItem]
    customer_name: str
    email: str
    phone: str
    address: str
    city: str
    zip_code: str
    notes: Optional[str] = \"\"
    delivery_fee: float = 0.0
    subtotal: float
    total: float


class Order(BaseModel):
    model_config = ConfigDict(extra=\"ignore\")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    items: List[CartItem]
    customer_name: str
    email: str
    phone: str
    address: str
    city: str
    zip_code: str
    notes: Optional[str] = \"\"
    delivery_fee: float
    subtotal: float
    total: float
    status: str = \"confirmed\"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ===== Seed Data =====
CATEGORIES = [
    {\"slug\": \"fruits\", \"name\": \"Fruits\", \"image\": \"https://images.unsplash.com/photo-1773739686762-140369959d7f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHw0fHxmcmVzaCUyMGZydWl0cyUyMHByb2R1Y2UlMjBiYXNrZXR8ZW58MHx8fHwxNzc4MTY1MTM1fDA&ixlib=rb-4.1.0&q=85\", \"tagline\": \"Picked at peak ripeness\"},
    {\"slug\": \"vegetables\", \"name\": \"Vegetables\", \"image\": \"https://images.unsplash.com/photo-1612362426802-dcc0ccd25f64?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZnJlc2glMjB2ZWdldGFibGVzJTIwZmxhdGxheXxlbnwwfHx8fDE3NzgxNjUxMzV8MA&ixlib=rb-4.1.0&q=85\", \"tagline\": \"From farm, this morning\"},
    {\"slug\": \"dairy\", \"name\": \"Dairy & Eggs\", \"image\": \"https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZGFpcnklMjBtaWxrJTIwY2hlZXNlfGVufDB8fHx8MTc3ODE2NTEzNXww&ixlib=rb-4.1.0&q=85\", \"tagline\": \"Small herd, big flavour\"},
    {\"slug\": \"bakery\", \"name\": \"Bakery\", \"image\": \"https://images.unsplash.com/photo-1534620808146-d33bb39128b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBmbGF0bGF5fGVufDB8fHx8MTc3ODE2NTEzNXww&ixlib=rb-4.1.0&q=85\", \"tagline\": \"Long-fermented sourdough\"},
    {\"slug\": \"meat-seafood\", \"name\": \"Meat & Seafood\", \"image\": \"https://images.unsplash.com/photo-1642517245891-74906b8d8873?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwyfHxmcmVzaCUyMG1lYXQlMjBzZWFmb29kJTIwcmF3fGVufDB8fHx8MTc3ODE2NTEzNXww&ixlib=rb-4.1.0&q=85\", \"tagline\": \"Pasture-raised, line-caught\"},
    {\"slug\": \"pantry\", \"name\": \"Pantry\", \"image\": \"https://images.pexels.com/photos/31031845/pexels-photo-31031845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940\", \"tagline\": \"Cupboard essentials\"},
]

SEED_PRODUCTS = [
    # Fruits
    {\"name\": \"Heirloom Tomatoes\", \"category\": \"fruits\", \"price\": 4.80, \"unit\": \"per lb\", \"image\": \"https://static.prod-images.emergentagent.com/jobs/79a0f4b1-079d-4f0a-ac3d-5bb3b9863edf/images/6fe46dc77f00d4aa35a7098c4042875c9247b179234ea0f419b09d71a39e4964.png\", \"description\": \"Sun-ripened, sweet and tangy. Locally grown.\", \"badge\": \"Local\"},
    {\"name\": \"Honeycrisp Apples\", \"category\": \"fruits\", \"price\": 3.20, \"unit\": \"per lb\", \"image\": \"https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwyfHxncm9jZXJ5JTIwcGFwZXIlMjBiYWclMjBmcmVzaCUyMHByb2R1Y2UlMjBiYWd8ZW58MHx8fHwxNzc4MTY1MTM1fDA&ixlib=rb-4.1.0&q=85\", \"description\": \"Crisp, juicy and perfectly balanced sweet-tart.\", \"badge\": \"Bestseller\"},
    {\"name\": \"Wild Blueberries\", \"category\": \"fruits\", \"price\": 6.50, \"unit\": \"6 oz pint\", \"image\": \"https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=85\", \"description\": \"Tiny, intense, antioxidant-rich Maine blueberries.\", \"badge\": None},
    {\"name\": \"Meyer Lemons\", \"category\": \"fruits\", \"price\": 1.80, \"unit\": \"each\", \"image\": \"https://images.unsplash.com/photo-1582287014914-1db836df9988?w=800&q=85\", \"description\": \"Fragrant, sweeter than regular lemons.\", \"badge\": None},

    # Vegetables
    {\"name\": \"Tuscan Kale\", \"category\": \"vegetables\", \"price\": 3.40, \"unit\": \"bunch\", \"image\": \"https://static.prod-images.emergentagent.com/jobs/79a0f4b1-079d-4f0a-ac3d-5bb3b9863edf/images/889fdd8aaf66f605b5c56738aa5fe0536da79a3621b8e31d5cdd3216a343b78d.png\", \"description\": \"Dark, dimpled leaves. Earthy, nutty flavour.\", \"badge\": \"Organic\"},
    {\"name\": \"Rainbow Carrots\", \"category\": \"vegetables\", \"price\": 2.90, \"unit\": \"bunch\", \"image\": \"https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=85\", \"description\": \"Purple, yellow and orange heirloom varieties.\", \"badge\": None},
    {\"name\": \"Shiitake Mushrooms\", \"category\": \"vegetables\", \"price\": 7.20, \"unit\": \"8 oz\", \"image\": \"https://images.unsplash.com/photo-1607188561818-9f3c2e0ad812?w=800&q=85\", \"description\": \"Meaty texture, deep umami. Cultivated locally.\", \"badge\": None},
    {\"name\": \"Watercress\", \"category\": \"vegetables\", \"price\": 2.40, \"unit\": \"bunch\", \"image\": \"https://images.unsplash.com/photo-1576181256399-834e3b3a49bf?w=800&q=85\", \"description\": \"Peppery, mineral-rich greens.\", \"badge\": \"New\"},

    # Dairy
    {\"name\": \"Cultured Butter\", \"category\": \"dairy\", \"price\": 8.90, \"unit\": \"8 oz\", \"image\": \"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=85\", \"description\": \"Slow-cultured, hand-rolled, sea-salted.\", \"badge\": \"Bestseller\"},
    {\"name\": \"Pasture Eggs\", \"category\": \"dairy\", \"price\": 7.50, \"unit\": \"dozen\", \"image\": \"https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=85\", \"description\": \"Deep amber yolks. Hens roam free.\", \"badge\": None},
    {\"name\": \"Aged Gruyère\", \"category\": \"dairy\", \"price\": 12.40, \"unit\": \"per lb\", \"image\": \"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=85\", \"description\": \"Nutty, complex, 12-month aged.\", \"badge\": None},
    {\"name\": \"Whole Milk\", \"category\": \"dairy\", \"price\": 5.40, \"unit\": \"half gallon\", \"image\": \"https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=85\", \"description\": \"Non-homogenized, glass bottled.\", \"badge\": None},

    # Bakery
    {\"name\": \"Country Sourdough\", \"category\": \"bakery\", \"price\": 8.00, \"unit\": \"loaf\", \"image\": \"https://images.unsplash.com/photo-1634831318569-0df6cdeac7da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnklMjBmbGF0bGF5fGVufDB8fHx8MTc3ODE2NTEzNXww&ixlib=rb-4.1.0&q=85\", \"description\": \"48-hour cold ferment. Crackling crust, open crumb.\", \"badge\": \"Bestseller\"},
    {\"name\": \"Almond Croissant\", \"category\": \"bakery\", \"price\": 4.20, \"unit\": \"each\", \"image\": \"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=85\", \"description\": \"All-butter, twice-baked with frangipane.\", \"badge\": None},
    {\"name\": \"Seeded Rye\", \"category\": \"bakery\", \"price\": 9.50, \"unit\": \"loaf\", \"image\": \"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85\", \"description\": \"Caraway, fennel, coriander. Dense, fragrant.\", \"badge\": None},
    {\"name\": \"Buckwheat Tart\", \"category\": \"bakery\", \"price\": 6.80, \"unit\": \"each\", \"image\": \"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=85\", \"description\": \"Seasonal fruit, buckwheat shortcrust.\", \"badge\": \"New\"},

    # Meat & Seafood
    {\"name\": \"Wild King Salmon\", \"category\": \"meat-seafood\", \"price\": 28.00, \"unit\": \"per lb\", \"image\": \"https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800&q=85\", \"description\": \"Line-caught, sashimi-grade.\", \"badge\": \"Premium\"},
    {\"name\": \"Dry-Aged Ribeye\", \"category\": \"meat-seafood\", \"price\": 36.50, \"unit\": \"per lb\", \"image\": \"https://images.unsplash.com/photo-1603048719538-86c0a6b8f02e?w=800&q=85\", \"description\": \"28-day dry aged, grass-finished.\", \"badge\": None},
    {\"name\": \"Free-Range Chicken\", \"category\": \"meat-seafood\", \"price\": 14.00, \"unit\": \"whole bird\", \"image\": \"https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=85\", \"description\": \"Pasture-raised, air-chilled.\", \"badge\": None},

    # Pantry
    {\"name\": \"Tuscan Olive Oil\", \"category\": \"pantry\", \"price\": 24.00, \"unit\": \"500ml\", \"image\": \"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=85\", \"description\": \"Cold-pressed, single estate.\", \"badge\": \"Premium\"},
    {\"name\": \"Stone-Ground Polenta\", \"category\": \"pantry\", \"price\": 9.20, \"unit\": \"1 lb\", \"image\": \"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=85\", \"description\": \"Heritage corn, slow milled.\", \"badge\": None},
    {\"name\": \"Wildflower Honey\", \"category\": \"pantry\", \"price\": 14.50, \"unit\": \"12 oz jar\", \"image\": \"https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=85\", \"description\": \"Raw, unfiltered, single apiary.\", \"badge\": None},
    {\"name\": \"Sea Salt Flakes\", \"category\": \"pantry\", \"price\": 11.00, \"unit\": \"8 oz tin\", \"image\": \"https://images.unsplash.com/photo-1518110925495-b37653b65f23?w=800&q=85\", \"description\": \"Hand-harvested, flaky finishing salt.\", \"badge\": None},
]


@app.on_event(\"startup\")
async def seed_data():
    # Seed categories
    cats_count = await db.categories.count_documents({})
    if cats_count == 0:
        await db.categories.insert_many([dict(c) for c in CATEGORIES])
    # Seed products
    prod_count = await db.products.count_documents({})
    if prod_count == 0:
        docs = []
        for p in SEED_PRODUCTS:
            obj = Product(**p)
            docs.append(obj.model_dump())
        await db.products.insert_many(docs)


# ===== Routes =====
@api_router.get(\"/\")
async def root():
    return {\"message\": \"FreshCart API\"}


@api_router.get(\"/categories\", response_model=List[Category])
async def list_categories():
    cats = await db.categories.find({}, {\"_id\": 0}).to_list(100)
    return cats


@api_router.get(\"/products\", response_model=List[Product])
async def list_products(category: Optional[str] = None, q: Optional[str] = None):
    query = {}
    if category:
        query[\"category\"] = category
    if q:
        query[\"name\"] = {\"$regex\": q, \"$options\": \"i\"}
    products = await db.products.find(query, {\"_id\": 0}).to_list(500)
    return products


@api_router.get(\"/products/featured\", response_model=List[Product])
async def featured_products():
    products = await db.products.find({\"badge\": {\"$in\": [\"Bestseller\", \"Premium\", \"New\"]}}, {\"_id\": 0}).to_list(12)
    return products


@api_router.get(\"/products/{product_id}\", response_model=Product)
async def get_product(product_id: str):
    p = await db.products.find_one({\"id\": product_id}, {\"_id\": 0})
    if not p:
        raise HTTPException(status_code=404, detail=\"Product not found\")
    return p


@api_router.post(\"/orders\", response_model=Order)
async def create_order(payload: OrderCreate):
    order = Order(**payload.model_dump())
    doc = order.model_dump()
    doc[\"created_at\"] = doc[\"created_at\"].isoformat()
    await db.orders.insert_one(doc)
    return order


@api_router.get(\"/orders/{order_id}\", response_model=Order)
async def get_order(order_id: str):
    o = await db.orders.find_one({\"id\": order_id}, {\"_id\": 0})
    if not o:
        raise HTTPException(status_code=404, detail=\"Order not found\")
    if isinstance(o.get(\"created_at\"), str):
        o[\"created_at\"] = datetime.fromisoformat(o[\"created_at\"])
    return o


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=[\"*\"],
    allow_headers=[\"*\"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event(\"shutdown\")
async def shutdown_db_client():
    client.close()
"
Observation: Overwrite successful: /app/backend/server.py
