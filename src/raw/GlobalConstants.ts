export const categories = [
	"food",
	"hotel",
	"map",
	"wifi",
	"translate",
	"travel"
]

export const searchWords = {
	food: ["restaurant", "food", "gourmet", "cuisine"],
	hotel: ["hotel", "motel", "guest house", "hostel", "lodge"],
	map: [
		"map",
		"navigation",
		"transportation",
		"subway",
		"bus",
		"train",
		"taxi"
	],
	translate: ["translate", "dictionary"],
	wifi: ["wifi"],
	travel: ["travel", "tour", "trip", "sightSeeing"]
}

export const language = [
	"en",
	"es",
	"de",
	"fr",
	"nl",
	"pt-pt",
	"zh-Hans",
	"ko",
	"ja"
]

export const appleCountries = {
	en: ["us", "gb"],
	es: ["es"],
	de: ["de"],
	fr: ["fr"],
	nl: ["nl"],
	"pt-pt": ["pt"],
	"zh-Hans": ["cn"],
	ko: ["kr"],
	ja: ["jp"]
}

export const googleCountries = {
	en: ["us", "uk"],
	es: ["es"],
	de: ["de"],
	fr: ["fr"],
	nl: ["nl"],
	"pt-pt": ["pt"],
	"zh-Hans": ["cn"],
	ko: ["kr"],
	ja: ["jp"]
}

export const googleGenre = {
	genreId: {
		food: ["FOOD_AND_DRINK"],
		hotel: ["TRAVEL_AND_LOCAL", "BUSINESS"],
		map: ["MAPS_AND_NAVIGATION", "TRAVEL_AND_LOCAL"],
		translate: ["TRAVEL_AND_LOCAL", "TOOLS"],
		wifi: ["TOOLS", "LIFESTYLE", "TRAVEL_AND_LOCAL"],
		travel: [
			"TRAVEL_AND_LOCAL",
			"LIFESTYLE",
			"ENTERTAINMENT",
			"EVENTS",
			"AUTO_AND_VEHICLES",
			"SPORTS"
		]
	},
	summary: {
		food: ["game", "Game"],
		hotel: ["game", "Game"],
		map: ["game", "Game"],
		translate: ["game", "Game"],
		wifi: ["game", "Game"],
		travel: ["game", "Game"]
	}
}

export const appleGenre = {
	primaryGenre: {
		food: ["Food & Drink", "Travel", "Lifestyle"],
		hotel: ["Travel", "Business"],
		map: ["Navigation", "Travel"],
		translate: ["Productivity", "Utilities"],
		wifi: ["Utilities", "Lifestyle", "Travel"],
		travel: ["Travel", "Lifestyle", "Entertainment"]
	},
	summary: {
		food: ["game", "Game"],
		hotel: ["game", "Game"],
		map: ["game", "Game"],
		translate: ["game", "Game"],
		wifi: ["game", "Game"],
		travel: ["game", "Game"]
	}
}

export const translatedCategories = {
	food: {
		en: ["restaurant", "food", "gourmet", "cuisine"],
		es: ["restaurante", "comida", "gourmet", "cocina"],
		de: ["Restaurant", "Essen", "Gourmet", "Küche"],
		fr: ["restaurant", "nourriture", "gourmet", "cuisine"],
		nl: ["restaurant", "eten", "gastronomische", "keuken"],
		"pt-PT": ["restaurante", "comida", "gourmet", "cozinha"],
		"zh-Hans": ["餐厅，食品，美食，美食"],
		ko: ["레스토랑", "음식", "미식가", "요리", "맛집"],
		ja: ["レストラン", "食べ物", "グルメ", "料理"]
	},
	hotel: {
		en: ["hotel", "motel", "guesthouse", "hostel", "lodge"],
		es: ["hotel", "motel", "casadehuéspedes", "hostal", "lodge"],
		de: ["Hotel", "Motel", "Gästehaus", "Herberge", "Lodge"],
		fr: ["hôtel", "motel", "maisond’hôtes", "auberge", "lodge"],
		nl: ["hotel", "motel", "pension", "hostel", "lodge"],
		"pt-PT": ["hotel", "motel", "guesthouse", "hostel", "lodge"],
		"zh-Hans": ["酒店，汽车旅馆，招待所，旅馆，旅馆"],
		ko: ["호텔", "모텔", "게스트하우스", "호스텔"],
		ja: ["ホテル", "モーテル", "ゲストハウス", "ホステル", "ロッジ"]
	},
	map: {
		en: [
			"map",
			"navigation",
			"transportation",
			"subway",
			"bus",
			"train",
			"taxi"
		],
		es: [
			"mapa",
			"navegación",
			"transporte",
			"metro",
			"autobús",
			"tren",
			"taxi"
		],
		de: [
			"Karte",
			"Navigation",
			"Transport",
			"U-Bahn",
			"Bus",
			"Zug",
			"Taxi"
		],
		fr: [
			"carte",
			"navigation",
			"transport",
			"métro",
			"bus",
			"train",
			"taxi"
		],
		nl: ["kaart", "navigatie", "vervoer", "metro", "bus", "trein", "taxi"],
		"pt-PT": [
			"mapa",
			"navegação",
			"transporte",
			"metro",
			"autocarro",
			"comboio",
			"táxi"
		],
		"zh-Hans": ["地图，导航，交通，地铁，巴士，火车，出租车"],
		ko: ["지도", "내비게이션", "교통", "지하철", "버스", "기차", "택시"],
		ja: [
			"地図",
			"ナビゲーション",
			"交通",
			"地下鉄",
			"バス",
			"電車",
			"タクシー"
		]
	},
	translate: {
		en: ["translate", "dictionary"],
		es: ["traducir", "diccionario"],
		de: ["übersetzen", "Wörterbuch"],
		fr: ["traduire", "dictionnaire"],
		nl: ["vertalen", "woordenboek"],
		"pt-PT": ["traduzir", "dicionário"],
		"zh-Hans": ["翻译，字典"],
		ko: ["번역", "사전"],
		ja: ["翻訳", "辞書"]
	},
	wifi: {
		en: ["Wifi"],
		es: ["Wifi"],
		de: ["WLAN"],
		fr: ["wifi"],
		nl: ["Wifi"],
		"pt-PT": ["Wifi"],
		"zh-Hans": ["无线"],
		ko: ["와이파이"],
		ja: ["Wifi"]
	},
	travel: {
		en: ["travel", "tour", "trip", "sightSeeing"],
		es: ["viaje", "tour", "viaje", "sightSeeing"],
		de: ["Reisen", "Tour", "Reise", "SehenSehen"],
		fr: ["voyage", "tour", "voyage", "sightSeeing"],
		nl: ["reizen", "tour", "reis", "sightSeeing"],
		"pt-PT": ["viagem", "tour", "viagem", "turismo"],
		"zh-Hans": ["旅行，旅游，旅行，观光"],
		ko: ["여행", "관광"],
		ja: ["旅行", "ツアー", "観光"]
	}
}
