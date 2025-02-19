CREATE TABLE user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    pseudo VARCHAR(50) NOT NULL DEFAULT "Utilisateur",
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

CREATE TABLE place (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_category INT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100),
    image_url VARCHAR(2048) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorite (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_user INT UNSIGNED NOT NULL,
    id_place INT UNSIGNED NOT NULL
);

CREATE TABLE place_category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    id_place INT UNSIGNED NOT NULL,
    id_category INT UNSIGNED NOT NULL
);

CREATE TABLE category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    type VARCHAR(100) NOT NULL
);


INSERT INTO place (id, id_category, name, description, location, image_url) VALUES
(1, 1, 'Green Stay Hotel', 'Un hôtel éco-responsable zéro déchet', 'Paris, France', 'https://www.bowo.fr/assets/_background/42120/Soneva_Kiri.webp'),
(2, 1, 'Eco-Friendly Resort', 'Un resort tout en bois, respectueux de l’environnement', 'Bali, Indonésie', 'https://i0.wp.com/monhotellerie.com/wp-content/uploads/2014/02/beach_residence_exterior12.jpg?resize=560%2C388&ssl=1'),
(3, 1, 'Green Palace Hotel', 'Un hôtel avec des pratiques écologiques, énergie solaire et recyclage', 'Londres, Royaume-Uni', 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/183944992.jpg?k=b89469e5ed9a7fef96513f5fa368b7ce33bf5ecf372f36e89554b7fc8654934d&o=&hp=1'),
(4, 1, 'The Green Oasis', 'Hôtel à la gestion éco-responsable avec piscine naturelle', 'Barcelone, Espagne', 'https://www.bowo.fr/assets/_background/23861/hotel_ecologique.webp'),
(5, 2, 'Veggie World', 'Un restaurant 100% vegan et bio', 'Lyon, France', 'https://koust.net/wp-content/uploads/2021/11/restaurant-e%CC%81co-responsable-.jpg'),
(6, 2, 'The Organic Bistro', 'Restaurant bio avec des produits locaux et de saison', 'Paris, France', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC_PfPdutmsbm7Aoqx3EcYYEdgEyAJqr6odw&s'),
(7, 2, 'Green Plate Café', 'Un café avec un menu végétalien et des ingrédients durables', 'Lyon, France', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPh15XRyiFtfzAoumC1RhQQu6caoK1T4Y0Kg&s'),
(8, 3, 'EcoLodge Amazonia', 'Un écolodge en pleine nature amazonienne', 'Pérou', 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/375487639.jpg?k=a1f43cba1fdd1328b7b651fdcd7743e618a94ca609925dc209cc70aea12674c5&o=&hp=1'),
(9, 3, 'Wild Retreat', 'Séjour dans une maison écologique dans la nature sauvage', 'Montagnes Rocheuses, USA', 'https://www.apero-bordeaux.fr/wp-content/uploads/2024/09/interrogations-essentielles-pour-concevoir-une-maison-ecologique.png'),
(12, 4, 'Ethical Safari Kenya', 'Safari respectueux des animaux sauvages', 'Kenya', 'https://static.secureholiday.net/static/Pictures/449/00000201317.jpg'),
(13, 4, 'Ocean Conservation Tour', 'Tour pour sensibiliser à la conservation des océans', 'Maldives', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBpXuk6dqjuF46I40p6Sht4rWj0qYML1O9KQ&s'),
(14, 4, 'Wildlife Protection Adventure', 'Activité d’observation d’animaux sauvages avec respect de leur habitat', 'Namibie', 'https://www.consoglobe.com/wp-content/uploads/2019/06/namibie-animaux_shutterstock_321857438.jpg'),
(15, 4, 'Green Trekking', 'Trekking en montagne avec des guides locaux et respectueux de la nature', 'Himalaya, Népal', 'https://www.nomade-aventure.com/Content/Images/ImgProduits/NPL/1491/525753_QuatreTiers.ori.jpg'),
(16, 5, 'Zero Waste Café', 'Un café zéro plastique et local', 'Berlin, Allemagne', 'https://roulettes-et-sac-a-dos.com/wp-content/uploads/2017/12/original-unverpackt-berlin.jpg'),
(17, 5, 'Eco Brew Café', 'Café éco-responsable avec des produits compostables et un menu bio', 'San Francisco, USA', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/26/e4/1f/lunch-and-breakfast-on.jpg'),
(18, 5, 'The Green Bean', 'Café servant des produits biologiques et locaux avec zéro déchet', 'Vancouver, Canada', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlb_opeYUgTzHSXr7zoHbIcAYVJPwvYO4gQ&s');

INSERT INTO favorite (id, id_user, id_place) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 5),
(4, 1, 6),
(5, 2, 8),
(6, 3, 12),
(7, 1, 15),
(8, 2, 17),
(9, 3, 18);

INSERT INTO place_category (id, id_place, id_category) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 6, 2),
(7, 7, 2),
(8, 8, 3),
(9, 9, 3),
(10, 10, 3),
(11, 11, 3),
(12, 12, 4),
(13, 13, 4),
(14, 14, 4),
(15, 15, 4),
(16, 16, 5),
(17, 17, 5),
(18, 18, 5);

INSERT INTO category (id, type) VALUES
(1, 'Hôtel éthique'),
(2, 'Restaurant'),
(3, 'Hébergement'),
(4, 'Activité'),
(5, 'Café');
