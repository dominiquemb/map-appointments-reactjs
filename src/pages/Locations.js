import thumbnail1 from '../assets/images/location1.jpg';
import thumbnail2 from '../assets/images/location2.jpg';
import thumbnail3 from '../assets/images/location3.jpg';

const json = {
    "data": {
        "count": 21,
        "pageCount": 3,
        "pages": [
            {
                "number": 1,
                "url": "/v1/locations?city=London&page=1&limit=10"
            },
            {
                "number": 2,
                "url": "/v1/locations?city=London&page=2&limit=10"
            },
            {
                "number": 3,
                "url": "/v1/locations?city=London&page=3&limit=10"
            }
        ],
        "results": [
            {
                "id": 1,
                "status": 1,
                "name": "Location 1",
                "building": "Round Tree Plaza",
                "phone": "(555) 555-5555",
                "address": "1234 ANYWHERE ST.",
                "city": "London",
                "state": "Anystate",
                "country": "United States of America",
                "zip": "90015",
                "description": "Address description here.",
                "thumbnail": thumbnail1,
                "websiteLink": "https://google.com/",
                "coordinates": {
                    "type": "Point",
                    "coordinates": [
                        51.5079,
                        0.0877,
                    ]
                }
            },
            {
                "id": 2,
                "status": 1,
                "name": "Location 2",
                "building": "Round Tree Plaza",
                "phone": "(555) 555-5555",
                "address": "1234 ANYWHERE ST.",
                "city": "Paris",
                "state": "Anystate",
                "country": "United States of America",
                "zip": "90015",
                "description": "Address description here.",
                "thumbnail": thumbnail2,
                "websiteLink": "https://google.com/",
                "coordinates": {
                    "type": "Point",
                    "coordinates": [
                        48.8584,
                        2.2945,
                    ]
                }
            },
            {
                "id": 3,
                "status": 1,
                "name": "Location 3",
                "building": "Round Tree Plaza",
                "phone": "(555) 555-5555",
                "address": "1234 ANYWHERE ST.",
                "city": "Amiens",
                "state": "Anystate",
                "country": "United States of America",
                "zip": "90015",
                "description": "Address description here.",
                "thumbnail": thumbnail3,
                "websiteLink": "https://google.com/",
                "coordinates": {
                    "type": "Point",
                    "coordinates": [
                        49.8941,
                        2.2958,
                    ]
                }
            },
        {
            "id": 4,
            "status": 1,
            "name": "Location 4",
            "building": "Round Tree Plaza",
            "phone": "(555) 555-5555",
            "address": "1234 ANYWHERE ST.",
            "city": "London",
            "state": "Anystate",
            "country": "United States of America",
            "zip": "90015",
            "description": "Address description here.",
            "thumbnail": thumbnail1,
            "websiteLink": "https://google.com/",
            "coordinates": {
                "type": "Point",
                "coordinates": [
                    51.5079,
                    0.0877,
                ]
            }
        },
        {
            "id": 5,
            "status": 1,
            "name": "Location 5",
            "building": "Round Tree Plaza",
            "phone": "(555) 555-5555",
            "address": "1234 ANYWHERE ST.",
            "city": "Paris",
            "state": "Anystate",
            "country": "United States of America",
            "zip": "90015",
            "description": "Address description here.",
            "thumbnail": thumbnail2,
            "websiteLink": "https://google.com/",
            "coordinates": {
                "type": "Point",
                "coordinates": [
                    48.8584,
                    2.2945,
                ]
            }
        },
        {
            "id": 6,
            "status": 1,
            "name": "Location 6",
            "building": "Round Tree Plaza",
            "phone": "(555) 555-5555",
            "address": "1234 ANYWHERE ST.",
            "city": "Amiens",
            "state": "Anystate",
            "country": "United States of America",
            "zip": "90015",
            "description": "Address description here.",
            "thumbnail": thumbnail3,
            "websiteLink": "https://google.com/",
            "coordinates": {
                "type": "Point",
                "coordinates": [
                    49.8941,
                    2.2958,
                ]
            }
        },
        {
            "id": 7,
            "status": 1,
            "name": "Location 7",
            "building": "Round Tree Plaza",
            "phone": "(555) 555-5555",
            "address": "1234 ANYWHERE ST.",
            "city": "Anytown",
            "state": "Anystate",
            "country": "United States of America",
            "zip": "90015",
            "description": "Address description here.",
            "thumbnail": thumbnail1,
            "websiteLink": "https://google.com/",
            "coordinates": {
                "type": "Point",
                "coordinates": [
                    51.5079,
                    0.0877,
                ]
            }
        },
        {
            "id": 8,
            "status": 1,
            "name": "Location 8",
            "building": "Round Tree Plaza",
            "phone": "(555) 555-5555",
            "address": "1234 ANYWHERE ST.",
            "city": "Anytown",
            "state": "Anystate",
            "country": "United States of America",
            "zip": "90015",
            "description": "Address description here.",
            "thumbnail": thumbnail2,
            "websiteLink": "https://google.com/",
            "coordinates": {
                "type": "Point",
                "coordinates": [
                    48.8584,
                    2.2945,
                ]
            }
        },
        {
            "id": 9,
            "status": 1,
            "name": "Location 9",
            "building": "Round Tree Plaza",
            "phone": "(555) 555-5555",
            "address": "1234 ANYWHERE ST.",
            "city": "Anytown",
            "state": "Anystate",
            "country": "United States of America",
            "zip": "90015",
            "description": "Address description here.",
            "thumbnail": thumbnail3,
            "websiteLink": "https://google.com/",
            "coordinates": {
                "type": "Point",
                "coordinates": [
                    49.8941,
                    2.2958,
                ]
            }
        },
        {
            "id": 10,
            "status": 1,
            "name": "Location 10",
            "building": "Round Tree Plaza",
            "phone": "(555) 555-5555",
            "address": "1234 ANYWHERE ST.",
            "city": "Anytown",
            "state": "Anystate",
            "country": "United States of America",
            "zip": "90015",
            "description": "Address description here.",
            "thumbnail": thumbnail1,
            "websiteLink": "https://google.com/",
            "coordinates": {
                "type": "Point",
                "coordinates": [
                    51.5079,
                    0.0877,
                ]
            }
        }
        ]
    }
}

export default json;
