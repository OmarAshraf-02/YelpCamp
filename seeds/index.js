const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
	console.log("Database connected");
	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const db = mongoose.connection;

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			// USER ID
			author: "64d5298fa5224a08983111fe",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto nemo, suscipit dicta similique mollitia consectetur quia quaerat animi? Totam at id eos aut dolore asperiores, rerum non. Minus, quidem reiciendis!Omnis asperiores numquam, perspiciatis consequuntur quibusdam similique reprehenderit voluptas suscipit quo vero dolores, quas doloremque aut voluptates. Animi blanditiis fugit omnis nostrum suscipit labore, deserunt eligendi nesciunt quas ad? Voluptates?",
			price,
			geometry: {
				type: "Point",
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
			images: [
				{
					url: "https://res.cloudinary.com/dchoxw2gu/image/upload/v1691931654/YelpCamp/photo-1504280390367-361c6d9f38f4_lolfes.jpg",
					filename: "YelpCamp/photo-1504280390367-361c6d9f38f4_lolfes",
				},
				{
					url: "https://res.cloudinary.com/dchoxw2gu/image/upload/v1691932162/YelpCamp/photo-1532339142463-fd0a8979791a_t35uxo.jpg",
					filename: "YelpCamp/photo-1532339142463-fd0a8979791a_t35uxo",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	db.close();
});
