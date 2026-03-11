"""Seed data for Plantarea — realistic Chilean plant nurseries and products."""

from sqlalchemy.orm import Session

from plantarea.models import Base, Category, Nursery, Product, Review, engine


def seed_database(db: Session) -> None:
    """Populate the database with initial seed data.

    Only runs if the categories table is empty (first-time setup).
    """
    existing = db.query(Category).first()
    if existing:
        return  # Already seeded

    # --- Categories ---
    categories = [
        Category(name="Arboles nativos", slug="arboles-nativos", description="Arboles endemicos y nativos de Chile", icon="🌳"),
        Category(name="Arboles frutales", slug="arboles-frutales", description="Frutales para huerto y jardin", icon="🍎"),
        Category(name="Plantas de interior", slug="plantas-interior", description="Plantas ornamentales para interiores", icon="🪴"),
        Category(name="Flores y bulbos", slug="flores-bulbos", description="Flores de temporada, perennes y bulbos", icon="🌸"),
        Category(name="Cactus y suculentas", slug="cactus-suculentas", description="Cactaceas y suculentas resistentes", icon="🌵"),
        Category(name="Hierbas aromaticas", slug="hierbas-aromaticas", description="Hierbas de cocina y medicinales", icon="🌿"),
        Category(name="Arbustos y setos", slug="arbustos-setos", description="Arbustos ornamentales y para cercos", icon="🌲"),
        Category(name="Trepadoras", slug="trepadoras", description="Plantas trepadoras y enredaderas", icon="🍃"),
    ]
    db.add_all(categories)
    db.flush()

    cat_map = {c.name: c for c in categories}

    # --- Nurseries ---
    nurseries = [
        Nursery(
            name="Vivero Los Aromos",
            slug="vivero-los-aromos",
            description="Especialistas en flora nativa chilena desde 1985. Produccion sustentable en la zona central.",
            address="Camino Los Aromos 4520",
            city="Limache",
            region="Valparaiso",
            phone="+56 9 8765 4321",
            email="contacto@viverolosaromos.cl",
            rating=4.8,
            review_count=42,
            cover_url="https://picsum.photos/seed/vivero-los-aromos/1200/400",
        ),
        Nursery(
            name="Vivero Santa Elena",
            slug="vivero-santa-elena",
            description="Vivero familiar con mas de 30 anos de experiencia. Gran variedad de arboles frutales y ornamentales.",
            address="Av. Santa Elena 1200",
            city="Santiago",
            region="Region Metropolitana",
            phone="+56 9 1234 5678",
            email="ventas@viverosantaelena.cl",
            rating=4.5,
            review_count=38,
            cover_url="https://picsum.photos/seed/vivero-santa-elena/1200/400",
        ),
        Nursery(
            name="Jardines del Sur",
            slug="jardines-del-sur",
            description="El vivero mas grande del sur de Chile. Especialistas en plantas adaptadas al clima lluvioso.",
            address="Ruta 5 Sur Km 780",
            city="Temuco",
            region="La Araucania",
            phone="+56 9 5555 1234",
            email="info@jardinesdelsur.cl",
            rating=4.6,
            review_count=27,
            cover_url="https://picsum.photos/seed/jardines-del-sur/1200/400",
        ),
        Nursery(
            name="Cactus Chile",
            slug="cactus-chile",
            description="Coleccionistas y productores de cactus y suculentas chilenas y del mundo. Envios a todo el pais.",
            address="Calle Atacama 340",
            city="La Serena",
            region="Coquimbo",
            phone="+56 9 4444 9876",
            email="hola@cactuschile.cl",
            rating=4.9,
            review_count=56,
            cover_url="https://picsum.photos/seed/cactus-chile/1200/400",
        ),
        Nursery(
            name="Vivero El Boldo",
            slug="vivero-el-boldo",
            description="Produccion organica de hierbas aromaticas y medicinales. Certificacion organica vigente.",
            address="Parcela 12, Camino a Casablanca",
            city="Casablanca",
            region="Valparaiso",
            phone="+56 9 3333 4567",
            email="contacto@elboldo.cl",
            rating=4.7,
            review_count=19,
            cover_url="https://picsum.photos/seed/vivero-el-boldo/1200/400",
        ),
        Nursery(
            name="Flora Valdiviana",
            slug="flora-valdiviana",
            description="Especies del bosque valdiviano. Helechos, nalcas, canelos y mas plantas del sur de Chile.",
            address="Costanera Sur 890",
            city="Valdivia",
            region="Los Rios",
            phone="+56 9 2222 8765",
            email="ventas@floravaldiviana.cl",
            rating=4.4,
            review_count=15,
            cover_url="https://picsum.photos/seed/flora-valdiviana/1200/400",
        ),
    ]
    db.add_all(nurseries)
    db.flush()

    # --- Products ---
    products = [
        # Vivero Los Aromos - Native trees
        Product(name="Araucaria chilena (Pehuen)", slug="araucaria-chilena", description="Araucaria araucana. Arbol emblematico de Chile, crecimiento lento. Altura: 30-40cm. Ideal para jardines amplios.", price=25000, compare_at_price=30000, stock=15, category_id=cat_map["Arboles nativos"].id, nursery_id=nurseries[0].id, image_url="https://picsum.photos/seed/araucaria-chilena/400/400"),
        Product(name="Boldo", slug="boldo", description="Peumus boldus. Arbol nativo perenne, hojas aromaticas medicinales. Altura: 20-30cm.", price=8500, stock=30, category_id=cat_map["Arboles nativos"].id, nursery_id=nurseries[0].id, image_url="https://picsum.photos/seed/boldo/400/400"),
        Product(name="Quillay", slug="quillay", description="Quillaja saponaria. Arbol nativo siempreverde, resistente a la sequia. Altura: 40-50cm.", price=7500, stock=25, category_id=cat_map["Arboles nativos"].id, nursery_id=nurseries[0].id, image_url="https://picsum.photos/seed/quillay/400/400"),
        Product(name="Canelo", slug="canelo", description="Drimys winteri. Arbol sagrado mapuche, hojas aromaticas. Altura: 30-40cm.", price=9000, stock=20, category_id=cat_map["Arboles nativos"].id, nursery_id=nurseries[0].id, image_url="https://picsum.photos/seed/canelo/400/400"),
        Product(name="Peumo", slug="peumo", description="Cryptocarya alba. Arbol nativo perenne con frutos comestibles. Altura: 25-35cm.", price=8000, stock=18, category_id=cat_map["Arboles nativos"].id, nursery_id=nurseries[0].id, image_url="https://picsum.photos/seed/peumo/400/400"),

        # Vivero Santa Elena - Fruit trees
        Product(name="Limonero 4 estaciones", slug="limonero-4-estaciones", description="Citrus limon. Produce limones todo el ano. Excelente para maceta o jardin. Altura: 60-80cm.", price=15000, compare_at_price=18000, stock=22, category_id=cat_map["Arboles frutales"].id, nursery_id=nurseries[1].id, image_url="https://picsum.photos/seed/limonero-4-estaciones/400/400"),
        Product(name="Naranjo Washington Navel", slug="naranjo-washington", description="Citrus sinensis. Variedad sin semillas, dulce y jugosa. Altura: 70-90cm.", price=14000, stock=18, category_id=cat_map["Arboles frutales"].id, nursery_id=nurseries[1].id, image_url="https://picsum.photos/seed/naranjo-washington/400/400"),
        Product(name="Palto Hass", slug="palto-hass", description="Persea americana. Variedad Hass, excelente calidad de fruta. Altura: 50-70cm. Requiere buen drenaje.", price=18000, compare_at_price=22000, stock=12, category_id=cat_map["Arboles frutales"].id, nursery_id=nurseries[1].id, image_url="https://picsum.photos/seed/palto-hass/400/400"),
        Product(name="Cerezo Bing", slug="cerezo-bing", description="Prunus avium. Cerezas rojas grandes y dulces. Floracion primaveral espectacular. Altura: 80-100cm.", price=16000, stock=10, category_id=cat_map["Arboles frutales"].id, nursery_id=nurseries[1].id, image_url="https://picsum.photos/seed/cerezo-bing/400/400"),
        Product(name="Higuera Negra", slug="higuera-negra", description="Ficus carica. Higos dulces de pulpa roja. Muy resistente. Altura: 40-60cm.", price=12000, stock=20, category_id=cat_map["Arboles frutales"].id, nursery_id=nurseries[1].id, image_url="https://picsum.photos/seed/higuera-negra/400/400"),

        # Jardines del Sur - Indoor plants & shrubs
        Product(name="Monstera deliciosa", slug="monstera-deliciosa", description="Costilla de Adan. Planta tropical de hojas perforadas, perfecta para interiores luminosos.", price=12000, stock=35, category_id=cat_map["Plantas de interior"].id, nursery_id=nurseries[2].id, image_url="https://picsum.photos/seed/monstera-deliciosa/400/400"),
        Product(name="Ficus lyrata", slug="ficus-lyrata", description="Ficus pandurata. Hojas grandes en forma de violin. Planta de interior muy decorativa. Altura: 40-50cm.", price=18000, stock=12, category_id=cat_map["Plantas de interior"].id, nursery_id=nurseries[2].id, image_url="https://picsum.photos/seed/ficus-lyrata/400/400"),
        Product(name="Pothos dorado", slug="pothos-dorado", description="Epipremnum aureum. Planta colgante muy resistente, ideal para principiantes. Maceta 15cm.", price=5500, stock=50, category_id=cat_map["Plantas de interior"].id, nursery_id=nurseries[2].id, image_url="https://picsum.photos/seed/pothos-dorado/400/400"),
        Product(name="Copihue rojo", slug="copihue-rojo", description="Lapageria rosea. Flor nacional de Chile. Trepadora perenne del bosque valdiviano.", price=15000, compare_at_price=19000, stock=8, category_id=cat_map["Trepadoras"].id, nursery_id=nurseries[2].id, image_url="https://picsum.photos/seed/copihue-rojo/400/400"),
        Product(name="Azalea japonesa", slug="azalea-japonesa", description="Rhododendron japonicum. Floracion abundante en primavera. Colores rosa y rojo. Altura: 30-40cm.", price=9500, stock=25, category_id=cat_map["Arbustos y setos"].id, nursery_id=nurseries[2].id, image_url="https://picsum.photos/seed/azalea-japonesa/400/400"),

        # Cactus Chile - Cacti & succulents
        Product(name="Echinopsis chiloensis", slug="echinopsis-chiloensis", description="Cactus nativo del norte chico. Flores blancas nocturnas espectaculares. Maceta 12cm.", price=6000, stock=40, category_id=cat_map["Cactus y suculentas"].id, nursery_id=nurseries[3].id, image_url="https://picsum.photos/seed/echinopsis-chiloensis/400/400"),
        Product(name="Copiapoa cinerea", slug="copiapoa-cinerea", description="Cactus endemico del desierto de Atacama. Cuerpo gris azulado. Crecimiento lento. Maceta 10cm.", price=12000, stock=15, category_id=cat_map["Cactus y suculentas"].id, nursery_id=nurseries[3].id, image_url="https://picsum.photos/seed/copiapoa-cinerea/400/400"),
        Product(name="Echeveria elegans", slug="echeveria-elegans", description="Suculenta roseta de hojas azul-grisaceas. Muy decorativa. Maceta 10cm.", price=3500, stock=80, category_id=cat_map["Cactus y suculentas"].id, nursery_id=nurseries[3].id, image_url="https://picsum.photos/seed/echeveria-elegans/400/400"),
        Product(name="Pack suculentas variadas x6", slug="pack-suculentas-x6", description="6 suculentas distintas en macetas de 8cm. Ideal para regalar o iniciar coleccion.", price=15000, compare_at_price=21000, stock=25, category_id=cat_map["Cactus y suculentas"].id, nursery_id=nurseries[3].id, image_url="https://picsum.photos/seed/pack-suculentas-x6/400/400"),
        Product(name="Aloe vera grande", slug="aloe-vera-grande", description="Aloe barbadensis. Planta medicinal y ornamental. Maceta 20cm, planta adulta.", price=8000, stock=30, category_id=cat_map["Cactus y suculentas"].id, nursery_id=nurseries[3].id, image_url="https://picsum.photos/seed/aloe-vera-grande/400/400"),

        # Vivero El Boldo - Herbs
        Product(name="Albahaca genovesa", slug="albahaca-genovesa", description="Ocimum basilicum. Albahaca italiana clasica, hojas grandes y aromaticas. Maceta 12cm.", price=2500, stock=60, category_id=cat_map["Hierbas aromaticas"].id, nursery_id=nurseries[4].id, image_url="https://picsum.photos/seed/albahaca-genovesa/400/400"),
        Product(name="Romero rastrero", slug="romero-rastrero", description="Rosmarinus officinalis prostratus. Ideal para rocallas y bordes. Muy aromatico. Maceta 14cm.", price=3500, stock=45, category_id=cat_map["Hierbas aromaticas"].id, nursery_id=nurseries[4].id, image_url="https://picsum.photos/seed/romero-rastrero/400/400"),
        Product(name="Lavanda inglesa", slug="lavanda-inglesa", description="Lavandula angustifolia. Flores violetas muy aromaticas, atrae polinizadores. Maceta 14cm.", price=4000, stock=35, category_id=cat_map["Hierbas aromaticas"].id, nursery_id=nurseries[4].id, image_url="https://picsum.photos/seed/lavanda-inglesa/400/400"),
        Product(name="Menta piperita", slug="menta-piperita", description="Mentha piperita. Menta de sabor intenso para te y cocteleria. Maceta 12cm.", price=2000, stock=55, category_id=cat_map["Hierbas aromaticas"].id, nursery_id=nurseries[4].id, image_url="https://picsum.photos/seed/menta-piperita/400/400"),
        Product(name="Kit huerto aromatico x4", slug="kit-huerto-aromatico", description="Incluye albahaca, cilantro, perejil y ciboulette. Macetas 12cm con sustrato organico.", price=8500, compare_at_price=10000, stock=20, category_id=cat_map["Hierbas aromaticas"].id, nursery_id=nurseries[4].id, image_url="https://picsum.photos/seed/kit-huerto-aromatico/400/400"),

        # Flora Valdiviana - Flowers & native
        Product(name="Fucsia magellanica", slug="fucsia-magellanica", description="Chilco. Arbusto nativo con flores colgantes rojas y violetas. Floracion extendida.", price=6500, stock=28, category_id=cat_map["Flores y bulbos"].id, nursery_id=nurseries[5].id, image_url="https://picsum.photos/seed/fucsia-magellanica/400/400"),
        Product(name="Helecho costilla de vaca", slug="helecho-costilla-vaca", description="Blechnum chilense. Helecho nativo robusto, ideal para jardines sombrios y humedos.", price=7000, stock=20, category_id=cat_map["Plantas de interior"].id, nursery_id=nurseries[5].id, image_url="https://picsum.photos/seed/helecho-costilla-vaca/400/400"),
        Product(name="Hortensia azul", slug="hortensia-azul", description="Hydrangea macrophylla. Grandes inflorescencias azules. Prospera en suelos acidos. Maceta 18cm.", price=8500, stock=22, category_id=cat_map["Flores y bulbos"].id, nursery_id=nurseries[5].id, image_url="https://picsum.photos/seed/hortensia-azul/400/400"),
        Product(name="Notro (Ciruelillo)", slug="notro-ciruelillo", description="Embothrium coccineum. Arbol nativo de flores rojas espectaculares en primavera. Altura: 40-50cm.", price=11000, stock=14, category_id=cat_map["Arboles nativos"].id, nursery_id=nurseries[5].id, image_url="https://picsum.photos/seed/notro-ciruelillo/400/400"),
    ]
    db.add_all(products)
    db.flush()

    # --- Reviews ---
    reviews = [
        Review(nursery_id=nurseries[0].id, author_name="Maria Gonzalez", rating=5, comment="Excelentes arboles nativos, llegaron en perfecto estado. La araucaria es hermosa."),
        Review(nursery_id=nurseries[0].id, author_name="Pedro Soto", rating=5, comment="Muy buena atencion y las plantas vienen sanas. Recomendado."),
        Review(nursery_id=nurseries[0].id, author_name="Carolina Munoz", rating=4, comment="Buenos precios y variedad. El envio demoro un poco pero todo llego bien."),
        Review(nursery_id=nurseries[1].id, author_name="Juan Perez", rating=5, comment="El palto Hass ya empezo a dar frutos! Muy buena calidad."),
        Review(nursery_id=nurseries[1].id, author_name="Ana Torres", rating=4, comment="Buenos frutales, el limonero esta precioso."),
        Review(nursery_id=nurseries[2].id, author_name="Felipe Rojas", rating=5, comment="La monstera llego enorme y hermosa. Embalaje impecable."),
        Review(nursery_id=nurseries[2].id, author_name="Valentina Silva", rating=4, comment="Buenas plantas de interior, precios justos."),
        Review(nursery_id=nurseries[3].id, author_name="Diego Ramirez", rating=5, comment="Los mejores cactus de Chile. La copiapoa es espectacular."),
        Review(nursery_id=nurseries[3].id, author_name="Camila Herrera", rating=5, comment="El pack de suculentas es un regalo perfecto. Todas llegaron sanas."),
        Review(nursery_id=nurseries[3].id, author_name="Roberto Vega", rating=5, comment="Calidad premium. Saben mucho de cactaceas nativas."),
        Review(nursery_id=nurseries[4].id, author_name="Lucia Fernandez", rating=5, comment="Hierbas frescas y bien cuidadas. El kit de huerto es genial."),
        Review(nursery_id=nurseries[4].id, author_name="Andres Morales", rating=4, comment="Muy buena calidad organica. La lavanda es hermosa."),
        Review(nursery_id=nurseries[5].id, author_name="Constanza Diaz", rating=4, comment="Lindas plantas del sur. El helecho llego perfecto."),
        Review(nursery_id=nurseries[5].id, author_name="Matias Lopez", rating=5, comment="El notro florecio espectacular en primavera. Muy contento."),
    ]
    db.add_all(reviews)

    db.commit()
    print("Database seeded with initial data.")
